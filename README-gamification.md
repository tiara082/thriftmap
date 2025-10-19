# Gamification ThriftMap

Elemen gamifikasi menambahkan XP dan level untuk pengguna berdasarkan kondisi (grade) produk yang dibeli.

## Ringkasan
- Penyimpanan: `localStorage` key `tm_xp_total` (total XP), `tm_xp_last_gain` (XP terakhir didapat).
- Level (5 tingkat):
  1. Pemula Hijau: 0–99 XP
  2. Sahabat Bumi: 100–299 XP
  3. Pahlawan Daur Ulang: 300–699 XP
  4. Guardian Keberlanjutan: 700–1499 XP
  5. Top 1% Penyelamat Lingkungan: ≥1500 XP
- XP per kondisi produk:
  - Cukup: +10 XP
  - Baik: +20 XP
  - Sangat Baik: +30 XP
  - Seperti Baru: +40 XP

## File terkait
- `assets/js/gamification.js`: Modul utilitas XP & level (global `window.TMGami`).
- `dashboard-checkout.html`: Award XP saat pesanan sukses.
- `dashboard-profile.html`: Tampilkan badge level, progress bar, dan sisa XP ke level berikutnya.
- `assets/js/products-data.js`: Sumber data produk (memiliki field `condition`).

## Cara kerja
1. Saat checkout sukses, ambil item keranjang (`TMCart.getCart()`), cari produk di `TM_PRODUCTS` berdasarkan `id` atau `name`, lalu baca `condition`.
2. Konversi kondisi ke XP per item (dikali qty), jumlahkan, lalu tambahkan ke `tm_xp_total`.
3. Tampilkan notifikasi dengan total XP yang didapat; jika naik level, diberi pesan khusus.
4. Di halaman profil, progres level dihitung dari total XP dan divisualisasikan dalam progress bar.

## API ringkas (`window.TMGami`)
- `getXP()` → number: total XP saat ini.
- `addXP(delta)` → number: total XP setelah penambahan.
- `computeXP(cartItems)` → number: hitung XP dari item keranjang.
- `getLevel(xp?)` → { id, name, xpMin, xpMax }.
- `progressToNext(xp?)` → { level, nextLevel, percent, remaining, total, ... }.

## Uji manual
1. Tambahkan produk ke keranjang via `dashboard-products.html` (produk sudah memiliki kondisi beragam).
2. Buka `dashboard-checkout.html`, isi minimal Nama/Telepon/Alamat, lalu "Buat Pesanan".
3. Setelah konfirmasi, perhatikan notifikasi: `+<XP> XP …`. Jika naik level, ada pesan "Naik ke <Level>".
4. Buka `dashboard-profile.html`, cek badge level, progress bar, dan sisa XP.
5. Ulangi pembelian dengan produk kondisi berbeda untuk melihat perbedaan XP.

## Kustomisasi
- Ubah batas level: edit konstanta `LEVELS` di `assets/js/gamification.js`.
- Ubah XP per kondisi: edit objek `XP_MAP` di file yang sama.
- Ganti label level sesuai brand tone.

## Catatan
- Saat ini XP bersifat per-browser (localStorage). Untuk sinkronisasi antar perangkat, integrasikan ke backend (misal Supabase) dan lakukan persist per user.
- Jika `SweetAlert2` tidak tersedia, `notify.js` fallback ke `alert()` sehingga alur tetap berjalan.
