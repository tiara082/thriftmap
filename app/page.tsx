'use client';

import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import { productCategories } from '@/app/data/products';

interface HeroSlide {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  accentGradient: string;
  highlights: Array<{ value: string; label: string; icon: string }>;
}

interface TrendingItem {
  id: string;
  title: string;
  description: string;
  previewUrl: string;
  price: string;
  previous: string;
  condition: string;
  highlight: string;
}

const heroSlides: HeroSlide[] = [
  {
    eyebrow: "✨ PAKAIAN PILIHAN MINGGU INI",
    title: "Koleksi fashion berkualitas dengan harga terjangkau",
    description:
      "Branded mulai 45K aja! 🔥 Dijamin ori & verified, harga ramah kantong!",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1600&q=80",
    primary: { label: "Belanja Sekarang", href: "#trending" },
    secondary: { label: "Lihat Koleksi", href: "#collections" },
    accentGradient:
      "radial-gradient(120% 120% at 50% 0%, rgba(16,185,129,0.28) 0%, rgba(16,185,129,0.07) 55%, rgba(255,255,255,0) 85%)",
    highlights: [
      { value: "✓ Verified", label: "100% Original", icon: "fa-solid fa-certificate" },
      { value: "Diskon 30%", label: "Hemat Banget!", icon: "fa-solid fa-tags" },
      { value: "Free Ongkir", label: "Se-Indonesia", icon: "fa-solid fa-truck-fast" },
    ],
  },
  {
    eyebrow: "💰 JUAL BARANG LAMA KAMU",
    title: "Ubah lemari kamu jadi cuan tambahan",
    description:
      "Upload, set harga, langsung laku! 💸 Join 3K+ seller yang udah cuan!",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1600&q=80",
    primary: { label: "Mulai Berjualan", href: "#trending" },
    secondary: { label: "Syarat & Ketentuan", href: "#collections" },
    accentGradient:
      "radial-gradient(120% 120% at 50% 0%, rgba(217,249,157,0.25) 0%, rgba(74,222,128,0.15) 45%, rgba(255,255,255,0) 85%)",
    highlights: [
      { value: "3K+ Seller", label: "Komunitas Aktif", icon: "fa-solid fa-users" },
      { value: "Komisi 5%", label: "Paling Murah!", icon: "fa-solid fa-hand-holding-dollar" },
      { value: "Cepat Laku", label: "Dijamin Sold!", icon: "fa-solid fa-bolt-lightning" },
    ],
  },
  {
    eyebrow: "🌱 BELANJA HEMAT, SELAMATKAN BUMI",
    title: "Belanja thrift = support sustainable fashion!",
    description:
      "Go green, stay stylish! 🌿 Thrift = kurangi sampah tekstil bareng!",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1600&q=80",
    primary: { label: "Mulai Berbelanja", href: "#trending" },
    secondary: { label: "Pelajari Dampaknya", href: "#impact" },
    accentGradient:
      "radial-gradient(120% 120% at 50% 0%, rgba(45,212,191,0.28) 0%, rgba(16,185,129,0.1) 55%, rgba(255,255,255,0) 90%)",
    highlights: [
      { value: "25K Ton", label: "Waste Saved", icon: "fa-solid fa-seedling" },
      { value: "50K+ Users", label: "Green Community 💚", icon: "fa-solid fa-people-group" },
      { value: "Eco Impact", label: "Real Change", icon: "fa-solid fa-arrow-rotate-left" },
    ],
  },
];

const priceRanges = [
  {
    label: "Di Bawah Rp 100K",
    description: "Pakaian casual berkualitas untuk daily wear dari berbagai brand.",
    price: "Mulai Rp 45K",
    accent: "bg-[#dcfce7]",
  },
  {
    label: "Rp 100K - Rp 300K",
    description: "Brand lokal dan impor pilihan dengan kualitas premium.",
    price: "Mulai Rp 120K",
    accent: "bg-[#bbf7d0]",
  },
  {
    label: "Di Atas Rp 300K",
    description: "Designer dan brand internasional ternama dengan garansi keaslian.",
    price: "Mulai Rp 350K",
    accent: "bg-[#86efac]",
  },
];

const howItWorks = [
  {
    title: "Cari & Pilih",
    description:
      "Jelajahi ribuan produk pilihan, filter sesuai kategori dan harga yang Anda inginkan.",
    icon: "fa-solid fa-magnifying-glass",
  },
  {
    title: "Negosiasi & Tanya",
    description:
      "Chat langsung dengan penjual, tanyakan detail produk, dan negosiasikan harga.",
    icon: "fa-solid fa-comments",
  },
  {
    title: "Pembayaran Aman",
    description:
      "Pembayaran melalui e-wallet, transfer bank, atau COD dengan sistem escrow terpercaya.",
    icon: "fa-solid fa-lock",
  },
  {
    title: "Terima & Nikmati",
    description:
      "Produk sampai dengan aman, verifikasi kualitas, dan nikmati pembelian Anda.",
    icon: "fa-solid fa-box",
  },
];

const communityStats = [
  { value: "50K+", label: "Pembeli Bulanan" },
  { value: "3K+", label: "Penjual Aktif" },
  { value: "500K+", label: "Produk Tersedia" },
  { value: "4.8★", label: "Rating Kepuasan" },
];

const trustFeatures = [
  {
    icon: "fa-solid fa-certificate",
    title: "Verifikasi Produk",
    description: "Setiap item melalui pemeriksaan keaslian dan kualitas.",
  },
  {
    icon: "fa-solid fa-shield-halved",
    title: "Pembayaran Aman",
    description: "Sistem escrow melindungi pembeli dan penjual.",
  },
  {
    icon: "fa-solid fa-truck",
    title: "Pengiriman Terjamin",
    description: "Gratis ongkir dan asuransi untuk semua pembelian.",
  },
];

const marqueeItems = [
  "Pakaian Autentik",
  "Harga Terjangkau",
  "Koleksi Lengkap",
  "Belanja Hemat",
  "Penjual Terpercaya",
  "Mode Berkelanjutan",
];

const trendingFallbacks = [
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=900&q=80",
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    
    // Scroll Progress
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.pageYOffset;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Intersection Observer for Section Animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.animate-section').forEach((section) => {
      observer.observe(section);
    });
    
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const activeSlide = heroSlides[currentSlide];

  const trendingItems: TrendingItem[] = useMemo(() => {
    const sources = [
      productCategories[0]?.assets[0],
      productCategories[1]?.assets[0],
      productCategories[2]?.assets[0],
      productCategories[3]?.assets[0],
    ];

    const fallbacks = [
      {
        id: "fallback-1",
        title: "Dress Vintage Floral",
        description: "Dress vintage dengan motif floral yang elegan dan nyaman dipakai.",
      },
      {
        id: "fallback-2",
        title: "Kemeja Denim Pria",
        description: "Kemeja denim berkualitas bagus, cocok untuk kasual maupun formal.",
      },
      {
        id: "fallback-3",
        title: "Pakaian Bayi Lucu",
        description: "Baju bayi berkualitas yang nyaman dan aman untuk si kecil.",
      },
      {
        id: "fallback-4",
        title: "Peralatan Dapur Premium",
        description: "Set peralatan dapur stainless steel yang tahan lama dan modern.",
      },
    ];

    return sources.map((asset, index) => {
      const fallback = fallbacks[index];
      const previewUrl = asset?.previewUrl ? `${asset.previewUrl}?auto=format&fit=crop&w=900&q=80` : trendingFallbacks[index];

      return {
        id: asset?.id ?? fallback.id,
        title: asset?.title ?? fallback.title,
        description: asset?.description ?? fallback.description,
        previewUrl,
        price: ["Rp 165K", "Rp 225K", "Rp 195K", "Rp 275K"][index],
        previous: ["Rp 350K", "Rp 450K", "Rp 400K", "Rp 500K"][index],
        condition: ["Seperti Baru", "Sangat Bagus", "Bagus", "Seperti Baru"][index],
        highlight: ["Populer", "Diskon Besar", "Terjual Cepat", "Pilihan Terbaik"][index],
      } satisfies TrendingItem;
    });
  }, []);

  const curatedCollections = [
    {
      title: "Fashion Kasual Wanita",
      description: "Koleksi pakaian casual wanita yang trendy dan nyaman untuk sehari-hari.",
      image: productCategories[0]?.assets[0]?.previewUrl
        ? `${productCategories[0].assets[0].previewUrl}?auto=format&fit=crop&w=1200&q=80`
        : "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=80",
      href: "#",
      tags: ["Casual", "Wanita", "Terjangkau"],
    },
    {
      title: "Fashion Pria Modern",
      description: "Pilihan pakaian pria dari casual hingga smart casual yang elegan.",
      image: productCategories[1]?.assets[0]?.previewUrl
        ? `${productCategories[1].assets[0].previewUrl}?auto=format&fit=crop&w=1200&q=80`
        : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
      href: "#",
      tags: ["Pria", "Modern", "Premium"],
    },
    {
      title: "Barang Rumah Tangga",
      description: "Peralatan rumah tangga dan dekorasi berkualitas dengan harga bersahabat.",
      image: productCategories[3]?.assets[0]?.previewUrl
        ? `${productCategories[3].assets[0].previewUrl}?auto=format&fit=crop&w=1200&q=80`
        : "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80",
      href: "#",
      tags: ["Rumah", "Dekorasi", "Peralatan"],
    },
  ];

  return (
    <>
      <Head>
        <title>Style More, Spend Less</title>
        <meta name="description" content="Koleksi fashion berkualitas, harga terjangkau. Style More, Spend Less di ThriftMap!" />
      </Head>
      <div className="relative min-h-screen bg-[#f7f7f5] text-slate-900">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full bg-gradient-to-br from-emerald-600 to-lime-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 ${
          scrollProgress > 10 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <i className="fa-solid fa-arrow-up text-lg" />
      </button>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-100 z-50">
        <div 
          className="h-full bg-gradient-to-r from-emerald-600 via-lime-500 to-teal-600 transition-all duration-200 shadow-lg shadow-emerald-500/50"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-1 z-40 border-b border-slate-200/60 glass-effect bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 transition-all duration-500">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-90 transition-opacity">
            <img
              src="/logo.svg"
              alt="ThriftMap"
              className="h-9 sm:h-12 w-auto"
            />
            <div className="flex flex-col">
              <span className="text-base sm:text-xl font-display font-black bg-gradient-to-r from-emerald-600 to-lime-500 bg-clip-text text-transparent">Style More</span>
              <span className="text-[10px] sm:text-xs font-display font-bold uppercase tracking-wider sm:tracking-widest text-emerald-600">Spend Less</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <Link href="#categories" className="transition hover:text-emerald-600 hover:-translate-y-1 flex items-center gap-2">
              <i className="fa-solid fa-th-large text-emerald-500" />
              Kategori
            </Link>
            <Link href="#trending" className="transition hover:text-emerald-600 hover:-translate-y-1 flex items-center gap-2">
              <i className="fa-solid fa-fire text-lime-500" />
              Tren Sekarang
            </Link>
            <Link href="#collections" className="transition hover:text-emerald-600 hover:-translate-y-1 flex items-center gap-2">
              <i className="fa-solid fa-star text-lime-500" />
              Koleksi
            </Link>
            <Link href="#impact" className="transition hover:text-emerald-600 hover:-translate-y-1 flex items-center gap-2">
              <i className="fa-solid fa-leaf text-emerald-500" />
              Tentang Kami
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium">
            <Link
              href="/login-user"
              className="hidden sm:flex rounded-full border border-slate-300/60 px-3 sm:px-5 py-2 sm:py-2.5 text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50/50 items-center gap-2"
            >
              <i className="fa-solid fa-user" />
              <span className="hidden sm:inline">Masuk</span>
            </Link>
            <Link
              href="/login-seller"
              className="rounded-full bg-gradient-to-r from-emerald-600 to-lime-500 px-4 sm:px-5 py-2 sm:py-2.5 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 font-semibold flex items-center gap-1.5 sm:gap-2 group text-xs sm:text-sm"
            >
              <i className="fa-solid fa-shop group-hover:rotate-12 transition-transform" />
              <span>Jual</span>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#f9fef7]">
          <div
            className="pointer-events-none absolute inset-0 hero-gradient"
            style={{ backgroundImage: activeSlide.accentGradient }}
          />
          <div className="absolute -left-32 top-0 hidden h-80 w-80 rounded-full bg-emerald-200/40 blur-[140px] md:block animate-floating-slow" />
          <div className="absolute -bottom-40 right-[-80px] hidden h-72 w-72 rounded-full bg-lime-300/30 blur-[130px] md:block animate-floating-medium" />
          <div className="absolute left-[10%] top-20 hidden h-32 w-32 rounded-full border-2 border-emerald-200/50 bg-white/40 backdrop-blur md:flex animate-floating-fast" />

          <div className="relative mx-auto grid max-w-6xl gap-8 sm:gap-12 px-4 py-12 sm:py-16 lg:grid-cols-12 lg:py-20">
            <div className="lg:col-span-6 space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-left-6 duration-700"
            >
              <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wide sm:tracking-[0.35em] text-emerald-600 animate-pulse">
                <i className="fa-solid fa-star text-lime-500 animate-spin-slow" />
                {activeSlide.eyebrow}
              </span>
              <h1 className="text-2xl sm:text-4xl font-display font-black leading-[1.1] text-slate-900 lg:text-5xl tracking-tight">
                {activeSlide.title}
              </h1>
              <p className="max-w-xl text-base sm:text-lg text-slate-600 lg:text-xl font-medium">
                {activeSlide.description}
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
                <Link
                  href={activeSlide.primary.href}
                  className="rounded-full bg-gradient-to-r from-emerald-600 to-lime-500 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-display font-bold text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 hover:scale-105 transform text-center"
                >
                  {activeSlide.primary.label} 🛍️
                </Link>
                <Link
                  href={activeSlide.secondary.href}
                  className="rounded-full border-2 border-emerald-600 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-display font-bold text-emerald-600 transition-all hover:-translate-y-1 hover:bg-emerald-50 text-center"
                >
                  {activeSlide.secondary.label} 👀
                </Link>
              </div>
              <div className="grid gap-2.5 sm:gap-3 pt-2 sm:pt-4 grid-cols-1 sm:grid-cols-2">
                {activeSlide.highlights.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-2xl border border-emerald-100/60 bg-white/75 px-4 py-3 text-sm font-medium text-slate-700 shadow-[0_10px_30px_rgba(15,76,58,0.08)] backdrop-blur transition-all hover:-translate-y-1 hover:shadow-lg hover:border-emerald-200"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 flex-shrink-0 text-lg">
                      <i className={item.icon} />
                    </span>
                    <div>
                      <div className="text-base font-bold text-emerald-700">{item.value}</div>
                      <div className="text-xs uppercase tracking-wider text-slate-500">{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="relative lg:col-span-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150"
            >
              <div className="relative overflow-hidden rounded-[32px] border border-white shadow-[0_20px_60px_rgba(15,76,58,0.22)]">
                <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={activeSlide.image}
                    alt={activeSlide.title}
                    className="h-full w-full object-cover transition-transform duration-1000 hover:scale-110"
                  />
                </div>
                <div className="absolute inset-4 rounded-[28px] border border-white/70 pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-3xl bg-white/90 px-4 py-3 text-xs font-bold uppercase tracking-wider text-emerald-600 shadow-lg backdrop-blur animate-bounce-subtle">
                  <span>Belanja Hemat</span>
                  <span className="h-5 w-px bg-emerald-200" />
                  <span>Mode Berkualitas</span>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-3 justify-center">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.eyebrow}
                    aria-label={`Slide ${index + 1}`}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all duration-500 rounded-full ${
                      index === currentSlide
                        ? "bg-emerald-600 w-12 h-3 shadow-lg"
                        : "bg-slate-300 w-3 h-3 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div className="border-y border-emerald-100 bg-gradient-to-r from-[#eef6f1] to-[#f0fdf4]">
          <div className="relative overflow-hidden">
            <div className="marquee-overlay" />
            <div className="marquee-track flex min-w-full gap-10 whitespace-nowrap py-5 text-sm font-bold uppercase tracking-wider text-emerald-700">
              {marqueeItems.concat(marqueeItems).map((item, index) => (
                <span key={`${item}-${index}`} className="flex items-center gap-3 animate-scroll">
                  {item}
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <section id="categories" className="bg-[#eef6f1] py-24 animate-section">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row sm:items-end sm:justify-between mb-10 sm:mb-16 animate-fade-in-up">
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 lg:text-4xl mb-2 sm:mb-3 tracking-tight">
                  Jelajahi Kategori 🔍
                </h2>
                <p className="text-sm sm:text-base text-slate-600 font-medium">
                  Temukan apa yang kamu cari dengan mudah dari berbagai kategori.
                </p>
              </div>
              <Link
                href="#"
                className="text-sm font-bold text-emerald-700 transition hover:text-emerald-800 hover:gap-2 inline-flex items-center gap-1"
              >
                Lihat Semua <i className="fa-solid fa-arrow-right" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {productCategories.map((category, index) => {
                const primaryAsset = category.assets[0];
                const icons = ["fa-solid fa-female", "fa-solid fa-male", "fa-solid fa-child", "fa-solid fa-home"];
                const bgColors = ["bg-emerald-500", "bg-lime-500", "bg-teal-500", "bg-green-600"];
                
                // Get proper image URL with fallback
                let imageUrl = "";
                if (primaryAsset?.previewUrl && primaryAsset.previewUrl.includes("http")) {
                  imageUrl = primaryAsset.previewUrl;
                } else {
                  const fallbacks = [
                    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=500&q=80",
                    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=500&q=80",
                    "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=500&q=80",
                    "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=500&q=80",
                  ];
                  imageUrl = fallbacks[index];
                }
                
                return (
                  <Link
                    key={category.id}
                    href="#"
                    className="group flex h-full flex-col justify-between rounded-3xl border border-slate-100/70 bg-white p-6 shadow-[0_12px_35px_rgba(15,76,58,0.08)] transition-all duration-500 hover:border-emerald-200 hover:shadow-[0_25px_65px_rgba(15,76,58,0.15)] hover:-translate-y-2 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div>
                      <div className="relative mb-4">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200">
                          <img
                            src={imageUrl}
                            alt={category.category}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=80`;
                            }}
                          />
                          <div className={`absolute top-3 right-3 h-12 w-12 flex items-center justify-center rounded-full ${bgColors[index]} text-white text-xl shadow-lg transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500`}>
                            <i className={icons[index]} />
                          </div>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2 group-hover:text-emerald-600 transition-colors">
                        {category.category}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {category.subcategories.join(" • ")}
                      </p>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 group-hover:gap-3 transition-all">
                      Jelajahi <i className="fa-solid fa-arrow-right text-xs transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trending Section */}
        <section id="trending" className="bg-gradient-to-b from-white via-[#fdfdfb] to-[#eef6f1] py-16 sm:py-24 animate-section">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row sm:items-end sm:justify-between mb-10 sm:mb-16 animate-fade-in-up">
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 lg:text-4xl mb-2 sm:mb-3 tracking-tight">
                  Lagi Viral Nih! 🔥
                </h2>
                <p className="text-sm sm:text-base text-slate-600 font-medium">
                  Produk pilihan yang lagi hype dan banyak diburu!
                </p>
              </div>
              <Link
                href="#"
                className="text-xs sm:text-sm font-bold text-emerald-700 transition hover:text-emerald-800 hover:gap-2 inline-flex items-center gap-1"
              >
                Lihat Semua <i className="fa-solid fa-arrow-right" />
              </Link>
            </div>

            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {trendingItems.map((item, index) => (
                <div
                  key={item.id}
                  className="group flex h-full flex-col rounded-3xl border border-slate-100/60 bg-white/95 p-5 shadow-[0_16px_45px_rgba(15,76,58,0.1)] backdrop-blur-sm transition-all duration-500 hover:border-emerald-200/80 hover:bg-white hover:shadow-[0_28px_70px_rgba(15,76,58,0.2)] hover:card-hover hover:-translate-y-3 animate-fade-in-up"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 mb-4">
                    <img
                      src={item.previewUrl}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = trendingFallbacks[0];
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur text-emerald-500 hover:bg-emerald-50 transition-all transform hover:scale-110">
                        <i className="fa-solid fa-heart" />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-50 to-lime-50 px-3 py-1.5 text-xs font-bold text-emerald-700 border border-emerald-100/60">
                        <i className="fa-solid fa-fire text-lime-500 animate-bounce-slow" />
                        {item.highlight}
                      </span>
                      {index === 0 && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-lime-100 to-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700">
                          <i className="fa-solid fa-crown" />
                          TOP
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2">{item.description}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-emerald-600">{item.price}</span>
                      <span className="text-sm font-medium text-slate-400 line-through">{item.previous}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <i className="fa-solid fa-check-circle" />
                        {item.condition}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-white py-24 animate-section">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-10 sm:mb-16 animate-fade-in-up">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 lg:text-4xl mb-3 sm:mb-4 px-4">
                Cara Berbelanja di ThriftMap
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-4">
                Proses belanja yang mudah, aman, dan menyenangkan dimulai dari sini.
              </p>
            </div>

            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {howItWorks.map((step, index) => (
                <div
                  key={step.title}
                  className="relative flex flex-col items-center text-center animate-fade-in-up group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-6 relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600 via-lime-500 to-emerald-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-lime-500 text-white text-3xl shadow-xl transform transition-all group-hover:scale-125 group-hover:rotate-12">
                      <i className={step.icon} />
                    </div>
                    <div className="absolute -bottom-2 -right-2 h-8 w-8 flex items-center justify-center rounded-full bg-gradient-to-r from-lime-400 to-emerald-500 text-white text-lg font-bold shadow-lg border-2 border-white">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-sm text-slate-600">{step.description}</p>
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute -right-8 top-12">
                      <i className="fa-solid fa-arrow-right text-3xl text-emerald-300 group-hover:text-emerald-400 transition-colors animate-pulse" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Price Range Section */}
        <section className="bg-gradient-to-b from-white via-emerald-50/30 to-white py-16 sm:py-24 relative overflow-hidden animate-section">
          {/* Background Decorations */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl animate-floating-slow" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-lime-200/20 rounded-full blur-3xl animate-floating-medium" />
          
          <div className="mx-auto max-w-6xl px-4 relative z-10">
            <div className="text-center mb-10 sm:mb-16 animate-fade-in-up">
              <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-600 mb-3 sm:mb-4 bg-emerald-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                <i className="fa-solid fa-tags animate-bounce-slow" />
                Harga Terjangkau
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 lg:text-4xl mb-3 sm:mb-4 tracking-tight">
                Budget Friendly Banget! 💸
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-4 font-medium">
                Dari yang hemat sampe yang mewah, semua ada! Pilih sesuai kantong kamu ✨
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
              {priceRanges.map((range, index) => {
                const images = [
                  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80",
                  "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=80",
                  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80",
                ];
                const gradients = [
                  "from-emerald-500/90 to-teal-600/90",
                  "from-lime-500/90 to-emerald-600/90",
                  "from-teal-600/90 to-emerald-700/90",
                ];
                return (
                  <div
                    key={range.label}
                    className="group rounded-3xl border-2 border-emerald-100/60 bg-white shadow-[0_8px_30px_rgba(16,185,129,0.12)] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(16,185,129,0.25)] hover:-translate-y-3 animate-fade-in-up overflow-hidden"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Image Header with Gradient Overlay */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={images[index]}
                        alt={range.label}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-75 group-hover:opacity-60 transition-opacity`} />
                      
                      {/* Icon Badge */}
                      <div className="absolute top-4 right-4 h-14 w-14 flex items-center justify-center rounded-2xl bg-white/95 backdrop-blur text-emerald-600 text-2xl shadow-xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                        <i className={["fa-solid fa-tag", "fa-solid fa-certificate", "fa-solid fa-crown"][index]} />
                      </div>
                      
                      {/* Title on Image */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white drop-shadow-lg">{range.label}</h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <p className="text-sm text-slate-600 leading-relaxed min-h-[60px]">
                        {range.description}
                      </p>
                      
                      {/* Price */}
                      <div className="flex items-baseline gap-2 pt-4 border-t border-emerald-100">
                        <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                          {range.price}
                        </span>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">per item</span>
                      </div>
                      
                      {/* CTA Button */}
                      <button className="w-full mt-4 py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-lime-500 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform flex items-center justify-center gap-2 group/btn">
                        <span>Lihat Produk</span>
                        <i className="fa-solid fa-arrow-right text-xs transform group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Collections Section */}
        <section id="collections" className="bg-white py-24 animate-section">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-16 animate-fade-in-up">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-3">
                  Koleksi Kurasi
                </h2>
                <p className="text-base text-slate-600">
                  Koleksi pilihan dari penjual terpercaya kami.
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {curatedCollections.map((collection, index) => (
                <Link
                  key={collection.title}
                  href={collection.href}
                  className="group flex h-full flex-col rounded-[28px] border border-slate-100 bg-[#fdfdfb]/90 p-6 shadow-[0_20px_55px_rgba(15,76,58,0.1)] transition-all duration-500 hover:-translate-y-2 hover:border-emerald-100 hover:bg-white hover:shadow-[0_26px_65px_rgba(15,76,58,0.16)] animate-fade-in-up"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 mb-5">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {collection.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{collection.title}</h3>
                  <p className="text-sm text-slate-600 mb-6 flex-1">{collection.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 group-hover:gap-3 transition-all">
                    Lihat Koleksi <i className="fa-solid fa-arrow-right text-xs" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Trust & Impact Section */}
        <section id="impact" className="bg-gradient-to-b from-[#eff8f2] to-white py-16 sm:py-24 animate-section relative overflow-hidden">
          {/* Background Illustrations */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-20 left-10 text-9xl text-emerald-500">
              <i className="fa-solid fa-shield-halved" />
            </div>
            <div className="absolute bottom-20 right-20 text-9xl text-lime-500">
              <i className="fa-solid fa-heart" />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[200px] text-teal-500">
              <i className="fa-solid fa-users" />
            </div>
          </div>

          {/* Floating Decorations */}
          <div className="absolute top-10 right-10 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl animate-floating-slow" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-lime-200/20 rounded-full blur-3xl animate-floating-medium" />
          
          <div className="mx-auto max-w-6xl px-4 relative z-10">
            <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-4 bg-white px-4 py-2 rounded-full shadow-md">
                <i className="fa-solid fa-certificate animate-spin-slow" />
                Terpercaya & Aman
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 lg:text-4xl mb-3 sm:mb-4 tracking-tight">
                Trusted by 50K+ Gen-Z! 🤩
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-4 font-medium">
                Join komunitas ThriftMap dan rasain belanja yang aman, nyaman, dan ga bikin nyesel! 💚
              </p>
            </div>

            <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3 mb-12 sm:mb-16">
              {trustFeatures.map((feature, index) => {
                const gradients = [
                  "from-emerald-500 to-teal-600",
                  "from-lime-500 to-emerald-600", 
                  "from-teal-500 to-emerald-700"
                ];
                return (
                  <div
                    key={feature.title}
                    className="relative rounded-3xl border-2 border-emerald-100/60 bg-white p-6 sm:p-8 shadow-[0_10px_40px_rgba(16,185,129,0.15)] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(16,185,129,0.25)] hover:-translate-y-2 animate-fade-in-up group overflow-hidden text-center"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Background Gradient on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    {/* Icon Circle */}
                    <div className="relative mb-6 mx-auto inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-lime-50 text-emerald-600 text-3xl shadow-lg group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <i className={feature.icon} />
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradients[index]} opacity-0 group-hover:opacity-20 transition-opacity`} />
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors relative">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed relative">{feature.description}</p>
                    
                    {/* Decorative Corner */}
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-emerald-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                );
              })}
            </div>

            <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4 mb-12 sm:mb-16">
              {communityStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="relative rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-white to-emerald-50/30 p-5 sm:p-6 text-center shadow-lg transition-all duration-500 hover:border-emerald-300 hover:shadow-2xl hover:scale-105 animate-fade-in-up group overflow-hidden"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.1)_0%,_transparent_70%)]" />
                  </div>
                  
                  <div className="relative">
                    <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">{stat.value}</div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border-2 border-emerald-600 bg-gradient-to-r from-emerald-50 to-lime-50 p-6 sm:p-8 md:p-12 text-center animate-fade-in-up relative overflow-hidden shadow-2xl">
              {/* Background Illustrations */}
              <div className="absolute top-0 left-0 w-full h-full opacity-5">
                <i className="fa-solid fa-sparkles absolute top-4 left-8 text-4xl text-emerald-600 animate-pulse" />
                <i className="fa-solid fa-star absolute top-6 right-12 text-3xl text-lime-600 animate-bounce-slow" />
                <i className="fa-solid fa-rocket absolute bottom-6 left-16 text-5xl text-teal-600 animate-floating-fast" />
                <i className="fa-solid fa-fire absolute bottom-8 right-20 text-4xl text-emerald-600 animate-pulse" />
              </div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-emerald-600 to-lime-500 text-white text-3xl sm:text-4xl mb-6 shadow-xl animate-bounce-subtle">
                  <i className="fa-solid fa-gift" />
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900 mb-3 sm:mb-4 tracking-tight">Yuk, Mulai Sekarang! 🚀</h3>
                <p className="text-sm sm:text-base text-slate-600 mb-6 sm:mb-8 max-w-xl mx-auto px-4 font-medium">
                  Belanja atau jual barang bekasmu sekarang. Gampang, aman, dan menguntungkan! 💯
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-6 sm:px-8 py-3 sm:py-4 font-bold text-white text-sm sm:text-base shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all group"
                  >
                    <i className="fa-solid fa-shopping-bag group-hover:rotate-12 transition-transform" />
                    Belanja Yuk! 🛍️
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-emerald-600 bg-white px-6 sm:px-8 py-3 sm:py-4 font-display font-bold text-emerald-600 text-sm sm:text-base shadow-lg hover:bg-emerald-50 hover:shadow-2xl hover:scale-105 transform transition-all group"
                  >
                    <i className="fa-solid fa-store group-hover:rotate-12 transition-transform" />
                    Jual Barangmu! 💰
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(132,204,22,0.08),transparent_50%)]" />
        
        <div className="relative mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
            {/* Brand Section */}
            <div className="space-y-6 animate-fade-in-up">
              <Link href="/" className="inline-flex items-center gap-3 hover:opacity-90 transition-opacity">
                <img src="/logo.svg" alt="ThriftMap" className="h-12 w-auto" />
                <div className="flex flex-col">
                  <span className="text-xl font-black bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">ThriftMap</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">Style More, Spend Less</span>
                </div>
              </Link>
              
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                Platform belanja dan jual beli barang bekas terpercaya. Hemat lebih banyak, jaga lingkungan.
              </p>
              
              <div className="flex gap-3">
                <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-lime-500 text-slate-400 hover:text-white transition-all transform hover:scale-110 hover:-translate-y-1">
                  <i className="fa-brands fa-instagram text-lg" />
                </a>
                <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-lime-500 text-slate-400 hover:text-white transition-all transform hover:scale-110 hover:-translate-y-1">
                  <i className="fa-brands fa-tiktok text-lg" />
                </a>
                <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-lime-500 text-slate-400 hover:text-white transition-all transform hover:scale-110 hover:-translate-y-1">
                  <i className="fa-brands fa-facebook text-lg" />
                </a>
              </div>
            </div>

            {/* Belanja Section */}
            <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                <i className="fa-solid fa-shopping-bag text-emerald-500" />
                Belanja
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="#" className="text-slate-400 hover:text-emerald-400 transition flex items-center gap-2 group">
                    <i className="fa-solid fa-arrow-right text-xs text-slate-600 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                    Kategori
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-emerald-400 transition flex items-center gap-2 group">
                    <i className="fa-solid fa-arrow-right text-xs text-slate-600 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                    Produk Tren
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-emerald-400 transition flex items-center gap-2 group">
                    <i className="fa-solid fa-arrow-right text-xs text-slate-600 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                    Koleksi
                  </Link>
                </li>
              </ul>
            </div>

            {/* Jual Section */}
            <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                <i className="fa-solid fa-store text-emerald-500" />
                Jual
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="#" className="text-slate-400 hover:text-emerald-400 transition flex items-center gap-2 group">
                    <i className="fa-solid fa-arrow-right text-xs text-slate-600 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                    Mulai Berjualan
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-emerald-400 transition flex items-center gap-2 group">
                    <i className="fa-solid fa-arrow-right text-xs text-slate-600 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                    Panduan Penjual
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-emerald-400 transition flex items-center gap-2 group">
                    <i className="fa-solid fa-arrow-right text-xs text-slate-600 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Kontak Section */}
            <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                <i className="fa-solid fa-envelope text-emerald-500" />
                Kontak
              </h3>
              <div className="space-y-4 mb-6">
                <p className="text-sm text-slate-400 flex items-start gap-2">
                  <i className="fa-solid fa-envelope text-emerald-500 mt-0.5" />
                  <span>hello@thriftmap.id</span>
                </p>
                <p className="text-sm text-slate-400 flex items-start gap-2">
                  <i className="fa-solid fa-phone text-emerald-500 mt-0.5" />
                  <span>+62 21 XXXX XXXX</span>
                </p>
              </div>
              
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-emerald-500 focus:bg-slate-800 focus:ring-2 focus:ring-emerald-500/30 backdrop-blur"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-emerald-600 to-lime-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-paper-plane" />
                  Berlangganan
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative border-t border-slate-800/50 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
              <p className="flex items-center gap-2">
                <i className="fa-solid fa-copyright text-emerald-500" />
                2025 ThriftMap. Style more, Spend Less.
              </p>
              <p className="flex items-center gap-4">
                <Link href="#" className="hover:text-emerald-400 transition">Syarat & Ketentuan</Link>
                <span className="text-slate-700">•</span>
                <Link href="#" className="hover:text-emerald-400 transition">Kebijakan Privasi</Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}
