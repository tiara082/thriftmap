"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, Truck } from "lucide-react";
import { useMemo } from "react";
import { useCart } from "@/lib/cart-store";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);

export default function DashboardCart() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();

  const { subtotal, shipping, total } = useMemo(() => {
    const sub = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const ship = sub > 0 ? Math.min(15000, Math.round(sub * 0.05)) : 0;
    return { subtotal: sub, shipping: ship, total: sub + ship };
  }, [items]);

  return (
    <section className="space-y-8" aria-labelledby="cart-heading">
      <header className="rounded-3xl border border-emerald-50 bg-white/90 p-6 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">Keranjang</p>
            <h1 id="cart-heading" className="mt-1 text-3xl font-bold text-slate-900">
              Siap checkout barang prelovedmu
            </h1>
            <p className="mt-2 text-sm text-slate-500">Pastikan semua barang favorit sudah masuk sebelum habis.</p>
          </div>
          {items.length > 0 && (
            <button onClick={clearCart} className="text-sm font-semibold text-rose-500">
              Kosongkan keranjang
            </button>
          )}
        </div>
      </header>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-emerald-200 bg-white p-10 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Truck className="h-8 w-8" />
          </div>
          <p className="text-lg font-semibold text-slate-900">Keranjang kamu masih kosong</p>
          <p className="text-sm text-slate-500">Tambah produk dari marketplace untuk mulai checkout.</p>
          <Link
            href="/dashboard-user/products"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white"
          >
            Jelajahi Produk
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <article key={item.id} className="flex gap-4 rounded-3xl border border-emerald-50 bg-white p-4 shadow-sm">
                <div className="relative h-28 w-28 overflow-hidden rounded-2xl bg-emerald-50">
                  <Image src={item.image} alt={item.name} fill sizes="112px" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                      <p className="text-sm text-slate-500">Varian preloved premium</p>
                    </div>
                    <button type="button" aria-label="Hapus" onClick={() => removeItem(item.id)} className="text-rose-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-emerald-600">{formatCurrency(item.price)}</span>
                    <div className="flex items-center gap-3 rounded-full border border-slate-200 px-3 py-1">
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Kurangi" className="text-slate-600">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-semibold text-slate-900">{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Tambah" className="text-slate-600">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-3xl border border-emerald-50 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Ringkasan pesanan</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-500">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Ongkir (estimasi)</span>
                <span className="font-semibold text-slate-900">{formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span>Proteksi barang</span>
                <span className="font-semibold text-slate-900">{formatCurrency(5000)}</span>
              </div>
              <div className="border-t pt-3 text-base font-bold text-slate-900">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>{formatCurrency(total + 5000)}</span>
                </div>
              </div>
            </div>
            <Link
              href="/dashboard-user/checkout"
              className="mt-6 block rounded-2xl bg-emerald-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-lg"
            >
              Lanjut ke Checkout
            </Link>
            <p className="mt-3 text-center text-xs text-slate-500">
              Checkout sebelum 15 menit untuk menjaga harga promo tetap berlaku.
            </p>
          </aside>
        </div>
      )}
    </section>
  );
}
