// ANALYTICS CONFIG POINT
// Replace with your real Google Analytics / Search Console IDs when ready.
// If empty, no tracking script is loaded and the site does NOT break.
// Example: export const GA_ID = "G-XXXXXXXXXX";
export const GA_ID = "G-QZLD9F4XSE";
export const GSC_VERIFICATION = ""; // ← insert Search Console verification token here

// Simple internal affiliate click tracking structure (ready for GA or other provider)
// Tracks: bookId, bookTitle, click event — no private user info.
export function trackAffiliateClick(bookId: string, bookTitle: string) {
  const payload = { event: "affiliate_click", bookId, bookTitle, timestamp: new Date().toISOString() };
  if (typeof console !== "undefined") console.debug("[affiliate_click]", payload);
  // @ts-ignore
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    // @ts-ignore
    (window as any).gtag("event", "affiliate_click", { book_id: bookId, book_title: bookTitle });
  }
  // @ts-ignore
  if (typeof window !== "undefined" && Array.isArray((window as any).dataLayer)) {
    // @ts-ignore
    (window as any).dataLayer.push(payload);
  }
}
if (typeof window !== "undefined") {
  // @ts-ignore
  (window as any).trackAffiliateClick = trackAffiliateClick;
}
