"use client";

import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image — next/image with priority for LCP optimization */}
      <Image
        src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304"
        alt="Luxury bedroom — 皇室百兰高端睡眠体验"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
        quality={75}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-5 sm:px-6 max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.4em] text-[#C6A86B] mb-5 sm:mb-6 animate-fade-in">
          {t("eyebrow")}
        </p>

        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-semibold leading-tight mb-5 sm:mb-6 animate-fade-in-up whitespace-pre-line">
          {t("title")}
        </h1>

        <p
          className="text-sm sm:text-base md:text-lg text-white/75 mb-8 sm:mb-10 tracking-wide animate-fade-in-up"
          style={{ animationDelay: "150ms" }}
        >
          {t("subtitle")}
        </p>

        <div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center animate-fade-in-up"
          style={{ animationDelay: "250ms" }}
        >
          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center min-h-[52px] px-10 py-4 bg-[#C6A86B] text-white text-sm tracking-[0.2em] font-medium hover:bg-[#A8884A] active:scale-[0.99] transition-colors duration-300"
          >
            {t("cta")}
          </Link>
          <Link
            href="/brand"
            className="w-full sm:w-auto inline-flex items-center justify-center min-h-[52px] px-10 py-4 border border-white/50 text-white text-sm tracking-[0.2em] font-medium hover:bg-white/10 active:scale-[0.99] transition-colors duration-300"
          >
            {t("brandCta")}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDownIcon className="w-5 h-5 text-white/50" />
      </div>
    </section>
  );
}
