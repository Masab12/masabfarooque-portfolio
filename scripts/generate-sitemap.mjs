import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const BASE = 'https://masabfarooque.com';
const BUILD_DATE = new Date().toISOString().split('T')[0];

const routes = [
  { path: '/',             changefreq: 'monthly', priority: '1.0' },
  { path: '/about-masab', changefreq: 'monthly', priority: '0.9' },
  { path: '/services',    changefreq: 'monthly', priority: '0.9' },
  { path: '/portfolio',   changefreq: 'weekly',  priority: '0.8' },
  { path: '/pricing',     changefreq: 'monthly', priority: '0.7' },
  { path: '/contact',     changefreq: 'yearly',  priority: '0.6' },
  { path: '/forge',       changefreq: 'monthly', priority: '0.8' },
];

const urlEntries = routes
  .map(
    ({ path, changefreq, priority }) => `  <url>
    <loc>${BASE}${path}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

const out = resolve(root, 'public', 'sitemap.xml');
writeFileSync(out, xml, 'utf-8');
console.log(`sitemap written → public/sitemap.xml (${routes.length} URLs, lastmod ${BUILD_DATE})`);
