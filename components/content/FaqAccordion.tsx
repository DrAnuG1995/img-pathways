import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { FaqItem } from "@/lib/content/types";
import { resolveSource } from "@/lib/content/sources";

/** Native <details> accordion, accessible and needs no client JS. Each answer
 * can surface its own official sources. */
export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  if (!items.length) return null;
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-white">
      {items.map((item, i) => (
        <details key={i} className="group p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink">
            {item.question}
            <span aria-hidden className="text-muted transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="prose-content mt-3 text-[15px]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.answerMarkdown}</ReactMarkdown>
          </div>
          {item.sourceIds?.length ? (
            <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
              {item.sourceIds.map((sid) => {
                const s = resolveSource(sid);
                if (!s) return null;
                return (
                  <a
                    key={sid}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {s.publisher} ↗
                  </a>
                );
              })}
            </p>
          ) : null}
        </details>
      ))}
    </div>
  );
}
