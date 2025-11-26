"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProductDetailPage from "./ProductDetailPage";
import AddProductForm from "./AddProductForm";
import { Product } from "@/lib/seller-state";
import { getProducts, saveProducts, addProduct, updateProduct, deleteProduct, initializeStorage } from "@/lib/storage";

const statusConfig: Record<
  string,
  { color: string; icon: string; label: string }
> = {
  "draft": {
    color: "bg-gray-100 text-gray-800",
    icon: "fa-pen",
    label: "Draft",
  },
  "pending-curation": {
    color: "bg-yellow-100 text-yellow-800",
    icon: "fa-hourglass-half",
    label: "Menunggu Kurasi",
  },
  "approved": {
    color: "bg-green-100 text-green-800",
    icon: "fa-check-circle",
    label: "Disetujui",
  },
  "rejected": {
    color: "bg-red-100 text-red-800",
    icon: "fa-times-circle",
    label: "Ditolak",
  },
  "sold": {
    color: "bg-blue-100 text-blue-800",
    icon: "fa-shopping-bag",
    label: "Terjual",
  },
  "archived": {
    color: "bg-gray-200 text-gray-700",
    icon: "fa-archive",
    label: "Diarsipkan",
  },
};

export default function SellerProductsPage() {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailMode, setDetailMode] = useState<"view" | "edit">("view");
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load products dari localStorage saat mount
  useEffect(() => {
    initializeStorage();
    const storedProducts = getProducts();
    setProducts(storedProducts);
    setIsLoading(false);
  }, []);

  let filteredProducts = products;
  if (filterStatus !== "all") {
    filteredProducts = products.filter(
      (p) => p.status === filterStatus
    );
  }

  // Sort
  if (sortBy === "newest") {
    filteredProducts.sort(
      (a, b) =>
        new Date(b.uploadedAt).getTime() -
        new Date(a.uploadedAt).getTime()
    );
  } else if (sortBy === "sales") {
    filteredProducts.sort((a, b) => b.sales - a.sales);
  } else if (sortBy === "views") {
    filteredProducts.sort((a, b) => b.views - a.views);
  }

  const statuses = ["all", "pending-curation", "approved", "rejected", "sold", "archived"];
  const statusCounts = {
    all: products.length,
    "pending-curation": products.filter(p => p.status === "pending-curation").length,
    approved: products.filter(p => p.status === "approved").length,
    rejected: products.filter(p => p.status === "rejected").length,
    sold: products.filter(p => p.status === "sold").length,
    archived: products.filter(p => p.status === "archived").length,
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setDetailMode("view");
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setDetailMode("edit");
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    updateProduct(updatedProduct.id, updatedProduct);
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    deleteProduct(productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setSelectedProduct(null);
  };

  const handleAddProduct = (newProduct: Product) => {
    addProduct(newProduct);
    setProducts((prev) => [...prev, newProduct]);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {showAddForm && (
        <AddProductForm
          onClose={() => setShowAddForm(false)}
          onAdd={handleAddProduct}
        />
      )}

      {selectedProduct && (
        <ProductDetailPage
          product={selectedProduct}
          mode={detailMode}
          onClose={handleCloseDetail}
          onSave={handleSaveProduct}
          onDelete={() => handleDeleteProduct(selectedProduct.id)}
        />
      )}
      {/* Upload Section */}
      <Card className="border-2 border-dashed border-green-300 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 shadow-none hover:shadow-lg transition-all duration-300 cursor-pointer group"
        onClick={() => setShowAddForm(true)}
      >
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <i className="fas fa-cloud-arrow-up text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Jual Barang Bekas Kamu
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Upload produk baru dan mulai dapatkan pembeli!
                </p>
              </div>
            </div>
            <button 
              onClick={() => setShowAddForm(true)}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all active:scale-95 shadow-lg hover:shadow-xl whitespace-nowrap transform hover:scale-105 duration-300"
            >
              <i className="fas fa-plus mr-2"></i>Upload Barang
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Filters & Sorting */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex-1">
          <label className="text-sm font-semibold text-gray-700 block mb-2">
            Filter Status
          </label>
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  filterStatus === status
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status === "all"
                  ? "Semua Produk"
                  : statusConfig[status]?.label || status}
                <span className="ml-2 text-xs opacity-75">
                  ({statusCounts[status as keyof typeof statusCounts]})
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="md:w-48">
          <label className="text-sm font-semibold text-gray-700 block mb-2">
            Urutkan
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="newest">Terbaru</option>
            <option value="sales">Penjualan Tertinggi</option>
            <option value="views">Viewers Tertinggi</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const status = statusConfig[product.status];
            return (
              <Card
                key={product.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0"
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-gray-100 h-48">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge className={`${status.color} text-xs`}>
                      <i className={`fas ${status.icon} mr-1`}></i>
                      {status.label}
                    </Badge>
                  </div>
                  {/* Category Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="pt-4">
                  <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-green-600 transition-colors">
                    {product.name}
                  </h3>

                  {/* Grade Badge (jika approved) */}
                  {product.grade && (
                    <div className="mb-3">
                      <Badge
                        className={`text-sm font-bold ${
                          product.grade === "A"
                            ? "bg-green-100 text-green-800"
                            : product.grade === "B"
                            ? "bg-blue-100 text-blue-800"
                            : product.grade === "C"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        Grade {product.grade}
                      </Badge>
                    </div>
                  )}

                  {/* Price & Location Row */}
                  <div className="space-y-2 mb-4">
                    {product.price && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">💰 Harga</span>
                        <span className="font-bold text-lg text-green-600">
                          Rp {product.price.toLocaleString("id-ID")}
                        </span>
                      </div>
                    )}
                    {product.location && (
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm text-gray-600">📍 Lokasi</span>
                        <span className="text-xs text-gray-700 text-right font-medium">
                          {product.location}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center justify-between py-3 border-t border-b border-gray-200">
                    <div className="text-center flex-1">
                      <p className="text-xs text-gray-600">Views</p>
                      <p className="font-bold text-gray-900">{product.views}</p>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="text-center flex-1">
                      <p className="text-xs text-gray-600">Penjualan</p>
                      <p className="font-bold text-green-600">{product.sales}</p>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="text-center flex-1">
                      <p className="text-xs text-gray-600">Upload</p>
                      <p className="text-xs font-semibold text-gray-900">
                        {new Date(product.uploadedAt).toLocaleDateString(
                          "id-ID",
                          { month: "short", day: "numeric" }
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4">
                    <button
                      onClick={() => handleViewProduct(product)}
                      className="flex-1 px-3 py-2 bg-green-100 text-green-700 font-semibold rounded-lg hover:bg-green-200 transition-colors text-sm"
                    >
                      <i className="fas fa-eye mr-1"></i>Lihat
                    </button>
                    <button
                      onClick={() => handleEditProduct(product)}
                      disabled={
                        product.status === "sold" ||
                        product.status === "archived"
                      }
                      className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <i className="fas fa-pen mr-1"></i>Edit
                    </button>
                  </div>

                  {/* Status Message */}
                  {product.status === "rejected" && product.approvalNotes && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-xs text-red-800">
                        <i className="fas fa-exclamation-circle mr-2"></i>
                        {product.approvalNotes}
                      </p>
                    </div>
                  )}

                  {product.status === "pending-curation" && (
                    <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-xs font-semibold text-yellow-800">
                        <i className="fas fa-hourglass-half mr-2"></i>
                        Sedang dalam proses kurasi. Tunggu hasil seleksi kami.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="mb-4">
              <i className="fas fa-inbox text-5xl text-gray-300"></i>
            </div>
            <p className="text-gray-600 text-lg font-semibold">
              Tidak ada produk dengan status tersebut
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Mulai dengan mengunggah produk baru
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
