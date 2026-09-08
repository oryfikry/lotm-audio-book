#!/usr/bin/env python3
"""Turn a finished .srt narration script into out-lotm/<PART>/_scenes_raw.json.

Scenes are cut at "[musik]" marker cues. Any scene longer than --max-words is
re-split at sentence boundaries, because hand-made SRT marker blocks are not
uniform (one Vol.3 Part 2 block ran 642 words = ~4.6 min in a single MP3).

Usage:
  PART=lotm-vol3-recap-3 python3 parse_srt.py /path/to/script.srt
  python3 parse_srt.py script.srt --part lotm-vol3-recap-3 --max-words 210

Keywords are NOT generated here. After running this, author
visual_keywords + sound_keywords per scene (see lotm-audio-book.md step 3).
"""
import argparse
import json
import os
import re
import sys

BASE = "/home/ubuntu/audio-novel-pipeline"


def read_cues(path):
    """Return the text line of every SRT cue, in file order."""
    raw = open(path, encoding="utf-8").read()
    cues = []
    for block in re.split(r"\n\s*\n", raw.strip()):
        lines = block.strip().split("\n")
        # lines[0] = index, lines[1] = timecode, rest = text
        if len(lines) >= 3:
            cues.append(" ".join(lines[2:]).strip())
    return cues


def cut_at_markers(cues, marker="[musik]"):
    """Group cues into scenes, breaking at marker cues (marker is dropped)."""
    scenes, current = [], []
    for text in cues:
        if text.strip() == marker:
            if current:
                scenes.append(" ".join(current))
                current = []
        else:
            current.append(text)
    if current:
        scenes.append(" ".join(current))
    return scenes


def resplit(text, target=150, hard=200):
    """Break an over-long scene into ~target-word chunks at sentence ends."""
    sentences = re.split(r"(?<=[.!?])\s+", text.strip())
    chunks, current, count = [], [], 0
    for sentence in sentences:
        words = len(sentence.split())
        if current and count + words > hard:
            chunks.append(" ".join(current))
            current, count = [sentence], words
        else:
            current.append(sentence)
            count += words
            if count >= target:
                chunks.append(" ".join(current))
                current, count = [], 0
    if current:
        chunks.append(" ".join(current))
    return chunks


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("srt")
    ap.add_argument("--part", default=os.environ.get("PART"))
    ap.add_argument("--marker", default="[musik]")
    ap.add_argument("--max-words", type=int, default=210,
                    help="scenes longer than this get re-split")
    ap.add_argument("--target-words", type=int, default=150)
    ap.add_argument("--hard-words", type=int, default=200)
    args = ap.parse_args()

    if not args.part:
        sys.exit("set --part or PART=<part-id>")

    cues = read_cues(args.srt)
    blocks = cut_at_markers(cues, args.marker)

    texts = []
    for block in blocks:
        if len(block.split()) > args.max_words:
            texts.extend(resplit(block, args.target_words, args.hard_words))
        else:
            texts.append(block)

    scenes = [{"id": "scene-%03d" % i, "narration": t}
              for i, t in enumerate(texts, 1)]

    out_dir = os.path.join(BASE, "out-lotm", args.part)
    os.makedirs(os.path.join(out_dir, "audio"), exist_ok=True)
    target = os.path.join(out_dir, "_scenes_raw.json")
    if os.path.exists(target):
        sys.exit("refusing to overwrite %s (delete it first)" % target)
    json.dump(scenes, open(target, "w"), ensure_ascii=False, indent=1)

    words = sum(len(s["narration"].split()) for s in scenes)
    longest = max(len(s["narration"].split()) for s in scenes)
    print("%s: %d cues -> %d blocks -> %d scenes, %d words, "
          "longest %d words, ~%.1f min at 139.5 wpm"
          % (args.part, len(cues), len(blocks), len(scenes), words,
             longest, words / 139.5))
    print("wrote " + target)
    print("NEXT: add visual_keywords + sound_keywords to every scene, "
          "then PART=%s uv run python tts_part.py scene-001" % args.part)


if __name__ == "__main__":
    main()
