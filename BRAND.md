# IMG Pathways Australia, brand guidelines

Version 1.0. Last updated 15 June 2026.

These guidelines keep the site, the logo and the writing consistent. If you add a
page, a graphic or a piece of copy, it should look and read like it belongs here.

---

## 1. What the brand is

**IMG Pathways Australia** is an independent, evidence-backed guide that helps
International Medical Graduates find their route to practising medicine in
Australia.

**Positioning:** a trustworthy public resource, not a sales site. It is lightly
supported by StatDoctor, but it reads as a neutral reference first.

**The promise:** every key fact is cited to an official source (AHPRA, the AMC,
the specialist colleges, the Department of Home Affairs, Services Australia) and
carries the date it was last verified.

**Audience:** overseas-trained doctors deciding how to get registered, plus the
people advising them. They are intelligent, time-poor and wary of vague or
out-of-date information.

---

## 2. Voice and tone

Calm, plain, specific. A knowledgeable peer who explains the system clearly and
never oversells.

**Do**
- Write in plain English. Short sentences. Define the acronym the first time you
  use it (for example, "Workplace-Based Assessment (WBA)").
- Lead with what is true and useful. Cite the source.
- Be concrete: name the exam, the body, the timeframe, the cost.
- Use sentence case for headings and buttons.
- Use Australian English spelling (recognise, enrol, specialise, programme is
  "program").

**Do not**
- **Never use em dashes or en dashes ( the long dashes ).** They read as
  machine-written. Use a comma, a colon, a full stop, or split the sentence.
  For number and date ranges use the word "to" or a plain hyphen (for example,
  "MM1 to MM7", "2025-26").
- No hype, no fear, no urgency tactics.
- No exclamation marks in body copy.
- No Title Case headings, no ALL CAPS except short labels and the wordmark
  descender.

### Compliance, non-negotiable

This is health and migration information, so the AHPRA advertising rules and
migration-advice rules apply.

- **General information only, not advice.** Say so. Point readers to the official
  source for decisions.
- **Migration content** must signpost a registered migration agent (MARA) and the
  Department of Home Affairs. Never give personalised migration advice.
- **No clinical testimonials.** No patient stories, no "success" claims about an
  individual's registration outcome.
- **No guarantees.** Never promise an outcome, a timeframe or a result.
- **Every number is sourced and dated.** If you cannot cite it, do not state it.

---

## 3. Logo

### The mark
A rounded-square badge with a gradient from `#2470A8` to `#17486E`, a white
medical cross, and a teal accent node (`#2A9D8F`) in the lower right. The cross
signals medicine; the node signals a destination on a route.

### The lockup
The mark sits to the left of the wordmark. The wordmark is "IMG Pathways" in the
display serif over a smaller, letter-spaced "AUSTRALIA" descender. Use the full
lockup wherever there is room; use the mark alone in tight spaces (favicon, app
icon, social avatar).

### Clear space
Keep clear space of at least half the mark's height on all sides. Nothing else
sits inside that zone.

### Minimum size
Mark: 20 px (digital). Lockup: 120 px wide (digital). Below that, use the mark
alone.

### Do
- Use the mark on white, on the paper background, or on the primary blue.
- Keep the gradient and the teal node intact.

### Do not
- Do not recolour the cross or the badge outside the approved set.
- Do not stretch, rotate, add a shadow, or place the lockup on a busy photo.
- Do not rebuild the wordmark in a different typeface.

### Files
- `app/icon.svg`, the favicon and tab icon.
- `components/brand/Logo.tsx`, `LogoMark` (mark only) and `Logo` (full lockup,
  `compact` drops the "AUSTRALIA" descender).

---

## 4. Colour

| Token | Hex | Role |
| --- | --- | --- |
| Primary | `#1F5C8C` | Brand blue. Buttons, links, active states, icons. |
| Primary deep | `#17486E` | Hover and pressed states, gradient end. |
| Primary soft | `#E6EEF5` | Tints, icon tiles, callout backgrounds. |
| Teal | `#2A9D8F` | "Verified" and positive states, logo node. |
| Teal soft | `#E4F2F0` | Verified backgrounds, feature tiles. |
| Amber | `#C77D2E` | Caution and "due for re-check" only. Never decorative. |
| Amber soft | `#F6ECDD` | Caution backgrounds. |
| Ink | `#15202B` | Primary text and dark surfaces. |
| Muted | `#5B6B7A` | Secondary text. |
| Line | `#E3E8EE` | Hairline borders and dividers. |
| Paper | `#FBFCFD` | Page background. |

**Rules**
- Blue carries the brand. Teal means verified or good. Amber means caution.
  Do not use amber as an accent or red for emphasis.
- Body text is ink on paper or white. Secondary text is muted.
- Keep contrast at WCAG AA or better. Text on a coloured chip uses the darkest
  shade of that colour family, never plain black.
- No lime, no electric blue. Those belong to StatDoctor, not to this site.

Tokens live in `tailwind.config.ts`.

---

## 5. Typography

- **Display:** Source Serif 4 (`--font-serif`). Headings and the wordmark. Weight
  600 for headings. Institutional and calm, not decorative.
- **Body and UI:** Inter (`--font-sans`). Paragraphs, labels, buttons, tables.
- **Mono:** system monospace, for code only.

**Usage**
- Page H1: display serif, 600.
- Section H2 and H3: display serif, 600.
- Body: Inter, 400, line-height about 1.75.
- Eyebrows and small labels: Inter, uppercase, letter-spaced, muted.
- Sentence case everywhere except the "AUSTRALIA" descender and short eyebrow
  labels.

Fonts load via `next/font` in `app/layout.tsx`.

---

## 6. Iconography

- Line icons only. Stroke 1.5 to 1.6 on a 24 px grid, round caps and joins,
  `fill="none"`, `stroke="currentColor"` so they inherit text colour.
- Sit icons in a rounded tile: primary-soft tile with primary icon for pathways,
  teal-soft tile with teal icon for trust and verified states.
- Keep them simple and literal. One idea per icon.

**Pathway icons** (`components/brand/Icons.tsx`)
- Standard: document with a check (exams).
- Competent Authority: globe (recognised countries).
- Specialist: medal (college recognition).
- Expedited Specialist: lightning bolt (fast track).

**Feature icons**
- Cited to the source: shield with a check.
- Dated, not stale: calendar with a check.
- Independent and free: sparkle.

Do not mix in a third-party icon set with a different weight or corner style.

---

## 7. Imagery

**Illustration first.** The brand uses custom SVG, not stock photography.
Reasons: photos of doctors or patients can read as clinical endorsements under
AHPRA rules, stock carries licensing overhead, and SVG stays sharp and loads
instantly on a static host.

- The hero uses an abstract "converging pathways to a destination" motif
  (`components/brand/HeroBackdrop.tsx`) in primary and teal at low opacity.
- Keep decorative graphics light and behind content. They support the copy, they
  do not compete with it.
- If a real photograph is ever needed (for example, a hospital or cityscape),
  use a royalty-free, clearly licensed image, keep it neutral, and never imply a
  clinical endorsement or a registration outcome.

---

## 8. UI conventions

- **Surfaces:** white cards on the paper background, hairline `line` borders,
  generous rounding (`rounded-2xl` for cards, `rounded-xl` for tiles).
- **Buttons:** primary is solid blue with white text, hover to primary deep.
  Secondary is a `line` border that turns primary on hover.
- **Citations:** key facts in body copy carry a numbered superscript chip that
  links to the per-page "Sources and last verified" block.
- **Last-verified badge:** teal when current, amber when older than 180 days.
  Never hide a stale date, flag it.
- **Disclaimer banners:** the migration variant appears on the visas and Medicare
  pages. The general disclaimer sits in the footer site-wide.

---

## 9. Naming

- Full name: **IMG Pathways Australia**. Short: **IMG Pathways**.
- The interactive tool is **the pathway finder** (or "the finder"), lower case.
- Capitalise the four pathway names as proper labels: Standard pathway,
  Competent Authority pathway, Specialist pathway, Expedited Specialist pathway.
- Attribution line: "Independently published. Supported by StatDoctor."

---

## 10. Quick checklist before publishing

- [ ] No em dashes or en dashes anywhere in the copy.
- [ ] Every key claim has a citation and a last-verified date.
- [ ] Sentence case headings and buttons, Australian spelling.
- [ ] General-information disclaimer present; migration pages signpost MARA.
- [ ] Colours, fonts and icons match the tokens above.
- [ ] No guarantees, no clinical testimonials, no fear or urgency.
