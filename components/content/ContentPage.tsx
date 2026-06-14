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
import Toc from "./Toc";
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

          <div className="mt-5">
            <DisclaimerBanner kind={doc.disclaimerKind} />
          </div>

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
