import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The four pathways to registration",
  description:
    "The four routes for International Medical Graduates to register in Australia: Standard, Competent Authority, Specialist and the new Expedited Specialist pathway.",
  alternates: { canonical: "/pathways" },
};

const PATHWAYS = [
  {
    slug: "standard",
    name: "Standard pathway",
    blurb:
      "The AMC CAT MCQ exam plus the AMC clinical exam or a workplace-based assessment. For doctors whose qualification isn't from a recognised competent authority.",
  },
  {
    slug: "competent-authority",
    name: "Competent Authority pathway",
    blurb:
      "For doctors certified in the UK, Ireland, USA, Canada or New Zealand — generally no AMC exams, with a period of supervised practice.",
  },
  {
    slug: "specialist",
    name: "Specialist pathway",
    blurb:
      "For overseas-trained specialists. The relevant Australian specialist college assesses how comparable your training and experience are.",
  },
  {
    slug: "expedited-specialist",
    name: "Expedited Specialist pathway",
    blurb:
      "A faster route for specialists whose qualification is on the Board's accepted list — no comparability assessment and no college training program.",
  },
];

export default function PathwaysIndex() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Pathways</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          The four pathways to registration
        </h1>
        <p className="mt-3 text-muted">
          Which one applies depends mostly on where you trained and whether you're seeking general or
          specialist registration. Not sure? The finder narrows it down in under a minute.
        </p>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {PATHWAYS.map((p) => (
          <Link
            key={p.slug}
            href={`/pathways/${p.slug}`}
            className="group rounded-2xl border border-line bg-white p-6 transition hover:border-primary"
          >
            <p className="font-display text-xl font-semibold text-ink group-hover:text-primary">
              {p.name}
            </p>
            <p className="mt-2 text-sm text-muted">{p.blurb}</p>
            <span className="mt-3 inline-block text-sm font-medium text-primary">Read more →</span>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-line bg-primary-soft p-6 text-center">
        <p className="font-display text-lg font-semibold text-ink">Not sure which is yours?</p>
        <Link
          href="/finder"
          className="mt-3 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-deep"
        >
          Find your pathway →
        </Link>
      </div>
    </div>
  );
}
