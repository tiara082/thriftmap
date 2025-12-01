import ProductDetail from "@/components/dashboard-user/ProductDetail";
import { getProductById } from "@/lib/product-data";
import { notFound } from "next/navigation";

interface ProductDetailPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { productId } = await params;
  const product = getProductById(productId);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
