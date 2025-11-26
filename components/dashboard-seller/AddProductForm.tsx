"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Product } from "@/lib/seller-state";

interface AddProductFormProps {
  onClose: () => void;
  onAdd: (product: Product) => void;
}

interface LocationData {
  province: string;
  city: string;
  district: string;
  village: string;
  postalCode: string;
  coordinates: string;
  latitude: number;
  longitude: number;
}

const categories = [
  {
    value: "PAKAIAN WANITA",
    subcategories: ["Dress & Rok", "Atasan", "Celana", "Jaket & Sweater", "Sepatu", "Aksesoris"],
  },
  {
    value: "PAKAIAN PRIA",
    subcategories: ["Atasan", "Kemeja", "Celana", "Jaket", "Sepatu", "Aksesoris"],
  },
  {
    value: "ANAK & BAYI",
    subcategories: ["Pakaian Bayi", "Peralatan Bayi", "Pakaian Anak", "Sepatu Anak", "Mainan", "Buku"],
  },
  {
    value: "BARANG DAN PERALATAN",
    subcategories: ["Peralatan Rumah Tangga", "Peralatan Dapur", "Alat Tulis Kantor", "Elektronik", "Buku", "Barang Lain"],
  },
];

// Default location - Malang, Jawa Timur
const defaultLocation: LocationData = {
  province: "Jawa Timur",
  city: "Malang",
  district: "Sukun",
  village: "Kedungkandang",
  postalCode: "65145",
  coordinates: "-7.9797, 112.7338",
  latitude: -7.9797,
  longitude: 112.7338,
};

export default function AddProductForm({ onClose, onAdd }: AddProductFormProps) {
  const [step, setStep] = useState(1);
  const [liveLocation, setLiveLocation] = useState<LocationData>(defaultLocation);
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationMode, setLocationMode] = useState<"gps" | "manual">("gps");
  const [locationConfirmed, setLocationConfirmed] = useState(false);
  const [manualProvince, setManualProvince] = useState("");
  const [manualCity, setManualCity] = useState("");
  const [manualDistrict, setManualDistrict] = useState("");
  const [manualPostalCode, setManualPostalCode] = useState("");
  const [manualFullAddress, setManualFullAddress] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
    description: "",
    location: `${defaultLocation.district}, ${defaultLocation.city}, ${defaultLocation.province}`,
    fullAddress: "",
    uploadDate: new Date().toISOString().split('T')[0],
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
    grade: "B",
    purchasePrice: "",
    price: "",
    suggestedPrice: "",
    traceability: {
      originSource: "",
      purchaseDate: "",
      originalOwner: "",
      usageHistory: "",
      condition: "",
    },
  });

  // Get detailed geolocation on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          try {
            // Use multiple geocoding attempts for better accuracy
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
              {
                headers: { 'Accept': 'application/json' },
              }
            );

            if (!response.ok) throw new Error("Geocoding failed");

            const data = await response.json();
            const address = data.address || {};

            // Extract location details with fallbacks
            const locationData: LocationData = {
              province: address.state || address.province || "Lokasi Tidak Terdeteksi",
              city: address.city || address.town || address.county || address.municipality || "Kota",
              district: address.suburb || address.district || address.neighbourhood || address.village || "Kecamatan",
              village: address.village || address.hamlet || address.quarter || "",
              postalCode: address.postcode || "",
              coordinates: `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
              latitude: parseFloat(latitude.toFixed(8)),
              longitude: parseFloat(longitude.toFixed(8)),
            };

            setLiveLocation(locationData);
            
            // Build full location string with all available details
            const locationParts = [
              locationData.village && locationData.village !== locationData.district ? locationData.village : null,
              locationData.district,
              locationData.city,
              locationData.province,
            ].filter(Boolean);
            
            const fullLocation = locationParts.join(', ');
            
            // Auto-fill manual fields with GPS data
            setManualProvince(locationData.province);
            setManualCity(locationData.city);
            setManualDistrict(locationData.district);
            setManualPostalCode(locationData.postalCode);
            
            // Auto-generate full address suggestion
            const autoAddress = `${locationData.district}, ${locationData.city}`;
            setManualFullAddress(autoAddress);
            
            setFormData(prev => ({ 
              ...prev, 
              location: fullLocation,
              fullAddress: autoAddress
            }));
            setLocationLoading(false);
            
            console.log("✓ Lokasi akurat - Accuracy: " + accuracy + "m");
          } catch (error) {
            console.error("Geocoding error:", error);
            setLocationLoading(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Show error but still allow manual entry
          if (error.code === 1) {
            toast.warning("Izin Akses Ditolak", {
              description: "Mohon izinkan akses lokasi atau gunakan input manual."
            });
          } else if (error.code === 2) {
            toast.warning("Lokasi Tidak Terdeteksi", {
              description: "Coba di area terbuka atau gunakan mode manual."
            });
          } else {
            toast.error("Gagal Mengambil Lokasi", {
              description: "Terjadi kesalahan. Silakan gunakan input manual."
            });
          }
          setLocationLoading(false);
        },
        {
          enableHighAccuracy: true,  // Request high accuracy GPS
          timeout: 10000,            // 10 second timeout
          maximumAge: 0              // Don't use cached position
        }
      );
    } else {
      setLocationLoading(false);
    }
  }, []);

  const selectedCategory = categories.find(c => c.value === formData.category);
  const totalSteps = 5;

  const gradeOptions = [
    { 
      value: "A", 
      label: "Seperti Baru", 
      priceRange: "60–80%", 
      color: "from-green-100 to-green-200", 
      borderColor: "border-green-500",
      bgColor: "bg-green-50",
      description: "Gak ada bekas, kondisi masih oke banget"
    },
    { 
      value: "B", 
      label: "Sangat Baik", 
      priceRange: "40–60%", 
      color: "from-blue-100 to-blue-200", 
      borderColor: "border-blue-500",
      bgColor: "bg-blue-50",
      description: "Dipakai sedikit, defect jarang"
    },
    { 
      value: "C", 
      label: "Layak Pakai", 
      priceRange: "20–40%", 
      color: "from-yellow-100 to-yellow-200", 
      borderColor: "border-yellow-500",
      bgColor: "bg-yellow-50",
      description: "Ada bekas pakai, tapi masih bisa dipake"
    },
    { 
      value: "D", 
      label: "Cukup", 
      priceRange: "≤20%", 
      color: "from-orange-100 to-orange-200", 
      borderColor: "border-orange-500",
      bgColor: "bg-orange-50",
      description: "Banyak bekas, tapi masih fungsi"
    },
  ];

  const selectedGrade = gradeOptions.find(g => g.value === formData.grade);

  // ====== VALIDATION FUNCTIONS ======
  const validateProductName = (name: string): { valid: boolean; message: string } => {
    if (!name.trim()) return { valid: false, message: "Nama barang tidak boleh kosong" };
    if (name.length < 3) return { valid: false, message: "Nama minimal 3 karakter" };
    if (name.length > 100) return { valid: false, message: "Nama maksimal 100 karakter" };
    if (!/^[a-zA-Z0-9\s\-\(\)\u0600-\u06FF]+$/i.test(name)) return { valid: false, message: "Nama hanya boleh huruf, angka, spasi, dan tanda kurung" };
    return { valid: true, message: "✓ Nama barang valid" };
  };

  const validateDescription = (desc: string): { valid: boolean; message: string } => {
    if (!desc.trim()) return { valid: false, message: "Deskripsi tidak boleh kosong" };
    if (desc.length < 10) return { valid: false, message: "Deskripsi minimal 10 karakter" };
    if (desc.length > 200) return { valid: false, message: "Deskripsi maksimal 200 karakter" };
    return { valid: true, message: `✓ Valid (${desc.length}/200)` };
  };

  const validateLocation = (loc: string): { valid: boolean; message: string } => {
    if (!loc.trim()) return { valid: false, message: "Lokasi belum dipilih" };
    return { valid: true, message: "✓ Lokasi tersimpan" };
  };

  const validateFullAddress = (addr: string): { valid: boolean; message: string } => {
    if (!addr.trim()) return { valid: false, message: "Alamat lengkap tidak boleh kosong (minimal kecamatan/jalan)" };
    if (addr.length < 5) return { valid: false, message: "Alamat terlalu pendek (minimal 5 karakter)" };
    if (addr.length > 200) return { valid: false, message: "Alamat maksimal 200 karakter" };
    return { valid: true, message: `✓ Valid (${addr.length}/200)` };
  };

  const validatePrice = (price: string): { valid: boolean; message: string } => {
    const numPrice = parsePriceInput(price);
    if (!price) return { valid: false, message: "Harga tidak boleh kosong" };
    if (numPrice <= 0) return { valid: false, message: "Harga harus lebih dari 0" };
    if (numPrice > 999999999) return { valid: false, message: "Harga terlalu besar (max Rp 999.999.999)" };
    return { valid: true, message: `✓ Rp ${numPrice.toLocaleString('id')}` };
  };

  const validateUsageHistory = (history: string): { valid: boolean; message: string } => {
    if (!history.trim()) return { valid: false, message: "Riwayat pemakaian tidak boleh kosong" };
    if (history.length < 50) return { valid: false, message: `Minimal 50 karakter (${history.length}/50)` };
    if (history.length > 500) return { valid: false, message: "Maksimal 500 karakter" };
    return { valid: true, message: `✓ Valid (${history.length}/500)` };
  };

  // Format price with thousand separator
  const formatPriceInput = (value: string): string => {
    // Remove all non-digit characters
    const cleanValue = value.replace(/\D/g, '');
    if (!cleanValue) return '';
    // Add dot every 3 digits from right
    return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  // Parse formatted price back to number
  const parsePriceInput = (value: string): number => {
    return parseInt(value.replace(/\./g, '')) || 0;
  };

  // Calculate suggested price based on purchase price and grade
  const calculateSuggestedPrice = (purchasePrice: number, grade: string) => {
    const priceRanges: Record<string, [number, number]> = {
      'A': [0.60, 0.80],  // 60-80% untuk Grade A
      'B': [0.40, 0.60],  // 40-60% untuk Grade B
      'C': [0.20, 0.40],  // 20-40% untuk Grade C
      'D': [0.10, 0.20],  // 10-20% untuk Grade D
    };
    
    const range = priceRanges[grade] || [0.40, 0.60];
    const minPrice = Math.round(purchasePrice * range[0]);
    const maxPrice = Math.round(purchasePrice * range[1]);
    const avgPrice = Math.round((minPrice + maxPrice) / 2);
    
    return { minPrice, maxPrice, avgPrice };
  };

  const handleInputChange = (field: string, value: string | any) => {
    if (field.startsWith("traceability.")) {
      const subfield = field.split(".")[1];
      setFormData(prev => ({
        ...prev,
        traceability: {
          ...prev.traceability,
          [subfield]: value
        }
      }));
    } else if (field === "purchasePrice" || field === "price") {
      // Validate and format price input
      const numValue = parsePriceInput(value);
      
      // Validasi: tidak boleh 0 atau minus
      if (numValue <= 0) {
        return; // Skip update if invalid
      }

      const formattedValue = formatPriceInput(value);
      
      if (field === "purchasePrice") {
        // Auto-calculate suggested price when purchase price changes
        setFormData(prev => {
          const suggested = calculateSuggestedPrice(numValue, prev.grade);
          return {
            ...prev,
            [field]: formattedValue,
            suggestedPrice: formatPriceInput(suggested.avgPrice.toString())
          };
        });
      } else {
        // Regular price field
        setFormData(prev => ({ ...prev, [field]: formattedValue }));
      }
    } else if (field === "grade") {
      // Recalculate when grade changes
      setFormData(prev => {
        const updated = { ...prev, [field]: value };
        if (prev.purchasePrice) {
          const parsedPrice = parsePriceInput(prev.purchasePrice);
          const suggested = calculateSuggestedPrice(parsedPrice, value);
          updated.suggestedPrice = formatPriceInput(suggested.avgPrice.toString());
        }
        return updated;
      });
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({ ...prev, category, subcategory: "" }));
  };

  const handleUpdateLocation = () => {
    // Validate all address fields are filled
    const province = locationMode === "gps" ? manualProvince : (manualProvince || liveLocation.province);
    const city = locationMode === "gps" ? manualCity : (manualCity || liveLocation.city);
    const district = locationMode === "gps" ? manualDistrict : (manualDistrict || liveLocation.district);
    const postalCode = locationMode === "gps" ? manualPostalCode : (manualPostalCode || liveLocation.postalCode);
    
    if (!province || !city || !district || !postalCode || !manualFullAddress) {
      toast.error("Alamat Belum Lengkap", {
        description: "Mohon lengkapi semua field alamat (provinsi, kota, kecamatan, kode pos, alamat lengkap)."
      });
      return;
    }
    
    if (manualFullAddress.length < 10) {
      toast.error("Alamat Terlalu Singkat", {
        description: "Alamat lengkap minimal 10 karakter."
      });
      return;
    }
    
    let fullLocation = "";
    
    if (locationMode === "gps") {
      fullLocation = `${district}, ${postalCode}, ${city}, ${province}`;
    } else {
      fullLocation = `${district}, ${postalCode}, ${city}, ${province}`;
    }
    
    setFormData(prev => ({ ...prev, location: fullLocation, fullAddress: manualFullAddress }));
    setLocationConfirmed(true);
    toast.success("Alamat Berhasil Disimpan", {
      description: "Lokasi telah dikonfirmasi. Klik 'Ganti Alamat' jika ingin mengubah."
    });
  };

  const handleAddProduct = () => {
    if (!formData.name || !formData.category || !formData.grade || !formData.purchasePrice || !formData.price || !formData.traceability.usageHistory) {
      toast.error("Data Belum Lengkap", {
        description: "Mohon lengkapi semua field yang wajib diisi (nama, kategori, grade, harga, riwayat)."
      });
      return;
    }

    if (formData.traceability.usageHistory.length < 50) {
      toast.error("Riwayat Pemakaian Terlalu Singkat", {
        description: "Minimal 50 karakter untuk memberikan informasi yang cukup kepada pembeli."
      });
      return;
    }

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      subcategory: formData.subcategory,
      description: formData.description,
      image: formData.image,
      status: "pending-curation",
      uploadedAt: formData.uploadDate,
      location: formData.location,
      fullAddress: formData.fullAddress,
      views: 0,
      sales: 0,
      grade: formData.grade as "A" | "B" | "C" | "D",
      price: parseInt(formData.price) || 0,
      traceability: formData.traceability,
    };

    onAdd(newProduct);
    toast.success("Produk Berhasil Diupload!", {
      description: `${formData.name} telah ditambahkan dan menunggu kurasi.`
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl">
        <Card className="w-full bg-white">
        <CardHeader className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-t-xl relative">
          <button
            onClick={onClose}
            title="Tutup form"
            className="absolute top-4 right-4 text-white hover:bg-white/30 w-10 h-10 flex items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95 z-20 font-bold text-3xl leading-none"
          >
            ×
          </button>
          
          <div className="flex items-center justify-between pr-10">
            <div>
              <CardTitle className="text-xl text-white mb-1">Upload Barang</CardTitle>
              <p className="text-green-100 text-xs">
                Step {step}/{totalSteps}: {
                  step === 1 ? "Kategori & Nama" : 
                  step === 2 ? "Foto, Deskripsi & Lokasi" : 
                  step === 3 ? "Pilih Grade" :
                  step === 4 ? "Harga & Riwayat" :
                  "Review & Submit"
                }
              </p>
            </div>
          </div>
        </CardHeader>

        {/* Progress Bar */}
        <div className="px-6 pt-4 pb-2">
          <div className="flex gap-1.5 h-1.5">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <div key={idx} className="flex-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    idx < step
                      ? "bg-gradient-to-r from-green-500 to-emerald-500"
                      : "bg-gray-200"
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>

        <CardContent className="pt-4 pb-6 max-h-[60vh] overflow-y-auto">
          {/* Step 1: Kategori & Nama */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Barang apa yang mau dijual?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => handleCategoryChange(cat.value)}
                      className={`p-3 rounded-lg border-2 transition-all text-left text-sm font-medium ${
                        formData.category === cat.value
                          ? "border-green-500 bg-green-50 text-green-900"
                          : "border-gray-200 bg-white text-gray-700 hover:border-green-300"
                      }`}
                    >
                      {cat.value}
                    </button>
                  ))}
                </div>
              </div>

              {formData.category && (
                <div className="animate-in fade-in duration-300">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Terus sub kategorinya?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedCategory?.subcategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => handleInputChange("subcategory", sub)}
                        className={`p-2 rounded-lg border-2 transition-all text-xs font-medium ${
                          formData.subcategory === sub
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 bg-white text-gray-700 hover:border-blue-300"
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {formData.category && formData.subcategory && (
                <div className="animate-in fade-in duration-300 space-y-2">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Nama barang (contoh: Jaket Denim Levi's)
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Tulis nama barang kamu"
                      maxLength={100}
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none transition-all text-sm ${
                        formData.name
                          ? validateProductName(formData.name).valid
                            ? "border-green-400 focus:border-green-500 bg-green-50"
                            : "border-red-400 focus:border-red-500 bg-red-50"
                          : "border-gray-300 focus:border-blue-500"
                      }`}
                    />
                    <div className="flex items-center justify-between">
                      <p className={`text-xs font-medium ${
                        formData.name
                          ? validateProductName(formData.name).valid
                            ? "text-green-700"
                            : "text-red-700"
                          : "text-gray-500"
                      }`}>
                        {formData.name ? validateProductName(formData.name).message : "3-100 karakter"}
                      </p>
                      <p className="text-xs text-gray-500">{formData.name.length}/100</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Foto, Deskripsi & Lokasi */}
          {step === 2 && (
            <div className="space-y-4">
              {/* Upload Date */}
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-700 font-semibold mb-1">📅 Tanggal Upload</p>
                <p className="text-sm text-blue-900 font-medium">{new Date(formData.uploadDate).toLocaleDateString('id-ID', { 
                  year: 'numeric', month: 'long', day: 'numeric' 
                })}</p>
                <p className="text-xs text-blue-600 mt-1">Ini tanggal lu upload barang ke sistem, penting untuk verifikasi</p>
              </div>

              {/* Foto Preview */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Foto Barang</label>
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-200 relative group cursor-pointer">
                  <img src={formData.image} alt="preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="text-center">
                      <i className="fas fa-camera text-white text-2xl block mb-1"></i>
                      <p className="text-white text-xs font-semibold">Ganti Foto</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deskripsi */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Jelaskan barangnya gimana
                </label>
                <textarea
                  placeholder="Contoh: jaket denim tebal, ukuran M, warna biru tua, masih bagus, jahitan rapi..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  maxLength={200}
                  rows={3}
                  className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none text-sm resize-none transition-all ${
                    formData.description
                      ? validateDescription(formData.description).valid
                        ? "border-green-400 focus:border-green-500 bg-green-50"
                        : "border-red-400 focus:border-red-500 bg-red-50"
                      : "border-gray-300 focus:border-orange-500"
                  }`}
                />
                <div className="flex items-center justify-between">
                  <p className={`text-xs font-medium ${
                    formData.description
                      ? validateDescription(formData.description).valid
                        ? "text-green-700"
                        : "text-red-700"
                      : "text-gray-500"
                  }`}>
                    {formData.description ? validateDescription(formData.description).message : "Minimal 10 karakter"}
                  </p>
                  <p className="text-xs text-gray-500">{formData.description.length}/200</p>
                </div>
              </div>

              {/* Lokasi DETAIL - Tab based Selection */}
              <div className="space-y-3 bg-yellow-50 p-4 rounded-lg border-2 border-yellow-300">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-yellow-900">📍 Pilih Lokasi Penjualan</p>
                  <p className="text-xs bg-yellow-200 text-yellow-900 px-2 py-1 rounded font-semibold">Step 2 dari 5</p>
                </div>
                <p className="text-xs text-yellow-800">Pilih cara input lokasi yang paling nyaman untuk mu:</p>

                {/* Location Mode Tabs */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setLocationMode("gps")}
                    className={`p-3 rounded-lg border-2 transition-all text-center font-semibold text-sm ${
                      locationMode === "gps"
                        ? "bg-green-500 border-green-600 text-white"
                        : "bg-white border-gray-300 text-gray-700 hover:border-green-400"
                    }`}
                  >
                    <i className="fas fa-location-dot text-lg mb-1 block"></i>
                    GPS Real-time
                  </button>
                  <button
                    onClick={() => setLocationMode("manual")}
                    className={`p-3 rounded-lg border-2 transition-all text-center font-semibold text-sm ${
                      locationMode === "manual"
                        ? "bg-blue-500 border-blue-600 text-white"
                        : "bg-white border-gray-300 text-gray-700 hover:border-blue-400"
                    }`}
                  >
                    <i className="fas fa-pen-to-square text-lg mb-1 block"></i>
                    Input Manual
                  </button>
                </div>

                {/* Location Confirmed - Collapsed View */}
                {locationConfirmed && (
                  <div className="space-y-3 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-2 border-green-400">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-circle-check text-green-600 text-lg"></i>
                        <p className="text-sm font-bold text-green-900">Alamat Terkonfirmasi</p>
                      </div>
                      <button
                        onClick={() => {
                          setLocationConfirmed(false);
                          toast.info("Mode Edit Alamat", {
                            description: "Silakan ubah alamat dan klik 'Gunakan Alamat Ini' lagi."
                          });
                        }}
                        className="px-3 py-1.5 bg-white border-2 border-green-500 text-green-700 rounded-lg font-semibold text-xs hover:bg-green-50 transition-all"
                      >
                        <i className="fas fa-pen-to-square mr-1"></i>
                        Ganti Alamat
                      </button>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-green-300 space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-gray-600 font-medium">Provinsi:</p>
                          <p className="text-gray-900 font-semibold">{manualProvince}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 font-medium">Kota:</p>
                          <p className="text-gray-900 font-semibold">{manualCity}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 font-medium">Kecamatan:</p>
                          <p className="text-gray-900 font-semibold">{manualDistrict}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 font-medium">Kode Pos:</p>
                          <p className="text-gray-900 font-semibold font-mono">{manualPostalCode}</p>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-green-200">
                        <p className="text-gray-600 font-medium text-xs mb-1">Alamat Lengkap:</p>
                        <p className="text-gray-900 text-xs leading-relaxed">{formData.fullAddress}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* GPS Mode - Editable */}
                {!locationConfirmed && locationMode === "gps" && (
                  <div className="space-y-3 bg-white p-3 rounded-lg border border-green-300">
                    {locationLoading ? (
                      <div className="flex flex-col items-center gap-2 py-4 text-center">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-bounce"></span>
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: "0.1s" }}></span>
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                        </div>
                        <p className="text-xs text-green-700 font-semibold">Mengambil lokasi presisi dari GPS...</p>
                        <p className="text-xs text-gray-500">Mohon izinkan akses lokasi di browser</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {/* GPS Coordinates */}
                        <div className="bg-blue-50 p-2.5 rounded-lg border border-blue-300">
                          <p className="text-xs font-bold text-blue-900 mb-2">🛰️ Koordinat Presisi GPS:</p>
                          <p className="text-xs text-blue-700 font-mono leading-relaxed">
                            <strong>Lat:</strong> {liveLocation.latitude.toFixed(8)}° | <strong>Lng:</strong> {liveLocation.longitude.toFixed(8)}°
                          </p>
                          <p className="text-xs text-blue-600 mt-1">Akurat hingga ±1 meter</p>
                        </div>

                        {/* Auto-filled editable fields */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-300 space-y-3">
                          <p className="text-xs font-bold text-green-900">✓ Alamat Otomatis Terdeteksi (Bisa diedit):</p>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-xs font-semibold text-gray-700 block mb-1">Provinsi *</label>
                              <input
                                type="text"
                                value={manualProvince}
                                onChange={(e) => setManualProvince(e.target.value)}
                                className="w-full px-2.5 py-2 border-2 border-green-400 rounded-lg focus:outline-none focus:border-green-500 text-xs bg-white"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-gray-700 block mb-1">Kota/Kabupaten *</label>
                              <input
                                type="text"
                                value={manualCity}
                                onChange={(e) => setManualCity(e.target.value)}
                                className="w-full px-2.5 py-2 border-2 border-green-400 rounded-lg focus:outline-none focus:border-green-500 text-xs bg-white"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-xs font-semibold text-gray-700 block mb-1">Kecamatan *</label>
                              <input
                                type="text"
                                value={manualDistrict}
                                onChange={(e) => setManualDistrict(e.target.value)}
                                className="w-full px-2.5 py-2 border-2 border-green-400 rounded-lg focus:outline-none focus:border-green-500 text-xs bg-white"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-gray-700 block mb-1">Kode Pos *</label>
                              <input
                                type="text"
                                placeholder="Contoh: 65139"
                                value={manualPostalCode}
                                onChange={(e) => setManualPostalCode(e.target.value)}
                                maxLength={5}
                                className="w-full px-2.5 py-2 border-2 border-green-400 rounded-lg focus:outline-none focus:border-green-500 text-xs bg-white"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-xs font-semibold text-gray-700 mb-1 block">📬 Alamat Lengkap *</label>
                            <textarea
                              placeholder="Contoh: Jl. Ahmad Yani No. 45, RT 03/RW 02"
                              value={manualFullAddress}
                              onChange={(e) => setManualFullAddress(e.target.value)}
                              maxLength={200}
                              rows={2}
                              className={`w-full px-2.5 py-2 border-2 rounded-lg focus:outline-none text-xs resize-none transition-all ${
                                manualFullAddress
                                  ? validateFullAddress(manualFullAddress).valid
                                    ? "border-green-400 focus:border-green-500 bg-white"
                                    : "border-red-400 focus:border-red-500 bg-red-50"
                                  : "border-green-400 focus:border-green-500 bg-white"
                              }`}
                            />
                            <div className="flex items-center justify-between mt-1">
                              <p className={`text-xs font-medium ${
                                manualFullAddress
                                  ? validateFullAddress(manualFullAddress).valid
                                    ? "text-green-700"
                                    : "text-red-700"
                                  : "text-gray-500"
                              }`}>
                                {manualFullAddress ? validateFullAddress(manualFullAddress).message : "Minimal 10 karakter"}
                              </p>
                              <p className="text-xs text-gray-500">{manualFullAddress.length}/200</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={handleUpdateLocation}
                            className="flex-1 px-3 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold text-sm hover:from-green-600 hover:to-emerald-600 transition-all"
                          >
                            ✓ Gunakan Alamat Ini
                          </button>
                          <button
                            onClick={() => setLocationMode("manual")}
                            className="px-4 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold text-sm hover:border-blue-500 hover:text-blue-600 transition-all"
                          >
                            <i className="fas fa-pen-to-square mr-1"></i>
                            Ganti Alamat
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Manual Mode */}
                {!locationConfirmed && locationMode === "manual" && (
                  <div className="space-y-3 bg-white p-3 rounded-lg border border-blue-300">
                    <p className="text-xs text-blue-700 font-semibold">✍️ Isi lokasi mu secara manual:</p>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-semibold text-gray-700 block mb-1">Provinsi *</label>
                        <input
                          type="text"
                          placeholder="Contoh: Jawa Timur"
                          value={manualProvince || liveLocation.province}
                          onChange={(e) => setManualProvince(e.target.value)}
                          className="w-full px-2.5 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-700 block mb-1">Kota/Kabupaten *</label>
                        <input
                          type="text"
                          placeholder="Contoh: Malang"
                          value={manualCity}
                          onChange={(e) => setManualCity(e.target.value)}
                          className="w-full px-2.5 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-semibold text-gray-700 block mb-1">Kecamatan *</label>
                        <input
                          type="text"
                          placeholder="Contoh: Sukun"
                          value={manualDistrict}
                          onChange={(e) => setManualDistrict(e.target.value)}
                          className="w-full px-2.5 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-700 block mb-1">Kode Pos *</label>
                        <input
                          type="text"
                          placeholder="Contoh: 65145"
                          value={manualPostalCode}
                          onChange={(e) => setManualPostalCode(e.target.value)}
                          maxLength={5}
                          className="w-full px-2.5 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-700 block mb-1">📬 Alamat Lengkap *</label>
                      <textarea
                        placeholder="Contoh: Jl. Ahmad Yani No. 45, RT 03/RW 02, Kelurahan Madyopuro"
                        value={manualFullAddress}
                        onChange={(e) => setManualFullAddress(e.target.value)}
                        maxLength={200}
                        rows={3}
                        className={`w-full px-2.5 py-2 border-2 rounded-lg focus:outline-none text-xs resize-none transition-all ${
                          manualFullAddress
                            ? validateFullAddress(manualFullAddress).valid
                              ? "border-green-400 focus:border-green-500 bg-green-50"
                              : "border-red-400 focus:border-red-500 bg-red-50"
                            : "border-gray-300 focus:border-blue-500"
                        }`}
                      />
                      <div className="flex items-center justify-between mt-1">
                        <p className={`text-xs font-medium ${
                          manualFullAddress
                            ? validateFullAddress(manualFullAddress).valid
                              ? "text-green-700"
                              : "text-red-700"
                            : "text-gray-500"
                        }`}>
                          {manualFullAddress ? validateFullAddress(manualFullAddress).message : "Minimal 5 karakter"}
                        </p>
                        <p className="text-xs text-gray-500">{manualFullAddress.length}/200</p>
                      </div>
                    </div>

                    <button
                      onClick={handleUpdateLocation}
                      className="w-full px-3 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold text-sm hover:from-blue-600 hover:to-cyan-600 transition-all"
                    >
                      ✓ Simpan Lokasi Manual
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Grade */}
          {step === 3 && (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-800">Kondisi barang kamu yang mana?</p>
              {gradeOptions.map((grade) => (
                <button
                  key={grade.value}
                  onClick={() => handleInputChange("grade", grade.value)}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    formData.grade === grade.value
                      ? `${grade.borderColor} bg-gradient-to-r ${grade.color}`
                      : `border-gray-200 ${grade.bgColor} hover:border-gray-300`
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-bold text-sm text-gray-900">Grade {grade.value}: {grade.label}</p>
                      <p className="text-xs text-gray-700 mt-0.5">{grade.description}</p>
                      <p className="text-xs text-gray-600 mt-1">💰 Harga: {grade.priceRange} dari harga normal</p>
                    </div>
                    {formData.grade === grade.value && (
                      <i className="fas fa-check-circle text-green-600 text-lg flex-shrink-0 ml-2"></i>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Step 4: Harga & Riwayat */}
          {step === 4 && (
            <div className="space-y-4">
              {/* Harga Beli */}
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                <label className="block text-sm font-semibold text-purple-900 mb-2">
                  💵 Harga Beli / Retail (Rp)
                </label>
                <p className="text-xs text-purple-700 mb-2">
                  Berapa harga normal/retail dari barang ini? Nanti kami hitung harga jual berdasarkan grade & persentase ini 👇
                </p>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Contoh: 500.000"
                  value={formData.purchasePrice}
                  onChange={(e) => handleInputChange("purchasePrice", e.target.value)}
                  className="w-full px-3 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-600 text-sm font-semibold"
                />
              </div>

              {/* Suggested Price Display */}
              {formData.purchasePrice && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border-2 border-green-300">
                  <p className="text-sm font-bold text-green-900 mb-2">💚 Harga Jual yang Disarankan:</p>
                  {(() => {
                    const parsedPrice = parsePriceInput(formData.purchasePrice);
                    const suggested = calculateSuggestedPrice(parsedPrice, formData.grade);
                    return (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-green-700">Grade {formData.grade}:</span>
                          <span className="text-xs font-semibold text-green-700">{selectedGrade?.priceRange} dari harga retail</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-2 rounded border border-green-200">
                          <span className="text-xs text-gray-700">💚 Rekomendasi:</span>
                          <span className="text-lg font-bold text-green-600">Rp {suggested.avgPrice.toLocaleString('id')}</span>
                        </div>
                        <p className="text-xs text-green-600">
                          Range: Rp {suggested.minPrice.toLocaleString('id')} - Rp {suggested.maxPrice.toLocaleString('id')}
                        </p>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Harga Jual */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  🏷️ Harga Jual Akhir (Rp) - Bisa berbeda dari rekomendasi
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder={`Contoh: ${formData.suggestedPrice ? formData.suggestedPrice : "250.000"}`}
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none text-sm font-semibold transition-all ${
                    formData.price
                      ? validatePrice(formData.price).valid
                        ? "border-green-400 focus:border-green-500 bg-green-50"
                        : "border-red-400 focus:border-red-500 bg-red-50"
                      : "border-gray-300 focus:border-green-500"
                  }`}
                />
                <p className={`text-xs font-medium ${
                  formData.price
                    ? validatePrice(formData.price).valid
                      ? "text-green-700"
                      : "text-red-700"
                    : "text-gray-500"
                }`}>
                  {formData.price ? validatePrice(formData.price).message : "Harga jual akhir"}
                </p>
              </div>

              {/* Riwayat Pemakaian */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  📋 Riwayat Pemakaian & Kondisi
                </label>
                <p className="text-xs text-gray-600 mb-2">
                  Jelaskan gimana barangnya: kapan beli, berapa lama dipakai, ada kerusakan apa, pernah repair, kondisi sekarang, dll. Ini penting buat pembeli percaya!
                </p>
                <textarea
                  placeholder="Contoh: Punya dari 2020, dipakai di rumah doang, jahitan masih bagus, gak ada lecet, aroma normal, kondisi masih like new..."
                  value={formData.traceability.usageHistory}
                  onChange={(e) => handleInputChange("traceability.usageHistory", e.target.value)}
                  maxLength={500}
                  rows={4}
                  className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none text-sm resize-none transition-all ${
                    formData.traceability.usageHistory
                      ? validateUsageHistory(formData.traceability.usageHistory).valid
                        ? "border-green-400 focus:border-green-500 bg-green-50"
                        : "border-orange-400 focus:border-orange-500 bg-orange-50"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                />
                <div className="flex items-center justify-between">
                  <p className={`text-xs font-medium ${
                    formData.traceability.usageHistory
                      ? validateUsageHistory(formData.traceability.usageHistory).valid
                        ? "text-green-700"
                        : "text-orange-700"
                      : "text-gray-500"
                  }`}>
                    {formData.traceability.usageHistory ? validateUsageHistory(formData.traceability.usageHistory).message : "Minimal 50 karakter"}
                  </p>
                  <p className="text-xs text-gray-500">{formData.traceability.usageHistory.length}/500</p>
                </div>
              </div>

              {/* Optional fields */}
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-xs space-y-2">
                <p className="font-semibold text-gray-800">📝 Info Tambahan (Opsional):</p>
                
                <div>
                  <label className="text-gray-600 font-medium block mb-1">Siapa pemilik sebelumnya?</label>
                  <input
                    type="text"
                    placeholder="Misal: punya sendiri, beli dari teman, atau punya keluarga"
                    value={formData.traceability.originalOwner}
                    onChange={(e) => handleInputChange("traceability.originalOwner", e.target.value)}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs"
                  />
                </div>

                <div>
                  <label className="text-gray-600 font-medium block mb-1">Kapan dibeli? (tanggal beli awal)</label>
                  <input
                    type="date"
                    value={formData.traceability.purchaseDate}
                    onChange={(e) => handleInputChange("traceability.purchaseDate", e.target.value)}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs"
                  />
                  <p className="text-xs text-gray-500 mt-0.5">Buat tracking pemakaian, berapa lama barang udah di tangan</p>
                </div>

                <div>
                  <label className="text-gray-600 font-medium block mb-1">Kondisi/Catatan khusus</label>
                  <input
                    type="text"
                    placeholder="Misal: lengkap dengan label, ada noda kecil, atau perfect condition"
                    value={formData.traceability.condition}
                    onChange={(e) => handleInputChange("traceability.condition", e.target.value)}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {step === 5 && (
            <div className="space-y-3">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="font-bold text-gray-900 mb-3 text-sm">✓ Cek lagi sebelum upload:</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1 border-b border-green-100">
                    <span className="text-gray-600">Nama:</span>
                    <span className="font-semibold">{formData.name}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-green-100">
                    <span className="text-gray-600">Kategori:</span>
                    <span className="font-semibold">{formData.category}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-green-100">
                    <span className="text-gray-600">Grade:</span>
                    <span className="font-semibold text-green-600">Grade {formData.grade}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-green-100">
                    <span className="text-gray-600">💵 Harga Beli:</span>
                    <span className="font-bold text-purple-600">Rp {parsePriceInput(formData.purchasePrice).toLocaleString('id')}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-green-100">
                    <span className="text-gray-600">💚 Saran Harga Jual:</span>
                    <span className="font-semibold text-green-600">Rp {parsePriceInput(formData.suggestedPrice).toLocaleString('id')}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-green-100">
                    <span className="text-gray-600">🏷️ Harga Jual Akhir:</span>
                    <span className="font-bold text-lg text-green-600">Rp {parsePriceInput(formData.price).toLocaleString('id')}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-green-100">
                    <span className="text-gray-600">Lokasi:</span>
                    <span className="font-semibold text-right text-xs">{formData.location}</span>
                  </div>
                  {formData.fullAddress && (
                    <div className="py-1">
                      <p className="text-gray-600 mb-0.5">📬 Alamat Lengkap:</p>
                      <p className="font-semibold text-xs text-right">{formData.fullAddress}</p>
                    </div>
                  )}
                  <div className="py-1">
                    <p className="text-gray-600 mb-1">Riwayat: <span className="font-semibold">{formData.traceability.usageHistory.substring(0, 60)}...</span></p>
                  </div>
                </div>

                <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200 text-xs text-blue-700">
                  <i className="fas fa-info-circle mr-1"></i>
                  Barang kamu bakal masuk kurasi dulu, kami verifikasi 24 jam. Harga jual bakal dibandingin dengan market price untuk fairness. Gausah khawatir!
                </div>
              </div>
            </div>
          )}
        </CardContent>

        {/* Footer */}
        <div className="border-t bg-gray-50 px-6 py-3 rounded-b-xl flex gap-2 justify-between sticky bottom-0">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : onClose()}
            className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-sm transition-all"
          >
            {step > 1 ? "← Kembali" : "Batal"}
          </button>

          <button
            onClick={() => {
              if (step === 2 && !locationConfirmed) {
                toast.warning("Konfirmasi Alamat Dulu", {
                  description: "Klik tombol '✓ Gunakan Alamat Ini' untuk mengunci alamat sebelum lanjut."
                });
                return;
              }
              step < totalSteps ? setStep(step + 1) : handleAddProduct();
            }}
            disabled={
              (step === 1 && (!formData.category || !formData.subcategory || !validateProductName(formData.name).valid)) ||
              (step === 2 && (!validateDescription(formData.description).valid || !locationConfirmed)) ||
              (step === 3 && !formData.grade) ||
              (step === 4 && (!validatePrice(formData.purchasePrice).valid || !validatePrice(formData.price).valid || !validateUsageHistory(formData.traceability.usageHistory).valid)) ||
              (step === 5 && false)
            }
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all disabled:opacity-50 text-sm"
          >
            {step < totalSteps ? "Lanjut →" : "Upload Sekarang"}
          </button>
        </div>
      </Card>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-in {
          animation: fadeIn 0.2s ease-in;
        }
      `}</style>
        </div>
    </div>
  );
}

