"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CreditCard, MapPin, Phone, Truck } from "lucide-react";
import { useCart } from "@/lib/cart-store";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);

const shippingOptions = [
  { id: "regular", label: "Reguler Eco", detail: "2-4 hari kerja", price: 15000 },
  { id: "pickup", label: "Pick-up Store", detail: "Ambil hari ini", price: 7000 },
  { id: "express", label: "Express", detail: "Sampai dalam 24 jam", price: 25000 }
];

const paymentOptions = [
  { id: "card", label: "Kartu Debit/Kredit" },
  { id: "ewallet", label: "E-Wallet" },
  { id: "cod", label: "Bayar di Tempat" }
];

export default function DashboardCheckout() {
  const { items, clearCart } = useCart();
  const [shipping, setShipping] = useState("regular");
  const [payment, setPayment] = useState("ewallet");
  const [notes, setNotes] = useState("");

  const { subtotal, shippingFee, total } = useMemo(() => {
    const sub = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const ship = shippingOptions.find((option) => option.id === shipping)?.price ?? 0;
    return { subtotal: sub, shippingFee: ship, total: sub + ship + 5000 };
  }, [items, shipping]);

  const handlePlaceOrder = () => {
    // Placeholder success handling; hooking to backend can be added later
    clearCart();
    alert("Pesanan berhasil dibuat! Detail akan dikirim via email.");
  };

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-emerald-200 bg-white p-10 text-center">
        <p className="text-lg font-semibold text-slate-900">Keranjang kosong</p>
        <p className="text-sm text-slate-500">Tambah produk sebelum melakukan checkout.</p>
        <Link
          href="/dashboard-user/products"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white"
        >
          Kembali ke produk
        </Link>
      </div>
    );
  }

  return (
    <section className="space-y-8" aria-labelledby="checkout-heading">
      <header className="rounded-3xl border border-emerald-50 bg-white/90 p-6 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">Checkout</p>
          <h1 id="checkout-heading" className="text-3xl font-bold text-slate-900">
            Lengkapi detail pengiriman
          </h1>
          <p className="text-sm text-slate-500">Transaksi aman dengan perlindungan pembeli ThriftMap.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-3xl border border-emerald-50 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Data penerima</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm text-slate-600">
                Nama Lengkap
                <input className="rounded-2xl border border-slate-200 px-4 py-3 text-slate-900" placeholder="Mis. Nadia Kusuma" />
              </label>
              <label className="flex flex-col gap-1 text-sm text-slate-600">
                Nomor WhatsApp
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <input className="flex-1 bg-transparent text-slate-900 outline-none" placeholder="08xxxxxxxx" />
                </div>
              </label>
              <label className="flex flex-col gap-1 text-sm text-slate-600 sm:col-span-2">
                Alamat Lengkap
                <textarea className="rounded-2xl border border-slate-200 px-4 py-3 text-slate-900" rows={3} placeholder="Nama jalan, nomor rumah, patokan" />
              </label>
              <label className="flex flex-col gap-1 text-sm text-slate-600">
                Kota
                <input className="rounded-2xl border border-slate-200 px-4 py-3 text-slate-900" placeholder="Bandung" />
              </label>
              <label className="flex flex-col gap-1 text-sm text-slate-600">
                Kode Pos
                <input className="rounded-2xl border border-slate-200 px-4 py-3 text-slate-900" placeholder="40115" />
              </label>
              <label className="flex flex-col gap-1 text-sm text-slate-600 sm:col-span-2">
                Catatan Kurir (opsional)
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-slate-900"
                  rows={2}
                  placeholder="Mis. tolong hubungi sebelum sampai"
                />
              </label>
            </div>
          </section>

          <section className="rounded-3xl border border-emerald-50 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Pengiriman &amp; pembayaran</h2>
            <div className="mt-4 grid gap-4">
              {shippingOptions.map((option) => (
                <label key={option.id} className={`flex items-center gap-4 rounded-2xl border p-4 ${shipping === option.id ? "border-emerald-400 bg-emerald-50" : "border-slate-200"}`}>
                  <input
                    type="radio"
                    name="shipping"
                    value={option.id}
                    checked={shipping === option.id}
                    onChange={() => setShipping(option.id)}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">{option.label}</p>
                    <p className="text-xs text-slate-500">{option.detail}</p>
                  </div>
                  <span className="text-sm font-semibold text-emerald-600">{formatCurrency(option.price)}</span>
                </label>
              ))}
            </div>
            <div className="mt-6 grid gap-3">
              {paymentOptions.map((option) => (
                <label key={option.id} className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm ${payment === option.id ? "border-emerald-400 bg-emerald-50" : "border-slate-200"}`}>
                  <input type="radio" name="payment" value={option.id} checked={payment === option.id} onChange={() => setPayment(option.id)} />
                  {option.label}
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="rounded-3xl border border-emerald-50 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Ringkasan pembayaran</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-500">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Pengiriman</span>
              <span className="font-semibold text-slate-900">{formatCurrency(shippingFee)}</span>
            </div>
            <div className="flex justify-between">
              <span>Proteksi barang</span>
              <span className="font-semibold text-slate-900">{formatCurrency(5000)}</span>
            </div>
            <div className="border-t pt-3 text-base font-bold text-slate-900">
              <div className="flex justify-between">
                <span>Total bayar</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg"
          >
            Buat Pesanan
          </button>
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/80 px-4 py-3 text-xs text-emerald-900">
            <Truck className="h-4 w-4" />
            Pengiriman kilat tersedia untuk wilayah Jabodetabek.
          </div>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs text-slate-500">
            <CreditCard className="h-3.5 w-3.5" /> Pembayaran diamankan dengan enkripsi 256-bit
          </div>
        </aside>
      </div>
    </section>
  );
}