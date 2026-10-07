import test from 'node:test';
import assert from 'node:assert/strict';
import { execute } from './cli.mjs';
const forbidden = () => { throw new Error('External operation forbidden'); };
test('publication lock ignores externally enabled modes before any HTTP or state path access', async () => {
  for (const INDEXNOW_MODE of ['dry-run','baseline','single-url','submit']) {
    const result=await execute({env:{INDEXNOW_ENABLED:'true',INDEXNOW_MODE,INDEXNOW_RELEASE:'a'.repeat(40),INDEXNOW_STATE_PATH:'/unavailable/state.json'},fetcher:forbidden});
    assert.match(result.skipped,/Publication locked/);
  }
});
test('missing or malformed external configuration cannot unlock publication',async()=>{
  for(const env of [{},{INDEXNOW_ENABLED:'true',INDEXNOW_MODE:'invalid',INDEXNOW_RELEASE:'invalid'}])assert.match((await execute({env,fetcher:forbidden})).skipped,/Publication locked/);
});
