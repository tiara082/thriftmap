"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockOrders, calculateSellerStats, Product } from "@/lib/seller-state";
import { getProducts, initializeStorage } from "@/lib/storage";

export default function PricingAndAnalyticsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeStorage();
    const storedProducts = getProducts();
    setProducts(storedProducts);
    setIsLoading(false);
  }, []);

  const gradeDistribution = {
    "A": products.filter((p: any) => p.grade === "A").length,
    "B": products.filter((p: any) => p.grade === "B").length,
    "C": products.filter((p: any) => p.grade === "C").length,
    "D": products.filter((p: any) => p.grade === "D").length,
  };

  const ordersByStatus = {
    "completed": mockOrders.filter(o => o.status === "completed").length,
    "shipped": mockOrders.filter(o => o.status === "shipped").length,
    "processing": mockOrders.filter(o => o.status === "processing").length,
    "delivered": mockOrders.filter(o => o.status === "delivered").length,
  };

  const stats = calculateSellerStats(products, mockOrders);
  
  const gradeStandards = [
    {
      grade: "A",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 border-green-200",
      textColor: "text-green-700",
      icon: "fa-star",
      description: "Excellent Condition",
      criteria: [
        "Minimal wear & tear",
        "Original/Authentic brand",
        "Semua fungsi optimal",
        "Tidak ada cacat/noda",
        "Jahitan sempurna",
      ],
      priceRange: "65-85% dari harga retail",
      marketValue: "Tinggi - Penjualan cepat",
    },
    {
      grade: "B",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 border-blue-200",
      textColor: "text-blue-700",
      icon: "fa-check",
      description: "Good Condition",
      criteria: [
        "Slight wear (penggunaan normal)",
        "Fungsi 100% optimal",
        "Kecil cacat/noda",
        "Jahitan rapi",
        "Material tahan lama",
      ],
      priceRange: "50-65% dari harga retail",
      marketValue: "Sedang - Stabil",
    },
    {
      grade: "C",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50 border-yellow-200",
      textColor: "text-yellow-700",
      icon: "fa-check-double",
      description: "Fair Condition",
      criteria: [
        "Moderate wear terlihat",
        "Ada defect minor",
        "Fungsi tetap baik",
        "Jahitan masih kuat",
        "Layak dipakai",
      ],
      priceRange: "30-50% dari harga retail",
      marketValue: "Rendah-Sedang - Perlu pricing tepat",
    },
    {
      grade: "D",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 border-orange-200",
      textColor: "text-orange-700",
      icon: "fa-minus",
      description: "Poor Condition",
      criteria: [
        "Heavy wear visible",
        "Ada defect signifikan",
        "Fungsi terbatas",
        "Jahitan perlu perbaikan",
        "Untuk collector aware",
      ],
      priceRange: "10-30% dari harga retail",
      marketValue: "Sangat Rendah - Niche market",
    },
  ];

  const analyticsMetrics = [
    {
      title: "Conversion Rate",
      icon: "fa-chart-line",
      value: `${Math.round((stats.completedOrders / stats.totalProductsUploaded) * 100)}%`,
      subtitle: "Upload → Approved → Sold",
      details: [
        `${stats.totalProductsUploaded} produk diunggah`,
        `${stats.approvedProducts} produk disetujui (${stats.approvalRate}%)`,
        `${stats.completedOrders} pesanan selesai`,
      ],
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Average Selling Price",
      icon: "fa-money-bill",
      value: `Rp ${stats.totalRevenue > 0 ? Math.round(stats.totalRevenue / stats.completedOrders / 1000) * 1000 : 0}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."),
      subtitle: "Per transaksi terjual",
      details: [
        `Total revenue: Rp ${(stats.totalRevenue / 1000000).toFixed(1)}jt`,
        `Dari ${stats.completedOrders} pesanan`,
        `Rata-rata value per order`,
      ],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Product Performance",
      icon: "fa-box",
      value: `${stats.approvedProducts}/${stats.totalProductsUploaded}`,
      subtitle: "Approval Rate Success",
      details: [
        `${stats.approvedProducts} produk aktif dijual`,
        `${stats.pendingCuration} menunggu kurasi`,
        `${stats.rejectedProducts} ditolak (perlu revisi)`,
      ],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Grade Distribution",
      icon: "fa-certificate",
      value: `${gradeDistribution.A}A + ${gradeDistribution.B}B`,
      subtitle: "Premium products (A+B)",
      details: [
        `Grade A: ${gradeDistribution.A} produk (best sellers)`,
        `Grade B: ${gradeDistribution.B} produk (steady sales)`,
        `Grade C: ${gradeDistribution.C} + Grade D: ${gradeDistribution.D}`,
      ],
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics Dashboard */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {analyticsMetrics.map((metric, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
            ></div>

            <Card className="relative border-0 bg-white shadow-md hover:shadow-xl transition-shadow h-full">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-lg ${metric.bgColor} transform group-hover:scale-110 transition-transform duration-300`}
                  >
                    <i
                      className={`fas ${metric.icon} text-lg bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}
                    ></i>
                  </div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Analytics
                  </span>
                </div>

                <h3 className="font-semibold text-gray-600 text-sm mb-2">
                  {metric.title}
                </h3>
                <p className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                  {metric.value}
                </p>
                <p className="text-xs text-gray-500 font-medium mb-3">
                  {metric.subtitle}
                </p>

                <div className="space-y-1 text-xs text-gray-600 pt-3 border-t border-gray-100">
                  {metric.details.map((detail, i) => (
                    <p key={i} className="flex items-start gap-2">
                      <i className="fas fa-arrow-right text-gray-400 mt-0.5 text-xs"></i>
                      <span>{detail}</span>
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Grading Standards */}
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            <i className="fas fa-certificate text-yellow-500 mr-3"></i>Standar Grading Thrift
          </h2>
          <p className="text-gray-600 text-sm">
            Panduan lengkap untuk memahami kriteria grading dan penetapan harga yang kompetitif
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {gradeStandards.map((grade) => (
            <Card
              key={grade.grade}
              className="border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <CardHeader
                className={`bg-gradient-to-r ${grade.color} text-white relative overflow-hidden`}
              >
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                </div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl font-bold">
                      Grade {grade.grade}
                    </CardTitle>
                    <p className="text-white/90 text-sm mt-1">
                      {grade.description}
                    </p>
                  </div>
                  <div className="text-5xl opacity-20">
                    <i className={`fas ${grade.icon}`}></i>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6 space-y-4">
                {/* Criteria */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <i className={`fas fa-list text-lg bg-gradient-to-r ${grade.color} bg-clip-text text-transparent`}></i>
                    Kriteria Kondisi
                  </h4>
                  <ul className="space-y-2">
                    {grade.criteria.map((criterion, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-gray-700 group/item"
                      >
                        <span className={`text-xs font-bold bg-gradient-to-r ${grade.color} bg-clip-text text-transparent mt-1`}>
                          ✓
                        </span>
                        <span>{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price Range */}
                <div className={`p-3 rounded-lg border ${grade.bgColor}`}>
                  <p className={`text-xs font-bold ${grade.textColor} uppercase tracking-wider mb-1`}>
                    <i className="fas fa-tag mr-1"></i>Range Harga
                  </p>
                  <p className={`text-sm font-bold ${grade.textColor}`}>
                    {grade.priceRange}
                  </p>
                </div>

                {/* Market Value */}
                <div className={`p-3 rounded-lg border ${grade.bgColor}`}>
                  <p className={`text-xs font-bold ${grade.textColor} uppercase tracking-wider mb-1`}>
                    <i className="fas fa-chart-line mr-1"></i>Nilai Pasar
                  </p>
                  <p className={`text-sm font-bold ${grade.textColor}`}>
                    {grade.marketValue}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Advanced Analytics Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Order Status Distribution */}
        <Card className="border-0 shadow-md">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl">
            <CardTitle className="flex items-center gap-2 text-lg">
              <i className="fas fa-boxes text-indigo-600"></i>
              Distribusi Status Pesanan
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-3">
            {[
              { label: "Selesai", value: ordersByStatus.completed, color: "from-green-400 to-emerald-500", icon: "fa-check-circle" },
              { label: "Terkirim", value: ordersByStatus.shipped, color: "from-blue-400 to-cyan-500", icon: "fa-truck" },
              { label: "Processing", value: ordersByStatus.processing, color: "from-yellow-400 to-orange-500", icon: "fa-box" },
              { label: "Delivered", value: ordersByStatus.delivered, color: "from-purple-400 to-pink-500", icon: "fa-check" },
            ].map((status, idx) => {
              const total = Object.values(ordersByStatus).reduce((a, b) => a + b, 0);
              const percentage = total > 0 ? (status.value / total) * 100 : 0;
              return (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <i className={`fas ${status.icon} text-lg bg-gradient-to-r ${status.color} bg-clip-text text-transparent`}></i>
                      {status.label}
                    </p>
                    <span className="font-bold text-gray-900">{status.value} ({Math.round(percentage)}%)</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${status.color} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Business Insights */}
        <Card className="border-0 shadow-md">
          <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-t-xl">
            <CardTitle className="flex items-center gap-2 text-lg">
              <i className="fas fa-lightbulb text-pink-600"></i>
              Insights & Rekomendasi
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-3">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
                💡 Opportunity
              </p>
              <p className="text-sm text-blue-900">
                {stats.pendingCuration > 0
                  ? `Anda memiliki ${stats.pendingCuration} produk menunggu kurasi. Percepat dokumentasi untuk meningkatkan conversion rate.`
                  : "Semua produk sudah dikurasi! Terus upload produk baru."}
              </p>
            </div>

            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">
                ✓ Strength
              </p>
              <p className="text-sm text-green-900">
                Approval rate Anda {stats.approvalRate}% adalah {
                  stats.approvalRate >= 80 ? "EXCELLENT - Anda trusted seller!" :
                  stats.approvalRate >= 60 ? "GOOD - Terus tingkatkan kualitas!" :
                  "FAIR - Fokus pada dokumentasi produk."
                }
              </p>
            </div>

            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-xs font-bold text-orange-700 uppercase tracking-wider mb-1">
                📈 Growth
              </p>
              <p className="text-sm text-orange-900">
                Fokus upload produk Grade A & B untuk maksimalkan penjualan. {gradeDistribution.A + gradeDistribution.B} premium items Anda sudah bagus!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
