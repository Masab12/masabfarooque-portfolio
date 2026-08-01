'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { site } from '@/app/data/site';
import { ArrowLong } from '@/app/components/marks';
import WordsPullUpMultiStyle from '@/app/components/motion/WordsPullUpMultiStyle';
import Magnetic from '@/app/components/core/Magnetic';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ContactCTA() {
  return (
    <section className="bg-black px-4 py-12 sm:px-6 md:px-8 md:py-20">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-[#101010] px-5 py-20 text-center sm:px-10 md:rounded-[2rem] md:py-28">
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.12]" />

        <div className="relative">
          <p className="text-[10px] text-primary sm:text-xs">{site.availability}</p>

          <div className="mx-auto mt-8 max-w-3xl">
            <WordsPullUpMultiStyle
              className="text-3xl leading-[0.95] sm:text-4xl sm:leading-[0.9] md:text-5xl lg:text-6xl"
              segments={[
                { text: 'Tell me what you are' },
                { text: 'trying to build.', className: 'serif-italic' },
              ]}
            />
          </div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="mx-auto mt-7 max-w-xl text-xs text-primary/70 sm:text-sm md:text-base"
            style={{ lineHeight: 1.5 }}
          >
            If I am the right person you will get a scope and a number in writing. If I am
            not, I will say so and point you somewhere better.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
            className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row"
          >
            <Magnetic radius={110} pull={0.28}>
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
            </Magnetic>

            <a
              href={`mailto:${site.email}`}
              className="text-sm text-gray-400 underline-offset-8 transition-colors duration-300 hover:text-cream hover:underline"
            >
              {site.email}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
