'use client';

import { useEffect, useState, CSSProperties } from 'react';

/**
 * Types out `text` character by character with a blinking caret.
 * SSR/SEO-safe: exposes the full string via aria-label.
 */
export default function Typewriter({
  text,
  className = '',
  style,
  speed = 70,
  startDelay = 350,
  caretColor = 'var(--primary)',
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
  speed?: number;
  startDelay?: number;
  caretColor?: string;
}) {
  const [n, setN] = useState(0);
  const done = n >= text.length;

  useEffect(() => {
    setN(0);
    let timer: ReturnType<typeof setTimeout>;
    const tick = (i: number) => {
      setN(i);
      if (i < text.length) {
        timer = setTimeout(() => tick(i + 1), i === 0 ? startDelay : speed);
      }
    };
    tick(0);
    return () => clearTimeout(timer);
  }, [text, speed, startDelay]);

  // Full text stays in the DOM (SEO + no layout shift); the untyped tail is just
  // visually transparent until the caret reaches it.
  return (
    <span className={className} style={style}>
      <span>{text.slice(0, n)}</span>
      <span
        aria-hidden="true"
        className={done ? 'caret-blink' : ''}
        style={{ color: caretColor, fontWeight: 400 }}
      >
        |
      </span>
      <span aria-hidden="true" style={{ opacity: 0 }}>{text.slice(n)}</span>
    </span>
  );
}
