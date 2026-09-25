'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cv, site, stack } from '@/app/data/site';

export type TermProject = { slug: string; title: string; category: string; year: string };
export type TermService = { slug: string; title: string; timeline: string };
export type TermReviews = { total: number; average: number; countries: number; repeatShare: number };

type Out = { id: number; kind: 'cmd' | 'text' | 'dim' | 'hot'; text: React.ReactNode };

const COMMANDS = ['help', 'whoami', 'ls work', 'open', 'stack', 'services', 'reviews', 'date', 'contact', 'cv', 'clear', 'sudo hire masab'];

/**
 * A working terminal. Every command answers from the same data the rest of
 * the site reads, so nothing it says can disagree with the pages. It types
 * `whoami` by itself the first time it scrolls into view. On a phone, the
 * chips underneath run the common commands without a keyboard.
 */
export default function Terminal({
  projects,
  services,
  reviews,
}: {
  projects: TermProject[];
  services: TermService[];
  reviews: TermReviews;
}) {
  const router = useRouter();
  const [out, setOut] = useState<Out[]>([]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const [typing, setTyping] = useState(false);
  const idRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const booted = useRef(false);

  const print = useCallback((kind: Out['kind'], text: React.ReactNode) => {
    idRef.current += 1;
    const id = idRef.current;
    setOut((prev) => [...prev, { id, kind, text }].slice(-60));
  }, []);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [out]);

  const run = useCallback(
    (raw: string) => {
      const line = raw.trim();
      print('cmd', line || ' ');
      if (!line) return;
      setHistory((h) => [...h.filter((x) => x !== line), line].slice(-30));
      setCursor(-1);
      const [cmd, ...args] = line.split(/\s+/);
      const arg = args.join(' ').toLowerCase();

      switch (cmd.toLowerCase()) {
        case 'help':
          [
            ['whoami', 'who this is'],
            ['ls work', 'the case studies'],
            ['open <n>', 'open one, by number or name'],
            ['stack', 'tools I use'],
            ['services', 'what you can hire me for'],
            ['reviews', 'what clients said'],
            ['date', 'the time in Islamabad right now'],
            ['contact', 'how to reach me'],
            ['cv', 'download the CV'],
            ['clear', 'empty the screen'],
          ].forEach(([c, d]) => print('text', <><span className="inline-block w-24 text-sage">{c}</span><span className="text-ink-2">{d}</span></>));
          break;
        case 'whoami':
          print('text', `${site.name}. ${site.role}, ${site.location} (${site.timezone}).`);
          print('text', 'SaaS platforms, AI systems and data pipelines, built end to end.');
          print('hot', `${site.availability.toLowerCase()}.`);
          break;
        case 'ls':
          if (arg && arg !== 'work' && arg !== 'projects') {
            print('dim', `ls: ${arg}: no such directory. Try ls work.`);
            break;
          }
          projects.forEach((p, i) =>
            print('text', <><span className="inline-block w-8 text-ink-3">{String(i + 1).padStart(2, '0')}</span><span className="inline-block min-w-[14rem]">{p.title}</span><span className="text-ink-3">{p.category}, {p.year}</span></>),
          );
          print('dim', 'open <n> to read one');
          break;
        case 'open':
        case 'cd': {
          const n = Number.parseInt(arg, 10);
          const hit = Number.isFinite(n)
            ? projects[n - 1]
            : projects.find((p) => p.slug.includes(arg.replace(/\s+/g, '-')) || p.title.toLowerCase().includes(arg));
          if (!arg || !hit) {
            print('dim', `open: nothing matches ${arg ? `"${arg}"` : 'that'}. Try ls work.`);
            break;
          }
          print('hot', `opening /portfolio/${hit.slug}`);
          window.setTimeout(() => router.push(`/portfolio/${hit.slug}`), 650);
          break;
        }
        case 'stack':
          stack.forEach((g) => print('text', <><span className="inline-block w-24 text-sage">{g.group}</span><span>{g.items.join(', ')}</span></>));
          break;
        case 'services':
          services.forEach((s) =>
            print('text', <><Link href={`/services/${s.slug}`} className="inline-block min-w-[13rem] underline decoration-[var(--line-3)] underline-offset-4 hover:text-sage">{s.title}</Link><span className="text-ink-3">{s.timeline}</span></>),
          );
          break;
        case 'reviews':
          print('text', `${reviews.total} reviews, ${reviews.average.toFixed(1)} average, clients in ${reviews.countries} countries.`);
          print('text', `${reviews.repeatShare}% of clients came back for more work.`);
          print('text', <Link href="/reviews" className="underline decoration-[var(--line-3)] underline-offset-4 hover:text-sage">read them at /reviews</Link>);
          break;
        case 'date': {
          const now = new Date().toLocaleString('en-GB', {
            timeZone: 'Asia/Karachi',
            weekday: 'long',
            hour: '2-digit',
            minute: '2-digit',
          });
          print('text', `${now} in Islamabad (${site.timezone}).`);
          break;
        }
        case 'contact':
          print('text', <a href={`mailto:${site.email}`} className="underline decoration-[var(--line-3)] underline-offset-4 hover:text-sage">{site.email}</a>);
          print('text', site.phone);
          print('text', <Link href="/contact" className="underline decoration-[var(--line-3)] underline-offset-4 hover:text-sage">or send a brief at /contact</Link>);
          break;
        case 'cv':
          print('text', <a href={cv.href} download={cv.fileName} className="underline decoration-[var(--line-3)] underline-offset-4 hover:text-sage">{cv.fileName}</a>);
          print('dim', `PDF, ${cv.size}, updated ${cv.updated}`);
          break;
        case 'clear':
          setOut([]);
          break;
        case 'sudo':
          if (arg === 'hire masab') {
            print('dim', '[sudo] password for visitor: ********');
            print('hot', 'permission granted. opening the brief form.');
            window.setTimeout(() => router.push('/contact'), 900);
          } else {
            print('dim', 'visitor is not in the sudoers file. This incident will be reported.');
            print('dim', 'the one command sudo does run here: sudo hire masab');
          }
          break;
        case 'rm':
          print('dim', 'not on this server.');
          break;
        case 'exit':
          print('dim', 'there is no exit. There is, however, ls work.');
          break;
        default:
          print('dim', `command not found: ${cmd}. Type help.`);
      }
    },
    [print, projects, reviews, router, services],
  );

  // Type a command out character by character, then run it
  const type = useCallback(
    (text: string) =>
      new Promise<void>((resolve) => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) {
          run(text);
          resolve();
          return;
        }
        setTyping(true);
        let i = 0;
        const tick = () => {
          i += 1;
          setValue(text.slice(0, i));
          if (i < text.length) window.setTimeout(tick, 45 + Math.random() * 45);
          else
            window.setTimeout(() => {
              setValue('');
              setTyping(false);
              run(text);
              resolve();
            }, 260);
        };
        tick();
      }),
    [run],
  );

  // First time it is seen: introduce itself
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || booted.current) return;
        booted.current = true;
        io.disconnect();
        print('dim', 'Last login: from your browser, just now');
        window.setTimeout(() => void type('whoami').then(() => print('dim', 'type help, or tap a command below')), 500);
      },
      { threshold: 0.4 },
    );
    io.observe(box);
    return () => io.disconnect();
  }, [print, type]);

  const complete = () => {
    const v = value.toLowerCase();
    if (!v) return;
    const pool = [...COMMANDS, ...projects.map((p) => `open ${p.slug}`)];
    const hit = pool.find((c) => c.startsWith(v));
    if (hit) setValue(hit);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (typing) {
      e.preventDefault();
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      run(value);
      setValue('');
    } else if (e.key === 'Tab') {
      if (value) {
        e.preventDefault();
        complete();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = cursor < 0 ? history.length - 1 : Math.max(0, cursor - 1);
      if (history[next] !== undefined) {
        setCursor(next);
        setValue(history[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = cursor + 1;
      if (cursor >= 0 && next < history.length) {
        setCursor(next);
        setValue(history[next]);
      } else {
        setCursor(-1);
        setValue('');
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setOut([]);
    }
  };

  const chips = ['whoami', 'ls work', 'stack', 'reviews', 'date', 'sudo hire masab'];

  return (
    <div ref={boxRef} className="overflow-hidden rounded-xl border bg-sheet shadow-[0_30px_60px_-30px_rgb(22_24_23/0.25)]" style={{ borderColor: 'var(--line-2)' }}>
      <div className="flex items-center gap-3 border-b bg-plate px-4 py-2.5" style={{ borderColor: 'var(--line)' }}>
        <span aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-clay/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-olive/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/25" />
        </span>
        <p className="mono truncate text-[0.72rem] text-ink-3">visitor@masabfarooque.com: ~</p>
      </div>

      <div
        ref={bodyRef}
        className="mono h-[22rem] overflow-y-auto px-4 py-4 text-[0.8rem] leading-[1.6] sm:h-[24rem] sm:px-5 sm:text-[0.84rem]"
        onClick={() => inputRef.current?.focus()}
      >
        <div role="log" aria-live="polite" aria-label="Terminal output">
          {out.map((o) => (
            <div key={o.id} className={`log-line whitespace-pre-wrap break-words ${o.kind === 'dim' ? 'text-ink-3' : o.kind === 'hot' ? 'text-clay-ink' : 'text-ink'}`}>
              {o.kind === 'cmd' ? (
                <>
                  <span className="text-sage">~ $</span> {o.text}
                </>
              ) : (
                o.text
              )}
            </div>
          ))}
        </div>
        <label className="flex items-center gap-2">
          <span className="text-sage">~ $</span>
          <span className="sr-only">Command</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => !typing && setValue(e.target.value)}
            onKeyDown={onKey}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="send"
            className="mono min-w-0 flex-1 bg-transparent text-[16px] text-ink caret-sage outline-none sm:text-[0.84rem]"
            aria-label="Type a command, then press Enter"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-2 border-t px-4 py-3" style={{ borderColor: 'var(--line)' }}>
        {chips.map((c) => (
          <button
            key={c}
            type="button"
            disabled={typing}
            onClick={() => void type(c)}
            className="mono h-11 rounded-full border px-3.5 text-[0.72rem] text-ink-2 transition-colors hover:border-ink hover:text-ink disabled:opacity-40"
            style={{ borderColor: 'var(--line-2)' }}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
