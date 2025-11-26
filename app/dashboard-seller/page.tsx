"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard-seller/Sidebar";
import Header from "@/components/dashboard-seller/Header";
import DashboardHome from "@/components/dashboard-seller/DashboardHome";
import ProfilePage from "@/components/dashboard-seller/ProfilePage";
import SellerProductsPage from "@/components/dashboard-seller/SellerProductsPage";
import OrdersPage from "@/components/dashboard-seller/OrdersPage";
import SettingsPage from "@/components/dashboard-seller/SettingsPage";
import CurationPage from "@/components/dashboard-seller/CurationPage";
import CurationHistoryPage from "@/components/dashboard-seller/CurationHistoryPage";
import PricingAndAnalyticsPage from "@/components/dashboard-seller/PricingAndAnalyticsPage";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  const [activePage, setActivePage] = useState<string>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const pageTitles: Record<
    string,
    { title: string; subtitle: string }
  > = {
    dashboard: {
      title: "Dashboard Seller",
      subtitle:
        "Ringkasan performa penjualan, kurasi, dan distribusi berbasis lokasi.",
    },
    products: {
      title: "Produk Saya",
      subtitle: "Kelola produk thrift yang Anda jual",
    },
    orders: {
      title: "Pesanan Masuk",
      subtitle: "Lihat dan kelola pesanan dari pembeli",
    },
    curation: {
      title: "Kurasi Produk",
      subtitle: "Proses seleksi step-by-step sesuai standar grading & traceability.",
    },
    "curation-history": {
      title: "Histori Kurasi",
      subtitle:
        "Rekam jejak keputusan kurasi untuk tingkatkan trust dan transparansi.",
    },
    "pricing-analytics": {
      title: "Harga & Analitik",
      subtitle:
        "Guideline harga thrift & insight dampak ekonomi bagi seller UMKM.",
    },
    profile: {
      title: "Profil Seller",
      subtitle: "Kelola informasi toko dan alamat pengiriman",
    },
    settings: {
      title: "Pengaturan Akun",
      subtitle: "Kelola preferensi notifikasi dan keamanan akun seller",
    },
  };

  const currentPageInfo = pageTitles[activePage] || pageTitles.dashboard;

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardHome />;
      case "products":
        return <SellerProductsPage />;
      case "orders":
        return <OrdersPage />;
      case "curation":
        return <CurationPage />;
      case "curation-history":
        return <CurationHistoryPage />;
      case "pricing-analytics":
        return <PricingAndAnalyticsPage />;
      case "profile":
        return <ProfilePage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />

        <div
          className={`transition-all duration-300 ${
            sidebarCollapsed ? "ml-[70px]" : "ml-64"
          }`}
        >
          <Header
            title={currentPageInfo.title}
            subtitle={currentPageInfo.subtitle}
          />

          <main className="p-6">{renderPage()}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
