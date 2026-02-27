"use client";

import { useTranslations } from "next-intl";

export default function TechSection() {
  const t = useTranslations("tech");

  const features = [
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7 sm:w-8 sm:h-8" stroke="currentColor" strokeWidth="1.5">
          <path d="M24 4C24 4 12 12 12 24C12 36 24 44 24 44C24 44 36 36 36 24C36 12 24 4 24 4Z" />
          <path d="M18 24C18 20.686 20.686 18 24 18C27.314 18 30 20.686 30 24" />
          <path d="M16 32L32 16" strokeDasharray="3 3" />
        </svg>
      ),
      title: t("spineTitle"),
      desc: t("spineDesc"),
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7 sm:w-8 sm:h-8" stroke="currentColor" strokeWidth="1.5">
          <circle cx="24" cy="24" r="16" />
          <path d="M24 8V16M24 32V40M8 24H16M32 24H40" />
          <path d="M15 15L20 20M28 28L33 33M15 33L20 28M28 20L33 15" />
        </svg>
      ),
      title: t("breathTitle"),
      desc: t("breathDesc"),
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7 sm:w-8 sm:h-8" stroke="currentColor" strokeWidth="1.5">
          <path d="M24 6L30 18H42L32 26L36 38L24 30L12 38L16 26L6 18H18L24 6Z" />
        </svg>
      ),
      title: t("antimicTitle"),
      desc: t("antimicDesc"),
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7 sm:w-8 sm:h-8" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 36C12 36 16 24 24 24C32 24 36 36 36 36" />
          <path d="M24 24C24 24 20 16 24 8C28 16 24 24 24 24Z" />
          <path d="M10 40H38" />
        </svg>
      ),
      title: t("latexTitle"),
      desc: t("latexDesc"),
    },
  ];

  return (
    <section className="section-padding bg-[#F8F8F6]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3">{t("eyebrow")}</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#111111] mb-4">
            {t("title")}
          </h2>
          <p className="text-[#6B6B6B] text-sm max-w-lg mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="group flex items-start gap-4 sm:flex-col sm:items-center sm:gap-0 sm:text-center"
            >
              {/* Icon box */}
              <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center border border-[#E2DDD6] text-[#C6A86B] group-hover:bg-[#C6A86B] group-hover:text-white group-hover:border-[#C6A86B] transition-all duration-300 sm:mx-auto sm:mb-4">
                {f.icon}
              </div>
              {/* Text */}
              <div className="flex-1 sm:flex-none">
                <h3 className="font-semibold text-[#111111] text-sm mb-1.5 sm:mb-3 tracking-wide">
                  {f.title}
                </h3>
                <p className="text-xs text-[#6B6B6B] leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
