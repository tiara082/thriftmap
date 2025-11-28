"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HandHeart, ShoppingBag, X } from "lucide-react";
import { getProducts, type Product } from "@/lib/product-data";
import { useCart } from "@/lib/cart-store";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);

export default function DashboardWishlist() {
  const initialWishlist = useMemo(() => getProducts().slice(0, 6), []);
  const [items, setItems] = useState<Product[]>(initialWishlist);
  const { addItem } = useCart();

  const removeItem = (id: string) => setItems((prev) => prev.filter((item) => item.id !== id));

  const moveToCart = (product: Product) => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.imageUrl, quantity: 1 });
    removeItem(product.id);
  };

  return (
    <section className="space-y-8" aria-labelledby="wishlist-heading">
      <header className="rounded-3xl border border-emerald-50 bg-white/90 p-6 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">Wishlist</p>
            <h1 id="wishlist-heading" className="mt-1 text-3xl font-bold text-slate-900">
              Simpan inspirasi preloved kamu
            </h1>
            <p className="text-sm text-slate-500">Tambahkan ke keranjang kapan pun atau hapus jika sudah tidak diminati.</p>
          </div>
          <Link href="/dashboard-user/products" className="inline-flex items-center gap-2 rounded-full border border-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-600">
            <ShoppingBag className="h-4 w-4" /> Cari produk baru
          </Link>
        </div>
      </header>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-emerald-200 bg-white p-10 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <HandHeart className="h-8 w-8" />
          </div>
          <p className="text-lg font-semibold text-slate-900">Wishlist kamu masih kosong</p>
          <p className="text-sm text-slate-500">Simpan produk favorit agar tidak ketinggalan promo.</p>
          <Link href="/dashboard-user/products" className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white">
            Mulai jelajah
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <article key={product.id} className="flex h-full flex-col rounded-3xl border border-emerald-50 bg-white p-4 shadow-sm">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={640}
                  height={420}
                  className="h-56 w-full object-cover"
                />
                <button
                  type="button"
                  aria-label="Hapus dari wishlist"
                  onClick={() => removeItem(product.id)}
                  className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-rose-500 shadow"
                >
                  <X className="h-4 w-4" />
                </button>
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-600">
                  {product.category}
                </span>
              </div>
              <div className="mt-4 flex flex-1 flex-col gap-3">
                <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
                <p className="text-sm text-slate-500">{product.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-emerald-600">{formatCurrency(product.price)}</div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-emerald-500">Ready stock</span>
                </div>
                <div className="mt-auto flex flex-col gap-3 sm:flex-row">
                  <button
                    className="flex-1 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-md"
                    onClick={() => moveToCart(product)}
                  >
                    Tambah ke Keranjang
                  </button>
                  <Link
                    href={`/dashboard-user/products/${product.id}`}
                    className="flex-1 rounded-2xl border border-emerald-200 px-4 py-3 text-center text-sm font-semibold text-emerald-600"
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
