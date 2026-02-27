"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { totalItems, openDrawer } = useCart();

  // The primary cart UX is the drawer. This page is a fallback/redirect.
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F8F6]">
      <div className="text-center px-6">
        <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-4">SHOPPING BAG</p>
        <h1 className="font-display text-3xl text-[#111111] mb-4">购物袋</h1>
        {totalItems > 0 ? (
          <>
            <p className="text-[#6B6B6B] text-sm mb-6">
              你的购物袋中有 <span className="text-[#111111] font-semibold">{totalItems}</span> 件商品
            </p>
            <button
              onClick={openDrawer}
              className="inline-block px-10 py-3 bg-[#111111] text-white text-xs tracking-widest hover:bg-[#C6A86B] transition-colors duration-300"
            >
              查看购物袋
            </button>
          </>
        ) : (
          <>
            <p className="text-[#6B6B6B] text-sm mb-6">购物袋是空的，去选一款适合你的床垫吧</p>
            <Link
              href="/products"
              className="inline-block px-10 py-3 bg-[#111111] text-white text-xs tracking-widest hover:bg-[#C6A86B] transition-colors duration-300"
            >
              浏览产品系列
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
