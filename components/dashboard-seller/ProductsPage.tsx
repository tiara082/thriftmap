"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProductsPage() {
  const products = [
    {
      id: 1,
      name: "Jaket Kulit Pria",
      price: 72000,
      originalPrice: 85000,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
      category: "Pria",
      condition: "Sangat Baik",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Kemeja Katun Premium",
      price: 45000,
      originalPrice: 56000,
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
      category: "Pria",
      condition: "Baik",
      rating: 4.2,
    },
    {
      id: 3,
      name: "Dress Floral Midi",
      price: 55000,
      originalPrice: 70000,
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
      category: "Wanita",
      condition: "Seperti Baru",
      rating: 4.8,
    },
    {
      id: 4,
      name: "Tas Mini Wanita",
      price: 42000,
      originalPrice: 55000,
      image:
        "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400",
      category: "Aksesoris",
      condition: "Baik",
      rating: 4.3,
    },
    {
      id: 5,
      name: "Sepatu Sneakers",
      price: 88000,
      originalPrice: 120000,
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",
      category: "Sepatu",
      condition: "Cukup",
      rating: 4.0,
    },
    {
      id: 6,
      name: "Sweater Hoodie",
      price: 48000,
      originalPrice: 65000,
      image:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
      category: "Unisex",
      condition: "Baik",
      rating: 4.6,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Filters */}
      <div className="lg:w-1/4">
        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Filter Produk
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option>Semua Kategori</option>
                <option>Pakaian Wanita</option>
                <option>Pakaian Pria</option>
                <option>Aksesoris</option>
                <option>Sepatu</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harga
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="radio" name="price" className="mr-2" />
                  <span className="text-sm">Semua Harga</span>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="price" className="mr-2" />
                  <span className="text-sm">Dibawah Rp 50.000</span>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="price" className="mr-2" />
                  <span className="text-sm">Rp 50.000 - 100.000</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kondisi
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2 rounded" />
                  <span className="text-sm">Seperti Baru</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2 rounded" />
                  <span className="text-sm">Baik</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2 rounded" />
                  <span className="text-sm">Cukup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="lg:w-3/4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
            Semua Produk
          </h2>

          <div className="flex space-x-4">
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>Urutkan: Terbaru</option>
              <option>Urutkan: Harga Terendah</option>
              <option>Urutkan: Harga Tertinggi</option>
              <option>Urutkan: Populer</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-800">{product.name}</h3>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {product.condition}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 text-sm mr-2">
                    {Array.from({ length: Math.floor(product.rating) }).map(
                      (_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      )
                    )}
                    {product.rating % 1 !== 0 && (
                      <i className="fas fa-star-half-alt"></i>
                    )}
                  </div>
                  <span className="text-gray-500 text-sm">
                    {product.rating}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-green-600 font-bold">
                      Rp {product.price.toLocaleString()}
                    </span>
                    <span className="text-gray-500 text-sm line-through ml-2">
                      Rp {product.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <button className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <i className="fas fa-cart-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="px-3 py-2 bg-green-600 text-white rounded-lg">
            1
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
