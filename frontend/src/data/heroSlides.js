/**
 * Full-bleed hero scenes (Figma “slider” style): gradient, mega type, hero shot, floating accents.
 * @typedef {{ src: string, top?: string, left?: string, right?: string, bottom?: string, size: number, delay?: number }} Floater
 * @typedef {{ id: string, title: string, line: string, image: string, gradient: string, floaters: Floater[] }} HeroSlide
 */

/** @type {HeroSlide[]} */
export const heroSlides = [
  {
    id: 'latte',
    title: 'LATTE',
    line: 'Onctueux & équilibré',
    image: 'Latte Macchiato.jpg',
    gradient:
      'radial-gradient(ellipse 90% 75% at 50% 110%, #6b4c3a 0%, #3d2418 42%, #1a0f0c 100%)',
    floaters: [
      { src: 'Café Espresso.jpg', top: '10%', left: '6%', size: 76, delay: 0 },
      { src: 'Chocolat Chaud.jpg', bottom: '14%', right: '8%', size: 68, delay: 0.2 },
      { src: 'Café Crème.jpg', top: '22%', right: '12%', size: 56, delay: 0.4 },
    ],
  },
  {
    id: 'crepe',
    title: 'CRÊPE',
    line: 'Nutella & banane',
    image: 'Crêpe Nutella Banane.jpg',
    gradient:
      'radial-gradient(ellipse 88% 72% at 50% 100%, #8b5a2b 0%, #4a2c14 45%, #1f1208 100%)',
    floaters: [
      { src: 'Crêpe Nutella.jpg', top: '14%', left: '10%', size: 72, delay: 0 },
      { src: 'Crêpe Biscoff.jpg', bottom: '12%', right: '10%', size: 70, delay: 0.15 },
      { src: 'Gaufre miel.jpg', top: '20%', right: '6%', size: 58, delay: 0.35 },
    ],
  },
  {
    id: 'pistachio',
    title: 'PISTACHIO',
    line: 'Pancake signature',
    image: 'Pancake Pistachio.jpg',
    gradient:
      'radial-gradient(ellipse 85% 70% at 50% 105%, #3d6b52 0%, #1e4a38 48%, #0e2419 100%)',
    floaters: [
      { src: 'Pancake Lotus.jpg', top: '12%', left: '8%', size: 68, delay: 0 },
      { src: 'Pancake Oreo.jpg', bottom: '16%', right: '9%', size: 64, delay: 0.25 },
      { src: 'Crêpe Pistachio.jpg', top: '24%', right: '11%', size: 60, delay: 0.4 },
    ],
  },
  {
    id: 'mangue',
    title: 'MANGUE',
    line: 'FreshUp vitaminé',
    image: 'FreshUp mangue.jpg',
    gradient:
      'radial-gradient(ellipse 88% 75% at 50% 100%, #e8a038 0%, #b85c14 40%, #4a2608 100%)',
    floaters: [
      { src: 'FreshUp Ananas.jpg', top: '11%', left: '7%', size: 70, delay: 0 },
      { src: 'FreshUp fraise.jpg', bottom: '14%', right: '8%', size: 66, delay: 0.2 },
      { src: 'FreshUp citron.jpg', top: '26%', right: '10%', size: 58, delay: 0.35 },
    ],
  },
  {
    id: 'fraise',
    title: 'FRAISE',
    line: 'Bubble tea fruité',
    image: 'Bubble Tea Fraise.png',
    gradient:
      'radial-gradient(ellipse 86% 72% at 50% 100%, #c94d6a 0%, #7a1e32 44%, #2a0a12 100%)',
    floaters: [
      { src: 'Strawberry Milked Bubble Tea.png', top: '13%', left: '9%', size: 64, delay: 0 },
      { src: 'Bubble Tea Citron.png', bottom: '15%', right: '7%', size: 62, delay: 0.2 },
      { src: 'FreshUp Framboise.jpg', top: '22%', right: '12%', size: 58, delay: 0.4 },
    ],
  },
  {
    id: 'gaufre',
    title: 'GAUFRE',
    line: 'Gourmand & croustillant',
    image: 'Gaufre Nutella.jpg',
    gradient:
      'radial-gradient(ellipse 88% 74% at 50% 100%, #5c3d2e 0%, #2e1810 46%, #120a08 100%)',
    floaters: [
      { src: 'Gaufre Biscoff.jpg', top: '12%', left: '8%', size: 70, delay: 0 },
      { src: 'Gaufre Nutella banana.jpg', bottom: '13%', right: '9%', size: 68, delay: 0.18 },
      { src: 'Chocolat Fondu.png', top: '24%', right: '8%', size: 56, delay: 0.38 },
    ],
  },
];
