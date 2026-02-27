"use client";

import { useEffect, useRef, useState } from "react";
import {
  BuildingStorefrontIcon,
  BeakerIcon,
  CpuChipIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const pillars = [
  {
    icon: BuildingStorefrontIcon,
    title: "自有工厂直供",
    desc: "惠州自建生产基地，8000㎡专业车间，无中间商加价，出厂即出品。",
  },
  {
    icon: BeakerIcon,
    title: "比利时天然乳胶",
    desc: "联合美国、德国、比利时、韩国等7国顶级供应商，原材料可溯源。",
  },
  {
    icon: CpuChipIcon,
    title: "美国礼恩派弹簧",
    desc: "高碳钢丝经250–280°C热处理，独立袋装设计，分区承托零干扰。",
  },
  {
    icon: ShieldCheckIcon,
    title: "ISO双认证品质",
    desc: "通过ISO9001质量体系与ISO14001环境体系双认证，行业最高标准。",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function ValueProposition() {
  const { ref, visible } = useInView();

  return (
    <section className="bg-white py-20 sm:py-24 border-t border-[#E2DDD6]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3">WHY THIS PRICE</p>
          <h2 className="font-display text-2xl sm:text-3xl text-[#111111]">
            为什么值这个价格
          </h2>
        </div>

        {/* Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {pillars.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="group border border-[#E2DDD6] p-6 hover:border-[#C6A86B] transition-all duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s, border-color 0.3s`,
              }}
            >
              <Icon className="w-6 h-6 text-[#C6A86B] mb-4" />
              <h3 className="text-sm font-semibold text-[#111111] mb-2 tracking-wide">
                {title}
              </h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
