// Shared state and types untuk seller dashboard dengan flow realistis

export type ProductStatus = "draft" | "pending-curation" | "approved" | "rejected" | "sold" | "archived";
export type GradeType = "A" | "B" | "C" | "D";

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  image: string;
  status: ProductStatus;
  grade?: GradeType;
  price?: number;
  traceability?: {
    originSource: string;
    purchaseDate: string;
    originalOwner: string;
    usageHistory: string;
    condition: string;
  };
  uploadedAt: string;
  suggestedPrice?: number;
  actualPrice?: number;
  location: string;
  fullAddress?: string;
  views: number;
  sales: number;
  curationDate?: string;
  approvalNotes?: string;
}

export interface SellerOrder {
  id: string;
  productId: string;
  productName: string;
  buyerName: string;
  buyerLocation: string;
  quantity: number;
  price: number;
  totalPrice: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "completed";
  orderDate: string;
  estimatedDelivery?: string;
}

export interface CurationHistory {
  id: string;
  productId: string;
  productName: string;
  grade: GradeType;
  suggestedPrice: number;
  reason: string;
  curationDate: string;
  approvedBy: string;
  status: "approved" | "rejected" | "revised";
  marketBenchmark: {
    min: number;
    max: number;
    avg: number;
  };
}

export interface SellerStats {
  totalProductsUploaded: number;
  pendingCuration: number;
  approvedProducts: number;
  rejectedProducts: number;
  totalSales: number;
  totalRevenue: number;
  approvalRate: number;
  averageRating: number;
  responseRate: number;
  totalOrders: number;
  completedOrders: number;
}

// Mock data untuk demo
export const mockProducts: Product[] = [
  {
    id: "prod-001",
    name: "Jaket Denim Vintage Levi's 501",
    category: "PAKAIAN PRIA",
    subcategory: "Jaket",
    description: "Jaket denim klasik, kondisi excellent, minimal wear",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
    status: "approved",
    grade: "A",
    uploadedAt: "2025-11-20",
    suggestedPrice: 350000,
    actualPrice: 385000,
    location: "Bandung",
    views: 324,
    sales: 8,
    curationDate: "2025-11-21",
    approvalNotes: "Grade A - Excellent condition, minimal wear. Authentic Levi's.",
  },
  {
    id: "prod-002",
    name: "Dress Floral Vintage",
    category: "PAKAIAN WANITA",
    subcategory: "Dress",
    description: "Dress floral dengan pattern bagus, ukuran M",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8",
    status: "approved",
    grade: "A",
    uploadedAt: "2025-11-19",
    suggestedPrice: 250000,
    actualPrice: 275000,
    location: "Jakarta",
    views: 512,
    sales: 12,
    curationDate: "2025-11-20",
  },
  {
    id: "prod-003",
    name: "Kemeja Katun Premium",
    category: "PAKAIAN PRIA",
    subcategory: "Kemeja",
    description: "Kemeja katun berkualitas tinggi, warna navy",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
    status: "approved",
    grade: "B",
    uploadedAt: "2025-11-18",
    suggestedPrice: 180000,
    actualPrice: 190000,
    location: "Surabaya",
    views: 198,
    sales: 5,
    curationDate: "2025-11-19",
  },
  {
    id: "prod-004",
    name: "Tas Kulit Branded",
    category: "PAKAIAN WANITA",
    subcategory: "Aksesoris",
    description: "Tas kulit asli, branded, kondisi seperti baru",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e",
    status: "pending-curation",
    uploadedAt: "2025-11-24",
    location: "Medan",
    views: 0,
    sales: 0,
  },
  {
    id: "prod-005",
    name: "Sweater Rajut Wool",
    category: "PAKAIAN WANITA",
    subcategory: "Sweater",
    description: "Sweater rajut wool blend, nyaman dan hangat",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
    status: "pending-curation",
    uploadedAt: "2025-11-23",
    location: "Bandung",
    views: 0,
    sales: 0,
  },
  {
    id: "prod-006",
    name: "Sepatu Sneakers Vintage",
    category: "BARANG DAN PERALATAN",
    subcategory: "Sepatu",
    description: "Sneakers vintage dalam kondisi baik",
    image: "https://images.unsplash.com/photo-1527010154944-f2241763d806",
    status: "rejected",
    uploadedAt: "2025-11-22",
    location: "Yogyakarta",
    views: 45,
    sales: 0,
    approvalNotes: "Foto tidak jelas. Harap upload ulang dengan foto lebih detail.",
  },
];

export const mockOrders: SellerOrder[] = [
  {
    id: "ord-001",
    productId: "prod-001",
    productName: "Jaket Denim Vintage Levi's 501",
    buyerName: "Ani Suryanto",
    buyerLocation: "Jakarta",
    quantity: 1,
    price: 385000,
    totalPrice: 385000,
    status: "completed",
    orderDate: "2025-11-20",
    estimatedDelivery: "2025-11-22",
  },
  {
    id: "ord-002",
    productId: "prod-002",
    productName: "Dress Floral Vintage",
    buyerName: "Budi Hartono",
    buyerLocation: "Bandung",
    quantity: 1,
    price: 275000,
    totalPrice: 275000,
    status: "completed",
    orderDate: "2025-11-21",
    estimatedDelivery: "2025-11-23",
  },
  {
    id: "ord-003",
    productId: "prod-001",
    productName: "Jaket Denim Vintage Levi's 501",
    buyerName: "Citra Dewi",
    buyerLocation: "Surabaya",
    quantity: 1,
    price: 385000,
    totalPrice: 385000,
    status: "shipped",
    orderDate: "2025-11-23",
    estimatedDelivery: "2025-11-25",
  },
  {
    id: "ord-004",
    productId: "prod-003",
    productName: "Kemeja Katun Premium",
    buyerName: "Doni Setiawan",
    buyerLocation: "Jakarta",
    quantity: 1,
    price: 190000,
    totalPrice: 190000,
    status: "processing",
    orderDate: "2025-11-24",
    estimatedDelivery: "2025-11-26",
  },
];

export const mockCurationHistory: CurationHistory[] = [
  {
    id: "cur-001",
    productId: "prod-001",
    productName: "Jaket Denim Vintage Levi's 501",
    grade: "A",
    suggestedPrice: 350000,
    reason: "Produk original, minimal wear, authentic brand, high demand market",
    curationDate: "2025-11-21",
    approvedBy: "Admin Kurasi",
    status: "approved",
    marketBenchmark: { min: 300000, max: 420000, avg: 350000 },
  },
  {
    id: "cur-002",
    productId: "prod-002",
    productName: "Dress Floral Vintage",
    grade: "A",
    suggestedPrice: 250000,
    reason: "Kondisi sangat baik, pattern bagus, size standar, peminat tinggi",
    curationDate: "2025-11-20",
    approvedBy: "Admin Kurasi",
    status: "approved",
    marketBenchmark: { min: 220000, max: 320000, avg: 260000 },
  },
  {
    id: "cur-003",
    productId: "prod-003",
    productName: "Kemeja Katun Premium",
    grade: "B",
    suggestedPrice: 180000,
    reason: "Kondisi bagus, slight wear, premium material, good market demand",
    curationDate: "2025-11-19",
    approvedBy: "Admin Kurasi",
    status: "approved",
    marketBenchmark: { min: 150000, max: 250000, avg: 190000 },
  },
  {
    id: "cur-004",
    productId: "prod-006",
    productName: "Sepatu Sneakers Vintage",
    grade: "C",
    suggestedPrice: 120000,
    reason: "Foto kurang detail, kondisi tidak jelas, perlu dokumentasi lebih baik",
    curationDate: "2025-11-22",
    approvedBy: "Admin Kurasi",
    status: "rejected",
    marketBenchmark: { min: 80000, max: 180000, avg: 120000 },
  },
];

export function calculateSellerStats(
  products: Product[],
  orders: SellerOrder[]
): SellerStats {
  const totalProductsUploaded = products.length;
  const pendingCuration = products.filter((p) => p.status === "pending-curation").length;
  const approvedProducts = products.filter((p) => p.status === "approved").length;
  const rejectedProducts = products.filter((p) => p.status === "rejected").length;
  const totalOrders = orders.length;
  const completedOrders = orders.filter((o) => o.status === "completed").length;

  const totalRevenue = orders
    .filter((o) => o.status === "completed" || o.status === "delivered")
    .reduce((sum, order) => sum + order.totalPrice, 0);

  const approvalRate = totalProductsUploaded > 0 ? (approvedProducts / totalProductsUploaded) * 100 : 0;

  return {
    totalProductsUploaded,
    pendingCuration,
    approvedProducts,
    rejectedProducts,
    totalSales: totalOrders,
    totalRevenue,
    approvalRate: Math.round(approvalRate),
    averageRating: 4.8,
    responseRate: 92,
    totalOrders,
    completedOrders,
  };
}
