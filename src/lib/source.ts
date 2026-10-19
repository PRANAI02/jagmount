const KEY = "jm_src";

/** Remembers how a visitor first arrived (UTM tags, referrer, landing page) so each lead carries its source. */
export function rememberSource() {
  try {
    if (localStorage.getItem(KEY)) return;
    const q = new URLSearchParams(location.search);
    const ref = document.referrer ? new URL(document.referrer).hostname : "";
    const self = ref === location.hostname;
    const src = q.get("utm_source") || q.get("gclid") ? q.get("utm_source") || "google-ads" : ref && !self ? ref.replace(/^www\./, "") : "direct";
    const medium = q.get("utm_medium") || (q.get("gclid") ? "cpc" : ref && !self ? "referral" : "");
    const campaign = q.get("utm_campaign") || "";
    localStorage.setItem(KEY, JSON.stringify({ src, medium, campaign, landing: location.pathname, at: new Date().toISOString().slice(0, 10) }));
  } catch {
    /* storage blocked: source will read "unknown" */
  }
}

export function leadSource() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) || "null") as { src: string; medium: string; campaign: string; landing: string; at: string } | null;
    if (!s) return "unknown";
    return [s.src, s.medium, s.campaign].filter(Boolean).join(" / ") + ` · landed ${s.landing} (${s.at})`;
  } catch {
    return "unknown";
  }
}
