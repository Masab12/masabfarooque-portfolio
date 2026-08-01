'use client';

import WordsPullUpMultiStyle from '@/app/components/motion/WordsPullUpMultiStyle';
import ScrollLetters from '@/app/components/motion/ScrollLetters';

export default function Statement() {
  return (
    <section className="snap-band bg-black px-4 py-16 sm:px-6 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl rounded-2xl bg-[#101010] px-5 py-16 text-center sm:px-10 md:rounded-[2rem] md:py-24 lg:py-28">
        <p className="text-[10px] text-primary sm:text-xs">Full stack engineering</p>

        <div className="mx-auto mt-8 max-w-3xl">
          <WordsPullUpMultiStyle
            className="text-3xl leading-[0.95] sm:text-4xl sm:leading-[0.9] md:text-5xl lg:text-6xl xl:text-7xl"
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

        <div className="mx-auto mt-10 max-w-2xl">
          <ScrollLetters
            className="text-xs leading-relaxed text-[#DEDBC8] sm:text-sm md:text-base"
            text="Companies bring me in as an external resource when something has to be built properly and there is nobody free to own it. Over the last three years that has meant a browser based audio editor, an AI proposal tool, a marketplace monitoring platform and a booking system, each taken from an empty repository to real users. Together that work has earned 148 reviews at a 4.85 average from clients in 23 countries."
          />
        </div>
      </div>
    </section>
  );
}
