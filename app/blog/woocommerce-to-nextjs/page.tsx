import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/app/data/site';
import { getPost } from '@/app/data/posts';
import ArticleLayout, { articleSchema, faqSchema } from '@/app/components/blog/ArticleLayout';
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
  FAQ,
  ReadNext,
  Resources,
  type FaqItem,
} from '@/app/components/blog/Prose';

const post = getPost('woocommerce-to-nextjs')!;

export const metadata: Metadata = {
  title: post.title,
  description: post.summary,
  alternates: { canonical: `${site.url}/blog/${post.slug}` },
  keywords: [
    'headless WooCommerce Next.js',
    'WooCommerce to Next.js migration',
    'WooCommerce Store API headless',
    'WooGraphQL Next.js storefront',
    'headless commerce WordPress',
    'is headless WooCommerce worth it',
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
    q: 'Can I call the WooCommerce REST API from the browser?',
    a: 'No. The consumer key and secret it authenticates with are server credentials, and anything you put in browser JavaScript is public. Product reads happen on the server during rendering, and anything the shopper triggers goes through your own route handler, which holds the keys. The Store API is the exception, because it was designed to be called publicly and is scoped to cart operations only.',
  },
  {
    q: 'Will a headless storefront rank better than WooCommerce?',
    a: 'It can, but not because it is headless. The pages that earn search traffic in a store are category and product pages, and those are exactly the pages that pre-render cleanly, so they get faster. The cart and checkout are not indexed and their speed is a conversion question, not a ranking one.',
  },
  {
    q: 'Do my WooCommerce extensions still work?',
    a: 'It depends where they do their work. An extension that computes something server side, like a shipping rate or a tax rule, keeps working as long as you go through WooCommerce for the cart and the order. An extension that renders on the front end, which is most of the ones affecting product pages, stops applying the moment you stop using the WooCommerce theme.',
  },
  {
    q: 'Can I have a fast storefront without rebuilding checkout?',
    a: 'Yes, and it is what I recommend to most stores. Serve the catalogue, the category pages and the content from Next.js, and hand the shopper over to the WooCommerce cart and checkout at the moment they buy. You get the speed on the pages that carry the traffic and you take on none of the payment and tax liability.',
  },
  {
    q: 'What about WooCommerce Subscriptions?',
    a: 'Leave it alone. Subscriptions hooks deep into checkout, renewal orders and payment method changes, and reimplementing that surface headlessly means owning the failure cases around recurring billing. If subscriptions are your revenue, that is the last thing you should be rewriting to make a page load faster.',
  },
  {
    q: 'How long does a headless WooCommerce build take?',
    a: 'The catalogue is the fast half and usually lands in weeks. A full build with your own cart and checkout is a different order of project and should be scoped in months, with a real test plan for tax, shipping and payment. If a quote treats it like a content migration with products added on, that quote has not been thought through.',
  },
  {
    q: 'Do you take on this work?',
    a: 'Yes, scoped case by case rather than at a standard price, because two stores with the same product count can be completely different projects. A fair share of the time my recommendation is a fast Next.js storefront in front of an untouched WooCommerce checkout, which costs a fraction of a full rebuild.',
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
        <Lede>The catalogue is the easy half. Stores go wrong at the cart.</Lede>

        <P>
          Store owners ask for this after reading that headless commerce is faster, which is true,
          and after being told the migration is much like moving a blog, which is not. A blog has
          one write path and it belongs to you. A shop has several, they belong to the customer, and
          each one moves money.
        </P>

        <P>
          I have scoped enough of these to be blunt about it. Most stores that ask for a headless
          rebuild should buy something smaller instead, and the smaller thing gets them nearly all
          of the speed. This piece is about how to tell which one you are.
        </P>

        <Takeaways
          items={[
            'A store splits into reads and writes. Reads move cleanly and carry almost all of your search traffic. Writes are the project.',
            'WooCommerce holds the cart as session state on the server, and tax, shipping and coupons are computed there against your configuration. Rebuilding that in the browser is how stores charge the wrong amount.',
            'The Store API exists for exactly this and is the supported way to drive a cart from another front end. Use it rather than inventing a cart.',
            'Most stores should serve the catalogue from Next.js and hand over to the WooCommerce checkout at the buy button. Nearly all the speed, almost none of the risk.',
            'Never route card details through your own API to save a redirect. That decision changes what compliance regime you are in.',
          ]}
        />

        <H2 id="two-halves">A store is two halves</H2>

        <P>
          Draw a line through your shop. On one side is everything that only reads: the homepage,
          category listings, product pages, search, reviews, the blog. On the other is everything
          that writes: adding to cart, applying a coupon, calculating shipping, paying, and looking
          at an order afterwards.
        </P>

        <P>
          The read half is where your search traffic lands, and it is the half that migrates
          cleanly. It is also, on most stores, the half that is slow, because a product page in
          WooCommerce runs the whole cart bootstrap on every request even for a visitor who has
          never added anything.
        </P>

        <P>
          The write half is short. Four or five screens. And it is where the entire budget goes,
          because those screens carry your tax rules, your shipping zones, your coupon logic, your
          stock reservation and your payment integration, and every one of them has to be right on
          the first day rather than improved later.
        </P>

        <Note title="The ratio that should decide this">
          <P>
            Pull two numbers from analytics before anything else. What share of your sessions ever
            reach the cart, and what share of your organic landing pages are product or category
            pages. On most stores the first number is small and the second is nearly all of them.
            That ratio is the argument for moving the catalogue and leaving checkout alone, and it
            is your ratio rather than a general claim.
          </P>
        </Note>

        <H2 id="the-catalogue">The catalogue moves cleanly</H2>

        <P>
          Products, categories, attributes, images and reviews all come out over an API and render
          as static pages. Two routes in.
        </P>

        <UL
          items={[
            <>
              <strong>The REST API</strong> ships with WooCommerce and authenticates with a consumer
              key and secret. Server side only, always. Straightforward, but assembling a product
              page can take several calls.
            </>,
            <>
              <strong>WooGraphQL</strong>, which extends WPGraphQL, gets the same page in one round
              trip with exactly the fields the template uses. On a catalogue of any size this is the
              one I reach for.
            </>,
          ]}
        />

        <Code filename="app/product/[slug]/page.tsx" lang="tsx">{`// Product pages are pre-rendered and refreshed on a window, so a hundred
// thousand views cost one render rather than a hundred thousand PHP requests.
export const revalidate = 900;

export async function generateStaticParams() {
  const products = await getAllProductSlugs();
  return products.map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <ProductView
      product={product}
      // Price and description are safe to pre-render. Availability is not,
      // so it is read live and the button waits for it rather than lying.
      availability={<LiveStock sku={product.sku} />}
    />
  );
}`}</Code>

        <P>
          Stock is the one catch in an otherwise easy half. A pre-rendered page is a page that was
          true fifteen minutes ago, and an in stock badge that is fifteen minutes stale is a promise
          you might have to break at checkout. Either read availability at request time for the
          badge, or shorten the window on the products that actually run out, or accept the
          staleness deliberately and make sure the cart re-checks. What you cannot do is pre-render
          the badge and hope.
        </P>

        <P>
          Everything else here is ordinary work. Structured data for products, including price and
          availability, has to be emitted by hand rather than by a plugin, and it matters more on a
          shop than anywhere else because it drives the rich results in search.
        </P>

        <H2 id="the-cart">The cart is the project</H2>

        <P>
          WooCommerce keeps the cart as session state on the server, tied to a cookie, and it was
          not designed to be addressed from a different origin. Everything difficult about headless
          WooCommerce comes out of that one sentence.
        </P>

        <P>
          There is a supported answer. The Store API, which ships as part of WooCommerce Blocks,
          exposes public cart endpoints built for exactly this: add an item, update a quantity,
          apply a coupon, read totals. It hands you a cart token that you carry on subsequent
          requests. The part that matters is that the totals come back computed by WooCommerce rather
          than by you.
        </P>

        <Code filename="lib/cart.ts" lang="ts">{`// The token identifies this shopper's cart to WooCommerce. It comes back on
// the first response and every later call has to carry it, or you have
// silently started a second, empty cart.
export async function addToCart(token: string | null, id: number, quantity: number) {
  const res = await fetch(\`\${process.env.STORE_URL}/wp-json/wc/store/v1/cart/add-item\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Cart-Token': token } : {}),
    },
    body: JSON.stringify({ id, quantity }),
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(await res.text());

  return {
    // Totals are whatever WooCommerce says they are. Tax rules, shipping
    // zones and coupon logic all live over there, and that is the point.
    cart: await res.json(),
    token: res.headers.get('Cart-Token') ?? token,
  };
}`}</Code>

        <P>
          The alternative you will see recommended is to hold the cart in React state or local
          storage and create the order at the end. It demos beautifully. It also means your
          storefront is now the thing that decides what a customer owes, and WooCommerce is holding
          the tax table, the shipping zones, the coupon rules and the stock. Those two facts do not
          coexist quietly for long.
        </P>

        <Table
          head={['What the cart has to get right', 'Where the logic actually lives']}
          rows={[
            ['Line totals and quantities', 'Trivial either way'],
            ['Tax, by customer address and product class', 'WooCommerce, against rules you configured'],
            ['Shipping rates and available methods', 'WooCommerce, per zone and per method'],
            ['Coupons, including usage limits and exclusions', 'WooCommerce, and the rules are fiddlier than they look'],
            ['Stock at the moment of purchase, not of browsing', 'WooCommerce, which also reserves it'],
            ['Anything an extension adds to totals', 'The extension, running inside WooCommerce'],
          ]}
          caption="Every row past the first is a reason to let WooCommerce compute the cart rather than reimplementing it. The last row is the one that ambushes people: extensions add their work to the cart quietly, and a hand rolled cart drops it without an error."
        />

        <H2 id="checkout">The checkout decision</H2>

        <P>
          This is the decision that sets the size of the project, and most stores get it wrong by
          reflex.
        </P>

        <H3>Option one: hand over at the buy button</H3>

        <P>
          Next.js serves the homepage, categories, products, search and content. When the shopper
          buys, they go to the WooCommerce cart and checkout, which you leave exactly as it is.
        </P>

        <P>
          You get pre-rendered pages on everything that gets indexed and everything that gets
          browsed, and you take on none of the liability around payment, tax or fraud. You keep
          every extension that works at checkout. The cost is a visible handover, usually a
          different path and a different look, and some care over session continuity.
        </P>

        <P>
          For most stores I look at, this is the right answer, and it costs a fraction of the
          alternative.
        </P>

        <H3>Option two: own the whole flow</H3>

        <P>
          Cart, checkout, payment and account pages all in Next.js, driven through the Store API.
          One consistent interface, full control over the buying experience, and a much larger
          project with a real test plan behind it.
        </P>

        <P>Worth it when at least two of these are true:</P>

        <UL
          items={[
            'Checkout conversion is a number somebody is actually accountable for, and you intend to keep testing it.',
            'The buying flow is unusual enough that the standard checkout genuinely gets in the way.',
            'You have a maintainer, because a bespoke checkout is not a thing you ship and forget.',
            'Your payment gateway offers hosted fields or a redirect, so you can build the flow without touching card data.',
          ]}
        />

        <Note title="Do not let card details near your own API">
          <P>
            Proxying card numbers through a route handler to avoid a redirect moves you into a much
            heavier compliance regime, and it is the single most expensive mistake available in this
            project. Use the gateway&apos;s hosted fields or its redirect. The tokenised handoff is
            the whole reason those exist, and no amount of design polish justifies stepping around
            it.
          </P>
        </Note>

        <H2 id="what-it-costs">What this actually costs</H2>

        <P>
          Everything in my usual migration breakdown still applies: URL audit, redirect map,
          templates, metadata, integrations, testing and handover. A store adds three things on top,
          and they are not small.
        </P>

        <OL
          items={[
            <>
              <strong>The write path.</strong> Cart, checkout, account and orders, plus the failure
              cases. A declined payment, a coupon that expired between add and pay, an item that
              went out of stock in the last two minutes.
            </>,
            <>
              <strong>The test plan.</strong> Tax across the regions you sell to, every shipping
              method, every coupon type, and payment in the gateway&apos;s test mode and then again
              for real. This is not optional and it takes longer than the build.
            </>,
            <>
              <strong>The extension audit.</strong> Every WooCommerce extension you run, checked for
              where it does its work. Front end extensions stop applying. Server side ones survive
              only if the order still goes through WooCommerce.
            </>,
          ]}
        />

        <P>
          Any quote that prices a store like a content site with products bolted on has not been
          thought about. My line by line breakdown of a normal migration is a reasonable starting
          point, and then you add the three items above.
        </P>

        <ReadNext
          slug="wordpress-to-nextjs-migration-cost"
          title="What a WordPress to Next.js migration costs, line by line"
        />

        <H2 id="when-not-to">When to leave the store alone</H2>

        <P>Any one of these on its own is enough to stop.</P>

        <UL
          items={[
            <>
              <strong>The storefront already passes Core Web Vitals.</strong> Check the field data
              rather than a lab score. If it passes, the speed argument is gone and you are
              proposing a rebuild for its own sake.
            </>,
            <>
              <strong>Subscriptions, bookings or memberships carry the revenue.</strong> These are
              the deepest hooks into checkout that WooCommerce has. Rewriting them to make a product
              page load faster is a bad trade at any price.
            </>,
            <>
              <strong>Nobody will own the codebase.</strong> A headless store is two systems and a
              deploy pipeline. Without someone who can run it, an outage means waiting for whoever
              built it to answer.
            </>,
            <>
              <strong>Search is not where your customers come from.</strong> If the traffic is paid
              social straight to a product page, buy speed with better hosting and fewer plugins
              rather than with an architecture change.
            </>,
            <>
              <strong>The catalogue changes constantly.</strong> Pricing that moves hourly and stock
              that runs out mid-session fight against pre-rendering, and every workaround gives back
              some of the speed you came for.
            </>,
          ]}
        />

        <P>
          The honest summary is that headless WooCommerce is a good answer to a narrow question. It
          suits a store with a large catalogue, real search traffic, a team that can maintain code,
          and a specific reason the standard front end is holding it back. If that is not you, the
          catalogue-only build gets you most of the win for a small share of the cost.
        </P>

        <H2 id="the-order">If you do it, do it in this order</H2>

        <P>
          The sequencing matters more here than on a content site, because you can stop after any
          phase and still have something better than what you started with.
        </P>

        <PhaseTimeline
          weeks={12}
          phases={[
            { name: 'Audit and URL freeze', start: 0, length: 1.5 },
            { name: 'Catalogue and category pages', start: 1, length: 3.5 },
            { name: 'Launch reads, measure', start: 4.5, length: 1 },
            { name: 'Cart through the Store API', start: 5.5, length: 3 },
            { name: 'Checkout and payment', start: 8, length: 3 },
            { name: 'Tax, shipping and coupon testing', start: 9, length: 2.5 },
            { name: 'Account and order history', start: 11, length: 1 },
          ]}
          label="Build order for a headless WooCommerce storefront across twelve weeks, with the read-only catalogue launching before any cart work begins"
          caption="An indicative order rather than a quoted schedule. The important property is the gap at week four and a half: the catalogue goes live and gets measured before a single line of cart code is written, so the speed benefit is banked and proven while the risky half is still optional."
        />

        <P>
          That pause is the whole point. Launch the read half, watch the field data for a fortnight,
          and then decide whether the write half is still worth commissioning. A good number of
          stores that reach that checkpoint look at the numbers and decide they are finished.
        </P>

        <ReadNext
          slug="wordpress-vs-nextjs"
          title="WordPress or Next.js: how to tell which one your site should be on"
        />

        <H2 id="faq">Questions people ask me</H2>

        <FAQ items={faqs} />

        <P>
          If you run a store and want a straight read on which of the two builds fits it, send me
          the address along with your product count, your extension list and where your traffic
          comes from. You will get a scoped answer rather than a package. The{' '}
          <Link href="/services/wordpress-to-nextjs">migration service page</Link> covers how I work,
          the <Link href="/site-check">free site check</Link> will tell you what your product pages
          are carrying today, and <Link href="/contact">the contact form</Link> is the fastest way to
          start.
        </P>

        <H2 id="resources">Resources</H2>

        <Resources
          items={[
            {
              label: 'WooCommerce Store API reference',
              href: 'https://developer.woocommerce.com/docs/apis/store-api/',
              note: 'The public cart and checkout endpoints, including the cart token handling shown above.',
            },
            {
              label: 'WooCommerce REST API documentation',
              href: 'https://woocommerce.github.io/woocommerce-rest-api-docs/',
              note: 'Products, orders and customers. Server side only, because it authenticates with a key and secret.',
            },
            {
              label: 'WooGraphQL',
              href: 'https://woographql.com/',
              note: 'WooCommerce data through WPGraphQL, which is how a product page becomes one round trip instead of four.',
            },
            {
              label: 'Google: product structured data',
              href: 'https://developers.google.com/search/docs/appearance/structured-data/product',
              note: 'What your product pages have to emit once the plugin that was emitting it is gone.',
            },
            {
              label: 'PCI Security Standards Council: SAQ documents',
              href: 'https://www.pcisecuritystandards.org/document_library/',
              note: 'Worth reading the SAQ A criteria before anyone proposes handling card fields yourself.',
            },
            {
              label: 'web.dev: Core Web Vitals',
              href: 'https://web.dev/articles/vitals',
              note: 'Check your field data here before commissioning anything on the basis of speed.',
            },
          ]}
        />
      </ArticleLayout>
    </>
  );
}
