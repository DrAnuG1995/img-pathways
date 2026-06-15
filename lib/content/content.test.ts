import { describe, it, expect } from "vitest";
import { getAllDocs } from "./loader";
import { getAllSources, resolveSource } from "./sources";

const ISO = /^\d{4}-\d{2}-\d{2}$/;
const CITE = /\[\[cite:([a-z0-9-]+)\]\]/g;

describe("source registry", () => {
  const sources = getAllSources();

  it("is non-empty", () => {
    expect(sources.length).toBeGreaterThan(0);
  });

  it.each(sources.map((s) => [s.id, s] as const))(
    "source %s is well-formed",
    (_id, s) => {
      expect(s.id).toBeTruthy();
      expect(s.title).toBeTruthy();
      expect(s.publisher).toBeTruthy();
      expect(s.url).toMatch(/^https?:\/\//);
      expect(s.lastVerified).toMatch(ISO);
      expect(Number.isNaN(Date.parse(s.lastVerified))).toBe(false);
    },
  );
});

describe("content docs are evidence-backed", () => {
  const docs = getAllDocs();

  it("content directory is readable", () => {
    expect(Array.isArray(docs)).toBe(true);
  });

  it.each(docs.map((d) => [`${d.collection}/${d.slug}`, d] as const))(
    "%s, claims, citations and dates are valid",
    (_label, doc) => {
      // claim ids unique
      const ids = doc.claims.map((c) => c.id);
      expect(new Set(ids).size).toBe(ids.length);

      // every claim cites at least one resolvable source
      for (const c of doc.claims) {
        expect(c.sourceIds.length, `claim ${c.id} has no sources`).toBeGreaterThan(0);
        for (const sid of c.sourceIds) {
          expect(resolveSource(sid), `claim ${c.id} → unknown source ${sid}`).not.toBeNull();
        }
      }

      // faq sources resolve
      for (const f of doc.faq ?? []) {
        for (const sid of f.sourceIds ?? []) {
          expect(resolveSource(sid), `faq → unknown source ${sid}`).not.toBeNull();
        }
      }

      // inline [[cite:id]] markers reference a real claim on this doc
      const body = [doc.summaryMarkdown, ...doc.sections.map((s) => s.bodyMarkdown)].join("\n");
      const claimIds = new Set(ids);
      let m: RegExpExecArray | null;
      CITE.lastIndex = 0;
      while ((m = CITE.exec(body)) !== null) {
        expect(claimIds.has(m[1]), `marker [[cite:${m[1]}]] has no matching claim`).toBe(true);
      }

      // dates valid
      expect(doc.pageLastVerified).toMatch(ISO);

      // HowTo pages must have steps
      if (doc.schemaType === "HowTo") {
        expect((doc.checklistSteps ?? []).length, "HowTo doc has no steps").toBeGreaterThan(0);
      }
    },
  );
});
