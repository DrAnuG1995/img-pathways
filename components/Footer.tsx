import Link from "next/link";
import { SITE_NAME, ATTRIBUTION, OFFICIAL_LINKS } from "@/lib/site";
import { Logo } from "@/components/brand/Logo";

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Pathways",
    links: [
      { href: "/finder", label: "Find your pathway" },
      { href: "/pathways/standard", label: "Standard pathway" },
      { href: "/pathways/competent-authority", label: "Competent authority" },
      { href: "/pathways/specialist", label: "Specialist pathway" },
      { href: "/pathways/expedited-specialist", label: "Expedited specialist" },
    ],
  },
  {
    title: "Requirements",
    links: [
      { href: "/english", label: "English requirements" },
      { href: "/registration", label: "Registration types" },
      { href: "/visas", label: "Visas & immigration" },
      { href: "/medicare", label: "Medicare & moratorium" },
      { href: "/where-you-can-work", label: "Where you can work" },
      { href: "/costs-and-timelines", label: "Costs & timelines" },
    ],
  },
  {
    title: "Reference",
    links: [
      { href: "/colleges", label: "Specialist colleges" },
      { href: "/glossary", label: "Glossary" },
      { href: "/faq", label: "FAQ" },
      { href: "/sources", label: "Sources & methodology" },
      { href: "/about", label: "About" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Logo size={30} />
            <p className="mt-3 max-w-xs text-sm text-muted">
              An independent, evidence-backed guide for International Medical Graduates planning
              to practise in Australia.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">{col.title}</p>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-ink/80 hover:text-primary">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Official sources</p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {OFFICIAL_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={l.note}
                  className="text-sm text-ink/80 hover:text-primary"
                >
                  {l.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 rounded-xl border border-line bg-paper p-4 text-sm text-muted">
          <p className="font-semibold text-ink">General information only, not advice.</p>
          <p className="mt-1">
            This site explains how the system works using publicly available official sources. It is
            not medical, legal or migration advice and does not replace official guidance. Registration
            decisions rest with{" "}
            <a className="text-primary hover:underline" href="https://www.ahpra.gov.au" target="_blank" rel="noopener noreferrer">
              AHPRA / the Medical Board of Australia
            </a>{" "}
            and the{" "}
            <a className="text-primary hover:underline" href="https://www.amc.org.au" target="_blank" rel="noopener noreferrer">
              Australian Medical Council
            </a>
            . For migration matters, consult a registered migration agent (
            <a className="text-primary hover:underline" href="https://www.mara.gov.au" target="_blank" rel="noopener noreferrer">
              MARA
            </a>
            ) and the{" "}
            <a className="text-primary hover:underline" href="https://immi.homeaffairs.gov.au" target="_blank" rel="noopener noreferrer">
              Department of Home Affairs
            </a>
            . Always confirm details against the official source before acting.
          </p>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-2 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear().toString()} {SITE_NAME}. Content is provided for general
            information.
          </p>
          <a href={ATTRIBUTION.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            {ATTRIBUTION.label}
          </a>
        </div>
      </div>
    </footer>
  );
}
