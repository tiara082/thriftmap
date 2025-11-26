'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-store';
import { useAuth } from '@/lib/auth-context';
import { useState } from 'react';

export default function Navbar() {
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = getTotalItems();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text">
          ThriftMap
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/marketplace" className="text-gray-700 hover:text-green-600 font-medium">
            <i className="fas fa-shopping-bag mr-2"></i>Marketplace
          </Link>
          
          {user?.role === 'seller' && (
            <Link href="/dashboard-seller" className="text-gray-700 hover:text-green-600 font-medium">
              <i className="fas fa-chart-bar mr-2"></i>Dashboard Seller
            </Link>
          )}

          {/* Cart */}
          <Link href="/cart" className="relative text-gray-700 hover:text-green-600 font-medium">
            <i className="fas fa-shopping-cart text-xl"></i>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 text-gray-700 hover:text-green-600 font-medium">
                <i className="fas fa-user-circle text-2xl"></i>
                <span className="hidden sm:inline">{user.name}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity">
                <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <i className="fas fa-user mr-2"></i>Profile
                </Link>
                <Link href="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <i className="fas fa-box mr-2"></i>Pesanan
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>Logout
                </button>
              </div>
            </div>
          ) : (
            <Link href="/login" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700 hover:text-green-600"
        >
          <i className="fas fa-bars text-2xl"></i>
        </button>
      </div>

      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-gray-50">
          <div className="px-4 py-4 space-y-3">
            <Link href="/marketplace" className="block text-gray-700 hover:text-green-600 font-medium">
              <i className="fas fa-shopping-bag mr-2"></i>Marketplace
            </Link>
            <Link href="/cart" className="block text-gray-700 hover:text-green-600 font-medium">
              <i className="fas fa-shopping-cart mr-2"></i>Keranjang ({totalItems})
            </Link>
            {user?.role === 'seller' && (
              <Link href="/dashboard-seller" className="block text-gray-700 hover:text-green-600 font-medium">
                <i className="fas fa-chart-bar mr-2"></i>Dashboard Seller
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
