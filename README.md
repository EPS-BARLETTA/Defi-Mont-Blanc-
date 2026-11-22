# Défi Mont Blanc · AS Escalade Vauban

Suivi collectif du défi de 4 807 m. `/` affiche la page de garde. `/suivi` montre la progression et les capsules. `/demo` simule les paliers dans le navigateur. `/compteur` permet d’ajouter une voie terminée avec un code de séance. `/prof` permet d’ouvrir et fermer une séance et de corriger les saisies.

## Exploitation

- Configurer `TEACHER_KEY` comme secret côté hébergeur.
- Déployer le Worker avec la base D1 `DB`. Les migrations sont dans `drizzle/`.
- Démarrer une séance sur l’iPad, avec 9 m par voie par défaut. L’iPad passe en mode saisie. Revenir à l’espace prof pour terminer ou corriger la séance.
- Aucun compte élève ni nom. Le public reçoit uniquement les agrégats. Le navigateur garde la saisie en cours dans l’onglet pour permettre une annulation.

`npm run build` produit le Worker. `npm test` vérifie les calculs et les accès avec SQLite local. `npm run dev` démarre une prévisualisation locale avec une base temporaire.

## Visuels

- Photo [Mont Blanc – Goûter route](https://commons.wikimedia.org/wiki/File:Mont_Blanc_-_Go%C3%BBter_route.jpg), Christian / Camptocamp, [CC BY-SA 2.0 France](https://creativecommons.org/licenses/by-sa/2.0/fr/). Redimensionnée et compressée, avec tracé de progression superposé. Le visuel adapté est sous la même licence.
- Logo AS Vauban fourni pour ce projet. Reproduit à l’identique. La licence de la photo ne s’applique pas à ce logo.
- Les capsules sont rédigées pour le défi, avec les liens vers leurs sources.
