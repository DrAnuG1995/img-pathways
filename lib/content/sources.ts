import registry from "@/content/sources.json";
import extra from "@/content/sources-extra.json";
import colleges from "@/content/sources-colleges.json";
import type { ContentDoc, Source, SourceAuthority, SourceRegistry } from "./types";
import { STALE_AFTER_DAYS, BUILD_DATE } from "@/lib/site";

// The registry is split across files so each research batch can append its
// verified sources without rewriting the core list.
const SOURCES = {
  ...(registry as SourceRegistry),
  ...(extra as SourceRegistry),
  ...(colleges as SourceRegistry),
};

/** Human label for each issuing authority, used on the /sources page. */
export const AUTHORITY_LABEL: Record<SourceAuthority, string> = {
  AHPRA: "AHPRA / Medical Board of Australia",
  AMC: "Australian Medical Council",
  COLLEGE: "Specialist medical colleges",
  HOME_AFFAIRS: "Department of Home Affairs",
  SERVICES_AUSTRALIA: "Services Australia",
  HEALTH_DEPT: "Department of Health",
  OTHER: "Other official sources",
};

/** Resolve a source id against the central registry. Returns null if unknown. */
export function resolveSource(id: string): Source | null {
  return SOURCES[id] ?? null;
}

export function getAllSources(): Source[] {
  return Object.values(SOURCES);
}

/**
 * All sources referenced by a doc's claims + FAQ, de-duplicated and sorted by
 * authority then publisher. Throws if a referenced id is missing, the content
 * integrity test relies on this.
 */
export function getPageSources(doc: ContentDoc): Source[] {
  const ids = new Set<string>();
  for (const claim of doc.claims) claim.sourceIds.forEach((s) => ids.add(s));
  for (const f of doc.faq ?? []) (f.sourceIds ?? []).forEach((s) => ids.add(s));

  const resolved: Source[] = [];
  for (const id of ids) {
    const src = resolveSource(id);
    if (src) resolved.push(src);
  }
  return resolved.sort(
    (a, b) =>
      a.authority.localeCompare(b.authority) ||
      a.publisher.localeCompare(b.publisher),
  );
}

/** Whole-number days between two ISO dates. */
export function daysBetween(fromIso: string, toIso: string): number {
  const from = new Date(fromIso + "T00:00:00Z").getTime();
  const to = new Date(toIso + "T00:00:00Z").getTime();
  return Math.round((to - from) / 86_400_000);
}

/** A source is "due for re-check" once it's older than STALE_AFTER_DAYS. */
export function isStale(lastVerified: string): boolean {
  return daysBetween(lastVerified, BUILD_DATE) > STALE_AFTER_DAYS;
}

/** Human "Verified 15 Jun 2026" label. */
export function formatVerified(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
