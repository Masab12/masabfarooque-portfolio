'use client';

import { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

/**
 * Scroll linked reading effect.
 *
 * Every character sits at 0.2 opacity and brightens to full as the block is
 * scrolled through, so the paragraph reads as if it is being lit a word at a
 * time. Characters are grouped into word spans, otherwise a paragraph made of
 * one span per character has no break opportunities and runs off the page.
 */

function Letter({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const point = index / total;
  const opacity = useTransform(progress, [point - 0.1, point + 0.05], [0.2, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char}
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

  // Words carry their own starting index so the reveal still runs character by
  // character across the whole paragraph rather than restarting per word.
  const { words, total } = useMemo(() => {
    const mapped: { word: string; start: number }[] = [];
    let cursor = 0;

    for (const word of text.split(' ')) {
      mapped.push({ word, start: cursor });
      cursor += word.length + 1;
    }

    return { words: mapped, total: cursor };
  }, [text]);

  return (
    <p ref={ref} className={className}>
      {words.map(({ word, start }, wi) => (
        <span key={`${word}-${wi}`} className="inline-block whitespace-nowrap">
          {Array.from(word).map((char, ci) => (
            <Letter
              key={ci}
              char={char}
              index={start + ci}
              total={total}
              progress={scrollYProgress}
            />
          ))}
          {wi < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </span>
      ))}
    </p>
  );
}
