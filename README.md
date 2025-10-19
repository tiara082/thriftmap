# ThriftMap

ThriftMap adalah prototipe front-end marketplace fashion sirkular yang menghadirkan pengalaman belanja barang preloved secara modern. Semua halaman memanfaatkan HTML, CSS, dan JavaScript murni sehingga dapat dijalankan pada server statis tanpa proses build tambahan.

## Fitur Utama
- **Landing page interaktif** dengan highlight produk, kategori populer, animasi scroll, dan CTA koleksi.
- **Dashboard pelanggan lengkap** (`dashboard-*.html`) untuk produk, pesanan, pelacakan, keranjang, wishlist, profil, hingga pengaturan.
- **Pelacakan pesanan** dengan peta Leaflet, garis waktu pengiriman, dan detail kurir untuk pengalaman pasca-checkout.
- **Wishlist & keranjang lokal** berbasis helper JavaScript yang menyimpan data langsung di browser.
- **Lapisan gamifikasi** (XP, misi, streak) yang dijelaskan di `README-gamification.md` dan mudah dikembangkan.
- **Badge koleksi prestasi** yang memotivasi pengguna melalui level dan pencapaian berjenjang berdasarkan aktivitas di platform.
- **Antarmuka marketplace berbasis peta/GIS** yang menonjolkan konteks lokasi produk dan pengiriman untuk pengalaman belanja yang lebih imersif.
- **Notifikasi modern** memakai `assets/js/notify.js` yang membungkus SweetAlert2 untuk toast dan alert seragam.
- **Sistem desain responsif** yang dibagikan lewat `assets/css/style-prefix.css` dan utilitas mirip Tailwind.

## Struktur Proyek
```
assets/
  css/
    style.css              # Styling landing page & penyesuaian komponen
    style-prefix.css       # Utilitas bersama + styling dashboard
  images/                  # Logo, ikon, dan aset produk
  js/
    cart.js                # Helper keranjang & alur checkout contoh
    gamification.js        # Modul XP, misi, streak
    notify.js              # Helper toast/alert
    products-data.js       # Data produk dummy untuk demonstrasi
    script.js              # Interaksi landing page
    supabase-client.js     # Wrapper opsional untuk Supabase (saat ini nonaktif)
    supabase-init.js       # Contoh inisialisasi Supabase (ganti jika digunakan)
    wishlist.js            # Logika wishlist + penyimpanan lokal
    wishlist-panel.js      # Kontrol panel slide-over wishlist

dashboard-*.html           # Halaman dashboard (produk, pesanan, tracking, dll.)
index.html                 # Landing page utama
login.html / register.html # Mockup autentikasi
README-gamification.md     # Dokumentasi fitur gamifikasi
```

## Cara Menjalankan
1. **Clone atau unduh** repositori ini.
2. **Jalankan melalui server statis** favorit Anda:
   - XAMPP: letakkan folder di `htdocs`, lalu akses `http://localhost/thrift-store1/index.html`.
   - Node.js: jalankan `npx serve` (atau server statis lain) dari root proyek, kemudian buka URL yang diberikan.
3. **Kunjungi halaman dashboard** dengan membuka file HTML terkait (misal `dashboard-products.html`, `dashboard-tracking.html`).

> Seluruh fitur berjalan secara statis. Modul Supabase belum dipakai; helper disiapkan bila Anda ingin menambahkan backend di kemudian hari.

## Integrasi Supabase (Opsional)
Untuk mengaktifkan Supabase sebagai backend:
1. Buat project Supabase dan sediakan tabel seperti `profiles`, `products`, `wishlists`, `orders`, `order_items`, dll.
2. Perbarui `SUPABASE_URL` dan `SUPABASE_ANON_KEY` di `assets/js/supabase-init.js` dengan kredensial Anda sendiri.
3. Pastikan CDN `@supabase/supabase-js` dimuat sebelum `supabase-client.js` dan `supabase-init.js` pada halaman yang membutuhkan koneksi.
4. Kembangkan fungsi di `supabase-client.js` sesuai kebutuhan (auth, wishlist tersinkron, XP, checkout, dll.).

## Dependensi Eksternal
- **Ionicons** & **Font Awesome** untuk ikon.
- **Leaflet** (khusus `dashboard-tracking.html`) guna menampilkan peta.
- **SweetAlert2** melalui `notify.js` sebagai sistem notifikasi.
- **Supabase JS SDK** (opsional) bila backend Supabase diaktifkan.

Semua dependensi dipanggil via CDN sehingga tidak diperlukan instalasi bundler.

## Tips Pengembangan
- Gunakan kelas pada `style-prefix.css` agar UI tetap konsisten di seluruh halaman.
- Salin struktur header dari halaman dashboard yang ada ketika membuat halaman baru untuk menjaga keseragaman.
- Tempatkan helper JavaScript reusable di `assets/js/` dan panggil hanya di halaman yang membutuhkannya.
- Dokumentasikan perubahan gamifikasi di `README-gamification.md` ketika menambah level, misi, atau hadiah baru.

## Rencana Pengembangan
- Mengganti data mock dengan sumber live (Supabase atau API custom).
- Menyambungkan halaman login/register dengan autentikasi nyata.
- Menambahkan linting atau pengujian otomatis untuk modul JavaScript.
- Menyusun pipeline deploy (misal GitHub Actions) atau menyiapkan container untuk hosting.

