"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockCurationHistory } from "@/lib/seller-state";

const gradeConfig: Record<
  string,
  { color: string; label: string; description: string }
> = {
  "A": {
    color: "bg-green-100 text-green-800 border-green-200",
    label: "Grade A - Excellent",
    description: "Kondisi sempurna, minimal wear, authentic",
  },
  "B": {
    color: "bg-blue-100 text-blue-800 border-blue-200",
    label: "Grade B - Good",
    description: "Kondisi bagus, slight wear, fungsi optimal",
  },
  "C": {
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    label: "Grade C - Fair",
    description: "Layak pakai, moderate wear, defects minor",
  },
  "D": {
    color: "bg-orange-100 text-orange-800 border-orange-200",
    label: "Grade D - Poor",
    description: "Hanya untuk yang sadar kondisi, significant wear",
  },
};

export default function CurationHistoryPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [gradeFilter, setGradeFilter] = useState<string>("all");

  const filteredHistories = useMemo(() => {
    return mockCurationHistory.filter((item) => {
      const matchStatus =
        statusFilter === "all" || item.status === statusFilter;
      const matchGrade = gradeFilter === "all" || item.grade === gradeFilter;
      return matchStatus && matchGrade;
    });
  }, [statusFilter, gradeFilter]);

  const totalApproved = mockCurationHistory.filter(
    (h) => h.status === "approved"
  ).length;
  const totalRevenue = mockCurationHistory
    .filter((h) => h.status === "approved")
    .reduce((sum, h) => sum + h.suggestedPrice, 0);

  const statusCounts = {
    all: mockCurationHistory.length,
    approved: mockCurationHistory.filter((h) => h.status === "approved").length,
    rejected: mockCurationHistory.filter((h) => h.status === "rejected").length,
    revised: mockCurationHistory.filter((h) => h.status === "revised").length,
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-green-700 font-medium">
                <i className="fas fa-check-circle mr-2"></i>Kurasi Disetujui
              </p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {totalApproved}
              </p>
              <p className="text-xs text-green-600 mt-1">
                Total: Rp {(totalRevenue / 1000000).toFixed(1)}jt
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-yellow-700 font-medium">
                <i className="fas fa-pen-to-square mr-2"></i>Revisi Harga
              </p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">
                {statusCounts.revised}
              </p>
              <p className="text-xs text-yellow-600 mt-1">Perlu penyesuaian</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-red-50 to-red-100">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-red-700 font-medium">
                <i className="fas fa-times-circle mr-2"></i>Ditolak
              </p>
              <p className="text-3xl font-bold text-red-600 mt-2">
                {statusCounts.rejected}
              </p>
              <p className="text-xs text-red-600 mt-1">Perlu dokumen ulang</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Bar */}
      <Card className="border-0 shadow-md">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                Filter Status
              </label>
              <select
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Semua Status ({statusCounts.all})</option>
                <option value="approved">
                  Disetujui ({statusCounts.approved})
                </option>
                <option value="revised">
                  Revisi Harga ({statusCounts.revised})
                </option>
                <option value="rejected">Ditolak ({statusCounts.rejected})</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                Filter Grade
              </label>
              <select
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
              >
                <option value="all">Semua Grade</option>
                <option value="A">Grade A - Excellent</option>
                <option value="B">Grade B - Good</option>
                <option value="C">Grade C - Fair</option>
                <option value="D">Grade D - Poor</option>
              </select>
            </div>

            <button
              onClick={() => {
                setStatusFilter("all");
                setGradeFilter("all");
              }}
              className="h-10 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors text-sm self-end"
            >
              <i className="fas fa-redo mr-2"></i>Reset
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Curation History List */}
      <div className="space-y-3">
        {filteredHistories.length > 0 ? (
          filteredHistories.map((history) => {
            const gradeInfo = gradeConfig[history.grade];
            return (
              <Card key={history.id} className="border-0 shadow-md hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-4 border-b border-gray-200">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-gray-900 text-lg">
                            {history.productName}
                          </h3>
                          <Badge
                            className={`${gradeInfo.color} border`}
                          >
                            {gradeInfo.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          <i className="fas fa-barcode mr-2"></i>ID: {history.id}
                        </p>
                      </div>

                      <Badge
                        className={`text-sm whitespace-nowrap ${
                          history.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : history.status === "revised"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        <i
                          className={`fas ${
                            history.status === "approved"
                              ? "fa-check-circle"
                              : history.status === "revised"
                              ? "fa-pen-to-square"
                              : "fa-times-circle"
                          } mr-1`}
                        ></i>
                        {history.status === "approved"
                          ? "Disetujui"
                          : history.status === "revised"
                          ? "Revisi Harga"
                          : "Ditolak"}
                      </Badge>
                    </div>

                    {/* Grade Details */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                        <i className="fas fa-certificate text-green-600 mr-2"></i>
                        Standar Grading
                      </h4>
                      <p className="text-sm text-gray-700 mb-3">
                        {gradeInfo.description}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <p className="text-gray-600 text-xs font-medium mb-1">Harga Saran</p>
                          <p className="font-bold text-green-600 text-lg">
                            Rp {history.suggestedPrice.toLocaleString("id-ID")}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-xs font-medium mb-1">Range Pasar</p>
                          <p className="font-semibold text-gray-900">
                            Rp {history.marketBenchmark.min.toLocaleString("id-ID")}
                          </p>
                          <p className="text-xs text-gray-600">
                            - Rp{" "}
                            {history.marketBenchmark.max.toLocaleString("id-ID")}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-xs font-medium mb-1">
                            Rata-rata Pasar
                          </p>
                          <p className="font-semibold text-gray-900">
                            Rp{" "}
                            {history.marketBenchmark.avg.toLocaleString(
                              "id-ID"
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-xs font-medium mb-1">Waktu Kurasi</p>
                          <p className="font-semibold text-gray-900 text-sm">
                            {new Date(history.curationDate).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Reason */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                        <i className="fas fa-lightbulb text-yellow-500 mr-2"></i>
                        Alasan Kurasi
                      </h4>
                      <p className="text-sm text-gray-700 bg-blue-50 border border-blue-200 rounded-lg p-3">
                        {history.reason}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-gray-600 pt-4 border-t border-gray-200">
                      <p>
                        <i className="fas fa-user-check mr-2"></i>
                        Dikurasi oleh: <span className="font-semibold">{history.approvedBy}</span>
                      </p>
                      <button className="md:w-auto w-full px-3 py-2 bg-green-100 text-green-700 font-semibold rounded-lg hover:bg-green-200 transition-colors text-sm">
                        <i className="fas fa-eye mr-2"></i>Lihat Detail
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card className="border-0 shadow-md">
            <CardContent className="py-12 text-center">
              <i className="fas fa-inbox text-5xl text-gray-300 mb-4 block"></i>
              <p className="text-gray-600 text-lg font-semibold">
                Tidak ada kurasi dengan filter tersebut
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Produk Anda akan muncul di sini setelah melalui proses kurasi
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
