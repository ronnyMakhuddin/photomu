// =====================================================================
//  TEMPLATE & FILTER PHOTOBOOTH
//  Ubah teks/warna di sini untuk menyesuaikan acara. Tambah template baru
//  dengan menyalin salah satu objek di TEMPLATES.
//  Ukuran cetak: 1200 x 1800 px (kertas 4R / 4x6 inci, 300 dpi)
// =====================================================================

export const PRINT_W = 1200;
export const PRINT_H = 1800;

export const FILTERS = [
  { id: 'normal',  name: 'Normal',      css: 'none' },
  { id: 'bw',      name: 'Hitam Putih', css: 'grayscale(1) contrast(1.12)' },
  { id: 'sepia',   name: 'Sepia',       css: 'sepia(0.9) contrast(1.05) brightness(1.03)' },
  { id: 'vintage', name: 'Vintage',     css: 'sepia(0.35) saturate(0.8) contrast(1.1) brightness(1.05) hue-rotate(-8deg)' },
  { id: 'warm',    name: 'Hangat',      css: 'saturate(1.25) sepia(0.18) brightness(1.04)' },
  { id: 'cool',    name: 'Sejuk',       css: 'saturate(0.9) hue-rotate(12deg) brightness(1.03) contrast(1.02)' },
  { id: 'drama',   name: 'Drama',       css: 'grayscale(0.25) contrast(1.4) brightness(0.95)' },
  { id: 'fade',    name: 'Pudar',       css: 'contrast(0.85) brightness(1.1) saturate(0.7)' },
];

export const TEMPLATES = [
  {
    id: 'heritage',
    name: 'Heritage Bajang Ratu',
    desc: 'Koran klasik Candi Bajang Ratu, 1 foto utama + 3 foto kecil',
    layout: 'newspaper',
    slots: 4,
    defaultFilter: 'normal',
    palette: { paper: '#F2F1EC', ink: '#1E1E1E', accent: '#7A1F1F', muted: '#55524A' },
    edition: 'Edisi Spesial Heritage',
    headline: ['JEJAK SEJARAH', 'DI GERBANG BAJANG RATU'],
    bullets: ['Candi Bajang Ratu', 'Situs Trowulan, Kabupaten Mojokerto'],
    body: [
      'Berdiri anggun di tanah Trowulan, Candi Bajang Ratu adalah gapura paduraksa peninggalan Majapahit dari abad ke-14. Susunan bata merahnya yang menjulang ramping dihiasi relief kala dan cerita Sri Tanjung, menyimpan kisah kejayaan kerajaan besar Nusantara.',
      'Bukan sekadar tempat berfoto, gerbang bersejarah ini adalah ruang untuk mengenal dan merayakan warisan leluhur. Selamat menikmati teduhnya taman candi dan kenangan manis yang tercipta di jantung sejarah Mojokerto.',
    ],
    sideTitle: 'Kabar Hari Ini',
    sideText: 'Satu bingkai, seribu cerita. Terima kasih telah mengabadikan momen bersama kami. Simpan, bagikan, dan kembalilah lagi untuk menulis halaman berikutnya.',
    emblem: 'stamp',
    footer: ['MOMEN INDAH', 'Page 1'],
  },
  {
    id: 'majapahit',
    name: 'Wisata Majapahit',
    desc: 'Koran kerajaan bernuansa bata merah Trowulan',
    layout: 'newspaper',
    slots: 4,
    defaultFilter: 'warm',
    palette: { paper: '#F3E6D3', ink: '#2A1A12', accent: '#9C3D22', muted: '#6B4A36' },
    masthead: 'KABAR MAJAPAHIT',
    edition: 'Edisi Wisata Sejarah',
    headline: ['JEJAK KEJAYAAN', 'DI BUMI TROWULAN'],
    bullets: ['Candi Bajang Ratu', 'Gapura Wringin Lawang', 'Kolam Segaran'],
    body: [
      'Di tanah Trowulan, bata-bata merah masih berbisik tentang kejayaan Majapahit. Gapura yang menjulang, candi yang anggun, dan kolam kuno menjadi saksi bisu sebuah kerajaan besar yang pernah menyatukan Nusantara.',
      'Hari ini kita datang bukan hanya untuk melihat, tetapi untuk merasakan. Setiap langkah adalah perjalanan pulang ke akar sejarah bangsa. Mari jaga warisan ini agar tetap lestari untuk generasi mendatang.',
    ],
    sideTitle: 'Sabda Hari Ini',
    sideText: '"Bhinneka Tunggal Ika tan hana dharma mangrwa." Berbeda-beda tetapi tetap satu jua. Terima kasih telah berkunjung ke jantung sejarah Majapahit.',
    emblem: 'surya',
    footer: ['KENANGAN DARI TROWULAN', 'Lembar 1'],
  },
  {
    id: 'pesantren',
    name: 'Pesantren',
    desc: 'Hijau-emas dengan bingkai lengkung masjid, 4 foto',
    layout: 'arch',
    slots: 4,
    defaultFilter: 'normal',
    palette: { bg1: '#0E4D35', bg2: '#08311F', gold: '#D4AF37', cream: '#F7F1DE' },
    arabic: 'بَارَكَ اللهُ فِيْكُمْ',
    title: 'Kenangan Santri',
    subtitle: "PONDOK PESANTREN MAMBA'UL ULUM",
    footerText: 'Tholabul ‘ilmi faridhotun ‘ala kulli muslim',
  },
  {
    id: 'wisuda',
    name: 'Wisuda Sekolah',
    desc: 'Navy & emas, 1 foto besar + 2 foto',
    layout: 'hero',
    slots: 3,
    defaultFilter: 'normal',
    palette: { bg: '#14213D', bg2: '#0B1428', gold: '#E5B84B', cream: '#FBF7EE' },
    kicker: 'SELAMAT & SUKSES',
    title: 'WISUDA',
    year: 'ANGKATAN 2026',
    school: "SMK MAMBA'UL ULUM MOJOKERTO",
  },
  {
    id: 'strip',
    name: 'Photo Strip Klasik',
    desc: '2 strip identik berisi 3 foto, siap digunting',
    layout: 'strip',
    slots: 3,
    defaultFilter: 'bw',
    palette: { bg: '#FFFFFF', ink: '#1B2440', accent: '#B23A3A' },
    title: 'Photobooth',
  },
  // Contoh template bingkai PNG sendiri (aktifkan dengan menghapus komentar):
  // { id: 'bingkai-saya', name: 'Bingkai Saya', desc: 'Bingkai PNG kustom', layout: 'overlay',
  //   slots: 2, overlay: '/frames/bingkai-saya.png',
  //   rects: [ {x:80,y:200,w:1040,h:700}, {x:80,y:960,w:1040,h:700} ] },
];

// ---------------------------------------------------------------------
//  Helper
// ---------------------------------------------------------------------
const FONT_SPECS = [
  '400 20px "Libre Baskerville"', '700 20px "Libre Baskerville"', 'italic 400 20px "Libre Baskerville"',
  '700 20px "Playfair Display"', '900 20px "Playfair Display"', 'italic 700 20px "Playfair Display"',
  '300 20px "Jost"', '400 20px "Jost"', '600 20px "Jost"', '400 20px "Amiri"', '700 20px "Amiri"',
];
export async function loadFonts() {
  try { await Promise.all(FONT_SPECS.map(f => document.fonts.load(f, 'Aaبَ'))); } catch (e) { /* lanjut dengan font cadangan */ }
}

function rng(seed) { // acak deterministik agar pratinjau stabil
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

function paperNoise(ctx, w, h, color, alpha, seed = 7) {
  const r = rng(seed);
  ctx.save();
  ctx.fillStyle = color;
  for (let i = 0; i < 9000; i++) {
    ctx.globalAlpha = alpha * r();
    ctx.fillRect(r() * w, r() * h, 1 + r() * 2, 1 + r() * 2);
  }
  ctx.restore();
}

export function drawCover(ctx, img, x, y, w, h) {
  const iw = img.videoWidth || img.naturalWidth || img.width;
  const ih = img.videoHeight || img.naturalHeight || img.height;
  if (!iw || !ih) return;
  const s = Math.max(w / iw, h / ih);
  const sw = w / s, sh = h / s;
  ctx.drawImage(img, (iw - sw) / 2, (ih - sh) / 2, sw, sh, x, y, w, h);
}

function wrapLines(ctx, text, maxW, widthFor = () => maxW) {
  const words = text.split(/\s+/); const lines = []; let line = '';
  for (const w of words) {
    const t = line ? line + ' ' + w : w;
    if (ctx.measureText(t).width > widthFor(lines.length) && line) { lines.push(line); line = w; } else line = t;
  }
  if (line) lines.push(line);
  return lines;
}

function spaced(ctx, text, x, y, spacing, align = 'center') {
  // teks dengan letter-spacing manual (canvas lama belum dukung letterSpacing)
  const chars = [...text];
  const total = chars.reduce((a, c) => a + ctx.measureText(c).width, 0) + spacing * (chars.length - 1);
  let cx = align === 'center' ? x - total / 2 : align === 'right' ? x - total : x;
  const prev = ctx.textAlign; ctx.textAlign = 'left';
  for (const c of chars) { ctx.fillText(c, cx, y); cx += ctx.measureText(c).width + spacing; }
  ctx.textAlign = prev;
}

function line(ctx, x1, y1, x2, y2, w, color) {
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore();
}

function photoBox(ctx, img, x, y, w, h, border, color) {
  ctx.save();
  ctx.fillStyle = '#ccc'; ctx.fillRect(x, y, w, h);
  if (img) drawCover(ctx, img, x, y, w, h);
  if (border) { ctx.strokeStyle = color; ctx.lineWidth = border; ctx.strokeRect(x + border / 2, y + border / 2, w - border, h - border); }
  ctx.restore();
}

export function formatDateID(d = new Date()) {
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

function star8(ctx, cx, cy, r) { // bintang 8 sudut (motif islami / surya)
  ctx.beginPath();
  for (let i = 0; i < 16; i++) {
    const a = (Math.PI / 8) * i - Math.PI / 2;
    const rr = i % 2 === 0 ? r : r * 0.72;
    ctx.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
  }
  ctx.closePath();
}

// ---------------------------------------------------------------------
//  Layout: KORAN (Heritage / Majapahit)
// ---------------------------------------------------------------------
function renderNewspaper(ctx, t, photos, opt) {
  const W = PRINT_W, H = PRINT_H, M = 64, p = t.palette;
  ctx.fillStyle = p.paper; ctx.fillRect(0, 0, W, H);
  paperNoise(ctx, W, H, p.muted, 0.18);
  ctx.fillStyle = p.ink; ctx.textBaseline = 'alphabetic';

  let y = 78;
  // baris meta
  ctx.font = '400 22px "Libre Baskerville", Georgia, serif';
  ctx.textAlign = 'left'; ctx.fillText(opt.date.toUpperCase(), M, y);
  ctx.textAlign = 'center'; ctx.fillText(t.edition, W / 2, y);
  ctx.textAlign = 'right'; ctx.fillText(opt.location.toUpperCase(), W - M, y);
  line(ctx, M, y + 18, W - M, y + 18, 3, p.ink);
  line(ctx, M, y + 26, W - M, y + 26, 1, p.ink);
  y += 26;

  if (t.masthead) {
    ctx.textAlign = 'center'; ctx.fillStyle = p.accent;
    ctx.font = '900 84px "Playfair Display", Georgia, serif';
    ctx.fillText(t.masthead, W / 2, y + 96);
    line(ctx, M, y + 126, W - M, y + 126, 1, p.ink);
    y += 126; ctx.fillStyle = p.ink;
  }

  // judul utama
  ctx.textAlign = 'center';
  ctx.font = '700 58px "Playfair Display", Georgia, serif';
  t.headline.forEach((h, i) => spaced(ctx, h, W / 2, y + 82 + i * 70, 3));
  y += 82 + (t.headline.length - 1) * 70 + 40;

  // baris poin
  line(ctx, M, y, W - M, y, 1, p.ink);
  ctx.font = 'italic 400 22px "Libre Baskerville", Georgia, serif';
  const segW = (W - 2 * M) / t.bullets.length;
  t.bullets.forEach((b, i) => {
    const cx = M + segW * i + segW / 2;
    ctx.fillText('▪  ' + b, cx, y + 36);
  });
  line(ctx, M, y + 56, W - M, y + 56, 1, p.ink);
  y += 86;

  // kolom teks + foto utama
  const sH = 290, bottomH = 330; // tinggi foto kecil & blok bawah
  const colW = 330, gap = 34, photoX = M + colW + gap, photoW = W - M - photoX;
  const photoH = Math.min(660, H - 74 - bottomH - (sH + 34) - 30 - y);
  photoBox(ctx, photos[0], photoX, y, photoW, photoH, 3, p.ink);
  ctx.textAlign = 'left'; ctx.font = '400 21px "Libre Baskerville", Georgia, serif';
  let ty = y + 22; const lh = 33;
  const capW = 58;
  t.body.forEach((para, pi) => {
    const first = pi === 0;
    const text = first ? para.slice(1) : para;
    const lines = wrapLines(ctx, text, colW, (i) => (first && i < 2 ? colW - capW : colW));
    if (first) { // huruf awal besar (drop cap)
      ctx.save(); ctx.font = '900 76px "Playfair Display", Georgia, serif'; ctx.fillStyle = p.accent;
      ctx.fillText(para[0], M - 2, ty + 38); ctx.restore();
    }
    lines.forEach((l, li) => {
      if (ty > y + photoH) return;
      ctx.fillText(l, M + (first && li < 2 ? capW : 0), ty);
      ty += lh;
    });
    ty += 16;
  });
  y += photoH + 30;

  // 3 foto kecil
  const sGap = 24, sW = (W - 2 * M - 2 * sGap) / 3;
  for (let i = 0; i < 3; i++) photoBox(ctx, photos[i + 1], M + i * (sW + sGap), y, sW, sH, 3, p.ink);
  y += sH + 34;

  // bagian bawah: kotak kabar + emblem
  line(ctx, M, y, W - M, y, 3, p.ink); line(ctx, M, y + 8, W - M, y + 8, 1, p.ink);
  y += 40;
  const boxW = W - 2 * M - 300;
  ctx.textAlign = 'left'; ctx.fillStyle = p.accent;
  ctx.font = '700 34px "Playfair Display", Georgia, serif';
  ctx.fillText(t.sideTitle, M, y + 26);
  ctx.fillStyle = p.ink; ctx.font = '400 21px "Libre Baskerville", Georgia, serif';
  wrapLines(ctx, t.sideText, boxW).slice(0, 5).forEach((l, i) => ctx.fillText(l, M, y + 72 + i * 33));
  ctx.font = 'italic 400 22px "Libre Baskerville", Georgia, serif'; ctx.fillStyle = p.muted;
  ctx.fillText('— ' + opt.eventName, M, y + 72 + 5 * 33 + 8);

  const ex = W - M - 130, ey = y + 120;
  if (t.emblem === 'surya') drawSurya(ctx, ex, ey, 112, p.accent, p.paper);
  else drawStamp(ctx, ex, ey, 118, p.ink, opt);

  // footer
  line(ctx, M, H - 74, W - M, H - 74, 1, p.ink);
  ctx.fillStyle = p.ink; ctx.font = '400 20px "Libre Baskerville", Georgia, serif';
  ctx.textAlign = 'left'; spaced(ctx, t.footer[0], M, H - 40, 2, 'left');
  ctx.textAlign = 'right'; ctx.fillText(t.footer[1], W - M, H - 40);
}

function drawStamp(ctx, cx, cy, r, color, opt) { // cap pos melingkar
  ctx.save(); ctx.strokeStyle = color; ctx.fillStyle = color; ctx.globalAlpha = 0.85;
  ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
  ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, r - 30, 0, Math.PI * 2); ctx.stroke();
  const text = ' \u2022 ' + opt.location.split(',')[0].toUpperCase() + ' \u2022 ' + opt.eventName.toUpperCase();
  ctx.font = `600 ${text.length > 46 ? 15 : 18}px "Jost", sans-serif`; ctx.textAlign = 'center';
  const step = (Math.PI * 2) / Math.max(text.length, 30);
  [...text].forEach((ch, i) => {
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(-Math.PI / 2 + i * step + step / 2);
    ctx.fillText(ch, 0, -r + 22); ctx.restore();
  });
  ctx.font = '600 26px "Jost", sans-serif'; ctx.fillText(opt.date.split(' ').slice(-1)[0], cx, cy - 6);
  ctx.font = '400 16px "Jost", sans-serif'; ctx.fillText(opt.date.split(' ').slice(0, 2).join(' ').toUpperCase(), cx, cy + 20);
  ctx.restore();
}

function drawSurya(ctx, cx, cy, r, color, paper) { // motif Surya Majapahit sederhana
  ctx.save(); ctx.fillStyle = color; ctx.strokeStyle = color;
  for (let i = 0; i < 32; i++) {
    const a = (Math.PI * 2 / 32) * i, r1 = r * 0.62, r2 = i % 2 ? r * 0.85 : r;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a - 0.06) * r1, cy + Math.sin(a - 0.06) * r1);
    ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
    ctx.lineTo(cx + Math.cos(a + 0.06) * r1, cy + Math.sin(a + 0.06) * r1);
    ctx.fill();
  }
  star8(ctx, cx, cy, r * 0.6); ctx.fill();
  ctx.fillStyle = paper;
  ctx.beginPath(); ctx.arc(cx, cy, r * 0.32, 0, Math.PI * 2); ctx.fill();
  ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, r * 0.22, 0, Math.PI * 2); ctx.stroke();
  ctx.restore();
}

// ---------------------------------------------------------------------
//  Layout: LENGKUNG MASJID (Pesantren)
// ---------------------------------------------------------------------
function archPath(ctx, x, y, w, h) {
  const r = w / 2, top = y + r * 0.9;
  ctx.beginPath();
  ctx.moveTo(x, y + h); ctx.lineTo(x, top);
  ctx.quadraticCurveTo(x, y + r * 0.15, x + w / 2, y); // ujung runcing
  ctx.quadraticCurveTo(x + w, y + r * 0.15, x + w, top);
  ctx.lineTo(x + w, y + h); ctx.closePath();
}

function renderArch(ctx, t, photos, opt) {
  const W = PRINT_W, H = PRINT_H, p = t.palette;
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, p.bg1); g.addColorStop(1, p.bg2);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // pola bintang samar
  ctx.save(); ctx.strokeStyle = p.gold; ctx.globalAlpha = 0.08; ctx.lineWidth = 2;
  for (let yy = 40; yy < H; yy += 120) for (let xx = (yy / 120) % 2 ? 60 : 0; xx < W + 60; xx += 120) { star8(ctx, xx, yy, 34); ctx.stroke(); }
  ctx.restore();
  // bingkai emas ganda
  ctx.strokeStyle = p.gold; ctx.lineWidth = 6; ctx.strokeRect(30, 30, W - 60, H - 60);
  ctx.lineWidth = 2; ctx.strokeRect(46, 46, W - 92, H - 92);
  ctx.fillStyle = p.gold;
  [[30, 30], [W - 30, 30], [30, H - 30], [W - 30, H - 30]].forEach(([x, y]) => { star8(ctx, x, y, 26); ctx.fill(); });

  ctx.textAlign = 'center'; ctx.fillStyle = p.gold;
  ctx.font = '700 62px "Amiri", serif'; ctx.fillText(t.arabic, W / 2, 150);
  ctx.fillStyle = p.cream; ctx.font = 'italic 700 72px "Playfair Display", Georgia, serif';
  ctx.fillText(t.title, W / 2, 245);
  ctx.fillStyle = p.gold; ctx.font = '600 24px "Jost", sans-serif';
  spaced(ctx, t.subtitle, W / 2, 292, 6);

  const x0 = 96, y0 = 340, gap = 36, cw = (W - 2 * x0 - gap) / 2, ch = 590;
  for (let i = 0; i < 4; i++) {
    const x = x0 + (i % 2) * (cw + gap), y = y0 + Math.floor(i / 2) * (ch + gap);
    ctx.save(); archPath(ctx, x, y, cw, ch); ctx.clip();
    ctx.fillStyle = '#244'; ctx.fillRect(x, y, cw, ch);
    if (photos[i]) drawCover(ctx, photos[i], x, y, cw, ch);
    ctx.restore();
    ctx.strokeStyle = p.gold; ctx.lineWidth = 7; archPath(ctx, x, y, cw, ch); ctx.stroke();
  }
  ctx.fillStyle = p.cream; ctx.font = 'italic 400 26px "Libre Baskerville", Georgia, serif';
  ctx.fillText(t.footerText, W / 2, H - 150);
  ctx.fillStyle = p.gold; ctx.font = '600 24px "Jost", sans-serif';
  spaced(ctx, (opt.eventName + '  •  ' + opt.date).toUpperCase(), W / 2, H - 100, 4);
}

// ---------------------------------------------------------------------
//  Layout: HERO (Wisuda)
// ---------------------------------------------------------------------
function capIcon(ctx, cx, cy, s, color) { // ikon toga
  ctx.save(); ctx.fillStyle = color; ctx.strokeStyle = color;
  ctx.beginPath(); ctx.moveTo(cx, cy - s * 0.45); ctx.lineTo(cx + s, cy); ctx.lineTo(cx, cy + s * 0.45); ctx.lineTo(cx - s, cy); ctx.closePath(); ctx.fill();
  ctx.fillRect(cx - s * 0.55, cy + s * 0.1, s * 1.1, s * 0.5);
  ctx.lineWidth = s * 0.07; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + s * 0.8, cy + s * 0.15); ctx.lineTo(cx + s * 0.8, cy + s * 0.8); ctx.stroke();
  ctx.beginPath(); ctx.arc(cx + s * 0.8, cy + s * 0.85, s * 0.1, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function renderHero(ctx, t, photos, opt) {
  const W = PRINT_W, H = PRINT_H, p = t.palette;
  const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, p.bg); g.addColorStop(1, p.bg2);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // garis diagonal & konfeti
  ctx.save(); ctx.strokeStyle = p.gold; ctx.globalAlpha = 0.07; ctx.lineWidth = 2;
  for (let i = -H; i < W; i += 46) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + H, H); ctx.stroke(); }
  ctx.restore();
  const r = rng(11); ctx.save();
  for (let i = 0; i < 70; i++) {
    ctx.globalAlpha = 0.35 + r() * 0.5; ctx.fillStyle = r() > 0.5 ? p.gold : p.cream;
    const x = r() * W, y = r() < 0.5 ? r() * 300 : 1580 + r() * 200;
    ctx.save(); ctx.translate(x, y); ctx.rotate(r() * 3); ctx.fillRect(-6, -2.5, 12, 5); ctx.restore();
  }
  ctx.restore();

  ctx.textAlign = 'center'; ctx.fillStyle = p.gold; ctx.font = '600 34px "Jost", sans-serif';
  spaced(ctx, t.kicker, W / 2, 110, 10);
  ctx.fillStyle = p.cream; ctx.font = '900 150px "Playfair Display", Georgia, serif';
  ctx.fillText(t.title, W / 2, 255);
  capIcon(ctx, 150, 190, 54, p.gold); capIcon(ctx, W - 150, 190, 54, p.gold);
  ctx.fillStyle = p.gold; ctx.font = '400 30px "Jost", sans-serif'; spaced(ctx, t.year, W / 2, 310, 12);

  const bx = 80, by = 350, bw = W - 160, bh = 820;
  ctx.fillStyle = p.gold; ctx.fillRect(bx + 18, by + 18, bw, bh);
  photoBox(ctx, photos[0], bx, by, bw, bh, 10, p.cream);
  const sy = by + bh + 50, sw = (bw - 34) / 2, sh = 360;
  photoBox(ctx, photos[1], bx, sy, sw, sh, 8, p.cream);
  photoBox(ctx, photos[2], bx + sw + 34, sy, sw, sh, 8, p.cream);

  ctx.fillStyle = p.cream; ctx.font = '600 34px "Jost", sans-serif';
  spaced(ctx, t.school, W / 2, H - 112, 5);
  ctx.fillStyle = p.gold; ctx.font = 'italic 400 26px "Libre Baskerville", Georgia, serif';
  ctx.fillText(opt.date, W / 2, H - 66);
}

// ---------------------------------------------------------------------
//  Layout: STRIP (2 strip identik)
// ---------------------------------------------------------------------
function renderStrip(ctx, t, photos, opt) {
  const W = PRINT_W, H = PRINT_H, p = t.palette;
  ctx.fillStyle = p.bg; ctx.fillRect(0, 0, W, H);
  for (let s = 0; s < 2; s++) {
    const ox = s * 600, pw = 520, ph = 460;
    for (let i = 0; i < 3; i++) photoBox(ctx, photos[i], ox + 40, 44 + i * (ph + 22), pw, ph, 0);
    const ty = 44 + 3 * (ph + 22) + 20;
    ctx.fillStyle = p.ink; ctx.textAlign = 'center';
    ctx.font = 'italic 700 58px "Playfair Display", Georgia, serif';
    ctx.fillText(opt.eventName.length > 18 ? t.title : opt.eventName, ox + 300, ty + 70);
    ctx.fillStyle = p.accent; ctx.fillRect(ox + 250, ty + 100, 100, 4);
    ctx.fillStyle = p.ink; ctx.font = '400 24px "Jost", sans-serif';
    spaced(ctx, opt.date.toUpperCase(), ox + 300, ty + 150, 4);
    ctx.font = '300 20px "Jost", sans-serif'; spaced(ctx, opt.location.toUpperCase(), ox + 300, ty + 190, 4);
  }
  ctx.save(); ctx.strokeStyle = '#bbb'; ctx.setLineDash([14, 10]); ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(600, 0); ctx.lineTo(600, H); ctx.stroke(); ctx.restore();
}

// ---------------------------------------------------------------------
//  Layout: OVERLAY (bingkai PNG kustom)
// ---------------------------------------------------------------------
const overlayCache = {};
function renderOverlay(ctx, t, photos) {
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, PRINT_W, PRINT_H);
  t.rects.forEach((r, i) => photoBox(ctx, photos[i], r.x, r.y, r.w, r.h, 0));
  const img = overlayCache[t.overlay];
  if (img && img.complete) ctx.drawImage(img, 0, 0, PRINT_W, PRINT_H);
}
export function preloadOverlays() {
  return Promise.all(TEMPLATES.filter(t => t.layout === 'overlay').map(t => new Promise(res => {
    const img = new Image(); img.onload = img.onerror = res; img.src = t.overlay; overlayCache[t.overlay] = img;
  })));
}

const RENDERERS = { newspaper: renderNewspaper, arch: renderArch, hero: renderHero, strip: renderStrip, overlay: renderOverlay };

/** Gambar template ke canvas. photos = array canvas/gambar sudah difilter. */
export function renderTemplate(canvas, tpl, photos, opt) {
  canvas.width = PRINT_W; canvas.height = PRINT_H;
  const ctx = canvas.getContext('2d');
  ctx.save();
  RENDERERS[tpl.layout](ctx, tpl, photos, opt);
  ctx.restore();
  return canvas;
}

/** Foto contoh (siluet) untuk pratinjau template. */
export function placeholderPhotos(n) {
  const cols = [['#E9C46A', '#E76F51'], ['#8AB6D6', '#2E5E8C'], ['#B5C99A', '#5F7A4A'], ['#E8A0BF', '#8E4A6B']];
  return Array.from({ length: n }, (_, i) => {
    const c = document.createElement('canvas'); c.width = 640; c.height = 480;
    const x = c.getContext('2d'); const g = x.createLinearGradient(0, 0, 640, 480);
    g.addColorStop(0, cols[i % 4][0]); g.addColorStop(1, cols[i % 4][1]); x.fillStyle = g; x.fillRect(0, 0, 640, 480);
    x.fillStyle = 'rgba(255,255,255,.55)';
    [[230, 0.9], [330, 1.05], [430, 0.85]].forEach(([cx, s]) => {
      x.beginPath(); x.arc(cx, 220 - 20 * s, 48 * s, 0, Math.PI * 2); x.fill();
      x.beginPath(); x.ellipse(cx, 400, 85 * s, 120 * s, 0, Math.PI, 0); x.fill();
    });
    return c;
  });
}
