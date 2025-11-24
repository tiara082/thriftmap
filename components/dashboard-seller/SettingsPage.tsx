"use client";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Pengaturan Akun
        </h2>

        <div className="space-y-8">
          {/* Notification Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Notifikasi
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Email Notifikasi</p>
                  <p className="text-sm text-gray-600">
                    Kirim notifikasi via email
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">SMS Notifikasi</p>
                  <p className="text-sm text-gray-600">
                    Kirim notifikasi via SMS
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Promo & Penawaran</p>
                  <p className="text-sm text-gray-600">
                    Informasi promo dan diskon
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Privasi & Keamanan
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Profil Publik</p>
                  <p className="text-sm text-gray-600">
                    Izinkan orang lain melihat profil Anda
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div>
                <button className="text-green-600 hover:text-green-800 font-medium">
                  <i className="fas fa-key mr-2"></i>Ubah Password
                </button>
              </div>

              <div>
                <button className="text-green-600 hover:text-green-800 font-medium">
                  <i className="fas fa-envelope mr-2"></i>Ubah Email
                </button>
              </div>
            </div>
          </div>

          {/* Language Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Bahasa & Wilayah
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bahasa
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option>Bahasa Indonesia</option>
                  <option>English</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zona Waktu
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option>WIB (UTC+7)</option>
                  <option>WITA (UTC+8)</option>
                  <option>WIT (UTC+9)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
              Simpan Pengaturan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
