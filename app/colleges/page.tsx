import type { Metadata } from "next";
import Link from "next/link";
import { getDocsByCollection } from "@/lib/content/loader";

export const metadata: Metadata = {
  title: "Specialist medical colleges",
  description:
    "The Australian specialist medical colleges that assess overseas-trained specialists (SIMGs), RACP, RACS, RACGP, ACEM, RANZCP and more.",
  alternates: { canonical: "/colleges" },
};

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
            <Link
              key={c.slug}
              href={`/colleges/${c.slug}`}
              className="group rounded-2xl border border-line bg-white p-6 transition hover:border-primary"
            >
              <p className="font-display text-xl font-semibold text-ink group-hover:text-primary">
                {c.collegeMeta?.abbr ?? c.title}
              </p>
              {c.collegeMeta?.fullName && (
                <p className="text-sm font-medium text-ink/80">{c.collegeMeta.fullName}</p>
              )}
              <p className="mt-2 text-sm text-muted">{c.metaDescription}</p>
            </Link>
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
