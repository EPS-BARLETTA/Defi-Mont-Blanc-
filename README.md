# Défi Mont Blanc · AS Escalade Vauban

Suivi collectif du défi de 4 807 m. `/` affiche la progression et les capsules. `/compteur` permet d’ajouter une voie terminée avec un code de séance. `/prof` permet d’ouvrir et fermer les séances, de corriger les saisies et de copier les mètres d’une séance fermée pour les reporter dans ZENOS Tour.

## Exploitation

- Configurer `TEACHER_KEY` comme secret côté hébergeur.
- Déployer le Worker avec la base D1 `DB`. Les migrations sont dans `drizzle/`.
- À l’ouverture d’une séance, saisir la hauteur en mètres comptée pour chaque voie, puis partager le lien ou le code avec les élèves.
- Aucun compte élève ni nom. Le public reçoit uniquement les agrégats. Le navigateur garde la saisie en cours dans l’onglet pour permettre une annulation.

`npm run build` produit le Worker. `npm test` vérifie les calculs et les accès avec SQLite local. `npm run dev` démarre une prévisualisation locale avec une base temporaire.

## Visuels

- Photo [Mont Blanc – Goûter route](https://commons.wikimedia.org/wiki/File:Mont_Blanc_-_Go%C3%BBter_route.jpg), Christian / Camptocamp, [CC BY-SA 2.0 France](https://creativecommons.org/licenses/by-sa/2.0/fr/). Redimensionnée et compressée, avec tracé de progression superposé. Le visuel adapté est sous la même licence.
- Logo AS Vauban fourni pour ce projet. Reproduit à l’identique. La licence de la photo ne s’applique pas à ce logo.
- Les capsules sont rédigées pour le défi, avec les liens vers leurs sources.
