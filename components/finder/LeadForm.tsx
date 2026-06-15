"use client";

import { useState } from "react";
import Link from "next/link";
import type { Answers, Outcome } from "@/lib/finder/types";
import { LEAD_ENDPOINT, BASE_PATH } from "@/lib/site";

type Status = "idle" | "submitting" | "done" | "error";

export default function LeadForm({
  answers,
  outcome,
}: {
  answers: Answers;
  outcome: Outcome;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const firstName = String(fd.get("firstName") || "").trim();
    const lastName = String(fd.get("lastName") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const consent = fd.get("consent") === "on";
    const name = [firstName, lastName].filter(Boolean).join(" ").trim();
    const answerSummary = Object.entries(answers)
      .map(([k, v]) => `${k}: ${v}`)
      .join(" · ");

    if (!consent) {
      setError("Please tick the consent box so we can send your guide.");
      setStatus("error");
      return;
    }
    if (!LEAD_ENDPOINT) {
      setError("Lead capture isn't set up yet. Please try again later.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError("");
    try {
      // Posts straight to the form backend (Formspree). JSON + Accept header is
      // Formspree's AJAX mode, so the page never navigates away.
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: String(fd.get("phone") || "").trim(),
          "Medical degree": String(fd.get("medicalDegree") || "").trim(),
          "Country of degree": String(fd.get("countryOfDegree") || "").trim(),
          Pathway: outcome.pathway,
          "Pathway summary": outcome.headline,
          "Survey answers": answerSummary,
          _subject: `New IMG Pathways lead: ${name || email}`,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const msg = body?.errors?.[0]?.message || "Something went wrong. Please try again.";
        throw new Error(msg);
      }
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-teal/40 bg-teal-soft p-6">
        <p className="font-display text-lg font-semibold text-ink">Thanks, we've got your details.</p>
        <p className="mt-1 text-sm text-muted">
          We'll be in touch about the {outcome.pathway.replace(/-/g, " ")} pathway. Your guide is
          ready now, and your full source-checked pathway page is below.
        </p>
        <a
          href={`${BASE_PATH}/guides/${outcome.pathway}.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-deep"
        >
          Download your guide (PDF)
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-white p-6">
      <p className="font-display text-lg font-semibold text-ink">
        Want us to follow up on your pathway?
      </p>
      <p className="mt-1 text-sm text-muted">
        Optional. Leave your details and we'll reach out with tailored next steps and the occasional
        update. Everything on this site is free to read without it.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Field name="firstName" label="First name" autoComplete="given-name" required />
        <Field name="lastName" label="Last name" autoComplete="family-name" required />
        <Field name="medicalDegree" label="Medical degree" placeholder="e.g. MBBS, MD" required />
        <Field name="countryOfDegree" label="Country of medical degree" placeholder="e.g. India" required />
        <Field name="phone" label="Phone" type="tel" autoComplete="tel" />
        <Field name="email" label="Email" type="email" autoComplete="email" required />
      </div>

      <label className="mt-4 flex items-start gap-2 text-xs text-muted">
        <input type="checkbox" name="consent" className="mt-0.5" />
        <span>
          I'm happy to be contacted about my pathway and occasional updates. I understand this is
          general information, not advice. See our{" "}
          <Link href="/about" className="text-primary hover:underline">
            privacy approach
          </Link>
          .
        </span>
      </label>

      {status === "error" && (
        <p className="mt-3 text-sm text-amber" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-4 inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-deep disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send my details"}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-ink">
        {label} {required && <span className="text-amber">*</span>}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary-soft"
      />
    </label>
  );
}
