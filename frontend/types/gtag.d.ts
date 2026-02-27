// Global type for window.gtag (Google Analytics 4)
interface Window {
  gtag: (
    command: "event" | "config" | "js" | "set",
    targetId: string | Date,
    params?: Record<string, unknown>
  ) => void;
  dataLayer: unknown[];
}
