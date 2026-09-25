import Link from 'next/link';
import Section from '@/app/components/core/Section';
import SectionHeader from '@/app/components/core/SectionHeader';
import Reveal from '@/app/components/motion/Reveal';
import DecoupleTrack from '@/app/components/home/DecoupleTrack';
import { MarkArrow45 } from '@/app/components/marks';

/**
 * The main service, argued with a drawing the reader takes apart by
 * scrolling. The words that follow say the same thing plainly, with the one
 * sourced number and the articles that make the full case.
 */

const reading = [
  { href: '/blog/wordpress-vs-nextjs', label: 'WordPress or Next.js: how to tell which one your site should be on' },
  { href: '/blog/wordpress-plugins-in-nextjs', label: 'What happens to your WordPress plugins when you move' },
  { href: '/blog/wordpress-to-nextjs-migration', label: 'Moving to Next.js without losing your rankings' },
];

export default function Decoupling() {
  return (
    <Section id="wordpress" labelledBy="wordpress-title">
      <SectionHeader
        id="wordpress-title"
        label="A-02.1 · WordPress to Next.js"
        title="Most slow WordPress sites are slow for the same reason."
        intro="Scroll through the drawing and take one apart."
        action={{ href: '/services/wordpress-to-nextjs', label: 'The migration service' }}
      />

      <div className="mt-10 sm:mt-14">
        <DecoupleTrack />
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-6">
          <p className="text-[1.05rem] leading-relaxed text-ink-2">
            Every visit to a WordPress page starts PHP, runs whatever the plugins have hooked into
            that request, queries the database and puts the page together while the visitor waits.
            A Next.js page was built when its content last changed, so the visitor is handed a file.
          </p>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-2">
            Your writers do not have to give up the WordPress editor. It can stay as the place content
            gets written and stop being the thing that answers your traffic.
          </p>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-6">
          <Reveal delay={0.08} className="border-l-2 pl-5" style={{ borderColor: 'var(--clay)' }}>
            <p className="text-[clamp(2.2rem,1.7rem+1.8vw,3.2rem)] font-extrabold leading-none tracking-[-0.04em] text-ink">91%</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">
              of the 11,334 new WordPress vulnerabilities Patchstack recorded in 2025 were in plugins.
              WordPress core had six.
            </p>
            <a
              href="https://patchstack.com/whitepaper/state-of-wordpress-security-in-2026/"
              target="_blank"
              rel="noopener noreferrer"
              className="label mt-3 inline-flex min-h-[2.75rem] items-center gap-1.5 underline decoration-[var(--line-3)] underline-offset-[0.3em] hover:text-ink"
            >
              Source: Patchstack, 2026 report
              <MarkArrow45 size={9} />
            </a>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="label">Read more</p>
            <ul className="mt-3 border-t" style={{ borderColor: 'var(--line)' }}>
              {reading.map((item) => (
                <li key={item.href} className="border-b" style={{ borderColor: 'var(--line)' }}>
                  <Link href={item.href} className="group flex min-h-[3rem] items-center justify-between gap-4 py-2.5 text-[0.92rem] text-ink transition-colors hover:text-sage">
                    {item.label}
                    <MarkArrow45 size={10} className="shrink-0 text-sage transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
