"use client";

import Image from "next/image";
import { Camera, Mail, MapPin, Phone, ShieldHalf } from "lucide-react";

const addresses = [
  {
    id: "home",
    label: "Alamat Utama",
    detail: "Jl. Taman Sari No. 21, Bandung 40111",
    phone: "0812-3456-7890"
  },
  {
    id: "office",
    label: "Alamat Kantor",
    detail: "Jl. Merdeka No. 90, Bandung",
    phone: "0821-7777-1212"
  }
];

export default function DashboardProfile() {
  return (
    <section className="space-y-8" aria-labelledby="profile-heading">
      <header className="rounded-3xl border border-emerald-50 bg-white/90 p-6 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">Profil</p>
            <h1 id="profile-heading" className="mt-1 text-3xl font-bold text-slate-900">
              Data akun & alamat
            </h1>
            <p className="text-sm text-slate-500">Kelola preferensi marketplace, alamat, dan kontak darurat.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full border border-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-600">
            <ShieldHalf className="h-4 w-4" /> Mode aman aktif
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 rounded-3xl border border-emerald-50 bg-white p-6 text-center shadow-sm">
          <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full bg-emerald-50">
            <Image src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80" alt="Foto profil" fill sizes="144px" className="object-cover" />
            <button className="absolute bottom-3 right-3 rounded-full bg-white/90 p-2 text-emerald-600 shadow" aria-label="Ubah foto profil">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-900">Nadia Kusuma</p>
            <p className="text-sm text-slate-500">Member sejak 2023</p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
              Level 5 • Eco Hero
            </div>
          </div>
          <div className="space-y-2 text-sm text-slate-500">
            <p className="inline-flex items-center justify-center gap-2">
              <Mail className="h-4 w-4 text-emerald-600" /> nadia.kusuma@email.com
            </p>
            <p className="inline-flex items-center justify-center gap-2">
              <Phone className="h-4 w-4 text-emerald-600" /> 0812-3456-7890
            </p>
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-emerald-50 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900">Informasi pribadi</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-slate-500">
              Nama Lengkap
              <input defaultValue="Nadia Kusuma" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900" />
            </label>
            <label className="text-sm text-slate-500">
              Email
              <input defaultValue="nadia.kusuma@email.com" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900" />
            </label>
            <label className="text-sm text-slate-500">
              Nomor WhatsApp
              <input defaultValue="081234567890" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900" />
            </label>
            <label className="text-sm text-slate-500">
              Tanggal lahir
              <input type="date" defaultValue="1998-04-10" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900" />
            </label>
          </div>
          <label className="text-sm text-slate-500">
            Bio singkat
            <textarea rows={3} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900" placeholder="Tulis deskripsi singkat tentang gaya atau preferensi fashion kamu."></textarea>
          </label>
          <button className="w-full rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg">
            Simpan perubahan
          </button>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {addresses.map((address) => (
          <article key={address.id} className="rounded-3xl border border-emerald-50 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">{address.label}</p>
              <span className="text-xs font-semibold uppercase tracking-wide text-emerald-500">Aktif</span>
            </div>
            <p className="mt-2 text-sm text-slate-500">{address.detail}</p>
            <p className="mt-2 inline-flex items-center gap-2 text-xs text-slate-500">
              <MapPin className="h-4 w-4 text-emerald-600" /> {address.phone}
            </p>
            <div className="mt-4 flex gap-2">
              <button className="rounded-2xl border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-600">Ubah</button>
              <button className="rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-500">Hapus</button>
            </div>
          </article>
        ))}
      </section>
    </section>
  );
}
