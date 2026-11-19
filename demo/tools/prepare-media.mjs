import { spawn } from 'node:child_process';
import { mkdir, rename, stat, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const ffmpeg=resolve('test-results/media-tools/node_modules/@ffmpeg-installer/win32-x64/ffmpeg.exe');
async function run(args){await new Promise((ok,no)=>{const p=spawn(ffmpeg,['-hide_banner','-loglevel','error','-y',...args]);let stderr='';p.stderr.on('data',d=>stderr+=d);p.on('error',no);p.on('exit',c=>c===0?ok():no(Error(stderr)));});}
await mkdir('test-results/reference/original-videos',{recursive:true});
for(const name of ['hero','approach','philosophy','students','companies']){
 const original='test-results/reference/original-videos/'+name+'.mp4', output='demo/public/assets/landing/'+name+'.mp4';
 await rename(output,original);
 await run(['-i',original,'-vf','scale=1280:-2,fps=24,hue=s=0,colorchannelmixer=rr=1:gg=0.55:bb=0.22','-c:v','libx264','-preset','medium','-crf','28','-an','-movflags','+faststart',output]);
 await run(['-ss','1.5','-i',output,'-frames:v','1','-quality','78','demo/public/assets/landing/'+name+'.webp']);
 console.log(name,{video:(await stat(output)).size,poster:(await stat('demo/public/assets/landing/'+name+'.webp')).size});
}
for(const [style,url] of [['regular','https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-2zI.ttf'],['italic','https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zATiw.ttf']]){
 const response=await fetch(url);if(!response.ok)throw Error('Font '+response.status);await writeFile('demo/public/assets/landing/instrument-serif-'+style+'.ttf',Buffer.from(await response.arrayBuffer()));
}
