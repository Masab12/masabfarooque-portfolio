'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { MarkArrow45 } from '@/app/components/marks';

export type ScheduleRow = { slug: string; title: string; line: string; timeline: string; pricing: string };

/**
 * The service schedule, with a pipe running down its left edge. A packet
 * travels the pipe as the reader scrolls through the list, and each row
 * lights up as the packet reaches it, so the list is read as a run of
 * stations rather than a table.
 */
export default function ScheduleList({ rows }: { rows: ScheduleRow[] }) {
  const listRef = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const [lit, setLit] = useState(-1);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let raf = 0;
    const read = () => {
      raf = 0;
      const rect = list.getBoundingClientRect();
      const anchor = window.innerHeight * 0.62;
      const p = Math.min(1, Math.max(0, (anchor - rect.top) / rect.height));
      setProgress(p);
      const y = p * rect.height;
      let last = -1;
      list.querySelectorAll<HTMLElement>('[data-row]').forEach((row, i) => {
        if (row.offsetTop + 24 <= y) last = i;
      });
      setLit(last);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative mt-12 sm:mt-14">
      {/* The pipe and its packet */}
      <div aria-hidden className="absolute bottom-0 left-[0.6rem] top-0 w-[3px] rounded-full bg-ink/10 md:left-[0.85rem]">
        <div className="absolute inset-x-0 top-0 origin-top rounded-full bg-sage" style={{ height: '100%', transform: `scaleY(${progress})` }} />
        <div
          className="absolute left-1/2 h-3 w-3 -translate-x-1/2 border bg-paper"
          style={{ top: `calc(${progress * 100}% - 6px)`, borderColor: 'var(--clay)', boxShadow: '0 0 0 3px rgb(var(--clay-rgb) / 0.15)' }}
        />
      </div>

      <div className="label hidden grid-cols-12 gap-6 border-b py-3 pl-10 md:grid" style={{ borderColor: 'var(--line)' }}>
        <span className="col-span-4">Service</span>
        <span className="col-span-5">What it covers</span>
        <span className="col-span-2">Typical length</span>
        <span className="col-span-1 text-right">Sheet</span>
      </div>

      <ul ref={listRef} className="relative">
        {rows.map((row, i) => {
          const on = i <= lit;
          return (
            <li key={row.slug} data-row className="relative border-b" style={{ borderColor: 'var(--line)' }}>
              {/* Station marker on the pipe */}
              <span
                aria-hidden
                className={`absolute left-[0.6rem] top-9 h-[11px] w-[11px] -translate-x-[4px] rounded-full border-2 transition-colors duration-500 md:left-[0.85rem] ${
                  on ? 'border-sage bg-sage' : 'border-ink/25 bg-paper'
                }`}
              />
              <Link href={`/services/${row.slug}`} className="group grid gap-2 py-6 pl-10 md:grid-cols-12 md:items-baseline md:gap-6 md:py-7">
                <span
                  className={`text-[clamp(1.25rem,1.05rem+0.8vw,1.7rem)] font-extrabold leading-tight tracking-[-0.02em] transition-colors duration-500 group-hover:text-sage md:col-span-4 ${
                    on ? 'text-ink' : 'text-ink/45'
                  }`}
                >
                  {row.title}
                </span>
                <span className={`text-[0.98rem] leading-relaxed transition-colors duration-500 md:col-span-5 ${on ? 'text-ink-2' : 'text-ink-3'}`}>{row.line}</span>
                <span className="mono flex flex-wrap gap-x-3 text-[0.8125rem] text-ink-2 md:col-span-2 md:block">
                  <span>{row.timeline}</span>
                  <span className="text-ink-3 md:mt-1 md:block">{row.pricing}</span>
                </span>
                <span className="mono hidden items-center justify-end gap-2 text-[0.75rem] text-ink-3 md:col-span-1 md:flex">
                  A-02.{i + 1}
                  <MarkArrow45 size={10} className="text-sage transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
