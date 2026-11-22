import { bonus } from './bonus.js?v=3';

const goal = 4807;
const main = document.querySelector('#main');
const format = new Intl.NumberFormat('fr-FR');
const whole = (value) => format.format(value);
const routesText = (count) => whole(count) + (count === 1 ? ' voie' : ' voies');
const waypoint = [
  [2372, 'Nid d’Aigle'],
  [3167, 'Refuge de Tête Rousse'],
  [3835, 'Refuge du Goûter'],
  [4304, 'Dôme du Goûter'],
  [4362, 'Abri Vallot'],
  [4807, 'Sommet du défi'],
];

async function api(path, { body, key } = {}) {
  const headers = {};
  if (body) headers['Content-Type'] = 'application/json';
  if (key) headers['X-Teacher-Key'] = key;
  let response;
  try {
    response = await fetch('/api/' + path, {
      method: body ? 'POST' : 'GET',
      headers,
      body: body && JSON.stringify(body),
      cache: 'no-store',
    });
  } catch {
    throw new Error('Connexion indisponible. Réessaie dans un instant.');
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || 'Service indisponible. Réessaie dans un instant.');
    error.status = response.status;
    throw error;
  }
  return data;
}

function notice(node, message, isError = false) {
  node.textContent = message;
  node.dataset.error = isError;
}

function node(tag, text, className) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.textContent = text;
  return element;
}

function coverPage() {
  document.body.classList.add('cover-page');
  document.querySelector('.mast').hidden = true;
  document.querySelector('.footer').hidden = true;
  main.innerHTML = `
    <a class="cover-link" href="/suivi">
      <img src="/logo-defi-mont-blanc.png" alt="Défi Mont Blanc · AS Escalade Lycée Vauban">
      <span>Entrer dans le défi</span>
    </a>`;
}

function publicPage(demo = false) {
  main.innerHTML = `
    ${demo ? `<section class="demo-bar" aria-label="Réglage de la démonstration">
      <div class="wrap demo-inner">
        <div><strong>Mode démo</strong><p>La progression est simulée. Le vrai compteur ne change pas.</p></div>
        <label>Palier simulé <select id="demo-altitude">
          <option value="0">Départ · 0 m</option>
          ${bonus.map(({ at }) => `<option value="${at}">${at === goal ? 'Sommet · ' : ''}${whole(at)} m</option>`).join('')}
        </select></label>
        <button class="btn secondary" id="demo-next">Palier suivant</button>
      </div>
    </section>` : ''}
    <section class="hero">
      <div class="hero-inner">
        <div>
          <p class="overline">Défi collectif</p>
          <h1>Défi Mont<br>Blanc</h1>
          <p class="intro">À chaque voie réussie, l’AS Escalade Vauban gagne des mètres pour le Mont Blanc et le ZENOS Tour.</p>
          <div class="readout"><strong id="meters">–</strong><span> / 4 807 m</span></div>
          <div class="track" role="progressbar" aria-label="Progression du défi" aria-valuemin="0" aria-valuemax="4807"><div style="width:0%"></div></div>
          <div class="hero-meta" id="meta">Chargement de la progression…</div>
          <p class="notice" id="public-notice" role="status"></p>
        </div>
        <figure class="figure">
          <div class="photo">
            <img src="/voie-du-gouter.webp" width="1500" height="1215" alt="Photo annotée de la voie du Goûter, de la cabane des Rognes au sommet du Mont Blanc.">
            <svg viewBox="0 0 720 583" preserveAspectRatio="none" aria-hidden="true">
              <path id="trail" class="route" d="M 178 577 L 141 569 L 104 563 L 88 552 L 105 529 L 125 507 L 143 476 L 154 456 L 177 448 L 192 437 L 193 420 L 188 403 L 195 390 L 210 381 L 212 366 L 211 341 L 208 319 L 202 297 L 194 278 L 188 268 L 211 260 L 244 256 L 273 255 L 299 244 L 320 223 L 349 202 L 379 186 L 410 172 L 432 157 L 458 136 L 477 122 L 499 112 L 512 94 L 530 78 L 520 69 L 505 60"/>
              <circle id="pin" class="pin" cx="178" cy="577" r="6" hidden/>
              <g id="summit-flag" class="summit-flag" hidden>
                <path class="summit-pole" d="M505 61V15"/>
                <path class="summit-pennant" d="M507 17 C528 11 549 23 571 17 L568 32 L572 45 C549 51 528 39 507 45Z"/>
                <text x="537" y="34" class="summit-flag-name">AS VAUBAN</text>
              </g>
            </svg>
          </div>
          <figcaption>
            <span class="pin-key" id="map-caption">Voie royale du Goûter · repères pour le défi</span><br>
            Photo de <a href="https://commons.wikimedia.org/wiki/File:Mont_Blanc_-_Go%C3%BBter_route.jpg">Christian / Camptocamp</a>
            · <a href="https://creativecommons.org/licenses/by-sa/2.0/fr/">CC BY-SA 2.0 FR</a> · compression et progression superposée.
          </figcaption>
        </figure>
      </div>
    </section>
    <section class="wrap" aria-labelledby="waypoints-heading">
      <div class="section-head"><h2 id="waypoints-heading">La voie royale</h2></div>
      <p class="hint site-intro">Le massif du Mont-Blanc s’étend sur la France, l’Italie et la Suisse. Sur la photo, on suit la voie normale du Goûter, dite voie royale. Les 4 807 m sont l’objectif fixé pour le défi.</p>
      <ul class="waypoints">${waypoint.map(([at, title]) => `<li data-at="${at}"><small>${whole(at)} m</small><span>${title}</span></li>`).join('')}</ul>
    </section>
    <section class="wrap bonus-section" aria-labelledby="bonus-heading">
      <div class="section-head"><h2 id="bonus-heading">Bonus d’ascension</h2><p id="bonus-count">Une découverte tous les 500 m, puis une au sommet.</p></div>
      <div id="bonus-feature" class="bonus-feature" hidden></div>
      <details class="bonus-list"><summary>Tous les paliers</summary><div id="bonus-grid" class="bonus-grid"></div></details>
    </section>
    <dialog id="bonus-dialog" aria-labelledby="bonus-title">
      <div class="hint" id="bonus-date"></div><h2 id="bonus-title"></h2><p id="bonus-text"></p>
      <details id="bonus-answer" hidden><summary>Voir la réponse</summary><p></p></details>
      <a id="bonus-source" target="_blank" rel="noopener noreferrer"></a>
      <form method="dialog" class="dialog-actions"><button class="btn">Fermer</button></form>
    </dialog>`;
  const trail = main.querySelector('#trail');
  const distance = trail.getTotalLength();
  trail.style.strokeDasharray = distance;
  trail.style.strokeDashoffset = distance;
  const dialog = main.querySelector('#bonus-dialog');
  function openBonus(item) {
    main.querySelector('#bonus-date').textContent = [item.kind, item.date].filter(Boolean).join(' · ');
    main.querySelector('#bonus-title').textContent = item.title;
    main.querySelector('#bonus-text').textContent = item.text;
    const answer = main.querySelector('#bonus-answer');
    answer.open = false;
    answer.hidden = !item.answer;
    answer.querySelector('p').textContent = item.answer ?? '';
    const source = main.querySelector('#bonus-source');
    source.href = item.source;
    source.textContent = 'Lire la source · ' + item.label;
    dialog.showModal();
  }
  const cards = bonus.map((item) => {
    const button = node('button', '', 'bonus-card');
    button.type = 'button';
    button.append(node('small', item.at === goal ? 'Sommet · 4 807 m' : whole(item.at) + ' m'),
      node('b', item.kind), node('span', 'À débloquer', 'state'));
    button.dataset.open = false;
    button.disabled = true;
    button.addEventListener('click', () => openBonus(item));
    main.querySelector('#bonus-grid').append(button);
    return button;
  });

  // Calibrate the progress line to the annotated places in the photo.
  const calibration = [[2372, 178, 577], [3167, 192, 437], [3835, 188, 268],
    [4304, 432, 157], [4362, 477, 122], [goal, 505, 60]].map(([altitude, x, y]) => {
    let nearest = 0;
    let shortest = Infinity;
    for (let length = 0; length < distance; length += 1) {
      const point = trail.getPointAtLength(length);
      const gap = Math.hypot(point.x - x, point.y - y);
      if (gap < shortest) { shortest = gap; nearest = length; }
    }
    return [altitude, altitude === goal ? distance : nearest];
  });

  let highlighted;
  function update(data) {
    const meters = Math.min(data.meters, goal);
    const reached = meters === goal;
    main.querySelector('#meters').textContent = whole(data.meters);
    const percentage = Math.floor(100 * meters / goal);
    const progress = main.querySelector('.track');
    progress.setAttribute('aria-valuenow', meters);
    progress.firstElementChild.style.width = percentage + '%';
    const routes = routesText(data.routes);
    const sessions = data.sessions + (data.sessions === 1 ? ' séance' : ' séances');
    const status = reached ? 'Sommet atteint !' : whole(goal - meters) + ' m jusqu’au sommet';
    main.querySelector('#meta').replaceChildren(node('strong', status), node('span', demo ? 'Progression simulée' : routes + ' · ' + sessions));
    const pin = main.querySelector('#pin');
    const caption = main.querySelector('#map-caption');
    if (reached) caption.textContent = 'Le drapeau de l’AS Vauban est planté au sommet du Mont Blanc.';
    else caption.textContent = 'Voie royale du Goûter · ' + (meters < 2372 ? whole(2372 - meters) + ' m jusqu’au Nid d’Aigle' : 'progression de l’AS Escalade Vauban');
    pin.toggleAttribute('hidden', meters < 2372 || reached);
    main.querySelector('#summit-flag').toggleAttribute('hidden', !reached);
    if (meters >= 2372) {
      const i = calibration.findIndex(([altitude]) => altitude >= meters);
      const [end, to] = calibration[i];
      const [start, from] = calibration[Math.max(0, i - 1)];
      const length = i === 0 ? 0 : from + (to - from) * (meters - start) / (end - start);
      const point = trail.getPointAtLength(length);
      pin.setAttribute('cx', point.x);
      pin.setAttribute('cy', point.y);
      trail.style.strokeDashoffset = distance - length;
    } else {
      trail.style.strokeDashoffset = distance;
    }
    main.querySelectorAll('.waypoints li').forEach((li) => { li.dataset.done = meters >= Number(li.dataset.at); });
    cards.forEach((card, i) => {
      const open = meters >= bonus[i].at;
      card.disabled = !open;
      card.dataset.open = open;
      card.querySelector('b').textContent = open ? bonus[i].title : bonus[i].kind;
      card.querySelector('.state').textContent = open ? 'Lire le bonus' : 'À débloquer';
    });
    const opened = bonus.filter(item => item.at <= meters).length;
    const next = bonus[opened];
    const latest = bonus[opened - 1];
    main.querySelector('#bonus-count').textContent = next
      ? 'Prochaine capsule dans ' + whole(next.at - meters) + ' m'
      : 'Les ' + bonus.length + ' capsules sont débloquées';
    const feature = main.querySelector('#bonus-feature');
    feature.hidden = !latest;
    if (latest && latest !== highlighted) {
      const read = node('button', 'Lire la capsule', 'btn primary');
      read.type = 'button';
      read.addEventListener('click', () => openBonus(latest));
      feature.replaceChildren(node('p', whole(latest.at) + ' m · ' + latest.kind, 'overline'), node('h3', latest.title), read);
    }
    highlighted = latest;
  }
  if (demo) {
    const select = main.querySelector('#demo-altitude');
    const button = main.querySelector('#demo-next');
    main.querySelector('.bonus-list').open = true;
    function simulate() {
      const meters = Number(select.value);
      button.disabled = meters === goal;
      update({ meters, routes: 0, sessions: 0 });
    }
    button.addEventListener('click', () => { select.selectedIndex += 1; simulate(); });
    select.addEventListener('change', simulate);
    simulate();
    return;
  }
  let hasProgress = false;
  async function refresh() {
    try {
      update(await api('progress'));
      hasProgress = true;
      notice(main.querySelector('#public-notice'), '');
    } catch (error) {
      if (!hasProgress) main.querySelector('#meta').textContent = 'Progression momentanément indisponible';
      notice(main.querySelector('#public-notice'), hasProgress ? 'Actualisation momentanément indisponible.' : error.message, true);
    }
  }
  refresh();
  setInterval(() => { if (!document.hidden) refresh(); }, 12000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
}

function counterPage() {
  const ipad = new URLSearchParams(location.search).has('ipad');
  main.innerHTML = `
    <div class="app-shell ${ipad ? 'ipad-counter' : ''}">
      <h1>Compteur de voies</h1>
      <p class="hint">Après chaque voie terminée, appuie une seule fois sur le bouton.</p>
      <section class="panel" id="join-panel">
        <form id="join" class="form-row">
          <label>Code de la séance <input name="code" required maxlength="9" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="Code donné par le professeur"></label>
          <button class="btn">Rejoindre</button>
        </form>
      </section>
      <section class="panel" id="count-panel" hidden>
        <h2>Total de la séance</h2>
        <div class="big" id="my-count">0 voie</div>
        <p class="hint" id="height"></p>
        <button class="btn primary wide" id="add">Valider une voie</button>
        <div class="actions"><button class="btn secondary" id="undo" disabled>Annuler la dernière saisie</button><button class="btn secondary" id="leave" ${ipad ? 'hidden' : ''}>Changer de séance</button></div>
      </section>
      <p id="feedback" class="notice" role="status" aria-live="polite"></p>
      ${ipad ? '<a class="teacher-return" id="teacher-return" href="/prof">Espace prof</a>' : ''}
    </div>`;
  const form = main.querySelector('#join');
  const joinPanel = main.querySelector('#join-panel');
  const countPanel = main.querySelector('#count-panel');
  const feedback = main.querySelector('#feedback');
  const add = main.querySelector('#add');
  const undo = main.querySelector('#undo');
  const leave = main.querySelector('#leave');
  let session;
  let busy = false;
  let totals;
  let change = 0;

  function render() {
    joinPanel.hidden = Boolean(session);
    countPanel.hidden = !session;
    if (!session) return;
    const closed = Boolean(totals.closed_at);
    main.querySelector('#my-count').textContent = routesText(totals.routes) + ' · ' + whole(totals.meters) + ' m';
    main.querySelector('#height').textContent = closed ? 'Séance terminée' : 'Chaque voie ajoute ' + totals.height + ' m.';
    add.disabled = busy || closed;
    undo.disabled = busy || closed || !!session.pending || !session.entries.length || !totals.routes;
    leave.disabled = busy;
    add.textContent = session.pending ? 'Réessayer la validation' : '+ 1 voie · ' + totals.height + ' m';
  }

  function save() {
    try { sessionStorage.setItem('mont-blanc-session', JSON.stringify(session)); } catch { /* The counter still works on this page. */ }
  }

  async function join(code, prior) {
    notice(feedback, 'Connexion à la séance…');
    const submit = form.querySelector('button');
    submit.disabled = true;
    try {
      const data = await api('join', { body: { code } });
      session = prior?.id === data.session.id ? prior : { ...data.session, code, entries: [], pending: null };
      totals = data.totals;
      save();
      render();
      add.focus();
      notice(feedback, 'Tu as rejoint la séance.');
    } catch (error) {
      notice(feedback, error.message, true);
    } finally {
      submit.disabled = false;
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const entered = form.elements.code.value.trim().replaceAll('-', '').toUpperCase();
    join(entered, entered === prior?.code ? prior : undefined);
  });
  let prior;
  try { prior = JSON.parse(sessionStorage.getItem('mont-blanc-session')); } catch { /* Manual code entry remains available. */ }
  const linkCode = location.hash.slice(1).toUpperCase();
  const code = /^[A-HJ-NP-Z2-9]{8}$/.test(linkCode) ? linkCode : prior?.code;
  if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  if (code) {
    form.elements.code.value = code;
    join(code, prior);
  }

  add.addEventListener('click', async () => {
    if (busy || !session) return;
    busy = true;
    change += 1;
    session.pending ??= crypto.randomUUID();
    const id = session.pending;
    save();
    render();
    try {
      const data = await api('climb', { body: { code: session.code, id } });
      totals = data.totals;
      session.entries.push(id);
      session.pending = null;
      notice(feedback, '+' + data.climb.height + ' m ajoutés à la séance.');
    } catch (error) {
      notice(feedback, error.message, true);
    } finally {
      busy = false;
      save();
      render();
    }
  });

  undo.addEventListener('click', async () => {
    if (busy || !session?.entries.length) return;
    busy = true;
    change += 1;
    render();
    try {
      const data = await api('undo', { body: { code: session.code, id: session.entries.at(-1) } });
      totals = data.totals;
      session.entries.pop();
      notice(feedback, 'Dernière voie retirée.');
    } catch (error) {
      notice(feedback, error.message, true);
    } finally {
      busy = false;
      save();
      render();
    }
  });

  leave.addEventListener('click', () => {
    session = null;
    save();
    form.reset();
    render();
    form.elements.code.focus();
    notice(feedback, '');
  });

  async function syncTotals() {
    if (!session || busy || document.hidden || totals.closed_at) return;
    const current = session;
    const version = change;
    try {
      const data = await api('join', { body: { code: current.code } });
      if (current !== session || busy || change !== version) return;
      totals = data.totals;
      render();
    } catch (error) {
      if (error.status === 404 && current === session && !busy && change === version) {
        totals.closed_at = true;
        render();
      }
    }
  }
  document.addEventListener('visibilitychange', syncTotals);
  setInterval(syncTotals, 12000);
}

function teacherPage() {
  main.innerHTML = `
    <div class="app-shell">
      <h1>Espace professeur</h1>
      <p class="hint">Démarre une séance, puis laisse l’iPad aux élèves pour la saisie.</p>
      <section class="panel" id="login-panel">
        <form id="login" class="form-row">
          <label>Code professeur <input type="password" name="key" autocomplete="current-password" required></label>
          <button class="btn">Se connecter</button>
        </form>
      </section>
      <div id="controls" hidden>
        <section class="panel">
          <div id="current"></div>
          <form id="opening" class="form-row">
            <label>Hauteur d’une voie (m) <input type="number" name="height" value="9" min="1" max="40" inputmode="numeric" required></label>
            <button class="btn primary">Démarrer la séance</button>
          </form>
        </section>
        <section class="panel"><h2>Séances · ZENOS Tour</h2><p class="hint">Copie les mètres d’une séance fermée pour les reporter dans ZENOS Tour.</p><ul class="records" id="history"></ul></section>
        <details class="panel" id="entry-panel" hidden>
          <summary>Corriger une séance</summary>
          <div class="form-row"><label>Séance <select id="entry-session"></select></label></div>
          <form id="edit-count" class="form-row">
            <label>Nombre de voies <input name="routes" type="number" min="0" step="1" inputmode="numeric" required></label>
            <button class="btn">Enregistrer le nombre</button>
          </form>
          <form id="edit-height" class="form-row">
            <label>Hauteur d’une voie (m) <input name="height" type="number" min="1" max="40" inputmode="numeric" required></label>
            <button class="btn">Enregistrer la hauteur</button>
            <label class="checkbox"><input name="retroactive" type="checkbox"> Appliquer aussi aux voies déjà saisies</label>
          </form>
          <details><summary>Détail des dernières voies</summary><ul class="records" id="entries"></ul></details>
        </details>
        <div class="actions"><a class="btn secondary" href="/demo">Tester les bonus</a><button class="btn secondary" id="refresh">Actualiser</button><button class="btn secondary" id="logout">Se déconnecter</button></div>
      </div>
      <p id="teacher-feedback" class="notice" role="status" aria-live="polite"></p>
    </div>`;
  const login = main.querySelector('#login');
  const loginPanel = main.querySelector('#login-panel');
  const controls = main.querySelector('#controls');
  const opening = main.querySelector('#opening');
  const current = main.querySelector('#current');
  const historyList = main.querySelector('#history');
  const entries = main.querySelector('#entries');
  const feedback = main.querySelector('#teacher-feedback');
  const entrySession = main.querySelector('#entry-session');
  const editCount = main.querySelector('#edit-count');
  const editHeight = main.querySelector('#edit-height');
  const date = new Intl.DateTimeFormat('fr-LU', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Luxembourg' });
  const clock = new Intl.DateTimeFormat('fr-LU', { timeStyle: 'short', timeZone: 'Europe/Luxembourg' });
  const asDate = (str) => new Date(str.replace(' ', 'T') + 'Z');
  let key = '';
  let busy = false;
  let refreshing = false;
  let selectedSession;

  function action(label, handler, style = 'secondary') {
    const button = node('button', label, 'btn ' + style);
    button.type = 'button';
    button.addEventListener('click', handler);
    return button;
  }

  async function copy(value, message) {
    try {
      await navigator.clipboard.writeText(value);
      notice(feedback, message);
    } catch {
      notice(feedback, 'À copier : ' + value);
    }
  }

  async function mutate(path, body, message) {
    if (busy || refreshing) return;
    busy = true;
    try {
      const data = await api(path, { key, body });
      if (path === 'teacher/open') {
        openCounter(data.code);
        return;
      }
      await refresh();
      notice(feedback, message);
    } catch (error) {
      notice(feedback, error.message, true);
    } finally {
      busy = false;
    }
  }

  function openCounter(code) {
    key = '';
    login.reset();
    controls.hidden = true;
    loginPanel.hidden = false;
    location.replace('/compteur?ipad=1#' + code);
  }

  async function refresh() {
    if (!key || refreshing) return;
    refreshing = true;
    const requestKey = key;
    try {
      const selection = entrySession.value;
      const query = selection ? '?session=' + encodeURIComponent(selection) : '';
      const { sessions, entries: records } = await api('teacher' + query, { key });
      if (requestKey !== key) return;
      const active = sessions.find((session) => !session.closed_at);
      loginPanel.hidden = true;
      controls.hidden = false;
      opening.hidden = !!active;
      current.replaceChildren(node('h2', active ? 'Séance ouverte' : 'Nouvelle séance'));
      if (active) {
        const url = new URL('/compteur', location.origin);
        url.hash = active.code;
        const actions = node('div', '', 'actions');
        actions.append(
          action('Passer en mode saisie', () => openCounter(active.code), 'primary'),
          action('Copier le code', () => copy(active.code, 'Code copié.')),
          action('Copier le lien élève', () => copy(url.href, 'Lien élève copié.')),
          action('Fermer la séance', () => {
            if (confirm('Fermer la saisie pour cette séance ?')) mutate('teacher/close', { id: active.id }, 'Séance fermée.');
          }),
        );
        current.append(node('p', routesText(active.routes) + ' · ' + whole(active.meters) + ' m', 'big'),
          node('p', active.height + ' m par voie', 'hint'),
          actions);
      }

      historyList.replaceChildren();
      for (const session of sessions) {
        const li = node('li', '');
        const text = node('div', '');
        text.append(node('strong', date.format(asDate(session.opened_at))),
          node('small', routesText(session.routes) + ' · ' + whole(session.meters) + ' m · ' + (session.closed_at ? 'Terminée' : 'En cours')));
        li.append(text);
        if (session.closed_at && session.meters > 0) {
          li.append(action('Copier les mètres', () => copy(String(session.meters), whole(session.meters) + ' m copiés pour ZENOS Tour.')));
        }
        historyList.append(li);
      }
      if (!sessions.length) historyList.append(node('li', 'Aucune séance enregistrée.'));
      main.querySelector('#entry-panel').hidden = !sessions.length;
      entrySession.replaceChildren(...sessions.map((session) => {
        const option = node('option', date.format(asDate(session.opened_at)));
        option.value = session.id;
        return option;
      }));
      if (selection && sessions.some(session => String(session.id) === selection)) entrySession.value = selection;
      selectedSession = sessions.find(session => String(session.id) === entrySession.value);
      if (selectedSession) {
        editCount.elements.routes.value = selectedSession.routes;
        editHeight.elements.height.value = selectedSession.height;
        editHeight.elements.retroactive.checked = false;
      }
      entries.replaceChildren();
      for (const entry of records) {
        const li = node('li', '');
        li.append(node('span', clock.format(asDate(entry.created_at)) + ' · +' + entry.height + ' m'),
          action('Retirer', () => {
            if (confirm('Retirer cette voie du total collectif ?')) mutate('teacher/remove', { id: entry.id }, 'Voie retirée du total.');
          }));
        entries.append(li);
      }
      if (!records.length) entries.append(node('li', 'Aucune voie dans cette séance.'));
    } catch (error) {
      if (requestKey === key) notice(feedback, error.message, true);
    } finally {
      refreshing = false;
    }
  }

  login.addEventListener('submit', (event) => {
    event.preventDefault();
    if (refreshing) return;
    key = login.elements.key.value.trim();
    notice(feedback, '');
    refresh();
  });
  opening.addEventListener('submit', (event) => {
    event.preventDefault();
    entrySession.value = '';
    mutate('teacher/open', { height: opening.elements.height.valueAsNumber });
  });
  editCount.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!selectedSession) return;
    const routes = editCount.elements.routes.valueAsNumber;
    mutate('teacher/count', { id: selectedSession.id, expected: selectedSession.routes, routes }, 'Nombre de voies corrigé.');
  });
  editHeight.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!selectedSession) return;
    const height = editHeight.elements.height.valueAsNumber;
    const retroactive = editHeight.elements.retroactive.checked;
    mutate('teacher/height', { id: selectedSession.id, height, retroactive }, 'Hauteur corrigée.');
  });
  entrySession.addEventListener('change', refresh);
  main.querySelector('#refresh').addEventListener('click', refresh);
  main.querySelector('#logout').addEventListener('click', () => {
    key = '';
    login.reset();
    current.replaceChildren();
    controls.hidden = true;
    loginPanel.hidden = false;
    notice(feedback, '');
    login.elements.key.focus();
  });
}

const page = location.pathname.replace(/\/$/, '');
document.querySelector('#back').hidden = !page;
if (page === '/compteur') counterPage();
else if (page === '/prof') teacherPage();
else if (page === '/demo') publicPage(true);
else if (page === '/suivi') publicPage();
else coverPage();
