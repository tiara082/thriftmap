"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({
  activePage,
  setActivePage,
  collapsed,
  setCollapsed,
}: SidebarProps) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "fa-chart-line" },
    { id: "products", label: "Produk Saya", icon: "fa-box" },
    { id: "orders", label: "Pesanan", icon: "fa-shopping-bag" },
    { id: "curation", label: "Kurasi Produk", icon: "fa-tasks" },
    { id: "curation-history", label: "Histori Kurasi", icon: "fa-history" },
    {
      id: "pricing-analytics",
      label: "Harga & Analitik",
      icon: "fa-chart-bar",
    },
    { id: "profile", label: "Profil", icon: "fa-user" },
    { id: "settings", label: "Pengaturan", icon: "fa-cog" },
  ];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 bg-gradient-to-b from-green-700 via-green-800 to-green-900 text-white transition-all duration-300 shadow-xl ${
        collapsed ? "w-[70px]" : "w-64"
      }`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4 border-b border-green-600/50">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-all">
            <Image
              src="/logo.svg"
              alt="ThriftMap"
              width={28}
              height={28}
              className="rounded"
            />
          </div>
          {!collapsed && (
            <span className="font-bold text-lg bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
              ThriftMap
            </span>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white/70 hover:text-white hover:bg-white/10 rounded-lg p-1 transition-all"
        >
          <i className={`fas fa-${collapsed ? "bars" : "angle-left"}`}></i>
        </button>
      </div>

      {/* User Info Section */}
      {user && !collapsed && user.shop && (
        <div className="p-4 m-2 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
          <p className="text-xs text-green-200 font-semibold mb-1">
            TOKO ANDA
          </p>
          <p className="text-sm font-bold text-white truncate mb-1">
            {user.shop?.name || "Toko Saya"}
          </p>
          <div className="flex items-center gap-2 text-xs text-green-100">
            <i className="fas fa-star text-yellow-300"></i>
            <span>{user.shop?.rating || 0}</span>
            <span>•</span>
            <span>{user.shop?.totalSales || 0} penjualan</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="mt-6 px-2">
        <div className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full text-left py-3 px-4 rounded-xl transition-all duration-300 font-medium text-sm group ${
                activePage === item.id
                  ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                  : "text-green-100 hover:bg-white/10 hover:text-white"
              }`}
            >
              <i
                className={`fas ${item.icon} mr-3 ${
                  activePage === item.id
                    ? "text-white"
                    : "text-green-300 group-hover:text-white"
                }`}
              ></i>
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </div>
      </nav>

      {/* Logout */}
      <div className="absolute bottom-0 w-full p-4 border-t border-green-600/50 space-y-3">
        {user && !collapsed && (
          <div className="p-3 bg-white/5 rounded-lg border border-white/10">
            <p className="text-xs text-green-200 font-semibold mb-1">
              LOGIN SEBAGAI
            </p>
            <p className="text-xs text-white truncate">{user.email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 text-green-100 hover:text-white hover:bg-red-500/20 hover:border-red-500/50 p-3 rounded-xl transition-all duration-300 group border border-transparent"
        >
          <i className="fas fa-sign-out-alt group-hover:scale-110 transition-transform"></i>
          {!collapsed && <span className="font-medium">Keluar</span>}
        </button>
      </div>
    </div>
  );
}
