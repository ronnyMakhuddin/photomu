# Bedah Desain UI – Kiosk Photobooth (dari foto referensi)

## 1. Karakter & Gaya Desain
**Editorial Minimalist / Heritage Newspaper.** Layar kiosk berlatar kertas abu muda bertekstur sketsa kota tua, dibagi garis tipis seperti tata letak majalah. Tipografi geometris tipis berukuran raksasa ("SCAN THE (QR CODE)"), dipadukan hasil cetak bergaya koran klasik. Kesan: nostalgia, elegan, tenang; target: wisatawan kawasan heritage, mudah dipakai sentuh.

## 2. Palet Warna & Token
| Token | HEX | Tailwind terdekat | Pemakaian |
|---|---|---|---|
| Paper (BG utama) | `#ECEBE6` | `stone-200` | latar layar |
| Paper terang | `#F6F5F1` | `stone-50` | kartu, area kertas |
| Ink (heading) | `#1E2235` | `slate-900` | judul besar, teks |
| Navy (aksen/CTA) | `#1B2440` | `indigo-950` | tombol "MULAI LAGI", tab aktif LIVE |
| Garis | `#2A2A2A` | `neutral-800` | garis grid editorial 1–2px |
| Muted | `#6B6A66` | `stone-500` | "Tunggu sebentar untuk hasil print" |
| Aksen merah koran | `#7A1F1F` / `#9E2B25` | `red-900` | drop cap, judul rubrik |
| Kertas koran | `#F2F1EC` | `stone-100` | latar template cetak |

## 3. Tipografi & Hierarki
- **Display UI**: *Jost* 300 (pengganti Futura/Josefin pada referensi), 96–150px, line-height 0.98, huruf kapital.
- **Label/tombol**: Jost 400–500, 14–20px, letter-spacing 0.12em, kapital.
- **Cetakan koran**: *Playfair Display* 700/900 untuk headline (kapital, letter-spacing 3px), *Libre Baskerville* 400/italic untuk isi & tanggal.
- **Arab (Pesantren)**: *Amiri* 700.

## 4. Struktur Layout & Navigasi
- Kiosk layar penuh, tanpa navbar; navigasi linear per langkah (01/03 → 03/03) dengan bilah aksi bawah: tombol outline "← KEMBALI" kiri, tombol navy "LANJUT →" kanan.
- Layar hasil: kiri = pratinjau cetak + tab LIVE/FOTO/GIF; kanan = "Pindai Kode QR", kotak QR putih, catatan cetak, tombol MULAI LAGI. Bawah = marquee tagline booth (mis. "PHOTOBOX SMK MAMBA'UL ULUM MOJOKERTO").
- Padding kontainer `clamp(16px, 3vw, 48px)`, gap 14–28px. Mendukung monitor potret (kiosk vertikal) & lanskap.

## 5. Bedah Komponen
- **Judul raksasa** dengan kurung "(QR CODE)" → dipakai "SENTUH UNTUK (MULAI)" & "PINDAI KODE (QR)".
- **Garis grid editorial**: 1 garis vertikal ±28% lebar, beberapa garis horizontal penuh.
- **Kartu template**: putih, `rounded-md` (6px), `shadow-sm`, terpilih = border navy 2px + naik 4px.
- **Tombol utama**: navy solid, `rounded` 4px, tinggi ≥58px (ramah sentuh), ikon panah →.
- **Tab LIVE/FOTO/GIF**: outline 1.5px, aktif = navy solid.
- **Kotak QR**: putih, padding 18px, bayangan halus.
- **Hasil cetak (koran)**: baris meta (tanggal • edisi • lokasi), garis ganda, headline 2 baris, baris poin, kolom teks + foto utama, 3 foto kecil, footer "MOMEN INDAH / Page 1", cap pos melingkar.

## 6. Detail Visual & Interaksi
- Radius kecil (3–6px), bayangan lembut `0 14px 40px rgba(0,0,0,.22)` pada kertas hasil.
- Transisi layar fade + geser 8px (350ms); hitung mundur angka besar Jost 200 dengan animasi "pop"; flash putih 0,5 dtk saat jepret; titik merah berkedip "VIDEO LANGSUNG".
- Ikon: panah teks Unicode / SVG garis (gaya Lucide) – tanpa library tambahan.

## 7. Design System Blueprint (untuk Webapp Builder)
```
STYLE: editorial minimalist heritage, kiosk touch-first, full-screen.
COLORS: bg #ECEBE6, surface #FFFFFF, ink #1E2235, primary #1B2440, line #2A2A2A, muted #6B6A66, accent #9E2B25.
FONTS: Jost 300 display uppercase (96-150px, lh .98); Jost 400 labels (letter-spacing .12em);
       Playfair Display 700/900 + Libre Baskerville for printed newspaper templates; Amiri for Arabic.
LAYOUT: no navbar; step header (step no. | big title | hint) with 1px bottom rule; bottom action bar
        (ghost "← KEMBALI" left, navy "LANJUT →" right); thin editorial grid lines in background;
        scrolling marquee footer with booth tagline.
COMPONENTS: navy CTA min-h 58px radius 4px with → arrow; outline tabs (active navy);
            white template cards radius 6px; white QR box with soft shadow; print preview with drop shadow.
MOTION: fade-in screens, countdown pop, white flash on capture, blinking red REC dot.
```
