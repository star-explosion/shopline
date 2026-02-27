"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { fetchOrder } from "@/lib/api";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

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

export default function OrdersPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) {
      setError("未找到订单信息");
      setLoading(false);
      return;
    }
    fetchOrder(parseInt(orderId))
      .then((data) => setOrder(data))
      .catch(() => setError("订单加载失败"))
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F8F6]">
        <div className="text-center">
          <div className="w-6 h-6 border border-[#C6A86B] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-[#6B6B6B] tracking-widest">加载中...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F8F6]">
        <div className="text-center">
          <p className="text-[#6B6B6B] text-sm mb-4">{error || "订单不存在"}</p>
          <Link href="/" className="text-xs text-[#C6A86B] hover:underline tracking-widest">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F6] pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-6">
        {/* Success header */}
        <div className="text-center mb-6">
          <CheckCircleIcon className="w-14 h-14 text-[#C6A86B] mx-auto mb-5" />
          <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-2">ORDER CONFIRMED</p>
          <h1 className="font-display text-3xl text-[#111111] mb-2">订单已确认</h1>
          <p className="text-xs text-[#6B6B6B]">
            订单号：<span className="font-mono text-[#111111]">#{order.id}</span>
          </p>
        </div>

        {/* 24h confirmation message */}
        <div className="bg-[#C6A86B]/10 border border-[#C6A86B]/30 px-6 py-5 text-center mb-8">
          <p className="text-sm font-medium text-[#111111]">
            您的订单已成功提交
          </p>
          <p className="text-xs text-[#6B6B6B] mt-1.5 leading-relaxed">
            我们将在{" "}
            <strong className="text-[#111111]">24小时内</strong>{" "}
            联系您确认发货安排，请保持手机畅通
          </p>
        </div>

        {/* Order card */}
        <div className="bg-white border border-[#E2DDD6]">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2DDD6]">
            <h2 className="text-sm font-semibold text-[#111111] tracking-widest">订单详情</h2>
            <span className="text-[10px] text-[#C6A86B] border border-[#C6A86B] px-3 py-1 tracking-wider">
              {order.status === "pending" ? "待处理" : order.status}
            </span>
          </div>

          {/* Items */}
          <div className="divide-y divide-[#E2DDD6]">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 px-6 py-4">
                <div className="relative w-14 h-14 flex-shrink-0 bg-[#EDE9E3] overflow-hidden">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
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

          {/* Total */}
          <div className="flex justify-between items-baseline px-6 py-5 bg-[#F8F8F6] border-t border-[#E2DDD6]">
            <span className="text-xs text-[#6B6B6B] tracking-widest">合计</span>
            <span className="font-display text-2xl text-[#C6A86B]">
              ¥{order.totalPrice.toFixed(0)}
            </span>
          </div>

          {/* Meta */}
          <div className="px-6 py-4 border-t border-[#E2DDD6]">
            <p className="text-[10px] text-[#6B6B6B] text-center tracking-wide">
              下单时间：{new Date(order.createdAt).toLocaleString("zh-CN")}
            </p>
          </div>
        </div>

        {/* Reassurance checklist */}
        <div className="mt-6 space-y-3">
          {[
            "全程物流追踪，实时掌握配送状态",
            "专业安装团队上门服务，含旧床垫清运",
            "30天无忧试睡，不满意全额退款",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="text-[#C6A86B] text-sm flex-shrink-0 mt-0.5">✓</span>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">{item}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Link
            href="/products"
            className="inline-block px-12 py-4 bg-[#111111] text-white text-xs tracking-[0.2em] hover:bg-[#C6A86B] transition-colors duration-300"
          >
            继续选购
          </Link>
        </div>
      </div>
    </div>
  );
}
