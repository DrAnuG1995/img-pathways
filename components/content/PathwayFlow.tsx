import type { FlowStep } from "@/lib/content/types";

/** A compact vertical process flowchart: numbered steps joined by a connector
 * line, with the final step (the outcome) marked in teal. Rendered as an ordered
 * list so it stays accessible; the line and badges are the visual layer. */
export default function PathwayFlow({ steps }: { steps: FlowStep[] }) {
  if (!steps.length) return null;
  return (
    <ol className="mt-4">
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={i} className="flex gap-4 pb-5 last:pb-0">
            <div className="flex flex-col items-center">
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-semibold ${
                  last ? "bg-teal text-white" : "bg-primary text-white"
                }`}
              >
                {last ? "✓" : i + 1}
              </span>
              {!last && <span aria-hidden className="mt-1 w-px flex-1 bg-line" />}
            </div>
            <div className="pt-1">
              <p className="font-medium leading-snug text-ink">{s.label}</p>
              {s.note && <p className="mt-0.5 text-sm text-muted">{s.note}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
