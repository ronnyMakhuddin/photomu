-- Opsional: tabel juga dibuat otomatis saat API pertama kali dipanggil.
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
);
CREATE INDEX IF NOT EXISTS sessions_expires_idx ON sessions (expires_at);

-- Statistik sederhana per hari & template
-- SELECT date(created_at) AS hari, template, count(*) FROM sessions GROUP BY 1,2 ORDER BY 1 DESC;
