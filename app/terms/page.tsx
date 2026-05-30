import type { Metadata } from 'next';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Masab Farooque',
  description: 'Terms of Service for freelance development projects with Masab Farooque — scope, payment, IP, and liability.',
  alternates: { canonical: 'https://masabfarooque.com/terms' },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = 'May 28, 2026';

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main className="relative bg-void-black min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">

          <div className="mb-12">
            <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: 'var(--accent-violet)' }}>
              Legal
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>
              Terms of Service
            </h1>
            <div className="w-14 h-1 rounded-full mb-4" style={{ background: 'linear-gradient(90deg, rgb(139,92,246), rgb(0,240,255))' }} />
            <p className="text-text-muted text-sm">Last updated: {LAST_UPDATED}</p>
          </div>

          <div className="space-y-10 text-text-secondary text-sm sm:text-base leading-relaxed">

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3" style={{ color: 'var(--text-1)' }}>1. About These Terms</h2>
              <p>
                These Terms of Service govern any freelance development work undertaken by <strong className="text-text-primary">Masab Farooque</strong> (a sole trader operating from Islamabad, Pakistan) for clients who engage with me through this website, Fiverr, Upwork, or direct agreement.
              </p>
              <p className="mt-3">
                By engaging my services, you agree to these terms. If you are engaging through Fiverr or Upwork, their platform terms also apply alongside these.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3" style={{ color: 'var(--text-1)' }}>2. Scope of Work</h2>
              <p>All project scope, deliverables, timeline, and payment terms will be agreed upon in writing before work begins — either through a project proposal, Fiverr/Upwork order brief, or email exchange.</p>
              <p className="mt-3">Work outside the agreed scope constitutes a new request and will be quoted separately. I reserve the right to decline requests that conflict with the original project scope.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3" style={{ color: 'var(--text-1)' }}>3. Payment</h2>
              <ul className="space-y-2 list-disc list-inside text-text-muted">
                <li><span className="text-text-secondary">Direct projects: a deposit (typically 50%) is required before work begins. The remaining balance is due on delivery.</span></li>
                <li><span className="text-text-secondary">Fiverr / Upwork projects: payments are governed by the respective platform's milestone or escrow system.</span></li>
                <li><span className="text-text-secondary">Invoices not settled within 14 days of delivery may incur a late fee of 5% per 7 days.</span></li>
                <li><span className="text-text-secondary">All prices are quoted in USD unless otherwise agreed.</span></li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3" style={{ color: 'var(--text-1)' }}>4. Revisions & Delivery</h2>
              <p>Each project includes a reasonable number of revisions as agreed in the project scope. Revisions that constitute a change in requirements are treated as new scope.</p>
              <p className="mt-3">Timelines are estimates based on the agreed scope at the time of engagement. Delays caused by late client feedback, scope changes, or third-party dependencies (APIs, hosting, etc.) are not my responsibility.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3" style={{ color: 'var(--text-1)' }}>5. Intellectual Property</h2>
              <p>Upon receipt of full payment, you receive full ownership of the custom code and deliverables I produce specifically for your project.</p>
              <p className="mt-3">I retain ownership of any reusable utilities, libraries, or boilerplate code that is not specific to your project. Open-source libraries and frameworks used in the build are governed by their respective licences.</p>
              <p className="mt-3">I may reference the project in my portfolio (name, description, and screenshots) unless you request otherwise in writing before project start.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3" style={{ color: 'var(--text-1)' }}>6. Confidentiality</h2>
              <p>I treat all project details, business logic, and client data shared during a project as confidential. I will not disclose this information to third parties without your written consent, except as required by law.</p>
              <p className="mt-3">If your project requires an NDA, please raise this before work begins.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3" style={{ color: 'var(--text-1)' }}>7. Limitation of Liability</h2>
              <p>I deliver my work with care and professionalism. However, I cannot guarantee uninterrupted or error-free operation of software in all environments after delivery.</p>
              <p className="mt-3">My total liability for any claim arising from a project will not exceed the total fees paid for that specific project. I am not liable for indirect, consequential, or loss-of-profit damages.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3" style={{ color: 'var(--text-1)' }}>8. Cancellation</h2>
              <p>Either party may cancel a project with written notice. If you cancel after work has begun:</p>
              <ul className="mt-3 space-y-1.5 list-disc list-inside text-text-muted">
                <li><span className="text-text-secondary">Any deposit paid is non-refundable.</span></li>
                <li><span className="text-text-secondary">Work completed to the cancellation date will be invoiced at the agreed rate.</span></li>
                <li><span className="text-text-secondary">All work produced to that point will be delivered to you upon payment.</span></li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3" style={{ color: 'var(--text-1)' }}>9. Governing Law</h2>
              <p>These terms are governed by the laws of Pakistan. Any disputes will be resolved through good-faith negotiation first. If that fails, disputes shall be submitted to binding arbitration or the competent courts of Islamabad.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3" style={{ color: 'var(--text-1)' }}>10. Contact</h2>
              <p>
                Questions about these terms? Email me at{' '}
                <a href="mailto:masabfarooque1122@gmail.com" className="underline underline-offset-2 hover:opacity-80 transition-opacity" style={{ color: 'var(--accent-cyan)' }}>
                  masabfarooque1122@gmail.com
                </a>
              </p>
            </section>

            <div className="pt-6 border-t" style={{ borderColor: 'var(--border-base)' }}>
              <Link href="/privacy" className="text-sm underline underline-offset-2 hover:opacity-80 transition-opacity mr-6" style={{ color: 'var(--accent-cyan)' }}>
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-sm underline underline-offset-2 hover:opacity-80 transition-opacity" style={{ color: 'var(--accent-violet)' }}>
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
