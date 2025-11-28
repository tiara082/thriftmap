"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import DashboardHome from "@/components/dashboard-user/DashboardHome";
import DashboardOrders from "@/components/dashboard-user/DashboardOrders";
import DashboardProducts from "@/components/dashboard-user/DashboardProducts";
import DashboardCart from "@/components/dashboard-user/DashboardCart";
import DashboardWishlist from "@/components/dashboard-user/DashboardWishlist";
import DashboardTracking from "@/components/dashboard-user/DashboardTracking";
import DashboardProfile from "@/components/dashboard-user/DashboardProfile";
import DashboardSettings from "@/components/dashboard-user/DashboardSettings";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login-user");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <DashboardHome />;
      case "orders":
        return <DashboardOrders />;
      case "products":
        return <DashboardProducts />;
      case "cart":
        return <DashboardCart />;
      case "wishlist":
        return <DashboardWishlist />;
      case "tracking":
        return <DashboardTracking />;
      case "profile":
        return <DashboardProfile />;
      case "settings":
        return <DashboardSettings />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-gradient-to-b from-green-600 to-emerald-700 text-white z-40 transition-all duration-300 ${
          sidebarCollapsed ? "w-[70px]" : "w-64"
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b border-green-500">
          {!sidebarCollapsed && (
            <h1 className="text-xl font-bold">ThriftMap</h1>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 hover:bg-green-500 rounded-lg transition-all"
          >
            <i className={`fas fa-${sidebarCollapsed ? "bars" : "times"} text-lg`}></i>
          </button>
        </div>

        <nav className="mt-4 space-y-1 px-2 flex flex-col h-[calc(100vh-100px)]">
          <div className="flex-1">
            {[
              { id: "home", icon: "home", label: "Beranda" },
              { id: "orders", icon: "shopping-bag", label: "Pesanan Saya" },
              { id: "products", icon: "box", label: "Produk" },
              { id: "cart", icon: "shopping-cart", label: "Keranjang" },
              { id: "wishlist", icon: "heart", label: "Wishlist" },
              { id: "tracking", icon: "truck", label: "Lacak Pesanan" },
              { id: "profile", icon: "user", label: "Profil" },
              { id: "settings", icon: "cog", label: "Pengaturan" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id
                    ? "bg-white text-green-600 font-semibold"
                    : "hover:bg-green-500 text-white"
                }`}
              >
                <i className={`fas fa-${item.icon} text-lg`}></i>
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            ))}
          </div>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all bg-red-500 hover:bg-red-600 text-white font-semibold mt-2"
          >
            <i className="fas fa-sign-out-alt text-lg"></i>
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "ml-[70px]" : "ml-64"
        } p-6`}
      >
        {renderContent()}
      </main>
    </div>
  );
}
