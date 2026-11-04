import type { MetadataRoute } from "next";
import { absoluteUrl, navigation } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return navigation.map((item) => ({
    url: absoluteUrl(item.href),
    lastModified,
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
