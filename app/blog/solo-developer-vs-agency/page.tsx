import type { Metadata } from 'next';
import Link from 'next/link';
import { site, socials } from '@/app/data/site';
import { reviewSummary } from '@/app/data/reviews';
import { getPost } from '@/app/data/posts';
import ArticleLayout, { articleSchema } from '@/app/components/blog/ArticleLayout';
import {
  H2,
  H3,
  P,
  Lede,
  UL,
  OL,
  Note,
  Takeaways,
  Table,
  ReadNext,
  Resources,
} from '@/app/components/blog/Prose';

const post = getPost('solo-developer-vs-agency')!;
const fiverr = socials.find((s) => s.glyph === 'fiverr');

export const metadata: Metadata = {
  title: post.title,
  description: post.summary,
  alternates: { canonical: `${site.url}/blog/${post.slug}` },
  keywords: [
    'solo developer vs agency',
    'hire freelance web developer',
    'freelance developer vs studio',
    'working with a remote developer',
    'independent Next.js developer',
  ],
  openGraph: {
    type: 'article',
    title: post.title,
    description: post.summary,
    url: `${site.url}/blog/${post.slug}`,
    publishedTime: post.published,
    authors: [site.url],
  },
};

export default function Page() {
  return (
    <>
      {articleSchema(post).map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <ArticleLayout post={post}>
        <Lede>
          The question is not which is better. It is which one fits the job.
        </Lede>

        <P>
          I work alone, so treat what follows with the scepticism it deserves. I have also lost
          work to agencies for good reasons and watched clients come back from them for bad ones.
          What follows is the honest version, including the parts that do not help me.
        </P>

        <Takeaways
          items={[
            'With an agency you meet the senior people during the pitch and often work with juniors after signing. Ask who writes the code.',
            'A solo developer holds the whole system in one head, which removes handoffs and removes redundancy at the same time.',
            'Handover quality is the real differentiator, and it is the thing nobody checks until the relationship ends.',
            'Agencies win on scale, parallel work, coverage when someone is ill, and anything needing design depth alongside engineering.',
            'Judge either one on the same evidence: code you can read, references you can call, and a written scope.',
          ]}
        />

        <H2 id="who-writes-it">Who actually writes your code</H2>

        <P>
          At an agency, the people in your pitch meeting are usually the founder, a strategist and a
          senior engineer. They are good. That is why they are in the room.
        </P>

        <P>
          After you sign, the work often moves to whoever has capacity. That might be the senior you
          met. It might be someone two years into their career, following a spec written by someone
          else, checked at review by a third person who has ten other projects open.
        </P>

        <P>
          None of this is dishonest. It is how a studio stays profitable, and plenty of good
          software gets built that way. You just need to know it is happening, because the quality
          you were shown and the quality you receive come from different people.
        </P>

        <P>
          With one engineer, the person you assessed is the person who writes every line. That cuts
          both ways. If you assessed badly, there is no senior review to catch it.
        </P>

        <H2 id="the-context-problem">The context problem</H2>

        <P>
          Software projects lose more time to lost context than to hard problems.
        </P>

        <P>
          A studio splits work by specialism. A designer produces screens, a front end developer
          builds them, a backend developer wires the data, a project manager keeps them aligned.
          Every boundary between those roles is a place where an assumption gets dropped.
        </P>

        <P>
          You have felt this if you have ever had a build come back where the interface is
          beautiful, the API is sensible, and the two do not quite fit. Nobody made a mistake.
          Everyone solved their own piece correctly.
        </P>

        <Table
          head={['Where a decision gets made', 'Studio', 'One engineer']}
          rows={[
            ['Database shape', 'Backend developer', 'Same person'],
            ['API response shape', 'Backend developer', 'Same person'],
            ['What the screen needs', 'Designer', 'Same person'],
            ['How the screen fetches it', 'Front end developer', 'Same person'],
            ['Who notices the mismatch', 'Whoever integrates, usually late', 'Immediately, while building'],
          ]}
          caption="The rows are not an argument that studios are careless. They are an argument that every handoff is an opportunity for information to go missing, and a solo build has fewer of them."
        />

        <P>
          I design the schema knowing what the interface will ask for. When a screen turns out to
          need three extra fields, I change the query and keep moving. There is no ticket, no
          estimate, no waiting for the backend developer to finish something else.
        </P>

        <H2 id="handover">What handover really looks like</H2>

        <P>
          This is the part I would look at hardest, whoever you hire.
        </P>

        <P>
          Plenty of projects end with a deployed site and nothing else. No documentation. Comments
          that explain what a line does instead of why it exists. Environment variables that live in
          somebody's laptop. It works, right up until the next developer has to change it.
        </P>

        <P>
          Bad handover is not a solo problem or an agency problem. It is a discipline problem. But
          the incentives differ, and worth understanding: an agency that keeps you on retainer has
          little reason to make itself replaceable. An independent developer who wants referrals has
          every reason to leave clean work behind.
        </P>

        <P>What I think you should insist on, from anyone:</P>

        <OL
          items={[
            'A repository you own, with history that shows how the thing was built.',
            'A readme that gets a new developer running locally in under fifteen minutes.',
            'Documented environment variables, with a checked in example file.',
            'A written explanation of every decision that will look strange in six months.',
            'A recorded walkthrough of the deploy, so nobody depends on memory.',
          ]}
        />

        <Note title="One question that tells you a lot">
          <P>
            Ask what happens if you want to hire someone else to take over in a year. Watch the
            answer. Somebody who has built for handover will describe the repository, the docs and
            the walkthrough without hesitating. Somebody who has not will talk about how unlikely
            you are to want that.
          </P>
        </Note>

        <H2 id="speed">Why decisions move faster</H2>

        <P>
          A change request at a studio travels: you tell the account manager, they write it up, it
          gets estimated, it enters a sprint, it gets built, it comes back for review. That process
          exists for a reason. It protects scope and it keeps several people coordinated.
        </P>

        <P>It also turns a twenty minute change into a two week loop.</P>

        <P>
          You message me, I look at it, and if it is genuinely twenty minutes I usually just do it.
          If it is not, I tell you what it costs before I start. The whole exchange takes an hour.
        </P>

        <P>
          The flip side is real. One person has one throughput. If you need a design system, a
          mobile app and a web platform running in parallel, I am the wrong hire and no amount of
          speed on individual decisions fixes that.
        </P>

        <H2 id="where-agencies-win">Where an agency genuinely wins</H2>

        <P>
          I turn work down for these reasons regularly, so this list is not a formality.
        </P>

        <UL
          items={[
            <>
              <strong>Parallel workstreams.</strong> Three things that must ship on the same day get
              built faster by three people. A solo developer serialises them and the timeline
              stretches.
            </>,
            <>
              <strong>Coverage.</strong> If I get ill, your project stops. A studio reassigns.
              For anything with a fixed external deadline, that redundancy is worth paying for.
            </>,
            <>
              <strong>Design depth.</strong> I build interfaces that work and hold a consistent
              visual system. I am not a brand designer. If you need identity work, illustration and
              motion direction, hire people who do that all day.
            </>,
            <>
              <strong>Procurement and compliance.</strong> Larger organisations often require
              insurance levels, security audits and contract terms that a studio has ready and an
              individual does not.
            </>,
            <>
              <strong>Long term ownership at scale.</strong> A platform with several teams
              depending on it needs an organisation behind it, not a person.
            </>,
          ]}
        />

        <P>
          The honest summary: hire one engineer for a defined product built end to end. Hire a
          studio when the work is broad, parallel, or has to survive any one person disappearing.
        </P>

        <H2 id="how-to-check">How to check before you hire</H2>

        <P>
          Apply the same test to both. Most people apply a harder test to individuals, which is
          backwards, because an individual is easier to verify.
        </P>

        <OL
          items={[
            <>
              Ask for a repository you can read. Not a screenshot of a finished site. Actual code,
              with commit history.
            </>,
            <>
              Ask who writes it and who reviews it. Get names. At a studio, ask whether the people
              in the pitch will be on the project.
            </>,
            <>
              Call a reference whose project ended more than a year ago. Recent clients are still
              being charmed. Ask the old one what maintenance has been like.
            </>,
            <>
              Read a written scope before money moves. If nobody will put the deliverables in
              writing, that tells you how the disputes will go.
            </>,
            <>
              Ask what they would refuse to build. Anyone who says yes to everything is either
              inexperienced or planning to subcontract.
            </>,
          ]}
        />

        <H2 id="how-i-work">How I work</H2>

        <P>
          I am {site.name}, a full stack engineer in {site.location}. I take on one main project at
          a time and build it end to end: database, backend, interface and deployment.
        </P>

        <P>
          Most of what I do falls into a few shapes. SaaS platforms with billing and multiple
          tenants. AI systems that touch live data. Data pipelines and scraping. And a steady stream
          of WordPress sites moving to Next.js, often keeping WordPress as a headless CMS so the
          editorial team never changes how it works.
        </P>

        <P>
          The record is public. {reviewSummary.total} reviews at a{' '}
          {reviewSummary.average.toFixed(1)} average from clients in {reviewSummary.countries}{' '}
          countries, {reviewSummary.repeatShare}% of whom came back for more work.
          {fiverr ? (
            <>
              {' '}
              You can read every one of them on{' '}
              <a href={fiverr.href} target="_blank" rel="noopener noreferrer">
                my Fiverr profile
              </a>
              , unedited.
            </>
          ) : null}{' '}
          The <Link href="/portfolio">case studies</Link> cover what each project does, how it is
          built, and what was hard about it.
        </P>

        <P>How a project usually runs:</P>

        <OL
          items={[
            'You tell me what you are building and what is in the way. I ask questions until I understand it.',
            'I write a scope with deliverables, a timeline and a number. Nothing starts until you have that in writing.',
            'I build in the open. You get progress you can look at, not status updates.',
            'I hand over a repository, documentation and a walkthrough call.',
            'I stay available afterwards for a support window, because launch is when the real problems show up.',
          ]}
        />

        <P>
          If a project needs more people than me, I say so. Sending you to a studio that fits costs
          me one job and saves us both a bad six months.
        </P>

        <P>
          Thinking about moving off WordPress?{' '}
          <Link href="/services/wordpress-to-nextjs">See how the migration work runs</Link>, or{' '}
          <Link href="/contact">tell me what you are running</Link> and I will give you a straight
          answer on whether it is worth doing.
        </P>

        <ReadNext
          slug="wordpress-to-nextjs-migration"
          title="Moving a WordPress site to Next.js without losing your rankings"
        />

        <ReadNext
          slug="headless-cms-vs-website-builders"
          title="Why a headless CMS beats building on WordPress or Wix"
        />

        <H2 id="resources">Resources</H2>

        <Resources
          items={[
            {
              label: 'Joel Test: 12 steps to better code',
              href: 'https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/',
              note: 'Old, and still a fast way to judge whether a team has its basics in order.',
            },
            {
              label: 'The Bus Factor',
              href: 'https://en.wikipedia.org/wiki/Bus_factor',
              note: 'The redundancy risk you take on with any single person, named and explained.',
            },
            {
              label: "Conway's Law",
              href: 'https://en.wikipedia.org/wiki/Conway%27s_law',
              note: 'Why the shape of the team that builds a system shows up in the system itself.',
            },
            {
              label: 'Google: hiring a web developer or SEO',
              href: 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo',
              note: 'Sensible questions to ask anyone you are about to pay to touch your site.',
            },
          ]}
        />
      </ArticleLayout>
    </>
  );
}
