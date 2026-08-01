/**
 * Renders the Open Graph card with the real site fonts.
 *
 *   node scripts/gen-og.mjs
 *
 * A headless Chromium loads a small page that uses the same self hosted
 * Fraunces, Manrope and IBM Plex Mono files as the site, then a 1200 by 630
 * screenshot is written to public/og-image.webp. Doing it this way means the
 * share card can never drift away from the brand.
 */

import { writeFileSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fontDir = path.join(root, 'public', 'fonts');

const b64 = (file) => readFileSync(path.join(fontDir, file)).toString('base64');

const html = `<!doctype html>
<html><head><meta charset="utf-8"><style>
@font-face { font-family: Fraunces; src: url(data:font/woff2;base64,${b64('Fraunces-Variable.woff2')}) format('woff2-variations'); font-weight: 100 900; }
@font-face { font-family: Manrope; src: url(data:font/woff2;base64,${b64('Manrope-Variable.woff2')}) format('woff2-variations'); font-weight: 200 800; }
@font-face { font-family: PlexMono; src: url(data:font/woff2;base64,${b64('IBMPlexMono-500.woff2')}) format('woff2'); font-weight: 500; }

* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  width: 1200px; height: 630px; background: #0a0908; color: #f1ebe1;
  font-family: Manrope, sans-serif; position: relative; overflow: hidden;
}
.grid {
  position: absolute; inset: 0;
  background-image: linear-gradient(90deg, rgba(241,235,225,0.055) 1px, transparent 1px);
  background-size: 200px 100%;
}
.glow {
  position: absolute; right: -180px; top: -180px; width: 720px; height: 720px; border-radius: 50%;
  background: radial-gradient(circle, rgba(200,155,82,0.20), transparent 66%);
}
.frame { position: absolute; inset: 40px; border: 1px solid rgba(241,235,225,0.13); }
.pad { position: absolute; inset: 40px; padding: 62px 70px; display: flex; flex-direction: column; justify-content: space-between; }
.eyebrow { font-family: PlexMono, monospace; font-size: 17px; letter-spacing: 0.24em; text-transform: uppercase; color: #6f6759; }
h1 {
  font-family: Fraunces, serif; font-variation-settings: 'opsz' 144, 'SOFT' 18, 'WONK' 1;
  font-weight: 600; font-size: 128px; line-height: 0.85; letter-spacing: -0.028em; text-transform: uppercase;
}
.foil {
  background-image: linear-gradient(100deg, #8a6a32 0%, #e6c692 30%, #fff6e4 46%, #c89b52 64%, #8a6a32 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.wash { background-image: linear-gradient(178deg, #f1ebe1 8%, #8b8275 94%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.sub { margin-top: 30px; font-size: 25px; font-weight: 300; color: #a89f91; max-width: 720px; line-height: 1.5; }
.row { display: flex; align-items: flex-end; justify-content: space-between; }
.stats { display: flex; gap: 52px; }
.stat b { display: block; font-family: Fraunces, serif; font-size: 40px; font-weight: 600; color: #c89b52; }
.stat span { display: block; margin-top: 8px; font-family: PlexMono, monospace; font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase; color: #6f6759; }
</style></head>
<body>
  <div class="grid"></div>
  <div class="glow"></div>
  <div class="frame"></div>
  <div class="pad">
    <div class="row">
      <div class="eyebrow">Full Stack Engineer</div>
      <div class="eyebrow">Islamabad, UTC +5</div>
    </div>

    <div>
      <h1><span class="wash">Masab</span><br><span class="foil">Farooque</span></h1>
      <p class="sub">SaaS platforms, AI systems and data pipelines, built end to end.</p>
    </div>

    <div class="row">
      <div class="stats">
        <div class="stat"><b>195+</b><span>Orders</span></div>
        <div class="stat"><b>24</b><span>Countries</span></div>
        <div class="stat"><b>5.0</b><span>Rating</span></div>
      </div>
      <div class="eyebrow">masabfarooque.com</div>
    </div>
  </div>
</body></html>`;

const tmp = path.join(root, '.og-source.html');
writeFileSync(tmp, html, 'utf8');

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
await page.goto(`file://${tmp}`);
await page.waitForTimeout(600);
await page.screenshot({ path: path.join(root, 'public', 'og-image.webp'), type: 'webp', quality: 90 });
await browser.close();

console.log('og image written to public/og-image.webp');
