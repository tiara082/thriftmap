"use client";

export default function DashboardTracking() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Lacak Pesanan</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Masukkan nomor resi..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold">
            Lacak
          </button>
        </div>

        <div className="space-y-4">
          {[
            { status: "Pesanan Diterima", date: "25 Nov 2025, 10:00", icon: "check-circle", active: true },
            { status: "Diproses", date: "25 Nov 2025, 14:30", icon: "box", active: true },
            { status: "Dikirim", date: "26 Nov 2025, 09:00", icon: "truck", active: true },
            { status: "Dalam Pengiriman", date: "-", icon: "map-marker-alt", active: false },
            { status: "Sampai Tujuan", date: "-", icon: "home", active: false },
          ].map((step, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step.active ? "bg-green-500 text-white" : "bg-gray-200 text-gray-400"}`}>
                  <i className={`fas fa-${step.icon}`}></i>
                </div>
                {idx < 4 && (
                  <div className={`w-0.5 h-12 ${step.active ? "bg-green-500" : "bg-gray-200"}`}></div>
                )}
              </div>
              <div className="flex-1 pb-8">
                <p className={`font-semibold ${step.active ? "text-gray-900" : "text-gray-400"}`}>
                  {step.status}
                </p>
                <p className="text-sm text-gray-500 mt-1">{step.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
