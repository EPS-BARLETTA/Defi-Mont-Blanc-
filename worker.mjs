const json = (body, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
const error = (message, status = 400) => json({ error: message }, status);
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const sessionCode = /^[A-HJ-NP-Z2-9]{8}$/;
const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const defaultHeight = 9;
const validHeight = (value) => Number.isInteger(value) && value >= 1 && value <= 40;
const validId = (value) => Number.isSafeInteger(value) && value > 0;

async function authorized(request, secret) {
  if (!secret) return false;
  let candidate = request.headers.get('X-Teacher-Key') ?? '';
  const encoded = request.headers.get('X-Teacher-Key-Encoded');
  if (encoded !== null) {
    try {
      candidate = decodeURIComponent(encoded);
    } catch {
      return false;
    }
  }
  const digest = async (value) => new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)));
  const [given, expected] = await Promise.all([digest(candidate), digest(secret)]);
  return given.reduce((diff, byte, index) => diff | (byte ^ expected[index]), 0) === 0;
}

async function parseBody(request) {
  if (!request.headers.get('Content-Type')?.startsWith('application/json')) return null;
  if (!request.body) return null;
  const reader = request.body.getReader();
  const parts = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 2048) { await reader.cancel(); return null; }
      parts.push(value);
    }
    const data = new Uint8Array(size);
    let offset = 0;
    for (const part of parts) { data.set(part, offset); offset += part.length; }
    const body = JSON.parse(new TextDecoder().decode(data));
    return body && typeof body === 'object' && !Array.isArray(body) ? body : null;
  } catch {
    return null;
  }
}

async function totals(db) {
  return db.prepare('SELECT COALESCE(SUM(height), 0) AS meters, COUNT(*) AS routes, COUNT(DISTINCT session_id) AS sessions FROM climbs').first();
}

async function sessionTotals(db, code) {
  return db.prepare(`SELECT s.id, s.height, s.closed_at, COUNT(c.id) AS routes,
    COALESCE(SUM(c.height),0) AS meters
    FROM sessions s LEFT JOIN climbs c ON c.session_id=s.id WHERE s.code=? GROUP BY s.id`).bind(code).first();
}

async function correctCount(db, { id, routes, expected }) {
  if (!validId(id) || !Number.isSafeInteger(routes) || routes < 0 ||
      !Number.isSafeInteger(expected) || expected < 0) return error('Indique un nombre de voies valide.');
  const session = await db.prepare('SELECT COUNT(c.id) AS routes FROM sessions s LEFT JOIN climbs c ON c.session_id=s.id WHERE s.id=? GROUP BY s.id').bind(id).first();
  if (!session) return error('Séance introuvable.', 404);
  if (session.routes !== expected) return error('Le compteur a changé. Actualise avant de corriger.', 409);
  const difference = routes - expected;
  if (difference === 0) return json({ routes });
  if (difference > 1000) return error('Ajoute au maximum 1 000 voies par correction.');
  const result = difference > 0
    ? await db.prepare(`INSERT INTO climbs (id,session_id,height)
      SELECT value,s.id,s.height FROM sessions s, json_each(?)
      WHERE s.id=? AND (SELECT COUNT(*) FROM climbs WHERE session_id=?)=?`)
      .bind(JSON.stringify(Array.from({ length: difference }, () => crypto.randomUUID())), id, id, expected).run()
    : await db.prepare(`DELETE FROM climbs WHERE rowid IN (
      SELECT rowid FROM climbs WHERE session_id=?
      AND (SELECT COUNT(*) FROM climbs WHERE session_id=?)=?
      ORDER BY rowid DESC LIMIT ?)`).bind(id, id, expected, -difference).run();
  return result.meta.changes === Math.abs(difference)
    ? json({ routes }) : error('Le compteur a changé. Actualise avant de corriger.', 409);
}

async function teacher(request, db, path, secret) {
  if (!await authorized(request, secret)) return error('Code professeur incorrect.', 401);
  if (request.method === 'GET' && path === '/api/teacher') {
    const session = Number(new URL(request.url).searchParams.get('session'));
    const selected = Number.isSafeInteger(session) && session > 0 ? session : null;
    const results = await db.batch([
      db.prepare('SELECT s.*, COUNT(c.id) AS routes, COALESCE(SUM(c.height),0) AS meters FROM sessions s LEFT JOIN climbs c ON s.id = c.session_id GROUP BY s.id ORDER BY s.id DESC'),
      db.prepare('SELECT * FROM climbs WHERE session_id = COALESCE(?, (SELECT MAX(id) FROM sessions)) ORDER BY created_at DESC, rowid DESC LIMIT 100').bind(selected),
    ]);
    return json({ sessions: results[0].results, entries: results[1].results });
  }
  if (request.method !== 'POST') return error('Action inconnue.', 404);
  const body = await parseBody(request);
  if (!body) return error('Saisie invalide.');
  if (path === '/api/teacher/open') {
    const height = body.height ?? defaultHeight;
    if (!validHeight(height)) return error('Indique une hauteur entière entre 1 et 40 m.');
    const code = Array.from(crypto.getRandomValues(new Uint8Array(8)), byte => alphabet[byte & 31]).join('');
    const result = await db.prepare('INSERT OR IGNORE INTO sessions (code,height) VALUES (?,?)').bind(code, height).run();
    return result.meta.changes ? json({ code }, 201) : error('Une séance est déjà ouverte. Actualise la page avant de réessayer.', 409);
  }
  if (path === '/api/teacher/count') return correctCount(db, body);
  if (path === '/api/teacher/height') {
    if (!validId(body.id) || !validHeight(body.height)) return error('Indique une hauteur entière entre 1 et 40 m.');
    const update = db.prepare('UPDATE sessions SET height=? WHERE id=? RETURNING id').bind(body.height, body.id);
    const statements = [update];
    if (body.retroactive === true) {
      statements.push(db.prepare('UPDATE climbs SET height=? WHERE session_id=?').bind(body.height, body.id));
    }
    const [result] = await db.batch(statements);
    return result.results.length ? json({ height: body.height }) : error('Séance introuvable.', 404);
  }
  if (path === '/api/teacher/close') {
    if (!Number.isSafeInteger(body.id)) return error('Séance invalide.');
    await db.prepare('UPDATE sessions SET closed_at=CURRENT_TIMESTAMP WHERE id=? AND closed_at IS NULL').bind(body.id).run();
    return json({ closed: true });
  }
  if (path === '/api/teacher/remove') {
    if (typeof body.id !== 'string' || !uuid.test(body.id)) return error('Voie invalide.');
    await db.prepare('DELETE FROM climbs WHERE id=?').bind(body.id).run();
    return json({ removed: true });
  }
  return error('Action inconnue.', 404);
}

async function counter(request, db, path) {
  const body = await parseBody(request);
  if (!body || typeof body.code !== 'string' || !sessionCode.test(body.code)) return error('Vérifie le code de séance.');
  if (path === '/api/join') {
    const data = await sessionTotals(db, body.code);
    if (!data || data.closed_at) return error('Cette séance est terminée ou le code est incorrect.', 404);
    return json({ session: { id: data.id, height: data.height }, totals: data });
  }
  if (typeof body.id !== 'string' || !uuid.test(body.id)) return error('Cette validation est invalide.');
  if (path === '/api/climb') {
    await db.prepare('INSERT OR IGNORE INTO climbs (id,session_id,height) SELECT ?,id,height FROM sessions WHERE code=? AND closed_at IS NULL').bind(body.id, body.code).run();
    const climb = await db.prepare('SELECT c.id,c.height,s.id AS session_id FROM climbs c JOIN sessions s ON c.session_id=s.id WHERE c.id=? AND s.code=?').bind(body.id, body.code).first();
    return climb ? json({ climb, totals: await sessionTotals(db, body.code) }) : error('La séance est fermée ou le code est incorrect.', 409);
  }
  const result = await db.prepare('DELETE FROM climbs WHERE id=? AND session_id IN (SELECT id FROM sessions WHERE code=? AND closed_at IS NULL)').bind(body.id, body.code).run();
  if (!result.meta.changes) {
    const session = await db.prepare('SELECT id FROM sessions WHERE code=? AND closed_at IS NULL').bind(body.code).first();
    if (!session) return error('La séance est fermée. Demande au professeur pour corriger.', 409);
  }
  return json({ removed: true, totals: await sessionTotals(db, body.code) });
}

export async function api(request, env, path) {
  const db = env.DB;
  if (!db) return error('Le compteur partagé est temporairement indisponible.', 503);
  if (request.method === 'GET' && path === '/api/progress') return json(await totals(db));
  if (path === '/api/teacher' || path.startsWith('/api/teacher/')) return teacher(request, db, path, env.TEACHER_KEY);
  if (request.method === 'POST' && ['/api/join', '/api/climb', '/api/undo'].includes(path)) return counter(request, db, path);
  return error('Page introuvable.', 404);
}
