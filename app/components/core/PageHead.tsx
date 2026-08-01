import Reveal from './Reveal';
import TextReveal from './TextReveal';

type Props = {
  index: string;
  label: string;
  title: string;
  intro?: string;
  meta?: { label: string; value: string }[];
};

/**
 * The masthead used at the top of every inner page. It reuses the hero
 * proportions at a smaller scale so the site keeps one voice throughout.
 */
export default function PageHead({ index, label, title, intro, meta }: Props) {
  return (
    <header className="relative overflow-hidden border-b pt-[calc(var(--nav-h)+4rem)]" style={{ borderColor: 'var(--line)' }}>
      <div className="warp" />

      <div className="shell relative pb-14 md:pb-20">
        <Reveal className="flex items-baseline gap-4" y={12}>
          <span className="mono text-[0.7rem] text-brass">{index}</span>
          <span className="eyebrow">{label}</span>
          <span className="mt-[-2px] h-px flex-1" style={{ background: 'var(--line)' }} />
        </Reveal>

        <TextReveal
          as="h1"
          mode="words"
          text={title}
          className="display wash mt-8 max-w-[14ch] text-[clamp(2.8rem,9vw,8rem)] uppercase"
        />

        {intro ? (
          <Reveal delay={0.15} className="mt-8 max-w-2xl">
            <p className="lede">{intro}</p>
          </Reveal>
        ) : null}

        {meta ? (
          <Reveal
            delay={0.22}
            stagger={0.06}
            className="mt-12 grid grid-cols-2 gap-6 border-t pt-7 sm:grid-cols-4"
            style={{ borderColor: 'var(--line)' }}
          >
            {meta.map((item) => (
              <div key={item.label}>
                <p className="eyebrow mb-2">{item.label}</p>
                <p className="text-sm text-bone">{item.value}</p>
              </div>
            ))}
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}
