import type { ElementType } from 'react';

type Props = {
  children: React.ReactNode;
  id?: string;
  /** Adds this block to the scroll snap track. */
  snap?: boolean;
  /** Wraps the content in the standard shell width. */
  shell?: boolean;
  className?: string;
  as?: ElementType;
};

/**
 * One wrapper so every band on the site shares the same vertical rhythm,
 * horizontal gutter and snap behaviour. If a section needs different spacing,
 * the spacing is wrong, not the section.
 */
export default function Section({
  children,
  id,
  snap = true,
  shell = true,
  className = '',
  as: Tag = 'section',
}: Props) {
  return (
    <Tag
      id={id}
      className={`relative bg-black px-4 py-16 sm:px-6 md:px-8 md:py-24 ${
        snap ? 'snap-band' : ''
      } ${className}`}
    >
      {shell ? <div className="mx-auto w-full max-w-[88rem]">{children}</div> : children}
    </Tag>
  );
}
