import { slugify } from "@/lib/content/slug";

/** Simple anchor-based table of contents built from section headings. */
export default function Toc({ headings }: { headings: string[] }) {
  if (headings.length < 2) return null;
  return (
    <nav aria-label="On this page" className="rounded-xl border border-line bg-white p-4 text-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">On this page</p>
      <ol className="mt-2 space-y-1.5">
        {headings.map((h) => (
          <li key={h}>
            <a href={`#${slugify(h)}`} className="text-ink/80 hover:text-primary">
              {h}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
