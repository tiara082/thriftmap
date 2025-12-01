"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProfilePage() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: "Rumah",
      address: "Jl. Thrift No. 123, Jakarta Selatan",
      city: "Jakarta",
      postalCode: "12345",
      isPrimary: true,
    },
    {
      id: 2,
      label: "Kantor",
      address: "Gedung ThriftMap Lt. 5, Jl. Sustainable No. 456",
      city: "Jakarta",
      postalCode: "12346",
      isPrimary: false,
    },
  ]);

  const [showAddressModal, setShowAddressModal] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Profil Saya</h2>

        <div className="flex items-center space-x-6 mb-8">
          <div className="relative">
            <Image
              src="https://ui-avatars.com/api/?name=User+ThriftMap&background=10b981&color=fff&size=120"
              alt="Profile"
              width={96}
              height={96}
              className="rounded-full"
            />
            <button className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors">
              <i className="fas fa-camera text-sm"></i>
            </button>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800">
              User ThriftMap
            </h3>
            <p className="text-gray-600">user@thriftmap.id</p>
            <p className="text-gray-500 text-sm mb-3">Bergabung sejak Jan 2024</p>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://ui-avatars.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                <i className="fas fa-user-circle"></i>
                UI Avatars
              </a>
              <a
                href="https://www.dicebear.com/playground"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <i className="fas fa-dice"></i>
                DiceBear
              </a>
              <a
                href="https://avatar.iran.liara.run/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <i className="fas fa-robot"></i>
                Avatar API
              </a>
            </div>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avatar URL
              </label>
              <input
                type="url"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="https://ui-avatars.com/api/?name=Your+Name&background=10b981&color=fff"
                defaultValue="https://ui-avatars.com/api/?name=User+ThriftMap&background=10b981&color=fff&size=120"
              />
              <p className="mt-1.5 text-xs text-gray-500">
                💡 Gunakan generator avatar di atas untuk membuat avatar kustom Anda
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                defaultValue="User ThriftMap"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                defaultValue="user@thriftmap.id"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telepon
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                defaultValue="08123456789"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Lahir
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>

      {/* Address Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Alamat Saya</h2>
          <button
            onClick={() => setShowAddressModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <i className="fas fa-plus mr-2"></i>Tambah Alamat
          </button>
        </div>

        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-medium text-gray-800">
                    {address.label}
                  </span>
                  {address.isPrimary && (
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Utama
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Edit
                  </button>
                  {!address.isPrimary && (
                    <button className="text-red-600 hover:text-red-800 text-sm">
                      Hapus
                    </button>
                  )}
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-2">{address.address}</p>
              <p className="text-gray-500 text-sm">
                {address.city}, {address.postalCode}
              </p>
              {!address.isPrimary && (
                <div className="mt-3">
                  <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                    Jadikan Alamat Utama
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Tambah Alamat Baru
              </h3>
              <button
                onClick={() => setShowAddressModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Label Alamat
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Contoh: Rumah, Kantor"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alamat Lengkap
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows={3}
                  placeholder="Tulis alamat lengkap"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kota
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kode Pos
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Simpan Alamat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
