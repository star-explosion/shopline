"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CheckCircleIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";

const factoryImages = [
  { src: "/images/photos/factory-cutting.png", alt: "生产车间", caption: "生产车间" },
  { src: "/images/photos/factory-storage.png", alt: "质检流程", caption: "质检流程" },
  { src: "/images/photos/factory-quilting.png", alt: "绗缝工艺", caption: "绗缝工艺" },
  { src: "/images/photos/factory-materials.png", alt: "打包发货", caption: "打包发货" },
];

const bullets = [
  "自有生产线，全程可控",
  "多道质检流程，逐张抽检",
  "稳定供货能力，无断货风险",
  "非贴牌，源头制造商",
];

const certBadges = [
  "10年生产经验",
  "出口欧美标准",
  "ISO9001 认证",
  "ISO14001 认证",
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

export default function FactoryShowcase() {
  const { ref, visible } = useInView();

  return (
    <section className="bg-[#F8F8F6] py-20 sm:py-24 border-t border-[#E2DDD6]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          {/* Left: text block */}
          <div className="space-y-6">
            <div>
              <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3">OUR FACTORY</p>
              <h2 className="font-display text-2xl sm:text-3xl text-[#111111] leading-snug mb-4">
                我们不是贴牌，<br />而是自有工厂生产
              </h2>
              <p className="text-sm text-[#6B6B6B] leading-relaxed max-w-md">
                惠州自建8000㎡生产基地，引进全自动裁剪、绗缝等核心设备。每一张床垫从原料入库到成品出厂，均经过多道专业质检，由自有工人精细作业，非委外代工。
              </p>
            </div>

            {/* Cert badges */}
            <div className="flex flex-wrap gap-2">
              {certBadges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 text-[10px] tracking-widest border border-[#C6A86B]/40 text-[#C6A86B] px-3 py-1.5"
                >
                  <ShieldCheckIcon className="w-3 h-3" />
                  {badge}
                </span>
              ))}
            </div>

            <ul className="space-y-3">
              {bullets.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircleIcon className="w-4 h-4 text-[#C6A86B] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#111111]">{item}</span>
                </li>
              ))}
            </ul>

            {/* Showroom note */}
            <div className="border-l-2 border-[#C6A86B] pl-4">
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                深圳总部设有五星酒店睡眠体验中心，所有产品均可实地体验。
              </p>
            </div>
          </div>

          {/* Right: 2×2 image grid (desktop) / horizontal scroll (mobile) */}
          {/* Desktop grid */}
          <div className="hidden lg:grid grid-cols-2 gap-3">
            {factoryImages.map(({ src, alt, caption }, i) => (
              <div
                key={src}
                className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-md group"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "scale(1)" : "scale(0.97)",
                  transition: `opacity 0.5s ease ${0.1 + i * 0.08}s, transform 0.5s ease ${0.1 + i * 0.08}s`,
                }}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 25vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-2.5 left-3 text-xs text-white font-medium tracking-wide">
                  {caption}
                </span>
              </div>
            ))}
          </div>

          {/* Mobile: horizontal scroll gallery */}
          <div className="lg:hidden">
            <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory -mx-5 px-5">
              {factoryImages.map(({ src, alt, caption }) => (
                <div
                  key={src}
                  className="relative flex-shrink-0 w-[75vw] aspect-[4/3] overflow-hidden rounded-lg shadow-md snap-start"
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="75vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-3 text-xs text-white font-medium tracking-wide">
                    {caption}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
