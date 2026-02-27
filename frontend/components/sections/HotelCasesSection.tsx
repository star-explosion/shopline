"use client";

import { useTranslations } from "next-intl";

export default function HotelCasesSection() {
  const t = useTranslations("hotels");

  const hotelGroups = [
    { name: "国宾馆", en: "State Guest House", highlight: "国家元首下榻" },
    { name: "万豪酒店", en: "Marriott", highlight: "国际五星" },
    { name: "温德姆酒店", en: "Wyndham", highlight: "7家门店" },
    { name: "豪生酒店", en: "Howard Johnson", highlight: "长期合作" },
    { name: "华美达酒店", en: "Ramada", highlight: "战略伙伴" },
    { name: "格兰云天", en: "Grand Skylight", highlight: "深度合作" },
  ];

  const featuredHotels = [
    "澳门国宾馆", "博鳌国宾馆", "西安万豪酒店",
    "深圳温德姆至尊酒店", "张家界纳百利皇冠酒店", "广州白云宾馆",
    "深圳上海宾馆", "新余豪生大酒店", "广州凯旋华美达大酒店",
  ];

  return (
    <section className="section-padding bg-[#F8F8F6]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3">{t("eyebrow")}</p>
          <h2 className="font-display text-3xl md:text-4xl text-[#111111] mb-4">
            {t("title")}
          </h2>
          <p className="text-[#6B6B6B] text-sm max-w-md mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Hotel brand grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {hotelGroups.map((hotel) => (
            <div
              key={hotel.en}
              className="border border-[#E2DDD6] p-5 text-center hover:border-[#C6A86B] hover:bg-white transition-all duration-300 group cursor-default"
            >
              <p className="font-display font-semibold text-sm text-[#111111] mb-1 group-hover:text-[#C6A86B] transition-colors">
                {hotel.name}
              </p>
              <p className="text-[10px] text-[#6B6B6B] tracking-widest uppercase mb-2">
                {hotel.en}
              </p>
              <p className="text-[#C6A86B] font-bold text-xs">{hotel.highlight}</p>
            </div>
          ))}
        </div>

        {/* Featured hotel names */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-10">
          {featuredHotels.map((name) => (
            <span key={name} className="text-xs text-[#6B6B6B] tracking-wide">
              {name}
            </span>
          ))}
        </div>

        {/* Divider line stat */}
        <div className="border-t border-[#E2DDD6] pt-8 text-center">
          <p className="text-[#6B6B6B] text-sm">
            {t("coverage")}
          </p>
        </div>
      </div>
    </section>
  );
}
