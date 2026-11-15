import { CONFIG } from './config.js';
import { TEMPLATES, FILTERS, renderTemplate, placeholderPhotos, loadFonts, preloadOverlays, preloadLogos, formatDateID } from './templates.js';
import { GIFEncoder, quantize, applyPalette } from '../vendor/gifenc.esm.js';
import { apiStatus, saveCloud, saveLocal } from './storage.js';

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const params = new URLSearchParams(location.search);

const state = {
  tpl: TEMPLATES[0],
  filter: FILTERS[0],
  stream: null,
  shots: [],
  composite: null,   // canvas
  recorder: null,
  videoBlob: null,
  cloud: null,       // true/false setelah dicek
  busy: false,
  idleTimer: null,
  reviewTimer: null,
};

// --------------------------------------------------------------------
//  Navigasi layar
// --------------------------------------------------------------------
function go(id) {
  $$('.screen').forEach(s => s.classList.toggle('active', s.id === id));
  if (id !== 's-result') clearInterval(state.idleTimer);
  if (id !== 's-review') clearInterval(state.reviewTimer);
  if (id === 's-filter') { ensureCamera(); }
}
$$('[data-go]').forEach(b => b.addEventListener('click', () => go(b.dataset.go)));

// Tombol fisik (arcade/keyboard): Enter / Spasi = tombol utama layar aktif
document.addEventListener('keydown', (e) => {
  if (!['Enter', ' '].includes(e.key)) return;
  const act = $('.screen.active');
  const btn = act && act.querySelector('.btn-navy:not(:disabled)');
  if (btn) { e.preventDefault(); btn.click(); }
});

// --------------------------------------------------------------------
//  Sambutan
// --------------------------------------------------------------------
function marquee(el) {
  const t = `${CONFIG.tagline.toUpperCase()}  •  `;
  el.textContent = t.repeat(6);
}
$('#w-location').textContent = CONFIG.location;
marquee($('#w-marquee')); marquee($('#r-marquee'));
$('#btn-start').addEventListener('click', () => { go('s-template'); ensureCamera(); });

// --------------------------------------------------------------------
//  Template
// --------------------------------------------------------------------
function buildTemplateGrid() {
  const grid = $('#tpl-grid'); grid.innerHTML = '';
  const big = document.createElement('canvas');
  const dateOpt = renderOpts();
  TEMPLATES.forEach(t => {
    const card = document.createElement('button');
    card.className = 'tpl-card' + (t.id === state.tpl.id ? ' on' : '');
    const c = document.createElement('canvas'); c.width = 300; c.height = 450;
    renderTemplate(big, t, placeholderPhotos(t.slots), dateOpt);
    c.getContext('2d').drawImage(big, 0, 0, 300, 450);
    card.append(c);
    card.insertAdjacentHTML('beforeend', `<h3>${t.name}</h3><p>${t.desc}</p><span class="chip">${t.slots} FOTO</span>`);
    card.addEventListener('click', () => {
      state.tpl = t;
      $$('.tpl-card').forEach(x => x.classList.toggle('on', x === card));
      const f = FILTERS.find(f => f.id === t.defaultFilter); if (f) selectFilter(f);
    });
    grid.append(card);
  });
}
$('#btn-to-filter').addEventListener('click', () => { $('#f-tplname').textContent = state.tpl.name; go('s-filter'); });

// --------------------------------------------------------------------
//  Kamera & filter
// --------------------------------------------------------------------
async function ensureCamera() {
  if (state.stream && state.stream.active) return state.stream;
  try {
    state.stream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 1920 }, height: { ideal: 1080 }, facingMode: 'user' }, audio: false,
    });
    $$('video.cam, .f-chip video').forEach(v => { v.srcObject = state.stream; v.play().catch(() => {}); });
    $('#cam-error').hidden = true; $('#btn-shoot').disabled = false;
  } catch (e) {
    const el = $('#cam-error');
    el.innerHTML = 'Kamera tidak dapat dibuka.<br><small>Izinkan akses kamera di browser, pastikan kamera terpasang, dan buka lewat HTTPS / localhost.</small>';
    el.hidden = false; $('#btn-shoot').disabled = true;
    console.error(e);
  }
  return state.stream;
}

function buildFilterRow() {
  const row = $('#filter-row'); row.innerHTML = '';
  FILTERS.forEach(f => {
    const b = document.createElement('button'); b.className = 'f-chip'; b.dataset.id = f.id;
    const v = document.createElement('video'); v.muted = true; v.playsInline = true; v.autoplay = true;
    v.style.filter = f.css; if (CONFIG.mirror) v.classList.add('mirror');
    if (state.stream) v.srcObject = state.stream;
    b.append(v); b.insertAdjacentHTML('beforeend', `<span>${f.name}</span>`);
    b.addEventListener('click', () => selectFilter(f));
    row.append(b);
  });
  selectFilter(state.filter);
}
function selectFilter(f) {
  state.filter = f;
  $$('.f-chip').forEach(c => c.classList.toggle('on', c.dataset.id === f.id));
  $$('video.cam').forEach(v => { v.style.filter = f.css; });
}
$$('video.cam').forEach(v => CONFIG.mirror && v.classList.add('mirror'));

// --------------------------------------------------------------------
//  Rekam "video langsung" (kanvas berfilter -> MediaRecorder)
// --------------------------------------------------------------------
function pickMime() {
  const opts = ['video/mp4;codecs=avc1', 'video/mp4', 'video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'];
  return opts.find(m => window.MediaRecorder && MediaRecorder.isTypeSupported(m)) || '';
}
// Video langsung DI DALAM template: slot yang sudah difoto menampilkan hasilnya,
// slot berikutnya menampilkan kamera langsung (berfilter & dicerminkan).
function startLiveRecording(video) {
  state.videoBlob = null;
  if (!window.MediaRecorder || !HTMLCanvasElement.prototype.captureStream) return;
  const live = document.createElement('canvas');
  const vw = video.videoWidth || 1280, vh = video.videoHeight || 720, ls = Math.min(1, 640 / vw);
  live.width = Math.round(vw * ls); live.height = Math.round(vh * ls);
  const lctx = live.getContext('2d');
  const c = document.createElement('canvas');
  const opt = renderOpts(), tpl = state.tpl;
  let running = true;
  const draw = () => {
    if (!running) return;
    lctx.save(); lctx.filter = state.filter.css;
    if (CONFIG.mirror) { lctx.translate(live.width, 0); lctx.scale(-1, 1); }
    lctx.drawImage(video, 0, 0, live.width, live.height); lctx.restore();
    const photos = Array.from({ length: tpl.slots }, (_, i) => state.shots[i] || live);
    renderTemplate(c, tpl, photos, opt, CONFIG.videoScale);
    requestAnimationFrame(draw);
  };
  draw();
  const mime = pickMime();
  const rec = new MediaRecorder(c.captureStream(24), { mimeType: mime || undefined, videoBitsPerSecond: CONFIG.videoBitrate });
  const chunks = [];
  rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
  const done = new Promise(res => { rec.onstop = () => { running = false; res(new Blob(chunks, { type: (mime || 'video/webm').split(';')[0] })); }; });
  rec.start(500);
  const limit = setTimeout(() => rec.state === 'recording' && rec.stop(), CONFIG.maxVideoSec * 1000);
  state.recorder = { stop: async () => { clearTimeout(limit); if (rec.state === 'recording') rec.stop(); state.videoBlob = await done; return state.videoBlob; } };
}

// --------------------------------------------------------------------
//  Sesi foto
// --------------------------------------------------------------------
function captureFrame(video) {
  const c = document.createElement('canvas');
  c.width = video.videoWidth || 1280; c.height = video.videoHeight || 720;
  const ctx = c.getContext('2d');
  ctx.filter = state.filter.css;
  if (CONFIG.mirror) { ctx.translate(c.width, 0); ctx.scale(-1, 1); }
  ctx.drawImage(video, 0, 0, c.width, c.height);
  return c;
}

async function runSession() {
  if (state.busy) return; state.busy = true;
  await ensureCamera();
  go('s-shoot');
  const video = $('#cam-shoot'); video.srcObject = state.stream;
  await video.play().catch(() => {});
  if (!video.videoWidth) await new Promise(r => video.addEventListener('loadedmetadata', r, { once: true }));
  const n = state.tpl.slots; state.shots = [];
  const thumbs = $('#thumbs'); thumbs.innerHTML = '<div class="t"></div>'.repeat(n);
  startLiveRecording(video);
  const cd = $('#countdown');
  for (let i = 0; i < n; i++) {
    $('#shot-label').textContent = `FOTO ${i + 1} DARI ${n}`;
    for (let s = CONFIG.countdownSec; s > 0; s--) {
      cd.textContent = s; cd.classList.remove('pop'); void cd.offsetWidth; cd.classList.add('pop');
      await sleep(1000);
    }
    cd.textContent = '';
    const shot = captureFrame(video);
    state.shots.push(shot);
    const fl = $('#flash'); fl.classList.remove('go'); void fl.offsetWidth; fl.classList.add('go');
    const t = thumbs.children[i]; t.style.backgroundImage = `url(${shot.toDataURL('image/jpeg', 0.6)})`; t.classList.add('done');
    if (i < n - 1) { cd.textContent = 'Siap…'; cd.style.fontSize = '64px'; await sleep(CONFIG.pauseBetweenShotsMs); cd.style.fontSize = ''; cd.textContent = ''; }
  }
  await sleep(400);
  if (state.recorder) await state.recorder.stop();
  state.busy = false;
  showReview();
}
$('#btn-shoot').addEventListener('click', runSession);

function renderOpts() {
  return { date: formatDateID(new Date()), location: CONFIG.location, eventName: CONFIG.eventName };
}

function showReview() {
  state.composite = renderTemplate(document.createElement('canvas'), state.tpl, state.shots, renderOpts());
  $('#review-img').src = state.composite.toDataURL('image/jpeg', 0.85);
  go('s-review');
  let left = 30; $('#review-timer').textContent = `Otomatis lanjut ${left} dtk`;
  state.reviewTimer = setInterval(() => {
    left--; $('#review-timer').textContent = `Otomatis lanjut ${left} dtk`;
    if (left <= 0) { clearInterval(state.reviewTimer); finish(); }
  }, 1000);
}
$('#btn-retake').addEventListener('click', () => { clearInterval(state.reviewTimer); runSession(); });
$('#btn-finish').addEventListener('click', () => { clearInterval(state.reviewTimer); finish(); });

// --------------------------------------------------------------------
//  GIF dari foto-foto sesi (bolak-balik / boomerang)
// --------------------------------------------------------------------
// GIF DI DALAM template: tiap frame foto-foto bergeser antar slot.
function makeGif(shots) {
  const c = document.createElement('canvas');
  const opt = renderOpts(), n = shots.length;
  const gif = GIFEncoder();
  for (let k = 0; k < n; k++) {
    const photos = shots.map((_, i) => shots[(i + k) % n]);
    renderTemplate(c, state.tpl, photos, opt, CONFIG.gifWidth / 1200);
    const ctx = c.getContext('2d', { willReadFrequently: true });
    const { data } = ctx.getImageData(0, 0, c.width, c.height);
    const palette = quantize(data, 256);
    gif.writeFrame(applyPalette(data, palette), c.width, c.height, { palette, delay: k === 0 ? 1200 : 800 });
  }
  gif.finish();
  return new Blob([gif.bytes()], { type: 'image/gif' });
}

// --------------------------------------------------------------------
//  Selesai: hasil, unggah, QR, cetak
// --------------------------------------------------------------------
const toBlob = (canvas, type, q) => new Promise(r => canvas.toBlob(r, type, q));

function setTab(tab) {
  $$('#res-tabs button').forEach(b => b.classList.toggle('on', b.dataset.tab === tab));
  $('#res-photo').hidden = tab !== 'photo'; $('#res-gif').hidden = tab !== 'gif';
  const v = $('#res-video'); v.hidden = tab !== 'video';
  if (tab === 'video') v.play().catch(() => {}); else v.pause();
}
$$('#res-tabs button').forEach(b => b.addEventListener('click', () => setTab(b.dataset.tab)));

async function finish() {
  if (state.busy) return; state.busy = true;
  $('#busy-text').textContent = 'Menyusun hasil foto…'; $('#busy').hidden = false;
  await sleep(50);
  const id = crypto.randomUUID();
  const photo = await toBlob(state.composite, 'image/jpeg', 0.92);
  $('#busy-text').textContent = 'Membuat GIF…'; await sleep(30);
  let gif = null; try { gif = makeGif(state.shots); } catch (e) { console.warn('GIF gagal', e); }
  const video = state.videoBlob && state.videoBlob.size > 0 ? state.videoBlob : null;

  // tampilkan layar hasil
  $('#res-photo').src = URL.createObjectURL(photo);
  if (gif) $('#res-gif').src = URL.createObjectURL(gif);
  if (video) $('#res-video').src = URL.createObjectURL(video);
  $('#res-tabs [data-tab=gif]').disabled = !gif; $('#res-tabs [data-tab=video]').disabled = !video;
  setTab('photo');
  $('#qr-box').innerHTML = '<div class="spinner"></div>';
  $('#qr-note').textContent = 'Mengunggah hasil…';
  $('#print-img').src = $('#res-photo').src;
  $('#busy').hidden = true;
  go('s-result');
  startIdle();

  const meta = { template: state.tpl.id, filter: state.filter.id, event_name: CONFIG.eventName };
  let url;
  try {
    state.cloud = await apiStatus();
    if (state.cloud === 'unconfigured') throw new Error('Server belum siap: database Neon / Vercel Blob belum terhubung di Vercel.');
    if (state.cloud === 'ok') {
      await saveCloud(id, meta, { photo, gif, video });
      url = `${location.origin}/picture/${id}`;
    } else {
      await saveLocal(id, meta, { photo, gif, video });
      url = `${location.origin}/hasil.html?id=${id}&local=1`;
    }
    drawQR(url);
    $('#qr-note').textContent = state.cloud === 'ok' ? url : 'Mode demo (tanpa server): hasil hanya tersimpan di perangkat ini.';
  } catch (e) {
    console.error(e);
    $('#qr-box').innerHTML = '<p style="padding:12px">Gagal mengunggah. Periksa koneksi internet.</p>';
    $('#qr-note').textContent = String(e.message || e);
  }
  state.busy = false;
  if (CONFIG.autoPrint && !params.has('noprint')) { await sleep(300); window.print(); }
}

function drawQR(url) {
  const qr = window.qrcode(0, 'M'); qr.addData(url); qr.make();
  $('#qr-box').innerHTML = `<img alt="QR hasil" src="${qr.createDataURL(10, 0)}">`;
  $('#qr-box').dataset.url = url;
}

function startIdle() {
  clearInterval(state.idleTimer);
  let left = CONFIG.resultIdleSec;
  const tick = () => { $('#idle-note').textContent = `Kembali ke awal dalam ${left} dtk`; if (left-- <= 0) restart(); };
  tick(); state.idleTimer = setInterval(tick, 1000);
}
$('#s-result').addEventListener('pointerdown', () => { if ($('#s-result').classList.contains('active')) startIdle(); });

function restart() {
  clearInterval(state.idleTimer);
  ['#res-photo', '#res-gif', '#res-video'].forEach(s => { const el = $(s); if (el.src.startsWith('blob:')) URL.revokeObjectURL(el.src); el.removeAttribute('src'); });
  state.shots = []; state.composite = null; state.videoBlob = null;
  go('s-welcome');
}
$('#btn-restart').addEventListener('click', restart);

// --------------------------------------------------------------------
//  Mulai
// --------------------------------------------------------------------
(async function init() {
  await loadFonts();
  await Promise.all([preloadOverlays(), preloadLogos()]);
  buildTemplateGrid();
  buildFilterRow();
  selectFilter(FILTERS.find(f => f.id === state.tpl.defaultFilter) || FILTERS[0]);
  window.__pb = state; // untuk debug
})();
