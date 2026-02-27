"use client";

import { XCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function CheckoutCancelPage() {
  const t = useTranslations("orders");

  return (
    <div className="min-h-screen bg-[#F8F8F6] flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 text-center">
        <XCircleIcon className="w-14 h-14 text-[#6B6B6B] mx-auto mb-5" />

        <p className="text-xs tracking-[0.3em] text-[#6B6B6B] mb-2">PAYMENT CANCELLED</p>
        <h1 className="font-display text-2xl sm:text-3xl text-[#111111] mb-3">
          支付已取消
        </h1>
        <p className="text-sm text-[#6B6B6B] leading-relaxed mb-8">
          您的支付尚未完成，购物袋中的商品仍为您保留。如有疑问，请随时联系我们。
        </p>

        <div className="space-y-3">
          <Link
            href="/products"
            className="block w-full py-4 bg-[#111111] text-white text-xs tracking-[0.2em] font-medium hover:bg-[#C6A86B] transition-colors duration-300 text-center"
          >
            {t("continueShopping")}
          </Link>
          <Link
            href="/"
            className="block text-xs text-[#6B6B6B] hover:text-[#111111] tracking-widest transition-colors"
          >
            {t("backHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
