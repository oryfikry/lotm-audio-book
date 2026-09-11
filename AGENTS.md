# AGENTS.md — Konvensi Produksi LOTM Recap (yt.oryfikry.my.id)

## Sumber Kanon (WAJIB)
- Teks utama: EPUB Webnovel lengkap 1.430 bab di `/tmp/lotm_webnovel.epub`, ekstrak `/tmp/lotm_wn/EPUB/text/`.
- **Akses bab WAJIB via `/tmp/wn_map.json`** (peta chapter → nama file; penamaan file drift kumulatif, jangan menebak).
- Ejaan/istilah Indonesia otoritatif: EPUB resmi Indonesia di `/tmp/lotm_epub/2/OOBPS/Text/` (ch. 801–1000) via `/tmp/extract_ch.py`.
- Jangan pernah menulis detail plot dari ingatan — selalu verifikasi ke sumber sebelum menulis scene (baca awal + akhir + tengah bab jika perlu).

## Struktur 15-Part Vol 4 (blueprint final `/tmp/vol4_parts_15.md`)
1. Kembalinya ke Backlund & Debut Dantès — ch. 733–746
2. Sang Butler, Buku Harian & Misa Agung — ch. 747–760
3. Nation Reestablishment Society — ch. 761–774
4. Pembunuhan Karakter & Akhir Buku Harian — ch. 775–788
5. Tamu Tak Terduga & Tim Arkeologi — ch. 789–802
6. Ekspedisi Pulau: Kekuatan Tyrant — ch. 803–814
7. Naskah Ilmiah & Pesta Malam — ch. 815–828
8. Infiltrasi Gudang Jacob — ch. 829–842
9. Formula Bizarro Sorcerer — ch. 843–856
10. Bisnis Baru & Laporan ke Atasan — ch. 857–870
11. Mumi & Pentas Demigod — ch. 871–886
12. Peringatan & Probe Daly — ch. 887–900
13. Peringatan Leonard & Jalur Makam — ch.901–914
14. Kota Calderón & Tubuh Jiwa Sejati — ch. 915–929
15. Pentas Akhir: Revival Square — ch. 930–946

## Aturan Naskah (kesepakatan user)
- **Kronologi: tambahkan cerita awal karakter/peristiwa di scene pertama kemunculannya — JANGAN memotong scene penting.**
- **AUDIT WAJIB SEBELUM DEPLOY:** setiap scene harus diverifikasi bab-per-bab ke sumber EPUB (baca bab penuh yang menjadi dasar scene, bukan hanya awal/akhir). Scene pembunuhan/battle/transaksi WAJIB dicek mekanismenya (item yang dipakai, urutan kejadian, angka). Kesalahan terbesar di masa lalu terjadi karena scene ditulis dari ingatan tanpa membaca bab penuh (contoh: scene 6–8 Part 4 — Paper Angel terlewat, mekanisme kontrol senyap & pelarian salah).
- Target 30–60 menit per part (@145 kata/menit); battle/momen kanon diberi cakupan lebih tinggi; potongan di batas arc.
- Bahasa Indonesia, gaya narasi recap: rekap → detail peristiwa → analisis kanon (jelaskan "kenapa").
- Naskah markdown: `## scene-NNN (JUDUL — ch.NNN)` + paragraf narasi; scene terakhir = outro + teaser part berikutnya; scene "CATATAN PRODUKSI" dibuang saat konversi.
- Konversi ke format data situs: `window.LOTM_DATA = {part, title, voice, totalMinutes, scenes[{id, narration, estimated_seconds, real_seconds, visual_keywords, sound_keywords, audio_file}]}`; audio_file = `scene-XXX.mp3`.

## Deploy (VPS, webroot `/var/www/yt`)
1. Backup file lama ke `/var/www/yt/.rollback-<tanggal>-<nama>/`.
2. Tulis file data ke `/var/www/yt/data/lotm-vol4-recap-N.js`.
3. Tambah entri di `catalog.js` (id, label, file dengan `?v=<tanggal>-<nama>-<N>`, description, voice, audioAvailable: false, availability "Script ready · audio pending"). **Gunakan Python replace, jangan patch tool dengan string panjang (pernah terpotong & merusak sintaks).**
4. Cache bust: `sed -i 's/?v=<lama>/<baru>/g' /var/www/yt/index.html`.
5. Verifikasi: `node --check catalog.js`, `curl` file data → HTTP 200.
6. `git add` + commit pesan deskriptif.

## Kebijakan Cache (config nginx `deploy/nginx-yt.oryfikry.my.id.conf`, diterapkan 2026-09-11)
- `/data/*` dan `catalog.js` → **`no-store`** (tidak pernah di-cache browser/Cloudflare; perubahan deploy langsung terlihat).
- `index.html` → `max-age=300` (revalidate 5 menit).
- `app.js`, `style.css`, audio, gambar → `max-age=31536000, immutable` (aman karena pakai `?v=` di index.html; file konten tak pernah diubah in-place).
- **Dampak praktis:** sejak 2026-09-11, deploy file data/catalog TIDAK perlu bust `?v=` lagi — file lama yang masih ter-cache di edge Cloudflare akan kedaluwarsa sendiri maks. 4 jam (cache lama dibuat sebelum kebijakan baru). Untuk deploy mendatang, tetap naikkan `?v=` di index.html hanya saat mengubah `app.js`/`style.css`.
- Objek Cloudflare lama (dibuat sebelum kebijakan) akan habis masa simpannya sendiri (`max-age=14400` lama); tidak ada token API Cloudflare di VPS untuk purge manual — jika butuh purge segera, lakukan dari dashboard Cloudflare → Caching → Purge Everything, atau minta owner menambahkan token.
- Backup config sebelum perubahan: `/etc/nginx/yt.oryfikry.my.id.bak-20260911-cache` (versi asli).

## Kesalahan Lalu (jangan diulang)
- Trissy muncul pertama di ch. 773–774 (Part 3): tertangkap bukan oleh Klein langsung — ia bersembunyi di gorong-gorong dekat rumah keluarga Macht; Walter (valet Dantès) membri makanan; Senor (marionette Wraith) yang menghadang & berunding; Hazel nyaris jadi korban penyakitnya saat menyusuri gorong-gorong. William Sikes disiksa-bunuh Trissy untuk nama Viscount Stratford (kapten pengawal kerajaan, pembunuh Pangeran Edessak yang juga di bawah perintah orang lain). Detail di scene-002 Part 4 pernah salah (Trissy seolah sudah tertangkap + "Walter marionette") — sudah dikoreksi.
- Lilith's Ring = hadiah Emlyn dari Odora (jangan salah tulis nama).
- Formula Bizarro Sorcerer diberikan Zaratul, BUKAN Queen Mystic (itu plot Vol 5).
