import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ContentDoc } from "@/lib/content/types";
import { remarkCitations } from "@/lib/content/remark-citations";
import { slugify } from "@/lib/content/slug";
import Citation from "./Citation";

/** Allow our internal cite: scheme plus normal safe URLs; strip anything else. */
function urlTransform(url: string): string {
  if (url.startsWith("cite:")) return url;
  if (/^(https?:|mailto:|tel:|#|\/)/i.test(url)) return url;
  return "";
}

export default function ContentRenderer({ doc }: { doc: ContentDoc }) {
  // claim id → footnote number (1-based, in doc.claims order)
  const claimNumber = new Map<string, number>();
  doc.claims.forEach((c, i) => claimNumber.set(c.id, i + 1));

  const components = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    a({ href, children, ...props }: any) {
      if (typeof href === "string" && href.startsWith("cite:")) {
        const id = href.slice("cite:".length);
        return <Citation index={claimNumber.get(id) ?? 0} claimId={id} />;
      }
      const external = typeof href === "string" && /^https?:/i.test(href);
      return (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...props}>
          {children}
        </a>
      );
    },
  };

  const renderMarkdown = (text: string) => (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkCitations]}
      urlTransform={urlTransform}
      components={components}
    >
      {text}
    </ReactMarkdown>
  );

  return (
    <div>
      {doc.summaryMarkdown ? (
        <div className="prose-content text-lg leading-relaxed text-ink/90">
          {renderMarkdown(doc.summaryMarkdown)}
        </div>
      ) : null}

      {doc.sections.map((section) => (
        <section key={section.heading} className="prose-content">
          <h2 id={slugify(section.heading)}>{section.heading}</h2>
          {renderMarkdown(section.bodyMarkdown)}
        </section>
      ))}
    </div>
  );
}
