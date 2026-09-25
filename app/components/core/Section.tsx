import type { ElementType } from 'react';

type Props = {
  children: React.ReactNode;
  id?: string;
  /** Wraps the content in the standard shell width. */
  shell?: boolean;
  /** Draws the hairline that separates one band of a sheet from the next. */
  ruled?: boolean;
  className?: string;
  as?: ElementType;
  labelledBy?: string;
};

/**
 * One wrapper so every band on the site shares the same vertical rhythm and
 * horizontal gutter. If a section needs different spacing, the spacing is
 * wrong, not the section.
 */
export default function Section({
  children,
  id,
  shell = true,
  ruled = true,
  className = '',
  as: Tag = 'section',
  labelledBy,
}: Props) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={`relative py-16 sm:py-20 lg:py-28 ${ruled ? 'border-t' : ''} ${className}`}
      style={ruled ? { borderColor: 'var(--line)' } : undefined}
    >
      {shell ? <div className="shell">{children}</div> : children}
    </Tag>
  );
}
