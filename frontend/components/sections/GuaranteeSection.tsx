"use client";

import { useEffect, useRef, useState } from "react";
import {
  CalendarDaysIcon,
  ArrowPathIcon,
  TruckIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const guarantees = [
  {
    icon: CalendarDaysIcon,
    title: "30天试睡",
    desc: "入住30天，不满意随时申请退货，无需任何理由。",
  },
  {
    icon: ArrowPathIcon,
    title: "免费退换",
    desc: "退货运费全程由我们承担，您无需支付任何额外费用。",
  },
  {
    icon: TruckIcon,
    title: "送货上门",
    desc: "专业团队上门配送安装，并免费清运您的旧床垫。",
  },
  {
    icon: GlobeAltIcon,
    title: "全国包邮",
    desc: "覆盖全国主要城市，3–5个工作日到达，时效可查。",
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function GuaranteeSection() {
  const { ref, visible } = useInView();

  return (
    <section className="bg-[#F8F8F6] py-20 sm:py-24 border-t border-[#E2DDD6]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
        {/* Gold-bordered headline box */}
        <div className="border border-[#C6A86B]/50 bg-white px-6 sm:px-10 py-8 sm:py-10 mb-12 sm:mb-16 text-center">
          <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3">ZERO RISK GUARANTEE</p>
          <h2 className="font-display text-2xl sm:text-3xl text-[#111111] mb-3">
            不满意全额退款 · 运费我们承担
          </h2>
          <p className="text-sm text-[#6B6B6B] max-w-md mx-auto leading-relaxed">
            我们对产品品质充满信心。如果您在30天内对睡眠体验不满意，无条件全额退款，一分钱运费不收。
          </p>
        </div>

        {/* Guarantee pillars */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {guarantees.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="bg-white border border-[#E2DDD6] p-6 flex flex-col items-start gap-4"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
              }}
            >
              <div className="w-10 h-10 border border-[#C6A86B]/30 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-[#C6A86B]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#111111] mb-1.5">{title}</p>
                <p className="text-xs text-[#6B6B6B] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom reassurance line */}
        <div className="mt-10 text-center">
          <p className="text-xs text-[#6B6B6B] tracking-wide">
            已为超过 <span className="text-[#C6A86B] font-medium">10,000+</span> 家庭提供无忧试睡服务 · 退款成功率 <span className="text-[#C6A86B] font-medium">100%</span>
          </p>
        </div>
      </div>
    </section>
  );
}
