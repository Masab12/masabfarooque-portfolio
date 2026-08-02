import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/app/data/site';
import PageHead from '@/app/components/core/PageHead';
import { LegalSection, LegalList } from '@/app/components/core/Legal';
import { ArrowLong } from '@/app/components/marks';

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'How your data is collected, used and kept when you contact Masab Farooque through masabfarooque.com.',
  alternates: { canonical: `${site.url}/privacy` },
};

const LAST_UPDATED = 'August 1, 2026';

export default function PrivacyPage() {
  return (
    <>
      <PageHead
        label="Legal"
        title="Privacy"
        intro={`How your information is handled on this site. Last updated ${LAST_UPDATED}.`}
      />

      <div className="shell py-14 md:py-20">
        <LegalSection index="01" title="Who I am">
          <p>
            This site is run by Masab Farooque, an independent developer based in Islamabad,
            Pakistan. The words I, me and my in this policy refer to me personally, not to a
            company or an agency.
          </p>
          <p>
            Contact:{' '}
            <a href={`mailto:${site.email}`} className="text-primary hover:underline">
              {site.email}
            </a>
          </p>
        </LegalSection>

        <LegalSection index="02" title="What I collect">
          <p>I only collect what you choose to send through the contact form:</p>
          <LegalList
            items={[
              'Your name',
              'Your email address',
              'Your company name, if you add one',
              'The project type and timeline you select',
              'The message you write',
            ]}
          />
          <p>
            I do not use tracking pixels, fingerprinting or behavioural profiling. The site does
            use Google Analytics for aggregate visit counts, which you can block with any standard
            content blocker.
          </p>
        </LegalSection>

        <LegalSection index="03" title="How I use it">
          <LegalList
            items={[
              'To reply to your enquiry',
              'To work out whether the project is a good fit',
              'To continue an ongoing project conversation',
            ]}
          />
          <p>
            I will never sell, rent or pass your details to a third party for marketing.
          </p>
        </LegalSection>

        <LegalSection index="04" title="Third parties">
          <p>
            Contact form messages are delivered through EmailJS, which processes the submission to
            send the email and does not keep it afterwards. Client review photos on this site are
            served directly by Fiverr, which means your browser requests them from Fiverr when you
            view the reviews section.
          </p>
        </LegalSection>

        <LegalSection index="05" title="Cookies and storage">
          <p>
            No tracking cookies are set by me. The site stores one small session flag in your
            browser so the opening animation does not play twice in the same visit. That value
            never leaves your device.
          </p>
        </LegalSection>

        <LegalSection index="06" title="Retention">
          <p>
            Email correspondence stays in my inbox for as long as it is useful to manage the
            conversation, and no longer than two years after the last message. You can ask me to
            delete it at any point.
          </p>
        </LegalSection>

        <LegalSection index="07" title="Your rights">
          <LegalList
            items={[
              'Ask what personal data I hold about you',
              'Ask me to correct anything inaccurate',
              'Ask me to delete it',
              'Withdraw consent at any time',
            ]}
          />
          <p>
            Email me and I will reply within seventy two hours.
          </p>
        </LegalSection>

        <LegalSection index="08" title="Changes">
          <p>
            If this policy changes in a meaningful way I will update the date at the top of the
            page. Continuing to use the site after that means you accept the updated version.
          </p>
        </LegalSection>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/terms"
            className="group inline-flex items-center gap-3 border px-5 py-3 text-sm transition-colors duration-500 hover:border-hair2"
            style={{ borderColor: 'var(--line-2)' }}
          >
            Terms
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
