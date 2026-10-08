import type { Metadata } from 'next';
import { site } from '@/app/data/site';
import PageHead from '@/app/components/core/PageHead';
import Section from '@/app/components/core/Section';
import { LegalList } from '@/app/components/core/Legal';
import Reveal from '@/app/components/motion/Reveal';
import { MarkArrow45, Spark } from '@/app/components/marks';

const description =
  'UrlToReel turns a website link into short promo videos for Instagram Reels, TikTok and YouTube Shorts. Making and editing is free, and HD downloads and voice-overs are paid for with one time credit packs.';

export const metadata: Metadata = {
  title: 'UrlToReel',
  description,
  alternates: { canonical: `${site.url}/urltoreel` },
  keywords: [
    'website to video',
    'promo video from a link',
    'Instagram Reels for my website',
    'TikTok ads for my store',
    'UrlToReel',
    'URL to Reel',
  ],
  openGraph: {
    type: 'website',
    title: 'UrlToReel | Masab Farooque',
    description,
    url: `${site.url}/urltoreel`,
    images: [{ url: `${site.url}/products/urltoreel/walkthrough.webp`, width: 1280, height: 720 }],
  },
};

const steps = [
  {
    name: 'Paste a link',
    detail:
      'Give it the address of your shop, app or landing page. It opens the page in a real browser, records it, and reads your headlines, prices, colours and fonts.',
  },
  {
    name: 'Get four reels',
    detail:
      'About three minutes later you get four different takes, each with motion graphics, music and sound effects, plus an optional voice-over. Every frame comes from your own site. Nothing is invented footage.',
  },
  {
    name: 'Edit and download',
    detail:
      'Change any line, colour, scene, voice or format in the editor. When a take is right, download it in full HD with no watermark and post it.',
  },
];

const packs = [
  {
    name: 'Make and edit',
    price: 'Free',
    note: 'No card and no account',
    items: ['Four reels from every link', 'Every format and size', 'The full editor', 'Previews carry a watermark'],
  },
  {
    name: '4 credits',
    price: '$4',
    note: 'One payment',
    items: ['Four HD downloads, or a voice-over and two downloads', 'No watermark', 'Download an edited take again for free', 'Credits never expire'],
  },
  {
    name: '12 credits',
    price: '$10',
    note: 'One payment',
    items: ['Twelve HD downloads, or mix in voice-overs', 'No watermark', 'Download an edited take again for free', 'Use them for any site you run'],
  },
];

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'UrlToReel',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any',
    description,
    image: `${site.url}/products/urltoreel/walkthrough.webp`,
    offers: [
      { '@type': 'Offer', name: 'Make and edit', price: '0', priceCurrency: 'USD' },
      { '@type': 'Offer', name: '4 credits', price: '4', priceCurrency: 'USD' },
      { '@type': 'Offer', name: '12 credits', price: '10', priceCurrency: 'USD' },
    ],
    url: 'https://urltoreel.com',
    author: { '@type': 'Person', name: site.name, url: site.url },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'UrlToReel', item: `${site.url}/urltoreel` },
    ],
  },
];

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <Spark size={10} className="text-sage" />
      <h2 className="label">{children}</h2>
    </div>
  );
}

export default function UrlToReelPage() {
  return (
    <>
      {schema.map((item, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}

      <PageHead
        label="Product"
        title="UrlToReel, *my own* product"
        intro="Paste a link, post a reel. UrlToReel turns any website into short promo videos for Instagram Reels, TikTok and YouTube Shorts. I designed and built it myself, and I run it as a standalone product alongside my client work."
        meta={[
          { label: 'Made by', value: site.name },
          { label: 'Pricing', value: 'Free to try, packs from $4' },
          { label: 'Payments', value: 'Polar' },
          { label: 'Home', value: 'urltoreel.com' },
        ]}
      />

      <Section className="pt-10 md:pt-14">
        <Reveal>
          <figure>
            <div
              className="overflow-hidden rounded-2xl border"
              style={{ borderColor: 'var(--line-2)', background: 'var(--ink)' }}
            >
              <video
                className="block aspect-video w-full"
                src="/products/urltoreel/walkthrough.mp4"
                poster="/products/urltoreel/walkthrough.webp"
                controls
                muted
                playsInline
                preload="metadata"
                width={1280}
                height={720}
              />
            </div>
            <figcaption className="mono mt-4 text-[0.75rem] text-ink-3">
              The real app, start to finish: a link goes in, four reels come out, one gets edited and exported.
            </figcaption>
          </figure>
        </Reveal>
      </Section>

      <Section id="how-it-works">
        <Heading>How it works</Heading>
        <div
          className="mt-10 grid gap-px overflow-hidden rounded-xl border md:grid-cols-3"
          style={{ borderColor: 'var(--line)', background: 'var(--line)' }}
        >
          {steps.map((step, i) => (
            <Reveal key={step.name} delay={i * 0.06} className="p-6 sm:p-7" style={{ background: 'var(--paper)' }}>
              <p className="mono text-[0.6875rem] text-ink-3">Step {i + 1}</p>
              <h3 className="mt-3 text-[1.05rem] text-ink">{step.name}</h3>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-2">{step.detail}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="pricing">
        <Heading>Pricing</Heading>
        <p className="mt-8 max-w-2xl text-[1.05rem] leading-[1.65] text-ink-2">
          You only pay when you want to download a reel in HD or add a voice-over. There is no subscription. One
          credit downloads one take, and if you edit that take later you can download it again at no extra cost. A
          voice-over costs two credits for all four takes from one link, and you get them back if the reels cannot
          be made.
        </p>
        <div
          className="mt-10 grid gap-px overflow-hidden rounded-xl border md:grid-cols-3"
          style={{ borderColor: 'var(--line)', background: 'var(--line)' }}
        >
          {packs.map((pack, i) => (
            <Reveal key={pack.name} delay={i * 0.06} className="p-6 sm:p-7" style={{ background: 'var(--sheet)' }}>
              <h3 className="text-[1.05rem] text-ink">{pack.name}</h3>
              <p className="mt-4 text-[2.4rem] font-extrabold leading-none tracking-[-0.04em] text-ink">{pack.price}</p>
              <p className="label mt-2">{pack.note}</p>
              <div className="mt-6 text-[0.9rem] leading-relaxed text-ink-2">
                <LegalList items={pack.items} />
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mono mt-5 text-[0.75rem] text-ink-3">Prices are in US dollars. Polar works out any sales tax or VAT at checkout.</p>
      </Section>

      <Section id="payments-and-refunds">
        <Heading>Payments and refunds</Heading>
        <div className="mt-10 grid gap-12 md:grid-cols-2">
          <Reveal className="space-y-4 text-[0.95rem] leading-relaxed text-ink-2">
            <h3 className="text-[1.05rem] text-ink">How you pay</h3>
            <p>
              Checkout is run by Polar, which acts as the Merchant of Record. They take the payment, handle sales tax
              and send your receipt. I never see your card details.
            </p>
            <p>
              Your credits are added to your account as soon as the payment goes through, and they stay there until
              you use them.
            </p>
          </Reveal>
          <Reveal delay={0.06} className="space-y-4 text-[0.95rem] leading-relaxed text-ink-2">
            <h3 className="text-[1.05rem] text-ink">When you get your money back</h3>
            <LegalList
              items={[
                'You bought a pack in the last 14 days and have not used any of its credits. You get a full refund.',
                'An export failed, the file did not work, or it did not match the preview. I fix it, give the credit back, or refund it.',
                'You were charged twice for the same order. The extra charge is refunded.',
              ]}
            />
            <p>
              Since you can make and edit every reel for free first, an export that downloaded a working file that
              matches its preview cannot be refunded. To ask for a refund, email me with the order number from your
              receipt.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section id="who-runs-it">
        <Heading>Who runs it</Heading>
        <Reveal className="mt-8 max-w-2xl space-y-4 text-[1.05rem] leading-[1.65] text-ink-2">
          <p>
            UrlToReel is built and run by me, {site.name}, a sole trader in {site.location}. It is my own product.
            No company, agency or investor owns any part of it.
          </p>
          <p>Questions about the app, an order or a refund all come to the same inbox, and I answer them myself.</p>
        </Reveal>
        <Reveal delay={0.06} className="mt-8 flex flex-wrap gap-3">
          <a
            href="https://urltoreel.com"
            className="group inline-flex min-h-11 items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium text-ink transition-all duration-300 hover:gap-3"
            style={{ borderColor: 'var(--line-2)' }}
          >
            Open urltoreel.com
            <MarkArrow45 size={11} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <a
            href={`mailto:${site.email}?subject=UrlToReel`}
            className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-all duration-300 hover:gap-3"
          >
            {site.email}
            <MarkArrow45 size={11} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </Section>
    </>
  );
}
