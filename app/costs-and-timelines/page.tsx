import TopicPage from "@/components/content/TopicPage";
import { topicMetadata } from "@/lib/content/topic-meta";

const SLUG = "costs-and-timelines";
const TITLE = "Costs & timelines";

export const generateMetadata = () => topicMetadata(SLUG, TITLE);

export default function Page() {
  return <TopicPage slug={SLUG} fallbackTitle={TITLE} />;
}
