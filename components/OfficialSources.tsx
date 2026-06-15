import { OFFICIAL_LINKS } from "@/lib/site";

/** A card grid of direct links to the authoritative bodies. Reused on the home
 * page and the sources page so readers can always reach the official source. */
export default function OfficialSources({
  heading = "Go straight to the official source",
  intro = "This site explains how the system works, but registration, exam and visa decisions rest with these bodies. Always confirm the detail against them.",
}: {
  heading?: string;
  intro?: string;
}) {
  return (
    <section aria-label="Official sources">
      <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{heading}</h2>
      <p className="mt-2 max-w-2xl text-muted">{intro}</p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {OFFICIAL_LINKS.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full rounded-2xl border border-line bg-white p-4 transition hover:border-primary hover:shadow-sm"
            >
              <span className="flex items-center justify-between font-display text-base font-semibold text-ink group-hover:text-primary">
                {l.label}
                <span aria-hidden className="text-muted group-hover:text-primary">↗</span>
              </span>
              <span className="mt-1 block text-sm text-muted">{l.note}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
