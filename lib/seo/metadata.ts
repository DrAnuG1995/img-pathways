import type { Metadata } from "next";
import type { ContentDoc } from "@/lib/content/types";
import { SITE_URL, SITE_NAME } from "@/lib/site";

// Absolute URLs everywhere. metadataBase resolution drops the sub-path on a
// GitHub Pages project site (e.g. /img-pathways), so canonical and OG URLs must
// be built from SITE_URL directly, not left relative.
const abs = (path: string) =>
  `${SITE_URL}${path === "/" ? "" : path.startsWith("/") ? path : `/${path}`}`;

const OG_IMAGE = {
  url: `${SITE_URL}/og.png`,
  width: 1200,
  height: 630,
  alt: SITE_NAME,
};

/** Canonical, OpenGraph and Twitter metadata for any page. Use everywhere so
 * the social image and canonical URL are consistent and absolute. */
export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  ogType = "website",
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogType?: "website" | "article";
}): Metadata {
  const url = abs(path);
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: ogType,
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_AU",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

/** Per-page Metadata from a content doc (pathways, colleges, topics). */
export function buildDocMetadata(doc: ContentDoc, path: string): Metadata {
  return buildPageMetadata({
    title: doc.metaTitle ?? doc.title,
    description: doc.metaDescription,
    path,
    keywords: doc.keywords,
    ogType: "article",
  });
}
