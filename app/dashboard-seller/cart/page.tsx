'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/cart-store';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPrice = getTotalPrice();

  const handleCheckout = async () => {
    if (items.length === 0) {
      setError('Keranjang masih kosong');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/payment/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          customerEmail: 'buyer@thriftmap.local', // TODO: Get from auth context
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal membuat checkout');
      }

      const { sessionId, url } = await response.json();

      if (url) {
        // Redirect to Stripe checkout
        window.location.href = url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Keranjang Kosong</h1>
              <p className="text-gray-600 mb-6">Mulai tambahkan barang favorit kamu dari marketplace</p>
              <Link
                href="/marketplace"
                className="inline-block px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold"
              >
                <i className="fas fa-arrow-left mr-2"></i>Kembali ke Marketplace
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/marketplace" className="text-blue-600 hover:text-blue-700 font-medium mb-4 inline-block">
            <i className="fas fa-arrow-left mr-2"></i>Kembali ke Marketplace
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Keranjang Belanja</h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2">{item.name}</h3>
                      <p className="text-lg text-green-600 font-semibold mb-3">
                        Rp {item.price.toLocaleString('id')}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm text-gray-600">Qty:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            −
                          </button>
                          <span className="px-4 py-1">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <p className="text-sm text-gray-600 mb-3">
                        Subtotal: <span className="font-semibold text-gray-900">Rp {(item.price * item.quantity).toLocaleString('id')}</span>
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 w-10 h-10 flex items-center justify-center rounded-lg transition-colors"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-6">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <CardTitle>Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {/* Items */}
                <div className="space-y-2 pb-4 border-b">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm text-gray-600">
                      <span>{item.name} x{item.quantity}</span>
                      <span>Rp {(item.price * item.quantity).toLocaleString('id')}</span>
                    </div>
                  ))}
                </div>

                {/* Subtotal */}
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">Rp {totalPrice.toLocaleString('id')}</span>
                </div>

                {/* Shipping (Estimated) */}
                <div className="flex justify-between text-gray-700">
                  <span>Ongkos Kirim (Est.)</span>
                  <span className="font-semibold">Rp 25.000</span>
                </div>

                {/* Tax */}
                <div className="flex justify-between text-gray-700">
                  <span>Pajak (10%)</span>
                  <span className="font-semibold">Rp {Math.round(totalPrice * 0.1).toLocaleString('id')}</span>
                </div>

                {/* Total */}
                <div className="pt-4 border-t-2 border-gray-200 flex justify-between">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-xl text-green-600">
                    Rp {(totalPrice + 25000 + Math.round(totalPrice * 0.1)).toLocaleString('id')}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-lg"
                >
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-lock mr-2"></i>
                      Pembayaran Aman
                    </>
                  )}
                </button>

                {/* Continue Shopping */}
                <Link
                  href="/marketplace"
                  className="block w-full text-center px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Lanjut Belanja
                </Link>

                {/* Clear Cart */}
                <button
                  onClick={() => clearCart()}
                  className="block w-full text-center text-red-600 hover:text-red-700 text-sm font-medium py-2"
                >
                  Kosongkan Keranjang
                </button>

                {/* Info */}
                <div className="mt-6 pt-6 border-t text-xs text-gray-600 space-y-2">
                  <p><i className="fas fa-shield-alt mr-2 text-green-600"></i>Pembayaran aman dengan Stripe</p>
                  <p><i className="fas fa-undo mr-2 text-green-600"></i>Garansi uang kembali 30 hari</p>
                  <p><i className="fas fa-phone mr-2 text-green-600"></i>Customer service 24/7</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
