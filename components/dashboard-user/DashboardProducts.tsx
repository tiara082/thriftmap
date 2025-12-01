"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Filter, Flame, MapPin, Search, Sparkles, Star, Zap, Grid3x3, Map as MapIcon, ShoppingCart, Heart } from "lucide-react";
import clsx from "clsx";
import { getProducts, type Product } from "@/lib/product-data";
import dynamic from "next/dynamic";
import { useCart } from "@/lib/cart-store";
import { useWishlist } from "@/lib/wishlist-store";
import toast, { Toaster } from "react-hot-toast";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);

const sorters = [
  { id: "popular", label: "Terpopuler" },
  { id: "newest", label: "Terbaru" },
  { id: "price-asc", label: "Harga Termurah" },
  { id: "price-desc", label: "Harga Tertinggi" }
];

const shippingBadges = [
  { id: "fast", label: "Pengiriman Kilat", icon: Zap },
  { id: "safe", label: "Inspeksi 12 titik", icon: Star },
  { id: "return", label: "Garansi 48 jam", icon: Flame }
];

export default function DashboardProducts() {
  const allProducts = useMemo(() => getProducts(), []);
  const categories = useMemo(() => ["all", ...new Set(allProducts.map((product) => product.category))], [allProducts]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSorter, setActiveSorter] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  
  // Cart & Wishlist stores
  const { addItem: addToCart, hasItem: inCart, getTotalItems } = useCart();
  const { toggleItem: toggleWishlist, hasItem: inWishlist } = useWishlist();

  // Handlers
  const handleAddToCart = (product: Product) => {
    const error = addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      quantity: 1,
      sellerId: product.sellerId,
      category: product.category,
      condition: product.condition,
      shopName: product.shopName
    });
    
    if (error) {
      toast.error(error);
    } else {
      toast.success(`${product.name} ditambahkan ke keranjang! 🛒`, {
        duration: 2000,
        style: {
          background: '#10b981',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '12px'
        }
      });
    }
  };

  const handleToggleWishlist = (product: Product) => {
    const added = toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      category: product.category,
      condition: product.condition,
      shopName: product.shopName,
      sellerId: product.sellerId
    });
    
    if (added) {
      toast.success(`${product.name} ditambahkan ke wishlist! ❤️`, {
        duration: 2000,
        style: {
          background: '#f43f5e',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '12px'
        }
      });
    } else {
      toast(`${product.name} dihapus dari wishlist`, {
        duration: 2000,
        icon: '💔',
        style: {
          background: '#64748b',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '12px'
        }
      });
    }
  };

  const filtered = useMemo(() => {
    let result: Product[] = [...allProducts];
    if (activeCategory !== "all") {
      result = result.filter((item) => item.category === activeCategory);
    }
    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter((item) => `${item.name} ${item.description ?? ""}`.toLowerCase().includes(term));
    }
    switch (activeSorter) {
      case "newest":
        result.sort((a, b) => Number(new Date(b.uploadedAt)) - Number(new Date(a.uploadedAt)));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        result.sort((a, b) => b.views - a.views);
        break;
    }
    return result;
  }, [activeCategory, activeSorter, allProducts, search]);

  return (
    <>
      <Toaster position="top-right" />
      <section className="space-y-6 py-6" aria-labelledby="product-catalog-heading">
        <header className="rounded-3xl border-2 border-emerald-100 bg-gradient-to-br from-white via-emerald-50/30 to-white p-8 shadow-lg backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 mb-3">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">MARKETPLACE</p>
              </div>
              <h1 id="product-catalog-heading" className="text-4xl font-black text-slate-900 tracking-tight">
                Jelajahi Koleksi Kurasi ✨
              </h1>
              <p className="mt-3 text-base text-slate-600">
                <span className="font-bold text-emerald-600">
                  <Flame className="h-4 w-4 inline mr-1" />
                  {filtered.length} produk
                </span>{" "}
                pilihan siap mengisi keranjangmu dengan gaya preloved terbaik
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-2xl border-2 border-emerald-100 bg-white p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={clsx(
                    "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all duration-300",
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md"
                      : "text-slate-600 hover:bg-emerald-50"
                  )}
                >
                  <Grid3x3 className="h-4 w-4" /> Grid
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={clsx(
                    "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all duration-300",
                    viewMode === "map"
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md"
                      : "text-slate-600 hover:bg-emerald-50"
                  )}
                >
                  <MapIcon className="h-4 w-4" /> Map
                </button>
              </div>
              <Link
                href="/dashboard-user/cart"
                className="inline-flex items-center gap-2 rounded-2xl border-2 border-emerald-600 px-6 py-3 text-sm font-bold text-emerald-600 hover:bg-emerald-50 hover:scale-105 transform transition-all duration-300 relative"
              >
                <ShoppingCart className="h-5 w-5" />
                Keranjang
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-xs font-bold text-white shadow-lg animate-bounce">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </header>

      <div className="rounded-3xl border-2 border-emerald-100 bg-white p-7 shadow-lg">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="flex w-full items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white px-5 py-3.5 text-sm text-slate-500 lg:max-w-md hover:border-emerald-300 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-200 transition-all duration-300 group">
            <Search className="h-5 w-5 text-emerald-600 group-hover:scale-110 transition-transform" />
            <span className="sr-only">Cari produk</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari produk, brand, atau kata kunci..."
              className="flex-1 bg-transparent text-slate-900 outline-none placeholder:text-slate-400 font-medium"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {sorters.map(({ id, label }, index) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveSorter(id)}
                className={clsx(
                  "inline-flex items-center gap-2 rounded-2xl border-2 px-5 py-2.5 text-sm font-bold transition-all duration-300 hover:scale-105 transform",
                  activeSorter === id
                    ? "border-emerald-500 bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                    : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50"
                )}
              >
                <Filter className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6 flex gap-2 overflow-auto pb-2">
          {categories.map((category, index) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={clsx(
                "whitespace-nowrap rounded-2xl border-2 px-5 py-2.5 text-sm font-bold transition-all duration-300 hover:scale-105 transform",
                activeCategory === category
                  ? "border-emerald-500 bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                  : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50"
              )}
            >
              {category === "all" ? "🎯 Semua" : category}
            </button>
          ))}
        </div>
      </div>

      {viewMode === "map" ? (
        <div className="rounded-3xl border-2 border-emerald-100 bg-white p-4 shadow-lg overflow-hidden">
          <MapView products={filtered} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {filtered.map((product, index) => {
              const isInCart = inCart(product.id);
              const isInWishlist = inWishlist(product.id);
              
              return (
                <article
                  key={product.id}
                  className="group flex h-full flex-col rounded-3xl border-2 border-emerald-100 bg-white p-5 shadow-lg hover:shadow-2xl hover:border-emerald-200 transition-all duration-300"
                >
                  <div className="relative overflow-hidden rounded-2xl">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={400}
                      height={280}
                      className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute left-3 top-3 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                      {product.category}
                    </div>
                    <div className="absolute right-3 top-3 flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleToggleWishlist(product);
                        }}
                        className={clsx(
                          "rounded-full p-2 shadow-lg backdrop-blur transition-all duration-300 hover:scale-110",
                          isInWishlist
                            ? "bg-rose-500 text-white"
                            : "bg-white/95 text-slate-700 hover:bg-rose-50 hover:text-rose-500"
                        )}
                      >
                        <Heart className={clsx("h-5 w-5", isInWishlist && "fill-current")} />
                      </button>
                      <div className="rounded-full bg-white/95 backdrop-blur px-3 py-1.5 text-xs font-bold text-slate-700 shadow-lg">
                        ✨ {product.views}
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-1 flex-col gap-3">
                    <Link href={`/dashboard-user/products/${product.id}`} className="text-xl font-black text-slate-900 line-clamp-2 hover:text-emerald-600 transition-colors">
                      {product.name}
                    </Link>
                    <p className="line-clamp-2 text-sm text-slate-600">{product.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={clsx(
                        "text-xs font-bold px-2 py-1 rounded-lg",
                        product.condition === "Seperti Baru" && "bg-emerald-100 text-emerald-700",
                        product.condition === "Sangat Baik" && "bg-blue-100 text-blue-700",
                        product.condition === "Baik" && "bg-cyan-100 text-cyan-700",
                        product.condition === "Cukup" && "bg-amber-100 text-amber-700"
                      )}>
                        {product.condition}
                      </span>
                      <span className="text-xs text-slate-500">• {product.shopName}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-2xl font-black text-emerald-600">{formatCurrency(product.price)}</span>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-bold">4.8</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-3">
                      <Link
                        href={`/dashboard-user/products/${product.id}`}
                        className="flex-1 rounded-2xl border-2 border-emerald-600 px-4 py-2.5 text-sm font-bold text-center text-emerald-600 hover:bg-emerald-50 hover:scale-105 transform transition-all duration-300"
                      >
                        👀 Detail
                      </Link>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={isInCart}
                        className={clsx(
                          "rounded-xl px-4 py-2 text-sm font-semibold shadow-lg transition-all duration-300 group relative overflow-hidden",
                          isInCart
                            ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-xl hover:from-emerald-700 hover:to-teal-700 hover:scale-105 transform"
                        )}
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        <span className="relative flex items-center gap-1">
                          {isInCart ? (
                            <>✓ Di Keranjang</>
                          ) : (
                            <><ShoppingCart className="h-4 w-4" /> Keranjang</>
                          )}
                        </span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          {filtered.length === 0 && (
            <div className="rounded-3xl border border-dashed border-emerald-200 bg-white p-10 text-center">
              <p className="text-lg font-semibold text-emerald-700">Produk belum ditemukan</p>
              <p className="text-sm text-slate-500">Coba gunakan kata kunci atau kategori lain.</p>
            </div>
          )}
        </div>

        <aside className="space-y-4 rounded-3xl border border-emerald-50 bg-gradient-to-b from-emerald-50 via-white to-white p-6 shadow-sm">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-500">Kenapa ThriftMap?</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">Proteksi marketplace yang pro-user</h2>
          </div>
          <div className="space-y-3">
            {shippingBadges.map(({ id, label, icon: Icon }) => (
              <div key={id} className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-sm">
                <Icon className="h-5 w-5 text-emerald-600" />
                <p className="text-sm font-semibold text-slate-700">{label}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-white/80 p-5 text-center">
            <p className="text-sm text-slate-500">Butuh rekomendasi styling?</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">Kurator siap bantu 24/7</p>
            <Link href="/dashboard-user/tracking" className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white">
              <MapPin className="h-4 w-4" /> Lacak pesanan
            </Link>
          </div>
        </aside>
        </div>
      )}
      </section>
    </>
  );
}
