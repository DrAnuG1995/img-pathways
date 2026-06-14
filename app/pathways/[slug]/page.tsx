import { notFound } from "next/navigation";
import { getAllSlugs, getDoc } from "@/lib/content/loader";
import { buildDocMetadata } from "@/lib/seo/metadata";
import ContentPage from "@/components/content/ContentPage";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return getAllSlugs("pathway").map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Params) {
  const doc = getDoc("pathway", params.slug);
  return doc ? buildDocMetadata(doc, `/pathways/${params.slug}`) : {};
}

export default function PathwayPage({ params }: Params) {
  const doc = getDoc("pathway", params.slug);
  if (!doc) notFound();
  return (
    <ContentPage
      doc={doc}
      path={`/pathways/${params.slug}`}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Pathways", path: "/pathways" },
      ]}
      relatedLabel="Other pathways"
      relatedBasePath="/pathways"
    />
  );
}
