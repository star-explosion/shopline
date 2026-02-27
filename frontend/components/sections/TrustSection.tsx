"use client";

import { useTranslations } from "next-intl";

export default function TrustSection() {
  const t = useTranslations("trust");

  const certs = [
    {
      code: "ISO 9001",
      name: t("iso9001Name"),
      desc: t("iso9001Desc"),
    },
    {
      code: "ISO 14001",
      name: t("iso14001Name"),
      desc: t("iso14001Desc"),
    },
    {
      code: "CPED",
      name: t("cpedName"),
      desc: t("cpedDesc"),
    },
    {
      code: "FR",
      name: t("fireName"),
      desc: t("fireDesc"),
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3">{t("eyebrow")}</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#111111] mb-4">
            {t("title")}
          </h2>
          <p className="text-[#6B6B6B] text-sm max-w-md mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Cert cards — responsive padding */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {certs.map((cert) => (
            <div
              key={cert.code}
              className="border border-[#E2DDD6] p-5 sm:p-8 text-center hover:border-[#C6A86B] transition-colors duration-300 group"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-5 border-2 border-[#C6A86B] rounded-full flex items-center justify-center group-hover:bg-[#C6A86B] transition-colors duration-300">
                <span className="font-display text-xs font-bold text-[#C6A86B] group-hover:text-white tracking-wider transition-colors">
                  {cert.code}
                </span>
              </div>
              <h3 className="font-semibold text-[#111111] mb-2 text-sm tracking-wide">
                {cert.name}
              </h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">{cert.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
