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
    imageUrl: "/vintage-denim-jacket.png",
    views: 342,
    uploadedAt: "2025-01-15T10:00:00Z",
    condition: "Excellent",
    brand: "Levi's",
  },
  {
    id: "2",
    name: "Designer Leather Bag",
    category: "Accessories",
    price: 450000,
    imageUrl: "/designer-leather-bag.jpg",
    views: 521,
    uploadedAt: "2025-01-14T14:30:00Z",
    condition: "Like New",
    brand: "Coach",
  },
  {
    id: "3",
    name: "Casual Cotton Shirt",
    category: "Men",
    price: 75000,
    imageUrl: "/casual-cotton-shirt.png",
    views: 198,
    uploadedAt: "2025-01-13T09:15:00Z",
    condition: "Good",
    brand: "Uniqlo",
  },
  {
    id: "4",
    name: "Summer Floral Dress",
    category: "Women",
    price: 95000,
    imageUrl: "/summer-floral-dress.png",
    views: 456,
    uploadedAt: "2025-01-12T16:45:00Z",
    condition: "Excellent",
    brand: "Zara",
  },
  {
    id: "5",
    name: "Kids Sneakers",
    category: "Kids",
    price: 65000,
    imageUrl: "/colorful-kids-sneakers.png",
    views: 287,
    uploadedAt: "2025-01-11T11:20:00Z",
    condition: "Good",
    brand: "Nike",
  },
  {
    id: "6",
    name: "Classic Wool Coat",
    category: "Women",
    price: 350000,
    imageUrl: "/classic-wool-coat.jpg",
    views: 612,
    uploadedAt: "2025-01-10T08:00:00Z",
    condition: "Excellent",
    brand: "Burberry",
  },
  {
    id: "7",
    name: "Sports Watch",
    category: "Accessories",
    price: 175000,
    imageUrl: "/sports-watch.jpg",
    views: 389,
    uploadedAt: "2025-01-09T13:30:00Z",
    condition: "Like New",
    brand: "Casio",
  },
  {
    id: "8",
    name: "Linen Trousers",
    category: "Men",
    price: 85000,
    imageUrl: "/linen-trousers.jpg",
    views: 234,
    uploadedAt: "2025-01-08T15:45:00Z",
    condition: "Good",
    brand: "H&M",
  },
  {
    id: "9",
    name: "Boho Maxi Skirt",
    category: "Women",
    price: 110000,
    imageUrl: "/boho-maxi-skirt.jpg",
    views: 421,
    uploadedAt: "2025-01-07T10:15:00Z",
    condition: "Excellent",
    brand: "Free People",
  },
  {
    id: "10",
    name: "Kids T-Shirt Bundle",
    category: "Kids",
    price: 45000,
    imageUrl: "/kids-t-shirt-bundle.jpg",
    views: 178,
    uploadedAt: "2025-01-06T12:00:00Z",
    condition: "Good",
    brand: "Gap",
  },
  {
    id: "11",
    name: "Canvas Sneakers",
    category: "Men",
    price: 120000,
    imageUrl: "/canvas-sneakers.png",
    views: 567,
    uploadedAt: "2025-01-05T09:30:00Z",
    condition: "Like New",
    brand: "Converse",
  },
  {
    id: "12",
    name: "Evening Clutch",
    category: "Accessories",
    price: 95000,
    imageUrl: "/evening-clutch.jpg",
    views: 312,
    uploadedAt: "2025-01-04T14:20:00Z",
    condition: "Excellent",
    brand: "Kate Spade",
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
