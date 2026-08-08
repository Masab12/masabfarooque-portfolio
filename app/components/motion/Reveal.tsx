'use client';

import { motion } from 'framer-motion';
import type { ElementType } from 'react';

type RevealProps = {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
  /** Anchor target, so a revealed block can be linked to directly. */
  id?: string;
  delay?: number;
  y?: number;
  /** Stagger the direct children instead of animating the wrapper. */
  stagger?: number;
};

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The one entrance animation on the site. Everything rises a short distance
 * and fades on the same curve, so the page reads as a single piece of
 * choreography rather than a pile of separate effects.
 */
export default function Reveal({
  children,
  as = 'div',
  className,
  style,
  id,
  delay = 0,
  y = 20,
  stagger,
}: RevealProps) {
  const Tag = motion[as as 'div'] ?? motion.div;

  if (stagger) {
    return (
      <Tag
        id={id}
        className={className}
        style={style}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: '-60px' }}
        variants={{
          hidden: {},
          shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Child of a staggered Reveal. */
export function RevealItem({
  children,
  className,
  style,
  y = 16,
  as = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  y?: number;
  as?: ElementType;
}) {
  const Tag = motion[as as 'div'] ?? motion.div;

  return (
    <Tag
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y },
        shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      }}
    >
      {children}
    </Tag>
  );
}
