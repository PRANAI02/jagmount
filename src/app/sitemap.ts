import type { MetadataRoute } from "next";
import { seoPages } from "@/lib/seo-pages";

const base = "https://jagmount.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/services", "/manufacturing", "/projects", "/contact", "/quote/peb", "/quote/fabrication", ...seoPages.map((p) => `/${p.slug}`)];
  return pages.map((p) => ({ url: base + p, changeFrequency: "monthly", priority: p === "" ? 1 : p.startsWith("/quote") ? 0.9 : 0.7 }));
}
