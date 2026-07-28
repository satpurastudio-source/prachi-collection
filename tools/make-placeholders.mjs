/**
 * Generates elegant placeholder artwork for every image slot on the site.
 *
 * These exist so the layout looks finished before real photography arrives.
 * To swap in a real photo: drop a .jpg with the SAME BASE NAME into
 * assets/images/ and update the `src` in index.html (or just overwrite the
 * .svg with a .jpg and change the extension). See assets/images/README.md.
 *
 *   node tools/make-placeholders.mjs
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "assets", "images");

const GOLD = "#C8A24A";
const GOLD_SOFT = "#E4CE93";

/** Per-collection colourways, kept in the same family as the site palette. */
const TONES = {
  bridal: { a: "#5A1220", b: "#2A0610", label: "Bridal" },
  men: { a: "#1D2B2A", b: "#0C1413", label: "Menswear" },
  party: { a: "#6B2340", b: "#2A0C1A", label: "Party" },
  siders: { a: "#38294A", b: "#150E1E", label: "Siders" },
  jewellery: { a: "#4A3410", b: "#1C1305", label: "Jewellery" },
  house: { a: "#3B0A14", b: "#140409", label: "Prachi" },
};

/**
 * A mihrab-style arch with a rosette inside it — the ornament used as the
 * visual anchor of every placeholder.
 */
function ornament(cx, cy, scale) {
  const petals = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const x1 = cx + Math.cos(angle) * 16 * scale;
    const y1 = cy + Math.sin(angle) * 16 * scale;
    const x2 = cx + Math.cos(angle) * 34 * scale;
    const y2 = cy + Math.sin(angle) * 34 * scale;
    return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" />`;
  }).join("");

  return `
  <g stroke="${GOLD}" fill="none" stroke-width="${(1.4 * scale).toFixed(2)}" opacity="0.85">
    <path d="M ${cx - 46 * scale} ${cy + 96 * scale}
             L ${cx - 46 * scale} ${cy - 18 * scale}
             A ${46 * scale} ${46 * scale} 0 0 1 ${cx + 46 * scale} ${cy - 18 * scale}
             L ${cx + 46 * scale} ${cy + 96 * scale} Z" opacity="0.55" />
    <circle cx="${cx}" cy="${cy}" r="${38 * scale}" opacity="0.7" />
    <circle cx="${cx}" cy="${cy}" r="${13 * scale}" opacity="0.9" />
    <g opacity="0.5" stroke-width="${(0.9 * scale).toFixed(2)}">${petals}</g>
  </g>`;
}

function svg({ w, h, tone, label, index, plain }) {
  const t = TONES[tone] ?? TONES.house;
  const id = `${tone}${index ?? ""}`;
  const scale = Math.min(w, h) / 420;
  const cx = w / 2;
  const cy = h * 0.44;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="bg-${id}" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0%" stop-color="${t.a}" />
      <stop offset="100%" stop-color="${t.b}" />
    </linearGradient>
    <radialGradient id="glow-${id}" cx="50%" cy="40%" r="62%">
      <stop offset="0%" stop-color="${GOLD_SOFT}" stop-opacity="0.20" />
      <stop offset="100%" stop-color="${GOLD_SOFT}" stop-opacity="0" />
    </radialGradient>
    <pattern id="jaali-${id}" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="26" height="26" fill="none" />
      <rect x="9" y="9" width="8" height="8" fill="none" stroke="${GOLD}" stroke-width="0.7" opacity="0.16" />
    </pattern>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#bg-${id})" />
  <rect width="${w}" height="${h}" fill="url(#jaali-${id})" />
  <rect width="${w}" height="${h}" fill="url(#glow-${id})" />

  ${ornament(cx, cy, scale)}

  <rect x="14" y="14" width="${w - 28}" height="${h - 28}" fill="none" stroke="${GOLD}" stroke-width="1" opacity="0.28" />
${plain ? "" : `
  <text x="${cx}" y="${h - h * 0.13}" fill="${GOLD_SOFT}" opacity="0.78"
        font-family="Georgia, 'Times New Roman', serif" font-size="${Math.max(13, Math.round(w * 0.055))}"
        letter-spacing="${Math.max(2, w * 0.012).toFixed(1)}" text-anchor="middle">${t.label.toUpperCase()}</text>
  <text x="${cx}" y="${h - h * 0.075}" fill="${GOLD}" opacity="0.45"
        font-family="Helvetica, Arial, sans-serif" font-size="${Math.max(8, Math.round(w * 0.026))}"
        letter-spacing="${Math.max(2, w * 0.01).toFixed(1)}" text-anchor="middle">PRACHI BRIDAL HUB</text>`}
</svg>
`;
}

/** name -> spec. Portrait 3:4 unless stated; these match the CSS aspect boxes. */
const FILES = {
  "hero-portrait": { w: 720, h: 960, tone: "bridal", label: "Bridal lehenga" },
  "story-01": { w: 720, h: 900, tone: "house", label: "Inside the store" },
  "story-02": { w: 640, h: 640, tone: "jewellery", label: "Wedding jewellery" },
  "rent-01": { w: 900, h: 675, tone: "party", label: "Rental rack" },
  // Sits behind text, so no baked-in caption.
  "groom-01": { w: 1440, h: 810, tone: "men", label: "Groom wear", plain: true },

  "col-bridal": { w: 600, h: 800, tone: "bridal", label: "Bridal wear" },
  "col-men": { w: 600, h: 800, tone: "men", label: "Men's wear" },
  "col-party": { w: 600, h: 800, tone: "party", label: "Party wear" },
  "col-siders": { w: 600, h: 800, tone: "siders", label: "Siders" },
  "col-jewellery": { w: 600, h: 800, tone: "jewellery", label: "Jewellery" },
};

// Lookbook tiles.
const LOOKBOOK = { bridal: 6, men: 4, party: 4, siders: 3, jewellery: 3 };
for (const [tone, count] of Object.entries(LOOKBOOK)) {
  for (let i = 1; i <= count; i += 1) {
    FILES[`${tone}-${String(i).padStart(2, "0")}`] = {
      w: 600,
      h: 800,
      tone,
      index: i,
      label: `${TONES[tone].label} look ${i}`,
      // The grid captions these itself — a baked-in label would double up.
      plain: true,
    };
  }
}

mkdirSync(OUT, { recursive: true });
for (const [name, spec] of Object.entries(FILES)) {
  writeFileSync(resolve(OUT, `${name}.svg`), svg(spec));
}
console.log(`Wrote ${Object.keys(FILES).length} placeholders to assets/images/`);
