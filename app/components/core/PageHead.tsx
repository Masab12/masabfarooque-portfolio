import CurrentSheet from '@/app/components/core/CurrentSheet';

type Props = {
  label: string;
  /** Wrap a phrase in asterisks to set it in the serif italic, once. */
  title: string;
  intro?: React.ReactNode;
  meta?: { label: string; value: string }[];
  /** Kept for older call sites. The asterisk mark is gone from the design. */
  showAsterisk?: boolean;
  children?: React.ReactNode;
};

function Title({ text }: { text: string }) {
  const match = text.match(/^(.*?)\*(.+?)\*(.*)$/);
  if (!match) return <>{text}</>;
  const [, before, accent, after] = match;
  return (
    <>
      {before}
      <span className="serif-italic text-[1.06em] font-normal text-sage">{accent}</span>
      {after}
    </>
  );
}

/**
 * The top of every inner sheet: the strip with its number, the heading, a
 * paragraph of context and, where the page has them, a row of facts set
 * like the cells of a title block.
 *
 * The heading is plain server markup with no entrance animation, because on
 * most of these pages it is the largest thing the browser paints, and the
 * page should not wait on JavaScript to show it.
 */
export default function PageHead({ label, title, intro, meta, children }: Props) {
  return (
    <header>
      <CurrentSheet title={label} />
      <div className="shell pb-12 pt-10 sm:pb-14 sm:pt-14 lg:pb-16 lg:pt-20">
        <h1 className="load-head max-w-[18ch] text-[clamp(2.5rem,1.15rem+4.6vw,5.75rem)] font-extrabold leading-[0.96] tracking-[-0.045em] text-ink [text-wrap:balance]">
          <Title text={title} />
        </h1>

        {intro ? (
          <p className="text-lede load-rise mt-7 max-w-[44rem]" style={{ '--d': '0.18s' } as React.CSSProperties}>
            {intro}
          </p>
        ) : null}

        {children}

        {meta ? (
          <dl
            className="mt-10 grid grid-cols-2 gap-px border sm:mt-12 lg:grid-cols-4"
            style={{ borderColor: 'var(--line-2)', background: 'var(--line-2)' }}
          >
            {meta.map((item, i) => (
              <div
                key={item.label}
                className="load-rise bg-paper px-4 py-4 sm:px-5"
                style={{ '--d': `${0.3 + i * 0.07}s` } as React.CSSProperties}
              >
                <dt className="label">{item.label}</dt>
                <dd className="mt-1.5 text-[0.98rem] font-bold text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </header>
  );
}
