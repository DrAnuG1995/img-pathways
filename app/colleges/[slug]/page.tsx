import { notFound } from "next/navigation";
import { getAllSlugs, getDoc } from "@/lib/content/loader";
import { buildDocMetadata } from "@/lib/seo/metadata";
import ContentPage from "@/components/content/ContentPage";

type Params = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs("college").map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Params) {
  const doc = getDoc("college", params.slug);
  return doc ? buildDocMetadata(doc, `/colleges/${params.slug}`) : {};
}

export default function CollegePage({ params }: Params) {
  const doc = getDoc("college", params.slug);
  if (!doc) notFound();
  return (
    <ContentPage
      doc={doc}
      path={`/colleges/${params.slug}`}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Colleges", path: "/colleges" },
      ]}
      relatedLabel="Other colleges"
      relatedBasePath="/colleges"
    />
  );
}
