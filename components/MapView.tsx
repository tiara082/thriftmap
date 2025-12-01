'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import LoadingSpinner from './LoadingSpinner';
import type { Product } from "@/lib/product-data";

interface MapViewProps {
  products?: Product[];
}

// Haversine formula untuk hitung jarak antara 2 koordinat (km)
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius bumi dalam km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);

export default function MapView({ products = [] }: MapViewProps) {
  const [isClient, setIsClient] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [radiusKm, setRadiusKm] = useState(20);

  useEffect(() => {
    setIsClient(true);
    
    // Get user's realtime location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLocationError('Tidak bisa mengakses lokasi. Menampilkan semua produk.');
          setIsLoadingLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setLocationError('Browser tidak support geolocation.');
      setIsLoadingLocation(false);
    }
  }, []);

  if (!isClient) {
    return (
      <div className="h-[700px] bg-gradient-to-br from-emerald-50 to-lime-50 rounded-2xl flex items-center justify-center">
        <LoadingSpinner size="lg" text="Memuat peta produk..." />
      </div>
    );
  }

  if (isLoadingLocation) {
    return (
      <div className="h-[700px] bg-gradient-to-br from-emerald-50 to-lime-50 rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" text="Mendapatkan lokasi Anda..." />
          <p className="text-sm text-emerald-700 mt-4 font-semibold">📍 Mengakses GPS...</p>
        </div>
      </div>
    );
  }

  // Filter products yang punya koordinat real
  let productsWithCoords = products.filter(
    (product) => product.latitude && product.longitude
  );

  // Filter berdasarkan search query (kategori)
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    productsWithCoords = productsWithCoords.filter((product) => 
      product.category?.toLowerCase().includes(query) ||
      product.name?.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query)
    );
  }

  // TAMPILKAN SEMUA PRODUK - radius hanya untuk info jarak
  let displayProducts: (Product & { distance?: number })[] = productsWithCoords;
  
  if (userLocation) {
    // Hitung jarak semua produk dari user
    displayProducts = productsWithCoords
      .map((product) => ({
        ...product,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          product.latitude!,
          product.longitude!
        )
      }))
      .sort((a, b) => a.distance! - b.distance!); // Sort by nearest first
  }
  
  // Filter untuk hitung produk dalam radius (untuk info saja)
  const productsInRadius = displayProducts.filter(p => !p.distance || p.distance <= radiusKm);

  // Calculate center based on user location or products
  const center: [number, number] = userLocation
    ? [userLocation.lat, userLocation.lng]
    : displayProducts.length > 0
    ? [
        displayProducts.reduce((sum, p) => sum + (p.latitude || 0), 0) / displayProducts.length,
        displayProducts.reduce((sum, p) => sum + (p.longitude || 0), 0) / displayProducts.length
      ]
    : [-2.5489, 118.0149]; // Indonesia center

  // Auto zoom based on product spread
  const getZoomLevel = () => {
    if (displayProducts.length <= 1) return 13;
    
    const lats = displayProducts.map(p => p.latitude || 0);
    const lngs = displayProducts.map(p => p.longitude || 0);
    const latSpread = Math.max(...lats) - Math.min(...lats);
    const lngSpread = Math.max(...lngs) - Math.min(...lngs);
    const maxSpread = Math.max(latSpread, lngSpread);
    
    if (maxSpread < 0.1) return 12;
    if (maxSpread < 0.5) return 10;
    if (maxSpread < 2) return 8;
    if (maxSpread < 5) return 7;
    return 6;
  };

  return (
    <>
      {/* Search Bar & Radius Control */}
      <div className="mb-4 bg-white border-2 border-emerald-100 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Cari berdasarkan kategori: Women, Men, Kids, Accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-semibold text-sm"
            />
          </div>
          <button
            onClick={() => setSearchQuery('')}
            className="px-6 py-3 bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-lg"
          >
            Reset
          </button>
        </div>
        
        {/* Quick Category Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {['Women', 'Men', 'Kids', 'Accessories'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSearchQuery(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                searchQuery.toLowerCase() === cat.toLowerCase()
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg scale-105'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Radius Control */}
        {userLocation && (
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📏</span>
                <div>
                  <h4 className="text-sm font-black text-slate-900">Radius Info</h4>
                  <p className="text-xs text-slate-600">Hitung berapa produk dalam radius ini (semua tetap ditampilkan)</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-blue-600">{radiusKm} km</p>
              </div>
            </div>
            
            {/* Radius Slider */}
            <input
              type="range"
              min="1"
              max="25"
              value={radiusKm}
              onChange={(e) => setRadiusKm(Number(e.target.value))}
              className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            
            {/* Quick Radius Buttons */}
            <div className="flex gap-2 mt-3">
              {[5, 10, 15, 20, 25].map((km) => (
                <button
                  key={km}
                  onClick={() => setRadiusKm(km)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    radiusKm === km
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg scale-105'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  {km}km
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Info banner */}
      {displayProducts.length > 0 && (
        <div className="mb-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                <span className="text-xl">🗺️</span>
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900">
                  {searchQuery ? `Menampilkan ${displayProducts.length} produk "${searchQuery}"` : `Menampilkan ${displayProducts.length} produk`}
                </h4>
                <p className="text-xs text-slate-600 font-semibold">
                  {userLocation ? (
                    <>
                      📏 {productsInRadius.length} produk dalam radius {radiusKm}km | Sisanya diluar radius
                    </>
                  ) : (
                    'Semua produk ditampilkan di map'
                  )}
                </p>
              </div>
            </div>
            {userLocation && (
              <div className="text-right">
                <p className="text-xs text-emerald-700 font-bold">🎯 GPS Aktif</p>
                <p className="text-[10px] text-slate-500">
                  {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* No products found */}
      {displayProducts.length === 0 && (
        <div className="mb-4 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
              <span className="text-xl">❌</span>
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900">Tidak Ada Produk Ditemukan</h4>
              <p className="text-xs text-slate-600 font-semibold">
                Tidak ada produk {searchQuery && `"${searchQuery}" `}yang tersedia.
              </p>
              <p className="text-[10px] text-red-700 mt-1 font-bold">
                💡 Coba: Reset kategori pencarian
              </p>
            </div>
          </div>
        </div>
      )}

      {locationError && (
        <div className="mb-4 bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h4 className="text-sm font-black text-slate-900">Lokasi Tidak Tersedia</h4>
              <p className="text-xs text-slate-600">{locationError}</p>
            </div>
          </div>
        </div>
      )}

      <div className="h-[700px] rounded-2xl overflow-hidden shadow-xl border-2 border-emerald-100">
        <MapContainer 
          center={center} 
          zoom={getZoomLevel()} 
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* User location marker & radius circle */}
          {userLocation && (
            <>
              {/* Radius Circle */}
              <Circle
                center={[userLocation.lat, userLocation.lng]}
                radius={radiusKm * 1000} // convert km to meters
                pathOptions={{
                  fillColor: '#3b82f6',
                  fillOpacity: 0.1,
                  color: '#3b82f6',
                  weight: 2,
                  opacity: 0.5,
                  dashArray: '10, 10'
                }}
              />
              
              {/* User Location Pin */}
              <CircleMarker
                center={[userLocation.lat, userLocation.lng]}
                radius={15}
                fillColor="#3b82f6"
                color="#1e40af"
                weight={4}
                opacity={1}
                fillOpacity={0.7}
              >
                <Popup>
                  <div className="text-center font-sans">
                    <p className="text-2xl mb-2">📍</p>
                    <p className="text-sm font-black text-blue-600">Lokasi Anda</p>
                    <p className="text-xs text-slate-600 mt-1">
                      {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
                    </p>
                    <div className="mt-2 pt-2 border-t border-blue-200">
                      <p className="text-[10px] text-slate-500 font-semibold">
                        Radius pencarian: {radiusKm}km
                      </p>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            </>
          )}
          
          {displayProducts.map((product) => {
            const isInRadius = !product.distance || product.distance <= radiusKm;
            return (
              <CircleMarker
                key={product.id}
                center={[product.latitude!, product.longitude!]}
                radius={isInRadius ? 14 : 10}
                fillColor={isInRadius ? "#10b981" : "#f59e0b"}
                color={isInRadius ? "#10b981" : "#f59e0b"}
                weight={isInRadius ? 4 : 2}
                opacity={1}
                fillOpacity={isInRadius ? 0.8 : 0.6}
              >
                <Popup maxWidth={300}>
                  <div className="font-sans">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-36 object-cover rounded-xl mb-3"
                    />
                    <div className="flex items-center justify-between mb-2">
                      <div className={`inline-block text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        isInRadius ? 'bg-emerald-600' : 'bg-amber-600'
                      }`}>
                        {product.category}
                      </div>
                    {product.shopLocation && (
                      <div className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                        📍 {product.shopLocation}
                      </div>
                    )}
                  </div>
                  <h3 className="text-base font-black text-slate-900 mb-2 leading-tight">
                    {product.name}
                  </h3>
                  {product.shopName && (
                    <p className="text-[11px] text-slate-500 mb-2 font-medium">
                      🏪 {product.shopName}
                    </p>
                  )}
                  <p className="text-xs text-slate-600 mb-3 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  {product.distance !== undefined && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 mb-3">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm">📏</span>
                        <span className="text-xs font-black text-blue-700">
                          {product.distance < 1 
                            ? `${(product.distance * 1000).toFixed(0)}m dari Anda`
                            : `${product.distance.toFixed(1)}km dari Anda`
                          }
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-black text-emerald-600">
                      {formatCurrency(product.price)}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500">
                      <span className="text-sm">⭐</span>
                      <span className="text-xs font-bold">{product.rating || 4.5}</span>
                    </div>
                  </div>
                  <a 
                    href={`/dashboard-user/products/${product.id}`}
                    className={`block w-full text-center text-white py-2.5 rounded-xl text-xs font-bold shadow-lg hover:shadow-xl transition-all duration-300 ${
                      isInRadius 
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600'
                        : 'bg-gradient-to-r from-amber-600 to-orange-600'
                    }`}
                  >
                    👀 Lihat Detail Produk
                  </a>
                </div>
              </Popup>
            </CircleMarker>
            );
          })}
        </MapContainer>
      </div>
      
      <style jsx global>{`
        .leaflet-popup-content-wrapper {
          border-radius: 16px !important;
          padding: 16px !important;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15) !important;
          border: 2px solid #d1fae5 !important;
        }
        .leaflet-popup-tip {
          background: white !important;
          border-right: 2px solid #d1fae5 !important;
          border-bottom: 2px solid #d1fae5 !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
          min-width: 260px !important;
        }
      `}</style>
    </>
  );
}
