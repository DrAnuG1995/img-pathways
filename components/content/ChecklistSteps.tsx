import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ChecklistStep } from "@/lib/content/types";

/** Numbered step list for checklist / HowTo pages. */
export default function ChecklistSteps({ steps }: { steps: ChecklistStep[] }) {
  if (!steps.length) return null;
  return (
    <ol className="mt-6 space-y-4">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4 rounded-2xl border border-line bg-white p-5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-white">
            {i + 1}
          </span>
          <div className="min-w-0">
            <p className="font-display text-lg font-semibold text-ink">{step.title}</p>
            <div className="prose-content mt-1 text-[15px]">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{step.detailMarkdown}</ReactMarkdown>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
