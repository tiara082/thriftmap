"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockOrders } from "@/lib/seller-state";

const statusConfig: Record<
  string,
  { color: string; icon: string; label: string; step: number }
> = {
  "pending": {
    color: "bg-gray-100 text-gray-800",
    icon: "fa-list-check",
    label: "Menunggu Konfirmasi",
    step: 1,
  },
  "processing": {
    color: "bg-yellow-100 text-yellow-800",
    icon: "fa-box",
    label: "Dikemas",
    step: 2,
  },
  "shipped": {
    color: "bg-blue-100 text-blue-800",
    icon: "fa-truck",
    label: "Terkirim",
    step: 3,
  },
  "delivered": {
    color: "bg-purple-100 text-purple-800",
    icon: "fa-check-circle",
    label: "Tiba",
    step: 4,
  },
  "completed": {
    color: "bg-green-100 text-green-800",
    icon: "fa-star",
    label: "Selesai",
    step: 5,
  },
};

export default function OrdersPage() {
  const [filterStatus, setFilterStatus] = useState<string>("all");

  let filteredOrders = mockOrders;
  if (filterStatus !== "all") {
    filteredOrders = mockOrders.filter((o) => o.status === filterStatus);
  }

  const statusCounts = {
    all: mockOrders.length,
    pending: mockOrders.filter((o) => o.status === "pending").length,
    processing: mockOrders.filter((o) => o.status === "processing").length,
    shipped: mockOrders.filter((o) => o.status === "shipped").length,
    delivered: mockOrders.filter((o) => o.status === "delivered").length,
    completed: mockOrders.filter((o) => o.status === "completed").length,
  };

  const totalRevenue = mockOrders
    .filter((o) => o.status === "completed" || o.status === "delivered")
    .reduce((sum, order) => sum + order.totalPrice, 0);

  return (
    <div className="space-y-6">
      {/* Order Stats */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        <Card className="border-0 shadow-md hover:shadow-lg transition-all">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {mockOrders.length}
              </div>
              <p className="text-sm text-gray-600">Total Pesanan</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-lg transition-all bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-1">
                {statusCounts.pending}
              </div>
              <p className="text-sm text-yellow-700">Menunggu</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-lg transition-all bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {statusCounts.shipped + statusCounts.processing}
              </div>
              <p className="text-sm text-blue-700">Dalam Perjalanan</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-lg transition-all bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {statusCounts.delivered}
              </div>
              <p className="text-sm text-purple-700">Tiba</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-lg transition-all bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">
                Rp {(totalRevenue / 1000000).toFixed(1)}jt
              </div>
              <p className="text-sm text-green-700">Selesai</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card className="border-0 shadow-md">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {(
              ["all", "pending", "processing", "shipped", "delivered", "completed"] as const
            ).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  filterStatus === status
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status === "all" ? "Semua" : statusConfig[status]?.label}
                <span className="ml-2 text-xs opacity-75">
                  ({statusCounts[status as keyof typeof statusCounts]})
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
            const status = statusConfig[order.status];
            return (
              <Card
                key={order.id}
                className="border-0 shadow-md hover:shadow-lg transition-all overflow-hidden"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">
                            {order.productName}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Order #{order.id}
                          </p>
                        </div>
                        <Badge className={`${status.color} text-sm`}>
                          <i className={`fas ${status.icon} mr-1`}></i>
                          {status.label}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                        <div>
                          <p className="text-gray-600 text-xs">Pembeli</p>
                          <p className="font-semibold text-gray-900">
                            {order.buyerName}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-xs">Lokasi</p>
                          <p className="font-semibold text-gray-900">
                            {order.buyerLocation}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-xs">Tanggal Pesan</p>
                          <p className="font-semibold text-gray-900">
                            {new Date(order.orderDate).toLocaleDateString(
                              "id-ID",
                              { day: "numeric", month: "short", year: "numeric" }
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-xs">Est. Tiba</p>
                          <p className="font-semibold text-gray-900">
                            {order.estimatedDelivery
                              ? new Date(
                                  order.estimatedDelivery
                                ).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "short",
                                })
                              : "-"}
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="flex items-center gap-2 text-xs">
                        {(
                          ["pending", "processing", "shipped", "delivered", "completed"] as const
                        ).map((s, idx) => {
                          const isCompleted =
                            statusConfig[order.status].step >=
                            statusConfig[s].step;
                          const isCurrent = order.status === s;
                          return (
                            <div
                              key={s}
                              className={`flex-1 h-2 rounded-full transition-all ${
                                isCompleted
                                  ? "bg-green-500"
                                  : isCurrent
                                  ? "bg-blue-500"
                                  : "bg-gray-200"
                              }`}
                            ></div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="md:text-right space-y-3 md:w-48">
                      <div>
                        <p className="text-sm text-gray-600">Harga</p>
                        <p className="text-2xl font-bold text-green-600">
                          Rp {order.totalPrice.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <div className="flex md:flex-col gap-2">
                        <button className="flex-1 px-4 py-2 bg-green-100 text-green-700 font-semibold rounded-lg hover:bg-green-200 transition-colors text-sm">
                          <i className="fas fa-eye mr-2"></i>Detail
                        </button>
                        {order.status === "pending" && (
                          <button className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-lg hover:bg-blue-200 transition-colors text-sm">
                            <i className="fas fa-check mr-2"></i>Terima
                          </button>
                        )}
                      </div>
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
                Tidak ada pesanan dengan status tersebut
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Pesanan akan muncul di sini ketika pembeli melakukan pembelian
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
