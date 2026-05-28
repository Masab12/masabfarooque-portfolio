'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';

export default function HomepageCTA() {
  return (
    <section className="section-violet relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-10" style={{ background: 'radial-gradient(ellipse, rgb(0,240,255), rgb(139,92,246))' }} />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.h2
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight"
          style={{ color: '#f8f9fa' }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          Ready to build something real?
        </motion.h2>

        <motion.p
          className="text-text-secondary text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: 0.18 }}
        >
          From a simple landing page to a full AI-powered SaaS platform. Let's discuss your project and get it shipped.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-void-black transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, rgb(0,240,255), rgb(139,92,246))' }}
          >
            Start a Project <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-4 glass-card rounded-xl font-semibold text-text-primary hover:border-electric-cyan/40 transition-all duration-300"
          >
            View Pricing
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
