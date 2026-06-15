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

/** English requirements (speech bubble). */
export function IconLanguage(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 4h13a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H9l-4 4v-4H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
      <path d="M7 8h7M7 11h4" />
    </Svg>
  );
}

/** Registration types (ID card). */
export function IconIdCard(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="8" cy="11" r="2" />
      <path d="M13 10h5M13 13.5h5M5.5 15.5c.6-1.4 4.4-1.4 5 0" />
    </Svg>
  );
}

/** Visas and immigration (send / paper plane). */
export function IconPlane(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M21 3 10 14" />
      <path d="M21 3 14 21l-4-7-7-4z" />
    </Svg>
  );
}

/** Medicare (card with stripe). */
export function IconCard(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9.5h18M6.5 14.5h4" />
    </Svg>
  );
}

/** Where you can work (map pin). */
export function IconMapPin(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </Svg>
  );
}

/** Costs and timelines (dollar). */
export function IconDollar(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M14.6 9.3c-.6-.9-1.6-1.3-2.6-1.3-1.5 0-2.8.8-2.8 2.1 0 1.2 1.1 1.8 2.8 2 1.7.2 2.8.8 2.8 2.1 0 1.3-1.3 2.1-2.8 2.1-1.1 0-2.1-.4-2.7-1.3" />
    </Svg>
  );
}

/** First job, RMO recruitment (briefcase). */
export function IconBriefcase(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M3 12h18" />
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
