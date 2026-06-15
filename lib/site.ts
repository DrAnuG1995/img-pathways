// Central site constants. SITE_URL is a placeholder until the domain is chosen
// (see the plan's "Open decisions"); override with NEXT_PUBLIC_SITE_URL in Vercel.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://imgpathways.au";

export const SITE_NAME = "IMG Pathways Australia";

export const SITE_TAGLINE =
  "The independent, evidence-backed guide to becoming a doctor in Australia.";

export const SITE_DESCRIPTION =
  "Find your registration pathway as an International Medical Graduate (IMG) in Australia: AMC exams, the competent authority and specialist pathways, English requirements, visas, Medicare rules and where you can work. Every key fact cited to an official source with a last-verified date.";

// Light attribution to the sponsor, not a sales pitch.
export const ATTRIBUTION = {
  label: "Independently published. Supported by StatDoctor.",
  href: "https://statdoctor.app",
};

// The official bodies this site references. Surfaced site-wide (footer, home)
// so readers can always reach the authoritative source, and used in the
// Organization JSON-LD `sameAs`. Order: regulator, exams, then government.
export const OFFICIAL_LINKS: { label: string; href: string; note: string }[] = [
  { label: "AHPRA", href: "https://www.ahpra.gov.au", note: "The national health practitioner regulator" },
  { label: "Medical Board of Australia", href: "https://www.medicalboard.gov.au", note: "Registration standards and decisions" },
  { label: "Australian Medical Council", href: "https://www.amc.org.au", note: "Pathways, exams and qualification assessment" },
  { label: "Department of Home Affairs", href: "https://immi.homeaffairs.gov.au", note: "Visas and immigration" },
  { label: "Services Australia (Medicare)", href: "https://www.servicesaustralia.gov.au/restrictions-and-exemptions-for-international-medical-graduates", note: "Medicare provider numbers and section 19AB" },
  { label: "Register of Migration Agents (MARA)", href: "https://www.mara.gov.au", note: "Find a registered migration agent" },
];

// Base path for sub-path hosting (e.g. GitHub Pages project site at /img-pathways).
// Empty for root hosting (Vercel + custom domain). Used to prefix internal links
// that aren't rendered through next/link (raw markdown anchors).
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";

// Lead capture posts directly to a form backend (Formspree) from the browser,
// so it works on static hosting too. The form shows only when an endpoint is
// configured via NEXT_PUBLIC_LEAD_ENDPOINT (e.g. https://formspree.io/f/xxxx).
export const LEAD_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT?.trim() || "";
export const LEADS_ENABLED = LEAD_ENDPOINT.length > 0;

// How stale a source can be before the UI flags it amber ("due for re-check").
export const STALE_AFTER_DAYS = 180;

// Today, used for "last verified" comparisons. Kept as a constant so server and
// client render identically (no hydration drift from new Date()).
export const BUILD_DATE = "2026-06-15";
