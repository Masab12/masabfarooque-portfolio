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

export const covers = {
  'wordpress-to-nextjs-migration': CoverMigration,
  'wordpress-as-headless-cms': CoverHeadless,
  'headless-cms-vs-website-builders': CoverDecoupled,
  'core-web-vitals-for-content-sites': CoverVitals,
  'yoast-metadata-to-nextjs': CoverMetadata,
  'hosting-headless-wordpress': CoverHosting,
  'solo-developer-vs-agency': CoverSolo,
} as const;

export type CoverSlug = keyof typeof covers;
