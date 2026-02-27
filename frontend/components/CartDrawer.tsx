"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { createCheckoutSession } from "@/lib/api";
import { XMarkIcon, MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import TrustBar from "@/components/ui/TrustBar";
import { trackEvent } from "@/lib/analytics";

const GUEST_USER_ID = 1;

export default function CartDrawer() {
  const {
    items,
    totalItems,
    totalPrice,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isDrawerOpen]);

  async function handleCheckout() {
    if (items.length === 0) return;
    setLoading(true);
    setError("");
    trackEvent("begin_checkout");
    try {
      const data = await createCheckoutSession({
        userId: GUEST_USER_ID,
        items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
      });
      closeDrawer();
      window.location.href = data.url;
    } catch {
      setError("下单失败，请稍后重试");
      setLoading(false);
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeDrawer}
      />

      {/* Drawer panel
          Mobile:  full-screen (w-full, no max-w cap)
          Desktop: right-side panel capped at max-w-md
      */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full md:max-w-md bg-[#F8F8F6] shadow-2xl flex flex-col
          transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
          ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-5 border-b border-[#E2DDD6]">
          <div>
            <h2 className="font-display text-lg font-semibold text-[#111111] tracking-wide">
              购物袋
            </h2>
            {totalItems > 0 && (
              <p className="text-xs text-[#6B6B6B] mt-0.5">{totalItems} 件商品</p>
            )}
          </div>
          <button
            onClick={closeDrawer}
            className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-[#E2DDD6] transition-colors"
            aria-label="关闭购物袋"
          >
            <XMarkIcon className="w-5 h-5 text-[#111111]" />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBagIcon className="w-14 h-14 text-[#E2DDD6]" />
            <p className="font-display text-xl text-[#111111]">购物袋是空的</p>
            <p className="text-sm text-[#6B6B6B]">选择一款适合你的睡眠方案</p>
            <button
              onClick={closeDrawer}
              className="mt-2 px-8 py-3.5 min-h-[44px] border border-[#C6A86B] text-[#C6A86B] text-sm tracking-widest hover:bg-[#C6A86B] hover:text-white transition-colors duration-200"
            >
              浏览产品
            </button>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-5">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4">
                  {/* Product image */}
                  <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden bg-[#EDE9E3]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Product info + controls */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#111111] line-clamp-2 leading-snug">
                      {product.name}
                    </p>
                    <p className="text-[#C6A86B] text-sm font-semibold mt-1">
                      ¥{product.price.toFixed(0)}
                    </p>

                    {/* Quantity controls — 44px tap targets */}
                    <div className="flex items-center gap-2 mt-2.5">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-11 h-11 border border-[#E2DDD6] flex items-center justify-center hover:border-[#C6A86B] active:bg-[#EDE9E3] transition-colors"
                        aria-label="减少数量"
                      >
                        <MinusIcon className="w-3.5 h-3.5 text-[#6B6B6B]" />
                      </button>
                      <span className="text-sm w-6 text-center text-[#111111] font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-11 h-11 border border-[#E2DDD6] flex items-center justify-center hover:border-[#C6A86B] active:bg-[#EDE9E3] transition-colors"
                        aria-label="增加数量"
                      >
                        <PlusIcon className="w-3.5 h-3.5 text-[#6B6B6B]" />
                      </button>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="ml-auto w-11 h-11 flex items-center justify-center text-[#6B6B6B] hover:text-red-400 active:text-red-500 transition-colors"
                        aria-label="移除商品"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-5 sm:px-6 py-5 border-t border-[#E2DDD6] space-y-4 pb-safe">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-[#6B6B6B] tracking-wide">合计</span>
                <span className="font-display text-2xl text-[#111111]">
                  ¥{totalPrice.toFixed(0)}
                </span>
              </div>
              {error && <p className="text-red-500 text-xs">{error}</p>}

              {/* Urgency line */}
              <p className="text-xs text-[#C6A86B] text-center tracking-wide">
                今日下单享立减 ¥300 优惠
              </p>

              {/* Checkout button — min 56px on mobile */}
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full min-h-[56px] py-4 bg-[#111111] text-white text-sm tracking-widest font-medium hover:bg-[#1A1A1A] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "正在跳转到支付页面..." : "立即下单"}
              </button>

              {/* Trust bar */}
              <TrustBar variant="horizontal" />
            </div>
          </>
        )}
      </div>
    </>
  );
}
