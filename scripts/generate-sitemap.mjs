import { writeFileSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://masabfarooque.com';
const BUILD_DATE = new Date().toISOString().split('T')[0];

const routes = [
  { path: '/', changefreq: 'monthly', priority: '1.0' },
  { path: '/portfolio', changefreq: 'weekly', priority: '0.9' },
  { path: '/about-masab', changefreq: 'monthly', priority: '0.9' },
  { path: '/contact', changefreq: 'yearly', priority: '0.7' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
];

// Case study routes are read straight out of the data file so the sitemap can
// never drift from the projects that actually exist.
const projectsSource = readFileSync(resolve(root, 'app', 'data', 'projects.ts'), 'utf8');
const slugs = [...projectsSource.matchAll(/^\s{4}slug:\s*'([^']+)'/gm)].map((m) => m[1]);

slugs.forEach((slug) => {
  routes.push({ path: `/portfolio/${slug}`, changefreq: 'monthly', priority: '0.8' });
});

const urlEntries = routes
  .map(
    ({ path, changefreq, priority }) => `  <url>
    <loc>${BASE}${path}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

writeFileSync(resolve(root, 'public', 'sitemap.xml'), xml, 'utf-8');
console.log(`sitemap written to public/sitemap.xml with ${routes.length} URLs (${BUILD_DATE})`);
