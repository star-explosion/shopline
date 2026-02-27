"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { number: "100,000+", label: "用户选择", sub: "遍布全国各城市" },
  { number: "98%", label: "好评率", sub: "真实用户反馈" },
  { number: "5年", label: "品质质保", sub: "官方承诺" },
  { number: "300+", label: "酒店合作", sub: "五星级酒店供货" },
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

export default function SocialProofNumbers() {
  const { ref, visible } = useInView();

  return (
    <section className="bg-[#111111] py-16 sm:py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          {stats.map(({ number, label, sub }, i) => (
            <div
              key={label}
              className="bg-[#111111] px-8 py-10 text-center"
              style={{
                opacity: visible ? 1 : 0,
                transition: `opacity 0.5s ease ${i * 0.1}s`,
              }}
            >
              <p className="font-display text-4xl sm:text-5xl text-[#C6A86B] mb-2 tracking-tight">
                {number}
              </p>
              <p className="text-sm font-medium text-white tracking-widest mb-1">{label}</p>
              <p className="text-[10px] text-white/30 tracking-wide">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
