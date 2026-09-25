import Link from 'next/link';
import { MarkArrow45 } from '@/app/components/marks';
import Reveal from '@/app/components/motion/Reveal';

type Props = {
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  action?: { href: string; label: string };
  id?: string;
  className?: string;
};

/**
 * How every band opens: a drafting label, a heading, and where it helps, one
 * sentence of context and a link to the full sheet. The heading carries the
 * id so the section can be named by it for assistive technology.
 */
export default function SectionHeader({ label, title, intro, action, id, className = '' }: Props) {
  return (
    <header className={`grid gap-6 lg:grid-cols-12 lg:items-end ${className}`}>
      <div className={action ? 'lg:col-span-8' : 'lg:col-span-12'}>
        <Reveal y={10}>
          <p className="label">{label}</p>
        </Reveal>
        <Reveal as="h2" variant="wipe" delay={0.08} className="mt-4 text-[clamp(1.9rem,1.25rem+2.5vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-ink [text-wrap:balance]">
          <span id={id}>{title}</span>
        </Reveal>
        {intro ? (
          <Reveal delay={0.2} y={14}>
            <p className="text-lede mt-5 max-w-[40rem]">{intro}</p>
          </Reveal>
        ) : null}
      </div>
      {action ? (
        <Reveal delay={0.25} y={10} className="lg:col-span-4 lg:justify-self-end">
          <Link
            href={action.href}
            className="group inline-flex min-h-[2.75rem] items-center gap-2 text-[0.9375rem] font-bold text-ink underline decoration-[rgb(var(--sage-rgb)/0.45)] decoration-1 underline-offset-[0.35em] transition-colors hover:decoration-sage"
          >
            {action.label}
            <MarkArrow45 size={11} className="text-sage transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      ) : null}
    </header>
  );
}
