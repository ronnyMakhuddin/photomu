# Photobooth Self-Service (Vercel + Neon)

Aplikasi kiosk photobooth: kamera langsung → pilih template → pilih filter → hitung mundur & foto beberapa kali → pratinjau → cetak 4R + QR code ke halaman hasil (unduh Foto, GIF, Video Live).

## Alur
1. **Sambutan** – "SENTUH UNTUK (MULAI)" (bisa juga tombol fisik: Enter/Spasi = tombol utama).
2. **Pilih Template** – Heritage Bajang Ratu, Wisata Majapahit, Pesantren, Wisuda Sekolah, Photo Strip Klasik.
3. **Pilih Filter** – Normal, Hitam Putih, Sepia, Vintage, Hangat, Sejuk, Drama, Pudar (pratinjau langsung di tiap tombol).
4. **Sesi Foto** – hitung mundur 3-2-1, flash, jumlah foto sesuai template. Selama sesi direkam **video langsung** (sudah berfilter).
5. **Pratinjau** – Ulangi Foto / Cetak & Simpan (otomatis lanjut 30 dtk).
6. **Hasil** – tab LIVE / FOTO / GIF, QR "Pindai Kode QR", "Tunggu sebentar untuk hasil print", tombol MULAI LAGI (otomatis kembali ke awal 90 dtk).
7. **Halaman HP** `/picture/<id>` – lihat & unduh Foto / GIF / Video, tombol Bagikan, info masa kedaluwarsa.

## Arsitektur
| Bagian | Teknologi |
|---|---|
| Kiosk & halaman hasil | HTML/CSS/JS murni di `public/` (tanpa build) |
| API | Vercel Functions `api/*.js` (Node 20+) |
| Database | **Neon Postgres** – tabel `sessions` (dibuat otomatis) |
| File foto/GIF/video | **Vercel Blob** (Neon tidak cocok untuk file besar) |
| Pembersihan | Vercel Cron harian `/api/cleanup` menghapus data > `RETENTION_DAYS` |

Endpoint: `GET /api/health`, `POST /api/upload?id&kind=photo|gif|video`, `POST/GET /api/session`, `GET /api/cleanup`.

## Deploy ke Vercel (±10 menit)
1. Push folder ini ke repo GitHub, lalu **Import Project** di vercel.com (Framework Preset: *Other*, tanpa build command).
2. Di proyek Vercel → **Storage**:
   - **Create Database → Neon** (Marketplace) → hubungkan ke proyek. `DATABASE_URL` terisi otomatis.
   - **Create → Blob** → hubungkan ke proyek. `BLOB_READ_WRITE_TOKEN` terisi otomatis.
3. (Opsional) Environment Variables: `RETENTION_DAYS=7`, `KIOSK_KEY=<rahasia>` (isi juga `kioskKey` di `public/js/config.js`), `CRON_SECRET=<acak>`.
4. Redeploy. Buka `https://<proyek>.vercel.app/api/health` → harus `{"ok":true,...}`.
5. Buka `https://<proyek>.vercel.app/` di komputer kiosk.

> Sudah punya database Neon sendiri? Cukup isi `DATABASE_URL` dari dashboard Neon. Tabel dibuat otomatis (atau jalankan `schema.sql`).

## Menjalankan kiosk (Windows/Chrome)
Buat shortcut Chrome:
```
chrome.exe --kiosk --kiosk-printing --autoplay-policy=no-user-gesture-required https://<proyek>.vercel.app/
```
- `--kiosk` = layar penuh tanpa tombol browser.
- `--kiosk-printing` = langsung cetak ke printer default tanpa dialog. Set printer foto (mis. DNP/Epson) sebagai default, kertas 4x6 inci, tanpa margin.
- Izinkan kamera sekali saat pertama dibuka.

## Mode demo (tanpa server)
`npm run demo` (atau server statis apa pun di folder `public/`) → aplikasi jalan penuh, hasil disimpan di IndexedDB browser dan QR mengarah ke `hasil.html?local=1` (hanya bisa dibuka di perangkat yang sama). Cocok untuk mencoba tampilan sebelum deploy.

## Kustomisasi
- **Nama booth, lokasi, logo, hitung mundur, auto-print, cermin**: `public/js/config.js` (logo ada di `public/img/`, urutan `[kiri, kanan]`).
- **Teks/warna template** (judul koran, nama pondok, nama sekolah, dll.): `public/js/templates.js` → array `TEMPLATES`.
- **Template baru**: salin objek yang ada (layout `newspaper`, `arch`, `hero`, `strip`), atau pakai layout `overlay` dengan bingkai PNG 1200×1800 milik sendiri (taruh di `public/frames/`, tentukan kotak foto `rects`). Contoh ada di komentar `templates.js`.
- **Filter baru**: tambah di `FILTERS` (string CSS filter, mis. `'grayscale(1) contrast(1.3)'`).
- Statistik: `SELECT date(created_at), template, count(*) FROM sessions GROUP BY 1,2;`

## Catatan
- Gunakan **Chrome/Edge** di kiosk (filter kanvas belum didukung penuh Safari). Halaman hasil di HP berjalan di semua browser.
- Video direkam ±1,2 Mbps, maks 25 dtk, agar < 4 MB (batas unggah fungsi Vercel 4,5 MB). Chrome terbaru merekam MP4 (bisa diputar di iPhone); versi lama merekam WebM.
- Tanpa `KIOSK_KEY`, siapa pun yang tahu URL API bisa mengunggah; isi kunci itu untuk pemakaian publik.
