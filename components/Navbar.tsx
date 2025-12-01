'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Home, ShoppingBag, Heart, Gift, Truck, Search, Bell, User, Menu, Settings, LogOut, Trophy, Zap, Leaf } from 'lucide-react';

// Mock session hook - replace with your actual session management
function useSession() {
  const [session, setSession] = useState<any>(null);
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        // Ensure image is set with fallback to avatar generator
        const userWithImage = {
          ...user,
          image: user.image || `https://avatar.iran.liara.run/public?username=${(user.name || 'user').split(' ')[0].toLowerCase()}`
        };
        setSession({ user: userWithImage });
        setStatus('authenticated');
      } catch (error) {
        console.error('Error parsing user data:', error);
        setStatus('unauthenticated');
      }
    } else {
      setStatus('unauthenticated');
    }
  }, []);

  return { data: session, status };
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: "/dashboard-user", label: "Beranda", icon: Home },
    { href: "/dashboard-user/products", label: "Produk", icon: ShoppingBag },
    { href: "/dashboard-user/wishlist", label: "Wishlist", icon: Heart },
    { href: "/dashboard-user/orders", label: "Orders", icon: Gift },
    { href: "/dashboard-user/tracking", label: "Tracking", icon: Truck },
  ];

  const handleLogout = () => {
    // Cek role user untuk redirect yang tepat
    const userData = localStorage.getItem('user');
    let redirectUrl = '/login-user'; // default untuk user
    
    if (userData) {
      try {
        const user = JSON.parse(userData);
        // Jika seller, redirect ke login seller
        if (user.role === 'seller') {
          redirectUrl = '/login-seller';
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    
    // Hapus semua data auth
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    document.cookie = "isAuthenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // Redirect ke halaman login yang sesuai
    window.location.href = redirectUrl;
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-lg' 
          : 'bg-white/80 backdrop-blur-md border-b border-slate-100'
      }`}>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4 lg:gap-8">
            {/* Logo */}
            <Link href="/dashboard-user" className="flex items-center gap-3 hover:opacity-90 transition-opacity shrink-0">
              <Image
                src="/logo.svg"
                alt="ThriftMap"
                width={48}
                height={48}
                className="h-10 w-auto"
                priority
              />
              <div className="hidden sm:flex flex-col">
                <span className="text-lg font-black bg-gradient-to-r from-emerald-600 to-lime-500 bg-clip-text text-transparent leading-tight">
                  Style More
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                  Spend Less
                </span>
              </div>
            </Link>

            {/* Search Bar - Desktop (Priority Position) */}
            <div className="hidden lg:flex flex-1 max-w-3xl mx-4">
              <div className="relative w-full group">
                <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-100 group-focus-within:bg-emerald-200 transition-all">
                  <Search className="h-5 w-5 text-emerald-700" />
                </div>
                <input
                  type="text"
                  placeholder="Cari produk preloved, fashion, elektronik, dan lainnya..."
                  className="w-full pl-14 pr-4 py-2.5 text-base font-semibold border-2 border-slate-200 rounded-2xl bg-slate-50 text-slate-900 placeholder:text-slate-500 placeholder:font-medium focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100 hover:border-emerald-300 hover:bg-white transition-all duration-300 outline-none"
                />
              </div>
            </div>
              
            {/* Desktop Navigation - Compact */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              {navItems.slice(0, 3).map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden xl:inline">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Mobile/Tablet Search */}
              <button className="lg:hidden p-2.5 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all">
                <Search className="h-5 w-5" />
              </button>

              {/* Notifications */}
              <button className="relative p-2.5 text-slate-600 hover:text-emerald-600 bg-slate-50 hover:bg-emerald-50 rounded-xl transition-all">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg">
                  3
                </span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button 
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-emerald-50 transition-all"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-200 shadow-md">
                    {session?.user?.image ? (
                      <Image 
                        src={session.user.image} 
                        alt={session.user.name || "User"} 
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-600">
                        <User className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-slate-900">{session?.user?.name || "User"}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex items-center gap-1">
                        <Trophy className="h-3 w-3 text-amber-500" />
                        <span className="text-xs font-medium text-slate-600">Lvl {session?.user?.level || 1}</span>
                      </div>
                      <span className="text-slate-300">•</span>
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-amber-500" />
                        <span className="text-xs font-medium text-slate-600">{session?.user?.xp?.toLocaleString() || 0} XP</span>
                      </div>
                    </div>
                  </div>
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600">
                          {session?.user?.image ? (
                            <Image 
                              src={session.user.image} 
                              alt={session.user.name || "User"} 
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <User className="h-5 w-5 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900 truncate">{session?.user?.name || "User"}</p>
                          <p className="text-xs text-slate-500 truncate">{session?.user?.email || "user@example.com"}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <Trophy className="h-3 w-3 text-amber-500" />
                          <span className="text-xs font-medium text-slate-700">Level {session?.user?.level || 1}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="h-3 w-3 text-amber-500" />
                          <span className="text-xs font-medium text-slate-700">{session?.user?.xp?.toLocaleString() || 0} XP</span>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link href="/dashboard-user/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                        <User className="h-4 w-4" />
                        Profil Saya
                      </Link>
                      <Link href="/dashboard-user/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                        <Settings className="h-4 w-4" />
                        Pengaturan
                      </Link>
                      <Link href="/dashboard-user/orders" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                        <Gift className="h-4 w-4" />
                        Orders Saya
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 pt-2">
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Keluar
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16"></div>
    </>
  );
}
