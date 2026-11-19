import { mkdir, readFile, writeFile, unlink } from 'node:fs/promises';
import { dirname } from 'node:path';
import { renderToString } from 'react-dom/server';
import { App, pageTitle } from './App';
import { pages } from './catalogue';

const base = 'https://bugrefinery.com';
const shell = await readFile('dist/web.html', 'utf8');
const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

for (const page of [...pages, { path: '/404.html', name: 'Page not found', description: 'The page you requested could not be found.' }]) {
  const title = escape(pageTitle(page.path));
  const description = escape(page.description);
  const url = base + page.path;
  const metadata = [
    '<title>' + title + '</title>', '<meta name="description" content="' + description + '">',
    '<link rel="canonical" href="' + url + '">', '<link rel="icon" href="/brand.svg" type="image/svg+xml">',
    '<meta property="og:type" content="website">', '<meta property="og:title" content="' + title + '">',
    '<meta property="og:description" content="' + description + '">', '<meta property="og:url" content="' + url + '">',
    '<meta name="twitter:card" content="summary">', '<meta name="twitter:title" content="' + title + '">',
    '<meta name="twitter:description" content="' + description + '">'
  ];
  if (page.path === '/404.html') metadata.push('<meta name="robots" content="noindex">');
  const file = 'dist' + (page.path === '/' ? '/index.html' : page.path);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, shell.replace('<!--metadata-->', () => metadata.join('\n')).replace('<div id="root"></div>', () => '<div id="root">' + renderToString(<App path={page.path} />) + '</div>'));
}
await writeFile('dist/sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + pages.map(page => '  <url><loc>' + base + page.path + '</loc></url>').join('\n') + '\n</urlset>\n');
await writeFile('dist/robots.txt', 'User-agent: *\nAllow: /\nSitemap: ' + base + '/sitemap.xml\n');
await unlink('dist/web.html');
