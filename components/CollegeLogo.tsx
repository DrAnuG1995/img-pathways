import { BASE_PATH } from "@/lib/site";

/** A college's logo, self-hosted at /public/colleges/<slug>.png. Raw <img> (not
 * next/image) so it works under static export; BASE_PATH-prefixed for sub-path
 * hosting. Logos are trademarks of their colleges, shown to identify and link to
 * each body. */
export default function CollegeLogo({
  slug,
  abbr,
  className,
}: {
  slug: string;
  abbr: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${BASE_PATH}/colleges/${slug}.png`}
      alt={`${abbr} logo`}
      loading="lazy"
      decoding="async"
      className={className ?? "max-h-10 w-auto max-w-full object-contain"}
    />
  );
}
