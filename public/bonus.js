// Each choice opens its own discovery immediately. No answers are recorded.
export const bonus = [
  {
    at: 500,
    kind: "Ta voie",
    title: "Mission : que raconte le panneau de ta voie ?",
    hint: "Choisis la case correspondant à ton panneau. À Vauban, tu peux lire 4 ou 4+. En falaise, les voies les plus difficiles atteignent 9c.",
    choices: {
      "3a ou 3a+": "Quel appui t’a permis de monter sans trop tirer sur les bras ?",
      "3b ou 3b+": "Choisis un passage où tu as dû chercher où poser le pied.",
      "3c ou 3c+": "Quel mouvement t’a demandé le plus de précision ?",
      "4 ou 4+ (panneau de Vauban)": "Lis exactement ce qui est marqué sur ton panneau. Compare ensuite cette voie avec une autre du même niveau au lycée.",
      "4a ou 4a+": "Repère un passage que tu as grimpé de deux façons différentes.",
      "4b ou 4b+": "À quel moment déplacer un pied t’a aidé à atteindre la prise suivante ?",
      "4c ou 4c+": "Quel passage aimerais-tu réessayer avec un autre placement ?",
      "5a ou 5a+": "Deux voies de même cotation peuvent avoir des longueurs et des styles différents.",
      "5b ou 5b+": "Quel mouvement t’a paru le plus difficile aujourd’hui ?",
      "5c ou 5c+": "Si tu refaisais cette voie, quel passage préparerais-tu depuis le sol ?",
      "Du 6a au 6c+": "Une voie peut comporter un passage difficile très court. As-tu repéré le tien ?",
      "Du 7a au 7c+": "Le 7c+ est le dernier échelon du degré 7. Le 8a est le premier du degré suivant.",
      "Du 8a au 8c+": "Après 8c+, on passe à 9a. Même dans ces niveaux, les lettres et le « + » distinguent les difficultés.",
      "Du 9a au 9c": "Dans le Verdon, DNA est une voie cotée 9c. Le Français Sébastien Bouin l’a enchaînée le premier en 2022. Jakob Schubert l’a répétée en 2026 et a confirmé la cotation."
    },
    unknown: "La prochaine fois, repère le petit panneau au pied de la voie avec ton prof. Les chiffres et les lettres indiquent la difficulté.",
    icon: "🧗",
    fact: "En voie, la cotation indique la difficulté, et la hauteur se mesure en mètres. Les lettres et le « + » affinent le niveau : 3a, 3a+, 3b, 3b+, 3c, 3c+, puis 4a, et ainsi de suite jusqu’à 9c. En bloc, l’échelle de Fontainebleau est différente : on écrit souvent 6A, 7B ou 8C+, et les blocs les plus durs atteignent au moins 9A.",
    sources: [
      [
        "Voie DNA (9c) · Climbing History",
        "https://climbing-history.org/hardest?discipline=sport&grade=9b"
      ],
      [
        "Les blocs les plus difficiles · Climbing History",
        "https://climbing-history.org/hardest?discipline=boulder&grade=8C%2B"
      ]
    ]
  },
  {
    at: 1000,
    wallGear: true,
    kind: "Ta cordée",
    title: "Détective de la corde : elle passait où au départ ?",
    hint: "Repense au moment où tu as quitté le sol.",
    choices: {
      "Déjà tout en haut": "Tu grimpais en moulinette ! Le nom fait penser à une poulie. La corde passe par le relais en haut de la voie et te relie à la personne qui t’assure.",
      "Je la montais avec moi": "Tu décris la grimpe en tête. En moulinette, la corde passe déjà en haut avant le départ. Dans les deux cas, tu fais équipe avec la personne qui t’assure.",
      "Je faisais du bloc": "En bloc, tu enchaînes quelques mouvements au-dessus de tapis. Change de décor : en moulinette, un relais en haut du mur permet à la corde de relier les deux partenaires."
    },
    unknown: "Demande à ton binôme de dessiner le trajet de la corde dans les airs. Si elle passait déjà par le haut au départ, c’était une moulinette.",
    icon: "🪢",
    fact: "En moulinette, la corde passe déjà par le relais en haut du mur quand tu commences à grimper."
  },
  {
    at: 1500,
    kind: "Au pied du mur",
    title: "Reconnais-tu l’appareil de ta séance ?",
    hint: "Touche la photo qui ressemble au matériel de ta séance.",
    choices: {
      "JUL²": "Le marquage JUL² et le câble vert permettent de repérer cet appareil Edelrid sur la photo.",
      "Appareil noir Black Diamond": "Observe sa grande ouverture et le petit logo blanc. Il ressemble à un ATC-Pilot.",
      "Appareil gris à poignée noire": "Reconnais-tu sa poignée noire et ses deux petites ouvertures obliques ? Compare sa silhouette avec le matériel de ta séance.",
      "Tube orange": "Regarde la forme du tube orange. Tu peux retrouver les appareils de cette famille sur le râtelier."
    },
    photos: [
      "jul",
      "pilot",
      "smart",
      "tubes"
    ],
    unknown: "Compare les photos avec ton appareil, puis demande son nom au prof.",
    icon: "🔎",
    fact: "Repère le nom gravé sur l’appareil et compare sa silhouette au matériel de ta séance."
  },
  {
    at: 2000,
    kind: "Ta corde",
    title: "À toi de parier : quel diamètre pour la corde orange ?",
    hint: "Fais ton pari, puis découvre son étiquette.",
    choices: {
      "9 mm": "Un peu plus épaisse !",
      "10 mm": "Tu es à un demi-millimètre près !",
      "10,5 mm": "Pile ! Tu as trouvé le diamètre.",
      "11 mm": "Tu dépasses d’un demi-millimètre."
    },
    unknown: "La réponse est écrite sur l’emballage.",
    extra: "La Beal Wall Master Unicore photographiée mesure 10,5 mm de diamètre et 20 m de long. Autrefois, les cordes étaient en chanvre. Au XXᵉ siècle, le nylon a pris le relais.",
    revealPhoto: "corde",
    source: "https://www.sac-cas.ch/fr/les-alpes/linvention-de-la-corde-moderne-du-chanvre-a-la-fibre-synthetique-18730/",
    label: "Voir les anciennes cordes",
    icon: "🟠",
    fact: "Sur l’étiquette de la corde orange de Vauban, on lit 10,5 mm de diamètre et 20 m de longueur."
  },
  { at: 2500, kind: 'Tes pieds', title: 'Baskets ou chaussons aujourd’hui ?', hint: 'Regarde tes pieds !', choices: {
    'En baskets': 'Observe la pointe de ta basket. Compare-la à celle, souvent plus fine, d’un chausson : laquelle masquerait le moins une petite prise ?',
    'En chaussons': 'Regarde la gomme au bout de ton chausson. On retrouve déjà une semelle lisse sur les « PA », des chaussons mis au point par le grimpeur français Pierre Allain.'
  }, unknown: 'Un chausson de grimpe se reconnaît notamment à sa semelle en gomme.', extra: 'Il y a plus d’un siècle, certains grimpeurs portaient même des chaussons à semelle de corde. Imagine-les à côté de tes chaussures !',
    source: 'https://www.sac-cas.ch/fr/les-alpes/chaussons-de-contrebandier-27079/', label: 'Voir une paire ancienne' },
  { at: 3000, kind: 'Histoires de cordées', title: 'Au sommet, à qui tends-tu le micro ?', hint: 'Choisis la cordée dont tu veux entendre l’histoire en premier.', choices: {
    'Aux premiers arrivés': '1786. Jacques Balmat et Michel-Gabriel Paccard réalisent la première ascension connue du mont Blanc.',
    'À une pionnière': '1808. Marie Paradis devient la première femme connue à atteindre le sommet du mont Blanc.',
    'À Samuel et Luc': '2020. Samuel Ferber et Luc Méheux, chacun amputé d’une partie d’une jambe, atteignent le sommet avec leurs prothèses après une préparation au Club alpin de Colmar.'
  }, unknown: 'Trois récits, un même sommet. Choisis un portrait à raconter à ton binôme.', gallery: true,
    source: 'https://www.chamonix.net/francais/actualite/amputes-dun-tibia-ils-ont-gravi-le-mont-blanc', label: 'Lire le récit de Samuel et Luc' },
  {
    at: 3500,
    kind: "Ton style",
    title: "Bloc, vitesse ou difficulté ?",
    hint: "Choisis une discipline pour découvrir son palmarès ou jouer les commentateurs.",
    choices: {
      "Le bloc": "En France, Oriane Bertone et Max Bertone ont remporté les titres seniors de bloc en 2026. Aux Mondiaux de Séoul en 2025, les titres sont revenus à la Slovène Janja Garnbret et au Japonais Sorato Anraku. Le Français Mejdi Schalck y a décroché l’argent.",
      "La vitesse": "À Vauban, on a deux voies officielles de vitesse junior, avec pad de départ et chrono. Imagine deux élèves côte à côte. À toi de commenter les trois dernières secondes : qui termine en premier et quel temps s’affiche ?",
      "La difficulté": "« Encore une prise ! Jusqu’où ira-t-elle sur cette longue voie ? » Fais monter le suspense sans prononcer le mot « grimper »."
    },
    unknown: "Essaie la vitesse : ton binôme annonce le départ et tu commentes l’arrivée sur les voies de Vauban !",
    choiceSources: {
      "Le bloc": [
        [
          "Championnat de France 2026 · FFME",
          "https://www.ffme.fr/les-bertone-champions-de-france-de-bloc-2026/"
        ],
        [
          "Mondiaux féminins 2025 · World Climbing",
          "https://www.worldclimbing.com/events/ifsc-climbing-world-championships-seoul-2025/news/garnbret-adds-boulder-gold-to-ever-growing-number-of-world-titles"
        ],
        [
          "Mondiaux masculins 2025 · World Climbing",
          "https://www.worldclimbing.com/events_old/ifsc-climbing-world-championships-seoul-2025/news/anraku-wins-world-title-in-more-last-gasp-gold-drama"
        ]
      ]
    }
  },
  {
    at: 4000,
    kind: "Mission glacier",
    title: "Deux photos du même glacier : que regardes-tu ?",
    hint: "Choisis un indice à suivre dans le paysage.",
    choices: {
      "Le bout du glacier": "Bien vu : tu peux repérer le front du glacier par rapport à un rocher fixe et voir si son extrémité a reculé.",
      "La hauteur de la glace": "Bonne piste : à la Mer de Glace, la surface s’est abaissée. Depuis le Montenvers, il fallait descendre toujours plus de marches pour la rejoindre."
    },
    unknown: "Choisis un gros rocher immobile comme repère. Sur les deux photos, où arrive la glace par rapport à lui ?",
    source: "https://lejournal.cnrs.fr/videos/le-cri-glacant-du-glacier",
    label: "Voir le glacier avec les chercheurs",
    icon: "🧊",
    fact: "La Mer de Glace a reculé et sa surface s’est abaissée. Un repère fixe, comme un gros rocher, aide à comparer les photos."
  },
  {
    at: 4500,
    icon: "🏅",
    kind: "Culture escalade",
    title: "Qui a remporté les titres en difficulté ?",
    hint: "Touche une catégorie pour découvrir son champion ou sa championne.",
    choices: {
      "Championne de France": "Manon Hily 🇫🇷. À Saint-Étienne en 2026, elle a remporté son quatrième titre de France consécutif en difficulté.",
      "Champion de France": "Victor Guillermin 🇫🇷. Deuxième après les qualifications, il a remporté la finale du championnat de France 2026 à Saint-Étienne.",
      "Championne du monde": "Janja Garnbret 🇸🇮. À Séoul en 2025, la Slovène a remporté son troisième titre mondial en difficulté. Elle est la seule à avoir terminé la voie de la finale féminine.",
      "Champion du monde": "Dohyun Lee 🇰🇷. Le Sud-Coréen a décroché son premier titre mondial en difficulté à Séoul, sa ville natale, en 2025."
    },
    unknown: "Choisis un titre à découvrir. Les titres français datent de 2026, et les titres mondiaux de Séoul 2025.",
    sources: [
      [
        "Résultats français · FFME",
        "https://www.ffme.fr/hily-et-guillermin-championnes-et-champions-de-france-de-difficulte-2026/"
      ],
      [
        "Résultats mondiaux · World Climbing",
        "https://www.worldclimbing.com/news/lee-and-garnbret-take-lead-world-titles"
      ]
    ]
  },
  {
    at: 4807,
    icon: "⏱️",
    kind: "Culture escalade",
    title: "Au sommet, place aux champions de vitesse",
    hint: "À Vauban, tu as deux voies de vitesse junior avec pad de départ et chrono. Découvre les athlètes qui ont remporté les titres seniors.",
    choices: {
      "Championne de France": "Capucine Viglione 🇫🇷. Elle a remporté le championnat de France 2026 et signé un temps de 6,466 s en qualifications.",
      "Champion de France": "Marceau Garnier 🇫🇷. Il a remporté le championnat de France de vitesse 2026 organisé dans l’Aube.",
      "Championne du monde": "Aleksandra Mirosław 🇵🇱. La Polonaise a remporté le titre mondial 2025 à Séoul en 6,03 s, un record du monde au moment de la course.",
      "Champion du monde": "Long Jianguo 🇨🇳. Le Chinois a remporté la finale des Mondiaux de Séoul 2025 en 4,80 s."
    },
    unknown: "Choisis un titre à découvrir. Sur une voie de vitesse, quelques centièmes peuvent changer l’issue d’un duel.",
    sources: [
      [
        "Résultats français · FFME",
        "https://www.ffme.fr/capucine-viglione-et-marceau-garnier-sacres-championne-et-champion-de-france-de-vitesse-2026/"
      ],
      [
        "Mondiaux féminins · World Climbing",
        "https://www.worldclimbing.com/events_old/ifsc-climbing-world-championships-seoul-2025/news/miroslaw-breaks-world-record-on-the-way-to-women-s-speed-title"
      ],
      [
        "Mondiaux masculins · World Climbing",
        "https://www.worldclimbing.com/events/ifsc-climbing-world-championships-seoul-2025/news/consistency-key-for-long-s-speed-world-title-win"
      ]
    ]
  }
];
