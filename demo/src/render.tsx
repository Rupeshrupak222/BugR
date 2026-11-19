import { mkdir, readFile, unlink, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import { notFound, origin, pages } from './data';

const directory = new URL('../dist/', import.meta.url);
const shellFile = new URL('web.html', directory);
const shell = await readFile(shellFile, 'utf8');
const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

for (const page of [...pages, notFound]) {
  const title = escape(page.name + ' | Bug Refinery');
  const description = escape(page.description);
  const canonical = origin + page.path;
  const metadata = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}">`,
    `<link rel="canonical" href="${canonical}">`,
    '<link rel="icon" href="/assets/brand.svg" type="image/svg+xml">',
    '<meta property="og:type" content="website">',
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${description}">`,
    `<meta property="og:url" content="${canonical}">`,
    '<meta name="twitter:card" content="summary">',
    `<meta name="twitter:title" content="${title}">`,
    `<meta name="twitter:description" content="${description}">`
  ];
  if (page === notFound) metadata.push('<meta name="robots" content="noindex">');
  const file = new URL(page.path === '/' ? 'index.html' : page.path.slice(1), directory);
  await mkdir(dirname(fileURLToPath(file)), { recursive: true });
  await writeFile(file, shell.replace('<!--metadata-->', () => metadata.join('\n'))
    .replace('<div id="root"></div>', () => '<div id="root">' + renderToString(<App path={page.path} />) + '</div>'));
}

await writeFile(new URL('sitemap.xml', directory), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url><loc>${origin + page.path}</loc></url>`).join('\n')}
</urlset>
`);
await writeFile(new URL('robots.txt', directory), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
await unlink(shellFile);
