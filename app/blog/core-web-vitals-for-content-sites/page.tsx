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
import { VitalsThresholds } from '@/app/components/blog/Charts';

const post = getPost('core-web-vitals-for-content-sites')!;

export const metadata: Metadata = {
  title: post.title,
  description: post.summary,
  alternates: { canonical: `${site.url}/blog/${post.slug}` },
  keywords: [
    'Core Web Vitals Next.js',
    'improve LCP Next.js',
    'fix INP',
    'cumulative layout shift fix',
    'Next.js performance developer Islamabad',
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
          Three numbers decide your score. Most advice ignores which one you are failing.
        </Lede>

        <P>
          People send me a Lighthouse screenshot and ask what to fix. The screenshot is usually the
          wrong document. What you want is field data for the specific metric you are failing,
          because the fix for a slow image has nothing in common with the fix for a blocked main
          thread.
        </P>

        <Takeaways
          items={[
            'Find out which of the three metrics you are failing before changing anything.',
            'Judge yourself on field data from real visits, not on a Lighthouse run from your own laptop.',
            'LCP is usually an image or font problem. INP is almost always a JavaScript problem.',
            'Layout shift is nearly always a missing dimension on something that loads late.',
          ]}
        />

        <H2 id="the-three-numbers">The three numbers</H2>

        <P>
          Google scores three things. Largest Contentful Paint measures when the biggest visible
          element finishes rendering. Interaction to Next Paint measures how long the page takes to
          respond visually after someone taps or clicks. Cumulative Layout Shift measures how much
          the page jumps around while it loads.
        </P>

        <P>
          Interaction to Next Paint replaced First Input Delay in March 2024. If you are working from
          an older article that talks about FID, the advice in it is probably out of date, because
          FID only measured input delay while INP measures the whole path to a visible response.
        </P>

        <VitalsThresholds />

        <P>
          Each metric has a good band and a poor band. To pass, the 75th percentile of your real
          visits has to sit in the good band. That percentile is the part people miss. Your median
          visitor can be having a fine time while you still fail, because one visitor in four is
          having a worse one.
        </P>

        <H2 id="field-not-lab">Field data, not lab data</H2>

        <P>
          Lighthouse runs a simulated load on your machine, over your connection, with your CPU. It
          is a debugging tool. It tells you what could be slow. It does not tell you what is slow for
          the people using your site.
        </P>

        <P>
          Field data comes from the Chrome User Experience Report, which is collected from real Chrome
          users. That is what Search Console shows you, and it is what Google uses.
        </P>

        <Table
          head={['Source', 'What it measures', 'Use it for']}
          rows={[
            [
              'Lighthouse / PageSpeed lab',
              'One simulated load on one device',
              'Finding the cause after you know the symptom',
            ],
            [
              'Search Console Core Web Vitals',
              'Real visits, grouped by URL pattern',
              'Deciding what to work on at all',
            ],
            [
              'CrUX dashboard or API',
              'Real visits, 28 day rolling window',
              'Tracking whether a fix actually landed',
            ],
            [
              'web-vitals in your own analytics',
              'Real visits, your own segmentation',
              'Catching regressions within days, not weeks',
            ],
          ]}
          caption="Start at the top row only after the second row has told you which metric is failing."
        />

        <Note title="Field data lags">
          <P>
            The Search Console report uses a 28 day rolling window, so a fix you ship today shows up
            gradually over the following month. That is why you also want the web-vitals library
            reporting into your own analytics, where you can see the change within a day or two.
          </P>
        </Note>

        <H2 id="fixing-lcp">Fixing LCP</H2>

        <P>
          On a content site, the largest element is almost always the hero image, the featured image
          or a big block of heading text. Find out which before you change anything. PageSpeed
          Insights names the element for you.
        </P>

        <H3>If it is an image</H3>

        <P>
          The browser has to discover the image, download it, then paint it. Every one of those three
          steps is worth attacking.
        </P>

        <Code filename="app/blog/[slug]/page.tsx" lang="typescript">{`import Image from 'next/image';

// priority tells Next.js to preload this image and skip lazy loading.
// Use it on the one image that is your LCP element, and nowhere else.
<Image
  src={post.cover}
  alt={post.coverAlt}
  width={1200}
  height={630}
  priority
  sizes="(max-width: 768px) 100vw, 800px"
/>;`}</Code>

        <P>
          Two mistakes here are common. Putting <code>priority</code> on several images, which makes
          them compete and helps none of them. And leaving <code>sizes</code> off, which makes the
          browser download a desktop sized file for a phone.
        </P>

        <P>
          If the image sits on a different domain, the connection setup costs you real time before the
          download even starts. A preconnect hint fixes that.
        </P>

        <Code filename="app/layout.tsx" lang="typescript">{`<head>
  {/* Warm the connection to wherever your images come from */}
  <link rel="preconnect" href="https://cdn.example.com" />
</head>`}</Code>

        <H3>If it is text</H3>

        <P>
          Then your font is the problem. A webfont that loads late means the text either sits
          invisible or renders in a fallback and then swaps, and the LCP clock keeps running until the
          real font paints.
        </P>

        <Code filename="app/lib/fonts.ts" lang="typescript">{`import localFont from 'next/font/local';

export const sans = localFont({
  src: [{ path: '../../public/fonts/Inter-Variable.woff2', weight: '100 900' }],
  // Render immediately in a fallback rather than showing nothing
  display: 'swap',
  preload: true,
  // Trim the gap between fallback metrics and the real font so the
  // swap does not move the text and cost you layout shift instead
  adjustFontFallback: 'Arial',
});`}</Code>

        <UL
          items={[
            <>
              Self host the font. A request to a third party font host adds a DNS lookup, a TLS
              handshake and a round trip before a single byte of font arrives.
            </>,
            <>
              Ship only the weights you use. Four weights of a variable font is usually one file.
              Four separate static files is four downloads.
            </>,
            <>
              Subset to the characters you need. A Latin only subset is a fraction of the full file.
            </>,
          ]}
        />

        <H2 id="fixing-inp">Fixing INP</H2>

        <P>
          INP is a JavaScript problem in nearly every case I have looked at. Someone taps, and the
          browser cannot paint the response because the main thread is busy running code.
        </P>

        <P>
          On a content site the fix is usually to send less JavaScript rather than to optimise the
          JavaScript you send. In the App Router, components are server components unless you mark
          them otherwise, and a server component ships no JavaScript at all.
        </P>

        <Code filename="app/blog/[slug]/page.tsx" lang="typescript">{`// No 'use client' at the top, so none of this reaches the browser as JS.
// The interactive bits are imported as their own small client components.
import CommentForm from './CommentForm';        // 'use client' lives in there
import ShareButtons from './ShareButtons';     // and in there

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <ShareButtons url={post.url} />
      <CommentForm postId={post.id} />
    </article>
  );
}`}</Code>

        <P>
          Anything heavy that is not visible on first load should not be in the initial bundle. Load
          it when it is needed instead.
        </P>

        <Code filename="app/components/Comments.tsx" lang="typescript">{`'use client';

import dynamic from 'next/dynamic';

// A comment widget nobody sees until they scroll. Splitting it out
// keeps it off the critical path entirely.
const Thread = dynamic(() => import('./Thread'), {
  ssr: false,
  loading: () => <p className="text-sm text-gray-500">Loading comments</p>,
});`}</Code>

        <H3>Third party scripts</H3>

        <P>
          Analytics, chat widgets, tag managers and embeds are usually the largest single cause of a
          bad INP on an otherwise clean site. They run on the same main thread as your page. Load
          them after your page is interactive.
        </P>

        <Code filename="app/layout.tsx" lang="typescript">{`import Script from 'next/script';

{/* afterInteractive keeps it out of the critical path.
    lazyOnload pushes it even later, to the browser idle period. */}
<Script src="https://example.com/analytics.js" strategy="afterInteractive" />
<Script src="https://example.com/chat-widget.js" strategy="lazyOnload" />`}</Code>

        <P>
          Audit these honestly. A chat widget that produces two conversations a month is not worth
          400 KB of main thread work on every visit. That is a business decision, not a technical
          one, and it should be made by somebody who can see both numbers.
        </P>

        <H2 id="fixing-cls">Fixing CLS</H2>

        <P>
          Layout shift comes from content arriving without space reserved for it. The browser lays
          out the page, then something loads, then everything below it moves down.
        </P>

        <P>The usual causes, in the order I check them:</P>

        <Table
          head={['Cause', 'What you see', 'Fix']}
          rows={[
            [
              'Image without dimensions',
              'Text jumps down when the image appears',
              'Always set width and height, or an aspect-ratio',
            ],
            [
              'Webfont swap',
              'Text reflows slightly once the real font loads',
              'Match fallback metrics with adjustFontFallback',
            ],
            [
              'Injected banner or notice',
              'Whole page shoves down after load',
              'Reserve the height, or position it out of flow',
            ],
            [
              'Ad or embed slot',
              'Content moves as each slot fills',
              'Give every slot a fixed min-height',
            ],
            [
              'Late loading web component',
              'A gap fills in after everything else',
              'Render a placeholder of the same size',
            ],
          ]}
          caption="Every row is the same underlying problem: something occupies space that was not set aside for it."
        />

        <Code filename="app/components/Figure.tsx" lang="typescript">{`// Reserving the space before the image arrives means nothing moves
// when it does. The wrapper holds the shape, the image fills it.
<div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
  <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 800px" />
</div>`}</Code>

        <Note title="CLS is the cheapest one to fix">
          <P>
            Of the three metrics, layout shift usually takes the least work to get into the good
            band. It is mostly a matter of setting dimensions you already know. If you are failing
            all three, start here for a quick win, then go after LCP.
          </P>
        </Note>

        <H2 id="measure-it">Measuring it yourself</H2>

        <P>
          Search Console will tell you the truth eventually. To see a fix land sooner, report the
          metrics from real sessions into whatever analytics you already run.
        </P>

        <Code filename="app/components/Vitals.tsx" lang="typescript">{`'use client';

import { useReportWebVitals } from 'next/web-vitals';

export default function Vitals() {
  useReportWebVitals((metric) => {
    // metric.name is one of LCP, INP, CLS, FCP, TTFB
    // metric.rating is 'good' | 'needs-improvement' | 'poor'
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      path: window.location.pathname,
    });

    // sendBeacon survives the page being closed mid-send
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/vitals', body);
    } else {
      fetch('/api/vitals', { body, method: 'POST', keepalive: true });
    }
  });

  return null;
}`}</Code>

        <P>
          Collect the 75th percentile per URL pattern rather than a site wide average. An average
          hides exactly the problem you are looking for, because your fastest pages will mask your
          slowest ones.
        </P>

        <Code filename="scripts/vitals-p75.sql" lang="sql">{`-- The number Google actually scores you on, per template
SELECT
  path_pattern,
  metric,
  APPROX_QUANTILES(value, 100)[OFFSET(75)] AS p75,
  COUNT(*) AS samples
FROM vitals
WHERE recorded_at > NOW() - INTERVAL '28 days'
GROUP BY path_pattern, metric
HAVING COUNT(*) > 100          -- ignore patterns with too little traffic
ORDER BY p75 DESC;`}</Code>

        <P>
          Sort by the worst number and work down the list. That sounds obvious, and it is still the
          step people skip in favour of chasing a round Lighthouse score on the homepage.
        </P>

        <P>
          If the numbers you are looking at came from a plugin heavy WordPress install, some of this
          is unreachable without changing how pages get delivered in the first place.
        </P>

        <ReadNext
          slug="wordpress-to-nextjs-migration"
          title="Moving a WordPress site to Next.js without losing your rankings"
        />

        <ReadNext
          slug="headless-cms-vs-website-builders"
          title="Why a headless CMS beats building on WordPress or Wix"
        />

        <H2 id="resources">Resources</H2>

        <Resources
          items={[
            {
              label: 'web.dev: Core Web Vitals',
              href: 'https://web.dev/articles/vitals',
              note: 'Definitions and thresholds for all three metrics.',
            },
            {
              label: 'web.dev: optimise Interaction to Next Paint',
              href: 'https://web.dev/articles/optimize-inp',
              note: 'The clearest breakdown of what INP measures and how to reduce it.',
            },
            {
              label: 'web.dev: optimise Largest Contentful Paint',
              href: 'https://web.dev/articles/optimize-lcp',
              note: 'The four LCP sub-parts, which is the right way to think about it.',
            },
            {
              label: 'Chrome User Experience Report',
              href: 'https://developer.chrome.com/docs/crux',
              note: 'The field data behind Search Console. Queryable through the API and BigQuery.',
            },
            {
              label: 'web-vitals on GitHub',
              href: 'https://github.com/GoogleChrome/web-vitals',
              note: 'The measurement library. Next.js wraps it in useReportWebVitals.',
            },
            {
              label: 'Next.js: optimising images',
              href: 'https://nextjs.org/docs/app/getting-started/images',
              note: 'How the Image component handles sizing, formats and priority.',
            },
          ]}
        />
      </ArticleLayout>
    </>
  );
}
