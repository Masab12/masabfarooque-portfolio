'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { media, site } from '@/app/data/site';
import { ArrowLong } from '@/app/components/marks';
import WordsPullUp from '@/app/components/motion/WordsPullUp';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Casts an x/y offset onto a small rotation and translate for a subtle tilt. */
function useTilt() {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 150, damping: 20, mass: 0.5 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const rotateX = useTransform(sy, [0, 1], [3, -3]);
  const rotateY = useTransform(sx, [0, 1], [-4, 4]);
  const moveX = useTransform(sx, [0, 1], [-14, 14]);
  const moveY = useTransform(sy, [0, 1], [-14, 14]);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const onPointerLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return { rotateX, rotateY, moveX, moveY, onPointerMove, onPointerLeave };
}

export default function Hero() {
  const frameRef = useRef<HTMLDivElement>(null);
  const { rotateX, rotateY, moveX, moveY, onPointerMove, onPointerLeave } = useTilt();

  return (
    <section className="snap-start h-[100svh] w-full p-3 sm:p-4 md:p-6">
      <div
        ref={frameRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="relative h-full w-full overflow-hidden rounded-2xl [perspective:1200px] md:rounded-[2rem]"
      >
        <motion.video
          className="absolute inset-0 h-full w-full object-cover"
          src={media.heroVideo}
          poster={media.heroPoster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden
          initial={{ scale: 1.08 }}
          animate={{ scale: [1.08, 1.14, 1.08] }}
          whileHover={{ scale: 1.18, transition: { duration: 0.7, ease: EASE } }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          style={{ x: moveX, y: moveY, rotateX, rotateY }}
        />

        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/85" />

        {/* Bottom aligned content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-5 sm:px-6 sm:pb-6 md:px-8 md:pb-8">
          <div className="grid grid-cols-1 items-end gap-5 sm:gap-6 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-8">
              <WordsPullUp
                as="h1"
                text={site.shortName}
                showAsterisk
                className="text-[16vw] font-medium leading-[0.85] tracking-[-0.07em] sm:text-[14vw] md:text-[12vw] lg:text-[11vw] xl:text-[9.5vw] 3xl:text-[10.7rem]"
              />
            </div>

            <div className="flex flex-col gap-4 sm:gap-5 md:col-span-4">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
                className="max-w-md text-sm text-cream/90 sm:text-base md:text-lg"
                style={{ lineHeight: 1.45 }}
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
