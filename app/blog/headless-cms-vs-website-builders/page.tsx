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
  Code,
  Note,
  Takeaways,
  Table,
  ReadNext,
  Resources,
} from '@/app/components/blog/Prose';
import { BeforeAfterBars } from '@/app/components/blog/Charts';

const post = getPost('headless-cms-vs-website-builders')!;

export const metadata: Metadata = {
  title: post.title,
  description: post.summary,
  alternates: { canonical: `${site.url}/blog/${post.slug}` },
  keywords: [
    'headless CMS vs WordPress',
    'headless CMS vs Wix',
    'best CMS for content marketing site',
    'Next.js brand site',
    'Next.js developer Islamabad',
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
          A page builder decides your performance ceiling before you write a word.
        </Lede>

        <P>
          That is the argument in one line. Everything below is the reasoning, including the cases
          where I think a builder is the correct choice and a custom build would be a waste of your
          money.
        </P>

        <Takeaways
          items={[
            'A coupled CMS ties your content, your layout and your delivery together, so you cannot fix one without touching the others.',
            'Builders add their own JavaScript and CSS to every page whether that page uses the features or not.',
            'Decoupling means content lives in one system and rendering happens in another, which lets you replace either side.',
            'For a site with five pages and no content plan, a builder is genuinely the right answer.',
          ]}
        />

        <H2 id="the-coupling-problem">The coupling problem</H2>

        <P>
          WordPress, Wix, Squarespace and Webflow all bundle three separate jobs into one product.
          They store your content. They decide how it looks. They serve it to visitors. When those
          three are welded together, a change to one drags the others along.
        </P>

        <P>
          You see it the first time you try to redesign. The content is stored inside layout markup,
          so a new design means re-entering content or writing a migration script against a schema
          you do not control. You see it again when you try to reuse the same content somewhere
          else, in an app, in a newsletter, on a partner site. There is no clean way to get it out,
          because it was never stored as content. It was stored as a page.
        </P>

        <Note title="What coupling costs in practice">
          <P>
            A client came to me wanting the same product descriptions on their marketing site and
            inside a customer portal. On their builder, the only export was HTML with the theme
            wrappers still in it. The content and the presentation had never been separate, so there
            was nothing clean to copy. That is a coupling problem, not a formatting problem.
          </P>
        </Note>

        <H2 id="where-builders-cost-you">Where builders cost you</H2>

        <P>
          The cost is mostly paid in bytes and in requests. A builder has to support every feature
          any customer might use, so it loads a runtime capable of all of them. Your page uses four
          of those features and downloads the framework for forty.
        </P>

        <P>Three specific things happen on nearly every builder site I audit:</P>

        <UL
          items={[
            <>
              A large JavaScript bundle loads on pages that need almost none of it. A text only
              about page still pays for the slider, the lightbox and the animation engine.
            </>,
            <>
              CSS arrives as one enormous stylesheet covering every block type the builder offers,
              and the browser has to parse all of it before it can paint.
            </>,
            <>
              Third party scripts get injected through the visual interface, because that is the only
              place to add them, which means they land in the head and block rendering.
            </>,
          ]}
        />

        <BeforeAfterBars
          rows={[
            { label: 'Requests', before: 94, after: 21, unit: '' },
            { label: 'JS parsed', before: 740, after: 165, unit: 'KB' },
            { label: 'Main thread', before: 2600, after: 480, unit: 'ms' },
          ]}
          beforeLabel="Builder site"
          afterLabel="Decoupled build"
          label="Request count, JavaScript parsed and main thread work on a builder site compared with a decoupled static build"
          caption="Illustrative comparison for a content page of similar length and imagery. These are typical of what I find in audits rather than a measurement of one specific pair of sites. Check your own numbers in Chrome DevTools under Performance, and use the Coverage panel to see how much of the CSS and JavaScript a page actually uses."
        />

        <P>
          The main thread number is the one that hurts most and gets discussed least. Every
          millisecond the browser spends parsing and running JavaScript is a millisecond it cannot
          spend responding to a tap. That shows up in your Interaction to Next Paint score, and
          builders are structurally bad at it because they ship interactive machinery for
          components you are not using.
        </P>

        <H2 id="the-decoupled-shape">The decoupled shape</H2>

        <P>
          Decoupled means the content lives in one system with an API, and something else turns it
          into pages. The something else can be Next.js, and the content system can be Sanity,
          Contentful, Payload, or WordPress with its front end switched off.
        </P>

        <Table
          head={['Layer', 'Job', 'Can you swap it?']}
          rows={[
            [
              'Content store',
              'Holds text, images and structure. Has an API.',
              'Yes, if you exported clean structured content',
            ],
            [
              'Renderer',
              'Turns content into HTML at build time.',
              'Yes, the content does not care how it is drawn',
            ],
            [
              'Delivery',
              'Serves finished files from an edge cache.',
              'Yes, static files run anywhere',
            ],
          ]}
          caption="The value is not in any one row. It is that every row can be replaced without rewriting the other two."
        />

        <P>
          Because the renderer runs at build time, the visitor gets HTML that is already finished.
          There is no database query on the request path and no template engine assembling the page.
          You can only make a page faster than that by sending less of it.
        </P>

        <Code filename="app/page.tsx" lang="typescript">{`// This function runs when you build, not when someone visits.
// The visitor receives a finished HTML file from the nearest edge server.
export default async function HomePage() {
  const page = await cms.getPage('home');

  return (
    <main>
      <h1>{page.heading}</h1>
      {page.blocks.map((block) => (
        <Block key={block.id} {...block} />
      ))}
    </main>
  );
}`}</Code>

        <P>
          The other half of the benefit is that you decide what ships. If a page needs no
          JavaScript, it gets none. A builder cannot make that promise because it does not know in
          advance what you will put on the page.
        </P>

        <H2 id="content-marketing">Why content sites feel it most</H2>

        <P>
          A five page brochure site can survive a slow stack. Nobody is comparing it against
          alternatives on a search results page. A content marketing site is in a completely
          different position, because its whole purpose is to win organic traffic against
          competitors doing the same thing.
        </P>

        <P>Three reasons the pain compounds as you publish more:</P>

        <H3>Volume multiplies every mistake</H3>

        <P>
          A 200 KB overhead on one page is annoying. The same overhead across 400 articles is your
          entire crawl budget and your entire mobile experience. Whatever your template does badly,
          it does badly several hundred times.
        </P>

        <H3>Search visibility depends on the numbers you are worst at</H3>

        <P>
          Google measures real visits at the 75th percentile, so your score reflects your slower
          visitors rather than your fastest. Builder sites tend to have a long tail of slow sessions
          on mid range phones, which is exactly the group that decides your rating.
        </P>

        <H3>Content outlives designs</H3>

        <P>
          An article you publish this year should still earn traffic in four years, through two
          redesigns. If your content is welded to a layout, every redesign puts that archive at
          risk. Stored as structured content, it survives redesigns untouched.
        </P>

        <ReadNext
          slug="core-web-vitals-for-content-sites"
          title="Core Web Vitals for content sites: what actually moves the numbers"
        />

        <H2 id="ownership">Ownership and portability</H2>

        <P>
          This part is boring until the day it matters. On a hosted builder, your content sits in a
          database you cannot query, behind an export button somebody else designed. Your pricing is
          whatever they decide next year. Your performance ceiling is whatever their runtime allows.
        </P>

        <P>
          With a decoupled setup you hold the repository, and content comes out over an API you can
          call yourself in whatever shape you want.
        </P>

        <Code filename="terminal" lang="bash">{`# Content you can actually take with you, as structured data
curl "https://cms.example.com/wp-json/wp/v2/posts?per_page=100&_fields=slug,title,content,date" \\
  > backup-$(date +%F).json`}</Code>

        <P>
          I am not claiming migrations become free. They become possible, and possible at a known
          cost, which is different from being locked in.
        </P>

        <H2 id="honest-tradeoffs">The honest tradeoffs</H2>

        <P>
          A decoupled build is worse than a builder in several real ways, and pretending otherwise
          would make this article useless.
        </P>

        <Table
          head={['Where a builder wins', 'Why', 'Who should care']}
          rows={[
            [
              'Time to first page',
              'An afternoon versus a couple of weeks.',
              'Anyone validating an idea or needing something live this week',
            ],
            [
              'No developer needed',
              'Marketing can change layout without a deploy.',
              'Teams with no engineering support at all',
            ],
            [
              'Fixed low cost',
              'One subscription covers hosting, updates and backups.',
              'Small sites where an hourly rate would dwarf the hosting bill',
            ],
            [
              'Visual layout control',
              'Editors drag things and see the result immediately.',
              'Teams who redesign pages weekly as part of their job',
            ],
          ]}
          caption="If two or more of these describe your situation, a builder is probably the right call, and I will tell you so."
        />

        <P>
          There is also a real maintenance difference. A decoupled site has two systems, a build
          pipeline and a deploy target. Somebody has to own that. If nobody on your side can, the
          architecture is wrong for you no matter how fast it renders.
        </P>

        <P>
          The switch point, in my experience, is when content becomes a channel rather than a
          brochure. Once you are publishing regularly and organic search matters to revenue, the
          coupled setup starts costing more than it saves.
        </P>

        <ReadNext
          slug="wordpress-as-headless-cms"
          title="Keep the WordPress editor, drop the WordPress front end"
        />

        <H2 id="resources">Resources</H2>

        <Resources
          items={[
            {
              label: 'web.dev: Core Web Vitals',
              href: 'https://web.dev/articles/vitals',
              note: 'The metrics and thresholds Google uses, including the 75th percentile rule.',
            },
            {
              label: 'Chrome DevTools: Coverage panel',
              href: 'https://developer.chrome.com/docs/devtools/coverage',
              note: 'Shows how much of the CSS and JavaScript a page loads but never uses.',
            },
            {
              label: 'HTTP Archive: Web Almanac',
              href: 'https://almanac.httparchive.org/',
              note: 'Yearly analysis of real page weight and CMS usage across millions of sites.',
            },
            {
              label: 'Next.js: static exports and rendering',
              href: 'https://nextjs.org/docs/app/getting-started/partial-prerendering',
              note: 'How the App Router decides what renders at build time and what stays dynamic.',
            },
          ]}
        />
      </ArticleLayout>
    </>
  );
}
