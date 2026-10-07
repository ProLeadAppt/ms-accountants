import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadState, saveState, snapshot, getText, run } from './core.mjs';
import { host } from './site.mjs';

export async function execute({ env = process.env, fetcher = fetch } = {}) {
  const mode = env.INDEXNOW_MODE || 'dry-run';
  if (!['dry-run', 'baseline', 'single-url', 'submit'].includes(mode)) throw new Error('Unsupported mode');
  if (['single-url', 'submit'].includes(mode) && (env.INDEXNOW_ENABLED !== 'true' || !/^[a-zA-Z0-9-]{8,128}$/.test(env.INDEXNOW_PUBLIC_KEY || '') || /placeholder|example|your.?key|test.?key/i.test(env.INDEXNOW_PUBLIC_KEY || ''))) throw new Error('Live sender is disabled or missing/invalid public key');
  const release = env.INDEXNOW_RELEASE;
  if (!/^[a-f0-9]{40}$/.test(release || '')) throw new Error('Exact deployed release SHA required');
  // A published build marker prevents queued/old deployment events from indexing a newer release.
  const marker = await getText(`https://${host}/.well-known/indexnow-release.json`, fetcher);
  const published = JSON.parse(marker.text);
  if (published.host !== host || published.release !== release) throw new Error('Published release marker mismatch');
  const path = env.INDEXNOW_STATE_PATH || '.indexnow/state.json';
  let state;
  try { state = await loadState(path, host); }
  catch (error) { if (error.code !== 'ENOENT' || mode !== 'baseline') throw error; }
  const current = await snapshot(host, fetcher);
  const checked = JSON.parse((await getText(`https://${host}/.well-known/indexnow-release.json`, fetcher)).text);
  if (checked.host !== host || checked.release !== release) throw new Error('Release changed during snapshot; nothing submitted');
  return run({ host, release, state, current, mode, key: env.INDEXNOW_PUBLIC_KEY, testUrl: env.INDEXNOW_TEST_URL, fetcher, persist: (next) => saveState(path, next) });
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  execute().then(result => console.log(JSON.stringify(result))).catch(error => {
    // Deliberately avoid raw request/response bodies, credential values or URLs from errors.
    console.error(`IndexNow stopped: ${error.code === 'ENOENT' ? 'accepted state missing' : error.message}`);
    process.exitCode = 1;
  });
}
