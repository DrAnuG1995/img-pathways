import type { Metadata } from "next";
import type { ContentDoc } from "@/lib/content/types";

/** Build per-page Metadata from a content doc. */
export function buildDocMetadata(doc: ContentDoc, path: string): Metadata {
  const title = doc.metaTitle ?? doc.title;
  return {
    title,
    description: doc.metaDescription,
    keywords: doc.keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title,
      description: doc.metaDescription,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: doc.metaDescription,
    },
  };
}
