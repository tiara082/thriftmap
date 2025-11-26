"use client";

export default function DashboardProducts() {
  const products = [
    { id: 1, name: "Dress Merah Vintage", price: 250000, category: "Fashion Wanita", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200" },
    { id: 2, name: "Jaket Denim Klasik", price: 180000, category: "Fashion Pria", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200" },
    { id: 3, name: "Celana Jeans Biru", price: 150000, category: "Fashion Pria", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200" },
    { id: 4, name: "Tas Kulit Cokelat", price: 320000, category: "Aksesoris", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Semua Produk</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Cari produk..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-all">
                <i className="far fa-heart text-red-500"></i>
              </button>
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-500 mb-1">{product.category}</p>
              <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-lg font-bold text-green-600">
                Rp {product.price.toLocaleString("id-ID")}
              </p>
              <button className="mt-3 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all text-sm font-medium">
                <i className="fas fa-shopping-cart mr-2"></i>
                Tambah ke Keranjang
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
