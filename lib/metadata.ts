import type { Metadata } from "next";
import { site } from "@/lib/site";

const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name}: custom software, web and mobile applications, and cloud systems`,
};

/**
 * Builds consistent per-page metadata (title, description, canonical URL,
 * Open Graph and Twitter cards). Next.js replaces nested objects such as
 * `openGraph` rather than merging them, so every page goes through here.
 */
export function pageMetadata({
  title,
  description = site.description,
  path,
}: {
  title?: string;
  description?: string;
  path: string;
}): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | Custom Software & IT Solutions`;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      url: path,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
  };
}
