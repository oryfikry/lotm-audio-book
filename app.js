/* LOTM recap library — volume/part navigation with audio-safe planning mode. */
"use strict";
const $ = (selector) => document.querySelector(selector);
const catalog = window.LOTM_CATALOG || [];
const cache = new Map();
const STATE_KEY = "lotm.library.state";
const savedState = (() => {
  try { return JSON.parse(localStorage.getItem(STATE_KEY)) || {}; }
  catch { return {}; }
})();
let activeVolume = null;
let activePart = null;
let data = null;
let restoredSceneId = savedState.sceneId || null;
let stateScrollTimer = null;

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
  activeVolume = catalog.find((volume) => volume.id === savedState.volumeId) || catalog[0];
  selectOptions($("#volume"), catalog, activeVolume.id, (volume) => volume.label);
  const savedPart = activeVolume.parts.find((part) => part.id === savedState.partId);
  configureParts(savedPart?.id || activeVolume.parts[0]?.id);
}
function configureParts(partId) {
  activePart = currentParts().find((part) => part.id === partId) || currentParts()[0];
  selectOptions($("#part"), currentParts(), activePart?.id, (part) => part.label);
  saveState();
  if (activePart) loadPart(activePart).catch(showLoadError);
}
function saveState(sceneId = restoredSceneId) {
  if (!activeVolume || !activePart) return;
  localStorage.setItem(STATE_KEY, JSON.stringify({
    volumeId: activeVolume.id,
    partId: activePart.id,
    sceneId: sceneId || null
  }));
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
  render();
  requestAnimationFrame(restoreScene);
}
function restoreScene() {
  if (!data) return;
  const scene = data.scenes.find((item) => item.id === restoredSceneId) || data.scenes[0];
  if (!scene) return;
  restoredSceneId = scene.id;
  $("#scene-jump").value = String(data.scenes.indexOf(scene) + 1);
  const card = [...$("#list").children].find((element) => element.querySelector("h3")?.textContent === scene.id);
  if (card) card.scrollIntoView({ behavior: "auto", block: "center" });
  saveState(scene.id);
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
  const withAudio = data.scenes.filter((scene) => scene.real_seconds).length;
  setStatus(`${data.scenes.length} scenes · ${activePart.audioAvailable ? `audio ${withAudio}/${data.scenes.length}` : "audio not generated"}`);
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
    const sceneHasAudio = Boolean(activePart.audioAvailable && scene.real_seconds);
    if (sceneHasAudio) {
      actions.prepend(makeButton("▶ Play", () => openPlayer(scene)));
    }
    card.append(actions);
    if (!sceneHasAudio) {
      const pending = document.createElement("p");
      pending.className = "pending-note";
      pending.textContent = "Audio pending — scene script and production keywords are ready.";
      card.append(pending);
    }
    fragment.append(card);
  }
  $("#list").replaceChildren(fragment);
}
function rememberVisibleScene() {
  if (!data || !$("#list").children.length || $("#q").value.trim()) return;
  const center = window.innerHeight / 2;
  let closest = null;
  let distance = Infinity;
  for (const card of $("#list").children) {
    const rect = card.getBoundingClientRect();
    const current = Math.abs((rect.top + rect.bottom) / 2 - center);
    if (current < distance) { distance = current; closest = card; }
  }
  const id = closest?.querySelector("h3")?.textContent;
  if (id) { restoredSceneId = id; saveState(id); }
}
async function copy(text, success) {
  try { await navigator.clipboard.writeText(text); setStatus(success); }
  catch { setStatus("Copy failed — please select the text manually."); }
}
function audioUrl(scene) {
  const base = activePart?.audioBase || `audio/${data?.part || activePart?.id || ""}`;
  return `${base}/${scene.audio_file.split("/").pop()}`;
}
const player = $("#player");
const pAudio = $("#p-audio");
const speedSelect = $("#p-speed");
const SPEED_KEY = "lotm.player.speed";
const speedSaved = parseFloat(localStorage.getItem(SPEED_KEY));
pAudio.playbackRate = [0.5, 0.75, 1, 1.25].includes(speedSaved) ? speedSaved : 1;
speedSelect.value = String(pAudio.playbackRate);
speedSelect.addEventListener("change", () => {
  const rate = parseFloat(speedSelect.value);
  pAudio.playbackRate = rate;
  try { localStorage.setItem(SPEED_KEY, String(rate)); } catch {}
  setStatus(`Kecepatan putar: ${rate}×`);
});
const autoButton = $("#p-auto");
const AUTOPLAY_KEY = "lotm.autoplayNext";
let autoplayNext = localStorage.getItem(AUTOPLAY_KEY) === "1";
let playingId = null;

function paintAutoButton() {
  autoButton.classList.toggle("on", autoplayNext);
  autoButton.setAttribute("aria-pressed", String(autoplayNext));
  const state = autoplayNext ? "on" : "off";
  autoButton.title = `Autoplay next scene: ${state}`;
  autoButton.setAttribute("aria-label", `Autoplay next scene: ${state}`);
}

/* Next scene that actually has audio, in the order currently rendered. */
function nextPlayable(fromId) {
  if (!data) return null;
  const pool = data.scenes.filter((scene) => scene.real_seconds);
  const index = pool.findIndex((scene) => scene.id === fromId);
  return index === -1 ? null : pool[index + 1] || null;
}

function openPlayer(scene) {
  playingId = scene.id;
  $("#p-title").textContent = `${scene.id} · ${fmt(scene.real_seconds)}`;
  pAudio.src = audioUrl(scene);
  player.hidden = false;
  pAudio.play().catch(() => {});
}

autoButton.addEventListener("click", () => {
  autoplayNext = !autoplayNext;
  localStorage.setItem(AUTOPLAY_KEY, autoplayNext ? "1" : "0");
  paintAutoButton();
  setStatus(autoplayNext ? "Autoplay next scene: on" : "Autoplay next scene: off");
});

pAudio.addEventListener("ended", () => {
  if (!autoplayNext) return;
  const next = nextPlayable(playingId);
  if (!next) {
    setStatus("Autoplay finished — last scene with audio.");
    return;
  }
  openPlayer(next);
  const card = [...$("#list").children]
    .find((element) => element.querySelector("h3")?.textContent === next.id);
  if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
});

paintAutoButton();
$("#p-close").addEventListener("click", () => { pAudio.pause(); player.hidden = true; playingId = null; });
$("#volume").addEventListener("change", (event) => {
  activeVolume = catalog.find((volume) => volume.id === event.target.value);
  restoredSceneId = null;
  configureParts(activeVolume?.parts[0]?.id);
});
$("#part").addEventListener("change", (event) => { restoredSceneId = null; configureParts(event.target.value); });
$("#q").addEventListener("input", render);
$("#scene-jump").addEventListener("change", (event) => {
  const scene = data?.scenes[Number(event.target.value) - 1];
  if (!scene) return;
  const card = [...$("#list").children].find((element) => element.querySelector("h3")?.textContent === scene.id);
  if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
  restoredSceneId = scene.id;
  saveState(scene.id);
  if (activePart?.audioAvailable) openPlayer(scene);
});
window.addEventListener("scroll", () => {
  if (stateScrollTimer) return;
  stateScrollTimer = setTimeout(() => { stateScrollTimer = null; rememberVisibleScene(); }, 180);
}, { passive: true });
const backToTop = $("#back-to-top");
window.addEventListener("scroll", () => backToTop.classList.toggle("visible", window.scrollY > 500), { passive: true });
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
configureVolumes();

/* Theme toggle (dark/light) with persistence. */
(() => {
  const KEY = "lotm.library.theme";
  const root = document.documentElement;
  const button = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");
  const apply = (theme) => {
    root.dataset.theme = theme;
    icon.textContent = theme === "light" ? "☾" : "☀";
    button.title = theme === "light" ? "Ganti ke mode gelap" : "Ganti ke mode terang";
    button.setAttribute("aria-label", button.title);
  };
  let theme = null;
  try { theme = localStorage.getItem(KEY); } catch {}
  if (!theme) {
    theme = (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) ? "light" : "dark";
  }
  apply(theme);
  button.addEventListener("click", () => {
    theme = root.dataset.theme === "light" ? "dark" : "light";
    try { localStorage.setItem(KEY, theme); } catch {}
    apply(theme);
  });
})();
