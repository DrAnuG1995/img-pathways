import type { Metadata } from "next";
import { getDoc } from "./loader";
import { buildDocMetadata } from "@/lib/seo/metadata";

/** Metadata for a root-level topic page, with a sensible fallback before the
 * content doc exists. */
export function topicMetadata(slug: string, fallbackTitle: string): Metadata {
  const doc = getDoc("topic", slug);
  if (!doc) return { title: fallbackTitle, alternates: { canonical: `/${slug}` } };
  return buildDocMetadata(doc, `/${slug}`);
}
