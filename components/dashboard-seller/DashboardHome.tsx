"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DashboardHome() {
  const stats = [
    {
      icon: "fa-shopping-bag",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      label: "Total Pesanan Terjual",
      value: "128",
    },
    {
      icon: "fa-boxes-stacked",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      label: "Produk Aktif",
      value: "42",
    },
    {
      icon: "fa-percent",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      label: "Rasio Konversi Kurasi",
      value: "82%",
    },
    {
      icon: "fa-wallet",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      label: "Pendapatan Bulan Ini",
      value: "Rp 4.250.000",
    },
  ];

  const recentOrders = [
    {
      name: "Jaket Denim Vintage",
      orderId: "#ORD-001234",
      price: "Rp 85.000",
      status: "Selesai",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      name: "Dress Floral",
      orderId: "#ORD-001235",
      price: "Rp 65.000",
      status: "Proses",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
  ];

  const recommendations = [
    {
      name: "Sweater Hoodie",
      price: "Rp 75.000",
      image: "/assets/images/products/jacket-3.jpg",
    },
    {
      name: "Kemeja Katun",
      price: "Rp 55.000",
      image: "/assets/images/products/shirt-1.jpg",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer border-l-4 border-l-green-500"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                <i className={`fas ${stat.icon} ${stat.iconColor}`}></i>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                +{12 + index}% dari bulan lalu
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Orders */}
        <Card className="col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pesanan Terbaru</CardTitle>
              <a
                href="#"
                className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
              >
                Lihat Semua →
              </a>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-green-200 hover:bg-green-50/30 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <i className="fas fa-shopping-bag text-green-600 text-sm"></i>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{order.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.orderId}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{order.price}</p>
                    <Badge
                      variant={
                        order.status === "Selesai" ? "success" : "warning"
                      }
                      className="mt-1"
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats & Analytics */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Performa Penjualan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tingkat Approval</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full w-[92%]"></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Rating Seller</span>
                <span className="font-medium flex items-center gap-1">
                  <i className="fas fa-star text-yellow-500 text-xs"></i>
                  4.8/5.0
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full w-[96%]"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Response Rate</span>
                <span className="font-medium">88%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full w-[88%]"></div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">127</p>
                  <p className="text-xs text-muted-foreground">Review Positif</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">3.2k</p>
                  <p className="text-xs text-muted-foreground">Total Views</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
