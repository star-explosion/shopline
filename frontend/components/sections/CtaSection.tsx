"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function CtaSection() {
  const t = useTranslations("cta");

  return (
    <section
      className="relative section-padding bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=1600&q=70')",
      }}
    >
      <div className="absolute inset-0 bg-[#F8F8F6]/92" />
      <div className="relative max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <p className="text-xs tracking-[0.4em] text-[#C6A86B] mb-4">
          {t("eyebrow")}
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-[#111111] mb-6 leading-tight whitespace-pre-line">
          {t("title")}
        </h2>
        <p className="text-[#6B6B6B] text-sm leading-relaxed max-w-lg mx-auto mb-10">
          {t("subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="inline-block px-12 py-4 bg-[#111111] text-white text-sm tracking-[0.2em] font-medium hover:bg-[#C6A86B] transition-colors duration-300"
          >
            {t("browseProducts")}
          </Link>
          <Link
            href="/brand"
            className="inline-block px-12 py-4 border border-[#111111] text-[#111111] text-sm tracking-[0.2em] font-medium hover:bg-[#111111] hover:text-white transition-colors duration-300"
          >
            {t("learnBrand")}
          </Link>
        </div>
      </div>
    </section>
  );
}
