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

interface Props {
  product: Product;
}

const TAB_LABELS = ["材质结构", "睡感体验", "技术说明"] as const;
type Tab = (typeof TAB_LABELS)[number];

const tabContent: Record<Tab, string> = {
  材质结构:
    "顶层采用比利时进口天然乳胶，弹性均匀持久。中层为美国礼恩派（Leggett & Platt）高碳钢独立袋装弹簧，精密排列，无噪音设计。底层为高密度树脂棉基座，稳定整体结构。面料选用比利时贝卡特（Bekaert）进口面料，搭配美国杜邦特立珑纺织工艺。",
  睡感体验:
    "入睡瞬间感受乳胶层的温柔包覆，自然沉入适度的支撑区间。翻身时弹簧独立运动，零干扰伴侣睡眠。躺下10分钟后，身体各压力点得到均衡释放，脊椎保持自然曲线，适合仰睡、侧睡及各类睡姿人群。",
  技术说明:
    "独立袋装弹簧技术：根据人体压力分区精准配置弹簧密度，高碳钢丝经250-280°C高温热处理。百兰专利双盈舒适树脂棉与高弹性七孔纤维棉提供多层舒适支撑。抗菌防螨处理：面料采用韩国颐康生化科技专业抗菌防螨剂，搭配进口阻燃纯棉布，通过防火阻燃检测。",
};

// Per-product taglines keyed on model code
const TAGLINES: Record<string, string> = {
  "R-666": "轻柔包裹，回弹迅速，乳胶弹簧双重呵护",
  "R-888": "酒店同款硬感，脊椎精准承托",
  "R-999": "旗舰乳胶，顶级睡眠体验",
};

// Key benefits shown as bullet points in the hero
const KEY_BENEFITS = [
  "五星酒店同款供货来源",
  "比利时进口天然乳胶",
  "美国礼恩派独立袋装弹簧",
  "ISO9001 + ISO14001 双认证",
];

const GUEST_USER_ID = 1;

const PLACEHOLDER_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23EDE9E3'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%23B0A99A'%3E图片暂缺%3C/text%3E%3C/svg%3E";

function computeOriginalPrice(price: number): number {
  return Math.ceil((price * 1.5) / 100) * 100;
}

function getTagline(name: string): string {
  for (const [key, tagline] of Object.entries(TAGLINES)) {
    if (name.includes(key)) return tagline;
  }
  return "酒店级睡眠品质，源头工厂直供";
}

export default function ProductDetailClient({ product }: Props) {
  const { addItem, openDrawer } = useCart();
  const t = useTranslations("products");
  const [activeTab, setActiveTab] = useState<Tab>("材质结构");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [buyError, setBuyError] = useState("");
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  useScrollDepth();

  const gallery = product.images?.length > 0 ? product.images : [product.image];
  const [activeImage, setActiveImage] = useState(gallery[0]);

  const originalPrice = computeOriginalPrice(product.price);
  const savings = originalPrice - product.price;
  const isLowStock = product.stock > 0 && product.stock <= 15;
  const tagline = getTagline(product.name);

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
      setBuyError("下单失败，请稍后重试");
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
                  {product.name}
                </h1>
                <p className="text-sm text-[#6B6B6B] italic leading-relaxed">
                  {tagline}
                </p>
              </div>

              {/* ── Competitor price anchor ── */}
              <div className="bg-[#F8F8F6] border border-[#E2DDD6] px-4 py-4 space-y-1.5 text-xs">
                <p className="text-[10px] tracking-[0.2em] text-[#6B6B6B] mb-2">MARKET COMPARISON</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B6B6B]">同类酒店床垫市场价</span>
                  <span className="text-[#6B6B6B] line-through">¥8,000 – ¥12,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B6B6B]">进口品牌均价</span>
                  <span className="text-[#6B6B6B] line-through">¥10,000+</span>
                </div>
                <div className="h-px bg-[#E2DDD6] my-2" />
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#111111]">本款直供价</span>
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
                  已省 ¥{savings.toFixed(0)}
                </span>
                <span className="text-xs text-[#6B6B6B]">相比市场价节省约</span>
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
              <p className="text-sm text-[#6B6B6B] leading-relaxed">{product.description}</p>

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
                    {loading ? "正在跳转到支付页面..." : t("buyNow")}
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
                    库存紧张
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
                      库存紧张
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
                        aria-label={`查看第${idx + 1}张图`}
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
            省¥{savings.toFixed(0)}
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
              {loading ? "跳转支付..." : t("buyNow")}
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
            {TAB_LABELS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-4 sm:px-6 py-4 text-xs tracking-widest transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-[#C6A86B] text-[#111111]"
                    : "border-transparent text-[#6B6B6B] hover:text-[#111111]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="py-8 sm:py-10">
            <p className="text-sm text-[#6B6B6B] leading-loose max-w-2xl">
              {tabContent[activeTab]}
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
              UPGRADE YOUR SLEEP TONIGHT
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4 leading-tight">
              现在升级你的睡眠质量
            </h2>
            <p className="text-sm text-white/50 mb-3 leading-relaxed">
              酒店级体验，从今晚开始
            </p>
            <p className="text-sm text-white/40 mb-8 tracking-wide">
              ISO认证品质 · 5年品质质保 · 30天无忧试睡 · 全国包邮安装
            </p>

            {/* Price reminder */}
            <div className="flex items-baseline justify-center gap-3 mb-8">
              <span className="text-sm text-white/40 line-through">¥{originalPrice.toFixed(0)}</span>
              <span className="font-display text-4xl text-[#C6A86B]">¥{product.price.toFixed(0)}</span>
              <span className="text-xs text-green-400 border border-green-400/30 px-2 py-0.5">
                省¥{savings.toFixed(0)}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => handleBuyNow("buy_now_final_cta")}
                disabled={loading || product.stock === 0}
                className="w-full sm:w-auto min-h-[52px] px-12 py-3.5 bg-[#C6A86B] text-white text-sm tracking-[0.2em] font-medium hover:bg-white hover:text-[#111111] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "正在跳转..." : product.stock === 0 ? "已售罄" : "立即购买"}
              </button>
              <button
                onClick={() => { trackCTAClick("add_to_cart_final_cta", product.id); handleAdd(); }}
                disabled={product.stock === 0 || loading}
                className="w-full sm:w-auto min-h-[52px] px-12 py-3.5 border border-white/30 text-white/70 text-sm tracking-[0.2em] hover:border-white hover:text-white transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {product.stock === 0 ? "已售罄" : "加入购物车"}
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
