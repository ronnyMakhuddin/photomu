import { DB_URL } from '../lib/db.js';
import { STORAGE } from '../lib/storage.js';

export function GET() {
  const db = Boolean(DB_URL), storage = STORAGE || false;
  return Response.json({ ok: db && Boolean(storage), db, storage }, { headers: { 'cache-control': 'no-store' } });
}
