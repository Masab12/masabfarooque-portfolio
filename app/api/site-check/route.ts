import { NextResponse, type NextRequest } from 'next/server';
import { safeFetch, UnsafeUrlError, FetchFailedError } from '@/app/lib/site-check/safe-fetch';
import { runChecks, scoreOf, summarize } from '@/app/lib/site-check/checks';

export const dynamic = 'force-dynamic';

/**
 * A crude, in-memory rate limit. It resets whenever the server restarts and
 * does not share state across instances, which is a real limitation, not an
 * oversight: this endpoint has no database behind it, and adding one just to
 * count requests would be a heavier fix than the problem calls for. What it
 * does do is stop a single visitor from firing off dozens of scans a minute.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t > WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

function clientKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() ?? 'unknown';
}

async function checkReachable(base: string, path: string): Promise<boolean> {
  try {
    const result = await safeFetch(new URL(path, base).toString());
    return result.status >= 200 && result.status < 400;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (isRateLimited(clientKey(request))) {
    return NextResponse.json(
      { error: 'That is a lot of scans in a short time. Wait a minute and try again.' },
      { status: 429 },
    );
  }

  let url: unknown;
  try {
    ({ url } = await request.json());
  } catch {
    return NextResponse.json({ error: 'Send the address as JSON.' }, { status: 400 });
  }

  if (typeof url !== 'string' || url.trim().length === 0) {
    return NextResponse.json({ error: 'Type an address to check.' }, { status: 400 });
  }

  // Only add a scheme when the visitor typed none at all, e.g. "example.com".
  // Anything that already has a scheme, including a wrong one like ftp://, is
  // left alone so safeFetch rejects it with an accurate reason instead of a
  // mangled URL like https://ftp://example.com.
  const trimmed = url.trim();
  const normalized = /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  let page;
  try {
    page = await safeFetch(normalized);
  } catch (error) {
    if (error instanceof UnsafeUrlError || error instanceof FetchFailedError) {
      return NextResponse.json({ error: error.message }, { status: 422 });
    }
    return NextResponse.json({ error: 'Something went wrong reaching that address.' }, { status: 500 });
  }

  const origin = new URL(page.finalUrl).origin;

  // robots.txt and sitemap.xml are each just a reachability check: does the
  // standard path answer, not full HTML analysis like the page itself gets.
  const [robotsReachable, sitemapReachable] = await Promise.all([
    checkReachable(origin, '/robots.txt'),
    checkReachable(origin, '/sitemap.xml'),
  ]);

  const results = runChecks({
    finalUrl: page.finalUrl,
    html: page.body,
    timeMs: page.timeMs,
    byteSize: page.byteSize,
    robotsTxt: { reachable: robotsReachable, text: null },
    sitemapReachable,
  });

  const { score, max, percent } = scoreOf(results);
  const counts = summarize(results);

  return NextResponse.json({
    url: page.finalUrl,
    scannedAt: new Date().toISOString(),
    score,
    max,
    percent,
    counts,
    results,
  });
}
