'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { HiCheck, HiX, HiChevronDown, HiArrowRight } from 'react-icons/hi';
import { pricingTiers } from '@/app/data/pricing';

const faqs = [
  {
    q: 'What happens after the initial payment?',
    a: 'Work begins immediately. I share progress updates at agreed milestones, and the remaining balance is due upon delivery. For larger projects I split into multiple milestone payments.',
  },
  {
    q: 'Do you offer revisions?',
    a: 'Yes. Every project includes a revision round after delivery to address anything that does not match the agreed scope. Scope changes after delivery are priced separately.',
  },
  {
    q: 'Can I upgrade from Starter to Scale Stack mid-project?',
    a: 'Yes. If the scope grows during development, I agree on the additional cost before proceeding. Nothing changes without your approval.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Starter Launch: 5-10 days. Scale Stack: 3-6 weeks. AI Automation Suite: 4-8 weeks. Timeline depends on feature complexity and how quickly feedback is provided.',
  },
  {
    q: 'Do you work with non-technical clients?',
    a: 'Yes. I explain technical decisions in plain language and handle the full stack, so you do not need to manage developers or infrastructure. You describe the problem, I build the solution.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: 'var(--border-base)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="text-sm sm:text-base font-medium" style={{ color: 'var(--text-1)' }}>{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }} className="flex-shrink-0">
          <HiChevronDown className="w-5 h-5 text-text-muted" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-text-secondary leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PricingPageContent() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              className="relative"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {tier.isFeatured && (
                <div className="absolute -top-3.5 left-0 right-0 flex justify-center z-10">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: 'var(--primary)', color: 'var(--color-on-accent)' }}
                  >
                    Most Popular
                  </span>
                </div>
              )}
              <div
                className="glass-card p-6 rounded-lg h-full flex flex-col"
                style={tier.isFeatured ? { border: '1px solid rgba(191,84,44,0.35)', boxShadow: '0 0 40px rgba(191,84,44,0.08)' } : {}}
              >
                <div className="mb-5">
                  <h3 className="font-heading text-xl font-bold mb-1" style={{ color: 'var(--text-1)' }}>{tier.name}</h3>
                  <p className="text-xs text-text-muted mb-4 leading-relaxed">{tier.tagline}</p>
                  <div className="flex items-end gap-1">
                    {tier.suffix === 'custom' ? (
                      <span className="font-heading text-3xl font-bold" style={{ color: tier.accentColor }}>Custom</span>
                    ) : (
                      <>
                        <span className="font-heading text-4xl font-bold" style={{ color: 'var(--text-1)' }}>
                          ${tier.startingAt.toLocaleString()}
                        </span>
                        <span className="text-text-muted text-sm mb-1">{tier.suffix}</span>
                      </>
                    )}
                  </div>
                </div>

                <p className="text-text-secondary text-xs leading-relaxed mb-5">{tier.description}</p>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-2">
                      <HiCheck className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: tier.accentColor }} />
                      <span className="text-xs text-text-secondary">{f}</span>
                    </li>
                  ))}
                  {tier.id === 'starter' && (
                    <>
                      <li className="flex items-start gap-2 opacity-40">
                        <HiX className="w-4 h-4 flex-shrink-0 mt-0.5 text-text-muted" />
                        <span className="text-xs text-text-muted">Auth / database</span>
                      </li>
                      <li className="flex items-start gap-2 opacity-40">
                        <HiX className="w-4 h-4 flex-shrink-0 mt-0.5 text-text-muted" />
                        <span className="text-xs text-text-muted">AI features</span>
                      </li>
                    </>
                  )}
                  {tier.id === 'scale-stack' && (
                    <li className="flex items-start gap-2 opacity-40">
                      <HiX className="w-4 h-4 flex-shrink-0 mt-0.5 text-text-muted" />
                      <span className="text-xs text-text-muted">AI / agent systems</span>
                    </li>
                  )}
                </ul>

                {tier.hasRetainer && tier.retainerNote && (
                  <p className="text-xs text-text-muted italic border-t pt-3 mb-5" style={{ borderColor: 'var(--border-base)' }}>
                    {tier.retainerNote}
                  </p>
                )}

                <Link
                  href={tier.ctaHref}
                  className="block w-full text-center py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={tier.isFeatured
                    ? { background: 'var(--primary)', color: 'var(--bg-primary)' }
                    : { backgroundColor: 'var(--bg-card)', color: 'var(--text-1)', border: '1px solid var(--border-base)' }
                  }
                >
                  {tier.ctaLabel}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-8 text-center" style={{ color: 'var(--text-1)' }}>
            Frequently Asked Questions
          </h2>
          <div>
            {faqs.map(faq => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>
            Have a unique requirement?
          </h2>
          <p className="text-text-secondary text-sm mb-3">
            Not everything fits a standard tier. If your project is complex, long-term, or needs a custom approach, let's talk through it.
          </p>
          <p className="text-text-muted text-xs mb-6">
            Not sure what you need?{' '}
            <Link href="/services" className="underline underline-offset-2 hover:opacity-80 transition-opacity" style={{ color: 'var(--accent-cyan)' }}>
              Explore Masab's full service breakdown
            </Link>{' '}
            or{' '}
            <Link href="/portfolio" className="underline underline-offset-2 hover:opacity-80 transition-opacity" style={{ color: 'var(--accent-violet)' }}>
              browse the project portfolio
            </Link>{' '}
            first.
          </p>
          <Link
            href="/contact?tier=custom"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold"
            style={{ background: 'var(--primary)', color: 'var(--color-on-accent)' }}
          >
            Contact for Pricing <HiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
