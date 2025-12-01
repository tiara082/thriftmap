"use client";

import Image from "next/image";
import { Camera, Mail, MapPin, Phone, ShieldHalf, Sprout, Award, TrendingUp, Gift, Star, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  phone?: string;
  city?: string;
}

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

// Level configuration
const levelConfig = [
  { id: 1, name: 'Pemula Hijau', minXP: 0, maxXP: 99, icon: Sprout, color: 'emerald' },
  { id: 2, name: 'Sahabat Bumi', minXP: 100, maxXP: 299, icon: Star, color: 'lime' },
  { id: 3, name: 'Pahlawan Daur Ulang', minXP: 300, maxXP: 699, icon: Award, color: 'cyan' },
  { id: 4, name: 'Guardian Keberlanjutan', minXP: 700, maxXP: 1499, icon: ShieldHalf, color: 'blue' },
  { id: 5, name: 'Top 1% Penyelamat Lingkungan', minXP: 1500, maxXP: 999999, icon: Zap, color: 'amber' }
];

const getLevelFromXP = (xp: number) => {
  return levelConfig.find(level => xp >= level.minXP && xp <= level.maxXP) || levelConfig[0];
};

const getNextLevel = (currentLevel: number) => {
  return levelConfig.find(level => level.id === currentLevel + 1);
};

export default function DashboardProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [memberSince, setMemberSince] = useState("2023");
  const [userXP, setUserXP] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(levelConfig[0]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser({
        id: parsed.id || "1",
        name: parsed.name || "Guest User",
        email: parsed.email || "guest@thriftmap.com",
        phone: parsed.phone || "0812-3456-7890",
        city: parsed.city || parsed.shop?.city || "Jakarta",
        image: parsed.image || `https://avatar.iran.liara.run/public?username=${(parsed.name || 'user').split(' ')[0].toLowerCase()}`
      });
      
      // Get registration year from user data or default to 2023
      if (parsed.createdAt) {
        const year = new Date(parsed.createdAt).getFullYear();
        setMemberSince(year.toString());
      }

      // Get or generate XP for user
      const storedXP = localStorage.getItem(`user_xp_${parsed.id || '1'}`);
      let xp: number;
      
      if (storedXP) {
        xp = parseInt(storedXP);
      } else {
        // Generate random XP for new users (0-1800)
        xp = Math.floor(Math.random() * 1801);
        localStorage.setItem(`user_xp_${parsed.id || '1'}`, xp.toString());
      }
      
      setUserXP(xp);
      const level = getLevelFromXP(xp);
      setCurrentLevel(level);
    }
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }
  return (
    <section className="space-y-6 py-6" aria-labelledby="profile-heading">
      <header className="rounded-3xl border-2 border-emerald-100 bg-gradient-to-br from-white via-emerald-50/30 to-white p-8 shadow-lg backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 mb-3">
              <ShieldHalf className="h-4 w-4 text-emerald-600" />
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">PROFIL AKUN</p>
            </div>
            <h1 id="profile-heading" className="text-4xl font-black text-slate-900 tracking-tight">
              Kelola data akun & alamat
            </h1>
            <p className="mt-3 text-base text-slate-600">Atur informasi pribadi, preferensi marketplace, dan daftar alamat pengirimanmu</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <ShieldHalf className="h-5 w-5" /> Mode Aman Aktif
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-5 rounded-3xl border-2 border-emerald-100 bg-gradient-to-br from-white to-emerald-50/30 p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full bg-gradient-to-br from-emerald-100 to-lime-100 group ring-4 ring-white shadow-2xl hover:ring-emerald-200 transition-all duration-300">
            <Image src={user.image || "https://avatar.iran.liara.run/public"} alt="Foto profil" fill sizes="160px" className="object-cover group-hover:scale-110 transition-transform duration-500" />
            <button className="absolute bottom-4 right-4 rounded-full bg-white p-3 text-emerald-600 shadow-xl hover:bg-emerald-600 hover:text-white hover:scale-110 transition-all duration-300" aria-label="Ubah foto profil">
              <Camera className="h-5 w-5" />
            </button>
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{user.name}</p>
            <p className="text-sm font-medium text-slate-600 mt-1">Member sejak {memberSince}</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-100 to-lime-100 px-5 py-2.5 text-sm font-black text-emerald-700 shadow-md hover:scale-110 transition-transform duration-300 cursor-pointer">
              Level {currentLevel.id} • {currentLevel.name} 🌱
            </div>
          </div>
          <div className="space-y-3 pt-4 border-t-2 border-emerald-100">
            <div className="flex items-center justify-center gap-2 rounded-xl bg-white/80 px-4 py-3 hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer">
              <Mail className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-semibold text-slate-800">{user.email}</span>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-xl bg-white/80 px-4 py-3 hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer">
              <Phone className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-semibold text-slate-800">{user.phone}</span>
            </div>
          </div>
        </div>

        <div className="space-y-5 rounded-3xl border-2 border-emerald-100 bg-white p-8 shadow-lg lg:col-span-2 hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <div className="rounded-lg bg-emerald-100 p-2">
              <Mail className="h-5 w-5 text-emerald-600" />
            </div>
            Informasi Pribadi
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <label>
              <span className="text-sm font-bold text-slate-700">Nama Lengkap</span>
              <input defaultValue={user.name} className="mt-2 w-full rounded-2xl border-2 border-slate-200 px-4 py-3 font-medium text-slate-900 hover:border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300" />
            </label>
            <label>
              <span className="text-sm font-bold text-slate-700">Email</span>
              <input defaultValue={user.email} className="mt-2 w-full rounded-2xl border-2 border-slate-200 px-4 py-3 font-medium text-slate-900 hover:border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300" />
            </label>
            <label>
              <span className="text-sm font-bold text-slate-700">Nomor WhatsApp</span>
              <input defaultValue={user.phone} className="mt-2 w-full rounded-2xl border-2 border-slate-200 px-4 py-3 font-medium text-slate-900 hover:border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300" />
            </label>
            <label>
              <span className="text-sm font-bold text-slate-700">Tanggal Lahir</span>
              <input type="date" defaultValue="1998-04-10" className="mt-2 w-full rounded-2xl border-2 border-slate-200 px-4 py-3 font-medium text-slate-900 hover:border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300" />
            </label>
          </div>
          <label>
            <span className="text-sm font-bold text-slate-700">Bio Singkat</span>
            <textarea rows={3} className="mt-2 w-full rounded-2xl border-2 border-slate-200 px-4 py-3 font-medium text-slate-900 hover:border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300" placeholder="Tulis deskripsi singkat tentang gaya atau preferensi fashion kamu..."></textarea>
          </label>
          <button className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3.5 text-base font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300">
            Simpan Perubahan
          </button>
        </div>
      </div>

      {/* Level & Environmental Impact Section */}
      <section className="space-y-6">
        <div className="rounded-3xl border-2 border-emerald-200/60 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 p-3">
              <Award className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-black bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
              Level & Dampak Lingkungan
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Level Card */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-200/60 bg-white p-6 shadow-lg">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-200/30 to-teal-200/30 blur-2xl"></div>
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2">
                    {(() => { const Icon = currentLevel.icon; return <Icon className="h-5 w-5 text-white" />; })()}
                    <span className="text-sm font-black text-white uppercase tracking-wide">Badge Aktif</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{currentLevel.name}</span>
                </div>

                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative mb-4">
                    <div className={`h-24 w-24 rounded-full bg-gradient-to-br from-${currentLevel.color}-100 to-${currentLevel.color}-200 flex items-center justify-center shadow-xl`}>
                      {(() => { const Icon = currentLevel.icon; return <Icon className={`h-12 w-12 text-${currentLevel.color}-600`} />; })()}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-1">{currentLevel.name}</h3>
                  <p className="text-sm font-semibold text-slate-600">Rentang XP: {currentLevel.minXP.toLocaleString('id-ID')} - {currentLevel.maxXP === 999999 ? '∞' : currentLevel.maxXP.toLocaleString('id-ID')} XP</p>
                  <div className="inline-flex items-center gap-2 mt-3 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2 rounded-full border border-emerald-200">
                    <span className="text-xs font-black text-emerald-700">Level {currentLevel.id} dari 5 • {userXP.toLocaleString('id-ID')} XP</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {(() => {
                    const nextLevel = getNextLevel(currentLevel.id);
                    if (!nextLevel) {
                      return (
                        <div className="text-center py-4">
                          <p className="text-lg font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">🎉 Level Maksimum Tercapai! 🎉</p>
                          <p className="text-sm text-slate-600 font-semibold mt-2">Kamu sudah mencapai level tertinggi!</p>
                        </div>
                      );
                    }
                    const xpInCurrentLevel = userXP - currentLevel.minXP;
                    const xpNeededForLevel = currentLevel.maxXP - currentLevel.minXP + 1;
                    const progressPercent = (xpInCurrentLevel / xpNeededForLevel) * 100;
                    const xpToNext = nextLevel.minXP - userXP;
                    
                    return (
                      <>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-bold text-slate-700">Progress menuju level berikutnya</span>
                          <span className="font-black text-emerald-600">{xpToNext} XP lagi</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border-2 border-slate-200">
                          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 h-full rounded-full transition-all duration-500" style={{width: `${Math.min(progressPercent, 100)}%`}}></div>
                        </div>
                        <p className="text-xs text-slate-600 font-medium italic">
                          {xpToNext} XP lagi untuk membuka {nextLevel.name}
                        </p>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* XP per Product Condition */}
            <div className="rounded-2xl border-2 border-emerald-200/60 bg-white p-6 shadow-lg">
              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-emerald-600" />
                XP per Kondisi Produk
              </h3>
              <p className="text-sm text-slate-600 font-semibold mb-4">
                Setiap transaksi memberikan XP berdasarkan kondisi produk yang kamu beli:
              </p>
              <div className="space-y-3">
                {[
                  { condition: 'Cukup', xp: '+10 XP', color: 'amber' },
                  { condition: 'Baik', xp: '+20 XP', color: 'lime' },
                  { condition: 'Sangat Baik', xp: '+30 XP', color: 'emerald' },
                  { condition: 'Seperti Baru', xp: '+40 XP', color: 'teal' }
                ].map((item) => (
                  <div key={item.condition} className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-slate-50 to-emerald-50/30 border border-slate-200 hover:border-emerald-300 transition-all duration-300 group hover:scale-105">
                    <span className="text-sm font-bold text-slate-700 group-hover:text-emerald-600 transition-colors">{item.condition}</span>
                    <span className={`text-sm font-black text-${item.color}-600 bg-${item.color}-50 px-3 py-1 rounded-full`}>
                      {item.xp}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-500 font-medium italic bg-slate-50 p-3 rounded-xl border border-slate-200">
                XP dihitung otomatis setiap pesanan selesai. Semakin baik kondisi produk, semakin besar bonus yang kamu dapat!
              </p>
            </div>
          </div>

          {/* Badge Collection - 5 Levels */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Gift className="h-6 w-6 text-emerald-600" />
                Koleksi Badge Level
              </h3>
              <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full">5 TINGKAT PENCAPAIAN</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {levelConfig.map((badge) => {
                const isUnlocked = userXP >= badge.minXP;
                const isActive = currentLevel.id === badge.id;
                const xpNeeded = badge.minXP - userXP;
                const IconComponent = badge.icon;
                const description = isActive 
                  ? 'Terus kumpulkan XP untuk mencapai level berikutnya!' 
                  : isUnlocked 
                  ? `Level ini sudah kamu buka! 🎉` 
                  : `${xpNeeded.toLocaleString('id-ID')} XP lagi untuk membuka level ini`;
                
                return (
                  <div 
                    key={badge.id} 
                    className={`relative overflow-hidden rounded-2xl border-2 p-5 shadow-md transition-all duration-300 hover:shadow-xl group ${
                      !isUnlocked
                        ? 'border-slate-200 bg-slate-50 opacity-60' 
                        : isActive
                        ? 'border-emerald-400 bg-gradient-to-br from-emerald-50 to-white ring-2 ring-emerald-300 hover:scale-105'
                        : 'border-emerald-200 bg-gradient-to-br from-white to-emerald-50/30 hover:scale-105'
                    }`}
                  >
                    {!isUnlocked && (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/5 to-slate-900/10 backdrop-blur-[1px]"></div>
                    )}
                    
                    <div className="relative">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase ${
                          !isUnlocked
                            ? 'bg-slate-200 text-slate-600' 
                            : isActive
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white animate-pulse'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {!isUnlocked ? '🔒 Terkunci' : isActive ? '⭐ Aktif' : '✓ Terbuka'}
                        </span>
                      </div>
                      
                      <div className="flex flex-col items-center text-center mb-4">
                        <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-3 shadow-lg ${
                          !isUnlocked
                            ? 'bg-slate-200' 
                            : `bg-gradient-to-br from-${badge.color}-100 to-${badge.color}-200`
                        }`}>
                          <IconComponent className={`h-8 w-8 ${!isUnlocked ? 'text-slate-400' : `text-${badge.color}-600`}`} />
                        </div>
                        <h4 className={`text-base font-black mb-1 ${!isUnlocked ? 'text-slate-500' : 'text-slate-900'}`}>
                          {badge.name}
                        </h4>
                        <p className={`text-xs font-semibold ${!isUnlocked ? 'text-slate-400' : 'text-slate-600'}`}>
                          Level {badge.id} • {badge.minXP.toLocaleString('id-ID')} - {badge.maxXP === 999999 ? '∞' : badge.maxXP.toLocaleString('id-ID')} XP
                        </p>
                      </div>

                      <p className={`text-xs font-medium text-center ${!isUnlocked ? 'text-slate-400' : 'text-slate-600'}`}>
                        {description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <div className="rounded-lg bg-emerald-100 p-2">
              <MapPin className="h-5 w-5 text-emerald-600" />
            </div>
            Daftar Alamat
          </h2>
          <button className="inline-flex items-center gap-2 rounded-2xl border-2 border-emerald-600 px-4 py-2 text-sm font-bold text-emerald-600 hover:bg-emerald-50 transition-all duration-300">
            + Tambah Alamat
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {addresses.map((address, index) => (
            <article key={address.id} className="rounded-3xl border-2 border-emerald-100 bg-gradient-to-br from-white to-emerald-50/30 p-6 shadow-md hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <p className="text-base font-black text-slate-900">{address.label}</p>
                <span className={`text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full ${index === 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                  {index === 0 ? 'Utama' : 'Tersimpan'}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-700 mb-3">{address.detail.includes('Bandung') && user.city !== 'Bandung' ? address.detail.replace('Bandung', user.city || 'Jakarta') : address.detail}</p>
              <div className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-700 mb-4">
                <Phone className="h-4 w-4 text-emerald-600" /> {address.phone}
              </div>
              <div className="flex gap-2 pt-3 border-t-2 border-emerald-100">
                <button className="flex-1 rounded-2xl border-2 border-emerald-600 px-4 py-2.5 text-sm font-bold text-emerald-600 hover:bg-emerald-50 hover:scale-105 transition-all duration-300">Edit</button>
                <button className="flex-1 rounded-2xl border-2 border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:border-rose-300 hover:text-rose-600 hover:scale-105 transition-all duration-300">Hapus</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
