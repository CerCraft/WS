export const KNOWN_TRACKERS: Record<string, { name: string; category: string }> = {
  "google-analytics.com": { name: "Google Analytics", category: "analytics" },
  "googletagmanager.com": { name: "Google Tag Manager", category: "analytics" },
  "doubleclick.net": { name: "DoubleClick", category: "ads" },
  "facebook.net": { name: "Facebook Pixel", category: "social" },
  "connect.facebook.net": { name: "Facebook SDK", category: "social" },
  "hotjar.com": { name: "Hotjar", category: "analytics" },
  "mc.yandex.ru": { name: "Yandex Metrika", category: "analytics" },
  "linkedin.com": { name: "LinkedIn Insight", category: "social" },
  "tiktok.com": { name: "TikTok Pixel", category: "social" },
  "amazon-adsystem.com": { name: "Amazon Ads", category: "ads" },
  "criteo.com": { name: "Criteo", category: "ads" },
  "twitter.com": { name: "Twitter Ads", category: "social" },
};

export function matchTracker(url: string) {
  try {
    const { hostname } = new URL(url);
    for (const pattern in KNOWN_TRACKERS) {
      if (hostname.includes(pattern.replace(/\//g, ""))) {
        return { url, ...KNOWN_TRACKERS[pattern] };
      }
    }
  } catch {}
  return null;
}