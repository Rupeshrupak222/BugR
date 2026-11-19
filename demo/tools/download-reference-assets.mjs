import { mkdir, writeFile } from 'node:fs/promises';
const base='https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/';
const assets={hero:'hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4',approach:'hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4',philosophy:'hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4',students:'hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',companies:'hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4'};
await mkdir('demo/public/assets/landing',{recursive:true});
const results=await Promise.allSettled(Object.entries(assets).map(async([name,file])=>{const response=await fetch(base+file);if(!response.ok)throw Error(name+' '+response.status);const bytes=Buffer.from(await response.arrayBuffer());await writeFile('demo/public/assets/landing/'+name+'.mp4',bytes);return {name,bytes:bytes.length};}));
results.forEach(result=>console.log(result.status==='fulfilled'?result.value:String(result.reason)));
const css=await (await fetch('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap',{headers:{'User-Agent':'Mozilla/5.0'}})).text();await writeFile('test-results/reference/font-source.css',css);console.log('FONT CSS',css);
