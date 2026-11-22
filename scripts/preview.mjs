import { createServer } from 'node:http';
import { execFileSync } from 'node:child_process';
import { localDb } from './local-db.mjs';

execFileSync(process.execPath, ['scripts/build.mjs']);
const { default: worker } = await import('../dist/server/index.js');
const env = { DB: localDb(), TEACHER_KEY: 'test-local' };
const portArgument = process.argv.indexOf('--port');
const port = Number(portArgument > 0 ? process.argv[portArgument + 1] : process.env.PORT || 3000);
createServer(async (incoming, outgoing) => {
  const hasBody = ['POST', 'PUT', 'PATCH'].includes(incoming.method);
  const request = new Request('http://localhost:' + port + incoming.url, {
    method: incoming.method,
    headers: incoming.headers,
    ...(hasBody ? { body: incoming, duplex: 'half' } : {}),
  });
  const response = await worker.fetch(request, env);
  outgoing.writeHead(response.status, Object.fromEntries(response.headers));
  outgoing.end(Buffer.from(await response.arrayBuffer()));
}).listen(port, '0.0.0.0');
