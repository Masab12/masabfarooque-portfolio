import * as cheerio from 'cheerio';

export type CheckStatus = 'pass' | 'warn' | 'fail';

export interface CheckResult {
  id: string;
  category: 'Search visibility' | 'Technical setup' | 'Content quality' | 'Speed signals';
  label: string;
  status: CheckStatus;
  detail: string;
}

export interface ScanInput {
  finalUrl: string;
  html: string;
  timeMs: number;
  byteSize: number;
  robotsTxt: { reachable: boolean; text: string | null };
  sitemapReachable: boolean;
}

const SCORE: Record<CheckStatus, number> = { pass: 1, warn: 0.5, fail: 0 };

/**
 * Plain text extraction, used only to show a heading back to whoever is
 * reading the report. Tried inserting a space at every tag boundary to fix
 * headings built from adjacent no-space elements, and it read worse on a
 * heading animated letter by letter, where every character is its own
 * element: "Masab" came back as "Masa b". A scanner that has to read
 * markup it has never seen before cannot assume which pattern it is
 * looking at, so this stays plain rather than guessing. The one check that
 * matters, whether exactly one H1 exists, does not depend on this at all.
 */
function readableText(rawText: string): string {
  return rawText.replace(/\s+/g, ' ').trim();
}

function isPrivateSrc(src: string, pageIsHttps: boolean): boolean {
  return pageIsHttps && src.startsWith('http://');
}

/**
 * One page's worth of honest, checkable facts, in plain language. Nothing
 * here is guessed. Anything that needs a browser to measure, like paint
 * timing, is left out rather than faked with a random number.
 */
export function runChecks(input: ScanInput): CheckResult[] {
  const $ = cheerio.load(input.html);
  const results: CheckResult[] = [];
  const isHttps = input.finalUrl.startsWith('https://');

  const push = (
    id: string,
    category: CheckResult['category'],
    label: string,
    status: CheckStatus,
    detail: string,
  ) => results.push({ id, category, label, status, detail });

  // ── Search visibility ──────────────────────────────────────────
  const title = $('title').first().text().trim();
  if (!title) {
    push('title', 'Search visibility', 'Page title', 'fail', 'There is no title tag. This is the headline Google shows in search results, so without one your listing shows the web address instead.');
  } else if (title.length < 10) {
    push('title', 'Search visibility', 'Page title', 'warn', `The title is only ${title.length} characters ("${title}"). Search engines have room for more, so this is a wasted chance to say what the page is about.`);
  } else if (title.length > 65) {
    push('title', 'Search visibility', 'Page title', 'warn', `The title is ${title.length} characters. Google usually cuts titles off around 60, so the end of "${title}" is likely getting truncated in results.`);
  } else {
    push('title', 'Search visibility', 'Page title', 'pass', `The title is a good length at ${title.length} characters: "${title}".`);
  }

  const description = $('meta[name="description"]').attr('content')?.trim() ?? '';
  if (!description) {
    push('description', 'Search visibility', 'Meta description', 'fail', 'There is no meta description. Google will pull a random snippet of text from the page instead, which rarely reads as well as a written one.');
  } else if (description.length < 50) {
    push('description', 'Search visibility', 'Meta description', 'warn', `The description is only ${description.length} characters. There is room for a fuller summary that gives someone a reason to click.`);
  } else if (description.length > 165) {
    push('description', 'Search visibility', 'Meta description', 'warn', `The description is ${description.length} characters, past the point where Google usually cuts it off in results.`);
  } else {
    push('description', 'Search visibility', 'Meta description', 'pass', `The description is a good length at ${description.length} characters.`);
  }

  const h1s = $('h1');
  if (h1s.length === 0) {
    push('h1', 'Search visibility', 'Main heading', 'fail', 'There is no H1 heading on the page. This is the main heading search engines use to understand what the page is about.');
  } else if (h1s.length > 1) {
    push('h1', 'Search visibility', 'Main heading', 'warn', `There are ${h1s.length} H1 headings on the page. One clear main heading is easier for both readers and search engines to follow than several competing ones.`);
  } else {
    push('h1', 'Search visibility', 'Main heading', 'pass', `There is exactly one H1 heading: "${readableText(h1s.first().text()).slice(0, 80)}".`);
  }

  const canonical = $('link[rel="canonical"]').attr('href');
  push(
    'canonical',
    'Search visibility',
    'Canonical link',
    canonical ? 'pass' : 'warn',
    canonical
      ? `A canonical link points to ${canonical}, which tells search engines which version of this page to index.`
      : 'There is no canonical link. If this content is ever reachable at more than one address, search engines may split credit between them instead of treating one as the real page.',
  );

  const ogTitle = $('meta[property="og:title"]').attr('content');
  const ogDescription = $('meta[property="og:description"]').attr('content');
  const ogImage = $('meta[property="og:image"]').attr('content');
  const ogCount = [ogTitle, ogDescription, ogImage].filter(Boolean).length;
  if (ogCount === 3) {
    push('opengraph', 'Search visibility', 'Social sharing tags', 'pass', 'Title, description and image are all set for Open Graph, so a link to this page looks intentional when shared on social platforms and in chat apps.');
  } else if (ogCount > 0) {
    push('opengraph', 'Search visibility', 'Social sharing tags', 'warn', `Only ${ogCount} of the three main Open Graph tags are set (title, description, image). A shared link may show up with a blank preview.`);
  } else {
    push('opengraph', 'Search visibility', 'Social sharing tags', 'fail', 'No Open Graph tags were found. A link to this page will likely show up bare when shared on social media or in a chat app.');
  }

  const jsonLd = $('script[type="application/ld+json"]');
  push(
    'structured-data',
    'Search visibility',
    'Structured data',
    jsonLd.length > 0 ? 'pass' : 'warn',
    jsonLd.length > 0
      ? `Found ${jsonLd.length} block${jsonLd.length === 1 ? '' : 's'} of structured data (JSON-LD), which helps search engines understand what kind of page this is.`
      : 'No structured data was found. This is not required, but it is what lets search engines show extra detail in results, like ratings or article dates.',
  );

  // ── Technical setup ─────────────────────────────────────────────
  push(
    'https',
    'Technical setup',
    'Secure connection',
    isHttps ? 'pass' : 'fail',
    isHttps
      ? 'The page loads over HTTPS, so data between the visitor and the server is encrypted.'
      : 'The page loads over plain HTTP, not HTTPS. Most browsers now mark this as not secure, and Google treats it as a ranking signal.',
  );

  push(
    'robots-txt',
    'Technical setup',
    'robots.txt file',
    input.robotsTxt.reachable ? 'pass' : 'warn',
    input.robotsTxt.reachable
      ? 'robots.txt is reachable, so search engine crawlers get clear instructions on what they can visit.'
      : 'robots.txt could not be found. This is not required, but its absence means there is no explicit instruction for crawlers, and no stated sitemap location either.',
  );

  push(
    'sitemap',
    'Technical setup',
    'XML sitemap',
    input.sitemapReachable ? 'pass' : 'warn',
    input.sitemapReachable
      ? 'sitemap.xml is reachable at the standard location, which gives search engines a direct list of pages to index.'
      : 'No sitemap.xml was found at the standard location. Without one, search engines have to discover pages purely by following links.',
  );

  const favicon = $('link[rel*="icon"]').attr('href');
  push(
    'favicon',
    'Technical setup',
    'Favicon',
    favicon ? 'pass' : 'warn',
    favicon ? 'A favicon is set, so the site shows a proper icon in browser tabs and bookmarks.' : 'No favicon link was found in the page. Most browsers will fall back to a blank tab icon.',
  );

  const viewport = $('meta[name="viewport"]').attr('content');
  push(
    'viewport',
    'Technical setup',
    'Mobile viewport tag',
    viewport ? 'pass' : 'fail',
    viewport
      ? 'A viewport meta tag is present, which is what lets the page adapt to a phone screen instead of loading as a shrunk down desktop layout.'
      : 'There is no viewport meta tag. On a phone, this usually means the page loads zoomed out and tiny until a visitor pinches to zoom in themselves.',
  );

  const charset = $('meta[charset]').attr('charset') ?? $('meta[http-equiv="Content-Type"]').attr('content');
  push(
    'charset',
    'Technical setup',
    'Character encoding',
    charset ? 'pass' : 'warn',
    charset ? 'A character encoding is declared, which stops accented letters and symbols rendering as garbled text.' : 'No character encoding was declared in the HTML. Most browsers guess correctly, but it is not guaranteed.',
  );

  const lang = $('html').attr('lang');
  push(
    'lang',
    'Content quality',
    'Page language',
    lang ? 'pass' : 'warn',
    lang ? `The page declares its language as "${lang}", which helps screen readers pick the right pronunciation and search engines serve it to the right audience.` : 'The HTML tag has no lang attribute. Screen readers and translation tools have to guess what language the page is written in.',
  );

  // ── Content quality ──────────────────────────────────────────────
  const images = $('img');
  const imagesMissingAlt = images.filter((_, el) => !$(el).attr('alt')?.trim()).length;
  if (images.length === 0) {
    push('alt-text', 'Content quality', 'Image alt text', 'pass', 'No images were found on the page, so there is nothing to check here.');
  } else if (imagesMissingAlt === 0) {
    push('alt-text', 'Content quality', 'Image alt text', 'pass', `All ${images.length} image${images.length === 1 ? '' : 's'} on the page have alt text, which is what a screen reader announces in place of the image.`);
  } else {
    const status: CheckStatus = imagesMissingAlt === images.length ? 'fail' : 'warn';
    push('alt-text', 'Content quality', 'Image alt text', status, `${imagesMissingAlt} of ${images.length} images are missing alt text. A screen reader has nothing to say for these, and Google image search has nothing to index them by.`);
  }

  let mixedContentCount = 0;
  $('img[src], script[src], link[rel="stylesheet"][href]').each((_, el) => {
    const src = $(el).attr('src') ?? $(el).attr('href') ?? '';
    if (isPrivateSrc(src, isHttps)) mixedContentCount++;
  });
  push(
    'mixed-content',
    'Content quality',
    'Mixed content',
    mixedContentCount === 0 ? 'pass' : 'fail',
    mixedContentCount === 0
      ? 'No plain HTTP resources were found loading on this HTTPS page.'
      : `${mixedContentCount} resource${mixedContentCount === 1 ? '' : 's'} load over plain HTTP on an HTTPS page. Browsers often block these outright, which can mean broken images or styling for visitors.`,
  );

  // ── Speed signals ─────────────────────────────────────────────────
  const kb = Math.round(input.byteSize / 1024);
  if (kb < 500) {
    push('page-weight', 'Speed signals', 'HTML page weight', 'pass', `The HTML document is ${kb} KB, which is a reasonable size for a page to send down before anything else loads.`);
  } else if (kb < 1200) {
    push('page-weight', 'Speed signals', 'HTML page weight', 'warn', `The HTML document is ${kb} KB. That is on the heavier side for HTML alone, before images or scripts are even counted.`);
  } else {
    push('page-weight', 'Speed signals', 'HTML page weight', 'fail', `The HTML document is ${kb} KB, which is large for markup alone. Something is likely being inlined into the page that should be a separate file.`);
  }

  const seconds = input.timeMs / 1000;
  if (seconds < 0.8) {
    push('response-time', 'Speed signals', 'Server response time', 'pass', `The server sent back the page in ${seconds.toFixed(2)} seconds, which is a fast first response.`);
  } else if (seconds < 1.8) {
    push('response-time', 'Speed signals', 'Server response time', 'warn', `The server took ${seconds.toFixed(2)} seconds to respond. Visitors are looking at a blank tab for that whole stretch before anything can render.`);
  } else {
    push('response-time', 'Speed signals', 'Server response time', 'fail', `The server took ${seconds.toFixed(2)} seconds to respond. That is slow enough that a real visitor is likely to leave before the page even starts loading.`);
  }

  let blockingScripts = 0;
  $('head script[src]').each((_, el) => {
    const $el = $(el);
    if ($el.attr('async') === undefined && $el.attr('defer') === undefined && $el.attr('type') !== 'module') {
      blockingScripts++;
    }
  });
  push(
    'render-blocking',
    'Speed signals',
    'Render blocking scripts',
    blockingScripts === 0 ? 'pass' : blockingScripts <= 2 ? 'warn' : 'fail',
    blockingScripts === 0
      ? 'No render blocking scripts were found in the head. The browser can start drawing the page without waiting on external files first.'
      : `${blockingScripts} script${blockingScripts === 1 ? '' : 's'} in the head can block rendering because they load without the async or defer attribute. The page cannot start painting until each one finishes downloading and running.`,
  );

  return results;
}

export function scoreOf(results: CheckResult[]): { score: number; max: number; percent: number } {
  const score = results.reduce((sum, r) => sum + SCORE[r.status], 0);
  const max = results.length;
  return { score, max, percent: Math.round((score / max) * 100) };
}

export function summarize(results: CheckResult[]) {
  return {
    pass: results.filter((r) => r.status === 'pass').length,
    warn: results.filter((r) => r.status === 'warn').length,
    fail: results.filter((r) => r.status === 'fail').length,
  };
}
