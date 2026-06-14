import { getDoc } from "@/lib/content/loader";
import ContentPage from "./ContentPage";
import ComingSoon from "./ComingSoon";

/** Renders a root-level topic page (e.g. /english) from content/topics/<slug>.json,
 * or a friendly placeholder until that doc exists. */
export default function TopicPage({
  slug,
  fallbackTitle,
}: {
  slug: string;
  fallbackTitle: string;
}) {
  const doc = getDoc("topic", slug);
  if (!doc) return <ComingSoon title={fallbackTitle} />;
  return (
    <ContentPage
      doc={doc}
      path={`/${slug}`}
      crumbs={[{ name: "Home", path: "/" }]}
      relatedLabel="Related requirements"
      relatedBasePath=""
    />
  );
}
