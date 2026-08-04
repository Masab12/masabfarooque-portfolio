import type { Metadata } from 'next';
import Image from 'next/image';
import { cv, site, socials } from '@/app/data/site';
import { capabilities } from '@/app/data/capabilities';
import { faqs } from '@/app/data/timeline';
import PageHead from '@/app/components/core/PageHead';
import Reveal from '@/app/components/motion/Reveal';
import ScrollLetters from '@/app/components/motion/ScrollLetters';
import Timeline from '@/app/components/about/Timeline';
import Faq from '@/app/components/about/Faq';
import ContactCTA from '@/app/components/home/ContactCTA';
import { ArrowDiagonal, Spark, MarkDocument } from '@/app/components/marks';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Masab Farooque, full stack engineer in Islamabad. Games first, then the web. Now building SaaS platforms, AI systems and data pipelines for teams across 23 countries.',
  alternates: { canonical: `${site.url}/about-masab` },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

const toolGroups = [
  {
    label: 'Languages',
    items: ['TypeScript', 'Python', 'Go', 'SQL', 'C#'],
  },
  {
    label: 'Front end',
    items: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'Canvas', 'Web animations'],
  },
  {
    label: 'Back end',
    items: ['FastAPI', 'Node.js', 'NestJS', 'Express', 'Celery', 'Redis'],
  },
  {
    label: 'Data',
    items: ['PostgreSQL', 'Supabase', 'DynamoDB', 'MongoDB', 'Vector search'],
  },
  {
    label: 'Cloud',
    items: ['AWS Lambda', 'API Gateway', 'S3', 'Docker', 'Vercel', 'Serverless Framework'],
  },
  {
    label: 'AI',
    items: ['Claude API', 'OpenAI', 'Groq', 'LangChain', 'RAG pipelines'],
  },
];

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <PageHead
        label="About"
        title="Masab Farooque"
        intro="I am a full stack engineer in Islamabad. I started with games, moved to the web, and now spend my days on the parts of a product that decide whether it survives contact with real users."
        meta={[
          { label: 'Based in', value: site.location },
          { label: 'Time zone', value: site.timezone },
          { label: 'Focus', value: 'SaaS, AI, data' },
          { label: 'Status', value: site.availability },
        ]}
      />

      <section className="shell py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5" y={26}>
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: 'clamp(14px, 2vw, 26px)', aspectRatio: '4 / 5' }}
            >
              <Image
                src="/Masab.webp"
                alt="Masab Farooque"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                style={{ filter: 'grayscale(0.45) contrast(1.05)' }}
                priority
              />
              <span
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(200deg, rgba(225,224,204,0.10), transparent 45%, rgba(0,0,0,0.62))',
                  mixBlendMode: 'multiply',
                }}
              />
              <span
                className="pointer-events-none absolute inset-0"
                style={{ boxShadow: 'inset 0 0 0 1px var(--line-2)', borderRadius: 'inherit' }}
              />
            </div>

            <a
              href={cv.href}
              target="_blank"
              rel="noopener noreferrer"
              download={cv.fileName}
              data-cursor="Download PDF"
              className="group mt-6 flex items-center justify-between border px-5 py-4 transition-colors duration-500 hover:border-hair2"
              style={{ borderColor: 'var(--line-2)' }}
            >
              <span>
                <span className="block text-sm text-cream">{cv.label}</span>
                <span className="label mt-1.5 block">
                  PDF, {cv.size}, updated {cv.updated}
                </span>
              </span>
              <MarkDocument
                size={20}
                className="text-primary transition-transform duration-500 group-hover:translate-y-0.5"
              />
            </a>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-primary"
                >
                  {s.label}
                  <ArrowDiagonal size={11} className="opacity-0 transition-opacity group-hover:opacity-70" />
                </a>
              ))}
            </div>
          </Reveal>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal className="flex items-center gap-3" y={12}>
              <Spark size={10} className="text-primary" />
              <span className="label">The long version</span>
            </Reveal>

            <ScrollLetters
              className="mt-7 text-[clamp(1.2rem,2.1vw,1.7rem)] leading-[1.4] text-cream"
              text="I started building because I wanted to make games, and games taught me the thing I still care about most: a system is only good when it feels right to the person using it."
            />

            <div className="mt-8 space-y-5 text-[0.98rem] leading-[1.75] text-gray-400">
              <p>
                Between 2020 and 2023 I shipped Unity games, won a few competitions, and learned
                to work to a deadline that does not move. Two of those games passed ten thousand
                downloads. One won Best Mechanics at a national jam and was picked for
                incubation.
              </p>
              <p>
                In late 2023 I moved to the web on purpose. Not because games stopped being
                interesting, but because the problems I wanted to solve were on the other side:
                data, scale, money moving through a system, and products people rely on at work.
                I learned Next.js, FastAPI, NestJS and retrieval architectures, then started
                taking clients and building products with them.
              </p>
              <p>
                Since then I have delivered more than one hundred and ninety orders to clients in
                twenty three countries and founded a publication that reached a hundred thousand
                monthly readers. Today I sit inside two product teams as an external engineer,
                writing Go services on AWS Lambda for a browser based audio editor and building
                AI assisted internal tooling for an engineering studio. The companies are named
                further down this page, under experience.
              </p>
              <p>
                I work best when I own the whole thing. Schema to interface, first commit to
                deploy. That is not ego, it is fewer seams for a product to fail along.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y" style={{ borderColor: 'var(--line)' }}>
        <div className="shell py-16 md:py-24">
          <Reveal className="flex items-baseline gap-4" y={12}>
            <span className="text-[0.7rem] text-primary">A</span>
            <span className="label">The path so far</span>
            <span className="mt-[-2px] h-px flex-1" style={{ background: 'var(--line)' }} />
          </Reveal>

          <div className="mt-12">
            <Timeline />
          </div>
        </div>
      </section>

      <section className="shell py-16 md:py-24">
        <Reveal className="flex items-baseline gap-4" y={12}>
          <span className="text-[0.7rem] text-primary">B</span>
          <span className="label">Tools I reach for</span>
          <span className="mt-[-2px] h-px flex-1" style={{ background: 'var(--line)' }} />
        </Reveal>

        <div className="mt-10 grid gap-px md:grid-cols-3" style={{ background: 'var(--line)' }}>
          {toolGroups.map((group) => (
            <div key={group.label} className="p-6 md:p-8" style={{ background: 'var(--bg)' }}>
              <p className="label mb-4">{group.label}</p>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="h-px w-3" style={{ background: 'var(--cream)' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Reveal className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
          {capabilities.map((cap) => (
            <div
              key={cap.index}
              className="border p-5"
              style={{ borderColor: 'var(--line)', borderRadius: '10px' }}
            >
              <p className="text-[0.6rem] text-primary">{cap.index}</p>
              <p className="mt-2 text-sm text-cream">{cap.title}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="shell py-16 md:py-24">
          <Reveal className="flex items-baseline gap-4" y={12}>
            <span className="text-[0.7rem] text-primary">C</span>
            <span className="label">Questions I get asked</span>
            <span className="mt-[-2px] h-px flex-1" style={{ background: 'var(--line)' }} />
          </Reveal>

          <div className="mt-12">
            <Faq />
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
