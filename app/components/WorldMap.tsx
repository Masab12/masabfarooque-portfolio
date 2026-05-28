'use client';

import { motion } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { useState } from 'react';
import CountUp from 'react-countup';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const clientData = [
  { country: 'USA', coordinates: [-95.7129, 37.0902], orders: 77, color: '#00F0FF' },
  { country: 'India', coordinates: [78.9629, 20.5937], orders: 10, color: '#8B5CF6' },
  { country: 'Canada', coordinates: [-106.3468, 56.1304], orders: 8, color: '#00F0FF' },
  { country: 'Netherlands', coordinates: [5.2913, 52.1326], orders: 4, color: '#8B5CF6' },
  { country: 'Pakistan', coordinates: [69.3451, 30.3753], orders: 0, color: '#FF6B6B', isHome: true },
];

export default function WorldMap() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const totalOrders = clientData.reduce((sum, country) => sum + country.orders, 0);

  return (
    <section className="relative w-full bg-void-black py-20 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-void-black via-matte-charcoal/5 to-void-black pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-text-primary mb-4">
            Global Reach
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-electric-cyan to-deep-violet rounded-full mx-auto mb-6" />
          <p className="text-text-secondary text-lg">
            Serving clients across the globe from Islamabad, Pakistan
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {clientData.filter(c => !c.isHome).map((country, index) => (
            <motion.div
              key={country.country}
              className="glass-card rounded-xl p-6 text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div
                className="text-4xl font-bold mb-2"
                style={{ color: country.color }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <CountUp end={country.orders} duration={2} />
              </motion.div>
              <div className="text-sm text-text-muted">{country.country}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Map */}
        <motion.div
          className="glass-card rounded-2xl p-4 md:p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 147,
              center: [0, 20]
            }}
            className="w-full h-auto"
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#1a1a1f"
                    stroke="#333"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover: { fill: '#2a2a2f', outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Markers */}
            {clientData.map((country) => (
              <Marker
                key={country.country}
                coordinates={country.coordinates as [number, number]}
                onMouseEnter={() => setHoveredCountry(country.country)}
                onMouseLeave={() => setHoveredCountry(null)}
              >
                {/* Pulse effect */}
                <motion.circle
                  r={country.isHome ? 8 : 6}
                  fill={country.color}
                  opacity={0.3}
                  animate={{
                    r: country.isHome ? [8, 16, 8] : [6, 12, 6],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Main marker */}
                <motion.circle
                  r={country.isHome ? 6 : 4}
                  fill={country.color}
                  stroke="#fff"
                  strokeWidth={1}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  whileHover={{ scale: 1.5 }}
                  style={{ cursor: 'pointer' }}
                />

                {/* Tooltip */}
                {hoveredCountry === country.country && (
                  <motion.g
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <rect
                      x={-40}
                      y={-35}
                      width={80}
                      height={25}
                      fill="#0a0a0f"
                      stroke={country.color}
                      strokeWidth={1}
                      rx={4}
                    />
                    <text
                      textAnchor="middle"
                      y={-22}
                      style={{ 
                        fill: '#fff', 
                        fontSize: '10px', 
                        fontWeight: 'bold' 
                      }}
                    >
                      {country.country}
                    </text>
                    <text
                      textAnchor="middle"
                      y={-12}
                      style={{ 
                        fill: country.color, 
                        fontSize: '9px' 
                      }}
                    >
                      {country.isHome ? 'Home Base' : `${country.orders} orders`}
                    </text>
                  </motion.g>
                )}
              </Marker>
            ))}
          </ComposableMap>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-electric-cyan animate-pulse" />
              <span className="text-sm text-text-secondary">High Activity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-deep-violet animate-pulse" />
              <span className="text-sm text-text-secondary">Medium Activity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm text-text-secondary">Home Base</span>
            </div>
          </div>
        </motion.div>

        {/* Total Orders */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-electric-cyan to-deep-violet bg-clip-text text-transparent">
            <CountUp end={totalOrders} duration={3} />+
          </div>
          <div className="text-xl text-text-secondary mt-2">Orders Delivered Worldwide</div>
        </motion.div>
      </div>
    </section>
  );
}
