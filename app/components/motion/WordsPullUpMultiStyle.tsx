'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export type Segment = { text: string; className?: string };

type Props = {
  segments: Segment[];
  className?: string;
  align?: 'center' | 'left';
  delayOffset?: number;
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
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const words = segments.flatMap((segment) =>
    segment.text
      .split(' ')
      .filter(Boolean)
      .map((word) => ({ word, className: segment.className ?? '' })),
  );

  return (
    <div
      ref={ref}
      className={`inline-flex flex-wrap ${
        align === 'center' ? 'justify-center' : 'justify-start'
      } ${className}`}
    >
      {words.map((item, i) => (
        <motion.span
          key={`${item.word}-${i}`}
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: 0.6,
            delay: delayOffset + i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`inline-block ${item.className}`}
          style={{ paddingRight: '0.24em' }}
        >
          {item.word}
        </motion.span>
      ))}
    </div>
  );
}
