"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginUserPage() {
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
    if (isAuth === "true" && storedUserType === "user") {
      router.push("/dashboard-user");
    }

    // Prefill remembered email
    try {
      const stored = localStorage.getItem("tm_remembered_email_user");
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
      // Check registered users
      const registeredUsers = JSON.parse(localStorage.getItem("registered_users") || "[]");
      const user = registeredUsers.find(
        (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!user) {
        toast.error("Email atau password tidak cocok. Silakan coba lagi.");
        setLoading(false);
        return;
      }

      // Remember email if checked
      if (rememberMe) {
        localStorage.setItem("tm_remembered_email_user", email);
      } else {
        localStorage.removeItem("tm_remembered_email_user");
      }

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify({ email: user.email, name: user.name, type: "user" }));
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userType", "user");
      localStorage.setItem("tm_active_user", JSON.stringify({
        email: user.email,
        loginAt: new Date().toISOString()
      }));

      // Set cookie
      document.cookie = `isAuthenticated=true; path=/; max-age=86400`;

      toast.success("Login berhasil! Mengarahkan ke dashboard...");

      setTimeout(() => {
        router.push("/dashboard-user");
      }, 1200);
    } catch (err) {
      toast.error("Login gagal. Silakan periksa email dan password Anda.");
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden" style={{ 
      fontFamily: 'Poppins, sans-serif',
      background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)'
    }}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-10 animate-fadeIn">
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-white/30 rounded-full blur-2xl group-hover:blur-3xl transition-all"></div>
              <img src="/logo.svg" alt="ThriftMap Logo" className="h-20 relative z-10 drop-shadow-2xl transform group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">Login User</h1>
          <p className="text-white/90 text-lg">Masuk untuk melanjutkan belanja</p>
        </div>

        {/* Form Login */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/20 animate-slideUp" style={{ animationDelay: '0.2s' }}>
          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="mb-6 group">
              <label htmlFor="email" className="block text-gray-800 font-semibold mb-3 text-sm uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-green-500 group-focus-within:scale-110 transition-transform"></i>
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all hover:border-green-400 hover:bg-white text-gray-800 font-medium"
                  placeholder="nama@email.com"
                  required
                  disabled={loading}
                  style={{ outline: 'none' }}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-6 group">
              <div className="flex justify-between items-center mb-3">
                <label htmlFor="password" className="block text-gray-800 font-semibold text-sm uppercase tracking-wide">
                  Password
                </label>
                <a href="#" className="text-sm text-green-600 hover:text-green-700 font-semibold transition-colors hover:underline">
                  Lupa password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-green-500 group-focus-within:scale-110 transition-transform"></i>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all hover:border-green-400 hover:bg-white text-gray-800 font-medium"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  style={{ outline: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform"
                  style={{ outline: 'none' }}
                  disabled={loading}
                >
                  <i className={`fas fa-${showPassword ? "eye-slash" : "eye"} text-green-500 text-lg`}></i>
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center mb-8">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-5 w-5 text-green-600 focus:ring-2 focus:ring-green-500 border-gray-300 rounded cursor-pointer hover:border-green-500 transition-all"
                disabled={loading}
              />
              <label htmlFor="remember" className="ml-3 block text-sm text-gray-700 cursor-pointer font-medium">
                Ingat saya untuk 30 hari
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl hover:from-green-600 hover:to-emerald-700 transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{ outline: 'none' }}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Memproses Login...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Masuk ke Akun
                </>
              )}
            </button>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-grow border-t-2 border-gray-200"></div>
              <span className="mx-4 text-gray-500 text-sm font-semibold">ATAU</span>
              <div className="flex-grow border-t-2 border-gray-200"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                type="button"
                className="group flex items-center justify-center py-3.5 px-4 bg-white border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transform hover:-translate-y-1 hover:shadow-lg transition-all"
                style={{ outline: 'none' }}
              >
                <i className="fab fa-google text-red-500 text-lg mr-2 group-hover:scale-110 transition-transform"></i>
                <span className="text-gray-700 font-semibold">Google</span>
              </button>
              <button
                type="button"
                className="group flex items-center justify-center py-3.5 px-4 bg-white border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transform hover:-translate-y-1 hover:shadow-lg transition-all"
                style={{ outline: 'none' }}
              >
                <i className="fab fa-facebook text-blue-600 text-lg mr-2 group-hover:scale-110 transition-transform"></i>
                <span className="text-gray-700 font-semibold">Facebook</span>
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center pt-6 border-t-2 border-gray-200">
              <p className="text-gray-600 text-base">
                Belum punya akun?{" "}
                <a href="/register-user" className="text-green-600 hover:text-green-700 font-bold transition-colors underline decoration-2 decoration-green-400 hover:decoration-green-600">
                  Daftar Sekarang
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Back to Login Selection */}
        <div className="text-center mt-6">
          <a href="/login" className="text-green-600 hover:text-green-800 font-medium transition-colors inline-flex items-center">
            <i className="fas fa-arrow-left mr-2"></i>
            Kembali ke Pilihan Login
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
