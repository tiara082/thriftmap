"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CreditCard, MapPin, Phone, Truck, Store, Package } from "lucide-react";
import { useCart } from "@/lib/cart-store";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);

const deliveryMethods = [
  { 
    id: "pickup", 
    label: "Ambil Sendiri di Toko", 
    detail: "Ambil langsung di lokasi penjual", 
    price: 0,
    icon: Store,
    color: "emerald"
  },
  { 
    id: "courier", 
    label: "Kirim via Ekspedisi", 
    detail: "Diantar ke alamat kamu", 
    price: 0,
    icon: Truck,
    color: "teal"
  }
];

const shippingOptions = [
  { id: "regular", label: "Reguler Eco", detail: "2-4 hari kerja", price: 15000, icon: Package },
  { id: "express", label: "Express", detail: "Sampai dalam 24 jam", price: 25000, icon: Truck }
];

const paymentOptions = [
  { id: "card", label: "Kartu Debit/Kredit" },
  { id: "ewallet", label: "E-Wallet" },
  { id: "cod", label: "Bayar di Tempat" }
];

export default function DashboardCheckout() {
  const { items, clearCart } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [shipping, setShipping] = useState("regular");
  const [payment, setPayment] = useState("ewallet");
  const [notes, setNotes] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");

  const { subtotal, shippingFee, total } = useMemo(() => {
    const sub = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const ship = deliveryMethod === "courier" 
      ? (shippingOptions.find((option) => option.id === shipping)?.price ?? 0)
      : 0;
    return { subtotal: sub, shippingFee: ship, total: sub + ship + 5000 };
  }, [items, shipping, deliveryMethod]);

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
      <header className="relative overflow-hidden rounded-3xl border-2 border-emerald-200/60 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-10 shadow-2xl">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-emerald-300/20 to-teal-300/20 blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-gradient-to-br from-lime-300/20 to-emerald-300/20 blur-3xl"></div>
        
        <div className="relative flex flex-col gap-4">
          <div className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2 mb-2 shadow-lg w-fit">
            <CreditCard className="h-5 w-5 text-white" />
            <p className="text-xs font-black uppercase tracking-widest text-white">CHECKOUT</p>
          </div>
          <h1 id="checkout-heading" className="text-5xl font-black bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-700 bg-clip-text text-transparent tracking-tight mb-2">
            Lengkapi Data Pengiriman
          </h1>
          <p className="text-lg text-slate-700 font-semibold">🔒 Transaksi aman dengan <span className="text-emerald-600 font-black">perlindungan pembeli</span> ThriftMap</p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-3xl border-2 border-emerald-200/60 bg-gradient-to-br from-white to-emerald-50/30 p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 p-2.5">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Data Penerima</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-black text-slate-900 uppercase tracking-wide">Nama Lengkap</span>
                <input className="rounded-2xl border-2 border-slate-200 px-5 py-4 text-slate-900 font-semibold hover:border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300" placeholder="Mis. Nadia Kusuma" />
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

          <section className="rounded-3xl border-2 border-emerald-200/60 bg-gradient-to-br from-white to-emerald-50/30 p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 p-2.5">
                <Truck className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Metode Pengiriman & Pembayaran</h2>
            </div>

            {/* Delivery Method Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-emerald-600" />
                Pilih Cara Pengambilan
              </h3>
              <div className="grid gap-5 md:grid-cols-2">
                {deliveryMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <label 
                      key={method.id} 
                      className={`relative overflow-hidden flex flex-col gap-4 rounded-2xl border-2 p-6 cursor-pointer hover:scale-102 transition-all duration-300 ${deliveryMethod === method.id ? (method.id === "pickup" ? "border-emerald-500 bg-gradient-to-br from-emerald-50 to-white ring-2 ring-emerald-300" : "border-teal-500 bg-gradient-to-br from-teal-50 to-white ring-2 ring-teal-300") : "border-slate-200 bg-white hover:border-emerald-300"}`}
                    >
                      <div className="flex items-start gap-4">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value={method.id}
                          checked={deliveryMethod === method.id}
                          onChange={() => setDeliveryMethod(method.id)}
                          className="w-5 h-5 text-emerald-600 mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={method.id === "pickup" ? "rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 p-2.5" : "rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 p-2.5"}>
                              <IconComponent className="h-6 w-6 text-white" />
                            </div>
                            <p className="text-xl font-black text-slate-900">{method.label}</p>
                          </div>
                          <p className="text-sm text-slate-600 font-semibold">{method.detail}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-black text-emerald-600">{method.price === 0 ? "GRATIS" : formatCurrency(method.price)}</p>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Pickup Location - Show only if pickup is selected */}
            {deliveryMethod === "pickup" && (
              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200">
                <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                  <Store className="h-5 w-5 text-emerald-600" />
                  Pilih Lokasi Pengambilan
                </h3>
                <div className="space-y-3">
                  {[
                    { id: "bandung1", name: "Toko ThriftMap Bandung - Dago", address: "Jl. Ir. H. Djuanda No. 42, Bandung", hours: "09:00 - 20:00 WIB" },
                    { id: "bandung2", name: "Toko ThriftMap Bandung - Cihampelas", address: "Jl. Cihampelas No. 88, Bandung", hours: "10:00 - 21:00 WIB" },
                    { id: "jakarta1", name: "Toko ThriftMap Jakarta - Kemang", address: "Jl. Kemang Raya No. 15, Jakarta Selatan", hours: "09:00 - 21:00 WIB" }
                  ].map((location) => (
                    <label key={location.id} className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${pickupLocation === location.id ? "border-emerald-500 bg-white ring-2 ring-emerald-300" : "border-emerald-100 bg-white/50 hover:border-emerald-300"}`}>
                      <input
                        type="radio"
                        name="pickupLocation"
                        value={location.id}
                        checked={pickupLocation === location.id}
                        onChange={() => setPickupLocation(location.id)}
                        className="w-4 h-4 text-emerald-600 mt-1"
                      />
                      <div className="flex-1">
                        <p className="text-base font-black text-slate-900">{location.name}</p>
                        <p className="text-sm text-slate-600 font-semibold mt-1">{location.address}</p>
                        <p className="text-xs text-emerald-600 font-bold mt-2">⏰ Buka: {location.hours}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Shipping Options - Show only if courier is selected */}
            {deliveryMethod === "courier" && (
              <div className="mb-8">
                <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                  <Truck className="h-5 w-5 text-emerald-600" />
                  Pilih Layanan Ekspedisi
                </h3>
                <div className="grid gap-4">
                  {shippingOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <label key={option.id} className={`flex items-center gap-5 rounded-2xl border-2 p-5 cursor-pointer hover:scale-102 transition-all duration-300 ${shipping === option.id ? "border-teal-500 bg-gradient-to-r from-teal-50 to-emerald-50 ring-2 ring-teal-300" : "border-slate-200 bg-white hover:border-emerald-300"}`}>
                        <input
                          type="radio"
                          name="shipping"
                          value={option.id}
                          checked={shipping === option.id}
                          onChange={() => setShipping(option.id)}
                          className="w-5 h-5 text-emerald-600"
                        />
                        <div className="rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 p-2.5">
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-base font-black text-slate-900">{option.label}</p>
                          <p className="text-sm text-slate-600 font-semibold mt-1">{option.detail}</p>
                        </div>
                        <span className="text-lg font-black text-teal-600">{formatCurrency(option.price)}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Payment Options */}
            <div className="mt-8">
              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-emerald-600" />
                Metode Pembayaran
              </h3>
              <div className="grid gap-3">
                {paymentOptions.map((option) => (
                  <label key={option.id} className={`flex items-center gap-3 rounded-2xl border-2 px-5 py-4 cursor-pointer hover:scale-102 transition-all duration-300 ${payment === option.id ? "border-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50 ring-2 ring-emerald-300" : "border-slate-200 bg-white hover:border-emerald-300"}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value={option.id} 
                      checked={payment === option.id} 
                      onChange={() => setPayment(option.id)}
                      className="w-5 h-5 text-emerald-600"
                    />
                    <span className="text-base font-black text-slate-900">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>
        </div>

        <aside className="rounded-3xl border-2 border-emerald-200/60 bg-gradient-to-br from-white to-emerald-50/30 p-8 shadow-2xl sticky top-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 p-2.5">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Ringkasan Pembayaran</h2>
          </div>
          <div className="space-y-4 text-base">
            <div className="flex justify-between items-center p-3 rounded-xl bg-white border border-emerald-100">
              <span className="font-semibold text-slate-700">Subtotal</span>
              <span className="font-black text-slate-900">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-white border border-emerald-100">
              <span className="font-semibold text-slate-700">
                {deliveryMethod === "pickup" ? "Ambil Sendiri" : "Pengiriman"}
              </span>
              <span className="font-black text-emerald-600">
                {shippingFee === 0 ? "GRATIS ✨" : formatCurrency(shippingFee)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-white border border-emerald-100">
              <span className="font-semibold text-slate-700">Proteksi barang</span>
              <span className="font-black text-slate-900">{formatCurrency(5000)}</span>
            </div>
            <div className="border-t-2 border-emerald-200 pt-4">
              <div className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300">
                <span className="text-xl font-black text-slate-900">Total Bayar</span>
                <span className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 px-6 py-4 text-lg font-black text-white shadow-2xl hover:shadow-emerald-300/50 hover:scale-105 transform transition-all duration-300 border-2 border-white/20 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative">🎉 Buat Pesanan Sekarang</span>
          </button>
          <div className="mt-5 space-y-3">
            {deliveryMethod === "pickup" ? (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 border-2 border-emerald-200">
                <Store className="h-5 w-5 text-emerald-600 mt-0.5" />
                <p className="text-sm text-emerald-900 font-semibold leading-relaxed">
                  Ambil sendiri di toko <span className="font-black">GRATIS ongkir</span>! 🎁
                </p>
              </div>
            ) : (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 border-2 border-emerald-200">
                <Truck className="h-5 w-5 text-emerald-600 mt-0.5" />
                <p className="text-sm text-emerald-900 font-semibold leading-relaxed">
                  Pengiriman kilat tersedia untuk wilayah <span className="font-black">Jabodetabek</span> 🚀
                </p>
              </div>
            )}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border-2 border-slate-200">
              <CreditCard className="h-5 w-5 text-slate-600 mt-0.5" />
              <p className="text-sm text-slate-700 font-semibold leading-relaxed">
                Pembayaran diamankan dengan <span className="font-black">enkripsi 256-bit</span> 🔒
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}