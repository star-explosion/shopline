"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    q: "配送与安装需要多久？",
    a: "全国包邮，下单后3–5个工作日内由专业团队上门送装。含旧床垫清运服务，无需您自行处理。具体时效以下单时客服确认为准。",
  },
  {
    q: "不满意可以退货吗？",
    a: "支持30天无忧试睡。若试睡期间不满意，联系客服申请退货，我们安排上门取件，全额退款，无需您承担运费。",
  },
  {
    q: "床垫的质保政策是什么？",
    a: "全系列产品享5年品质质保。质保期内如出现非人为损坏的材质问题，免费上门维修或更换，保障您的长期睡眠投资。",
  },
  {
    q: "产品是你们自己生产的吗？",
    a: "是的。我们在惠州自建8000㎡生产基地，拥有独立生产线和质检团队，非委外代工或贴牌产品。从原料采购到出厂发货，全程自主掌控品质。",
  },
  {
    q: "如何选择适合我的型号？",
    a: "R-666适合追求软弹舒适体验的用户；R-888为酒店同款硬感版本，适合腰部支撑需求强的用户；R-999为旗舰乳胶款，适合对睡眠品质要求极高的用户。如需个性化建议，欢迎联系在线睡眠顾问。",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#E2DDD6] last:border-b-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-[#111111] group-hover:text-[#C6A86B] transition-colors">
          {q}
        </span>
        <ChevronDownIcon
          className={`w-4 h-4 text-[#6B6B6B] flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-48 opacity-100 pb-5" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-sm text-[#6B6B6B] leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="bg-white py-20 sm:py-24 border-t border-[#E2DDD6]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left: header */}
          <div>
            <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3">FAQ</p>
            <h2 className="font-display text-2xl sm:text-3xl text-[#111111] mb-4">
              常见问题
            </h2>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">
              购买前的所有疑问，在这里找到答案。也可随时联系我们的睡眠顾问。
            </p>
          </div>

          {/* Right: accordion */}
          <div className="lg:col-span-2">
            {faqs.map(({ q, a }) => (
              <FAQItem key={q} q={q} a={a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
