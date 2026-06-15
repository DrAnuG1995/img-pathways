import Link from "next/link";
import { getDocsByCollection } from "@/lib/content/loader";
import { buildPageMetadata } from "@/lib/seo/metadata";
import CollegeLogo from "@/components/CollegeLogo";

export const metadata = buildPageMetadata({
  title: "Specialist medical colleges",
  description:
    "The 15 Australian specialist medical colleges that assess overseas-trained specialists (SIMGs): RACGP, ACRRM, RACP, RACS, ANZCA, ACEM, RANZCP, RANZCOG, RANZCR, RCPA, RANZCO, ACD, CICM, RACMA and ACSEP.",
  path: "/colleges",
  keywords: ["Australian specialist medical colleges", "SIMG assessment", "overseas trained specialist", "RACGP RACP RACS ANZCA RANZCP"],
});

export default function CollegesIndex() {
  const colleges = getDocsByCollection("college");

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Colleges</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Specialist medical colleges
        </h1>
        <p className="mt-3 text-muted">
          On the specialist pathway, the relevant Australian college assesses your training. Each
          college sets its own process, fees and requirements.
        </p>
      </header>

      {colleges.length ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {colleges.map((c) => (
            <div
              key={c.slug}
              className="flex flex-col rounded-2xl border border-line bg-white p-6 transition hover:border-primary"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-16 w-24 shrink-0 place-items-center overflow-hidden rounded-lg border border-line bg-white p-2">
                  <CollegeLogo slug={c.slug} abbr={c.collegeMeta?.abbr ?? c.title} className="max-h-12 w-auto max-w-full object-contain" />
                </span>
                <div className="min-w-0">
                  <Link
                    href={`/colleges/${c.slug}`}
                    className="font-display text-xl font-semibold text-ink hover:text-primary"
                  >
                    {c.collegeMeta?.abbr ?? c.title}
                  </Link>
                  {c.collegeMeta?.fullName && (
                    <p className="text-sm font-medium leading-snug text-ink/70">{c.collegeMeta.fullName}</p>
                  )}
                </div>
              </div>
              <p className="mt-3 text-sm text-muted">{c.metaDescription}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <Link href={`/colleges/${c.slug}`} className="font-medium text-primary hover:underline">
                  Read profile →
                </Link>
                {c.collegeMeta?.website && (
                  <a
                    href={c.collegeMeta.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink/70 hover:text-primary"
                  >
                    Official site ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-line bg-white p-8 text-center">
          <p className="text-muted">
            We're verifying each college's process against its official site before we publish these
            profiles. In the meantime, the{" "}
            <Link href="/pathways/specialist" className="text-primary hover:underline">
              Specialist pathway
            </Link>{" "}
            page explains how college assessment works.
          </p>
        </div>
      )}
    </div>
  );
}
