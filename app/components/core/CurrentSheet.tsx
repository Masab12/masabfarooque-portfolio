'use client';

import { usePathname } from 'next/navigation';
import { sheetFor } from '@/app/data/site';
import SheetHeader from '@/app/components/core/SheetHeader';

/** The sheet strip for whatever page is showing, numbered from the index. */
export default function CurrentSheet({ title, meta }: { title?: string; meta?: React.ReactNode }) {
  const sheet = sheetFor(usePathname());
  return <SheetHeader code={sheet.code} title={title ?? sheet.label} meta={meta} />;
}
