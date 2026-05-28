'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { timeline } from '@/app/data/timeline';
import type { AccentColor } from '@/app/data/timeline';

const colorMap: Record<AccentColor, { border: string; bg: string; dot: string; tag: string }> = {
  cyan:   { border: 'rgba(0,240,255,0.35)',   bg: 'rgba(0,240,255,0.06)',   dot: 'rgb(0,240,255)',    tag: 'rgba(0,240,255,0.12)' },
  violet: { border: 'rgba(139,92,246,0.35)',  bg: 'rgba(139,92,246,0.06)', dot: 'rgb(139,92,246)',   tag: 'rgba(139,92,246,0.12)' },
  gold:   { border: 'rgba(251,191,36,0.45)',  bg: 'rgba(251,191,36,0.07)', dot: 'rgb(251,191,36)',   tag: 'rgba(251,191,36,0.12)' },
  silver: { border: 'rgba(200,200,220,0.35)', bg: 'rgba(200,200,220,0.06)', dot: 'rgb(200,200,220)', tag: 'rgba(200,200,220,0.1)' },
  green:  { border: 'rgba(16,185,129,0.35)',  bg: 'rgba(16,185,129,0.06)', dot: 'rgb(16,185,129)',   tag: 'rgba(16,185,129,0.12)' },
};

type ColorConfig = { border: string; bg: string; dot: string; tag: string };

function CardContent({ entry, c }: { entry: typeof timeline[0]; c: ColorConfig }) {
  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-bold font-mono" style={{ color: c.dot }}>{entry.year}</span>
        {entry.isAward && (
          <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: c.tag, color: c.dot }}>
            Award
          </span>
        )}
      </div>
      <h3 className="font-heading text-base font-bold mb-1" style={{ color: '#f8f9fa' }}>{entry.title}</h3>
      {entry.organization && (
        <p className="text-xs font-medium mb-2" style={{ color: c.dot }}>{entry.organization}</p>
      )}
      <p className="text-text-muted text-sm leading-relaxed mb-3">{entry.description}</p>
      {entry.tags && (
        <div className="flex flex-wrap gap-1.5">
          {entry.tags.slice(0, 4).map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-md text-text-muted" style={{ backgroundColor: c.tag }}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </>
  );
}

function TimelineItem({ entry, index }: { entry: typeof timeline[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isLeft = index % 2 === 0;
  const c = colorMap[entry.accentColor];

  return (
    <div ref={ref} className="grid grid-cols-[1fr_48px_1fr] gap-0 mb-8 last:mb-0 items-start">
      {/* Left card */}
      <div className="pr-6 flex justify-end">
        {isLeft ? (
          <motion.div
            className="glass-card p-5 rounded-2xl w-full max-w-xs border"
            style={{ borderColor: c.border, backgroundColor: c.bg }}
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <CardContent entry={entry} c={c} />
          </motion.div>
        ) : null}
      </div>

      {/* Center dot — sits exactly on the line */}
      <div className="flex flex-col items-center pt-5">
        <motion.div
          className="w-4 h-4 rounded-full z-10 relative flex-shrink-0"
          style={{
            backgroundColor: c.dot,
            boxShadow: `0 0 0 3px #0e0e1a, 0 0 14px ${c.dot}90`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.35, delay: 0.1 }}
        />
      </div>

      {/* Right card */}
      <div className="pl-6 flex justify-start">
        {!isLeft ? (
          <motion.div
            className="glass-card p-5 rounded-2xl w-full max-w-xs border"
            style={{ borderColor: c.border, backgroundColor: c.bg }}
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <CardContent entry={entry} c={c} />
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}

function MobileTimelineItem({ entry }: { entry: typeof timeline[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const c = colorMap[entry.accentColor];

  return (
    <div ref={ref} className="flex gap-4 mb-7 last:mb-0">
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          className="w-3.5 h-3.5 rounded-full mt-5 flex-shrink-0"
          style={{ backgroundColor: c.dot, boxShadow: `0 0 0 2px #0e0e1a, 0 0 10px ${c.dot}80` }}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.1 }}
        />
      </div>
      <motion.div
        className="glass-card p-4 rounded-2xl flex-1 border"
        style={{ borderColor: c.border, backgroundColor: c.bg }}
        initial={{ opacity: 0, x: 16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <CardContent entry={entry} c={c} />
      </motion.div>
    </div>
  );
}

function AnimatedLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.1'],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={ref}
      className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px hidden md:block"
      style={{ background: 'rgba(255,255,255,0.07)' }}
    >
      <motion.div
        className="absolute inset-x-0 top-0"
        style={{
          background: 'linear-gradient(to bottom, rgb(0,240,255), rgb(139,92,246), rgb(0,240,255))',
          scaleY,
          transformOrigin: 'top',
          height: '100%',
        }}
      />
    </div>
  );
}

function MobileLineTrack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.1'],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={ref}
      className="absolute left-[7px] top-0 bottom-0 w-px md:hidden"
      style={{ background: 'rgba(255,255,255,0.07)' }}
    >
      <motion.div
        className="absolute inset-x-0 top-0 h-full"
        style={{
          background: 'linear-gradient(to bottom, rgb(0,240,255), rgb(139,92,246))',
          scaleY,
          transformOrigin: 'top',
        }}
      />
    </div>
  );
}

export default function TimelineSection() {
  return (
    <section className="section-violet relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-4" style={{ color: '#f8f9fa' }}>
            The Journey
          </h2>
          <div className="w-20 h-1 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg, rgb(0,240,255), rgb(139,92,246))' }} />
          <p className="mt-4 text-text-secondary text-base sm:text-lg max-w-xl mx-auto">
            From a university student writing blog posts to building SaaS platforms for clients in 15 countries.
          </p>
        </motion.div>

        {/* Desktop timeline */}
        <div className="relative hidden md:block">
          <AnimatedLine />
          {timeline.map((entry, i) => (
            <TimelineItem key={entry.id} entry={entry} index={i} />
          ))}
        </div>

        {/* Mobile timeline */}
        <div className="relative md:hidden pl-6">
          <MobileLineTrack />
          {timeline.map(entry => (
            <MobileTimelineItem key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}
