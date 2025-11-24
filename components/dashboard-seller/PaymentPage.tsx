"use client";

export default function PaymentPage() {
  const paymentMethods = [
    {
      icon: "fab fa-cc-visa",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      name: "Kartu Kredit/Debit",
      description: "Visa, Mastercard, JCB",
    },
    {
      icon: "fas fa-wallet",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      name: "E-Wallet",
      description: "Gopay, OVO, Dana, LinkAja",
    },
    {
      icon: "fas fa-money-bill-wave",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      name: "Transfer Bank",
      description: "BCA, Mandiri, BNI, BRI",
    },
    {
      icon: "fas fa-store",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      name: "Bayar di Tempat",
      description: "COD (Cash on Delivery)",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Metode Pembayaran
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Pilih Metode Pembayaran
            </h3>

            <div className="space-y-4">
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:border-green-500 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 ${method.iconBg} rounded-lg flex items-center justify-center mr-4`}
                      >
                        <i className={`${method.icon} ${method.iconColor} text-xl`}></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {method.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {method.description}
                        </p>
                      </div>
                    </div>
                    <i className="fas fa-chevron-right text-gray-400"></i>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Ringkasan Pesanan
            </h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800">Rp 145.000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Ongkos Kirim</span>
                <span className="text-gray-800">Rp 15.000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Diskon</span>
                <span className="text-green-600">-Rp 13.000</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-800">Total</span>
                  <span className="text-green-600">Rp 147.000</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium">
              Bayar Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
