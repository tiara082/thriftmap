"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterSellerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    storeName: "",
    ownerName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    description: ""
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
    if (!formData.storeName.trim()) {
      toast.error("Nama toko harus diisi");
      setLoading(false);
      return;
    }

    if (!formData.ownerName.trim()) {
      toast.error("Nama pemilik harus diisi");
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

    if (!formData.address.trim()) {
      toast.error("Alamat toko harus diisi");
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
      const registeredSellers = JSON.parse(localStorage.getItem("registered_sellers") || "[]");
      const emailExists = registeredSellers.some((s: any) => s.email.toLowerCase() === formData.email.toLowerCase());

      if (emailExists) {
        toast.error("Email sudah terdaftar. Silakan gunakan email lain.");
        setLoading(false);
        return;
      }

      // Save seller data
      const newSeller = {
        id: Date.now().toString(),
        storeName: formData.storeName,
        ownerName: formData.ownerName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        description: formData.description,
        createdAt: new Date().toISOString()
      };

      registeredSellers.push(newSeller);
      localStorage.setItem("registered_sellers", JSON.stringify(registeredSellers));

      toast.success("Pendaftaran seller berhasil! Silakan login.");

      setTimeout(() => {
        router.push("/login-seller");
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
      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'
    }}>
      <div className="max-w-2xl w-full">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src="/logo.svg" alt="ThriftMap Logo" className="h-16" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Daftar Akun Seller</h1>
          <p className="text-gray-600 mt-2">Buat toko dan mulai berjualan</p>
        </div>

        {/* Form Register */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-yellow-100">
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Nama Toko */}
              <div>
                <label htmlFor="storeName" className="block text-gray-700 font-medium mb-2">
                  Nama Toko *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-store text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    id="storeName"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all hover:border-yellow-500 hover:shadow-[0_0_0_3px_rgba(251,191,36,0.1)]"
                    placeholder="Nama toko Anda"
                    required
                    disabled={loading}
                    style={{ outline: 'none' }}
                  />
                </div>
              </div>

              {/* Nama Pemilik */}
              <div>
                <label htmlFor="ownerName" className="block text-gray-700 font-medium mb-2">
                  Nama Pemilik *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-user text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    id="ownerName"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all hover:border-yellow-500 hover:shadow-[0_0_0_3px_rgba(251,191,36,0.1)]"
                    placeholder="Nama pemilik toko"
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all hover:border-yellow-500 hover:shadow-[0_0_0_3px_rgba(251,191,36,0.1)]"
                    placeholder="email@toko.com"
                    required
                    disabled={loading}
                    style={{ outline: 'none' }}
                  />
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all hover:border-yellow-500 hover:shadow-[0_0_0_3px_rgba(251,191,36,0.1)]"
                    placeholder="08xxxxxxxxxx"
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
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all hover:border-yellow-500 hover:shadow-[0_0_0_3px_rgba(251,191,36,0.1)]"
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
                    <i className={`fas fa-${showPassword ? "eye-slash" : "eye"} text-gray-400 hover:text-yellow-600 transition-colors`}></i>
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
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all hover:border-yellow-500 hover:shadow-[0_0_0_3px_rgba(251,191,36,0.1)]"
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
                    <i className={`fas fa-${showConfirmPassword ? "eye-slash" : "eye"} text-gray-400 hover:text-yellow-600 transition-colors`}></i>
                  </button>
                </div>
              </div>

              {/* Alamat Toko */}
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                  Alamat Toko *
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
                    rows={2}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all hover:border-yellow-500 hover:shadow-[0_0_0_3px_rgba(251,191,36,0.1)]"
                    placeholder="Alamat lengkap toko"
                    required
                    disabled={loading}
                    style={{ outline: 'none' }}
                  />
                </div>
              </div>

              {/* Deskripsi Toko */}
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                  Deskripsi Toko (Opsional)
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                    <i className="fas fa-align-left text-gray-400"></i>
                  </div>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all hover:border-yellow-500 hover:shadow-[0_0_0_3px_rgba(251,191,36,0.1)]"
                    placeholder="Ceritakan tentang toko Anda..."
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
                className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded cursor-pointer hover:border-yellow-500 transition-colors mt-1"
                disabled={loading}
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                Saya setuju dengan{" "}
                <a href="#" className="text-yellow-600 hover:text-yellow-800 font-medium">
                  syarat dan ketentuan seller
                </a>{" "}
                yang berlaku
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-yellow-500 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:bg-yellow-600 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(251,191,36,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ outline: 'none' }}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Memproses...
                </>
              ) : (
                <>
                  <i className="fas fa-store mr-2"></i>
                  Daftar Sebagai Seller
                </>
              )}
            </button>

            {/* Login Link */}
            <div className="text-center mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-600">
                Sudah punya akun seller?
                <a href="/login-seller" className="text-yellow-600 hover:text-yellow-800 font-medium transition-colors ml-1">
                  Login di sini
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Back to Login Selection */}
        <div className="text-center mt-6">
          <a href="/login" className="text-yellow-600 hover:text-yellow-800 font-medium transition-colors inline-flex items-center">
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
