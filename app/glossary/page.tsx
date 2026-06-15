import glossary from "@/content/glossary.json";
import { resolveSource } from "@/lib/content/sources";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Glossary of acronyms",
  description:
    "Plain-English definitions of the acronyms in the IMG-to-Australia process: AHPRA, AMC, CAT MCQ, WBA, 19AB, DPA, DWS, MMM, OET, MARA and more.",
  path: "/glossary",
  keywords: ["IMG glossary", "AHPRA AMC acronyms", "19AB DPA DWS MMM meaning", "CAT MCQ WBA"],
});

type Term = {
  term: string;
  abbr?: string;
  definition: string;
  sourceIds?: string[];
};

export default function GlossaryPage() {
  const terms = [...(glossary.terms as Term[])].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Reference</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Glossary of acronyms
      </h1>
      <p className="mt-3 text-muted">
        The shorthand you'll meet on official pages, in plain English. Each links to its official
        source.
      </p>

      <dl className="mt-8 divide-y divide-line rounded-2xl border border-line bg-white">
        {terms.map((t) => (
          <div key={t.term} className="p-5">
            <dt className="font-display text-lg font-semibold text-ink">
              {t.term}
              {t.abbr && <span className="ml-2 text-sm font-normal text-muted">{t.abbr}</span>}
            </dt>
            <dd className="mt-1 text-sm text-ink/90">
              {t.definition}
              {t.sourceIds?.length ? (
                <span className="ml-1">
                  {t.sourceIds.map((sid) => {
                    const s = resolveSource(sid);
                    if (!s) return null;
                    return (
                      <a
                        key={sid}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 text-xs text-primary hover:underline"
                      >
                        [{s.publisher} ↗]
                      </a>
                    );
                  })}
                </span>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
