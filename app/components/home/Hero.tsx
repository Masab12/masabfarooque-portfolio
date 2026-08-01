'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { media, nav, site } from '@/app/data/site';
import { ArrowLong } from '@/app/components/marks';
import WordsPullUp from '@/app/components/motion/WordsPullUp';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="snap-start h-[100svh] w-full p-3 sm:p-4 md:p-6">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={media.heroVideo}
          poster={media.heroPoster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden
        />

        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/85" />

        {/* Navigation pill, hanging off the top edge of the frame */}
        <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
          <div className="flex max-w-[96vw] items-center justify-center gap-2.5 overflow-x-auto rounded-b-xl bg-black px-3 py-2 no-scrollbar xs:gap-4 sm:gap-6 sm:rounded-b-2xl sm:px-5 md:gap-10 md:rounded-b-3xl md:px-8 lg:gap-14">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-[10px] leading-none transition-colors duration-300 sm:text-xs md:text-sm"
                style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#E1E0CC';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)';
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Bottom aligned content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-5 sm:px-6 sm:pb-6 md:px-8 md:pb-8">
          <div className="grid grid-cols-1 items-end gap-5 sm:gap-6 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-8">
              <WordsPullUp
                as="h1"
                text={site.shortName}
                showAsterisk
                className="text-[24vw] font-medium leading-[0.85] tracking-[-0.07em] sm:text-[22vw] md:text-[20vw] lg:text-[19vw] xl:text-[18vw]"
              />
            </div>

            <div className="flex flex-col gap-4 sm:gap-5 md:col-span-4 md:pb-6">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
                className="max-w-md text-[0.7rem] text-primary/70 xs:text-xs sm:text-sm md:text-base"
                style={{ lineHeight: 1.2 }}
              >
                Masab Farooque is a full stack engineer in Islamabad building SaaS
                platforms, AI systems and data pipelines. Brought in as an external
                resource by product teams and agencies in 23 countries, from schema
                to interface, first commit to deploy.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
              >
                <Link
                  href="/contact"
                  data-cursor="Say hello"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary py-1.5 pl-6 pr-1.5 text-sm font-medium text-black transition-all duration-300 hover:gap-3 sm:text-base"
                >
                  Start a project
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
                    <ArrowLong size={16} className="text-cream" />
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
