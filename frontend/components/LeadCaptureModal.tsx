"use client";

import { useEffect, useState, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { XMarkIcon } from "@heroicons/react/24/outline";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const SESSION_KEY = "_rs_lead_shown";

export default function LeadCaptureModal() {
  const [visible, setVisible] = useState(false);
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const locale = useLocale();
  const t = useTranslations("lead");

  useEffect(() => {
    // Only show once per session
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      return;
    }

    // 30-second timer trigger
    timerRef.current = setTimeout(() => show(), 30000);

    // Exit intent trigger
    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) show();
    }
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  function show() {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {}
    setVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
  }

  function dismiss() {
    setVisible(false);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!contact.trim()) return;
    setLoading(true);
    setError("");
    try {
      await fetch(`${API}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, source: "popup", locale }),
      });
      setSuccess(true);
      try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
      setTimeout(() => dismiss(), 2500);
    } catch {
      setError("提交失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  }

  if (!visible) return null;

  return (
    <>
      {/* Subtle backdrop — just a dim overlay, not blocking */}
      <div className="fixed inset-0 z-40 pointer-events-none bg-black/20" />

      {/* Modal panel — slides up from bottom-right */}
      <div className="fixed bottom-6 right-6 z-50 w-80 bg-[#F8F8F6] border border-[#E2DDD6] shadow-2xl animate-fade-in-up">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-[#E2DDD6]">
          <div>
            <span className="inline-block text-[10px] tracking-widest text-[#C6A86B] border border-[#C6A86B]/50 px-2 py-0.5 mb-2">
              {t("badge")}
            </span>
            <h3 className="font-display text-lg text-[#111111] leading-snug">{t("title")}</h3>
            <p className="text-xs text-[#6B6B6B] mt-1">{t("subtitle")}</p>
          </div>
          <button onClick={dismiss} className="text-[#6B6B6B] hover:text-[#111111] transition-colors ml-3 flex-shrink-0">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {success ? (
            <div className="text-center py-3">
              <p className="text-[#C6A86B] font-medium text-sm">✓ {t("success")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={t("placeholder")}
                className="w-full border border-[#E2DDD6] px-3 py-2.5 text-sm text-[#111111] placeholder-[#6B6B6B] focus:outline-none focus:border-[#C6A86B] transition-colors bg-white"
                required
              />
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#111111] text-white text-xs tracking-widest hover:bg-[#C6A86B] transition-colors duration-300 disabled:opacity-50"
              >
                {loading ? t("submitting") : t("submit")}
              </button>
              <button
                type="button"
                onClick={dismiss}
                className="w-full text-center text-[10px] text-[#6B6B6B] hover:text-[#111111] transition-colors tracking-widest"
              >
                {t("close")}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
