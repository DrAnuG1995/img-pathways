import Link from "next/link";

/** Friendly placeholder shown before a content doc has been written/verified, so
 * navigation never dead-ends during the content build-out. */
export default function ComingSoon({
  title,
  blurb,
}: {
  title: string;
  blurb?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
        In preparation
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink">{title}</h1>
      <p className="mt-3 text-muted">
        {blurb ??
          "We're verifying this section against the official sources before we publish it. Check back soon."}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/finder"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-deep"
        >
          Find your pathway
        </Link>
        <Link
          href="/"
          className="rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-ink hover:border-primary"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
