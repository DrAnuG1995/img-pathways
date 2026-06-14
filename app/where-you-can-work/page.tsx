import TopicPage from "@/components/content/TopicPage";
import { topicMetadata } from "@/lib/content/topic-meta";

const SLUG = "where-you-can-work";
const TITLE = "Where you can work";

export const generateMetadata = () => topicMetadata(SLUG, TITLE);

export default function Page() {
  return <TopicPage slug={SLUG} fallbackTitle={TITLE} />;
}
