"use client";

import Image from "next/image";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { Link } from "@/i18n/navigation";

interface ProductCardProps {
  product: Product;
}

function computeOriginalPrice(price: number): number {
  return Math.ceil((price * 1.5) / 100) * 100;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openDrawer } = useCart();
  const originalPrice = computeOriginalPrice(product.price);
  const savings = originalPrice - product.price;

  function handleAdd() {
    addItem(product);
    openDrawer();
  }

  return (
    <div className="group bg-white border border-[#E2DDD6] hover:border-[#C6A86B] hover:shadow-lg transition-all duration-400">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#EDE9E3]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
          />
          <span className="absolute top-3 left-3 bg-[#C6A86B] text-white text-[10px] tracking-widest px-2.5 py-1">
            酒店同款
          </span>
          <span className="absolute top-3 right-3 bg-green-600 text-white text-[10px] font-semibold px-2 py-0.5">
            省¥{savings.toFixed(0)}
          </span>
        </div>
      </Link>

      <div className="p-4 sm:p-5 space-y-3">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-[#111111] text-sm leading-snug hover:text-[#C6A86B] transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-[#6B6B6B] line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="space-y-1 pt-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6B6B6B]">酒店价</span>
            <span className="text-xs text-[#6B6B6B] line-through">¥{originalPrice.toFixed(0)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-display text-xl text-[#C6A86B]">
              ¥{product.price.toFixed(0)}
            </span>
          </div>
        </div>

        {/* Button: min-h-[44px] ensures 44px touch target on mobile */}
        <button
          onClick={handleAdd}
          disabled={product.stock === 0}
          className="w-full min-h-[44px] py-2.5 px-4 border border-[#111111] text-[#111111] text-xs tracking-widest font-medium hover:bg-[#111111] hover:text-white active:scale-[0.99] transition-all duration-200 disabled:border-[#E2DDD6] disabled:text-[#6B6B6B] disabled:cursor-not-allowed"
        >
          {product.stock === 0 ? "暂时售罄" : "加入购物袋"}
        </button>
      </div>
    </div>
  );
}
