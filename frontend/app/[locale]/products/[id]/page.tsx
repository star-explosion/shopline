import { fetchProduct } from "@/lib/api";
import { Product } from "@/types";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://royalsleep.com";

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  let name = "产品详情";
  try {
    const product = await fetchProduct(parseInt(id));
    name = product.name;
  } catch {}
  return {
    title: t("productTitle", { name }),
    description: t("productDesc", { name }),
    alternates: {
      languages: {
        zh: `${BASE}/zh/products/${id}`,
        en: `${BASE}/en/products/${id}`,
        ja: `${BASE}/ja/products/${id}`,
      },
    },
    openGraph: { title: t("productTitle", { name }), description: t("productDesc", { name }) },
  };
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
