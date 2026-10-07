import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { canonical, fingerprint, snapshot, run, saveState, loadState } from './core.mjs';
import { host } from './site.mjs';
const release = 'a'.repeat(40), url = path => `https://${host}/${path}`;
const initial = pages => ({ version: 1, host, release, pages, receipts: [] });
const hash = 'b'.repeat(64), key = 'approved-public-verification-1234'; // Test fixture only; never written as a public file.
const page = (address, text = 'content') => `<html><link rel="canonical" href="${address}"><body>${text}</body></html>`;
const response = (body, status = 200, type = 'text/plain') => new Response(body, { status, headers: { 'content-type': type } });

test('reject foreign hosts, schemes, ports, user-info and query; deduplicate fragments', () => {
  for (const address of ['http://'+host+'/a','ftp://'+host+'/a','https://u:p@'+host+'/a','https://'+host+':444/a','https://other.example/a','https://'+host+'/a?q=1']) assert.throws(() => canonical(address, host));
  assert.equal(canonical(url('a#frag'), host), url('a'));
});
test('stable rendered fingerprint ignores hydration but tracks content/canonical/noindex', () => {
  assert.equal(fingerprint(page(url('a'))+'<script>build1</script>', url('a')), fingerprint(page(url('a'))+'<script>build2</script>', url('a')));
  assert.notEqual(fingerprint(page(url('a')), url('a')), fingerprint(page(url('a'), 'updated'), url('a')));
  assert.throws(() => fingerprint(page(url('b')), url('a')));
  assert.throws(() => fingerprint(page(url('a'))+'<meta name="robots" content="noindex">', url('a')));
  assert.equal(fingerprint(page(url('a')),url('a')),fingerprint(`<link href="${url('a')}" rel="canonical"><body>content</body>`,url('a')));
  assert.notEqual(fingerprint(page(url('a'))+'<script type="application/ld+json">{"name":"before"}</script>',url('a')),fingerprint(page(url('a'))+'<script type="application/ld+json">{"name":"after"}</script>',url('a')));
});
test('recurse page sitemap index, ignore image/LLM indexes and dedupe fragments', async () => {
  const requests=[];
  const fetcher=async address => {
    requests.push(address);
    if (address===url('sitemap.xml')) return response(`<sitemapindex><sitemap><loc>${url('sitemap-pages.xml')}</loc></sitemap><sitemap><loc>${url('sitemap-images.xml')}</loc></sitemap></sitemapindex>`,200,'application/xml');
    if (address===url('sitemap-pages.xml')) return response(`<urlset><url><loc>${url('a#one')}</loc><image:loc>https://other.example/photo</image:loc></url><url><loc>${url('a#two')}</loc></url></urlset>`,200,'application/xml');
    return response(page(address),200,'text/html');
  };
  assert.deepEqual(Object.keys(await snapshot(host,fetcher)),[url('a')]);
  assert.equal(requests.length,3);
});
test('snapshot rejects cross-host sitemaps, non-page URLs and redirects', async () => {
  await assert.rejects(snapshot(host,async()=>response('<sitemapindex><sitemap><loc>https://other.example/sitemap.xml</loc></sitemap></sitemapindex>')));
  await assert.rejects(snapshot(host,async()=>response(`<urlset><url><loc>${url('photo.jpg')}</loc></url></urlset>`)));
  await assert.rejects(snapshot(host,async()=>response('',308)));
});
test('dry-run selects changed/added, holds removals, never POSTs or persists', async () => {
  const result=await run({host,release,state:initial({[url('same')]:hash,[url('changed')]:hash,[url('gone')]:hash}),current:{[url('same')]:hash,[url('changed')]:'c'.repeat(64),[url('new')]:hash},fetcher:()=>{throw Error('No network');},persist:()=>{throw Error('No write');}});
  assert.deepEqual(result.changed,[url('changed'),url('new')]);assert.deepEqual(result.heldRemovals,[url('gone')]);assert.equal(result.notifications,0);
});
test('missing state stops before network', async () => {
  let calls=0;const fetcher=async()=>{calls++;};
  await assert.rejects(run({host,release,current:{},mode:'submit',key,fetcher}));
  assert.equal(calls,0);
});
test('baseline is explicit observation only, cannot overwrite accepted state', async () => {
  let saved;const args={host,release,current:{[url('a')]:hash},mode:'baseline',fetcher:()=>{throw Error('No network');},persist:next=>{saved=next;}};
  assert.equal((await run(args)).notifications,0);assert.equal(saved.pages[url('a')],hash);
  await assert.rejects(run({...args,state:saved}));
});
for(const status of [200,202]) test(`receipt${status} persisted; identical retry produces no POST`,async()=>{
  let saved,posts=0;
  const fetcher=async(address,init)=>{if(init?.method==='POST'){posts++;const sent=JSON.parse(init.body);assert.equal(sent.host,host);assert.deepEqual(sent.urlList,[url('a')]);return response('',status);}return response(key);};
  const args={host,release,state:initial({}),current:{[url('a')]:hash},mode:'submit',key,fetcher,persist:next=>{saved=structuredClone(next);}};
  const result=await run(args);assert.equal(result.submitted,1);assert.equal(result.validationPending,status===202);assert.equal(saved.pending,null);
  assert.equal((await run({...args,state:saved})).submitted,0);assert.equal(posts,1);
});
test('ambiguous POST leaves durable intent and prohibits unattended retry',async()=>{
  let saved,posts=0;const args={host,release,state:initial({}),current:{[url('a')]:hash},mode:'submit',key,fetcher:async(_address,init)=>{if(init?.method==='POST'){posts++;throw Error('timeout');}return response(key);},persist:next=>{saved=structuredClone(next);}};
  await assert.rejects(run(args));assert.ok(saved.pending.id);
  await assert.rejects(run({...args,state:saved}),/Unreconciled/);assert.equal(posts,1);
});
test('failed receipt does not advance fingerprint and holds further retry',async()=>{
  let saved;await assert.rejects(run({host,release,state:initial({}),current:{[url('a')]:hash},mode:'submit',key,fetcher:async(_a,i)=>response(i?.method==='POST'?'':key,i?.method==='POST'?429:200),persist:next=>{saved=structuredClone(next);}}));
  assert.equal(saved.pages[url('a')],undefined);assert.ok(saved.pending);
});
test('verified404/410 removals included; redirects held; one-URL tests exclude all others',async()=>{
  const posted=[];const fetcher=async(address,init)=>{if(init?.method==='POST'){posted.push(...JSON.parse(init.body).urlList);return response('',200);}if(address===url('gone'))return response('',410);if(address===url('held'))return response('',301);return response(key);};
  await run({host,release,state:initial({[url('gone')]:hash,[url('held')]:hash}),current:{[url('a')]:hash},mode:'submit',key,fetcher});assert.deepEqual(posted,[url('a'),url('gone')]);
  posted.length=0;await run({host,release,state:initial({[url('gone')]:hash}),current:{[url('a')]:hash,[url('b')]:hash},mode:'single-url',testUrl:url('a'),key,fetcher});assert.deepEqual(posted,[url('a')]);
});
test('keyfile HTML, redirects and invalid content never POST',async()=>{
  for(const [body,status,type] of [[key,200,'text/html'],[key,308,'text/plain'],['<invalid>',200,'text/plain']]){
    let posts=0;await assert.rejects(run({host,release,state:initial({}),current:{[url('a')]:hash},mode:'submit',key,fetcher:async(_a,i)=>{if(i?.method==='POST')posts++;return response(body,status,type);}}));assert.equal(posts,0);
  }
});
test('state survives process restart with atomic file write and host validation',async()=>{
  const directory=await mkdtemp(join(tmpdir(),'indexnow-state-test-'));
  try{const path=join(directory,'state.json');const state=initial({[url('a')]:hash});await saveState(path,state);assert.deepEqual(await loadState(path,host),state);assert.ok((await readFile(path,'utf8')).includes(host));await assert.rejects(loadState(path,'other.example'));}finally{await rm(directory,{recursive:true});}
});

// Verification source is deliberately public; no environment key or key-file placeholder.
test('strict public key reader accepts only allowlisted path and bounded plain ASCII content', async () => {
  const { readPublicKey } = await import('./core.mjs');
  for (const ending of ['', '\n', '\r\n']) {
    const result = await readPublicKey(host, async (address, options) => {
      assert.equal(address, `https://${host}/indexnow-key.txt`); assert.equal(options.redirect, 'manual');
      return response(key + ending, 200, 'text/plain; charset=utf-8');
    });
    assert.equal(result.key, key); assert.equal(result.keyLocation, `https://${host}/indexnow-key.txt`);
  }
  await assert.rejects(readPublicKey('other.example', () => { throw Error('No network'); }), /Unapproved/);
  for (const body of ['', 'short', ' leading-key-1234', key + '\n\n', 'x'.repeat(129), '\ufeff' + key, 'placeholder123', '<html>key12345</html>']) {
    await assert.rejects(readPublicKey(host, async () => response(body)), /verification|Placeholder/);
  }
  for (const type of ['text/html', 'text/plain; charset=iso-8859-1', 'application/octet-stream']) {
    await assert.rejects(readPublicKey(host, async () => response(key, 200, type)), /response/);
  }
  await assert.rejects(readPublicKey(host, async () => new Response(new Uint8Array([255]), {headers:{'content-type':'text/plain'}})));
  await assert.rejects(readPublicKey(host, async () => new Response(key, {headers:{'content-type':'text/plain','content-length':'131'}})), /large/);
});

test('approved draft file is the sole public key source; supplied configuration cannot override it', async () => {
  const actual = await readFile(new URL('../../public/indexnow-key.txt', import.meta.url), 'utf8');
  assert.match(actual, /^[a-f0-9]{64}\n$/);
  let posts = 0;
  await run({host, release, state:initial({}), current:{[url('a')]:hash}, mode:'single-url', testUrl:url('a'), key:'ignored-configuration-1234', fetcher:async(address, options) => {
    if (options?.method === 'POST') { posts++; const body = JSON.parse(options.body); assert.equal(body.key, actual.trim()); assert.equal(body.keyLocation, `https://${host}/indexnow-key.txt`); return response('', 202); }
    assert.equal(address, `https://${host}/indexnow-key.txt`); return response(actual);
  }});
  assert.equal(posts, 1);
});
