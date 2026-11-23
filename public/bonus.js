// Each choice opens its own discovery immediately. No answers are recorded.
export const bonus = [
  { at: 500, kind: 'Ta voie', title: 'Tu viens de grimper quoi ?', hint: 'Choisis la cotation écrite au départ de ta voie.', choices: {
    '4 ou moins': 'En falaise, deux voies de même cotation peuvent être très différentes. Une dalle demande parfois surtout de trouver où poser les pieds.',
    '5a': 'Un 5a peut mesurer 9 m au gymnase et être bien plus long en falaise. Le 5a parle de difficulté. Pour connaître la hauteur, il faut une autre information !',
    '5b ou 5c': 'Dans le cinquième degré, on passe de 5a à 5b, puis à 5c. Quel mouvement t’a paru le plus difficile aujourd’hui ?',
    '6a ou plus': 'Une cotation résume la difficulté de la voie. Un passage très court peut donner du fil à retordre, même si tout le début paraît facile.'
  }, unknown: 'La prochaine fois, repère le petit panneau au pied de la voie avec ton prof. Les chiffres et les lettres indiquent la difficulté.' },
  { at: 1000, kind: 'Ta cordée', title: 'Elle passait où, ta corde ?', hint: 'Repense au moment où tu as quitté le sol.', choices: {
    'Déjà tout en haut': 'Tu grimpais en moulinette ! Le nom fait penser à une poulie. La corde passe par le relais en haut de la voie et te relie à la personne qui t’assure.',
    'Je la montais avec moi': 'Tu décris la grimpe en tête. En moulinette, la corde passe déjà en haut avant le départ. Dans les deux cas, tu fais équipe avec la personne qui t’assure.',
    'Je faisais du bloc': 'En bloc, tu enchaînes quelques mouvements au-dessus de tapis. Change de décor : en moulinette, un relais en haut du mur permet à la corde de relier les deux partenaires.'
  }, unknown: 'Demande à ton binôme de dessiner le trajet de la corde dans les airs. Si elle passait déjà par le haut au départ, c’était une moulinette.' },
  { at: 1500, kind: 'Au pied du mur', title: 'Quel appareil as-tu utilisé pour assurer ?', hint: 'Touche le nom que tu reconnais pour ouvrir la galerie.', choices: {
    GRIGRI: 'Petzl · appareil à came.', BIRDIE: 'Beal · appareil à came.', 'Smart 2.0': 'Mammut · freinage assisté par la géométrie de l’appareil.', REVERSO: 'Petzl · appareil de type tube, à freinage manuel.', 'CLICK UP': 'Climbing Technology · freinage assisté avec le mousqueton.', 'MEGA JUL': 'Edelrid · freinage assisté par la géométrie de l’appareil.'
  }, unknown: 'Cherche avec ton prof le nom inscrit sur le matériel. Voici six modèles que tu peux rencontrer.', gallery: true,
    source: 'https://www.petzl.com/FR/fr/Sport/Assureurs--descendeurs/Comment-choisir', label: 'Voir le GRIGRI et le REVERSO en photo' },
  { at: 2000, kind: 'Ta corde', title: 'À ton avis, ta corde mesure combien de millimètres de diamètre ?', hint: 'Fais une estimation. Le prof pourra te montrer la valeur sur le matériel.', choices: {
    '9 mm': '9 mm, c’est moins d’un centimètre.', '10 mm': '10 mm, c’est exactement un centimètre.', '11 mm': '11 mm, c’est un peu plus d’un centimètre.'
  }, unknown: 'À l’œil, difficile de distinguer un millimètre !', extra: 'Autrefois, les cordes étaient en chanvre. Au XXᵉ siècle, le nylon a pris le relais. Une corde dynamique moderne peut s’allonger pour amortir une chute. Le diamètre de la corde de Vauban reste à vérifier avec le prof.',
    source: 'https://www.sac-cas.ch/fr/les-alpes/linvention-de-la-corde-moderne-du-chanvre-a-la-fibre-synthetique-18730/', label: 'Voir les anciennes cordes' },
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
  { at: 3500, kind: 'Ton style', title: 'Quelle épreuve aimerais-tu commenter ?', hint: 'Choisis ton terrain, puis lis la réplique à ton binôme comme à la radio.', choices: {
    'Le bloc': '« Les pieds quittent le tapis… une main, puis deux sur la prise finale ! » À toi de rejouer le commentaire au ralenti.',
    'La vitesse': '« Même mur, mêmes prises… qui touchera le sommet en premier ? » Invente les trois dernières secondes de la finale.',
    'La difficulté': '« Encore une prise ! Jusqu’où ira-t-elle sur cette longue voie ? » Fais monter le suspense sans prononcer le mot « grimper ».'
  }, unknown: 'Essaie la vitesse : commente une finale imaginaire en cinq mots !' },
  { at: 4000, kind: 'Mission glacier', title: 'Tu as deux photos du même glacier. Tu regardes quoi ?', hint: 'Choisis un indice à suivre dans le paysage.', choices: {
    'Le bout du glacier': 'Bien vu : tu peux repérer le front du glacier par rapport à un rocher fixe et voir si son extrémité a reculé.',
    'La hauteur de la glace': 'Bonne piste : à la Mer de Glace, la surface s’est abaissée. Depuis le Montenvers, il fallait descendre toujours plus de marches pour la rejoindre.'
  }, unknown: 'Choisis un gros rocher immobile comme repère. Sur les deux photos, où arrive la glace par rapport à lui ?',
    source: 'https://lejournal.cnrs.fr/videos/le-cri-glacant-du-glacier', label: 'Voir le glacier avec les chercheurs' },
  { at: 4500, kind: 'À deux', title: 'Peux-tu faire trouver une prise sans la montrer ?', hint: 'Au sol, choisissez vos rôles devant le mur.', choices: {
    'Je donne les indices': 'Choisis une prise des yeux. Donne sa couleur et un indice de position, les mains dans le dos. Ton binôme arrive-t-il à la montrer du premier coup ?',
    'Je cherche la prise': 'Ton binôme choisit une prise et te donne deux indices. Si tu hésites, pose une seule question. Puis échangez les rôles.'
  }, unknown: 'Commencez par trois prises proches du sol. Une personne en choisit une, l’autre la retrouve grâce à ses indices.' },
  { at: 4807, kind: 'Au sommet', title: 'Le drapeau Vauban est planté ! Comment fêtez-vous ça ?', hint: 'Choisissez un défi à faire en cordée, les pieds au sol.', choices: {
    'Une pose de sommet': 'À deux, dessinez une montagne avec vos bras. Le reste du groupe a trois secondes pour copier votre pose.',
    'Un cri de cordée': 'Inventez un cri en trois mots. Il doit contenir « Vauban » et faire sourire votre binôme.',
    'Un reportage express': 'Tu as dix secondes au micro imaginaire : annonce le sommet et raconte un geste de ton binôme qui t’a aidé à y arriver.'
  }, unknown: 'À tour de rôle, terminez cette phrase : « Sans ma cordée, je n’aurais pas… »' }
];
