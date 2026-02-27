"use client";

import { Link } from "@/i18n/navigation";
import { useCart } from "@/context/CartContext";
import { useTranslations } from "next-intl";

export default function CartPage() {
  const { totalItems, openDrawer } = useCart();
  const t = useTranslations("cart");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F8F6]">
      <div className="text-center px-6">
        <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-4">SHOPPING BAG</p>
        <h1 className="font-display text-3xl text-[#111111] mb-4">{t("title")}</h1>
        {totalItems > 0 ? (
          <>
            <p className="text-[#6B6B6B] text-sm mb-6">
              {t("items", { count: totalItems })}
            </p>
            <button
              onClick={openDrawer}
              className="inline-block px-10 py-3 bg-[#111111] text-white text-xs tracking-widest hover:bg-[#C6A86B] transition-colors duration-300"
            >
              {t("title")}
            </button>
          </>
        ) : (
          <>
            <p className="text-[#6B6B6B] text-sm mb-6">{t("empty")}</p>
            <Link
              href="/products"
              className="inline-block px-10 py-3 bg-[#111111] text-white text-xs tracking-widest hover:bg-[#C6A86B] transition-colors duration-300"
            >
              {t("browse")}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
