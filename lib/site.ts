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

// Light attribution to the sponsor — not a sales pitch.
export const ATTRIBUTION = {
  label: "Independently published. Supported by StatDoctor.",
  href: "https://statdoctor.app",
};

// How stale a source can be before the UI flags it amber ("due for re-check").
export const STALE_AFTER_DAYS = 180;

// Today, used for "last verified" comparisons. Kept as a constant so server and
// client render identically (no hydration drift from new Date()).
export const BUILD_DATE = "2026-06-15";
