/**
 * Renders the Open Graph card with the real site fonts.
 *
 *   node scripts/gen-og.mjs
 *
 * A headless Chromium loads a small page that uses the same self hosted
 * Almarai and Instrument Serif files as the site, then a 1200 by 630
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
@font-face { font-family: Almarai; src: url(data:font/woff2;base64,${b64('Almarai-400.woff2')}) format('woff2'); font-weight: 400; }
@font-face { font-family: Almarai; src: url(data:font/woff2;base64,${b64('Almarai-700.woff2')}) format('woff2'); font-weight: 700; }
@font-face { font-family: Instrument; src: url(data:font/woff2;base64,${b64('InstrumentSerif-Italic.woff2')}) format('woff2'); font-weight: 400; font-style: italic; }


* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  width: 1200px; height: 630px; background: #000000; color: #f1ebe1;
  font-family: Almarai, sans-serif; position: relative; overflow: hidden;
}
.grid {
  position: absolute; inset: 0;
  background-image: linear-gradient(90deg, rgba(225,224,204,0.055) 1px, transparent 1px);
  background-size: 200px 100%;
}
.glow {
  position: absolute; right: -180px; top: -180px; width: 720px; height: 720px; border-radius: 50%;
  background: radial-gradient(circle, rgba(225,224,204,0.14), transparent 66%);
}
.frame { position: absolute; inset: 40px; border: 1px solid rgba(225,224,204,0.12); }
.pad { position: absolute; inset: 40px; padding: 62px 70px; display: flex; flex-direction: column; justify-content: space-between; }
.eyebrow { font-family: Almarai, sans-serif; font-size: 15px; letter-spacing: 0.2em; text-transform: uppercase; color: #6f6759; }
h1 {
  font-family: Almarai, sans-serif; font-weight: 400; font-size: 132px;
  line-height: 0.85; letter-spacing: -0.07em;
}
.foil {
  color: #e1e0cc;
}
.wash { color: #e1e0cc; }
.sub { margin-top: 30px; font-size: 25px; font-weight: 300; color: #a89f91; max-width: 720px; line-height: 1.5; }
.row { display: flex; align-items: flex-end; justify-content: space-between; }
.stats { display: flex; gap: 52px; }
.stat b { display: block; font-family: Almarai, sans-serif; font-size: 38px; font-weight: 700; color: #e1e0cc; }
.stat span { display: block; margin-top: 8px; font-family: Almarai, sans-serif; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: #6f6759; }
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
      <h1><span class="wash">Masab</span><span style="color:#e1e0cc">*</span></h1>
      <p class="sub" style="margin-top:18px"><span style="font-family:Instrument,serif;font-style:italic">a full stack engineer.</span> SaaS platforms, AI systems and data pipelines.</p>
      
    </div>

    <div class="row">
      <div class="stats">
        <div class="stat"><b>195+</b><span>Orders</span></div>
        <div class="stat"><b>23</b><span>Countries</span></div>
        <div class="stat"><b>4.85</b><span>Rating</span></div>
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
