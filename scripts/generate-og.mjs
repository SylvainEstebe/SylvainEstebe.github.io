/**
 * Generates public/og-default.jpg — the 1200×630 social-share card.
 *
 * Run:  npm run og
 *
 * Pure SVG rendered to JPG via sharp (already a dependency of Astro).
 * No design tool, no font install required. Edit NAME / TAGLINE below.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const NAME = 'Sylvain Estebe';
const TAGLINE = 'Computational cognitive science · cultural evolution';
const SITE = 'sylvainestebe.github.io';

// Palette — matches the site's light theme.
const BG = '#fbf6ec';
const ACCENT = '#39468a';
const FG = '#15151a';
const MUTED = '#5d5749';
const RULE = '#e2d9c6';

const W = 1200;
const H = 630;

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <!-- inner frame -->
  <rect x="40" y="40" width="${W - 80}" height="${H - 80}" fill="none" stroke="${RULE}" stroke-width="2"/>
  <!-- ornament -->
  <text x="100" y="150" font-family="Georgia, 'Times New Roman', serif" font-size="40" fill="${MUTED}">※</text>
  <!-- name -->
  <text x="100" y="320" font-family="Georgia, 'Times New Roman', serif" font-size="92" font-weight="600" fill="${ACCENT}" letter-spacing="-2">${NAME}</text>
  <!-- tagline -->
  <text x="104" y="385" font-family="Helvetica, Arial, sans-serif" font-size="32" fill="${MUTED}">${TAGLINE}</text>
  <!-- site url, bottom-left -->
  <text x="104" y="548" font-family="Helvetica, Arial, sans-serif" font-size="24" fill="${ACCENT}" letter-spacing="1">${SITE}</text>
</svg>`;

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(here, '..', 'public', 'og-default.jpg');

await sharp(Buffer.from(svg))
  .jpeg({ quality: 90 })
  .toFile(out);

console.log('✓ Wrote', path.relative(process.cwd(), out));
