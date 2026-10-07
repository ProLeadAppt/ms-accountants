import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { host } from './site.mjs';
const release = process.env.VERCEL_GIT_COMMIT_SHA || process.env.COMMIT_REF || execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
if (!/^[a-f0-9]{40}$/.test(release)) throw new Error('No valid source SHA for public release marker');
mkdirSync('public/.well-known', { recursive: true });
writeFileSync('public/.well-known/indexnow-release.json', JSON.stringify({ host, release }) + '\n');
