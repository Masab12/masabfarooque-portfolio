'use client';

import dynamic from 'next/dynamic';

const WorldMap = dynamic(() => import('./WorldMap'), {
  ssr: false,
  loading: () => <div className="min-h-[40vh] bg-void-black" />,
});

export default function ClientWorldMap() {
  return <WorldMap />;
}
