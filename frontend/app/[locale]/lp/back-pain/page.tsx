import { Link } from "@/i18n/navigation";
import ReviewsSection from "@/components/sections/ReviewsSection";
import TrustBar from "@/components/ui/TrustBar";
import LpLeadForm from "@/components/LpLeadForm";

export const metadata = {
  title: "腰痛困扰？从床垫开始改变 | 皇室百兰",
  description: "独立袋装弹簧护脊技术，采用美国礼恩派弹簧系统，精准支撑腰椎。ISO9001认证品质保障。",
};

export default function BackPainLandingPage() {
  return (
    <div className="bg-[#F8F8F6] min-h-screen">
      {/* Hero */}
      <div className="relative min-h-[90vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1600&q=80')" }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative text-center text-white px-6 max-w-3xl mx-auto">
          <span className="inline-block text-[10px] tracking-[0.4em] text-[#C6A86B] border border-[#C6A86B]/50 px-4 py-2 mb-6">
            独立袋装弹簧护脊技术
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-semibold mb-6 leading-tight">
            告别腰痛
            <br />
            从今晚开始
          </h1>
          <p className="text-white/75 text-base mb-8 leading-relaxed max-w-xl mx-auto">
            众多用户反馈，使用皇室百兰独立袋装弹簧床垫后腰背不适明显改善。
            采用美国礼恩派弹簧技术，精准承托每一个脊椎节点。
          </p>
          <Link href="/products" className="inline-block px-12 py-4 bg-[#C6A86B] text-white text-sm tracking-widest hover:bg-[#A8884A] transition-colors">
            选择护脊床垫
          </Link>
        </div>
      </div>

      {/* Trust bar */}
      <div className="bg-white border-b border-[#E2DDD6] py-6">
        <div className="max-w-4xl mx-auto px-6"><TrustBar variant="horizontal" /></div>
      </div>

      {/* Science section */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3">SCIENCE</p>
            <h2 className="font-display text-3xl text-[#111111] mb-4">为什么床垫影响腰椎健康？</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { t: "支撑不足", d: "普通床垫无法均匀支撑腰部，长期导致腰椎下沉变形，是晨起腰痛的根源。" },
              { t: "独立袋装弹簧支撑", d: "皇室百兰采用美国礼恩派独立袋装弹簧系统，按人体压力分区配置密度，腰部区域加密，精准承托不塌陷。" },
              { t: "专业品质保障", d: "每张床垫均经过床垫滚压测试机严格检测，通过ISO9001质量管理体系认证，品质可靠。" },
            ].map((item) => (
              <div key={item.t} className="border border-[#E2DDD6] p-6">
                <h3 className="font-semibold text-[#111111] text-sm mb-3">{item.t}</h3>
                <p className="text-xs text-[#6B6B6B] leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection />

      {/* CTA */}
      <section className="section-padding bg-[#111111] text-center">
        <div className="max-w-lg mx-auto px-6">
          <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3">FREE CONSULTATION</p>
          <h2 className="font-display text-3xl text-white mb-4">预约免费睡眠顾问咨询</h2>
          <p className="text-white/50 text-sm mb-8">专业睡眠顾问为您推荐最适合的护脊方案，30天试睡保障</p>
          <LpLeadForm source="lp_back-pain" locale="zh" />
        </div>
      </section>
    </div>
  );
}
