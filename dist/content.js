(function () {
    'use strict';

    function analyzeUrl(url) {
        try {
            const u = new URL(url);
            const reasons = [];
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
            let rating = "safe";
            if (score >= 4)
                rating = "dangerous";
            else if (score >= 2)
                rating = "suspicious";
            return { url, rating, reasons };
        }
        catch {
            return { url, rating: "unknown", reasons: ["Invalid URL"] };
        }
    }
    function isPopular(host) {
        const popular = ["google.com", "facebook.com", "youtube.com", "github.com", "microsoft.com"];
        return popular.some((d) => host.endsWith(d));
    }

    const ICONS = {
        safe: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
        suspicious: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
        dangerous: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
        unknown: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    };
    const COLORS = {
        safe: "#10b981",
        suspicious: "#f59e0b",
        dangerous: "#ef4444",
        unknown: "#6b7280",
    };
    const tooltip = createTooltip();
    document.body.appendChild(tooltip);
    const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
            m.addedNodes.forEach((node) => {
                if (node instanceof HTMLElement) {
                    if (node.tagName === "A")
                        enhanceLink(node);
                    node.querySelectorAll?.("a").forEach(enhanceLink);
                }
            });
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    document.querySelectorAll("a").forEach(enhanceLink);
    function enhanceLink(a) {
        if (a.dataset.wsEnhanced)
            return;
        a.dataset.wsEnhanced = "1";
        a.addEventListener("mouseenter", (e) => {
            if (!a.href || !a.href.startsWith("http"))
                return;
            showTooltip(e, analyzeUrl(a.href));
        });
        a.addEventListener("mouseleave", hideTooltip);
        a.addEventListener("mousemove", moveTooltip);
        const result = analyzeUrl(a.href);
        if (result.rating === "dangerous") {
            a.style.borderBottom = `2px solid ${COLORS.dangerous}`;
        }
        else if (result.rating === "suspicious") {
            a.style.borderBottom = `2px dashed ${COLORS.suspicious}`;
        }
    }
    function createTooltip() {
        const el = document.createElement("div");
        el.id = "ws-tooltip";
        el.innerHTML = `
    <style>
      #ws-tooltip {
        position: fixed; z-index: 2147483647;
        padding: 10px 14px; background: #0a0e13;
        border: 1px solid #f59e0b33; border-radius: 4px;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 11px; color: #e5e7eb;
        pointer-events: none; display: none;
        box-shadow: 0 0 20px rgba(245, 158, 11, 0.15);
        max-width: 340px; letter-spacing: 0.02em;
      }
      #ws-tooltip .ws-head { display: flex; align-items: center; gap: 6px; margin-bottom: 6px; font-weight: 600; }
      #ws-tooltip .ws-url { opacity: 0.6; word-break: break-all; font-size: 10px; }
      #ws-tooltip .ws-reason { margin-top: 6px; color: #f59e0b; font-size: 10px; }
      #ws-tooltip .ws-reason div { padding: 2px 0; }
    </style>
    <div class="ws-head"></div>
    <div class="ws-url"></div>
    <div class="ws-reason"></div>
  `;
        return el;
    }
    function showTooltip(e, result) {
        const labels = { safe: "SECURE", suspicious: "SUSPICIOUS", dangerous: "DANGEROUS", unknown: "UNKNOWN" };
        tooltip.querySelector(".ws-head").innerHTML =
            `<span style="color:${COLORS[result.rating]}">${ICONS[result.rating]}</span>
     <span style="color:${COLORS[result.rating]}">${labels[result.rating]}</span>`;
        tooltip.querySelector(".ws-url").textContent = result.url;
        tooltip.querySelector(".ws-reason").innerHTML =
            result.reasons.map((r) => `<div>› ${r}</div>`).join("");
        tooltip.style.display = "block";
        moveTooltip(e);
    }
    function moveTooltip(e) {
        tooltip.style.left = `${e.clientX + 14}px`;
        tooltip.style.top = `${e.clientY + 14}px`;
    }
    function hideTooltip() {
        tooltip.style.display = "none";
    }

})();
