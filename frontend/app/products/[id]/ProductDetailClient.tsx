"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import { createCheckoutSession } from "@/lib/api";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import TrustBar from "@/components/ui/TrustBar";
import ReviewsSection from "@/components/sections/ReviewsSection";

interface Props {
  product: Product;
}

const TAB_LABELS = ["材质结构", "睡感体验", "技术说明"] as const;
type Tab = typeof TAB_LABELS[number];

const tabContent: Record<Tab, string> = {
  材质结构:
    "顶层采用比利时进口天然乳胶，弹性均匀持久。中层为美国礼恩派（Leggett & Platt）高碳钢独立袋装弹簧，精密排列，无噪音设计。底层为高密度树脂棉基座，稳定整体结构。面料选用比利时贝卡特（Bekaert）进口面料，搭配美国杜邦特立珑纺织工艺。",
  睡感体验:
    "入睡瞬间感受乳胶层的温柔包覆，自然沉入适度的支撑区间。翻身时弹簧独立运动，零干扰伴侣睡眠。躺下10分钟后，身体各压力点得到均衡释放，脊椎保持自然曲线，适合仰睡、侧睡及各类睡姿人群。",
  技术说明:
    "独立袋装弹簧技术：根据人体压力分区精准配置弹簧密度，高碳钢丝经250-280°C高温热处理。百兰专利双盈舒适树脂棉与高弹性七孔纤维棉提供多层舒适支撑。抗菌防螨处理：面料采用韩国颐康生化科技专业抗菌防螨剂，搭配进口阻燃纯棉布，通过防火阻燃检测。",
};

const GUEST_USER_ID = 1;

export default function ProductDetailClient({ product }: Props) {
  const { addItem, openDrawer } = useCart();
  const [activeTab, setActiveTab] = useState<Tab>("材质结构");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [buyError, setBuyError] = useState("");

  function handleAdd() {
    for (let i = 0; i < qty; i++) {
      addItem(product);
    }
    openDrawer();
  }

  async function handleBuyNow() {
    if (product.stock === 0) return;
    setLoading(true);
    setBuyError("");
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

  const isLowStock = product.stock > 0 && product.stock <= 10;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="pt-20 pb-4 bg-white border-b border-[#E2DDD6]">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-xs text-[#6B6B6B] hover:text-[#111111] tracking-widest transition-colors"
          >
            <ChevronLeftIcon className="w-3 h-3" />
            产品系列
          </Link>
        </div>
      </div>

      {/* Main layout */}
      <div className="bg-[#F8F8F6]">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Image */}
            <div className="space-y-4">
              <div className="relative w-full aspect-square overflow-hidden bg-[#EDE9E3]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <span className="absolute top-5 left-5 bg-[#C6A86B] text-white text-[10px] tracking-widest px-3 py-1.5">
                  酒店同款
                </span>
                {isLowStock && (
                  <span className="absolute top-5 right-5 bg-[#111111] text-white text-[10px] tracking-widest px-3 py-1.5">
                    库存紧张
                  </span>
                )}
              </div>
              {/* Thumbnail strip placeholder */}
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`aspect-square bg-[#EDE9E3] overflow-hidden cursor-pointer border-2 transition-colors ${
                      i === 1 ? "border-[#C6A86B]" : "border-transparent"
                    }`}
                  >
                    <div className="w-full h-full bg-[#E2DDD6]" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Info */}
            <div className="space-y-5">
              {/* Title */}
              <div>
                <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-2">
                  皇室百兰 · ROYAL SLEEP
                </p>
                <h1 className="font-display text-3xl md:text-4xl text-[#111111] leading-snug">
                  {product.name}
                </h1>
              </div>

              {/* Urgency banner */}
              <div className="bg-[#C6A86B]/10 border border-[#C6A86B]/30 px-4 py-2.5 flex items-center justify-between">
                <span className="text-xs text-[#111111]">
                  限时优惠：今日下单立减{" "}
                  <strong className="text-[#111111]">¥300</strong>
                </span>
                <span className="text-[10px] text-[#C6A86B] tracking-widest">仅限本周</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 border-t border-b border-[#E2DDD6] py-5">
                <span className="font-display text-4xl text-[#C6A86B]">
                  ¥{product.price.toFixed(0)}
                </span>
                <span className="text-xs text-[#6B6B6B] tracking-wide">/ 张（含配送安装）</span>
              </div>

              {/* Story */}
              <p className="text-sm text-[#6B6B6B] leading-relaxed">
                {product.description}
              </p>

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
                    ? "暂时售罄"
                    : isLowStock
                    ? `仅剩 ${product.stock} 件 · 热销中`
                    : "现货充足，可立即发货"}
                </span>
              </div>

              {/* Qty + Buttons */}
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[#6B6B6B] tracking-widest">数量</span>
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

                {/* Add to bag */}
                <button
                  onClick={handleAdd}
                  disabled={product.stock === 0 || loading}
                  className="w-full py-4 bg-[#111111] text-white text-sm tracking-[0.2em] font-medium hover:bg-[#C6A86B] active:scale-[0.99] transition-all duration-300 disabled:bg-[#E2DDD6] disabled:cursor-not-allowed"
                >
                  {product.stock === 0 ? "暂时售罄" : "加入购物袋"}
                </button>

                {/* Buy now */}
                {product.stock > 0 && (
                  <button
                    onClick={handleBuyNow}
                    disabled={loading}
                    className="w-full py-3.5 border border-[#C6A86B] text-[#C6A86B] text-sm tracking-[0.2em] font-medium hover:bg-[#C6A86B] hover:text-white active:scale-[0.99] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "正在跳转到支付页面..." : "立即购买"}
                  </button>
                )}

                {buyError && (
                  <p className="text-xs text-red-500 text-center">{buyError}</p>
                )}

                <Link
                  href="/brand"
                  className="block text-center text-xs text-[#6B6B6B] hover:text-[#111111] tracking-widest transition-colors"
                >
                  了解更多品牌故事 →
                </Link>
              </div>

              {/* Trust bar (grid variant) */}
              <TrustBar variant="grid" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab sections */}
      <div className="bg-white border-t border-[#E2DDD6]">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="flex border-b border-[#E2DDD6]">
            {TAB_LABELS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-xs tracking-widest transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-[#C6A86B] text-[#111111]"
                    : "border-transparent text-[#6B6B6B] hover:text-[#111111]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="py-8">
            <p className="text-sm text-[#6B6B6B] leading-loose max-w-2xl">
              {tabContent[activeTab]}
            </p>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <ReviewsSection />

      {/* CTA */}
      <div className="bg-[#F8F8F6] py-12 border-t border-[#E2DDD6] text-center">
        <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3">DISCOVER MORE</p>
        <h3 className="font-display text-2xl text-[#111111] mb-5">探索更多产品</h3>
        <Link
          href="/products"
          className="inline-block px-10 py-3 border border-[#111111] text-[#111111] text-xs tracking-widest hover:bg-[#111111] hover:text-white transition-colors duration-300"
        >
          查看全部系列
        </Link>
      </div>
    </div>
  );
}
