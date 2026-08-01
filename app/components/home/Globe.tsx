'use client';

import { useEffect, useRef } from 'react';
import { clientPlaces, homeBase } from '@/app/data/reach';
import { prefersReducedMotion } from '@/app/lib/motion';

/**
 * A wireframe globe drawn from scratch on a 2D canvas.
 *
 * Latitude and longitude rings are projected with a simple orthographic
 * projection, client countries are plotted at their real coordinates, and an
 * arc is drawn from Islamabad to each of them. Nothing is imported: no map
 * data, no geo library, no 3D engine.
 */
export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduced = prefersReducedMotion();

    let size = 0;
    let radius = 0;
    let rotation = -1.2;
    let frame = 0;
    let running = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      size = Math.min(rect.width, rect.height);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      radius = size * 0.42;
    };

    const toRad = (deg: number) => (deg * Math.PI) / 180;

    /** Orthographic projection. Returns null when the point faces away. */
    const project = (lat: number, lon: number, r = radius) => {
      const phi = toRad(90 - lat);
      const theta = toRad(lon) + rotation;
      const x = r * Math.sin(phi) * Math.sin(theta);
      const y = -r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.cos(theta);
      return { x, y, z, visible: z > 0 };
    };

    const draw = () => {
      if (!running) return;
      frame = requestAnimationFrame(draw);

      const rect = canvas.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.save();
      ctx.translate(cx, cy);

      if (!reduced) rotation += 0.0016;

      // Sphere edge
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(200, 155, 82, 0.22)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Faint inner fill so the globe reads as a solid body
      const fill = ctx.createRadialGradient(-radius * 0.3, -radius * 0.35, 0, 0, 0, radius);
      fill.addColorStop(0, 'rgba(200, 155, 82, 0.055)');
      fill.addColorStop(1, 'rgba(200, 155, 82, 0)');
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();

      // Parallels
      ctx.lineWidth = 0.7;
      for (let lat = -60; lat <= 60; lat += 20) {
        ctx.beginPath();
        let started = false;
        for (let lon = -180; lon <= 180; lon += 3) {
          const p = project(lat, lon);
          if (!p.visible) {
            started = false;
            continue;
          }
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        ctx.strokeStyle = lat === 0 ? 'rgba(241,235,225,0.13)' : 'rgba(241,235,225,0.065)';
        ctx.stroke();
      }

      // Meridians
      for (let lon = -180; lon < 180; lon += 20) {
        ctx.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 3) {
          const p = project(lat, lon);
          if (!p.visible) {
            started = false;
            continue;
          }
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        ctx.strokeStyle = 'rgba(241,235,225,0.055)';
        ctx.stroke();
      }

      // Arcs from home to each client country, lifted off the surface
      const home = project(homeBase.lat, homeBase.lon);
      clientPlaces.forEach((place) => {
        const target = project(place.lat, place.lon);
        if (!home.visible && !target.visible) return;

        const midLat = (homeBase.lat + place.lat) / 2;
        const midLon = (homeBase.lon + place.lon) / 2;
        const lift = 1 + Math.min(0.34, Math.abs(place.lon - homeBase.lon) / 520);
        const mid = project(midLat, midLon, radius * lift);

        ctx.beginPath();
        ctx.moveTo(home.x, home.y);
        ctx.quadraticCurveTo(mid.x, mid.y, target.x, target.y);
        ctx.strokeStyle = `rgba(200, 155, 82, ${target.visible ? 0.2 : 0.07})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      });

      // Client markers
      clientPlaces.forEach((place) => {
        const p = project(place.lat, place.lon);
        if (!p.visible) return;
        const r = 1.4 + Math.min(3, Math.sqrt(place.orders) * 0.75);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(230, 198, 146, 0.9)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, r + 3.5, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(200, 155, 82, 0.28)';
        ctx.lineWidth = 0.7;
        ctx.stroke();
      });

      // Home base
      if (home.visible) {
        ctx.beginPath();
        ctx.arc(home.x, home.y, 3.4, 0, Math.PI * 2);
        ctx.fillStyle = '#e6c692';
        ctx.fill();

        const pulse = (Math.sin(Date.now() * 0.0022) * 0.5 + 0.5) * 12 + 5;
        ctx.beginPath();
        ctx.arc(home.x, home.y, pulse, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(230, 198, 146, ${(1 - pulse / 17) * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.restore();
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
      } else if (!running) {
        running = true;
        frame = requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    frame = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="h-full w-full" />;
}
