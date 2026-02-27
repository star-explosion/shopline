const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Map internal event names to GA4 recommended event names
const GA4_EVENT_MAP: Record<string, string> = {
  view_product: "view_item",
  add_to_cart: "add_to_cart",
  begin_checkout: "begin_checkout",
  purchase: "purchase",
  view_homepage: "page_view",
};

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = localStorage.getItem("_rsid");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("_rsid", id);
    }
    return id;
  } catch {
    return "";
  }
}

function fireGtag(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params ?? {});
  }
}

export function trackEvent(type: string, productId?: number): void {
  if (typeof window === "undefined") return;

  const isDev = process.env.NODE_ENV !== "production";
  if (isDev) {
    console.log(
      `%c[Analytics] ${type}`,
      "color:#C6A86B;font-weight:bold",
      productId !== undefined ? { productId } : ""
    );
  }

  // Send to backend
  const sessionId = getSessionId();
  if (sessionId) {
    fetch(`${API}/api/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        productId: productId ?? null,
        sessionId,
        userAgent: navigator.userAgent,
      }),
    }).catch(() => {});
  }

  // Send to GA4
  const ga4Name = GA4_EVENT_MAP[type] ?? type;
  const ga4Params: Record<string, unknown> = {};
  if (productId !== undefined) ga4Params.item_id = String(productId);
  fireGtag(ga4Name, ga4Params);
}

export function trackCTAClick(label: string, productId?: number): void {
  const isDev = process.env.NODE_ENV !== "production";
  if (isDev) {
    console.log(
      `%c[Analytics] cta_click — ${label}`,
      "color:#C6A86B;font-weight:bold",
      productId !== undefined ? { productId } : ""
    );
  }

  const params: Record<string, unknown> = { cta_label: label };
  if (productId !== undefined) params.item_id = String(productId);
  fireGtag("cta_click", params);
}
