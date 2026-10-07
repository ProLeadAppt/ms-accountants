import { createHash } from 'node:crypto';
import { readFile, writeFile, rename, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

export const digest = (text) => createHash('sha256').update(text).digest('hex');
export function canonical(raw, host) {
  const url = new URL(raw);
  if (url.protocol !== 'https:' || url.host !== host || url.username || url.password || url.search) throw new Error('Invalid canonical host/protocol/credentials/query');
  url.hash = '';
  return url.href;
}
export function fingerprint(html, url) {
  const attr = (tag, name) => tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, 'i'))?.[1];
  const declared = [...html.matchAll(/<link\b[^>]*>/gi)].map(m => m[0]).find(tag => attr(tag, 'rel') === 'canonical');
  const canonicalHref = declared && attr(declared, 'href');
  if (canonicalHref !== url && canonicalHref !== url.replace(/\/$/, '')) throw new Error('Page canonical mismatch');
  const tags = [...html.matchAll(/<meta\b[^>]*>/gi)].map(m => m[0]);
  if (tags.some(tag => attr(tag, 'name') === 'robots' && /noindex/i.test(attr(tag, 'content') || ''))) throw new Error('Page is noindex');
  const schema = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].filter(m => /application\/ld\+json/i.test(m[1])).map(m => JSON.parse(m[2]));
  // Ignore hydration/build IDs, CSS and scripts; retain rendered text + metadata + links.
  const cleaned = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '');
  const text = cleaned.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const meta = tags.map(tag => [attr(tag, 'name') || attr(tag, 'property'), attr(tag, 'content')]).filter(([name, content]) => name && content).sort();
  const links = [...cleaned.matchAll(/<(?:a|img)\b[^>]*(?:href|alt)=["']([^"']*)["']/gi)].map(m => m[1]).sort();
  return digest(JSON.stringify({ text, meta, links, schema }));
}
export async function getText(url, fetcher) {
  const r = await fetcher(url, { redirect: 'manual', signal: AbortSignal.timeout(20000) });
  if (r.status !== 200) throw new Error(`Public GET status ${r.status}`);
  if (/noindex/i.test(r.headers.get('x-robots-tag') || '')) throw new Error('HTTP noindex');
  return { text: await r.text(), type: r.headers.get('content-type') || '' };
}
export async function snapshot(host, fetcher = fetch) {
  const sitemapQueue = [`https://${host}/sitemap.xml`], visited = new Set(), pages = new Set();
  while (sitemapQueue.length) {
    const sitemap = sitemapQueue.shift();
    if (visited.has(sitemap)) continue;
    visited.add(sitemap);
    if (visited.size > 30) throw new Error('Sitemap count exceeds bound');
    const { text } = await getText(canonical(sitemap, host), fetcher);
    if (/<sitemapindex\b/i.test(text)) {
      for (const m of text.matchAll(/<sitemap\b[^>]*>([\s\S]*?)<\/sitemap>/gi)) {
        const loc = m[1].match(/<loc>([^<]+)<\/loc>/)?.[1];
        if (!loc) throw new Error('Invalid sitemap entry');
        // Non-page sitemaps are not notification candidates.
        if (/sitemap-(?:images|llms)\.xml$/.test(loc)) continue;
        sitemapQueue.push(canonical(loc, host));
      }
    } else if (/<urlset\b/i.test(text)) {
      for (const m of text.matchAll(/<url\b[^>]*>([\s\S]*?)<\/url>/gi)) {
        const loc = m[1].match(/<loc>([^<]+)<\/loc>/)?.[1];
        if (!loc) throw new Error('Invalid page entry');
        const url = canonical(loc.replace(/&amp;/g, '&'), host);
        if (/\.(?:xml|jpg|jpeg|png|webp|svg|pdf)$/i.test(new URL(url).pathname)) throw new Error('Non-page URL in page sitemap');
        pages.add(url);
      }
    } else throw new Error('Not sitemap XML');
  }
  if (!pages.size || pages.size > 1500) throw new Error('Page count outside bound');
  const output = {};
  for (const url of [...pages].sort()) {
    const { text, type } = await getText(url, fetcher);
    if (!/text\/html/i.test(type)) throw new Error('Expected canonical HTML');
    output[url] = fingerprint(text, url);
  }
  return output;
}
export function validateState(state, host) {
  if (!state || state.version !== 1 || state.host !== host || !state.pages || typeof state.pages !== 'object' || !Array.isArray(state.receipts)) throw new Error('Missing or invalid accepted state');
  for (const [url, hash] of Object.entries(state.pages)) {
    if (canonical(url, host) !== url || !/^[a-f0-9]{64}$/.test(hash)) throw new Error('Invalid accepted manifest');
  }
  if (state.receipts.some(r => !/^[a-f0-9]{64}$/.test(r.id) || ![200, 202].includes(r.status))) throw new Error('Invalid receipt ledger');
  if (state.pending && !/^[a-f0-9]{64}$/.test(state.pending.id)) throw new Error('Invalid pending receipt');
  return state;
}
export function selectDelta(state, current, host) {
  validateState(state, host);
  if (state.pending) throw new Error('Unreconciled notification intent; manual receipt reconciliation required');
  const changed = Object.keys(current).filter(url => state.pages[url] !== current[url]);
  return { changed, removed: Object.keys(state.pages).filter(url => !Object.hasOwn(current, url)) };
}
export async function verifyKey(host, key, fetcher = fetch) {
  if (!key || !/^[a-zA-Z0-9-]{8,128}$/.test(key) || /placeholder|example|your.?key|test.?key/i.test(key)) throw new Error('Missing or invalid public verification key');
  const keyLocation = `https://${host}/indexnow-key.txt`;
  const { text, type } = await getText(keyLocation, fetcher);
  if (!/text\/plain/i.test(type) || text.trim() !== key) throw new Error('Public verification file mismatch');
  return keyLocation;
}
export async function sendBatch({ host, key, keyLocation, urls, fetcher = fetch }) {
  if (keyLocation !== `https://${host}/indexnow-key.txt` || !key || !/^[a-zA-Z0-9-]{8,128}$/.test(key)) throw new Error('Invalid key configuration');
  if (!urls.length || urls.length > 500) throw new Error('Invalid batch size');
  const list = [...new Set(urls.map(u => canonical(u, host)))].sort();
  const r = await fetcher('https://api.indexnow.org/indexnow', { method: 'POST', redirect: 'error', signal: AbortSignal.timeout(20000), headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify({ host, key, keyLocation, urlList: list }) });
  if (![200, 202].includes(r.status)) throw new Error(`IndexNow receipt status ${r.status}; no automatic retry`);
  return { status: r.status, validationPending: r.status === 202 };
}
export async function saveState(path, state) {
  await mkdir(dirname(path), { recursive: true });
  const temp = `${path}.tmp-${process.pid}`;
  await writeFile(temp, JSON.stringify(state, null, 2) + '\n', { flag: 'wx' });
  await rename(temp, path);
}
export async function loadState(path, host) { return validateState(JSON.parse(await readFile(path, 'utf8')), host); }

export async function run({ host, release, state, current, mode = 'dry-run', key, testUrl, fetcher = fetch, persist = async () => {} }) {
  if (!/^[a-f0-9]{40}$/.test(release)) throw new Error('Exact production SHA required');
  validateState({ version: 1, host, pages: current, receipts: [] }, host);
  // Key absence stops before any network in live modes; dry-run needs no key.
  if (mode !== 'dry-run' && mode !== 'baseline' && (!key || !/^[a-zA-Z0-9-]{8,128}$/.test(key))) throw new Error('Missing public verification key');
  if (mode === 'baseline') {
    if (state) throw new Error('Baseline already exists; cannot silently overwrite');
    const seeded = { version: 1, host, release, pages: current, receipts: [] };
    validateState(seeded, host); await persist(seeded);
    return { mode, baselineCount: Object.keys(current).length, notifications: 0 };
  }
  if (!state) throw new Error('Accepted baseline missing; explicit baseline approval required');
  validateState(state, host);
  const { changed, removed } = selectDelta(state, current, host);
  const verifiedRemoved = [], heldRemovals = [];
  for (const url of mode === 'single-url' ? [] : removed) {
    if (mode === 'dry-run') { heldRemovals.push(url); continue; }
    const response = await fetcher(url, { redirect: 'manual', signal: AbortSignal.timeout(20000) });
    if ([404, 410].includes(response.status)) verifiedRemoved.push(url);
    else heldRemovals.push(url); // Redirect/replacement decisions need separate review.
  }
  const candidates = mode === 'single-url' ? [canonical(testUrl, host)] : [...new Set([...changed, ...verifiedRemoved])].sort();
  if (mode === 'single-url' && !Object.hasOwn(current, candidates[0])) throw new Error('Single test URL is not in current canonical snapshot');
  if (mode === 'dry-run') return { mode, changed, heldRemovals, notifications: 0 };
  if (!['submit', 'single-url'].includes(mode)) throw new Error('Unsupported mode');
  const keyLocation = await verifyKey(host, key, fetcher);
  const next = structuredClone(state);
  let submitted = 0;
  for (let offset = 0; offset < candidates.length; offset += 500) {
    const urls = candidates.slice(offset, offset + 500);
    const id = digest(JSON.stringify({ host, release, urls, fingerprints: urls.map(url => current[url] || 'removed') }));
    if (next.receipts.some(receipt => receipt.id === id)) continue;
    next.pending = { id, count: urls.length, release };
    await persist(next); // A failed/ambiguous POST never automatically repeats.
    const receipt = await sendBatch({ host, key, keyLocation, urls, fetcher });
    next.pending = null;
    next.receipts.push({ id, ...receipt, count: urls.length });
    for (const url of urls) {
      if (current[url]) next.pages[url] = current[url]; else delete next.pages[url];
    }
    next.release = release;
    await persist(next); // Save each receipt before processing the next batch.
    submitted += urls.length;
  }
  return { mode, submitted, heldRemovals, validationPending: next.receipts.some(r => r.validationPending) };
}
