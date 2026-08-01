import Reveal from './Reveal';
import TextReveal from './TextReveal';

type Props = {
  index: string;
  label: string;
  title: string;
  note?: string;
  align?: 'left' | 'split';
  className?: string;
};

/**
 * The header used by every section. An index number, a label, the heading and
 * an optional note in the opposite corner. Same rhythm everywhere, which is
 * what makes the page feel edited rather than assembled.
 */
export default function SectionHeader({
  index,
  label,
  title,
  note,
  align = 'split',
  className = '',
}: Props) {
  return (
    <header className={className}>
      <Reveal className="flex items-baseline gap-4" y={14}>
        <span className="mono text-[0.7rem] text-brass">{index}</span>
        <span className="eyebrow">{label}</span>
        <span className="mt-[-2px] h-px flex-1" style={{ background: 'var(--line)' }} />
      </Reveal>

      <div
        className={`mt-7 flex flex-col gap-6 ${
          align === 'split' ? 'md:flex-row md:items-end md:justify-between' : ''
        }`}
      >
        <TextReveal
          as="h2"
          text={title}
          mode="words"
          className="display wash max-w-[16ch] text-[clamp(2.4rem,6.2vw,5.2rem)]"
        />
        {note ? (
          <Reveal delay={0.12}>
            <p className="max-w-sm text-sm leading-relaxed text-bone-2 md:text-right">{note}</p>
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}
