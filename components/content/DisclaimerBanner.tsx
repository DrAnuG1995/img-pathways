import type { ReactNode } from "react";
import type { DisclaimerKind } from "@/lib/content/types";

const COPY: Record<DisclaimerKind, { title: string; body: ReactNode; tone: string }> = {
  general: {
    title: "General information, confirm with the official source",
    tone: "border-line bg-paper",
    body: (
      <>
        This page explains how the system works using publicly available official sources. It is not
        advice and does not replace official guidance. Registration decisions rest with{" "}
        <a className="text-primary hover:underline" href="https://www.ahpra.gov.au" target="_blank" rel="noopener noreferrer">
          AHPRA / the Medical Board of Australia
        </a>{" "}
        and the{" "}
        <a className="text-primary hover:underline" href="https://www.amc.org.au" target="_blank" rel="noopener noreferrer">
          Australian Medical Council
        </a>
        . Always confirm details against the official source before acting.
      </>
    ),
  },
  migration: {
    title: "Migration is regulated, this is general information only",
    tone: "border-amber/40 bg-amber-soft",
    body: (
      <>
        Visa and Medicare eligibility are complex and change often. This is general information, not
        migration or legal advice. For your situation, consult a registered migration agent via{" "}
        <a className="text-primary hover:underline" href="https://www.mara.gov.au" target="_blank" rel="noopener noreferrer">
          MARA
        </a>{" "}
        and check the{" "}
        <a className="text-primary hover:underline" href="https://immi.homeaffairs.gov.au" target="_blank" rel="noopener noreferrer">
          Department of Home Affairs
        </a>{" "}
        and{" "}
        <a className="text-primary hover:underline" href="https://www.servicesaustralia.gov.au" target="_blank" rel="noopener noreferrer">
          Services Australia
        </a>{" "}
        directly.
      </>
    ),
  },
  medical: {
    title: "General information, not clinical or registration advice",
    tone: "border-line bg-paper",
    body: (
      <>
        This page is general information about registration, not advice about your eligibility or
        clinical practice. The{" "}
        <a className="text-primary hover:underline" href="https://www.medicalboard.gov.au" target="_blank" rel="noopener noreferrer">
          Medical Board of Australia
        </a>{" "}
        makes registration decisions and can give the definitive position for your case.
      </>
    ),
  },
};

export default function DisclaimerBanner({ kind }: { kind: DisclaimerKind }) {
  const { title, body, tone } = COPY[kind];
  return (
    <aside className={`rounded-xl border p-4 text-sm text-muted ${tone}`} role="note">
      <p className="font-semibold text-ink">{title}</p>
      <p className="mt-1">{body}</p>
    </aside>
  );
}
