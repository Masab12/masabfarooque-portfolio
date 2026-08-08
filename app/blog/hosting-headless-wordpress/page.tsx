import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/app/data/site';
import { getPost } from '@/app/data/posts';
import ArticleLayout, { articleSchema } from '@/app/components/blog/ArticleLayout';
import { CostRange } from '@/app/components/blog/Charts';
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

const post = getPost('hosting-headless-wordpress')!;

export const metadata: Metadata = {
  title: post.title,
  description: post.summary,
  alternates: { canonical: `${site.url}/blog/${post.slug}` },
  keywords: [
    'headless WordPress hosting',
    'headless WordPress cost',
    'host WordPress backend',
    'WordPress VPS for headless',
    'headless CMS hosting price',
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
          Your CMS stops being a website. Stop paying for it like one.
        </Lede>

        <P>
          Most people go headless and keep the same hosting plan they had before. That plan was
          sized for public traffic. Your WordPress install no longer has any, because visitors hit
          static files on a CDN and never reach PHP at all.
        </P>

        <P>
          You are now paying a traffic bill for a machine that talks to two things: your build
          process and a handful of editors.
        </P>

        <Takeaways
          items={[
            'Traffic stops being the sizing input. Build frequency and editor count take over.',
            'A small VPS handles most headless installs comfortably, because concurrency collapses to near zero.',
            'Move media to object storage early. It is the one thing that still scales with audience.',
            'Managed WordPress hosting keeps making sense if nobody on your side wants to patch a server.',
            'Budget for the boring parts: backups, staging, and the build minutes on your front end host.',
          ]}
        />

        <H2 id="what-changes">What changes when you go headless</H2>

        <P>
          A normal WordPress site runs PHP and hits MySQL on every request. Ten thousand visitors
          means ten thousand round trips through that stack, which is why hosting plans are priced
          by visits and why caching plugins exist at all.
        </P>

        <P>Take the front end away and the shape of the load changes completely.</P>

        <Table
          head={['', 'Traditional WordPress', 'Headless WordPress']}
          rows={[
            ['Who calls it', 'Every visitor', 'Your build process and your editors'],
            ['Requests per day', 'Scales with traffic', 'Roughly fixed, tens to low hundreds'],
            ['Peak concurrency', 'Whatever a busy hour brings', 'One build, occasionally two'],
            ['Uptime need', 'Total. Down means down.', 'High, but a blip only delays publishing'],
            ['What sizing depends on', 'Visits and plugins', 'Post count and build frequency'],
          ]}
          caption="The uptime row is the one that saves you money. If the CMS goes down for ten minutes, your public site keeps serving, because it is static files that were built earlier."
        />

        <P>
          That last row deserves a moment. Your CMS falling over is now an editorial inconvenience
          rather than an outage. Nobody browsing your site notices. You can drop a tier of
          redundancy you were previously right to pay for.
        </P>

        <H2 id="the-options">The options, and what they cost</H2>

        <CostRange
          rows={[
            { label: 'Shared hosting', low: 4, high: 15 },
            { label: 'Small VPS', low: 6, high: 24 },
            { label: 'Container platform', low: 10, high: 40 },
            { label: 'Managed WordPress', low: 20, high: 100 },
            { label: 'Media on object storage', low: 1, high: 12 },
          ]}
          unit="$"
          label="Indicative monthly cost ranges for hosting a headless WordPress backend"
          caption={
            <>
              Indicative list prices in USD per month at the time of writing, for an install
              serving a build process rather than public traffic. Providers change pricing often,
              so treat these as the shape of the decision and check current rates before you
              commit. The bottom row is additive: you pair it with one of the options above it.
            </>
          }
        />

        <H3>Shared hosting</H3>

        <P>
          Cheap, and better suited to headless than it ever was to a live site. The usual complaint
          about shared hosting is that your neighbours steal your CPU during traffic spikes. You no
          longer have traffic spikes.
        </P>

        <P>
          What you give up is control. Many shared hosts block outbound HTTP requests or run
          aggressive page caches that interfere with REST responses. Check that{' '}
          <code>wp_remote_post</code> works before you commit, because your publish webhook depends
          on it.
        </P>

        <H3>A small VPS</H3>

        <P>
          This is where I land most often. You get root, predictable resources, and a bill that does
          not move. Two gigabytes of RAM runs WordPress, MySQL and a web server with room to spare
          when the only caller is a build.
        </P>

        <P>
          The cost is your attention. Somebody has to apply security updates, renew certificates and
          watch the disk fill. If that somebody does not exist on your side, pick managed hosting
          and stop reading this section.
        </P>

        <H3>Managed WordPress hosting</H3>

        <P>
          More expensive, and still frequently the right answer. You are buying patching, backups,
          staging and a support line. For a business with no technical staff, that is worth more
          than the difference in price.
        </P>

        <P>
          One thing to watch: some managed hosts price by monthly visits. Ask how they count a
          headless install, because your visit count is about to fall through the floor and you
          should be paying the lowest tier, not the one you were on.
        </P>

        <P>
          Managed plans also bundle things a headless install stops needing. A page cache is the
          clearest one. It exists to stop PHP rendering the same HTML repeatedly for visitors, and
          you no longer have visitors hitting PHP. Worse, an aggressive page cache sometimes caches
          REST responses too, which means your build reads yesterday&apos;s content and nobody can
          work out why.
        </P>

        <P>Four questions worth asking a managed host before you commit to a headless build:</P>

        <UL
          items={[
            <>
              Can you exclude <code>/wp-json/</code> from the page cache? If the answer is no, your
              publish webhook will fight the cache forever.
            </>,
            <>
              Are outbound HTTP requests allowed? <code>wp_remote_post</code> has to reach your
              front end host or on demand revalidation never fires.
            </>,
            <>
              How is the plan priced, by visits or by resources? Visit pricing should now put you on
              the cheapest tier.
            </>,
            <>
              Is object caching available? That one still helps, because it speeds up the database
              queries your build makes.
            </>,
          ]}
        />

        <Code filename="terminal" lang="bash">{`# Confirm the REST API is not being served from a page cache.
# Run it twice and compare: the timestamps and cache headers should move.
curl -sI "https://cms.example.com/wp-json/wp/v2/posts?per_page=1" \\
  | grep -iE 'x-cache|cf-cache-status|age:|cache-control'

# Confirm the install can actually reach the outside world
wp eval 'var_dump( wp_remote_get( "https://example.com/api/health" ) );'`}</Code>

        <H3>A container platform</H3>

        <P>
          WordPress in a container, on something that handles the orchestration for you. Clean
          deploys, easy rollback, and configuration that lives in a file rather than in somebody's
          memory.
        </P>

        <P>
          It suits teams already running containers. If this would be your only one, the operational
          overhead outweighs what you gain.
        </P>

        <H2 id="sizing-the-box">Sizing the box</H2>

        <P>
          Forget visitor counts. Two things decide your size now: how many posts a full build has to
          read, and how often that build runs.
        </P>

        <P>
          A build with a thousand posts requesting a hundred at a time makes ten requests. Each one
          returns a few hundred kilobytes of JSON. The whole exercise finishes in seconds and never
          troubles a modest server.
        </P>

        <Code filename="terminal" lang="bash">{`# Time a realistic build fetch against your current install
time curl -s -o /dev/null \\
  "https://cms.example.com/wp-json/wp/v2/posts?per_page=100&_fields=slug,title,content,date"

# Watch memory while it runs, in another shell
watch -n 1 'free -m'`}</Code>

        <P>
          Run that on your existing hosting before you move anything. If a hundred posts come back
          in under two seconds and memory barely moves, you already know a small box will do.
        </P>

        <Note title="The one case that needs more">
          <P>
            Very large sites change this. Past roughly ten thousand posts, a full rebuild starts
            hammering the API for minutes at a time, and a slow database will show. Fix that with
            incremental builds rather than a bigger server: fetch only what changed since the last
            build, and let on demand revalidation handle the rest.
          </P>
        </Note>

        <H2 id="hidden-costs">The costs people forget</H2>

        <UL
          items={[
            <>
              <strong>Media bandwidth.</strong> Images still get served to real visitors. If they
              live in <code>wp-content/uploads</code> on your origin, every image request hits the
              server you just downsized.
            </>,
            <>
              <strong>Backups.</strong> Often bundled with managed hosting and never included on a
              bare VPS. Budget a few dollars a month for automated, offsite, tested backups.
            </>,
            <>
              <strong>Staging.</strong> You want somewhere to test a plugin update before it breaks
              the API your build depends on. Some hosts include it. Others charge for a second
              environment.
            </>,
            <>
              <strong>Build minutes.</strong> Your front end host bills these. Rebuild the entire
              site on every typo fix and the number climbs quietly.
            </>,
            <>
              <strong>Plugin licences.</strong> Advanced Custom Fields Pro, a Yoast add-on, whatever
              else the editorial workflow relies on. These follow you into headless.
            </>,
          ]}
        />

        <P>
          Media is the big one, and the easiest to fix. Move uploads to object storage with a CDN in
          front and your origin stops serving files entirely.
        </P>

        <Code filename="wp-config.php" lang="php">{`// Point WordPress at the CDN so every stored URL is already correct.
// Do this before you migrate media, or you will rewrite thousands of rows later.
define( 'WP_CONTENT_URL', 'https://media.example.com/wp-content' );
define( 'UPLOADS', 'wp-content/uploads' );`}</Code>

        <P>
          Order matters here and it catches people out. Set the constant first, then move the files,
          then rewrite the URLs already sitting in post content. Doing it the other way round means
          running a second search and replace across thousands of rows to fix what you just broke.
        </P>

        <Code filename="terminal" lang="bash">{`# 1. Copy the uploads directory to object storage
aws s3 sync wp-content/uploads/ s3://example-media/wp-content/uploads/ \\
  --cache-control "public, max-age=31536000, immutable"

# 2. Rewrite the URLs already embedded in post content.
#    Always dry run first and read what it plans to change.
wp search-replace 'https://cms.example.com/wp-content/uploads' \\
                  'https://media.example.com/wp-content/uploads' \\
                  --all-tables --dry-run

# 3. Run it for real, skipping the columns that should never be touched
wp search-replace 'https://cms.example.com/wp-content/uploads' \\
                  'https://media.example.com/wp-content/uploads' \\
                  --all-tables --skip-columns=guid`}</Code>

        <P>
          Skip <code>guid</code> deliberately. WordPress uses it as an internal identifier for feed
          readers rather than as a link, and rewriting it makes old posts look brand new to anything
          subscribed.
        </P>

        <P>
          One more piece on the Next.js side. Serving images from a different hostname means telling
          the image optimiser it is allowed to fetch from there, otherwise every image throws at
          build time.
        </P>

        <Code filename="next.config.ts" lang="typescript">{`const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'media.example.com', pathname: '/wp-content/uploads/**' },
    ],
  },
};`}</Code>

        <P>
          Long cache headers on media are safe because WordPress appends a size suffix to the
          filename whenever an image is regenerated. The URL changes, so the cache never serves a
          stale file. That is why the sync above sets a year and marks it immutable.
        </P>

        <H2 id="worked-example">A worked example</H2>

        <P>
          A marketing site I moved last year. Around four hundred posts, three editors, publishing
          most weekdays.
        </P>

        <Table
          head={['Line item', 'Before', 'After']}
          rows={[
            ['WordPress hosting', 'Managed plan sized for traffic', 'Small VPS, 2 GB RAM'],
            ['Media', 'Served from origin', 'Object storage behind a CDN'],
            ['Front end', 'None, WordPress served it', 'Static hosting, free tier'],
            ['Backups', 'Included in the managed plan', 'Separate automated backups'],
            ['Staging', 'Included', 'Second small VPS, off most of the time'],
          ]}
          caption="The shape of one real migration. Exact figures depend on your providers and region, so I have described the line items rather than quoting totals that would not transfer to your situation."
        />

        <P>
          The total came down. What mattered more to them was that the bill stopped moving with
          traffic, because a busy month no longer touched the origin at all.
        </P>

        <H2 id="keeping-it-cheap">Keeping the bill predictable</H2>

        <P>Four habits, in the order I would apply them.</P>

        <P>
          Cache API responses in your build. Next.js does this for you when you set{' '}
          <code>revalidate</code>, and it means a rebuild does not refetch content that has not
          changed.
        </P>

        <Code filename="lib/wp.ts" lang="typescript">{`// Tagged fetches: the webhook can invalidate exactly what changed
const res = await fetch(WP + '/wp-json/wp/v2/posts?per_page=100', {
  next: { revalidate: 3600, tags: ['posts'] },
});`}</Code>

        <P>
          Rebuild pages, not sites. A publish webhook that revalidates one path costs you almost
          nothing. A full deploy on every edit costs you build minutes and makes editors wait.
        </P>

        <P>
          Keep media off the origin, which I covered above. Then turn off what you are not using:
          cron jobs from plugins that assume a public front end, search indexing, comment
          processing, anything scheduled that exists to serve visitors you no longer have.
        </P>

        <Code filename="wp-config.php" lang="php">{`// Stop WordPress running cron on request. Use a real system cron instead,
// so a build request never triggers scheduled work it should not be paying for.
define( 'DISABLE_WP_CRON', true );`}</Code>

        <Code filename="crontab" lang="bash">{`# Once every fifteen minutes is plenty for a headless install
*/15 * * * * cd /var/www/cms && wp cron event run --due-now --quiet`}</Code>

        <H2 id="what-i-pick">What I usually pick</H2>

        <P>
          If the client has someone technical: a small VPS, media on object storage, automated
          backups, a staging box that stays powered down between releases. It is the cheapest option
          that gives you full control, and control is what stops surprises.
        </P>

        <P>
          If the client has nobody technical: managed WordPress on the lowest tier that fits, media
          on object storage anyway. You pay more and you buy the thing you actually need, which is
          not having to think about it.
        </P>

        <P>
          I would not start on shared hosting. It works, and the money you save is small enough that
          the first blocked outbound request wipes out the gain.
        </P>

        <P>
          Picking the box is the easy part once the architecture is settled. If you want the whole
          thing handled, from the migration through to the headless setup and where it runs, that is{' '}
          <Link href="/services/wordpress-to-nextjs">what I do</Link>.
        </P>

        <ReadNext
          slug="wordpress-as-headless-cms"
          title="Keep the WordPress editor, drop the WordPress front end"
        />

        <P>
          Hosting is the last decision, not the first. Get the architecture right, confirm your
          editors can still work the way they expect, then size the box around what the build
          actually does.
        </P>

        <ReadNext
          slug="headless-cms-vs-website-builders"
          title="Why a headless CMS beats building on WordPress or Wix"
        />

        <H2 id="resources">Resources</H2>

        <Resources
          items={[
            {
              label: 'WordPress: hardening WordPress',
              href: 'https://developer.wordpress.org/advanced-administration/security/hardening/',
              note: 'Baseline server and install security, which matters more once the CMS is infrastructure.',
            },
            {
              label: 'WordPress: editing wp-config.php',
              href: 'https://developer.wordpress.org/advanced-administration/wordpress/wp-config/',
              note: 'Every constant used here, including DISABLE_WP_CRON and the content URL settings.',
            },
            {
              label: 'WP-CLI cron command',
              href: 'https://developer.wordpress.org/cli/commands/cron/',
              note: 'Running scheduled events from system cron instead of on page requests.',
            },
            {
              label: 'Next.js: incremental static regeneration',
              href: 'https://nextjs.org/docs/app/guides/incremental-static-regeneration',
              note: 'Rebuilding single pages on demand rather than deploying the whole site.',
            },
            {
              label: 'MDN: HTTP caching',
              href: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching',
              note: 'The header behaviour your CDN relies on when it serves media from object storage.',
            },
          ]}
        />
      </ArticleLayout>
    </>
  );
}
