import TopicPage from "@/components/content/TopicPage";
import { topicMetadata } from "@/lib/content/topic-meta";

const SLUG = "medicare";
const TITLE = "Medicare, provider numbers & the moratorium";

export const generateMetadata = () => topicMetadata(SLUG, TITLE);

export default function Page() {
  return <TopicPage slug={SLUG} fallbackTitle={TITLE} />;
}
