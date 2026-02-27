"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

interface Props {
  event: string;
  productId?: number;
}

export default function PageTracker({ event, productId }: Props) {
  useEffect(() => {
    trackEvent(event, productId);
  }, [event, productId]);

  return null;
}
