'use client';

import { Fragment, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { ElementType } from 'react';

export type Segment = { text: string; className?: string };

type Props = {
  segments: Segment[];
  className?: string;
  align?: 'center' | 'left';
  delayOffset?: number;
  as?: ElementType;
};

/**
 * Same pull up as WordsPullUp, but the line is built from segments that each
 * carry their own styling. That is what lets one sentence switch into
 * Instrument Serif italic mid thought and switch back out again.
 */
export default function WordsPullUpMultiStyle({
  segments,
  className = '',
  align = 'center',
  delayOffset = 0,
  as = 'div',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const words = segments.flatMap((segment) =>
    segment.text
      .split(' ')
      .filter(Boolean)
      .map((word) => ({ word, className: segment.className ?? '' })),
  );

  const Tag = motion[as as 'div'] ?? motion.div;

  return (
    // Normal inline flow rather than flex. A flex container drops
    // whitespace-only text nodes, so the words would render correctly and
    // still leave the heading's text content as one unbroken string for
    // crawlers and screen readers.
    <Tag
      ref={ref}
      className={`${align === 'center' ? 'text-center' : 'text-left'} ${className}`}
    >
      {words.map((item, i) => (
        <Fragment key={`${item.word}-${i}`}>
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: delayOffset + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`inline-block ${item.className}`}
          >
            {item.word}
          </motion.span>
          {i === words.length - 1 ? null : ' '}
        </Fragment>
      ))}
    </Tag>
  );
}
