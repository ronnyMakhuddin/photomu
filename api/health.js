export function GET() {
  const ok = Boolean(process.env.DATABASE_URL && process.env.BLOB_READ_WRITE_TOKEN);
  return Response.json({ ok, db: Boolean(process.env.DATABASE_URL), blob: Boolean(process.env.BLOB_READ_WRITE_TOKEN) });
}
