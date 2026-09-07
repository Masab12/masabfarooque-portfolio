import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/app/data/site';
import { getPost } from '@/app/data/posts';
import ArticleLayout, { articleSchema, faqSchema } from '@/app/components/blog/ArticleLayout';
import { EffortSplit } from '@/app/components/blog/Charts';
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
  FAQ,
  ReadNext,
  Resources,
  type FaqItem,
} from '@/app/components/blog/Prose';

const post = getPost('wordpress-vs-nextjs')!;

export const metadata: Metadata = {
  title: post.title,
  description: post.summary,
  alternates: { canonical: `${site.url}/blog/${post.slug}` },
  keywords: [
    'WordPress vs Next.js',
    'should I move from WordPress to Next.js',
    'Next.js instead of WordPress',
    'is Next.js better than WordPress',
    'WordPress alternative for business sites',
    'headless WordPress with Next.js',
    'Next.js developer for WordPress migration',
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

const faqs: FaqItem[] = [
  {
    q: 'Is Next.js better than WordPress for SEO?',
    a: 'Neither one ranks for you. Both can emit a correct title, description, canonical, sitemap and structured data, and search engines render JavaScript perfectly well now. What differs is the effort curve. On Next.js the fast, correct output is the default and you have to work to break it. On WordPress it is the result of a plugin stack you maintain, and any update can undo it.',
  },
  {
    q: 'Will I lose my rankings if I move to Next.js?',
    a: 'Only if the URLs change without redirects, or the metadata does not travel across. Those are the two causes behind almost every migration that loses traffic, and both are preventable with a frozen URL list, a tested redirect map and a metadata diff against the live site before launch. The framework has nothing to do with it.',
  },
  {
    q: 'Can my writers keep using the WordPress editor?',
    a: 'Yes, and for most teams that is the right build. WordPress stays exactly as it is, with the same login, block editor and media library, and Next.js reads the content over the REST or GraphQL API and serves static pages. Editors notice nothing except that the site got faster.',
  },
  {
    q: 'Is Next.js cheaper to host than WordPress?',
    a: 'The front end usually is, because static pages served from an edge cost very little and do not need a database. If you keep WordPress as a headless CMS you are still paying for that box, but it no longer has to survive your traffic, so it can be much smaller than the one you have now.',
  },
  {
    q: 'What happens to all my plugins?',
    a: 'Most of them stop existing. Caching, image optimisation, minification, sitemaps and redirects are all built into the framework, so those plugins have no job left. Forms, analytics and cookie banners become small pieces of code. Commerce, memberships and learning platforms are the ones that stay real work.',
  },
  {
    q: 'Should I redesign at the same time?',
    a: 'No. A migration is judged by whether traffic held, and a redesign changes so much at once that you cannot tell what caused a drop. Move the site first, confirm the numbers held for a month, then redesign on a stable base.',
  },
  {
    q: 'Do you do this work, and where are you based?',
    a: 'Yes. I am a full stack engineer in Islamabad, Pakistan, and I work with clients worldwide. I quote fixed prices per project, and a fair share of the time I tell people their site does not need migrating at all.',
  },
];

export default function Page() {
  return (
    <>
      {[...articleSchema(post), faqSchema(faqs)].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <ArticleLayout post={post}>
        <Lede>Both will serve your pages. Only one of them matches how your site gets used.</Lede>

        <P>
          Somebody emails me about this most weeks, and almost none of them actually have a problem
          with WordPress. They have a problem with one page taking four seconds to open on a phone,
          or with a renewal invoice for plugins nobody remembers approving, or with a developer who
          left and took the only copy of the theme with them. Those are three different problems and
          exactly one of them is solved by changing framework.
        </P>

        <P>
          So this is the comparison I run before I quote anyone, in the order I run it.
        </P>

        <Takeaways
          items={[
            'WordPress is rarely slow because of PHP. It is slow because a stack of plugins runs on every request and each one adds queries, stylesheets and scripts to pages that never use them.',
            'Next.js does not make a site fast. It makes fast the default and slow something you have to go out of your way to do.',
            'Of the 11,334 WordPress vulnerabilities Patchstack recorded across 2025, 91 percent were in plugins. Core accounted for six, all low priority.',
            'The decision is about how your site gets used, not about which technology is better. Two pages that change once a year and a newsroom with four editors are not the same question.',
            'For a team that publishes regularly, the right answer is usually neither pure option. Keep WordPress as the editor and serve the site from Next.js.',
          ]}
        />

        <H2 id="what-you-are-choosing">What you are actually choosing</H2>

        <P>
          WordPress is a content management system with a front end attached. Next.js is a front end
          with no content management system attached. Everything else in this comparison follows
          from that one asymmetry.
        </P>

        <P>
          On WordPress, a single install does three jobs at once: it stores your content, renders
          your pages, and absorbs your traffic. Someone opening a product page starts a PHP process
          that loads the theme, runs whatever your active plugins have hooked into that request,
          queries MySQL a few dozen times, and assembles the HTML while the visitor waits.
        </P>

        <P>
          On Next.js, most of that already happened. The page was rendered when the content last
          changed, and the visitor is handed a file that was sitting on a CDN before they arrived.
          The content itself lives somewhere else: a headless CMS, a database, Markdown in the
          repository, whatever you point it at.
        </P>

        <P>
          Which makes the real question something other than speed. It is whether you want the
          system that stores your content to also be the system that takes the hit when traffic
          arrives. On a site nobody visits, that coupling costs nothing at all. On a site with a
          publishing schedule and an audience, it is the thing that eventually gives.
        </P>

        <H2 id="where-the-market-is">Where WordPress actually stands</H2>

        <P>Numbers first, because this argument usually runs on feelings.</P>

        <P>
          W3Techs put WordPress at 40.7 percent of all websites on 7 September 2026, and at 58.9
          percent of the sites where the content management system is known. Nothing else is close
          to that. Any pitch that opens with WordPress being dead can be dismissed on that line
          alone, and you should be a little suspicious of whoever made it.
        </P>

        <P>
          The direction is more interesting than the level. WordPress sat at 43.2 percent in
          December 2025 and 41.9 percent by late May 2026: six consecutive months of decline, and
          the first run like that in years. That is a slow drift, not a collapse.
        </P>

        <Note title="Do not migrate because of a trend line">
          <P>
            A point of global market share tells you nothing useful about your site. What it does
            tell you is that leaving has become ordinary, which matters only because the tooling,
            the hosting and the people who do this work have all had several years to mature. Move
            because of a bill or a bottleneck you can name out loud. Not because of a chart.
          </P>
        </Note>

        <H2 id="the-plugin-bill">The plugin bill nobody quotes</H2>

        <P>
          This is the part of the comparison that decides most of it, and it is the part that never
          appears in a quote.
        </P>

        <P>
          Every WordPress feature past the basics arrives as somebody else&apos;s code, running
          inside your request cycle with full access to your database. That is the deal, and it is
          a good one. It is why WordPress can do almost anything in an afternoon and why a
          non-technical owner can add a booking system without hiring anyone.
        </P>

        <P>The invoice for it arrives in three parts.</P>

        <H3>Security</H3>

        <P>
          Patchstack, which maintains a vulnerability database for the WordPress ecosystem, recorded
          11,334 new vulnerabilities across 2025. That is 42 percent more than the year before. Of
          those, 91 percent were found in plugins and 9 percent in themes. WordPress core accounted
          for six, and all six were low priority.
        </P>

        <EffortSplit
          parts={[
            { name: 'Plugins', percent: 91 },
            { name: 'Themes', percent: 9 },
          ]}
          label="Share of new WordPress vulnerabilities found in plugins against themes during 2025"
          caption="Where the 11,334 new vulnerabilities recorded in the WordPress ecosystem during 2025 were found, from the Patchstack State of WordPress Security in 2026 report. WordPress core is not visible on this bar because it accounted for six of them, all low priority. The platform is not the exposure. The list you installed on top of it is."
        />

        <P>
          Of that total, 1,966 were high severity, which the report puts at a 113 percent rise year
          on year and more high severity findings than the previous two years combined. Roughly half
          of the high impact ones are exploited within a day of disclosure, and for the heavily
          targeted ones the weighted median time to first exploit is five hours.
        </P>

        <P>
          The figure I find hardest to argue with is a quieter one. 46 percent of vulnerabilities
          were not fixed in time for public disclosure. Nearly half the time, the problem becomes
          public before the fix exists, and your automatic updates have nothing to install.
        </P>

        <P>
          None of this makes WordPress insecure. Core is in good shape and the numbers say so. What
          it makes clear is that your exposure is a list you assembled yourself, that updates itself
          on your live site, and that nobody on your side has read.
        </P>

        <H3>Weight</H3>

        <P>
          The second part of the bill is what all that code puts on the page. A plugin providing one
          shortcode you use on one page will usually load its stylesheet and its script everywhere,
          because it has no dependable way of knowing which page you used it on. Multiply by twenty
          and your homepage is carrying the cost of features it does not have.
        </P>

        <P>
          You can fight this. There are plugins that unload other plugins on a per-URL basis, which
          is exactly as sturdy an arrangement as it sounds.
        </P>

        <H3>Ownership</H3>

        <P>
          The third part is the one people notice last. In October 2024, WP Engine was cut off from
          WordPress.org, and days later Advanced Custom Fields, a plugin a very large number of
          sites are built on, was forked into Secure Custom Fields and pushed out through the
          official update channel. Sites running automatic updates changed plugin without anybody
          on those sites deciding to.
        </P>

        <P>
          Take whatever position you like on who was in the right. The lesson for an owner is
          narrow and survives either view: a dependency you do not control can change hands, and
          change on your production site, without you being asked.
        </P>

        <P>
          Next.js does not free you from dependencies. It changes what one is. An npm package is
          pinned in a lockfile, upgraded when somebody decides to upgrade it, and read in a diff
          before it reaches production. Nothing installs itself into a running site overnight.
        </P>

        <H2 id="the-speed-ceiling">The speed ceiling</H2>

        <P>
          Google scores three numbers, taken from real visits and read at the 75th percentile.
          Largest Contentful Paint under 2.5 seconds, Interaction to Next Paint under 200
          milliseconds, Cumulative Layout Shift under 0.1. All three have to pass for the page to
          count as good.
        </P>

        <P>
          A well cached WordPress site can pass all three. Plenty of them do. If yours does, the
          speed argument for moving has already gone and you should ignore anyone who keeps making
          it.
        </P>

        <P>
          The difference is what passing costs and what staying there costs. On WordPress, speed is
          a maintenance job: a cache plugin, an image plugin, something to defer JavaScript, and a
          re-check after every update because any one of them can quietly undo the others.
        </P>

        <P>
          The metric where the gap shows most is INP, which replaced First Input Delay in March 2024
          and measures how long a page takes to respond after somebody touches it. Server side
          caching does nothing for it. INP is about the JavaScript already sitting on the page, and
          no cache plugin can delete a script another plugin insisted on loading.
        </P>

        <P>On the other side, the mechanism is much less interesting, which is the point:</P>

        <Code filename="app/blog/[slug]/page.tsx" lang="tsx">{`// Rendered when the content changes, not when a visitor arrives. The work
// below runs once an hour at most, whether ten people read the page or
// ten thousand do.
export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return <Article post={post} />;
}`}</Code>

        <P>
          There is no cache plugin in that file because there is nothing left to cache. The HTML
          exists before the request does.
        </P>

        <ReadNext
          slug="core-web-vitals-for-content-sites"
          title="Core Web Vitals for content sites: what actually moves the numbers"
        />

        <H2 id="where-wordpress-wins">Where WordPress still wins</H2>

        <P>
          I quote this work for a living and I still talk people out of it regularly, so take the
          list seriously rather than as a fairness gesture.
        </P>

        <UL
          items={[
            <>
              <strong>You sell things.</strong> WooCommerce is a mature product with a decade of
              extensions behind it, and a headless storefront is a bigger and riskier project than
              almost any store owner expects when they ask about it.
            </>,
            <>
              <strong>Nobody maintains it.</strong> Managed WordPress hosting with automatic updates
              asks nothing of anyone. A Next.js site needs a person who can run a build and read a
              deploy log. If that person does not exist, you have traded a slow site for a stuck
              one.
            </>,
            <>
              <strong>Your team lays out pages by hand every week.</strong> If marketing builds
              bespoke campaign pages in a builder and will not move to a structured editor, a
              migration proposes taking away the part of the job they like.
            </>,
            <>
              <strong>The site is small and already fast.</strong> Ten pages, good scores, nothing
              broken. Migrating that spends money and earns nothing back.
            </>,
          ]}
        />

        <P>
          And if your site is slow because of six plugins and a four megabyte hero image, the fix is
          six plugins and an image. I will say so, and it is a much cheaper afternoon than the one
          you were budgeting for. You can get most of that answer yourself from the{' '}
          <Link href="/site-check">free site check</Link> before you talk to anyone.
        </P>

        <H2 id="the-third-option">The option most people miss</H2>

        <P>
          The comparison gets posed as a choice between two whole systems, and that framing is what
          makes it feel hard. You can split it, and for a team that publishes regularly the split is
          usually the right build.
        </P>

        <P>
          Keep WordPress. Keep the block editor, the media library, the user roles, the workflow
          your writers already have in their hands. Stop letting it serve visitors. Next.js reads
          the content over an API at build time, or when a webhook says something changed, and
          serves static pages from an edge. Editors notice nothing. Visitors never touch PHP.
        </P>

        <P>
          Both APIs are dependable now. REST ships with core and needs no plugin at all. WPGraphQL,
          the route I take on larger sites, became a canonical plugin on WordPress.org after
          Automattic hired its creator in late 2024, so a critical dependency is no longer one
          maintainer working evenings.
        </P>

        <Code filename="lib/wordpress.ts" lang="ts">{`// One query, one round trip, exactly the fields the template renders.
// The REST API would need three calls to assemble the same page.
const QUERY = \`
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      title
      content
      date
      seo { title metaDesc canonical }
      author { node { name } }
      featuredImage { node { sourceUrl altText } }
    }
  }
\`;

export async function getPost(slug: string) {
  const res = await fetch(process.env.WP_GRAPHQL_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: QUERY, variables: { slug } }),
    // Content is re-fetched when the webhook fires, not on every request
    next: { tags: ['posts'] },
  });

  if (!res.ok) throw new Error(\`WordPress returned \${res.status}\`);
  const { data } = await res.json();
  return data.post;
}`}</Code>

        <P>
          There is a genuine cost to this. You are running two systems instead of one, and the
          WordPress install still needs updating even though nobody visits it. What you get back is
          that the box no longer has to survive your traffic, which changes what it needs to be and
          what it costs to run.
        </P>

        <ReadNext
          slug="hosting-headless-wordpress"
          title="Where to host a headless WordPress backend, and what it costs"
        />

        <H2 id="how-to-decide">Deciding in ten minutes</H2>

        <P>Read down the left column and stop at the first row that describes you.</P>

        <Table
          head={['If this is true', 'What I would do']}
          rows={[
            [
              'You sell through WooCommerce',
              'Leave the shop alone for now. Consider moving only the marketing and content pages, and read the WooCommerce piece before anyone quotes the storefront.',
            ],
            [
              'Nobody on your side can run a build',
              'Stay on WordPress. Spend the budget on better hosting and a serious plugin cull instead, which will get you most of the speed.',
            ],
            [
              'Under about fifteen pages and already passing Core Web Vitals',
              'There is nothing here worth paying for. Keep the money.',
            ],
            [
              'You publish weekly, editors are happy, the site is slow',
              'Headless WordPress behind Next.js. Editors keep every habit they have, visitors get static pages.',
            ],
            [
              'Content is structured, editors are comfortable in a technical tool',
              'A full move. WordPress comes out, the content model goes into code, and you stop maintaining PHP.',
            ],
            [
              'The trigger was a hack, a renewal bill or a developer leaving',
              'Fix that. None of the three is a framework problem, and a migration will not solve any of them on its own.',
            ],
          ]}
          caption="The rows are ordered by how often they turn out to be the real answer, not by how often people arrive asking for them."
        />

        <P>
          Two things worth pulling before you speak to anybody, including me. Your active plugin
          list, because it predicts the cost of the work better than page count does. And your URL
          count, because that is what the redirect map has to cover and it is the part that protects
          your traffic.
        </P>

        <Code filename="terminal" lang="bash">{`# The list that decides most of the quote
wp plugin list --status=active --fields=name,version

# How many URLs Google currently knows about, which is what redirects must cover
curl -s https://example.com/wp-sitemap.xml \\
  | grep -oE '<loc>[^<]+</loc>' | sed 's/<[^>]*>//g' \\
  | while read -r map; do curl -s "$map" | grep -c '<loc>'; done \\
  | paste -sd+ - | bc`}</Code>

        <P>
          Take both numbers to whoever quotes you. If they do not ask about redirects, keep looking.
        </P>

        <ReadNext
          slug="wordpress-to-nextjs-migration"
          title="Moving a WordPress site to Next.js without losing your rankings"
        />

        <H2 id="faq">Questions people ask me</H2>

        <FAQ items={faqs} />

        <P>
          If you want a straight answer on your own site, send me the address. You will get either a
          breakdown of what a migration would involve and what it would cost, or a recommendation to
          stay where you are and fix three specific things, which is what I say more often than
          people expect. The <Link href="/services/wordpress-to-nextjs">migration service page</Link>{' '}
          covers how the work runs, and <Link href="/contact">the contact form</Link> is the fastest
          way in.
        </P>

        <H2 id="resources">Resources</H2>

        <Resources
          items={[
            {
              label: 'W3Techs: WordPress usage statistics',
              href: 'https://w3techs.com/technologies/details/cm-wordpress',
              note: 'The market share figures quoted above, updated daily. Read the sampling note before quoting it at anyone.',
            },
            {
              label: 'Patchstack: State of WordPress Security in 2026',
              href: 'https://patchstack.com/whitepaper/state-of-wordpress-security-in-2026/',
              note: 'Source for the 11,334 vulnerabilities, the plugin and theme split, and the time to first exploit figures.',
            },
            {
              label: 'web.dev: Core Web Vitals',
              href: 'https://web.dev/articles/vitals',
              note: 'The three thresholds, how they are measured, and why the 75th percentile is the number that counts.',
            },
            {
              label: 'Google: site moves with URL changes',
              href: 'https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes',
              note: 'The official process a migration has to follow if the rankings are going to survive it.',
            },
            {
              label: 'WPGraphQL',
              href: 'https://www.wpgraphql.com/',
              note: 'The GraphQL API for WordPress, now a canonical plugin, and the one I use on larger headless builds.',
            },
            {
              label: 'WordPress REST API handbook',
              href: 'https://developer.wordpress.org/rest-api/',
              note: 'Ships with core. Enough for most headless sites without installing anything.',
            },
            {
              label: 'Next.js App Router documentation',
              href: 'https://nextjs.org/docs/app',
              note: 'Rendering strategies, revalidation and the Metadata API, which are the three things a migration actually leans on.',
            },
          ]}
        />
      </ArticleLayout>
    </>
  );
}
