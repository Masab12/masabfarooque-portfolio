'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { ArrowLong, MarkCheck } from '@/app/components/marks';
import RequestTrace from '@/app/components/contact/RequestTrace';
import Magnetic from '@/app/components/core/Magnetic';

type Fields = {
  name: string;
  email: string;
  company: string;
  kind: string;
  timeline: string;
  message: string;
};

const empty: Fields = {
  name: '',
  email: '',
  company: '',
  kind: '',
  timeline: '',
  message: '',
};

const kinds = [
  'SaaS platform',
  'AI system or agent',
  'Data pipeline or scraping',
  'Web application',
  'Rescue an existing build',
  'Something else',
];

const timelines = ['As soon as possible', 'Within a month', 'One to three months', 'Still planning'];

export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const update =
    (key: keyof Fields) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFields((prev) => ({ ...prev, [key]: event.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const validate = () => {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (fields.name.trim().length < 2) next.name = 'Please add your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim()))
      next.email = 'Please add a valid email address';
    if (fields.message.trim().length < 20)
      next.message = 'A couple of sentences helps me answer properly';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus('sending');

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus('error');
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: fields.name,
          from_email: fields.email,
          company: fields.company || 'Not given',
          project_type: fields.kind || 'Not given',
          timeline: fields.timeline || 'Not given',
          message: fields.message,
        },
        publicKey,
      );
      setStatus('sent');
      setFields(empty);
    } catch {
      setStatus('error');
    }
  };

  const inputStyle = {
    background: 'transparent',
    borderColor: 'var(--line-2)',
  } as const;

  if (status === 'sent') {
    return (
      <div
        className="flex flex-col items-start gap-5 border p-10"
        style={{ borderColor: 'var(--line-2)', background: 'rgb(var(--ink-rgb) / 0.08)' }}
      >
        <div className="w-full max-w-sm">
          <RequestTrace state="sent" />
        </div>
        <h3 className="flex items-center gap-3 text-[clamp(1.4rem,1.1rem+1.2vw,2rem)] font-extrabold tracking-[-0.02em] text-ink">
          <MarkCheck size={26} className="text-sage" />
          Message delivered
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-ink-2">
          Thanks for writing. I read everything myself and reply within one working day, usually
          sooner. If it is urgent, email me directly and put the word urgent in the subject.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mono min-h-[2.75rem] text-[0.75rem] uppercase text-sage underline decoration-[var(--line-3)] underline-offset-4 hover:decoration-sage"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <label className="block">
          <span className="label">Your name</span>
          <input
            type="text"
            value={fields.name}
            onChange={update('name')}
            autoComplete="name"
            className="mt-2 min-h-11 w-full border-b bg-transparent pb-2.5 pt-1.5 text-base outline-none transition-colors focus:border-sage"
            style={inputStyle}
            placeholder="Jane Doe"
          />
          {errors.name ? (
            <span className="mt-2 block text-[0.6875rem]" style={{ color: 'var(--ink-3)' }}>
              {errors.name}
            </span>
          ) : null}
        </label>

        <label className="block">
          <span className="label">Email</span>
          <input
            type="email"
            value={fields.email}
            onChange={update('email')}
            autoComplete="email"
            className="mt-2 min-h-11 w-full border-b bg-transparent pb-2.5 pt-1.5 text-base outline-none transition-colors focus:border-sage"
            style={inputStyle}
            placeholder="jane@company.com"
          />
          {errors.email ? (
            <span className="mt-2 block text-[0.6875rem]" style={{ color: 'var(--ink-3)' }}>
              {errors.email}
            </span>
          ) : null}
        </label>
      </div>

      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        <label className="block">
          <span className="label">Company, optional</span>
          <input
            type="text"
            value={fields.company}
            onChange={update('company')}
            autoComplete="organization"
            className="mt-2 min-h-11 w-full border-b bg-transparent pb-2.5 pt-1.5 text-base outline-none transition-colors focus:border-sage"
            style={inputStyle}
            placeholder="Where you work"
          />
        </label>

        <label className="block">
          <span className="label">What you need</span>
          <select
            value={fields.kind}
            onChange={update('kind')}
            className="mt-2 min-h-11 w-full appearance-none border-b bg-transparent pb-2.5 pt-1.5 text-base outline-none transition-colors focus:border-sage"
            style={{ ...inputStyle, color: fields.kind ? 'var(--ink)' : 'var(--ink-3)' }}
          >
            <option value="">Choose one</option>
            {kinds.map((kind) => (
              <option key={kind} value={kind}>
                {kind}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="label">Timeline</span>
          <select
            value={fields.timeline}
            onChange={update('timeline')}
            className="mt-2 min-h-11 w-full appearance-none border-b bg-transparent pb-2.5 pt-1.5 text-base outline-none transition-colors focus:border-sage"
            style={{ ...inputStyle, color: fields.timeline ? 'var(--ink)' : 'var(--ink-3)' }}
          >
            <option value="">Choose one</option>
            {timelines.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="label">What are you building</span>
        <textarea
          value={fields.message}
          onChange={update('message')}
          rows={5}
          className="mt-3 w-full resize-none border-b bg-transparent pb-3 text-[0.95rem] leading-relaxed outline-none transition-colors focus:border-hair2"
          style={inputStyle}
          placeholder="What the product does, who it is for, and what is currently in the way."
        />
        {errors.message ? (
          <span className="mt-2 block text-[0.6875rem]" style={{ color: 'var(--ink-3)' }}>
            {errors.message}
          </span>
        ) : null}
      </label>

      {status === 'error' ? (
        <p className="text-[0.92rem] text-clay-ink" role="alert">
          Something went wrong sending that. Please email me directly and I will pick it up.
        </p>
      ) : null}

      <div className="max-w-sm pt-1">
        <RequestTrace state={status} />
      </div>

      <div className="pt-2">
        <Magnetic radius={90} pull={0.24} className="inline-block">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="group relative inline-flex min-h-[3.25rem] items-center gap-4 overflow-hidden rounded-full px-8 py-4 text-[0.9375rem] font-bold disabled:opacity-60"
            style={{ background: 'var(--ink)', color: 'var(--paper)' }}
          >
            <span className="relative z-10">
              {status === 'sending' ? 'Sending' : 'Send message'}
            </span>
            <ArrowLong
              size={16}
              className="relative z-10 transition-transform duration-500 group-hover:translate-x-1.5"
            />
            <span
              className="absolute inset-0 origin-left scale-x-0 transition-transform duration-[650ms] ease-out group-hover:scale-x-100"
              style={{ background: 'var(--sage)' }}
            />
          </button>
        </Magnetic>
      </div>
    </form>
  );
}
