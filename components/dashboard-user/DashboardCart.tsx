"use client";

export default function DashboardCart() {
  const cartItems = [
    { id: 1, name: "Dress Merah Vintage", price: 250000, quantity: 1, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100" },
    { id: 2, name: "Jaket Denim Klasik", price: 180000, quantity: 2, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100" },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 15000;
  const total = subtotal + shipping;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Keranjang Belanja</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-green-600 font-bold mt-1">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <button className="w-8 h-8 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <i className="fas fa-minus text-xs"></i>
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button className="w-8 h-8 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <i className="fas fa-plus text-xs"></i>
                  </button>
                </div>
              </div>
              <button className="text-red-500 hover:text-red-600">
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Ringkasan Pesanan</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Ongkir</span>
              <span>Rp {shipping.toLocaleString("id-ID")}</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-gray-900">
              <span>Total</span>
              <span>Rp {total.toLocaleString("id-ID")}</span>
            </div>
          </div>
          <button className="w-full mt-6 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold">
            Checkout Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
