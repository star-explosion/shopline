import {
  ArrowPathIcon,
  TruckIcon,
  ShieldCheckIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const pillars = [
  {
    icon: ArrowPathIcon,
    label: "7天无理由退换",
    sub: "无忧购物",
  },
  {
    icon: TruckIcon,
    label: "全国包邮",
    sub: "上门安装",
  },
  {
    icon: ShieldCheckIcon,
    label: "品质质保",
    sub: "售后无忧",
  },
  {
    icon: StarIcon,
    label: "酒店同款品质",
    sub: "ISO认证",
  },
];

interface TrustBarProps {
  variant?: "horizontal" | "grid";
}

export default function TrustBar({ variant = "horizontal" }: TrustBarProps) {
  if (variant === "grid") {
    return (
      <div className="grid grid-cols-2 gap-3">
        {pillars.map(({ icon: Icon, label, sub }) => (
          <div
            key={label}
            className="border border-[#E2DDD6] px-3 py-3 flex items-start gap-3 hover:border-[#C6A86B] transition-colors duration-200"
          >
            <Icon className="w-4 h-4 text-[#C6A86B] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-[#111111] leading-snug">{label}</p>
              <p className="text-[10px] text-[#6B6B6B] mt-0.5">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // horizontal variant — compact, for cart drawer footer
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
      {pillars.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-1.5">
          <Icon className="w-3.5 h-3.5 text-[#C6A86B] flex-shrink-0" />
          <span className="text-[11px] text-[#6B6B6B]">{label}</span>
        </div>
      ))}
    </div>
  );
}
