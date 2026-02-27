import { fetchProducts } from "@/lib/api";
import { ProductsResponse } from "@/types";
import HeroSection from "@/components/sections/HeroSection";
import TrustSection from "@/components/sections/TrustSection";
import HotelCasesSection from "@/components/sections/HotelCasesSection";
import ProductHighlightSection from "@/components/sections/ProductHighlightSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import TechSection from "@/components/sections/TechSection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import CtaSection from "@/components/sections/CtaSection";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import PageTracker from "@/components/PageTracker";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "footer" });
  let data: ProductsResponse = { products: [], total: 0, page: 1, limit: 12 };

  try {
    data = await fetchProducts(1, 6);
  } catch {
    // graceful fallback
  }

  return (
    <div>
      <PageTracker event="view_homepage" />
      <HeroSection />
      <TrustSection />
      <HotelCasesSection />
      <ProductHighlightSection products={data.products} />
      <ReviewsSection />
      <TechSection />
      <SocialProofSection />
      <CtaSection />

      <footer className="bg-[#111111] border-t border-white/10 py-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row justify-between gap-8">
          <div>
            <p className="font-display text-white text-lg tracking-widest mb-2">皇室百兰</p>
            <p className="text-white/40 text-xs leading-relaxed max-w-xs">{t("tagline")}</p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-xs text-white/40">
            <div className="space-y-2">
              <p className="text-white/70 font-medium mb-3 tracking-widest">{t("productsTitle")}</p>
              <Link href="/products" className="block hover:text-white/70 transition-colors">{t("product1")}</Link>
              <Link href="/products" className="block hover:text-white/70 transition-colors">{t("product2")}</Link>
              <Link href="/products" className="block hover:text-white/70 transition-colors">{t("product3")}</Link>
            </div>
            <div className="space-y-2">
              <p className="text-white/70 font-medium mb-3 tracking-widest">{t("aboutTitle")}</p>
              <Link href="/brand" className="block hover:text-white/70 transition-colors">{t("about1")}</Link>
              <p>{t("about2")}</p>
              <p>{t("about3")}</p>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 mt-10 pt-6 border-t border-white/10">
          <p className="text-white/25 text-xs text-center">{t("copyright")}</p>
        </div>
      </footer>
    </div>
  );
}
