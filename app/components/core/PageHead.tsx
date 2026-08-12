import Reveal from '@/app/components/motion/Reveal';
import WordsPullUp from '@/app/components/motion/WordsPullUp';

type Props = {
  label: string;
  title: string;
  intro?: string;
  meta?: { label: string; value: string }[];
  showAsterisk?: boolean;
};

/**
 * The masthead on every inner page. It borrows the hero proportions at a
 * smaller scale so moving between pages never feels like leaving the site.
 */
export default function PageHead({ label, title, intro, meta, showAsterisk = true }: Props) {
  return (
    <header className="relative px-4 pt-24 sm:px-6 md:px-8 md:pt-32">
      <div className="shell">
        <Reveal y={12}>
          <p className="text-[10px] text-primary sm:text-xs">{label}</p>
        </Reveal>

        <WordsPullUp
          as="h1"
          text={title}
          showAsterisk={showAsterisk}
          className="mt-4 text-[13vw] font-medium leading-[0.85] tracking-[-0.06em] sm:text-[11vw] md:text-[9vw] lg:text-[7.5vw] 3xl:text-[clamp(8.44rem,5vw,11rem)]"
        />

        {intro ? (
          <Reveal delay={0.25} className="mt-8 max-w-2xl">
            <p className="text-lede">{intro}</p>
          </Reveal>
        ) : null}

        {meta ? (
          <Reveal
            delay={0.35}
            stagger={0.06}
            className="mt-12 grid grid-cols-2 gap-6 border-t pt-7 sm:grid-cols-4"
            style={{ borderColor: 'var(--line)' }}
          >
            {meta.map((item) => (
              <div key={item.label}>
                <p className="label mb-2">{item.label}</p>
                <p className="text-sm text-cream">{item.value}</p>
              </div>
            ))}
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}
