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
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden" style={{ 
      fontFamily: 'Poppins, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-40 left-1/3 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-6xl w-full relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
              <img src="/logo.svg" alt="ThriftMap Logo" className="h-24 relative z-10 drop-shadow-2xl" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">Selamat Datang di ThriftMap</h1>
          <p className="text-white/90 text-lg font-medium">Pilih jenis akun untuk memulai perjalanan Anda</p>
        </div>

        {/* Login Options */}
        <div className="grid md:grid-cols-2 gap-10 animate-slideUp" style={{ animationDelay: '0.2s' }}>
          {/* User Login Card */}
          <div className="group bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-white/20 hover:scale-105 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <div className="text-center mb-8">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-xl">
                  <i className="fas fa-shopping-bag text-white text-4xl"></i>
                </div>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">Login User</h2>
              <p className="text-gray-600 text-base">Jelajahi ribuan produk thrift pilihan</p>
            </div>

            <a
              href="/login-user"
              className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl hover:from-green-600 hover:to-emerald-700 transform hover:-translate-y-1 transition-all duration-300 text-center group-hover:scale-105"
              style={{ outline: 'none' }}
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Masuk Sebagai User
            </a>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Belum punya akun?{" "}
                <a href="/register-user" className="text-green-600 hover:text-green-700 font-semibold transition-colors underline decoration-2 decoration-green-400 hover:decoration-green-600">
                  Daftar Sekarang
                </a>
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-200">
              <h3 className="text-base font-bold text-gray-800 mb-5 flex items-center">
                <i className="fas fa-star text-yellow-500 mr-2"></i>
                Keuntungan User
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start group/item">
                  <div className="mt-1 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                    <i className="fas fa-check text-green-600 text-xs"></i>
                  </div>
                  <span className="ml-3 text-gray-700">Akses ribuan produk thrift berkualitas</span>
                </li>
                <li className="flex items-start group/item">
                  <div className="mt-1 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                    <i className="fas fa-check text-green-600 text-xs"></i>
                  </div>
                  <span className="ml-3 text-gray-700">Tracking pesanan real-time</span>
                </li>
                <li className="flex items-start group/item">
                  <div className="mt-1 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                    <i className="fas fa-check text-green-600 text-xs"></i>
                  </div>
                  <span className="ml-3 text-gray-700">Wishlist & manajemen keranjang</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Seller Login Card */}
          <div className="group bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-white/20 hover:scale-105 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <div className="text-center mb-8">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full flex items-center justify-center shadow-xl">
                  <i className="fas fa-store text-white text-4xl"></i>
                </div>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-3">Login Seller</h2>
              <p className="text-gray-600 text-base">Kembangkan bisnis thrift Anda</p>
            </div>

            <a
              href="/login-seller"
              className="block w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl hover:from-amber-600 hover:to-orange-700 transform hover:-translate-y-1 transition-all duration-300 text-center group-hover:scale-105"
              style={{ outline: 'none' }}
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Masuk Sebagai Seller
            </a>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Belum punya toko?{" "}
                <a href="/register-seller" className="text-amber-600 hover:text-amber-700 font-semibold transition-colors underline decoration-2 decoration-amber-400 hover:decoration-amber-600">
                  Daftar Sekarang
                </a>
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-200">
              <h3 className="text-base font-bold text-gray-800 mb-5 flex items-center">
                <i className="fas fa-star text-yellow-500 mr-2"></i>
                Keuntungan Seller
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start group/item">
                  <div className="mt-1 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                    <i className="fas fa-check text-amber-600 text-xs"></i>
                  </div>
                  <span className="ml-3 text-gray-700">Dashboard lengkap kelola produk</span>
                </li>
                <li className="flex items-start group/item">
                  <div className="mt-1 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                    <i className="fas fa-check text-amber-600 text-xs"></i>
                  </div>
                  <span className="ml-3 text-gray-700">Sistem manajemen order otomatis</span>
                </li>
                <li className="flex items-start group/item">
                  <div className="mt-1 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                    <i className="fas fa-check text-amber-600 text-xs"></i>
                  </div>
                  <span className="ml-3 text-gray-700">Analitik & laporan penjualan</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="text-center mt-12 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <a href="/" className="inline-flex items-center text-white/90 hover:text-white font-semibold text-lg transition-all hover:scale-110 group">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3 group-hover:bg-white/30 transition-colors backdrop-blur-sm">
              <i className="fas fa-arrow-left"></i>
            </div>
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
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
