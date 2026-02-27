import { fetchProduct } from "@/lib/api";
import { Product } from "@/types";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  let product: Product;

  try {
    product = await fetchProduct(parseInt(id));
  } catch {
    notFound();
  }

  return <ProductDetailClient product={product!} />;
}
