import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/app/data/site';
import { getPost } from '@/app/data/posts';
import ArticleLayout, { articleSchema } from '@/app/components/blog/ArticleLayout';
import {
  H2,
  H3,
  P,
  Lede,
  UL,
  Code,
  Note,
  Takeaways,
  Table,
  ReadNext,
  Resources,
} from '@/app/components/blog/Prose';

const post = getPost('yoast-metadata-to-nextjs')!;

export const metadata: Metadata = {
  title: post.title,
  description: post.summary,
  alternates: { canonical: `${site.url}/blog/${post.slug}` },
  keywords: [
    'Yoast SEO to Next.js',
    'migrate Yoast metadata',
    'Next.js Metadata API',
    'keep SEO after WordPress migration',
    'yoast_head_json',
  ],
  openGraph: {
    type: 'article',
    title: post.title,
    description: post.summary,
    url: `${site.url}/blog/${post.slug}`,
    publishedTime: post.published,
    authors: [site.url],
  },
};

export default function Page() {
  return (
    <>
      {articleSchema(post).map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <ArticleLayout post={post}>
        <Lede>
          Yoast data does not come with you. You have to carry it across yourself.
        </Lede>

        <P>
          Someone on your team spent years writing those titles. They rewrote meta descriptions
          after watching click through rates, set canonicals on the duplicate pages, and picked a
          share image for every post that mattered. All of that lives in your WordPress database,
          and none of it moves when you rebuild the front end in Next.js.
        </P>

        <P>
          Lose it and your rankings do not collapse on day one. They sag over a few weeks while you
          wonder what went wrong.
        </P>

        <Takeaways
          items={[
            'Yoast keeps everything in wp_postmeta under _yoast_wpseo_* keys. You can read it with SQL or over the REST API.',
            'The yoast_head_json field is the fastest route. It hands you the final resolved values, with variables already replaced.',
            'Map the values into the Next.js Metadata API rather than writing raw meta tags by hand.',
            'Rebuild the JSON-LD too. Yoast was emitting a schema graph you probably never looked at.',
            'Diff the old tags against the new ones before you switch DNS, page by page.',
          ]}
        />

        <H2 id="what-yoast-stores">What Yoast actually stores</H2>

        <P>
          Yoast writes per post values into <code>wp_postmeta</code>. Each row is keyed by post ID
          with a meta key that starts <code>_yoast_wpseo_</code>. Site wide defaults, like your
          title template and the separator character, live in the <code>wpseo_titles</code> option
          instead.
        </P>

        <Table
          head={['Meta key', 'What it holds', 'Where it goes in Next.js']}
          rows={[
            [<code key="a">_yoast_wpseo_title</code>, 'Page title, often with variables', 'title'],
            [<code key="b">_yoast_wpseo_metadesc</code>, 'Meta description', 'description'],
            [
              <code key="c">_yoast_wpseo_canonical</code>,
              'Canonical URL, set only when overridden',
              'alternates.canonical',
            ],
            [
              <code key="d">_yoast_wpseo_meta-robots-noindex</code>,
              '1 means noindex, 2 means index',
              'robots.index',
            ],
            [
              <code key="e">_yoast_wpseo_meta-robots-nofollow</code>,
              '1 means nofollow',
              'robots.follow',
            ],
            [
              <code key="f">_yoast_wpseo_opengraph-title</code>,
              'Share title, when it differs',
              'openGraph.title',
            ],
            [
              <code key="g">_yoast_wpseo_opengraph-image</code>,
              'Share image URL',
              'openGraph.images',
            ],
            [
              <code key="h">_yoast_wpseo_twitter-image</code>,
              'Twitter card image, when set separately',
              'twitter.images',
            ],
          ]}
          caption="The keys you will hit on almost every site. Yoast writes a row only when a value differs from the template, so most posts have fewer rows than you expect."
        />

        <P>
          That last point catches people. If a post has no <code>_yoast_wpseo_title</code> row, it
          is not missing a title. It is using your site wide template, which might read something
          like <code>%%title%% %%sep%% %%sitename%%</code>. Read the raw meta table alone and you
          will conclude half your site has no titles.
        </P>

        <H2 id="getting-it-out">Getting the data out</H2>

        <P>
          You have two routes. Query the database directly, or ask the REST API for the resolved
          output.
        </P>

        <H3>The direct query</H3>

        <P>
          SQL gives you the raw stored values. Use it when you want to audit what was overridden
          rather than what was rendered.
        </P>

        <Code filename="export-yoast.sql" lang="sql">{`-- Every Yoast override, one row per post
SELECT
  p.ID,
  p.post_name AS slug,
  p.post_type,
  MAX(CASE WHEN m.meta_key = '_yoast_wpseo_title'      THEN m.meta_value END) AS seo_title,
  MAX(CASE WHEN m.meta_key = '_yoast_wpseo_metadesc'   THEN m.meta_value END) AS seo_desc,
  MAX(CASE WHEN m.meta_key = '_yoast_wpseo_canonical'  THEN m.meta_value END) AS canonical,
  MAX(CASE WHEN m.meta_key = '_yoast_wpseo_meta-robots-noindex' THEN m.meta_value END) AS noindex
FROM wp_posts p
LEFT JOIN wp_postmeta m ON m.post_id = p.ID
WHERE p.post_status = 'publish'
  AND p.post_type IN ('post', 'page')
GROUP BY p.ID, p.post_name, p.post_type
ORDER BY p.post_type, p.post_name;`}</Code>

        <H3>The REST route, which is usually better</H3>

        <P>
          Since version 14, Yoast adds two fields to REST responses. <code>yoast_head</code> gives
          you a rendered HTML string. <code>yoast_head_json</code> gives you the same thing as a
          structured object, with every replacement variable already resolved and every site wide
          default already applied.
        </P>

        <P>
          Use the JSON one. It saves you from reimplementing Yoast's template logic, which is
          harder than it looks and not worth your time.
        </P>

        <Code filename="terminal" lang="bash">{`# Pull the resolved SEO block for every published post
curl "https://cms.example.com/wp-json/wp/v2/posts?per_page=100&_fields=slug,yoast_head_json"

# Look at one post first, so you know the shape you are mapping
curl "https://cms.example.com/wp-json/wp/v2/posts?slug=my-post&_fields=yoast_head_json" | jq`}</Code>

        <Code filename="response, trimmed" lang="json">{`{
  "yoast_head_json": {
    "title": "How we cut load time in half | Example Co",
    "description": "A short account of the work, the numbers, and what we would do differently.",
    "robots": { "index": "index", "follow": "follow" },
    "canonical": "https://example.com/blog/cut-load-time",
    "og_title": "How we cut load time in half",
    "og_description": "A short account of the work and the numbers.",
    "og_image": [{ "url": "https://example.com/uploads/cover.jpg", "width": 1200, "height": 630 }],
    "twitter_card": "summary_large_image",
    "schema": { "@context": "https://schema.org", "@graph": [] }
  }
}`}</Code>

        <Note title="Do this before you touch the front end">
          <P>
            Export the whole set to a JSON file and commit it. You now have a snapshot of your SEO
            state on the day you started, which you can diff against later. If a title goes missing
            three months from now, you will know whether the migration dropped it or somebody
            edited it afterwards.
          </P>
        </Note>

        <H2 id="titles-and-descriptions">Titles and descriptions</H2>

        <P>
          Next.js handles titles through the Metadata API. Set a template once in your root layout
          and each page fills in its own part.
        </P>

        <Code filename="app/layout.tsx" lang="typescript">{`export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    // Matches the old Yoast pattern: %%title%% %%sep%% %%sitename%%
    default: 'Example Co',
    template: '%s | Example Co',
  },
};`}</Code>

        <P>
          For a page pulling from WordPress, resolve the metadata at build time. The important part
          is the fallback chain: use the Yoast override when it exists, fall back to the post title
          when it does not.
        </P>

        <Code filename="app/blog/[slug]/page.tsx" lang="typescript">{`import type { Metadata } from 'next';
import { getPostBySlug } from '@/lib/wp';

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Not found' };

  const seo = post.yoast_head_json ?? {};
  const url = 'https://example.com/blog/' + slug;

  // Yoast writes the full title including the site name. The layout template
  // would append it a second time, so strip the suffix before using it.
  const rawTitle = seo.title ?? post.title.rendered;
  const title = rawTitle.replace(/ \\| Example Co$/, '');

  return {
    title,
    description: seo.description ?? stripTags(post.excerpt.rendered),
    alternates: { canonical: seo.canonical ?? url },
    robots: {
      index: seo.robots?.index !== 'noindex',
      follow: seo.robots?.follow !== 'nofollow',
    },
  };
}`}</Code>

        <P>
          That title suffix problem bites nearly everyone. Yoast stores the finished string with the
          site name baked in. Your Next.js template adds it again. You end up with
          <code> Post name | Example Co | Example Co</code> across the whole site, and nobody
          notices until a client screenshots a search result.
        </P>

        <H2 id="canonicals-and-robots">Canonicals and robots rules</H2>

        <P>
          Canonicals need care. Yoast writes an absolute URL, and that URL points at your old
          domain structure. Copy it across unchanged and you tell Google your new pages are copies
          of pages that no longer exist.
        </P>

        <P>Rewrite the host, keep the path:</P>

        <Code filename="lib/seo.ts" lang="typescript">{`const OLD_HOST = 'https://old.example.com';
const NEW_HOST = 'https://example.com';

/**
 * Yoast canonicals are absolute and point at the WordPress install. Move the
 * host across but keep the path, so a genuine cross page canonical still
 * resolves to the right target on the new site.
 */
export function rewriteCanonical(canonical: string | undefined, fallback: string) {
  if (!canonical) return fallback;
  if (canonical.startsWith(OLD_HOST)) {
    return NEW_HOST + new URL(canonical).pathname;
  }
  // Points somewhere else entirely, so it was deliberate. Leave it alone.
  return canonical;
}`}</Code>

        <P>
          Robots rules are simpler but easy to invert. Yoast stores <code>1</code> for noindex and
          <code> 2</code> for index in the raw meta, which reads backwards if you assume 1 means
          true. The JSON field avoids this by giving you the words <code>index</code> and
          <code> noindex</code> directly. Use the JSON field.
        </P>

        <Note title="Check your noindex pages before you drop them">
          <P>
            Run through every page Yoast marked noindex and ask whether it should exist at all on
            the new site. Tag archives, author pages and thin category pages usually got that flag
            for a reason. A migration is a good moment to delete them rather than rebuild them.
          </P>
        </Note>

        <H2 id="social-cards">Open Graph and social cards</H2>

        <P>
          Yoast falls back through a chain for share images: the explicit Open Graph image, then the
          featured image, then a site wide default. Reproduce that chain or half your posts will
          share with a blank card.
        </P>

        <Code filename="lib/seo.ts" lang="typescript">{`type OgImage = { url: string; width?: number; height?: number };

export function shareImage(seo: YoastHead, post: WpPost): OgImage {
  // 1. Explicit Open Graph image set in the Yoast panel
  const explicit = seo.og_image?.[0];
  if (explicit?.url) return explicit;

  // 2. Featured image on the post
  const featured = post._embedded?.['wp:featuredmedia']?.[0];
  if (featured?.source_url) {
    return {
      url: featured.source_url,
      width: featured.media_details?.width,
      height: featured.media_details?.height,
    };
  }

  // 3. Site default, so nothing ever shares without a card
  return { url: 'https://example.com/og-default.webp', width: 1200, height: 630 };
}`}</Code>

        <Code filename="app/blog/[slug]/page.tsx" lang="typescript">{`  const image = shareImage(seo, post);

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title: seo.og_title ?? title,
      description: seo.og_description ?? description,
      url,
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: [image],
    },
    twitter: {
      card: seo.twitter_card ?? 'summary_large_image',
      images: [image.url],
    },
  };`}</Code>

        <H2 id="schema">The schema Yoast was emitting</H2>

        <P>
          This is the part that gets forgotten. Yoast builds a JSON-LD graph on every page,
          connecting the article to its author, the site, the organisation and the breadcrumb
          trail. It sits in your source and you have probably never read it.
        </P>

        <P>
          Delete it and you lose your breadcrumb display in search results, plus whatever author and
          organisation signals Google had been reading for years.
        </P>

        <P>
          You can copy Yoast's graph across from <code>yoast_head_json.schema</code>. I would not.
          It carries WordPress specific node IDs and references to pages that will not exist after
          the move. Write a clean version instead. It takes twenty minutes and you end up
          understanding your own markup.
        </P>

        <Code filename="app/blog/[slug]/page.tsx" lang="typescript">{`function schema(post: WpPost, url: string, description: string) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title.rendered,
      description,
      url,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      datePublished: post.date,
      dateModified: post.modified,
      author: { '@type': 'Person', name: 'Author Name', url: 'https://example.com/about' },
      publisher: { '@type': 'Organization', name: 'Example Co' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://example.com' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://example.com/blog' },
        { '@type': 'ListItem', position: 3, name: post.title.rendered, item: url },
      ],
    },
  ];
}`}</Code>

        <P>
          Render each object in its own script tag. Google reads several blocks on one page without
          complaint, and keeping them separate makes each one easier to validate.
        </P>

        <H2 id="verify">Checking nothing dropped</H2>

        <P>
          Do not eyeball this. Write a script that fetches both versions of every URL and compares
          the tags that matter.
        </P>

        <Code filename="scripts/diff-meta.mjs" lang="javascript">{`import { writeFileSync } from 'node:fs';

const OLD = 'https://old.example.com';
const NEW = 'https://staging.example.com';
const paths = JSON.parse(await (await fetch(OLD + '/wp-json/wp/v2/posts?per_page=100&_fields=link'))
  .text())
  .map((p) => new URL(p.link).pathname);

const pick = (html) => ({
  title: html.match(/<title[^>]*>([^<]*)<\\/title>/i)?.[1]?.trim(),
  description: html.match(/<meta name="description" content="([^"]*)"/i)?.[1],
  canonical: html.match(/<link rel="canonical" href="([^"]*)"/i)?.[1],
  ogImage: html.match(/<meta property="og:image" content="([^"]*)"/i)?.[1],
  robots: html.match(/<meta name="robots" content="([^"]*)"/i)?.[1],
});

const report = [];

for (const path of paths) {
  const [a, b] = await Promise.all([
    fetch(OLD + path).then((r) => r.text()),
    fetch(NEW + path).then((r) => r.text()),
  ]);

  const before = pick(a);
  const after = pick(b);

  for (const key of Object.keys(before)) {
    // Flag anything that existed before and is now missing or different
    if (before[key] && before[key] !== after[key]) {
      report.push({ path, key, before: before[key], after: after[key] ?? null });
    }
  }
}

writeFileSync('meta-diff.json', JSON.stringify(report, null, 2));
console.log(report.length + ' differences across ' + paths.length + ' pages');`}</Code>

        <P>
          Expect differences. Your titles may lose a suffix you removed on purpose, and canonicals
          will point at the new host. What you are hunting for is the empty <code>after</code>
          value, because that means a tag vanished.
        </P>

        <P>
          Run it against staging, fix what it finds, then run it again. Once the only differences
          left are ones you can explain out loud, you are ready to move.
        </P>

        <P>
          This is the part of a migration I spend the most time on, and it is the part that decides
          whether traffic holds. If you would rather not do it yourself, this is{' '}
          <Link href="/services/wordpress-to-nextjs">work I take on</Link>, with the metadata diff
          run before anything goes live.
        </P>

        <ReadNext
          slug="wordpress-to-nextjs-migration"
          title="Moving a WordPress site to Next.js without losing your rankings"
        />

        <P>
          Metadata is one piece of a migration. The redirect map matters more, and getting it wrong
          costs you more traffic than any missing description ever will.
        </P>

        <P>
          If your team wants to keep writing in WordPress after the move, you do not have to give up
          Yoast at all. Run WordPress headless, keep the plugin, and read{' '}
          <code>yoast_head_json</code> on every build.
        </P>

        <ReadNext
          slug="wordpress-as-headless-cms"
          title="Keep the WordPress editor, drop the WordPress front end"
        />

        <H2 id="resources">Resources</H2>

        <Resources
          items={[
            {
              label: 'Next.js Metadata API reference',
              href: 'https://nextjs.org/docs/app/api-reference/functions/generate-metadata',
              note: 'Every field you can return from generateMetadata, including robots and alternates.',
            },
            {
              label: 'Yoast SEO REST API output',
              href: 'https://developer.yoast.com/features/headless-rest-api/',
              note: 'How yoast_head and yoast_head_json are added to REST responses.',
            },
            {
              label: 'Yoast replacement variables',
              href: 'https://yoast.com/help/list-available-snippet-variables-yoast-seo/',
              note: 'What every %%variable%% resolves to, if you decide to parse templates yourself.',
            },
            {
              label: 'Google: consolidate duplicate URLs',
              href: 'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls',
              note: 'How canonical tags are interpreted, and when they get ignored.',
            },
            {
              label: 'Rich Results Test',
              href: 'https://search.google.com/test/rich-results',
              note: 'Validate the JSON-LD you rebuilt before you ship it.',
            },
          ]}
        />
      </ArticleLayout>
    </>
  );
}
