'use client';

import dynamic from 'next/dynamic';

const FiverrReviews = dynamic(() => import('./FiverrReviews'), {
  ssr: false,
  loading: () => <div className="min-h-[30vh] bg-transparent" />,
});

export default function ClientFiverrReviews() {
  return <FiverrReviews />;
}
