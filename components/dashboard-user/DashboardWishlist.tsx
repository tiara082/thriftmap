"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HandHeart, ShoppingBag, X, CheckCircle2, Star, Sparkles } from "lucide-react";
import { getProducts, type Product } from "@/lib/product-data";
import { useCart } from "@/lib/cart-store";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);

export default function DashboardWishlist() {
  const initialWishlist = useMemo(() => getProducts().slice(0, 9), []);
  const [items, setItems] = useState<Product[]>(initialWishlist);
  const { addItem } = useCart();

  const removeItem = (id: string) => setItems((prev) => prev.filter((item) => item.id !== id));

  const moveToCart = (product: Product) => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.imageUrl, quantity: 1 });
    removeItem(product.id);
  };

  return (
    <section className="space-y-8 py-8" aria-labelledby="wishlist-heading">
      <header className="relative overflow-hidden rounded-3xl border-2 border-emerald-200/60 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-10 shadow-2xl">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-emerald-300/20 to-teal-300/20 blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-gradient-to-br from-lime-300/20 to-emerald-300/20 blur-3xl"></div>
        
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2 mb-4 shadow-lg">
              <HandHeart className="h-5 w-5 text-white" />
              <p className="text-xs font-black uppercase tracking-widest text-white">WISHLIST SAYA</p>
            </div>
            <h1 id="wishlist-heading" className="text-5xl font-black bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-700 bg-clip-text text-transparent tracking-tight mb-4">
              Koleksi Impian
            </h1>
            <p className="text-lg text-slate-700 font-semibold">
              {items.length > 0 ? (
                <>
                  <span className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 px-4 py-2 rounded-full font-black text-emerald-700">
                    <Sparkles className="h-4 w-4" />
                    {items.length} produk tersimpan
                  </span>
                  <span className="mx-3 text-emerald-600">•</span>
                  <span className="inline-flex items-center gap-2 bg-teal-100 border border-teal-200 px-4 py-2 rounded-full font-black text-teal-700">
                    Total {formatCurrency(items.reduce((sum, item) => sum + item.price, 0))}
                  </span>
                </>
              ) : (
                <span className="text-slate-600">Tambahkan produk favorit agar tidak ketinggalan promo spesial ✨</span>
              )}
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard-user/products" className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 px-8 py-4 text-base font-black text-white shadow-2xl hover:shadow-emerald-300/50 hover:scale-105 transition-all duration-300 border-2 border-white/20">
              <ShoppingBag className="h-6 w-6" /> 
              <span>Jelajah Produk</span>
            </Link>
          </div>
        </div>
      </header>

      {items.length === 0 ? (
        <div className="relative overflow-hidden rounded-3xl border-2 border-emerald-200/60 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-20 text-center shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/40 via-transparent to-teal-100/40"></div>
          <div className="relative">
            <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-2xl animate-pulse">
              <HandHeart className="h-16 w-16" strokeWidth={2.5} />
            </div>
            <p className="text-4xl font-black bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-700 bg-clip-text text-transparent mb-4">
              Wishlist Masih Kosong
            </p>
            <p className="mt-4 text-xl text-slate-700 max-w-xl mx-auto font-semibold leading-relaxed">
              Mulai koleksi produk preloved favorit dan dapatkan <span className="text-emerald-600 font-black">notifikasi promo eksklusif</span>! 🎁
            </p>
            <Link href="/dashboard-user/products" className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 px-10 py-5 text-lg font-black text-white shadow-2xl hover:shadow-emerald-300/50 hover:scale-110 transition-all duration-300 border-2 border-white/20">
              <Sparkles className="h-6 w-6" /> 
              <span>Mulai Belanja Sekarang</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((product, index) => (
            <article key={product.id} className="group flex h-full flex-col rounded-3xl border-2 border-emerald-200/60 bg-gradient-to-br from-white to-emerald-50/30 p-6 shadow-xl hover:shadow-2xl hover:border-emerald-300 hover:-translate-y-2 transition-all duration-500 stagger-item" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="relative overflow-hidden rounded-2xl ring-2 ring-emerald-100 group-hover:ring-emerald-300 transition-all duration-300">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={640}
                  height={420}
                  className="h-64 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <button
                  type="button"
                  aria-label="Hapus dari wishlist"
                  onClick={() => removeItem(product.id)}
                  className="absolute right-4 top-4 rounded-full bg-white/95 backdrop-blur p-3 text-rose-600 shadow-2xl hover:bg-rose-600 hover:text-white hover:rotate-90 hover:scale-125 transition-all duration-300"
                >
                  <X className="h-5 w-5" strokeWidth={2.5} />
                </button>
                <div className="absolute left-4 top-4 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-xs font-black uppercase tracking-wider text-white shadow-2xl">
                  {product.category}
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2.5 rounded-xl bg-white/98 backdrop-blur-sm px-4 py-2.5 shadow-2xl border border-emerald-100">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm font-black text-emerald-700">Ready Stock</span>
                </div>
              </div>
              <div className="mt-6 flex flex-1 flex-col gap-4">
                <h3 className="text-2xl font-black text-slate-900 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-300">{product.name}</h3>
                <p className="text-base text-slate-600 line-clamp-2 font-medium leading-relaxed">{product.description}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t-2 border-emerald-100">
                  <div className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{formatCurrency(product.price)}</div>
                  <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
                    <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                    <span className="text-base font-black text-amber-700">4.8</span>
                  </div>
                </div>
                <div className="mt-auto flex flex-col gap-3 sm:flex-row pt-4">
                  <button
                    className="flex-1 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 px-5 py-4 text-base font-black text-white shadow-xl hover:shadow-2xl hover:shadow-emerald-300/50 hover:scale-105 transform transition-all duration-300 border-2 border-white/20"
                    onClick={() => moveToCart(product)}
                  >
                    Tambah ke Keranjang
                  </button>
                  <Link
                    href={`/dashboard-user/products/${product.id}`}
                    className="flex-1 rounded-2xl border-2 border-emerald-600 bg-white px-5 py-4 text-center text-base font-black text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 hover:text-white hover:scale-105 transform transition-all duration-300"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
