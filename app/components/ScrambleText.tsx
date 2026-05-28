'use client';

import { useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&!?';

// Module-level flag so re-mounts after load don't wait again
let portfolioLoaded = false;

export default function ScrambleText({
  text,
  className = '',
  delay = 0,
  speed = 26,
}: {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const totalFrames = text.length * 3;
    let intervalId: ReturnType<typeof setInterval>;
    let timeoutId: ReturnType<typeof setTimeout>;

    const run = () => {
      timeoutId = setTimeout(() => {
        intervalId = setInterval(() => {
          frame++;
          el.textContent = text
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' ';
              if (i < Math.floor(frame / 3)) return char;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('');

          if (frame >= totalFrames) {
            clearInterval(intervalId);
            el.textContent = text;
          }
        }, speed);
      }, delay);
    };

    const cleanup = () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };

    if (portfolioLoaded) {
      run();
      return cleanup;
    }

    const onLoad = () => {
      portfolioLoaded = true;
      run();
    };

    window.addEventListener('portfolio-loaded', onLoad, { once: true });

    return () => {
      window.removeEventListener('portfolio-loaded', onLoad);
      cleanup();
    };
  }, [text, delay, speed]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
