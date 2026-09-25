import { categoryLabels, projects } from '@/app/data/projects';
import Section from '@/app/components/core/Section';
import SectionHeader from '@/app/components/core/SectionHeader';
import WorkScroller, { type WorkItem } from '@/app/components/home/WorkScroller';

/**
 * Three featured projects. The data is shaped here, on the server, so the
 * scrolling component only receives what it renders. The role is cut to its
 * first sentence, which is the part that says who did the work.
 */

function firstSentence(text: string) {
  const end = text.indexOf('. ');
  return end === -1 ? text : text.slice(0, end + 1);
}

const items: WorkItem[] = projects
  .filter((p) => p.featured)
  .map((p) => ({
    slug: p.slug,
    title: p.title,
    category: categoryLabels[p.category],
    year: p.year,
    summary: p.summary,
    client: p.client,
    role: firstSentence(p.role),
    stack: p.stack.slice(0, 5),
    cover: p.cover,
    liveUrl: p.liveUrl,
  }));

export default function SelectedWork() {
  return (
    <Section id="work" labelledBy="work-title">
      <SectionHeader
        id="work-title"
        label="A-01 · Selected work"
        title={
          <>
            Three builds that are{' '}
            <span className="serif-italic text-[1.08em] font-normal text-sage">still in use.</span>
          </>
        }
        intro="Scroll through them and the drawing rebuilds itself into each one's real architecture."
        action={{ href: '/portfolio', label: `All ${projects.length} case studies` }}
      />
      <div className="mt-12 sm:mt-16">
        <WorkScroller items={items} />
      </div>
    </Section>
  );
}
