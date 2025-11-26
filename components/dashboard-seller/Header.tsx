"use client";

import Image from "next/image";

interface HeaderProps {
  title: string;
  subtitle: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-white via-green-50 to-white shadow-md border-b border-green-100">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-gray-500 font-medium">{subtitle}</p>
        </div>

        <div className="flex items-center space-y-6">
          {/* Notification Bell */}
          <div className="relative group">
            <button className="p-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-all duration-300">
              <i className="fas fa-bell text-lg"></i>
            </button>
            <span className="absolute top-1.5 right-1.5 h-3 w-3 bg-gradient-to-r from-red-400 to-red-600 rounded-full animate-pulse shadow-lg"></span>
            {/* Notification Tooltip */}
            <div className="absolute -right-2 top-12 w-64 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-50">
              <div className="bg-white rounded-lg shadow-xl p-4 border border-gray-100">
                <p className="text-sm text-gray-700 font-semibold mb-2">Notifikasi Baru</p>
                <p className="text-xs text-gray-500">Anda memiliki 2 pesanan baru</p>
              </div>
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-6 border-l border-gray-200">
            <div className="group cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src="https://ui-avatars.com/api/?name=User+ThriftMap&background=10b981&color=fff"
                    alt="User"
                    width={44}
                    height={44}
                    className="rounded-full shadow-md group-hover:shadow-lg transition-shadow"
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-gray-800">User ThriftMap</p>
                  <p className="text-xs text-gray-500">Seller Aktif</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
