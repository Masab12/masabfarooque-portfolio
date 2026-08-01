import type { Metadata } from 'next';
import { site, socials } from '@/app/data/site';
import { process as steps } from '@/app/data/capabilities';
import PageHead from '@/app/components/core/PageHead';
import Reveal from '@/app/components/core/Reveal';
import ContactForm from '@/app/components/contact/ContactForm';
import {
  MarkMail,
  MarkPin,
  MarkClock,
  ArrowDiagonal,
  GlyphGithub,
  GlyphLinkedin,
  GlyphFiverr,
  GlyphUpwork,
} from '@/app/components/marks';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Start a project with Masab Farooque. Tell me what you are building and what is in the way, and you will get a scope and a straight answer within one working day.',
  alternates: { canonical: `${site.url}/contact` },
};

const glyphs = {
  github: GlyphGithub,
  linkedin: GlyphLinkedin,
  fiverr: GlyphFiverr,
  upwork: GlyphUpwork,
} as const;

export default function ContactPage() {
  return (
    <>
      <PageHead
        index="03"
        label="Contact"
        title="Tell me what you are building"
        intro="The more concrete the message, the more useful my reply. What the product does, who it is for, and what is currently blocking it is usually enough for me to tell you whether I am the right person."
      />

      <section className="shell py-16 md:py-24">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <ContactForm />
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <Reveal y={20}>
              <div className="space-y-6 border-b pb-8" style={{ borderColor: 'var(--line)' }}>
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-start gap-4 transition-colors hover:text-brass"
                >
                  <MarkMail size={19} className="mt-0.5 shrink-0 text-brass" />
                  <span>
                    <span className="eyebrow block">Email</span>
                    <span className="mt-1.5 block break-all text-sm text-bone-2 group-hover:text-brass">
                      {site.email}
                    </span>
                  </span>
                </a>

                <div className="flex items-start gap-4">
                  <MarkPin size={19} className="mt-0.5 shrink-0 text-brass" />
                  <span>
                    <span className="eyebrow block">Based in</span>
                    <span className="mt-1.5 block text-sm text-bone-2">{site.location}</span>
                  </span>
                </div>

                <div className="flex items-start gap-4">
                  <MarkClock size={19} className="mt-0.5 shrink-0 text-brass" />
                  <span>
                    <span className="eyebrow block">Reply time</span>
                    <span className="mt-1.5 block text-sm text-bone-2">
                      Within one working day, {site.timezone}
                    </span>
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="border-b py-8" style={{ borderColor: 'var(--line)' }}>
              <p className="eyebrow mb-5">Elsewhere</p>
              <div className="grid grid-cols-2 gap-3">
                {socials.map((s) => {
                  const Glyph = glyphs[s.glyph as keyof typeof glyphs];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 border px-3.5 py-3 text-sm transition-colors duration-500 hover:border-brass"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      <Glyph size={15} className="text-bone-3 group-hover:text-brass" />
                      <span className="flex-1 truncate text-bone-2">{s.label}</span>
                      <ArrowDiagonal
                        size={11}
                        className="text-brass opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </a>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={0.16} className="py-8">
              <p className="eyebrow mb-5">What happens next</p>
              <ol className="space-y-4">
                {steps.map((step) => (
                  <li key={step.index} className="flex gap-4">
                    <span className="mono mt-0.5 text-[0.62rem] text-brass">{step.index}</span>
                    <span>
                      <span className="block text-sm text-bone">{step.title}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-bone-3">
                        {step.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
