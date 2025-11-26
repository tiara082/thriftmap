"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockOrders, mockCurationHistory, calculateSellerStats, Product } from "@/lib/seller-state";
import { getProducts, initializeStorage } from "@/lib/storage";

export default function DashboardHome() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeStorage();
    const storedProducts = getProducts();
    setProducts(storedProducts);
    setIsLoading(false);
  }, []);

  const stats = calculateSellerStats(products, mockOrders);

  const dashboardStats = [
    {
      icon: "fa-boxes",
      gradient: "from-blue-400 to-blue-600",
      iconBg: "bg-gradient-to-br from-blue-100 to-blue-200",
      iconColor: "text-blue-600",
      label: "Barang Diunggah",
      value: stats.totalProductsUploaded.toString(),
      change: "Total produk kamu",
    },
    {
      icon: "fa-hourglass-half",
      gradient: "from-yellow-400 to-orange-600",
      iconBg: "bg-gradient-to-br from-yellow-100 to-orange-200",
      iconColor: "text-orange-600",
      label: "Lagi Diverifikasi",
      value: stats.pendingCuration.toString(),
      change: "Tunggu hasil kurasi",
    },
    {
      icon: "fa-check-circle",
      gradient: "from-green-400 to-green-600",
      iconBg: "bg-gradient-to-br from-green-100 to-green-200",
      iconColor: "text-green-600",
      label: "Udah Approved",
      value: stats.approvedProducts.toString(),
      change: `${stats.approvalRate}% lolos kurasi`,
    },
    {
      icon: "fa-wallet",
      gradient: "from-purple-400 to-pink-600",
      iconBg: "bg-gradient-to-br from-purple-100 to-pink-200",
      iconColor: "text-pink-600",
      label: "Hasil Penjualan",
      value: `Rp ${(stats.totalRevenue / 1000000).toFixed(1)}jt`,
      change: `${stats.completedOrders} transaksi berhasil`,
    },
  ];

  const recentOrders = mockOrders.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
            ></div>

            <Card className="relative border-0 bg-white shadow-md hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-gray-600">
                  {stat.label}
                </CardTitle>
                <div className={`p-3 rounded-lg ${stat.iconBg} transform group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`fas ${stat.icon} ${stat.iconColor} text-lg`}></i>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <p className="text-xs text-green-600 font-semibold mt-2">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Product Flow Pipeline & Recent Orders */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Product Pipeline Status */}
        <Card className="col-span-3 border-0 shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <i className="fas fa-sitemap text-blue-600"></i>
              </div>
              <CardTitle className="text-lg">Pipeline Produk</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {/* Upload Stage */}
            <div className="group relative p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:shadow-lg hover:border-blue-300 transition-all border border-blue-200 cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 bg-blue-200 rounded-lg mt-1">
                    <i className="fas fa-cloud-arrow-up text-blue-600"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Upload Produk</p>
                    <p className="text-xs text-gray-600 mt-1">Produk baru siap untuk kurasi</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-blue-600">{stats.totalProductsUploaded}</span>
              </div>
            </div>

            {/* Curation Stage */}
            <div className="group relative p-4 bg-gradient-to-r from-yellow-50 to-orange-100 rounded-xl hover:shadow-lg hover:border-orange-300 transition-all border border-orange-200 cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 bg-orange-200 rounded-lg mt-1">
                    <i className="fas fa-magnifying-glass text-orange-600"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Menunggu Kurasi</p>
                    <p className="text-xs text-gray-600 mt-1">Proses review grading & harga</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-orange-600">{stats.pendingCuration}</span>
              </div>
            </div>

            {/* Approved Stage */}
            <div className="group relative p-4 bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl hover:shadow-lg hover:border-green-300 transition-all border border-green-200 cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 bg-green-200 rounded-lg mt-1">
                    <i className="fas fa-check-circle text-green-600"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Disetujui & Dijual</p>
                    <p className="text-xs text-gray-600 mt-1">Produk aktif di marketplace</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-green-600">{stats.approvedProducts}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders & Performance */}
        <Card className="col-span-4 border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <i className="fas fa-receipt text-green-600"></i>
                </div>
                <div>
                  <CardTitle className="text-lg">Pesanan Terbaru</CardTitle>
                  <p className="text-xs text-gray-500 font-normal mt-1">Status real-time pengiriman</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {recentOrders.map((order, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-green-300 hover:bg-green-50/50 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <i className="fas fa-shopping-bag text-green-600 text-base"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{order.productName}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {order.buyerName} • {order.buyerLocation}
                      </p>
                    </div>
                  </div>
                  <div className="text-right space-y-1 ml-4">
                    <p className="font-bold text-gray-900 text-sm">Rp {order.price.toLocaleString("id-ID")}</p>
                    <Badge
                      variant={
                        order.status === "completed"
                          ? "success"
                          : order.status === "shipped"
                          ? "warning"
                          : "default"
                      }
                      className="text-xs"
                    >
                      {order.status === "completed"
                        ? "Selesai"
                        : order.status === "shipped"
                        ? "Terkirim"
                        : "Proses"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance & Analytics */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <i className="fas fa-chart-line text-purple-600"></i>
            </div>
            <div>
              <CardTitle className="text-lg">Performa Seller</CardTitle>
              <p className="text-xs text-gray-500 font-normal mt-1">Metrik penjualan & kepuasan pembeli</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-4">
            {/* Approval Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <i className="fas fa-check-double text-green-500"></i>
                  <span className="text-sm font-semibold text-gray-700">Approval Rate</span>
                </div>
              </div>
              <div className="h-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full w-[83%] transition-all duration-500"></div>
              </div>
              <p className="text-xs font-bold text-green-600">{stats.approvalRate}% produk disetujui</p>
            </div>

            {/* Response Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <i className="fas fa-comment-dots text-blue-500"></i>
                  <span className="text-sm font-semibold text-gray-700">Response Rate</span>
                </div>
              </div>
              <div className="h-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full w-[92%] transition-all duration-500"></div>
              </div>
              <p className="text-xs font-bold text-blue-600">{stats.responseRate}% respons cepat</p>
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <i className="fas fa-star text-yellow-500"></i>
                  <span className="text-sm font-semibold text-gray-700">Rating Seller</span>
                </div>
              </div>
              <div className="h-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full w-[96%] transition-all duration-500"></div>
              </div>
              <p className="text-xs font-bold text-yellow-600">{stats.averageRating}/5.0 stars</p>
            </div>

            {/* Order Completion */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <i className="fas fa-box-open text-indigo-500"></i>
                  <span className="text-sm font-semibold text-gray-700">Order Completion</span>
                </div>
              </div>
              <div className="h-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${stats.totalOrders > 0 ? (stats.completedOrders / stats.totalOrders) * 100 : 0}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs font-bold text-indigo-600">
                {stats.completedOrders} dari {stats.totalOrders} pesanan selesai
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
