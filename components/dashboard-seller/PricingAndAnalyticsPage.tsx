"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PricingAndAnalyticsPage() {
  const grading = [
    {
      grade: "A",
      label: "Seperti Baru",
      priceRange: "60–80% dari harga retail baru",
      share: "20–35% komposisi stok per ball",
      notes:
        "Tidak ada cacat visual, warna terjaga, jahitan utuh, dipakai 0–2 kali.",
    },
    {
      grade: "B",
      label: "Sangat Baik",
      priceRange: "40–60% dari harga retail baru",
      share: "30–45% komposisi stok per ball",
      notes:
        "Tanda pemakaian ringan, defect minor, fungsi tetap normal, warna masih baik.",
    },
    {
      grade: "C",
      label: "Layak Pakai",
      priceRange: "20–40% dari harga retail baru",
      share: "20–35% komposisi stok per ball",
      notes:
        "Tanda pemakaian jelas, butuh repair ringan, usia >2 tahun, masih layak jual.",
    },
    {
      grade: "D",
      label: "Cukup",
      priceRange: "≤20% dari harga retail baru",
      share: "<10% komposisi stok per ball",
      notes:
        "Cacat signifikan, noda permanen, atau butuh perbaikan besar; cocok bundling/spare.",
    },
  ];

  const analytics = [
    {
      label: "Rasio Deadstock",
      value: "8–12%",
      description:
        "Target penurunan dari baseline 27–30% melalui distribusi berbasis lokasi & kurasi.",
      badge: "Turun dari 27–30%",
    },
    {
      label: "Peningkatan Pendapatan UMKM",
      value: "+23%/tahun",
      description:
        "Proyeksi pertumbuhan rata-rata seller aktif yang memanfaatkan distribusi spasial & pricing standar.",
      badge: "Proyeksi Growth",
    },
    {
      label: "Penghematan Ongkos Kirim",
      value: "20–30%",
      description:
        "Mayoritas transaksi terjadi dalam radius lokal 1–25 km melalui map view & rekomendasi stok terdekat.",
      badge: "Efisiensi Logistik",
    },
    {
      label: "Konversi Listing Terkurasi",
      value: "≥80%",
      description:
        "Listing yang lolos kurasi penuh (grade, traceability, harga wajar) memiliki rasio transaksi jauh lebih tinggi.",
      badge: "Target Konversi",
    },
  ];

  const gradeColors = {
    A: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
    B: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
    C: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
    D: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
  };

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="text-2xl">
            Standar Grading & Harga ThriftMap
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Standar ini dirancang berdasarkan praktik UMKM nasional, riset peer
            reviewed, dan regulasi marketplace elektronik di Indonesia untuk menjaga
            keadilan dan kepercayaan.
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {grading.map((item) => {
          const colors = gradeColors[item.grade as keyof typeof gradeColors];
          return (
            <Card
              key={item.grade}
              className={`hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-2 ${colors.border}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center`}
                  >
                    <span className={`text-xl font-bold ${colors.text}`}>
                      {item.grade}
                    </span>
                  </div>
                  <Badge variant="outline" className={colors.bg}>
                    {item.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className={`p-2 rounded-lg ${colors.bg}`}>
                  <p className="text-xs font-semibold text-gray-700">
                    💰 {item.priceRange}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  📊 {item.share}
                </p>
                <p className="text-xs text-gray-600 leading-relaxed pt-2 border-t">
                  {item.notes}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <i className="fas fa-chart-line text-white"></i>
            </div>
            <div>
              <CardTitle>Dashboard Analitik Seller</CardTitle>
              <p className="text-sm text-muted-foreground">
                Dampak SIG, kurasi, dan standar harga pada performa seller
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {analytics.map((item, index) => {
              const icons = [
                "fa-box-open",
                "fa-arrow-trend-up",
                "fa-truck-fast",
                "fa-check-double",
              ];
              const gradients = [
                "from-red-500 to-orange-500",
                "from-green-500 to-emerald-500",
                "from-blue-500 to-cyan-500",
                "from-purple-500 to-pink-500",
              ];
              return (
                <Card
                  key={item.label}
                  className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-2 hover:border-green-200"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradients[index]} flex items-center justify-center`}
                      >
                        <i className={`fas ${icons[index]} text-white text-sm`}></i>
                      </div>
                      <Badge variant="outline" className="text-[10px]">
                        {item.badge}
                      </Badge>
                    </div>
                    <h3 className="text-xs font-medium text-muted-foreground mb-1">
                      {item.label}
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 mb-2">
                      {item.value}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
