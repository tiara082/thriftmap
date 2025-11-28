"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  User
} from "lucide-react";

const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'.-]{3,60}$/;
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const PHONE_REGEX = /^(?:\+62|0)\d{9,13}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_.-])[A-Za-z\d@$!%*?#&_.-]{8,32}$/;

const STORAGE_KEY = "tm_users_v1";

const genderOptions = [
  {
    value: "male",
    label: "Saya laki-laki",
    image: "https://avatar.iran.liara.run/public/13"
  },
  {
    value: "female",
    label: "Saya perempuan",
    image: "https://avatar.iran.liara.run/public/100"
  }
];

type AlertState = {
  type: "success" | "error";
  message: string;
} | null;

interface StoredUser {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  newsletter: boolean;
  gender: string;
  passwordHash: string;
  createdAt: string;
}

const initialFormState = {
  fullname: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  gender: "",
  terms: false,
  newsletter: false
};

export default function RegisterUserPage() {
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

  const validateFullName = (name: string) => NAME_REGEX.test((name || "").trim());

  const validateEmail = (email: string) => EMAIL_REGEX.test((email || "").trim());

  const normalizePhone = (phone: string) => (phone || "").replace(/[^\d+]/g, "");

  const validatePhone = (phone: string) => {
    const compact = (phone || "").replace(/[\s-]/g, "");
    if (!compact) return true;
    return PHONE_REGEX.test(compact);
  };

  const validatePassword = (password: string) =>
    typeof password === "string" && PASSWORD_REGEX.test(password);

  const loadUsers = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) || "[]";
      const users = JSON.parse(raw);
      return Array.isArray(users) ? (users as StoredUser[]) : [];
    } catch {
      return [];
    }
  };

  const saveUsers = (users: StoredUser[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  };

  const emailExists = (users: StoredUser[], email: string) => {
    const target = (email || "").trim().toLowerCase();
    return users.some((user) => (user.email || "").toLowerCase() === target);
  };

  const hashPassword = async (password: string) => {
    try {
      if (typeof window !== "undefined" && window.crypto?.subtle) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return btoa(String.fromCharCode(...hashArray));
      }
    } catch {
      // fall back to base64 below
    }
    return btoa(unescape(encodeURIComponent(password)));
  };

  const showAlert = (type: "success" | "error", message: string) => {
    setAlert({ type, message });
  };

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

    if (!validateFullName(formData.fullname)) {
      showAlert("error", "Nama lengkap minimal 3 karakter dan hanya huruf");
      return;
    }

    if (!validateEmail(formData.email)) {
      showAlert("error", "Format email tidak valid");
      return;
    }

    if (!validatePhone(formData.phone)) {
      showAlert(
        "error",
        "Nomor telepon harus diawali +62/0 dan berisi 10-15 digit"
      );
      return;
    }

    if (!formData.gender) {
      showAlert("error", "Pilih jenis kelamin terlebih dahulu");
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
      showAlert("error", "Anda harus menyetujui Syarat & Ketentuan");
      return;
    }

    setLoading(true);

    try {
      const users = loadUsers();
      if (emailExists(users, formData.email)) {
        showAlert("error", "Email sudah terdaftar. Gunakan email lain");
        setLoading(false);
        return;
      }

      const passwordHash = await hashPassword(formData.password);
      const newUser: StoredUser = {
        id: crypto.randomUUID ? crypto.randomUUID() : `user-${Date.now()}`,
        fullname: formData.fullname.trim(),
        email: formData.email.trim(),
        phone: normalizePhone(formData.phone),
        newsletter: formData.newsletter,
        gender: formData.gender,
        passwordHash,
        createdAt: new Date().toISOString()
      };

      saveUsers([...users, newUser]);
      showAlert("success", "Registrasi berhasil. Silakan masuk dengan akun Anda");
      setFormData(initialFormState);

      setTimeout(() => {
        router.push("/login-user");
      }, 1600);
    } catch (error) {
      console.error(error);
      showAlert("error", "Registrasi gagal. Coba beberapa saat lagi");
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
            <img src="/logo.svg" alt="ThriftMap" className="h-16" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="fullname" className="block text-gray-700 font-medium mb-2">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500" />
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  className="form-input w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm focus:border-green-500"
                  placeholder="Nama lengkap Anda"
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
                  placeholder="nama@email.com"
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
                {passwordHelper.className === "text-green-600" && (
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
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                Nomor Telepon <span className="text-gray-400 text-sm">(opsional)</span>
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
              <span className="block text-gray-700 font-medium mb-3">Jenis Kelamin</span>
              <input type="hidden" name="gender" value={formData.gender} />
              <div className="gender-options">
                {genderOptions.map((option) => {
                  const selected = formData.gender === option.value;
                  return (
                    <button
                      type="button"
                      key={option.value}
                      onClick={() => setFormData((prev) => ({ ...prev, gender: option.value }))}
                      className={`gender-option ${selected ? "selected" : ""}`}
                      aria-pressed={selected}
                    >
                      <img src={option.image} alt={option.label} className="h-20 w-20" />
                      <span className="gender-label">{option.label}</span>
                    </button>
                  );
                })}
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
                Saya menyetujui <span className="text-green-600">Syarat & Ketentuan</span> dan Kebijakan Privasi ThriftMap
              </label>
            </div>

            <div className="flex items-start gap-3">
              <input
                id="newsletter"
                name="newsletter"
                type="checkbox"
                checked={formData.newsletter}
                onChange={handleCheckboxChange}
                className="mt-1 h-4 w-4 rounded-md border-gray-300 text-green-600 focus:ring-green-500"
              />
              <label htmlFor="newsletter" className="text-sm text-gray-700">
                Saya ingin menerima info penawaran khusus dan produk baru via email
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-green-600 py-3 text-white font-semibold shadow-md hover:bg-green-700"
            >
              {loading ? "Membuat akun..." : "Daftar Sekarang"}
            </button>

            <div className="my-6 flex items-center gap-4">
              <span className="flex-1 border-t border-gray-200" />
              <span className="text-sm text-gray-500">atau daftar dengan</span>
              <span className="flex-1 border-t border-gray-200" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                  className="h-5 w-5 text-green-600"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8c0-17.8-1.6-35.1-4.7-52H249v98.4h135.7c-5.9 31.8-23.6 58.8-50.4 76.8v63.9h81.5c47.7-44 74.2-109 74.2-187.1z"
                  />
                  <path
                    fill="currentColor"
                    d="M249 492c67.5 0 124.1-22.4 165.4-60.8l-81.5-63.9c-22.7 15.3-51.5 24.4-83.9 24.4-64.7 0-119.6-43.8-139.2-102.7H26.1v64.5C67.7 439.6 151.8 492 249 492z"
                    opacity=".6"
                  />
                  <path
                    fill="currentColor"
                    d="M109.8 288.9c-4.6-13.8-7.2-28.6-7.2-43.9s2.6-30.1 7.2-43.9v-64.5H26.1C9.4 172.5 0 209.2 0 245s9.4 72.5 26.1 108.4z"
                    opacity=".8"
                  />
                  <path
                    fill="currentColor"
                    d="M249 96.5c36.8 0 69.7 12.6 95.5 37.3l71.6-71.6C373 18 316.4 0 249 0 151.8 0 67.7 52.4 26.1 132.6l83.7 64.5C129.4 140.3 184.3 96.5 249 96.5z"
                  />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  className="h-5 w-5 text-green-600"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M279.1 288l14.2-92.7h-88.9v-60.1c0-25.3 12.4-50.1 52.2-50.1h40.4V6.3S269.4 0 225.4 0c-73.2 0-121.1 44.4-121.1 124.7v70.6H22.89V288h81.39v224h100.2V288z"
                  />
                </svg>
                Facebook
              </button>
            </div>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                Sudah punya akun?{" "}
                <Link href="/login-user" className="text-green-600 font-semibold">
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
              ? "bg-green-100 border-green-400 text-green-700"
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
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
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
        .gender-options {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }
        .gender-option {
          border: 2px solid #e5e7eb;
          border-radius: 1.25rem;
          background-color: #fff;
          padding: 1.5rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .gender-option:hover {
          border-color: #10b981;
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.18);
          transform: translateY(-2px);
        }
        .gender-option.selected {
          border-color: #10b981;
          background-color: #ecfdf5;
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.22);
        }
        .gender-option img {
          width: 80px;
          height: 80px;
          object-fit: cover;
        }
        .gender-option .gender-label {
          font-weight: 600;
          color: #1f2937;
        }
      `}</style>
    </div>
  );
}
