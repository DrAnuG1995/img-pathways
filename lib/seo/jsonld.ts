import type { ContentDoc, Source } from "@/lib/content/types";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, OFFICIAL_LINKS } from "@/lib/site";

const abs = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** Site-wide Organization entity. `sameAs` points at the authoritative bodies
 * the site references, which reinforces topical relevance for search engines. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description: SITE_DESCRIPTION,
    sameAs: OFFICIAL_LINKS.map((l) => l.href),
  };
}

/** Site-wide WebSite entity. */
export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "en-AU",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function medicalWebPageJsonLd(doc: ContentDoc, path: string, sources: Source[]) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: doc.title,
    description: doc.metaDescription,
    url: abs(path),
    inLanguage: "en-AU",
    lastReviewed: doc.pageLastVerified,
    isPartOf: { "@type": "WebSite", url: SITE_URL },
    citation: sources.map((s) => ({
      "@type": "CreativeWork",
      name: s.title,
      publisher: { "@type": "Organization", name: s.publisher },
      url: s.url,
    })),
  };
}

export function faqPageJsonLd(faq: NonNullable<ContentDoc["faq"]>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answerMarkdown },
    })),
  };
}

export function howToJsonLd(doc: ContentDoc, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: doc.title,
    description: doc.metaDescription,
    url: abs(path),
    step: (doc.checklistSteps ?? []).map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.detailMarkdown,
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}
