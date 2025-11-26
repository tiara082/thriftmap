"use client";

import Link from "next/link";
import { productCategories } from "./data/products";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentFeatured, setCurrentFeatured] = useState(0);

  // Featured products (dari data products)
  const featuredProducts = [
    productCategories[0].assets[0], // Dress Wanita
    productCategories[1].assets[1], // Jaket Pria
  ];

  // New arrivals products
  const newArrivals = [
    productCategories[1].assets[1], // Jaket Pria
    productCategories[0].assets[1], // Atasan Wanita
    productCategories[0].assets[5], // Sweater Wanita
    productCategories[0].assets[2], // Tas Wanita
  ];

  // Products under 50k
  const under50k = [
    productCategories[1].assets[3], // Kaos Pria
    productCategories[0].assets[3], // Celana Jeans
    productCategories[0].assets[2], // Tas Mini
    productCategories[0].assets[5], // Sweater
  ];

  // Auto scroll for banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto scroll for featured
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatured((prev) => (prev + 1) % featuredProducts.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center">
              <img src="/logo.svg" alt="ThriftMap" className="h-12" />
            </Link>

            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Cari produk preloved..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/login" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors">
                <i className="fas fa-user"></i>
              </Link>
              <Link href="/login" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors relative">
                <i className="fas fa-shopping-bag"></i>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">0</span>
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <nav className="border-t border-gray-200">
            <ul className="flex items-center gap-8 py-3">
              <li><Link href="/" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Beranda</Link></li>
              <li className="relative group">
                <button className="text-gray-700 hover:text-green-600 font-medium transition-colors">Kategori</button>
              </li>
              <li><Link href="#product-featured" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Promo Pilihan</Link></li>
              <li><Link href="#under-50k" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Produk di Bawah 50k</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Banner Slider */}
      <section className="bg-gradient-to-r from-green-50 to-emerald-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {/* Slide 1 */}
              <div className="min-w-full relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8')" }}>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative h-full flex items-center">
                  <div className="max-w-lg mx-auto text-center text-white px-8">
                    <p className="text-lg mb-2">Fashion</p>
                    <h2 className="text-5xl font-bold mb-4">Preloved Premium</h2>
                    <p className="text-xl mb-6">Fashion pilihan dengan harga bersahabat, mulai dari <b>Rp 25.000</b></p>
                    <Link href="#" className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">Lihat Koleksi</Link>
                  </div>
                </div>
              </div>

              {/* Slide 2 */}
              <div className="min-w-full relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1591561954557-26941169b49e')" }}>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative h-full flex items-center">
                  <div className="max-w-lg mx-auto text-center text-white px-8">
                    <p className="text-lg mb-2">Aksesoris</p>
                    <h2 className="text-5xl font-bold mb-4">Aksesoris Unik</h2>
                    <p className="text-xl mb-6">Tambahkan detail unik dalam gaya Anda, mulai dari <b>Rp 15.000</b></p>
                    <Link href="#" className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">Belanja Sekarang</Link>
                  </div>
                </div>
              </div>

              {/* Slide 3 */}
              <div className="min-w-full relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b')" }}>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative h-full flex items-center">
                  <div className="max-w-lg mx-auto text-center text-white px-8">
                    <p className="text-lg mb-2">Penawaran Spesial</p>
                    <h2 className="text-5xl font-bold mb-4">Diskon Hingga 50%</h2>
                    <p className="text-xl mb-6">Hemat lebih banyak dengan belanja preloved, mulai dari <b>Rp 20.000</b></p>
                    <Link href="#" className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">Lihat Penawaran</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kategori Populer */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Kategori Populer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-xl shadow-lg p-8 text-center hover:-translate-y-2 transition-transform">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 text-4xl">
                  <i className={`fas fa-${category.id === 'women' ? 'venus' : category.id === 'men' ? 'mars' : category.id === 'kids' ? 'child' : 'home'}`}></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{category.category}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{category.subcategories.join(', ')}</p>
                <Link href="#" className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">Jelajahi</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Featured */}
      <section id="product-featured" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Pilihan Spesial Minggu Ini</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="aspect-square relative">
                  <img src={product.previewUrl} alt={product.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">Kondisi Sangat Baik</span>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">{product.title}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-green-600">Rp 85.000</span>
                    <span className="text-gray-400 line-through">Rp 150.000</span>
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">-43%</span>
                  </div>
                  <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                    🛒 Ambil Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Produk Baru Masuk */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Produk Baru Masuk</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product, index) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all group">
                <div className="aspect-square relative overflow-hidden">
                  <img src={product.previewUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-1">Kategori</p>
                  <h3 className="text-lg font-bold mb-2 text-gray-800">{product.title}</h3>
                  <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded mb-3">
                    {index % 2 === 0 ? 'Kondisi Baik' : 'Seperti Baru'}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-green-600">Rp {[120000, 65000, 95000, 42000][index].toLocaleString('id-ID')}</span>
                    <span className="text-sm text-gray-400 line-through">Rp {[150000, 85000, 130000, 60000][index].toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Produk di Bawah 50k */}
      <section id="under-50k" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Produk Dibawah 50 Ribu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {under50k.map((product, index) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all group">
                <div className="aspect-square relative overflow-hidden">
                  <img src={product.previewUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-1">Kategori</p>
                  <h3 className="text-lg font-bold mb-2 text-gray-800">{product.title}</h3>
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded mb-3">
                    {index % 2 === 0 ? 'Kondisi Baik' : 'Seperti Baru'}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-green-600">Rp {[35000, 45000, 38000, 42000][index].toLocaleString('id-ID')}</span>
                    <span className="text-sm text-gray-400 line-through">Rp {[50000, 65000, 55000, 60000][index].toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Mengapa Memilih ThriftMap?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-xl hover:-translate-y-2 transition-transform">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 text-5xl">
                <i className="fas fa-leaf"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Ramah Lingkungan</h3>
              <p className="text-gray-600 leading-relaxed">Setiap pembelian di ThriftMap berkontribusi pada pengurangan limbah fashion dan mendukung ekonomi sirkular yang berkelanjutan untuk bumi yang lebih baik.</p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-xl hover:-translate-y-2 transition-transform">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 text-5xl">
                <i className="fas fa-gem"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Kualitas Terjamin</h3>
              <p className="text-gray-600 leading-relaxed">Semua produk melalui proses kurasi ketat untuk memastikan kualitas terbaik. Kami hanya menawarkan barang preloved dalam kondisi baik dan layak pakai.</p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-xl hover:-translate-y-2 transition-transform">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 text-5xl">
                <i className="fas fa-wallet"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Harga Terjangkau</h3>
              <p className="text-gray-600 leading-relaxed">Dapatkan fashion berkualitas dengan harga yang ramah kantong. Hemat hingga 70% dibandingkan harga retail tanpa mengorbankan gaya dan kualitas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            <div>
              <h3 className="font-bold mb-4">Kategori Populer</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-green-400 transition-colors">Pakaian Wanita</Link></li>
                <li><Link href="#" className="hover:text-green-400 transition-colors">Pakaian Pria</Link></li>
                <li><Link href="#" className="hover:text-green-400 transition-colors">Anak & Bayi</Link></li>
                <li><Link href="#" className="hover:text-green-400 transition-colors">Barang & Peralatan</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Produk</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-green-400 transition-colors">Diskon</Link></li>
                <li><Link href="#" className="hover:text-green-400 transition-colors">Produk Baru</Link></li>
                <li><Link href="#" className="hover:text-green-400 transition-colors">Penjualan Terbaik</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Perusahaan Kami</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-green-400 transition-colors">Pengiriman</Link></li>
                <li><Link href="#" className="hover:text-green-400 transition-colors">Syarat dan Ketentuan</Link></li>
                <li><Link href="#" className="hover:text-green-400 transition-colors">Tentang Kami</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Layanan</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-green-400 transition-colors">Bantuan</Link></li>
                <li><Link href="#" className="hover:text-green-400 transition-colors">Hubungi Kami</Link></li>
                <li><Link href="#" className="hover:text-green-400 transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Kontak</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start gap-2">
                  <i className="fas fa-map-marker-alt mt-1"></i>
                  <span>Jl. Thrift No. 123<br />Jakarta Selatan, 12345</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-phone"></i>
                  <span>(021) 2345-6789</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-envelope"></i>
                  <span>hello@thriftmap.id</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Ikuti Kami</h3>
              <div className="flex gap-3 flex-wrap">
                <Link href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                  <i className="fab fa-instagram"></i>
                </Link>
                <Link href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                  <i className="fab fa-tiktok"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>Hak Cipta © 2025 ThriftMap - Style More, Spend Less.</p>
          </div>
        </div>
      </footer>

      {/* Font Awesome CDN */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
}
