import { sql, ensureSchema, RETENTION_DAYS, UUID_RE, json, kioskAllowed } from '../lib/db.js';

const BLOB_HOST = /^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\//i;
const clean = (v) => (typeof v === 'string' && BLOB_HOST.test(v) ? v : null);
const short = (v) => (typeof v === 'string' ? v.slice(0, 120) : null);

// POST /api/session  -> catat sesi foto
export async function POST(request) {
  if (!kioskAllowed(request)) return json({ error: 'forbidden' }, 403);
  let b; try { b = await request.json(); } catch { return json({ error: 'JSON tidak valid' }, 400); }
  if (!UUID_RE.test(b.id || '')) return json({ error: 'id tidak valid' }, 400);
  const photo = clean(b.photo_url);
  if (!photo) return json({ error: 'photo_url wajib' }, 400);
  await ensureSchema();
  await sql`
    INSERT INTO sessions (id, event_name, template, filter, photo_url, gif_url, video_url, expires_at)
    VALUES (${b.id}, ${short(b.event_name)}, ${short(b.template)}, ${short(b.filter)}, ${photo},
            ${clean(b.gif_url)}, ${clean(b.video_url)}, now() + make_interval(days => ${RETENTION_DAYS}))
    ON CONFLICT (id) DO UPDATE SET photo_url = EXCLUDED.photo_url, gif_url = EXCLUDED.gif_url, video_url = EXCLUDED.video_url`;
  return json({ ok: true, id: b.id }, 201);
}

// GET /api/session?id=<uuid>  -> data untuk halaman hasil
export async function GET(request) {
  const id = new URL(request.url).searchParams.get('id');
  if (!UUID_RE.test(id || '')) return json({ error: 'id tidak valid' }, 400);
  await ensureSchema();
  const rows = await sql`SELECT id, event_name, template, filter, photo_url, gif_url, video_url, created_at, expires_at FROM sessions WHERE id = ${id}`;
  if (!rows.length) return json({ error: 'notfound' }, 404);
  if (new Date(rows[0].expires_at) < new Date()) return json({ error: 'expired' }, 410);
  return json(rows[0]);
}
