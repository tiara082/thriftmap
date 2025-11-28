"use client";

import { useState } from "react";
import { CheckCircle2, MapPin, Package, Search, Truck } from "lucide-react";

const timeline = [
  { label: "Pesanan dikonfirmasi", time: "25 Nov 10:05", active: true },
  { label: "Sedang dikemas", time: "25 Nov 14:22", active: true },
  { label: "Dikirim ekspedisi", time: "26 Nov 08:10", active: true },
  { label: "Dalam perjalanan", time: "26 Nov 17:45", active: false },
  { label: "Sampai tujuan", time: "-", active: false }
];

export default function DashboardTracking() {
  const [resi, setResi] = useState("TM-9821");

  return (
    <section className="space-y-8" aria-labelledby="tracking-heading">
      <header className="rounded-3xl border border-emerald-50 bg-white/90 p-6 shadow-sm backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">Tracking</p>
        <h1 id="tracking-heading" className="mt-1 text-3xl font-bold text-slate-900">
          Pantau resi secara realtime
        </h1>
        <p className="text-sm text-slate-500">Masukkan nomor pesanan atau resi ekspedisi favoritmu.</p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 rounded-3xl border border-emerald-50 bg-white p-6 shadow-sm lg:col-span-2">
          <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <Search className="h-4 w-4 text-slate-500" />
            <input
              value={resi}
              onChange={(event) => setResi(event.target.value)}
              className="flex-1 bg-transparent text-sm text-slate-900 outline-none"
              placeholder="Masukkan nomor resi atau order ID"
            />
            <button type="button" className="rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white">
              Lacak
            </button>
          </label>

          <div className="space-y-4">
            {timeline.map((step, index) => (
              <div key={step.label} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      step.active ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {step.active ? <CheckCircle2 className="h-5 w-5" /> : <Package className="h-5 w-5" />}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className={`w-px flex-1 ${step.active ? "bg-emerald-200" : "bg-slate-200"}`} />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <p className={`text-sm font-semibold ${step.active ? "text-slate-900" : "text-slate-400"}`}>{step.label}</p>
                  <p className="text-xs text-slate-500">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-4 rounded-3xl border border-emerald-50 bg-gradient-to-b from-emerald-50 via-white to-white p-6 shadow-sm">
          <div className="rounded-3xl bg-white/80 p-5 shadow">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500">Detail pesanan</p>
            <p className="mt-2 text-lg font-bold text-slate-900">Order {resi}</p>
            <div className="mt-4 space-y-2 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-emerald-600" />
                Ekspedisi EcoXpress
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-600" />
                Bandung • 40211
              </div>
            </div>
            <p className="mt-3 rounded-2xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
              Estimasi tiba 28 Nov 2025 (13:00 - 16:00)
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-white/70 p-5 shadow">
            <p className="text-sm font-semibold text-slate-900">Tips menjaga paket</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-slate-500">
              <li>Pastikan nomor kontak aktif saat kurir menghubungi.</li>
              <li>Rekam proses unboxing untuk klaim garansi.</li>
              <li>Gunakan fitur chat kurir jika butuh perubahan alamat.</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
