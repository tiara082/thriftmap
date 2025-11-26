"use client";

export default function DashboardWishlist() {
  const wishlistItems = [
    { id: 1, name: "Dress Merah Vintage", price: 250000, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200" },
    { id: 2, name: "Tas Kulit Cokelat", price: 320000, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Wishlist Saya</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
            <div className="relative">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50">
                <i className="fas fa-heart text-red-500"></i>
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <p className="text-lg font-bold text-green-600 mt-2">
                Rp {item.price.toLocaleString("id-ID")}
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
