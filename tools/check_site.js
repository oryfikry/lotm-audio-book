/* Load catalog.js + every data/<part>.js in a VM and report scene/audio counts.
   Usage: node /var/www/yt/tools/check_site.js
   Exits non-zero if a data file is missing or has no scenes array. */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const ctx = { window: {}, document: { querySelector: () => null }, console };
vm.createContext(ctx);

function load(file) {
  vm.runInContext(fs.readFileSync(file, "utf8"), ctx);
}

load(path.join(ROOT, "catalog.js"));
const catalog = ctx.window.LOTM_CATALOG;
if (!Array.isArray(catalog)) {
  console.error("catalog.js did not define window.LOTM_CATALOG");
  process.exit(1);
}

let failures = 0;
for (const volume of catalog) {
  for (const part of volume.parts) {
    const file = path.join(ROOT, part.file.split("?")[0]);
    if (!fs.existsSync(file)) {
      console.error(volume.id + " " + part.id + " MISSING " + file);
      failures++;
      continue;
    }
    load(file);
    const data = ctx.window.LOTM_DATA;
    if (!data || !Array.isArray(data.scenes)) {
      console.error(volume.id + " " + part.id + " invalid scene data");
      failures++;
      continue;
    }
    const withAudio = data.scenes.filter((scene) => scene.real_seconds).length;
    console.log([
      volume.id,
      part.id,
      "scenes=" + data.scenes.length,
      "withAudio=" + withAudio,
      "audioAvailable=" + part.audioAvailable,
      "voice=" + (part.voice || data.voice || "?"),
      JSON.stringify(part.availability),
    ].join(" "));
    if (part.audioAvailable && withAudio === 0) {
      console.error("  ^ audioAvailable true but no scene has audio");
      failures++;
    }
  }
}
process.exit(failures ? 1 : 0);
