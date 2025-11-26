"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterUserPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.name.trim()) {
      toast.error("Nama lengkap harus diisi");
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Format email tidak valid");
      setLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      toast.error("Password harus minimal 8 karakter, mengandung huruf besar, huruf kecil, dan angka.");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password dan konfirmasi password tidak cocok");
      setLoading(false);
      return;
    }

    if (!formData.phone.trim()) {
      toast.error("Nomor telepon harus diisi");
      setLoading(false);
      return;
    }

    if (!agreedToTerms) {
      toast.error("Anda harus menyetujui syarat dan ketentuan");
      setLoading(false);
      return;
    }

    try {
      // Check if email already exists
      const registeredUsers = JSON.parse(localStorage.getItem("registered_users") || "[]");
      const emailExists = registeredUsers.some((u: any) => u.email.toLowerCase() === formData.email.toLowerCase());

      if (emailExists) {
        toast.error("Email sudah terdaftar. Silakan gunakan email lain.");
        setLoading(false);
        return;
      }

      // Save user data
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        createdAt: new Date().toISOString()
      };

      registeredUsers.push(newUser);
      localStorage.setItem("registered_users", JSON.stringify(registeredUsers));

      toast.success("Pendaftaran berhasil! Silakan login.");

      setTimeout(() => {
        router.push("/login-user");
      }, 1500);
    } catch (err) {
      toast.error("Pendaftaran gagal. Silakan coba lagi.");
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ 
      fontFamily: 'Poppins, sans-serif',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
    }}>
      <div className="max-w-2xl w-full">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src="/logo.svg" alt="ThriftMap Logo" className="h-16" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Daftar Akun User</h1>
          <p className="text-gray-600 mt-2">Buat akun untuk mulai berbelanja</p>
        </div>

        {/* Form Register */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Nama Lengkap */}
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Nama Lengkap *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-user text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all hover:border-green-500 hover:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]"
                    placeholder="Nama lengkap Anda"
                    required
                    disabled={loading}
                    style={{ outline: 'none' }}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-envelope text-gray-400"></i>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all hover:border-green-500 hover:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]"
                    placeholder="nama@email.com"
                    required
                    disabled={loading}
                    style={{ outline: 'none' }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                  Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-lock text-gray-400"></i>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all hover:border-green-500 hover:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]"
                    placeholder="Min. 8 karakter"
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
                    <i className={`fas fa-${showPassword ? "eye-slash" : "eye"} text-gray-400 hover:text-green-600 transition-colors`}></i>
                  </button>
                </div>
              </div>

              {/* Konfirmasi Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                  Konfirmasi Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-lock text-gray-400"></i>
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all hover:border-green-500 hover:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]"
                    placeholder="Ulangi password"
                    required
                    disabled={loading}
                    style={{ outline: 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    style={{ outline: 'none' }}
                    disabled={loading}
                  >
                    <i className={`fas fa-${showConfirmPassword ? "eye-slash" : "eye"} text-gray-400 hover:text-green-600 transition-colors`}></i>
                  </button>
                </div>
              </div>

              {/* Nomor Telepon */}
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                  Nomor Telepon *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-phone text-gray-400"></i>
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all hover:border-green-500 hover:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]"
                    placeholder="08xxxxxxxxxx"
                    required
                    disabled={loading}
                    style={{ outline: 'none' }}
                  />
                </div>
              </div>

              {/* Alamat */}
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                  Alamat (Opsional)
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                    <i className="fas fa-map-marker-alt text-gray-400"></i>
                  </div>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all hover:border-green-500 hover:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]"
                    placeholder="Alamat lengkap Anda"
                    disabled={loading}
                    style={{ outline: 'none' }}
                  />
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start mt-6">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded cursor-pointer hover:border-green-500 transition-colors mt-1"
                disabled={loading}
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                Saya setuju dengan{" "}
                <a href="#" className="text-green-600 hover:text-green-800 font-medium">
                  syarat dan ketentuan
                </a>{" "}
                yang berlaku
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-green-600 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:bg-green-700 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(16,185,129,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ outline: 'none' }}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Memproses...
                </>
              ) : (
                <>
                  <i className="fas fa-user-plus mr-2"></i>
                  Daftar Sekarang
                </>
              )}
            </button>

            {/* Login Link */}
            <div className="text-center mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-600">
                Sudah punya akun?
                <a href="/login-user" className="text-green-600 hover:text-green-800 font-medium transition-colors ml-1">
                  Login di sini
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
