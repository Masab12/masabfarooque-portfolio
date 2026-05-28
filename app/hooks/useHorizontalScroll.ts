'use client';

import { useEffect, useRef } from 'react';

export function useHorizontalScroll() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      const { scrollLeft, scrollWidth, clientWidth } = el;
      const atRightEdge = scrollLeft + clientWidth >= scrollWidth - 4;
      const atLeftEdge = scrollLeft <= 4;
      const scrollingRight = e.deltaY > 0;
      const scrollingLeft = e.deltaY < 0;

      if ((scrollingRight && atRightEdge) || (scrollingLeft && atLeftEdge)) return;

      e.preventDefault();
      el.scrollBy({ left: e.deltaY * 2.2, behavior: 'auto' });
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return ref;
}
