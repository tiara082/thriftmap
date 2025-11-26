'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MapView from '@/components/MapView';
import { Product } from '@/lib/seller-state';
import { getProducts } from '@/lib/storage';
import { useCart } from '@/lib/cart-store';

interface MapProduct {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  city: string;
  grade?: string;
  price?: number;
}

interface FilterState {
  grade: string | null;
  priceRange: [number, number];
  category: string | null;
  searchText: string;
}

export default function MarketplaceView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [mapProducts, setMapProducts] = useState<MapProduct[]>([]);
  const [filter, setFilter] = useState<FilterState>({
    grade: null,
    priceRange: [0, 10000000],
    category: null,
    searchText: '',
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    const allProducts = getProducts().filter(p => p.status === 'approved');
    setProducts(allProducts);
    
    // Convert products to map format with accurate coordinates from storage
    const mapProds = allProducts
      .filter(p => p.location && p.price)
      .map(p => {
        // Try to extract coordinates from product metadata if available
        // Otherwise use location-based lookup
        let latitude = -7.9797;
        let longitude = 112.7338;
        
        // Parse coordinates from location string if available (format: "lat,lng")
        if (p.location && p.location.includes(',')) {
          const parts = p.location.split(',');
          if (parts.length > 2) {
            // Check if first two parts look like coordinates
            const potentialLat = parseFloat(parts[0]);
            const potentialLng = parseFloat(parts[1]);
            if (!isNaN(potentialLat) && !isNaN(potentialLng) && 
                potentialLat >= -90 && potentialLat <= 90 &&
                potentialLng >= -180 && potentialLng <= 180) {
              latitude = potentialLat;
              longitude = potentialLng;
            }
          }
        }
        
        return {
          id: p.id,
          name: p.name,
          latitude: latitude + (Math.random() - 0.5) * 0.05, // Small variation ±0.05 degrees
          longitude: longitude + (Math.random() - 0.5) * 0.05,
          city: p.location.split(',').pop()?.trim() || 'Malang',
          grade: p.grade,
          price: p.price,
        };
      });
    
    setMapProducts(mapProds);
    setIsLoading(false);
  }, []);

  const filteredProducts = products.filter(p => {
    if (filter.searchText && !p.name.toLowerCase().includes(filter.searchText.toLowerCase())) {
      return false;
    }
    if (filter.grade && p.grade !== filter.grade) {
      return false;
    }
    if (p.price && (p.price < filter.priceRange[0] || p.price > filter.priceRange[1])) {
      return false;
    }
    if (filter.category && p.category !== filter.category) {
      return false;
    }
    return true;
  });

  const categories = Array.from(new Set(products.map(p => p.category)));
  const maxPrice = Math.max(...products.map(p => p.price || 0), 1000000);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Marketplace Barang Bekas</h1>
        <p className="text-green-100">Temukan barang berkualitas dari seller terdekat kamu</p>
      </div>

      {/* Map View */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-lg flex items-center gap-2">
            <i className="fas fa-map-location-dot text-green-600"></i>
            Peta Produk
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <MapView products={mapProducts} height="h-96" />
        </CardContent>
      </Card>

      {/* Filters & Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Search */}
            <div>
              <input
                type="text"
                placeholder="Cari barang... (contoh: jaket, sepatu)"
                value={filter.searchText}
                onChange={(e) => setFilter(prev => ({ ...prev, searchText: e.target.value }))}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 text-sm"
              />
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Grade Filter */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Grade</label>
                <select
                  value={filter.grade || ''}
                  onChange={(e) => setFilter(prev => ({ ...prev, grade: e.target.value || null }))}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 text-sm"
                >
                  <option value="">Semua Grade</option>
                  <option value="A">Grade A (Seperti Baru)</option>
                  <option value="B">Grade B (Sangat Baik)</option>
                  <option value="C">Grade C (Layak Pakai)</option>
                  <option value="D">Grade D (Cukup)</option>
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Kategori</label>
                <select
                  value={filter.category || ''}
                  onChange={(e) => setFilter(prev => ({ ...prev, category: e.target.value || null }))}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 text-sm"
                >
                  <option value="">Semua Kategori</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-gray-700 block mb-2">
                  Harga: Rp {filter.priceRange[0].toLocaleString('id')} - {filter.priceRange[1].toLocaleString('id')}
                </label>
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  step="50000"
                  value={filter.priceRange[1]}
                  onChange={(e) => setFilter(prev => ({ ...prev, priceRange: [prev.priceRange[0], parseInt(e.target.value)] }))}
                  className="w-full"
                />
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Ditemukan <span className="font-bold text-green-600">{filteredProducts.length}</span> produk
              </p>
              <button
                onClick={() => setFilter({ grade: null, priceRange: [0, maxPrice], category: null, searchText: '' })}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                Reset Filter
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id}
              className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
              onClick={() => setSelectedProduct(product)}
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-gray-100 h-48">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.grade && (
                  <div className="absolute top-3 right-3">
                    <Badge className={`text-xs font-bold ${
                      product.grade === 'A' ? 'bg-green-100 text-green-800' :
                      product.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                      product.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      Grade {product.grade}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Content */}
              <CardContent className="pt-4">
                <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-green-600 transition-colors">
                  {product.name}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">💰 Harga</span>
                    <span className="font-bold text-lg text-green-600">
                      Rp {product.price?.toLocaleString('id')}
                    </span>
                  </div>
                  {product.location && (
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm text-gray-600">📍 Lokasi</span>
                      <span className="text-xs text-gray-700 text-right">
                        {product.location.split(',').slice(1).join(',')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between py-3 border-t text-xs text-gray-600">
                  <div className="text-center flex-1">
                    <p>👁️ {product.views} views</p>
                  </div>
                  <div className="text-center flex-1">
                    <p>✓ {product.sales} terjual</p>
                  </div>
                  <div className="text-center flex-1">
                    <p>📅 {new Date(product.uploadedAt).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })}</p>
                  </div>
                </div>

                {/* Action */}
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all text-sm font-medium"
                >
                  <i className="fas fa-eye mr-2"></i>Lihat Detail
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <div className="text-gray-400">
            <i className="fas fa-search text-4xl mb-4 block"></i>
            <p className="text-gray-600">Tidak ada produk yang cocok dengan filter kamu</p>
          </div>
        </Card>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Detail Produk</CardTitle>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-white hover:bg-white/20 w-8 h-8 flex items-center justify-center rounded-lg"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </CardHeader>

            <CardContent className="pt-6 space-y-4">
              {/* Product Image */}
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>

              {/* Details */}
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Nama Produk</p>
                  <p className="font-bold text-lg text-gray-900">{selectedProduct.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Kategori</p>
                    <p className="font-semibold">{selectedProduct.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Grade</p>
                    <Badge className={`mt-1 text-sm ${
                      selectedProduct.grade === 'A' ? 'bg-green-100 text-green-800' :
                      selectedProduct.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                      selectedProduct.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      Grade {selectedProduct.grade}
                    </Badge>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Deskripsi</p>
                  <p className="text-gray-700">{selectedProduct.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">💰 Harga</p>
                    <p className="font-bold text-lg text-green-600">
                      Rp {selectedProduct.price?.toLocaleString('id')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">📍 Lokasi</p>
                    <p className="font-semibold text-sm">{selectedProduct.location}</p>
                  </div>
                </div>

                {selectedProduct.traceability && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="font-semibold text-gray-900 mb-2">Riwayat Produk</p>
                    <p className="text-sm text-gray-700">{selectedProduct.traceability.usageHistory}</p>
                    {selectedProduct.traceability.condition && (
                      <p className="text-xs text-gray-600 mt-2">
                        <strong>Kondisi:</strong> {selectedProduct.traceability.condition}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Contact Button */}
              <button 
                onClick={() => {
                  if (selectedProduct && selectedProduct.price) {
                    addItem({
                      id: selectedProduct.id,
                      name: selectedProduct.name,
                      price: selectedProduct.price,
                      image: selectedProduct.image,
                      quantity: 1,
                      sellerId: 'seller-id',
                    });
                    alert('✅ Barang ditambahkan ke keranjang!');
                  }
                }}
                className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all font-semibold"
              >
                <i className="fas fa-shopping-cart mr-2"></i>Tambah ke Keranjang
              </button>
              <Link
                href="/cart"
                className="block w-full text-center px-6 py-3 border-2 border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition-all font-semibold"
              >
                <i className="fas fa-checkout mr-2"></i>Lihat Keranjang
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
