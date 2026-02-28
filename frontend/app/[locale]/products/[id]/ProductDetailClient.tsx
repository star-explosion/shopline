"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import { createCheckoutSession } from "@/lib/api";
import { ChevronLeftIcon, CheckIcon } from "@heroicons/react/24/outline";
import TrustBar from "@/components/ui/TrustBar";
import UrgencyWidget from "@/components/ui/UrgencyWidget";
import ReviewsSection from "@/components/sections/ReviewsSection";
import ValueProposition from "@/components/sections/ValueProposition";
import PainPointsSection from "@/components/sections/PainPointsSection";
import FactoryShowcase from "@/components/sections/FactoryShowcase";
import SocialProofNumbers from "@/components/sections/SocialProofNumbers";
import GuaranteeSection from "@/components/sections/GuaranteeSection";
import FAQSection from "@/components/sections/FAQSection";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { trackEvent, trackCTAClick } from "@/lib/analytics";
import { useScrollDepth } from "@/hooks/useScrollDepth";
import { useLocale } from "next-intl";

interface Props {
  product: Product;
}

const GUEST_USER_ID = 1;

const PLACEHOLDER_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23EDE9E3'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%23B0A99A'%3E图片暂缺%3C/text%3E%3C/svg%3E";

function computeOriginalPrice(price: number): number {
  return Math.ceil((price * 1.5) / 100) * 100;
}

export default function ProductDetailClient({ product }: Props) {
  const { addItem, openDrawer } = useCart();
  const locale = useLocale();
  const t = useTranslations("products");
  const td = useTranslations("productDetail");
  const tc = useTranslations("cart");

  const TAB_KEYS = [
    { key: "tabMaterial", content: "tabMaterialContent" },
    { key: "tabFeel", content: "tabFeelContent" },
    { key: "tabTech", content: "tabTechContent" },
  ] as const;

  type TabKey = typeof TAB_KEYS[number]["key"];

  const [activeTab, setActiveTab] = useState<TabKey>("tabMaterial");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [buyError, setBuyError] = useState("");
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  useScrollDepth();

  const gallery = product.images?.length > 0 ? product.images : [product.image];
  const [activeImage, setActiveImage] = useState(gallery[0]);

  const originalPrice =
    typeof product.originalPrice === "number" && product.originalPrice > product.price
      ? product.originalPrice
      : computeOriginalPrice(product.price);
  const savings = Math.max(0, originalPrice - product.price);
  const isLowStock = product.stock > 0 && product.stock <= 15;

  function inferCode(): "R666" | "R888" | "R999" | null {
    const raw = (product.code || product.name || "").toUpperCase();
    if (raw.includes("R666") || raw.includes("R-666")) return "R666";
    if (raw.includes("R888") || raw.includes("R-888")) return "R888";
    if (raw.includes("R999") || raw.includes("R-999")) return "R999";
    return null;
  }

  function getTagline(code: "R666" | "R888" | "R999" | null): string {
    if (code === "R666") return td("taglines.R666");
    if (code === "R888") return td("taglines.R888");
    if (code === "R999") return td("taglines.R999");
    return td("taglines.default");
  }

  const code = inferCode();
  const tagline = getTagline(code);

  const name =
    locale === "en"
      ? product.nameEn || product.name
      : locale === "ja"
        ? product.nameJa || product.name
        : product.name;
  const subtitle =
    locale === "en"
      ? product.subtitleEn || product.subtitle || ""
      : locale === "ja"
        ? product.subtitleJa || product.subtitle || ""
        : product.subtitle || "";
  const description =
    locale === "en"
      ? product.descriptionEn || product.description
      : locale === "ja"
        ? product.descriptionJa || product.description
        : product.description;

  const KEY_BENEFITS = [
    td("benefits.hotel"),
    td("benefits.latex"),
    td("benefits.spring"),
    td("benefits.cert"),
  ];

  function getImageSrc(src: string) {
    return imgErrors[src] ? PLACEHOLDER_SRC : src;
  }

  function handleImageError(src: string) {
    setImgErrors((prev) => ({ ...prev, [src]: true }));
  }

  useEffect(() => {
    trackEvent("view_product", product.id);
  }, [product.id]);

  function handleAdd() {
    for (let i = 0; i < qty; i++) {
      addItem(product);
    }
    trackEvent("add_to_cart", product.id);
    openDrawer();
  }

  async function handleBuyNow(ctaLabel = "buy_now") {
    if (product.stock === 0) return;
    setLoading(true);
    setBuyError("");
    trackCTAClick(ctaLabel, product.id);
    trackEvent("begin_checkout", product.id);
    try {
      const data = await createCheckoutSession({
        userId: GUEST_USER_ID,
        items: [{ productId: product.id, quantity: qty }],
      });
      window.location.href = data.url;
    } catch {
      setBuyError(tc("errorMsg"));
      setLoading(false);
    }
  }

  return (
    <div>
      {/* ── Breadcrumb ── */}
      <div className="pt-16 sm:pt-20 pb-4 bg-white border-b border-[#E2DDD6]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-xs text-[#6B6B6B] hover:text-[#111111] tracking-widest transition-colors"
          >
            <ChevronLeftIcon className="w-3 h-3" />
            {t("collection")}
          </Link>
        </div>
      </div>

      {/* ── HERO — Info LEFT · Gallery RIGHT ── */}
      <div className="bg-[#F8F8F6] pb-32 md:pb-0">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">

            {/* ── Left on desktop: product info ── */}
            <div className="space-y-5 lg:sticky lg:top-24">

              {/* Brand + Title + Tagline */}
              <div>
                <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-2">
                  皇室百兰 · ROYAL BALAND
                </p>
                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#111111] leading-snug mb-3">
                  {name}
                </h1>
                {subtitle ? (
                  <p className="text-xs text-[#8A857C] tracking-wide mb-2">
                    {subtitle}
                  </p>
                ) : null}
                <p className="text-sm text-[#6B6B6B] italic leading-relaxed">
                  {tagline}
                </p>
              </div>

              {/* ── Competitor price anchor ── */}
              <div className="bg-[#F8F8F6] border border-[#E2DDD6] px-4 py-4 space-y-1.5 text-xs">
                <p className="text-[10px] tracking-[0.2em] text-[#6B6B6B] mb-2">{td("comparisonTitle")}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B6B6B]">{td("comparisonMarket")}</span>
                  <span className="text-[#6B6B6B] line-through">¥8,000 – ¥12,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B6B6B]">{td("comparisonImport")}</span>
                  <span className="text-[#6B6B6B] line-through">¥10,000+</span>
                </div>
                <div className="h-px bg-[#E2DDD6] my-2" />
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#111111]">{td("comparisonDirect")}</span>
                  <span className="font-display text-xl text-[#C6A86B]">
                    ¥{product.price.toFixed(0)}
                  </span>
                </div>
              </div>

              {/* ── Urgency widget ── */}
              <UrgencyWidget product={product} />

              {/* ── Savings badge ── */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2.5 py-1">
                  {td("savedAmount", { amount: savings.toFixed(0) })}
                </span>
                <span className="text-xs text-[#6B6B6B]">{td("savedVsMarket")}</span>
                <span className="text-xs font-semibold text-[#111111]">
                  {Math.round(((originalPrice - product.price) / originalPrice) * 100)}%
                </span>
              </div>

              {/* ── Key benefits bullets ── */}
              <ul className="space-y-2">
                {KEY_BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <CheckIcon className="w-3.5 h-3.5 text-[#C6A86B] flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-[#6B6B6B] leading-snug">{b}</span>
                  </li>
                ))}
              </ul>

              {/* Description */}
              <p className="text-sm text-[#6B6B6B] leading-relaxed">{description}</p>

              {/* Stock indicator */}
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    product.stock === 0
                      ? "bg-red-400"
                      : isLowStock
                      ? "bg-amber-400"
                      : "bg-green-400"
                  }`}
                />
                <span className="text-xs text-[#6B6B6B]">
                  {product.stock === 0
                    ? t("soldOut")
                    : isLowStock
                    ? t("lowStock", { count: product.stock })
                    : t("inStock")}
                </span>
              </div>

              {/* Qty + Buttons — desktop only */}
              <div className="space-y-3 hidden md:block">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[#6B6B6B] tracking-widest">{t("qty")}</span>
                  <div className="flex items-center border border-[#E2DDD6]">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center text-[#6B6B6B] hover:bg-[#EDE9E3] transition-colors text-lg"
                    >
                      −
                    </button>
                    <span className="w-12 text-center text-sm text-[#111111]">{qty}</span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      className="w-10 h-10 flex items-center justify-center text-[#6B6B6B] hover:bg-[#EDE9E3] transition-colors text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => { trackCTAClick("add_to_cart_desktop", product.id); handleAdd(); }}
                  disabled={product.stock === 0 || loading}
                  className="w-full py-4 bg-[#111111] text-white text-sm tracking-[0.2em] font-medium hover:bg-[#C6A86B] active:scale-[0.99] transition-all duration-300 disabled:bg-[#E2DDD6] disabled:cursor-not-allowed"
                >
                  {product.stock === 0 ? t("soldOut") : t("addToBag")}
                </button>

                {product.stock > 0 && (
                  <button
                    onClick={() => handleBuyNow("buy_now_desktop")}
                    disabled={loading}
                    className="w-full py-3.5 border border-[#C6A86B] text-[#C6A86B] text-sm tracking-[0.2em] font-medium hover:bg-[#C6A86B] hover:text-white active:scale-[0.99] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? t("redirecting") : t("buyNow")}
                  </button>
                )}

                {buyError && (
                  <p className="text-xs text-red-500 text-center">{buyError}</p>
                )}

                <Link
                  href="/brand"
                  className="block text-center text-xs text-[#6B6B6B] hover:text-[#111111] tracking-widest transition-colors"
                >
                  {t("backToBrand")}
                </Link>
              </div>

              {/* Trust bar — desktop only */}
              <div className="hidden md:block">
                <TrustBar variant="grid" />
              </div>
            </div>

            {/* ── Right on desktop: image gallery ── */}
            <div className="space-y-3 order-first lg:order-none">

              {/* Mobile: horizontal swipe carousel */}
              <div className="relative lg:hidden">
                <div
                  className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                  style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
                >
                  {gallery.map((src, idx) => (
                    <div
                      key={src}
                      className="relative flex-shrink-0 w-full aspect-square bg-[#EDE9E3] snap-start overflow-hidden"
                      style={{ scrollSnapAlign: "start" }}
                    >
                      <Image
                        src={getImageSrc(src)}
                        alt={`${product.name} ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority={idx === 0}
                        onError={() => handleImageError(src)}
                      />
                    </div>
                  ))}
                </div>
                {/* Badges */}
                <span className="absolute top-4 left-4 bg-[#C6A86B] text-white text-[10px] tracking-widest px-3 py-1.5 z-10">
                  {t("hotelBadge")}
                </span>
                {isLowStock && (
                  <span className="absolute top-4 right-4 bg-[#111111] text-white text-[10px] tracking-widest px-3 py-1.5 z-10">
                    {t("lowStockBadge")}
                  </span>
                )}
                {gallery.length > 1 && (
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                    {gallery.map((_, idx) => (
                      <span key={idx} className="w-1.5 h-1.5 rounded-full bg-white/70" />
                    ))}
                  </div>
                )}
              </div>

              {/* Desktop: main image + thumbnail strip */}
              <div className="hidden lg:block space-y-3">
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#EDE9E3] group">
                  <Image
                    src={getImageSrc(activeImage)}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 50vw"
                    priority
                    quality={75}
                    onError={() => handleImageError(activeImage)}
                  />
                  <span className="absolute top-4 left-4 bg-[#C6A86B] text-white text-[10px] tracking-widest px-3 py-1.5 z-10">
                    {t("hotelBadge")}
                  </span>
                  {isLowStock && (
                    <span className="absolute top-4 right-4 bg-[#111111] text-white text-[10px] tracking-widest px-3 py-1.5 z-10">
                      {t("lowStockBadge")}
                    </span>
                  )}
                </div>
                {gallery.length > 1 && (
                  <div className="flex gap-2">
                    {gallery.map((src, idx) => (
                      <button
                        key={src}
                        onClick={() => setActiveImage(src)}
                        className={`relative aspect-square w-20 flex-shrink-0 overflow-hidden bg-[#EDE9E3] border-2 transition-colors ${
                          activeImage === src
                            ? "border-[#C6A86B]"
                            : "border-transparent hover:border-[#C6A86B]/50"
                        }`}
                        aria-label={`${idx + 1}`}
                      >
                        <Image
                          src={getImageSrc(src)}
                          alt={`${product.name} ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                          onError={() => handleImageError(src)}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky mobile CTA bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-20 md:hidden bg-[#F8F8F6] border-t border-[#E2DDD6] px-4 py-3 pb-safe shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
        <div className="flex items-baseline gap-2 mb-2.5">
          <span className="font-display text-2xl text-[#C6A86B]">¥{product.price.toFixed(0)}</span>
          <span className="text-xs text-[#6B6B6B] line-through">¥{originalPrice.toFixed(0)}</span>
          <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 ml-1">
            {td("savedAmount", { amount: savings.toFixed(0) })}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { trackCTAClick("add_to_cart_mobile_sticky", product.id); handleAdd(); }}
            disabled={product.stock === 0 || loading}
            className="flex-1 min-h-[48px] bg-[#111111] text-white text-xs tracking-widest font-medium hover:bg-[#C6A86B] active:scale-[0.99] transition-all disabled:bg-[#E2DDD6] disabled:cursor-not-allowed"
          >
            {product.stock === 0 ? t("soldOut") : t("addToBag")}
          </button>
          {product.stock > 0 && (
            <button
              onClick={() => handleBuyNow("buy_now_mobile_sticky")}
              disabled={loading}
              className="flex-1 min-h-[48px] border border-[#C6A86B] text-[#C6A86B] text-xs tracking-widest font-medium hover:bg-[#C6A86B] hover:text-white active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t("redirectingShort") : t("buyNow")}
            </button>
          )}
        </div>
        {buyError && (
          <p className="text-xs text-red-500 text-center mt-1">{buyError}</p>
        )}
      </div>

      {/* ── Tab content section ── */}
      <div className="bg-white border-t border-[#E2DDD6]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
          <div className="flex border-b border-[#E2DDD6] overflow-x-auto">
            {TAB_KEYS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-shrink-0 px-4 sm:px-6 py-4 text-xs tracking-widest transition-colors border-b-2 -mb-px ${
                  activeTab === tab.key
                    ? "border-[#C6A86B] text-[#111111]"
                    : "border-transparent text-[#6B6B6B] hover:text-[#111111]"
                }`}
              >
                {td(tab.key)}
              </button>
            ))}
          </div>
          <div className="py-8 sm:py-10">
            <p className="text-sm text-[#6B6B6B] leading-loose max-w-2xl">
              {td(TAB_KEYS.find((t) => t.key === activeTab)?.content ?? "tabMaterialContent")}
            </p>
          </div>
        </div>
      </div>

      {/* ── Pain Points + Solutions ── */}
      <PainPointsSection />

      {/* ── Value Proposition ── */}
      <ValueProposition />

      {/* ── Factory Showcase ── */}
      <FactoryShowcase />

      {/* ── Social Proof Numbers ── */}
      <SocialProofNumbers />

      {/* ── Reviews ── */}
      <ReviewsSection />

      {/* ── Guarantee / Risk Reversal ── */}
      <GuaranteeSection />

      {/* ── FAQ ── */}
      <FAQSection />

      {/* ── Final CTA ── */}
      <section className="bg-[#111111] py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-4">
              {t("finalCtaEyebrow")}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4 leading-tight">
              {t("finalCtaTitle")}
            </h2>
            <p className="text-sm text-white/50 mb-3 leading-relaxed">
              {t("finalCtaSub")}
            </p>
            <p className="text-sm text-white/40 mb-8 tracking-wide">
              {t("finalCtaTrust")}
            </p>

            {/* Price reminder */}
            <div className="flex items-baseline justify-center gap-3 mb-8">
              <span className="text-sm text-white/40 line-through">¥{originalPrice.toFixed(0)}</span>
              <span className="font-display text-4xl text-[#C6A86B]">¥{product.price.toFixed(0)}</span>
              <span className="text-xs text-green-400 border border-green-400/30 px-2 py-0.5">
                {td("savedAmount", { amount: savings.toFixed(0) })}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => handleBuyNow("buy_now_final_cta")}
                disabled={loading || product.stock === 0}
                className="w-full sm:w-auto min-h-[52px] px-12 py-3.5 bg-[#C6A86B] text-white text-sm tracking-[0.2em] font-medium hover:bg-white hover:text-[#111111] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t("redirectingFinal") : product.stock === 0 ? t("soldOutShort") : t("buyNow")}
              </button>
              <button
                onClick={() => { trackCTAClick("add_to_cart_final_cta", product.id); handleAdd(); }}
                disabled={product.stock === 0 || loading}
                className="w-full sm:w-auto min-h-[52px] px-12 py-3.5 border border-white/30 text-white/70 text-sm tracking-[0.2em] hover:border-white hover:text-white transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {product.stock === 0 ? t("soldOutShort") : t("addToCart")}
              </button>
            </div>

            {buyError && (
              <p className="text-xs text-red-400 text-center mt-3">{buyError}</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
