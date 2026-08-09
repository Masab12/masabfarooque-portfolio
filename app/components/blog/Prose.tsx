import Link from 'next/link';
import { ArrowDiagonal, ArrowLong, Spark } from '@/app/components/marks';

/**
 * Article primitives.
 *
 * The body of a post is built from these rather than from a markdown
 * renderer, which keeps every heading, list and code block on the same
 * measure and lets a chart sit inside the prose without fighting it.
 */

/* ── Headings ──────────────────────────────────────────────────── */

export function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="mt-16 scroll-mt-28 text-[clamp(1.35rem,3.2vw,1.85rem)] font-medium leading-[1.2] tracking-[-0.02em] text-cream first:mt-0"
    >
      {children}
    </h2>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-10 text-[clamp(1.05rem,2.2vw,1.25rem)] font-medium leading-snug text-cream">
      {children}
    </h3>
  );
}

/* ── Text ──────────────────────────────────────────────────────── */

export function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 text-[0.98rem] leading-[1.75] text-gray-400 sm:text-base">{children}</p>;
}

/** The opening paragraph, set slightly larger. */
export function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 text-[1.05rem] leading-[1.65] text-cream/90 sm:text-lg">{children}</p>
  );
}

export function UL({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3.5 text-[0.98rem] leading-[1.7] text-gray-400 sm:text-base">
          <span
            className="mt-[0.7rem] h-px w-3.5 shrink-0"
            style={{ background: 'var(--cream)', opacity: 0.6 }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function OL({ items }: { items: React.ReactNode[] }) {
  return (
    <ol className="mt-5 space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex gap-4 text-[0.98rem] leading-[1.7] text-gray-400 sm:text-base">
          <span className="mono mt-[0.15rem] shrink-0 text-[0.7rem] text-primary">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

/* ── Code ──────────────────────────────────────────────────────── */

const COMMENT_PREFIXES = ['//', '#', '--', '/*', '*'];

function isComment(line: string) {
  const trimmed = line.trimStart();
  return COMMENT_PREFIXES.some((prefix) => trimmed.startsWith(prefix));
}

/**
 * A code block with a filename bar. Comment lines are dimmed by prefix,
 * which is the one highlighting rule that cannot mangle the code it is
 * describing. Long lines scroll inside the block instead of stretching
 * the page.
 */
export function Code({
  filename,
  lang,
  children,
}: {
  filename?: string;
  lang?: string;
  children: string;
}) {
  const lines = children.replace(/\n$/, '').split('\n');

  return (
    <figure
      className="my-8 overflow-hidden rounded-xl border"
      style={{ borderColor: 'var(--line)', background: '#0B0B0B' }}
    >
      {filename ? (
        <div
          className="flex items-center justify-between gap-4 border-b px-4 py-2.5"
          style={{ borderColor: 'var(--line)', background: 'var(--surface-1)' }}
        >
          <span className="mono truncate text-[0.7rem] text-gray-400">{filename}</span>
          {lang ? (
            <span className="mono shrink-0 text-[0.6rem] uppercase tracking-[0.14em] text-gray-500">
              {lang}
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="overflow-x-auto">
        <pre className="px-4 py-4 text-[0.78rem] leading-[1.7] sm:text-[0.82rem]">
          <code className="mono">
            {lines.map((line, i) => (
              <span
                key={i}
                className="block whitespace-pre"
                style={{ color: isComment(line) ? 'var(--gray-500)' : 'var(--cream)' }}
              >
                {line === '' ? ' ' : line}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </figure>
  );
}

/* ── Asides ────────────────────────────────────────────────────── */

/** A short aside that is worth pulling out of the flow. */
export function Note({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <aside
      className="my-8 rounded-xl border p-5 sm:p-6"
      style={{ borderColor: 'var(--line-2)', background: 'var(--surface-1)' }}
    >
      {title ? (
        <p className="flex items-center gap-2.5 text-sm text-cream">
          <Spark size={11} className="shrink-0 text-primary" />
          {title}
        </p>
      ) : null}
      <div className="text-[0.92rem] leading-[1.7] text-gray-400 [&>p:first-child]:mt-0">
        {children}
      </div>
    </aside>
  );
}

/** A short list of what the reader should walk away with. */
export function Takeaways({ items }: { items: string[] }) {
  return (
    <aside
      className="my-10 rounded-xl border p-5 sm:p-7"
      style={{ borderColor: 'var(--line-2)', background: 'var(--surface-1)' }}
    >
      <p className="label">The short version</p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3.5 text-[0.95rem] leading-[1.65] text-gray-400">
            <span className="mt-[0.65rem] h-px w-3.5 shrink-0" style={{ background: 'var(--cream)' }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/* ── Checklists ────────────────────────────────────────────────── */

/**
 * A block of checks with an empty box against each one, so the article can be
 * printed or handed over and worked through. The boxes are drawn rather than
 * real inputs, because the page is a document to follow, not a form to submit.
 */
export function Checklist({
  title,
  items,
}: {
  title?: string;
  items: React.ReactNode[];
}) {
  return (
    <div
      className="my-8 rounded-xl border p-5 sm:p-6"
      style={{ borderColor: 'var(--line)', background: 'var(--surface-1)' }}
    >
      {title ? <p className="label mb-5">{title}</p> : null}
      <ul className="space-y-3.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3.5">
            <span
              aria-hidden
              className="mt-[0.2rem] h-[1.05rem] w-[1.05rem] shrink-0 rounded-[4px] border"
              style={{ borderColor: 'var(--line-3)' }}
            />
            <span className="text-[0.94rem] leading-[1.65] text-gray-400">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Questions ─────────────────────────────────────────────────── */

export type FaqItem = { q: string; a: string };

/**
 * Questions and answers, left open rather than folded into an accordion, so
 * every answer sits in the page for a reader and for a crawler without anyone
 * having to click. The same array feeds the FAQPage schema on the route, which
 * is the only way the two can never disagree.
 */
export function FAQ({ items }: { items: FaqItem[] }) {
  return (
    <div
      className="mt-7 flex flex-col gap-px overflow-hidden rounded-xl border"
      style={{ borderColor: 'var(--line)', background: 'var(--line)' }}
    >
      {items.map((item) => (
        <div key={item.q} className="p-5 sm:p-6" style={{ background: 'var(--surface-1)' }}>
          <h3 className="text-[0.98rem] leading-snug text-cream">{item.q}</h3>
          <p className="mt-3 text-[0.92rem] leading-[1.7] text-gray-400">{item.a}</p>
        </div>
      ))}
    </div>
  );
}

/* ── Tables ────────────────────────────────────────────────────── */

export function Table({
  head,
  rows,
  caption,
}: {
  head: string[];
  rows: React.ReactNode[][];
  caption?: React.ReactNode;
}) {
  return (
    <figure className="my-9">
      <div
        className="overflow-x-auto rounded-xl border"
        style={{ borderColor: 'var(--line)', background: 'var(--surface-1)' }}
      >
        <table className="w-full min-w-[520px] border-collapse text-left">
          <thead>
            <tr>
              {head.map((cell) => (
                <th
                  key={cell}
                  className="label border-b px-4 py-3 font-normal sm:px-5"
                  style={{ borderColor: 'var(--line-2)' }}
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className="border-b px-4 py-3.5 align-top text-[0.88rem] leading-relaxed sm:px-5"
                    style={{
                      borderColor: 'var(--line)',
                      color: ci === 0 ? 'var(--cream)' : 'var(--gray-400)',
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption ? (
        <figcaption className="mt-3 text-xs leading-relaxed text-gray-500">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

/* ── Links ─────────────────────────────────────────────────────── */

/** An inline pointer to another article in the cluster. */
export function ReadNext({ slug, title }: { slug: string; title: string }) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="plain group my-8 flex items-center justify-between gap-5 rounded-xl border px-5 py-4 transition-colors duration-300 hover:border-hair2"
      style={{ borderColor: 'var(--line)' }}
    >
      <span>
        <span className="label">Related reading</span>
        <span className="mt-1.5 block text-[0.95rem] leading-snug text-cream">{title}</span>
      </span>
      <ArrowLong
        size={18}
        className="shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>
  );
}

/** External source list. Every article ends with one. */
export function Resources({
  items,
}: {
  items: { label: string; href: string; note?: string }[];
}) {
  return (
    <ul className="mt-6 space-y-4">
      {items.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="plain group inline-flex items-baseline gap-2 text-[0.95rem] text-cream transition-opacity hover:opacity-75"
          >
            {item.label}
            <ArrowDiagonal
              size={11}
              className="shrink-0 text-primary opacity-60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          {item.note ? (
            <p className="mt-1 text-[0.82rem] leading-relaxed text-gray-500">{item.note}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
