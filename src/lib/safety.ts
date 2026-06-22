export type SafetyRating = "safe" | "suspicious" | "dangerous" | "unknown";

export interface SafetyResult {
  url: string;
  rating: SafetyRating;
  reasons: string[];
}

export function analyzeUrl(url: string): SafetyResult {
  try {
    const u = new URL(url);
    const reasons: string[] = [];
    let score = 0;

    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(u.hostname)) {
      reasons.push("IP address instead of domain");
      score += 3;
    }
    if (url.length > 100) {
      reasons.push("Unusually long URL");
      score += 1;
    }
    if (u.hostname.split(".").length > 4) {
      reasons.push("Excessive subdomains");
      score += 2;
    }
    const bad = ["login", "verify", "secure", "update", "bank", "paypal"];
    if (bad.some((w) => u.hostname.includes(w)) && !isPopular(u.hostname)) {
      reasons.push("Suspicious keywords");
      score += 2;
    }
    if (u.protocol !== "https:") {
      reasons.push("Unencrypted connection");
      score += 1;
    }
    if (/[–@]/.test(u.hostname)) {
      reasons.push("Special characters in domain");
      score += 2;
    }

    let rating: SafetyRating = "safe";
    if (score >= 4) rating = "dangerous";
    else if (score >= 2) rating = "suspicious";

    return { url, rating, reasons };
  } catch {
    return { url, rating: "unknown", reasons: ["Invalid URL"] };
  }
}

function isPopular(host: string): boolean {
  const popular = ["google.com", "facebook.com", "youtube.com", "github.com", "microsoft.com"];
  return popular.some((d) => host.endsWith(d));
}