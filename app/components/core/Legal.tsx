import Reveal from './Reveal';

export function LegalSection({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="section" className="border-t py-8" y={16} style={{ borderColor: 'var(--line)' }}>
      <div className="grid gap-4 md:grid-cols-12">
        <h2 className="md:col-span-4">
          <span className="mr-3 text-[0.65rem] text-primary">{index}</span>
          <span className="text-[1.05rem] text-cream">{title}</span>
        </h2>
        <div className="space-y-4 text-sm leading-relaxed text-gray-400 md:col-span-7 md:col-start-6">
          {children}
        </div>
      </div>
    </Reveal>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-[0.6rem] h-px w-3 shrink-0" style={{ background: 'var(--cream)' }} />
          {item}
        </li>
      ))}
    </ul>
  );
}
