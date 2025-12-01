"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, Truck, CreditCard, AlertCircle, X } from "lucide-react";
import { useMemo } from "react";
import { useCart } from "@/lib/cart-store";
import toast, { Toaster } from "react-hot-toast";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);

export default function DashboardCart() {
  const { items, removeItem, updateQuantity, clearCart, error, setError } = useCart();

  const { subtotal, shipping, total } = useMemo(() => {
    const sub = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const ship = sub > 0 ? Math.min(15000, Math.round(sub * 0.05)) : 0;
    return { subtotal: sub, shipping: ship, total: sub + ship };
  }, [items]);

  const handleRemoveItem = (id: string, name: string) => {
    if (window.confirm(`Hapus "${name}" dari keranjang?`)) {
      removeItem(id);
      toast.success("Produk dihapus dari keranjang", {
        duration: 2000,
        style: {
          background: '#64748b',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '12px'
        }
      });
    }
  };

  const handleClearCart = () => {
    if (window.confirm("Yakin ingin mengosongkan semua keranjang?")) {
      clearCart();
      toast.success("Keranjang berhasil dikosongkan", {
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

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    const result = updateQuantity(id, newQuantity);
    if (result) {
      toast.error(result, {
        duration: 3000,
        icon: '⚠️',
        style: {
          background: '#ef4444',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '12px'
        }
      });
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <section className="space-y-8 relative" aria-labelledby="cart-heading">
        {/* Floating Background Particles */}
        <div className="fixed top-10 left-10 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl animate-floating-slow pointer-events-none" />
        <div className="fixed bottom-20 right-20 w-96 h-96 bg-lime-300/15 rounded-full blur-3xl animate-floating-medium pointer-events-none" />
        
        {/* Error Banner */}
        {error && (
          <div className="relative overflow-hidden rounded-3xl border-2 border-rose-200 bg-gradient-to-r from-rose-50 to-rose-100 p-6 shadow-xl animate-shake z-20">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500 text-white shadow-lg">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-lg font-black text-rose-900">Perhatian!</p>
                <p className="text-sm font-semibold text-rose-700">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="rounded-full p-2 hover:bg-rose-200 transition-colors"
              >
                <X className="h-5 w-5 text-rose-600" />
              </button>
            </div>
          </div>
        )}
        
        <header className="relative overflow-hidden rounded-3xl border-2 border-emerald-200/60 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-10 shadow-2xl relative z-10 animate-fade-in-down">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-emerald-300/20 to-teal-300/20 blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-gradient-to-br from-lime-300/20 to-emerald-300/20 blur-3xl"></div>
          
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2 mb-4 shadow-lg">
                <Truck className="h-5 w-5 text-white" />
                <p className="text-xs font-black uppercase tracking-widest text-white">KERANJANG BELANJA</p>
              </div>
              <h1 id="cart-heading" className="text-5xl font-black bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-700 bg-clip-text text-transparent tracking-tight mb-4">
                Siap Checkout?
              </h1>
              <p className="text-lg text-slate-700 font-semibold">Pastikan semua barang favorit sudah masuk sebelum habis! 🛒✨</p>
            </div>
            {items.length > 0 && (
              <button onClick={handleClearCart} className="inline-flex items-center gap-2 rounded-2xl border-2 border-rose-500 bg-white px-6 py-3 text-base font-black text-rose-600 hover:bg-rose-600 hover:text-white hover:scale-105 transition-all duration-300">
                <Trash2 className="h-5 w-5" />
                <span>Kosongkan</span>
              </button>
            )}
          </div>
        </header>

      {items.length === 0 ? (
        <div className="relative overflow-hidden rounded-3xl border-2 border-emerald-200/60 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-20 text-center shadow-2xl relative z-10 animate-scale-in">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/40 via-transparent to-teal-100/40"></div>
          <div className="relative">
            <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-2xl animate-pulse">
              <Truck className="h-16 w-16" strokeWidth={2.5} />
            </div>
            <p className="text-4xl font-black bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-700 bg-clip-text text-transparent mb-4">
              Keranjang Masih Kosong
            </p>
            <p className="mt-4 text-xl text-slate-700 max-w-xl mx-auto font-semibold leading-relaxed">
              Mulai belanja dan tambahkan <span className="text-emerald-600 font-black">produk preloved favorit</span> ke keranjangmu! 🛍️
            </p>
            <Link
              href="/dashboard-user/products"
              className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 px-10 py-5 text-lg font-black text-white shadow-2xl hover:shadow-emerald-300/50 hover:scale-110 transition-all duration-300 border-2 border-white/20 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Truck className="h-6 w-6 relative" />
              <span className="relative">Mulai Belanja Sekarang</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 relative z-10">
          <div className="space-y-4 lg:col-span-2">
            {items.map((item, index) => (
              <article key={item.id} className="flex gap-5 rounded-3xl border-2 border-emerald-200/60 bg-gradient-to-br from-white to-emerald-50/30 p-6 shadow-xl hover:shadow-2xl hover:border-emerald-300 hover:-translate-y-1 transition-all duration-500 stagger-item" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="relative h-32 w-32 overflow-hidden rounded-2xl bg-emerald-50 group ring-2 ring-emerald-100">
                  <Image src={item.image} alt={item.name} fill sizes="128px" className="object-cover group-hover:scale-110 group-hover:rotate-2 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="flex flex-1 flex-col gap-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-slate-900 mb-1">{item.name}</h3>
                      <p className="text-sm text-slate-600 font-semibold">✨ Kondisi: <span className="text-emerald-600">{item.condition || "Seperti Baru"}</span></p>
                      {item.shopName && (
                        <p className="text-xs text-slate-500 mt-1">🏪 {item.shopName}</p>
                      )}
                    </div>
                    <button type="button" aria-label="Hapus" onClick={() => handleRemoveItem(item.id, item.name)} className="rounded-full bg-rose-50 p-2.5 text-rose-600 hover:bg-rose-600 hover:text-white hover:scale-110 hover:rotate-12 transition-all duration-300">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t-2 border-emerald-100">
                    <div>
                      <span className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{formatCurrency(item.price)}</span>
                      <p className="text-xs text-slate-500 mt-1">Per item</p>
                    </div>
                    <div className="flex items-center gap-4 rounded-full bg-white border-2 border-emerald-200 px-4 py-2 shadow-md">
                      <button 
                        type="button" 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} 
                        aria-label="Kurangi" 
                        disabled={item.quantity <= 1}
                        className="text-slate-600 hover:text-emerald-600 hover:scale-125 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Minus className="h-5 w-5" strokeWidth={2.5} />
                      </button>
                      <span className="text-lg font-black text-slate-900 min-w-[2rem] text-center">{item.quantity}</span>
                      <button 
                        type="button" 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} 
                        aria-label="Tambah" 
                        disabled={item.quantity >= 10}
                        className="text-slate-600 hover:text-emerald-600 hover:scale-125 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Plus className="h-5 w-5" strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-right">
                    <span className="text-sm font-bold text-slate-700">
                      Subtotal: <span className="text-emerald-600">{formatCurrency(item.price * item.quantity)}</span>
                    </span>
                    {item.quantity >= 10 && (
                      <p className="text-xs text-amber-600 font-semibold mt-1">⚠️ Maks. 10 item</p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-3xl border-2 border-emerald-200/60 bg-gradient-to-br from-white to-emerald-50/30 p-8 shadow-2xl sticky top-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 p-2.5">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Ringkasan Pesanan</h2>
            </div>
            <div className="space-y-4 text-base">
              <div className="flex justify-between items-center p-3 rounded-xl bg-white border border-emerald-100">
                <span className="font-semibold text-slate-700">Subtotal</span>
                <span className="font-black text-slate-900">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-white border border-emerald-100">
                <span className="font-semibold text-slate-700">Ongkir (estimasi)</span>
                <span className="font-black text-slate-900">{formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-white border border-emerald-100">
                <span className="font-semibold text-slate-700">Proteksi barang</span>
                <span className="font-black text-slate-900">{formatCurrency(5000)}</span>
              </div>
              <div className="border-t-2 border-emerald-200 pt-4">
                <div className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300">
                  <span className="text-xl font-black text-slate-900">Total</span>
                  <span className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{formatCurrency(total + 5000)}</span>
                </div>
              </div>
            </div>
            <Link
              href="/dashboard-user/checkout"
              className="mt-6 block rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 px-6 py-4 text-center text-lg font-black text-white shadow-2xl hover:shadow-emerald-300/50 hover:scale-105 transform transition-all duration-300 border-2 border-white/20 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Lanjut ke Checkout →</span>
            </Link>
            <div className="mt-5 flex items-start gap-3 p-4 rounded-xl bg-amber-50 border-2 border-amber-200">
              <span className="text-2xl">⏰</span>
              <p className="text-sm text-amber-900 font-semibold leading-relaxed">
                Checkout sebelum <span className="font-black">15 menit</span> untuk menjaga harga promo tetap berlaku!
              </p>
            </div>
          </aside>
        </div>
      )}
      </section>
    </>
  );
}
