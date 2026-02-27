import { Link } from "@/i18n/navigation";
import { fetchProducts } from "@/lib/api";
import Image from "next/image";
import ReviewsSection from "@/components/sections/ReviewsSection";
import TrustBar from "@/components/ui/TrustBar";
import LpLeadForm from "@/components/LpLeadForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "酒店床垫批量采购 | 皇室百兰",
  description: "五星级酒店及国宾馆指定供应商，批量采购享专属折扣，ISO9001及ISO14001双认证品质。",
};

export default async function HotelLandingPage() {
  let products: { id: number; name: string; image: string; price: number; description: string }[] = [];
  try {
    const data = await fetchProducts(1, 3);
    products = data.products;
  } catch {}

  return (
    <div className="bg-[#F8F8F6] min-h-screen">
      {/* Hero */}
      <div className="relative min-h-[90vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&q=80')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative text-center text-white px-6 max-w-3xl mx-auto">
          <span className="inline-block text-[10px] tracking-[0.4em] text-[#C6A86B] border border-[#C6A86B]/50 px-4 py-2 mb-6">
            酒店工程采购专属通道
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-semibold mb-6 leading-tight">
            五星级酒店首选
            <br />
            床垫供应商
          </h1>
          <p className="text-white/75 text-base mb-8 leading-relaxed">
            国宾馆 · 万豪 · 温德姆 · 豪生 · 华美达 —— 众多五星级酒店及国宾馆指定供应商
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="px-10 py-4 bg-[#C6A86B] text-white text-sm tracking-widest hover:bg-[#A8884A] transition-colors">
              查看产品目录
            </Link>
            <a href="#contact" className="px-10 py-4 border border-white/50 text-white text-sm tracking-widest hover:bg-white/10 transition-colors">
              获取报价
            </a>
          </div>
        </div>
      </div>

      {/* Trust signals */}
      <div className="bg-white border-b border-[#E2DDD6] py-6">
        <div className="max-w-4xl mx-auto px-6">
          <TrustBar variant="horizontal" />
        </div>
      </div>

      {/* Key stats */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3">WHY CHOOSE US</p>
          <h2 className="font-display text-3xl md:text-4xl text-[#111111] mb-10">酒店采购的最优选择</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { n: "30+", l: "合作酒店", d: "含国宾馆及五星级酒店" },
              { n: "8000㎡", l: "生产基地", d: "深圳总部+惠州工厂" },
              { n: "7天", l: "快速交付", d: "急单优先处理" },
              { n: "ISO²", l: "双体系认证", d: "品质稳定可靠" },
            ].map((s) => (
              <div key={s.l} className="border border-[#E2DDD6] p-5">
                <p className="font-display text-2xl text-[#C6A86B] font-semibold mb-1">{s.n}</p>
                <p className="text-sm font-medium text-[#111111] mb-0.5">{s.l}</p>
                <p className="text-xs text-[#6B6B6B]">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      {products.length > 0 && (
        <section className="section-padding bg-[#F8F8F6]">
          <div className="max-w-4xl mx-auto px-6">
            <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3 text-center">HOTEL COLLECTION</p>
            <h2 className="font-display text-3xl text-[#111111] mb-8 text-center">酒店专供产品系列</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {products.map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} className="group bg-white border border-[#E2DDD6] hover:border-[#C6A86B] transition-colors">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                    <span className="absolute top-3 left-3 bg-[#C6A86B] text-white text-[10px] tracking-widest px-2 py-0.5">酒店同款</span>
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-medium text-[#111111] mb-1">{p.name}</p>
                    <p className="font-display text-lg text-[#C6A86B]">¥{p.price.toFixed(0)} <span className="text-xs text-[#6B6B6B]">起</span></p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ReviewsSection />

      {/* Lead capture form */}
      <section id="contact" className="section-padding bg-[#111111]">
        <div className="max-w-lg mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3">GET QUOTE</p>
          <h2 className="font-display text-3xl text-white mb-4">获取酒店采购专属报价</h2>
          <p className="text-white/50 text-sm mb-8">留下联系方式，专属采购顾问将在24小时内与您联系</p>
          <LpLeadForm source="lp_hotel" locale="zh" />
        </div>
      </section>
    </div>
  );
}
