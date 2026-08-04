'use client';

import WordsPullUpMultiStyle from '@/app/components/motion/WordsPullUpMultiStyle';
import ScrollLetters from '@/app/components/motion/ScrollLetters';

export default function Statement() {
  return (
    <section className="bg-black py-14 sm:py-20 md:py-24 lg:py-28">
      <div className="shell">
      <div className="rounded-2xl bg-[#101010] px-5 py-14 text-center sm:px-10 sm:py-20 md:rounded-[2rem] md:py-24 lg:py-28">
        <p className="text-[10px] text-primary sm:text-xs">Full stack engineering</p>

        <div className="mx-auto mt-7 max-w-3xl sm:mt-8">
          <WordsPullUpMultiStyle
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
            className="text-xs leading-relaxed text-[#DEDBC8] sm:text-sm md:text-base"
            text="Companies bring me in as an external resource when something has to be built properly and there is nobody free to own it. Three years of that so far, most of it as the only engineer on the project. This year I joined two product teams: an AI proposal tool in March, then a browser based audio editor in June. Before those came a marketplace monitoring platform and a booking system, both taken from an empty repository to paying users. That work has earned 148 reviews at a 4.85 average from clients in 23 countries."
          />
        </div>
      </div>
      </div>
    </section>
  );
}
