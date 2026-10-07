import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { host } from './site.mjs';

function restore({ artifact=true, pending=false }={}) {
  const root=mkdtempSync(join(tmpdir(),'indexnow-artifact-test-'));
  const state={version:1,host,release:'a'.repeat(40),pages:{},receipts:[],...(pending?{pending:{id:'a'.repeat(64)}}:{})};
  const fixtures={artifacts:{artifacts:artifact?[{id:1,expired:false,workflow_run:{id:1}}]:[]},runs:{workflow_runs:[{id:2,event:'workflow_dispatch'},{id:1,event:'deployment_status'}]},jobs:{jobs:[{name:'production',conclusion:'failure'}]},producer:{path:'.github/workflows/indexnow-production.yml',event:'deployment_status'}};
  for(const [name,value]of Object.entries(fixtures))writeFileSync(join(root,name+'.json'),JSON.stringify(value));
  writeFileSync(join(root,'fixture-state.json'),JSON.stringify(state));
  // This local gh stand-in never contacts GitHub; exercise the actual executable restore script.
  writeFileSync(join(root,'gh'),`#!/bin/sh
if [ "$1" = "run" ]; then mkdir -p .indexnow; cp "$FIXTURE_ROOT/fixture-state.json" .indexnow/state.json; exit 0; fi
case "$2" in
  *actions/artifacts*) cat "$FIXTURE_ROOT/artifacts.json";;
  *workflows/indexnow-production.yml/runs*) cat "$FIXTURE_ROOT/runs.json";;
  *actions/runs/1/jobs*) cat "$FIXTURE_ROOT/jobs.json";;
  *actions/runs/1) cat "$FIXTURE_ROOT/producer.json";;
  *) exit 1;;
esac
`,{mode:0o700});
  const result=spawnSync(process.execPath,[resolve('scripts/indexnow/restore-state.mjs')],{cwd:root,encoding:'utf8',env:{...process.env,PATH:root+':'+process.env.PATH,GITHUB_REPOSITORY:'owner/repository',GITHUB_RUN_ID:'2',INDEXNOW_MODE:'dry-run',FIXTURE_ROOT:root}});
  let restored;try{restored=JSON.parse(readFileSync(join(root,'.indexnow/state.json'),'utf8'));}catch{}
  rmSync(root,{recursive:true,force:true});return {result,restored};
}
test('restore pending state from a failed run rather than older successful receipt',()=>{
  const {result,restored}=restore({pending:true});assert.equal(result.status,0,result.stderr);assert.ok(restored.pending);
});
test('latest operational run without durable artifact fails closed instead of repeating POST',()=>{
  const {result,restored}=restore({artifact:false});assert.notEqual(result.status,0);assert.match(result.stderr,/manual reconciliation/);assert.equal(restored,undefined);
});
