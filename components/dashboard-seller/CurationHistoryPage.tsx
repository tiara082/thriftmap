"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CurationHistoryPage() {
  const histories = [
    {
      id: "CUR-2025-001",
      product: "Jaket Denim Vintage Levi's",
      seller: "UMKM Denim Lokal - Jakarta",
      grade: "A",
      status: "Disetujui",
      decisionBy: "Admin ThriftMap",
      date: "21 Nov 2025, 14:32 WIB",
      notes:
        "Foto lengkap, traceability jelas (2x siklus pakai), harga sesuai rentang 60–75% retail.",
    },
    {
      id: "CUR-2025-002",
      product: "Dress Floral Summer",
      seller: "Reseller Rumahan - Bandung",
      grade: "B",
      status: "Revisi Harga",
      decisionBy: "Sistem Otomatis",
      date: "21 Nov 2025, 15:05 WIB",
      notes:
        "Harga awal >80% retail, sistem memberi suggested price dan mengirim alert ke seller.",
    },
    {
      id: "CUR-2025-003",
      product: "Celana Cargo Vintage",
      seller: "Komunitas Thrift Desa - Sleman",
      grade: "C",
      status: "Disetujui",
      decisionBy: "Admin ThriftMap",
      date: "22 Nov 2025, 09:10 WIB",
      notes:
        "Kondisi layak pakai, sudah ada keterangan defect ringan dan status hygiene.",
    },
  ];

  const [statusFilter, setStatusFilter] = useState<string>("semua");
  const [gradeFilter, setGradeFilter] = useState<string>("semua");
  const [dateFilter, setDateFilter] = useState<string>("");

  const filteredHistories = useMemo(() => {
    return histories.filter((item) => {
      const matchStatus =
        statusFilter === "semua" || item.status === statusFilter;
      const matchGrade = gradeFilter === "semua" || item.grade === gradeFilter;
      const matchDate =
        !dateFilter || item.date.startsWith(dateFilter.replace(/-/g, " "));
      return matchStatus && matchGrade && matchDate;
    });
  }, [histories, statusFilter, gradeFilter, dateFilter]);

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="text-2xl">Riwayat Kurasi Produk</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Histori kurasi membantu meningkatkan trust pembeli dan menjadi
            transparansi bagi seller terkait proses approval di ThriftMap.
          </p>
        </CardHeader>
      </Card>

      {/* Filter Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="flex-1">
              <label className="text-xs font-medium text-gray-700 mb-1.5 block">
                <i className="fas fa-calendar mr-1"></i> Tanggal
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="text-xs font-medium text-gray-700 mb-1.5 block">
                <i className="fas fa-check-circle mr-1"></i> Status
              </label>
              <select
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="semua">Semua Status</option>
                <option value="Disetujui">Disetujui</option>
                <option value="Revisi Harga">Revisi Harga</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs font-medium text-gray-700 mb-1.5 block">
                <i className="fas fa-certificate mr-1"></i> Grade
              </label>
              <select
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
              >
                <option value="semua">Semua Grade</option>
                <option value="A">Grade A</option>
                <option value="B">Grade B</option>
                <option value="C">Grade C</option>
                <option value="D">Grade D</option>
              </select>
            </div>
            <button
              onClick={() => {
                setDateFilter("");
                setStatusFilter("semua");
                setGradeFilter("semua");
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <i className="fas fa-redo mr-2"></i>Reset
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <i className="fas fa-info-circle"></i>
            <span>
              Menampilkan <strong>{filteredHistories.length}</strong> dari{" "}
              <strong>{histories.length}</strong> kurasi
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50/80 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ID Kurasi
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Produk
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Seller
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tanggal & Waktu
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Catatan Kurasi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredHistories.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-green-50/40 transition-colors duration-200 group"
                >
                  <td className="px-4 py-4">
                    <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded group-hover:bg-green-100 transition-colors">
                      {item.id}
                    </code>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-medium text-gray-900">{item.product}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-gray-600 text-sm">{item.seller}</p>
                  </td>
                  <td className="px-4 py-4">
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200"
                    >
                      Grade {item.grade}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <Badge
                      variant={
                        item.status === "Disetujui" ? "success" : "warning"
                      }
                    >
                      {item.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-xs text-gray-600 whitespace-nowrap">
                      <i className="far fa-clock mr-1"></i>
                      {item.date}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-xs text-gray-600 max-w-xs line-clamp-2">
                      {item.notes}
                    </p>
                  </td>
                </tr>
              ))}
              {filteredHistories.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <i className="fas fa-inbox text-3xl"></i>
                      <p className="text-sm font-medium">
                        Tidak ada data kurasi ditemukan
                      </p>
                      <p className="text-xs">
                        Coba ubah filter atau reset pencarian
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
