import Reveal from '@/app/components/core/Reveal';
import TextReveal from '@/app/components/core/TextReveal';
import { Spark } from '@/app/components/marks';

export default function Statement() {
  return (
    <section className="relative overflow-hidden py-24 md:py-40">
      <div className="warp" />

      <div className="shell relative">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-3" y={16}>
            <div className="flex items-center gap-3">
              <Spark size={11} className="text-brass" />
              <span className="eyebrow">The short version</span>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-bone-3">
              Three years of paid product work, and six years of building things before
              that. Games first, then the web.
            </p>
          </Reveal>

          <div className="md:col-span-8 md:col-start-5">
            <TextReveal
              as="p"
              mode="read"
              className="display-tight text-[clamp(1.5rem,3.1vw,2.6rem)] leading-[1.28] text-bone"
              text="I build software the way a joiner builds furniture. The joints matter even where nobody looks, because that is what decides whether the thing is still standing in three years. Most of my work is the unglamorous middle of a product: the schema, the queue, the billing edge case, the retry that fires at three in the morning. I care about the surface too, but only after the structure underneath it can carry the weight."
            />

            <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <p className="eyebrow mb-2">Working with</p>
                <p className="text-sm text-bone-2">Chord.fm, Skylight Studio</p>
              </div>
              <div>
                <p className="eyebrow mb-2">Shipped for</p>
                <p className="text-sm text-bone-2">Clients in 23 countries</p>
              </div>
              <div>
                <p className="eyebrow mb-2">Focus</p>
                <p className="text-sm text-bone-2">SaaS, AI systems, data</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
