import Image from 'next/image';
import { clientLogos } from '@/app/data/experience';
import Reveal from './Reveal';

/**
 * The client mark strip. Logos sit at low opacity and warm to full brightness
 * on hover, so the row reads as a quiet credit line rather than a badge wall.
 */
export default function ClientStrip() {
  return (
    <section className="relative py-14 md:py-20">
      <div className="shell">
        <Reveal className="flex items-center gap-4" y={12}>
          <span className="eyebrow whitespace-nowrap">Trusted by teams at</span>
          <span className="h-px flex-1" style={{ background: 'var(--line)' }} />
        </Reveal>

        <Reveal
          stagger={0.07}
          delay={0.1}
          className="mt-9 grid grid-cols-2 items-center gap-x-8 gap-y-9 sm:grid-cols-3 lg:grid-cols-6"
        >
          {clientLogos.map((logo) => (
            <div key={logo.name} className="flex h-8 items-center justify-center">
              <Image
                src={logo.src}
                alt={logo.name}
                width={150}
                height={32}
                className="h-full w-auto object-contain opacity-40 transition-opacity duration-500 hover:opacity-90"
                style={{ filter: 'grayscale(1) brightness(2.4) contrast(0.75)' }}
              />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
