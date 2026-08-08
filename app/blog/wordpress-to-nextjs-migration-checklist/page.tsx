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
  Checklist,
  ReadNext,
  Resources,
} from '@/app/components/blog/Prose';

const post = getPost('wordpress-to-nextjs-migration-checklist')!;

export const metadata: Metadata = {
  title: post.title,
  description: post.summary,
  alternates: { canonical: `${site.url}/blog/${post.slug}` },
  keywords: [
    'WordPress to Next.js migration checklist',
    'website migration checklist SEO',
    'Next.js launch checklist',
    'site migration pre launch checks',
    'WordPress migration steps',
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
        <Lede>Print it, send it, tick it off. Nothing here is optional.</Lede>

        <P>
          Migrations do not fail on the framework. They fail because somebody skipped a step that
          looked administrative, and then nobody noticed for six weeks because the site looked
          fine the whole time.
        </P>

        <P>
          Use this on whoever does the work, including me. If a developer cannot answer these, you
          have learned something worth knowing before you pay them.
        </P>

        <Takeaways
          items={[
            'Every check here maps to a real way migrations lose traffic. None of it is ceremony.',
            'The URL inventory has to come from three sources, because your sitemap alone is missing pages that still earn traffic.',
            'Test redirects on staging before DNS moves. Testing after is not testing.',
            'Keep redirects in place for at least a year. Google needs to see them repeatedly.',
            'The first fortnight after launch is part of the project, not a favour afterwards.',
          ]}
        />

        <H2 id="before-you-start">Before anyone writes code</H2>

        <P>
          Everything in this block is your job, not the developer&apos;s, and every item left undone
          becomes a delay in week three.
        </P>

        <Checklist
          title="Access and decisions"
          items={[
            'Hosting login, DNS access, domain registrar login, all handed over in a password manager.',
            'Search Console verified and access granted to whoever is doing the work.',
            'Analytics access granted, with the property and view named explicitly.',
            'One person named as the decision maker, with authority to approve deleting a page.',
            'A full database and file backup taken, and confirmed to restore.',
            'Staging environment available, on a subdomain that is blocked from indexing.',
            'Agreed in writing that the design is frozen and this project is a migration, not a redesign.',
          ]}
        />

        <Checklist
          title="Inventory"
          items={[
            'Every active plugin listed, each marked replace, drop or keep.',
            'Every custom post type and field group listed.',
            'Every distinct page template counted, because this drives the build cost more than page count.',
            'Content audit done: which pages earn traffic, which are dead, which get deleted.',
            'Any page under legal or regulatory obligation flagged so it never gets deleted.',
          ]}
        />

        <Note title="The content audit is the one people skip">
          <P>
            Doing it before the project starts is worth more than any other preparation. Deciding
            what to delete is slow, it is political, and it blocks the routing work. Arrive with the
            list and you take a week off the schedule.
          </P>
        </Note>

        <H2 id="freeze-the-urls">Freeze the URLs</H2>

        <P>
          This is the step that protects your rankings, so it gets its own block.
        </P>

        <P>
          Pull the URL list from three places, not one. Your sitemap knows what you think you
          publish. Search Console knows what Google indexed. Server logs know what still gets
          requested, including pages that fell out of the sitemap years ago and still earn traffic.
        </P>

        <Code filename="terminal" lang="bash">{`# 1. From the sitemap
curl -s https://example.com/wp-sitemap.xml \\
  | grep -oE '<loc>[^<]+</loc>' | sed 's/<[^>]*>//g' \\
  | while read -r m; do curl -s "$m" | grep -oE '<loc>[^<]+</loc>'; done \\
  | sed 's/<[^>]*>//g' | sort -u > urls-sitemap.txt

# 2. From Search Console: export the Pages report, then take column one
awk -F',' 'NR>1 {print $1}' search-console-pages.csv | sort -u > urls-gsc.txt

# 3. From the access log: anything that returned a 200 in the last 90 days
awk '$9 == 200 {print $7}' access.log | sort -u > urls-logs.txt

# The union is what the redirect map has to cover
cat urls-*.txt | sort -u > urls-all.txt
wc -l < urls-all.txt

# And the interesting part: what the logs know that the sitemap does not
comm -13 urls-sitemap.txt urls-logs.txt | head -40`}</Code>

        <P>
          That last command is the one that earns its keep. It usually returns something somebody
          forgot about.
        </P>

        <Checklist
          title="Routing"
          items={[
            'URL list built from sitemap, Search Console and server logs, then merged and deduplicated.',
            'Every old URL mapped to a new one, or explicitly marked for deletion with a reason.',
            'Redirects are 301 or 308, permanent rather than temporary.',
            'No redirect chains. Old URL goes to final URL in one hop, not through two others.',
            'Trailing slash behaviour decided and applied consistently across the whole site.',
            'Query string URLs handled, including the old style paths if permalinks ever changed.',
            'Uppercase and mixed case variants covered if the old server was case insensitive.',
            'Paginated archive URLs mapped, not just the first page.',
          ]}
        />

        <H2 id="while-building">While the build runs</H2>

        <Checklist
          title="Content and templates"
          items={[
            'Templates built against real content, never placeholder text, which hides layout problems.',
            'Images carried across with alt text intact, not regenerated empty.',
            'Internal links inside post bodies updated to the new paths.',
            'Category and tag pages rebuilt or deliberately dropped with redirects.',
            'Author pages handled, since these are often noindex and do not need rebuilding.',
            'Any shortcodes in post content either rendered or stripped, with a decision recorded.',
          ]}
        />

        <Checklist
          title="Metadata"
          items={[
            'Titles carried across, with the site name appearing exactly once rather than twice.',
            'Meta descriptions carried across per page.',
            'Canonical tags pointing at the new domain, one per page, no duplicates.',
            'Robots rules preserved, so pages that were noindex stay noindex.',
            'Open Graph and Twitter card images working, with a site wide fallback for anything missing.',
            'JSON-LD rebuilt, including the breadcrumb markup your SEO plugin was emitting.',
            'Sitemap generated at the new site and pointing only at live, indexable URLs.',
            'robots.txt reviewed and pointing at the new sitemap.',
          ]}
        />

        <H2 id="pre-launch">The pre launch pass</H2>

        <P>
          Do all of this on staging while the live site is still serving. This is the last cheap
          moment to find a problem.
        </P>

        <Checklist
          title="Verify on staging"
          items={[
            'Every redirect tested automatically, with the failures fixed and the test rerun until clean.',
            'Every meta tag diffed against the live site, with each difference explained out loud.',
            'Staging blocked from indexing, and confirmed blocked before anyone shares the link.',
            'Forms submitted end to end, with the email confirmed as arriving.',
            'Site search working, if you are keeping it.',
            'Analytics firing, with the property confirmed as the right one.',
            '404 page returning an actual 404 status, not a 200 with an error message on it.',
            'Tested on a real mid range phone, not a resized desktop window.',
            'Tested with a screen reader or at minimum a keyboard, tabbing the whole way through.',
            'Core Web Vitals checked on the templates that matter most.',
          ]}
        />

        <Note title="The 404 check catches a real bug">
          <P>
            A page that renders an error message but returns HTTP 200 is a soft 404. Google indexes
            it as a real page, and you end up with hundreds of near identical thin pages in the
            index. Check the status code, not the words on the screen.
          </P>
        </Note>

        <Code filename="terminal" lang="bash">{`# Should print 404. If it prints 200, you have a soft 404 problem.
curl -s -o /dev/null -w '%{http_code}\\n' https://staging.example.com/definitely-not-a-real-page

# Confirm staging is genuinely blocked before you send the link to anyone
curl -s https://staging.example.com/robots.txt
curl -s https://staging.example.com/ | grep -i 'name="robots"'`}</Code>

        <H2 id="launch-day">Launch day</H2>

        <Checklist
          title="The switch"
          items={[
            'Launching on a Tuesday or Wednesday morning, never a Friday and never before a campaign.',
            'DNS TTL lowered a day or two beforehand so a rollback propagates quickly.',
            'A rollback plan written down, with the person who can execute it available.',
            'SSL certificate valid on the new host before DNS points at it.',
            'The old site left running until DNS has fully propagated.',
            'Staging noindex rules removed from production, so the live site is actually indexable.',
            'A crawl run against production immediately after the switch to catch broken links.',
            'New sitemap submitted in Search Console.',
            'Change of address tool used, but only if the domain itself changed.',
          ]}
        />

        <P>
          That second to last one about noindex is the single most expensive mistake in this article.
          Shipping a staging noindex rule to production hides your entire site from search. It has
          happened to sites much larger than yours.
        </P>

        <Code filename="terminal" lang="bash">{`# Run this the moment DNS moves. Both should come back empty.
curl -s https://example.com/ | grep -i 'noindex'
curl -s https://example.com/robots.txt | grep -i 'Disallow: /$'`}</Code>

        <H2 id="first-month">The first month after</H2>

        <P>
          The project is not finished when DNS moves. Crawl errors and coverage changes surface over
          days and weeks, which is why a fortnight of watching belongs inside the scope rather than
          being a favour afterwards.
        </P>

        <Checklist
          title="Week one"
          items={[
            'Search Console coverage checked daily for new errors.',
            'Server logs watched for 404s coming from real traffic, then patched into the redirect map.',
            'Analytics compared against the same period last month, allowing for a short dip.',
            'Any page that lost its ranking checked individually rather than panicking about the total.',
          ]}
        />

        <Checklist
          title="Weeks two to four"
          items={[
            'Coverage checked weekly instead of daily.',
            'Core Web Vitals field data reviewed, once enough real visits have accumulated.',
            'Internal links audited for anything still pointing at an old path.',
            'Backlinks spot checked, and the highest value ones confirmed as landing correctly.',
            'Redirects confirmed as staying in place for at least a year.',
          ]}
        />

        <Note title="Expect a dip">
          <P>
            A small drop in the first two weeks is normal while Google recrawls and reassigns
            signals. What is not normal is a drop that keeps going after three weeks, or one
            concentrated on a handful of pages. That pattern points at a specific broken redirect
            rather than a general settling period.
          </P>
        </Note>

        <H2 id="handing-it-over">Handing this to a developer</H2>

        <P>
          If you are commissioning rather than building, this is the part to use as a filter. Send
          the whole article and ask four questions.
        </P>

        <UL
          items={[
            <>
              Which of these do you do as standard, and which are extra? A straight answer here
              tells you what is really in the quote.
            </>,
            <>
              How do you test the redirect map? If the answer is by hand or by spot checking, the
              map will have holes.
            </>,
            <>
              What happens in the two weeks after launch? If the engagement ends at DNS, you are
              buying a build rather than a migration.
            </>,
            <>
              Who owns the repository, and can I hire someone else to take it over next year? The
              answer should be you, and yes.
            </>,
          ]}
        />

        <P>
          You do not need a developer who says yes to everything. You need one who tells you which
          items do not apply to your site and why.
        </P>

        <ReadNext
          slug="wordpress-to-nextjs-migration"
          title="Moving a WordPress site to Next.js without losing your rankings"
        />

        <P>
          The method behind the routing and metadata checks is written up in full there, with the
          scripts. If you want to know what this costs and how long it takes before you commit,
          those have their own pieces.
        </P>

        <ReadNext
          slug="wordpress-to-nextjs-migration-cost"
          title="What a WordPress to Next.js migration costs, line by line"
        />

        <P>
          I work through exactly this list on every migration I take, and the redirect and metadata
          checks run automatically rather than by eye. If you would rather hand the whole thing over,
          the <Link href="/services/wordpress-to-nextjs">migration page</Link> covers scope and
          timelines, and <Link href="/contact">the contact form</Link> gets you a straight answer on
          whether your site is worth moving at all.
        </P>

        <H2 id="resources">Resources</H2>

        <Resources
          items={[
            {
              label: 'Google: site moves with URL changes',
              href: 'https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes',
              note: 'The official checklist this one expands on, including how long to keep redirects.',
            },
            {
              label: 'Google: soft 404 errors',
              href: 'https://developers.google.com/search/docs/crawling-indexing/javascript/fix-search-javascript',
              note: 'Why a 200 status on an error page causes indexing problems.',
            },
            {
              label: 'Search Console Change of Address',
              href: 'https://support.google.com/webmasters/answer/9370220',
              note: 'Only relevant when the domain changes, not for a rebuild on the same domain.',
            },
            {
              label: 'Search Console coverage report',
              href: 'https://support.google.com/webmasters/answer/7440203',
              note: 'What you are watching daily in the first week after launch.',
            },
            {
              label: 'web.dev: Core Web Vitals',
              href: 'https://web.dev/articles/vitals',
              note: 'The field data you review once real visits accumulate.',
            },
          ]}
        />
      </ArticleLayout>
    </>
  );
}
