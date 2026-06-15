import { SITE_NAME } from "@/lib/site";

/**
 * The brand mark: a gradient rounded-square badge with a white medical cross and
 * a teal accent node. Self-contained colours so it reads on light or dark
 * surfaces. Decorative, pair with a text label for accessible names.
 */
export function LogoMark({
  size = 28,
  className,
}: {
  size?: number;
  className?: string;
}) {
  // Unique gradient id per size so multiple marks on a page don't collide.
  const id = `lm-${size}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2470A8" />
          <stop offset="1" stopColor="#17486E" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill={`url(#${id})`} />
      <path
        d="M16 8.4V23.6M8.4 16H23.6"
        stroke="#fff"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <circle cx="22.4" cy="22.4" r="2.4" fill="#2A9D8F" />
    </svg>
  );
}

/**
 * Full lockup: mark + wordmark. The wordmark uses currentColor so it adapts to
 * its surface. `compact` drops the "Australia" descender for tight spaces.
 */
export function Logo({
  size = 30,
  compact = false,
  className,
}: {
  size?: number;
  compact?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark size={size} />
      <span className="leading-none">
        <span className="block font-display text-[1.05rem] font-semibold tracking-tight text-ink">
          IMG Pathways
        </span>
        {!compact && (
          <span className="mt-0.5 block text-[0.62rem] font-medium uppercase tracking-[0.2em] text-muted">
            Australia
          </span>
        )}
      </span>
    </span>
  );
}

export const LOGO_TITLE = SITE_NAME;
