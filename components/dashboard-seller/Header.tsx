"use client";

import Image from "next/image";

interface HeaderProps {
  title: string;
  subtitle: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between p-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-600">{subtitle}</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <i className="fas fa-bell"></i>
            </button>
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </div>

          <div className="flex items-center space-x-3">
            <Image
              src="https://ui-avatars.com/api/?name=User+ThriftMap&background=10b981&color=fff"
              alt="User"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-gray-700">User ThriftMap</span>
          </div>
        </div>
      </div>
    </header>
  );
}
