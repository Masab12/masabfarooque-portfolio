/**
 * Article covers.
 *
 * Each post gets its own drawing rather than a stock photograph. They are
 * built on the same vocabulary as the marks set: a 1.2 stroke, right angles,
 * circles and chords, cream on black. Every one is also a diagram of the
 * thing the article explains, so the cover carries information instead of
 * decorating the page.
 *
 * Drawn on a 1200 by 630 field, which is the open graph ratio, so the same
 * artwork can be exported for social cards later without redrawing it.
 */

type CoverProps = { className?: string };

const CREAM = '#E1E0CC';

function Frame({
  label,
  children,
  className,
}: CoverProps & { label: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 1200 630"
      className={className}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="1200" height="630" fill="#0B0B0B" />
      {/* Faint measuring grid, the same one the drawings are set out on */}
      <g stroke={CREAM} strokeOpacity="0.05" strokeWidth="1">
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 120} y1="0" x2={i * 120} y2="630" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 126} x2="1200" y2={i * 126} />
        ))}
      </g>
      {children}
    </svg>
  );
}

/** Migration. Old URLs on the left, new routes on the right, redirects between. */
export function CoverMigration({ className }: CoverProps) {
  const rows = [0, 1, 2, 3, 4];
  return (
    <Frame
      className={className}
      label="Old WordPress URLs on the left mapped by redirects to new Next.js routes on the right"
    >
      <g stroke={CREAM} fill="none" strokeWidth="1.4">
        {rows.map((r) => {
          const y = 150 + r * 78;
          const dashed = r === 2 || r === 4;
          return (
            <g key={r}>
              <rect
                x="150"
                y={y - 20}
                width="190"
                height="40"
                rx="4"
                strokeOpacity={0.5}
              />
              <rect x="860" y={y - 20} width="190" height="40" rx="4" />
              <path
                d={`M348 ${y} C 520 ${y}, 660 ${y + (dashed ? -34 : 34)}, 852 ${y}`}
                strokeOpacity={dashed ? 0.35 : 0.7}
                strokeDasharray={dashed ? '7 7' : undefined}
              />
              <path
                d={`M842 ${y - 5} L852 ${y} L842 ${y + 5}`}
                strokeOpacity={dashed ? 0.35 : 0.7}
              />
            </g>
          );
        })}
      </g>
      {/* 301 badge on the centre line */}
      <g>
        <rect
          x="556"
          y="292"
          width="88"
          height="46"
          rx="23"
          fill="#0B0B0B"
          stroke={CREAM}
          strokeWidth="1.4"
        />
        <text
          x="600"
          y="322"
          fill={CREAM}
          fontFamily="ui-monospace, Menlo, monospace"
          fontSize="20"
          textAnchor="middle"
        >
          301
        </text>
      </g>
      <text
        x="245"
        y="98"
        fill={CREAM}
        fillOpacity="0.5"
        fontFamily="ui-monospace, Menlo, monospace"
        fontSize="19"
        textAnchor="middle"
        letterSpacing="3"
      >
        /?p=1042
      </text>
      <text
        x="955"
        y="98"
        fill={CREAM}
        fontFamily="ui-monospace, Menlo, monospace"
        fontSize="19"
        textAnchor="middle"
        letterSpacing="3"
      >
        /blog/slug
      </text>
    </Frame>
  );
}

/** Headless. Editor writes, build reads, edge serves. */
export function CoverHeadless({ className }: CoverProps) {
  return (
    <Frame
      className={className}
      label="WordPress as a content source feeding a build step, which publishes static pages to edge servers"
    >
      <g stroke={CREAM} fill="none" strokeWidth="1.4">
        {/* Editor box */}
        <rect x="90" y="240" width="220" height="150" rx="6" />
        <path d="M90 288h220" />
        <circle cx="118" cy="264" r="6" strokeOpacity="0.55" />
        <path d="M130 322h150M130 348h110" strokeOpacity="0.45" />

        {/* Pipe to build */}
        <path d="M318 315h150" strokeOpacity="0.7" />
        <path d="M458 308l10 7-10 7" strokeOpacity="0.7" />

        {/* Build step, a hexagon so it reads as machinery not content */}
        <path d="M560 225l86 45v90l-86 45-86-45v-90z" />
        <circle cx="560" cy="315" r="30" strokeOpacity="0.55" />
        <path d="M560 285v-16M560 361v-16M530 315h-16M606 315h-16" strokeOpacity="0.55" />

        {/* Pipe to edge */}
        <path d="M656 315h130" strokeOpacity="0.7" />
        <path d="M776 308l10 7-10 7" strokeOpacity="0.7" />

        {/* Edge ring */}
        <circle cx="960" cy="315" r="96" strokeOpacity="0.35" />
        <circle cx="960" cy="315" r="52" strokeOpacity="0.2" />
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x = 960 + 96 * Math.cos(rad);
          const y = 315 + 96 * Math.sin(rad);
          return <circle key={deg} cx={x} cy={y} r="11" fill="#0B0B0B" />;
        })}
      </g>
      <g
        fill={CREAM}
        fillOpacity="0.5"
        fontFamily="ui-monospace, Menlo, monospace"
        fontSize="18"
        letterSpacing="3"
      >
        <text x="200" y="450" textAnchor="middle">
          EDITOR
        </text>
        <text x="560" y="450" textAnchor="middle">
          BUILD
        </text>
        <text x="960" y="450" textAnchor="middle">
          EDGE
        </text>
      </g>
    </Frame>
  );
}

/** Coupled versus decoupled, drawn as one slab against separated layers. */
export function CoverDecoupled({ className }: CoverProps) {
  return (
    <Frame
      className={className}
      label="A single coupled block on the left compared with three separated layers on the right"
    >
      <g stroke={CREAM} fill="none" strokeWidth="1.4">
        {/* Coupled: one dense slab, hatched to read as tangled */}
        <rect x="120" y="170" width="360" height="290" rx="6" strokeOpacity="0.55" />
        {Array.from({ length: 13 }).map((_, i) => (
          <line
            key={i}
            x1={120 + i * 30}
            y1="170"
            x2={120 + i * 30 - 60}
            y2="460"
            strokeOpacity="0.16"
          />
        ))}
        <rect x="120" y="170" width="360" height="290" rx="6" strokeOpacity="0.55" />

        {/* Divider */}
        <line x1="600" y1="140" x2="600" y2="490" strokeOpacity="0.2" strokeDasharray="6 8" />

        {/* Decoupled: three clean layers with air between them */}
        <rect x="720" y="170" width="360" height="72" rx="6" />
        <rect x="720" y="279" width="360" height="72" rx="6" />
        <rect x="720" y="388" width="360" height="72" rx="6" />
        <path d="M900 250v20M900 359v20" strokeOpacity="0.5" />
        <path d="M894 264l6 6 6-6M894 373l6 6 6-6" strokeOpacity="0.5" />
      </g>
      <g fill={CREAM} fontFamily="ui-monospace, Menlo, monospace" fontSize="18" letterSpacing="3">
        <text x="300" y="522" textAnchor="middle" fillOpacity="0.45">
          ONE SYSTEM
        </text>
        <text x="900" y="522" textAnchor="middle">
          THREE PARTS
        </text>
      </g>
    </Frame>
  );
}

/** Core Web Vitals, drawn as three threshold bars with a marker on each. */
export function CoverVitals({ className }: CoverProps) {
  const bars = [
    { label: 'LCP', good: 0.42, marker: 0.3 },
    { label: 'INP', good: 0.4, marker: 0.52 },
    { label: 'CLS', good: 0.4, marker: 0.22 },
  ];
  return (
    <Frame
      className={className}
      label="Three Core Web Vitals threshold bars with a measurement marker on each"
    >
      {bars.map((bar, i) => {
        const y = 190 + i * 118;
        const x0 = 260;
        const width = 700;
        const goodX = x0 + width * bar.good;
        const niX = x0 + width * (bar.good + 0.28);
        const markerX = x0 + width * bar.marker;
        return (
          <g key={bar.label}>
            <text
              x="190"
              y={y + 8}
              fill={CREAM}
              fontFamily="ui-monospace, Menlo, monospace"
              fontSize="22"
              textAnchor="end"
              letterSpacing="2"
            >
              {bar.label}
            </text>
            {/* Track segments: good, needs work, poor */}
            <line x1={x0} y1={y} x2={goodX} y2={y} stroke={CREAM} strokeWidth="10" />
            <line
              x1={goodX}
              y1={y}
              x2={niX}
              y2={y}
              stroke={CREAM}
              strokeOpacity="0.4"
              strokeWidth="10"
            />
            <line
              x1={niX}
              y1={y}
              x2={x0 + width}
              y2={y}
              stroke={CREAM}
              strokeOpacity="0.14"
              strokeWidth="10"
            />
            {/* Threshold ticks */}
            <line
              x1={goodX}
              y1={y - 22}
              x2={goodX}
              y2={y + 22}
              stroke={CREAM}
              strokeOpacity="0.5"
              strokeWidth="1.2"
            />
            <line
              x1={niX}
              y1={y - 22}
              x2={niX}
              y2={y + 22}
              stroke={CREAM}
              strokeOpacity="0.3"
              strokeWidth="1.2"
            />
            {/* Measurement marker, a diamond so it matches the rating mark */}
            <path
              d={`M${markerX} ${y - 20} L${markerX + 16} ${y} L${markerX} ${y + 20} L${markerX - 16} ${y} Z`}
              fill="#0B0B0B"
              stroke={CREAM}
              strokeWidth="1.6"
            />
          </g>
        );
      })}
      <text
        x="260"
        y="548"
        fill={CREAM}
        fillOpacity="0.45"
        fontFamily="ui-monospace, Menlo, monospace"
        fontSize="17"
        letterSpacing="3"
      >
        GOOD
      </text>
      <text
        x="960"
        y="548"
        fill={CREAM}
        fillOpacity="0.2"
        fontFamily="ui-monospace, Menlo, monospace"
        fontSize="17"
        textAnchor="end"
        letterSpacing="3"
      >
        POOR
      </text>
    </Frame>
  );
}

/** Yoast metadata. Tags lifted out of one document and set into another. */
export function CoverMetadata({ className }: CoverProps) {
  const tags = ['title', 'description', 'canonical', 'og:image', 'robots'];
  return (
    <Frame
      className={className}
      label="Meta tags lifted from a WordPress document on the left into a Next.js metadata object on the right"
    >
      <g stroke={CREAM} fill="none" strokeWidth="1.4">
        {/* Source document */}
        <rect x="130" y="130" width="330" height="370" rx="6" strokeOpacity="0.45" />
        {/* Target document */}
        <rect x="740" y="130" width="330" height="370" rx="6" />
      </g>

      {tags.map((tag, i) => {
        const y = 196 + i * 70;
        return (
          <g key={tag}>
            {/* Tag chip on the left, dimmed, and its twin on the right */}
            <rect
              x="166"
              y={y - 21}
              width="258"
              height="42"
              rx="21"
              fill="none"
              stroke={CREAM}
              strokeOpacity="0.3"
              strokeWidth="1.2"
            />
            <text
              x="295"
              y={y + 6}
              fill={CREAM}
              fillOpacity="0.45"
              fontFamily="ui-monospace, Menlo, monospace"
              fontSize="17"
              textAnchor="middle"
            >
              {tag}
            </text>

            <rect
              x="776"
              y={y - 21}
              width="258"
              height="42"
              rx="21"
              fill="none"
              stroke={CREAM}
              strokeWidth="1.4"
            />
            <text
              x="905"
              y={y + 6}
              fill={CREAM}
              fontFamily="ui-monospace, Menlo, monospace"
              fontSize="17"
              textAnchor="middle"
            >
              {tag}
            </text>

            {/* Carry line between the two */}
            <path
              d={`M432 ${y} L760 ${y}`}
              stroke={CREAM}
              strokeOpacity="0.35"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d={`M750 ${y - 5} L760 ${y} L750 ${y + 5}`}
              stroke={CREAM}
              strokeOpacity="0.55"
              strokeWidth="1.4"
              fill="none"
            />
          </g>
        );
      })}

      <g fill={CREAM} fontFamily="ui-monospace, Menlo, monospace" fontSize="18" letterSpacing="3">
        <text x="295" y="556" textAnchor="middle" fillOpacity="0.45">
          YOAST
        </text>
        <text x="905" y="556" textAnchor="middle">
          METADATA
        </text>
      </g>
    </Frame>
  );
}

/** Hosting. One private origin feeding a build, which fans out to the edge. */
export function CoverHosting({ className }: CoverProps) {
  const edges = [0, 1, 2, 3, 4];
  return (
    <Frame
      className={className}
      label="A private WordPress origin feeding a build step that fans out to five edge nodes"
    >
      <g stroke={CREAM} fill="none" strokeWidth="1.4">
        {/* Origin box, drawn closed to read as private */}
        <rect x="110" y="255" width="210" height="120" rx="6" />
        <path d="M150 255v-28a45 45 0 0 1 90 0v28" strokeOpacity="0.6" />
        <circle cx="215" cy="312" r="15" strokeOpacity="0.75" />
        <path d="M215 327v20" strokeOpacity="0.75" />

        {/* Build step */}
        <rect x="500" y="270" width="180" height="90" rx="6" strokeOpacity="0.75" />
        <path d="M320 315h172" strokeOpacity="0.6" />
        <path d="M482 310l10 5-10 5" strokeOpacity="0.6" />

        {/* Fan out to the edge */}
        {edges.map((e) => {
          const y = 130 + e * 92;
          return (
            <g key={e}>
              <path d={`M680 315 C 790 315, 830 ${y}, 940 ${y}`} strokeOpacity="0.4" />
              <rect x="948" y={y - 26} width="130" height="52" rx="6" strokeOpacity="0.7" />
            </g>
          );
        })}
      </g>

      <g fill={CREAM} fontFamily="ui-monospace, Menlo, monospace" letterSpacing="3">
        <text x="215" y="430" fontSize="18" textAnchor="middle" fillOpacity="0.55">
          ORIGIN
        </text>
        <text x="590" y="322" fontSize="17" textAnchor="middle">
          BUILD
        </text>
        <text x="1013" y="574" fontSize="18" textAnchor="middle" fillOpacity="0.55">
          EDGE
        </text>
      </g>
    </Frame>
  );
}

/** Solo against studio. One filled node against a ring of partial ones. */
export function CoverSolo({ className }: CoverProps) {
  const team = Array.from({ length: 7 });
  return (
    <Frame
      className={className}
      label="A single filled node on the left against a scattered team of partial nodes on the right"
    >
      {/* Solo: one node, every line running through it */}
      <g stroke={CREAM} fill="none" strokeWidth="1.4">
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x = 300 + Math.cos(angle) * 155;
          const y = 315 + Math.sin(angle) * 155;
          return <path key={i} d={`M300 315 L${x} ${y}`} strokeOpacity="0.28" />;
        })}
        <circle cx="300" cy="315" r="46" fill={CREAM} stroke="none" />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x = 300 + Math.cos(angle) * 155;
          const y = 315 + Math.sin(angle) * 155;
          return <circle key={i} cx={x} cy={y} r="9" strokeOpacity="0.5" />;
        })}

        <line x1="600" y1="140" x2="600" y2="490" strokeOpacity="0.2" strokeDasharray="6 8" />

        {/* Studio: several nodes, the work split between them */}
        {team.map((_, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          const x = 800 + col * 120;
          const y = 215 + row * 105;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="26" strokeOpacity={0.4 + (i % 3) * 0.12} />
              {i < 6 ? (
                <path
                  d={`M${x + 26} ${y} L${x + 94} ${y}`}
                  strokeOpacity="0.16"
                  strokeDasharray="5 6"
                />
              ) : null}
            </g>
          );
        })}
      </g>

      <g fill={CREAM} fontFamily="ui-monospace, Menlo, monospace" fontSize="18" letterSpacing="3">
        <text x="300" y="556" textAnchor="middle">
          ONE OWNER
        </text>
        <text x="920" y="556" textAnchor="middle" fillOpacity="0.45">
          HANDOFFS
        </text>
      </g>
    </Frame>
  );
}

/** Cost. One total bar broken into the line items underneath it. */
export function CoverCost({ className }: CoverProps) {
  // Widths are proportional to the effort shares the article sets out.
  const items = [
    { w: 0.22, label: 'BUILD' },
    { w: 0.16, label: 'CONTENT' },
    { w: 0.14, label: 'ROUTING' },
    { w: 0.12, label: 'META' },
    { w: 0.11, label: 'PERF' },
    { w: 0.1, label: 'QA' },
    { w: 0.15, label: '' },
  ];
  const x0 = 130;
  const track = 940;

  // Prefix sum rather than a running counter, for the same reason as the
  // charts: nothing gets reassigned while the component renders.
  const widths = items.map((item) => track * item.w);
  const segments = items.map((item, i) => ({
    label: item.label,
    w: widths[i],
    x: x0 + widths.slice(0, i).reduce((sum, w) => sum + w, 0),
  }));

  return (
    <Frame
      className={className}
      label="One total cost bar split into the line items that make it up, with tick marks beneath"
    >
      {/* The single number a client is usually given */}
      <g>
        <rect
          x={x0}
          y="150"
          width={track}
          height="56"
          rx="4"
          fill="none"
          stroke={CREAM}
          strokeWidth="1.4"
          strokeOpacity="0.45"
        />
        <text
          x={x0 + track / 2}
          y="187"
          fill={CREAM}
          fillOpacity="0.45"
          fontFamily="ui-monospace, Menlo, monospace"
          fontSize="20"
          textAnchor="middle"
          letterSpacing="4"
        >
          ONE NUMBER
        </text>
      </g>

      {/* Split apart into what it is actually made of */}
      <g>
        {segments.map((seg, i) => (
          <g key={i}>
            <rect
              x={seg.x + 2}
              y="300"
              width={Math.max(seg.w - 4, 2)}
              height="72"
              rx="3"
              fill={CREAM}
              fillOpacity={0.14 + (segments.length - i) * 0.1}
            />
            {seg.label ? (
              <text
                x={seg.x + seg.w / 2}
                y="418"
                fill={CREAM}
                fillOpacity="0.55"
                fontFamily="ui-monospace, Menlo, monospace"
                fontSize="14"
                textAnchor="middle"
                letterSpacing="1"
              >
                {seg.label}
              </text>
            ) : null}
            <line
              x1={seg.x + seg.w / 2}
              y1="382"
              x2={seg.x + seg.w / 2}
              y2="396"
              stroke={CREAM}
              strokeOpacity="0.3"
              strokeWidth="1.2"
            />
          </g>
        ))}
      </g>

      {/* Connectors from the single bar down to the split */}
      <g stroke={CREAM} strokeOpacity="0.22" strokeWidth="1.2" fill="none">
        <path d={`M${x0} 206 L${x0} 300`} />
        <path d={`M${x0 + track} 206 L${x0 + track} 300`} />
      </g>

      <text
        x={x0}
        y="500"
        fill={CREAM}
        fontFamily="ui-monospace, Menlo, monospace"
        fontSize="18"
        letterSpacing="3"
      >
        NINE LINE ITEMS
      </text>
    </Frame>
  );
}

/** Timeline. Phases as offset bars running left to right across weeks. */
export function CoverTimeline({ className }: CoverProps) {
  const phases = [
    { start: 0, len: 1 },
    { start: 0.4, len: 2.2 },
    { start: 1.4, len: 1.6 },
    { start: 2.4, len: 1 },
    { start: 3, len: 1 },
    { start: 3.4, len: 1.2 },
  ];
  const x0 = 150;
  const weekW = 176;
  const weeks = 5;

  return (
    <Frame
      className={className}
      label="Six project phases drawn as overlapping bars across five weeks"
    >
      {/* Week gridlines */}
      <g stroke={CREAM} strokeOpacity="0.12" strokeWidth="1">
        {Array.from({ length: weeks + 1 }).map((_, i) => (
          <line key={i} x1={x0 + i * weekW} y1="120" x2={x0 + i * weekW} y2="470" />
        ))}
      </g>
      <g
        fill={CREAM}
        fillOpacity="0.4"
        fontFamily="ui-monospace, Menlo, monospace"
        fontSize="15"
        letterSpacing="2"
      >
        {Array.from({ length: weeks }).map((_, i) => (
          <text key={i} x={x0 + i * weekW + weekW / 2} y="106" textAnchor="middle">
            W{i + 1}
          </text>
        ))}
      </g>

      {/* Phase bars */}
      {phases.map((p, i) => {
        const y = 152 + i * 54;
        return (
          <g key={i}>
            <rect
              x={x0 + p.start * weekW}
              y={y}
              width={p.len * weekW}
              height="30"
              rx="4"
              fill={CREAM}
              fillOpacity={0.85 - i * 0.1}
            />
          </g>
        );
      })}

      <text
        x={x0}
        y="524"
        fill={CREAM}
        fontFamily="ui-monospace, Menlo, monospace"
        fontSize="18"
        letterSpacing="3"
      >
        PHASES OVERLAP
      </text>
    </Frame>
  );
}

/** Checklist. Ticked boxes above, empty ones below, one still open. */
export function CoverChecklist({ className }: CoverProps) {
  const rows = [
    { done: true, w: 470 },
    { done: true, w: 560 },
    { done: true, w: 400 },
    { done: false, w: 520, current: true },
    { done: false, w: 440 },
    { done: false, w: 490 },
  ];

  return (
    <Frame
      className={className}
      label="A checklist with the first three items ticked and the fourth highlighted as current"
    >
      {rows.map((row, i) => {
        const y = 130 + i * 74;
        return (
          <g key={i}>
            {/* Box */}
            <rect
              x="160"
              y={y}
              width="40"
              height="40"
              rx="4"
              fill="none"
              stroke={CREAM}
              strokeWidth="1.6"
              strokeOpacity={row.done ? 0.85 : row.current ? 1 : 0.32}
            />
            {row.done ? (
              <path
                d={`M169 ${y + 21} L178 ${y + 30} L192 ${y + 11}`}
                fill="none"
                stroke={CREAM}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : null}

            {/* The line of text, drawn as a rule */}
            <rect
              x="228"
              y={y + 16}
              width={row.w}
              height="9"
              rx="4.5"
              fill={CREAM}
              fillOpacity={row.done ? 0.3 : row.current ? 0.7 : 0.14}
            />

            {/* Marker on the item you are on */}
            {row.current ? (
              <path
                d={`M120 ${y + 20} L136 ${y + 20} M130 ${y + 14} L136 ${y + 20} L130 ${y + 26}`}
                fill="none"
                stroke={CREAM}
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : null}
          </g>
        );
      })}
    </Frame>
  );
}

/**
 * Schema by hand against schema in code. An admin form on the left, where every
 * row costs a click and nothing survives outside the database, and a file on
 * the right that lives in the repository with everything else.
 */
export function CoverSchema({ className }: CoverProps) {
  const rows = [0, 1, 2, 3, 4];
  // Indent and length of each rule in the file, so the block reads as nested
  // code rather than as a paragraph of body text.
  const lines = [
    { indent: 0, w: 196 },
    { indent: 26, w: 232 },
    { indent: 52, w: 158 },
    { indent: 52, w: 204 },
    { indent: 26, w: 132 },
    { indent: 0, w: 78 },
  ];

  return (
    <Frame
      className={className}
      label="An admin form built of clickable field rows on the left, against a version controlled schema file on the right"
    >
      <g stroke={CREAM} fill="none" strokeWidth="1.4">
        {/* Admin panel, dimmed, with a title bar and five field rows */}
        <rect x="112" y="146" width="376" height="334" rx="6" strokeOpacity="0.5" />
        <path d="M112 192h376" strokeOpacity="0.4" />
        <circle cx="140" cy="169" r="5.5" strokeOpacity="0.4" />
        <circle cx="160" cy="169" r="5.5" strokeOpacity="0.4" />

        {rows.map((r) => {
          const y = 226 + r * 50;
          return (
            <g key={r}>
              <rect x="144" y={y} width="212" height="32" rx="4" strokeOpacity="0.32" />
              {/* Every row ends in a select, which is the click you cannot commit */}
              <rect x="372" y={y} width="84" height="32" rx="4" strokeOpacity="0.3" />
              <path d={`M404 ${y + 13} l10 8 l10 -8`} strokeOpacity="0.55" />
            </g>
          );
        })}

        <line x1="600" y1="128" x2="600" y2="500" strokeOpacity="0.2" strokeDasharray="6 8" />

        {/* The file, drawn bright, because this one is readable in a diff */}
        <rect x="712" y="146" width="376" height="334" rx="6" />
        <path d="M712 192h376" strokeOpacity="0.5" />
      </g>

      {/* Filename in the bar, so the right panel reads as a file not a window */}
      <text
        x="744"
        y="176"
        fill={CREAM}
        fillOpacity="0.55"
        fontFamily="ui-monospace, Menlo, monospace"
        fontSize="16"
      >
        article.ts
      </text>

      {lines.map((line, i) => (
        <rect
          key={i}
          x={744 + line.indent}
          y={228 + i * 42}
          width={line.w}
          height="10"
          rx="5"
          fill={CREAM}
          fillOpacity={0.72 - i * 0.07}
        />
      ))}

      {/* Commit nodes down the gutter of the file */}
      <g stroke={CREAM} strokeOpacity="0.3" strokeWidth="1.2" fill="none">
        <path d="M726 232v212" />
        {[0, 1, 2].map((n) => (
          <circle key={n} cx="726" cy={244 + n * 100} r="6" fill="#0B0B0B" />
        ))}
      </g>

      <g fill={CREAM} fontFamily="ui-monospace, Menlo, monospace" fontSize="18" letterSpacing="3">
        <text x="300" y="546" textAnchor="middle" fillOpacity="0.45">
          CLICKED
        </text>
        <text x="900" y="546" textAnchor="middle">
          COMMITTED
        </text>
      </g>
    </Frame>
  );
}

export const covers = {
  'wordpress-to-nextjs-migration': CoverMigration,
  'wordpress-as-headless-cms': CoverHeadless,
  'headless-cms-vs-website-builders': CoverDecoupled,
  'core-web-vitals-for-content-sites': CoverVitals,
  'yoast-metadata-to-nextjs': CoverMetadata,
  'hosting-headless-wordpress': CoverHosting,
  'solo-developer-vs-agency': CoverSolo,
  'wordpress-to-nextjs-migration-cost': CoverCost,
  'wordpress-to-nextjs-migration-timeline': CoverTimeline,
  'wordpress-to-nextjs-migration-checklist': CoverChecklist,
  'wordpress-vs-sanity-headless-cms': CoverSchema,
} as const;

export type CoverSlug = keyof typeof covers;
