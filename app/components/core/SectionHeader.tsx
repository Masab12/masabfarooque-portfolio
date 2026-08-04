import Reveal from '@/app/components/motion/Reveal';
import WordsPullUpMultiStyle from '@/app/components/motion/WordsPullUpMultiStyle';

type Props = {
  label: string;
  title: string;
  subtitle?: string;
  className?: string;
};

/**
 * Every section opens the same way: a small label, then a two line statement
 * where the second line drops back to grey. Same rhythm as the feature grid,
 * so the page reads as one continuous piece.
 */
export default function SectionHeader({ label, title, subtitle, className = '' }: Props) {
  return (
    <header className={className}>
      <Reveal y={12}>
        <p className="text-[10px] text-primary sm:text-xs">{label}</p>
      </Reveal>

      <div className="mt-5 max-w-4xl">
        <WordsPullUpMultiStyle
          align="left"
          className="text-xl font-normal sm:text-2xl md:text-3xl lg:text-4xl"
          segments={[{ text: title }]}
        />
        {subtitle ? (
          <WordsPullUpMultiStyle
            align="left"
            delayOffset={0.15}
            className="text-xl font-normal text-gray-500 sm:text-2xl md:text-3xl lg:text-4xl"
            segments={[{ text: subtitle }]}
          />
        ) : null}
      </div>
    </header>
  );
}
