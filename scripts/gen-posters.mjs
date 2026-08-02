/**
 * Renders the video poster frames.
 *
 *   npm i -D playwright && node scripts/gen-posters.mjs
 *
 * The hero and feature cards play video. A poster is what a visitor sees
 * before the first frame decodes, on a slow connection, or if the video host
 * is unreachable, so it has to be dark enough that cream type still reads on
 * top of it. These are generated rather than sourced, which keeps them tiny
 * and guarantees the contrast.
 */

import { writeFileSync, unlinkSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const frame = (config) => `<!doctype html>
<html><head><meta charset="utf-8"><style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:${config.w}px; height:${config.h}px; background:#050505; position:relative; overflow:hidden; }
.haze { position:absolute; inset:0; background:${config.haze}; }
.beam {
  position:absolute; ${config.beam}
  filter: blur(90px);
}
.floor {
  position:absolute; inset:0;
  background: linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 62%, rgba(0,0,0,0.9) 100%);
}
.grain {
  position:absolute; inset:0; opacity:0.28; mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
}
.scan { position:absolute; inset:0; background:repeating-linear-gradient(180deg, rgba(255,255,255,0.014) 0 1px, transparent 1px 3px); }
</style></head>
<body>
  <div class="haze"></div>
  <div class="beam"></div>
  <div class="floor"></div>
  <div class="scan"></div>
  <div class="grain"></div>
</body></html>`;

const posters = [
  {
    name: 'hero-poster.webp',
    w: 1600,
    h: 900,
    haze: 'radial-gradient(120% 90% at 62% 22%, #232019 0%, #0e0d0b 46%, #030303 100%)',
    beam:
      'left:38%; top:-30%; width:60%; height:120%; background:radial-gradient(closest-side, rgba(225,224,204,0.16), transparent 72%);',
  },
  {
    name: 'feature-poster.webp',
    w: 900,
    h: 1200,
    haze: 'radial-gradient(110% 80% at 40% 74%, #1d1c17 0%, #0c0c0a 52%, #030303 100%)',
    beam:
      'left:-20%; top:34%; width:90%; height:80%; background:radial-gradient(closest-side, rgba(225,224,204,0.13), transparent 70%);',
  },
];

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
});

for (const poster of posters) {
  const file = path.join(root, `.poster-${poster.name}.html`);
  writeFileSync(file, frame(poster), 'utf8');

  const page = await browser.newPage({
    viewport: { width: poster.w, height: poster.h },
    deviceScaleFactor: 1,
  });
  await page.goto(`file://${file}`);
  await page.waitForTimeout(280);
  await page.screenshot({
    path: path.join(root, 'public', 'video', poster.name),
    type: 'webp',
    quality: 78,
  });
  await page.close();
  unlinkSync(file);
  console.log(`wrote public/video/${poster.name}`);
}

await browser.close();
