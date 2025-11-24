"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SellerProductsPage() {
  const myProducts = [
    {
      id: 1,
      name: "Jaket Denim Vintage Levi's",
      category: "Pakaian Pria",
      grade: "A",
      price: 125000,
      stock: 1,
      status: "Aktif",
      views: 234,
      likes: 18,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
    },
    {
      id: 2,
      name: "Dress Floral Summer",
      category: "Pakaian Wanita",
      grade: "B",
      price: 85000,
      stock: 1,
      status: "Kurasi",
      views: 89,
      likes: 12,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
    },
    {
      id: 3,
      name: "Celana Cargo Vintage",
      category: "Pakaian Pria",
      grade: "C",
      price: 65000,
      stock: 1,
      status: "Aktif",
      views: 156,
      likes: 9,
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400",
    },
    {
      id: 4,
      name: "Kemeja Katun Premium",
      category: "Pakaian Pria",
      grade: "B",
      price: 75000,
      stock: 0,
      status: "Terjual",
      views: 312,
      likes: 24,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
    },
  ];

  const stats = [
    { label: "Total Produk", value: "12", icon: "fa-box", color: "blue" },
    { label: "Produk Aktif", value: "8", icon: "fa-check-circle", color: "green" },
    { label: "Dalam Kurasi", value: "3", icon: "fa-hourglass-half", color: "yellow" },
    { label: "Terjual", value: "24", icon: "fa-shopping-bag", color: "purple" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="hover:shadow-lg transition-all duration-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div
                  className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}
                >
                  <i className={`fas ${stat.icon} text-${stat.color}-600 text-xl`}></i>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
          <i className="fas fa-plus mr-2"></i>
          Tambah Produk Baru
        </button>
        <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium">
          <i className="fas fa-filter mr-2"></i>
          Filter
        </button>
      </div>

      {/* Products List */}
      <Card>
        <CardHeader>
          <CardTitle>Produk Saya</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {myProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-green-200 hover:bg-green-50/30 transition-all duration-200"
              >
                {/* Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <Badge
                      variant={
                        product.status === "Aktif"
                          ? "success"
                          : product.status === "Kurasi"
                          ? "warning"
                          : "outline"
                      }
                    >
                      {product.status}
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      Grade {product.grade}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>
                      <i className="far fa-eye mr-1"></i>
                      {product.views} views
                    </span>
                    <span>
                      <i className="far fa-heart mr-1"></i>
                      {product.likes} likes
                    </span>
                    <span>
                      <i className="fas fa-box mr-1"></i>
                      Stok: {product.stock}
                    </span>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">
                    Rp {product.price.toLocaleString()}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <i className="fas fa-chart-line"></i>
                    </button>
                    <button className="px-3 py-1.5 text-sm border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
