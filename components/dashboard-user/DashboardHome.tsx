"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { Flame, HandHeart, Leaf, ShoppingBag, Sparkles, Trophy, Truck, Zap, Crown, Medal, Star, TrendingUp, Search, Bell, User, Menu, Home, Gift, Heart, Settings, LogOut, Eye } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import Navbar from "@/components/Navbar";
import "./scrollbar.css";

// Types
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  brand: string;
  views: number;
  rating: number;
  imageUrl: string;
  originalPrice?: number;
  uploadedAt?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  level: number;
  xp: number;
  streak: number;
  city: string;
}

interface Session {
  user: User;
  status: "authenticated" | "loading" | "unauthenticated";
}

interface HeroSlide {
  id: string;
  title: string;
  description: string;
  tag: string;
  heroStat: string;
  accent: string;
  image: string;
  imageAlt: string;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  city: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
}

// Product Data dengan produk KIDS dan MEN dari gambar
export function getProducts(): Product[] {
  return [
    // Produk KIDS dari gambar
    {
      id: "kids-1",
      name: "Kids T-Shirt Bundle",
      description: "Bundle kaos anak dengan berbagai warna dan motif lucu, bahan katun nyaman untuk aktivitas sehari-hari",
      price: 45000,
      category: "Kids",
      condition: "excellent",
      brand: "Brand Anak",
      views: 287,
      rating: 4.5,
      imageUrl: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&h=300&fit=crop"
    },
    {
      id: "kids-2",
      name: "Kids Sneakers",
      description: "Sneakers anak dengan warna cerah dan desain trendy, sol anti slip dan bahan breathable",
      price: 65000,
      category: "Kids",
      condition: "good",
      brand: "Sneaker Kids",
      views: 178,
      rating: 4.3,
      imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop"
    },

    // Produk MEN dari gambar
    {
      id: "men-1",
      name: "Casual Cotton Shirt",
      description: "Kemeja katun casual untuk pria dengan bahan nyaman dan potongan modern",
      price: 75000,
      category: "Men",
      condition: "like new",
      brand: "Cotton Club",
      views: 198,
      rating: 4.7,
      imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop"
    },
    {
      id: "men-2",
      name: "Linen Trousers",
      description: "Celana linen pria dengan warna pastel dan bahan sejuk, perfect untuk summer look",
      price: 85000,
      category: "Men",
      condition: "excellent",
      brand: "Linen Wear",
      views: 234,
      rating: 4.6,
      imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop"
    },
    {
      id: "men-3",
      name: "Men's Casual Pants",
      description: "Celana casual pria dengan bahan katun yang nyaman, bisa dipadukan dengan berbagai style",
      price: 95000,
      category: "Men",
      condition: "good",
      brand: "Casual Wear",
      views: 189,
      rating: 4.5,
      imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=300&fit=crop"
    },

    // Produk lainnya untuk kelengkapan
    {
      id: "women-1",
      name: "Vintage Denim Jacket",
      description: "Jaket denim vintage dengan potongan klasik dan detail jahitan premium",
      price: 137200,
      category: "Women",
      condition: "good",
      brand: "Vintage Co",
      views: 342,
      rating: 4.8,
      imageUrl: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=300&fit=crop"
    },
    {
      id: "accessory-1",
      name: "Leather Crossbody Bag",
      description: "Tas selempang kulit dengan desain minimalis dan functional compartments",
      price: 120000,
      category: "Accessories",
      condition: "excellent",
      brand: "Leather Goods",
      views: 267,
      rating: 4.6,
      imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop"
    },
    {
      id: "women-2",
      name: "Floral Summer Dress",
      description: "Dress floral dengan bahan flowy dan motif cantik, perfect untuk summer vibes",
      price: 89000,
      category: "Women",
      condition: "like new",
      brand: "Summer Bloom",
      views: 312,
      rating: 4.4,
      imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop"
    },
    {
      id: "accessory-2",
      name: "Classic Sunglasses",
      description: "Kacamata hitam klasik dengan frame trendy dan UV protection",
      price: 45000,
      category: "Accessories",
      condition: "excellent",
      brand: "SunStyle",
      views: 198,
      rating: 4.2,
      imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop"
    },
    {
      id: "men-4",
      name: "Classic Denim Jacket",
      description: "Jaket denim klasik dengan warna biru tua dan kualitas premium untuk gaya kasual",
      price: 110000,
      originalPrice: 180000,
      category: "Men",
      condition: "excellent",
      brand: "Denim Co",
      views: 276,
      rating: 4.9,
      imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop"
    },
    {
      id: "women-8",
      name: "Summer Maxi Dress",
      description: "Dress maxi dengan motif floral untuk tampilan musim panas yang segar",
      price: 95000,
      originalPrice: 150000,
      category: "Women",
      condition: "very good",
      brand: "Floral Dreams",
      views: 189,
      rating: 4.6,
      imageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop"
    },
    {
      id: "accessory-3",
      name: "Vintage Leather Bag",
      description: "Tas kulit vintage dengan desain klasik dan ruang luas untuk kebutuhan harian",
      price: 125000,
      originalPrice: 200000,
      category: "Accessories",
      condition: "excellent",
      brand: "Vintage Co",
      views: 245,
      rating: 4.8,
      imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop"
    },
    {
      id: "men-5",
      name: "Polo T-Shirt",
      description: "Kaos polo dengan warna solid dan bahan breathable untuk aktivitas sehari-hari",
      price: 45000,
      category: "Men",
      condition: "excellent",
      brand: "Polo Classic",
      views: 145,
      rating: 4.5,
      imageUrl: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=300&fit=crop"
    },
    {
      id: "women-9",
      name: "Knit Sweater Cardigan",
      description: "Cardigan rajut hangat dengan warna pastel cocok untuk cuaca dingin",
      price: 80000,
      category: "Women",
      condition: "good",
      brand: "Cozy Knits",
      views: 167,
      rating: 4.5,
      imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop"
    },
    {
      id: "kids-4",
      name: "Kids Sports Shoes",
      description: "Sepatu olahraga anak dengan desain sporty dan nyaman untuk bermain",
      price: 55000,
      category: "Kids",
      condition: "very good",
      brand: "Active Kids",
      views: 201,
      rating: 4.7,
      imageUrl: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=400&h=300&fit=crop"
    },
    {
      id: "accessory-4",
      name: "Canvas Backpack",
      description: "Tas ransel canvas dengan banyak kantong dan desain simpel untuk sekolah atau kerja",
      price: 70000,
      originalPrice: 110000,
      category: "Accessories",
      condition: "good",
      brand: "Canvas Co",
      views: 223,
      rating: 4.6,
      imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop"
    },
    {
      id: "accessory-5",
      name: "Designer Sunglasses",
      description: "Kacamata hitam designer dengan frame metal dan lensa UV protection premium",
      price: 65000,
      originalPrice: 120000,
      category: "Accessories",
      condition: "like new",
      brand: "Sunny Shades",
      views: 134,
      rating: 4.4,
      imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=300&fit=crop"
    },
    {
      id: "women-10",
      name: "Bohemian Maxi Skirt",
      description: "Rok maxi bohemian dengan motif floral dan bahan flowy untuk tampilan santai namun elegan",
      price: 78000,
      category: "Women",
      condition: "excellent",
      brand: "Boho Style",
      views: 189,
      rating: 4.6,
      imageUrl: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=300&fit=crop"
    }
  ];
}

// Real-time session management
const useSession = (): { data: Session | null; status: "authenticated" | "loading" | "unauthenticated" } => {
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<"authenticated" | "loading" | "unauthenticated">("loading");

  useEffect(() => {
    const checkSession = () => {
      try {
        // Ambil data dari localStorage login sebenarnya
        const isAuth = localStorage.getItem('isAuthenticated');
        const userData = localStorage.getItem('user');
        
        if (isAuth === 'true' && userData) {
          const user = JSON.parse(userData);
          
          // Generate avatar berdasarkan nama
          const firstName = user.name?.split(' ')[0] || 'user';
          const avatarUrl = `https://avatar.iran.liara.run/public?username=${firstName.toLowerCase()}`;
          
          // Generate random XP, level, dan streak untuk gamifikasi
          const randomXP = user.xp || Math.floor(Math.random() * 9000) + 1000; // 1000-10000 XP
          const calculatedLevel = Math.floor(randomXP / 2000) + 1; // Level berdasarkan XP
          const randomStreak = user.streak || Math.floor(Math.random() * 30) + 1; // 1-30 hari streak
          
          setSession({
            user: {
              id: user.id || "1",
              name: user.name || "Guest User",
              email: user.email || "guest@thriftmap.com",
              image: avatarUrl,
              level: calculatedLevel,
              xp: randomXP,
              streak: randomStreak,
              city: user.city || user.shop?.city || "Jakarta"
            },
            status: "authenticated"
          });
          setStatus("authenticated");
        } else {
          // Jika belum login, set unauthenticated
          setSession(null);
          setStatus("unauthenticated");
        }
      } catch (error) {
        console.error('Session error:', error);
        setStatus("unauthenticated");
        setSession(null);
      }
    };

    checkSession();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user' || e.key === 'isAuthenticated') {
        checkSession();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    const interval = setInterval(checkSession, 30000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return { data: session, status };
};

const heroSlides: HeroSlide[] = [
  {
    id: "eco-drop",
    title: "Temukan Koleksi Eco Drop Terbaru",
    description: "Kurasi barang preloved terbaik yang sudah melalui inspeksi kualitas ketat. Semua lebih terjangkau dan tetap stylish.",
    tag: "Sustainably Stylish",
    heroStat: "8.2K produk baru minggu ini",
    accent: "from-emerald-50 via-white to-teal-50",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&h=600&fit=crop",
    imageAlt: "Model mengenakan pakaian vintage"
  },
  {
    id: "flash-deals",
    title: "Flash Deals Vintage",
    description: "Nikmati potongan harga s/d 60% untuk koleksi terbatas. Segera checkout sebelum stok menghilang.",
    tag: "24h eco-sale",
    heroStat: "120 produk hampir habis",
    accent: "from-amber-50 via-white to-orange-50",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=600&fit=crop",
    imageAlt: "Rak pakaian vintage dengan label diskon"
  },
  {
    id: "community",
    title: "Komunitas Thrifter Paling Aktif",
    description: "Bangun gaya khasmu sambil menyelamatkan bumi. Tukar poin gamifikasi jadi voucher eksklusif.",
    tag: "Eco Rewards",
    heroStat: "+420 poin rata-rata per minggu",
    accent: "from-indigo-50 via-white to-cyan-50",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=600&fit=crop",
    imageAlt: "Komunitas thrift berdiskusi"
  }
];

const lookbookStories = [
  {
    id: "lookbook-urban",
    title: "Urban Renew",
    highlight: "Layering breathable fabrics untuk city hopping",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "lookbook-weekend",
    title: "Weekend Archive",
    highlight: "Sneakers klasik dipadukan dengan outerwork",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "lookbook-vintage",
    title: "Vintage Stories",
    highlight: "Motif bunga pastel untuk brunch santai",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"
  }
];

const categoryChips = [
  { id: "all", label: "Semua", icon: "🛍️" },
  { id: "Women", label: "Wanita", icon: "👚" },
  { id: "Men", label: "Pria", icon: "👔" },
  { id: "Accessories", label: "Aksesori", icon: "🕶️" },
  { id: "Kids", label: "Anak", icon: "👶" },
  { id: "Premium", label: "Premium", icon: "⭐" },
  { id: "Vintage", label: "Vintage", icon: "🕰️" }
];

const leaderboardData: Record<"level" | "daily", LeaderboardEntry[]> = {
  level: [
    {
      id: "lvl-1",
      name: "Alya Rahmania",
      city: "Bandung",
      avatar: "https://avatar.iran.liara.run/public/girl?username=alya",
      xp: 9850,
      level: 5,
      streak: 28
    },
    {
      id: "lvl-2",
      name: "Rafi Danuarta",
      city: "Jakarta",
      avatar: "https://avatar.iran.liara.run/public/boy?username=rafi",
      xp: 9320,
      level: 5,
      streak: 21
    },
    {
      id: "lvl-3",
      name: "Nadia Kusuma",
      city: "Surabaya",
      avatar: "https://avatar.iran.liara.run/public/girl?username=nadia",
      xp: 8975,
      level: 4,
      streak: 18
    },
    {
      id: "lvl-4",
      name: "Gerald Pratama",
      city: "Medan",
      avatar: "https://avatar.iran.liara.run/public/boy?username=gerald",
      xp: 8420,
      level: 4,
      streak: 12
    },
    {
      id: "lvl-5",
      name: "Intan Maritsa",
      city: "Yogyakarta",
      avatar: "https://avatar.iran.liara.run/public/girl?username=intan",
      xp: 8205,
      level: 4,
      streak: 9
    },
    {
      id: "lvl-6",
      name: "Fajar Rahman",
      city: "Tangerang",
      avatar: "https://avatar.iran.liara.run/public/boy?username=fajar",
      xp: 7850,
      level: 4,
      streak: 15
    },
    {
      id: "lvl-7",
      name: "Devi Ananda",
      city: "Bekasi",
      avatar: "https://avatar.iran.liara.run/public/girl?username=devi",
      xp: 7320,
      level: 3,
      streak: 11
    },
    {
      id: "lvl-8",
      name: "Arya Wijaya",
      city: "Denpasar",
      avatar: "https://avatar.iran.liara.run/public/boy?username=arya",
      xp: 6950,
      level: 3,
      streak: 14
    }
  ],
  daily: [
    {
      id: "day-1",
      name: "Rangga Dewantara",
      city: "Bogor",
      avatar: "https://avatar.iran.liara.run/public/boy?username=rangga",
      xp: 420,
      level: 3,
      streak: 6
    },
    {
      id: "day-2",
      name: "Mira Hapsari",
      city: "Semarang",
      avatar: "https://avatar.iran.liara.run/public/girl?username=mira",
      xp: 375,
      level: 3,
      streak: 10
    },
    {
      id: "day-3",
      name: "Yoga Permadi",
      city: "Depok",
      avatar: "https://avatar.iran.liara.run/public/boy?username=yoga",
      xp: 330,
      level: 2,
      streak: 4
    },
    {
      id: "day-4",
      name: "Dita Lestari",
      city: "Makassar",
      avatar: "https://avatar.iran.liara.run/public/girl?username=dita",
      xp: 295,
      level: 2,
      streak: 5
    },
    {
      id: "day-5",
      name: "Rafi Syah",
      city: "Jakarta",
      avatar: "https://avatar.iran.liara.run/public/boy?username=rafisyah",
      xp: 250,
      level: 2,
      streak: 3
    },
    {
      id: "day-6",
      name: "Sinta Wijaya",
      city: "Surabaya",
      avatar: "https://avatar.iran.liara.run/public/girl?username=sinta",
      xp: 220,
      level: 2,
      streak: 8
    },
    {
      id: "day-7",
      name: "Budi Santoso",
      city: "Malang",
      avatar: "https://avatar.iran.liara.run/public/boy?username=budi",
      xp: 195,
      level: 1,
      streak: 5
    },
    {
      id: "day-8",
      name: "Ayu Pertiwi",
      city: "Yogyakarta",
      avatar: "https://avatar.iran.liara.run/public/girl?username=ayu",
      xp: 180,
      level: 1,
      streak: 12
    },
    {
      id: "day-9",
      name: "Denny Pratama",
      city: "Tangerang",
      avatar: "https://avatar.iran.liara.run/public/boy?username=denny",
      xp: 165,
      level: 1,
      streak: 4
    },
    {
      id: "day-10",
      name: "Rika Amelia",
      city: "Bekasi",
      avatar: "https://avatar.iran.liara.run/public/girl?username=rika",
      xp: 150,
      level: 1,
      streak: 7
    }
  ]
};

const conditionStyles: Record<string, { label: string; className: string }> = {
  excellent: { label: "Sangat Baik", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  good: { label: "Baik", className: "bg-amber-50 text-amber-700 border-amber-200" },
  "like new": { label: "Seperti Baru", className: "bg-blue-50 text-blue-700 border-blue-200" },
  default: { label: "Terawat", className: "bg-slate-50 text-slate-700 border-slate-200" }
};

const CONDITIONS = Object.keys(conditionStyles);

const formatCurrency = (value: number) => {
  if (value < 1000) {
    return `Rp ${value}`;
  }
  
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);
};

const deriveOriginalPrice = (product: Product) => Math.round(product.price * 1.32 + 25000);

const discountInfo = (product: Product) => {
  const original = deriveOriginalPrice(product);
  const pct = Math.max(5, Math.round((1 - product.price / original) * 100));
  return { original, pct };
};

// Enhanced product images mapping
const productImageMap: Record<string, string> = {
  "Vintage Denim Jacket": "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=300&fit=crop",
  "Linen Trousers": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop",
  "Sports Watch": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
  "Boho Maxi Skirt": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop",
  "Classic White Sneakers": "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop",
  "Leather Crossbody Bag": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
  "Knit Sweater": "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop",
  "Silk Scarf": "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
  "Wide Brim Hat": "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=400&h=300&fit=crop",
  "Canvas Backpack": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
  
  // Produk KIDS dan MEN dari gambar
  "Kids T-Shirt Bundle": "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&h=300&fit=crop",
  "Kids Sneakers": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
  "Kids T-Shirt Bundle 2": "https://images.unsplash.com/photo-1503454531325-72927b134045?w=400&h=300&fit=crop",
  "Casual Cotton Shirt": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop",
  "Men's Linen Trousers": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop",
  "Men's Casual Pants": "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=300&fit=crop"
};

// Global scroll progress bar
function ScrollProgressBar() {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const winScroll = window.scrollY;
      const height = doc.scrollHeight - window.innerHeight;
      setScroll(height > 0 ? (winScroll / height) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full z-[100] h-1 bg-transparent">
      <div
        className="h-1 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-200"
        style={{ width: `${scroll}%` }}
      />
    </div>
  );
}

export default function DashboardHome() {
  const heroTrackRef = useRef<HTMLDivElement | null>(null);
  const categoriesRef = useRef<HTMLDivElement | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");
  const [leaderboardMode, setLeaderboardMode] = useState<"level" | "daily">("level");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { data: session } = useSession();

  const products = useMemo(() => getProducts(), []);
  
  // Enhanced product processing with proper image mapping
  const enhancedProducts = useMemo(() => {
    return products.map((product) => {
      const conditionKey = (product.condition || "").toLowerCase();
      const normalizedCondition = CONDITIONS.includes(conditionKey) ? conditionKey : "default";
      const { original, pct } = discountInfo(product);
      
      // Use mapped image or fallback
      let imageUrl = productImageMap[product.name] || product.imageUrl;
      
      if (!imageUrl || imageUrl === '') {
        // Final fallback images
        const fallbackImages = {
          'Women': 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=300&fit=crop',
          'Men': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
          'Accessories': 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=300&fit=crop',
          'Kids': 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&h=300&fit=crop',
          'default': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'
        };
        imageUrl = fallbackImages[product.category as keyof typeof fallbackImages] || fallbackImages.default;
      }

      // Ensure all required fields exist
      const brand = product.brand || "Brand Lokal";
      const description = product.description || "Produk preloved berkualitas dengan kondisi terawat.";
      const views = product.views || Math.floor(Math.random() * 500) + 50;

      return { 
        ...product, 
        imageUrl,
        brand,
        description,
        views,
        originalPrice: original, 
        discountPercent: pct, 
        conditionKey: normalizedCondition 
      };
    });
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return enhancedProducts;
    return enhancedProducts.filter((product) => {
      if (activeCategory === "Premium") return product.price >= 200000;
      if (activeCategory === "Vintage") {
        return product.name.toLowerCase().includes("vintage") || 
               product.description.toLowerCase().includes("vintage");
      }
      return product.category === activeCategory;
    });
  }, [activeCategory, enhancedProducts]);

  const flashSaleProducts = [...filteredProducts]
    .sort((a, b) => (b.discountPercent as number) - (a.discountPercent as number))
    .slice(0, 4);
  const flashIds = new Set(flashSaleProducts.map((item) => item.id));
  const recommendationProducts = filteredProducts.filter((item) => !flashIds.has(item.id));

  // Auto-slide hero
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!heroTrackRef.current) return;
    heroTrackRef.current.style.transform = `translateX(-${heroIndex * 100}%)`;
  }, [heroIndex]);

  const updateChipScrollState = useCallback(() => {
    if (!categoriesRef.current) return;
    const node = categoriesRef.current;
    setCanScrollLeft(node.scrollLeft > 4);
    setCanScrollRight(node.scrollLeft + node.clientWidth < node.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const node = categoriesRef.current;
    if (!node) return;
    node.addEventListener("scroll", updateChipScrollState);
    updateChipScrollState();
    return () => node.removeEventListener("scroll", updateChipScrollState);
  }, [updateChipScrollState]);

  // Dynamically merge logged-in user into leaderboard
  const dynamicLeaderboard = useMemo(() => {
    if (!session?.user) return leaderboardData[leaderboardMode];
    const user = session.user;
    // Check if user is already in leaderboard
    const exists = leaderboardData[leaderboardMode].find(
      (entry) => entry.name === user.name
    );
    let updatedList;
    if (exists) {
      // Update the user's info in the leaderboard
      updatedList = leaderboardData[leaderboardMode].map((entry) =>
        entry.name === user.name
          ? {
              ...entry,
              xp: user.xp,
              level: user.level,
              streak: user.streak,
              city: user.city,
              avatar: user.image || entry.avatar,
            }
          : entry
      );
    } else {
      // Add the user to the top of the leaderboard
      updatedList = [
        {
          id: `user-session`,
          name: user.name,
          city: user.city,
          avatar: user.image,
          xp: user.xp,
          level: user.level,
          streak: user.streak,
        },
        ...leaderboardData[leaderboardMode],
      ];
    }
    // Sort by XP descending
    return updatedList.sort((a, b) => b.xp - a.xp);
  }, [leaderboardMode, session]);

  const podiumEntries = dynamicLeaderboard.slice(0, 3);
  const listEntries = dynamicLeaderboard.slice(3);

  // IMPROVED Product Card Design - wider, clearer cards
  const renderProductCard = (product: (typeof enhancedProducts)[number]) => {
    const condition = conditionStyles[product.conditionKey as keyof typeof conditionStyles] || conditionStyles.default;
    
    return (
      <div
        key={product.id}
        className="group relative flex flex-col bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-full"
      >
        {/* Product Image */}
        <div className="relative h-72 w-full overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          
          {/* Discount Badge */}
          {product.discountPercent > 0 && (
            <div className="absolute top-3 left-3 bg-rose-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              -{product.discountPercent}%
            </div>
          )}
          
          {/* Condition Badge */}
          <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium border ${condition.className}`}>
            {condition.label}
          </div>

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors">
                <Heart className="h-5 w-5 text-rose-500" />
              </button>
              <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors">
                <Eye className="h-5 w-5 text-slate-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 p-6 flex flex-col">
          {/* Category & Brand */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
              {product.category}
            </span>
            <span className="text-xs text-slate-500">{product.brand}</span>
          </div>

          {/* Product Name */}
          <Link href={`/dashboard-user/products/${product.id}`}>
            <h3 className="font-bold text-base text-slate-900 mb-2 line-clamp-2 hover:text-emerald-600 transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-slate-600 text-xs mb-3 line-clamp-2 flex-1 leading-relaxed">
            {product.description}
          </p>

          {/* Seller Rating and Views */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-slate-400">Rating Toko</span>
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "fill-slate-200 text-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-slate-600 font-medium ml-0.5">{product.rating}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Eye className="h-3 w-3" />
              {product.views}
            </div>
          </div>

          {/* Price & Action */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div className="flex flex-col">
              <span className="font-bold text-xl text-emerald-600">
                {formatCurrency(product.price)}
              </span>
              {product.discountPercent > 0 && (
                <del className="text-xs text-slate-400 font-medium">
                  {formatCurrency(product.originalPrice as number)}
                </del>
              )}
            </div>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 active:scale-95">
              <ShoppingBag className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 overflow-x-hidden">
      {/* Global Scroll Progress Bar */}
      <ScrollProgressBar />
      {/* Enhanced Navigation with User Session */}
      <Navbar />
      {/* Enhanced Floating Background Elements */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl animate-float-slow pointer-events-none z-0" />
      <div className="fixed bottom-20 right-10 w-[30rem] h-[30rem] bg-lime-200/15 rounded-full blur-3xl animate-float-medium pointer-events-none z-0" />
      <div className="fixed top-1/2 left-1/3 w-64 h-64 bg-teal-200/15 rounded-full blur-3xl animate-float-fast pointer-events-none z-0" />

      {/* Main Content - Maximum width for content like real marketplaces */}
      <div className="relative z-10 space-y-12 pb-16 max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6">
        
        {/* Welcome Header with User Stats */}
        <div className="rounded-3xl border border-emerald-100 bg-white/90 backdrop-blur-xl p-10 shadow-lg mt-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4 flex-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2 border border-emerald-100">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <p className="text-sm font-semibold text-emerald-700">
                  Welcome back, {session?.user?.name || "Thrifter"}! 👋
                </p>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-3">
                  Marketplace & Community ✨
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                  Jelajahi koleksi thrift terkurasi, ikuti flash sale, dan pantau peringkat komunitas dalam satu platform.
                </p>
              </div>
            </div>
            
            {/* User Stats */}
            <div className="flex gap-4 flex-shrink-0">
              <div className="text-center p-4 rounded-2xl bg-amber-50 border border-amber-200 min-w-[100px]">
                <div className="flex items-center gap-2 justify-center mb-2">
                  <Trophy className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-semibold text-amber-700">Level</span>
                </div>
                <p className="text-2xl font-bold text-amber-900">{session?.user?.level || 1}</p>
              </div>
              
              <div className="text-center p-4 rounded-2xl bg-emerald-50 border border-emerald-200 min-w-[100px]">
                <div className="flex items-center gap-2 justify-center mb-2">
                  <Zap className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-700">XP</span>
                </div>
                <p className="text-2xl font-bold text-emerald-900">{session?.user?.xp?.toLocaleString() || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Carousel */}
        <section>
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
            <div
              ref={heroTrackRef}
              className="flex transition-transform duration-500 ease-out"
              style={{ width: `${heroSlides.length * 100}%` }}
            >
              {heroSlides.map((slide) => (
                <article
                  key={slide.id}
                  className={`flex min-w-full flex-col gap-8 p-8 md:flex-row md:items-center bg-gradient-to-br ${slide.accent}`}
                >
                  <div className="space-y-6 md:max-w-xl">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-4 py-2 text-sm font-semibold text-emerald-700 border border-emerald-100">
                      <Sparkles className="h-4 w-4" /> {slide.tag}
                    </div>
                    <h2 className="text-4xl font-bold leading-tight text-slate-900 tracking-tight">{slide.title}</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">{slide.description}</p>
                    <div className="flex flex-wrap gap-4">
                      <Link
                        href="/dashboard-user/products"
                        className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl"
                      >
                        🛒 Jelajahi Koleksi
                      </Link>
                      <Link
                        href="#lookbook"
                        className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        👗 Lihat Lookbook
                      </Link>
                    </div>
                  </div>
                  <div className="relative flex-1">
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                      <Image
                        src={slide.image}
                        alt={slide.imageAlt}
                        width={600}
                        height={400}
                        className="h-80 w-full object-cover"
                        priority={slide.id === "eco-drop"}
                      />
                      <div className="absolute bottom-6 left-6 rounded-2xl bg-white/90 backdrop-blur p-4 shadow-lg border border-emerald-100">
                        <Leaf className="mb-2 h-5 w-5 text-emerald-500" />
                        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">Impact Mingguan</p>
                        <p className="text-lg font-bold text-slate-900">{slide.heroStat}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setHeroIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === heroIndex ? "w-8 bg-emerald-600" : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Main Content Grid - FIXED SCROLL ISSUE */}
        <div className="grid grid-cols-1 gap-12 xl:grid-cols-[420px_1fr] xl:items-start">
          
          {/* Leaderboard Sidebar */}
          <aside className="xl:sticky xl:top-24 space-y-10">
            {/* User Quick Stats */}
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-md">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Progress Saya</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Level Progress</span>
                  <span className="text-sm font-semibold text-emerald-600">{session?.user?.xp || 0} / 5000 XP</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(((session?.user?.xp || 0) / 5000) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-rose-500" />
                    <span className="text-slate-600">Streak</span>
                  </div>
                  <span className="font-semibold text-slate-900">{session?.user?.streak || 0} hari</span>
                </div>
              </div>
            </div>

            {/* Leaderboard - FIXED EQUAL HEIGHT PODIUM */}
            <section className="rounded-3xl border border-slate-200 bg-white shadow-lg p-7">
              <div className="space-y-6">
                {/* Header */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-2 mb-3 border border-amber-200">
                    <Trophy className="h-4 w-4 text-amber-600" />
                    <p className="text-sm font-semibold text-amber-700">Eco Impact League</p>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Leaderboard</h3>
                  <p className="text-slate-600 text-sm">Kompetisi ramah lingkungan komunitas</p>
                </div>

                {/* Mode Toggle */}
                  <div className="flex gap-2 rounded-2xl bg-slate-100 p-1 mb-4">
                  <button
                    className={`flex items-center justify-center gap-2 flex-1 rounded-xl py-3 text-sm font-semibold transition-all ${
                      leaderboardMode === "level" 
                        ? "bg-white text-slate-900 shadow-sm" 
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                    onClick={() => setLeaderboardMode("level")}
                  >
                    <Trophy className="h-4 w-4" />
                    Level
                  </button>
                  <button
                    className={`flex items-center justify-center gap-2 flex-1 rounded-xl py-3 text-sm font-semibold transition-all ${
                      leaderboardMode === "daily" 
                        ? "bg-white text-slate-900 shadow-sm" 
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                    onClick={() => setLeaderboardMode("daily")}
                  >
                    <TrendingUp className="h-4 w-4" />
                    Harian
                  </button>
                </div>

                {/* Podium - FIXED EQUAL HEIGHT */}
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    {podiumEntries.map((entry, index) => {
                      const positions = [
                        { 
                          gradient: "from-amber-100 to-yellow-100",
                          border: "border-amber-300",
                          badge: "🥇",
                          rankColor: "bg-amber-500 text-white"
                        },
                        { 
                          gradient: "from-slate-100 to-gray-100",
                          border: "border-slate-300", 
                          badge: "🥈",
                          rankColor: "bg-slate-500 text-white"
                        },
                        { 
                          gradient: "from-orange-100 to-amber-100",
                          border: "border-orange-300",
                          badge: "🥉",
                          rankColor: "bg-orange-500 text-white"
                        }
                      ];
                      const position = positions[index];
                      
                      return (
                        <div key={entry.id} className="flex flex-col items-center text-center h-full">
                          {/* Rank Badge */}
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-3 ${position.rankColor}`}>
                            {index + 1}
                          </div>
                          
                          {/* Avatar */}
                          <div className="relative mb-3">
                            <Image
                              src={entry.avatar}
                              alt={entry.name}
                              width={64}
                              height={64}
                              className={`h-16 w-16 rounded-full border-2 ${position.border} shadow-md`}
                            />
                            <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                              <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs bg-white border border-slate-200">
                                {position.badge}
                              </div>
                            </div>
                          </div>

                          {/* User Info - SAME HEIGHT FOR ALL */}
                          <div className={`w-full rounded-2xl bg-gradient-to-br ${position.gradient} p-5 border ${position.border} flex flex-col justify-between h-52 shadow-md ${session?.user?.name === entry.name ? 'ring-2 ring-emerald-400' : ''}`}>
                            <div>
                              <h4 className="font-bold text-slate-900 text-sm mb-1 truncate">{entry.name}</h4>
                              <p className="text-xs text-slate-600 mb-2">Level {entry.level}</p>
                              <p className="text-xs text-slate-500 mb-3">{entry.city}</p>
                            </div>
                            
                            {/* Stats */}
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-center gap-1 text-xs">
                                <Zap className="h-3 w-3 text-amber-500" />
                                <span className="font-semibold text-slate-700">{entry.xp.toLocaleString("id-ID")} XP</span>
                              </div>
                              <div className="flex items-center justify-center gap-1 text-xs">
                                <Flame className="h-3 w-3 text-rose-500" />
                                <span className="font-semibold text-slate-700">{entry.streak} hari</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* List */}
                  <div className="space-y-2">
                    {listEntries.map((entry, index) => {
                      const isCurrentUser = session?.user?.name && entry.name === session.user.name;
                      return (
                        <div
                          key={entry.id}
                          className={`flex items-center gap-3 rounded-xl p-3 transition-all hover:bg-slate-100 ${isCurrentUser ? 'bg-emerald-50 border-2 border-emerald-300 shadow-lg ring-2 ring-emerald-200' : 'bg-slate-50'}`}
                        >
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600">
                            #{index + 4}
                          </div>
                          <Image
                            src={entry.avatar}
                            alt={entry.name}
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-full"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-slate-900 text-sm truncate">{entry.name}</h4>
                            <p className="text-xs text-slate-600">Level {entry.level} • {entry.city}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-xs font-semibold text-amber-600">
                              <Zap className="h-3 w-3" />
                              {entry.xp.toLocaleString("id-ID")}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <Flame className="h-3 w-3" />
                              {entry.streak}d
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          </aside>

          {/* Products Section - FIXED SCROLL ISSUE */}
          <main className="space-y-12 min-w-0">
            {/* Lookbook */}
            <section id="lookbook">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-50 to-indigo-50 px-4 py-2 mb-4 border border-purple-200">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  <p className="text-sm font-semibold text-purple-700">Lookbook & Stories</p>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-3">✨ Inspirasi Gaya dari Komunitas</h3>
                <p className="text-slate-600 text-lg">Temukan cara styling kreatif dengan barang thrift dari member komunitas kami</p>
              </div>
              <div className="grid gap-7 md:grid-cols-3">
                {lookbookStories.map((story, index) => (
                  <article
                    key={story.id}
                    className="group relative overflow-hidden rounded-3xl bg-white shadow-sm border border-slate-200 transition-all hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="relative h-80 overflow-hidden">
                      <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-300 mb-2">Lookbook</p>
                        <h4 className="text-xl font-bold mb-2">{story.title}</h4>
                        <p className="text-slate-200">{story.highlight}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Categories */}
            <section>
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2 mb-3 border border-emerald-200">
                  <Sparkles className="h-4 w-4 text-emerald-600" />
                  <p className="text-sm font-semibold text-emerald-700">Kategori Kurasi</p>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Telusuri Berdasarkan Kategori</h3>
                <p className="text-slate-600">Temukan barang thrift sesuai preferensi gaya Anda</p>
              </div>
              
              <div className="relative">
                <div
                  className="flex gap-3 overflow-x-auto pb-4"
                  ref={categoriesRef}
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {categoryChips.map((chip, idx) => (
                    <button
                      key={chip.id}
                      onClick={() => setActiveCategory(chip.id)}
                      className={`flex items-center gap-2 whitespace-nowrap rounded-2xl border-2 px-5 py-3 text-sm font-semibold transition-all ${
                        activeCategory === chip.id
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:shadow-md"
                      }`}
                      style={{ minWidth: 120 }}
                    >
                      <span className="text-base">{chip.icon}</span>
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Flash Sale */}
            <section id="flash-sale">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-50 to-pink-50 px-4 py-2 mb-3 border border-rose-200">
                  <Flame className="h-4 w-4 text-rose-600" />
                  <p className="text-sm font-semibold text-rose-700">Flash Sale</p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Diskon Spesial Terbatas</h3>
                    <p className="text-slate-600">Buruan beli sebelum kehabisan! Stok terbatas</p>
                  </div>
                  <div className="inline-flex items-center gap-3 rounded-2xl bg-rose-50 px-4 py-3 border border-rose-200">
                    <div className="flex items-center gap-2">
                      <Flame className="h-5 w-5 text-rose-600" />
                      <span className="text-sm font-semibold text-rose-700">Berakhir dalam</span>
                    </div>
                    <Countdown />
                  </div>
                </div>
              </div>

              {flashSaleProducts.length === 0 ? (
                <div className="rounded-2xl bg-slate-50 p-12 text-center">
                  <p className="text-slate-500">Tidak ada produk flash sale untuk kategori ini.</p>
                </div>
              ) : (
                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {flashSaleProducts.map(renderProductCard)}
                </div>
              )}
            </section>

            {/* Recommendations */}
            <section id="recommendations">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 mb-3 border border-blue-200">
                  <Zap className="h-4 w-4 text-blue-600" />
                  <p className="text-sm font-semibold text-blue-700">Rekomendasi</p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Kurasi Khusus untuk Anda</h3>
                    <p className="text-slate-600">Barang thrift pilihan berdasarkan preferensi Anda</p>
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md">
                    <Zap className="h-4 w-4" /> Segarkan
                  </button>
                </div>
              </div>

              {recommendationProducts.length === 0 ? (
                <div className="rounded-2xl bg-slate-50 p-12 text-center">
                  <p className="text-slate-500">Belum ada rekomendasi untuk kategori ini.</p>
                </div>
              ) : (
                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {recommendationProducts.map(renderProductCard)}
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
      <style jsx global>{`
        /* Custom scrollbar for horizontal scrolls */
        .custom-scrollbar::-webkit-scrollbar {
          height: 10px;
          background: #e0f2fe;
          border-radius: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #34d399;
          border-radius: 12px;
        }
        .custom-scrollbar {
          scrollbar-color: #34d399 #e0f2fe;
          scrollbar-width: thin;
        }
      `}</style>
    </div>
  );
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(60 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 60 * 60 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="flex gap-1 font-mono">
      <div className="rounded-lg bg-rose-600 px-2 py-1 text-sm font-bold text-white">
        {hours}
      </div>
      <div className="rounded-lg bg-rose-600 px-2 py-1 text-sm font-bold text-white">
        {minutes}
      </div>
      <div className="rounded-lg bg-rose-600 px-2 py-1 text-sm font-bold text-white">
        {seconds}
      </div>
    </div>
  );
}