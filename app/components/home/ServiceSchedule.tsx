import { services } from '@/app/data/services';
import Section from '@/app/components/core/Section';
import SectionHeader from '@/app/components/core/SectionHeader';
import ScheduleList from '@/app/components/home/ScheduleList';

/**
 * The services as a schedule, the table on a drawing that lists each item
 * with its size. Each row is a service with what it covers, how long it
 * usually runs and how it is priced, all read from services.ts.
 */

const meta = (slug: string, label: string) =>
  services.find((s) => s.slug === slug)?.meta.find((m) => m.label === label)?.value ?? '';

export default function ServiceSchedule() {
  return (
    <Section id="services" labelledBy="services-title">
      <SectionHeader
        id="services-title"
        label="A-02 · Services"
        title={
          <>
            Four kinds of work, each{' '}
            <span className="serif-italic text-[1.08em] font-normal text-sage">scoped in writing.</span>
          </>
        }
        intro="A fixed price where the scope allows one, a monthly arrangement where the work keeps going, and a documented handover either way."
        action={{ href: '/services', label: 'How the work runs' }}
      />
      <ScheduleList
        rows={services.map((s) => ({
          slug: s.slug,
          title: s.title,
          line: s.line,
          timeline: meta(s.slug, 'Typical timeline'),
          pricing: meta(s.slug, 'Pricing'),
        }))}
      />
    </Section>
  );
}
