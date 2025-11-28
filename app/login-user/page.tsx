"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Info, Lock, Mail } from "lucide-react";

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_.-])[A-Za-z\d@$!%*?#&_.-]{8,32}$/;

const STORAGE_KEY = "tm_users_v1";

type AlertState = { type: "success" | "error"; message: string } | null;

interface StoredUser {
  email: string;
  fullname: string;
  passwordHash: string;
  [key: string]: unknown;
}

interface AuthPayload {
  email: string;
  name: string;
  type: "user" | "seller";
}

export default function LoginUserPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertState>(null);

  useEffect(() => {
    try {
      const sessionAuth = sessionStorage.getItem("isAuthenticated");
      const localAuth = localStorage.getItem("isAuthenticated");
      const sessionType = sessionStorage.getItem("userType");
      const localType = localStorage.getItem("userType");
      const effectiveType = sessionType ?? localType;

      if ((sessionAuth === "true" || localAuth === "true") && effectiveType === "user") {
        router.push("/dashboard-user");
        return;
      }

      const remembered = localStorage.getItem("tm_remembered_email_user");
      if (remembered) {
        setEmail(remembered);
        setRememberMe(true);
      }
    } catch (error) {
      console.error(error);
    }
  }, [router]);

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 4000);
    return () => clearTimeout(timer);
  }, [alert]);

  const persistAuthState = (payload: AuthPayload) => {
    const serializedUser = JSON.stringify(payload);
    const activeInfo = JSON.stringify({ email: payload.email, loginAt: new Date().toISOString() });

    try {
      localStorage.setItem("user", serializedUser);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userType", payload.type);
      localStorage.setItem("tm_active_user", activeInfo);
    } catch (error) {
      console.error(error);
    }

    try {
      sessionStorage.setItem("user", serializedUser);
      sessionStorage.setItem("isAuthenticated", "true");
      sessionStorage.setItem("userType", payload.type);
      sessionStorage.setItem("tm_active_user", activeInfo);
    } catch (error) {
      console.error(error);
    }
  };

  const validateEmail = (value: string) => EMAIL_REGEX.test((value || "").trim());

  const validatePassword = (value: string) =>
    typeof value === "string" && PASSWORD_REGEX.test(value);

  const loadUsers = (): StoredUser[] => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) || "[]";
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as StoredUser[]) : [];
    } catch {
      return [];
    }
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
      // fall back below
    }
    return btoa(unescape(encodeURIComponent(password)));
  };

  const showAlert = (type: "success" | "error", message: string) => {
    setAlert({ type, message });
  };

  const emailHelper = (() => {
    if (!email) {
      return {
        text: "Gunakan email yang aktif",
        className: "text-gray-500"
      };
    }
    if (validateEmail(email)) {
      return {
        text: "Format email valid",
        className: "text-green-600"
      };
    }
    return {
      text: "Format email belum valid",
      className: "text-red-500"
    };
  })();

  const passwordHelper = (() => {
    if (!password) {
      return {
        text: "Masukkan password terlebih dahulu",
        className: "text-gray-500"
      };
    }
    if (validatePassword(password)) {
      return {
        text: "Password memenuhi kriteria",
        className: "text-green-600"
      };
    }
    return {
      text: "Password 8-32 karakter & wajib huruf besar, huruf kecil, angka, dan simbol",
      className: "text-red-500"
    };
  })();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      showAlert("error", "Format email tidak valid");
      return;
    }

    if (!validatePassword(password)) {
      showAlert(
        "error",
        "Password harus 8-32 karakter serta memiliki huruf besar, huruf kecil, angka, dan simbol"
      );
      return;
    }

    setLoading(true);
    try {
      const users = loadUsers();
      const hashedAttempt = await hashPassword(password);
      const user = users.find(
        (u) => u.email?.toLowerCase() === email.toLowerCase() && u.passwordHash === hashedAttempt
      );

      if (!user) {
        showAlert("error", "Email atau password tidak cocok");
        return;
      }

      if (rememberMe) {
        localStorage.setItem("tm_remembered_email_user", email);
      } else {
        localStorage.removeItem("tm_remembered_email_user");
      }

      persistAuthState({ email: user.email, name: user.fullname, type: "user" });
      document.cookie = "isAuthenticated=true; path=/; max-age=86400";

      showAlert("success", "Login berhasil! Mengarahkan ke dashboard...");
      setTimeout(() => {
        router.push("/dashboard-user");
      }, 1200);
    } catch (error) {
      console.error(error);
      showAlert("error", "Login gagal. Coba beberapa saat lagi");
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
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm focus:border-green-500"
                  placeholder="nama@email.com"
                  disabled={loading}
                />
              </div>
              <p className={`mt-2 text-xs ${emailHelper.className}`}>
                {emailHelper.text}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="password" className="block text-gray-700 font-medium">
                    Password
                  </label>
                  <div className="relative tooltip-group">
                    <button
                      type="button"
                      aria-label="Syarat password"
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      <Info className="h-4 w-4" />
                    </button>
                    <div className="tooltip-panel">
                      Password 8-32 karakter, wajib huruf besar, huruf kecil, angka, dan simbol
                    </div>
                  </div>
                </div>
                <Link href="#" className="text-sm font-semibold text-green-600">
                  Lupa password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-10 text-sm focus:border-green-500"
                  placeholder="Masukkan password"
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
                {passwordHelper.text}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Ingat saya
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-green-600 py-3 text-white font-semibold shadow-md hover:bg-green-700"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>

            <div className="my-6 flex items-center gap-4">
              <span className="flex-1 border-t border-gray-200" />
              <span className="text-sm text-gray-500">atau masuk dengan</span>
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
                Belum punya akun?{" "}
                <Link href="/register-user" className="text-green-600 font-semibold">
                  Daftar sekarang
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
        .tooltip-group {
          position: relative;
          display: inline-flex;
        }
        .tooltip-panel {
          position: absolute;
          top: 130%;
          left: 50%;
          transform: translateX(-50%);
          background: #fff;
          border: 1px solid #d1fae5;
          box-shadow: 0 10px 25px rgba(15, 76, 58, 0.12);
          padding: 8px 12px;
          border-radius: 12px;
          font-size: 11px;
          color: #065f46;
          width: 220px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
          z-index: 5;
        }
        .tooltip-group:hover .tooltip-panel,
        .tooltip-group:focus-within .tooltip-panel {
          opacity: 1;
          transform: translate(-50%, 0);
        }
      `}</style>
    </div>
  );
}
