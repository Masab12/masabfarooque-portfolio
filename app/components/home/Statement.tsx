'use client';

import WordsPullUpMultiStyle from '@/app/components/motion/WordsPullUpMultiStyle';
import ScrollLetters from '@/app/components/motion/ScrollLetters';

export default function Statement() {
  return (
    <section className="snap-start bg-black py-14 sm:py-20 md:py-24 lg:py-28">
      <div className="shell">
      <div className="rounded-2xl bg-[#101010] px-5 py-14 text-center sm:px-10 sm:py-20 md:rounded-[2rem] md:py-24 lg:py-28">
        <p className="text-[10px] text-primary sm:text-xs">Full stack engineering</p>

        <div className="mx-auto mt-7 max-w-3xl sm:mt-8">
          <WordsPullUpMultiStyle
            as="h2"
            className="text-[1.75rem] leading-[1.02] sm:text-4xl sm:leading-[0.95] md:text-5xl lg:text-6xl xl:text-7xl"
            segments={[
              { text: 'I am Masab Farooque,', className: 'font-normal' },
              { text: 'a full stack engineer.', className: 'serif-italic' },
              {
                text: 'I build SaaS platforms, AI systems, and data pipelines.',
                className: 'font-normal',
              },
            ]}
          />
        </div>

        <div className="mx-auto mt-8 max-w-2xl sm:mt-10">
          <ScrollLetters
            className="text-sm leading-relaxed text-[#DEDBC8] sm:text-base md:text-lg"
            text="I work across the full stack: schema design, backend services and APIs, then the interface on top. Next.js and TypeScript on the frontend, FastAPI, Node.js and Nest.js on the backend, PostgreSQL underneath. Over 100 projects shipped, more than 10 of them SaaS products still earning for their owners today. That work has earned 148 reviews at a 5.0 average from clients in 23 countries."
          />
        </div>
      </div>
      </div>
    </section>
  );
}
