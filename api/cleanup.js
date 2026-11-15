import { sql, ensureSchema, json } from '../lib/db.js';
import { deleteFiles } from '../lib/storage.js';

// Dipanggil Vercel Cron tiap hari: hapus file & data yang sudah kedaluwarsa.
export async function GET(request) {
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get('authorization') !== `Bearer ${secret}`) return json({ error: 'unauthorized' }, 401);
  await ensureSchema();
  const rows = await sql`SELECT id, photo_url, gif_url, video_url FROM sessions WHERE expires_at < now() LIMIT 500`;
  const urls = rows.flatMap(r => [r.photo_url, r.gif_url, r.video_url]).filter(Boolean);
  if (urls.length) await deleteFiles(urls);
  if (rows.length) await sql`DELETE FROM sessions WHERE id = ANY(${rows.map(r => r.id)}::uuid[])`;
  return json({ deleted: rows.length });
}
