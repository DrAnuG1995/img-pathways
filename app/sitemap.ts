import type { MetadataRoute } from "next";
import { getAllDocs } from "@/lib/content/loader";
import type { Collection } from "@/lib/content/types";
import { SITE_URL } from "@/lib/site";

const STATIC_ROUTES = [
  "",
  "/finder",
  "/pathways",
  "/colleges",
  "/checklists",
  "/english",
  "/registration",
  "/visas",
  "/medicare",
  "/where-you-can-work",
  "/costs-and-timelines",
  "/glossary",
  "/faq",
  "/sources",
  "/about",
];

const COLLECTION_BASE: Partial<Record<Collection, string>> = {
  pathway: "/pathways",
  college: "/colleges",
  checklist: "/checklists",
  article: "/articles",
  // topic docs map to existing static routes (e.g. /english), not duplicated here
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const docEntries: MetadataRoute.Sitemap = getAllDocs()
    .map((d) => {
      const base = COLLECTION_BASE[d.collection];
      if (!base) return null;
      return {
        url: `${SITE_URL}${base}/${d.slug}`,
        lastModified: new Date(d.pageLastVerified),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      };
    })
    .filter((e): e is NonNullable<typeof e> => e !== null);

  return [...staticEntries, ...docEntries];
}
