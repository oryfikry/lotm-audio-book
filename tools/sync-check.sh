#!/usr/bin/env bash
# Do the committed tools/ copies still match what runs in the pipeline dir?
set -uo pipefail
PIPE="/home/ubuntu/audio-novel-pipeline"
TOOLS="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
drift=0
for f in parse_srt.py tts_part.py build_manifest.py publish_part.py resume_part.py vol3_style.txt; do
  if [ ! -f "$PIPE/$f" ]; then
    echo "MISSING in pipeline dir: $f"; drift=1; continue
  fi
  if cmp -s "$PIPE/$f" "$TOOLS/$f"; then
    echo "same     $f"
  else
    echo "DRIFTED  $f"; drift=1
  fi
done
[ "$drift" = 0 ] && echo "tools/ in sync" || echo "tools/ out of sync - reconcile before committing"
exit $drift
