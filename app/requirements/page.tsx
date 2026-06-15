import Link from "next/link";
import { getDoc } from "@/lib/content/loader";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  IconLanguage,
  IconIdCard,
  IconPlane,
  IconCard,
  IconMapPin,
  IconDollar,
  IconBriefcase,
} from "@/components/brand/Icons";

export const metadata = buildPageMetadata({
  title: "Requirements",
  description:
    "Beyond your pathway: the requirements and decisions most International Medical Graduates face in Australia, English, registration, visas, Medicare, where you can work, costs, and your first job.",
  path: "/requirements",
  keywords: [
    "IMG requirements Australia",
    "AHPRA English requirement",
    "doctor visa Australia",
    "Medicare 19AB moratorium",
    "where IMGs can work Australia",
    "cost to register as a doctor Australia",
  ],
});

const ITEMS: { slug: string; label: string; Icon: (p: { size?: number }) => JSX.Element }[] = [
  { slug: "english", label: "English requirements", Icon: IconLanguage },
  { slug: "registration", label: "Registration types", Icon: IconIdCard },
  { slug: "visas", label: "Visas & immigration", Icon: IconPlane },
  { slug: "medicare", label: "Medicare & the moratorium", Icon: IconCard },
  { slug: "where-you-can-work", label: "Where you can work", Icon: IconMapPin },
  { slug: "costs-and-timelines", label: "Costs & timelines", Icon: IconDollar },
  { slug: "rmo-recruitment", label: "First job: RMO recruitment", Icon: IconBriefcase },
];

export default function RequirementsIndex() {
  const items = ITEMS.map((it) => ({
    ...it,
    blurb: getDoc("topic", it.slug)?.metaDescription ?? "",
  }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Requirements</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          What you need to practise in Australia
        </h1>
        <p className="mt-3 text-muted">
          Beyond your pathway, these are the requirements and decisions that apply to most
          International Medical Graduates. Each page cites its official source and shows when it was
          last verified.
        </p>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {items.map(({ slug, label, blurb, Icon }) => (
          <Link
            key={slug}
            href={`/${slug}`}
            className="group flex gap-4 rounded-2xl border border-line bg-white p-5 transition hover:border-primary hover:shadow-sm"
          >
            <span className="inline-grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary transition group-hover:bg-primary group-hover:text-white">
              <Icon size={22} />
            </span>
            <span className="min-w-0">
              <span className="font-display text-lg font-semibold text-ink group-hover:text-primary">
                {label}
              </span>
              {blurb && <span className="mt-1 block text-sm text-muted">{blurb}</span>}
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-line bg-primary-soft p-6 text-center">
        <p className="font-display text-lg font-semibold text-ink">Not sure where to start?</p>
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
