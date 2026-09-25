import { categoryLabels, projects } from '@/app/data/projects';
import { services } from '@/app/data/services';
import { reviewSummary } from '@/app/data/reviews';
import Section from '@/app/components/core/Section';
import SectionHeader from '@/app/components/core/SectionHeader';
import Reveal from '@/app/components/motion/Reveal';
import Terminal from '@/app/components/home/Terminal';

/** The terminal band. Data is shaped here so the client gets only what it prints. */
export default function TerminalSection() {
  return (
    <Section id="terminal" labelledBy="terminal-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeader
            id="terminal-title"
            label="A-06 · Shell"
            title={
              <>
                Or ask the{' '}
                <span className="serif-italic text-[1.08em] font-normal text-sage">terminal.</span>
              </>
            }
            intro="It answers from the same data as the rest of this site. Try help, or the one sudo command that works."
          />
        </div>
        <Reveal variant="scale" className="lg:col-span-7">
          <Terminal
            projects={projects.map((p) => ({ slug: p.slug, title: p.title, category: categoryLabels[p.category], year: p.year }))}
            services={services.map((s) => ({
              slug: s.slug,
              title: s.title,
              timeline: s.meta.find((m) => m.label === 'Typical timeline')?.value ?? '',
            }))}
            reviews={reviewSummary}
          />
        </Reveal>
      </div>
    </Section>
  );
}
