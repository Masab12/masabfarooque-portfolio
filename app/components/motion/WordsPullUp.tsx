'use client';

import { Fragment, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type Props = {
  text: string;
  className?: string;
  /** Puts a superscript asterisk on the last character of the last word. */
  showAsterisk?: boolean;
  delayOffset?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
};

/**
 * Splits a line into words and slides each one up into place, staggered.
 * Fires once, the first time the block enters the viewport.
 */
export default function WordsPullUp({
  text,
  className = '',
  showAsterisk = false,
  delayOffset = 0,
  as: Tag = 'div',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const words = text.split(' ');

  const MotionTag = motion[Tag] as typeof motion.div;

  return (
    <MotionTag ref={ref} className={className}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        const head = isLast && showAsterisk ? word.slice(0, -1) : word;
        const tail = isLast && showAsterisk ? word.slice(-1) : '';

        return (
          // The space between words is a real text node rather than padding on
          // the span. Padding looks identical but leaves the heading's text
          // content as one run-together string, which is what a crawler and a
          // screen reader both read.
          <Fragment key={`${word}-${i}`}>
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: delayOffset + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block"
            >
              {tail ? (
                <span className="relative inline-block">
                  {head}
                  <span className="relative inline-block">
                    {tail}
                    <span className="absolute -right-[0.3em] top-[0.65em] text-[0.31em] font-normal">
                      *
                    </span>
                  </span>
                </span>
              ) : (
                word
              )}
            </motion.span>
            {isLast ? null : ' '}
          </Fragment>
        );
      })}
    </MotionTag>
  );
}
