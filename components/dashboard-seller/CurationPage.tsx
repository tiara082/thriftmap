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
    },
    {
      title: "Grading & Kondisi",
      description:
        "Kurator memilih grade A–D berdasarkan panduan standar kualitas nasional.",
      detail:
        "Tiap grade dilengkapi contoh visual dan rentang usia pakai, sesuai guideline riset UMKM thrift.",
      icon: "fa-certificate",
    },
    {
      title: "Traceability & Hygiene",
      description:
        "Seller mengisi histori pemakaian, tahun beli, jumlah pemakaian, dan status kebersihan.",
      detail:
        "Data traceability dicatat untuk meningkatkan trust dan edukasi gaya hidup berkelanjutan.",
      icon: "fa-route",
    },
    {
      title: "Review Harga & Approval",
      description:
        "Sistem memberi suggested price berdasarkan grade, benchmarking pasar, dan regulasi yang berlaku.",
      detail:
        "Admin dapat menyetujui, mengoreksi, atau mengirim feedback ke seller sebelum listing tayang.",
      icon: "fa-check-circle",
    },
  ];

  const stepColors = [
    { gradient: "from-blue-500 to-cyan-500", bg: "bg-blue-50", badge: "bg-blue-100 text-blue-700" },
    { gradient: "from-green-500 to-emerald-500", bg: "bg-green-50", badge: "bg-green-100 text-green-700" },
    { gradient: "from-purple-500 to-pink-500", bg: "bg-purple-50", badge: "bg-purple-100 text-purple-700" },
    { gradient: "from-orange-500 to-red-500", bg: "bg-orange-50", badge: "bg-orange-100 text-orange-700" },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <i className="fas fa-tasks text-white text-xl"></i>
            </div>
            <div>
              <CardTitle className="text-2xl">Proses Kurasi Produk</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
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
                className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-2 hover:border-green-200 relative"
              >
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    {/* Step Number Circle */}
                    <div className="flex-shrink-0 relative">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg`}>
                        <i className={`fas ${step.icon} text-white text-xl`}></i>
                      </div>
                      <Badge className={`absolute -bottom-2 -right-2 ${colors.badge} border-2 border-white`}>
                        {index + 1}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            Langkah {index + 1}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {step.title}
                        </h3>
                      </div>

                      <div className={`p-3 rounded-lg ${colors.bg} border-l-4 border-l-green-500`}>
                        <p className="text-sm text-gray-700 font-medium">
                          {step.description}
                        </p>
                      </div>

                      <div className="flex items-start gap-2">
                        <i className="fas fa-info-circle text-green-500 mt-0.5"></i>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {step.detail}
                        </p>
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
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-3">
            <i className="fas fa-check-circle text-green-600 text-2xl"></i>
            <h4 className="font-semibold text-gray-900">Hasil Kurasi</h4>
          </div>
          <p className="text-sm text-gray-700">
            Setelah melewati 4 langkah kurasi, produk akan otomatis tayang di ThriftMap dengan status <Badge variant="success">Terverifikasi</Badge> dan mendapat prioritas rekomendasi berbasis lokasi (SIG).
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
