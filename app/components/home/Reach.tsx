import { clientPlaces, homeBase } from '@/app/data/reach';
import { MarkPin, MarkClock } from '@/app/components/marks';
import SectionHeader from '@/app/components/core/SectionHeader';
import Reveal from '@/app/components/core/Reveal';
import Globe from './Globe';

export default function Reach() {
  const sorted = [...clientPlaces].sort((a, b) => b.orders - a.orders);

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="shell">
        <SectionHeader
          index="06"
          label="Where the work goes"
          title="Built here, shipped everywhere"
          note="Every marker is a country a client has ordered from. The thread starts in Islamabad."
        />

        <div className="mt-14 grid items-center gap-10 md:mt-20 md:grid-cols-12">
          <Reveal className="md:col-span-6 lg:col-span-7" y={20}>
            <div className="relative aspect-square w-full">
              <Globe />
            </div>
          </Reveal>

          <div className="md:col-span-6 lg:col-span-5">
            <Reveal className="flex flex-wrap gap-6 border-b pb-6" style={{ borderColor: 'var(--line)' }}>
              <div className="flex items-center gap-3">
                <MarkPin size={18} className="text-brass" />
                <div>
                  <p className="text-sm text-bone">
                    {homeBase.city}, {homeBase.country}
                  </p>
                  <p className="eyebrow mt-1">Home base</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MarkClock size={18} className="text-brass" />
                <div>
                  <p className="text-sm text-bone">UTC plus five</p>
                  <p className="eyebrow mt-1">Overlap with EU and US</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} stagger={0.03} className="mt-6 grid grid-cols-2 gap-x-8">
              {sorted.map((place) => (
                <div
                  key={place.code}
                  className="flex items-baseline justify-between gap-3 border-b py-2.5"
                  style={{ borderColor: 'var(--line)' }}
                >
                  <span className="flex items-baseline gap-2.5 truncate">
                    <span className="mono text-[0.6rem] text-brass">{place.code}</span>
                    <span className="truncate text-[0.82rem] text-bone-2">{place.country}</span>
                  </span>
                  <span className="mono text-[0.6rem] text-bone-3">
                    {String(place.orders).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
