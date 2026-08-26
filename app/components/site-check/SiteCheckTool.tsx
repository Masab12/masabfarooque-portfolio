'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLong, MarkCheck, MarkDocument, WarnMark, CloseMark } from '@/app/components/marks';
import Magnetic from '@/app/components/core/Magnetic';
import type { CheckResult, CheckStatus } from '@/app/lib/site-check/checks';

interface Report {
  url: string;
  scannedAt: string;
  score: number;
  max: number;
  percent: number;
  counts: { pass: number; warn: number; fail: number };
  results: CheckResult[];
}

type Status = 'idle' | 'loading' | 'error' | 'done';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The site is deliberately cream on black with no accent colours anywhere
 * else. A genuine fault is the one thing worth breaking that rule for, so
 * "fail" gets a single muted warm red. Pass and warn both stay inside the
 * existing palette, told apart by weight rather than hue.
 */
const FAIL_COLOR = '#c17165';

const STATUS_STYLE: Record<CheckStatus, { color: string; Icon: typeof MarkCheck; label: string }> = {
  pass: { color: 'var(--cream)', Icon: MarkCheck, label: 'Pass' },
  warn: { color: 'var(--gray-400)', Icon: WarnMark, label: 'Worth checking' },
  fail: { color: FAIL_COLOR, Icon: CloseMark, label: 'Needs fixing' },
};

function StatusRow({ item, isFirst }: { item: CheckResult; isFirst: boolean }) {
  const { color, Icon, label } = STATUS_STYLE[item.status];
  return (
    <div
      className={`flex gap-4 px-5 py-5 sm:px-6 ${isFirst ? '' : 'border-t'}`}
      style={{ borderColor: 'var(--line)' }}
    >
      <span
        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
        style={{ background: 'rgba(225,224,204,0.06)', color }}
      >
        <Icon size={13} strokeWidth={1.6} />
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="text-[0.95rem] text-cream">{item.label}</p>
          <span className="text-[0.68rem] uppercase tracking-[0.1em]" style={{ color }}>
            {label}
          </span>
        </div>
        <p className="mt-1.5 text-[0.85rem] leading-relaxed text-gray-400">{item.detail}</p>
      </div>
    </div>
  );
}

export default function SiteCheckTool() {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [report, setReport] = useState<Report | null>(null);
  const [downloading, setDownloading] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!value.trim()) {
      setStatus('error');
      setError('Type a web address first.');
      return;
    }

    setStatus('loading');
    setError('');

    try {
      const res = await fetch('/api/site-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: value.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setError(data.error || 'Something went wrong reaching that address.');
        return;
      }

      setReport(data);
      setStatus('done');
    } catch {
      setStatus('error');
      setError('Something went wrong reaching that address. Check the connection and try again.');
    }
  };

  const onDownload = async () => {
    if (!report) return;
    setDownloading(true);
    try {
      const { buildSiteCheckPdf } = await import('@/app/lib/site-check/build-pdf');
      await buildSiteCheckPdf(report);
    } finally {
      setDownloading(false);
    }
  };

  const categories = report ? Array.from(new Set(report.results.map((r) => r.category))) : [];

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <label className="block flex-1">
          <span className="label">Web address</span>
          <input
            type="text"
            inputMode="url"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="yourwebsite.com"
            disabled={status === 'loading'}
            className="mt-3 w-full border-b bg-transparent pb-3 text-[1.05rem] text-cream outline-none transition-colors focus:border-hair2 disabled:opacity-60"
            style={{ borderColor: 'var(--line-2)' }}
          />
        </label>

        <Magnetic radius={90} pull={0.24} className="inline-block shrink-0">
          <button
            type="submit"
            disabled={status === 'loading'}
            data-cursor="Scan it"
            className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-black transition-opacity disabled:opacity-70 sm:w-auto"
          >
            {status === 'loading' ? 'Reading the page' : 'Check the site'}
            {status !== 'loading' ? (
              <ArrowLong size={15} className="transition-transform duration-500 group-hover:translate-x-1" />
            ) : null}
          </button>
        </Magnetic>
      </form>

      <p className="mt-4 text-[0.78rem] leading-relaxed text-gray-500">
        Takes about ten seconds. This reads the page you give us the same way a browser would.
        Nothing behind a login gets touched, and nothing about the scan is saved.
      </p>

      <AnimatePresence mode="wait">
        {status === 'error' ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 rounded-xl border px-5 py-4 text-sm"
            style={{ borderColor: 'rgba(193,113,101,0.4)', background: 'rgba(193,113,101,0.08)', color: FAIL_COLOR }}
          >
            {error}
          </motion.div>
        ) : null}

        {status === 'done' && report ? (
          <motion.div
            key="report"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-14"
          >
            {/* Score header */}
            <div
              className="flex flex-col gap-8 rounded-2xl border p-6 sm:p-8 md:flex-row md:items-center md:justify-between"
              style={{ borderColor: 'var(--line-2)', background: 'var(--surface-1)' }}
            >
              <div>
                <p className="label">{report.url}</p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-[clamp(2.4rem,6vw,3.6rem)] leading-none text-cream">
                    {report.percent}
                  </span>
                  <span className="text-lg text-gray-500">/ 100</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[0.8rem]">
                  <span className="text-cream">{report.counts.pass} passing</span>
                  <span className="text-gray-400">{report.counts.warn} worth checking</span>
                  <span style={{ color: FAIL_COLOR }}>{report.counts.fail} need fixing</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row md:shrink-0">
                <button
                  type="button"
                  onClick={onDownload}
                  disabled={downloading}
                  data-cursor="Download"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full border px-5 py-3 text-sm text-cream transition-colors duration-300 hover:border-hair2 disabled:opacity-60"
                  style={{ borderColor: 'var(--line-2)' }}
                >
                  <MarkDocument size={15} className="text-primary" />
                  {downloading ? 'Preparing PDF' : 'Download the PDF'}
                </button>

                <Magnetic radius={90} pull={0.24}>
                  <Link
                    href="/contact"
                    data-cursor="Say hello"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-black transition-all duration-300 hover:gap-3"
                  >
                    Get these fixed
                    <ArrowLong size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Magnetic>
              </div>
            </div>

            {/* Grouped results */}
            <div className="mt-10 space-y-10">
              {categories.map((category) => (
                <div key={category}>
                  <p className="label mb-4">{category}</p>
                  <div
                    className="overflow-hidden rounded-xl border"
                    style={{ borderColor: 'var(--line)' }}
                  >
                    {report.results
                      .filter((r) => r.category === category)
                      .map((item, i) => (
                        <StatusRow key={item.id} item={item} isFirst={i === 0} />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
