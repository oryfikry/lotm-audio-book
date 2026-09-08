#!/usr/bin/env python3
"""Resume several pending parts in order, and retire the cron only when ALL are done.

Why this exists: `resume_part.py` retires its cron as soon as ITS part completes.
With more than one part outstanding that would kill the schedule and strand the
rest, so the queue owns the retirement decision instead.

Env:
  PARTS        comma-separated part ids, earliest first
               (default "lotm-vol3-recap-3,lotm-vol3-recap-4")
  CRON_JOB_ID  optional; removed once every listed part has full audio

Prints one line per part that made progress, plus a final state line. Prints
NOTHING when the quota window is closed and nothing changed, so a scheduled run
costs no tokens.
"""
import json
import os
import subprocess
import sys

BASE = "/home/ubuntu/audio-novel-pipeline"
HERMES = "/home/ubuntu/.local/bin/hermes"
PARTS = [p.strip() for p in os.environ.get(
    "PARTS", "lotm-vol3-recap-3,lotm-vol3-recap-4").split(",") if p.strip()]
JOB_ID = os.environ.get("CRON_JOB_ID", "").strip()


def counts(part):
    """(scenes_with_audio, total) for a part."""
    d = os.path.join(BASE, "out-lotm", part)
    scenes = json.load(open(os.path.join(d, "_scenes_raw.json")))
    have = 0
    for scene in scenes:
        path = os.path.join(d, "audio", scene["id"] + ".mp3")
        if os.path.exists(path) and os.path.getsize(path) > 1024:
            have += 1
    return have, len(scenes)


def job_exists(job_id):
    listing = subprocess.run([HERMES, "cron", "list"],
                             capture_output=True, text=True)
    return job_id in (listing.stdout or "")


def retire():
    """Remove the driving cron job, verifying the result.

    `hermes cron remove` exits 0 even for an unknown id, so check the listing.
    """
    if not JOB_ID:
        return "no CRON_JOB_ID set, schedule left alone"
    if not job_exists(JOB_ID):
        return "cron %s already gone" % JOB_ID
    result = subprocess.run([HERMES, "cron", "remove", JOB_ID],
                            capture_output=True, text=True)
    if job_exists(JOB_ID):
        detail = (result.stderr or result.stdout or "").strip()[:200]
        return "cron %s removal FAILED, still scheduled: %s" % (JOB_ID, detail)
    return "cron %s removed" % JOB_ID


lines = []
for part in PARTS:
    have, total = counts(part)
    if have >= total:
        continue
    # resume_part.py gets no CRON_JOB_ID: only this queue may retire the job.
    env = dict(os.environ, PART=part)
    env.pop("CRON_JOB_ID", None)
    result = subprocess.run([sys.executable, "resume_part.py"],
                            cwd=BASE, env=env, capture_output=True, text=True,
                            timeout=3500)
    out = (result.stdout or "").strip()
    if out:
        lines.append(out)
    else:
        # Quota window is closed; later parts would only burn more backoff.
        break

if not lines:
    sys.exit(0)

state = [(p,) + counts(p) for p in PARTS]
pending = [p for p, have, total in state if have < total]
summary = "; ".join("%s %d/%d" % (p, have, total) for p, have, total in state)

if pending:
    print("\n".join(lines))
    print("Queue state: %s. Still pending: %s." % (summary, ", ".join(pending)))
else:
    print("\n".join(lines))
    print("Queue state: %s. All parts complete. %s" % (summary, retire()))
