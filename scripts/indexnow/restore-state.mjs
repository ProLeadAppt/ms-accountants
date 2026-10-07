import { execFileSync } from 'node:child_process';
import { readFileSync, mkdirSync } from 'node:fs';
import { host } from './site.mjs';
import { validateState } from './core.mjs';

// Existing GitHub Actions artifact storage; no external database/token/service.
// Restore the newest artifact even from a failed run: it may contain a pending POST.
const repo = process.env.GITHUB_REPOSITORY;
if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo || '')) throw new Error('Invalid repository');
const jsonApi = path => JSON.parse(execFileSync('gh', ['api', path], { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 }));
let artifacts = [];
for (let page = 1; page <= 20; page++) {
  const result = jsonApi(`repos/${repo}/actions/artifacts?per_page=100&page=${page}&name=indexnow-state`);
  artifacts.push(...result.artifacts);
  if (result.artifacts.length < 100) break;
  if (page === 20) throw new Error('Artifact history exceeds safe scan bound');
}
artifacts = artifacts.filter(a => !a.expired).sort((a, b) => b.id - a.id);
const recent = jsonApi(`repos/${repo}/actions/workflows/indexnow-production.yml/runs?per_page=100`).workflow_runs;
// If an operational run crashed before uploading its pending intent, an older artifact is unsafe.
// Do not silently restore it and repeat a possibly accepted notification.
for (const producer of recent) {
  if (String(producer.id) === process.env.GITHUB_RUN_ID || producer.event === 'pull_request') continue;
  const jobs = jsonApi(`repos/${repo}/actions/runs/${producer.id}/jobs?per_page=100`).jobs;
  const operational = jobs.find(job => job.name === 'production' && job.conclusion !== 'skipped');
  if (!operational) continue;
  if (!artifacts.some(a => a.workflow_run.id === producer.id)) throw new Error('Latest operational run has no retained state; manual reconciliation required');
  break;
}
let selected;
for (const artifact of artifacts) {
  const producer = jsonApi(`repos/${repo}/actions/runs/${artifact.workflow_run.id}`);
  if (producer.path === '.github/workflows/indexnow-production.yml' && producer.event !== 'pull_request') { selected = artifact; break; }
}
mkdirSync('.indexnow', { recursive: true });
if (selected) {
  execFileSync('gh', ['run', 'download', String(selected.workflow_run.id), '--repo', repo, '--name', 'indexnow-state', '--dir', '.indexnow']);
  const state = JSON.parse(readFileSync('.indexnow/state.json', 'utf8'));
  validateState(state, host);
} else if (process.env.INDEXNOW_MODE !== 'baseline') throw new Error('No retained accepted-state artifact; approved baseline required');
