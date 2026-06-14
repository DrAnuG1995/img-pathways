// ---------------------------------------------------------------------------
// Content data model — the evidence-backed core.
//
// Body prose is markdown, but every KEY CLAIM and every SOURCE is a structured,
// machine-checkable field. Inline citations are written in markdown as
// `[[cite:claim-id]]` and resolved against a doc's `claims`, which in turn
// reference entries in the central `content/sources.json` registry. This makes
// "every key fact is cited and dated" enforceable by a test, not aspirational.
// ---------------------------------------------------------------------------

export type SourceAuthority =
  | "AHPRA"
  | "AMC"
  | "COLLEGE"
  | "HOME_AFFAIRS"
  | "SERVICES_AUSTRALIA"
  | "HEALTH_DEPT"
  | "OTHER";

/** A single citable source, defined once in the registry and referenced by id. */
export interface Source {
  id: string;
  title: string;
  publisher: string;
  authority: SourceAuthority;
  url: string;
  lastVerified: string; // ISO date (YYYY-MM-DD) — when a human/agent checked the live page
  verifiedBy?: string;
  accessNote?: string; // which part of the page the claim draws on
}

/** A key assertion on a page. MUST carry at least one source. */
export interface Claim {
  id: string; // anchor target; referenced inline as [[cite:<id>]]
  text: string; // the assertion (plain text / light markdown)
  sourceIds: string[]; // → resolve against the sources registry
}

/** A body section: a heading (→ TOC entry) plus markdown that may contain [[cite:...]]. */
export interface ContentSection {
  heading: string;
  bodyMarkdown: string;
}

export interface FaqItem {
  question: string;
  answerMarkdown: string;
  sourceIds?: string[];
}

/** A step in a checklist / HowTo page. */
export interface ChecklistStep {
  title: string;
  detailMarkdown: string;
}

export type DisclaimerKind = "general" | "migration" | "medical";

export type SchemaType = "MedicalWebPage" | "FAQPage" | "HowTo";

export type Collection =
  | "pathway"
  | "college"
  | "topic"
  | "checklist"
  | "article";

/** Optional per-collection metadata. */
export interface PathwayMeta {
  leadsTo: string; // e.g. "General registration"
  bestFor: string; // one-liner on who this suits
  examsSummary: string; // short summary for cards
}

export interface CollegeMeta {
  abbr: string; // e.g. "RACP"
  fullName: string; // e.g. "Royal Australasian College of Physicians"
  website: string;
  specialties: string[];
}

export interface ContentDoc {
  slug: string;
  collection: Collection;
  title: string;
  eyebrow?: string; // small label above the H1 (e.g. "AMC Pathway")
  metaTitle?: string;
  metaDescription: string;
  keywords: string[];
  summaryMarkdown: string; // intro / TL;DR
  sections: ContentSection[];
  claims: Claim[];
  faq?: FaqItem[];
  checklistSteps?: ChecklistStep[]; // for checklist / HowTo docs
  relatedSlugs?: string[];
  disclaimerKind: DisclaimerKind;
  pageLastVerified: string; // ISO date
  schemaType: SchemaType;
  pathwayMeta?: PathwayMeta;
  collegeMeta?: CollegeMeta;
  order?: number; // sort hint for index pages
}

/** The shape of content/sources.json (id → Source). */
export type SourceRegistry = Record<string, Source>;
