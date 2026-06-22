console.log('[Web Shield] Background script loaded');

const KNOWN_TRACKERS: Record<string, { name: string; category: string }> = {
  // === ANALYTICS ===
  "google-analytics.com": { name: "Google Analytics", category: "analytics" },
  "googletagmanager.com": { name: "Google Tag Manager", category: "analytics" },
  "analytics.google.com": { name: "Google Analytics", category: "analytics" },
  "chartbeat.net": { name: "Chartbeat", category: "analytics" },
  "chartbeat.com": { name: "Chartbeat", category: "analytics" },
  "hotjar.com": { name: "Hotjar", category: "analytics" },
  "mc.yandex.ru": { name: "Yandex Metrika", category: "analytics" },
  "yandex.ru/metrika": { name: "Yandex Metrika", category: "analytics" },
  "mixpanel.com": { name: "Mixpanel", category: "analytics" },
  "amplitude.com": { name: "Amplitude", category: "analytics" },
  "segment.io": { name: "Segment", category: "analytics" },
  "segment.com": { name: "Segment", category: "analytics" },
  "newrelic.com": { name: "New Relic", category: "analytics" },
  "nr-data.net": { name: "New Relic", category: "analytics" },
  "optimizely.com": { name: "Optimizely", category: "analytics" },
  "dotmetrics.net": { name: "Dotmetrics", category: "analytics" },
  "fullstory.com": { name: "FullStory", category: "analytics" },
  "mouseflow.com": { name: "Mouseflow", category: "analytics" },
  "crazyegg.com": { name: "Crazy Egg", category: "analytics" },
  "matomo.org": { name: "Matomo", category: "analytics" },
  "piwik.pro": { name: "Piwik PRO", category: "analytics" },
  "parsely.com": { name: "Parse.ly", category: "analytics" },
  "go-mpulse.net": { name: "Akamai mPulse", category: "analytics" },
  "scorecardresearch.com": { name: "Scorecard Research", category: "analytics" },
  "quantserve.com": { name: "Quantcast", category: "analytics" },
  "quantcast.com": { name: "Quantcast", category: "analytics" },
  "comscore.com": { name: "Comscore", category: "analytics" },
  "effectivemeasure.net": { name: "Effective Measure", category: "analytics" },
  "statcounter.com": { name: "StatCounter", category: "analytics" },
  "clicky.com": { name: "Clicky", category: "analytics" },
  "heap.io": { name: "Heap Analytics", category: "analytics" },
  "heapanalytics.com": { name: "Heap Analytics", category: "analytics" },
  "snowplowanalytics.com": { name: "Snowplow", category: "analytics" },

  // === ADS ===
  "doubleclick.net": { name: "DoubleClick", category: "ads" },
  "amazon-adsystem.com": { name: "Amazon Ads", category: "ads" },
  "criteo.com": { name: "Criteo", category: "ads" },
  "criteo.net": { name: "Criteo", category: "ads" },
  "taboola.com": { name: "Taboola", category: "ads" },
  "outbrain.com": { name: "Outbrain", category: "ads" },
  "adnxs.com": { name: "AppNexus", category: "ads" },
  "adsrvr.org": { name: "InsightExpress", category: "ads" },
  "bluekai.com": { name: "BlueKai", category: "ads" },
  "demdex.net": { name: "Adobe Audience", category: "ads" },
  "omtrdc.net": { name: "Adobe Marketing", category: "ads" },
  "rubiconproject.com": { name: "Rubicon Project", category: "ads" },
  "pubmatic.com": { name: "PubMatic", category: "ads" },
  "openx.net": { name: "OpenX", category: "ads" },
  "casalemedia.com": { name: "Index Exchange", category: "ads" },
  "contextweb.com": { name: "ContextWeb", category: "ads" },
  "smartadserver.com": { name: "Smart AdServer", category: "ads" },
  "adform.net": { name: "Adform", category: "ads" },
  "dv.tech": { name: "DV Tech", category: "ads" },
  "moatads.com": { name: "Moat", category: "ads" },
  "ads-twitter.com": { name: "Twitter Ads", category: "ads" },
  "bing.com/bat": { name: "Bing Ads", category: "ads" },
  "ads.yahoo.com": { name: "Yahoo Ads", category: "ads" },
  "advertising.com": { name: "Advertising.com", category: "ads" },
  "media.net": { name: "Media.net", category: "ads" },
  "yieldmo.com": { name: "Yieldmo", category: "ads" },

  // === SOCIAL ===
  "facebook.net": { name: "Facebook Pixel", category: "social" },
  "connect.facebook.net": { name: "Facebook SDK", category: "social" },
  "facebook.com": { name: "Facebook", category: "social" },
  "linkedin.com": { name: "LinkedIn Insight", category: "social" },
  "tiktok.com": { name: "TikTok Pixel", category: "social" },
  "twitter.com": { name: "Twitter", category: "social" },
  "x.com": { name: "X (Twitter)", category: "social" },
  "pinterest.com": { name: "Pinterest", category: "social" },
  "snapchat.com": { name: "Snapchat", category: "social" },
  "reddit.com": { name: "Reddit", category: "social" },
  "t.co": { name: "Twitter", category: "social" },

  // === FINGERPRINTING / PRIVACY ===
  "clarity.ms": { name: "Microsoft Clarity", category: "fingerprint" },
  "cdn.jsdelivr.net": { name: "jsDelivr CDN", category: "cdn" },
  "cloudflareinsights.com": { name: "Cloudflare Insights", category: "analytics" },
  "fastly-insights.com": { name: "Fastly Insights", category: "analytics" },
  "fingerprintjs.com": { name: "FingerprintJS", category: "fingerprint" },
  "iovation.com": { name: "iovation", category: "fingerprint" },
  "threatmetrix.com": { name: "ThreatMetrix", category: "fingerprint" },
};

function matchTracker(url: string) {

  if (url.startsWith("chrome-extension://")) return null;
  if (url.startsWith("chrome://")) return null;
  if (url.startsWith("edge://")) return null;
  if (url.startsWith("about:")) return null;
  
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

interface TrackerHit {
  url: string;
  name: string;
  category: string;
  tabId: number;
  timestamp: number;
}

const trackersByTab = new Map<number, TrackerHit[]>();

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (!details.tabId || details.tabId === -1) return;
    const match = matchTracker(details.url);
    if (!match) return;

    console.log('[Web Shield] Tracker found:', match.name, 'on tab', details.tabId);

    const list = trackersByTab.get(details.tabId) ?? [];
    if (!list.some((h) => h.name === match.name)) {
      list.push({
        url: details.url,
        name: match.name,
        category: match.category,
        tabId: details.tabId,
        timestamp: Date.now(),
      });
      trackersByTab.set(details.tabId, list);
      chrome.storage.local.set({ [`tab_${details.tabId}`]: list });
      console.log('[Web Shield] Saved. Total trackers for tab:', list.length);
    }
  },
  { urls: ["<all_urls>"] }
);

chrome.tabs.onRemoved.addListener((tabId) => {
  trackersByTab.delete(tabId);
  chrome.storage.local.remove(`tab_${tabId}`);
});

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === "GET_TRACKERS") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id;
      if (!tabId) return sendResponse([]);
      chrome.storage.local.get(`tab_${tabId}`, (data) => {
        sendResponse(data[`tab_${tabId}`] ?? []);
      });
    });
    return true;
  }
  return false;
});