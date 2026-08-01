import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/app/data/site';
import PageHead from '@/app/components/core/PageHead';
import { LegalSection, LegalList } from '@/app/components/core/Legal';
import { ArrowLong } from '@/app/components/marks';

export const metadata: Metadata = {
  title: 'Terms',
  description:
    'Terms for freelance development work with Masab Farooque. Scope, payment, ownership, confidentiality and liability.',
  alternates: { canonical: `${site.url}/terms` },
};

const LAST_UPDATED = 'August 1, 2026';

export default function TermsPage() {
  return (
    <>
      <PageHead
        label="Legal"
        title="Terms"
        intro={`The terms that apply to development work I take on. Last updated ${LAST_UPDATED}.`}
      />

      <div className="shell py-14 md:py-20">
        <LegalSection index="01" title="About these terms">
          <p>
            These terms cover freelance development work carried out by Masab Farooque, a sole
            trader in Islamabad, Pakistan, for clients who engage me through this site, Fiverr,
            Upwork or a direct agreement.
          </p>
          <p>
            Engaging me means you accept these terms. If you hire me through Fiverr or Upwork,
            their platform terms apply alongside these.
          </p>
        </LegalSection>

        <LegalSection index="02" title="Scope">
          <p>
            Scope, deliverables, timeline and payment are agreed in writing before work starts,
            through a proposal, a platform order brief or an email exchange.
          </p>
          <p>
            Anything outside that agreement is a new request and is quoted separately. I can
            decline a request that conflicts with the original scope.
          </p>
        </LegalSection>

        <LegalSection index="03" title="Payment">
          <LegalList
            items={[
              'Direct projects: a deposit, usually fifty percent, before work begins, with the balance due on delivery.',
              'Fiverr and Upwork projects: handled by the platform milestone or escrow system.',
              'Invoices unpaid fourteen days after delivery may carry a late fee of five percent per seven days.',
              'All figures are in US dollars unless agreed otherwise.',
            ]}
          />
        </LegalSection>

        <LegalSection index="04" title="Revisions and delivery">
          <p>
            Every project includes a reasonable number of revisions, set out in the scope. A
            revision that changes the requirements is new scope.
          </p>
          <p>
            Timelines are estimates based on the scope at the time of agreement. Delays caused by
            late feedback, scope changes or third party services are outside my control.
          </p>
        </LegalSection>

        <LegalSection index="05" title="Ownership">
          <p>
            Once payment is complete, you own the custom code and deliverables built specifically
            for your project.
          </p>
          <p>
            I keep ownership of reusable utilities and boilerplate that are not specific to your
            project. Open source libraries used in the build stay under their own licences.
          </p>
          <p>
            I may show the project in my portfolio, including name, description and screenshots,
            unless you ask me in writing not to before the project starts.
          </p>
        </LegalSection>

        <LegalSection index="06" title="Confidentiality">
          <p>
            Project details, business logic and any data shared with me are treated as
            confidential and are not disclosed without your written consent, except where the law
            requires it. If you need an NDA, raise it before work begins.
          </p>
        </LegalSection>

        <LegalSection index="07" title="Liability">
          <p>
            I do careful work, but no one can guarantee that software runs without fault in every
            environment after delivery.
          </p>
          <p>
            My total liability for any claim arising from a project is capped at the fees paid for
            that project. I am not liable for indirect, consequential or loss of profit damages.
          </p>
        </LegalSection>

        <LegalSection index="08" title="Cancellation">
          <p>Either side can cancel with written notice. If you cancel after work has started:</p>
          <LegalList
            items={[
              'Any deposit already paid is not refundable.',
              'Work completed up to the cancellation date is invoiced at the agreed rate.',
              'Everything produced up to that point is delivered to you once payment clears.',
            ]}
          />
        </LegalSection>

        <LegalSection index="09" title="Governing law">
          <p>
            These terms are governed by the laws of Pakistan. Disputes are settled by good faith
            negotiation first, and failing that by binding arbitration or the competent courts of
            Islamabad.
          </p>
        </LegalSection>

        <LegalSection index="10" title="Contact">
          <p>
            Questions about these terms, email{' '}
            <a href={`mailto:${site.email}`} className="text-primary hover:underline">
              {site.email}
            </a>
            .
          </p>
        </LegalSection>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/privacy"
            className="group inline-flex items-center gap-3 border px-5 py-3 text-sm transition-colors duration-500 hover:border-hair2"
            style={{ borderColor: 'var(--line-2)' }}
          >
            Privacy
            <ArrowLong size={15} className="text-primary transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 border px-5 py-3 text-sm transition-colors duration-500 hover:border-hair2"
            style={{ borderColor: 'var(--line-2)' }}
          >
            Contact
            <ArrowLong size={15} className="text-primary transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </>
  );
}
