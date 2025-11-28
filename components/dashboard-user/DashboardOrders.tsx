"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ListOrdered, Package, Truck, Wallet } from "lucide-react";

const statusTabs = [
  { id: "all", label: "Semua" },
  { id: "Diproses", label: "Diproses" },
  { id: "Dikirim", label: "Dikirim" },
  { id: "Selesai", label: "Selesai" },
  { id: "Dibatalkan", label: "Dibatalkan" }
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

const ordersSeed = [
  {
    id: "TM-9821",
    status: "Diproses",
    date: "25 Nov 2025",
    eta: "Estimasi tiba 28 Nov",
    total: 325000,
    progress: 2,
    items: [
      {
        name: "Vintage Denim Jacket",
        image: "https://images.unsplash.com/photo-1551028719-00167b16ebc5?auto=format&fit=crop&w=400&q=80",
        price: 125000
      },
      {
        name: "Summer Floral Dress",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80",
        price: 95000
      }
    ]
  },
  {
    id: "TM-9774",
    status: "Dikirim",
    date: "24 Nov 2025",
    eta: "Kurir sedang menuju Bandung",
    total: 450000,
    progress: 3,
    items: [
      {
        name: "Designer Leather Bag",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80",
        price: 450000
      }
    ]
  },
  {
    id: "TM-9620",
    status: "Selesai",
    date: "20 Nov 2025",
    eta: "Pesanan diterima 22 Nov",
    total: 180000,
    progress: 4,
    items: [
      {
        name: "Canvas Sneakers",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
        price: 120000
      },
      {
        name: "Kids T-Shirt Bundle",
        image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=400&q=80",
        price: 45000
      }
    ]
  }
];

const statusStyles: Record<string, { label: string; className: string }> = {
  Diproses: { label: "Diproses", className: "bg-amber-100 text-amber-800" },
  Dikirim: { label: "Dikirim", className: "bg-sky-100 text-sky-800" },
  Selesai: { label: "Selesai", className: "bg-emerald-100 text-emerald-700" },
  Dibatalkan: { label: "Dibatalkan", className: "bg-rose-100 text-rose-700" }
};

export default function DashboardOrders() {
  const [activeTab, setActiveTab] = useState("all");
  const filteredOrders = useMemo(() => {
    if (activeTab === "all") return ordersSeed;
    return ordersSeed.filter((order) => order.status === activeTab);
  }, [activeTab]);

  return (
    <section className="space-y-8" aria-labelledby="orders-heading">
      <header className="rounded-3xl border border-emerald-50 bg-white/90 p-6 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">Pesanan</p>
            <h1 id="orders-heading" className="mt-1 text-3xl font-bold text-slate-900">
              Pantau status dan histori belanja
            </h1>
            <p className="text-sm text-slate-500">Gamifikasi XP otomatis masuk setiap pesanan selesai.</p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            <div className="rounded-2xl border border-emerald-100 bg-white/80 p-3">
              <p className="text-xs text-slate-500">Pesanan aktif</p>
              <p className="text-lg font-bold text-slate-900">02</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-white/80 p-3">
              <p className="text-xs text-slate-500">Total selesai</p>
              <p className="text-lg font-bold text-slate-900">36</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-white/80 p-3">
              <p className="text-xs text-slate-500">XP bulan ini</p>
              <p className="text-lg font-bold text-slate-900">+420</p>
            </div>
          </div>
        </div>
      </header>

      <div className="rounded-3xl border border-emerald-50 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {statusTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${activeTab === tab.id ? "bg-emerald-600 text-white" : "bg-slate-50 text-slate-600"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-emerald-200 bg-white p-10 text-center">
          <ListOrdered className="mx-auto h-10 w-10 text-emerald-600" />
          <p className="mt-3 text-lg font-semibold text-slate-900">Belum ada pesanan</p>
          <p className="text-sm text-slate-500">Belanja preloved favoritmu untuk melihat status pengiriman.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <article key={order.id} className="rounded-3xl border border-emerald-50 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 border-b border-emerald-50 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">Order ID</p>
                  <p className="text-lg font-bold text-slate-900">{order.id}</p>
                  <p className="text-xs text-slate-400">{order.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[order.status]?.className}`}>
                    {statusStyles[order.status]?.label ?? order.status}
                  </span>
                  <p className="text-sm text-slate-500">{order.eta}</p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {order.items.map((item) => (
                  <div key={item.name} className="flex items-center gap-4 rounded-2xl border border-emerald-50 p-3">
                    <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-emerald-50">
                      <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-500">Kurasi preloved</p>
                    </div>
                    <p className="text-sm font-semibold text-emerald-600">{formatCurrency(item.price)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-col gap-3 border-t border-emerald-50 pt-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <Truck className="h-4 w-4 text-emerald-600" />
                  Tahap {order.progress} / 4
                </div>
                <div className="flex items-center gap-3 text-base font-bold text-slate-900">
                  Total {formatCurrency(order.total)}
                  <Link href="/dashboard-user/tracking" className="text-sm font-semibold text-emerald-600">
                    Lacak pesanan
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-emerald-50 bg-white p-5">
          <Package className="h-6 w-6 text-emerald-600" />
          <p className="mt-3 text-sm font-semibold text-slate-900">Proteksi barang</p>
          <p className="text-sm text-slate-500">Ganti rugi hingga 100% jika barang tidak sesuai deskripsi.</p>
        </div>
        <div className="rounded-3xl border border-emerald-50 bg-white p-5">
          <Truck className="h-6 w-6 text-emerald-600" />
          <p className="mt-3 text-sm font-semibold text-slate-900">Tracking realtime</p>
          <p className="text-sm text-slate-500">Terintegrasi dengan 12 ekspedisi favorit.</p>
        </div>
        <div className="rounded-3xl border border-emerald-50 bg-white p-5">
          <Wallet className="h-6 w-6 text-emerald-600" />
          <p className="mt-3 text-sm font-semibold text-slate-900">Cashback XP</p>
          <p className="text-sm text-slate-500">Tukar pengalaman belanja jadi voucher eksklusif.</p>
        </div>
      </div>
    </section>
  );
}
