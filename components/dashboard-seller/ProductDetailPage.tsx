"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import type { Product } from "@/lib/seller-state";

const gradeConfig: Record<
  string,
  { color: string; label: string; description: string }
> = {
  "A": {
    color: "bg-green-100 text-green-800 border-green-200",
    label: "Grade A - Excellent",
    description: "Kondisi sempurna, minimal wear, authentic",
  },
  "B": {
    color: "bg-blue-100 text-blue-800 border-blue-200",
    label: "Grade B - Good",
    description: "Kondisi bagus, slight wear, fungsi optimal",
  },
  "C": {
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    label: "Grade C - Fair",
    description: "Layak pakai, moderate wear, defects minor",
  },
  "D": {
    color: "bg-orange-100 text-orange-800 border-orange-200",
    label: "Grade D - Poor",
    description: "Hanya untuk yang sadar kondisi, significant wear",
  },
};

interface ProductDetailPageProps {
  product: Product;
  mode: "view" | "edit";
  onClose: () => void;
  onSave?: (product: Product) => void;
  onDelete?: () => void;
}

export default function ProductDetailPage({
  product: initialProduct,
  mode,
  onClose,
  onSave,
  onDelete,
}: ProductDetailPageProps) {
  const [product, setProduct] = useState<Product>(initialProduct);
  const [isEditing, setIsEditing] = useState(mode === "edit");
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (
    field: keyof Product,
    value: any
  ) => {
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      if (onSave) {
        onSave(product);
      }
      setIsSaving(false);
      setIsEditing(false);
    }, 500);
  };

  const handleDelete = async () => {
    toast.error("Hapus Produk?", {
      description: "Tindakan ini tidak dapat dibatalkan.",
      action: {
        label: "Hapus",
        onClick: () => {
          if (onDelete) {
            onDelete();
            toast.success("Produk Berhasil Dihapus", {
              description: `${product.name} telah dihapus dari daftar produk.`
            });
          }
          onClose();
        },
      },
      cancel: {
        label: "Batal",
        onClick: () => {},
      },
    });
  };

  const statusInfo = [
    { label: "Status Kurasi", value: product.status },
    ...(product.grade ? [{ label: "Grade", value: product.grade }] : []),
    ...(product.views ? [{ label: "Total Views", value: product.views }] : []),
    ...(product.sales ? [{ label: "Total Penjualan", value: product.sales }] : []),
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <Card className="w-full max-w-4xl border-0 shadow-2xl my-8">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-xl flex flex-row items-center justify-between space-y-0 pb-4 border-b border-gray-200">
          <div className="flex-1">
            <CardTitle className="text-2xl mb-2">
              {isEditing ? "Edit Produk" : "Detail Produk"}
            </CardTitle>
            <p className="text-sm text-gray-600">
              {isEditing
                ? "Ubah informasi produk Anda"
                : "Lihat dan kelola detail produk"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors"
          >
            <i className="fas fa-times"></i>
          </button>
        </CardHeader>

        <CardContent className="pt-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Image Section */}
            <div className="md:col-span-1">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {isEditing && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center group hover:bg-black/30 transition-colors cursor-pointer">
                    <div className="text-center">
                      <i className="fas fa-camera text-white text-3xl mb-2 block"></i>
                      <p className="text-white text-sm font-semibold">
                        Ganti Foto
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Status Info */}
              <div className="mt-4 space-y-2">
                {statusInfo.map((info, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm font-medium text-gray-600">
                      {info.label}
                    </span>
                    <span className="font-semibold text-gray-900">
                      {info.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Section */}
            <div className="md:col-span-2 space-y-4">
              {/* Product Name */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Nama Produk
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </p>
                )}
              </div>

              {/* Category & Subcategory */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">
                    Kategori
                  </label>
                  {isEditing ? (
                    <select
                      value={product.category}
                      onChange={(e) =>
                        handleInputChange("category", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option>PAKAIAN WANITA</option>
                      <option>PAKAIAN PRIA</option>
                      <option>ANAK & BAYI</option>
                      <option>BARANG DAN PERALATAN</option>
                    </select>
                  ) : (
                    <p className="text-gray-700 font-medium">
                      {product.category}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">
                    Subkategori
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={product.subcategory}
                      onChange={(e) =>
                        handleInputChange("subcategory", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="text-gray-700 font-medium">
                      {product.subcategory}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Deskripsi Produk
                </label>
                {isEditing ? (
                  <textarea
                    value={product.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  />
                ) : (
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {product.description}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Lokasi
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={product.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <p className="text-gray-700 font-medium">
                    <i className="fas fa-map-marker-alt text-green-600 mr-2"></i>
                    {product.location}
                  </p>
                )}
              </div>

              {/* Pricing Section */}
              {(product.actualPrice || product.suggestedPrice) && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    <i className="fas fa-tag text-green-600 mr-2"></i>
                    Informasi Harga
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {product.actualPrice && (
                      <div>
                        <p className="text-xs text-gray-600 font-medium mb-1">
                          Harga Jual
                        </p>
                        {isEditing ? (
                          <input
                            type="number"
                            value={product.actualPrice}
                            onChange={(e) =>
                              handleInputChange(
                                "actualPrice",
                                parseInt(e.target.value)
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                          />
                        ) : (
                          <p className="text-lg font-bold text-green-600">
                            Rp{" "}
                            {product.actualPrice.toLocaleString("id-ID")}
                          </p>
                        )}
                      </div>
                    )}
                    {product.suggestedPrice && (
                      <div>
                        <p className="text-xs text-gray-600 font-medium mb-1">
                          Harga Saran
                        </p>
                        <p className="text-lg font-bold text-blue-600">
                          Rp{" "}
                          {product.suggestedPrice.toLocaleString("id-ID")}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Grade Info (if approved) */}
              {product.grade && (
                <div
                  className={`p-4 rounded-lg border ${
                    gradeConfig[product.grade].color
                  }`}
                >
                  <h4 className="font-semibold mb-2">
                    <i className="fas fa-certificate mr-2"></i>
                    {gradeConfig[product.grade].label}
                  </h4>
                  <p className="text-sm">
                    {gradeConfig[product.grade].description}
                  </p>
                </div>
              )}

              {/* Approval Notes */}
              {product.approvalNotes && (
                <div
                  className={`p-4 rounded-lg border ${
                    product.status === "rejected"
                      ? "bg-red-50 border-red-200"
                      : "bg-blue-50 border-blue-200"
                  }`}
                >
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                    <i
                      className={`fas ${
                        product.status === "rejected"
                          ? "fa-exclamation-circle text-red-600"
                          : "fa-info-circle text-blue-600"
                      } mr-2`}
                    ></i>
                    {product.status === "rejected"
                      ? "Catatan Penolakan"
                      : "Catatan Kurasi"}
                  </h4>
                  <p className="text-sm text-gray-700">
                    {product.approvalNotes}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Curation Date */}
          {product.curationDate && (
            <div className="border-t pt-4">
              <div className="flex items-center justify-between text-sm">
                <p className="text-gray-600">
                  <i className="fas fa-calendar text-green-600 mr-2"></i>
                  Tanggal Kurasi
                </p>
                <p className="font-semibold text-gray-900">
                  {new Date(product.curationDate).toLocaleDateString(
                    "id-ID",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </p>
              </div>
            </div>
          )}
        </CardContent>

        {/* Footer Actions */}
        <div className="border-t bg-gray-50 p-6 rounded-b-xl flex gap-3 justify-end">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                <i className="fas fa-times mr-2"></i>Batal
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                <i className="fas fa-save mr-2"></i>
                {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </>
          ) : (
            <>
              {product.status !== "sold" && product.status !== "archived" && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-blue-100 text-blue-700 font-semibold rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <i className="fas fa-edit mr-2"></i>Edit Produk
                </button>
              )}
              {product.status !== "sold" && (
                <button
                  onClick={handleDelete}
                  className="px-6 py-2 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition-colors"
                >
                  <i className="fas fa-trash mr-2"></i>Hapus
                </button>
              )}
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                <i className="fas fa-times mr-2"></i>Tutup
              </button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
