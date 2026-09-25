# masabfarooque.com

Portfolio and inbound site of Masab Farooque, full stack engineer. Next.js 16
App Router, React 19, TypeScript and Tailwind CSS.

The site is drawn as a set of engineering sheets on paper: chalk ground,
carbon ink, one sage accent, cyan for vectors inside drawings and clay for the
one thing on a page that is live or wrong. Every page has a sheet number, and
the footer prints the index like the title block of a drawing set.

Type is Almarai for headings and body, Instrument Serif italic for one phrase
in a headline, and Fragment Mono for labels, dates and specs. All three are
served from this domain. No icon library is used anywhere; every mark is drawn
in `app/components/marks`.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build, then regenerates public/sitemap.xml
npm run lint
```

Pushing to `main` deploys. The host picks up the push and rebuilds; that
hookup lives in the hosting panel, not in this repository.

## How it is put together

```
app/
  data/            all content: projects, posts, services, reviews, systems
  components/
    scene/         the 3D system renderer (Canvas2D) and its React wrapper
    home/          homepage bands: live system, work stage, WordPress teardown,
                   service schedule, reviews, terminal, scroll rail
    motion/        Reveal and its observer, PipelineSteps, Tilt
    core/          masthead, footer, sheet strips, page and section headers
    blog/          article layout, prose, charts and one drawn cover per post
    work/          project index and the case study system view
    marks/         every glyph on the site
  og/[slug]/       social cards, generated at build for the site, every
                   article and every service
```

### The scenes

`app/components/scene/engine.ts` draws system diagrams in 3D with plain
Canvas2D: boxes, database drums and queue stacks on a drafting floor, pipes
routed along it and packets moving through them. It supports orbiting,
picking, traced requests, stacked layers and blending between two layouts.
Graphs are data in `app/data/systems.ts`, and every case study graph is drawn
from what that project's write up says it does.

A scene animates only while it is on screen and the tab is visible. With
reduced motion requested it draws one still, fully assembled frame.

### Scroll reveals

`Reveal` renders plain server markup with a `data-reveal` attribute. One
observer in the layout adds `is-in` as blocks arrive and CSS does the moving.
Nothing is hidden until that observer is running, and anything already on
screen when it starts is left alone, so the first screen and visitors without
JavaScript always see finished content.

## Maintenance scripts

| Command | What it does |
| --- | --- |
| `node scripts/gen-reviews.mjs` | Rebuilds `app/data/reviews.ts` from the newest `public/fiverr_reviews_*.json` or `.csv` export |
| `node scripts/optimise-images.mjs` | Converts PNG and JPEG in `/public` to WebP, caps width at 1800px and deletes the source |
| `node scripts/generate-sitemap.mjs` | Rewrites `public/sitemap.xml` from the data files. Runs after every build |

### Updating the reviews

1. Save the Fiverr export as `public/fiverr_reviews_<date>.json`.
2. Delete the previous export so only one file matches.
3. `node scripts/gen-reviews.mjs`

`reviews.ts` is generated. Edits to it are lost on the next run; change the
export or the constants in the script instead.

### Adding a project

Add an entry to `app/data/projects.ts`, drop its imagery in `public/projects`
and run `node scripts/optimise-images.mjs`. To give it an architecture view on
its case study page, add its graph to `projectSystems` in
`app/data/systems.ts`. The case study, the work index, the sitemap and the
JSON-LD all read from these files. `public/llms.txt` is written by hand and
needs its own line.

## Notes

- Images are pre-optimised, so `next.config.ts` sets `images.unoptimized`.
- HTML is served with `max-age=0, must-revalidate` and a one minute shared
  cache, so a deploy reaches visitors quickly.
- Old routes (`/pricing`, `/forge`, `/about`, `/work`, `/projects`) redirect
  permanently in `next.config.ts`.
