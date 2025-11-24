"use client";

import Image from "next/image";

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

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 bg-green-800 text-white transition-all duration-300 ${
        collapsed ? "w-[70px]" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-green-700">
        <div className="flex items-center space-x-3">
          <Image
            src="/logo.jpg"
            alt="ThriftMap"
            width={32}
            height={32}
            className="rounded"
          />
          {!collapsed && <span className="font-bold text-lg">ThriftMap</span>}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:text-green-200"
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>

      <nav className="mt-6">
        <div className="px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full text-left py-2 px-4 rounded-lg transition-colors ${
                activePage === item.id
                  ? "bg-green-700 text-white"
                  : "hover:bg-green-700 text-green-100"
              }`}
            >
              <i className={`fas ${item.icon} mr-3`}></i>
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </div>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-green-700">
        <a
          href="/"
          className="flex items-center space-x-3 text-green-100 hover:text-white"
        >
          <i className="fas fa-sign-out-alt"></i>
          {!collapsed && <span>Keluar</span>}
        </a>
      </div>
    </div>
  );
}
