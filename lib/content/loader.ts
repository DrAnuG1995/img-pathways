import "server-only";
import fs from "fs";
import path from "path";
import type { Collection, ContentDoc } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

const COLLECTION_DIRS: Record<Collection, string> = {
  pathway: "pathways",
  college: "colleges",
  topic: "topics",
  checklist: "checklists",
  article: "articles",
};

// In-memory cache keyed by directory mtime, invalidates when a JSON file is
// dropped in during dev; a single pass per build in the read-only Vercel FS.
const cache = new Map<Collection, { mtime: number; docs: ContentDoc[] }>();

function loadCollection(collection: Collection): ContentDoc[] {
  const dir = path.join(CONTENT_DIR, COLLECTION_DIRS[collection]);
  if (!fs.existsSync(dir)) return [];

  const mtime = fs.statSync(dir).mtimeMs;
  const hit = cache.get(collection);
  if (hit && hit.mtime === mtime) return hit.docs;

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  const docs: ContentDoc[] = [];
  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const doc = JSON.parse(raw) as ContentDoc;
      if (doc && typeof doc.slug === "string") docs.push(doc);
    } catch {
      // skip malformed files
    }
  }

  docs.sort(
    (a, b) => (a.order ?? 999) - (b.order ?? 999) || a.title.localeCompare(b.title),
  );

  cache.set(collection, { mtime, docs });
  return docs;
}

export function getDocsByCollection(collection: Collection): ContentDoc[] {
  return loadCollection(collection);
}

export function getAllSlugs(collection: Collection): string[] {
  return loadCollection(collection).map((d) => d.slug);
}

export function getDoc(collection: Collection, slug: string): ContentDoc | null {
  return loadCollection(collection).find((d) => d.slug === slug) ?? null;
}

export function getRelatedDocs(doc: ContentDoc, n = 3): ContentDoc[] {
  const pool = loadCollection(doc.collection).filter((d) => d.slug !== doc.slug);
  const explicit = (doc.relatedSlugs ?? [])
    .map((s) => pool.find((d) => d.slug === s))
    .filter((d): d is ContentDoc => Boolean(d));
  const rest = pool.filter((d) => !explicit.includes(d));
  return [...explicit, ...rest].slice(0, n);
}

/** Every doc across every collection, used by the sitemap. */
export function getAllDocs(): ContentDoc[] {
  return (Object.keys(COLLECTION_DIRS) as Collection[]).flatMap(loadCollection);
}
