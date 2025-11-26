'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState, Suspense } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/lib/cart-store';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<'success' | 'pending' | 'error'>('pending');

  useEffect(() => {
    // In production, verify session with backend
    if (sessionId) {
      // Simulate verification delay
      setTimeout(() => {
        setStatus('success');
        clearCart();
        setIsLoading(false);
      }, 2000);
    }
  }, [sessionId, clearCart]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="text-center py-12">
            <div className="text-5xl mb-4 animate-spin">⏳</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Memverifikasi Pembayaran</h1>
            <p className="text-gray-600">Mohon tunggu sebentar...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center py-12 px-4">
        <Card className="max-w-md w-full">
          <CardContent className="text-center py-12">
            {/* Success Icon */}
            <div className="text-6xl mb-6 animate-bounce">✅</div>

            <h1 className="text-3xl font-bold text-green-600 mb-2">Pembayaran Berhasil!</h1>
            <p className="text-gray-600 mb-6">
              Terima kasih telah berbelanja di ThriftMap. Pesanan kamu sedang diproses.
            </p>

            {/* Order Info */}
            <div className="bg-green-50 p-4 rounded-lg mb-6 border border-green-200">
              <p className="text-sm text-gray-700 mb-2">
                <strong>ID Pesanan:</strong><br/>
                <code className="text-xs bg-white px-2 py-1 rounded font-mono">{sessionId?.substring(0, 20)}...</code>
              </p>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200 text-left">
              <h3 className="font-bold text-gray-900 mb-3">Langkah Selanjutnya:</h3>
              <ol className="space-y-2 text-sm text-gray-700">
                <li>✓ Konfirmasi pembayaran dikirim via email</li>
                <li>✓ Seller akan mempersiapkan barang</li>
                <li>✓ Barang dikirim dalam 2-3 hari kerja</li>
                <li>✓ Terima barang & beri rating</li>
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                href="/orders"
                className="block w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 font-semibold transition-all"
              >
                <i className="fas fa-box mr-2"></i>Lihat Pesanan Saya
              </Link>
              <Link
                href="/marketplace"
                className="block w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-all"
              >
                <i className="fas fa-shopping-bag mr-2"></i>Lanjut Belanja
              </Link>
              <Link
                href="/"
                className="block text-center text-gray-600 hover:text-gray-700 text-sm font-medium py-2"
              >
                Kembali ke Beranda
              </Link>
            </div>

            {/* Support */}
            <div className="mt-8 pt-6 border-t text-xs text-gray-600">
              <p className="mb-2">Butuh bantuan?</p>
              <button className="text-green-600 hover:text-green-700 font-semibold">
                <i className="fas fa-headset mr-2"></i>Hubungi Customer Service
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <Card className="max-w-md w-full mx-4">
        <CardContent className="text-center py-12">
          <div className="text-5xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">Pembayaran Gagal</h1>
          <p className="text-gray-600 mb-6">
            Terjadi kesalahan saat memproses pembayaran kamu.
          </p>
          <Link
            href="/cart"
            className="inline-block px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
          >
            <i className="fas fa-arrow-left mr-2"></i>Kembali ke Keranjang
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
