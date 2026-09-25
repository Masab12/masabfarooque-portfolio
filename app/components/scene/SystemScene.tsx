'use client';

import { useEffect, useImperativeHandle, useRef } from 'react';
import { SystemRenderer, type RendererEvents, type SceneGraph } from './engine';

export type SceneHandle = {
  trace: (nodes: string[]) => void;
  select: (id: string | null) => void;
  resetView: () => void;
};

type Props = RendererEvents & {
  graph: SceneGraph;
  className?: string;
  focusX?: number;
  focusY?: number;
  fill?: number;
  compact?: boolean;
  /** Orbit, hover and click. Off for purely illustrative scenes. */
  interactive?: boolean;
  /** For graphs with two layouts: 0 is the first, 1 the second. */
  blend?: number;
  label: string;
  ref?: React.Ref<SceneHandle>;
};

/**
 * Owns one canvas and one renderer.
 *
 * The frame loop runs only while the canvas is on screen and the tab is
 * visible. With reduced motion requested the scene is drawn fully assembled
 * and still, and redrawn only when something changes, such as a drag.
 *
 * On touch screens the canvas keeps `touch-action: pan-y`, so a vertical
 * swipe still scrolls the page and only a sideways drag turns the scene.
 */
export default function SystemScene({
  graph,
  className = '',
  focusX,
  focusY,
  fill,
  compact,
  interactive = true,
  blend,
  label,
  onHover,
  onSelect,
  onTraceStep,
  onTraceDone,
  ref,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<SystemRenderer | null>(null);
  const redrawRef = useRef<() => void>(() => {});
  const eventsRef = useRef<RendererEvents>({});
  // Keep the latest callbacks without rebuilding the renderer on every render
  useEffect(() => {
    eventsRef.current = { onHover, onSelect, onTraceStep, onTraceDone };
  });

  useImperativeHandle(ref, () => ({
    trace: (nodes) => {
      rendererRef.current?.trace(nodes);
      redrawRef.current();
    },
    select: (id) => {
      rendererRef.current?.select(id);
      redrawRef.current();
    },
    resetView: () => {
      rendererRef.current?.resetView();
      redrawRef.current();
    },
  }));

  // Renderer, sizing and the frame loop, set up once
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const renderer = new SystemRenderer(
      ctx,
      {
        onHover: (id) => eventsRef.current.onHover?.(id),
        onSelect: (id) => eventsRef.current.onSelect?.(id),
        onTraceStep: (id, i) => eventsRef.current.onTraceStep?.(id, i),
        onTraceDone: () => eventsRef.current.onTraceDone?.(),
      },
      { reduced, compact, focusX, focusY, fill },
    );
    rendererRef.current = renderer;

    // Development only: lets a test harness step a scene by hand when the
    // browser is throttling frames, as a background tab does.
    const debug = process.env.NODE_ENV === 'development' ? (window as unknown as { __scenes?: SystemRenderer[] }) : null;
    if (debug) (debug.__scenes ??= []).push(renderer);

    const readFont = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--font-mono').trim() || 'monospace';
    renderer.setFont(readFont());

    let raf = 0;
    let visible = false;
    let last = performance.now();

    const paint = () => {
      renderer.step(reduced ? 0 : 0.016);
      renderer.draw();
    };
    redrawRef.current = () => {
      if (!raf) paint();
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderer.resize(rect.width, rect.height);
      renderer.setOptions({ compact: compact ?? rect.width < 560 });
      redrawRef.current();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      renderer.step(dt);
      renderer.draw();
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (reduced || raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    }, { rootMargin: '120px' });
    io.observe(wrap);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);
    document.fonts?.ready.then(() => {
      renderer.setFont(readFont());
      redrawRef.current();
    });

    // Pointer: drag to orbit, hover to inspect, click to select
    let down: { x: number; y: number; id: number; moved: number } | null = null;
    const local = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onDown = (e: PointerEvent) => {
      if (!interactive) return;
      down = { x: e.clientX, y: e.clientY, id: e.pointerId, moved: 0 };
    };
    const onMove = (e: PointerEvent) => {
      if (!interactive) return;
      if (down && e.pointerId === down.id) {
        const dx = e.clientX - down.x;
        const dy = e.clientY - down.y;
        down.moved += Math.abs(dx) + Math.abs(dy);
        if (down.moved > 4 && !canvas.hasPointerCapture(e.pointerId)) canvas.setPointerCapture(e.pointerId);
        renderer.drag(dx, e.pointerType === 'touch' ? 0 : dy);
        down.x = e.clientX;
        down.y = e.clientY;
        redrawRef.current();
        return;
      }
      if (e.pointerType === 'mouse') {
        const p = local(e);
        const id = renderer.pick(p.x, p.y);
        renderer.setHover(id);
        canvas.style.cursor = id ? 'pointer' : 'grab';
        redrawRef.current();
      }
    };
    const onUp = (e: PointerEvent) => {
      if (!interactive || !down) return;
      if (down.moved < 6) {
        const p = local(e);
        const id = renderer.pick(p.x, p.y);
        renderer.select(id);
        eventsRef.current.onSelect?.(id);
        redrawRef.current();
      }
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
      down = null;
    };
    const onLeave = () => {
      renderer.setHover(null);
      redrawRef.current();
    };
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', () => (down = null));
    canvas.addEventListener('pointerleave', onLeave);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointerleave', onLeave);
      if (debug) debug.__scenes = debug.__scenes?.filter((r) => r !== renderer);
      rendererRef.current = null;
    };
    // The renderer is built once; props that change later are pushed below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    rendererRef.current?.setGraph(graph);
    redrawRef.current();
  }, [graph]);

  useEffect(() => {
    if (blend === undefined) return;
    rendererRef.current?.setBlend(blend);
    redrawRef.current();
  }, [blend]);

  useEffect(() => {
    rendererRef.current?.setOptions({ focusX, focusY, fill });
    redrawRef.current();
  }, [focusX, focusY, fill]);

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={label}
        className="absolute inset-0 h-full w-full"
        style={{ touchAction: interactive ? 'pan-y' : 'auto', cursor: interactive ? 'grab' : 'default' }}
      />
    </div>
  );
}
