import TopicPage from "@/components/content/TopicPage";
import { topicMetadata } from "@/lib/content/topic-meta";

const SLUG = "visas";
const TITLE = "Visas & immigration";

export const generateMetadata = () => topicMetadata(SLUG, TITLE);

export default function Page() {
  return <TopicPage slug={SLUG} fallbackTitle={TITLE} />;
}
