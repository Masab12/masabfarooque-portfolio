'use client';

import CustomCursor from './CustomCursor';
import ScrollProgress from './ScrollProgress';
import PageLoader from './PageLoader';

export default function GlobalUI() {
  return (
    <>
      <PageLoader />
      <CustomCursor />
      <ScrollProgress />
    </>
  );
}
