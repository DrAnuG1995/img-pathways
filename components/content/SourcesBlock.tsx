import type { ContentDoc } from "@/lib/content/types";
import { resolveSource } from "@/lib/content/sources";
import LastVerifiedBadge from "./LastVerifiedBadge";

/** The evidence-backed centrepiece of every content page: each key fact, numbered
 * to match its inline citation chip, with the official source(s) and verify date. */
export default function SourcesBlock({ doc }: { doc: ContentDoc }) {
  if (!doc.claims.length) return null;

  return (
    <section
      aria-labelledby="sources-heading"
      className="mt-12 rounded-2xl border border-line bg-white p-6"
    >
      <h2 id="sources-heading" className="font-display text-xl font-semibold text-ink">
        Sources &amp; last verified
      </h2>
      <p className="mt-1 text-sm text-muted">
        Every key fact on this page, matched to the official source it comes from. The date shows
        when we last confirmed it against the live page.
      </p>
      <ol className="mt-5 space-y-4">
        {doc.claims.map((claim, i) => (
          <li
            key={claim.id}
            id={`cite-${claim.id}`}
            className="scroll-mt-24 border-t border-line pt-4 first:border-t-0 first:pt-0"
          >
            <div className="flex gap-3">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded bg-primary-soft text-[11px] font-semibold text-primary">
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm text-ink">{claim.text}</p>
                <ul className="mt-2 space-y-1.5">
                  {claim.sourceIds.map((sid) => {
                    const s = resolveSource(sid);
                    if (!s) return null;
                    return (
                      <li key={sid} className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary hover:underline"
                        >
                          {s.publisher}: {s.title} ↗
                        </a>
                        <LastVerifiedBadge date={s.lastVerified} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
