"use client";

import { useEffect, useRef } from "react";

// Declare Leaflet as global (loaded via CDN in layout)
declare global {
  interface Window {
    L: any;
  }
}

export default function TrackingPage() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for Leaflet to be available from CDN
    const initMap = () => {
      if (typeof window !== "undefined" && window.L && mapRef.current) {
        const L = window.L;
        const map = L.map(mapRef.current).setView([-6.2088, 106.8456], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(map);

        L.marker([-6.2088, 106.8456])
          .addTo(map)
          .bindPopup("Lokasi Paket Saat Ini")
          .openPopup();
      } else if (typeof window !== "undefined") {
        // Retry if Leaflet not loaded yet
        setTimeout(initMap, 100);
      }
    };

    initMap();
  }, []);

  const trackingSteps = [
    {
      title: "Pesanan Diterima",
      date: "15 Jan 2024, 10:30 WIB",
      description: "Pesanan Anda telah diterima dan sedang diproses",
      completed: true,
      icon: "fa-check",
    },
    {
      title: "Pesanan Diproses",
      date: "15 Jan 2024, 14:15 WIB",
      description: "Pesanan sedang dikemas oleh penjual",
      completed: true,
      icon: "fa-check",
    },
    {
      title: "Pesanan Dikirim",
      date: "16 Jan 2024, 09:00 WIB",
      description: "Pesanan telah diambil oleh kurir",
      completed: true,
      icon: "fa-check",
    },
    {
      title: "Dalam Pengiriman",
      date: "Estimasi: 17 Jan 2024",
      description: "Pesanan sedang dalam perjalanan ke alamat Anda",
      completed: false,
      icon: "fa-truck",
      current: true,
    },
    {
      title: "Terkirim",
      date: "-",
      description: "Menunggu pesanan sampai",
      completed: false,
      icon: "fa-home",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Lacak Pesanan
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Masukkan Kode Pesanan
          </label>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Contoh: #ORD-001234"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Lacak
            </button>
          </div>
        </div>

        {/* Tracking Map */}
        <div
          ref={mapRef}
          className="h-96 rounded-lg mb-6 bg-gray-100"
          id="tracking-map"
        ></div>

        {/* Tracking Timeline */}
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-green-200"></div>

          <div className="space-y-8">
            {trackingSteps.map((step, index) => (
              <div key={index} className="flex items-start">
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed
                      ? "bg-green-600"
                      : step.current
                      ? "bg-green-200"
                      : "bg-gray-200"
                  }`}
                >
                  <i
                    className={`fas ${step.icon} text-sm ${
                      step.completed
                        ? "text-white"
                        : step.current
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  ></i>
                </div>
                <div className="ml-6">
                  <p
                    className={`font-medium ${
                      step.completed || step.current
                        ? "text-gray-800"
                        : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p
                    className={`text-sm ${
                      step.completed || step.current
                        ? "text-gray-600"
                        : "text-gray-400"
                    }`}
                  >
                    {step.date}
                  </p>
                  <p
                    className={`text-sm mt-1 ${
                      step.completed || step.current
                        ? "text-gray-500"
                        : "text-gray-400"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
