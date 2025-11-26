"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CurationPage() {
  const steps = [
    {
      title: "Upload & Identifikasi Barang",
      description:
        "Seller mengunggah foto produk, memilih kategori, dan mengisi data dasar (brand, ukuran, kategori, lokasi).",
      detail:
        "Sistem akan membaca metadata lokasi, memeriksa kelengkapan foto (minimal 3 sudut), dan mendeteksi potensi duplikasi listing.",
      icon: "fa-upload",
      example: {
        title: "Contoh: Jaket Denim Vintage",
        details: [
          "Brand: Levi's 501",
          "Ukuran: M/L",
          "Kategori: Jaket",
          "Lokasi: Bandung, West Java",
          "Foto: 4 sudut + detail jahitan"
        ]
      }
    },
    {
      title: "Grading & Kondisi",
      description:
        "Kurator memilih grade A–D berdasarkan panduan standar kualitas nasional.",
      detail:
        "Tiap grade dilengkapi contoh visual dan rentang usia pakai, sesuai guideline riset UMKM thrift.",
      icon: "fa-certificate",
      example: {
        title: "Contoh: Grade A (Excellent)",
        details: [
          "Kondisi: Sangat baik, minimal pemakaian",
          "Cacat: Tidak ada atau sangat minimal",
          "Usia pakai: <6 bulan",
          "Harga: Rp 300.000 - Rp 450.000",
          "✓ Lolos kurasi A"
        ]
      }
    },
    {
      title: "Traceability & Hygiene",
      description:
        "Seller mengisi histori pemakaian, tahun beli, jumlah pemakaian, dan status kebersihan.",
      detail:
        "Data traceability dicatat untuk meningkatkan trust dan edukasi gaya hidup berkelanjutan.",
      icon: "fa-route",
      example: {
        title: "Contoh: Traceability Data",
        details: [
          "Tahun beli: 2023",
          "Jumlah pemakaian: 5-10 kali",
          "Status: Baru dicuci",
          "Penyimpanan: Di lemari ber-AC",
          "✓ Hygiene certified"
        ]
      }
    },
    {
      title: "Review Harga & Approval",
      description:
        "Sistem memberi suggested price berdasarkan grade, benchmarking pasar, dan regulasi yang berlaku.",
      detail:
        "Admin dapat menyetujui, mengoreksi, atau mengirim feedback ke seller sebelum listing tayang.",
      icon: "fa-check-circle",
      example: {
        title: "Contoh: Approval Decision",
        details: [
          "Suggested price: Rp 350.000",
          "Market benchmark: Rp 280.000 - Rp 420.000",
          "Status: ✓ Approved",
          "Listing tayang: Seketika",
          "Priority: Featured listing SIG"
        ]
      }
    },
  ];

  const stepColors = [
    { gradient: "from-blue-500 to-cyan-500", bg: "bg-blue-50", badge: "bg-blue-100 text-blue-700", exBg: "bg-blue-100/50" },
    { gradient: "from-green-500 to-emerald-500", bg: "bg-green-50", badge: "bg-green-100 text-green-700", exBg: "bg-green-100/50" },
    { gradient: "from-purple-500 to-pink-500", bg: "bg-purple-50", badge: "bg-purple-100 text-purple-700", exBg: "bg-purple-100/50" },
    { gradient: "from-orange-500 to-red-500", bg: "bg-orange-50", badge: "bg-orange-100 text-orange-700", exBg: "bg-orange-100/50" },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-green-500 border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md">
              <i className="fas fa-tasks text-white text-2xl"></i>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Proses Kurasi Produk</CardTitle>
              <p className="text-sm text-gray-600 mt-1 font-medium">
                Kurasi step-by-step memastikan standar kualitas, traceability, dan harga yang adil
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Visual Timeline */}
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-200 via-green-400 to-green-600 hidden md:block"></div>
        
        <div className="space-y-6">
          {steps.map((step, index) => {
            const colors = stepColors[index];
            return (
              <Card
                key={index}
                className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-2 hover:border-green-200 relative overflow-hidden border-0 shadow-md"
              >
                <CardContent className="pt-6">
                  <div className="flex gap-4 flex-col md:flex-row">
                    {/* Step Number Circle */}
                    <div className="flex-shrink-0 relative">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg`}>
                        <i className={`fas ${step.icon} text-white text-xl`}></i>
                      </div>
                      <Badge className={`absolute -bottom-2 -right-2 ${colors.badge} border-2 border-white font-semibold`}>
                        {index + 1}
                      </Badge>
                    </div>

                    {/* Content & Example */}
                    <div className="flex-1 space-y-4">
                      {/* Step Description */}
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs font-semibold">
                              Langkah {index + 1}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {step.title}
                          </h3>
                        </div>

                        <div className={`p-4 rounded-xl ${colors.bg} border-l-4 border-l-green-500`}>
                          <p className="text-sm text-gray-800 font-medium">
                            {step.description}
                          </p>
                        </div>

                        <div className="flex items-start gap-2">
                          <i className="fas fa-info-circle text-green-500 mt-0.5 flex-shrink-0"></i>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {step.detail}
                          </p>
                        </div>
                      </div>

                      {/* Real Example */}
                      <div className={`p-4 rounded-xl ${colors.exBg} border-l-4 border-l-green-500 space-y-3`}>
                        <div className="flex items-center gap-2">
                          <i className="fas fa-lightbulb text-amber-600"></i>
                          <h4 className="font-bold text-gray-900 text-sm">
                            {step.example.title}
                          </h4>
                        </div>
                        <ul className="space-y-1">
                          {step.example.details.map((detail, idx) => (
                            <li key={idx} className="text-xs text-gray-700 flex items-center gap-2">
                              <span className="text-green-600 font-bold">•</span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 border-0 shadow-lg">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-4">
            <i className="fas fa-check-circle text-green-600 text-2xl"></i>
            <h4 className="font-bold text-gray-900 text-lg">Hasil Kurasi</h4>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            Setelah melewati 4 langkah kurasi, produk akan otomatis tayang di ThriftMap dengan status <Badge className="bg-green-600 text-white font-semibold">Terverifikasi</Badge> dan mendapat prioritas rekomendasi berbasis lokasi (SIG).
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
