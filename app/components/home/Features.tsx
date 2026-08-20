'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { featureCards } from '@/app/data/capabilities';
import {
  MarkCheck,
  ArrowLong,
  MarkStack,
  MarkCore,
  MarkVault,
} from '@/app/components/marks';
import WordsPullUpMultiStyle from '@/app/components/motion/WordsPullUpMultiStyle';

const marks = { stack: MarkStack, core: MarkCore, vault: MarkVault } as const;

const CARD_EASE = [0.22, 1, 0.36, 1] as const;

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="capabilities" className="snap-start relative bg-black py-14 sm:py-20 md:py-24 lg:py-28">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />

      <div className="shell relative">
        <div className="max-w-3xl">
          <WordsPullUpMultiStyle
            as="h2"
            align="left"
            className="text-lg font-normal leading-snug sm:text-2xl md:text-3xl lg:text-4xl"
            segments={[{ text: 'Studio grade engineering for products that have to work.' }]}
          />
          <WordsPullUpMultiStyle
            align="left"
            delayOffset={0.15}
            className="text-lg font-normal leading-snug text-gray-500 sm:text-2xl md:text-3xl lg:text-4xl"
            segments={[{ text: 'Built once. Handed over clean.' }]}
          />
        </div>

        <div
          ref={ref}
          className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4 lg:gap-3 lg:min-h-[480px]"
        >
          {/* Video card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0, ease: CARD_EASE }}
            className="relative h-[260px] overflow-hidden rounded-xl sm:h-[320px] lg:h-auto lg:min-h-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGE2Zm1vZXF6bGQ0bTM0N3RpNzJhY25qeWZwcGFpM214NzZwNGlkMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bGgsc5mWoryfgKBx1u/giphy.gif"
              alt=""
              aria-hidden="true"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <p
              className="absolute bottom-5 left-5 right-5 text-base md:text-lg"
              style={{ color: '#E1E0CC' }}
            >
              Your product, built end to end.
            </p>
          </motion.div>

          {featureCards.map((card, i) => {
            const Mark = marks[card.mark];
            return (
              <motion.article
                key={card.number}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: (i + 1) * 0.15, ease: CARD_EASE }}
                className="flex h-full flex-col rounded-xl bg-[#212121] p-5 sm:p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-black sm:h-12 sm:w-12">
                  <Mark size={20} className="text-primary" />
                </span>

                <div className="mt-5 flex items-baseline justify-between gap-3">
                  <h3 className="text-base sm:text-lg" style={{ color: '#E1E0CC' }}>
                    {card.title}
                  </h3>
                  <span className="text-[10px] text-gray-500">{card.number}</span>
                </div>

                <ul className="mt-5 flex-1 space-y-3">
                  {card.items.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <MarkCheck size={13} className="mt-[3px] shrink-0 text-primary" />
                      <span className="text-[13px] leading-relaxed text-gray-400 sm:text-sm">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={card.href}
                  className="group mt-6 inline-flex items-center gap-2 text-[13px] text-primary sm:text-sm"
                >
                  Learn more<span className="sr-only"> about {card.title.replace(/\.$/, '')}</span>
                  <ArrowLong
                    size={13}
                    className="-rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
