"use client";

export default function DashboardOrders() {
  const orders = [
    { id: "TM1001", product: "Dress Merah Vintage", price: 250000, status: "Diproses", date: "2025-11-25" },
    { id: "TM1002", product: "Jaket Denim Klasik", price: 180000, status: "Dikirim", date: "2025-11-24" },
    { id: "TM1003", product: "Celana Jeans Biru", price: 150000, status: "Selesai", date: "2025-11-20" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Diproses": return "bg-yellow-100 text-yellow-800";
      case "Dikirim": return "bg-blue-100 text-blue-800";
      case "Selesai": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Pesanan Saya</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Produk</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Harga</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.product}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    Rp {order.price.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
