import type { Metadata } from 'next';
import { site } from '@/app/data/site';
import { getPost } from '@/app/data/posts';
import ArticleLayout, { articleSchema } from '@/app/components/blog/ArticleLayout';
import {
  H2,
  H3,
  P,
  Lede,
  UL,
  OL,
  Code,
  Note,
  Takeaways,
  Table,
  ReadNext,
  Resources,
} from '@/app/components/blog/Prose';
import { BeforeAfterBars, PayloadBreakdown } from '@/app/components/blog/Charts';

const post = getPost('wordpress-to-nextjs-migration')!;

export const metadata: Metadata = {
  title: post.title,
  description: post.summary,
  alternates: { canonical: `${site.url}/blog/${post.slug}` },
  keywords: [
    'WordPress to Next.js migration',
    'migrate WordPress to Next.js',
    'Next.js developer Islamabad',
    'WordPress redirect map',
    'keep SEO after migration',
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
          Most migrations lose traffic for one reason. Someone changed the URLs and nobody wrote
          the redirects. The framework had nothing to do with it.
        </Lede>

        <P>
          I get asked to do this often enough that I have a fixed order of operations. It is not
          complicated, but skipping any step costs you rankings that take months to earn back. So
          here is the whole thing, in the order I actually run it.
        </P>

        <Takeaways
          items={[
            'Your URLs are the only part of a WordPress site that search engines have memorised. Keep them identical where you can.',
            'Every URL that has to change needs a 301, and you need a script that proves all of them work.',
            'Titles, descriptions and canonical tags are content, not decoration. Port them before launch, not after.',
            'Compare field data from before and after, not lab scores. Lab scores flatter a static site.',
          ]}
        />

        <H2 id="why-people-move">Why people move off WordPress</H2>

        <P>
          The reason is almost never that WordPress cannot do the job. It is that a site has
          collected eleven plugins over four years, three of them inject their own CSS on every
          page, and nobody remembers which one the contact form depends on. Page weight creeps up.
          Time to first byte creeps up. Editing still works fine, so nobody notices until traffic
          starts sliding.
        </P>

        <P>
          A Next.js build changes the delivery model. Pages get rendered once at build time and
          served as static files, so a visitor gets HTML from a CDN edge instead of waiting for PHP
          to assemble a page and query MySQL. That is the whole trick. There is no magic in the
          framework, only in doing less work per request.
        </P>

        <PayloadBreakdown
          sites={[
            {
              name: 'Plugin-heavy WP',
              parts: [
                { name: 'JS', kb: 820 },
                { name: 'CSS', kb: 310 },
                { name: 'Fonts', kb: 240 },
                { name: 'HTML', kb: 90 },
              ],
            },
            {
              name: 'Static Next.js',
              parts: [
                { name: 'JS', kb: 180 },
                { name: 'CSS', kb: 40 },
                { name: 'Fonts', kb: 90 },
                { name: 'HTML', kb: 28 },
              ],
            },
          ]}
          label="Page weight split between JavaScript, CSS, fonts and HTML on a plugin-heavy WordPress site and a static Next.js build"
          caption="Illustrative page weight for the two setups, excluding images. The point is the proportion, not the exact totals: on the WordPress side most of the payload is JavaScript and CSS that individual plugins added, and almost none of it is the content itself. Measure your own site with the Network panel before you quote any number."
        />

        <Note title="This is not an argument against WordPress">
          <P>
            WordPress is a good editor and a reasonable database for content. The part worth
            replacing is usually the front end, not the whole system. If your team likes the
            editor, keep it and read the{' '}
            <a href="/blog/wordpress-as-headless-cms">headless setup</a> instead of doing a full
            rebuild.
          </P>
        </Note>

        <H2 id="what-actually-breaks">What actually breaks a migration</H2>

        <P>
          Traffic drops after a migration for a small number of reasons, and they repeat. In rough
          order of how much damage they do:
        </P>

        <OL
          items={[
            <>
              <strong className="font-medium text-cream">URLs changed silently.</strong> The old
              site used <code>/2024/03/my-post/</code> and the new one uses{' '}
              <code>/blog/my-post/</code>. Every link Google has stored now returns a 404.
            </>,
            <>
              <strong className="font-medium text-cream">Redirects chain or loop.</strong> An old
              URL 301s to a second URL that 301s again. Each hop loses a little, and a loop loses
              the page entirely.
            </>,
            <>
              <strong className="font-medium text-cream">Metadata was not ported.</strong> Yoast or
              RankMath held hand written titles and descriptions in post meta. A fresh build
              generates its own, and suddenly every title is different from the one that was
              ranking.
            </>,
            <>
              <strong className="font-medium text-cream">The sitemap still lists old URLs.</strong>{' '}
              You point crawlers at pages that no longer exist while the new ones go undiscovered.
            </>,
            <>
              <strong className="font-medium text-cream">Content got trimmed in the rebuild.</strong>{' '}
              Someone decides the old post is too long and cuts it to a summary. That page was
              ranking because of the length.
            </>,
          ]}
        />

        <P>
          Notice that four of those five have nothing to do with Next.js. They are content and
          routing problems. The framework only shows up in the fifth, and only because a rebuild
          tempts people to rewrite things.
        </P>

        <H2 id="freeze-your-urls">Step one: freeze your URLs</H2>

        <P>
          Before writing any code, get the full list of live URLs out of the old site. Do not trust
          the sitemap alone, because it usually misses attachment pages, old category archives and
          anything a plugin generated.
        </P>

        <P>Pull from three sources and combine them:</P>

        <UL
          items={[
            <>
              The database, for everything published. WP-CLI gives you this in one command.
            </>,
            <>
              Search Console, for what Google actually has indexed. Export the Pages report.
            </>,
            <>
              Your analytics, for the last twelve months of landing pages. This catches URLs that
              still earn traffic even though you forgot they existed.
            </>,
          ]}
        />

        <Code filename="terminal" lang="bash">{`# Every published URL, straight from WordPress
wp post list \\
  --post_type=post,page \\
  --post_status=publish \\
  --format=csv \\
  --fields=ID,post_name,post_date,guid > wp-urls.csv

# Resolve the real permalinks, since post_name is not the full path
wp post list --post_type=post,page --post_status=publish --format=ids \\
  | tr ' ' '\\n' \\
  | xargs -I{} wp post url {} > permalinks.txt`}</Code>

        <P>
          Now decide, URL by URL, what stays and what moves. My default is that everything stays.
          A dated permalink structure is ugly, and I still keep it, because the cost of changing it
          is real and the benefit is cosmetic. Change URLs only when you have a reason that
          survives the question &quot;is this worth losing rankings for a month?&quot;
        </P>

        <H2 id="redirect-map">Step two: build the redirect map</H2>

        <P>
          For anything that does move, you need a 301. A 301 tells search engines the move is
          permanent and passes the ranking signals to the new URL. A 302 says the move is temporary
          and holds the signals at the old address, which is not what you want.
        </P>

        <P>
          Keep the map as data, not as hand written config. Then generate the config from it. That
          way one file is the source of truth and you can test against the same file.
        </P>

        <Code filename="redirects.json" lang="json">{`[
  { "from": "/2024/03/moving-to-nextjs/", "to": "/blog/moving-to-nextjs" },
  { "from": "/?p=1042",                   "to": "/blog/moving-to-nextjs" },
  { "from": "/category/engineering/",     "to": "/blog" },
  { "from": "/about-us/",                 "to": "/about" }
]`}</Code>

        <Code filename="next.config.ts" lang="typescript">{`import type { NextConfig } from 'next';
import redirects from './redirects.json';

const nextConfig: NextConfig = {
  async redirects() {
    return redirects.map(({ from, to }) => ({
      source: from,
      destination: to,
      permanent: true, // 308, which search engines treat like a 301
    }));
  },
};

export default nextConfig;`}</Code>

        <Note title="On 308 versus 301">
          <P>
            Next.js emits a 308 when you set <code>permanent: true</code>. A 308 is a permanent
            redirect that also preserves the request method, and Google documents it as equivalent
            to a 301 for ranking purposes. If a specific client insists on a literal 301, set the
            redirect at your CDN or host instead.
          </P>
        </Note>

        <H3>Test the map before you launch</H3>

        <P>
          This is the step people skip, and it is the one that catches chains and loops. Write a
          script that walks every entry in the map and checks two things: the old URL returns a
          redirect, and following it lands on a 200 in one hop.
        </P>

        <Code filename="scripts/check-redirects.mjs" lang="javascript">{`import redirects from '../redirects.json' with { type: 'json' };

const BASE = process.env.BASE_URL ?? 'http://localhost:3000';
let failures = 0;

for (const { from, to } of redirects) {
  // Do not follow automatically. We want to see each hop.
  const res = await fetch(BASE + from, { redirect: 'manual' });
  const location = res.headers.get('location');

  if (res.status !== 301 && res.status !== 308) {
    console.error('NOT REDIRECTED  ' + from + '  got ' + res.status);
    failures++;
    continue;
  }

  const landed = new URL(location, BASE);
  if (landed.pathname !== to) {
    console.error('WRONG TARGET    ' + from + '  ->  ' + landed.pathname);
    failures++;
    continue;
  }

  // One more hop to prove the destination is not itself a redirect
  const final = await fetch(landed, { redirect: 'manual' });
  if (final.status !== 200) {
    console.error('CHAIN OR 404    ' + to + '  got ' + final.status);
    failures++;
    continue;
  }

  console.log('ok  ' + from + '  ->  ' + to);
}

console.log('\\n' + (redirects.length - failures) + '/' + redirects.length + ' passing');
process.exit(failures ? 1 : 0);`}</Code>

        <P>
          Wire that into your deploy so a broken redirect fails the build. It takes ten minutes to
          set up and it removes an entire category of post launch panic.
        </P>

        <H2 id="carry-the-metadata">Step three: carry the metadata across</H2>

        <P>
          Yoast and RankMath store their titles and descriptions in the <code>wp_postmeta</code>{' '}
          table. Those strings were often written by hand and tuned over years. Export them with
          the content and map them onto the Next.js Metadata API instead of generating fresh ones.
        </P>

        <Code filename="terminal" lang="bash">{`# Yoast keys. RankMath uses rank_math_title and rank_math_description.
wp post meta list <id> --keys=_yoast_wpseo_title,_yoast_wpseo_metadesc --format=json`}</Code>

        <Code filename="app/blog/[slug]/page.tsx" lang="typescript">{`export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  return {
    // Fall back to the post title only when no hand written one exists
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    alternates: { canonical: \`https://example.com/blog/\${post.slug}\` },
    openGraph: {
      type: 'article',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      publishedTime: post.date,
    },
  };
}`}</Code>

        <Table
          head={['What to port', 'Where it lives in WordPress', 'Where it goes in Next.js']}
          rows={[
            ['SEO title', '_yoast_wpseo_title', 'metadata.title'],
            ['Meta description', '_yoast_wpseo_metadesc', 'metadata.description'],
            ['Canonical URL', '_yoast_wpseo_canonical', 'metadata.alternates.canonical'],
            ['Noindex flags', '_yoast_wpseo_meta-robots-noindex', 'metadata.robots'],
            ['Featured image', '_thumbnail_id', 'metadata.openGraph.images'],
            ['Publish date', 'post_date_gmt', 'openGraph.publishedTime and schema'],
          ]}
          caption="The fields that change rankings if you drop them. Meta keys shown are Yoast's; RankMath and SEOPress use their own prefixes."
        />

        <P>
          Generate the sitemap from the same data that generates the pages. If those two ever come
          from different sources, they will disagree eventually, and you will not notice until
          Search Console tells you.
        </P>

        <H2 id="prove-it-worked">Step four: prove it worked</H2>

        <P>
          Launch is not the end. For the first month you are watching for two things: crawl errors
          and ranking movement. Both live in Search Console.
        </P>

        <UL
          items={[
            <>
              Submit the new sitemap the day you launch. Leave the old one in place if it still
              resolves, because crawlers will use it to find URLs that need redirecting.
            </>,
            <>
              Watch the Pages report for a spike in <code>Not found (404)</code>. Every entry there
              is a URL missing from your redirect map. Add it and redeploy.
            </>,
            <>
              Compare Performance data over the same length of window before and after, not week
              against week. Seasonality will lie to you otherwise.
            </>,
            <>
              Expect a small dip for one to two weeks while Google recrawls. A dip that keeps
              deepening past a month is a problem, not a settling period.
            </>,
          ]}
        />

        <Note title="The Change of Address tool is not for this">
          <P>
            Search Console&apos;s Change of Address tool only applies when you move to a different
            domain. If you are keeping the same domain and only changing URL structure, you do not
            use it. Your redirects do the work.
          </P>
        </Note>

        <H2 id="what-you-gain">What you gain</H2>

        <P>
          Assuming you did the routing properly, the payoff shows up in field data rather than lab
          scores. Static HTML from an edge cache removes server render time from every request,
          which mostly moves your Largest Contentful Paint and your time to first byte.
        </P>

        <BeforeAfterBars
          rows={[
            { label: 'TTFB', before: 780, after: 90, unit: 'ms' },
            { label: 'LCP', before: 3400, after: 1200, unit: 'ms' },
            { label: 'JS shipped', before: 820, after: 180, unit: 'KB' },
          ]}
          beforeLabel="WordPress"
          afterLabel="Static Next.js"
          label="Time to first byte, Largest Contentful Paint and JavaScript payload before and after a migration"
          caption="Illustrative figures showing the shape of the change, not a measurement of a specific site. Time to first byte drops because no server assembles the page per request. Run your own before and after in Search Console's Core Web Vitals report and quote those numbers instead of these."
        />

        <P>
          The part that does not show up on a chart is maintenance. There is no plugin auto update
          that can take the site down at 2am, and no PHP version bump to schedule. That matters
          more than most performance numbers over a two year window.
        </P>

        <ReadNext
          slug="core-web-vitals-for-content-sites"
          title="Core Web Vitals for content sites: what actually moves the numbers"
        />

        <P>
          If you want the speed without giving up the WordPress editor, you do not have to choose.
          Point Next.js at the WordPress REST API and keep both.
        </P>

        <ReadNext
          slug="wordpress-as-headless-cms"
          title="Keep the WordPress editor, drop the WordPress front end"
        />

        <H2 id="resources">Resources</H2>

        <Resources
          items={[
            {
              label: 'Google Search Central: redirects and Google Search',
              href: 'https://developers.google.com/search/docs/crawling-indexing/301-redirects',
              note: 'What each redirect type signals, and how Google treats 301, 302 and 308.',
            },
            {
              label: 'Google Search Central: site move with URL changes',
              href: 'https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes',
              note: 'The official checklist for a move that changes URLs.',
            },
            {
              label: 'Next.js: redirects in next.config.js',
              href: 'https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects',
              note: 'Source and destination patterns, including wildcards and regex.',
            },
            {
              label: 'Next.js: generateMetadata',
              href: 'https://nextjs.org/docs/app/api-reference/functions/generate-metadata',
              note: 'Every metadata field the App Router supports.',
            },
            {
              label: 'WP-CLI post commands',
              href: 'https://developer.wordpress.org/cli/commands/post/',
              note: 'For exporting URLs, content and post meta in bulk.',
            },
          ]}
        />
      </ArticleLayout>
    </>
  );
}
