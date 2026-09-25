'use client';

import { useRef, useState } from 'react';
import SystemScene, { type SceneHandle } from '@/app/components/scene/SystemScene';
import type { SceneGraph } from '@/app/components/scene/engine';

/**
 * A case study's architecture, live. The list beside the drawing names
 * every part and what it does; choosing one there lights it in the scene,
 * and pointing at the scene lights it in the list. The list is the
 * accessible version of the drawing, not an extra.
 */
export default function CaseSystem({ graph, title }: { graph: SceneGraph; title: string }) {
  const scene = useRef<SceneHandle>(null);
  const [active, setActive] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const lit = hover ?? active;

  const choose = (id: string) => {
    const next = active === id ? null : id;
    setActive(next);
    scene.current?.select(next);
  };

  return (
    <div className="grid gap-px border lg:grid-cols-12" style={{ borderColor: 'var(--line-2)', background: 'var(--line-2)' }}>
      <div className="relative bg-sheet lg:col-span-8">
        <SystemScene
          ref={scene}
          graph={graph}
          label={`Architecture of ${title}: ${graph.nodes.map((n) => n.label).join(', ')}.`}
          className="h-[20rem] sm:h-[26rem] lg:h-full lg:min-h-[32rem]"
          fill={0.95}
          onHover={setHover}
          onSelect={(id) => setActive(id)}
        />
        <p className="label pointer-events-none absolute bottom-3 left-4">Drag to turn · point to inspect</p>
      </div>
      <ol className="bg-paper lg:col-span-4">
        {graph.nodes.map((node, i) => {
          const on = lit === node.id;
          return (
            <li key={node.id} className="border-b last:border-b-0" style={{ borderColor: 'var(--line)' }}>
              <button
                type="button"
                onClick={() => choose(node.id)}
                aria-pressed={active === node.id}
                className={`flex w-full gap-4 px-5 py-4 text-left transition-colors duration-300 ${on ? 'bg-sage-wash' : 'hover:bg-plate'}`}
              >
                <span className="mono mt-0.5 w-6 shrink-0 text-[0.7rem] text-ink-3">{String(i + 1).padStart(2, '0')}</span>
                <span className="min-w-0">
                  <span className="block text-[0.98rem] font-bold text-ink">
                    {node.label}
                    {node.sub ? <span className="mono ml-2 text-[0.68rem] font-normal text-ink-3">{node.sub}</span> : null}
                  </span>
                  <span className="mt-1 block text-[0.88rem] leading-relaxed text-ink-2">{node.note}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
