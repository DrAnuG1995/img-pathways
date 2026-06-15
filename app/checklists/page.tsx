import type { Metadata } from "next";
import Link from "next/link";
import { getDocsByCollection } from "@/lib/content/loader";

export const metadata: Metadata = {
  title: "Step-by-step checklists",
  description:
    "Step-by-step checklists for each registration pathway, what to do, in what order, with the official source for each step.",
  alternates: { canonical: "/checklists" },
};

export default function ChecklistsIndex() {
  const checklists = getDocsByCollection("checklist");

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Checklists</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Step-by-step checklists
        </h1>
        <p className="mt-3 text-muted">
          The exact sequence for each pathway, what to do, in what order, with the official source
          for every step.
        </p>
      </header>

      {checklists.length ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {checklists.map((c) => (
            <Link
              key={c.slug}
              href={`/checklists/${c.slug}`}
              className="group rounded-2xl border border-line bg-white p-6 transition hover:border-primary"
            >
              <p className="font-display text-xl font-semibold text-ink group-hover:text-primary">
                {c.title}
              </p>
              <p className="mt-2 text-sm text-muted">{c.metaDescription}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-line bg-white p-8 text-center">
          <p className="text-muted">
            Checklists are being finalised. Start with the{" "}
            <Link href="/finder" className="text-primary hover:underline">
              pathway finder
            </Link>{" "}
            to see your next steps now.
          </p>
        </div>
      )}
    </div>
  );
}
