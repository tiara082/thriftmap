"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Flame, HandHeart, Leaf, ShoppingBag, Sparkles, Trophy, Truck, Zap } from "lucide-react";
import { getProducts, type Product } from "@/lib/product-data";

interface HeroSlide {
  id: string;
  title: string;
  description: string;
  tag: string;
  heroStat: string;
  accent: string;
  image: string;
  imageAlt: string;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  city: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
}

const heroSlides: HeroSlide[] = [
  {
    id: "eco-drop",
    title: "Temukan Koleksi Eco Drop Terbaru",
    description:
      "Kurasi barang preloved terbaik yang sudah melalui inspeksi kualitas ketat. Semua lebih terjangkau dan tetap stylish.",
    tag: "Sustainably Stylish",
    heroStat: "8.2K produk baru minggu ini",
    accent: "from-emerald-100 via-white to-emerald-200",
    image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Model mengenakan pakaian vintage"
  },
  {
    id: "flash-deals",
    title: "Flash Deals Vintage",
    description:
      "Nikmati potongan harga s/d 60% untuk koleksi terbatas. Segera checkout sebelum stok menghilang.",
    tag: "24h eco-sale",
    heroStat: "120 produk hampir habis",
    accent: "from-rose-100 via-white to-amber-100",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Rak pakaian vintage dengan label diskon"
  },
  {
    id: "community",
    title: "Komunitas Thrifter Paling Aktif",
    description:
      "Bangun gaya khasmu sambil menyelamatkan bumi. Tukar poin gamifikasi jadi voucher eksklusif.",
    tag: "Eco Rewards",
    heroStat: "+420 poin rata-rata per minggu",
    accent: "from-indigo-100 via-white to-cyan-100",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Komunitas thrift berdiskusi"
  }
];

const lookbookStories = [
  {
    id: "lookbook-urban",
    title: "Urban Renew",
    highlight: "Layering breathable fabrics untuk city hopping",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "lookbook-weekend",
    title: "Weekend Archive",
    highlight: "Sneakers klasik dipadukan dengan outerwork",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "lookbook-vintage",
    title: "Vintage Stories",
    highlight: "Motif bunga pastel untuk brunch santai",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"
  }
];

const categoryChips = [
  { id: "all", label: "Semua" },
  { id: "Women", label: "Wanita" },
  { id: "Men", label: "Pria" },
  { id: "Accessories", label: "Aksesori" },
  { id: "Kids", label: "Anak" },
  { id: "Premium", label: "Premium" },
  { id: "Vintage", label: "Vintage" }
];

const leaderboardData: Record<"level" | "daily", LeaderboardEntry[]> = {
  level: [
    {
      id: "lvl-1",
      name: "Alya Rahmania",
      city: "Bandung",
      avatar: "https://avatar.iran.liara.run/public/girl?username=alya",
      xp: 9850,
      level: 5,
      streak: 28
    },
    {
      id: "lvl-2",
      name: "Rafi Danuarta",
      city: "Jakarta",
      avatar: "https://avatar.iran.liara.run/public/boy?username=rafi",
      xp: 9320,
      level: 5,
      streak: 21
    },
    {
      id: "lvl-3",
      name: "Nadia Kusuma",
      city: "Surabaya",
      avatar: "https://avatar.iran.liara.run/public/girl?username=nadia",
      xp: 8975,
      level: 4,
      streak: 18
    },
    {
      id: "lvl-4",
      name: "Gerald Pratama",
      city: "Medan",
      avatar: "https://avatar.iran.liara.run/public/boy?username=gerald",
      xp: 8420,
      level: 4,
      streak: 12
    },
    {
      id: "lvl-5",
      name: "Intan Maritsa",
      city: "Yogyakarta",
      avatar: "https://avatar.iran.liara.run/public/girl?username=intan",
      xp: 8205,
      level: 4,
      streak: 9
    }
  ],
  daily: [
    {
      id: "day-1",
      name: "Rangga Dewantara",
      city: "Bogor",
      avatar: "https://avatar.iran.liara.run/public/boy?username=rangga",
      xp: 420,
      level: 3,
      streak: 6
    },
    {
      id: "day-2",
      name: "Mira Hapsari",
      city: "Semarang",
      avatar: "https://avatar.iran.liara.run/public/girl?username=mira",
      xp: 375,
      level: 3,
      streak: 10
    },
    {
      id: "day-3",
      name: "Yoga Permadi",
      city: "Depok",
      avatar: "https://avatar.iran.liara.run/public/boy?username=yoga",
      xp: 330,
      level: 2,
      streak: 4
    },
    {
      id: "day-4",
      name: "Dita Lestari",
      city: "Makassar",
      avatar: "https://avatar.iran.liara.run/public/girl?username=dita",
      xp: 295,
      level: 2,
      streak: 5
    },
    {
      id: "day-5",
      name: "Rafi Syah",
      city: "Jakarta",
      avatar: "https://avatar.iran.liara.run/public/boy?username=rafisyah",
      xp: 250,
      level: 2,
      streak: 3
    }
  ]
};

const conditionStyles: Record<
  string,
  { label: string; className: string }
> = {
  excellent: { label: "Kondisi Sangat Baik", className: "bg-emerald-100 text-emerald-700" },
  good: { label: "Kondisi Baik", className: "bg-amber-100 text-amber-700" },
  "like new": { label: "Seperti Baru", className: "bg-sky-100 text-sky-700" },
  default: { label: "Kondisi Terawat", className: "bg-slate-100 text-slate-700" }
};

const CONDITIONS = Object.keys(conditionStyles);

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);

const deriveOriginalPrice = (product: Product) => Math.round(product.price * 1.32 + 25000);

const discountInfo = (product: Product) => {
  const original = deriveOriginalPrice(product);
  const pct = Math.max(5, Math.round((1 - product.price / original) * 100));
  return { original, pct };
};

export default function DashboardHome() {
  const heroTrackRef = useRef<HTMLDivElement | null>(null);
  const categoriesRef = useRef<HTMLDivElement | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");
  const [leaderboardMode, setLeaderboardMode] = useState<"level" | "daily">("level");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const products = useMemo(() => getProducts(), []);
  const enhancedProducts = useMemo(() => {
    return products.map((product) => {
      const conditionKey = (product.condition || "").toLowerCase();
      const normalizedCondition = CONDITIONS.includes(conditionKey) ? conditionKey : "default";
      const { original, pct } = discountInfo(product);
      return { ...product, originalPrice: original, discountPercent: pct, conditionKey: normalizedCondition };
    });
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return enhancedProducts;
    return enhancedProducts.filter((product) => {
      if (activeCategory === "Premium") return product.price >= 200000;
      if (activeCategory === "Vintage") return product.name.toLowerCase().includes("vintage");
      return product.category === activeCategory;
    });
  }, [activeCategory, enhancedProducts]);

  const flashSaleProducts = [...filteredProducts]
    .sort((a, b) => (b.discountPercent as number) - (a.discountPercent as number))
    .slice(0, 4);
  const flashIds = new Set(flashSaleProducts.map((item) => item.id));
  const recommendationProducts = filteredProducts.filter((item) => !flashIds.has(item.id));

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!heroTrackRef.current) return;
    heroTrackRef.current.style.transform = `translateX(-${heroIndex * 100}%)`;
  }, [heroIndex]);

  const updateChipScrollState = useCallback(() => {
    if (!categoriesRef.current) return;
    const node = categoriesRef.current;
    setCanScrollLeft(node.scrollLeft > 4);
    setCanScrollRight(node.scrollLeft + node.clientWidth < node.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const node = categoriesRef.current;
    if (!node) return;
    node.addEventListener("scroll", updateChipScrollState);
    updateChipScrollState();
    return () => node.removeEventListener("scroll", updateChipScrollState);
  }, [updateChipScrollState]);

  const scrollChips = (direction: number) => {
    if (!categoriesRef.current) return;
    categoriesRef.current.scrollBy({ left: direction * (categoriesRef.current.clientWidth * 0.7), behavior: "smooth" });
  };

  const podiumEntries = leaderboardData[leaderboardMode].slice(0, 3);
  const listEntries = leaderboardData[leaderboardMode].slice(3);

  const renderProductCard = (product: (typeof enhancedProducts)[number]) => {
    const condition = conditionStyles[product.conditionKey as keyof typeof conditionStyles] || conditionStyles.default;
    return (
      <div
        key={product.id}
        className="relative flex h-full flex-col rounded-2xl border border-emerald-50 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        <Link
          href={`/dashboard-user/products/${product.id}`}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-emerald-100 p-4"
        >
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={320}
            height={200}
            className="mx-auto h-48 w-full rounded-2xl object-contain"
          />
          <span className="absolute left-4 top-4 rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700 shadow-md">
            -{product.discountPercent}%
          </span>
          <button
            type="button"
            aria-label="Tambah ke wishlist"
            className="absolute right-4 top-4 rounded-full bg-white/80 p-2 text-rose-500 shadow"
          >
            <HandHeart className="h-4 w-4" />
          </button>
        </Link>
        <div className="mt-4 flex flex-1 flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">{product.category}</span>
          <h3 className="line-clamp-2 text-base font-semibold text-slate-900">{product.name}</h3>
          <p className="text-sm text-slate-500">{product.description || product.brand || "Brand pilihan"}</p>
          <span
            className={`inline-flex w-fit items-center justify-center rounded-full px-3 py-1 text-xs font-semibold ${condition.className}`}
          >
            {condition.label}
          </span>
          <p className="text-xs text-slate-500">Dilihat {product.views} kali</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xl font-bold text-emerald-600">{formatCurrency(product.price)}</span>
            <del className="text-sm text-slate-400">{formatCurrency(product.originalPrice as number)}</del>
            <span className="rounded-md bg-rose-500 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              Hemat {product.discountPercent}%
            </span>
          </div>
          <Link
            href={`/dashboard-user/products/${product.id}`}
            className="mt-auto rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white shadow-lg"
          >
            Lihat Detail Produk
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10">
      <div className="rounded-3xl border border-emerald-50 bg-white/80 p-6 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">ThriftMap User</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">Dashboard &amp; Marketplace</h1>
            <p className="mt-2 text-sm text-slate-500">
              Pantau tren thrift terbaru, flash sale, dan leaderboard gamifikasi langsung dari satu tempat.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/dashboard-user/tracking"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-emerald-600 shadow-md"
            >
              <Truck className="h-4 w-4" /> Lacak Pesanan
            </Link>
            <Link
              href="/dashboard-user/products"
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg"
            >
              <ShoppingBag className="h-4 w-4" /> Belanja Sekarang
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Carousel */}
      <section className="relative overflow-hidden rounded-3xl border border-emerald-50 bg-gradient-to-r from-emerald-50 via-white to-emerald-100 p-1">
        <div className="relative overflow-hidden rounded-[26px]">
          <div
            ref={heroTrackRef}
            className="flex transition-transform duration-500"
            style={{ width: `${heroSlides.length * 100}%` }}
          >
            {heroSlides.map((slide) => (
              <article
                key={slide.id}
                className={`flex min-w-full flex-col gap-8 rounded-[26px] bg-gradient-to-br ${slide.accent} p-8 text-slate-900 shadow-lg md:flex-row md:items-center`}
              >
                <div className="space-y-4 md:max-w-xl">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-600">
                    <Sparkles className="h-3.5 w-3.5" /> {slide.tag}
                  </span>
                  <h2 className="text-3xl font-bold leading-tight md:text-4xl">{slide.title}</h2>
                  <p className="text-base text-slate-600">{slide.description}</p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/dashboard-user/products"
                      className="btn rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg"
                    >
                      Jelajahi Koleksi
                    </Link>
                    <Link
                      href="#lookbook"
                      className="btn rounded-2xl border border-emerald-200 px-6 py-3 text-sm font-semibold text-emerald-600"
                    >
                      Lihat Lookbook
                    </Link>
                  </div>
                </div>
                <div className="relative flex-1">
                  <Image
                    src={slide.image}
                    alt={slide.imageAlt}
                    width={640}
                    height={380}
                    className="h-72 w-full rounded-[24px] object-cover shadow-xl md:h-80"
                    priority={slide.id === "eco-drop"}
                  />
                  <div className="absolute bottom-4 left-4 rounded-2xl bg-white/85 p-4 shadow-lg">
                    <Leaf className="mb-2 h-5 w-5 text-emerald-500" />
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-400">Impact Mingguan</p>
                    <p className="text-lg font-semibold text-slate-900">{slide.heroStat}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center gap-2">
            {heroSlides.map((slide, index) => (
              <span
                key={slide.id}
                className={`h-2 w-2 rounded-full ${index === heroIndex ? "bg-emerald-600" : "bg-emerald-200"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lookbook */}
      <section id="lookbook" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Lookbook &amp; Stories</p>
            <h3 className="text-xl font-semibold text-slate-900">Inspirasi styling dari komunitas</h3>
          </div>
          <a href="#recommendations" className="text-sm font-semibold text-emerald-600">
            Lihat rekomendasi →
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {lookbookStories.map((story) => (
            <article
              key={story.id}
              className="group relative overflow-hidden rounded-3xl border border-emerald-50 bg-slate-900 text-white shadow-lg"
            >
              <div className="relative h-72 w-full">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 space-y-2 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">Lookbook</p>
                  <h4 className="text-2xl font-semibold">{story.title}</h4>
                  <p className="text-sm text-slate-100">{story.highlight}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Category Chips */}
      <section className="relative">
        <div className="flex items-center justify-between pb-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Kategori Kurasi</p>
            <h3 className="text-xl font-semibold text-slate-900">Telusuri sesuai preferensimu</h3>
          </div>
          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow md:flex disabled:opacity-40"
              onClick={() => scrollChips(-1)}
              disabled={!canScrollLeft}
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow md:flex disabled:opacity-40"
              onClick={() => scrollChips(1)}
              disabled={!canScrollRight}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
        <div className="relative">
          <div
            ref={categoriesRef}
            className="flex flex-nowrap gap-3 overflow-x-auto rounded-2xl border border-emerald-50 bg-white/70 p-4"
          >
            {categoryChips.map((chip) => (
              <button
                key={chip.id}
                onClick={() => setActiveCategory(chip.id)}
                className={`whitespace-nowrap rounded-full border px-5 py-2 text-sm font-semibold transition hover:border-emerald-500 hover:text-emerald-600 ${
                  activeCategory === chip.id
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow"
                    : "border-slate-200 bg-white text-slate-600"
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale */}
      <section id="flash-sale" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-400">Flash Sale</p>
            <h3 className="text-xl font-semibold text-slate-900">Diskon besar untuk barang favorit</h3>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600">
            <Flame className="h-4 w-4" /> Berakhir dalam <Countdown />
          </div>
        </div>
        {flashSaleProducts.length === 0 ? (
          <p className="text-sm text-slate-500">Produk akan segera hadir.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">{flashSaleProducts.map(renderProductCard)}</div>
        )}
      </section>

      {/* Recommendations */}
      <section id="recommendations" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">Direkomendasikan</p>
            <h3 className="text-xl font-semibold text-slate-900">Kurasi khusus untukmu</h3>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full border border-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-600">
            <Zap className="h-4 w-4" /> Segarkan rekomendasi
          </button>
        </div>
        {recommendationProducts.length === 0 ? (
          <p className="text-sm text-slate-500">Belum ada rekomendasi lain untuk kategori ini.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">{recommendationProducts.map(renderProductCard)}</div>
        )}
      </section>

      {/* Leaderboard */}
      <section id="leaderboard" className="rounded-[32px] border border-slate-800/40 bg-gradient-to-br from-slate-900 via-slate-900 to-black text-white shadow-2xl">
        <div className="space-y-8 p-6 md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">Eco Impact League</p>
              <h3 className="mt-2 text-2xl font-semibold">Leaderboard Komunitas</h3>
              <p className="text-sm text-slate-200/80">Kumpulkan XP dari transaksi, review, dan donasi pakaian.</p>
            </div>
            <div className="inline-flex rounded-full border border-white/10 bg-white/10 p-1">
              <button
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${
                  leaderboardMode === "level" ? "bg-white/30 text-white" : "text-slate-200"
                }`}
                onClick={() => setLeaderboardMode("level")}
              >
                <Trophy className="h-4 w-4" /> Level
              </button>
              <button
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${
                  leaderboardMode === "daily" ? "bg-white/30 text-white" : "text-slate-200"
                }`}
                onClick={() => setLeaderboardMode("daily")}
              >
                <ClockIcon /> Harian
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {podiumEntries.map((entry, index) => (
              <div key={entry.id} className="flex justify-center">
                <div
                  className={`relative w-full max-w-xs rounded-3xl border border-white/10 p-6 text-center shadow-2xl ${
                    index === 0
                      ? "bg-gradient-to-br from-amber-200/20 via-indigo-900/70 to-slate-900"
                      : index === 1
                        ? "bg-gradient-to-br from-slate-200/10 via-slate-900 to-black"
                        : "bg-gradient-to-br from-orange-200/20 via-cyan-900/70 to-black"
                  }`}
                >
                  <Image
                    src={entry.avatar}
                    alt={entry.name}
                    width={72}
                    height={72}
                    className="mx-auto mb-4 h-20 w-20 rounded-full border-2 border-white/40 object-cover"
                  />
                  <p className="text-lg font-semibold">{entry.name}</p>
                  <p className="text-sm text-slate-200">Level {entry.level} • {entry.city}</p>
                  <p className="text-lg text-amber-200">{entry.xp.toLocaleString("id-ID")} XP</p>
                  <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-slate-200">
                    #{index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-white/5 bg-white/5 p-4">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Pengguna</th>
                  <th>Kota</th>
                  <th>XP</th>
                  <th>Streak</th>
                </tr>
              </thead>
              <tbody>
                {listEntries.map((entry, index) => (
                  <tr key={entry.id} className="rounded-xl bg-white/5 text-slate-100">
                    <td className="py-3 pe-3 ps-2 text-slate-300">#{index + 4}</td>
                    <td>
                      <div className="flex items-center gap-3 py-3">
                        <Image
                          src={entry.avatar}
                          alt={entry.name}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full border border-white/20 object-cover"
                        />
                        <div>
                          <p className="font-semibold">{entry.name}</p>
                          <p className="text-xs text-slate-300">Level {entry.level}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-slate-300">{entry.city}</td>
                    <td className="font-semibold text-amber-200">{entry.xp.toLocaleString("id-ID")} XP</td>
                    <td className="text-emerald-200">🔥 {entry.streak} hari</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(60 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 60 * 60 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <span className="font-mono text-sm">
      {hours}:{minutes}:{seconds}
    </span>
  );
}

function ChevronLeftIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}
