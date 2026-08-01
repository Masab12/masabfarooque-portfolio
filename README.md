# masabfarooque.com

Portfolio of Masab Farooque, full stack engineer. Next.js 16 App Router,
TypeScript, Tailwind, GSAP and Lenis. Dark only, single brass accent, no icon
library anywhere in the project.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build, also regenerates the sitemap
npm run lint
```

## Structure

```
app/
  data/            content lives here, nothing is hardcoded in components
  components/
    core/          layout, motion primitives, nav, footer
    home/          homepage sections
    work/          project index
    about/         timeline and FAQ
    contact/       contact form
    marks/         every SVG glyph on the site, drawn by hand
  lib/             font loading and GSAP helpers
public/
  fonts/           self hosted Fraunces, Manrope and IBM Plex Mono
  projects/        case study imagery, WebP only
  CV/              downloadable CV, linked from the nav, about page and footer
scripts/
```

## Maintenance scripts

| Command | What it does |
| --- | --- |
| `node scripts/gen-reviews.mjs` | Rebuilds `app/data/reviews.ts` from the newest `public/fiverr_reviews_*.json` or `.csv` export |
| `node scripts/optimise-images.mjs` | Converts any PNG or JPEG in `/public` to WebP, caps width at 1800px and deletes the source |
| `node scripts/generate-sitemap.mjs` | Rewrites `public/sitemap.xml`, including one entry per case study. Runs automatically after `npm run build` |
| `node scripts/gen-og.mjs` | Regenerates `public/og-image.webp` using the real site fonts. Needs `npm i -D playwright` first |

### Updating the reviews

1. Run the Fiverr scraper and save the result as `public/fiverr_reviews_<date>.json`.
2. Delete the previous export so only one file matches the pattern.
3. `node scripts/gen-reviews.mjs`

The generator keeps one card per buyer per project, caps repeat buyers at two
entries, strips emoji and dashes out of the comments, and only shows reviews
from 2025 onward, which is where the engineering work starts. Tune the
constants at the top of the file to change any of that.

### Adding a project

Add an entry to `app/data/projects.ts`. The case study page, the work index,
the sitemap and the JSON-LD all read from that one array. Drop the imagery in
`public/projects` and run `node scripts/optimise-images.mjs`.

## Notes

- Images are pre-optimised, so `next.config.ts` sets `images.unoptimized`. The
  bytes in the repository are the bytes on the wire, and the build stays
  portable to a static host.
- Old routes (`/pricing`, `/services`, `/forge`) are 301 redirected in both
  `next.config.ts` and `public/.htaccess`, so nothing that was indexed 404s.
- `prefers-reduced-motion` disables Lenis, the cursor, the grain and every
  scroll animation.
