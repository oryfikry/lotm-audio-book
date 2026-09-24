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

## Referensi insiden

- Vol 6 P4 fix commit `309bb84` (23-Sep): scene-002/007/016 dup dihapus, 10.935 kata ≈75,4 mnt.
- Vol 6 P5 `f719f55` — lolos rep-analysis dengan 0 temuan (contoh gate bekerja).
- Tool rep-analysis versi lengkap: `/tmp/rep_analysis.py` (dup exact + near-dup + shingle).
