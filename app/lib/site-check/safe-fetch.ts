import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';

/**
 * Fetches a page a visitor gave us, on our own server, using their browser's
 * trust rather than ours. Without these checks a visitor could point the
 * scanner at an internal address (a router, a cloud metadata endpoint,
 * localhost) and use our server to reach it. Every hostname is resolved and
 * checked before the request goes out, and again after every redirect,
 * because a first hostname can look public and still redirect somewhere it
 * should not be able to reach.
 */

const MAX_REDIRECTS = 5;
const FETCH_TIMEOUT_MS = 10_000;
const MAX_BODY_BYTES = 3_000_000; // 3 MB is generous for HTML alone

export class UnsafeUrlError extends Error {}
export class FetchFailedError extends Error {}

function isPrivateIPv4(ip: string): boolean {
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) return true;
  const [a, b] = parts;
  if (a === 10) return true;
  if (a === 127) return true;
  if (a === 0) return true;
  if (a === 169 && b === 254) return true; // link local, includes cloud metadata
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 100 && b >= 64 && b <= 127) return true; // carrier grade NAT
  return false;
}

function isPrivateIPv6(ip: string): boolean {
  const lower = ip.toLowerCase();
  if (lower === '::1') return true;
  if (lower.startsWith('fe80:')) return true; // link local
  if (lower.startsWith('fc') || lower.startsWith('fd')) return true; // unique local
  if (lower.startsWith('::ffff:')) return isPrivateIPv4(lower.slice(7));
  return false;
}

function isPrivateIP(ip: string): boolean {
  const version = isIP(ip);
  if (version === 4) return isPrivateIPv4(ip);
  if (version === 6) return isPrivateIPv6(ip);
  return true; // not a recognisable IP, refuse rather than guess
}

const BLOCKED_HOSTNAME_SUFFIXES = ['.local', '.internal', '.localhost'];

async function assertPublicHost(hostname: string): Promise<void> {
  const lower = hostname.toLowerCase();

  if (lower === 'localhost' || BLOCKED_HOSTNAME_SUFFIXES.some((s) => lower.endsWith(s))) {
    throw new UnsafeUrlError('That address points at a local network, not a public site.');
  }

  const directIpVersion = isIP(lower);
  if (directIpVersion && isPrivateIP(lower)) {
    throw new UnsafeUrlError('That address points at a private network, not a public site.');
  }

  if (!directIpVersion) {
    let records;
    try {
      records = await lookup(hostname, { all: true, verbatim: true });
    } catch {
      throw new UnsafeUrlError('That address could not be found. Check the spelling and try again.');
    }
    if (records.length === 0 || records.some((r) => isPrivateIP(r.address))) {
      throw new UnsafeUrlError('That address does not resolve to a public site.');
    }
  }
}

export interface SafeFetchResult {
  finalUrl: string;
  status: number;
  headers: Headers;
  body: string;
  timeMs: number;
  byteSize: number;
}

/**
 * Validates, then fetches, a visitor supplied URL. Redirects are followed by
 * hand rather than left to the platform's fetch, so each hop gets the same
 * public address check as the first one.
 */
export async function safeFetch(rawUrl: string): Promise<SafeFetchResult> {
  let current: URL;
  try {
    current = new URL(rawUrl);
  } catch {
    throw new UnsafeUrlError('That does not look like a web address.');
  }

  const start = Date.now();

  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    if (current.protocol !== 'http:' && current.protocol !== 'https:') {
      throw new UnsafeUrlError('Only http and https addresses can be checked.');
    }

    await assertPublicHost(current.hostname);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    let response: Response;
    try {
      response = await fetch(current, {
        redirect: 'manual',
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SiteCheckBot/1.0; +https://masabfarooque.com/site-check)',
          Accept: 'text/html,application/xhtml+xml',
        },
      });
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        throw new FetchFailedError('The site took too long to respond.');
      }
      throw new FetchFailedError('The site could not be reached.');
    } finally {
      clearTimeout(timer);
    }

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      if (!location) throw new FetchFailedError('The site redirected without saying where to.');
      current = new URL(location, current);
      continue;
    }

    if (!response.ok) {
      throw new FetchFailedError(`The site answered with a ${response.status} error.`);
    }

    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('html')) {
      throw new FetchFailedError('That address is not a web page we can read.');
    }

    const reader = response.body?.getReader();
    if (!reader) throw new FetchFailedError('The site sent back nothing to read.');

    const chunks: Uint8Array[] = [];
    let received = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.byteLength;
      if (received > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new FetchFailedError('That page is larger than we can check right now.');
      }
      chunks.push(value);
    }

    const body = Buffer.concat(chunks.map((c) => Buffer.from(c))).toString('utf-8');

    return {
      finalUrl: current.toString(),
      status: response.status,
      headers: response.headers,
      body,
      timeMs: Date.now() - start,
      byteSize: received,
    };
  }

  throw new FetchFailedError('That address redirected too many times.');
}
