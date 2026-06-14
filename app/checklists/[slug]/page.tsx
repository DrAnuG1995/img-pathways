import { notFound } from "next/navigation";
import { getAllSlugs, getDoc } from "@/lib/content/loader";
import { buildDocMetadata } from "@/lib/seo/metadata";
import ContentPage from "@/components/content/ContentPage";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return getAllSlugs("checklist").map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Params) {
  const doc = getDoc("checklist", params.slug);
  return doc ? buildDocMetadata(doc, `/checklists/${params.slug}`) : {};
}

export default function ChecklistPage({ params }: Params) {
  const doc = getDoc("checklist", params.slug);
  if (!doc) notFound();
  return (
    <ContentPage
      doc={doc}
      path={`/checklists/${params.slug}`}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Checklists", path: "/checklists" },
      ]}
      relatedLabel="Other checklists"
      relatedBasePath="/checklists"
    />
  );
}
