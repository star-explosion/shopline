"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

const MILESTONES = [25, 50, 75, 100] as const;

/**
 * Tracks scroll depth milestones (25 / 50 / 75 / 100 %) for the current page.
 * Each milestone fires once per component mount, resetting on navigation.
 * Fires both to GA4 (via trackEvent) and console.logs in dev.
 */
export function useScrollDepth(): void {
  const fired = useRef<Set<number>>(new Set());

  useEffect(() => {
    fired.current.clear();

    function onScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (docHeight <= 0) return;

      const pct = Math.round((scrollTop / docHeight) * 100);

      for (const milestone of MILESTONES) {
        if (pct >= milestone && !fired.current.has(milestone)) {
          fired.current.add(milestone);
          trackEvent(`scroll_depth_${milestone}`);
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}
