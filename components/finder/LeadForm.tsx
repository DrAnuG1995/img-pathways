"use client";

import { useState } from "react";
import Link from "next/link";
import type { Answers, Outcome } from "@/lib/finder/types";

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
    const payload = {
      firstName: String(fd.get("firstName") || "").trim(),
      lastName: String(fd.get("lastName") || "").trim(),
      medicalDegree: String(fd.get("medicalDegree") || "").trim(),
      countryOfDegree: String(fd.get("countryOfDegree") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      consent: fd.get("consent") === "on",
      pathway: outcome.pathway,
      pathwayHeadline: outcome.headline,
      answers,
    };

    if (!payload.consent) {
      setError("Please tick the consent box so we can send your guide.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
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
        <p className="font-display text-lg font-semibold text-ink">Thanks — that's on its way.</p>
        <p className="mt-1 text-sm text-muted">
          We'll send a tailored guide for the {outcome.pathway.replace(/-/g, " ")} pathway to your
          inbox. In the meantime, your full pathway page is below.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-white p-6">
      <p className="font-display text-lg font-semibold text-ink">
        Want this as a personalized guide?
      </p>
      <p className="mt-1 text-sm text-muted">
        Optional. Add your details and we'll send a step-by-step guide for your pathway, with current
        costs, timelines and links. You can read everything on this site for free without this.
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
          I'm happy to be contacted with my pathway guide and occasional updates. I understand this is
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
        {status === "submitting" ? "Sending…" : "Send me my guide"}
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
