'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

/** Registers GSAP plugins once per page load and returns the gsap instance. */
export function initGsap() {
  if (!registered && typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: 'power3.out', duration: 0.9 });
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Headings on this site are painted with a gradient clipped to the text. The
 * moment the text is split into per word spans the parent no longer has any
 * text of its own to clip against, so the whole heading would render as
 * transparent. This copies the parent gradient onto each fragment and offsets
 * the background so the pieces still line up as one continuous wash.
 *
 * Must be called immediately after splitting, while the fragments are still
 * sitting at their final positions.
 */
function inheritTextGradient(parent: HTMLElement, fragments: HTMLElement[]) {
  const style = getComputedStyle(parent);
  const image = style.backgroundImage;
  if (!image || image === 'none') return;

  const parentBox = parent.getBoundingClientRect();
  const width = parentBox.width;
  const height = parentBox.height;

  fragments.forEach((fragment) => {
    const box = fragment.getBoundingClientRect();
    Object.assign(fragment.style, {
      backgroundImage: image,
      backgroundSize: `${width}px ${height}px`,
      backgroundPosition: `${-(box.left - parentBox.left)}px ${-(box.top - parentBox.top)}px`,
      backgroundRepeat: 'no-repeat',
      backgroundClip: 'text',
      webkitBackgroundClip: 'text',
      webkitTextFillColor: 'transparent',
    } as Partial<CSSStyleDeclaration>);
  });
}

/** Splits a string into word spans, each wrapping its own characters. */
export function splitWords(el: HTMLElement) {
  const text = el.textContent ?? '';
  el.textContent = '';
  const words: HTMLSpanElement[] = [];

  text.split(/(\s+)/).forEach((chunk) => {
    if (!chunk) return;
    if (/^\s+$/.test(chunk)) {
      el.appendChild(document.createTextNode(chunk));
      return;
    }
    const outer = document.createElement('span');
    outer.style.display = 'inline-block';
    outer.style.overflow = 'hidden';
    outer.style.verticalAlign = 'top';

    const inner = document.createElement('span');
    inner.style.display = 'inline-block';
    inner.style.willChange = 'transform';
    inner.textContent = chunk;

    outer.appendChild(inner);
    el.appendChild(outer);
    words.push(inner);
  });

  inheritTextGradient(el, words);

  return words;
}

/** Wraps each character in its own span, preserving spaces. */
export function splitChars(el: HTMLElement) {
  const text = el.textContent ?? '';
  el.textContent = '';
  const chars: HTMLSpanElement[] = [];

  Array.from(text).forEach((char) => {
    const span = document.createElement('span');
    span.style.display = 'inline-block';
    span.style.willChange = 'opacity, transform';
    span.textContent = char === ' ' ? ' ' : char;
    el.appendChild(span);
    chars.push(span);
  });

  inheritTextGradient(el, chars);

  return chars;
}

/** Linear interpolation used by the pointer driven effects. */
export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
