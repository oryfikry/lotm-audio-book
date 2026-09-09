# LOTM Audio-Book Pipeline — Operating Manual

Single source of truth for producing and publishing Lord of the Mysteries recap
narration parts for https://yt.oryfikry.my.id. Written so a fresh agent session
can pick up mid-project without re-discovering anything.

Last verified: 2026-09-08 (Vol. 3 Part 1 complete, Vol. 3 Part 2 in progress).

---

## 1. What this project is

The user runs an Indonesian YouTube channel narrating LOTM. Their input is a
**finished .srt script** they wrote themselves. This pipeline turns that script
into a per-part package they import into their OWN video editor:

- `narration.txt` — the script, one `[scene-XXX]` header per scene
- `scenario.json` — manifest: words, estimated + real seconds, keywords, audio path
- `keywords.txt` — per-scene visual + SFX search phrases (copy-paste ready)
- `audio/scene-XXX.mp3` — one MP3 per scene

The same data is published to a static browser library at yt.oryfikry.my.id so
scripts are readable and audio is playable/downloadable per scene.

**Do not build video automation.** The user deliberately dropped that scope.

### Standing content rules
- Narration language: Indonesian. Canonical LOTM terms stay English (Sequence
  names, Beyonder characteristics, pathway names, org names).
- The .srt is the user's own writing — do not rewrite, summarize, or "improve"
  it. Parse it faithfully. The only transformation allowed is splitting
  over-long blocks (section 4, step 2).
- Never generate audio for a part until the user explicitly approves the voice.
  Never mix voices within a part.

---

## 2. Two locations

| Path | Role | Git |
|---|---|---|
| `/home/ubuntu/audio-novel-pipeline` | working dir: tools, `.env`, `out-lotm/<part>/` with MP3s | not a repo |
| `/var/www/yt` | served static site + this manual + `tools/` copies | git repo, branch `main` |

`tools/*.py` in the repo are the authoritative copies. The pipeline dir is where
they actually run (it holds `.env` and the audio). If you edit one, sync both —
`tools/sync-check` below tells you if they drifted.

### Repo layout
```
/var/www/yt
├── lotm-audio-book.md        # this file
├── tools/                    # committed copies of the pipeline scripts
│   ├── parse_srt.py
│   ├── tts_part.py
│   ├── build_manifest.py
│   ├── publish_part.py
│   ├── resume_part.py
│   ├── resume_queue.py       # multi-part resume; owns cron retirement
│   ├── vol3_style.txt        # TTS style-prompt template
│   ├── check_site.js         # catalog/data integrity test
│   ├── check_autoplay.js     # player autoplay regression test
│   └── sync-check.sh         # tools/ vs pipeline-dir drift
├── index.html                # shell: selectors, banner, scene list, player
├── app.js                    # all UI logic incl. per-scene audio gating
├── catalog.js                # volume/part registry + availability labels
├── style.css
├── data/<part>.js            # window.LOTM_DATA per part (NOT JSON)
├── audio/<part>/scene-XXX.mp3    # gitignored
└── assets/<part>/{narration,keywords}.txt   # gitignored
```
`.gitignore` excludes `audio/`, `assets/`, `data/*` except `data/*.js`. Media is
treated as a rebuildable artifact — the masters live in the pipeline dir.

---

## 3. Configuration

`.env` in the pipeline dir (never commit it, never echo keys into chat):

| Key | Current value | Note |
|---|---|---|
| `TTS_BASE_URL` | `https://9router.oryfikry.my.id/v1` | TTS only exists on the REMOTE gateway |
| `TTS_API_KEY` | (set) | request keys live in sqlite `~/.9router/db/data.sqlite` table `apiKeys`, NOT in `.env` originally |
| `TTS_MODEL` | `edge-tts/id-ID-ArdiNeural` | stale default; Vol.3 overrides in `tts_part.py` |
| `LLM_*` | local 9router `:20128` | only used by the legacy `pipeline.py` scene-splitter |

The local gateway (`:20128`) has chat models only — **no TTS**.

### Voice history (per part, never mix inside one part)
| Part | Voice |
|---|---|
| Vol.1 Part 1 | `Fenrir` (gemini) |
| Vol.2 Part 1 | `edge-tts/id-ID-ArdiNeural` |
| Vol.2 Part 2 | Ardi planned, audio never generated |
| Vol.3 Part 1, 2 | `gemini/gemini-3.1-flash-tts-preview/Puck` |

`tts_part.py` hardcodes the Vol.3 model `.../Puck`. Change that constant (and
ask the user first) when the voice changes.

### Measured narration speed
| Voice | Real wpm (Indonesian) |
|---|---|
| Fenrir | ~109 |
| Puck | ~139.5 |

`build_manifest.py` uses `WPM = 139.5` for estimates. Recalibrate on voice change:
`new_wpm = old_wpm * (sum real_seconds / sum estimated_seconds)`.

---

## 4. The flow, end to end

Everything runs from the pipeline dir. `PART` is the part id, e.g.
`lotm-vol3-recap-3`. Use `/home/ubuntu/.hermes/bin/uv run python` for the TTS
step (background shells do not inherit PATH); plain `python3` is fine elsewhere.

### Step 1 — parse the .srt
```bash
cd /home/ubuntu/audio-novel-pipeline
python3 parse_srt.py /path/to/LOTM_VolX_PartY.srt --part lotm-volX-recap-Y
```
Cuts scenes at `[musik]` marker cues and writes
`out-lotm/<part>/_scenes_raw.json`. It refuses to overwrite an existing file.

### Step 2 — why re-splitting matters
Marker blocks are NOT uniform. A Vol.3 Part 2 block ran 642 words (~4.6 min in
one MP3). `parse_srt.py` re-splits anything over 210 words at sentence
boundaries, packing to ~150 with a ~200 hard cap. Verified: it reproduces the
live Part 2 split (382 cues -> 29 blocks -> 39 scenes) byte for byte.

Also expect stray out-of-order cues in hand-made SRTs (a paragraph sitting in
the wrong block). The splitter contains them but does not reorder them. Leave
them alone unless the user asks — it is their script.

### Step 2b — clean source artifacts before TTS
Check the parsed scenes before generating audio; anything left in the text WILL be
read aloud. Seen in Vol. 3 Part 3:
- **Citation markers.** Three cues carried a literal `[cite: 8]`. Strip with
  `re.sub(r"\s*\[cite:\s*\d+\]", "", narration)`.
- **Fragment scenes.** The re-splitter cut mid-quote and left a 6-word scene
  (~3 s MP3). Merge any scene under ~30 words into its neighbour, keeping the
  text verbatim and in order, then renumber the ids.

Quick check: `min(len(s["narration"].split()) for s in scenes)` and a grep for
`cite:` / stray brackets.

### Step 3 — author keywords (manual, no tool)
Add `visual_keywords` and `sound_keywords` to every scene in
`_scenes_raw.json`. Read the narration and write:
- `visual_keywords`: 3 short ENGLISH phrases for image/b-roll search
- `sound_keywords`: 3 ambience/SFX phrases

The manifest builder fails loudly if a scene is missing them. Do this before
TTS so a quota window is never wasted on a part that is not ready.

### Step 4 — voice test, then approval
```bash
PART=<part> /home/ubuntu/.hermes/bin/uv run python tts_part.py scene-001
```
Send the MP3 to the user and wait for approval before the full run.

### Step 5 — full TTS run (long; background it)
```bash
cd /home/ubuntu/audio-novel-pipeline && PART=<part> /home/ubuntu/.hermes/bin/uv run python tts_part.py \
  $(python3 -c "print(' '.join('scene-%03d'%i for i in range(1,40)))") 2>&1 | tee out-lotm/<part>/tts.log
```
Run via `terminal(background=true, notify=true)` and poll. It is resumable:
existing MP3s over 1 KB are skipped, so re-running only fills gaps.

### Step 6 — manifest + publish
```bash
PART=<part> python3 build_manifest.py    # ffprobes every mp3, writes real_seconds
PART=<part> python3 publish_part.py      # copies audio + writes data/<part>.js
```
`build_manifest.py` prints `missing N [...]` — that is the authoritative list of
scenes still lacking audio.

### Step 7 — register in the catalog
Hand-edit `/var/www/yt/catalog.js`: add the part under its volume with `id`,
`label`, `file` (with a fresh `?v=` cache version), `description`, `voice`,
`audioBase: "audio/<part>"`, `audioAvailable: true`, and an honest
`availability` string. Bump the `catalog.js` and `app.js` versions in
`index.html` to the same version token so the release is coordinated.

### Step 8 — verify, then commit
See section 6. Never report success without it.

---

## 5. Partial-audio publishing (important)

The site gates audio **per scene**, not per part. In `app.js`:

```js
const sceneHasAudio = Boolean(activePart.audioAvailable && scene.real_seconds);
```

Consequences:
- A scene without `real_seconds` renders as `planned` with a pending note and no
  Play / MP3 buttons.
- `#dl-all` zips only `scenes.filter((scene) => scene.real_seconds)`.
- The summary line reads `audio N/total`.

So a half-narrated part CAN ship: set `audioAvailable: true` and put the truth in
`availability`, e.g. `"Audio 2/39 · quota pending"` (Vol.3 Part 2 shipped that
way for a while). When a part completes, change it to `"Audio ready · N scenes"` —
`resume_part.py` does this automatically once the last scene lands.

`publish_part.py` only copies MP3s that exist AND have `real_seconds`, so a
partial publish never leaves a broken audio URL on the site.

### Player: autoplay next scene
The floating player has an `Auto` pill (`#p-auto`, skip-forward glyph) next to the
close button:
- Toggles continuous playback; state persists in `localStorage` under
  `lotm.autoplayNext` and defaults to off.
- On the audio `ended` event it advances to the next scene **that has audio**,
  computed from `data.scenes.filter((scene) => scene.real_seconds)` — so gaps in a
  partially narrated part are skipped rather than played as a dead URL.
- It scrolls the newly playing card into view and stops with a status message at
  the last playable scene (no wrap-around).

Regression test: `node /var/www/yt/tools/check_autoplay.js` drives the real
`app.js` through a DOM shim and asserts the toggle, persistence, advancing,
gap-skipping, last-scene stop, and no-advance-when-off.

---

## 6. Verification checklist (run before claiming success)

1. `node --check` on every changed JS file — `app.js`, `catalog.js`, `data/<part>.js`.
2. VM shim tests — catalog/data integrity, plus the player's autoplay logic:
   ```bash
   node /var/www/yt/tools/check_site.js
   node /var/www/yt/tools/check_autoplay.js
   ```
   Expected today:
   ```
   vol-1 lotm-vol1-recap-1 scenes=19 withAudio=19
   vol-2 lotm-vol2-recap-1 scenes=15 withAudio=15
   vol-2 lotm-vol2-recap-2 scenes=15 withAudio=0   (script only)
   vol-3 lotm-vol3-recap-1 scenes=42 withAudio=42
   vol-3 lotm-vol3-recap-2 scenes=39 withAudio=39
   vol-3 lotm-vol3-recap-3 scenes=39 withAudio=8    (in progress)
   vol-3 lotm-vol3-recap-4 scenes=37 withAudio=0    (script only)
   vol-3 lotm-vol3-recap-5 scenes=39 withAudio=0    (script only)
   vol-3 lotm-vol3-recap-6 scenes=37 withAudio=0    (script only)
   ```
3. Live HTTP 200 on the shell, `app.js`, `catalog.js`, every `data/<part>.js`,
   each `audio/<part>/scene-*.mp3`, and the two `assets/<part>/*.txt`.
4. **Byte-compare** public versioned assets against local files — HTTP 200 alone
   does not prove the new bytes are being served:
   ```bash
   curl -s "https://yt.oryfikry.my.id/app.js?v=$VER" -o /tmp/pub.js
   cmp -s /tmp/pub.js /var/www/yt/app.js && echo MATCH
   ```
5. ffprobe durations must equal manifest `real_seconds` (`build_manifest.py` does
   this by construction — re-run it rather than trusting an older number).

Browser automation is not used here. Report these deterministic static/live
checks; do not claim an interactive browser test ran.

---

## 7. Gemini TTS quota — the main operational obstacle

Model `gemini/gemini-3.1-flash-tts-preview/Puck` via the remote 9router.

- Free tier dies after roughly 20 scenes per window.
- The 502 body carries `reset after Xm Ys`. Sleep exactly that — naive 5/10 s
  backoff burns every retry inside one window. `tts_part.py` parses it.
- **Window growing = daily cap gone.** If the reset value climbs across retries
  (47s -> 3m 55s -> 4m 3s) or the body becomes
  `Your project has been denied access`, stop. Retrying only wastes time.
- Occasional `finishReason: SAFETY` rejections happen on violent scenes; a plain
  retry usually succeeds (seen once in 42 scenes).
- Practical throughput: a ~37 min part needs 2-3 separate quota windows. A paid
  key would finish it in one run.

### Unattended resume
```bash
PART=<part> CRON_JOB_ID=<job-id> python3 resume_part.py
```
- Probes ONE scene first. If the quota is still closed it exits silently
  (exit 0, no stdout). **Never** let a scheduled job walk the full missing list
  on a dead window — each scene burns minutes of backoff.
- On progress: generates remaining MP3s, rebuilds the manifest, publishes, and
  rewrites the `availability` label plus all three coordinated cache tokens —
  `data/<part>.js?v=` in `catalog.js`, and `catalog.js?v=` / `app.js?v=` in
  `index.html`. (Earlier versions left the `index.html` tokens stale, so a
  browser holding a cached `catalog.js` kept showing the old label.)
- `CRON_JOB_ID` is optional but recommended: see the lifecycle rule below.

### More than one part pending — use the queue
`resume_part.py` retires its cron as soon as **its** part completes, which would
strand any other outstanding part. When two or more parts await audio, drive them
with the queue instead:

```bash
PARTS=lotm-vol3-recap-3,lotm-vol3-recap-4 CRON_JOB_ID=<job-id> python3 resume_queue.py
```
- Works the list in order, skipping parts that are already complete.
- Calls `resume_part.py` per part **without** `CRON_JOB_ID`, so only the queue may
  retire the job — and it does so only when every listed part has full audio.
- Stops early the moment a part makes no progress: the quota window is closed and
  later parts would only burn more backoff.
- Silent (exit 0, no stdout) when nothing changed.

**One manual step the queue does not do:** a part published script-only has
`audioAvailable: false`, which hides the play buttons for every scene. When such a
part first gains audio, flip that flag to `true` in `catalog.js` by hand (the cron
prompt reminds the agent to do this).

### Cron lifecycle rule — create only on limit, delete on completion
A resume cron is a **temporary workaround for the Gemini quota, not standing
infrastructure**:

1. **Create it only when a run actually hits the quota limit** and scenes remain
   unnarrated. If a part finishes in one pass, no cron is created at all.
2. Pass the job's own id as `CRON_JOB_ID` so the script can retire itself.
3. When the part reaches 100% audio, `resume_part.py` removes the job via
   `hermes cron remove <id>` and says so in its output line. The next part that
   stalls gets a fresh job.

Removal is **verified, not assumed**: `hermes cron remove` exits 0 even for an
id that does not exist (it just prints "Failed to remove job"), so `retire()`
checks `hermes cron list` before and after and reports
`removal FAILED, still scheduled` if the job survived.

The script also retires the job on a run where the part was already complete —
that covers the case where a part finishes by other means (a manual run, or a
paid key) while the schedule is still ticking.

Precedent: hourly job `25d590c1a324` ("LOTM Vol3 Part2 TTS resume") did exactly
that for `lotm-vol3-recap-2` — sat silent through several dead windows, then
filled the remaining 37 scenes and self-published once the quota reopened. It has
since been removed because the part completed. Job `6e1e516bbf1c` now does the
same for `lotm-vol3-recap-3`.

The job prompt must include: if the script printed nothing, reply `SILENT` and
stop — so dead windows cost no tokens and send no message. Clone that prompt for
the next stalled part and pass the new job's id as `CRON_JOB_ID`.

---

## 8. Current state (2026-09-08)

| Volume | Part | Scenes | Audio | Duration | Voice |
|---|---|---|---|---|---|
| 1 | Part 1 — Full recap | 19 | 19/19 | published | Fenrir |
| 2 | Part 1 — Faceless | 15 | 15/15 | 16.2 min | edge-tts Ardi |
| 2 | Part 2 — Backlund aftermath | 15 | 0/15 | script only | Ardi (planned) |
| 3 | Part 1 — The Adventurer | 42 | 42/42 | 37.54 min | Puck |
| 3 | Part 2 — Sea God Scepter | 39 | 39/39 | 35.49 min | Puck |
| 3 | Part 3 — Marionettist | 39 | 8/39 | 7.97 min so far | Puck |
| 3 | Part 4 — Blood Admiral | 37 | 0/37 | script only | Puck (planned) |
| 3 | Part 5 — The Hermit | 39 | 0/39 | script only | Puck (planned) |
| 3 | Part 6 — Groselle's Travels | 37 | 0/37 | script only | Puck (planned) |

Vol. 3 Part 2 was finished by hourly resume cron `25d590c1a324`, which retired
itself on completion. Vol. 3 Parts 3, 4, 5 and 6 are all queued behind cron
`6e1e516bbf1c`, which runs `resume_queue.py` over the four in order.
Vol. 2 Part 2 has never had audio approved — do not generate it without asking.

---

## 9. Pitfalls that have actually bitten us

1. **Rights.** Only the user's own scripts / recaps / public-domain text. A
   copyrighted LOTM epub was declined in an earlier session; "trust me" is not
   permission. The .srt files are the user's own writing, so they are fine.
2. **The tool sanitizer strips literal angle brackets** from `write_file`,
   terminal heredocs, and `execute_code` string literals. HTML/JS written
   naively silently loses every tag (index.html once collapsed to a 186-byte
   shell). Build such content from `chr()` helpers —
   `LT=chr(60); GT=chr(62)`, arrow as `chr(61)+chr(62)` — and always
   `node --check` afterwards. The same applies to the `<style>` tags in the TTS
   style prompt: `vol3_style.txt` holds them on disk so no script has to embed
   them as literals.
3. **No nested backticks inside a JS template literal.** An inner backtick in a
   `${...}` interpolation parses as a comparison and throws
   `Unexpected token '<'`. Use single-quote concatenation with the bare
   variable instead.
4. **`data/<part>.js` is JS, not JSON** — `window.LOTM_DATA = {...};`. Grepping
   it for a field with escaped-quote patterns fails. Read the file, or eval it
   the way `app.js` does: `new Function(source + "; return window.LOTM_DATA;")()`.
5. **Do not reuse MP3s after a script revision.** TTS deliberately skips files
   over 1 KB, so a rewritten scene keeps its stale audio. Archive the part's
   `audio/` dir to a timestamped folder, recreate it, and clear `real_seconds`
   before regenerating.
6. **Never put API keys in chat or committed files.** If one leaks, tell the user
   to rotate it.
7. **`.py` files under `/var/www/yt` are publicly served** (verified: nginx
   `try_files` returns them as HTTP 200 with plain text). That is why `tools/`
   contains only key-free scripts — every one of them reads credentials from
   `.env` in the pipeline dir, which is outside the webroot. Never place `.env`,
   a key, or anything secret under `/var/www/yt`.

---

## 10. Quick command reference

```bash
cd /home/ubuntu/audio-novel-pipeline
UV=/home/ubuntu/.hermes/bin/uv

# new part from a .srt
python3 parse_srt.py /path/to/script.srt --part lotm-vol3-recap-3
# ... then author keywords in out-lotm/lotm-vol3-recap-3/_scenes_raw.json ...

# voice test -> get user approval
PART=lotm-vol3-recap-3 $UV run python tts_part.py scene-001

# full run (background it), then
PART=lotm-vol3-recap-3 python3 build_manifest.py
PART=lotm-vol3-recap-3 python3 publish_part.py

# unattended top-up (only when the quota limit actually blocked a run)
PART=lotm-vol3-recap-3 CRON_JOB_ID=<job-id> python3 resume_part.py
# ^ self-deletes that cron job once the part hits 100% audio

# verify + commit
node /var/www/yt/tools/check_site.js
node /var/www/yt/tools/check_autoplay.js
cd /var/www/yt && node --check app.js && node --check catalog.js
git add -A && git commit -m "..."

# did tools/ drift from the pipeline dir?
bash /var/www/yt/tools/sync-check.sh
```

No remote is configured on the `/var/www/yt` repo — commits are local only.
