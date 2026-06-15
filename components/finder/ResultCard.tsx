"use client";

import Link from "next/link";
import type { Answers, Confidence, Outcome } from "@/lib/finder/types";
import { LEADS_ENABLED } from "@/lib/site";
import { PathwayIcon } from "@/components/brand/Icons";
import LeadForm from "./LeadForm";

const CONFIDENCE: Record<Confidence, { label: string; cls: string }> = {
  clear: { label: "Strong match", cls: "bg-teal-soft text-teal" },
  likely: { label: "Likely match", cls: "bg-primary-soft text-primary" },
  "needs-review": { label: "Worth confirming", cls: "bg-amber-soft text-amber" },
};

export default function ResultCard({
  outcome,
  answers,
  onReset,
}: {
  outcome: Outcome;
  answers: Answers;
  onReset: () => void;
}) {
  const conf = CONFIDENCE[outcome.confidence];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${conf.cls}`}>
            {conf.label}
          </span>
          <button onClick={onReset} className="text-xs text-muted underline hover:text-primary">
            Start over
          </button>
        </div>

        <div className="mt-3 flex items-start gap-3">
          <span className="mt-0.5 inline-grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
            <PathwayIcon slug={outcome.pathway} size={24} />
          </span>
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            {outcome.headline}
          </h2>
        </div>
        <p className="mt-2 text-muted">{outcome.rationale}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <InfoCard title="What's involved">
            <ul className="space-y-1.5 text-sm text-ink/90">
              {outcome.requiredExams.map((x) => (
                <li key={x} className="flex gap-2">
                  <span aria-hidden className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {x}
                </li>
              ))}
            </ul>
          </InfoCard>
          <InfoCard title="English">
            <p className="text-sm text-ink/90">{outcome.englishNote}</p>
          </InfoCard>
          <InfoCard title="Visa">
            <p className="text-sm text-ink/90">{outcome.visaNote}</p>
          </InfoCard>
        </div>

        <div className="mt-6">
          <p className="text-sm font-semibold text-ink">Your next steps</p>
          <ol className="mt-2 space-y-2">
            {outcome.nextSteps.map((s, i) => (
              <li key={i} className="flex gap-3 text-sm text-ink/90">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary-soft text-[11px] font-semibold text-primary">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={outcome.pathwayHref}
            className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-deep"
          >
            Read the full pathway →
          </Link>
          {outcome.links
            .filter((l) => l.href !== outcome.pathwayHref)
            .slice(0, 3)
            .map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex items-center rounded-lg border border-line px-4 py-2.5 text-sm font-medium text-ink hover:border-primary hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
        </div>

        <p className="mt-5 rounded-lg bg-amber-soft p-3 text-xs text-amber">
          This is a guide, not a determination. Your exact eligibility is decided by AHPRA / the
          Medical Board of Australia and the AMC. Always confirm against the official source.
        </p>
      </div>

      {LEADS_ENABLED ? <LeadForm answers={answers} outcome={outcome} /> : null}
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-line bg-paper p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{title}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}
