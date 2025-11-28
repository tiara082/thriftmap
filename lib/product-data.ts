export interface Product {
  id: string
  name: string
  category: string
  price: number
  imageUrl: string
  views: number
  uploadedAt: string
  condition?: string
  brand?: string
  description?: string
}

export interface ProductCategory {
  id: string
  category: string
  subcategories: string[]
}

// Sample product data
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Vintage Denim Jacket",
    category: "Women",
    price: 125000,
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16ebc5?auto=format&fit=crop&w=900&q=80",
    views: 342,
    uploadedAt: "2025-01-15T10:00:00Z",
    condition: "Excellent",
    brand: "Levi's",
    description: "Jaket denim klasik dengan aksen fading khas thrift yang mudah dipadukan."
  },
  {
    id: "2",
    name: "Designer Leather Bag",
    category: "Accessories",
    price: 450000,
    imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
    views: 521,
    uploadedAt: "2025-01-14T14:30:00Z",
    condition: "Like New",
    brand: "Coach",
    description: "Tas kulit premium berwarna tan dengan hardware emas, cocok untuk daily chic."
  },
  {
    id: "3",
    name: "Casual Cotton Shirt",
    category: "Men",
    price: 75000,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    views: 198,
    uploadedAt: "2025-01-13T09:15:00Z",
    condition: "Good",
    brand: "Uniqlo",
    description: "Kemeja katun breathable warna krem untuk gaya smart casual sepanjang hari."
  },
  {
    id: "4",
    name: "Summer Floral Dress",
    category: "Women",
    price: 95000,
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
    views: 456,
    uploadedAt: "2025-01-12T16:45:00Z",
    condition: "Excellent",
    brand: "Zara",
    description: "Dress floral bernuansa pastel dengan siluet loose yang nyaman dipakai."
  },
  {
    id: "5",
    name: "Kids Sneakers",
    category: "Kids",
    price: 65000,
    imageUrl: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80",
    views: 287,
    uploadedAt: "2025-01-11T11:20:00Z",
    condition: "Good",
    brand: "Nike",
    description: "Sneakers anak warna cerah dengan bantalan empuk untuk aktivitas seharian."
  },
  {
    id: "6",
    name: "Classic Wool Coat",
    category: "Women",
    price: 350000,
    imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80",
    views: 612,
    uploadedAt: "2025-01-10T08:00:00Z",
    condition: "Excellent",
    brand: "Burberry",
    description: "Coat wool klasik warna camel dengan lining halus, siap untuk musim hujan."
  },
  {
    id: "7",
    name: "Sports Watch",
    category: "Accessories",
    price: 175000,
    imageUrl: "https://images.unsplash.com/photo-1523170335684-f042f1ba670b?auto=format&fit=crop&w=900&q=80",
    views: 389,
    uploadedAt: "2025-01-09T13:30:00Z",
    condition: "Like New",
    brand: "Casio",
    description: "Jam tangan digital sporty dengan strap resin hitam dan fitur stopwatch."
  },
  {
    id: "8",
    name: "Linen Trousers",
    category: "Men",
    price: 85000,
    imageUrl: "https://images.unsplash.com/photo-1552374196-c4e7ffc6441b?auto=format&fit=crop&w=900&q=80",
    views: 234,
    uploadedAt: "2025-01-08T15:45:00Z",
    condition: "Good",
    brand: "H&M",
    description: "Celana linen warna pasir dengan potongan relaxed untuk look santai."
  },
  {
    id: "9",
    name: "Boho Maxi Skirt",
    category: "Women",
    price: 110000,
    imageUrl: "https://images.unsplash.com/photo-1550314472-5eb9fcb8ec0b?auto=format&fit=crop&w=900&q=80",
    views: 421,
    uploadedAt: "2025-01-07T10:15:00Z",
    condition: "Excellent",
    brand: "Free People",
    description: "Rok maxi motif boho dengan detail pleats lembut dan kancing kayu."
  },
  {
    id: "10",
    name: "Kids T-Shirt Bundle",
    category: "Kids",
    price: 45000,
    imageUrl: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=900&q=80",
    views: 178,
    uploadedAt: "2025-01-06T12:00:00Z",
    condition: "Good",
    brand: "Gap",
    description: "Bundle kaos anak berbahan katun lembut dengan warna pastel."
  },
  {
    id: "11",
    name: "Canvas Sneakers",
    category: "Men",
    price: 120000,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    views: 567,
    uploadedAt: "2025-01-05T09:30:00Z",
    condition: "Like New",
    brand: "Converse",
    description: "Sneakers kanvas high-cut warna krem dengan outsole tebal anti selip."
  },
  {
    id: "12",
    name: "Evening Clutch",
    category: "Accessories",
    price: 95000,
    imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
    views: 312,
    uploadedAt: "2025-01-04T14:20:00Z",
    condition: "Excellent",
    brand: "Kate Spade",
    description: "Clutch satin hitam dengan aksen metalik untuk acara malam hari."
  },
]

export const productCategories: ProductCategory[] = [
  {
    id: "women",
    category: "Women",
    subcategories: ["Dresses", "Tops", "Bottoms", "Outerwear", "Shoes", "Accessories"],
  },
  {
    id: "men",
    category: "Men",
    subcategories: ["Shirts", "Pants", "Jackets", "Shoes", "Accessories"],
  },
  {
    id: "kids",
    category: "Kids",
    subcategories: ["Girls", "Boys", "Babies", "Shoes", "Accessories"],
  },
  {
    id: "accessories",
    category: "Accessories",
    subcategories: ["Bags", "Watches", "Jewelry", "Sunglasses", "Belts", "Scarves"],
  },
]

export function getProducts(): Product[] {
  return sampleProducts
}

export function getProductById(id: string): Product | undefined {
  return sampleProducts.find((product) => product.id === id)
}

export function getProductsByCategory(categoryName: string): Product[] {
  return sampleProducts.filter((product) => product.category?.toLowerCase() === categoryName.toLowerCase())
}
