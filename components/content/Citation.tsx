/** Inline footnote chip rendered in place of a `[[cite:id]]` marker. Links down
 * to the matching entry in the page's "Sources & last verified" block. */
export default function Citation({
  index,
  claimId,
}: {
  index: number;
  claimId: string;
}) {
  return (
    <sup className="ml-0.5 leading-none">
      <a
        href={`#cite-${claimId}`}
        className="rounded bg-primary-soft px-1 py-0.5 text-[10px] font-semibold text-primary no-underline hover:bg-primary hover:text-white"
        aria-label={`Source ${index}`}
      >
        {index}
      </a>
    </sup>
  );
}
