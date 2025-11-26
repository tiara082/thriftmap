"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginSellerPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Check jika sudah login, redirect ke dashboard
  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    const storedUserType = localStorage.getItem("userType");
    if (isAuth === "true" && storedUserType === "seller") {
      router.push("/dashboard-seller");
    }

    // Prefill remembered email
    try {
      const stored = localStorage.getItem("tm_remembered_email_seller");
      if (stored) {
        setEmail(stored);
        setRememberMe(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, [router]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    if (typeof password !== 'string') return false;
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!validateEmail(email)) {
      toast.error("Format email tidak valid");
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password harus minimal 8 karakter, mengandung huruf besar, huruf kecil, dan angka.");
      setLoading(false);
      return;
    }

    try {
      // Check registered sellers
      const registeredSellers = JSON.parse(localStorage.getItem("registered_sellers") || "[]");
      const seller = registeredSellers.find(
        (s: any) => s.email.toLowerCase() === email.toLowerCase() && s.password === password
      );

      if (!seller) {
        toast.error("Email atau password tidak cocok. Silakan coba lagi.");
        setLoading(false);
        return;
      }

      // Remember email if checked
      if (rememberMe) {
        localStorage.setItem("tm_remembered_email_seller", email);
      } else {
        localStorage.removeItem("tm_remembered_email_seller");
      }

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify({ email: seller.email, name: seller.storeName, type: "seller" }));
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userType", "seller");
      localStorage.setItem("tm_active_user", JSON.stringify({
        email: seller.email,
        loginAt: new Date().toISOString()
      }));

      // Set cookie
      document.cookie = `isAuthenticated=true; path=/; max-age=86400`;

      toast.success("Login berhasil! Mengarahkan ke dashboard...");

      setTimeout(() => {
        router.push("/dashboard-seller");
      }, 1200);
    } catch (err) {
      toast.error("Login gagal. Silakan periksa email dan password Anda.");
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ 
      fontFamily: 'Poppins, sans-serif',
      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'
    }}>
      <div className="max-w-md w-full">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src="/logo.svg" alt="ThriftMap Logo" className="h-16" />
          </div>
        </div>

        {/* Form Login */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-yellow-100">
          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-400"></i>
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all hover:border-yellow-500 hover:shadow-[0_0_0_3px_rgba(251,191,36,0.1)]"
                  placeholder="nama@email.com"
                  required
                  disabled={loading}
                  style={{ outline: 'none' }}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-gray-700 font-medium">
                  Password
                </label>
                <a href="#" className="text-sm text-yellow-600 hover:text-yellow-800 transition-colors">
                  Lupa password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-gray-400"></i>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all hover:border-yellow-500 hover:shadow-[0_0_0_3px_rgba(251,191,36,0.1)]"
                  placeholder="Masukkan password"
                  required
                  disabled={loading}
                  style={{ outline: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  style={{ outline: 'none' }}
                  disabled={loading}
                >
                  <i className={`fas fa-${showPassword ? "eye-slash" : "eye"} text-gray-400 hover:text-yellow-600 transition-colors`}></i>
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded cursor-pointer hover:border-yellow-500 transition-colors"
                disabled={loading}
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                Ingat saya
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:bg-yellow-600 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(251,191,36,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ outline: 'none' }}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Memproses...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Masuk
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Atau masuk dengan</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                style={{ outline: 'none' }}
              >
                <i className="fab fa-google mr-2 text-red-500"></i>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                style={{ outline: 'none' }}
              >
                <i className="fab fa-facebook-f mr-2 text-blue-600"></i>
                Facebook
              </button>
            </div>

            {/* Register Link */}
            <p className="text-center text-gray-600">
              Belum punya akun?{' '}
              <a href="/register-seller" className="text-yellow-600 font-medium hover:text-yellow-800 hover:underline transition-colors">
                Daftar di sini
              </a>
            </p>
          </form>
        </div>

        {/* Back to Login Selection */}
        <div className="text-center mt-6">
          <a href="/login" className="inline-flex items-center text-gray-600 hover:text-yellow-600 transition-colors">
            <i className="fas fa-arrow-left mr-2"></i>
            Kembali ke pilihan login
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
