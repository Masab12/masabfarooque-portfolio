import type { Metadata } from 'next';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Masab Farooque',
  description: 'Privacy Policy for masabfarooque.com — how your data is collected and used when you contact Masab Farooque.',
  alternates: { canonical: 'https://masabfarooque.com/privacy' },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = 'May 28, 2026';

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="relative bg-transparent min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">

          <div className="mb-12">
            <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: 'var(--accent-cyan)' }}>
              Legal
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>
              Privacy Policy
            </h1>
            <div className="w-14 h-1 rounded-full mb-4" style={{ background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))' }} />
            <p className="text-text-muted text-sm">Last updated: {LAST_UPDATED}</p>
          </div>

          <div className="prose-section space-y-10 text-text-secondary text-sm sm:text-base leading-relaxed">

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3" style={{ color: 'var(--text-1)' }}>1. Who I Am</h2>
              <p>
                This website is operated by <strong className="text-text-primary">Masab Farooque</strong>, a solo freelance
                developer based in Islamabad, Pakistan. &ldquo;I&rdquo;, &ldquo;me&rdquo;, or &ldquo;my&rdquo; in this policy
                refers to Masab Farooque personally, not a company or agency.
              </p>
              <p className="mt-3">
                Contact: <a href="mailto:masabfarooque1122@gmail.com" className="underline underline-offset-2 hover:opacity-80 transition-opacity" style={{ color: 'var(--accent-cyan)' }}>masabfarooque1122@gmail.com</a>
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3" style={{ color: 'var(--text-1)' }}>2. What Data I Collect</h2>
              <p>I only collect information you voluntarily provide through the contact form on this site:</p>
              <ul className="mt-3 space-y-1.5 list-disc list-inside text-text-muted">
                <li><span className="text-text-secondary">Your name</span></li>
                <li><span className="text-text-secondary">Your email address</span></li>
                <li><span className="text-text-secondary">Your project description or message</span></li>
                <li><span className="text-text-secondary">Optional: budget range or service type</span></li>
              </ul>
              <p className="mt-3">I do not use tracking pixels, fingerprinting, or behavioural analytics. I do not collect IP addresses, device data, or browsing history.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3" style={{ color: 'var(--text-1)' }}>3. How I Use Your Data</h2>
              <p>The information you submit is used solely to:</p>
              <ul className="mt-3 space-y-1.5 list-disc list-inside text-text-muted">
                <li><span className="text-text-secondary">Respond to your enquiry about a project</span></li>
                <li><span className="text-text-secondary">Assess whether your project is a good fit</span></li>
                <li><span className="text-text-secondary">Follow up on ongoing project discussions</span></li>
              </ul>
              <p className="mt-3">I will never sell, rent, or share your personal information with third parties for marketing purposes.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3" style={{ color: 'var(--text-1)' }}>4. Third-Party Services</h2>
              <p>Contact form submissions are routed through <strong className="text-text-primary">EmailJS</strong> to deliver messages to my inbox. EmailJS processes the submitted data to send the email and does not store it beyond delivery. You can review their privacy policy at <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-80 transition-opacity" style={{ color: 'var(--accent-cyan)' }}>emailjs.com</a>.</p>
              <p className="mt-3">The world map on the About page loads geographic data from <strong className="text-text-primary">jsDelivr CDN</strong> (a public CDN). No personal data is sent to jsDelivr.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3" style={{ color: 'var(--text-1)' }}>5. Cookies</h2>
              <p>This website does not use cookies for tracking or analytics. The site may use browser-level session storage for UI state (e.g. scroll position) but this data never leaves your device and is not sent to any server.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3" style={{ color: 'var(--text-1)' }}>6. Data Retention</h2>
              <p>
                Email correspondence is retained in my personal email inbox for as long as necessary to manage project discussions, typically no longer than 2 years after the last contact. You can request deletion at any time by emailing me.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3" style={{ color: 'var(--text-1)' }}>7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="mt-3 space-y-1.5 list-disc list-inside text-text-muted">
                <li><span className="text-text-secondary">Request access to any personal data I hold about you</span></li>
                <li><span className="text-text-secondary">Request correction of inaccurate data</span></li>
                <li><span className="text-text-secondary">Request deletion of your data</span></li>
                <li><span className="text-text-secondary">Withdraw consent at any time</span></li>
              </ul>
              <p className="mt-3">To exercise any of these rights, email <a href="mailto:masabfarooque1122@gmail.com" className="underline underline-offset-2 hover:opacity-80 transition-opacity" style={{ color: 'var(--accent-cyan)' }}>masabfarooque1122@gmail.com</a> and I will respond within 72 hours.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3" style={{ color: 'var(--text-1)' }}>8. Changes to This Policy</h2>
              <p>If I make material changes to this policy, I will update the &ldquo;Last updated&rdquo; date at the top of this page. Continued use of the site after changes constitutes acceptance of the updated policy.</p>
            </section>

            <div className="pt-6 border-t" style={{ borderColor: 'var(--border-base)' }}>
              <Link href="/terms" className="text-sm underline underline-offset-2 hover:opacity-80 transition-opacity mr-6" style={{ color: 'var(--accent-violet)' }}>
                Terms of Service
              </Link>
              <Link href="/contact" className="text-sm underline underline-offset-2 hover:opacity-80 transition-opacity" style={{ color: 'var(--accent-cyan)' }}>
                Contact Me
              </Link>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
