import type { Config } from "tailwindcss";

// Neutral, institutional/clinical palette, deliberately distinct from the
// StatDoctor brand (no lime, no electric blue). Trust-blue primary, muted
// teal for "verified" states, amber for "due for re-check" cautions.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FBFCFD", // near-white page background
        ink: "#15202B", // primary text / dark surfaces
        primary: "#1F5C8C", // institutional trust blue
        "primary-deep": "#17486E", // hovers / pressed
        "primary-soft": "#E6EEF5", // tints, callout backgrounds
        teal: "#2A9D8F", // verified / positive accent
        "teal-soft": "#E4F2F0",
        amber: "#C77D2E", // caution / due-for-recheck
        "amber-soft": "#F6ECDD",
        line: "#E3E8EE", // hairline borders
        muted: "#5B6B7A", // secondary text
      },
      fontFamily: {
        display: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(.2,.8,.2,1)",
      },
      maxWidth: {
        prose: "44rem",
      },
    },
  },
  plugins: [],
};

export default config;
