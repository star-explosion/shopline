"use client";

import { useTranslations } from "next-intl";

export default function SocialProofSection() {
  const t = useTranslations("social");

  const stats = [
    { number: t("hotelCount"), label: t("hotelLabel"), sub: t("hotelSub") },
    { number: t("yearsCount"), label: t("yearsLabel"), sub: t("yearsSub") },
    { number: t("reviewCount"), label: t("reviewLabel"), sub: t("reviewSub") },
    { number: t("exportCount"), label: t("exportLabel"), sub: t("exportSub") },
  ];

  return (
    <section className="section-padding bg-[#111111]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3">{t("eyebrow")}</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white mb-4">
            {t("title")}
          </h2>
        </div>

        {/* Stats grid — 2-col mobile, 4-col desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#111111] text-center py-7 px-4 sm:py-10 sm:px-6 hover:bg-[#1A1A1A] transition-colors duration-300"
            >
              <p className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#C6A86B] mb-2">
                {stat.number}
              </p>
              <p className="text-white text-xs sm:text-sm mb-1 tracking-wide">{stat.label}</p>
              <p className="text-white/40 text-[10px] sm:text-xs">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
