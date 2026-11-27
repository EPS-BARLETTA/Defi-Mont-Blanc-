import { bonus } from './bonus.js?v=8';

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
  if (key) headers['X-Teacher-Key-Encoded'] = encodeURIComponent(key);
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
          <h1 class="map-title"><img src="/logo-defi-mont-blanc.png" width="2172" height="724" alt="Défi Mont Blanc"></h1>
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
            </svg>
          </div>
          <figcaption>
            <span class="pin-key" id="map-caption">Voie royale du Goûter · repères pour le défi</span><br>
            Photo de <a href="https://commons.wikimedia.org/wiki/File:Mont_Blanc_-_Go%C3%BBter_route.jpg">Christian / Camptocamp</a> (2012), adaptée pour le défi
            · <a href="https://creativecommons.org/licenses/by-sa/2.0/fr/">CC BY-SA 2.0 FR</a>
          </figcaption>
        </figure>
      </div>
    </section>
    <div class="wrap journey">
      <section class="journey-card route-card" aria-labelledby="waypoints-heading">
        <div class="journey-heading"><h2 id="waypoints-heading">La voie royale</h2><span>Par le Goûter</span></div>
        <p class="hint route-intro">La voie normale du Goûter se situe dans le massif du Mont-Blanc, entre la France, l’Italie et la Suisse.</p>
        <ul class="waypoints">${[...waypoint].reverse().map(([at, title]) => `<li data-at="${at}"><span>${title}</span><small>${whole(at)} m</small></li>`).join('')}</ul>
        <details class="route-note">
          <summary>L’ancien refuge du Goûter</summary>
          <p>L’ancien refuge a été démonté à l’été 2026 et redescendu par hélicoptère. Le refuge actuel, ouvert en 2013, est toujours sur l’itinéraire à 3 835 m.
            <a href="https://www.saintgervais.com/mairie/actualites/reconstruction-de-l-ancien-refuge-du-gouter-une-premiere-mondiale-qui-entre-dans-sa-derniere-phase/">Saint-Gervais Mont-Blanc</a>
          </p>
        </details>
      </section>
      <section class="journey-card bonus-section" aria-labelledby="bonus-heading">
        <div class="journey-heading"><h2 id="bonus-heading">Bonus d’ascension</h2><span id="bonus-count">10 défis</span></div>
        <div id="bonus-feature" class="bonus-feature">
          <p class="overline">Premier bonus</p><h3>500 m</h3><p class="bonus-feature-status" id="bonus-status"></p>
        </div>
        <details class="bonus-list"><summary>Tous les paliers</summary><div id="bonus-grid" class="bonus-grid"></div></details>
      </section>
    </div>
    <dialog id="bonus-dialog" aria-labelledby="bonus-title">
      <div class="hint" id="bonus-date"></div><h2 id="bonus-title"></h2>
      <div id="bonus-quiz"></div>
      <form method="dialog" class="bonus-exit"><button aria-label="Quitter le bonus">Quitter</button></form>
    </dialog>`;
  const trail = main.querySelector('#trail');
  const distance = trail.getTotalLength();
  trail.style.strokeDasharray = distance;
  trail.style.strokeDashoffset = distance;
  const dialog = main.querySelector('#bonus-dialog');
  const quiz = main.querySelector('#bonus-quiz');
  function openBonus(item) {
    const icon = item.icon ? item.icon + ' ' : '';
    main.querySelector('#bonus-date').textContent = whole(item.at) + ' m · ' + item.kind;
    main.querySelector('#bonus-title').textContent = icon + item.title;

    const instruction = node('p', item.hint);
    const choices = node('div', '', 'game-tiles');
    function photo(key, alt) {
      const img = document.createElement('img');
      img.src = key === 'baudriers-ranges' ? '/materiel/baudriers-ranges.svg' : '/materiel/' + key + '.webp';
      img.alt = alt;
      img.className = 'equipment-photo';
      return img;
    }
    function discover(label, message) {
      const heading = node('h3', label, 'quiz-step');
      heading.tabIndex = -1;
      quiz.replaceChildren(heading, node('p', message));
      if (item.fact) {
        const fact = node('div', '', 'quiz-fact');
        fact.append(node('strong', '📌 À retenir'), node('p', item.fact));
        quiz.append(fact);
      }
      if (item.revealPhoto) {
        const captions = { corde: 'Étiquette de la corde orange du lycée', mur: 'Le mur de Vauban pour ton défi en binôme' };
        const figure = node('figure');
        figure.append(photo(item.revealPhoto, captions[item.revealPhoto]), node('figcaption', captions[item.revealPhoto]));
        quiz.append(figure);
      }
      if (item.wallGear) {
        const storage = node('section', '', 'harness-storage');
        storage.append(node('h3', 'Après la grimpe, place au rangement'));
        const comparison = node('div', '', 'harness-comparison');
        for (const [key, caption] of [
          ['baudriers', 'Avant · Je crois que niveau rangement, on va pouvoir faire mieux !'],
          ['baudriers-ranges', 'Rangement · Le crochet passe dans le pontet, repéré en bleu.']
        ]) {
          const figure = node('figure');
          figure.append(photo(key, caption), node('figcaption', caption));
          if (key === 'baudriers') {
            const skull = node('span', '💀', 'harness-skull');
            skull.setAttribute('aria-hidden', 'true');
            figure.append(skull);
          }
          comparison.append(figure);
        }
        storage.append(comparison, node('p', 'À Vauban, suspends ton baudrier par le pontet d’assurage : c’est la boucle textile à l’avant, entre les deux points d’encordement.'));
        quiz.append(storage);
        quiz.append(node('h3', 'Sur le mur, que reconnais-tu ?'));
        const gallery = node('div', '', 'game-tiles');
        for (const [key, name, detail] of [
          ['mousqueton', 'Mousqueton', 'Photo du lycée · Un connecteur métallique muni d’un doigt qui s’ouvre.'],
          ['degaine', 'Dégaine', 'Photo du lycée · Deux mousquetons reliés par une sangle courte.'],
          ['plaquette', 'Plaquette', 'Schéma · Une pièce métallique fixée à la paroi avec une ouverture pour un mousqueton.'],
          ['relais', 'Relais', 'Schéma simplifié · En moulinette, la corde passe par le relais en haut de la voie. Sa forme varie selon le site.']
        ]) {
          const card = node('details');
          const summary = node('summary', name);
          summary.prepend(photo(key, ''));
          card.append(summary, node('p', detail));
          gallery.append(card);
        }
        quiz.append(gallery);
      }
      if (item.extra) quiz.append(node('p', item.extra));
      if (item.gallery) {
        const list = node('dl', '', 'quiz-dossier');
        for (const [name, detail] of Object.entries(item.choices)) {
          list.append(node('dt', name), node('dd', detail));
        }
        quiz.append(list);
      }
      const sources = item.choiceSources?.[label] ?? item.sources ?? (item.source ? [[item.label, item.source]] : []);
      for (const [name, url] of sources) {
        const link = node('a', name, 'quiz-source');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        quiz.append(link);
      }
      const back = node('button', 'Revoir les choix', 'btn secondary');
      back.onclick = () => { quiz.replaceChildren(instruction, choices); choices.firstChild.focus(); };
      const done = node('button', 'Retour à l’ascension', 'btn primary');
      done.onclick = () => dialog.close();
      const actions = node('div', '', 'discovery-actions');
      actions.append(back, done);
      quiz.append(actions);
      heading.focus();
    }
    for (const [label, message] of [...Object.entries(item.choices), ['Je ne sais pas', item.unknown]]) {
      const button = node('button', label, 'quiz-option');
      if (label === 'Je ne sais pas') button.classList.add('ghost');
      const key = item.photos?.[Object.keys(item.choices).indexOf(label)];
      if (key) button.prepend(photo(key, ''));
      button.onclick = () => discover(label === 'Je ne sais pas' ? 'Découverte' : label, message);
      choices.append(button);
    }
    quiz.replaceChildren(instruction, choices);
    dialog.showModal();
  }
  const cards = bonus.map((item) => {
    const button = node('button', '', 'bonus-card');
    button.type = 'button';
    button.append(node('small', item.at === goal ? 'Sommet · 4 807 m' : whole(item.at) + ' m'),
      node('b', (item.icon ? item.icon + ' ' : '') + item.kind), node('span', 'À débloquer', 'state'));
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

  let highlighted = null;
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
    if (reached) caption.textContent = 'L’AS Escalade Vauban a atteint le sommet du Mont Blanc.';
    else caption.textContent = 'Voie royale du Goûter · ' + (meters < 2372 ? whole(2372 - meters) + ' m jusqu’au Nid d’Aigle' : 'progression de l’AS Escalade Vauban');
    pin.toggleAttribute('hidden', meters < 2372);
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
    const steps = [...main.querySelectorAll('.waypoints li')];
    const nextStep = steps.findLast((step) => Number(step.dataset.at) > meters);
    steps.forEach((step) => {
      step.dataset.done = meters >= Number(step.dataset.at);
      if (step === nextStep) step.setAttribute('aria-current', 'step');
      else step.removeAttribute('aria-current');
    });
    cards.forEach((card, i) => {
      const open = meters >= bonus[i].at;
      card.disabled = !open;
      card.dataset.open = open;
      card.querySelector('b').textContent = (bonus[i].icon ? bonus[i].icon + ' ' : '') + (open ? bonus[i].title : bonus[i].kind);
      card.querySelector('.state').textContent = open ? 'Relever le défi' : 'À débloquer';
    });
    const opened = bonus.filter(item => item.at <= meters).length;
    const next = bonus[opened];
    const latest = bonus[opened - 1];
    main.querySelector('#bonus-count').textContent = opened + ' / ' + bonus.length + ' défis débloqués';
    const feature = main.querySelector('#bonus-feature');
    if (latest !== highlighted) {
      const eyebrow = node('p', latest ? whole(latest.at) + ' m · ' + latest.kind : 'Premier bonus', 'overline');
      const title = node('h3', latest ? (latest.icon ? latest.icon + ' ' : '') + latest.title : whole(next.at) + ' m');
      const status = node('p', '', 'bonus-feature-status');
      status.id = 'bonus-status';
      feature.replaceChildren(eyebrow, title, status);
      if (latest) {
        const read = node('button', 'Relever le défi', 'btn primary');
        read.type = 'button';
        read.addEventListener('click', () => openBonus(latest));
        feature.append(read);
      }
    }
    main.querySelector('#bonus-status').textContent = next
      ? 'Encore ' + whole(next.at - meters) + ' m pour débloquer le prochain défi.'
      : 'Tous les défis sont disponibles.';
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
  main.classList.add('counter-page');
  main.innerHTML = `
    <div class="app-shell ${ipad ? 'ipad-counter' : ''}">
      <div class="counter-top">
        <img class="counter-logo" src="/logo-defi-mont-blanc.png" width="2172" height="724" alt="Défi Mont Blanc">
        <button class="btn counter-fullscreen" type="button" id="toggle-fullscreen" aria-pressed="false">Plein écran</button>
      </div>
      <h1>Compteur de voies</h1>
      <p class="hint">Une voie terminée ? Un appui sur le bouton.</p>
      <section class="panel" id="join-panel">
        <form id="join" class="form-row">
          <label>Code de la séance <input name="code" required maxlength="9" autocapitalize="characters" autocomplete="off" spellcheck="false" placeholder="Code donné par le professeur"></label>
          <button class="btn">Rejoindre</button>
        </form>
      </section>
      <section class="panel" id="count-panel" hidden>
        <h2>Total de la séance</h2>
        <div class="counter-totals" id="my-count">
          <div class="counter-routes"><strong id="route-count">0</strong><span id="route-label">voies</span></div>
          <div class="counter-meters"><strong id="meter-count">0</strong><span>mètres</span></div>
        </div>
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
  const fullscreen = main.querySelector('#toggle-fullscreen');
  let session;
  let busy = false;
  let totals;
  let change = 0;

  function fullscreenActive() {
    return document.fullscreenElement === main || main.classList.contains('counter-expanded');
  }

  function updateFullscreenButton() {
    const active = fullscreenActive();
    fullscreen.textContent = active ? 'Quitter le plein écran' : 'Plein écran';
    fullscreen.setAttribute('aria-pressed', active);
  }

  fullscreen.addEventListener('click', async () => {
    if (document.fullscreenElement === main) {
      await document.exitFullscreen();
    } else if (main.classList.contains('counter-expanded')) {
      main.classList.remove('counter-expanded');
    } else {
      try {
        await main.requestFullscreen();
      } catch {
        main.classList.add('counter-expanded');
      }
    }
    updateFullscreenButton();
  });
  document.addEventListener('fullscreenchange', updateFullscreenButton);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && main.classList.contains('counter-expanded')) {
      main.classList.remove('counter-expanded');
      updateFullscreenButton();
    }
  });

  function render() {
    joinPanel.hidden = Boolean(session);
    countPanel.hidden = !session;
    if (!session) return;
    const closed = Boolean(totals.closed_at);
    main.querySelector('#route-count').textContent = whole(totals.routes);
    main.querySelector('#route-label').textContent = totals.routes === 1 ? 'voie' : 'voies';
    main.querySelector('#meter-count').textContent = whole(totals.meters);
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
          <label>Code professeur <input type="password" name="key" inputmode="numeric" autocomplete="current-password" required></label>
          <button class="btn">Se connecter</button>
        </form>
      </section>
      <div id="controls" hidden>
        <section class="panel">
          <h2>Séance du jour</h2>
          <p id="current-date" class="hint"></p>
          <div id="current"></div>
          <div class="actions teacher-launch">
            <button class="btn primary" type="button" id="launch-session">Lancer la séance du jour</button>
            <button class="btn secondary" type="button" id="open-settings">Paramètres</button>
          </div>
        </section>
        <div class="actions teacher-shortcuts">
          <button class="btn secondary" type="button" id="open-correction" aria-controls="entry-panel" aria-expanded="false">Corriger</button>
          <a class="btn secondary" href="/demo">Tester les bonus</a>
        </div>
        <section class="panel" id="entry-panel" hidden>
          <h2>Corriger une séance</h2>
          <p id="empty-correction" class="hint" hidden>Aucune séance à corriger.</p>
          <div id="correction-fields">
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
          </div>
        </section>
      </div>
      <p id="teacher-feedback" class="notice" role="status" aria-live="polite"></p>
      <dialog id="session-settings" aria-labelledby="session-settings-title">
        <h2 id="session-settings-title">Paramètres de la séance</h2>
        <form id="session-height" class="form-row">
          <label>Hauteur d’une voie (m) <input type="number" name="height" min="1" max="40" inputmode="numeric" required></label>
          <button class="btn primary">Enregistrer</button>
        </form>
        <p class="notice" id="settings-feedback" role="status"></p>
        <div class="actions">
          <button class="btn secondary" type="button" id="finish-session" hidden>Fermer la séance</button>
          <button class="btn secondary" type="button" id="close-settings">Retour</button>
        </div>
      </dialog>
    </div>`;
  const login = main.querySelector('#login');
  const loginPanel = main.querySelector('#login-panel');
  const controls = main.querySelector('#controls');
  const current = main.querySelector('#current');
  const currentDate = main.querySelector('#current-date');
  const launch = main.querySelector('#launch-session');
  const settings = main.querySelector('#session-settings');
  const heightForm = main.querySelector('#session-height');
  const finish = main.querySelector('#finish-session');
  const correction = main.querySelector('#open-correction');
  const entryPanel = main.querySelector('#entry-panel');
  const entries = main.querySelector('#entries');
  const feedback = main.querySelector('#teacher-feedback');
  const entrySession = main.querySelector('#entry-session');
  const editCount = main.querySelector('#edit-count');
  const editHeight = main.querySelector('#edit-height');
  const date = new Intl.DateTimeFormat('fr-LU', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Luxembourg' });
  const clock = new Intl.DateTimeFormat('fr-LU', { timeStyle: 'short', timeZone: 'Europe/Luxembourg' });
  const day = new Intl.DateTimeFormat('fr-LU', { dateStyle: 'short', timeZone: 'Europe/Luxembourg' });
  const longDay = new Intl.DateTimeFormat('fr-LU', { dateStyle: 'full', timeZone: 'Europe/Luxembourg' });
  const asDate = (str) => new Date(str.replace(' ', 'T') + 'Z');
  let key = '';
  let busy = false;
  let refreshing = false;
  let selectedSession;
  let activeSession;
  let nextHeight = 9;

  function action(label, handler, style = 'secondary') {
    const button = node('button', label, 'btn ' + style);
    button.type = 'button';
    button.addEventListener('click', handler);
    return button;
  }

  async function mutate(path, body, message, errorTarget = feedback) {
    if (busy || refreshing) return false;
    busy = true;
    try {
      const data = await api(path, { key, body });
      if (path === 'teacher/open') {
        openCounter(data.code);
        return;
      }
      await refresh();
      notice(feedback, message);
      return true;
    } catch (error) {
      notice(errorTarget, error.message, true);
      return false;
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
      activeSession = sessions.find((session) => !session.closed_at);
      loginPanel.hidden = true;
      controls.hidden = false;
      const now = new Date();
      const today = day.format(now);
      const shownDate = activeSession ? asDate(activeSession.opened_at) : now;
      currentDate.textContent = longDay.format(shownDate);
      launch.textContent = activeSession
        ? day.format(shownDate) === today ? 'Reprendre la séance du jour' : 'Reprendre la séance ouverte'
        : 'Lancer la séance du jour';
      current.replaceChildren();
      if (activeSession) {
        current.append(node('p', routesText(activeSession.routes) + ' · ' + whole(activeSession.meters) + ' m', 'big'));
      } else {
        const finished = sessions.find(session => session.closed_at && day.format(asDate(session.closed_at)) === today);
        if (finished) {
          current.append(node('p', 'Dernière séance terminée · ' + routesText(finished.routes) + ' · ' + whole(finished.meters) + ' m', 'hint'));
        }
      }
      renderHeight();

      main.querySelector('#empty-correction').hidden = Boolean(sessions.length);
      main.querySelector('#correction-fields').hidden = !sessions.length;
      entrySession.replaceChildren(...sessions.map((session) => {
        const option = node('option', date.format(asDate(session.opened_at)) + ' · ' + routesText(session.routes) + ' · ' + whole(session.meters) + ' m');
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

  function renderHeight() {
    current.querySelector('#current-height')?.remove();
    const height = node('p', (activeSession?.height ?? nextHeight) + ' m par voie', 'hint');
    height.id = 'current-height';
    current.append(height);
  }

  login.addEventListener('submit', (event) => {
    event.preventDefault();
    if (refreshing) return;
    key = login.elements.key.value.replace(/[\s-]/g, '');
    if (!/^\d{12}$/.test(key)) {
      key = '';
      notice(feedback, 'Entre les 12 chiffres du code professeur.', true);
      return;
    }
    notice(feedback, '');
    refresh();
  });
  launch.addEventListener('click', () => {
    if (busy || refreshing) return;
    if (activeSession) openCounter(activeSession.code);
    else mutate('teacher/open', { height: nextHeight });
  });
  main.querySelector('#open-settings').addEventListener('click', () => {
    heightForm.elements.height.value = activeSession?.height ?? nextHeight;
    finish.hidden = !activeSession;
    notice(main.querySelector('#settings-feedback'), '');
    settings.showModal();
  });
  main.querySelector('#close-settings').addEventListener('click', () => settings.close());
  heightForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (busy || refreshing) return;
    const height = heightForm.elements.height.valueAsNumber;
    if (activeSession) {
      if (!await mutate('teacher/height', { id: activeSession.id, height }, 'Hauteur mise à jour pour les prochaines voies.', main.querySelector('#settings-feedback'))) return;
    } else {
      nextHeight = height;
      renderHeight();
    }
    settings.close();
  });
  finish.addEventListener('click', async () => {
    if (activeSession && confirm('Fermer la saisie pour cette séance ?') &&
        await mutate('teacher/close', { id: activeSession.id }, 'Séance fermée.', main.querySelector('#settings-feedback'))) settings.close();
  });
  correction.addEventListener('click', () => {
    entryPanel.hidden = !entryPanel.hidden;
    correction.setAttribute('aria-expanded', String(!entryPanel.hidden));
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
}

const page = location.pathname.replace(/\/$/, '');
document.querySelector('#back').hidden = !page;
if (page === '/compteur') counterPage();
else if (page === '/prof') teacherPage();
else if (page === '/demo') publicPage(true);
else if (page === '/suivi') publicPage();
else coverPage();
