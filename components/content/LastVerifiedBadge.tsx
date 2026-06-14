import { formatVerified, isStale } from "@/lib/content/sources";

/** Small pill: teal "Verified 15 Jun 2026", or amber "Due for re-check" once stale. */
export default function LastVerifiedBadge({
  date,
  className = "",
}: {
  date: string;
  className?: string;
}) {
  const stale = isStale(date);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${
        stale ? "bg-amber-soft text-amber" : "bg-teal-soft text-teal"
      } ${className}`}
      title={`Source last verified ${formatVerified(date)}`}
    >
      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${stale ? "bg-amber" : "bg-teal"}`} />
      {stale ? "Due for re-check" : "Verified"} {formatVerified(date)}
    </span>
  );
}
