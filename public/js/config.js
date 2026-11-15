// Pengaturan kiosk. Ubah sesuai lokasi/acara.
export const CONFIG = {
  eventName: 'Photobox Kaca Cembung',      // nama booth / acara
  location: 'Malang, Indonesia',
  tagline: 'Photobox Kaca Cembung #1 di Kayu Tangan',
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
