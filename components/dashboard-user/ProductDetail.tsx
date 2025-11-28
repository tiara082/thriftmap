"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircle2, Heart, MapPin, Package, ShieldCheck, Star, Truck } from "lucide-react";
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
    <section className="space-y-10" aria-labelledby="product-detail-heading">
      <nav className="flex items-center gap-2 text-sm text-slate-500" aria-label="Breadcrumb">
        <Link href="/dashboard-user" className="hover:text-emerald-600">
          Home
        </Link>
        <span>/</span>
        <Link href="/dashboard-user/products" className="hover:text-emerald-600">
          Produk
        </Link>
        <span>/</span>
        <span className="text-slate-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-emerald-50 bg-white shadow-lg">
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
              className="absolute right-5 top-5 rounded-full bg-white/90 p-3 text-rose-500 shadow-md"
              aria-label="Tambah ke wishlist"
            >
              <Heart className="h-5 w-5" />
            </button>
            <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-600">
              {product.condition ?? "Terawat"}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {gallery.map((image) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(image)}
                className={`relative aspect-square overflow-hidden rounded-2xl border ${
                  activeImage === image ? "border-emerald-400" : "border-transparent"
                } bg-white shadow`}
              >
                <Image src={image} alt="Thumbnail produk" fill sizes="(max-width: 768px) 25vw, 10vw" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6 rounded-3xl border border-emerald-50 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">{product.category}</p>
            <h1 id="product-detail-heading" className="mt-2 text-3xl font-bold text-slate-900">
              {product.name}
            </h1>
            <p className="mt-3 text-sm text-slate-500">{product.description}</p>
          </div>

          <div className="flex flex-wrap items-baseline gap-4">
            <span className="text-4xl font-bold text-emerald-600">{formatCurrency(product.price)}</span>
            <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
              Dilihat {product.views}x
            </div>
          </div>

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

          <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 px-4 py-3">
            <span className="text-sm font-semibold text-slate-500">Jumlah</span>
            <div className="flex items-center gap-3 rounded-full border border-slate-200 px-3 py-1">
              <button type="button" onClick={() => adjustQuantity(-1)} className="px-2 py-1 text-lg text-slate-600">
                -
              </button>
              <span className="text-lg font-semibold text-slate-900">{quantity}</span>
              <button type="button" onClick={() => adjustQuantity(1)} className="px-2 py-1 text-lg text-slate-600">
                +
              </button>
            </div>
            <span className="text-xs text-slate-500">Subtotal {formatCurrency(product.price * quantity)}</span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="flex-1 rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-4 text-sm font-semibold text-emerald-600">
              Tambah ke Keranjang
            </button>
            <Link
              href="/dashboard-user/checkout"
              className="flex-1 rounded-2xl bg-emerald-600 px-6 py-4 text-center text-sm font-semibold text-white shadow-lg"
            >
              Beli Sekarang
            </Link>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {benefitList.map(({ id, label, icon: Icon }) => (
              <li key={id} className="flex items-center gap-3 text-sm text-slate-600">
                <Icon className="h-5 w-5 text-emerald-600" />
                {label}
              </li>
            ))}
          </ul>
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