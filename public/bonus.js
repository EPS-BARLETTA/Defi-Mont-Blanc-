const feder = 'https://www.ffme.fr/';
const ffme = 'FFME';

export const bonus = [
  {
    at: 500, kind: 'Histoire du Mont Blanc', title: 'La première cordée',
    questions: [{
      prompt: 'Qui atteint le sommet du Mont Blanc le 8 août 1786 ?',
      choices: ['Marie Paradis et Henriette d’Angeville', 'Jacques Balmat et Michel-Gabriel Paccard', 'Deux athlètes olympiques'],
      correct: 1, explain: 'Jacques Balmat et le médecin Michel-Gabriel Paccard signent la première ascension connue du Mont Blanc.',
    }],
    source: 'https://www.chamonix.com/nos-inspirations/mont-blanc-alpinisme', label: 'Découvrir les débuts de l’alpinisme · Chamonix',
  },
  {
    at: 1000, kind: 'Pionnières', title: 'Deux femmes au sommet',
    questions: [{
      prompt: 'Qui est la première femme connue à avoir gravi le Mont Blanc ?',
      choices: ['Henriette d’Angeville', 'Janja Garnbret', 'Marie Paradis'],
      correct: 2, explain: 'Marie Paradis atteint le sommet en 1808. Henriette d’Angeville lui emboîte le pas en 1838, après avoir organisé sa propre expédition.',
    }],
    source: 'https://www.chamonix.com/infos-et-services/espace-presse/girl-power-l-alpinisme-au-feminin', label: 'Lire le portrait des pionnières · Chamonix',
  },
  {
    at: 1500, kind: 'Handicap et montagne', title: 'Le Mont Blanc avec une prothèse',
    questions: [{
      prompt: 'En 2020, comment Samuel Ferber et Luc Méheux, chacun amputé d’une partie d’une jambe, rejoignent-ils le sommet ?',
      choices: ['En grimpant avec leurs prothèses', 'En hélicoptère', 'En téléphérique jusqu’au sommet'],
      correct: 0, explain: 'Ils grimpent avec leurs prothèses. Tous les deux atteignent le sommet le 14 juillet, après s’être préparés avec le Club alpin de Colmar.',
    }],
    source: 'https://www.chamonix.net/francais/actualite/amputes-dun-tibia-ils-ont-gravi-le-mont-blanc', label: 'Lire leur récit · Chamonix.net',
  },
  {
    at: 2000, kind: 'Les disciplines', title: 'À chacun son défi',
    questions: [
      {
        prompt: 'Dans quelle discipline grimpe-t-on sur des parois basses au-dessus de tapis ?',
        choices: ['La vitesse', 'Le bloc', 'La difficulté'],
        correct: 1, explain: 'En bloc, il faut réussir quelques mouvements exigeants. En difficulté, on cherche à monter le plus haut possible sur une longue voie, avec une corde.',
      },
      {
        prompt: 'Dans quelle discipline le chronomètre départage-t-il les grimpeurs ?',
        choices: ['La difficulté', 'Le bloc', 'La vitesse'],
        correct: 2, explain: 'En vitesse, on grimpe le plus vite possible sur une voie standardisée. C’est la même disposition de prises en compétition.',
      },
    ],
    source: feder + 'escalade/structure-artificielle/trois-disciplines-trois-equipements/', label: 'Voir les trois disciplines · ' + ffme,
  },
  {
    at: 2500, kind: 'Équipe de France', title: 'Oriane et Mejdi, en argent',
    questions: [{
      prompt: 'Aux Mondiaux 2025, dans quelle discipline Oriane Bertone et Mejdi Schalck remportent-ils chacun l’argent ?',
      choices: ['En bloc', 'En vitesse', 'En difficulté'],
      correct: 0, explain: 'En bloc, à Séoul. Oriane Bertone et Mejdi Schalck sont tous les deux vice-champions du monde dans leur épreuve.',
    }],
    source: feder + 'championnat-du-monde-2025-le-recap/', label: 'Voir les résultats français · ' + ffme,
  },
  {
    at: 3000, kind: 'Champions du monde entier', title: 'Janja et Toby, en or',
    questions: [{
      prompt: 'Qui remporte le combiné bloc-difficulté aux Jeux de Paris 2024 ?',
      choices: ['Marie Paradis et Jacques Balmat', 'Lucie Jarrige et Adam Ondra', 'Janja Garnbret et Toby Roberts'],
      correct: 2, explain: 'La Slovène Janja Garnbret remporte son deuxième titre olympique. Le Britannique Toby Roberts remporte son premier.',
    }],
    source: feder + 'sam-avezou-pare-de-bronze-a-koper/', label: 'Retrouver les champions en Coupe du monde · ' + ffme,
  },
  {
    at: 3500, kind: 'Évolution du matériel', title: 'Du chanvre à la corde dynamique',
    questions: [
      {
        prompt: 'Quelle fibre naturelle servait autrefois à fabriquer des cordes d’alpinisme ?',
        choices: ['Le chanvre', 'La soie', 'Le polyester'],
        correct: 0, explain: 'Le chanvre a longtemps été utilisé. Au XXᵉ siècle, les fibres synthétiques comme le nylon prennent le relais.',
      },
      {
        prompt: 'À quoi sert l’élasticité d’une corde dynamique ?',
        choices: ['À faire rebondir le grimpeur vers le sommet', 'À amortir le choc d’une chute', 'À rendre le mur moins raide'],
        correct: 1, explain: 'La corde s’allonge brièvement sous l’effort. Cet allongement aide à amortir le choc.',
      },
    ],
    source: 'https://www.sac-cas.ch/fr/les-alpes/linvention-de-la-corde-moderne-du-chanvre-a-la-fibre-synthetique-18730/', label: 'Voir les photos des anciennes cordes · Club alpin suisse',
  },
  {
    at: 4000, kind: 'Écologie', title: 'Enquête à la Mer de Glace',
    questions: [
      {
        prompt: 'Que veut dire « le glacier recule » ?',
        choices: ['Toute la glace remonte en haut de la montagne', 'Le glacier change de vallée', 'Le bout du glacier se retrouve plus haut dans la vallée'],
        correct: 2, explain: 'La glace continue de s’écouler vers le bas. Le front, c’est-à-dire l’extrémité du glacier, recule quand la fonte l’emporte sur l’arrivée de glace à cet endroit.',
      },
      {
        prompt: 'Pourquoi fallait-il ajouter des marches pour rejoindre la Mer de Glace depuis le Montenvers ?',
        choices: ['La surface de la glace s’est abaissée', 'Le train est devenu plus haut', 'La montagne s’est mise à grandir'],
        correct: 0, explain: 'Le glacier s’est aminci. Quand sa surface baisse, il faut descendre davantage pour l’atteindre.',
      },
    ],
    dossier: [
      ['Observer', 'Le front recule et la surface s’abaisse. Ce sont deux changements que l’on peut suivre séparément.'],
      ['Comprendre', 'La neige accumulée en altitude peut former de la glace. Quand les pertes dues à la fonte dépassent les gains, le glacier perd de la masse.'],
      ['Mesurer', 'Les chercheurs comparent des photos prises à différentes dates. Au glacier d’Argentière, près de Chamonix, ils utilisent aussi des capteurs pour étudier les mouvements de la glace.'],
    ],
    source: 'https://lejournal.cnrs.fr/videos/le-cri-glacant-du-glacier', label: 'Regarder la vidéo du CNRS · 6 min 17',
  },
  {
    at: 4500, kind: 'Para-escalade', title: 'Une voix pour guider la grimpe',
    questions: [{
      prompt: 'Comment un guide peut-il aider une personne déficiente visuelle à trouver les prises ?',
      choices: ['En faisant clignoter la lumière de la salle', 'En indiquant leur position à voix haute', 'En secouant la corde à chaque mouvement'],
      correct: 1, explain: 'Le guide peut décrire à voix haute la direction et la distance des prises. La communication se prépare ensemble.',
    }],
    source: feder + 'accueillir-une-personne-deficiente-visuelle-en-escalade/', label: 'Découvrir le guidage · ' + ffme,
  },
  {
    at: 4807, kind: 'Défi flash', title: 'Le dernier défi de la cordée',
    questions: [
      {
        prompt: 'En compétition, quelle est la hauteur du mur de vitesse ?',
        choices: ['9 m', '20 m', '15 m'],
        correct: 2, explain: '15 m. Le mur officiel de vitesse est standardisé pour que les chronos soient comparables.',
      },
      {
        prompt: 'Le défi fait 4 807 m. À 9 m par voie, combien de voies faut-il au minimum ?',
        choices: ['534', '535', '536'],
        correct: 1, explain: '534 voies donnent 4 806 m. Il manquerait un seul mètre ! La 535ᵉ voie fait passer le total à 4 815 m.',
      },
    ],
    dossier: [['Défi à deux', 'En 20 secondes, inventez un nom de cordée et une pose de sommet sur le sol. Présentez-les au groupe !']],
    source: feder + 'escalade/structure-artificielle/trois-disciplines-trois-equipements/', label: 'Voir le mur de vitesse · ' + ffme,
  },
];
