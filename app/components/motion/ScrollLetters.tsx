'use client';

import { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

/**
 * Scroll linked reading effect.
 *
 * The paragraph starts dim and lights up as the block is scrolled through, so
 * it reads as if a beam is moving across the text.
 *
 * Animating one span per character looks marginally smoother and costs several
 * hundred DOM nodes per paragraph, which showed up in the Lighthouse DOM size
 * audit. One span per word is visually indistinguishable at reading size and
 * cuts the node count by roughly six times.
 */

function Word({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const point = index / total;
  const opacity = useTransform(progress, [point - 0.12, point + 0.06], [0.2, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}
      {index < total - 1 ? ' ' : ''}
    </motion.span>
  );
}

export default function ScrollLetters({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = useMemo(() => text.split(' ').filter(Boolean), [text]);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          word={word}
          index={i}
          total={words.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
}
