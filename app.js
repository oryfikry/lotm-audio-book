/* LOTM Vol 1 recap browser — vanilla JS, zero dependencies. */
"use strict";
const D = window.LOTM_DATA;
const $ = (s) => document.querySelector(s);
const fmt = (s) => {
  if (s == null) return "–";
  const m = Math.floor(s / 60), r = Math.round(s % 60);
  return m ? `${m}:${String(r).padStart(2, "0")}` : `0:${String(r).padStart(2, "0")}`;
};
const audioUrl = (s) => `audio/${s.audio_file.split("/").pop()}`;
const list = $("#list");

$("#meta").textContent = `${D.scenes.length} scenes · ${D.totalMinutes} min · voice ${D.voice}`;
function render(filter = "") {
  const f = filter.toLowerCase().trim();
  list.replaceChildren(...D.scenes.filter((s) =>
    !f || s.id.includes(f) || s.narration.toLowerCase().includes(f) ||
    (s.visual_keywords || []).concat(s.sound_keywords || []).some((k) => k.toLowerCase().includes(f))
  ).map((s) => {
    const c = document.createElement("article");
    c.className = "card";
    c.innerHTML = `<div class="card-head"><h2>${s.id}</h2><span class="dur">${fmt(s.real_seconds)}</span></div>
      <p class="narr"></p><div class="kw"></div><div class="actions">
      <button data-a="play">▶ Play</button><button data-a="download">⬇ mp3</button>
      <button data-a="copy-narr">⧉ narration</button><button data-a="copy-kw">⧉ keywords</button></div>`;
    c.querySelector(".narr").textContent = s.narration;
    const kw = c.querySelector(".kw");
    for (const k of s.visual_keywords || []) { const e = document.createElement("span"); e.className = "v"; e.textContent = `👁 ${k}`; kw.append(e); }
    for (const k of s.sound_keywords || []) { const e = document.createElement("span"); e.className = "s"; e.textContent = `🔊 ${k}`; kw.append(e); }
    c.querySelector('[data-a="play"]').onclick = () => openPlayer(s);
    c.querySelector('[data-a="download"]').onclick = () => download(audioUrl(s), `${s.id}.mp3`);
    c.querySelector('[data-a="copy-narr"]').onclick = () => copy(s.narration, "narration");
    c.querySelector('[data-a="copy-kw"]').onclick = () => copy(`[visual] ${(s.visual_keywords || []).join(", ")}\n[sfx] ${(s.sound_keywords || []).join(", ")}`, "keywords");
    return c;
  }));
}
function flash(msg) { const el = $("#status"); el.textContent = msg; setTimeout(() => { if (el.textContent === msg) el.textContent = ""; }, 2200); }
async function copy(text, what) { try { await navigator.clipboard.writeText(text); flash(`${what} ter-copy`); } catch { flash("copy gagal"); } }
function download(url, name) { const a = document.createElement("a"); a.href = url; a.download = name; document.body.append(a); a.click(); a.remove(); }

const player = $("#player"), pAudio = $("#p-audio");
function openPlayer(s) { $("#p-title").textContent = `${s.id} · ${fmt(s.real_seconds)}`; pAudio.src = audioUrl(s); player.hidden = false; pAudio.play().catch(() => {}); }
$("#p-close").onclick = () => { pAudio.pause(); player.hidden = true; };
$("#q").addEventListener("input", (e) => render(e.target.value));
$("#sort").addEventListener("change", (e) => { const s = D.scenes[Number(e.target.value) - 1]; if (s) openPlayer(s); });

$("#dl-all").onclick = async () => {
  const button = $("#dl-all"); button.disabled = true; flash("menyiapkan zip…");
  try {
    const entries = await Promise.all(D.scenes.map(async (s) => {
      const r = await fetch(audioUrl(s)); if (!r.ok) throw new Error(`${s.id}: HTTP ${r.status}`);
      return { name: `${s.id}.mp3`, data: new Uint8Array(await r.arrayBuffer()) };
    }));
    const blob = makeZip(entries); const url = URL.createObjectURL(blob); download(url, `${D.part}.zip`); setTimeout(() => URL.revokeObjectURL(url), 30000); flash("download dimulai");
  } catch (e) { flash(`zip gagal: ${e.message}`); } finally { button.disabled = false; }
};
const crcTable = (() => { const t = new Uint32Array(256); for (let n=0;n<256;n++) { let c=n; for(let k=0;k<8;k++) c=(c&1)?0xedb88320^(c>>>1):c>>>1; t[n]=c>>>0; } return t; })();
function crc32(bytes) { let c=0xffffffff; for (const b of bytes) c=crcTable[(c^b)&255]^(c>>>8); return (c^0xffffffff)>>>0; }
function makeZip(entries) {
  const enc = new TextEncoder(), chunks = [], central = []; let offset = 0;
  for (const {name, data} of entries) {
    const n=enc.encode(name), crc=crc32(data), h=new Uint8Array(30+n.length), v=new DataView(h.buffer);
    v.setUint32(0,0x04034b50,true); v.setUint16(4,20,true); v.setUint32(14,crc,true); v.setUint32(18,data.length,true); v.setUint32(22,data.length,true); v.setUint16(26,n.length,true); h.set(n,30); chunks.push(h,data);
    const c=new Uint8Array(46+n.length), cv=new DataView(c.buffer); cv.setUint32(0,0x02014b50,true); cv.setUint16(4,20,true); cv.setUint16(6,20,true); cv.setUint32(16,crc,true); cv.setUint32(20,data.length,true); cv.setUint32(24,data.length,true); cv.setUint16(28,n.length,true); cv.setUint32(42,offset,true); c.set(n,46); central.push(c); offset += h.length + data.length;
  }
  const cdSize=central.reduce((n,c)=>n+c.length,0), end=new Uint8Array(22), ev=new DataView(end.buffer); ev.setUint32(0,0x06054b50,true); ev.setUint16(8,entries.length,true); ev.setUint16(10,entries.length,true); ev.setUint32(12,cdSize,true); ev.setUint32(16,offset,true);
  const out=new Uint8Array(offset+cdSize+22); let pos=0; for(const c of [...chunks,...central,end]) { out.set(c,pos); pos+=c.length; } return new Blob([out],{type:"application/zip"});
}
render();
