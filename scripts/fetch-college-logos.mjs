// Fetches each college's official logo and normalises it to public/colleges/<slug>.png.
// Source order (best first): the college site's apple-touch-icon (the high-res
// logo mark) parsed from its homepage, then a direct /apple-touch-icon.png, then
// Wikipedia's page image, then a >=64px favicon. If none yields a usable raster,
// a clean branded monogram tile is generated so nothing renders broken.
// Re-run: `node scripts/fetch-college-logos.mjs`. Uses sharp (devDependency).
import sharp from "sharp";
import { mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "..", "public", "colleges");
mkdirSync(OUT, { recursive: true });

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";

// slug -> { wiki, domain, abbr }
const COLLEGES = {
  racgp: { wiki: "Royal Australian College of General Practitioners", domain: "racgp.org.au", abbr: "RACGP" },
  acrrm: { wiki: "Australian College of Rural and Remote Medicine", domain: "acrrm.org.au", abbr: "ACRRM" },
  racp: { wiki: "Royal Australasian College of Physicians", domain: "racp.edu.au", abbr: "RACP" },
  racs: { wiki: "Royal Australasian College of Surgeons", domain: "surgeons.org", abbr: "RACS" },
  anzca: { wiki: "Australian and New Zealand College of Anaesthetists", domain: "anzca.edu.au", abbr: "ANZCA" },
  acem: { wiki: "Australasian College for Emergency Medicine", domain: "acem.org.au", abbr: "ACEM" },
  ranzcp: { wiki: "Royal Australian and New Zealand College of Psychiatrists", domain: "ranzcp.org", abbr: "RANZCP" },
  ranzcog: { wiki: "Royal Australian and New Zealand College of Obstetricians and Gynaecologists", domain: "ranzcog.edu.au", abbr: "RANZCOG" },
  ranzcr: { wiki: "Royal Australian and New Zealand College of Radiologists", domain: "ranzcr.com", abbr: "RANZCR" },
  rcpa: { wiki: "Royal College of Pathologists of Australasia", domain: "rcpa.edu.au", abbr: "RCPA" },
  ranzco: { wiki: "Royal Australian and New Zealand College of Ophthalmologists", domain: "ranzco.edu", abbr: "RANZCO" },
  acd: { wiki: "Australasian College of Dermatologists", domain: "dermcoll.edu.au", abbr: "ACD" },
  cicm: { wiki: "College of Intensive Care Medicine of Australia and New Zealand", domain: "cicm.org.au", abbr: "CICM" },
  racma: { wiki: "Royal Australasian College of Medical Administrators", domain: "racma.edu.au", abbr: "RACMA" },
  acsep: { wiki: "Australasian College of Sport and Exercise Physicians", domain: "acsep.org.au", abbr: "ACSEP" },
};

function get(url, opts = {}) {
  return fetch(url, {
    redirect: "follow",
    headers: { "User-Agent": UA, ...(opts.headers || {}) },
    signal: AbortSignal.timeout(15000),
  });
}
async function getText(url) {
  const r = await get(url);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.text();
}
async function getBuf(url) {
  const r = await get(url);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return Buffer.from(await r.arrayBuffer());
}
const sizeOf = (s) => {
  const m = /(\d+)x(\d+)/.exec(s || "");
  return m ? parseInt(m[1], 10) : 0;
};

// Pull apple-touch-icon / sized icon URLs out of homepage HTML, largest first.
function iconCandidates(html, baseUrl) {
  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0]);
  const apple = [];
  const icons = [];
  for (const tag of links) {
    const rel = (/rel=["']([^"']+)["']/i.exec(tag)?.[1] || "").toLowerCase();
    const href = /href=["']([^"']+)["']/i.exec(tag)?.[1];
    if (!href || !rel.includes("icon")) continue;
    let abs;
    try {
      abs = new URL(href, baseUrl).href;
    } catch {
      continue;
    }
    const sz = sizeOf(/sizes=["']([^"']+)["']/i.exec(tag)?.[1]);
    (rel.includes("apple-touch-icon") ? apple : icons).push({ abs, sz });
  }
  apple.sort((a, b) => b.sz - a.sz);
  icons.sort((a, b) => b.sz - a.sz);
  return [...apple, ...icons.filter((i) => i.sz >= 60), ...icons].map((i) => i.abs);
}

async function wikiThumb(title) {
  const url =
    "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages" +
    "&piprop=thumbnail&pithumbsize=400&redirects=1&titles=" +
    encodeURIComponent(title);
  const data = await (await get(url)).json();
  const pages = data?.query?.pages ?? {};
  for (const k of Object.keys(pages)) {
    const src = pages[k]?.thumbnail?.source;
    if (src) return src;
  }
  return null;
}

// Accept a buffer only if it is a raster image at least `min` px on its short side.
async function accept(buf, min = 60) {
  try {
    const m = await sharp(buf).metadata();
    const short = Math.min(m.width || 0, m.height || 0);
    return short >= min ? m : null;
  } catch {
    return null;
  }
}

function monogram(abbr) {
  const fs = abbr.length > 5 ? 30 : abbr.length > 4 ? 38 : 46;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="160" viewBox="0 0 320 160">
    <rect width="320" height="160" rx="20" fill="#1F5C8C"/>
    <text x="160" y="80" dominant-baseline="central" text-anchor="middle"
      font-family="Georgia, serif" font-weight="700" font-size="${fs}" fill="#ffffff">${abbr}</text>
  </svg>`;
  return Buffer.from(svg);
}

const results = [];
for (const [slug, { wiki, domain, abbr }] of Object.entries(COLLEGES)) {
  let buf = null,
    src = "";

  // 1) homepage apple-touch-icon / sized icon
  for (const base of [`https://${domain}`, `https://www.${domain}`]) {
    if (buf) break;
    try {
      const html = await getText(base);
      for (const cand of iconCandidates(html, base).slice(0, 6)) {
        try {
          const b = await getBuf(cand);
          if (await accept(b, 60)) {
            buf = b;
            src = "site-icon";
            break;
          }
        } catch {}
      }
    } catch {}
  }
  // 2) direct apple-touch-icon paths
  if (!buf) {
    for (const path of ["apple-touch-icon.png", "apple-touch-icon-precomposed.png"]) {
      try {
        const b = await getBuf(`https://${domain}/${path}`);
        if (await accept(b, 60)) {
          buf = b;
          src = "apple-touch";
          break;
        }
      } catch {}
    }
  }
  // 3) Wikipedia page image
  if (!buf) {
    try {
      const t = await wikiThumb(wiki);
      if (t) {
        const b = await getBuf(t);
        if (await accept(b, 60)) {
          buf = b;
          src = "wikipedia";
        }
      }
    } catch {}
  }
  // 4) decent favicon
  if (!buf) {
    try {
      const b = await getBuf(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
      if (await accept(b, 64)) {
        buf = b;
        src = "favicon";
      }
    } catch {}
  }
  // 5) monogram fallback
  if (!buf) {
    buf = monogram(abbr);
    src = "monogram";
  }

  const out = resolve(OUT, `${slug}.png`);
  const meta = await sharp(buf)
    .resize({ width: 320, height: 160, fit: "inside", withoutEnlargement: true })
    .png()
    .toFile(out);
  results.push(`${slug.padEnd(8)} ${src.padEnd(12)} ${meta.width}x${meta.height}`);
}
console.log(results.join("\n"));
