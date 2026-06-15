// Generates public/og.png (1200x630) for social sharing from an inline SVG.
// One-off / regenerate on brand changes: `node scripts/gen-og.mjs`.
// Uses sharp (devDependency). Text uses system fonts (Georgia, Helvetica) so it
// rasterises without the web fonts installed.
import sharp from "sharp";
import { mkdirSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "..", "public", "og.png");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1F5C8C"/>
      <stop offset="1" stop-color="#143F61"/>
    </linearGradient>
    <linearGradient id="badge" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2C79B0"/>
      <stop offset="1" stop-color="#17486E"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>

  <g stroke="#FFFFFF" stroke-width="2" fill="none" opacity="0.16" stroke-linecap="round">
    <path d="M-20 560 C 360 540, 720 460, 1140 150"/>
    <path d="M120 640 C 460 540, 800 520, 1140 150"/>
  </g>
  <g transform="translate(1140 150)" opacity="0.9">
    <circle r="40" fill="#FFFFFF" opacity="0.12"/>
    <path d="M0 -16V16M-16 0H16" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" opacity="0.5"/>
  </g>

  <g transform="translate(80 70)">
    <rect width="84" height="84" rx="20" fill="url(#badge)"/>
    <path d="M42 22V62M22 42H62" stroke="#FFFFFF" stroke-width="8.5" stroke-linecap="round"/>
    <circle cx="59" cy="59" r="6.2" fill="#2A9D8F"/>
  </g>
  <text x="184" y="112" font-family="Georgia, 'Times New Roman', serif" font-size="50" font-weight="700" fill="#FFFFFF">IMG Pathways</text>
  <text x="186" y="143" font-family="Helvetica, Arial, sans-serif" font-size="20" letter-spacing="6" fill="#BcdAEC" opacity="0.85">AUSTRALIA</text>

  <text x="80" y="320" font-family="Georgia, 'Times New Roman', serif" font-size="66" font-weight="700" fill="#FFFFFF">Find your pathway to practising</text>
  <text x="80" y="398" font-family="Georgia, 'Times New Roman', serif" font-size="66" font-weight="700" fill="#FFFFFF">medicine in Australia</text>

  <rect x="82" y="436" width="120" height="6" rx="3" fill="#2A9D8F"/>

  <text x="80" y="512" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#FFFFFF" opacity="0.92">Independent and evidence-backed. Every key fact cited to an official source.</text>
  <text x="80" y="560" font-family="Helvetica, Arial, sans-serif" font-size="25" fill="#9FD3CC">AHPRA · AMC · specialist colleges · Home Affairs</text>
</svg>`;

mkdirSync(dirname(OUT), { recursive: true });
await sharp(Buffer.from(svg), { density: 144 })
  .resize(1200, 630)
  .png()
  .toFile(OUT);
console.log("wrote", OUT);
