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
  Checklist,
  Table,
  ReadNext,
  Resources,
} from '@/app/components/blog/Prose';

const post = getPost('wordpress-plugins-in-nextjs')!;

export const metadata: Metadata = {
  title: post.title,
  description: post.summary,
  alternates: { canonical: `${site.url}/blog/${post.slug}` },
  keywords: [
    'WordPress plugins in Next.js',
    'Next.js alternative to WordPress plugins',
    'replace Contact Form 7 in Next.js',
    'Yoast alternative Next.js',
    'WP Rocket Next.js equivalent',
    'migrate WordPress plugins to Next.js',
    'headless WordPress plugin compatibility',
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
          Twenty eight active plugins is not twenty eight problems. Most of them stop existing.
        </Lede>

        <P>
          This is the question that stalls migrations. Somebody opens the plugins screen, counts
          thirty one active rows, and decides the project is impossible before anyone has looked at
          what those rows are doing.
        </P>

        <P>
          They are not doing thirty one things. In every audit I have run, the list breaks into four
          piles, one of them enormous, and only the smallest pile costs real money. Sorting the list
          takes about twenty minutes and it is the single most useful thing you can do before asking
          for a quote.
        </P>

        <Takeaways
          items={[
            'Roughly half of a typical plugin list exists to make PHP run less often or to fix what another plugin broke. Those jobs do not exist on a statically rendered site.',
            'A second group becomes ordinary code: a form handler, a script tag, a cookie banner. Small, boring, and yours.',
            'The pile that costs money is short. Commerce, memberships, courses, bookings and serious multilingual work.',
            'Structured content plugins are not replaced at all. If WordPress stays as the headless CMS, they stay exactly where they are.',
            'Count what each plugin writes to the database, not how many plugins there are. Read-only plugins are cheap to leave behind. Ones that own data are the project.',
          ]}
        />

        <H2 id="sort-before-you-price">Sort the list before you price it</H2>

        <P>
          One command gets you the list in a form somebody can actually quote against. Run it over
          SSH, or use the plugin export in your hosting panel if WP-CLI is not available.
        </P>

        <Code filename="terminal" lang="bash">{`# The list itself, which is what a developer needs to scope the work
wp plugin list --status=active --fields=name,title,version

# Anything that registered its own tables usually owns data you have to move
wp db query "SHOW TABLES" --skip-column-names | grep -v '^wp_\\(post\\|term\\|comment\\|option\\|user\\|link\\)'

# Custom post types, which tells you which plugins shaped your content model
wp post-type list --fields=name,label,public`}</Code>

        <P>
          The second command is the one people skip and the one that matters. A plugin that only
          reads and renders is cheap to walk away from. A plugin that created its own tables owns
          data, and that data has to go somewhere before you can turn it off.
        </P>

        <H2 id="four-piles">The four piles</H2>

        <P>Every list I have sorted lands in these four, in roughly this proportion.</P>

        <EffortSplit
          parts={[
            { name: 'Gone entirely', percent: 45 },
            { name: 'Becomes code', percent: 30 },
            { name: 'Becomes a service', percent: 15 },
            { name: 'Stays a project', percent: 10 },
          ]}
          label="How a typical WordPress plugin list divides across four outcomes after a move to Next.js"
          caption="My working split from the audits I have run, not a survey. It moves with the site, and it moves a long way if you run a shop or a membership. Use it to set expectations before the audit, not instead of one."
        />

        <P>
          The first pile is the one nobody believes until they see it. Something close to half of a
          normal plugin list exists to make PHP run less often, to compress something WordPress
          should have compressed, or to undo damage another plugin did. None of those jobs survive
          the move, because none of them exist on a site that was rendered before the visitor
          arrived.
        </P>

        <H2 id="the-mapping">What replaces what</H2>

        <P>
          Three tables, one per pile that matters. The fourth pile gets its own section further
          down, because it deserves more than a row.
        </P>

        <H3>Pile one: gone entirely</H3>

        <Table
          head={['What you are running', 'What it was doing', 'After the move']}
          rows={[
            [
              'WP Rocket, W3 Total Cache, LiteSpeed Cache',
              'Making PHP run less often by storing the output',
              'Nothing. A pre-rendered route has no PHP to skip.',
            ],
            [
              'Smush, ShortPixel, Imagify',
              'Resizing and compressing uploads after the fact',
              'The image component. Sizes and modern formats are produced on demand.',
            ],
            [
              'Autoptimize, Asset CleanUp, Perfmatters',
              'Merging, deferring and unloading CSS and JavaScript',
              'The bundler. Code is split per route by default and unused code never ships.',
            ],
            [
              'Yoast sitemap, XML Sitemap Generator',
              'Listing URLs for crawlers',
              'app/sitemap.ts, generated from the same data the pages render from.',
            ],
            [
              'Redirection',
              'Storing 301s in a database table',
              'redirects() in the config for the static map, proxy.ts for anything computed.',
            ],
            [
              'Lazy loading plugins',
              'Deferring offscreen images',
              'Browser default, and the image component sets it for you.',
            ],
            [
              'Really Simple SSL, Classic Editor',
              'Forcing https, and turning off the block editor',
              'The host handles one. The other has nothing to port.',
            ],
          ]}
          caption="These are not replaced by an equivalent. The job itself disappears, which is why the plugin count on a migrated site is usually zero rather than small."
        />

        <H3>Pile two: becomes code you own</H3>

        <Table
          head={['What you are running', 'What it was doing', 'After the move']}
          rows={[
            [
              'Contact Form 7, WPForms, Gravity Forms',
              'Markup, validation, delivery, spam filtering and storage',
              'A route handler and an email API. Storage is a separate decision, covered below.',
            ],
            [
              'Akismet',
              'Filtering spam submissions',
              'A honeypot field and a rate limit, with a challenge added only if it is still bad.',
            ],
            [
              'MonsterInsights, Site Kit',
              'Injecting an analytics snippet into the head',
              'A script component, loaded after the page is interactive.',
            ],
            [
              'Cookie Notice, CookieYes',
              'A consent banner and a cookie',
              'A component and a cookie. Roughly forty lines.',
            ],
            [
              'Breadcrumb NavXT',
              'Breadcrumb links and their structured data',
              'A component fed by the route segments, and one JSON-LD block.',
            ],
            [
              'WP Mail SMTP',
              'Making PHP mail() actually deliver',
              'The email API you were going to use for the form anyway.',
            ],
            [
              'Broken Link Checker',
              'Crawling your own site on a schedule',
              'A job in CI that fails the build, so a dead link never reaches production.',
            ],
          ]}
          caption="Each of these is a file in your repository rather than a dependency that updates itself. That is the trade: slightly more code to own, nothing installing into a live site while you sleep."
        />

        <H3>Pile three: becomes a service</H3>

        <Table
          head={['What you are running', 'What it was doing', 'After the move']}
          rows={[
            [
              'Relevanssi, SearchWP',
              'Search that is better than what core does',
              'An index. Pagefind is enough for a static site, Typesense or Algolia above that.',
            ],
            [
              'Disqus, native comments',
              'Comment storage and moderation',
              'A hosted comment service, or keep them in WordPress and read them over the API.',
            ],
            [
              'Form plugins that store entries',
              'Keeping a record of every submission',
              'A database table you own, or a form service. This is the part people forget to budget.',
            ],
            [
              'Popup and newsletter plugins',
              'Capturing addresses and pushing them to a list',
              'A direct call to your email provider from the same route handler that takes the form.',
            ],
          ]}
          caption="These have a cost per month rather than a cost per hour. Add it up before the migration rather than after, because a handful of small subscriptions can outweigh what you saved on hosting."
        />

        <H2 id="forms">Forms, in full</H2>

        <P>
          Forms are where most of the anxiety sits, so they get a section rather than a row in a
          table. A form plugin is doing four separate jobs and people usually only replace the
          first two.
        </P>

        <OL
          items={[
            <>
              <strong>Rendering the fields.</strong> HTML. This part is free.
            </>,
            <>
              <strong>Validating what came in.</strong> Both in the browser as a courtesy and on the
              server as a control, because anything can post to your endpoint.
            </>,
            <>
              <strong>Delivering it somewhere.</strong> An email, usually, and increasingly a
              webhook into a CRM as well.
            </>,
            <>
              <strong>Keeping a record.</strong> The one that gets dropped. Your plugin has been
              quietly storing every submission for years, and if delivery fails on a Next.js site
              with no storage, that brief is gone.
            </>,
          ]}
        />

        <Code filename="app/api/contact/route.ts" lang="ts">{`import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

// A bot fills every field it can find. A field a human never sees is the
// cheapest spam filter there is, and it does not ask anyone to read letters.
const HONEYPOT = 'company_website';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Malformed request.' }, { status: 400 });

  if (typeof body[HONEYPOT] === 'string' && body[HONEYPOT].length > 0) {
    // Answer normally. A bot told it failed will simply try again differently.
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  // The browser already checked these. It is not a control, it is a courtesy.
  if (name.length < 2 || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(email) || message.length < 10) {
    return NextResponse.json({ error: 'Please check the form.' }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY!);
  const { error } = await resend.emails.send({
    from: 'Website <forms@example.com>',
    to: ['you@example.com'],
    replyTo: email,
    subject: \`New enquiry: \${name}\`,
    text: [\`From: \${name} <\${email}>\`, '', message].join('\\n'),
  });

  // Job four. Without this line, a failed send is a lost customer and
  // nobody finds out until they ask why you never replied.
  await recordSubmission({ name, email, message, delivered: !error });

  if (error) {
    return NextResponse.json({ error: 'Could not send. Please email us.' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}`}</Code>

        <Note title="Rate limit it before it goes live">
          <P>
            An open endpoint that sends email is an open endpoint that sends email for other people.
            A short in-memory window keyed by IP is enough for a marketing site and takes about
            fifteen lines. On anything running across several instances, put the counter somewhere
            shared instead, because a per-instance limit is not a limit.
          </P>
        </Note>

        <H2 id="seo-plugin">The SEO plugin</H2>

        <P>
          The second biggest worry, and the more reasonable one. Yoast or Rank Math is holding years
          of titles, descriptions, canonicals, robots rules, social cards and structured data.
          Losing it is how migrations lose rankings.
        </P>

        <P>
          The replacement is not a plugin, it is two files and a habit. Metadata is exported per
          route from the same data the page renders, so the two cannot drift apart.
        </P>

        <Code filename="app/blog/[slug]/page.tsx" lang="tsx">{`export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    // The value Yoast was storing, carried across rather than regenerated
    title: post.seo.title ?? post.title,
    description: post.seo.metaDesc ?? post.excerpt,
    alternates: { canonical: post.seo.canonical ?? \`https://example.com/blog/\${slug}\` },
    robots: post.seo.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: 'article',
      title: post.seo.ogTitle ?? post.title,
      description: post.seo.ogDesc ?? post.excerpt,
      publishedTime: post.date,
      images: post.seo.ogImage ? [post.seo.ogImage] : undefined,
    },
  };
}`}</Code>

        <P>
          Yoast stores all of that in postmeta under keys prefixed with an underscore, which means
          it does not come out in a normal export. It has to be pulled deliberately, mapped, and
          then diffed against the live site before launch. That is a real line item and it is the
          one I would never let anyone cut.
        </P>

        <ReadNext
          slug="yoast-metadata-to-nextjs"
          title="Keeping your Yoast SEO metadata after moving to Next.js"
        />

        <H2 id="performance-stack">The performance stack</H2>

        <P>
          Cache plugin, image plugin, minifier, lazy loader, script deferrer. On a lot of sites this
          is a third of the plugin list, and all of it disappears at once.
        </P>

        <P>
          It disappears because each one is compensating for a decision WordPress made in 2003. A
          cache plugin exists because pages are assembled per request. An image plugin exists
          because uploads are served at whatever size they were uploaded at. A minifier exists
          because every plugin enqueues its own assets independently and nobody is coordinating.
        </P>

        <P>
          Remove the per-request assembly and the compensations have nothing left to compensate
          for. Pages are rendered when content changes. Images are transformed on demand into modern
          formats at the size the layout asks for, with width and height set so nothing shifts.
          JavaScript is split per route and the code a page does not use is not in the bundle.
        </P>

        <Note title="One plugin usually survives this list">
          <P>
            If you keep WordPress as the headless CMS, keep a security plugin on it, and keep it
            behind authentication or an IP allowlist. It is no longer serving visitors, but it is
            still on the internet with an admin login, and it is still running plugin code. Quiet
            does not mean invisible.
          </P>
        </Note>

        <H2 id="the-hard-ones">The ones that are genuinely hard</H2>

        <P>
          Everything above was the cheap news. This is the pile that decides whether your migration
          is a three week job or a three month one.
        </P>

        <Table
          head={['What you are running', 'Why it is hard', 'The honest options']}
          rows={[
            [
              'WooCommerce',
              'Cart, tax, shipping, stock and payment are server side logic tied to your configuration',
              'Keep the shop on WordPress, or budget a separate project with its own timeline.',
            ],
            [
              'LearnDash, LifterLMS',
              'Courses, progress, quizzes and drip schedules are an application, not content',
              'Keep it, or accept that you are commissioning a product build.',
            ],
            [
              'MemberPress, Restrict Content Pro',
              'Gated content plus recurring billing plus every failure case in between',
              'Auth and Stripe, done properly, or leave the members area where it is.',
            ],
            [
              'WPML, Polylang',
              'Routing is easy. Storing, ordering and reviewing translations is not.',
              'Keep translation management in the CMS and handle only routing and hreflang in the front end.',
            ],
            [
              'Booking and appointment plugins',
              'Availability, conflicts, payment, reminders and cancellations',
              'A hosted booking service embedded in the page, unless bookings are the business.',
            ],
            [
              'Advanced Custom Fields, Pods',
              'This one is not a plugin so much as your content model',
              'Nothing changes if WordPress stays headless. It becomes a schema file if it does not.',
            ],
          ]}
          caption="Notice the pattern. Everything hard here writes to the database on behalf of a logged in visitor. Read-only plugins are cheap to leave behind. Ones that own a write path are the project."
        />

        <ReadNext
          slug="woocommerce-to-nextjs"
          title="Moving a WooCommerce store to Next.js, and when to leave it alone"
        />

        <P>
          There is a middle route people forget. You do not have to move everything at once. Serve
          the marketing pages, the blog and the landing pages from Next.js, where the traffic and
          the rankings are, and leave the members area or the shop on WordPress at its own path.
          Two systems, one domain, and the expensive pile stays untouched until you actually want to
          deal with it.
        </P>

        <H2 id="audit-your-list">Auditing your own list</H2>

        <P>
          Print your active plugins and put each one in a pile. The rule that decides it is a single
          question: does this plugin write data on behalf of a visitor?
        </P>

        <UL
          items={[
            <>
              <strong>No, it only renders.</strong> Pile one or two. The job either disappears or
              becomes a file. Price it in hours.
            </>,
            <>
              <strong>It writes, but only for you.</strong> Editor tools, custom fields, admin
              conveniences. These stay if WordPress stays, and become schema if it does not.
            </>,
            <>
              <strong>It writes for visitors.</strong> Orders, memberships, bookings, course
              progress, comments. Pile four. Each one is a decision, not a task.
            </>,
          ]}
        />

        <Checklist
          title="Before anyone quotes the work"
          items={[
            'Export the active plugin list with versions, not a screenshot of the admin screen.',
            'List every custom database table, and say which plugin created it.',
            'Say where form submissions currently go, and whether anybody has ever needed to look one up.',
            'Note which plugins are paid, when each renews, and what the annual total is.',
            'Flag anything that has not been updated in over a year. Those are decisions, not migrations.',
            'Name the one plugin your team would refuse to lose. There is always one, and it is better named early.',
          ]}
        />

        <P>
          Take that to whoever is quoting you. A developer who reads it and asks about the custom
          tables is reading it properly. One who quotes off the plugin count is not.
        </P>

        <ReadNext
          slug="wordpress-to-nextjs-migration-checklist"
          title="A WordPress to Next.js migration checklist you can hand to a developer"
        />

        <P>
          If you want the sorting done rather than described, send me your active plugin list and
          the site address. You will get it back in the four piles with the hard rows called out,
          and an honest note on whether the migration is worth doing at all. The{' '}
          <Link href="/services/wordpress-to-nextjs">migration service page</Link> covers how the
          work runs, the <Link href="/site-check">free site check</Link> will tell you what your
          pages are carrying right now, and{' '}
          <Link href="/contact">the contact form</Link> reaches me directly.
        </P>

        <H2 id="resources">Resources</H2>

        <Resources
          items={[
            {
              label: 'WP-CLI command reference',
              href: 'https://developer.wordpress.org/cli/commands/',
              note: 'Every command used above: plugin list, post-type list and db query.',
            },
            {
              label: 'Next.js Metadata API',
              href: 'https://nextjs.org/docs/app/getting-started/metadata-and-og-images',
              note: 'What replaces the SEO plugin, including per-route metadata and social images.',
            },
            {
              label: 'Next.js Route Handlers',
              href: 'https://nextjs.org/docs/app/api-reference/file-conventions/route',
              note: 'The file that takes over from your form plugin, and the runtime options that matter.',
            },
            {
              label: 'Next.js Image component',
              href: 'https://nextjs.org/docs/app/api-reference/components/image',
              note: 'Sizing, formats and layout stability, which is three plugins in one component.',
            },
            {
              label: 'Pagefind',
              href: 'https://pagefind.app/',
              note: 'Static site search that runs entirely in the browser. Enough to replace a search plugin on most content sites.',
            },
            {
              label: 'Patchstack vulnerability database',
              href: 'https://patchstack.com/database/',
              note: 'Worth checking your own plugin list against before you decide any of it is harmless.',
            },
          ]}
        />
      </ArticleLayout>
    </>
  );
}
