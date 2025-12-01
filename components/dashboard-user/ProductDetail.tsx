"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircle2, Heart, MapPin, Package, ShieldCheck, Star, Truck, Sparkles, ShoppingBag } from "lucide-react";
import { getProducts, type Product } from "@/lib/product-data";

interface ProductDetailProps {
  product: Product;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);

const benefitList = [
  { id: "inspection", label: "Lulus inspeksi 12 titik", icon: ShieldCheck },
  { id: "sanitize", label: "Sudah disteam & sanitasi", icon: CheckCircle2 },
  { id: "reward", label: "Belanja ini dapat 120 XP", icon: Star },
  { id: "shipping", label: "Estimasi tiba 2-4 hari", icon: Truck }
];

export default function ProductDetail({ product }: ProductDetailProps) {
  const allProducts = useMemo(() => getProducts(), []);
  const peers = useMemo(() => allProducts.filter((item) => item.id !== product.id), [allProducts, product.id]);
  const related = useMemo(() => {
    const sameCategory = peers.filter((item) => item.category === product.category).slice(0, 4);
    if (sameCategory.length > 0) return sameCategory;
    return peers.slice(0, 4);
  }, [peers, product.category]);

  const gallery = useMemo(() => {
    const sameCategoryImages = peers
      .filter((item) => item.category === product.category)
      .slice(0, 3)
      .map((item) => item.imageUrl);
    const uniqueImages = [product.imageUrl, ...sameCategoryImages].filter((value, index, array) => array.indexOf(value) === index);
    return uniqueImages.slice(0, 4);
  }, [peers, product.category, product.imageUrl]);

  const [activeImage, setActiveImage] = useState(gallery[0] ?? product.imageUrl);
  const [quantity, setQuantity] = useState(1);

  const adjustQuantity = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <section className="space-y-6 py-6" aria-labelledby="product-detail-heading">
      <nav className="flex items-center gap-2 text-sm font-medium text-slate-600" aria-label="Breadcrumb">
        <Link href="/dashboard-user" className="hover:text-emerald-600 transition-colors">
          Home
        </Link>
        <span className="text-slate-400">•</span>
        <Link href="/dashboard-user/products" className="hover:text-emerald-600 transition-colors">
          Produk
        </Link>
        <span className="text-slate-400">•</span>
        <span className="text-slate-900 font-bold">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Column: Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border-2 border-emerald-100 bg-white shadow-xl">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full bg-white/95 p-3 text-rose-500 shadow-lg hover:bg-rose-50 hover:scale-110 transition-all duration-300"
              aria-label="Tambah ke wishlist"
            >
              <Heart className="h-5 w-5" />
            </button>
            <div className="absolute left-4 top-4 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
              {product.condition ?? "Terawat"}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {gallery.map((image) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(image)}
                className={`relative aspect-square overflow-hidden rounded-2xl border-2 ${
                  activeImage === image ? "border-emerald-500 ring-2 ring-emerald-200" : "border-slate-200"
                } bg-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300`}
              >
                <Image src={image} alt="Thumbnail produk" fill sizes="(max-width: 768px) 25vw, 10vw" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Product Details + Journey */}
        <div className="space-y-6">
          {/* Product Info Section */}
          <div className="rounded-3xl border-2 border-emerald-100 bg-gradient-to-br from-white to-emerald-50/30 p-8 shadow-lg space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 mb-3">
                <ShoppingBag className="h-4 w-4 text-emerald-600" />
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">{product.category}</p>
              </div>
              <h1 id="product-detail-heading" className="text-4xl font-black text-slate-900 tracking-tight">
                {product.name}
              </h1>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="flex flex-wrap items-baseline gap-4">
              <span className="text-5xl font-black text-emerald-600">{formatCurrency(product.price)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <del className="text-xl text-slate-400 font-medium">{formatCurrency(product.originalPrice)}</del>
              )}
              <div className="rounded-full bg-gradient-to-r from-emerald-100 to-lime-100 px-4 py-2 text-xs font-bold text-emerald-700 shadow-md">
                👁️ {product.views} views
              </div>
            </div>

            {/* Seller Rating */}
            {product.rating && (
              <div className="flex items-center gap-3 rounded-2xl border border-amber-100 bg-amber-50/50 px-4 py-3">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-medium">Rating Toko</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating!)
                              ? "fill-amber-400 text-amber-400"
                              : "fill-slate-200 text-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-slate-900">{product.rating}</span>
                    <span className="text-xs text-slate-400">dari 5.0</span>
                  </div>
                </div>
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm text-slate-600">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                Brand {product.brand ?? "Kurasi"}
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm text-slate-600">
                <Package className="h-5 w-5 text-emerald-600" />
                Stok ready • 1 sku
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-5">
              <p className="text-sm font-semibold text-emerald-700">Pilihan pengiriman</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/90 p-4 shadow">
                  <p className="text-sm font-semibold text-slate-900">Reguler Eco</p>
                  <p className="text-xs text-slate-500">2-4 hari kerja • Mulai 15rb</p>
                </div>
                <div className="rounded-2xl bg-white/90 p-4 shadow">
                  <p className="text-sm font-semibold text-slate-900">Pick-up Store</p>
                  <p className="text-xs text-slate-500">Ambil hari ini di Bandung</p>
                </div>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-emerald-700">
                <MapPin className="h-4 w-4" /> Warehouse Pasar Baru • Tracking realtime
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 rounded-2xl border-2 border-emerald-100 bg-white px-5 py-4">
              <span className="text-sm font-bold text-slate-700">Jumlah</span>
              <div className="flex items-center gap-3 rounded-full border-2 border-slate-200 px-4 py-2 bg-white shadow-sm">
                <button type="button" onClick={() => adjustQuantity(-1)} className="px-3 py-1 text-lg font-bold text-slate-600 hover:text-emerald-600 transition-colors">
                  -
                </button>
                <span className="text-lg font-black text-slate-900 min-w-[2rem] text-center">{quantity}</span>
                <button type="button" onClick={() => adjustQuantity(1)} className="px-3 py-1 text-lg font-bold text-slate-600 hover:text-emerald-600 transition-colors">
                  +
                </button>
              </div>
              <span className="text-sm font-bold text-emerald-600">Subtotal {formatCurrency(product.price * quantity)}</span>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button className="flex-1 rounded-2xl border-2 border-emerald-600 bg-white px-6 py-4 text-base font-bold text-emerald-600 hover:bg-emerald-50 hover:scale-105 transition-all duration-300 shadow-md">
                Tambah ke Keranjang
              </button>
              <Link
                href="/dashboard-user/checkout"
                className="flex-1 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 text-center text-base font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Beli Sekarang
              </Link>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                Kurasi 12-titik perawatan
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                Seller terverifikasi pihak 3
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <Sparkles className="h-5 w-5 text-emerald-600" />
                Steam & sanitize included
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <Package className="h-5 w-5 text-emerald-600" />
                Packaging ramah lingkungan
              </li>
            </ul>
          </div>

          {/* Journey Produk Section - Inside Right Column */}
          <div className="rounded-3xl bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 border-2 border-emerald-100 p-6 shadow-xl overflow-hidden relative">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl -z-0"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-lime-200/20 to-emerald-200/20 rounded-full blur-3xl -z-0"></div>

            {/* Header */}
            <div className="relative z-10 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 p-3 shadow-lg">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Product Journey</h3>
                  <p className="text-xs text-slate-600">Dari seller hingga tangan kamu</p>
                </div>
              </div>
            </div>

            {/* Timeline - Compact Version */}
            <div className="relative z-10 space-y-4">
              {/* Step 1 */}
              <div className="flex items-start gap-3 group">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110">
                    <ShoppingBag className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-[8px] font-bold">✓</span>
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-xl p-3 shadow-md border border-blue-100 transform transition-all duration-300 group-hover:shadow-lg">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-slate-900">🛍️ Dibeli dari Seller</h4>
                    <span className="text-[10px] px-2 py-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-bold">STEP 1</span>
                  </div>
                  {product.shopName && product.shopLocation && (
                    <div className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2 border border-blue-200 mb-1">
                      <MapPin className="h-3 w-3 text-blue-600 flex-shrink-0" />
                      <span className="font-bold text-slate-900">{product.shopName}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-700">{product.shopLocation}</span>
                    </div>
                  )}
                  <p className="text-xs text-slate-600">Dari seller terpercaya</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3 group">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110">
                    <ShieldCheck className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-[8px] font-bold">✓</span>
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-xl p-3 shadow-md border border-purple-100 transform transition-all duration-300 group-hover:shadow-lg">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-slate-900">🛡️ Verifikasi Seller</h4>
                    <span className="text-[10px] px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-bold">STEP 2</span>
                  </div>
                  <p className="text-xs text-slate-600">Validasi identitas & kredibilitas</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3 group">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-[8px] font-bold">✓</span>
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-xl p-3 shadow-md border border-emerald-100 transform transition-all duration-300 group-hover:shadow-lg">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-slate-900">✅ Quality Check</h4>
                    <span className="text-[10px] px-2 py-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-bold">STEP 3</span>
                  </div>
                  <p className="text-xs text-slate-600">Inspeksi 12 titik detail</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-3 group">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-[8px] font-bold">✓</span>
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-xl p-3 shadow-md border border-cyan-100 transform transition-all duration-300 group-hover:shadow-lg">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-slate-900">✨ Steam & Sanitasi</h4>
                    <span className="text-[10px] px-2 py-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-bold">STEP 4</span>
                  </div>
                  <p className="text-xs text-slate-600">Deep cleaning profesional</p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex items-start gap-3 group">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110">
                    <Package className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-[8px] font-bold">✓</span>
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-xl p-3 shadow-md border border-violet-100 transform transition-all duration-300 group-hover:shadow-lg">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-slate-900">📦 Warehouse</h4>
                    <span className="text-[10px] px-2 py-0.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg font-bold">STEP 5</span>
                  </div>
                  <p className="text-xs text-slate-600">Storage eco-friendly</p>
                </div>
              </div>

              {/* Step 6 - Highlight */}
              <div className="flex items-start gap-3 group">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-xl transform transition-all duration-300 group-hover:scale-110 animate-pulse">
                    <Truck className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center shadow-md animate-bounce">
                    <span className="text-white text-[8px] font-bold">✓</span>
                  </div>
                </div>
                <div className="flex-1 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-3 shadow-lg border-2 border-amber-300 transform transition-all duration-300 group-hover:shadow-xl">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-slate-900">🚚 Siap Dikirim!</h4>
                    <span className="text-[10px] px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-bold shadow-md">READY</span>
                  </div>
                  <p className="text-xs text-slate-700 font-semibold">Estimasi 2-4 hari kerja 🎉</p>
                </div>
              </div>
            </div>

            {/* Trust Badges - Compact */}
            <div className="mt-6 pt-4 border-t border-slate-200 relative z-10">
              <div className="flex items-center justify-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                    <ShieldCheck className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="font-semibold text-slate-700">100% Verified</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                    <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="font-semibold text-slate-700">Quality</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                    <Sparkles className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="font-semibold text-slate-700">Eco</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-4" aria-labelledby="related-products-heading">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">Kurasi lain</p>
            <h2 id="related-products-heading" className="text-2xl font-bold text-slate-900">
              Produk serupa yang kamu suka
            </h2>
          </div>
          <Link href="/dashboard-user/products" className="text-sm font-semibold text-emerald-600">
            Lihat semua
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((item) => (
            <article key={item.id} className="rounded-2xl border border-emerald-50 bg-white p-4 shadow-sm">
              <div className="relative mb-3 overflow-hidden rounded-xl">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={320}
                  height={200}
                  className="h-40 w-full object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-emerald-600">
                  {item.category}
                </span>
              </div>
              <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
              <p className="text-sm text-slate-500">{item.description}</p>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="font-bold text-emerald-600">{formatCurrency(item.price)}</span>
                <Link href={`/dashboard-user/products/${item.id}`} className="text-emerald-600">
                  Detail
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}