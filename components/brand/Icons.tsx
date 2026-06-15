// Line icons, stroke uses currentColor so they inherit text colour. 24x24.

type IconProps = { className?: string; size?: number };

function Svg({ className, size = 24, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/** Standard pathway, exams (document + check). */
export function IconExam(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
      <path d="M13 3v4h4" />
      <path d="M9 13.5l2 2 4-4" />
    </Svg>
  );
}

/** Competent Authority, recognised countries (globe). */
export function IconGlobe(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.5 2.4 2.5 14.6 0 17-2.5-2.4-2.5-14.6 0-17z" />
    </Svg>
  );
}

/** Specialist, college recognition (verified medal). */
export function IconMedal(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M9.6 9l1.7 1.7L14.6 7.4" />
      <path d="M8.4 13.4 6.6 21l5.4-3 5.4 3-1.8-7.6" />
    </Svg>
  );
}

/** Expedited Specialist, fast-track (lightning). */
export function IconBolt(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
    </Svg>
  );
}

/** Cited to the source (shield-check). */
export function IconShieldCheck(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 3l7 3v5c0 4.6-3.1 7.7-7 9-3.9-1.3-7-4.4-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </Svg>
  );
}

/** Dated, not stale (calendar-check). */
export function IconCalendarCheck(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 9.5h16M8 3v4M16 3v4" />
      <path d="M9.5 14.5l1.8 1.8 3.5-3.6" />
    </Svg>
  );
}

/** Independent & free (sparkle). */
export function IconSparkle(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.4L12 17l-1.9-5.6L4.5 10l5.6-1.4z" />
    </Svg>
  );
}

const PATHWAY_ICONS: Record<string, (p: IconProps) => JSX.Element> = {
  standard: IconExam,
  "competent-authority": IconGlobe,
  specialist: IconMedal,
  "expedited-specialist": IconBolt,
};

/** Pick the icon for a pathway slug/key; falls back to the exam icon. */
export function PathwayIcon({ slug, ...p }: IconProps & { slug: string }) {
  const Cmp = PATHWAY_ICONS[slug] ?? IconExam;
  return <Cmp {...p} />;
}
