import { put } from '@vercel/blob';
import { UUID_RE, json, kioskAllowed, BLOB_TOKEN } from '../lib/db.js';

const KINDS = {
  photo: { types: ['image/jpeg'], ext: () => 'jpg' },
  gif:   { types: ['image/gif'], ext: () => 'gif' },
  video: { types: ['video/mp4', 'video/webm'], ext: (t) => (t === 'video/mp4' ? 'mp4' : 'webm') },
};
const MAX_BYTES = 4.4 * 1024 * 1024; // batas body fungsi Vercel 4,5 MB

// POST /api/upload?id=<uuid>&kind=photo|gif|video   (body = file mentah)
export async function POST(request) {
  if (!kioskAllowed(request)) return json({ error: 'forbidden' }, 403);
  const url = new URL(request.url);
  const id = url.searchParams.get('id'), kind = url.searchParams.get('kind');
  const type = (request.headers.get('content-type') || '').split(';')[0].trim();
  if (!UUID_RE.test(id || '')) return json({ error: 'id tidak valid' }, 400);
  const spec = KINDS[kind];
  if (!spec) return json({ error: 'kind tidak valid' }, 400);
  if (!spec.types.includes(type)) return json({ error: `tipe ${type} tidak diizinkan untuk ${kind}` }, 415);

  const buf = Buffer.from(await request.arrayBuffer());
  if (!buf.length) return json({ error: 'file kosong' }, 400);
  if (buf.length > MAX_BYTES) return json({ error: 'file terlalu besar' }, 413);

  const blob = await put(`sessions/${id}/${kind}.${spec.ext(type)}`, buf, {
    access: 'public', contentType: type, addRandomSuffix: false, allowOverwrite: true, token: BLOB_TOKEN || undefined,
  });
  return json({ url: blob.url });
}
