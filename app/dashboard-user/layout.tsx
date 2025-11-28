"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Heart, Home, ListOrdered, Settings, ShoppingBag, ShoppingCart, UserRound } from "lucide-react";
import clsx from "clsx";
import { useAuth } from "@/lib/auth-context";

interface DashboardUserLayoutProps {
  children: ReactNode;
}

const primaryLinks = [
  { href: "/dashboard-user", label: "Home", match: "/dashboard-user", icon: Home },
  { href: "/dashboard-user/products", label: "Produk", match: "/dashboard-user/products", icon: ShoppingBag },
  { href: "/dashboard-user/orders", label: "Pesanan", match: "/dashboard-user/orders", icon: ListOrdered },
  { href: "/dashboard-user/profile", label: "Profil", match: "/dashboard-user/profile", icon: UserRound },
  { href: "/dashboard-user/settings", label: "Pengaturan", match: "/dashboard-user/settings", icon: Settings }
];

const utilityLinks = [
  { href: "/dashboard-user/wishlist", label: "Wishlist", match: "/dashboard-user/wishlist", icon: Heart },
  { href: "/dashboard-user/cart", label: "Keranjang", match: "/dashboard-user/cart", icon: ShoppingCart }
];

export default function DashboardUserLayout({ children }: DashboardUserLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const isActive = (match: string) => {
    if (match === "/dashboard-user") return pathname === match;
    return pathname.startsWith(match);
  };

  const handleLogout = () => {
    logout();
    router.push("/login-user");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-emerald-50 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/dashboard-user" className="flex items-center gap-3" aria-label="Kembali ke beranda user">
            <Image src="/logo.svg" alt="ThriftMap" width={120} height={36} priority />
            <span className="hidden text-sm font-semibold text-emerald-600 md:inline">Marketplace User</span>
          </Link>

          <nav className="hidden items-center gap-4 text-sm font-semibold text-slate-600 lg:flex">
            {primaryLinks.map(({ href, label, match, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 transition-colors",
                  isActive(match) ? "bg-emerald-50 text-emerald-600" : "hover:text-emerald-600"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {utilityLinks.map(({ href, label, match, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "hidden items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold sm:flex",
                  isActive(match)
                    ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                    : "border-emerald-100 text-emerald-600 hover:border-emerald-300"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-emerald-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-emerald-50 bg-white/95 shadow-2xl shadow-emerald-900/5 md:hidden">
        <div className="mx-auto flex max-w-md items-stretch justify-between px-6 py-3 text-xs font-semibold text-slate-500">
          {[...primaryLinks.slice(0, 3), ...utilityLinks].map(({ href, label, match, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex flex-1 flex-col items-center gap-1",
                isActive(match) ? "text-emerald-600" : "hover:text-emerald-600"
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}