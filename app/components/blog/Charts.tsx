/**
 * Charts.
 *
 * Drawn as plain SVG so a chart costs nothing at runtime and works with
 * JavaScript switched off. Every chart takes a caption and every chart that
 * shows measurements says where the numbers came from, because a chart with
 * an unlabelled source is decoration.
 *
 * All of them scale with their container: the SVG carries a viewBox and no
 * fixed width, so the same drawing is readable on a phone and on a monitor.
 */

const CREAM = '#E1E0CC';
const MONO = 'ui-monospace, Menlo, monospace';

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <figcaption className="mt-4 text-xs leading-relaxed text-gray-500">
      {children}
    </figcaption>
  );
}

function ChartShell({
  children,
  caption,
  label,
}: {
  children: React.ReactNode;
  caption: React.ReactNode;
  label: string;
}) {
  return (
    <figure className="my-10">
      <div
        className="overflow-x-auto rounded-xl border p-4 sm:p-6"
        style={{ borderColor: 'var(--line)', background: 'var(--surface-1)' }}
      >
        <div className="min-w-[520px]">
          <svg viewBox="0 0 720 340" role="img" aria-label={label} className="w-full">
            {children}
          </svg>
        </div>
      </div>
      <Caption>{caption}</Caption>
    </figure>
  );
}

/**
 * The three Core Web Vitals with Google's published thresholds. The numbers
 * here are the thresholds themselves, not a measurement of any site.
 */
export function VitalsThresholds() {
  const metrics = [
    { name: 'LCP', good: '2.5s', poor: '4.0s', goodFrac: 0.42, niFrac: 0.25 },
    { name: 'INP', good: '200ms', poor: '500ms', goodFrac: 0.34, niFrac: 0.3 },
    { name: 'CLS', good: '0.1', poor: '0.25', goodFrac: 0.36, niFrac: 0.24 },
  ];

  const x0 = 110;
  const trackWidth = 520;

  return (
    <ChartShell
      label="Core Web Vitals thresholds for good, needs improvement and poor"
      caption={
        <>
          Thresholds published by Google for the three Core Web Vitals. A page passes when the
          75th percentile of real visits falls in the good band. Source:{' '}
          <a
            href="https://web.dev/articles/vitals"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            web.dev
          </a>
          .
        </>
      }
    >
      {metrics.map((m, i) => {
        const y = 76 + i * 82;
        const goodEnd = x0 + trackWidth * m.goodFrac;
        const niEnd = goodEnd + trackWidth * m.niFrac;
        return (
          <g key={m.name}>
            <text x={x0 - 18} y={y + 6} fill={CREAM} fontFamily={MONO} fontSize="16" textAnchor="end">
              {m.name}
            </text>
            <line x1={x0} y1={y} x2={goodEnd} y2={y} stroke={CREAM} strokeWidth="14" />
            <line
              x1={goodEnd}
              y1={y}
              x2={niEnd}
              y2={y}
              stroke={CREAM}
              strokeOpacity="0.42"
              strokeWidth="14"
            />
            <line
              x1={niEnd}
              y1={y}
              x2={x0 + trackWidth}
              y2={y}
              stroke={CREAM}
              strokeOpacity="0.14"
              strokeWidth="14"
            />
            <text x={goodEnd} y={y - 18} fill={CREAM} fontFamily={MONO} fontSize="13" textAnchor="middle">
              {m.good}
            </text>
            <text
              x={niEnd}
              y={y - 18}
              fill={CREAM}
              fillOpacity="0.55"
              fontFamily={MONO}
              fontSize="13"
              textAnchor="middle"
            >
              {m.poor}
            </text>
          </g>
        );
      })}
      {/* Legend */}
      <g fontFamily={MONO} fontSize="12" fill={CREAM}>
        <rect x={x0} y="300" width="26" height="10" fill={CREAM} />
        <text x={x0 + 34} y="309">
          Good
        </text>
        <rect x={x0 + 100} y="300" width="26" height="10" fill={CREAM} fillOpacity="0.42" />
        <text x={x0 + 134} y="309" fillOpacity="0.7">
          Needs work
        </text>
        <rect x={x0 + 250} y="300" width="26" height="10" fill={CREAM} fillOpacity="0.14" />
        <text x={x0 + 284} y="309" fillOpacity="0.45">
          Poor
        </text>
      </g>
    </ChartShell>
  );
}

type Row = { label: string; before: number; after: number; unit?: string };

/**
 * Paired bars for a before and after comparison. The caller supplies the
 * caption, which must say where the numbers came from.
 */
export function BeforeAfterBars({
  rows,
  caption,
  label,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: {
  rows: Row[];
  caption: React.ReactNode;
  label: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const x0 = 150;
  const maxWidth = 470;
  const max = Math.max(...rows.flatMap((r) => [r.before, r.after]));

  return (
    <ChartShell label={label} caption={caption}>
      {rows.map((row, i) => {
        const y = 60 + i * 88;
        const beforeW = (row.before / max) * maxWidth;
        const afterW = (row.after / max) * maxWidth;
        return (
          <g key={row.label}>
            <text
              x={x0 - 16}
              y={y + 20}
              fill={CREAM}
              fillOpacity="0.75"
              fontFamily={MONO}
              fontSize="13"
              textAnchor="end"
            >
              {row.label}
            </text>
            {/* Before */}
            <rect x={x0} y={y} width={beforeW} height="20" fill={CREAM} fillOpacity="0.28" />
            <text
              x={x0 + beforeW + 10}
              y={y + 15}
              fill={CREAM}
              fillOpacity="0.6"
              fontFamily={MONO}
              fontSize="13"
            >
              {row.before}
              {row.unit}
            </text>
            {/* After */}
            <rect x={x0} y={y + 26} width={afterW} height="20" fill={CREAM} />
            <text
              x={x0 + afterW + 10}
              y={y + 41}
              fill={CREAM}
              fontFamily={MONO}
              fontSize="13"
            >
              {row.after}
              {row.unit}
            </text>
          </g>
        );
      })}
      <g fontFamily={MONO} fontSize="12" fill={CREAM}>
        <rect x={x0} y="300" width="26" height="10" fill={CREAM} fillOpacity="0.28" />
        <text x={x0 + 34} y="309" fillOpacity="0.6">
          {beforeLabel}
        </text>
        <rect x={x0 + 130} y="300" width="26" height="10" fill={CREAM} />
        <text x={x0 + 164} y="309">
          {afterLabel}
        </text>
      </g>
    </ChartShell>
  );
}

/**
 * Where the bytes go on a page. Drawn as one stacked bar per site so the
 * comparison is about proportion, not just total.
 */
export function PayloadBreakdown({
  sites,
  caption,
  label,
}: {
  sites: { name: string; parts: { name: string; kb: number }[] }[];
  caption: React.ReactNode;
  label: string;
}) {
  const x0 = 150;
  const maxWidth = 470;
  const totals = sites.map((s) => s.parts.reduce((sum, p) => sum + p.kb, 0));
  const max = Math.max(...totals);
  const opacities = [1, 0.62, 0.38, 0.2, 0.1];

  return (
    <ChartShell label={label} caption={caption}>
      {sites.map((site, si) => {
        const y = 70 + si * 96;
        let cursor = x0;
        const total = totals[si];
        return (
          <g key={site.name}>
            <text
              x={x0 - 16}
              y={y + 21}
              fill={CREAM}
              fontFamily={MONO}
              fontSize="14"
              textAnchor="end"
            >
              {site.name}
            </text>
            {site.parts.map((part, pi) => {
              const w = (part.kb / max) * maxWidth;
              const rect = (
                <rect
                  key={part.name}
                  x={cursor}
                  y={y}
                  width={w}
                  height="30"
                  fill={CREAM}
                  fillOpacity={opacities[pi] ?? 0.1}
                />
              );
              cursor += w;
              return rect;
            })}
            <text
              x={cursor + 12}
              y={y + 21}
              fill={CREAM}
              fontFamily={MONO}
              fontSize="13"
            >
              {total} KB
            </text>
          </g>
        );
      })}
      <g fontFamily={MONO} fontSize="12" fill={CREAM}>
        {(sites[0]?.parts ?? []).map((part, pi) => (
          <g key={part.name}>
            <rect
              x={x0 + pi * 118}
              y="290"
              width="24"
              height="10"
              fill={CREAM}
              fillOpacity={opacities[pi] ?? 0.1}
            />
            <text
              x={x0 + pi * 118 + 30}
              y="299"
              fillOpacity={0.4 + (opacities[pi] ?? 0.1) * 0.6}
            >
              {part.name}
            </text>
          </g>
        ))}
      </g>
    </ChartShell>
  );
}
