import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, ATTRIBUTION } from "@/lib/site";

export const metadata: Metadata = {
  title: "About & privacy",
  description:
    "Why this site exists, how we keep it accurate and independent, and how we handle your details.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">About</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
        {SITE_NAME}
      </h1>

      <div className="prose-content mt-6">
        <p>
          The path to practising medicine in Australia is genuinely confusing, and the rules change
          often. Most of what's online is either out of date or trying to sell you something. This
          site is a plain-English, evidence-backed guide that points you to the right pathway and
          shows you the official source for every key fact.
        </p>

        <h2>Independent and free</h2>
        <p>
          Everything here is free to read. We don't gate the information. {SITE_NAME} is supported by{" "}
          <a href={ATTRIBUTION.href} target="_blank" rel="noopener noreferrer">
            StatDoctor
          </a>
          , which helps doctors find work in Australia, but the guidance on this site is written to
          be useful first, and is cited to official sources you can check yourself.
        </p>

        <h2>How we keep it accurate</h2>
        <p>
          Every key claim links to a primary, official source, AHPRA and the Medical Board of
          Australia, the Australian Medical Council, the specialist colleges, the Department of Home
          Affairs and Services Australia, and carries a date showing when we last verified it. See{" "}
          <Link href="/sources">Sources &amp; methodology</Link> for the full list.
        </p>

        <h2 id="privacy">Your details &amp; privacy</h2>
        <p>
          You can use the whole site without giving us anything. If you choose to enter your details
          to get a tailored guide, here's the deal:
        </p>
        <ul>
          <li>We use your details to send the guide you asked for and occasional relevant updates.</li>
          <li>We don't sell your data.</li>
          <li>You can ask us to delete your details at any time.</li>
          <li>
            Because StatDoctor supports this site, your enquiry may be shared with StatDoctor to help
            you find work, only to help you, never sold on.
          </li>
        </ul>

        <h2>Not advice</h2>
        <p>
          This site is general information, not medical, legal or migration advice. Registration
          decisions rest with AHPRA / the Medical Board and the AMC. For migration, consult a
          registered MARA agent and the Department of Home Affairs. Always confirm against the
          official source before acting.
        </p>
      </div>

      <div className="mt-10 rounded-2xl border border-line bg-primary-soft p-6 text-center">
        <p className="font-display text-lg font-semibold text-ink">Ready to start?</p>
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
