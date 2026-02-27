"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { fetchOrder } from "@/lib/api";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { trackEvent } from "@/lib/analytics";

interface OrderDetail {
  id: number;
  status: string;
  totalPrice: number;
  createdAt: string;
  items: {
    id: number;
    quantity: number;
    price: number;
    product: { id: number; name: string; image: string };
  }[];
}

function OrdersContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const t = useTranslations("orders");

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) {
      setError(t("notFound"));
      setLoading(false);
      return;
    }
    fetchOrder(parseInt(orderId))
      .then((data) => {
        setOrder(data);
        trackEvent("purchase");
      })
      .catch(() => setError(t("loadFailed")))
      .finally(() => setLoading(false));
  }, [orderId, t]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F8F6]">
        <div className="text-center">
          <div className="w-6 h-6 border border-[#C6A86B] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-[#6B6B6B] tracking-widest">{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F8F6]">
        <div className="text-center">
          <p className="text-[#6B6B6B] text-sm mb-4">{error || t("notFound")}</p>
          <Link href="/" className="text-xs text-[#C6A86B] hover:underline tracking-widest">
            {t("backHome")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F6] pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-6">
          <CheckCircleIcon className="w-14 h-14 text-[#C6A86B] mx-auto mb-5" />
          <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-2">{t("eyebrow")}</p>
          <h1 className="font-display text-3xl text-[#111111] mb-2">{t("title")}</h1>
          <p className="text-xs text-[#6B6B6B]">
            {t("orderNo")}：<span className="font-mono text-[#111111]">#{order.id}</span>
          </p>
        </div>

        <div className="bg-[#C6A86B]/10 border border-[#C6A86B]/30 px-6 py-5 text-center mb-8">
          <p className="text-sm font-medium text-[#111111]">{t("confirmMsg")}</p>
          <p className="text-xs text-[#6B6B6B] mt-1.5 leading-relaxed">
            {t("confirmSubMsg", { hours: 24 })}
          </p>
        </div>

        <div className="bg-white border border-[#E2DDD6]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2DDD6]">
            <h2 className="text-sm font-semibold text-[#111111] tracking-widest">{t("details")}</h2>
            <span className={`text-[10px] border px-3 py-1 tracking-wider ${
              order.status === "paid"
                ? "text-green-600 border-green-400"
                : order.status === "cancelled" || order.status === "failed"
                ? "text-red-400 border-red-300"
                : "text-[#C6A86B] border-[#C6A86B]"
            }`}>
              {order.status === "paid" ? "已支付" : order.status === "pending" ? t("pending") : order.status === "cancelled" ? "已取消" : order.status}
            </span>
          </div>

          <div className="divide-y divide-[#E2DDD6]">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 px-6 py-4">
                <div className="relative w-14 h-14 flex-shrink-0 bg-[#EDE9E3] overflow-hidden">
                  <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="56px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#111111] font-medium truncate">{item.product.name}</p>
                  <p className="text-xs text-[#6B6B6B] mt-0.5">× {item.quantity}</p>
                </div>
                <p className="font-semibold text-[#111111] flex-shrink-0 text-sm">
                  ¥{(item.price * item.quantity).toFixed(0)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-baseline px-6 py-5 bg-[#F8F8F6] border-t border-[#E2DDD6]">
            <span className="text-xs text-[#6B6B6B] tracking-widest">{t("total")}</span>
            <span className="font-display text-2xl text-[#C6A86B]">¥{order.totalPrice.toFixed(0)}</span>
          </div>

          <div className="px-6 py-4 border-t border-[#E2DDD6]">
            <p className="text-[10px] text-[#6B6B6B] text-center tracking-wide">
              {t("orderAt")}：{new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {([t("tracking"), t("installation"), t("trial")] as string[]).map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="text-[#C6A86B] text-sm flex-shrink-0 mt-0.5">✓</span>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">{item}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/products"
            className="inline-block px-12 py-4 bg-[#111111] text-white text-xs tracking-[0.2em] hover:bg-[#C6A86B] transition-colors duration-300"
          >
            {t("continueShopping")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F8F8F6]">
        <div className="w-6 h-6 border border-[#C6A86B] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <OrdersContent />
    </Suspense>
  );
}
