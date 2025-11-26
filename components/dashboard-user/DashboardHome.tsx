"use client";

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Selamat Datang Kembali!</h1>
          <p className="text-gray-600 text-sm mt-1">Dashboard User ThriftMap</p>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">
          <i className="fas fa-plus mr-2"></i>
          Quick Action
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Pesanan</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">24</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <i className="fas fa-shopping-bag text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Wishlist</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <i className="fas fa-heart text-red-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Keranjang</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">5</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <i className="fas fa-shopping-cart text-green-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Belanja</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">Rp 2.4jt</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <i className="fas fa-wallet text-purple-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Pesanan Terbaru</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
              <div className="flex items-center gap-4">
                <img
                  src={`https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=80&h=80&fit=crop`}
                  alt="Product"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">Dress Merah Vintage</p>
                  <p className="text-sm text-gray-600">Order #TM{1000 + i}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">Rp 250.000</p>
                <span className="inline-block mt-1 px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                  Diproses
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
