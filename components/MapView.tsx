'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import LoadingSpinner from './LoadingSpinner';

// Dynamic import para hindi error sa SSR
const MapContainer = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then(mod => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then(mod => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then(mod => mod.Popup),
  { ssr: false }
);
const CircleMarker = dynamic(
  () => import('react-leaflet').then(mod => mod.CircleMarker),
  { ssr: false }
);

interface MapProduct {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  city: string;
  grade?: string;
  price?: number;
}

interface MapViewProps {
  products?: MapProduct[];
  center?: [number, number];
  zoom?: number;
  height?: string;
}

export default function MapView({ 
  products = [], 
  center = [-7.9797, 112.7338],
  zoom = 12,
  height = 'h-96'
}: MapViewProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className={`${height} bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg flex items-center justify-center`}>
        <LoadingSpinner size="md" text="Memuat peta..." />
      </div>
    );
  }

  const getGradeColor = (grade?: string) => {
    switch(grade) {
      case 'A': return '#10b981'; // green
      case 'B': return '#3b82f6'; // blue
      case 'C': return '#eab308'; // yellow
      case 'D': return '#f97316'; // orange
      default: return '#8b5cf6'; // purple
    }
  };

  return (
    <div className={`${height} rounded-lg overflow-hidden shadow-lg border border-gray-200`}>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {products.map((product) => (
          <CircleMarker
            key={product.id}
            center={[product.latitude, product.longitude]}
            radius={10}
            fillColor={getGradeColor(product.grade)}
            color={getGradeColor(product.grade)}
            weight={2}
            opacity={0.8}
            fillOpacity={0.7}
          >
            <Popup>
              <div className="text-sm font-sans">
                <p className="font-bold text-gray-900 mb-1">{product.name}</p>
                <p className="text-xs text-gray-600 mb-1">📍 {product.city}</p>
                {product.grade && (
                  <p className="text-xs text-gray-600 mb-1">
                    ⭐ Grade: <span className="font-semibold">{product.grade}</span>
                  </p>
                )}
                {product.price && (
                  <p className="text-xs font-semibold text-green-600">
                    💰 Rp {product.price.toLocaleString('id')}
                  </p>
                )}
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
