'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { initGsap, prefersReducedMotion } from '@/app/lib/motion';
import { site, stats } from '@/app/data/site';
import { ArrowDown, ArrowLong } from '@/app/components/marks';
import HeroField from './HeroField';
import Magnetic from '@/app/components/core/Magnetic';

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const { gsap } = initGsap();
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('[data-hero]', { opacity: 1, yPercent: 0, y: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        '[data-hero-line]',
        { yPercent: 116 },
        {
          yPercent: 0,
          duration: 1.35,
          stagger: 0.09,
          // The masks only exist for the entrance. Opening them afterwards
          // stops the Q tail in Farooque from being cut off.
          onComplete: () => {
            el.querySelectorAll<HTMLElement>('.rv-mask').forEach((mask) => {
              mask.style.overflow = 'visible';
            });
          },
        },
        0.15,
      )
        .fromTo('[data-hero-rule]', { scaleX: 0 }, { scaleX: 1, duration: 1.2 }, 0.5)
        .fromTo(
          '[data-hero-fade]',
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.09 },
          0.7,
        );

      // The whole headline drifts up and dims as the next section arrives.
      gsap.to('[data-hero-parallax]', {
        yPercent: -18,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.5 },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-[var(--nav-h)]"
    >
      <HeroField />
      <div className="warp" />

      <div className="shell relative z-10 flex flex-1 flex-col justify-center py-10">
        <div data-hero-parallax>
          <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 md:mb-9">
            <span data-hero-fade className="eyebrow" style={{ opacity: 0 }}>
              {site.location}
            </span>
            <span data-hero-fade className="eyebrow" style={{ opacity: 0 }}>
              {site.timezone}
            </span>
            <span data-hero-fade className="eyebrow text-brass" style={{ opacity: 0 }}>
              Since {site.yearsActive}
            </span>
          </div>

          <h1 className="display text-[clamp(3.4rem,15.5vw,15rem)] uppercase">
            <span className="rv-mask">
              <span data-hero-line className="rv-line wash">
                Masab
              </span>
            </span>
            <span className="rv-mask">
              <span data-hero-line className="rv-line foil">
                Farooque
              </span>
            </span>
          </h1>

          <div
            data-hero-rule
            className="mt-8 h-px w-full origin-left md:mt-10"
            style={{ background: 'var(--line-2)', transform: 'scaleX(0)' }}
          />

          <div className="mt-7 grid gap-8 md:grid-cols-12 md:items-start">
            <p
              data-hero-fade
              className="lede max-w-md md:col-span-5"
              style={{ opacity: 0 }}
            >
              Full stack engineer. I take products from an empty repository to something
              people pay to use, and I stay for the parts nobody demos.
            </p>

            <div data-hero-fade className="md:col-span-4 md:col-start-7" style={{ opacity: 0 }}>
              <p className="eyebrow mb-3">Currently</p>
              <p className="text-sm leading-relaxed text-bone-2">
                Building the audio editor at Chord.fm and internal AI tooling at
                Skylight Studio, alongside select client work.
              </p>
            </div>

            <div
              data-hero-fade
              className="flex items-start md:col-span-2 md:col-start-11 md:justify-end"
              style={{ opacity: 0 }}
            >
              <Magnetic radius={90} pull={0.26}>
                <Link
                  href="/portfolio"
                  data-cursor="See the work"
                  className="group inline-flex items-center gap-3 border px-6 py-3.5 text-sm transition-colors duration-500 hover:border-brass"
                  style={{ borderColor: 'var(--line-2)' }}
                >
                  <span>Selected work</span>
                  <ArrowLong
                    size={16}
                    className="text-brass transition-transform duration-500 group-hover:translate-x-1"
                  />
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="shell flex items-stretch justify-between">
          <dl className="grid flex-1 grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                data-hero-fade
                className="py-5 pr-6 md:py-6"
                style={{
                  opacity: 0,
                  borderLeft: i === 0 ? 'none' : '1px solid var(--line)',
                  paddingLeft: i === 0 ? 0 : 'clamp(1rem, 2.5vw, 2.5rem)',
                }}
              >
                <dt className="eyebrow mb-2 flex min-h-[1.9em] items-start text-[0.6rem] leading-[1.5]">
                  {stat.label}
                </dt>
                <dd className="display-tight text-[clamp(1.5rem,3.4vw,2.6rem)] text-bone">
                  {stat.value}
                  <span className="text-brass">{stat.suffix}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div
            data-hero-fade
            className="hidden items-center pl-8 lg:flex"
            style={{ opacity: 0, borderLeft: '1px solid var(--line)' }}
          >
            <span className="eyebrow mr-3">Scroll</span>
            <ArrowDown size={18} className="animate-bounce text-brass" />
          </div>
        </div>
      </div>
    </section>
  );
}
