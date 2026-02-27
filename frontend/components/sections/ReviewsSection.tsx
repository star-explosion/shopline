"use client";

import { useTranslations } from "next-intl";
import { mockReviews, Review } from "@/lib/mockReviews";

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          viewBox="0 0 16 16"
          fill={n <= rating ? "#C6A86B" : "none"}
          stroke="#C6A86B"
          strokeWidth="1.5"
          className="w-3.5 h-3.5"
        >
          <path d="M8 1l1.854 3.756L14 5.528l-3 2.922.707 4.124L8 10.437l-3.707 2.137L5 8.45 2 5.528l4.146-.772L8 1z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review, verifiedBadge }: { review: Review; verifiedBadge: string }) {
  const initial = review.name.charAt(0);
  return (
    <div className="bg-[#1F1F1F] p-6 flex flex-col gap-4 hover:bg-[#242424] transition-colors duration-300">
      <div className="flex items-start justify-between gap-3">
        <StarRow rating={review.rating} />
        {review.verified && (
          <span className="flex-shrink-0 text-[10px] text-[#C6A86B] border border-[#C6A86B]/40 px-2 py-0.5 tracking-wider">
            ✓ {verifiedBadge}
          </span>
        )}
      </div>

      <blockquote className="text-sm text-white/70 leading-relaxed flex-1">
        &ldquo;{review.comment}&rdquo;
      </blockquote>

      <div className="flex items-center gap-3 pt-3 border-t border-white/10">
        <div className="w-9 h-9 rounded-full bg-[#C6A86B]/20 border border-[#C6A86B]/40 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-semibold text-[#C6A86B]">{initial}</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-white leading-none mb-1">
            {review.name}
            <span className="text-white/40 font-normal ml-1.5">· {review.city}</span>
          </p>
          <p className="text-[10px] text-white/30 truncate">{review.purchaseDate}</p>
        </div>
      </div>

      <p className="text-[10px] text-white/25 tracking-wider truncate border-t border-white/5 pt-2">
        {review.product}
      </p>
    </div>
  );
}

export default function ReviewsSection() {
  const t = useTranslations("reviews");
  const featured = mockReviews.slice(0, 6);

  return (
    <section className="section-padding bg-[#171717]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3">{t("eyebrow")}</p>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-white/40 text-sm max-w-md mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Cards — 3-col on desktop, horizontal scroll on mobile */}
        <div className="hidden md:grid md:grid-cols-3 gap-5">
          {featured.slice(0, 3).map((review) => (
            <ReviewCard key={review.id} review={review} verifiedBadge={t("verifiedBadge")} />
          ))}
        </div>

        {/* Desktop row 2 */}
        <div className="hidden md:grid md:grid-cols-3 gap-5 mt-5">
          {featured.slice(3, 6).map((review) => (
            <ReviewCard key={review.id} review={review} verifiedBadge={t("verifiedBadge")} />
          ))}
        </div>

        {/* Mobile: horizontal scroll, show all */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory">
          {featured.map((review) => (
            <div key={review.id} className="flex-shrink-0 w-[82vw] snap-start">
              <ReviewCard review={review} verifiedBadge={t("verifiedBadge")} />
            </div>
          ))}
        </div>

        {/* Summary bar */}
        <div className="mt-10 border border-white/10 px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-center">
          <div>
            <p className="font-display text-2xl text-[#C6A86B]">4.9</p>
            <p className="text-white/40 text-xs mt-0.5">{t("rating")}</p>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/10" />
          <div>
            <p className="font-display text-2xl text-[#C6A86B]">100%</p>
            <p className="text-white/40 text-xs mt-0.5">{t("refundRate")}</p>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/10" />
          <div>
            <p className="font-display text-2xl text-[#C6A86B]">98%</p>
            <p className="text-white/40 text-xs mt-0.5">{t("satisfaction")}</p>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/10" />
          <div>
            <p className="font-display text-2xl text-[#C6A86B]">ISO²</p>
            <p className="text-white/40 text-xs mt-0.5">{t("certBadge")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
