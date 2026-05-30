'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import emailjs from '@emailjs/browser';
import { HiMail, HiUser, HiPencil, HiCheckCircle, HiXCircle } from 'react-icons/hi';

interface FormData {
  name: string;
  email: string;
  message: string;
  service?: string;
  tier?: string;
}

export default function EnhancedContactForm({ service, tier }: { service?: string; tier?: string }) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    service,
    tier,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const frame = () => {
      const timeLeft = end - Date.now();
      if (timeLeft <= 0) return;
      const count = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount: count, origin: { x: Math.random() * 0.2 + 0.1, y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount: count, origin: { x: Math.random() * 0.2 + 0.7, y: Math.random() - 0.2 } });
      requestAnimationFrame(frame);
    };
    frame();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          service_interest: formData.service ?? formData.tier ?? 'Not specified',
          reply_to: formData.email,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setStatus('success');
      triggerConfetti();
      setFormData({ name: '', email: '', message: '', service, tier });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
      setTimeout(() => { setStatus('idle'); setErrorMessage(''); }, 5000);
    }
  };

  const inputBase =
    'w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-electric-cyan/50 transition-all duration-300 disabled:opacity-50';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative">
        <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted z-10" />
        <input
          type="text"
          value={formData.name}
          onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
          className={inputBase}
          placeholder="Your Name"
          required
          disabled={status === 'loading'}
        />
      </div>

      <div className="relative">
        <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted z-10" />
        <input
          type="email"
          value={formData.email}
          onChange={e => setFormData(d => ({ ...d, email: e.target.value }))}
          className={inputBase}
          placeholder="your.email@example.com"
          required
          disabled={status === 'loading'}
        />
      </div>

      <div className="relative">
        <HiPencil className="absolute left-4 top-5 w-5 h-5 text-text-muted z-10" />
        <textarea
          value={formData.message}
          onChange={e => setFormData(d => ({ ...d, message: e.target.value }))}
          rows={6}
          className={`${inputBase} resize-none`}
          placeholder="Tell me about your project..."
          required
          disabled={status === 'loading'}
        />
      </div>

      <motion.button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 rounded-xl font-semibold relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ background: 'linear-gradient(135deg, rgb(0,240,255), rgb(139,92,246))', color: 'var(--color-on-accent)' }}
        whileHover={status !== 'loading' ? { scale: 1.02 } : {}}
        whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {status === 'loading' ? (
            <>
              <motion.div
                className="w-5 h-5 border-2 border-void-black border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              Sending...
            </>
          ) : 'Send Message'}
        </span>
        <motion.div
          className="absolute inset-0 bg-white/20"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.5 }}
        />
      </motion.button>

      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <HiCheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
            <p className="text-green-500 text-sm">Message sent! I will get back to you within 24 hours.</p>
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <HiXCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
            <p className="text-red-500 text-sm">{errorMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
