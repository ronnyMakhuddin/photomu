import { del } from '@vercel/blob';
import { sql, ensureSchema, json, BLOB_TOKEN } from '../lib/db.js';

// Dipanggil Vercel Cron tiap hari: hapus file & data yang sudah kedaluwarsa.
export async function GET(request) {
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get('authorization') !== `Bearer ${secret}`) return json({ error: 'unauthorized' }, 401);
  await ensureSchema();
  const rows = await sql`SELECT id, photo_url, gif_url, video_url FROM sessions WHERE expires_at < now() LIMIT 500`;
  const urls = rows.flatMap(r => [r.photo_url, r.gif_url, r.video_url]).filter(Boolean);
  if (urls.length) await del(urls, { token: BLOB_TOKEN || undefined });
  if (rows.length) await sql`DELETE FROM sessions WHERE id = ANY(${rows.map(r => r.id)}::uuid[])`;
  return json({ deleted: rows.length });
}
