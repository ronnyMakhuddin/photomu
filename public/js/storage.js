// Penyimpanan hasil: API Vercel (Blob + Neon). Bila API tidak tersedia
// (mis. dibuka dari server statis lokal) jatuh ke IndexedDB = mode demo.
import { CONFIG } from './config.js';

const api = (p) => (CONFIG.apiBase || '') + p;
const headers = (extra = {}) => (CONFIG.kioskKey ? { 'x-kiosk-key': CONFIG.kioskKey, ...extra } : extra);

/** 'ok' = server siap, 'unconfigured' = API ada tapi Neon/Blob belum terhubung, 'offline' = tanpa server (mode demo) */
export async function apiStatus() {
  try {
    const r = await fetch(api('/api/health'), { cache: 'no-store' });
    if (!r.ok) return 'offline';
    const j = await r.json();
    return j.ok === true ? 'ok' : 'unconfigured';
  } catch { return 'offline'; }
}

async function uploadFile(id, kind, blob) {
  const r = await fetch(api(`/api/upload?id=${id}&kind=${kind}`), {
    method: 'POST', headers: headers({ 'content-type': blob.type }), body: blob,
  });
  if (!r.ok) throw new Error(`Upload ${kind} gagal (${r.status}): ${await r.text()}`);
  return (await r.json()).url;
}

/** Simpan hasil ke cloud. files = { photo, gif, video } (Blob, video boleh null) */
export async function saveCloud(id, meta, files) {
  const urls = {};
  for (const kind of ['photo', 'gif', 'video']) {
    if (!files[kind]) continue;
    try { urls[kind] = await uploadFile(id, kind, files[kind]); }
    catch (e) { if (kind === 'photo') throw e; console.warn(e); } // GIF/video gagal tidak menggagalkan sesi
  }
  const r = await fetch(api('/api/session'), {
    method: 'POST', headers: headers({ 'content-type': 'application/json' }),
    body: JSON.stringify({ id, ...meta, photo_url: urls.photo, gif_url: urls.gif || null, video_url: urls.video || null }),
  });
  if (!r.ok) throw new Error(`Simpan sesi gagal (${r.status})`);
  return urls;
}

export async function getCloud(id) {
  const r = await fetch(api(`/api/session?id=${encodeURIComponent(id)}`), { cache: 'no-store' });
  if (r.status === 404) return { error: 'notfound' };
  if (r.status === 410) return { error: 'expired' };
  if (!r.ok) throw new Error('Gagal memuat (' + r.status + ')');
  return r.json();
}

// ---------------- mode demo (IndexedDB) ----------------
function idb() {
  return new Promise((res, rej) => {
    const req = indexedDB.open('photobooth-demo', 1);
    req.onupgradeneeded = () => req.result.createObjectStore('sessions', { keyPath: 'id' });
    req.onsuccess = () => res(req.result); req.onerror = () => rej(req.error);
  });
}
export async function saveLocal(id, meta, files) {
  const db = await idb();
  await new Promise((res, rej) => {
    const tx = db.transaction('sessions', 'readwrite');
    tx.objectStore('sessions').put({ id, ...meta, ...files, created_at: new Date().toISOString() });
    tx.oncomplete = res; tx.onerror = () => rej(tx.error);
  });
}
export async function getLocal(id) {
  const db = await idb();
  return new Promise((res, rej) => {
    const r = db.transaction('sessions').objectStore('sessions').get(id);
    r.onsuccess = () => res(r.result || null); r.onerror = () => rej(r.error);
  });
}
