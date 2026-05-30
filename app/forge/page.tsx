import type { Metadata } from 'next';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Forge — Coming Soon | Masab Farooque',
  description: 'Forge is an AI project scoping bot by Masab Farooque. Coming soon.',
  alternates: { canonical: 'https://masabfarooque.com/forge' },
  robots: { index: false, follow: false },
};

export default function ForgePage() {
  return (
    <>
      <Navigation />
      <main className="relative bg-void-black min-h-screen flex flex-col items-center justify-center px-4 text-center">

        {/* Background glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 600,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(0,240,255,0.06) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -60%)',
          }}
        />

        <div className="relative max-w-xl mx-auto">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border"
            style={{ borderColor: 'var(--accent-cyan-border)', background: 'var(--accent-cyan-subtle)' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: 'var(--accent-cyan)' }}
            />
            <span
              className="font-mono text-xs tracking-widest uppercase"
              style={{ color: 'var(--accent-cyan)' }}
            >
              Under Development
            </span>
          </div>

          {/* Wordmark */}
          <h1
            className="font-heading text-6xl sm:text-8xl font-bold mb-4"
            style={{ color: 'var(--text-1)' }}
          >
            FORGE
          </h1>
          <div
            className="w-16 h-1 rounded-full mx-auto mb-8"
            style={{ background: 'linear-gradient(90deg, rgb(0,240,255), rgb(139,92,246))' }}
          />

          {/* Description */}
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-3">
            An AI project scoping bot built into this portfolio. Tell it what you want to build
            — it asks the right questions, generates a structured technical brief, and lands in
            my inbox ready to act on.
          </p>
          <p className="text-text-muted text-sm mb-12">
            Launching soon. Until then, reach out directly.
          </p>

          {/* CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold"
            style={{ background: 'linear-gradient(135deg, rgb(0,240,255), rgb(139,92,246))', color: 'var(--color-on-accent)' }}
          >
            Start a Project
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
