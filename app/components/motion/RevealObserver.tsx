'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Drives every `data-reveal` block on the site with one IntersectionObserver.
 *
 * On first load, anything already on screen is marked as revealed before the
 * `reveal-ready` class goes on the root, so the first screen never blinks
 * out and back. Everything below the fold is hidden from then on and rises
 * in as it arrives. New content, from a route change or a client component
 * rendering late, is picked up by a mutation observer.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    // Chrome counts an element's own clip-path when deciding whether it is
    // visible, so a heading clipped shut by the wipe would never be reported
    // as on screen and would stay hidden for good. Wipe and draw reveals are
    // watched through their parent, which is never clipped, instead.
    const waiting = new Map<Element, Element[]>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (waiting.get(entry.target) ?? [entry.target]).forEach((el) => el.classList.add('is-in'));
          waiting.delete(entry.target);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
    );
    const watch = (el: HTMLElement) => {
      const proxied = el.dataset.reveal === 'wipe' || el.dataset.reveal === 'draw' || el.dataset.reveal === 'scan';
      const target = proxied ? el.parentElement ?? el : el;
      const list = waiting.get(target);
      if (list) list.push(el);
      else waiting.set(target, [el]);
      io.observe(target);
    };

    const seen = new WeakSet<Element>();
    const scan = () => {
      const ready = root.classList.contains('reveal-ready');
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)').forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        if (el.dataset.reveal === 'stagger') {
          Array.from(el.children).forEach((child, i) => (child as HTMLElement).style.setProperty('--i', String(i)));
        }
        if (!ready) {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) {
            el.classList.add('is-in');
            return;
          }
        }
        watch(el);
      });
    };

    scan();
    root.classList.add('reveal-ready');

    // Fallback: the same test on scroll, in case the observer is late or a
    // browser gets clipping wrong. All rects are read before any class is
    // written, so this never forces layout in a loop.
    let checking = 0;
    const check = () => {
      checking = 0;
      const limit = window.innerHeight * 0.92;
      const due: Element[] = [];
      waiting.forEach((_, target) => {
        const r = target.getBoundingClientRect();
        if (r.top < limit && r.bottom > 0) due.push(target);
      });
      due.forEach((target) => {
        waiting.get(target)?.forEach((el) => el.classList.add('is-in'));
        waiting.delete(target);
        io.unobserve(target);
      });
    };
    const onScroll = () => {
      if (!checking) checking = requestAnimationFrame(check);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    let queued = false;
    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        scan();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(checking);
    };
  }, [pathname]);

  return null;
}
