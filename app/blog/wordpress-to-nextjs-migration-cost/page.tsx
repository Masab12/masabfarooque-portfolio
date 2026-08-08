import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/app/data/site';
import { getPost } from '@/app/data/posts';
import ArticleLayout, { articleSchema } from '@/app/components/blog/ArticleLayout';
import { EffortSplit } from '@/app/components/blog/Charts';
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

const post = getPost('wordpress-to-nextjs-migration-cost')!;

export const metadata: Metadata = {
  title: post.title,
  description: post.summary,
  alternates: { canonical: `${site.url}/blog/${post.slug}` },
  keywords: [
    'WordPress to Next.js migration cost',
    'Next.js migration price',
    'how much does a Next.js rebuild cost',
    'headless WordPress cost',
    'WordPress migration quote',
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
        <Lede>Most quotes give you one number. Here is what sits inside it.</Lede>

        <P>
          You ask three people what it costs to move your WordPress site to Next.js and you get
          three figures with nothing behind them. One says two thousand. One says nine. Neither
          explains the gap, so you end up picking on gut feel or on price alone.
        </P>

        <P>
          I quote fixed prices per project, which means I have to break the work down before I can
          put a number on it. This is that breakdown.
        </P>

        <Takeaways
          items={[
            'Page count matters far less than template count. Five hundred posts sharing one layout is cheaper than forty pages with thirty layouts.',
            'Routing and metadata together are roughly a quarter of the work, and they are the part that protects your traffic.',
            'Published agency pricing in 2026 clusters most small and medium migrations between two and five thousand US dollars.',
            'WooCommerce, page builders and heavy custom fields are the three things that reliably double a quote.',
            'A quote with no line items is not a quote. It is a guess you are being asked to fund.',
          ]}
        />

        <H2 id="what-drives-the-number">What drives the number</H2>

        <P>
          People assume the price tracks page count. It mostly does not.
        </P>

        <P>
          A blog with six hundred posts that all share one layout is a cheap migration. You build
          one template, write one loop, and the six hundredth post costs nothing more than the
          second. A forty page brochure site where every page was laid out by hand in a page
          builder is expensive, because forty pages means forty layout decisions somebody has to
          rebuild and check.
        </P>

        <P>Five things actually move the figure:</P>

        <OL
          items={[
            <>
              <strong>Distinct templates.</strong> How many genuinely different page layouts exist.
              This is the single biggest driver.
            </>,
            <>
              <strong>Custom post types and fields.</strong> Each one needs mapping, querying and
              rendering. Advanced Custom Fields sprawl is where estimates go wrong.
            </>,
            <>
              <strong>Indexed URL count.</strong> Not page count. How many URLs Google currently
              knows about, because every one of them needs a destination.
            </>,
            <>
              <strong>Integrations.</strong> Forms, search, comments, memberships, payment,
              newsletter, analytics. Each is a small job that adds up fast.
            </>,
            <>
              <strong>Plugin dependencies.</strong> Anything doing real work rather than styling has
              to be replaced with code.
            </>,
          ]}
        />

        <P>
          Before anyone quotes you, get those five numbers. You can pull most of them yourself in
          ten minutes.
        </P>

        <Code filename="terminal" lang="bash">{`# How many published items, by post type. This tells you scale.
wp post list --post_status=publish --format=count --post_type=post
wp post list --post_status=publish --format=count --post_type=page

# Every registered post type, including the custom ones a plugin added
wp post-type list --fields=name,label,public

# Active plugins. The list you hand to a developer.
wp plugin list --status=active --fields=name,version

# How many distinct page templates the theme actually offers
ls -1 wp-content/themes/$(wp theme list --status=active --field=name)/*.php | wc -l`}</Code>

        <P>
          No WP-CLI access? The sitemap gives you the URL count, which is the number that matters
          most for the routing work.
        </P>

        <Code filename="terminal" lang="bash">{`# Total URLs across every sitemap, which is what the redirect map has to cover
curl -s https://example.com/wp-sitemap.xml \\
  | grep -oE '<loc>[^<]+</loc>' \\
  | sed 's/<[^>]*>//g' \\
  | while read -r map; do curl -s "$map" | grep -c '<loc>'; done \\
  | paste -sd+ - | bc`}</Code>

        <Note title="Where the market sits">
          <P>
            For context before the breakdown: agency pricing pages published in 2026 put a simple
            blog migration somewhere around eight hundred to seventeen hundred US dollars, cluster
            most small and medium projects between two and five thousand, and push complex
            commerce work past fifteen. Specialist rates tend to land between eighty and a hundred
            and fifty dollars an hour. Those figures are the shape of the market, not a quote for
            your site.
          </P>
        </Note>

        <H2 id="the-line-items">The nine line items</H2>

        <P>
          Every migration I have run breaks into the same nine pieces. The proportions shift. The
          list does not.
        </P>

        <H3>1. URL audit and inventory</H3>

        <P>
          Pull every indexed URL from the sitemap, Search Console and the server logs, then
          reconcile the three lists. Server logs catch the URLs that still earn traffic but fell
          out of your sitemap years ago, which is exactly the set people forget.
        </P>

        <P>Small job, and skipping it is how migrations lose traffic.</P>

        <H3>2. Redirect map</H3>

        <P>
          Old path to new path, for every URL from step one, then an automated pass that confirms
          each one lands on a 200 rather than a 404 or a chain. This is the work that protects your
          rankings, and it scales with URL count rather than template count.
        </P>

        <H3>3. Template build</H3>

        <P>
          The largest single item. One React component per distinct layout, matching the existing
          design unless you are redesigning at the same time, which I would advise against doing in
          the same project.
        </P>

        <H3>4. Content migration</H3>

        <P>
          Getting the posts, pages, media and taxonomies across. Cheap if you are running WordPress
          headless, because the content stays where it is and Next.js reads it over the API.
          Expensive if you are exporting into a different CMS, because WordPress HTML carries
          shortcodes, block comments and inline styles that all need cleaning.
        </P>

        <H3>5. Metadata and schema</H3>

        <P>
          Titles, descriptions, canonicals, robots rules, Open Graph images and the JSON-LD your
          SEO plugin was emitting. This one gets dropped from quotes constantly and then costs you
          rankings quietly over the following weeks.
        </P>

        <H3>6. Integrations</H3>

        <P>
          Contact forms, site search, analytics, newsletter signup, comments. Each looks trivial and
          each takes half a day once you include testing that the submission actually arrives.
        </P>

        <H3>7. Performance pass</H3>

        <P>
          Image handling, font loading, layout stability and the render strategy per route. Doing it
          during the build is much cheaper than bolting it on after launch.
        </P>

        <H3>8. Testing and QA</H3>

        <P>
          Redirect verification, metadata diffing against the live site, cross browser checks, and
          a real pass on a mid range phone rather than a desktop pretending to be one.
        </P>

        <H3>9. Deploy, documentation and handover</H3>

        <P>
          Environment variables, the deploy pipeline, a readme that gets a new developer running,
          and a recorded walkthrough. Small line, and the one that decides whether you are stuck
          with whoever built it.
        </P>

        <H2 id="where-the-effort-goes">Where the effort goes</H2>

        <EffortSplit
          parts={[
            { name: 'Template build', percent: 20 },
            { name: 'Content migration', percent: 15 },
            { name: 'Routing and redirects', percent: 13 },
            { name: 'Metadata and schema', percent: 11 },
            { name: 'Integrations', percent: 10 },
            { name: 'Performance pass', percent: 9 },
            { name: 'Testing and QA', percent: 8 },
            { name: 'Contingency', percent: 10 },
            { name: 'Deploy and handover', percent: 4 },
          ]}
          label="Share of total effort across the nine line items in a WordPress to Next.js migration"
          caption="How I split effort on a typical content site migration. These are my own working proportions for scoping, not an industry measurement, and they move with the site. A headless build shifts weight off content migration. A site with many layouts pushes template build well past twenty percent."
        />

        <P>
          Two things worth pulling out of that. Routing and metadata together come to twenty four
          percent, and they are the two items with no visible output. Nobody looks at a finished
          site and sees the redirect map. Cut them and the site still launches, still looks right,
          and quietly bleeds traffic for a quarter.
        </P>

        <P>
          The contingency line is real work, not padding. Something always turns up: a plugin doing
          something undocumented, a content pattern nobody mentioned, a redirect loop from an old
          migration. Quotes with no contingency become change requests later.
        </P>

        <H2 id="worked-examples">Three worked examples</H2>

        <P>
          Same nine items, three different sites. The shape of the work changes more than the total.
        </P>

        <Table
          head={['', 'Brochure site', 'Content site', 'Headless content site']}
          rows={[
            ['Indexed URLs', 'Around 30', 'Around 400', 'Around 400'],
            ['Distinct templates', '6 to 8', '5 to 6', '5 to 6'],
            ['Heaviest line item', 'Template build', 'Redirect map', 'Template build'],
            ['Content migration', 'Manual, quick', 'Scripted export', 'None, stays in WordPress'],
            ['Editor workflow', 'Usually dropped', 'Usually dropped', 'Unchanged'],
            ['Extra work', 'None', 'None', 'Webhook, preview mode, CMS lockdown'],
            ['Typical span', '1 to 2 weeks', '2 to 5 weeks', '3 to 6 weeks'],
          ]}
          caption="The headless column costs more than the middle column and removes the retraining problem, because your team keeps the WordPress admin. That trade is worth it when people publish weekly. It is not worth it when they publish twice a year."
        />

        <P>
          Notice the brochure site has more templates than the content site despite having a
          fraction of the pages. That is the template point again, and it is why a small site can
          quote higher than a big one.
        </P>

        <H2 id="what-inflates-it">What inflates a quote</H2>

        <P>Four things reliably push the number up. Three of them are worth knowing before you ask.</P>

        <UL
          items={[
            <>
              <strong>WooCommerce.</strong> Headless commerce is a different project with a
              different budget. Cart, checkout, payment, tax, stock and order history all have to
              work perfectly on day one. Often the honest answer is to leave the shop on WordPress.
            </>,
            <>
              <strong>Page builders.</strong> Elementor and Divi store layout as theme specific
              markup. None of it travels. Every page laid out in a builder is a page somebody
              rebuilds by hand, which turns page count back into the main cost driver.
            </>,
            <>
              <strong>Custom field sprawl.</strong> Forty Advanced Custom Fields groups across
              twelve post types is a mapping exercise before it is a build.
            </>,
            <>
              <strong>No agreed design.</strong> If the migration is also a redesign, you are paying
              for two projects and the review cycles multiply. Migrate first, redesign after.
            </>,
          ]}
        />

        <H2 id="what-you-can-cut">What you can safely cut</H2>

        <P>
          If the quote is over budget, some of it is genuinely optional.
        </P>

        <P>
          Thin archive pages usually are. Tag archives, author pages and date archives that Yoast
          already marked noindex do not need rebuilding. Delete them and redirect the handful with
          links pointing at them.
        </P>

        <P>
          Old content is another. If four hundred posts include a hundred and fifty that have had no
          traffic in two years, migrating them costs money and earns nothing. Redirect them to the
          closest relevant page and cut the scope.
        </P>

        <P>
          Comments, if nobody has left one since 2021. Site search, if your analytics say almost
          nobody uses it.
        </P>

        <P>What I would not cut, at any budget:</P>

        <UL
          items={[
            'The redirect map. This is the whole reason a migration is risky.',
            'Metadata and schema. Invisible until your rankings move.',
            'Testing on a real phone. Most of your traffic is on one.',
            'Documentation and handover. Cutting it saves days and costs you your independence.',
          ]}
        />

        <H2 id="red-flags">Quotes that should worry you</H2>

        <P>
          Whoever you hire, including me, apply the same test. A quote should tell you what you are
          buying.
        </P>

        <OL
          items={[
            <>
              <strong>One number and no line items.</strong> If nobody will break it down, nobody
              has thought it through, and the change requests are coming.
            </>,
            <>
              <strong>No mention of redirects.</strong> The most important item in the project.
              Its absence tells you the quote is about building a website, not moving one.
            </>,
            <>
              <strong>A number given before anyone looked at the site.</strong> Reasonable to give a
              range on a call. Not reasonable to commit to a fixed price without an audit.
            </>,
            <>
              <strong>No contingency and no change process.</strong> Both of you will need one.
              Better to agree it now than to argue in week four.
            </>,
            <>
              <strong>Nobody asks who owns the repository.</strong> Ask early. The answer should be
              you.
            </>,
          ]}
        />

        <ReadNext
          slug="wordpress-to-nextjs-migration-timeline"
          title="How long a WordPress to Next.js migration actually takes"
        />

        <P>
          Cost and schedule move together, because most of the price is somebody&apos;s time. If the
          quote and the timeline do not agree with each other, one of them is wrong.
        </P>

        <P>
          Before you commission anything, run the checks. They will tell you whether the person
          quoting knows what the job involves.
        </P>

        <ReadNext
          slug="wordpress-to-nextjs-migration-checklist"
          title="A WordPress to Next.js migration checklist you can hand to a developer"
        />

        <P>
          I do this work. Send me the URL and you will get the line items and a fixed number back,
          or an honest recommendation to stay on WordPress and make it faster instead, which
          happens more often than you might expect. The{' '}
          <Link href="/services/wordpress-to-nextjs">migration page</Link> covers how it runs, and{' '}
          <Link href="/contact">the contact form</Link> is the fastest way to start.
        </P>

        <H2 id="resources">Resources</H2>

        <Resources
          items={[
            {
              label: 'WP-CLI command reference',
              href: 'https://developer.wordpress.org/cli/commands/',
              note: 'Every command used above, including post list, post-type list and plugin list.',
            },
            {
              label: 'Google: site moves with URL changes',
              href: 'https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes',
              note: 'The official guidance the redirect line item exists to satisfy.',
            },
            {
              label: 'WordPress sitemaps',
              href: 'https://developer.wordpress.org/reference/classes/wp_sitemaps/',
              note: 'How the core sitemap is structured, which is what the URL count script reads.',
            },
            {
              label: 'Next.js App Router docs',
              href: 'https://nextjs.org/docs/app',
              note: 'What the template build line item is actually building against.',
            },
            {
              label: 'Search Console performance report',
              href: 'https://support.google.com/webmasters/answer/7576553',
              note: 'Where to export the URLs that earn traffic before you scope the redirect map.',
            },
          ]}
        />
      </ArticleLayout>
    </>
  );
}
