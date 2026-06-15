import type { Metadata } from "next";
import Link from "next/link";
import FinderWizard from "@/components/finder/FinderWizard";
import HeroBackdrop from "@/components/brand/HeroBackdrop";
import OfficialSources from "@/components/OfficialSources";
import { SITE_URL } from "@/lib/site";
import {
  PathwayIcon,
  IconShieldCheck,
  IconCalendarCheck,
  IconSparkle,
} from "@/components/brand/Icons";

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
  keywords: [
    "IMG Australia",
    "international medical graduate Australia",
    "AHPRA registration",
    "AMC exams",
    "competent authority pathway",
    "specialist pathway",
    "expedited specialist pathway",
    "overseas trained doctor Australia",
    "work as a doctor in Australia",
  ],
};

const PATHWAYS = [
  { slug: "standard", name: "Standard", blurb: "AMC exams (CAT MCQ + clinical/WBA)" },
  { slug: "competent-authority", name: "Competent Authority", blurb: "UK · Ireland · USA · Canada · NZ" },
  { slug: "specialist", name: "Specialist", blurb: "College comparability assessment" },
  { slug: "expedited-specialist", name: "Expedited Specialist", blurb: "Fast-track, accepted specialties" },
];

const FEATURES = [
  {
    Icon: IconShieldCheck,
    title: "Cited to the source",
    body: "Every key fact links to AHPRA, the AMC or the relevant government page, no vague claims.",
  },
  {
    Icon: IconCalendarCheck,
    title: "Dated, not stale",
    body: "Each fact shows when we last verified it. Out-of-date items get flagged, not hidden.",
  },
  {
    Icon: IconSparkle,
    title: "Independent & free",
    body: "Read everything without signing up. Supported by StatDoctor, written to be useful first.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero + survey */}
      <section className="relative isolate overflow-hidden border-b border-line bg-gradient-to-b from-primary-soft/60 to-paper">
        <HeroBackdrop className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              International Medical Graduates · Australia
            </p>
            <h1 className="mx-auto mt-3 max-w-2xl font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl">
              Find your pathway to practising medicine in Australia
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
              Answer a few questions. We'll point you to the registration pathway that fits and the
              exact next steps, every fact checked against the official AHPRA, AMC and government
              sources.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-line bg-white p-5 shadow-sm sm:p-8">
            <FinderWizard />
          </div>

          <p className="mt-4 text-center text-xs text-muted">
            Free to use. General information, not advice, always confirm with the official source.
          </p>
        </div>
      </section>

      {/* The four pathways */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              The four pathways
            </h2>
            <p className="mt-2 text-muted">Which applies depends on where you trained and what you're seeking.</p>
          </div>
          <Link href="/pathways" className="hidden text-sm font-medium text-primary hover:underline sm:block">
            See all →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PATHWAYS.map((p) => (
            <Link
              key={p.slug}
              href={`/pathways/${p.slug}`}
              className="group rounded-2xl border border-line bg-white p-5 transition hover:border-primary hover:shadow-sm"
            >
              <span className="inline-grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary transition group-hover:bg-primary group-hover:text-white">
                <PathwayIcon slug={p.slug} size={22} />
              </span>
              <p className="mt-3 font-display text-lg font-semibold text-ink group-hover:text-primary">
                {p.name}
              </p>
              <p className="mt-1 text-sm text-muted">{p.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Official sources */}
      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <OfficialSources />
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
          {FEATURES.map(({ Icon, title, body }) => (
            <div key={title}>
              <span className="inline-grid h-10 w-10 place-items-center rounded-lg bg-teal-soft text-teal">
                <Icon size={20} />
              </span>
              <p className="mt-3 font-display text-lg font-semibold text-ink">{title}</p>
              <p className="mt-1 text-sm text-muted">{body}</p>
            </div>
          ))}
        </div>
        <div className="pb-12 text-center">
          <Link href="/sources" className="text-sm font-medium text-primary hover:underline">
            How we keep this accurate →
          </Link>
        </div>
      </section>
    </>
  );
}
