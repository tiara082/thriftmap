"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  // Check jika sudah login, redirect ke dashboard
  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    const storedUserType = localStorage.getItem("userType");
    if (isAuth === "true") {
      router.push(storedUserType === "seller" ? "/dashboard-seller" : "/dashboard-user");
    }
  }, [router]);



  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ 
      fontFamily: 'Poppins, sans-serif',
      background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)'
    }}>
      <div className="max-w-4xl w-full">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <img src="/logo.svg" alt="ThriftMap Logo" className="h-20" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Selamat Datang di ThriftMap</h1>
          <p className="text-gray-600">Pilih jenis akun untuk melanjutkan</p>
        </div>

        {/* Login Options */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* User Login Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-100 hover:border-green-500 transition-all hover:-translate-y-1 hover:shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-user text-green-600 text-3xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Login User</h2>
              <p className="text-gray-600 text-sm">Masuk untuk belanja produk thrift</p>
            </div>

            <a
              href="/login-user"
              className="block w-full bg-green-600 text-white font-medium py-4 px-6 rounded-lg shadow-md hover:bg-green-700 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(16,185,129,0.3)] transition-all text-center"
              style={{ outline: 'none' }}
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Login Sebagai User
            </a>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Belum punya akun?{" "}
                <a href="/register-user" className="text-green-600 hover:text-green-800 font-medium transition-colors">
                  Daftar User
                </a>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Fitur User:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Belanja produk thrift
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Lacak pesanan
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Wishlist & keranjang
                </li>
              </ul>
            </div>
          </div>

          {/* Seller Login Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-yellow-100 hover:border-yellow-500 transition-all hover:-translate-y-1 hover:shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-store text-yellow-600 text-3xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Seller</h2>
              <p className="text-gray-600 text-sm">Kelola toko dan produk Anda</p>
            </div>

            <a
              href="/login-seller"
              className="block w-full bg-yellow-500 text-white font-medium py-4 px-6 rounded-lg shadow-md hover:bg-yellow-600 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(251,191,36,0.3)] transition-all text-center"
              style={{ outline: 'none' }}
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Login Sebagai Seller
            </a>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Belum punya toko?{" "}
                <a href="/register-seller" className="text-yellow-600 hover:text-yellow-800 font-medium transition-colors">
                  Daftar Seller
                </a>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Fitur Seller:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-yellow-500 mr-2"></i>
                  Kelola produk & stok
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-yellow-500 mr-2"></i>
                  Terima & proses pesanan
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-yellow-500 mr-2"></i>
                  Analitik penjualan
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="text-center mt-8">
          <a href="/" className="text-blue-600 hover:text-blue-800 font-medium transition-colors inline-flex items-center">
            <i className="fas fa-arrow-left mr-2"></i>
            Kembali ke Beranda
          </a>
        </div>
      </div>

      <style>{`
        * {
          outline: none !important;
        }
        *:focus {
          outline: none !important;
        }
        button,
        button:hover,
        button:focus,
        button:active,
        button:focus-visible {
          outline: none !important;
          outline-width: 0 !important;
          outline-style: none !important;
          outline-color: transparent !important;
          -webkit-tap-highlight-color: transparent !important;
        }
      `}</style>
    </div>
  );
}
