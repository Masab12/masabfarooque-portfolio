'use client';

import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { useState } from 'react';
import CountUp from 'react-countup';
import { reviews, reviewCountries, totalReviews } from '../data/reviews';
import ReviewCard from './ReviewCard';

// Prefer reviews with a real photo for the testimonial rows
const withPhoto = [...reviews].sort((a, b) => Number(!!b.avatar) - Number(!!a.avatar));
const mapRow1 = withPhoto.slice(0, 10);
const mapRow2 = withPhoto.slice(10, 20);

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

function tierColor(country: string, count: number) {
  if (country === 'Pakistan') return 'var(--accent-mustard)'; // home base
  if (count >= 15) return 'var(--primary)';
  if (count >= 4) return 'var(--secondary)';
  return 'var(--tertiary)';
}

const topCountries = reviewCountries.filter((c) => c.country !== 'Pakistan').slice(0, 4);

export default function WorldMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative w-full bg-transparent py-20 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold tracking-widest uppercase mb-3 font-mono" style={{ color: 'var(--primary)' }}>
            Global Reach
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-4" style={{ color: 'var(--text-1)' }}>
            Reviews from {reviewCountries.length} countries
          </h2>
          <p className="text-text-secondary text-base sm:text-lg">
            Serving clients worldwide from Islamabad, Pakistan
          </p>
        </motion.div>

        {/* Top countries by review count */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {topCountries.map((c, index) => (
            <div key={c.country} className="matte-block matte-hover p-5 text-center">
              <motion.div
                className="text-3xl sm:text-4xl font-heading font-bold mb-1"
                style={{ color: tierColor(c.country, c.count) }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <CountUp end={c.count} duration={2} />
              </motion.div>
              <div className="text-sm text-text-muted">{c.country}</div>
            </div>
          ))}
        </motion.div>

        {/* Map */}
        <motion.div
          className="matte-block p-4 md:p-8"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <ComposableMap projection="geoMercator" projectionConfig={{ scale: 147, center: [0, 20] }} className="w-full h-auto">
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: { fill: 'var(--matte-charcoal)', stroke: 'var(--border-base)', strokeWidth: 0.5, outline: 'none' },
                      hover: { fill: 'var(--bg-secondary)', stroke: 'var(--border-strong)', strokeWidth: 0.5, outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>

            {reviewCountries.map((c) => {
              const color = tierColor(c.country, c.count);
              const isHome = c.country === 'Pakistan';
              const r = isHome ? 6 : Math.min(7, 3 + c.count / 12);
              return (
                <Marker
                  key={c.country}
                  coordinates={c.coordinates}
                  onMouseEnter={() => setHovered(c.country)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <motion.circle
                    r={r + 3}
                    fill={color}
                    opacity={0.25}
                    animate={{ r: [r + 3, r + 9, r + 3], opacity: [0.25, 0.05, 0.25] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.circle
                    r={r}
                    fill={color}
                    stroke="#fff"
                    strokeWidth={0.8}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring' }}
                    whileHover={{ scale: 1.4 }}
                    style={{ cursor: 'pointer' }}
                  />
                  {hovered === c.country && (
                    <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
                      <rect x={-46} y={-38} width={92} height={28} rx={5} fill="var(--bg-primary)" stroke={color} strokeWidth={1} />
                      <text textAnchor="middle" y={-25} style={{ fill: 'var(--text-1)', fontSize: '9px', fontWeight: 700 }}>
                        {c.country}
                      </text>
                      <text textAnchor="middle" y={-15} style={{ fill: color, fontSize: '8px' }}>
                        {isHome ? 'Home Base' : `${c.count} review${c.count > 1 ? 's' : ''}`}
                      </text>
                    </motion.g>
                  )}
                </Marker>
              );
            })}
          </ComposableMap>

          <div className="mt-6 flex flex-wrap justify-center gap-5">
            {[
              { c: 'var(--primary)', l: '15+ reviews' },
              { c: 'var(--secondary)', l: '4-14 reviews' },
              { c: 'var(--tertiary)', l: '1-3 reviews' },
              { c: 'var(--accent-mustard)', l: 'Home base' },
            ].map((x) => (
              <div key={x.l} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ background: x.c }} />
                <span className="text-sm text-text-secondary">{x.l}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-5xl md:text-7xl font-heading font-bold" style={{ color: 'var(--primary)' }}>
            <CountUp end={totalReviews} duration={3} />+
          </div>
          <div className="text-lg text-text-secondary mt-2">Five-star reviews and counting</div>
        </motion.div>
      </div>

      {/* Testimonial cards — two drifting rows under the map */}
      <motion.div
        className="relative mt-16 space-y-4 sm:space-y-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Marquee gradient={false} speed={24} pauseOnHover>
          {mapRow1.map((r) => (
            <div key={r.id} className="w-[300px] sm:w-[340px] mx-2.5">
              <ReviewCard review={r} className="h-full" />
            </div>
          ))}
        </Marquee>
        <Marquee gradient={false} speed={24} direction="right" pauseOnHover>
          {mapRow2.map((r) => (
            <div key={r.id} className="w-[300px] sm:w-[340px] mx-2.5">
              <ReviewCard review={r} className="h-full" />
            </div>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
