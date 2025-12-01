"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Check, Eye, EyeOff, Lock, Mail, Phone, Store, User } from "lucide-react";

const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'.-]{3,60}$/;
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const PHONE_REGEX = /^(?:\+62|0)\d{9,13}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_.-])[A-Za-z\d@$!%*?#&_.-]{8,32}$/;
const STORAGE_KEY = "registered_sellers";

type AlertState = { type: "success" | "error"; message: string } | null;

interface StoredSeller {
  id: string;
  storeName: string;
  ownerName: string;
  email: string;
  phone: string;
  passwordHash: string;
  createdAt: string;
}

const initialFormState = {
  storeName: "",
  ownerName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  terms: false
};

export default function RegisterSellerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertState>(null);

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const validateName = (value: string) => NAME_REGEX.test((value || "").trim());
  const validateEmail = (value: string) => EMAIL_REGEX.test((value || "").trim());

  const normalizePhone = (value: string) => (value || "").replace(/[^\d+]/g, "");

  const validatePhone = (value: string) => {
    const compact = (value || "").replace(/[^\d+]/g, "");
    return PHONE_REGEX.test(compact);
  };

  const validatePassword = (value: string) =>
    typeof value === "string" && PASSWORD_REGEX.test(value);

  const loadSellers = (): StoredSeller[] => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) || "[]";
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as StoredSeller[]) : [];
    } catch {
      return [];
    }
  };

  const saveSellers = (sellers: StoredSeller[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sellers));
  };

  const hashPassword = async (value: string) => {
    try {
      if (typeof window !== "undefined" && window.crypto?.subtle) {
        const encoder = new TextEncoder();
        const data = encoder.encode(value);
        const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return btoa(String.fromCharCode(...hashArray));
      }
    } catch {
      // fallback handled below
    }
    return btoa(unescape(encodeURIComponent(value)));
  };

  const showAlert = (type: "success" | "error", message: string) => {
    setAlert({ type, message });
  };

  const emailHelper = (() => {
    if (!formData.email) {
      return { text: "Gunakan email yang aktif", className: "text-gray-500" };
    }
    if (validateEmail(formData.email)) {
      return { text: "Format email valid", className: "text-green-600" };
    }
    return { text: "Format email belum valid", className: "text-red-500" };
  })();

  const passwordHelper = (() => {
    if (!formData.password) {
      return {
        text:
          "Password harus 8-32 karakter dengan huruf besar, huruf kecil, angka, dan simbol (@$!%*?#&_)",
        className: "text-gray-500"
      };
    }
    if (validatePassword(formData.password)) {
      return { text: "Password kuat", className: "text-green-600" };
    }
    return {
      text: "Password 8-32 karakter & wajib huruf besar, huruf kecil, angka, dan simbol",
      className: "text-red-500"
    };
  })();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateName(formData.storeName)) {
      showAlert("error", "Nama toko minimal 3 karakter dan hanya huruf");
      return;
    }

    if (!validateName(formData.ownerName)) {
      showAlert("error", "Nama pemilik minimal 3 karakter dan hanya huruf");
      return;
    }

    if (!validateEmail(formData.email)) {
      showAlert("error", "Format email tidak valid");
      return;
    }

    if (!validatePhone(formData.phone)) {
      showAlert("error", "Nomor telepon harus diawali +62/0 dan berisi 10-15 digit");
      return;
    }

    if (!validatePassword(formData.password)) {
      showAlert(
        "error",
        "Password harus 8-32 karakter dengan huruf besar, huruf kecil, angka, dan simbol"
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showAlert("error", "Konfirmasi password tidak cocok");
      return;
    }

    if (!formData.terms) {
      showAlert("error", "Anda harus menyetujui syarat & ketentuan seller");
      return;
    }

    setLoading(true);
    try {
      const sellers = loadSellers();
      const exists = sellers.some(
        (seller) => seller.email.toLowerCase() === formData.email.trim().toLowerCase()
      );

      if (exists) {
        showAlert("error", "Email sudah terdaftar. Gunakan email lain");
        return;
      }

      const passwordHash = await hashPassword(formData.password);
      const newSeller: StoredSeller = {
        id: crypto.randomUUID ? crypto.randomUUID() : `seller-${Date.now()}`,
        storeName: formData.storeName.trim(),
        ownerName: formData.ownerName.trim(),
        email: formData.email.trim(),
        phone: normalizePhone(formData.phone),
        passwordHash,
        createdAt: new Date().toISOString()
      };

      saveSellers([...sellers, newSeller]);
      showAlert("success", "Pendaftaran seller berhasil! Silakan masuk");
      setFormData(initialFormState);

      setTimeout(() => router.push("/login-seller"), 1600);
    } catch (error) {
      console.error(error);
      showAlert("error", "Pendaftaran gagal. Coba beberapa saat lagi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        fontFamily: "Poppins, 'Plus Jakarta Sans', sans-serif",
        background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)"
      }}
    >
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src="/logo.svg" alt="ThriftMap Logo" className="h-16" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Daftar Akun Seller</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="storeName" className="block text-gray-700 font-medium mb-2">
                Nama Toko
              </label>
              <div className="relative">
                <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500" />
                <input
                  id="storeName"
                  name="storeName"
                  type="text"
                  value={formData.storeName}
                  onChange={handleInputChange}
                  className="form-input w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm focus:border-green-500"
                  placeholder="Nama toko Anda"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="ownerName" className="block text-gray-700 font-medium mb-2">
                Nama Pemilik
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500" />
                <input
                  id="ownerName"
                  name="ownerName"
                  type="text"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  className="form-input w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm focus:border-green-500"
                  placeholder="Nama pemilik"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm focus:border-green-500"
                  placeholder="email@tokomu.com"
                  disabled={loading}
                />
              </div>
              <p className={`mt-2 text-xs ${emailHelper.className}`}>
                {emailHelper.text}
              </p>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Avatar Generator
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                <a
                  href="https://ui-avatars.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors border border-emerald-200"
                >
                  <i className="fas fa-user-circle"></i>
                  UI Avatars
                </a>
                <a
                  href="https://www.dicebear.com/playground"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
                >
                  <i className="fas fa-dice"></i>
                  DiceBear
                </a>
                <a
                  href="https://avatar.iran.liara.run/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-purple-700 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors border border-purple-200"
                >
                  <i className="fas fa-robot"></i>
                  Avatar API
                </a>
              </div>
              <p className="text-xs text-gray-500 mb-3">
                💡 Klik salah satu generator untuk membuat avatar, lalu copy URL nya ke field di bawah
              </p>
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                Nomor Telepon
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm focus:border-green-500"
                  placeholder="08xxxxxxxxxx"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-10 text-sm focus:border-green-500"
                  placeholder="Minimal 8 karakter"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <p className={`mt-2 text-xs ${passwordHelper.className}`}>
                {passwordHelper.className === "text-emerald-600" && (
                  <Check className="inline-block h-4 w-4 mr-1" />
                )}
                {passwordHelper.text}
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                Konfirmasi Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="form-input w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-10 text-sm focus:border-green-500"
                  placeholder="Ulangi password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={formData.terms}
                onChange={handleCheckboxChange}
                className="mt-1 h-4 w-4 rounded-md border-gray-300 text-green-600 focus:ring-green-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                Saya menyetujui <span className="text-green-600">Syarat & Ketentuan Seller</span> dan kebijakan privasi
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-green-600 py-3 text-white font-semibold shadow-md hover:bg-green-700"
            >
              {loading ? "Membuat akun..." : "Daftar sebagai Seller"}
            </button>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                Sudah punya akun?{" "}
                <Link href="/login-seller" className="text-green-600 font-semibold">
                  Masuk di sini
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-green-600 hover:text-green-800 font-medium inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali ke Beranda
          </Link>
        </div>
      </div>

      {alert && (
        <div
          className={`custom-alert fixed top-4 right-4 max-w-sm rounded-lg border px-4 py-3 shadow-lg z-20 ${
            alert.type === "success"
              ? "bg-green-100 border-green-400 text-green-800"
              : "bg-red-100 border-red-400 text-red-700"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="font-semibold capitalize">{alert.type}</span>
            <p className="text-sm">{alert.message}</p>
          </div>
        </div>
      )}

      <style>{`
        .form-input {
          transition: all 0.3s ease;
        }
        .form-input:hover {
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.12);
        }
        * {
          outline: none !important;
        }
        *:focus {
          outline: none !important;
          box-shadow: none !important;
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
          box-shadow: none !important;
          -webkit-tap-highlight-color: transparent !important;
        }
      `}</style>
    </div>
  );
}
