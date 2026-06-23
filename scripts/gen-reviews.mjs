import fs from 'node:fs';
import path from 'node:path';

const CSV = 'public/fiverr_reviews_17490123_20260621_152316.csv';

// Minimal RFC4180 parser (handles quoted fields, embedded commas/quotes/newlines)
function parseCSV(str) {
  const rows = [];
  let row = [];
  let cur = '';
  let q = false;
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (q) {
      if (c === '"') {
        if (str[i + 1] === '"') { cur += '"'; i++; }
        else q = false;
      } else cur += c;
    } else {
      if (c === '"') q = true;
      else if (c === ',') { row.push(cur); cur = ''; }
      else if (c === '\n') { row.push(cur); rows.push(row); row = []; cur = ''; }
      else if (c === '\r') { /* skip */ }
      else cur += c;
    }
  }
  if (cur.length || row.length) { row.push(cur); rows.push(row); }
  return rows;
}

// Country → [lng, lat] for map markers
const COORDS = {
  'United States': [-95.7129, 37.0902],
  'United Kingdom': [-3.436, 55.3781],
  'Canada': [-106.3468, 56.1304],
  'Australia': [133.7751, -25.2744],
  'Germany': [10.4515, 51.1657],
  'Netherlands': [5.2913, 52.1326],
  'France': [2.2137, 46.2276],
  'Spain': [-3.7492, 40.4637],
  'Italy': [12.5674, 41.8719],
  'Belgium': [4.4699, 50.5039],
  'Switzerland': [8.2275, 46.8182],
  'Austria': [14.5501, 47.5162],
  'Ireland': [-8.2439, 53.4129],
  'Sweden': [18.6435, 60.1282],
  'Norway': [8.4689, 60.472],
  'Denmark': [9.5018, 56.2639],
  'Finland': [25.7482, 61.9241],
  'Portugal': [-8.2245, 39.3999],
  'Poland': [19.1451, 51.9194],
  'Pakistan': [69.3451, 30.3753],
  'India': [78.9629, 20.5937],
  'United Arab Emirates': [53.8478, 23.4241],
  'Saudi Arabia': [45.0792, 23.8859],
  'Israel': [34.8516, 31.0461],
  'Singapore': [103.8198, 1.3521],
  'Japan': [138.2529, 36.2048],
  'Hong Kong': [114.1694, 22.3193],
  'New Zealand': [174.886, -40.9006],
  'Brazil': [-51.9253, -14.235],
  'Mexico': [-102.5528, 23.6345],
  'South Africa': [22.9375, -30.5595],
  'Turkey': [35.2433, 38.9637],
  'Greece': [21.8243, 39.0742],
  'Romania': [24.9668, 45.9432],
  'Czechia': [15.473, 49.8175],
  'Egypt': [30.8025, 26.8206],
  'Nigeria': [8.6753, 9.082],
  'Kenya': [37.9062, -0.0236],
  'Malaysia': [101.9758, 4.2105],
  'Indonesia': [113.9213, -0.7893],
  'Philippines': [121.774, 12.8797],
  'Thailand': [100.9925, 15.87],
  'Qatar': [51.1839, 25.3548],
  'Kuwait': [47.4818, 29.3117],
  'Hungary': [19.5033, 47.1625],
  'Ukraine': [31.1656, 48.3794],
  'Colombia': [-74.2973, 4.5709],
  'Argentina': [-63.6167, -38.4161],
  'Chile': [-71.5430, -35.6751],
  'Estonia': [25.0136, 58.5953],
  'China': [104.1954, 35.8617],
  'Maldives': [73.2207, 3.2028],
};

const raw = fs.readFileSync(CSV, 'utf8');
const rows = parseCSV(raw);
const head = rows[0].map((h) => h.replace(/^﻿/, '').trim());
const ix = Object.fromEntries(head.map((h, i) => [h, i]));
const data = rows.slice(1).filter((r) => r.length >= head.length - 3);

const get = (r, k) => (r[ix[k]] ?? '').trim();

const reviews = [];
const countryCount = {};

for (const r of data) {
  const comment = get(r, 'comment');
  const lang = get(r, 'comment_language');
  const rating = Number(get(r, 'value')) || 0;
  const cancelled = get(r, 'is_cancelled_order') === 'True';

  // Only genuine 5-star, non-cancelled, English reviews with a comment.
  if (!comment || lang !== 'en' || rating < 5 || cancelled) continue;

  const country = get(r, 'reviewer_country');
  if (country) countryCount[country] = (countryCount[country] || 0) + 1;

  reviews.push({
    id: get(r, 'id') || `${get(r, 'username')}-${reviews.length}`,
    name: get(r, 'username') || 'Client',
    country,
    countryCode: get(r, 'reviewer_country_code'),
    avatar: get(r, 'user_image_url'),
    rating: 5,
    date: (get(r, 'created_at') || '').slice(0, 10),
    repeat: get(r, 'repeat_buyer') === 'True',
    comment,
  });
}

// Newest first (latest → oldest).
reviews.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

const reviewCountries = Object.entries(countryCount)
  .filter(([c]) => COORDS[c])
  .map(([country, count]) => ({ country, count, coordinates: COORDS[country] }))
  .sort((a, b) => b.count - a.count);

const missing = Object.keys(countryCount).filter((c) => !COORDS[c]);

const out = `// AUTO-GENERATED from ${path.basename(CSV)} by scripts/gen-reviews.mjs
// Do not edit by hand. Re-run: node scripts/gen-reviews.mjs

export interface Review {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  avatar: string;
  rating: number;
  date: string;
  repeat: boolean;
  comment: string;
}

export interface ReviewCountry {
  country: string;
  count: number;
  coordinates: [number, number];
}

export const reviews: Review[] = ${JSON.stringify(reviews, null, 2)};

export const reviewCountries: ReviewCountry[] = ${JSON.stringify(reviewCountries, null, 2)};

export const totalReviews = ${reviews.length};
`;

fs.writeFileSync('app/data/reviews.ts', out);
console.log(`Wrote app/data/reviews.ts — ${reviews.length} English reviews, ${reviewCountries.length} mapped countries.`);
if (missing.length) console.log('Countries without coords (not on map):', missing.join(', '));
