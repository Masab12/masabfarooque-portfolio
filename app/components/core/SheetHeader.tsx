/**
 * The thin strip across the top of every sheet: its number, what it is, and
 * one line of context on the right. It tells a visitor where they are in the
 * set without adding another heading to the page outline.
 */
export default function SheetHeader({
  code,
  title,
  meta,
}: {
  code: string;
  title: string;
  meta?: React.ReactNode;
}) {
  return (
    <div className="border-b" style={{ borderColor: 'var(--line)' }}>
      <div className="shell flex min-h-[2.75rem] items-center justify-between gap-6 py-2">
        <p className="label flex min-w-0 items-center gap-3">
          <span className="text-ink">{code}</span>
          <span aria-hidden className="h-3 w-px bg-ink/20" />
          <span className="truncate">{title}</span>
        </p>
        {meta ? <p className="label hidden shrink-0 sm:block">{meta}</p> : null}
      </div>
    </div>
  );
}
