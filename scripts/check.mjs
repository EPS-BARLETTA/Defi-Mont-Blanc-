import { test } from 'node:test';
import assert from 'node:assert/strict';
import { localDb } from './local-db.mjs';
import { api } from '../worker.mjs';
import { bonus } from '../public/bonus.js';

test('compteur collectif, reprise sans doublon et corrections', async () => {
  const env = { DB: localDb(), TEACHER_KEY: 'test-local' };
  const query = (path, body, authorized = false) => api(new Request('http://localhost' + path, {
    method: body ? 'POST' : 'GET',
    headers: { 'Content-Type': 'application/json', ...(authorized ? { 'X-Teacher-Key': env.TEACHER_KEY } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  }), env, path.split('?')[0]);
  assert.equal((await query('/api/teacher')).status, 401);
  assert.deepEqual(await (await query('/api/progress')).json(), { meters: 0, routes: 0, sessions: 0 });
  assert.equal((await query('/api/teacher/open', { height: 0 }, true)).status, 400);
  const { code } = await (await query('/api/teacher/open', { height: 12 }, true)).json();
  assert.equal((await query('/api/teacher/open', { height: 12 }, true)).status, 409);
  assert.equal((await query('/api/join', { code: 'ABCDEFGH' })).status, 404);
  assert.deepEqual((await (await query('/api/join', { code })).json()).session, { id: 1, height: 12 });
  const first = { id: crypto.randomUUID(), code };
  const second = { id: crypto.randomUUID(), code };
  const added = await Promise.all([first, first, second].map(body => query('/api/climb', body)));
  assert(added.every(response => response.ok));
  assert.deepEqual(await (await query('/api/progress')).json(), { meters: 24, routes: 2, sessions: 1 });
  assert((await query('/api/undo', second)).ok);
  assert((await query('/api/undo', second)).ok);
  assert((await query('/api/teacher/close', { id: 1 }, true)).ok);
  assert.equal((await query('/api/climb', second)).status, 409);
  const next = await (await query('/api/teacher/open', { height: 9 }, true)).json();
  assert((await query('/api/climb', { id: crypto.randomUUID(), code: next.code })).ok);
  assert.deepEqual(await (await query('/api/progress')).json(), { meters: 21, routes: 2, sessions: 2 });
  const earlier = await (await query('/api/teacher?session=1', undefined, true)).json();
  assert.equal(earlier.entries[0].height, 12);
  assert((await query('/api/teacher/remove', { id: first.id }, true)).ok);
  assert.deepEqual(await (await query('/api/progress')).json(), { meters: 9, routes: 1, sessions: 1 });
});

test('les neuf paliers de 500 mètres et le sommet ont une capsule sourcée', () => {
  assert.deepEqual(bonus.map(item => item.at), [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 4807]);
  assert(bonus.every(item => new URL(item.source).protocol === 'https:' && item.text && item.title));
});
