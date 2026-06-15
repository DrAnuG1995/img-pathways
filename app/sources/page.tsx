import Link from "next/link";
import { getAllSources, AUTHORITY_LABEL } from "@/lib/content/sources";
import type { Source, SourceAuthority } from "@/lib/content/types";
import LastVerifiedBadge from "@/components/content/LastVerifiedBadge";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Sources & methodology",
  description:
    "How we keep this site accurate: every key fact is cited to an official source (AHPRA, the Medical Board, the AMC, Home Affairs, Services Australia) and dated when last verified.",
  path: "/sources",
  keywords: ["IMG Australia official sources", "AHPRA AMC sources", "evidence-backed IMG information", "how verified"],
});

const ORDER: SourceAuthority[] = [
  "AHPRA",
  "AMC",
  "COLLEGE",
  "HOME_AFFAIRS",
  "SERVICES_AUSTRALIA",
  "HEALTH_DEPT",
  "OTHER",
];

export default function SourcesPage() {
  const sources = getAllSources();
  const grouped = new Map<SourceAuthority, Source[]>();
  for (const s of sources) {
    const list = grouped.get(s.authority) ?? [];
    list.push(s);
    grouped.set(s.authority, list);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
        How we know this
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Sources &amp; methodology
      </h1>

      <div className="prose-content mt-5">
        <p>
          This site exists to be trustworthy. Every key fact carries a citation to an official
          source and a date showing when we last confirmed it against the live page. Where a source
          hasn't been re-checked recently, you'll see an amber{" "}
          <span className="font-medium text-amber">Due for re-check</span> flag rather than a quiet
          assumption that nothing changed.
        </p>
        <h2>How we verify</h2>
        <ul>
          <li>We only cite primary, official sources, regulators and government, not third parties.</li>
          <li>Each claim links to the exact page it comes from, so you can confirm it yourself.</li>
          <li>We re-check sources on a rolling basis and update the verify date when we do.</li>
          <li>
            This is general information, not advice. For your situation, confirm with{" "}
            <a href="https://www.ahpra.gov.au" target="_blank" rel="noopener noreferrer">
              AHPRA
            </a>
            , the{" "}
            <a href="https://www.amc.org.au" target="_blank" rel="noopener noreferrer">
              AMC
            </a>
            , and (for migration) a registered{" "}
            <a href="https://www.mara.gov.au" target="_blank" rel="noopener noreferrer">
              MARA
            </a>{" "}
            agent.
          </li>
        </ul>
      </div>

      <h2 className="mt-10 font-display text-2xl font-semibold text-ink">The source list</h2>
      <div className="mt-4 space-y-8">
        {ORDER.filter((a) => grouped.has(a)).map((authority) => (
          <section key={authority}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
              {AUTHORITY_LABEL[authority]}
            </h3>
            <ul className="mt-3 space-y-3">
              {(grouped.get(authority) ?? []).map((s) => (
                <li key={s.id} className="rounded-xl border border-line bg-white p-4">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:underline"
                  >
                    {s.title} ↗
                  </a>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                    <span>{s.publisher}</span>
                    <LastVerifiedBadge date={s.lastVerified} />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-line bg-primary-soft p-5 text-sm text-ink">
        Spotted something out of date?{" "}
        <Link href="/about" className="font-medium text-primary hover:underline">
          Tell us
        </Link>{" "}, keeping this current is the whole point.
      </div>
    </div>
  );
}
