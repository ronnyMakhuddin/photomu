// Penyimpanan file foto/GIF/video.
// Utama: Neon Object Storage (S3) — cukup isi S3_ACCESS_KEY_ID & S3_SECRET_ACCESS_KEY di Vercel.
// Cadangan: Vercel Blob bila BLOB_READ_WRITE_TOKEN tersedia dan kunci S3 tidak diisi.
import { AwsClient } from 'aws4fetch';
import { put, del } from '@vercel/blob';
import { BLOB_TOKEN } from './db.js';

const env = process.env;
const S3 = {
  accessKeyId: env.S3_ACCESS_KEY_ID || env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: env.S3_SECRET_ACCESS_KEY || env.AWS_SECRET_ACCESS_KEY || '',
  // Endpoint & bucket Neon proyek photomu (bisa diganti lewat env)
  endpoint: (env.S3_ENDPOINT || env.AWS_ENDPOINT_URL_S3 || 'https://br-withered-grass-bb40d8gs.storage.c-15.us-east-1.aws.neon.tech').replace(/\/$/, ''),
  bucket: env.S3_BUCKET || 'photomu',
  region: env.S3_REGION || env.AWS_REGION || 'us-east-1',
};

export const STORAGE = S3.accessKeyId && S3.secretAccessKey ? 'neon' : BLOB_TOKEN ? 'blob' : '';
const PUBLIC_BASE = `${S3.endpoint}/${S3.bucket}/`;
const BLOB_HOST = /^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\//i;

let aws = null;
const client = () => (aws ??= new AwsClient({ accessKeyId: S3.accessKeyId, secretAccessKey: S3.secretAccessKey, service: 's3', region: S3.region }));

/** Simpan file publik, kembalikan URL-nya */
export async function putFile(key, buf, contentType) {
  if (STORAGE === 'neon') {
    const url = PUBLIC_BASE + key;
    const r = await client().fetch(url, { method: 'PUT', body: buf, headers: { 'content-type': contentType } });
    if (!r.ok) throw new Error(`Neon storage PUT ${r.status}: ${(await r.text()).slice(0, 300)}`);
    return url;
  }
  if (STORAGE === 'blob') {
    const b = await put(key, buf, { access: 'public', contentType, addRandomSuffix: false, allowOverwrite: true, token: BLOB_TOKEN });
    return b.url;
  }
  throw new Error('Penyimpanan file belum diatur (S3_ACCESS_KEY_ID/S3_SECRET_ACCESS_KEY)');
}

/** Hapus file berdasarkan URL publiknya */
export async function deleteFiles(urls) {
  const neon = urls.filter(u => u.startsWith(PUBLIC_BASE));
  const blob = urls.filter(u => BLOB_HOST.test(u));
  for (const u of neon) if (STORAGE === 'neon') await client().fetch(u, { method: 'DELETE' });
  if (blob.length && BLOB_TOKEN) await del(blob, { token: BLOB_TOKEN });
}

/** URL yang boleh disimpan di database (hanya dari penyimpanan kita sendiri) */
export const isOwnUrl = (u) => typeof u === 'string' && (u.startsWith(PUBLIC_BASE) || BLOB_HOST.test(u));
