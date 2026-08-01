'use client';

import { useEffect, useRef } from 'react';
import { lerp, prefersReducedMotion } from '@/app/lib/motion';

/**
 * The hero backdrop.
 *
 * A lattice of brass points sits on a fixed grid. A slow travelling wave
 * breathes through it, and the pointer acts like a lens: points near the
 * cursor push outward and brighten, points far from it settle back down.
 * Drawn on a 2D canvas rather than WebGL, so it costs almost nothing and
 * still runs on a mid range phone.
 */
export default function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let spacing = 0;
    let frame = 0;
    let running = true;

    const pointer = { x: -9999, y: -9999, ex: -9999, ey: -9999 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      spacing = width < 640 ? 26 : width < 1200 ? 32 : 38;
      cols = Math.ceil(width / spacing) + 1;
      rows = Math.ceil(height / spacing) + 1;
    };

    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const radius = 210;

    const draw = (time: number) => {
      if (!running) return;
      frame = requestAnimationFrame(draw);

      pointer.ex = lerp(pointer.ex, pointer.x, 0.08);
      pointer.ey = lerp(pointer.ey, pointer.y, 0.08);

      ctx.clearRect(0, 0, width, height);

      const t = reduced ? 0 : time * 0.00016;
      const offsetX = (width - (cols - 1) * spacing) / 2;
      const offsetY = (height - (rows - 1) * spacing) / 2;

      for (let iy = 0; iy < rows; iy += 1) {
        for (let ix = 0; ix < cols; ix += 1) {
          const baseX = offsetX + ix * spacing;
          const baseY = offsetY + iy * spacing;

          // A pair of offset sine waves gives an organic drift without noise.
          const wave =
            Math.sin(baseX * 0.006 + t * 1.7) * Math.cos(baseY * 0.0075 - t * 1.2) * 0.5 + 0.5;

          const dx = baseX - pointer.ex;
          const dy = baseY - pointer.ey;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const near = dist < radius ? 1 - dist / radius : 0;
          const push = near * near * 16;
          const nx = dist > 0.001 ? dx / dist : 0;
          const ny = dist > 0.001 ? dy / dist : 0;

          const x = baseX + nx * push;
          const y = baseY + ny * push;

          const size = 0.5 + wave * 0.7 + near * 1.6;
          const alpha = 0.05 + wave * 0.09 + near * 0.55;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle =
            near > 0.18
              ? `rgba(230, 198, 146, ${alpha.toFixed(3)})`
              : `rgba(200, 155, 82, ${alpha.toFixed(3)})`;
          ctx.fill();
        }
      }

      // A soft brass haze under the cursor to lift the lattice off the ink.
      if (pointer.ex > -1000) {
        const glow = ctx.createRadialGradient(pointer.ex, pointer.ey, 0, pointer.ex, pointer.ey, radius * 1.3);
        glow.addColorStop(0, 'rgba(200, 155, 82, 0.075)');
        glow.addColorStop(1, 'rgba(200, 155, 82, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(pointer.ex - radius * 1.3, pointer.ey - radius * 1.3, radius * 2.6, radius * 2.6);
      }
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
    window.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);
    frame = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
      style={{ maskImage: 'radial-gradient(120% 90% at 50% 45%, #000 30%, transparent 78%)', WebkitMaskImage: 'radial-gradient(120% 90% at 50% 45%, #000 30%, transparent 78%)' }}
    />
  );
}
