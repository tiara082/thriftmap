"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Filter, Flame, MapPin, Search, Star, Zap } from "lucide-react";
import clsx from "clsx";
import { getProducts, type Product } from "@/lib/product-data";

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
    <section className="space-y-8" aria-labelledby="product-catalog-heading">
      <header className="rounded-3xl border border-emerald-50 bg-white/90 p-6 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">Marketplace</p>
            <h1 id="product-catalog-heading" className="mt-1 text-3xl font-bold text-slate-900">
              Jelajahi Koleksi Kurasi
            </h1>
            <p className="mt-2 text-sm text-slate-500">{filtered.length} produk pilihan siap mengisi keranjangmu.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard-user/cart"
              className="inline-flex items-center gap-2 rounded-2xl border border-emerald-100 px-4 py-3 text-sm font-semibold text-emerald-600"
            >
              <MapPin className="h-4 w-4" /> Lihat Keranjang
            </Link>
            <Link
              href="/dashboard-user/checkout"
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg"
            >
              <Flame className="h-4 w-4" /> Checkout Sekarang
            </Link>
          </div>
        </div>
      </header>

      <div className="rounded-3xl border border-emerald-50 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 lg:max-w-md">
            <Search className="h-4 w-4" />
            <span className="sr-only">Cari produk</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari berdasarkan nama, brand, atau kata kunci"
              className="flex-1 bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {sorters.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveSorter(id)}
                className={clsx(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold",
                  activeSorter === id
                    ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                    : "border-slate-200 text-slate-500 hover:border-emerald-200"
                )}
              >
                <Filter className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-5 flex gap-3 overflow-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={clsx(
                "whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold",
                activeCategory === category
                  ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                  : "border-slate-200 text-slate-500 hover:border-emerald-200"
              )}
            >
              {category === "all" ? "Semua" : category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {filtered.map((product) => (
            <article
              key={product.id}
              className="group flex h-full flex-col rounded-3xl border border-emerald-50 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-white to-emerald-50">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={400}
                  height={280}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-emerald-600 shadow-md">
                  {product.views} kali dilihat
                </span>
              </div>
              <div className="mt-4 flex flex-1 flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-500">{product.category}</p>
                <Link href={`/dashboard-user/products/${product.id}`} className="text-lg font-semibold text-slate-900">
                  {product.name}
                </Link>
                <p className="line-clamp-2 text-sm text-slate-500">{product.description}</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-emerald-600">{formatCurrency(product.price)}</span>
                  <span className="text-xs text-slate-400">Update {new Date(product.uploadedAt).toLocaleDateString("id-ID")}</span>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href={`/dashboard-user/products/${product.id}`}
                    className="rounded-xl border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-600"
                  >
                    Detail Produk
                  </Link>
                  <button className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md">
                    Tambah Keranjang
                  </button>
                </div>
              </div>
            </article>
          ))}
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
    </section>
  );
}
