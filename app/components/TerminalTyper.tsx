'use client';

import { useEffect, useState } from 'react';

const DEFAULT_PHRASES = [
  'npm run build  ✓',
  'git push  ✓ deployed',
  'pytest  ✓ 142 passed',
  'docker up  ✓ healthy',
];

/**
 * Compact, self-contained typewriter terminal. Coding-themed, loops forever.
 * Reused across pages with page-relevant phrases.
 */
export default function TerminalTyper({
  phrases = DEFAULT_PHRASES,
  className = '',
}: {
  phrases?: string[];
  className?: string;
}) {
  const [i, setI] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = phrases[i % phrases.length];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && text.length < full.length) {
      t = setTimeout(() => setText(full.slice(0, text.length + 1)), 42);
    } else if (!deleting && text.length === full.length) {
      t = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && text.length > 0) {
      t = setTimeout(() => setText(full.slice(0, text.length - 1)), 20);
    } else {
      setDeleting(false);
      setI((v) => (v + 1) % phrases.length);
    }
    return () => clearTimeout(t);
  }, [text, deleting, i, phrases]);

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-mono text-xs sm:text-sm ${className}`}
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', color: 'var(--text-2)' }}
    >
      <span className="flex items-center gap-1.5 mr-1">
        <span className="w-2 h-2 rounded-full" style={{ background: 'var(--primary)' }} />
        <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-mustard)' }} />
        <span className="w-2 h-2 rounded-full" style={{ background: 'var(--tertiary)' }} />
      </span>
      <span style={{ color: 'var(--primary)' }}>$</span>
      <span className="whitespace-nowrap">{text}</span>
      <span className="caret-blink" style={{ color: 'var(--secondary)' }}>▋</span>
    </div>
  );
}
