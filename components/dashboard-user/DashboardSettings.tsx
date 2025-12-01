"use client";

import { useEffect, useState } from "react";
import { BellRing, Laptop, ShieldCheck, Smartphone, Tablet } from "lucide-react";

const notificationPrefs = [
  { id: "order", label: "Update status pesanan" },
  { id: "promo", label: "Flash sale & promo" },
  { id: "newsletter", label: "Newsletter mingguan" },
  { id: "wishlist", label: "Wishlist restock" },
  { id: "chat", label: "Pesan dari penjual" },
  { id: "review", label: "Reminder review produk" }
];

const getDeviceSessions = (city: string) => [
  { device: "Macbook Pro", location: city, icon: Laptop, active: true, lastActive: "Sekarang" },
  { device: "iPhone 15", location: "Jakarta", icon: Smartphone, active: false, lastActive: "2 hari lalu" },
  { device: "iPad Air", location: city, icon: Tablet, active: false, lastActive: "1 minggu lalu" },
  { device: "Windows Desktop", location: "Surabaya", icon: Laptop, active: false, lastActive: "2 minggu lalu" }
];

export default function DashboardSettings() {
  const [prefs, setPrefs] = useState(() => notificationPrefs.reduce<Record<string, boolean>>((acc, pref) => ({ ...acc, [pref.id]: true }), {}));
  const [userCity, setUserCity] = useState("Bandung");
  const [sessions, setSessions] = useState(getDeviceSessions("Bandung"));

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      const city = parsed.city || parsed.shop?.city || "Jakarta";
      setUserCity(city);
      setSessions(getDeviceSessions(city));
    }
  }, []);

  const togglePref = (id: string) => setPrefs((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section className="space-y-6 py-6" aria-labelledby="settings-heading">
      <header className="rounded-3xl border-2 border-emerald-100 bg-gradient-to-br from-white via-emerald-50/30 to-white p-8 shadow-lg backdrop-blur">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 mb-3">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">PENGATURAN</p>
        </div>
        <h1 id="settings-heading" className="text-4xl font-black text-slate-900 tracking-tight">
          Personalisasi notifikasi & keamanan
        </h1>
        <p className="mt-3 text-base text-slate-600">Atur cara kami menghubungi kamu dan amankan akun marketplace-mu dengan lebih baik.</p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="rounded-3xl border-2 border-emerald-100 bg-white p-7 shadow-lg lg:col-span-2 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-xl bg-emerald-100 p-2.5">
              <BellRing className="h-6 w-6 text-emerald-600" />
            </div>
            <h2 className="text-xl font-black text-slate-900">Preferensi Notifikasi</h2>
          </div>
          <div className="space-y-3">
            {notificationPrefs.map((pref, index) => (
              <div key={pref.id} className="flex items-center justify-between rounded-2xl border-2 border-slate-100 bg-gradient-to-r from-white to-slate-50/50 px-5 py-4 hover:border-emerald-200 hover:shadow-md transition-all duration-300 stagger-item" style={{animationDelay: `${index * 0.1}s`}}>
                <p className="text-sm font-bold text-slate-800">{pref.label}</p>
                <button
                  type="button"
                  onClick={() => togglePref(pref.id)}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-500 shadow-md hover:scale-110 ${prefs[pref.id] ? "bg-gradient-to-r from-emerald-500 to-teal-500" : "bg-slate-300"}`}
                  aria-pressed={prefs[pref.id]}
                >
                  <span className={`inline-block h-6 w-6 rounded-full bg-white transition-all duration-300 shadow-lg ${prefs[pref.id] ? "translate-x-7" : "translate-x-1"}`} />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border-2 border-emerald-100 bg-white p-7 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-xl bg-emerald-100 p-2.5">
              <ShieldCheck className="h-6 w-6 text-emerald-600" />
            </div>
            <h2 className="text-xl font-black text-slate-900">Keamanan</h2>
          </div>
          <div className="space-y-4">
            <label className="w-full">
              <span className="text-sm font-bold text-slate-700">Password lama</span>
              <input type="password" placeholder="••••••••" className="mt-2 w-full rounded-2xl border-2 border-slate-200 px-4 py-3 font-medium hover:border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300" />
            </label>
            <label className="w-full">
              <span className="text-sm font-bold text-slate-700">Password baru</span>
              <input type="password" placeholder="••••••••" className="mt-2 w-full rounded-2xl border-2 border-slate-200 px-4 py-3 font-medium hover:border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300" />
            </label>
            <label className="w-full">
              <span className="text-sm font-bold text-slate-700">Konfirmasi password</span>
              <input type="password" placeholder="••••••••" className="mt-2 w-full rounded-2xl border-2 border-slate-200 px-4 py-3 font-medium hover:border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300" />
            </label>
            <button className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300">
              Perbarui Password
            </button>
            <div className="rounded-xl bg-emerald-50 border-2 border-emerald-100 p-3">
              <p className="text-xs font-semibold text-emerald-700">💡 Tips keamanan: Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol</p>
            </div>
          </div>
        </section>
      </div>

      <section className="rounded-3xl border-2 border-emerald-100 bg-white p-7 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-3">
          <div className="rounded-xl bg-emerald-100 p-2.5">
            <Laptop className="h-6 w-6 text-emerald-600" />
          </div>
          <h2 className="text-xl font-black text-slate-900">Perangkat Terhubung</h2>
        </div>
        <p className="text-sm text-slate-600 mb-6">Kelola akses perangkat ke akunmu • <span className="font-bold text-emerald-600">{sessions.length} perangkat</span> terdaftar</p>
        <div className="grid gap-4 md:grid-cols-2">
          {sessions.map((session, index) => (
            <article key={session.device} className="flex items-center justify-between rounded-2xl border-2 border-slate-100 bg-gradient-to-r from-white to-slate-50/50 px-5 py-4 hover:border-emerald-200 hover:shadow-md transition-all duration-300 stagger-item" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="flex items-center gap-3">
                <div className={`rounded-lg p-2 ${session.active ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                  <session.icon className={`h-5 w-5 ${session.active ? 'text-emerald-600' : 'text-slate-500'}`} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{session.device}</p>
                  <p className="text-xs text-slate-500">{session.location} • {session.lastActive}</p>
                </div>
              </div>
              <button className={`text-xs font-bold px-3 py-1.5 rounded-full ${session.active ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-600 hover:bg-rose-200 hover:scale-110 transition-all'}`}>
                {session.active ? "Aktif" : "Hapus"}
              </button>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
