import type { ElementType } from 'react';

type Props = {
  children: React.ReactNode;
  id?: string;
  /** Wraps the content in the standard shell width. */
  shell?: boolean;
  className?: string;
  as?: ElementType;
};

/**
 * One wrapper so every band on the site shares the same vertical rhythm,
 * horizontal gutter. If a section needs different spacing, the spacing is
 * wrong, not the section.
 */
export default function Section({
  children,
  id,
  shell = true,
  className = '',
  as: Tag = 'section',
}: Props) {
  return (
    <Tag
      id={id}
      className={`relative bg-black py-14 sm:py-20 md:py-24 lg:py-28 ${className}`}
    >
      {shell ? <div className="shell">{children}</div> : children}
    </Tag>
  );
}
