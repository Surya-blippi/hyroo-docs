// Meta Pixel event helper. The base code + fbq are loaded in app/layout.tsx.
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const KIT_CONTENT = {
  content_name: "Hyroo 12 Document Kit",
  value: 499,
  currency: "INR",
};

export function fbqTrack(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", event, params);
  }
}
