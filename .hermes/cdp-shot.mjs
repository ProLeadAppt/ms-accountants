import fs from "node:fs/promises";

const [url, output, widthRaw = "1440", heightRaw = "1100", scrollTarget = ""] = process.argv.slice(2);
if (!url || !output) throw new Error("Usage: cdp-shot.mjs <url> <output> [width] [height] [selector]");
const width = Number(widthRaw);
const height = Number(heightRaw);

const created = await fetch(`http://127.0.0.1:9223/json/new?${encodeURIComponent(url)}`, { method: "PUT" }).then((r) => r.json());
const ws = new WebSocket(created.webSocketDebuggerUrl);
let sequence = 0;
const pending = new Map();
ws.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  }
});
await new Promise((resolve, reject) => {
  ws.addEventListener("open", resolve, { once: true });
  ws.addEventListener("error", reject, { once: true });
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++sequence;
  pending.set(id, { resolve, reject });
  ws.send(JSON.stringify({ id, method, params }));
});

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width,
  height,
  deviceScaleFactor: 1,
  mobile: width < 600,
  screenWidth: width,
  screenHeight: height,
});
await send("Emulation.setEmulatedMedia", {
  features: [{ name: "prefers-reduced-motion", value: "reduce" }],
});
await send("Page.navigate", { url });
await new Promise((resolve) => setTimeout(resolve, 2500));
await send("Runtime.evaluate", {
  expression: `(()=>{document.documentElement.classList.add('preloader-done');document.querySelectorAll('[data-anim]').forEach((el)=>el.classList.add('is-visible'));${scrollTarget ? `const target=document.querySelector(${JSON.stringify(scrollTarget)});if(target){window.scrollTo(0,target.getBoundingClientRect().top+window.scrollY-24);}` : ""}return true;})()`,
  awaitPromise: true,
});
await new Promise((resolve) => setTimeout(resolve, 800));
const metrics = await send("Runtime.evaluate", {
  expression: `JSON.stringify({title:document.title,url:location.href,innerWidth,innerHeight,scrollWidth:document.documentElement.scrollWidth,scrollHeight:document.documentElement.scrollHeight,bodyScrollWidth:document.body.scrollWidth,preloader:document.querySelector('#ms-preloader')?getComputedStyle(document.querySelector('#ms-preloader')).display:null})`,
  returnByValue: true,
});
const shot = await send("Page.captureScreenshot", {
  format: "png",
  fromSurface: true,
  captureBeyondViewport: false,
});
await fs.mkdir(new URL(".", `file:///${output.replaceAll("\\", "/")}`).pathname, { recursive: true }).catch(() => {});
await fs.writeFile(output, Buffer.from(shot.data, "base64"));
console.log(metrics.result.value);
console.log(`WROTE ${output} ${Buffer.byteLength(shot.data, "base64")} bytes`);
await fetch(`http://127.0.0.1:9223/json/close/${created.id}`);
ws.close();
