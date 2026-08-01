'use client';

import Link from 'next/link';
import { site } from '@/app/data/site';
import { ArrowLong, Spark } from '@/app/components/marks';
import Magnetic from '@/app/components/core/Magnetic';
import TextReveal from '@/app/components/core/TextReveal';
import Reveal from '@/app/components/core/Reveal';

export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden py-24 md:py-40">
      <div className="warp" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(200,155,82,0.10), transparent 68%)',
          filter: 'blur(30px)',
        }}
      />

      <div className="shell relative text-center">
        <Reveal className="mb-8 flex items-center justify-center gap-3" y={12}>
          <Spark size={11} className="text-brass" />
          <span className="eyebrow">{site.availability}</span>
          <Spark size={11} className="text-brass" />
        </Reveal>

        <TextReveal
          as="h2"
          mode="words"
          text="Have something worth building"
          className="display wash mx-auto max-w-[13ch] text-[clamp(2.6rem,8.5vw,7.5rem)]"
        />

        <Reveal delay={0.15} className="mx-auto mt-8 max-w-xl">
          <p className="lede">
            Tell me what you are trying to make and what is in the way. If I am the right
            person you will get a scope and a number. If I am not, I will say so.
          </p>
        </Reveal>

        <Reveal delay={0.25} className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Magnetic radius={120} pull={0.3}>
            <Link
              href="/contact"
              data-cursor="Say hello"
              className="group relative inline-flex items-center gap-4 overflow-hidden px-10 py-5 text-sm uppercase tracking-[0.16em]"
              style={{ background: 'var(--brass)', color: 'var(--ink)' }}
            >
              <span className="relative z-10">Start a project</span>
              <ArrowLong
                size={17}
                className="relative z-10 transition-transform duration-500 group-hover:translate-x-1.5"
              />
              <span
                className="absolute inset-0 origin-left scale-x-0 transition-transform duration-[650ms] ease-out group-hover:scale-x-100"
                style={{ background: 'var(--brass-hi)' }}
              />
            </Link>
          </Magnetic>

          <a
            href={`mailto:${site.email}`}
            className="display-tight text-[clamp(1rem,1.6vw,1.3rem)] text-bone-2 underline-offset-8 transition-colors duration-500 hover:text-brass hover:underline"
          >
            {site.email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
