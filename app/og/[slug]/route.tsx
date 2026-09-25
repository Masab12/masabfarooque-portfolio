import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { posts, topicLabels } from '@/app/data/posts';
import { services } from '@/app/data/services';
import { site } from '@/app/data/site';

/**
 * Social cards, one per page that deserves its own, drawn as a sheet from
 * the same set as the site: sheet number, title, one line of context and a
 * small pipeline. Every card is generated once at build time, so sharing a
 * link never waits on a render.
 *
 * Slugs: `site`, an article slug, or `service-<service>`. Case studies use
 * their own product screenshot instead, which says more than a title card.
 */

export const dynamic = 'force-static';

export function generateStaticParams() {
  return [
    'site',
    'about',
    ...posts.map((p) => p.slug),
    ...services.map((s) => `service-${s.slug}`),
  ].map((slug) => ({ slug }));
}

type Card = { code: string; section: string; title: string; line: string; accent?: string };

function cardFor(slug: string): Card | null {
  if (slug === 'site') {
    return {
      code: 'A-00',
      section: 'Cover sheet',
      title: 'Masab Farooque builds software that',
      accent: 'holds up after launch.',
      line: 'SaaS platforms, AI systems and data pipelines, built end to end.',
    };
  }
  if (slug === 'about') {
    return {
      code: 'A-06',
      section: 'About',
      title: 'Masab Farooque,',
      accent: 'full stack engineer.',
      line: 'Games first, then the web. SaaS, AI systems and data pipelines for clients in 23 countries.',
    };
  }
  if (slug.startsWith('service-')) {
    const s = services.find((x) => `service-${x.slug}` === slug);
    return s ? { code: 'A-02', section: 'Services', title: s.metaTitle, line: s.line } : null;
  }
  const post = posts.find((x) => x.slug === slug);
  return post ? { code: 'A-04', section: `Writing · ${topicLabels[post.topic]}`, title: post.title, line: post.standfirst } : null;
}

const INK = '#161817';
const INK2 = '#525653';
const INK3 = '#6B706A';
const PAPER = '#F7F6F2';
const SHEET = '#FFFFFF';
const SAGE = '#3E5949';
const CLAY = '#B85D3B';
const RULE = 'rgba(22,24,23,0.2)';

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const card = cardFor(slug);
  if (!card) return new Response('Not found', { status: 404 });

  const dir = path.join(process.cwd(), 'app', 'og', '_fonts');
  const [heavy, regular, serif] = await Promise.all([
    readFile(path.join(dir, 'Almarai-800.ttf')),
    readFile(path.join(dir, 'Almarai-400.ttf')),
    readFile(path.join(dir, 'InstrumentSerif-Italic.ttf')),
  ]);

  const length = card.title.length + (card.accent?.length ?? 0);
  const size = length <= 34 ? 84 : length <= 52 ? 70 : length <= 72 ? 60 : 52;

  const box = (label: string, fill: string) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 58, height: 44, background: fill, border: `2px solid ${INK}`, boxShadow: `6px 6px 0 ${RULE}` }} />
      <div style={{ fontSize: 13, letterSpacing: 2, color: INK3 }}>{label}</div>
    </div>
  );
  const pipe = (lit: boolean) => (
    <div style={{ display: 'flex', alignItems: 'center', width: 70, height: 44, marginBottom: 21 }}>
      <div style={{ flex: 1, height: 4, background: lit ? SAGE : RULE }} />
    </div>
  );

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: PAPER, padding: 34, fontFamily: 'Almarai' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: SHEET, border: `2px solid ${RULE}`, padding: '44px 54px' }}>
          {/* Masthead of the sheet */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: 3, color: INK }}>MASAB FAROOQUE</div>
            <div style={{ display: 'flex', gap: 14, fontSize: 17, letterSpacing: 2.5, color: INK3 }}>
              <span style={{ color: INK }}>{card.code}</span>
              <span>{card.section.toUpperCase()}</span>
            </div>
          </div>

          {/* Title */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
            {/* Word by word, so the plain words and the serif phrase wrap as one
                line of text instead of two blocks, with a real gap between words. */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', columnGap: size * 0.24, fontSize: size, lineHeight: 1.04, color: INK, maxWidth: 1000 }}>
              {card.title.split(' ').map((word, i) => (
                <span key={`t${i}`} style={{ fontWeight: 800, letterSpacing: -1.6 }}>{word}</span>
              ))}
              {(card.accent ?? '').split(' ').filter(Boolean).map((word, i) => (
                <span key={`a${i}`} style={{ fontFamily: 'Instrument Serif', fontWeight: 400, color: SAGE, fontSize: size * 1.08, letterSpacing: -0.5 }}>{word}</span>
              ))}
            </div>
            <div style={{ marginTop: 22, fontSize: 27, lineHeight: 1.35, color: INK2, maxWidth: 900 }}>{card.line}</div>
          </div>

          {/* Title block strip along the bottom */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: `2px solid ${RULE}`, paddingTop: 22 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: INK }}>masabfarooque.com</div>
              <div style={{ fontSize: 17, color: INK3 }}>{`${site.role}, ${site.location}`}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              {box('CLIENT', SHEET)}
              {pipe(true)}
              {box('API', '#D5E0D4')}
              <div style={{ display: 'flex', alignItems: 'center', width: 70, height: 44, marginBottom: 21, position: 'relative' }}>
                <div style={{ flex: 1, height: 4, background: RULE }} />
                <div style={{ position: 'absolute', left: 26, top: 15, width: 14, height: 14, background: PAPER, border: `3px solid ${CLAY}` }} />
              </div>
              {box('DATA', '#EFECE6')}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Almarai', data: heavy, weight: 800, style: 'normal' },
        { name: 'Almarai', data: regular, weight: 400, style: 'normal' },
        { name: 'Instrument Serif', data: serif, weight: 400, style: 'italic' },
      ],
    },
  );
}
