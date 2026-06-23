'use client';

import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';

const BAND = '#1c1813'; // warm espresso band — consistent in light & dark
const FADE = `linear-gradient(to right, ${BAND}, transparent)`;
const FADE_R = `linear-gradient(to left, ${BAND}, transparent)`;

const logos = [
  { name: 'FirstDeal',       src: '/TrustedBy/FirstDealLogo.png',          h: 72, w: 280 },
  { name: 'JANUA',           src: '/TrustedBy/JanuaLogo.png',               h: 52, w: 160 },
  { name: 'Fixels',          src: '/TrustedBy/fixelslogo.webp',             h: 52, w: 160 },
  { name: 'Hice.AI',         src: '/TrustedBy/hice-logo-blue-02.svg',       h: 72, w: 260 },
  { name: 'Javea Denia',     src: '/TrustedBy/JaveaDenia.png',              h: 52, w: 180 },
  { name: 'Client',          src: '/TrustedBy/logo.CgDnSZf8_Z1URCRl.webp', h: 52, w: 160 },
  { name: 'Skylight Studio', src: '/TrustedBy/skylight-studio-logo.svg',    h: 52, w: 180 },
];

function LogoCard({ logo }: { logo: typeof logos[0] }) {
  return (
    <div
      className="mx-5 sm:mx-10 flex items-center justify-center transition-opacity duration-300 cursor-default"
      style={{ opacity: 0.55, height: '80px' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '0.55'; }}
    >
      <Image
        src={logo.src}
        alt={logo.name}
        width={logo.w}
        height={logo.h}
        className="object-contain"
        style={{
          height: `${logo.h}px`,
          width: 'auto',
          maxWidth: `${logo.w}px`,
          filter: 'brightness(0) invert(1)',
        }}
        unoptimized
      />
    </div>
  );
}

export default function TrustedBy() {
  return (
    <section
      className="relative w-full py-8 overflow-hidden"
      style={{
        backgroundColor: BAND,
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <motion.p
          className="text-center text-xs font-bold tracking-widest uppercase font-mono"
          style={{ color: 'rgba(255,255,255,0.5)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Trusted by clients worldwide
        </motion.p>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-[8vw] min-w-[60px] max-w-[200px] z-10 pointer-events-none" style={{ background: FADE }} />
        <div className="absolute inset-y-0 right-0 w-[8vw] min-w-[60px] max-w-[200px] z-10 pointer-events-none" style={{ background: FADE_R }} />

        <Marquee gradient={false} speed={34} pauseOnHover>
          {[...logos, ...logos].map((logo, i) => (
            <LogoCard key={`${logo.name}-${i}`} logo={logo} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
