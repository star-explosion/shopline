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

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let data: ProductsResponse = { products: [], total: 0, page: 1, limit: 12 };

  try {
    data = await fetchProducts(1, 6);
  } catch {
    // Sections that need products will handle empty gracefully
  }

  return (
    <div>
      <HeroSection />
      <TrustSection />
      <HotelCasesSection />
      <ProductHighlightSection products={data.products} />
      <ReviewsSection />
      <TechSection />
      <SocialProofSection />
      <CtaSection />

      {/* Footer */}
      <footer className="bg-[#111111] border-t border-white/10 py-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row justify-between gap-8">
          <div>
            <p className="font-display text-white text-lg tracking-widest mb-2">皇室百兰</p>
            <p className="text-white/40 text-xs leading-relaxed max-w-xs">
              专业酒店床垫工程项目供应商，集研发、生产、销售高品质床垫为一体，服务众多五星级酒店及国宾馆。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-xs text-white/40">
            <div className="space-y-2">
              <p className="text-white/70 font-medium mb-3 tracking-widest">产品</p>
              <p>云感乳胶弹簧床垫</p>
              <p>酒店专供硬感床垫（R-888）</p>
              <p>豪华旗舰乳胶床垫（R-999）</p>
            </div>
            <div className="space-y-2">
              <p className="text-white/70 font-medium mb-3 tracking-widest">关于</p>
              <p>品牌故事</p>
              <p>资质认证</p>
              <p>工程案例</p>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 mt-10 pt-6 border-t border-white/10">
          <p className="text-white/25 text-xs text-center">
            © 2024 皇室百兰 Royal Baland · ISO9001 · ISO14001 认证企业
          </p>
        </div>
      </footer>
    </div>
  );
}
