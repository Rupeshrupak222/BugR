import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { once } from 'node:events';
import { chromium } from '@playwright/test';
const path = 'C:/Users/vishw/AppData/Local/Packages/Microsoft.ScreenSketch_8wekyb3d8bbwe/TempState/Recordings/20261112-0646-15.0862650.mp4';
const data = await readFile(path);
const server = createServer((req,res) => {
  if(req.url === '/video') { const match = /bytes=(\d+)-(\d*)/.exec(req.headers.range || ''); if(match) {const start = +match[1], end = match[2] ? +match[2] : data.length-1; res.writeHead(206, {'Content-Type':'video/mp4','Content-Range':`bytes ${start}-${end}/${data.length}`,'Accept-Ranges':'bytes'});res.end(data.subarray(start,end+1));} else {res.writeHead(200,{'Content-Type':'video/mp4','Content-Length':data.length});res.end(data);} }
  else {res.writeHead(200, {'Content-Type':'text/html'});res.end('<video src="/video" muted preload="auto"></video>');}
}).listen(0,'127.0.0.1');
await once(server,'listening');
const browser=await chromium.launch({channel:'chrome'});
try {
 const page=await browser.newPage(); await page.goto('http://127.0.0.1:'+server.address().port);
 const result = await page.evaluate(async () => {
  const video=document.querySelector('video'); if(video.readyState<2) await new Promise(resolve=>video.addEventListener('loadeddata',resolve,{once:true}));
  const canvas=document.createElement('canvas'); canvas.width=1440;canvas.height=3*460; const ctx=canvas.getContext('2d');ctx.fillStyle='#222';ctx.fillRect(0,0,canvas.width,canvas.height);
  for(let i=0;i<6;i++){ const time=Math.max(.1,(video.duration-.3)*i/5);video.currentTime=time;await new Promise(resolve=>video.addEventListener('seeked',resolve,{once:true})); const x=i%2*720,y=Math.floor(i/2)*460;ctx.drawImage(video,x,y,720,430);ctx.fillStyle='#fff';ctx.font='18px sans-serif';ctx.fillText(time.toFixed(1)+' seconds',x+12,y+451); }
  return {duration:video.duration,width:video.videoWidth,height:video.videoHeight,png:canvas.toDataURL('image/png').split(',')[1]};
 });
 await writeFile('test-results/reference/contact-sheet.png',Buffer.from(result.png,'base64'));delete result.png;console.log(result);
}finally{await browser.close();server.close();}
