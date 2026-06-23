'use client';

import dynamic from 'next/dynamic';

const WorldMap = dynamic(() => import('./WorldMap'), {
  ssr: false,
  loading: () => (
    <div className="relative w-full py-20 sm:py-24 md:py-32 px-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto animate-pulse">
        <div className="h-10 w-48 rounded-lg mb-6" style={{ background: 'rgba(255,255,255,0.06)' }} />
        <div className="h-2 w-20 rounded-full mb-10" style={{ background: 'rgba(255,255,255,0.06)' }} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }} />
          ))}
        </div>
        <div className="h-64 sm:h-96 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }} />
      </div>
    </div>
  ),
});

export default function ClientWorldMap() {
  return <WorldMap />;
}
