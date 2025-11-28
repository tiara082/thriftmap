'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, LogOut, Menu, ShoppingBag, ShoppingCart, Sparkles, User2, X } from 'lucide-react';
import { useCart } from '@/lib/cart-store';
import { useAuth } from '@/lib/auth-context';

export default function Navbar() {
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = getTotalItems();

  const navItems = [
    { label: 'Marketplace', href: '/marketplace', icon: ShoppingBag },
    ...(user?.role === 'seller'
      ? [{ label: 'Dashboard Seller', href: '/dashboard-seller', icon: LayoutDashboard }]
      : []),
  ];

  const renderNavItems = (variant: 'desktop' | 'mobile') =>
    navItems.map(({ label, href, icon: Icon }) => {
      const isActive = pathname.startsWith(href);
      const baseStyles =
        variant === 'desktop'
          ? 'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors'
          : 'flex items-center gap-3 rounded-2xl border px-4 py-3 text-base font-medium shadow-sm';
      const activeStyles =
        variant === 'desktop'
          ? 'bg-emerald-100 text-emerald-700 shadow-[0_10px_25px_rgba(16,185,129,0.25)]'
          : 'bg-emerald-50 text-emerald-700 border-emerald-200';
      const inactiveStyles =
        variant === 'desktop'
          ? 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
          : 'text-slate-600 bg-white border-emerald-100';

      return (
        <Link
          key={href}
          href={href}
          className={`${baseStyles} ${isActive ? activeStyles : inactiveStyles}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Link>
      );
    });

  return (
    <nav className="sticky top-0 z-50 border-b border-emerald-50 bg-white/80 shadow-[0_20px_45px_rgba(16,185,129,0.08)] backdrop-blur supports-[backdrop-filter]:backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 p-3 text-white shadow-lg">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xl font-black tracking-tight text-slate-900">ThriftMap</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-emerald-600">
              Marketplace
            </p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-2 rounded-full border border-emerald-100 bg-white/70 p-1 shadow-inner shadow-emerald-50">
          {renderNavItems('desktop')}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="relative flex items-center gap-2 rounded-full border border-emerald-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden sm:inline">Keranjang</span>
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div className="group relative">
              <button className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white/70 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700">
                <User2 className="h-5 w-5 text-emerald-500" />
                <span className="hidden sm:inline">{user.name}</span>
              </button>
              <div className="pointer-events-none absolute right-0 mt-3 w-60 rounded-2xl border border-emerald-50 bg-white/95 p-3 opacity-0 shadow-2xl backdrop-blur transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100">
                <div className="space-y-1 text-sm text-slate-500">
                  <p className="font-semibold text-slate-700">Hi, {user.name}</p>
                  <p className="text-xs uppercase tracking-widest text-emerald-600">Member</p>
                </div>
                <div className="mt-3 space-y-1">
                  <Link href="/profile" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700">
                    <User2 className="h-4 w-4" /> Profile
                  </Link>
                  <Link href="/orders" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700">
                    <ShoppingBag className="h-4 w-4" /> Pesanan
                  </Link>
                  <button
                    type="button"
                    onClick={logout}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-rose-600 transition hover:bg-rose-50"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2 text-sm font-semibold text-white shadow-lg hover:from-emerald-600 hover:to-teal-600"
            >
              Masuk
            </Link>
          )}

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-100 text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700 md:hidden"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-emerald-50 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4">
            {renderNavItems('mobile')}
            <Link
              href="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm"
            >
              <span className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" /> Keranjang
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                {totalItems}
              </span>
            </Link>
            {user ? (
              <button
                type="button"
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 text-sm font-semibold text-white shadow-lg"
              >
                Masuk
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
