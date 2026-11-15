import { DB_URL, BLOB_TOKEN } from '../lib/db.js';

export function GET() {
  const db = Boolean(DB_URL), blob = Boolean(BLOB_TOKEN);
  return Response.json({ ok: db && blob, db, blob }, { headers: { 'cache-control': 'no-store' } });
}
