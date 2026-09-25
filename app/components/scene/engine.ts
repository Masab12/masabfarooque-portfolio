/**
 * A small 3D renderer for system diagrams, drawn with Canvas2D.
 *
 * Nodes are boxes, database cylinders and queue stacks standing on a
 * drafting floor. Edges are pipes routed along the floor, and packets run
 * through the pipes. The camera orbits; the drawing is sorted back to front
 * each frame, which is all a scene of a dozen objects needs. There is no
 * WebGL and no library, so a scene costs a few kilobytes and runs on any
 * device that can draw a line.
 *
 * The renderer knows nothing about React. The component that owns the
 * canvas feeds it input and reads events back through callbacks.
 */

export type Shape = 'box' | 'cylinder' | 'slab' | 'stack';
export type Tone = 'sheet' | 'plate' | 'sand' | 'sage' | 'cyan' | 'clay';

export type SceneNode = {
  id: string;
  label: string;
  sub?: string;
  /** What happens at this node, shown when it is inspected. */
  note?: string;
  shape: Shape;
  /** Position on the floor, x and z, in scene units. */
  at: [number, number];
  /** Width, height and depth. Defaults depend on the shape. */
  size?: [number, number, number];
  tone?: Tone;
  /** Height the node stands at, for layers stacked on one another. */
  lift?: number;
  /** Put the label beside the node instead of above it. */
  labelSide?: boolean;
  /** Where the node ends up when the scene's blend reaches 1. */
  morph?: { at?: [number, number]; lift?: number; show?: number };
  /** How visible the node is at blend 0. Defaults to 1. */
  show?: number;
  /** Nodes to light up in turn when traffic arrives here, bottom to top. */
  chain?: string[];
};

export type SceneEdge = { from: string; to: string; dashed?: boolean; range?: [number, number] };

export type SceneGraph = {
  id: string;
  nodes: SceneNode[];
  edges: SceneEdge[];
  /** Paths the ambient traffic follows, as ordered node ids. */
  flows: string[][];
  /** Blend range in which each flow runs, in the same order. Optional. */
  flowRanges?: [number, number][];
};

type RGB = [number, number, number];

const TONES: Record<Tone, RGB> = {
  sheet: [255, 255, 255],
  plate: [239, 236, 230],
  sand: [230, 226, 216],
  sage: [213, 224, 212],
  cyan: [208, 227, 228],
  clay: [242, 219, 207],
};
const INK: RGB = [22, 24, 23];
const SAGE: RGB = [62, 89, 73];
const CYAN: RGB = [42, 111, 120];
const CLAY: RGB = [184, 93, 59];
const PAPER: RGB = [247, 246, 242];

const DEFAULT_SIZE: Record<Shape, [number, number, number]> = {
  box: [70, 56, 70],
  cylinder: [66, 54, 66],
  slab: [86, 18, 58],
  stack: [74, 40, 56],
};

const rgba = (c: RGB, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const shade = (c: RGB, k: number): RGB => [c[0] * k, c[1] * k, c[2] * k];
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** Drops keys set to undefined, so an omitted prop never overwrites a default. */
const defined = <T extends object>(o: T): Partial<T> =>
  Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) as Partial<T>;

type V3 = [number, number, number];
type P2 = { x: number; y: number; depth: number; k: number };

type NodeState = {
  node: SceneNode;
  size: [number, number, number];
  /** Current position and height after blending between layouts. */
  at: [number, number];
  lift: number;
  /** Visibility from the blend, multiplied with grow when drawn. */
  vis: number;
  /** 0 to 1, how far the node has risen out of the floor. */
  grow: number;
  pulse: number;
  order: number;
};

type Pipe = { from: string; to: string; pts: V3[]; len: number; dashed: boolean; drawn: number; range?: [number, number] };

type Packet = {
  path: V3[][];
  hop: number;
  dist: number;
  speed: number;
  traced: boolean;
  nodes: string[];
  color: RGB;
};

export type RendererEvents = {
  onHover?: (id: string | null) => void;
  onSelect?: (id: string | null) => void;
  onTraceStep?: (nodeId: string, index: number) => void;
  onTraceDone?: () => void;
};

export type RendererOptions = {
  /** Where the scene's centre sits, as a fraction of the canvas width. */
  focusX?: number;
  focusY?: number;
  /** Fraction of the canvas the scene may fill. */
  fill?: number;
  reduced?: boolean;
  compact?: boolean;
  autoRotate?: boolean;
};

export class SystemRenderer {
  private ctx: CanvasRenderingContext2D;
  private w = 1;
  private h = 1;
  private font = 'monospace';
  private events: RendererEvents;
  private opts: Required<RendererOptions>;

  yaw = -0.62;
  pitch = 0.6;
  private targetYaw = -0.62;
  private targetPitch = 0.6;
  private idleSpin = 0;

  private graph: SceneGraph | null = null;
  private pending: SceneGraph | null = null;
  private states = new Map<string, NodeState>();
  private pipes: Pipe[] = [];
  private packets: Packet[] = [];
  private phase: 'in' | 'out' | 'still' = 'still';
  private phaseT = 0;
  private spawnT = 0;
  private radius = 300;
  private centre: [number, number] = [0, 0];
  private scale = 1;
  private blend = 0;
  private blendTarget = 0;
  private offset: [number, number] = [0, 0];
  private fitted = false;
  private chains: { id: string; at: number }[] = [];
  private clock = 0;

  hoverId: string | null = null;
  selectedId: string | null = null;
  private highlight = new Set<string>();

  constructor(ctx: CanvasRenderingContext2D, events: RendererEvents = {}, opts: RendererOptions = {}) {
    this.ctx = ctx;
    this.events = events;
    this.opts = {
      focusX: 0.5,
      focusY: 0.5,
      fill: 0.9,
      reduced: false,
      compact: false,
      autoRotate: true,
      ...defined(opts),
    };
  }

  setOptions(opts: RendererOptions) {
    this.opts = { ...this.opts, ...defined(opts) };
  }

  setFont(font: string) {
    this.font = font;
  }

  resize(w: number, h: number) {
    this.w = Math.max(1, w);
    this.h = Math.max(1, h);
    this.fitted = false;
  }

  /* ── Graph ──────────────────────────────────────────────────── */

  setGraph(graph: SceneGraph) {
    if (this.graph?.id === graph.id && this.phase !== 'out') return;
    if (!this.graph || this.opts.reduced) {
      this.install(graph);
      return;
    }
    this.pending = graph;
    this.phase = 'out';
    this.phaseT = 0;
  }

  private install(graph: SceneGraph) {
    this.graph = graph;
    this.states.clear();
    graph.nodes.forEach((node, i) => {
      this.states.set(node.id, {
        node,
        size: node.size ?? DEFAULT_SIZE[node.shape],
        at: [...node.at] as [number, number],
        lift: node.lift ?? 0,
        vis: node.show ?? 1,
        grow: this.opts.reduced ? 1 : 0,
        pulse: 0,
        order: i,
      });
    });
    this.applyBlend(true);
    this.pipes = graph.edges.map((e) => this.route(e));
    if (this.opts.reduced) this.pipes.forEach((p) => (p.drawn = 1));
    this.packets = [];
    this.highlight.clear();
    this.selectedId = null;

    // Fit: centre on the nodes, size to the furthest corner from that centre,
    // which does not change as the camera turns.
    const spots = graph.nodes.flatMap((n) => (n.morph?.at ? [n.at, n.morph.at] : [n.at]));
    const xs = spots.map((a) => a[0]);
    const zs = spots.map((a) => a[1]);
    this.centre = [(Math.min(...xs) + Math.max(...xs)) / 2, (Math.min(...zs) + Math.max(...zs)) / 2];
    let r = 0;
    for (const s of this.states.values()) {
      for (const a of s.node.morph?.at ? [s.node.at, s.node.morph.at] : [s.node.at]) {
        const dx = a[0] - this.centre[0];
        const dz = a[1] - this.centre[1];
        r = Math.max(r, Math.hypot(dx, dz) + Math.max(s.size[0], s.size[2]) * 0.75);
      }
    }
    this.radius = r + 30;
    this.phase = this.opts.reduced ? 'still' : 'in';
    this.phaseT = 0;
    this.fitted = false;
  }

  private route(e: SceneEdge): Pipe {
    const a = this.states.get(e.from)?.at ?? [0, 0];
    const b = this.states.get(e.to)?.at ?? [0, 0];
    const y = 3;
    // Orthogonal routing along the floor, the long leg first, the way cable
    // trays are run in a plant room.
    const dx = Math.abs(b[0] - a[0]);
    const dz = Math.abs(b[1] - a[1]);
    const mid: V3 = dx >= dz ? [b[0], y, a[1]] : [a[0], y, b[1]];
    const pts: V3[] = [[a[0], y, a[1]]];
    if (dx > 1 && dz > 1) pts.push(mid);
    pts.push([b[0], y, b[1]]);
    let len = 0;
    for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][2] - pts[i - 1][2]);
    return { from: e.from, to: e.to, pts, len, dashed: !!e.dashed, drawn: 0, range: e.range };
  }

  private pipeBetween(a: string, b: string): V3[] {
    const direct = this.pipes.find((p) => p.from === a && p.to === b);
    if (direct) return direct.pts;
    const reverse = this.pipes.find((p) => p.from === b && p.to === a);
    if (reverse) return [...reverse.pts].reverse();
    const na = this.states.get(a)?.at ?? [0, 0];
    const nb = this.states.get(b)?.at ?? [0, 0];
    return [
      [na[0], 3, na[1]],
      [nb[0], 3, nb[1]],
    ];
  }

  /* ── Traffic ────────────────────────────────────────────────── */

  private makePacket(nodes: string[], traced: boolean): Packet | null {
    if (nodes.length < 2) return null;
    const path: V3[][] = [];
    for (let i = 1; i < nodes.length; i++) path.push(this.pipeBetween(nodes[i - 1], nodes[i]));
    return {
      path,
      hop: 0,
      dist: 0,
      speed: traced ? 150 : 90 + Math.random() * 60,
      traced,
      nodes,
      color: traced ? CLAY : Math.random() < 0.5 ? CYAN : SAGE,
    };
  }

  /** Sends one highlighted request along a path and reports each stop. */
  trace(nodes: string[]) {
    this.packets = this.packets.filter((p) => !p.traced);
    this.highlight.clear();
    if (this.opts.reduced) {
      nodes.forEach((id, i) => {
        this.highlight.add(id);
        this.events.onTraceStep?.(id, i);
      });
      this.events.onTraceDone?.();
      return;
    }
    const packet = this.makePacket(nodes, true);
    if (!packet) return;
    this.packets.push(packet);
    this.highlight.add(nodes[0]);
    const first = this.states.get(nodes[0]);
    if (first) first.pulse = 1;
    this.events.onTraceStep?.(nodes[0], 0);
  }

  /** Moves every morphing node toward its blend-1 layout. 0 to 1. */
  setBlend(t: number, immediate = false) {
    this.blendTarget = clamp(t, 0, 1);
    if (immediate || this.opts.reduced) {
      this.blend = this.blendTarget;
      this.applyBlend(true);
    }
  }

  private inRange(range: [number, number] | undefined) {
    return !range || (this.blend >= range[0] && this.blend <= range[1]);
  }

  private applyBlend(reroute: boolean) {
    const t = easeOut(this.blend);
    for (const s of this.states.values()) {
      const m = s.node.morph;
      const a0 = s.node.at;
      const a1 = m?.at ?? a0;
      s.at = [a0[0] + (a1[0] - a0[0]) * t, a0[1] + (a1[1] - a0[1]) * t];
      const l0 = s.node.lift ?? 0;
      s.lift = l0 + ((m?.lift ?? l0) - l0) * t;
      const v0 = s.node.show ?? 1;
      s.vis = v0 + ((m?.show ?? v0) - v0) * clamp(this.blend * 1.6 - 0.3, 0, 1);
    }
    if (reroute && this.graph) {
      const drawn = new Map(this.pipes.map((p) => [`${p.from}>${p.to}`, p.drawn]));
      this.pipes = this.graph.edges.map((e) => {
        const p = this.route(e);
        p.drawn = drawn.get(`${e.from}>${e.to}`) ?? (this.phase === 'still' ? 1 : 0);
        return p;
      });
    }
  }

  select(id: string | null) {
    this.selectedId = id;
    if (id) {
      const s = this.states.get(id);
      if (s) s.pulse = 1;
    }
  }

  /* ── Input ──────────────────────────────────────────────────── */

  drag(dx: number, dy: number) {
    this.targetYaw += dx * 0.0085;
    this.targetPitch = clamp(this.targetPitch + dy * 0.004, 0.32, 1.08);
  }

  resetView() {
    this.targetYaw = -0.62 - this.idleSpin;
    this.targetPitch = 0.6;
  }

  /** The node under a point in canvas pixels, if any. */
  pick(px: number, py: number): string | null {
    let best: { id: string; depth: number } | null = null;
    for (const s of this.states.values()) {
      if (s.grow * s.vis < 0.6) continue;
      const hull = this.hull(s);
      if (!hull) continue;
      if (px < hull.minX - 6 || px > hull.maxX + 6 || py < hull.minY - 6 || py > hull.maxY + 6) continue;
      if (!best || hull.depth < best.depth) best = { id: s.node.id, depth: hull.depth };
    }
    return best?.id ?? null;
  }

  setHover(id: string | null) {
    if (id !== this.hoverId) {
      this.hoverId = id;
      this.events.onHover?.(id);
    }
  }

  /* ── Projection ─────────────────────────────────────────────── */

  private project(p: V3): P2 {
    const yaw = this.yaw + this.idleSpin;
    const cy = Math.cos(yaw);
    const sy = Math.sin(yaw);
    const cp = Math.cos(this.pitch);
    const sp = Math.sin(this.pitch);
    const x = p[0] - this.centre[0];
    const z = p[2] - this.centre[1];
    const x1 = x * cy - z * sy;
    const z1 = x * sy + z * cy;
    const y2 = p[1] * cp + z1 * sp;
    const z2 = -p[1] * sp + z1 * cp;
    const focal = 1400;
    const k = focal / (focal + z2);
    return {
      x: this.w * this.opts.focusX + x1 * k * this.scale + this.offset[0],
      y: this.h * this.opts.focusY - y2 * k * this.scale + this.offset[1],
      depth: z2,
      k,
    };
  }

  private hull(s: NodeState) {
    const [w, h, d] = s.size;
    const g = easeOut(s.grow) * s.vis;
    const [x, z] = s.at;
    const b = s.lift;
    const pts = [
      [x - w / 2, b, z - d / 2], [x + w / 2, b, z - d / 2], [x + w / 2, b, z + d / 2], [x - w / 2, b, z + d / 2],
      [x - w / 2, b + h * g, z - d / 2], [x + w / 2, b + h * g, z - d / 2], [x + w / 2, b + h * g, z + d / 2], [x - w / 2, b + h * g, z + d / 2],
    ].map((p) => this.project(p as V3));
    return {
      minX: Math.min(...pts.map((p) => p.x)),
      maxX: Math.max(...pts.map((p) => p.x)),
      minY: Math.min(...pts.map((p) => p.y)),
      maxY: Math.max(...pts.map((p) => p.y)),
      depth: this.project([x, b + (h * g) / 2, z]).depth,
    };
  }

  /* ── Frame ──────────────────────────────────────────────────── */

  /**
   * Sizes and centres the drawing on its projected outline, labels included,
   * rather than on a circle round it. A long, flat system then fills a tall
   * box as well as a wide one. The result is eased, so turning the scene
   * breathes a little instead of jumping.
   */
  private fit(dt: number) {
    const keepScale = this.scale;
    const keepOffset = this.offset;
    this.scale = 1;
    this.offset = [0, 0];
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (const st of this.states.values()) {
      if (st.vis < 0.05) continue;
      const [w, h, d] = st.size;
      const [x, z] = st.at;
      const top = st.lift + h + 28;
      for (const cx of [x - w / 2, x + w / 2])
        for (const cz of [z - d / 2, z + d / 2])
          for (const cy of [st.lift, top]) {
            const q = this.project([cx, cy, cz]);
            minX = Math.min(minX, q.x);
            maxX = Math.max(maxX, q.x);
            minY = Math.min(minY, q.y);
            maxY = Math.max(maxY, q.y);
          }
    }
    this.scale = keepScale;
    this.offset = keepOffset;
    if (!Number.isFinite(minX)) return;

    // Labels printed beside a node do not scale with the drawing, so their
    // width is reserved in screen pixels before the drawing is sized.
    const size = this.opts.compact ? 9.5 : 10.5;
    this.ctx.font = `${size}px ${this.font}`;
    let sideLabel = 0;
    for (const st of this.states.values()) {
      if (st.node.labelSide && st.vis > 0.05) {
        sideLabel = Math.max(sideLabel, this.ctx.measureText(st.node.label.toUpperCase()).width + 24);
      }
    }

    const fill = this.opts.fill;
    const bw = Math.max(1, maxX - minX + 70);
    const bh = Math.max(1, maxY - minY + 20);
    const target = Math.max(0.05, Math.min((this.w * fill - sideLabel) / bw, (this.h * fill) / bh));
    const ax = this.w * this.opts.focusX - sideLabel / 2;
    const ay = this.h * this.opts.focusY;
    const tx = -((minX + maxX) / 2 - ax) * target;
    const ty = -((minY + maxY) / 2 - ay) * target;
    // A still frame (reduced motion, or a one-off redraw) settles at once
    const k = this.fitted && dt > 0 ? Math.min(1, dt * 3) : 1;
    this.scale += (target - this.scale) * k;
    this.offset = [this.offset[0] + (tx - this.offset[0]) * k, this.offset[1] + (ty - this.offset[1]) * k];
    this.fitted = true;
  }

  step(dt: number) {
    const o = this.opts;
    this.yaw += (this.targetYaw - this.yaw) * Math.min(1, dt * 7);
    this.pitch += (this.targetPitch - this.pitch) * Math.min(1, dt * 7);
    if (o.autoRotate && !o.reduced && !this.hoverId) this.idleSpin += dt * 0.05;

    this.fit(dt);

    // Assembly: nodes rise one after another, pipes draw once both ends stand
    if (this.phase === 'in') {
      this.phaseT += dt;
      let done = true;
      for (const s of this.states.values()) {
        const t = clamp((this.phaseT - s.order * 0.09) / 0.55, 0, 1);
        s.grow = t;
        if (t < 1) done = false;
      }
      for (const p of this.pipes) {
        const a = this.states.get(p.from)?.grow ?? 1;
        const b = this.states.get(p.to)?.grow ?? 1;
        if (a >= 1 && b >= 1) p.drawn = Math.min(1, p.drawn + dt * 2.4);
        if (p.drawn < 1) done = false;
      }
      if (done) this.phase = 'still';
    } else if (this.phase === 'out') {
      this.phaseT += dt;
      const t = clamp(this.phaseT / 0.42, 0, 1);
      for (const s of this.states.values()) s.grow = 1 - easeOut(t);
      for (const p of this.pipes) p.drawn = 1 - t;
      this.packets = [];
      if (t >= 1 && this.pending) {
        const next = this.pending;
        this.pending = null;
        this.install(next);
      }
    }

    for (const s of this.states.values()) s.pulse = Math.max(0, s.pulse - dt * 1.6);

    this.clock += dt;
    if (Math.abs(this.blendTarget - this.blend) > 0.0005) {
      this.blend += (this.blendTarget - this.blend) * Math.min(1, dt * 6);
      this.applyBlend(true);
      // Traffic on a path that no longer exists has nowhere to go
      this.packets = this.packets.filter((p) => p.traced);
    }
    this.chains = this.chains.filter((c) => {
      if (this.clock < c.at) return true;
      const st = this.states.get(c.id);
      if (st) st.pulse = 1;
      return false;
    });

    // Ambient traffic once the scene is standing
    if (this.phase === 'still' && !o.reduced && this.graph && this.graph.flows.length) {
      this.spawnT -= dt;
      const cap = o.compact ? 5 : 10;
      if (this.spawnT <= 0 && this.packets.filter((p) => !p.traced).length < cap) {
        const open = this.graph.flows.filter((_, i) => this.inRange(this.graph?.flowRanges?.[i]));
        const flow = open[Math.floor(Math.random() * open.length)];
        const pk = flow ? this.makePacket(flow, false) : null;
        if (pk) this.packets.push(pk);
        this.spawnT = 0.55 + Math.random() * 0.7;
      }
    }

    for (const pk of this.packets) {
      pk.dist += pk.speed * dt;
      const seg = pk.path[pk.hop];
      const len = seg.reduce((acc, p, i) => (i ? acc + Math.hypot(p[0] - seg[i - 1][0], p[2] - seg[i - 1][2]) : 0), 0);
      if (pk.dist >= len) {
        pk.dist -= len;
        pk.hop += 1;
        const arrived = pk.nodes[pk.hop];
        const st = arrived ? this.states.get(arrived) : undefined;
        st?.node.chain?.forEach((id, i) => this.chains.push({ id, at: this.clock + i * 0.11 }));
        if (st && pk.traced) {
          st.pulse = 1;
          this.highlight.add(arrived);
          this.events.onTraceStep?.(arrived, pk.hop);
        }
        if (pk.hop >= pk.path.length && pk.traced) this.events.onTraceDone?.();
      }
    }
    this.packets = this.packets.filter((p) => p.hop < p.path.length);
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.w, this.h);
    if (!this.graph) return;

    this.drawFloor();
    for (const p of this.pipes) if (this.inRange(p.range)) this.drawPipe(p);
    for (const pk of this.packets) this.drawPacket(pk);

    const order = [...this.states.values()]
      .filter((s) => s.grow * s.vis > 0.001)
      .map((s) => ({ s, depth: this.project([s.at[0], s.lift, s.at[1]]).depth - s.lift * 0.02 }))
      .sort((a, b) => b.depth - a.depth);
    for (const { s } of order) this.drawNode(s);
    for (const { s } of order) this.drawLabel(s);
  }

  /* ── Painters ───────────────────────────────────────────────── */

  private drawFloor() {
    const ctx = this.ctx;
    const r = this.radius * 1.05;
    const [cx, cz] = this.centre;
    const step = 40;
    ctx.lineWidth = 1;
    for (let v = -r; v <= r + 0.1; v += step) {
      const a1 = this.project([cx + v, 0, cz - r]);
      const b1 = this.project([cx + v, 0, cz + r]);
      const a2 = this.project([cx - r, 0, cz + v]);
      const b2 = this.project([cx + r, 0, cz + v]);
      const edge = 1 - Math.abs(v) / r;
      ctx.strokeStyle = rgba(INK, 0.035 + edge * 0.045);
      ctx.beginPath();
      ctx.moveTo(a1.x, a1.y);
      ctx.lineTo(b1.x, b1.y);
      ctx.moveTo(a2.x, a2.y);
      ctx.lineTo(b2.x, b2.y);
      ctx.stroke();
    }
  }

  private polyline(pts: V3[], fraction: number) {
    const out: P2[] = [];
    let total = 0;
    const lens: number[] = [];
    for (let i = 1; i < pts.length; i++) {
      const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][2] - pts[i - 1][2]);
      lens.push(l);
      total += l;
    }
    let remain = total * fraction;
    out.push(this.project(pts[0]));
    for (let i = 1; i < pts.length && remain > 0; i++) {
      const l = lens[i - 1];
      if (remain >= l) {
        out.push(this.project(pts[i]));
        remain -= l;
      } else {
        const t = remain / l;
        out.push(
          this.project([
            pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t,
            pts[i - 1][1],
            pts[i - 1][2] + (pts[i][2] - pts[i - 1][2]) * t,
          ]),
        );
        remain = 0;
      }
    }
    return out;
  }

  private drawPipe(p: Pipe) {
    if (p.drawn <= 0) return;
    const ctx = this.ctx;
    const pts = this.polyline(p.pts, p.drawn);
    if (pts.length < 2) return;
    const k = pts.reduce((acc, q) => acc + q.k, 0) / pts.length;
    const width = Math.max(2.5, 7 * k * this.scale);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    const trace = () => {
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    };
    if (p.dashed) {
      ctx.setLineDash([5, 6]);
      ctx.strokeStyle = rgba(INK, 0.4);
      ctx.lineWidth = 1.2;
      trace();
      ctx.stroke();
      ctx.setLineDash([]);
      return;
    }
    // A tube: dark casing, pale bore, a hairline of light along the top
    ctx.strokeStyle = rgba(INK, 0.5);
    ctx.lineWidth = width;
    trace();
    ctx.stroke();
    ctx.strokeStyle = rgba(TONES.plate);
    ctx.lineWidth = width - 2;
    trace();
    ctx.stroke();
    ctx.strokeStyle = rgba(TONES.sheet, 0.9);
    ctx.lineWidth = Math.max(0.8, width * 0.22);
    trace();
    ctx.stroke();
  }

  private drawPacket(pk: Packet) {
    const seg = pk.path[pk.hop];
    if (!seg) return;
    let remain = pk.dist;
    let pos: V3 = seg[0];
    for (let i = 1; i < seg.length; i++) {
      const l = Math.hypot(seg[i][0] - seg[i - 1][0], seg[i][2] - seg[i - 1][2]);
      if (remain <= l) {
        const t = l ? remain / l : 0;
        pos = [seg[i - 1][0] + (seg[i][0] - seg[i - 1][0]) * t, 6, seg[i - 1][2] + (seg[i][2] - seg[i - 1][2]) * t];
        break;
      }
      remain -= l;
      pos = [seg[i][0], 6, seg[i][2]];
    }
    const p = this.project(pos);
    const ctx = this.ctx;
    const size = (pk.traced ? 11 : 6.5) * Math.max(0.7, p.k) * Math.max(0.75, this.scale);
    if (pk.traced) {
      ctx.strokeStyle = rgba(CLAY, 0.35);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, size * 1.3, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.fillStyle = rgba(PAPER);
    ctx.fillRect(p.x - size / 2 - 1.5, p.y - size / 2 - 1.5, size + 3, size + 3);
    ctx.fillStyle = rgba(pk.color);
    ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
  }

  private face(pts: P2[], fill: string, stroke: string, lw = 1) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lw;
    ctx.stroke();
  }

  /** Light comes from the upper left, fixed in the world, so faces change as you orbit. */
  private light(nx: number, nz: number) {
    const yaw = this.yaw + this.idleSpin;
    const lx = Math.cos(yaw + 0.9);
    const lz = Math.sin(yaw + 0.9);
    return 0.86 + 0.14 * Math.max(-1, Math.min(1, nx * lx + nz * lz));
  }

  private drawNode(s: NodeState) {
    const tone = TONES[s.node.tone ?? 'sheet'];
    const active = s.node.id === this.selectedId || s.node.id === this.hoverId;
    const lit = this.highlight.has(s.node.id);
    const edge = rgba(INK, active ? 0.95 : 0.62);
    const lw = active ? 1.6 : 1;
    const g = easeOut(s.grow) * s.vis;
    const [w, h, d] = s.size;
    const [x, z] = s.at;
    const lift = s.lift;
    if (s.vis < 0.999) this.ctx.globalAlpha = Math.max(0, s.vis);

    if (s.node.shape === 'cylinder') {
      this.drawCylinder(x, z, w / 2, h * g, tone, edge, lw, lift);
    } else if (s.node.shape === 'stack') {
      const layers = 3;
      const gap = 5;
      const lh = (h - gap * (layers - 1)) / layers;
      for (let i = 0; i < layers; i++) {
        const base = lift + i * (lh + gap) * g;
        this.drawBox(x, z, w, lh * g, d, base, tone, edge, lw);
      }
    } else {
      this.drawBox(x, z, w, h * g, d, lift, tone, edge, lw);
    }
    this.ctx.globalAlpha = 1;

    // Pulse ring on the floor when something arrives or is selected
    const ring = Math.max(s.pulse, lit ? 0.25 : 0);
    if (ring > 0.01) {
      const ctx = this.ctx;
      const rr = Math.max(w, d) * (0.75 + (1 - s.pulse) * 0.45);
      ctx.strokeStyle = rgba(lit ? CLAY : SAGE, 0.55 * ring);
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      for (let i = 0; i <= 28; i++) {
        const a = (i / 28) * Math.PI * 2;
        const p = this.project([x + Math.cos(a) * rr, lift + 1, z + Math.sin(a) * rr]);
        if (i) ctx.lineTo(p.x, p.y);
        else ctx.moveTo(p.x, p.y);
      }
      ctx.stroke();
    }
  }

  private drawBox(x: number, z: number, w: number, h: number, d: number, base: number, tone: RGB, edge: string, lw: number) {
    if (h <= 0.2) return;
    const x0 = x - w / 2;
    const x1 = x + w / 2;
    const z0 = z - d / 2;
    const z1 = z + d / 2;
    const y0 = base;
    const y1 = base + h;
    const P = (px: number, py: number, pz: number) => this.project([px, py, pz]);
    const sides: { pts: P2[]; n: [number, number] }[] = [
      { pts: [P(x0, y0, z0), P(x1, y0, z0), P(x1, y1, z0), P(x0, y1, z0)], n: [0, -1] },
      { pts: [P(x1, y0, z0), P(x1, y0, z1), P(x1, y1, z1), P(x1, y1, z0)], n: [1, 0] },
      { pts: [P(x1, y0, z1), P(x0, y0, z1), P(x0, y1, z1), P(x1, y1, z1)], n: [0, 1] },
      { pts: [P(x0, y0, z1), P(x0, y0, z0), P(x0, y1, z0), P(x0, y1, z1)], n: [-1, 0] },
    ];
    // Back faces first so the near ones cover them
    sides
      .map((f) => ({ ...f, depth: f.pts.reduce((a, p) => a + p.depth, 0) / 4 }))
      .sort((a, b) => b.depth - a.depth)
      .forEach((f) => this.face(f.pts, rgba(shade(tone, this.light(f.n[0], f.n[1]) * 0.97)), edge, lw));
    this.face([P(x0, y1, z0), P(x1, y1, z0), P(x1, y1, z1), P(x0, y1, z1)], rgba(tone), edge, lw);
  }

  private drawCylinder(x: number, z: number, r: number, h: number, tone: RGB, edge: string, lw: number, base = 0) {
    if (h <= 0.2) return;
    const n = 20;
    const ring = (y: number) =>
      Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2;
        return { a, p: this.project([x + Math.cos(a) * r, base + y, z + Math.sin(a) * r]) };
      });
    const bottom = ring(0);
    const top = ring(h);
    const facets = bottom
      .map((b, i) => {
        const j = (i + 1) % n;
        const pts = [b.p, bottom[j].p, top[j].p, top[i].p];
        const mid = b.a + Math.PI / n;
        return { pts, n: [Math.cos(mid), Math.sin(mid)] as [number, number], depth: pts.reduce((acc, p) => acc + p.depth, 0) / 4 };
      })
      .sort((a, b) => b.depth - a.depth);
    const ctx = this.ctx;
    for (const f of facets) {
      ctx.beginPath();
      ctx.moveTo(f.pts[0].x, f.pts[0].y);
      for (let i = 1; i < 4; i++) ctx.lineTo(f.pts[i].x, f.pts[i].y);
      ctx.closePath();
      ctx.fillStyle = rgba(shade(tone, this.light(f.n[0], f.n[1]) * 0.97));
      ctx.fill();
    }
    // Outline: the two silhouette verticals and the bands of a database drum
    const band = (y: number, alpha: number) => {
      const centreDepth = this.project([x, base + y, z]).depth;
      const front = ring(y).filter((q) => q.p.depth <= centreDepth + 0.01);
      ctx.strokeStyle = rgba(INK, alpha);
      ctx.lineWidth = lw;
      ctx.beginPath();
      front.sort((a, b) => a.p.x - b.p.x).forEach((q, i) => (i ? ctx.lineTo(q.p.x, q.p.y) : ctx.moveTo(q.p.x, q.p.y)));
      ctx.stroke();
    };
    band(h / 3, 0.28);
    band((2 * h) / 3, 0.28);
    band(0, 0.6);
    const tl = top.reduce((a, b) => (b.p.x < a.p.x ? b : a)).p;
    const tr = top.reduce((a, b) => (b.p.x > a.p.x ? b : a)).p;
    const bl = bottom.reduce((a, b) => (b.p.x < a.p.x ? b : a)).p;
    const br = bottom.reduce((a, b) => (b.p.x > a.p.x ? b : a)).p;
    ctx.strokeStyle = edge;
    ctx.lineWidth = lw;
    ctx.beginPath();
    ctx.moveTo(tl.x, tl.y);
    ctx.lineTo(bl.x, bl.y);
    ctx.moveTo(tr.x, tr.y);
    ctx.lineTo(br.x, br.y);
    ctx.stroke();
    this.face(top.map((t) => t.p), rgba(tone), edge, lw);
  }

  private drawLabel(s: NodeState) {
    if (s.grow < 0.85 || s.vis < 0.35) return;
    const ctx = this.ctx;
    const [, h] = s.size;
    if (s.node.labelSide) {
      const hull = this.hull(s);
      const y = (hull.minY + hull.maxY) / 2;
      const x = hull.maxX + 14;
      const label = s.node.label.toUpperCase();
      const size = this.opts.compact ? 9.5 : 10.5;
      ctx.font = `${size}px ${this.font}`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.strokeStyle = rgba(INK, 0.3 * s.vis);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(hull.maxX + 3, y);
      ctx.lineTo(x - 4, y);
      ctx.stroke();
      ctx.fillStyle = rgba(INK, 0.85 * s.vis);
      ctx.fillText(label, x, y);
      return;
    }
    const p = this.project([s.at[0], s.lift + h + 16, s.at[1]]);
    const active = s.node.id === this.selectedId || s.node.id === this.hoverId;
    const big = this.opts.compact ? 10 : 11;
    const label = s.node.label.toUpperCase();
    ctx.font = `${big}px ${this.font}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    const tw = ctx.measureText(label).width;
    const alpha = clamp(s.grow * 1.2 - 0.2, 0, 1) * s.vis;
    ctx.fillStyle = rgba(active ? INK : PAPER, 0.92 * alpha);
    ctx.fillRect(p.x - tw / 2 - 5, p.y - big - 5, tw + 10, big + 7);
    if (!active) {
      ctx.strokeStyle = rgba(INK, 0.16 * alpha);
      ctx.lineWidth = 1;
      ctx.strokeRect(p.x - tw / 2 - 5 + 0.5, p.y - big - 5 + 0.5, tw + 9, big + 6);
    }
    ctx.fillStyle = rgba(active ? PAPER : INK, alpha);
    ctx.fillText(label, p.x, p.y);
  }
}
