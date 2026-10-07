import test from 'node:test';
import assert from 'node:assert/strict';
import { execute } from './cli.mjs';
test('live CLI rejects disabled/missing-key before all requests',async()=>{
  let requests=0;const fetcher=async()=>{requests++;throw Error('unexpected');};
  for(const env of [{INDEXNOW_MODE:'submit'},{INDEXNOW_MODE:'single-url',INDEXNOW_ENABLED:'true'}])await assert.rejects(execute({env,fetcher}),/disabled|missing/);
  assert.equal(requests,0);
});
test('CLI rejects missing release and mismatched public release marker',async()=>{
  await assert.rejects(execute({env:{},fetcher:()=>{throw Error('No network');}}),/release/);
  await assert.rejects(execute({env:{INDEXNOW_RELEASE:'a'.repeat(40)},fetcher:async()=>new Response(JSON.stringify({host:'other.example',release:'a'.repeat(40)}))}),/mismatch/);
});
