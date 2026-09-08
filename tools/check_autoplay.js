/* Minimal DOM shim to exercise the REAL app.js autoplay path.
   Asserts: toggle persists, ended-event advances to the next scene WITH audio,
   scenes lacking audio are skipped, and the last scene stops cleanly. */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = "/var/www/yt";

function el(id) {
  return {
    id, _text: "", _attrs: {}, _classes: new Set(), children: [], hidden: true,
    value: "", max: 0, src: "", disabled: false, handlers: {},
    get textContent() { return this._text; },
    set textContent(v) { this._text = String(v); },
    addEventListener(type, fn) { (this.handlers[type] = this.handlers[type] || []).push(fn); },
    fire(type, ev) { (this.handlers[type] || []).forEach((fn) => fn(ev || {})); },
    setAttribute(k, v) { this._attrs[k] = v; },
    getAttribute(k) { return this._attrs[k]; },
    classList: null,
    replaceChildren(...kids) { this.children = kids.flat(); },
    append(...kids) { this.children.push(...kids); },
    prepend() {}, insertBefore() {},
    querySelector() { return null },
    scrollIntoView() { this.scrolled = true; },
    play() { this.playing = true; return Promise.resolve(); },
    pause() { this.playing = false; },
    focus() {},
  };
}

const nodes = new Map();
function get(sel) {
  if (!nodes.has(sel)) {
    const node = el(sel);
    node.classList = {
      toggle: (name, on) => { on ? node._classes.add(name) : node._classes.delete(name); },
      add: (n) => node._classes.add(n),
      contains: (n) => node._classes.has(n),
    };
    nodes.set(sel, node);
  }
  return nodes.get(sel);
}

const store = {};
const ctx = {
  console,
  window: {},
  localStorage: {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
  },
  navigator: { clipboard: { writeText: () => Promise.resolve() } },
  document: {
    querySelector: get,
    createElement: (t) => el(t),
    createDocumentFragment: () => el("frag"),
    body: el("body"),
    title: "",
  },
  URL: { createObjectURL: () => "blob:x", revokeObjectURL() {} },
  Blob: function () {}, TextEncoder: function () { this.encode = (s) => Buffer.from(s); },
  Uint32Array, Uint8Array, DataView, Promise, Number, Math, String, Boolean, JSON, Array,
  setTimeout, fetch: null,
};
ctx.self = ctx;
vm.createContext(ctx);

vm.runInContext(fs.readFileSync(path.join(ROOT, "catalog.js"), "utf8"), ctx);
// fetch(part.file) -> the on-disk data file
ctx.fetch = (url) => {
  const file = path.join(ROOT, String(url).split("?")[0]);
  return Promise.resolve({ ok: true, status: 200, text: () => Promise.resolve(fs.readFileSync(file, "utf8")) });
};

vm.runInContext(fs.readFileSync(path.join(ROOT, "app.js"), "utf8"), ctx);

let failures = 0;
function check(label, got, want) {
  const ok = got === want;
  console.log((ok ? "PASS " : "FAIL ") + label + " -> " + JSON.stringify(got) + (ok ? "" : " (want " + JSON.stringify(want) + ")"));
  if (!ok) failures++;
}

setTimeout(() => {
  const auto = get("#p-auto"), audio = get("#p-audio"), title = get("#p-title");

  check("autoplay defaults off", auto.getAttribute("aria-pressed"), "false");
  auto.fire("click");
  check("toggle on", auto.getAttribute("aria-pressed"), "true");
  check("persisted", store["lotm.autoplayNext"], "1");
  check("styled on", auto.classList.contains("on"), true);

  // Vol.3 Part 2 is loaded by default (catalog order) - pick the part with a
  // known full-audio run so scene order is unambiguous.
  const data = ctx.window.LOTM_DATA;
  const playable = data.scenes.filter((s) => s.real_seconds);
  console.log("loaded part " + data.part + " playable=" + playable.length);

  // Start at the first scene, then let it "end" three times.
  const seq = [];
  ctx.window.__open = null;
  const first = playable[0];
  // openPlayer is not exported; drive it the way the UI does via scene-jump.
  const jump = get("#scene-jump");
  jump.value = String(data.scenes.indexOf(first) + 1);
  jump.fire("change", { target: { value: jump.value } });
  seq.push(title.textContent.split(" ")[0]);
  for (let i = 0; i < 3; i++) {
    audio.fire("ended");
    seq.push(title.textContent.split(" ")[0]);
  }
  check("advanced through scenes", seq.join(","),
        [playable[0].id, playable[1].id, playable[2].id, playable[3].id].join(","));

  // Last scene must stop without throwing / without wrapping around.
  const last = playable[playable.length - 1];
  jump.value = String(data.scenes.indexOf(last) + 1);
  jump.fire("change", { target: { value: jump.value } });
  audio.fire("ended");
  check("stops at last scene", title.textContent.split(" ")[0], last.id);

  // A scene with no audio must be SKIPPED, not played as a broken URL.
  const gapTarget = playable[2];
  const savedSeconds = gapTarget.real_seconds;
  gapTarget.real_seconds = null;            // simulate a not-yet-narrated scene
  jump.value = String(data.scenes.indexOf(playable[1]) + 1);
  jump.fire("change", { target: { value: jump.value } });
  audio.fire("ended");
  check("skips scene without audio", title.textContent.split(" ")[0], playable[3].id);
  gapTarget.real_seconds = savedSeconds;

  auto.fire("click");
  check("toggle off persists", store["lotm.autoplayNext"], "0");
  const before = title.textContent;
  audio.fire("ended");
  check("no advance when off", title.textContent, before);

  process.exit(failures ? 1 : 0);
}, 50);
