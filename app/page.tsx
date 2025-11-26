"use client";

import Link from "next/link";
import { productCategories } from "./data/products";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentFeatured, setCurrentFeatured] = useState(0);
  const [scrolled, setScrolled] = useState(false);

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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className="bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-2xl' : 'bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50'}`}>
        {/* Animated gradient line */}
        <div className="h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 animate-gradient-x"></div>
        
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo with SVG - Enhanced */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-lg opacity-0 group-hover:opacity-40 blur-lg transition-all duration-700 animate-pulse-slow"></div>
                <div className="relative w-16 h-16 bg-gradient-to-br from-white to-gray-50 rounded-xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 border-2 border-green-200">
                  <img src="/logo.svg" alt="ThriftMap" className="w-14 h-14 object-contain" />
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-2xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  ThriftMap
                </div>
                <div className="text-xs font-bold text-green-500 tracking-wider">Style More, Spend Less ✨</div>
              </div>
            </Link>

            {/* Enhanced Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>
                <div className="relative">
                  <input
                    type="search"
                    placeholder="🔍 Cari produk preloved favorit kamu..."
                    className="w-full pl-12 pr-24 py-3.5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all bg-white shadow-lg font-medium"
                  />
                  <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-green-500 text-lg group-hover:scale-110 transition-transform"></i>
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all hover:scale-105">
                    Cari
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex items-center gap-3">
              <Link href="/login" className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl opacity-0 group-hover:opacity-100 blur transition-all duration-300"></div>
                <div className="relative w-11 h-11 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-110 hover:-rotate-12 duration-300">
                  <i className="fas fa-user text-white text-lg"></i>
                </div>
              </Link>
              
              <Link href="/login" className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl opacity-0 group-hover:opacity-100 blur transition-all duration-300"></div>
                <div className="relative w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-110 hover:rotate-12 duration-300">
                  <i className="fas fa-shopping-bag text-white text-lg"></i>
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg animate-bounce-slow border-2 border-white">0</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Enhanced Navigation */}
          <nav className="border-t border-green-200/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-100/20 to-transparent"></div>
            <ul className="flex items-center gap-2 py-3 relative">
              <li className="relative group">
                <Link href="/" className="px-4 py-2 text-gray-700 hover:text-green-600 font-semibold transition-all duration-300 flex items-center gap-2 rounded-lg hover:bg-green-50">
                  <i className="fas fa-home text-green-500 group-hover:scale-110 transition-transform"></i>
                  <span>Beranda</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-500 rounded-full"></span>
                </Link>
              </li>
              <li className="relative group">
                <button className="px-4 py-2 text-gray-700 hover:text-green-600 font-semibold transition-all duration-300 flex items-center gap-2 rounded-lg hover:bg-green-50">
                  <i className="fas fa-th-large text-green-500 group-hover:scale-110 transition-transform"></i>
                  <span>Kategori</span>
                  <i className="fas fa-chevron-down text-xs group-hover:rotate-180 transition-transform duration-300"></i>
                </button>
              </li>
              <li className="relative group">
                <Link href="#product-featured" className="px-4 py-2 text-gray-700 hover:text-green-600 font-semibold transition-all duration-300 flex items-center gap-2 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50">
                  <i className="fas fa-fire text-orange-500 animate-pulse"></i>
                  <span>Promo Pilihan</span>
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-bold animate-bounce-slow shadow-lg">HOT</span>
                </Link>
              </li>
              <li className="relative group">
                <Link href="#under-50k" className="px-4 py-2 text-gray-700 hover:text-green-600 font-semibold transition-all duration-300 flex items-center gap-2 rounded-lg hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50">
                  <i className="fas fa-tag text-yellow-500 group-hover:rotate-12 transition-transform"></i>
                  <span>Di Bawah 50k</span>
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-lg">HEMAT</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="px-4 py-2 text-gray-700 hover:text-green-600 font-semibold transition-all duration-300 flex items-center gap-2 rounded-lg hover:bg-green-50 group">
                  <i className="fas fa-star text-yellow-400 group-hover:animate-spin-slow"></i>
                  <span>Best Seller</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Banner Slider */}
      <section className="relative py-8 bg-gradient-to-br from-green-50 to-emerald-50 overflow-hidden">
        {/* Floating decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-300/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-emerald-300/20 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-green-200/30 rounded-full blur-xl animate-float-slow"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {/* Slide 1 */}
              <div className="min-w-full relative h-[450px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8')" }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                <div className="relative h-full flex items-center">
                  <div className="max-w-2xl ml-16 text-white px-8 space-y-5 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-2 rounded-full text-sm font-semibold shadow-lg animate-bounce-slow">
                      <i className="fas fa-sparkles"></i>
                      <span>Fashion Premium</span>
                      <i className="fas fa-sparkles"></i>
                    </div>
                    <h2 className="text-5xl font-bold leading-tight transform hover:scale-105 transition-transform duration-300">
                      Preloved Premium<br />
                      <span className="text-green-400 animate-pulse-glow">Style More, Spend Less</span>
                    </h2>
                    <p className="text-lg text-gray-200">Fashion pilihan dengan harga bersahabat, mulai dari <span className="text-xl font-bold text-green-400 animate-pulse">Rp 25.000</span></p>
                    <Link href="#" className="inline-flex items-center gap-3 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all hover:shadow-xl hover:shadow-green-500/50 hover:-translate-y-1 group">
                      <span>Lihat Koleksi</span>
                      <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Slide 2 */}
              <div className="min-w-full relative h-[450px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1591561954557-26941169b49e')" }}>
                <div className="absolute inset-0 bg-gradient-to-r from-green-900/60 to-transparent"></div>
                <div className="relative h-full flex items-center">
                  <div className="max-w-2xl ml-16 text-white px-8 space-y-5">
                    <div className="inline-block bg-green-600 px-4 py-2 rounded-lg text-sm font-semibold">
                      Koleksi Eksklusif
                    </div>
                    <h2 className="text-5xl font-bold leading-tight">
                      Aksesoris Unik<br />
                      <span className="text-green-300">Sempurnakan Gayamu</span>
                    </h2>
                    <p className="text-lg text-gray-200">Tambahkan detail unik dalam gaya Anda, mulai dari <span className="text-xl font-bold text-green-300">Rp 15.000</span></p>
                    <Link href="#" className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                      Belanja Sekarang
                    </Link>
                  </div>
                </div>
              </div>

              {/* Slide 3 */}
              <div className="min-w-full relative h-[450px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b')" }}>
                <div className="absolute inset-0 bg-gradient-to-r from-green-900/60 to-transparent"></div>
                <div className="relative h-full flex items-center">
                  <div className="max-w-2xl ml-16 text-white px-8 space-y-5">
                    <div className="inline-block bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold">
                      Promo Terbatas!
                    </div>
                    <h2 className="text-5xl font-bold leading-tight">
                      Diskon Hingga<br />
                      <span className="text-green-300">50% OFF!</span>
                    </h2>
                    <p className="text-lg text-gray-200">Hemat lebih banyak dengan belanja preloved, mulai dari <span className="text-xl font-bold text-green-300">Rp 20.000</span></p>
                    <Link href="#" className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                      Lihat Penawaran
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Slider Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${currentSlide === index ? 'w-8 bg-white' : 'w-2 bg-white/50'}`}
                ></button>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + 3) % 3)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % 3)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Kategori Populer */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">
              Kategori <span className="text-green-600">Populer</span>
            </h2>
            <p className="text-gray-600">
              Temukan berbagai pilihan fashion preloved berkualitas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productCategories.map((category, idx) => (
              <div key={category.id} className="group bg-white rounded-xl shadow-md p-6 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-green-300 cursor-pointer overflow-hidden relative" style={{ animationDelay: `${idx * 100}ms` }}>
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500 rounded-full translate-y-12 -translate-x-12"></div>
                </div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-green-600 text-3xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                  <i className={`fas fa-${category.id === 'women' ? 'venus' : category.id === 'men' ? 'mars' : category.id === 'kids' ? 'child' : 'home'} group-hover:animate-bounce-slow`}></i>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-800">{category.category}</h3>
                <p className="text-gray-600 mb-4 text-sm">{category.subcategories.join(', ')}</p>
                <Link href="#" className="inline-block bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                  Jelajahi
                </Link>
                <div className="mt-3 text-xs text-gray-500">
                  {category.assets.length} produk
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Featured */}
      <section id="product-featured" className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold mb-3">
              Hot Deals Minggu Ini
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-3">
              Pilihan <span className="text-green-600">Spesial</span> Untuk Kamu
            </h2>
            <p className="text-gray-600">
              Produk pilihan dengan penawaran terbaik
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative h-72 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                  <img src={product.previewUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {/* Quick view overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-bold shadow-xl transform scale-90 group-hover:scale-100 transition-transform flex items-center gap-2">
                      <i className="fas fa-eye"></i>
                      <span>Quick View</span>
                    </button>
                  </div>
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse">
                    <i className="fas fa-fire mr-1"></i>-43% OFF
                  </div>
                  {/* Verified badge */}
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                    <i className="fas fa-check-circle"></i>
                    <span>Verified</span>
                  </div>
                </div>
                <div className="p-6">
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-lg text-xs font-semibold">Kondisi Sangat Baik</span>
                  <h3 className="text-xl font-bold mt-3 mb-2 text-gray-800">{product.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-green-600">Rp 85.000</span>
                    <span className="text-sm text-gray-400 line-through">Rp 150.000</span>
                  </div>
                  <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                    Beli Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Produk Baru Masuk */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">
              Koleksi <span className="text-green-600">Terbaru</span>
            </h2>
            <p className="text-gray-600">
              Update fashion terkini dari seller terpercaya
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product, index) => (
              <div key={product.id} className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="relative h-72 overflow-hidden bg-gray-100">
                  <img src={product.previewUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-700" />
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors transform hover:scale-110 shadow-lg">
                      <i className="fas fa-heart"></i>
                    </button>
                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors transform hover:scale-110 shadow-lg">
                      <i className="fas fa-shopping-cart"></i>
                    </button>
                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors transform hover:scale-110 shadow-lg">
                      <i className="fas fa-eye"></i>
                    </button>
                  </div>
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-bold">
                    NEW
                  </div>
                </div>
                <div className="p-4">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-semibold">
                    {index % 2 === 0 ? 'Kondisi Baik' : 'Seperti Baru'}
                  </span>
                  <h3 className="text-base font-bold mt-2 mb-2 text-gray-800">{product.title}</h3>
                  <div className="flex items-end gap-2 mb-3">
                    <span className="text-xl font-bold text-green-600">Rp {[120, 65, 95, 42][index]}k</span>
                    <span className="text-xs text-gray-400 line-through">Rp {[150, 85, 130, 60][index]}k</span>
                  </div>
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm">
                    Tambah ke Keranjang
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Produk di Bawah 50k */}
      <section id="under-50k" className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">
              Produk <span className="text-green-600">Under 50K</span>
            </h2>
            <p className="text-gray-600">
              Fashion berkualitas dengan harga terjangkau
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {under50k.map((product, index) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="relative h-72 overflow-hidden">
                  <img src={product.previewUrl} alt={product.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-2 rounded-lg text-xs font-bold">
                    Under 50K
                  </div>
                </div>
                <div className="p-4">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-semibold">
                    {index % 2 === 0 ? 'Kondisi Baik' : 'Seperti Baru'}
                  </span>
                  <h3 className="text-base font-bold mt-2 mb-2 text-gray-800">{product.title}</h3>
                  <span className="text-xl font-bold text-green-600">Rp {[35, 45, 38, 42][index]}k</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Showcase Gallery */}
      <section className="py-16 bg-gradient-to-b from-green-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">
              Lihat <span className="text-green-600">Koleksi Kami</span>
            </h2>
            <p className="text-gray-600">Ribuan pilihan fashion preloved berkualitas tinggi</p>
          </div>
          
          {/* Image Grid with hover effects */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              'https://images.unsplash.com/photo-1523381210434-271e8be1f52b',
              'https://images.unsplash.com/photo-1560243563-062bfc001d68',
              'https://images.unsplash.com/photo-1591047139829-d91aecb6caea',
              'https://images.unsplash.com/photo-1434389677669-e08b4cac3105',
              'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03',
              'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf',
              'https://images.unsplash.com/photo-1509631179647-0177331693ae',
              'https://images.unsplash.com/photo-1581655353564-df123a1eb820',
            ].map((img, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                <div className="aspect-square relative">
                  <img src={img} alt={`Fashion ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-3 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                    <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full font-bold text-green-600 shadow-xl flex items-center gap-2">
                      <i className="fas fa-search-plus"></i>
                      <span>Lihat Detail</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">"
            <h2 className="text-4xl font-bold text-gray-800 mb-3">
              Kenapa Pilih <span className="text-green-600">ThriftMap</span>
            </h2>
            <p className="text-gray-600 mb-2">
              Belanja preloved dengan aman dan nyaman
            </p>
            <p className="text-green-600 font-semibold text-lg">
              Style More, Spend Less ✨
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: 'leaf', title: 'Ramah Lingkungan', desc: 'Setiap pembelian di ThriftMap berkontribusi pada pengurangan limbah fashion dan mendukung ekonomi sirkular.' },
              { icon: 'gem', title: 'Kualitas Terjamin', desc: 'Semua produk melalui proses kurasi ketat untuk memastikan kualitas terbaik.' },
              { icon: 'wallet', title: 'Harga Terjangkau', desc: 'Dapatkan fashion berkualitas dengan harga yang ramah kantong. Hemat hingga 70% dibandingkan harga retail.' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-green-50 rounded-xl p-8 text-center hover:shadow-md transition-shadow">
                <div className="w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-4">
                  <i className={`fas fa-${feature.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-10 shadow-2xl relative overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20 animate-float"></div>
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-30 translate-y-30 animate-float-delayed"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
              {[
                { icon: 'users', value: '10K+', label: 'Pengguna Aktif' },
                { icon: 'box', value: '50K+', label: 'Produk Tersedia' },
                { icon: 'star', value: '4.9', label: 'Rating Rata-rata' },
                { icon: 'leaf', value: '25T+', label: 'CO2 Tersimpan' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center text-white group cursor-pointer transform hover:scale-110 transition-all duration-300" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="relative inline-block mb-3">
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                    <i className={`fas fa-${stat.icon} text-5xl relative group-hover:animate-bounce-slow`}></i>
                  </div>
                  <div className="text-4xl font-bold mb-1 group-hover:text-yellow-300 transition-colors">{stat.value}</div>
                  <div className="text-green-100 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
        {/* Gen Z Newsletter Section - Trendy & Engaging */}
        <div className="relative py-24 overflow-hidden">
          {/* Animated gradient background with more vibrant colors */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-950/80 via-emerald-900/60 to-green-900/80"></div>
          
          {/* Gradient mesh background */}
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-0 -left-1/2 w-full h-full bg-gradient-to-r from-green-500/20 via-transparent to-transparent blur-3xl"></div>
            <div className="absolute bottom-0 -right-1/2 w-full h-full bg-gradient-to-l from-emerald-500/20 via-transparent to-transparent blur-3xl"></div>
          </div>

          {/* Floating Gen Z style elements */}
          <div className="absolute top-10 left-10 w-24 h-24 bg-green-400/20 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-20 right-12 w-32 h-32 bg-emerald-400/15 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/3 right-20 w-20 h-20 bg-teal-400/25 rounded-full blur-2xl animate-float-slow"></div>

          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Copy & CTAs */}
              <div className="space-y-8">
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-400/20 backdrop-blur-sm rounded-full border border-green-400/40">
                  <span className="text-2xl">✨</span>
                  <span className="text-sm font-bold text-green-300 uppercase tracking-wider">Join Our Community</span>
                </div>

                {/* Main Heading - Gen Z friendly */}
                <div className="space-y-4">
                  <h3 className="text-6xl lg:text-7xl font-black bg-gradient-to-r from-green-300 via-green-200 to-emerald-300 bg-clip-text text-transparent leading-tight">
                    Stay <span className="inline-block animate-bounce">Fresh</span>
                  </h3>
                  <p className="text-2xl font-bold text-white">
                    Get exclusive drops, insider tips & secret deals 🎉
                  </p>
                </div>

                {/* Subheading with vibes */}
                <p className="text-lg text-gray-200 leading-relaxed max-w-md">
                  Join 50K+ fashion lovers who've unlocked the thrift game. New collections every week + personalized recommendations just for you.
                </p>

                {/* Quick Features */}
                <div className="space-y-3">
                  {[
                    { emoji: '🔥', text: 'Early access to new drops' },
                    { emoji: '💚', text: 'VIP member perks & rewards' },
                    { emoji: '🎯', text: 'Curated picks from your style' }
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-white font-semibold group cursor-pointer">
                      <span className="text-2xl group-hover:scale-125 transition-transform">{feature.emoji}</span>
                      <span className="group-hover:translate-x-1 transition-transform">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* Newsletter Form - Inline */}
                <div className="pt-2 space-y-3">
                  <form className="relative group">
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        {/* Animated border */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-300 blur"></div>
                        <input
                          type="email"
                          placeholder="your email..."
                          className="relative w-full px-6 py-4 bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl text-white placeholder:text-gray-400 focus:outline-none transition-all duration-300 hover:bg-white/20 focus:bg-white/25 focus:border-white/50 text-base"
                        />
                      </div>
                      <button className="relative group/btn px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl font-bold text-black hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 overflow-hidden">
                        <span className="relative z-10 flex items-center gap-2">
                          Join
                          <i className="fas fa-arrow-right group-hover/btn:translate-x-1 transition-transform"></i>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                      </button>
                    </div>
                  </form>
                  <p className="text-xs text-gray-400">No spam, just good vibes. Unsubscribe anytime. 💚</p>
                </div>
              </div>

              {/* Right Side - Cards Grid */}
              <div className="space-y-6">
                {/* Main Benefit Card */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400/50 via-emerald-400/50 to-green-400/50 rounded-3xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/30 rounded-3xl p-8 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h4 className="text-2xl font-black text-white">Insider Access</h4>
                        <p className="text-sm text-gray-300">Get notified first about the best finds</p>
                      </div>
                      <span className="text-5xl">👑</span>
                    </div>
                    <div className="pt-2 space-y-2">
                      <div className="flex items-center gap-2 text-green-300">
                        <i className="fas fa-check text-lg"></i>
                        <span className="text-sm font-semibold">Flash sales 48h before public</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-300">
                        <i className="fas fa-check text-lg"></i>
                        <span className="text-sm font-semibold">Extra 15% off all purchases</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Proof Cards - 2 columns */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { number: '50K+', label: 'Addicted', emoji: '🔥', color: 'from-green-400 to-emerald-500' },
                    { number: '98%', label: 'Happy', emoji: '😍', color: 'from-emerald-400 to-teal-500' }
                  ].map((stat, idx) => (
                    <div key={idx} className="group cursor-pointer">
                      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:border-white/40 transition-all duration-300 text-center space-y-2">
                        <span className="text-4xl block group-hover:scale-125 transition-transform">{stat.emoji}</span>
                        <div className={`text-2xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.number}</div>
                        <div className="text-xs text-gray-300 font-semibold">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Testimonial Card */}
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md border border-green-400/30 rounded-2xl p-6 space-y-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star text-yellow-400 text-sm"></i>
                    ))}
                  </div>
                  <p className="text-sm italic text-white">
                    "literally changed how i shop. finding pieces i actually love + saving money? obsessed"
                  </p>
                  <p className="text-xs font-bold text-green-300">— Sarah, 22 • Jakarta</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-white to-gray-100 rounded-xl flex items-center justify-center shadow-lg border-2 border-green-200">
                  <img src="/logo.svg" alt="ThriftMap" className="w-14 h-14 object-contain" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-2xl font-black bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent">ThriftMap</h3>
                  <p className="text-green-300 text-xs font-bold uppercase tracking-wide">Style More, Spend Less</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">Platform marketplace fashion preloved terpercaya di Indonesia.</p>
              <div className="flex gap-2">
                {[
                  { icon: 'facebook-f' },
                  { icon: 'twitter' },
                  { icon: 'instagram' },
                  { icon: 'youtube' },
                ].map((social) => (
                  <a key={social.icon} href="#" className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                    <i className={`fab fa-${social.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Tentang Kami', 'Cara Belanja', 'Syarat & Ketentuan', 'Blog'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-lg font-bold mb-4">Customer Service</h4>
              <ul className="space-y-2">
                {['Pusat Bantuan', 'Pembayaran', 'Pengiriman', 'Pengembalian'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-4">Hubungi Kami</h4>
              <ul className="space-y-3">
                <li className="flex gap-3 text-gray-300 text-sm">
                  <i className="fas fa-map-marker-alt text-green-400 mt-1"></i>
                  <span>Jakarta Selatan, Indonesia</span>
                </li>
                <li className="flex gap-3 text-gray-300 text-sm">
                  <i className="fas fa-phone text-green-400 mt-1"></i>
                  <span>+62 812-3456-7890</span>
                </li>
                <li className="flex gap-3 text-gray-300 text-sm">
                  <i className="fas fa-envelope text-green-400 mt-1"></i>
                  <span>support@thriftmap.id</span>
                </li>
              </ul>
            </div>
          </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto px-4 border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm">&copy; 2025 ThriftMap. All rights reserved.</p>
        </div>
      </footer>

      {/* Font Awesome CDN */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      
      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(134, 239, 172, 0.5); }
          50% { text-shadow: 0 0 40px rgba(134, 239, 172, 0.8); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
          background-size: 200% 200%;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
