'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { ArrowLong, MarkCheck } from '@/app/components/marks';
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
        style={{ borderColor: 'var(--brass-edge)', background: 'var(--brass-veil)' }}
      >
        <MarkCheck size={30} className="text-brass" />
        <h3 className="display-tight text-[clamp(1.4rem,2.6vw,2rem)] text-bone">
          Message sent
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-bone-2">
          Thanks for writing. I read everything myself and reply within one working day, usually
          sooner. If it is urgent, email me directly and put the word urgent in the subject.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mono text-[0.65rem] uppercase tracking-[0.18em] text-brass hover:underline"
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
          <span className="eyebrow">Your name</span>
          <input
            type="text"
            value={fields.name}
            onChange={update('name')}
            autoComplete="name"
            className="mt-3 w-full border-b bg-transparent pb-3 text-[0.95rem] outline-none transition-colors focus:border-brass"
            style={inputStyle}
            placeholder="Jane Doe"
          />
          {errors.name ? (
            <span className="mono mt-2 block text-[0.6rem]" style={{ color: 'var(--ember)' }}>
              {errors.name}
            </span>
          ) : null}
        </label>

        <label className="block">
          <span className="eyebrow">Email</span>
          <input
            type="email"
            value={fields.email}
            onChange={update('email')}
            autoComplete="email"
            className="mt-3 w-full border-b bg-transparent pb-3 text-[0.95rem] outline-none transition-colors focus:border-brass"
            style={inputStyle}
            placeholder="jane@company.com"
          />
          {errors.email ? (
            <span className="mono mt-2 block text-[0.6rem]" style={{ color: 'var(--ember)' }}>
              {errors.email}
            </span>
          ) : null}
        </label>
      </div>

      <div className="grid gap-7 sm:grid-cols-3">
        <label className="block">
          <span className="eyebrow">Company, optional</span>
          <input
            type="text"
            value={fields.company}
            onChange={update('company')}
            autoComplete="organization"
            className="mt-3 w-full border-b bg-transparent pb-3 text-[0.95rem] outline-none transition-colors focus:border-brass"
            style={inputStyle}
            placeholder="Where you work"
          />
        </label>

        <label className="block">
          <span className="eyebrow">What you need</span>
          <select
            value={fields.kind}
            onChange={update('kind')}
            className="mt-3 w-full appearance-none border-b bg-transparent pb-3 text-[0.95rem] outline-none transition-colors focus:border-brass"
            style={{ ...inputStyle, color: fields.kind ? 'var(--bone)' : 'var(--bone-3)' }}
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
          <span className="eyebrow">Timeline</span>
          <select
            value={fields.timeline}
            onChange={update('timeline')}
            className="mt-3 w-full appearance-none border-b bg-transparent pb-3 text-[0.95rem] outline-none transition-colors focus:border-brass"
            style={{ ...inputStyle, color: fields.timeline ? 'var(--bone)' : 'var(--bone-3)' }}
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
        <span className="eyebrow">What are you building</span>
        <textarea
          value={fields.message}
          onChange={update('message')}
          rows={5}
          className="mt-3 w-full resize-none border-b bg-transparent pb-3 text-[0.95rem] leading-relaxed outline-none transition-colors focus:border-brass"
          style={inputStyle}
          placeholder="What the product does, who it is for, and what is currently in the way."
        />
        {errors.message ? (
          <span className="mono mt-2 block text-[0.6rem]" style={{ color: 'var(--ember)' }}>
            {errors.message}
          </span>
        ) : null}
      </label>

      {status === 'error' ? (
        <p className="mono text-[0.65rem]" style={{ color: 'var(--ember)' }}>
          Something went wrong sending that. Please email me directly and I will pick it up.
        </p>
      ) : null}

      <div className="pt-2">
        <Magnetic radius={90} pull={0.24} className="inline-block">
          <button
            type="submit"
            disabled={status === 'sending'}
            data-cursor="Send it"
            className="group relative inline-flex items-center gap-4 overflow-hidden px-9 py-4 text-sm uppercase tracking-[0.16em] disabled:opacity-60"
            style={{ background: 'var(--brass)', color: 'var(--ink)' }}
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
              style={{ background: 'var(--brass-hi)' }}
            />
          </button>
        </Magnetic>
      </div>
    </form>
  );
}
