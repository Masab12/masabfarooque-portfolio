/**
 * Turns a Fiverr review export into a typed data file.
 *
 * Drop a fresh export into /public as either
 *   fiverr_reviews_*.json   (array of review objects, preferred)
 *   fiverr_reviews_*.csv    (flattened export)
 * then run:
 *   node scripts/gen-reviews.mjs
 *
 * It picks the newest export it can find, keeps one entry per buyer with
 * their most substantial words, and writes the SHOWCASE_COUNT most recent
 * five star reviews to app/data/reviews.ts.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const outFile = path.join(root, 'app', 'data', 'reviews.ts');

const SHOWCASE_COUNT = 28;
const MIN_COMMENT_LENGTH = 24;
/**
 * The Fiverr account goes back to 2015 and its early reviews are for writing
 * work, not engineering. Only the software era is shown.
 */
const SHOWCASE_SINCE = '2025-01-01';
/** Repeat buyers can appear twice, since those are separate projects. */
const MAX_PER_BUYER = 2;

/* ── Input ─────────────────────────────────────────────────────── */

function pickLatestExport() {
  const files = fs
    .readdirSync(publicDir)
    .filter((f) => /^fiverr_reviews_.*\.(json|csv)$/i.test(f))
    .sort();
  if (files.length === 0) return null;
  // A JSON export always wins over a CSV of the same vintage.
  const json = files.filter((f) => f.toLowerCase().endsWith('.json'));
  const pool = json.length > 0 ? json : files;
  return path.join(publicDir, pool[pool.length - 1]);
}

/** Minimal RFC 4180 parser. Handles quoted fields, embedded commas and newlines. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];

    if (quoted) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 1;
        } else {
          quoted = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') quoted = true;
    else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else if (char !== '\r') field += char;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

function readExport(file) {
  const raw = fs.readFileSync(file, 'utf8').replace(/^﻿/, '');

  if (file.toLowerCase().endsWith('.json')) {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : (parsed.reviews ?? []);
  }

  const rows = parseCsv(raw).filter((r) => r.length > 1);
  const header = rows.shift().map((h) => h.trim());
  return rows.map((r) => Object.fromEntries(header.map((key, i) => [key, r[i]])));
}

/* ── Cleaning ──────────────────────────────────────────────────── */

/**
 * Buyers paste stars, hearts and other pictographs into reviews. None of that
 * belongs in this design, so it is stripped along with odd whitespace and any
 * dash a buyer used as a sentence break.
 */
function cleanComment(value) {
  return String(value ?? '')
    .replace(/[\u{1F000}-\u{1FAFF}\u{2190}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{20E3}]/gu, '')
    .replace(/[   ]/g, ' ')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s*[—–]\s*/g, ', ')
    .replace(/\s+/g, ' ')
    .trim();
}

function titleCase(value) {
  return String(value).replace(/\b[a-z]/g, (c) => c.toUpperCase());
}

/** Fiverr sends a few countries under two names. */
const COUNTRY_ALIASES = {
  'The Netherlands': 'Netherlands',
  'United States of America': 'United States',
  'Great Britain': 'United Kingdom',
};

function normaliseCountry(value) {
  const name = String(value ?? '').trim();
  return COUNTRY_ALIASES[name] ?? name;
}

function truthy(value) {
  return value === true || value === 'True' || value === 'true';
}

/* ── Build ─────────────────────────────────────────────────────── */

const source = pickLatestExport();
if (!source) {
  console.error('No fiverr_reviews_* export found in /public. Nothing to generate.');
  process.exit(1);
}

const records = readExport(source)
  .map((r) => ({
    id: String(r.id ?? ''),
    name: String(r.username ?? '').trim(),
    country: normaliseCountry(r.reviewer_country),
    countryCode: String(r.reviewer_country_code ?? '').trim().toUpperCase(),
    rating: Number(r.value ?? 0),
    comment: cleanComment(r.comment),
    date: String(r.created_at ?? ''),
    avatar: String(r.user_image_url ?? '').trim(),
    price: String(r.order_price_range_usd ?? '').trim(),
    days: Number(r.order_duration_in_days ?? 0) || null,
    cancelled: truthy(r.is_cancelled_order),
    industry: Array.isArray(r.reviewer_industry)
      ? r.reviewer_industry.filter(Boolean).join(', ')
      : String(r.reviewer_industry ?? ''),
  }))
  .filter((r) => r.id && r.name && r.date && !r.cancelled);

const allCount = records.length;
const average = records.reduce((s, r) => s + r.rating, 0) / Math.max(records.length, 1);
const countries = new Set(records.map((r) => r.country).filter(Boolean));

// Orders per buyer. Repeat buyers are the strongest signal in the export, so
// the count is surfaced on the card rather than thrown away.
const orders = new Map();
records.forEach((r) => orders.set(r.name, (orders.get(r.name) ?? 0) + 1));
const repeatShare = [...orders.values()].filter((n) => n > 1).length / Math.max(orders.size, 1);

// Avatars are attached per buyer, since Fiverr only sends the photo on some
// rows even when the same person has left several reviews.
const avatarByBuyer = new Map();
records.forEach((r) => {
  if (r.avatar && !avatarByBuyer.has(r.name)) avatarByBuyer.set(r.name, r.avatar);
});

const eligible = records
  .filter(
    (r) =>
      r.rating >= 5 && r.comment.length >= MIN_COMMENT_LENGTH && r.date >= SHOWCASE_SINCE,
  )
  .sort((a, b) => (a.date < b.date ? 1 : -1));

// Each buyer contributes their fullest reviews, capped, then the whole set is
// laid out newest first.
const byBuyer = new Map();
eligible.forEach((r) => {
  const list = byBuyer.get(r.name) ?? [];
  list.push(r);
  byBuyer.set(r.name, list);
});

const showcase = [...byBuyer.values()]
  .flatMap((list) =>
    [...list].sort((a, b) => b.comment.length - a.comment.length).slice(0, MAX_PER_BUYER),
  )
  .sort((a, b) => (a.date < b.date ? 1 : -1))
  .slice(0, SHOWCASE_COUNT)
  .map((r) => ({
    id: r.id,
    name: r.name,
    country: r.country,
    countryCode: r.countryCode,
    rating: r.rating,
    comment: r.comment,
    date: r.date,
    avatar: r.avatar || avatarByBuyer.get(r.name) || null,
    price: r.price,
    days: r.days,
    orders: orders.get(r.name) ?? 1,
    industry: r.industry ? titleCase(r.industry) : null,
  }));

const newest = showcase[0]?.date?.slice(0, 10) ?? '';
const oldest = showcase[showcase.length - 1]?.date?.slice(0, 10) ?? '';

const file = `/**
 * Generated by scripts/gen-reviews.mjs. Do not edit by hand.
 * Source export: ${path.basename(source)}
 * ${showcase.length} buyers, most recent first, ${newest} back to ${oldest}.
 */

export interface Review {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string | null;
  price: string;
  days: number | null;
  /** How many orders this buyer has reviewed in total. */
  orders: number;
  industry: string | null;
}

export const reviewSummary = {
  total: ${allCount},
  average: ${average.toFixed(2)},
  countries: ${countries.size},
  repeatShare: ${Math.round(repeatShare * 100)},
  newest: '${newest}',
  profileUrl: 'https://www.fiverr.com/p_scribbles',
} as const;

export const reviews: Review[] = ${JSON.stringify(showcase, null, 2)};
`;

fs.writeFileSync(outFile, file, 'utf8');
console.log(
  `Wrote ${showcase.length} reviews to app/data/reviews.ts from ${path.basename(source)} ` +
    `(${allCount} reviews, ${orders.size} buyers, ${countries.size} countries).`,
);
