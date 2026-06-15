import type { Metadata } from "next";
import FinderWizard from "@/components/finder/FinderWizard";

export const metadata: Metadata = {
  title: "Find your pathway",
  description:
    "Answer a few questions and we'll point you to your likely registration pathway as an International Medical Graduate in Australia, Standard, Competent Authority, Specialist or Expedited Specialist, with the exact next steps.",
  alternates: { canonical: "/finder" },
};

export default function FinderPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="mb-10 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          Pathway finder
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Find your pathway to practising in Australia
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          A few quick questions. We'll point you to the pathway that most likely fits and the exact
          next steps, then you can read the full, source-checked detail.
        </p>
      </header>
      <FinderWizard />
    </div>
  );
}
