// Pengaturan kiosk. Ubah sesuai lokasi/acara.
export const CONFIG = {
  eventName: "Photobox SMK Mamba'ul Ulum",      // nama booth / acara
  location: 'Mojokerto, Indonesia',
  logos: ['/img/logo-yayasan.png', '/img/logo-smk.png'], // tampil di template, kiosk & halaman hasil (kosongkan [] bila tidak perlu)
  tagline: "Photobox SMK Mamba'ul Ulum Mojokerto",
  countdownSec: 3,          // hitung mundur per foto
  pauseBetweenShotsMs: 1200,
  mirror: true,             // tampilan & hasil dicerminkan seperti cermin
  autoPrint: true,          // panggil dialog cetak otomatis (pakai Chrome --kiosk-printing agar langsung cetak)
  resultIdleSec: 90,        // layar hasil kembali ke awal setelah sekian detik
  retentionDays: 7,         // info masa simpan di halaman hasil (atur juga RETENTION_DAYS di Vercel)
  apiBase: '',              // kosongkan bila API satu domain (Vercel)
  kioskKey: '',             // isi sama dengan env KIOSK_KEY di Vercel (opsional)
  gifWidth: 480,
  videoBitrate: 1_200_000,  // jaga video < 4 MB (batas upload fungsi Vercel 4,5 MB)
  maxVideoSec: 25,
};
