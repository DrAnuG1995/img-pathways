import Link from "next/link";
import type { ContentDoc } from "@/lib/content/types";
import { getPageSources } from "@/lib/content/sources";
import { getRelatedDocs } from "@/lib/content/loader";
import ContentRenderer from "./ContentRenderer";
import SourcesBlock from "./SourcesBlock";
import DisclaimerBanner from "./DisclaimerBanner";
import LastVerifiedBadge from "./LastVerifiedBadge";
import FaqAccordion from "./FaqAccordion";
import ChecklistSteps from "./ChecklistSteps";
import PathwayFlow from "./PathwayFlow";
import Toc from "./Toc";
import CollegeLogo from "@/components/CollegeLogo";
import JsonLd from "@/components/JsonLd";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  howToJsonLd,
  medicalWebPageJsonLd,
} from "@/lib/seo/jsonld";

export type Crumb = { name: string; path: string };

/** The shared layout for every content doc. Renders prose, checklist, FAQ,
 * sources block, related links and all JSON-LD. */
export default function ContentPage({
  doc,
  path,
  crumbs,
  relatedLabel = "Related",
  relatedBasePath,
}: {
  doc: ContentDoc;
  path: string;
  crumbs: Crumb[];
  relatedLabel?: string;
  /** Base path for related-doc links (e.g. "/pathways"). Defaults to "" (root). */
  relatedBasePath?: string;
}) {
  const sources = getPageSources(doc);
  const related = getRelatedDocs(doc, 3);
  const headings = doc.sections.map((s) => s.heading);

  const jsonld: object[] = [
    medicalWebPageJsonLd(doc, path, sources),
    breadcrumbJsonLd([...crumbs, { name: doc.title, path }]),
  ];
  if (doc.faq?.length) jsonld.push(faqPageJsonLd(doc.faq));
  if (doc.schemaType === "HowTo" && doc.checklistSteps?.length) {
    jsonld.push(howToJsonLd(doc, path));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav aria-label="Breadcrumb" className="text-xs text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          {crumbs.map((c) => (
            <li key={c.path} className="flex items-center gap-1.5">
              <Link href={c.path} className="hover:text-primary">
                {c.name}
              </Link>
              <span aria-hidden>/</span>
            </li>
          ))}
          <li className="text-ink/80">{doc.title}</li>
        </ol>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_16rem]">
        <article className="min-w-0 max-w-prose">
          <header>
            {doc.eyebrow && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                {doc.eyebrow}
              </p>
            )}
            <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              {doc.title}
            </h1>
            <div className="mt-3">
              <LastVerifiedBadge date={doc.pageLastVerified} />
            </div>
          </header>

          {doc.pathwayMeta && (
            <dl className="mt-5 grid divide-y divide-line overflow-hidden rounded-xl border border-line bg-white sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div className="p-4">
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted">Best for</dt>
                <dd className="mt-1 text-sm text-ink">{doc.pathwayMeta.bestFor}</dd>
              </div>
              <div className="p-4">
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted">Leads to</dt>
                <dd className="mt-1 text-sm text-ink">{doc.pathwayMeta.leadsTo}</dd>
              </div>
              <div className="p-4">
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted">What's involved</dt>
                <dd className="mt-1 text-sm text-ink">{doc.pathwayMeta.examsSummary}</dd>
              </div>
            </dl>
          )}

          {doc.collegeMeta && (
            <div className="mt-5 flex flex-wrap items-center gap-4 rounded-xl border border-line bg-white p-4">
              <span className="grid h-16 w-28 shrink-0 place-items-center overflow-hidden rounded-lg border border-line bg-white p-2">
                <CollegeLogo slug={doc.slug} abbr={doc.collegeMeta.abbr} className="max-h-12 w-auto max-w-full object-contain" />
              </span>
              <div className="min-w-0">
                <a
                  href={doc.collegeMeta.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  Visit the official {doc.collegeMeta.abbr} website ↗
                </a>
                {doc.collegeMeta.specialties?.length ? (
                  <p className="mt-1 text-sm text-muted">{doc.collegeMeta.specialties.join(" · ")}</p>
                ) : null}
              </div>
            </div>
          )}

          <div className="mt-5">
            <DisclaimerBanner kind={doc.disclaimerKind} />
          </div>

          {doc.flow?.length ? (
            <section className="mt-8 rounded-2xl border border-line bg-white p-6">
              <h2 className="font-display text-2xl font-semibold text-ink">How it works</h2>
              <p className="mt-1 text-sm text-muted">
                The process at a glance. Full detail, with sources, is below.
              </p>
              <PathwayFlow steps={doc.flow} />
            </section>
          ) : null}

          <div className="mt-8">
            <ContentRenderer doc={doc} />
          </div>

          {doc.checklistSteps?.length ? (
            <section className="mt-10">
              <h2 className="font-display text-2xl font-semibold text-ink">Step by step</h2>
              <ChecklistSteps steps={doc.checklistSteps} />
            </section>
          ) : null}

          {doc.faq?.length ? (
            <section className="mt-12">
              <h2 className="font-display text-2xl font-semibold text-ink">
                Frequently asked questions
              </h2>
              <div className="mt-4">
                <FaqAccordion items={doc.faq} />
              </div>
            </section>
          ) : null}

          <SourcesBlock doc={doc} />

          {related.length ? (
            <section className="mt-12">
              <h2 className="font-display text-xl font-semibold text-ink">{relatedLabel}</h2>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`${relatedBasePath ?? ""}/${r.slug}`}
                      className="block rounded-xl border border-line bg-white p-4 hover:border-primary"
                    >
                      <span className="font-medium text-ink">{r.title}</span>
                      <span className="mt-1 block text-sm text-muted">{r.metaDescription}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {doc.collection === "pathway" && (
            <section className="mt-12 rounded-2xl border border-line bg-primary-soft p-6 text-center">
              <p className="font-display text-lg font-semibold text-ink">Not sure this is your pathway?</p>
              <p className="mt-1 text-sm text-muted">The finder narrows it down in under a minute.</p>
              <Link
                href="/finder"
                className="mt-4 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-deep"
              >
                Find your pathway →
              </Link>
            </section>
          )}
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <Toc headings={headings} />
          </div>
        </aside>
      </div>

      <JsonLd data={jsonld} />
    </div>
  );
}
