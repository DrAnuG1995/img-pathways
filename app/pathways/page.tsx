import Link from "next/link";
import { PathwayIcon } from "@/components/brand/Icons";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "The four pathways to registration",
  description:
    "The four routes for International Medical Graduates to register in Australia: Standard, Competent Authority, Specialist and the new Expedited Specialist pathway.",
  path: "/pathways",
  keywords: ["AMC pathways", "standard pathway", "competent authority pathway", "specialist pathway", "expedited specialist pathway", "IMG registration Australia"],
});

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
      "For doctors certified in the UK, Ireland, USA, Canada or New Zealand, generally no AMC exams, with a period of supervised practice.",
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
      "A faster route for specialists whose qualification is on the Board's accepted list, no comparability assessment and no college training program.",
  },
];

const BRANCHES = [
  {
    goal: "Work as a doctor",
    sub: "General registration",
    question: "Trained and certified in the UK, Ireland, USA, Canada or NZ, and practised there?",
    yes: { label: "Yes", name: "Competent Authority pathway", href: "/pathways/competent-authority" },
    no: { label: "No, or not yet", name: "Standard pathway", href: "/pathways/standard" },
  },
  {
    goal: "Have a specialty recognised",
    sub: "Specialist registration",
    question: "Is your specialist qualification on the Medical Board's accepted list?",
    yes: { label: "Yes", name: "Expedited Specialist pathway", href: "/pathways/expedited-specialist" },
    no: { label: "No", name: "Specialist pathway", href: "/pathways/specialist" },
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

      <section className="mt-8">
        <h2 className="font-display text-2xl font-semibold text-ink">Which pathway is mine?</h2>
        <p className="mt-1 text-muted">A quick decision guide. The finder below does the same thing interactively.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {BRANCHES.map((b) => (
            <div key={b.goal} className="rounded-2xl border border-line bg-white p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal">{b.sub}</p>
              <p className="mt-1 font-display text-lg font-semibold text-ink">{b.goal}</p>
              <p className="mt-3 text-sm text-muted">{b.question}</p>
              <div className="mt-4 space-y-2">
                {[b.yes, b.no].map((o) => (
                  <Link
                    key={o.href}
                    href={o.href}
                    className="flex items-center gap-2 rounded-xl border border-line p-3 text-sm transition hover:border-primary hover:bg-primary-soft"
                  >
                    <span className="shrink-0 rounded-md bg-primary-soft px-2 py-0.5 text-xs font-semibold text-primary">
                      {o.label}
                    </span>
                    <span className="font-medium text-ink">{o.name}</span>
                    <span aria-hidden className="ml-auto text-primary">→</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <h2 className="mt-12 font-display text-2xl font-semibold text-ink">The four pathways</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {PATHWAYS.map((p) => (
          <Link
            key={p.slug}
            href={`/pathways/${p.slug}`}
            className="group rounded-2xl border border-line bg-white p-6 transition hover:border-primary hover:shadow-sm"
          >
            <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary transition group-hover:bg-primary group-hover:text-white">
              <PathwayIcon slug={p.slug} size={24} />
            </span>
            <p className="mt-3 font-display text-xl font-semibold text-ink group-hover:text-primary">
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
