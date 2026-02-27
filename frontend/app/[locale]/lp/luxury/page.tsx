import { Link } from "@/i18n/navigation";
import { fetchProducts } from "@/lib/api";
import Image from "next/image";
import ReviewsSection from "@/components/sections/ReviewsSection";
import TrustBar from "@/components/ui/TrustBar";
import LpLeadForm from "@/components/LpLeadForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "顶级家居睡眠升级 | 皇室百兰旗舰款",
  description: "比利时天然乳胶 + 美国礼恩派弹簧工艺，顶级家居的睡眠升级选择。限量旗舰款，现货发售。",
};

export default async function LuxuryLandingPage() {
  let featuredProduct = null;
  try {
    const data = await fetchProducts(1, 6);
    featuredProduct = data.products.find((p: { price: number }) => p.price >= 5000) || data.products[data.products.length - 1];
  } catch {}

  return (
    <div className="bg-[#111111] min-h-screen">
      {/* Hero */}
      <div className="relative min-h-screen flex items-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=1600&q=80')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-10 w-full">
          <div className="max-w-xl">
            <span className="inline-block text-[10px] tracking-[0.5em] text-[#C6A86B] border border-[#C6A86B]/40 px-4 py-2 mb-8">
              EXCLUSIVE · LIMITED EDITION
            </span>
            <h1 className="font-display text-6xl md:text-7xl font-semibold text-white mb-6 leading-tight">
              睡眠的
              <br />
              极致奢享
            </h1>
            <p className="text-white/65 text-base mb-10 leading-relaxed">
              比利时天然乳胶 · 比利时贝卡特进口面料 · 美国礼恩派高碳钢弹簧体系。
              这不只是一张床垫，这是一种生活方式的选择。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products" className="inline-block px-12 py-4 bg-[#C6A86B] text-white text-sm tracking-widest hover:bg-[#A8884A] transition-colors">
                查看旗舰款
              </Link>
              <a href="#order" className="inline-block px-12 py-4 border border-white/30 text-white text-sm tracking-widest hover:bg-white/5 transition-colors">
                预约体验
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Featured product highlight */}
      {featuredProduct && (
        <section className="section-padding bg-[#0F0F0F]">
          <div className="max-w-4xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-square overflow-hidden">
                <Image src={featuredProduct.image} alt={featuredProduct.name} fill className="object-cover" sizes="50vw" />
                <span className="absolute top-5 left-5 bg-[#C6A86B] text-white text-[10px] tracking-widest px-3 py-1.5">旗舰款</span>
              </div>
              <div>
                <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3">FLAGSHIP</p>
                <h2 className="font-display text-3xl text-white mb-4">{featuredProduct.name}</h2>
                <p className="text-white/55 text-sm leading-relaxed mb-6">{featuredProduct.description}</p>
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-display text-3xl text-[#C6A86B]">¥{featuredProduct.price.toFixed(0)}</span>
                  <span className="text-white/40 text-xs line-through">¥{(featuredProduct.price * 1.5).toFixed(0)}</span>
                </div>
                <div className="border border-white/10 p-4 mb-6">
                  <TrustBar variant="horizontal" />
                </div>
                <Link href={`/products/${featuredProduct.id}`} className="block w-full py-4 bg-[#C6A86B] text-white text-sm tracking-widest text-center hover:bg-[#A8884A] transition-colors">
                  立即购买
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <ReviewsSection />

      {/* CTA / Lead */}
      <section id="order" className="section-padding bg-[#0A0A0A]">
        <div className="max-w-lg mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3">VIP SERVICE</p>
          <h2 className="font-display text-3xl text-white mb-4">预约VIP专属体验</h2>
          <p className="text-white/40 text-sm mb-8">留下联系方式，我们将为您安排专属睡眠顾问及到家体验服务</p>
          <LpLeadForm source="lp_luxury" locale="zh" />
        </div>
      </section>
    </div>
  );
}
