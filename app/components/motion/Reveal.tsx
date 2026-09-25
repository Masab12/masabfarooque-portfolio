import type { CSSProperties, ElementType } from 'react';

type Variant = 'rise' | 'wipe' | 'draw' | 'scale' | 'fade' | 'scan';

type RevealProps = {
  children?: React.ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Anchor target, so a revealed block can be linked to directly. */
  id?: string;
  delay?: number;
  y?: number;
  /** Reveal the direct children one after another, this many seconds apart. */
  stagger?: number;
  variant?: Variant;
};

/**
 * The scroll entrance used on every page.
 *
 * This renders plain server markup with a data attribute and nothing else.
 * One observer (RevealObserver, in the layout) adds `is-in` as each block
 * scrolls into view, and CSS does the moving. Content is only ever hidden
 * after that observer is running, and anything already on screen when it
 * starts is left alone, so a visitor without JavaScript, a crawler, and the
 * first screenful of every page all see finished content.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  className,
  style,
  id,
  delay = 0,
  y = 22,
  stagger,
  variant = 'rise',
}: RevealProps) {
  const vars = {
    ...style,
    '--reveal-delay': `${delay}s`,
    '--reveal-y': `${y}px`,
    ...(stagger ? { '--reveal-stagger': `${stagger}s` } : {}),
  } as CSSProperties;

  return (
    <Tag id={id} className={className} style={vars} data-reveal={stagger ? 'stagger' : variant}>
      {children}
    </Tag>
  );
}

/** A child of a staggered Reveal. It inherits its place in the queue. */
export function RevealItem({
  children,
  className,
  style,
  y = 16,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  y?: number;
  as?: ElementType;
}) {
  return (
    <Tag className={className} style={{ ...style, '--reveal-y': `${y}px` } as CSSProperties}>
      {children}
    </Tag>
  );
}
