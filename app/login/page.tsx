'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type UserRole = 'user' | 'seller';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login gagal');
        return;
      }

      // Store user info and redirect based on role
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('authToken', `${email}:${role}`);
      localStorage.setItem('isAuthenticated', 'true');

      if (role === 'seller') {
        router.push('/dashboard-seller');
      } else {
        router.push('/dashboard-user');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Coba lagi nanti.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">ThriftMap</h1>
            <p className="text-green-50">Style More, Spend Less ✨</p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Role Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Login sebagai:
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setRole('user')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                    role === 'user'
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  👤 Pembeli
                </button>
                <button
                  type="button"
                  onClick={() => setRole('seller')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                    role === 'seller'
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🏪 Penjual
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contoh@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {loading ? 'Sedang masuk...' : 'Masuk'}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-sm text-gray-500">atau</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Links */}
            <div className="space-y-3 text-center text-sm">
              <p className="text-gray-600">
                Belum punya akun?{' '}
                <Link
                  href="/register"
                  className="text-green-600 font-semibold hover:text-green-700 transition-colors"
                >
                  Daftar di sini
                </Link>
              </p>
              <p>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  ← Kembali ke beranda
                </Link>
              </p>
            </div>

            {/* Demo Accounts Info */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700">
              <p className="font-semibold mb-2">Demo Akun:</p>
              <p>👤 Pembeli: user@thriftmap.com</p>
              <p>🏪 Penjual: seller@thriftmap.com</p>
              <p className="mt-2">Password: Demo@12345</p>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Berbelanja dengan aman di ThriftMap ✨
        </p>
      </div>
    </div>
  );
}
