"use client";

import { useState } from "react";
import { BellRing, Laptop, ShieldCheck, Smartphone } from "lucide-react";

const notificationPrefs = [
  { id: "order", label: "Update status pesanan" },
  { id: "promo", label: "Flash sale & promo" },
  { id: "newsletter", label: "Newsletter mingguan" },
  { id: "wishlist", label: "Wishlist restock" }
];

const sessions = [
  { device: "Macbook Pro", location: "Bandung", icon: Laptop, active: true },
  { device: "iPhone 15", location: "Jakarta", icon: Smartphone, active: false }
];

export default function DashboardSettings() {
  const [prefs, setPrefs] = useState(() => notificationPrefs.reduce<Record<string, boolean>>((acc, pref) => ({ ...acc, [pref.id]: true }), {}));

  const togglePref = (id: string) => setPrefs((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section className="space-y-8" aria-labelledby="settings-heading">
      <header className="rounded-3xl border border-emerald-50 bg-white/90 p-6 shadow-sm backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">Pengaturan</p>
        <h1 id="settings-heading" className="mt-1 text-3xl font-bold text-slate-900">
          Personalisasi notifikasi & keamanan
        </h1>
        <p className="text-sm text-slate-500">Atur cara kami menghubungi kamu dan amankan akun marketplace.</p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="rounded-3xl border border-emerald-50 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center gap-3">
            <BellRing className="h-5 w-5 text-emerald-600" />
            <h2 className="text-lg font-semibold text-slate-900">Notifikasi yang aktif</h2>
          </div>
          <div className="mt-5 space-y-4">
            {notificationPrefs.map((pref) => (
              <div key={pref.id} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                <p className="text-sm font-semibold text-slate-700">{pref.label}</p>
                <button
                  type="button"
                  onClick={() => togglePref(pref.id)}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full ${prefs[pref.id] ? "bg-emerald-500" : "bg-slate-200"}`}
                  aria-pressed={prefs[pref.id]}
                >
                  <span className={`inline-block h-5 w-5 rounded-full bg-white transition ${prefs[pref.id] ? "translate-x-5" : "translate-x-1"}`} />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-emerald-50 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            <h2 className="text-lg font-semibold text-slate-900">Ganti password</h2>
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-500">
            <label className="w-full text-sm">
              Password lama
              <input type="password" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3" />
            </label>
            <label className="w-full text-sm">
              Password baru
              <input type="password" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3" />
            </label>
            <label className="w-full text-sm">
              Konfirmasi password
              <input type="password" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3" />
            </label>
            <button className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white">Perbarui password</button>
            <p className="text-xs text-slate-400">Tips: gunakan kombinasi huruf besar, angka, dan simbol.</p>
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-emerald-50 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Sesi aktif</h2>
        <p className="text-sm text-slate-500">Kelola perangkat yang terhubung ke akunmu.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {sessions.map((session) => (
            <article key={session.device} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
              <div className="flex items-center gap-3">
                <session.icon className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{session.device}</p>
                  <p className="text-xs text-slate-500">{session.location}</p>
                </div>
              </div>
              <button className="text-xs font-semibold text-rose-500">{session.active ? "Perangkat aktif" : "Hapus"}</button>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
