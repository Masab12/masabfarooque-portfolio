import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/app/data/site';
import { getPost } from '@/app/data/posts';
import ArticleLayout, { articleSchema } from '@/app/components/blog/ArticleLayout';
import { PhaseTimeline } from '@/app/components/blog/Charts';
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

const post = getPost('wordpress-to-nextjs-migration-timeline')!;

export const metadata: Metadata = {
  title: post.title,
  description: post.summary,
  alternates: { canonical: `${site.url}/blog/${post.slug}` },
  keywords: [
    'WordPress to Next.js migration timeline',
    'how long does a Next.js migration take',
    'WordPress migration schedule',
    'headless WordPress project timeline',
    'Next.js rebuild how long',
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
        <Lede>The build is rarely what makes a migration slow.</Lede>

        <P>
          Ask how long it takes and you get a number that assumes everything goes to plan. Then week
          three arrives, somebody is waiting on a DNS password, and the schedule you agreed has
          quietly moved by a fortnight.
        </P>

        <P>
          Coding time is fairly predictable. Waiting time is where projects go over, and most of the
          waiting is on your side rather than the developer&apos;s.
        </P>

        <Takeaways
          items={[
            'A brochure site runs one to two weeks. A content site with a few hundred posts runs two to five. Adding headless WordPress puts it at three to six.',
            'Phases overlap. A five week project is not five sequential weeks of work.',
            'Content decisions cause more delay than code. Deciding what to delete is the usual bottleneck.',
            'Never launch on a Friday, and never launch the week before a campaign.',
            'Build in a fortnight after DNS for watching Search Console. That part is not optional and it is not padding.',
          ]}
        />

        <H2 id="what-sets-the-clock">What sets the clock</H2>

        <P>
          Four inputs decide the span, and only one of them is about writing code.
        </P>

        <P>
          Template count sets the build length. Six distinct layouts take roughly twice as long as
          three, and page count barely enters into it once the templates exist.
        </P>

        <P>
          URL count sets the routing length. Four hundred URLs means four hundred redirect
          decisions, most of them mechanical, some of them needing a human to look.
        </P>

        <P>
          Then two things that have nothing to do with engineering. How fast you answer questions,
          and how fast you make content decisions. I have had two week projects run six weeks on
          those two alone.
        </P>

        <Note title="The question that predicts the timeline">
          <P>
            Ask yourself who decides what happens to a page nobody has looked at since 2021. If the
            answer is one person who replies the same day, your project will land near the bottom of
            the range. If the answer involves a committee, add two weeks and mean it.
          </P>
        </Note>

        <H2 id="the-phases">The phases, week by week</H2>

        <P>
          This is a content site with a few hundred posts, which is the most common shape I see.
          Notice how much overlaps.
        </P>

        <PhaseTimeline
          weeks={5}
          phases={[
            { name: 'Audit and scope', start: 0, length: 1 },
            { name: 'Template build', start: 0.4, length: 2.2 },
            { name: 'Content migration', start: 1.4, length: 1.6 },
            { name: 'Redirects and meta', start: 2.2, length: 1.3 },
            { name: 'Performance pass', start: 3, length: 0.8 },
            { name: 'Testing and QA', start: 3.2, length: 1.2 },
            { name: 'Launch and watch', start: 4.2, length: 0.8 },
          ]}
          label="Seven phases of a WordPress to Next.js migration plotted across five weeks, showing where they overlap"
          caption="A five week content site migration as I usually schedule it. The bars overlap because template work continues while content moves, and testing starts before the performance pass finishes. Weeks are fractional on purpose, since real phases do not begin on Monday morning."
        />

        <H3>Week one: audit and scope</H3>

        <P>
          Nothing visible happens and this is the week that decides the rest. Every indexed URL comes
          out of the sitemap, Search Console and the server logs. Templates get counted. Plugins get
          listed, and each one gets a decision: replace, drop, or keep in WordPress.
        </P>

        <P>
          You get a written scope at the end of it. If a project is going to be wrong, this is the
          cheapest week to find out.
        </P>

        <H3>Weeks one to three: template build</H3>

        <P>
          Starts a few days into the audit, once the layout inventory is settled. One component per
          distinct template, wired to real content rather than placeholder text, because placeholder
          text hides every layout problem you are going to have.
        </P>

        <H3>Weeks two to three: content migration</H3>

        <P>
          Runs alongside the build. On a headless setup this is close to free, because the content
          stays in WordPress and Next.js reads it over the API. On a full export it is scripted, then
          spot checked by hand.
        </P>

        <Code filename="terminal" lang="bash">{`# Export everything, then check the file is actually complete
# before anyone starts trusting it
wp export --dir=./export --post_type=post,page

# Count what came out and compare against the live site
grep -c '<item>' ./export/*.xml
wp post list --post_status=publish --post_type=post,page --format=count`}</Code>

        <P>
          Those two numbers matching is the whole point of the check. When they do not match, find
          out why now rather than after launch.
        </P>

        <H3>Weeks three to four: redirects and metadata</H3>

        <P>
          The redirect map gets built and then tested, which are two separate jobs and people skip
          the second. A map nobody verified is a list of guesses.
        </P>

        <Code filename="scripts/check-redirects.mjs" lang="javascript">{`import { readFileSync, writeFileSync } from 'node:fs';

// One "old,new" pair per line, straight out of the redirect map
const rows = readFileSync('redirects.csv', 'utf8').trim().split('\\n');
const STAGING = 'https://staging.example.com';
const failures = [];

for (const row of rows) {
  const [from, to] = row.split(',').map((s) => s.trim());

  const res = await fetch(STAGING + from, { redirect: 'manual' });
  const location = res.headers.get('location');

  // Anything other than a single permanent hop to the right place is a problem
  if (res.status !== 301 && res.status !== 308) {
    failures.push({ from, issue: 'status ' + res.status });
    continue;
  }
  if (location && new URL(location, STAGING).pathname !== to) {
    failures.push({ from, issue: 'went to ' + location + ' not ' + to });
    continue;
  }

  // Follow it and make sure the destination is not itself broken
  const final = await fetch(STAGING + from);
  if (!final.ok) failures.push({ from, issue: 'destination ' + final.status });
}

writeFileSync('redirect-failures.json', JSON.stringify(failures, null, 2));
console.log(failures.length + ' problems in ' + rows.length + ' redirects');`}</Code>

        <P>
          Metadata moves across in the same window, because both jobs read from the same URL
          inventory and it is wasteful to build that twice.
        </P>

        <H3>Week four: performance and testing</H3>

        <P>
          Images, fonts, layout stability, render strategy per route. Then the real testing pass:
          redirects verified, metadata diffed against the live site, and a genuine look on a mid
          range Android rather than a desktop window resized to look like a phone.
        </P>

        <H3>Week five: launch and watch</H3>

        <P>
          DNS moves on a Tuesday or Wednesday morning. Then somebody watches Search Console for a
          fortnight, because crawl errors and coverage changes show up over days, not minutes.
        </P>

        <H2 id="by-site-size">Timelines by site size</H2>

        <Table
          head={['Site', 'Scale', 'Span', 'What dominates']}
          rows={[
            ['Brochure', 'Up to about 30 pages', '1 to 2 weeks', 'Template build'],
            ['Content site', 'Roughly 50 to 500 posts', '2 to 5 weeks', 'Redirect map and content decisions'],
            ['Headless content site', 'Any size, editors stay put', '3 to 6 weeks', 'Webhook, preview mode, CMS lockdown'],
            ['Membership or commerce', 'Any size', 'Scoped separately', 'Auth, payment and order history'],
          ]}
          caption="Spans assume one engineer, decisions answered within a day or two, and no redesign running at the same time. Break any of those three and the range stops applying."
        />

        <P>
          The last row is deliberately vague because quoting a timeline on commerce work without
          seeing it is how projects fail. Cart, checkout, payment and order history all have to be
          right on the first day.
        </P>

        <H2 id="what-runs-late">What actually runs late</H2>

        <P>
          Five things, in the order I hit them most often.
        </P>

        <OL
          items={[
            <>
              <strong>Content decisions.</strong> A hundred and fifty old posts with no traffic.
              Delete, redirect, or migrate? Nobody wants to make the call and the routing work waits.
            </>,
            <>
              <strong>Access.</strong> Hosting logins, DNS, the analytics account, the domain
              registrar that someone&apos;s former agency still controls. Ask for all of it in week
              one.
            </>,
            <>
              <strong>A plugin doing something undocumented.</strong> You find it in week three and
              it is quietly powering something a stakeholder cares about.
            </>,
            <>
              <strong>Design creep.</strong> Once people see the new site they want changes. Every
              one is reasonable and they compound.
            </>,
            <>
              <strong>Third party approval.</strong> Legal, brand, or an agency who owns the DNS and
              answers on Thursdays.
            </>,
          ]}
        />

        <P>
          Only the third one is a technical surprise. The other four are scheduling problems, which
          means you can fix them in advance.
        </P>

        <H2 id="what-you-control">The delay you control</H2>

        <P>
          Do these four things and you take a genuine week or two off the span.
        </P>

        <P>
          Hand over every credential in week one. Not when it is needed. Week one, in a password
          manager, all of it.
        </P>

        <P>
          Name one decision maker. Someone who can say delete that page and mean it, without a
          meeting. This is the single biggest lever you have.
        </P>

        <P>
          Do the content audit before the project starts. Pull your own analytics, mark what earns
          traffic, and decide what dies. If you arrive with that list, the routing work starts
          immediately instead of waiting on you.
        </P>

        <Code filename="terminal" lang="bash">{`# The pages that earned nothing in the last year are your delete candidates.
# Export from Search Console, then find the URLs with no clicks at all.
awk -F',' 'NR>1 && $2==0 {print $1}' search-console-pages.csv | sort > no-clicks.txt
wc -l < no-clicks.txt`}</Code>

        <P>
          Then agree the design is frozen. Migrate the site you have. Redesign it as a separate
          project once the move has settled and you know the routing held.
        </P>

        <H2 id="running-in-parallel">What can run in parallel</H2>

        <P>
          Look at the chart again. Four of the seven phases overlap, which is why a five week
          calendar span is not five weeks of sequential work.
        </P>

        <P>
          Template build and content migration overlap comfortably, since one is layout and the
          other is data. Testing starts before the performance pass ends, because you want the
          redirect checks running while somebody is still tuning images.
        </P>

        <P>What cannot overlap:</P>

        <UL
          items={[
            <>
              The audit has to finish before routing starts. You cannot map URLs you have not
              inventoried.
            </>,
            <>
              Redirect testing has to happen on staging, before DNS. Testing after the switch is not
              testing, it is finding out.
            </>,
            <>
              The watching period comes after launch and cannot be compressed. Two weeks is two
              weeks.
            </>,
          ]}
        />

        <P>
          One person cannot parallelise beyond a point, which is worth saying plainly. If you need
          three things finished on the same day, that is an argument for a studio rather than a
          faster individual.
        </P>

        <ReadNext
          slug="wordpress-to-nextjs-migration-cost"
          title="What a WordPress to Next.js migration costs, line by line"
        />

        <P>
          Most of the price is time, so the two documents have to agree. A five week schedule against
          a one week budget means somebody has misread the job.
        </P>

        <ReadNext
          slug="wordpress-to-nextjs-migration-checklist"
          title="A WordPress to Next.js migration checklist you can hand to a developer"
        />

        <P>
          I run these end to end, and I will tell you in the first conversation whether your site is
          a two week job or a six week one. The{' '}
          <Link href="/services/wordpress-to-nextjs">migration page</Link> sets out the process, or{' '}
          <Link href="/contact">tell me what you are running</Link> and I will give you a real
          schedule rather than a range.
        </P>

        <H2 id="resources">Resources</H2>

        <Resources
          items={[
            {
              label: 'Google: site moves with URL changes',
              href: 'https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes',
              note: 'Includes why you keep redirects in place for at least a year after the move.',
            },
            {
              label: 'Search Console URL Inspection',
              href: 'https://support.google.com/webmasters/answer/9012289',
              note: 'What you use during the two week watching period after DNS moves.',
            },
            {
              label: 'WP-CLI export command',
              href: 'https://developer.wordpress.org/cli/commands/export/',
              note: 'The export used in the content migration phase, plus its filtering options.',
            },
            {
              label: 'Next.js redirects configuration',
              href: 'https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects',
              note: 'Where the tested redirect map ends up living.',
            },
            {
              label: 'web.dev: Core Web Vitals',
              href: 'https://web.dev/articles/vitals',
              note: 'The thresholds the performance phase is working against.',
            },
          ]}
        />
      </ArticleLayout>
    </>
  );
}
