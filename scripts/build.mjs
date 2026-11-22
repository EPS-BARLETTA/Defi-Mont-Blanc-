import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';

const assets = {
  '/': ['index.html', 'text/html; charset=utf-8'],
  '/app.js': ['app.js', 'text/javascript; charset=utf-8'],
  '/bonus.js': ['bonus.js', 'text/javascript; charset=utf-8'],
  '/style.css': ['style.css', 'text/css; charset=utf-8'],
  '/voie-du-gouter.webp': ['voie-du-gouter.webp', 'image/webp'],
  '/logo-as-vauban.png': ['logo-as-vauban.png', 'image/png'],
};
const embedded = Object.fromEntries(await Promise.all(Object.entries(assets).map(async ([path, [file, type]]) =>
  [path, { type, data: (await readFile('public/' + file)).toString('base64') }],
)));
const apiWorker = await readFile('worker.mjs', 'utf8');
const entrypoint = apiWorker + '\nconst assets = ' + JSON.stringify(embedded) + ';\n' + String.raw`
const security = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'",
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff',
};
export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname.replace(/\/$/, '') || '/';
    if (path.startsWith('/api/')) {
      try { return await api(request, env, path); }
      catch (exception) {
        console.error('Challenge storage request failed:', exception.message);
        return error('Le compteur partagé est temporairement indisponible.', 503);
      }
    }
    const page = ['/', '/prof', '/compteur'].includes(path);
    const asset = assets[page ? '/' : path];
    if (!asset || !['GET', 'HEAD'].includes(request.method)) return new Response('Page introuvable', { status: 404, headers: security });
    const body = request.method === 'HEAD' ? null : Uint8Array.from(atob(asset.data), char => char.charCodeAt(0));
    return new Response(body, { headers: { ...security, 'Content-Type': asset.type, 'Cache-Control': page ? 'no-cache' : 'public, max-age=3600', ...(path === '/prof' || path === '/compteur' ? {'X-Robots-Tag': 'noindex'} : {}) } });
  },
};
`;
await mkdir('dist/server', { recursive: true });
await mkdir('dist/.openai', { recursive: true });
await writeFile('dist/server/index.js', entrypoint);
await copyFile('.openai/hosting.json', 'dist/.openai/hosting.json');
