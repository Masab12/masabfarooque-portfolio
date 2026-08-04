/**
 * Converts every raster image in /public to WebP and caps its width.
 *
 *   node scripts/optimise-images.mjs
 *
 * Screenshots come out of a browser at retina size and weigh megabytes each,
 * which is the single biggest thing a portfolio can do to wreck its Largest
 * Contentful Paint. This rewrites them in place, removes the source file and
 * leaves the folder holding only what ships.
 */

import { readdir, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');

const MAX_WIDTH = 1400;
const QUALITY = 76;
const SKIP = new Set(['fonts']);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let converted = 0;
let savedBytes = 0;

for await (const file of walk(publicDir)) {
  const ext = path.extname(file).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;

  const target = file.replace(/\.(png|jpe?g)$/i, '.webp');
  const before = (await stat(file)).size;

  const image = sharp(file);
  const meta = await image.metadata();

  await image
    .resize({
      width: Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH),
      withoutEnlargement: true,
    })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(target);

  const after = (await stat(target)).size;
  await unlink(file);

  converted += 1;
  savedBytes += before - after;

  const rel = path.relative(publicDir, target);
  console.log(
    `${rel.padEnd(44)} ${(before / 1024).toFixed(0).padStart(6)} kB -> ${(after / 1024)
      .toFixed(0)
      .padStart(6)} kB`,
  );
}

console.log(
  `\n${converted} images converted to WebP, ${(savedBytes / 1024 / 1024).toFixed(2)} MB saved.`,
);
