"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, MapPin, Package, Search, Truck, Clock } from "lucide-react";

const orderTrackingData: Record<string, any> = {
  "TM-9821": {
    timeline: [
      { label: "Pesanan dikonfirmasi", time: "25 Nov 10:05", active: true },
      { label: "Sedang dikemas", time: "25 Nov 14:22", active: true },
      { label: "Dikirim ekspedisi", time: "26 Nov 08:10", active: true },
      { label: "Dalam perjalanan", time: "26 Nov 17:45", active: false },
      { label: "Sampai tujuan", time: "-", active: false }
    ],
    courier: "EcoXpress",
    destination: "Bandung • 40211",
    eta: "28 Nov 2025 (13:00 - 16:00)",
    items: 3
  },
  "TM-9774": {
    timeline: [
      { label: "Pesanan dikonfirmasi", time: "24 Nov 09:15", active: true },
      { label: "Sedang dikemas", time: "24 Nov 11:30", active: true },
      { label: "Dikirim ekspedisi", time: "24 Nov 16:45", active: true },
      { label: "Dalam perjalanan", time: "25 Nov 07:20", active: true },
      { label: "Sampai tujuan", time: "-", active: false }
    ],
    courier: "ThriftExpress",
    destination: "Jakarta • 12940",
    eta: "27 Nov 2025 (10:00 - 14:00)",
    items: 1
  },
  "TM-9620": {
    timeline: [
      { label: "Pesanan dikonfirmasi", time: "20 Nov 08:00", active: true },
      { label: "Sedang dikemas", time: "20 Nov 10:15", active: true },
      { label: "Dikirim ekspedisi", time: "20 Nov 14:30", active: true },
      { label: "Dalam perjalanan", time: "21 Nov 06:45", active: true },
      { label: "Sampai tujuan", time: "22 Nov 11:20", active: true }
    ],
    courier: "PrelovedShip",
    destination: "Surabaya • 60119",
    eta: "Pesanan telah diterima",
    items: 2
  }
};

const recentOrders = ["TM-9821", "TM-9774", "TM-9620"];

export default function DashboardTracking() {
  const [resi, setResi] = useState("TM-9821");
  const [trackingData, setTrackingData] = useState(orderTrackingData["TM-9821"]);
  const [userCity, setUserCity] = useState("Bandung");

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      setUserCity(parsed.city || parsed.shop?.city || "Jakarta");
    }
  }, []);

  const handleTrack = () => {
    const data = orderTrackingData[resi];
    if (data) {
      setTrackingData(data);
    }
  };

  return (
    <section className="space-y-8 relative" aria-labelledby="tracking-heading">
      {/* Floating Background Particles */}
      <div className="fixed top-10 left-10 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl animate-floating-slow pointer-events-none" />
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-lime-300/15 rounded-full blur-3xl animate-floating-medium pointer-events-none" />
      <header className="rounded-3xl border border-emerald-50 bg-white/90 p-6 shadow-sm backdrop-blur relative z-10 animate-fade-in-down">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500 animate-glow">Tracking</p>
        <h1 id="tracking-heading" className="mt-1 text-3xl font-bold text-slate-900">
          Pantau resi secara realtime
        </h1>
        <p className="text-sm text-slate-500">Masukkan nomor pesanan atau resi ekspedisi favoritmu.</p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 relative z-10">
        <div className="space-y-6 rounded-3xl border border-emerald-50 bg-white p-6 shadow-sm lg:col-span-2 animate-scale-in">
          <div>
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 hover:border-emerald-300 transition-all duration-300">
              <Search className="h-4 w-4 text-slate-500 animate-pulse" />
              <input
                value={resi}
                onChange={(event) => setResi(event.target.value)}
                className="flex-1 bg-transparent text-sm text-slate-900 outline-none"
                placeholder="Masukkan nomor resi atau order ID"
              />
              <button type="button" onClick={handleTrack} className="rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white hover:scale-105 transform transition-all duration-300 relative overflow-hidden group">
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Lacak</span>
              </button>
            </label>
            <div className="mt-3 flex gap-2 flex-wrap">
              <p className="text-xs text-slate-500 w-full mb-1">Pesanan terbaru:</p>
              {recentOrders.map((orderId) => (
                <button
                  key={orderId}
                  onClick={() => { setResi(orderId); setTrackingData(orderTrackingData[orderId]); }}
                  className="text-xs px-3 py-1 rounded-full border border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:scale-105 transition-all duration-300"
                >
                  {orderId}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {trackingData.timeline.map((step: any, index: number) => (
              <div key={step.label} className="flex gap-4 stagger-item" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-500 ${
                      step.active ? "bg-emerald-600 text-white shadow-lg animate-pulse-strong" : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {step.active ? <CheckCircle2 className="h-5 w-5 animate-bounce" /> : <Package className="h-5 w-5" />}
                  </div>
                  {index < trackingData.timeline.length - 1 && (
                    <div className={`w-px flex-1 transition-all duration-500 ${step.active ? "bg-emerald-200 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-slate-200"}`} />
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

        <aside className="space-y-4 rounded-3xl border border-emerald-50 bg-gradient-to-b from-emerald-50 via-white to-white p-6 shadow-sm animate-scale-in">
          <div className="rounded-3xl bg-white/80 p-5 shadow hover:shadow-lg transition-all duration-300">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500 animate-glow">Detail pesanan</p>
            <p className="mt-2 text-lg font-bold text-slate-900">Order {resi}</p>
            <div className="mt-4 space-y-2 text-sm text-slate-500">
              <div className="flex items-center gap-2 hover:text-emerald-600 transition-colors duration-300">
                <Truck className="h-4 w-4 text-emerald-600 animate-bounce" />
                Ekspedisi {trackingData.courier}
              </div>
              <div className="flex items-center gap-2 hover:text-emerald-600 transition-colors duration-300">
                <MapPin className="h-4 w-4 text-emerald-600 animate-pulse" />
                {trackingData.destination}
              </div>
              <div className="flex items-center gap-2 hover:text-emerald-600 transition-colors duration-300">
                <Package className="h-4 w-4 text-emerald-600 animate-pulse" />
                {trackingData.items} item
              </div>
            </div>
            <p className="mt-3 rounded-2xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 animate-glow flex items-center gap-2">
              <Clock className="h-3 w-3 animate-pulse" />
              {trackingData.eta.includes("Pesanan") ? trackingData.eta : `Estimasi tiba ${trackingData.eta}`}
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-white/70 p-5 shadow hover:shadow-lg hover:scale-105 transition-all duration-300">
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
