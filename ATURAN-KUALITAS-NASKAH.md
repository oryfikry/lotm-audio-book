# ATURAN KUALITAS NASKAH — LOTM Recap (berlaku permanen, mulai 23-Sep-2026)

> Permintaan user (23-Sep-2026): *"Kedepannya saya tidak ingin ada scene/alur yang rusak
> atau cerita/adegan yang tidak lengkap/terputus."*
> Dari insiden nyata: Vol 6 Part 4 ter-deploy dengan kalimat/blok duplikat di scene-002,
> scene-007, dan scene-016 (sisa operasi trim), baru ditemukan saat review user.

## GERBANG WAJIB SEBELUM DEPLOY (semua harus lolos, target NOL)

1. **Chapter coverage** — setiap bab di range part muncul di label scene
   (`audit_part.py --draft ... --chapters ... --keywords ...`): coverage + ids + keywords OK.
2. **Rep-analysis (deteksi pengulangan)** — jalankan `/tmp/rep_analysis.py` (atau setara):
   - Dup kalimat **exact** (normalized) — target **0**
   - **Near-dup** antar-scene, SequenceMatcher ratio > 0.75 — target **0**
   - **10-word shingle** muncul ≥3× — target **0**
   - Catatan: `mechanical_sweep.py` HANYA menangkap dup paragraf ≥300 char + typo;
     TIDAK menangkap dup kalimat. Rep-analysis wajib terpisah.
3. **Glue sweep** — regex `[a-z]\.[A-Z][a-z]` (kalimat menempel karena edit);
   perbaiki dengan `\n\n` sebelum lanjut.
4. **Junction check manual** — baca ulang sambungan antar-paragraf hasil edit/trim:
   tidak boleh ada kalimat menggantung, blok yatim, atau lompatan tanpa jembatan.
5. **Integritas scene** — tiap scene:
   - pembuka: anchor lokasi/POV
   - penutup: 1–2 kalimat bridge ke scene berikut (tidak menggantung di tengah mantra/dialog)
   - semua beat kanon bab sumber terwakili (baca bab PENUH sebelum draft).

## ATURAN SAAT MENGEDIT/TRIM PART YANG SUDAH ADA

- Setiap pass edit/trim → **jalankan ulang seluruh gerbang** (1–5), bukan cuma yang terakhir.
- Trim dengan script terprogram + assert marker (bukan replace bebas); setelah pass,
  baca junction tiap titik potong.
- Duplikat akibat trim biasanya berupa "varian pendek vs varian kaya" — **keep varian
  yang lebih lengkap**, hapus yang pendek, lalu haluskan transisi.

## Diksi (styling berkelanjutan)

- Hindari pengulangan frasa kaku: "Pada saat ini/itu", "Sementara itu" beruntun,
  "mengatakan kepada/melakukan" — ganti dengan kata hubung natural.
- Setiap dialog langsung pakai tanda kutip; tanpa label pembicara.

## AUDIT SAAT REVIEW PART YANG SUDAH DEPLOY (metode, temuan 30-Sep-2026)

Saat user minta "cek part X", jangan cuma jalankan gate mekanis — gate mekanis bisa
**PASS** pada naskah yang isinya bolong. Urutan yang terbukti menemukan cacat nyata:

1. Bandingkan naskah deploy vs draft sumber (`draft.md`) per scene — apakah identik.
2. **Rasio kata per bab**: `kata_scene / kata_bab_sumber`. Normal 0,39–0,43. Bab dengan
   rasio ≤0,30 = ada blok yang hilang (kasus nyata: ch.1354 rasio 0,26 — blok Fors
   [mimpi buruk + Teleportasi ke Dorian + hujan karakteristik] tidak ada di naskah).
3. Cocokkan daftar blok/POV di bab sumber dengan scene (1 bab bisa punya 2–3 blok POV —
   pastikan semuanya ada).
4. `rep_gate.py` + glue sweep + `audit_part.py` + `mechanical_sweep.py` (seperti gerbang
   di atas) — kalau PASS tapi rasio anomali, tetap laporkan.
5. **Cek kualitas `visual_keywords`/`sound_keywords`** (lihat aturan di bawah).

## KUALITAS KEYWORDS (wajib)

`visual_keywords` = frasa pendek **bahasa Inggris** untuk pencarian b-roll/gambar
(mis. `dark cathedral`, `gray fog castle`), `sound_keywords` = ambience/SFX.
DILARANG hasil ekstraksi kata dari narasi: kata fungsi/kata Indonesia (`Aku`, `Di`,
`Dari`, `Bagi`, `Yang`, `Tempat`), duplikat dalam satu scene, atau potongan kalimat.
Kasus nyata 30-Sep: Vol 7 Part 1, 3, 4, 5 keyword-nya kata-sampah dari narasi
(Part 2 benar) — perlu regenerasi per scene sebelum audio dipakai untuk b-roll.

## Referensi insiden

- Vol 6 P4 fix commit `309bb84` (23-Sep): scene-002/007/016 dup dihapus, 10.935 kata ≈75,4 mnt.
- Vol 6 P5 `f719f55` — lolos rep-analysis dengan 0 temuan (contoh gate bekerja).
- Tool rep-analysis versi lengkap: `/tmp/rep_analysis.py` (dup exact + near-dup + shingle).
