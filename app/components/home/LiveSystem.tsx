'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import SystemScene, { type SceneHandle } from '@/app/components/scene/SystemScene';
import { heroSystem, scenarios, type Scenario } from '@/app/data/systems';

/**
 * The cover drawing, made live: the shape most of the work takes, running.
 *
 * Traffic moves through it on its own. A visitor can send one of three real
 * kinds of request and read what happens at each stop in the log, or point
 * at any part to see what gets built there. The inspector can also be
 * stepped through with its own buttons, so everything the canvas shows can
 * be reached from a keyboard and read by a screen reader.
 */

type Line = { id: number; tag: string; text: string; tone?: 'muted' | 'hot' };

const nodes = heroSystem.nodes;
const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

export default function LiveSystem() {
  const scene = useRef<SceneHandle>(null);
  const [focus, setFocus] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [running, setRunning] = useState<Scenario | null>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const lineId = useRef(0);
  const [wide, setWide] = useState(false);

  const push = useCallback((tag: string, text: string, tone?: Line['tone']) => {
    lineId.current += 1;
    const id = lineId.current;
    // The five newest, at their natural height: a wrapped line is never cut
    setLines((prev) => [...prev, { id, tag, text, tone }].slice(-5));
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // A short boot sequence in the log, the way a dev server announces itself
  useEffect(() => {
    const boot: [string, string, Line['tone']?][] = [
      ['$', 'system up'],
      ['ok', `${nodes.length} services running, traffic is simulated`, 'muted'],
      ['$', 'send a request, or point at any part'],
    ];
    const timers = boot.map(([tag, text, tone], i) => window.setTimeout(() => push(tag, text, tone), 350 + i * 420));
    return () => timers.forEach(clearTimeout);
  }, [push]);

  // The request in flight lives in a ref as well as state: the renderer calls
  // back from its frame loop, and a state updater must not have side effects.
  const runningRef = useRef<Scenario | null>(null);

  const send = (s: Scenario) => {
    if (runningRef.current) return;
    runningRef.current = s;
    setRunning(s);
    push('$', `trace ${s.id}`);
    scene.current?.trace(s.path);
  };

  const onStep = useCallback(
    (nodeId: string, index: number) => {
      const current = runningRef.current;
      const step = current?.steps[index];
      if (step) push(String(index + 1).padStart(2, '0'), `${byId[nodeId]?.label ?? nodeId}  ${step}`);
    },
    [push],
  );

  const onDone = useCallback(() => {
    const current = runningRef.current;
    if (current) push('ok', `${current.label.toLowerCase()}, ${current.path.length - 1} hops`, 'hot');
    runningRef.current = null;
    setRunning(null);
  }, [push]);

  const shown = hover ?? focus;
  const shownNode = shown ? byId[shown] : null;
  const index = focus ? nodes.findIndex((n) => n.id === focus) : -1;

  const stepTo = (delta: number) => {
    const next = nodes[(Math.max(0, index) + delta + nodes.length) % nodes.length];
    setFocus(next.id);
    scene.current?.select(next.id);
  };

  const sceneLabel = useMemo(
    () =>
      `A 3D diagram of a typical system: ${nodes.map((n) => n.label).join(', ')}, joined by pipes with requests moving through them.`,
    [],
  );

  return (
    <div className="relative flex h-full flex-col lg:block">
      {/* The stage */}
      <SystemScene
        ref={scene}
        graph={heroSystem}
        label={sceneLabel}
        focusX={wide ? 0.66 : 0.5}
        focusY={wide ? 0.5 : 0.52}
        fill={wide ? 0.8 : 0.98}
        className="order-1 h-[52svh] min-h-[20rem] w-full lg:absolute lg:inset-0 lg:h-full"
        onHover={setHover}
        onSelect={(id) => setFocus(id)}
        onTraceStep={onStep}
        onTraceDone={onDone}
      />

      {/* Requests */}
      <div className="order-2 lg:absolute lg:right-[var(--gutter)] lg:top-6 lg:w-[19rem]">
        <div className="border bg-sheet/90 p-3 backdrop-blur-sm lg:p-4" style={{ borderColor: 'var(--line-2)' }}>
          <p className="label mb-3">Send a request</p>
          <div className="flex flex-wrap gap-2">
            {scenarios.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => send(s)}
                disabled={!!running}
                aria-pressed={running?.id === s.id}
                className={`mono h-11 rounded-full border px-3.5 text-[0.75rem] uppercase tracking-[0.03em] transition-colors disabled:cursor-not-allowed ${
                  running?.id === s.id
                    ? 'border-clay bg-clay text-paper'
                    : 'border-hair2 text-ink hover:border-ink disabled:opacity-45'
                }`}
              >
                {s.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => scene.current?.resetView()}
              className="mono h-11 rounded-full px-3 text-[0.75rem] uppercase text-ink-3 underline decoration-[var(--line-3)] underline-offset-4 hover:text-ink"
            >
              Reset view
            </button>
          </div>
        </div>
      </div>

      {/* Inspector */}
      <div className="order-3 lg:absolute lg:left-[var(--gutter)] lg:top-6 lg:w-[22rem]">
        <div className="border bg-sheet/90 p-4 backdrop-blur-sm" style={{ borderColor: 'var(--line-2)' }} aria-live="polite">
          <div className="flex items-center justify-between gap-3">
            <p className="label">{shownNode ? 'Inspecting' : 'Inspector'}</p>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => stepTo(-1)} aria-label="Previous part" className="mono flex h-11 w-11 items-center justify-center rounded-full border text-[0.8rem] text-ink hover:border-ink" style={{ borderColor: 'var(--line-2)' }}>
                {'<'}
              </button>
              <span className="mono w-12 text-center text-[0.7rem] text-ink-3">
                {index >= 0 ? `${index + 1} / ${nodes.length}` : `- / ${nodes.length}`}
              </span>
              <button type="button" onClick={() => stepTo(1)} aria-label="Next part" className="mono flex h-11 w-11 items-center justify-center rounded-full border text-[0.8rem] text-ink hover:border-ink" style={{ borderColor: 'var(--line-2)' }}>
                {'>'}
              </button>
            </div>
          </div>
          {shownNode ? (
            <div className="mt-3">
              <p className="text-[1.15rem] font-extrabold tracking-[-0.02em] text-ink">
                {shownNode.label}
                {shownNode.sub ? <span className="mono ml-2 text-[0.7rem] font-normal text-ink-3">{shownNode.sub}</span> : null}
              </p>
              <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-2">{shownNode.note}</p>
            </div>
          ) : (
            <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-2">
              Point at any part of the system, or step through it with the arrows, to see what I build there.
              <span className="hidden lg:inline"> Drag to turn it.</span>
            </p>
          )}
        </div>
      </div>

      {/* Trace log */}
      <div className="order-4 lg:absolute lg:bottom-6 lg:right-[var(--gutter)] lg:w-[26rem]">
        <div className="border bg-sheet/90 backdrop-blur-sm" style={{ borderColor: 'var(--line-2)' }}>
          <p className="label flex items-center justify-between border-b px-4 py-2.5" style={{ borderColor: 'var(--line)' }}>
            <span>Trace log</span>
            <span className="flex items-center gap-1.5">
              <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${running ? 'bg-clay' : 'bg-sage'}`} />
              {running ? 'tracing' : 'idle'}
            </span>
          </p>
          <ol className="mono flex min-h-[9.5rem] flex-col justify-end gap-1.5 px-4 py-3 text-[0.72rem] leading-[1.5]" aria-live="polite">
            {lines.map((line) => (
              <li key={line.id} className="log-line flex gap-3">
                <span className={`w-5 shrink-0 ${line.tone === 'hot' ? 'text-clay-ink' : 'text-ink-3'}`}>{line.tag}</span>
                <span className={`min-w-0 break-words ${line.tone === 'muted' ? 'text-ink-3' : 'text-ink'}`}>{line.text}</span>
              </li>
            ))}
            <li aria-hidden className="flex gap-3">
              <span className="w-5 text-ink-3">$</span>
              <span className="caret" />
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
