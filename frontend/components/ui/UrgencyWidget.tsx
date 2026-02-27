"use client";

import { useEffect, useState } from "react";
import { ClockIcon, FireIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { Product } from "@/types";

interface Props {
  product: Product;
}

function useCountdown(hours = 23, minutes = 47, seconds = 33) {
  const [timeLeft, setTimeLeft] = useState(
    hours * 3600 + minutes * 60 + seconds
  );

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;

  return {
    display: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`,
    expired: timeLeft === 0,
  };
}

export default function UrgencyWidget({ product }: Props) {
  const { display, expired } = useCountdown();
  // Mock buyer count — slightly randomized but stable per product id
  const buyerCount = 1200 + (product.id * 47) % 300;
  const isLowStock = product.stock > 0 && product.stock <= 15;

  return (
    <div className="space-y-2">
      {/* Countdown */}
      {!expired && (
        <div className="bg-[#C6A86B]/10 border border-[#C6A86B]/30 px-4 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ClockIcon className="w-3.5 h-3.5 text-[#C6A86B] flex-shrink-0" />
            <span className="text-xs text-[#111111]">
              今日优惠还剩
            </span>
          </div>
          <span className="font-mono text-sm font-bold text-[#C6A86B] tracking-widest">
            {display}
          </span>
        </div>
      )}

      {/* Buyer count + stock row */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Buyer count */}
        <div className="flex items-center gap-1.5">
          <UserGroupIcon className="w-3.5 h-3.5 text-[#6B6B6B]" />
          <span className="text-xs text-[#6B6B6B]">
            已有{" "}
            <span className="text-[#111111] font-semibold">
              {buyerCount.toLocaleString()}
            </span>{" "}
            人购买
          </span>
        </div>

        {/* Divider */}
        <span className="text-[#E2DDD6]">·</span>

        {/* Stock badge */}
        {product.stock === 0 ? (
          <span className="text-xs text-red-500 font-medium">已售罄</span>
        ) : isLowStock ? (
          <div className="flex items-center gap-1.5">
            <FireIcon className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs text-amber-700 font-medium">
              仅剩 {product.stock} 件
            </span>
          </div>
        ) : (
          <span className="text-xs text-green-700">现货充足</span>
        )}
      </div>
    </div>
  );
}
