"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingBagIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context/CartContext";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function Navbar() {
  const { totalItems, openDrawer } = useCart();
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("nav");

  const pathWithoutLocale = pathname.replace(/^\/(zh|en|ja)/, "") || "/";
  const isHome = pathWithoutLocale === "/" || pathWithoutLocale === "";

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isSolid = !isHome || scrolled || mobileOpen;

  const navLinks = [
    { label: t("products"), href: "/products" as const },
    { label: t("brand"), href: "/brand" as const },
  ];

  const localeLabels: Record<string, string> = { zh: "中", en: "EN", ja: "日" };

  function switchLocale(newLocale: string) {
    router.replace(pathWithoutLocale || "/", { locale: newLocale as "zh" | "en" | "ja" });
  }

  return (
    <>
      {/* ── Top bar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-400
          ${isSolid
            ? "bg-[#F8F8F6] border-b border-[#E2DDD6]"
            : "bg-transparent border-b border-white/10"
          }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="皇室百兰">
            <Image
              src="/images/icon.png"
              alt="皇室百兰 Royal Baland"
              width={96}
              height={38}
              className="object-contain h-[38px] w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-widest transition-colors
                  ${isSolid
                    ? "text-[#6B6B6B] hover:text-[#111111]"
                    : "text-white/80 hover:text-white"
                  }
                  ${pathWithoutLocale === link.href ? (isSolid ? "text-[#111111]" : "text-white") : ""}
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Language + Cart + Mobile toggle */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Desktop language switcher */}
            <div className={`hidden md:flex items-center gap-1 text-[10px] tracking-widest border rounded-sm overflow-hidden ${isSolid ? "border-[#E2DDD6]" : "border-white/20"}`}>
              {routing.locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={`px-2 py-1 transition-colors ${
                    locale === loc
                      ? "bg-[#C6A86B] text-white"
                      : isSolid
                      ? "text-[#6B6B6B] hover:text-[#111111] hover:bg-[#F8F8F6]"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {localeLabels[loc]}
                </button>
              ))}
            </div>

            {/* Cart */}
            <button
              onClick={openDrawer}
              className={`relative transition-colors p-1 ${isSolid ? "text-[#111111]" : "text-white"}`}
              aria-label={t("cart")}
            >
              <ShoppingBagIcon className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#C6A86B] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              className={`md:hidden transition-colors p-1 ${isSolid ? "text-[#111111]" : "text-white"}`}
              onClick={() => setMobileOpen(true)}
              aria-label={t("menu")}
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile slide-in drawer (outside <nav> so it can be full-height) ── */}

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity duration-300
          ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer panel — slides in from the left */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 max-w-[85vw] bg-[#F8F8F6] flex flex-col
          md:hidden transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2DDD6]">
          <Link href="/" onClick={() => setMobileOpen(false)} aria-label="皇室百兰">
            <Image
              src="/images/icon.png"
              alt="皇室百兰 Royal Baland"
              width={80}
              height={32}
              className="object-contain h-[32px] w-auto"
            />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-10 h-10 flex items-center justify-center text-[#6B6B6B] hover:text-[#111111] transition-colors"
            aria-label="关闭菜单"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-6 py-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center py-3.5 text-sm tracking-widest border-b border-[#E2DDD6]/60 transition-colors
                ${pathWithoutLocale === link.href
                  ? "text-[#111111] font-medium"
                  : "text-[#6B6B6B] hover:text-[#111111]"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Language switcher at bottom */}
        <div className="px-6 py-6 border-t border-[#E2DDD6]">
          <p className="text-[10px] tracking-[0.2em] text-[#6B6B6B] mb-3">语言 / LANGUAGE</p>
          <div className="flex items-center gap-2">
            {routing.locales.map((loc) => (
              <button
                key={loc}
                onClick={() => { switchLocale(loc); setMobileOpen(false); }}
                className={`flex-1 py-2.5 text-xs border tracking-widest transition-colors ${
                  locale === loc
                    ? "border-[#C6A86B] bg-[#C6A86B] text-white"
                    : "border-[#E2DDD6] text-[#6B6B6B] hover:border-[#C6A86B] hover:text-[#C6A86B]"
                }`}
              >
                {localeLabels[loc]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
