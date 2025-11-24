"use client";

export default function OrdersPage() {
  const orders = [
    {
      id: "ORD-001234",
      product: "Jaket Denim Vintage",
      date: "15 Jan 2024",
      total: 85000,
      status: "Selesai",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: "ORD-001235",
      product: "Dress Floral",
      date: "14 Jan 2024",
      total: 65000,
      status: "Proses",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      id: "ORD-001236",
      product: "Kemeja Linen",
      date: "12 Jan 2024",
      total: 55000,
      status: "Dikirim",
      statusColor: "bg-blue-100 text-blue-800",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Riwayat Pesanan
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">
                Order ID
              </th>
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">
                Produk
              </th>
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">
                Tanggal
              </th>
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">
                Total
              </th>
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-4 px-4">
                  <span className="font-medium text-green-600">{order.id}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-800">{order.product}</span>
                </td>
                <td className="py-4 px-4 text-gray-600">{order.date}</td>
                <td className="py-4 px-4 font-medium text-gray-800">
                  Rp {order.total.toLocaleString()}
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${order.statusColor}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
