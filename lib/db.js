import { neon } from '@neondatabase/serverless';

// Neon lewat Vercel Marketplace bisa memberi nama variabel berbeda; ambil yang tersedia.
export const DB_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.DATABASE_URL_UNPOOLED || process.env.NEON_DATABASE_URL || '';
// Token Vercel Blob (bisa berawalan kustom, mis. PHOTOMU_READ_WRITE_TOKEN)
export const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN
  || Object.entries(process.env).find(([k, v]) => k.endsWith('_READ_WRITE_TOKEN') && v)?.[1] || '';

let _sql = null;
/** Dipanggil sebagai tagged template: sql`SELECT ...` (koneksi dibuat saat pertama dipakai) */
export const sql = (...args) => {
  if (!DB_URL) throw new Error('DATABASE_URL belum diatur (hubungkan Neon di Vercel → Storage)');
  _sql ??= neon(DB_URL);
  return _sql(...args);
};
export const RETENTION_DAYS = Number(process.env.RETENTION_DAYS || 7);

let ready = null;
/** Buat tabel otomatis pada pemanggilan pertama (tidak perlu migrasi manual). */
export function ensureSchema() {
  ready ??= sql`
    CREATE TABLE IF NOT EXISTS sessions (
      id          uuid PRIMARY KEY,
      event_name  text,
      template    text,
      filter      text,
      photo_url   text NOT NULL,
      gif_url     text,
      video_url   text,
      created_at  timestamptz NOT NULL DEFAULT now(),
      expires_at  timestamptz NOT NULL
    )`.then(() => sql`CREATE INDEX IF NOT EXISTS sessions_expires_idx ON sessions (expires_at)`);
  return ready;
}

export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
}

/** Bila KIOSK_KEY diisi, hanya kiosk yang mengirim header x-kiosk-key yang boleh menulis. */
export function kioskAllowed(request) {
  const key = process.env.KIOSK_KEY;
  return !key || request.headers.get('x-kiosk-key') === key;
}
