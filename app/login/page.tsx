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
    <div className="min-h-screen flex items-center justify-center p-6" style={{ 
      fontFamily: 'Poppins, sans-serif',
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
    }}>
      <div className="max-w-5xl w-full">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <img src="/logo.svg" alt="ThriftMap Logo" className="h-16" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Selamat Datang di ThriftMap</h1>
          <p className="text-gray-600">Pilih jenis akun untuk melanjutkan</p>
        </div>

        {/* Login Options */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* User Login Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shopping-bag text-green-600 text-3xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Login User</h2>
              <p className="text-gray-600 text-sm">Jelajahi produk thrift pilihan</p>
            </div>

            <a
              href="/login-user"
              className="block w-full bg-green-600 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:bg-green-700 transition-colors text-center mb-4"
              style={{ outline: 'none' }}
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Masuk Sebagai User
            </a>

            <div className="text-center text-sm">
              <span className="text-gray-600">Belum punya akun? </span>
              <a href="/register-user" className="text-green-600 hover:text-green-800 font-medium hover:underline transition-colors">
                Daftar di sini
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center">
                <i className="fas fa-check-circle text-green-600 mr-2"></i>
                Keuntungan User
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <i className="fas fa-check text-green-600 mt-1 mr-2 flex-shrink-0"></i>
                  <span>Akses ribuan produk thrift berkualitas</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-600 mt-1 mr-2 flex-shrink-0"></i>
                  <span>Tracking pesanan real-time</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-600 mt-1 mr-2 flex-shrink-0"></i>
                  <span>Wishlist & manajemen keranjang</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Seller Login Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-store text-yellow-600 text-3xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Seller</h2>
              <p className="text-gray-600 text-sm">Kembangkan bisnis thrift Anda</p>
            </div>

            <a
              href="/login-seller"
              className="block w-full bg-yellow-500 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:bg-yellow-600 transition-colors text-center mb-4"
              style={{ outline: 'none' }}
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Masuk Sebagai Seller
            </a>

            <div className="text-center text-sm">
              <span className="text-gray-600">Belum punya toko? </span>
              <a href="/register-seller" className="text-yellow-600 hover:text-yellow-800 font-medium hover:underline transition-colors">
                Daftar di sini
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center">
                <i className="fas fa-check-circle text-yellow-600 mr-2"></i>
                Keuntungan Seller
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <i className="fas fa-check text-yellow-600 mt-1 mr-2 flex-shrink-0"></i>
                  <span>Dashboard lengkap kelola produk</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-yellow-600 mt-1 mr-2 flex-shrink-0"></i>
                  <span>Sistem manajemen order otomatis</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-yellow-600 mt-1 mr-2 flex-shrink-0"></i>
                  <span>Analitik & laporan penjualan</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="text-center mt-8">
          <a href="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors">
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
