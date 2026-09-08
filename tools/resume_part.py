#!/usr/bin/env python3
"""Resume TTS for a part, rebuild manifest, publish, sync catalog availability.
Prints a one-line summary; prints nothing if there is no progress to report."""
import json, os, re, subprocess, sys

BASE = "/home/ubuntu/audio-novel-pipeline"
UV = "/home/ubuntu/.hermes/bin/uv"
DST = "/var/www/yt"
PART = os.environ.get("PART", "lotm-vol3-recap-2")
D = BASE + "/out-lotm/" + PART

def missing():
    sc = json.load(open(D + "/_scenes_raw.json"))
    out = []
    for s in sc:
        f = D + "/audio/" + s["id"] + ".mp3"
        if not (os.path.exists(f) and os.path.getsize(f) > 1024):
            out.append(s["id"])
    return out

before = missing()
if not before:
    sys.exit(0)

env = dict(os.environ, PART=PART)

def run_tts(ids, timeout):
    return subprocess.run([UV, "run", "python", "tts_part.py"] + ids,
                          cwd=BASE, env=env, capture_output=True, text=True,
                          timeout=timeout)

# Probe one scene first. While the Gemini quota is closed every scene burns
# minutes of backoff, so never march through the whole list on a dead window.
run_tts(before[:1], 400)
if missing() and len(missing()) == len(before):
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

man = json.load(open(D + "/scenario.json"))
total = len(man["scenes"])
ready = total - len(after)
avail = ("Audio ready \u00b7 %d scenes" % total) if not after \
        else ("Audio %d/%d \u00b7 quota pending" % (ready, total))

cat_path = DST + "/catalog.js"
cat = open(cat_path, encoding="utf-8").read()
block = re.search(r'id: "' + PART + r'".*?availability: "([^"]*)"', cat, re.S)
if block and block.group(1) != avail:
    cat = cat[:block.start(1)] + avail + cat[block.end(1):]
    ver = "resume-%s" % subprocess.run(["date", "+%Y%m%d-%H%M"], capture_output=True,
                                       text=True).stdout.strip()
    cat = re.sub(r'(data/' + PART + r'\.js\?v=)[^"]*', r'\g<1>' + ver, cat)
    open(cat_path, "w", encoding="utf-8").write(cat)
    subprocess.run(["node", "--check", cat_path], check=True, capture_output=True)

print("%s: +%d scene audio, now %d/%d (%.2f min). %s" % (
    PART, made, ready, total, man["real_duration_minutes"],
    "Complete." if not after else "Still pending: %d." % len(after)))
