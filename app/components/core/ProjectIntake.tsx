'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { usePathname } from 'next/navigation';
import emailjs from '@emailjs/browser';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLong, CloseMark, MarkCheck, Spark } from '@/app/components/marks';

/**
 * A one time enquiry panel for first time visitors.
 *
 * It opens once, after the visitor has had a moment to read something, and it
 * never opens again: the key below is written the instant it is dismissed or
 * sent, so a refresh, a second page or a return visit next month all count as
 * having seen it. Escape, the close button and the backdrop all dismiss it.
 */

const SEEN_KEY = 'project-intake-seen';

/** How long to wait before opening, in milliseconds. */
const OPEN_DELAY = 14_000;

/**
 * Pages where an enquiry panel would be redundant or rude. Contact already is
 * this form, and interrupting someone reading a policy is not a good trade.
 */
const SKIP_PATHS = ['/contact', '/privacy', '/terms'];

const needs = [
  'A new website or web app',
  'Move WordPress to Next.js',
  'An AI or chatbot feature',
  'Scraping or automation',
  'Fix an existing build',
  'Not sure yet',
];

const timelines = ['Right away', 'In a few weeks', 'In a month or two', 'Just planning'];

const channels = ['Email', 'WhatsApp', 'Phone call', 'LinkedIn'];

/**
 * What to ask for once they have picked a channel that is not email. `noun`
 * keeps the validation message correctly cased, which a toLowerCase on the
 * channel name would not.
 */
const handleHints: Record<string, { label: string; placeholder: string; noun: string }> = {
  WhatsApp: {
    label: 'Your WhatsApp number',
    placeholder: '+92 300 0000000',
    noun: 'WhatsApp number',
  },
  'Phone call': {
    label: 'Your phone number',
    placeholder: '+92 300 0000000',
    noun: 'phone number',
  },
  LinkedIn: {
    label: 'Your LinkedIn profile',
    placeholder: 'linkedin.com/in/yourname',
    noun: 'LinkedIn profile',
  },
};

type Fields = {
  need: string;
  timeline: string;
  details: string;
  name: string;
  email: string;
  channel: string;
  handle: string;
};

const empty: Fields = {
  need: '',
  timeline: '',
  details: '',
  name: '',
  email: '',
  channel: 'Email',
  handle: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* ── Pieces ────────────────────────────────────────────────────── */

function ChipGroup({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: string[];
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div>
      <p className="label" id={`${legend.replace(/\s+/g, '-')}-legend`}>
        {legend}
      </p>
      <div
        role="radiogroup"
        aria-labelledby={`${legend.replace(/\s+/g, '-')}-legend`}
        className="mt-3 flex flex-wrap gap-2"
      >
        {options.map((option) => {
          const active = value === option;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(option)}
              className="rounded-full border px-3.5 py-2 text-[0.82rem] leading-none transition-colors duration-300"
              style={{
                borderColor: active ? 'var(--cream)' : 'var(--line-2)',
                background: active ? 'var(--cream)' : 'transparent',
                color: active ? '#0B0B0B' : 'var(--gray-400)',
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FieldError({ children }: { children?: string }) {
  if (!children) return null;
  return (
    <span className="mt-2 block text-[0.7rem]" style={{ color: 'var(--gray-500)' }}>
      {children}
    </span>
  );
}

const inputClass =
  'mt-3 w-full border-b bg-transparent pb-2.5 text-[0.92rem] outline-none transition-colors focus:border-hair2';

/* ── The panel ─────────────────────────────────────────────────── */

export default function ProjectIntake() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  // Bots fill hidden inputs. People do not.
  const [honeypot, setHoneypot] = useState('');

  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusTo = useRef<Element | null>(null);
  const handleFieldRef = useRef<HTMLLabelElement>(null);

  /** Written on every exit, so the panel is genuinely once per visitor. */
  const markSeen = useCallback(() => {
    try {
      window.localStorage.setItem(SEEN_KEY, '1');
    } catch {
      // Private browsing can refuse writes. Losing the flag is not worth an error.
    }
  }, []);

  const close = useCallback(() => {
    markSeen();
    setOpen(false);
  }, [markSeen]);

  /* Open once, after a pause, and never on the pages in the skip list. */
  useEffect(() => {
    if (SKIP_PATHS.includes(pathname)) return;

    try {
      if (window.localStorage.getItem(SEEN_KEY)) return;
    } catch {
      return;
    }

    const timer = window.setTimeout(() => setOpen(true), OPEN_DELAY);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  /* Escape to close, Tab kept inside, page scroll held still, focus restored. */
  useEffect(() => {
    if (!open) return;

    returnFocusTo.current = document.activeElement;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      // tabindex -1 is excluded so the honeypot can never become a tab stop.
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]):not([tabindex="-1"]), input:not([tabindex="-1"]), textarea, select, a[href]',
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const focusTimer = window.setTimeout(() => panelRef.current?.focus(), 40);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(focusTimer);
      document.body.style.overflow = '';
      if (returnFocusTo.current instanceof HTMLElement) returnFocusTo.current.focus();
    };
  }, [open, close]);

  /**
   * Picking a channel other than email adds a field, and on a short screen it
   * lands below the fold where it is easy to miss and then fail validation on.
   * Bring it into view instead.
   */
  useEffect(() => {
    if (fields.channel === 'Email') return;
    // Left on the default instant behaviour on purpose. This is a small layout
    // correction, not navigation, and it still works for anyone who has asked
    // the system to reduce motion.
    handleFieldRef.current?.scrollIntoView({ block: 'nearest' });
  }, [fields.channel]);

  const update = (key: keyof Fields) => (value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const goToStepTwo = () => {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!fields.need) next.need = 'Pick whichever is closest';
    if (fields.details.trim().length < 15)
      next.details = 'A sentence or two helps me give you a straight answer';

    setErrors(next);
    if (Object.keys(next).length) return;
    setStep(2);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const next: Partial<Record<keyof Fields, string>> = {};
    if (fields.name.trim().length < 2) next.name = 'Please add your name';
    if (!EMAIL_RE.test(fields.email.trim())) next.email = 'Please add a valid email address';
    if (fields.channel !== 'Email' && fields.handle.trim().length < 5)
      next.handle = `Please add your ${handleHints[fields.channel].noun}`;

    setErrors(next);
    if (Object.keys(next).length) return;

    // Silently accept and stop. A bot gets no signal about why nothing arrived.
    if (honeypot) {
      setStatus('sent');
      markSeen();
      return;
    }

    setStatus('sending');

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus('error');
      return;
    }

    const reach =
      fields.channel === 'Email'
        ? 'Email'
        : `${fields.channel} at ${fields.handle.trim()}`;

    // The body carries every answer in full, so nothing is lost to a template
    // that does not happen to print one of the fields below.
    const body = [
      'Sent from the enquiry panel on the site.',
      '',
      `What they need: ${fields.need}`,
      `Timeline: ${fields.timeline || 'Not given'}`,
      `Best way to reach them: ${reach}`,
      '',
      'In their words:',
      fields.details.trim(),
    ].join('\n');

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: fields.name.trim(),
          from_email: fields.email.trim(),
          company: 'Not given',
          project_type: fields.need,
          timeline: fields.timeline || 'Not given',
          message: body,
          preferred_contact: reach,
          source: 'Site enquiry panel',
        },
        publicKey,
      );
      setStatus('sent');
      markSeen();
    } catch {
      setStatus('error');
    }
  };

  const hint = handleHints[fields.channel];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-6"
        >
          {/* Backdrop. Kept out of the tab order because Escape and the close
              button already cover keyboard users, and a full screen tab stop
              would only be noise. */}
          <button
            type="button"
            aria-label="Close this panel"
            tabIndex={-1}
            onClick={close}
            className="absolute inset-0 h-full w-full cursor-default bg-black/85 backdrop-blur-md"
          />

          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="intake-title"
            initial={{ y: 28, opacity: 0, scale: 0.985 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-xl flex-col overflow-hidden rounded-2xl border shadow-2xl outline-none sm:max-h-[calc(100dvh-3rem)]"
            style={{ borderColor: 'var(--line-2)', background: 'var(--surface-1)' }}
          >
            {/* ── Head ──────────────────────────────────────────── */}
            <div
              className="flex items-start justify-between gap-4 border-b px-5 py-4 sm:px-7 sm:py-5"
              style={{ borderColor: 'var(--line)' }}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <Spark size={10} className="shrink-0 text-primary" />
                  <span className="label">
                    {status === 'sent' ? 'Received' : `Step ${step} of 2`}
                  </span>
                </div>
                <h2
                  id="intake-title"
                  className="mt-2.5 text-[1.05rem] leading-snug text-cream sm:text-[1.2rem]"
                >
                  {status === 'sent'
                    ? 'Thanks, I have got it'
                    : step === 1
                      ? 'What are you looking to build?'
                      : 'How should I reach you?'}
                </h2>
              </div>

              <button
                type="button"
                onClick={close}
                aria-label="Close this panel"
                className="-mr-1.5 -mt-1.5 shrink-0 rounded-full border p-2 text-gray-400 transition-colors duration-300 hover:border-hair2 hover:text-cream"
                style={{ borderColor: 'var(--line)' }}
              >
                <CloseMark size={14} />
              </button>
            </div>

            {/* ── Body ──────────────────────────────────────────── */}
            {status === 'sent' ? (
              <div className="px-5 py-8 sm:px-7 sm:py-10">
                <MarkCheck size={26} className="text-primary" />
                <p className="mt-5 text-[0.95rem] leading-[1.7] text-gray-400">
                  Your details are with me. I read every enquiry myself and reply within one
                  working day, usually sooner. If it turns out I am not the right fit for the job,
                  I will tell you that instead of wasting your time.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-7 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-85"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
                <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-7">
                  {step === 1 ? (
                    <div className="space-y-7">
                      <div>
                        <ChipGroup
                          legend="What do you need?"
                          options={needs}
                          value={fields.need}
                          onChange={update('need')}
                        />
                        <FieldError>{errors.need}</FieldError>
                      </div>

                      <ChipGroup
                        legend="When do you want to start?"
                        options={timelines}
                        value={fields.timeline}
                        onChange={update('timeline')}
                      />

                      <label className="block">
                        <span className="label">Tell me a bit more</span>
                        <textarea
                          value={fields.details}
                          onChange={(e) => update('details')(e.target.value)}
                          rows={4}
                          className={`${inputClass} resize-none leading-relaxed`}
                          style={{ borderColor: 'var(--line-2)' }}
                          placeholder="What the site or product does, who it is for, and what is in the way right now."
                        />
                        <FieldError>{errors.details}</FieldError>
                      </label>
                    </div>
                  ) : (
                    <div className="space-y-7">
                      <div className="grid gap-7 sm:grid-cols-2">
                        <label className="block">
                          <span className="label">Your name</span>
                          <input
                            type="text"
                            value={fields.name}
                            onChange={(e) => update('name')(e.target.value)}
                            autoComplete="name"
                            className={inputClass}
                            style={{ borderColor: 'var(--line-2)' }}
                            placeholder="Jane Doe"
                          />
                          <FieldError>{errors.name}</FieldError>
                        </label>

                        <label className="block">
                          <span className="label">Your email</span>
                          <input
                            type="email"
                            value={fields.email}
                            onChange={(e) => update('email')(e.target.value)}
                            autoComplete="email"
                            className={inputClass}
                            style={{ borderColor: 'var(--line-2)' }}
                            placeholder="jane@company.com"
                          />
                          <FieldError>{errors.email}</FieldError>
                        </label>
                      </div>

                      <ChipGroup
                        legend="Best way to reach you"
                        options={channels}
                        value={fields.channel}
                        onChange={update('channel')}
                      />

                      {hint ? (
                        <label ref={handleFieldRef} className="block">
                          <span className="label">{hint.label}</span>
                          <input
                            type="text"
                            value={fields.handle}
                            onChange={(e) => update('handle')(e.target.value)}
                            className={inputClass}
                            style={{ borderColor: 'var(--line-2)' }}
                            placeholder={hint.placeholder}
                          />
                          <FieldError>{errors.handle}</FieldError>
                        </label>
                      ) : null}

                      {/* Hidden from people, visible to bots. */}
                      <input
                        type="text"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden
                        className="pointer-events-none absolute h-0 w-0 opacity-0"
                      />

                      {status === 'error' ? (
                        <p className="text-[0.8rem] leading-relaxed" style={{ color: 'var(--gray-500)' }}>
                          That did not send. Please try again, or email me directly at{' '}
                          <a href="mailto:contact@masabfarooque.com" className="text-primary">
                            contact@masabfarooque.com
                          </a>
                          .
                        </p>
                      ) : null}
                    </div>
                  )}
                </div>

                {/* ── Foot ────────────────────────────────────────── */}
                <div
                  className="flex items-center justify-between gap-3 border-t px-5 py-4 sm:px-7"
                  style={{ borderColor: 'var(--line)' }}
                >
                  {step === 1 ? (
                    <button
                      type="button"
                      onClick={close}
                      className="text-[0.8rem] text-gray-500 transition-colors hover:text-gray-400"
                    >
                      Not now
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-[0.8rem] text-gray-500 transition-colors hover:text-gray-400"
                    >
                      Back
                    </button>
                  )}

                  {step === 1 ? (
                    <button
                      type="button"
                      onClick={goToStepTwo}
                      className="group inline-flex items-center gap-2 rounded-full bg-primary py-1.5 pl-5 pr-1.5 text-sm font-medium text-black transition-all duration-300 hover:gap-3"
                    >
                      Continue
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-110">
                        <ArrowLong size={13} className="text-cream" />
                      </span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="group inline-flex items-center gap-2 rounded-full bg-primary py-1.5 pl-5 pr-1.5 text-sm font-medium text-black transition-all duration-300 hover:gap-3 disabled:opacity-60"
                    >
                      {status === 'sending' ? 'Sending' : 'Send it'}
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-110">
                        <ArrowLong size={13} className="text-cream" />
                      </span>
                    </button>
                  )}
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
