import type { ContentDoc, Source } from "@/lib/content/types";
import { SITE_URL } from "@/lib/site";

const abs = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

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
