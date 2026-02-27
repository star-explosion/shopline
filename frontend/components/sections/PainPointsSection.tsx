"use client";

import { useEffect, useRef, useState } from "react";
import {
  ExclamationTriangleIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const painPoints = [
  {
    icon: "🪑",
    pain: "睡醒腰酸背痛",
    desc: "床垫无法提供脊椎精准支撑，长期压迫腰肌",
  },
  {
    icon: "📉",
    pain: "床垫塌陷变形",
    desc: "普通弹簧老化快，2-3年便失去支撑弹性",
  },
  {
    icon: "😤",
    pain: "翻身影响伴侣",
    desc: "传统联动弹簧，一人动作牵连整张床垫",
  },
  {
    icon: "🔥",
    pain: "夏天闷热难眠",
    desc: "不透气填充材料积热，影响深度睡眠",
  },
  {
    icon: "🏨",
    pain: "酒店睡得好，家里却不行",
    desc: "五星酒店床垫标准与家用普通款差距显著",
  },
];

const solutions = [
  {
    problem: "腰酸背痛",
    solution: "7区护脊弹簧设计",
    desc: "按人体压力分区配置弹簧密度，精准承托腰椎",
  },
  {
    problem: "床垫塌陷",
    solution: "高碳钢弹簧 · 不变形",
    desc: "美国礼恩派钢丝，250-280°C热处理，10年不塌陷",
  },
  {
    problem: "翻身干扰",
    solution: "独立袋装弹簧",
    desc: "每根弹簧独立运动，零传导，伴侣翻身无感知",
  },
  {
    problem: "夏天闷热",
    solution: "多层透气结构",
    desc: "乳胶天然透气 + 七孔纤维棉，全年恒温舒适",
  },
  {
    problem: "家床不如酒店",
    solution: "酒店同款直供",
    desc: "万豪、温德姆等五星酒店指定供货，同款体验到家",
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

export default function PainPointsSection() {
  const { ref: painRef, visible: painVisible } = useInView();
  const { ref: solRef, visible: solVisible } = useInView();

  return (
    <section className="bg-[#F8F8F6] border-t border-[#E2DDD6]">
      {/* ── Pain Points ── */}
      <div className="py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
          <div className="mb-12 sm:mb-16">
            <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3">COMMON SLEEP PROBLEMS</p>
            <h2 className="font-display text-2xl sm:text-3xl text-[#111111]">
              你可能正在经历这些问题
            </h2>
            <p className="mt-3 text-sm text-[#6B6B6B] max-w-lg leading-relaxed">
              许多人每天与糟糕的睡眠共存，却不知道这些问题是可以解决的。
            </p>
          </div>

          <div
            ref={painRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            {painPoints.map(({ icon, pain, desc }, i) => (
              <div
                key={pain}
                className="bg-white border border-[#E2DDD6] p-5 flex flex-col gap-3"
                style={{
                  opacity: painVisible ? 1 : 0,
                  transform: painVisible ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`,
                }}
              >
                <span className="text-2xl">{icon}</span>
                <div>
                  <p className="text-sm font-semibold text-[#111111] mb-1">{pain}</p>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Divider with arrow ── */}
      <div className="flex items-center justify-center gap-4 py-4 px-5">
        <div className="flex-1 max-w-xs h-px bg-[#E2DDD6]" />
        <div className="flex items-center gap-2 text-[#C6A86B]">
          <ExclamationTriangleIcon className="w-4 h-4" />
          <span className="text-xs tracking-[0.2em] text-[#6B6B6B]">皇室百兰的解决方案</span>
          <ArrowRightIcon className="w-4 h-4" />
        </div>
        <div className="flex-1 max-w-xs h-px bg-[#E2DDD6]" />
      </div>

      {/* ── Solutions ── */}
      <div className="py-16 sm:py-20 bg-white border-t border-[#E2DDD6]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
          <div className="mb-12">
            <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3">HOW WE SOLVE IT</p>
            <h2 className="font-display text-2xl sm:text-3xl text-[#111111]">
              每个痛点，都有精准解决方案
            </h2>
          </div>

          <div
            ref={solRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {solutions.map(({ problem, solution, desc }, i) => (
              <div
                key={problem}
                className="group flex gap-4 p-5 border border-[#E2DDD6] hover:border-[#C6A86B] transition-all duration-300"
                style={{
                  opacity: solVisible ? 1 : 0,
                  transform: solVisible ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s, border-color 0.3s`,
                }}
              >
                <CheckCircleIcon className="w-5 h-5 text-[#C6A86B] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-[#6B6B6B] tracking-widest mb-1">
                    解决：{problem}
                  </p>
                  <p className="text-sm font-semibold text-[#111111] mb-1.5">{solution}</p>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
