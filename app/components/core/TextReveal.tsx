'use client';

import { useEffect, useRef, ElementType } from 'react';
import { initGsap, prefersReducedMotion, splitWords, splitChars } from '@/app/lib/motion';

type Mode = 'words' | 'chars' | 'read';

type TextRevealProps = {
  text: string;
  as?: ElementType;
  className?: string;
  mode?: Mode;
  delay?: number;
  stagger?: number;
  start?: string;
  style?: React.CSSProperties;
};

/**
 * Three text behaviours, one component.
 *
 * words  each word slides up from behind a mask, once, on entry
 * chars  each character lifts and fades, tighter and faster, for headings
 * read   characters brighten as the section is scrolled through, scrubbed
 */
export default function TextReveal({
  text,
  as: Tag = 'p',
  className,
  mode = 'words',
  delay = 0,
  stagger,
  start = 'top 85%',
  style,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.style.opacity = '1';
      return;
    }

    const { gsap } = initGsap();
    const original = el.textContent ?? '';

    const ctx = gsap.context(() => {
      el.style.opacity = '1';

      if (mode === 'read') {
        const chars = splitChars(el);
        gsap.fromTo(
          chars,
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.55,
            duration: 1,
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
              end: 'bottom 42%',
              scrub: 0.6,
            },
          },
        );
        return;
      }

      if (mode === 'chars') {
        const chars = splitChars(el);
        gsap.fromTo(
          chars,
          { opacity: 0, yPercent: 60, rotate: 2 },
          {
            opacity: 1,
            yPercent: 0,
            rotate: 0,
            duration: 0.9,
            delay,
            ease: 'power3.out',
            stagger: stagger ?? 0.018,
            scrollTrigger: { trigger: el, start, once: true },
          },
        );
        return;
      }

      const words = splitWords(el);
      gsap.fromTo(
        words,
        { yPercent: 108 },
        {
          yPercent: 0,
          duration: 1.15,
          delay,
          ease: 'power4.out',
          stagger: stagger ?? 0.035,
          scrollTrigger: { trigger: el, start, once: true },
          // The masks exist only to hide the words on the way up. Once they
          // have landed the masks are opened so descenders are not clipped.
          onComplete: () => {
            words.forEach((word) => {
              if (word.parentElement) word.parentElement.style.overflow = 'visible';
            });
          },
        },
      );
    }, el);

    return () => {
      ctx.revert();
      el.textContent = original;
    };
  }, [text, mode, delay, stagger, start]);

  return (
    <Tag ref={ref} className={className} style={{ opacity: 0, ...style }}>
      {text}
    </Tag>
  );
}
