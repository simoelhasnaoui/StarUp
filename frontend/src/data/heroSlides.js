/**
 * Full-bleed hero scenes (Figma “slider” style): gradient, mega type, hero shot, floating accents.
 * @typedef {{ src: string, top?: string, left?: string, right?: string, bottom?: string, size: number, delay?: number, enterFrom?: 'top' | 'bottom' }} Floater
 * @typedef {{ id: string, title: string, bgName: string, bgSize?: string, line: string, image: string, gradient: string, floaters: Floater[] }} HeroSlide
 */

/** @type {HeroSlide[]} */
export const heroSlides = [
  {
    id: 'breakfast',
    title: 'Crêpe Gourmande Charcuterie & Œuf',
    bgName: 'GOURMANDE',
    bgSize: '15vw',
    line: 'Un brunch signature généreux, combinant une charcuterie premium, un œuf parfaitement coulant et des touches de verdure fraîche pour éveiller vos papilles.',
    image: 'breakfast.png',
    gradient:
      'radial-gradient(ellipse 88% 76% at 50% 105%, #b75b52 0%, #7a2b28 44%, #2a0f10 100%)',
    floaters: [
      { src: 'egg.png', top: '16%', left: '14%', size: 175, delay: 0, enterFrom: 'top' },
      {
        src: 'tomate cerise.png',
        bottom: '16%',
        right: '14%',
        size: 175,
        delay: 0.12,
        enterFrom: 'bottom',
      },
    ],
  },
  {
    id: 'charcuterie',
    title: 'CRÊPE CHARCUTERIE',
    bgName: 'CHARCUTERIE',
    bgSize: '13vw',
    line: 'Une crêpe fondante garnie de fines tranches de charcuterie sélectionnée, offrant une expérience salée riche et authentique à chaque bouchée.',
    image: 'Crêpe Charcuterie Hero.png',
    gradient:
      'radial-gradient(ellipse 88% 76% at 50% 105%, #8b5a2b 0%, #4a2c14 45%, #1f1208 100%)',
    floaters: [
      { src: 'charcuterie.png', top: '8%', left: '12%', size: 220, delay: 0, enterFrom: 'top' },
      { src: 'charcuterie1.png', bottom: '4%', right: '12%', size: 220, delay: 0.15, enterFrom: 'bottom' },
    ],
  },
  {
    id: 'poulet-champignon',
    title: 'CRÊPE POULET CHAMPIGNON',
    bgName: 'CHAMPIGNON',
    bgSize: '14vw',
    line: 'L\'alliance classique et réconfortante d\'un poulet tendre et de champignons dorés, le tout nappé d\'une sauce veloutée dans une crêpe dorée à souhait.',
    image: 'Crêpe Poulet Champignon Hero.png',
    gradient:
      'radial-gradient(ellipse 88% 76% at 50% 105%, #b28a50 0%, #6e4e20 44%, #2e1d08 100%)',
    floaters: [
      { src: 'chickenbreast.png', top: '2%', left: '12%', size: 300, delay: 0, enterFrom: 'top' },
      { src: 'mushroom.png', bottom: '4%', right: '12%', size: 300, delay: 0.15, enterFrom: 'bottom' },
    ],
  },
  {
    id: 'reve-fromage',
    title: 'CRÊPE RÊVE DU FROMAGE',
    bgName: 'FROMAGE',
    bgSize: '18vw',
    line: 'Une symphonie onctueuse de fromages fondus. Intense, gourmande et filante, cette merveille comblera toutes vos envies irrésistibles de fromage.',
    image: 'Crêpe Rêve du Fromage.png',
    gradient:
      'radial-gradient(ellipse 88% 76% at 50% 105%, #d1a84f 0%, #876521 44%, #302005 100%)',
    floaters: [
      { src: 'cheese.png', top: '2%', left: '12%', size: 300, delay: 0, enterFrom: 'top' },
      { src: 'cheese1.png', bottom: '4%', right: '12%', size: 300, delay: 0.15, enterFrom: 'bottom' },
    ],
  },
];
