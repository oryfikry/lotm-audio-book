/* LOTM recap library — volume/part navigation with audio-safe planning mode. */
"use strict";
const $ = (selector) => document.querySelector(selector);
const catalog = window.LOTM_CATALOG || [];
const cache = new Map();
let activeVolume = null;
let activePart = null;
let data = null;

const fmt = (seconds) => {
  if (seconds == null || Number.isNaN(Number(seconds))) return "—";
  const minutes = Math.floor(seconds / 60);
  const rest = Math.round(seconds % 60);
  return minutes ? `${minutes}:${String(rest).padStart(2, "0")}` : `0:${String(rest).padStart(2, "0")}`;
};
const partTitle = (part) => `${activeVolume.label} · ${part.label}`;
const setStatus = (message) => { $("#summary").textContent = message; };

function currentParts() { return activeVolume?.parts || []; }
function selectOptions(select, options, selected, label) {
  select.replaceChildren(...options.map((item) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.label || label(item);
    option.selected = item.id === selected;
    return option;
  }));
}
function configureVolumes() {
  activeVolume = catalog[0];
  selectOptions($("#volume"), catalog, activeVolume.id, (volume) => volume.label);
  configureParts(activeVolume.parts[0]?.id);
}
function configureParts(partId) {
  activePart = currentParts().find((part) => part.id === partId) || currentParts()[0];
  selectOptions($("#part"), currentParts(), activePart?.id, (part) => part.label);
  if (activePart) loadPart(activePart).catch(showLoadError);
}
async function getPartData(part) {
  if (cache.has(part.id)) return cache.get(part.id);
  const response = await fetch(part.file, { cache: "no-cache" });
  if (!response.ok) throw new Error(`${part.file}: HTTP ${response.status}`);
  const source = await response.text();
  const parsed = new Function(`${source}\nreturn window.LOTM_DATA;`)();
  if (!parsed || !Array.isArray(parsed.scenes)) throw new Error("scene data invalid");
  cache.set(part.id, parsed);
  return parsed;
}
async function loadPart(part) {
  setStatus("Loading scenes…");
  data = await getPartData(part);
  $("#q").value = "";
  $("#scene-jump").value = "1";
  $("#scene-jump").max = data.scenes.length;
  document.title = `${partTitle(part)} — LOTM Recap Library`;
  $("#subtitle").textContent = `Browse ${activeVolume.label} scripts, scenes, and production status.`;
  $("#part-title").textContent = partTitle(part);
  $("#part-description").textContent = part.description;
  $("#scene-count").textContent = data.scenes.length;
  $("#voice").textContent = part.voice || data.voice || "—";
  $("#duration").textContent = data.totalMinutes ? `~${data.totalMinutes} min` : "Planned";
  const pill = $("#availability");
  pill.textContent = part.availability;
  pill.classList.toggle("pending", !part.audioAvailable);
  $("#dl-all").hidden = !part.audioAvailable;
  render();
}
function showLoadError(error) {
  console.error(error);
  data = null;
  $("#list").replaceChildren();
  $("#result-count").textContent = "";
  setStatus(`Could not load scenes: ${error.message}`);
}
function matches(scene, query) {
  const haystack = [scene.id, scene.narration, ...(scene.visual_keywords || []), ...(scene.sound_keywords || [])]
    .join(" ").toLowerCase();
  return haystack.includes(query);
}
function tag(container, className, text) {
  const element = document.createElement("span");
  element.className = className;
  element.textContent = text;
  container.append(element);
}
function makeButton(label, action) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.addEventListener("click", action);
  return button;
}
function render() {
  if (!data || !activePart) return;
  const query = $("#q").value.trim().toLowerCase();
  const scenes = data.scenes.filter((scene) => !query || matches(scene, query));
  const sceneWord = scenes.length === 1 ? "scene" : "scenes";
  $("#result-count").textContent = query ? `${scenes.length} ${sceneWord} match “${query}”` : `${scenes.length} ${sceneWord}`;
  setStatus(`${data.scenes.length} scenes · ${activePart.audioAvailable ? "audio available" : "audio not generated"}`);
  const fragment = document.createDocumentFragment();
  for (const scene of scenes) {
    const card = document.createElement("article");
    card.className = "card";
    const head = document.createElement("div");
    head.className = "card-head";
    const title = document.createElement("h3");
    title.textContent = scene.id;
    const duration = document.createElement("span");
    duration.className = "dur";
    duration.textContent = scene.real_seconds ? fmt(scene.real_seconds) : "planned";
    head.append(title, duration);
    const narration = document.createElement("p");
    narration.className = "narr";
    narration.textContent = scene.narration;
    const keywords = document.createElement("div");
    keywords.className = "kw";
    for (const word of scene.visual_keywords || []) tag(keywords, "v", `👁 ${word}`);
    for (const word of scene.sound_keywords || []) tag(keywords, "s", `🔊 ${word}`);
    card.append(head, narration, keywords);
    const actions = document.createElement("div");
    actions.className = "actions";
    actions.append(makeButton("⧉ Copy narration", () => copy(scene.narration, "Narration copied")));
    actions.append(makeButton("⧉ Copy keywords", () => copy(`[visual] ${(scene.visual_keywords || []).join(", ")}\n[sfx] ${(scene.sound_keywords || []).join(", ")}`, "Keywords copied")));
    if (activePart.audioAvailable) {
      actions.prepend(makeButton("▶ Play", () => openPlayer(scene)));
      actions.insertBefore(makeButton("⬇ MP3", () => download(audioUrl(scene), `${scene.id}.mp3`)), actions.children[1]);
    }
    card.append(actions);
    if (!activePart.audioAvailable) {
      const pending = document.createElement("p");
      pending.className = "pending-note";
      pending.textContent = "Audio pending — scene script and production keywords are ready.";
      card.append(pending);
    }
    fragment.append(card);
  }
  $("#list").replaceChildren(fragment);
}
async function copy(text, success) {
  try { await navigator.clipboard.writeText(text); setStatus(success); }
  catch { setStatus("Copy failed — please select the text manually."); }
}
function audioUrl(scene) {
  const base = activePart?.audioBase || "audio";
  return `${base}/${scene.audio_file.split("/").pop()}`;
}
function download(url, name) {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
}
const player = $("#player");
const pAudio = $("#p-audio");
function openPlayer(scene) {
  $("#p-title").textContent = `${scene.id} · ${fmt(scene.real_seconds)}`;
  pAudio.src = audioUrl(scene);
  player.hidden = false;
  pAudio.play().catch(() => {});
}
$("#p-close").addEventListener("click", () => { pAudio.pause(); player.hidden = true; });
$("#volume").addEventListener("change", (event) => {
  activeVolume = catalog.find((volume) => volume.id === event.target.value);
  configureParts(activeVolume?.parts[0]?.id);
});
$("#part").addEventListener("change", (event) => configureParts(event.target.value));
$("#q").addEventListener("input", render);
$("#scene-jump").addEventListener("change", (event) => {
  const scene = data?.scenes[Number(event.target.value) - 1];
  if (!scene) return;
  const card = [...$("#list").children].find((element) => element.querySelector("h3")?.textContent === scene.id);
  if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
  if (activePart?.audioAvailable) openPlayer(scene);
});
$("#dl-all").addEventListener("click", async () => {
  if (!data || !activePart?.audioAvailable) return;
  const button = $("#dl-all");
  button.disabled = true;
  setStatus("Preparing audio download…");
  try {
    const entries = await Promise.all(data.scenes.map(async (scene) => {
      const response = await fetch(audioUrl(scene));
      if (!response.ok) throw new Error(`${scene.id}: HTTP ${response.status}`);
      return { name: `${scene.id}.mp3`, bytes: new Uint8Array(await response.arrayBuffer()) };
    }));
    const url = URL.createObjectURL(makeZip(entries));
    download(url, `${data.part}.zip`);
    setTimeout(() => URL.revokeObjectURL(url), 30000);
    setStatus("Download started.");
  } catch (error) { setStatus(`Download failed: ${error.message}`); }
  finally { button.disabled = false; }
});
const crcTable = (() => { const table = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1; table[n] = c >>> 0; } return table; })();
function crc32(bytes) { let c = 0xffffffff; for (const byte of bytes) c = crcTable[(c ^ byte) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
function makeZip(entries) {
  const encoder = new TextEncoder(), chunks = [], central = []; let offset = 0;
  for (const { name, bytes } of entries) {
    const filename = encoder.encode(name), crc = crc32(bytes), local = new Uint8Array(30 + filename.length), v = new DataView(local.buffer);
    v.setUint32(0, 0x04034b50, true); v.setUint16(4, 20, true); v.setUint32(14, crc, true); v.setUint32(18, bytes.length, true); v.setUint32(22, bytes.length, true); v.setUint16(26, filename.length, true); local.set(filename, 30); chunks.push(local, bytes);
    const directory = new Uint8Array(46 + filename.length), dv = new DataView(directory.buffer);
    dv.setUint32(0, 0x02014b50, true); dv.setUint16(4, 20, true); dv.setUint16(6, 20, true); dv.setUint32(16, crc, true); dv.setUint32(20, bytes.length, true); dv.setUint32(24, bytes.length, true); dv.setUint16(28, filename.length, true); dv.setUint32(42, offset, true); directory.set(filename, 46); central.push(directory); offset += local.length + bytes.length;
  }
  const centralSize = central.reduce((sum, item) => sum + item.length, 0), end = new Uint8Array(22), endView = new DataView(end.buffer);
  endView.setUint32(0, 0x06054b50, true); endView.setUint16(8, entries.length, true); endView.setUint16(10, entries.length, true); endView.setUint32(12, centralSize, true); endView.setUint32(16, offset, true);
  const output = new Uint8Array(offset + centralSize + end.length); let position = 0;
  for (const chunk of [...chunks, ...central, end]) { output.set(chunk, position); position += chunk.length; }
  return new Blob([output], { type: "application/zip" });
}
configureVolumes();
