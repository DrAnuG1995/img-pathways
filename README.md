# IMG Pathways Australia

An independent, **evidence-backed** resource that helps International Medical Graduates (IMGs) find their pathway to practising medicine in Australia. Every key fact is cited to an official source (AHPRA / Medical Board, the AMC, specialist colleges, Home Affairs, Services Australia, Dept of Health) and carries a **"last verified"** date.

Standalone, neutral brand. Lightly attributed to StatDoctor.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind 3 · Framer Motion · Vitest · deploys on Vercel. No database for content — content is static JSON, lead capture posts to Notion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (prerenders all pages)
npm start        # serve the build
npm test         # Vitest: finder engine + content integrity
npx tsc --noEmit # type-check
```

## How it works

### Evidence-backed content
- **`content/sources.json`** + **`content/sources-extra.json`** + **`content/sources-colleges.json`** — a central registry of official sources keyed by id, each with a `lastVerified` date. Merged in `lib/content/sources.ts`.
- **`content/{pathways,colleges,topics}/*.json`** + `content/glossary.json` — page content. Body prose is markdown; **claims and sources are structured**. Inline citations are written as `[[cite:claim-id]]` and render as numbered footnote chips linking to the per-page "Sources & last verified" block.
- **`lib/content/content.test.ts`** enforces it: every claim has ≥1 resolvable source, every `[[cite:...]]` marker matches a claim, dates parse. If a citation is missing, the test fails.
- **`/sources`** shows the whole registry grouped by authority; stale sources (> 180 days) flag amber.

To add/update a page: drop or edit a JSON file in `content/<collection>/`, add any new sources to `content/sources-extra.json` (or `sources-colleges.json`), bump `pageLastVerified`, run `npm test`, rebuild.

### Pathway finder (the front door)
- **`lib/finder/*`** — a pure, unit-tested decision engine. `questions.ts` is the survey (data-driven with branching), `engine.ts` routes answers to one of four outcomes, `outcomes.ts` holds the cited results. `engine.test.ts` covers every branch.
- **`components/finder/*`** — the wizard UI (`useFinder` hook + Framer Motion steps + result card). After the result, an **optional** lead form posts to `/api/lead`.

### Lead capture
`app/api/lead/route.ts` writes submissions to a Notion database. See `.env.example` for `NOTION_TOKEN` + `NOTION_LEADS_DB_ID`. Without those env vars it logs and accepts (no hard failure in dev).

## Compliance
- General information only — not medical, legal or migration advice. Footer carries a standing disclaimer; `/visas` and `/medicare` use a stronger migration guardrail (see a registered MARA agent).
- No clinical testimonials; no guaranteed outcomes. Sourcing + dating is structural.

## Deploy
1. Push to a new GitHub repo, import to a new Vercel project (root = repo root).
2. Set `NEXT_PUBLIC_SITE_URL`, `NOTION_TOKEN`, `NOTION_LEADS_DB_ID` in Vercel.
3. Point the domain. Update `SITE_URL`/`SITE_NAME` in `lib/site.ts` if the brand name changes.

## Open items
- Brand name + domain (placeholder `imgpathways.au` in `lib/site.ts`).
- More college profiles (RANZCP, RANZCOG, ANZCA, RANZCR, RCPA, …) — same pattern as the four under `content/colleges/`.
- Checklists collection (`content/checklists/`, schemaType `HowTo`) — wired but not yet populated.
- Re-verify official deep-links periodically; some government pages block automated fetch and were confirmed via search.
