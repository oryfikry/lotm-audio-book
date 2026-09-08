#!/usr/bin/env python3
"""Resume Gemini TTS for a part, then publish and self-retire when it completes.

Designed to be driven by an hourly cron while the Gemini free-tier quota is
closed. Prints a one-line summary only when something changed; prints NOTHING
(exit 0) on a dead quota window so a scheduled run costs no tokens.

Env:
  PART         part id under out-lotm/ (default lotm-vol3-recap-2)
  CRON_JOB_ID  optional; when the part reaches 100% audio this job is removed
               via `hermes cron remove <id>` so the schedule retires itself

Exit codes: always 0 unless a publish step genuinely failed.
"""
import json
import os
import re
import subprocess
import sys
import time

BASE = "/home/ubuntu/audio-novel-pipeline"
UV = "/home/ubuntu/.hermes/bin/uv"
HERMES = "/home/ubuntu/.local/bin/hermes"
DST = "/var/www/yt"
PART = os.environ.get("PART", "lotm-vol3-recap-2")
JOB_ID = os.environ.get("CRON_JOB_ID", "").strip()
D = os.path.join(BASE, "out-lotm", PART)
env = dict(os.environ, PART=PART)


def missing():
    """Scene ids that still have no usable mp3."""
    scenes = json.load(open(os.path.join(D, "_scenes_raw.json")))
    out = []
    for scene in scenes:
        path = os.path.join(D, "audio", scene["id"] + ".mp3")
        if not (os.path.exists(path) and os.path.getsize(path) > 1024):
            out.append(scene["id"])
    return out


def job_exists(job_id):
    listing = subprocess.run([HERMES, "cron", "list"],
                             capture_output=True, text=True)
    return job_id in (listing.stdout or "")


def retire(reason):
    """Remove the cron job that drives this part; the work is done.

    `hermes cron remove` exits 0 even when the id does not exist (it just
    prints "Failed to remove job"), so confirm against `cron list` instead of
    trusting the return code.
    """
    if not JOB_ID:
        return "no CRON_JOB_ID set, schedule left alone"
    if not job_exists(JOB_ID):
        return "cron %s not in schedule, nothing to retire" % JOB_ID
    result = subprocess.run([HERMES, "cron", "remove", JOB_ID],
                            capture_output=True, text=True)
    if job_exists(JOB_ID):
        detail = (result.stderr or result.stdout or "").strip()[:200]
        return "cron %s removal FAILED, still scheduled: %s" % (JOB_ID, detail)
    return "cron %s removed (%s)" % (JOB_ID, reason)


def run_tts(ids, timeout):
    return subprocess.run([UV, "run", "python", "tts_part.py"] + ids,
                          cwd=BASE, env=env, capture_output=True, text=True,
                          timeout=timeout)


def version_token():
    return "resume-" + time.strftime("%Y%m%d-%H%M")


def sync_site(avail, ver):
    """Update the part's availability label + every coordinated cache token."""
    catalog_path = os.path.join(DST, "catalog.js")
    catalog = open(catalog_path, encoding="utf-8").read()
    block = re.search(r'id: "' + PART + r'".*?availability: "([^"]*)"',
                      catalog, re.S)
    if block:
        catalog = catalog[:block.start(1)] + avail + catalog[block.end(1):]
    catalog = re.sub(r'(data/' + PART + r'\.js\?v=)[^"]*',
                     r'\g<1>' + ver, catalog)
    open(catalog_path, "w", encoding="utf-8").write(catalog)
    subprocess.run(["node", "--check", catalog_path],
                   check=True, capture_output=True)

    # resume runs used to leave these stale, so a cached catalog.js kept
    # showing the old availability label and the old data URL.
    shell_path = os.path.join(DST, "index.html")
    shell = open(shell_path, encoding="utf-8").read()
    shell = re.sub(r'(catalog\.js\?v=)[^"]*', r'\g<1>' + ver, shell)
    shell = re.sub(r'(app\.js\?v=)[^"]*', r'\g<1>' + ver, shell)
    open(shell_path, "w", encoding="utf-8").write(shell)


before = missing()

# Already complete: nothing to narrate, but the schedule may still be running.
if not before:
    note = retire("part already complete")
    if JOB_ID:
        print("%s: already complete, nothing to do. %s" % (PART, note))
    sys.exit(0)

# Probe ONE scene first. While the quota is closed every scene burns minutes of
# "reset after" backoff, so never march the whole list through a dead window.
run_tts(before[:1], 400)
if len(missing()) == len(before):
    sys.exit(0)

rest = missing()
if rest:
    run_tts(rest, 3300)

after = missing()
made = len(before) - len(after)
if made == 0:
    sys.exit(0)

for script in ("build_manifest.py", "publish_part.py"):
    subprocess.run(["python3", script], cwd=BASE, env=env, check=True,
                   capture_output=True, text=True)

man = json.load(open(os.path.join(D, "scenario.json")))
total = len(man["scenes"])
ready = total - len(after)
complete = not after
avail = ("Audio ready \u00b7 %d scenes" % total) if complete \
        else ("Audio %d/%d \u00b7 quota pending" % (ready, total))
sync_site(avail, version_token())

tail = retire("part complete") if complete else "still pending: %d" % len(after)
print("%s: +%d scene audio, now %d/%d (%.2f min). %s" % (
    PART, made, ready, total, man["real_duration_minutes"], tail))
