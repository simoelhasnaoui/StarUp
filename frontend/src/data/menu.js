/** @typedef {{ name: string, image: string, note?: string }} MenuItem */
/** @typedef {{ id: string, title: string, items: MenuItem[] }} MenuCategory */

/** @type {string} */
export const LOGO_NO_BG = 'no background starup logo.PNG';

/** @type {string} */
export const LOGO_GREEN = 'green starup logo.PNG';

/** @type {MenuCategory[]} */
export const menuCategories = [
  {
    id: 'petit-dejeuner',
    title: 'Petit déjeuner',
    items: [
      { name: 'Brunch élégance', image: 'Petit Déjeuner Brunch Élégance.jpg' },
      { name: 'Continental', image: 'Petit Déjeuner Continental.jpg' },
      { name: 'Croque', image: 'Petit Déjeuner Croque.jpg' },
      { name: 'Express', image: 'Petit Déjeuner Express.jpg' },
      { name: 'Le Healthy Boost', image: 'Petit Déjeuner Le Healthy Boost.jpg' },
    ],
  },
  {
    id: 'crepes',
    title: 'Crêpes',
    items: [
      { name: '4 saisons', image: 'Crêpe 4 seasons.jpg' },
      { name: 'Biscoff', image: 'Crêpe Biscoff.jpg' },
      { name: 'Caramel beurre salé', image: 'Crêpe Caramel Beurre Salé.jpg' },
      { name: 'Charcuterie', image: 'Crêpe charcuterie.jpg' },
      { name: 'Chocolat blanc', image: 'Crêpe Chocolat Blanc.jpg' },
      { name: 'Cookies', image: 'Crêpe Cookies.jpg' },
      { name: 'Gourmande charcuterie & œuf', image: 'Crêpe gourmande charcuterie & œuf.jpg' },
      { name: 'Nutella banana sushi', image: 'Crêpe Nutella Banana sushi.jpg' },
      { name: 'Nutella banane', image: 'Crêpe Nutella Banane.jpg' },
      { name: 'Nutella', image: 'Crêpe Nutella.jpg' },
      { name: 'Oreo', image: 'Crêpe Oreo.jpg' },
      { name: 'Pistachio', image: 'Crêpe Pistachio.jpg' },
      { name: 'Poulet champignons', image: 'Crêpe poulet champignons.jpg' },
      { name: 'Red Velvet', image: 'Crêpe Red Velvet.jpg' },
      { name: 'Rêve de fromage', image: 'Crêpe rêve de fromage.jpg' },
    ],
  },
  {
    id: 'pancakes',
    title: 'Pancakes',
    items: [
      { name: 'Americano Cookies', image: 'Pancake Americano Cookies.jpg' },
      { name: 'Caramel beurre salé', image: 'Pancake Caramel Beurre Salé.jpg' },
      { name: 'Crème chantilly', image: 'Pancake Crème Chantilly.jpg' },
      { name: 'Lotus', image: 'Pancake Lotus.jpg' },
      { name: 'Nutella banane', image: 'Pancake Nutella Banana.jpg' },
      { name: 'Nutella', image: 'Pancake Nutella.jpg' },
      { name: 'Oreo', image: 'Pancake Oreo.jpg' },
      { name: 'Pistachio', image: 'Pancake Pistachio.jpg' },
    ],
  },
  {
    id: 'gaufres',
    title: 'Gaufres',
    items: [
      { name: 'Biscoff', image: 'Gaufre Biscoff.jpg' },
      { name: 'Chantilly', image: 'Gaufre Chantilly Cream.jpg' },
      { name: 'Miel', image: 'Gaufre miel.jpg' },
      { name: 'Nutella banane', image: 'Gaufre Nutella banana.jpg' },
      { name: 'Nutella', image: 'Gaufre Nutella.jpg' },
    ],
  },
  {
    id: 'chocolat',
    title: 'Chocolat',
    items: [{ name: 'Chocolat fondu', image: 'Chocolat Fondu.png' }],
  },
  {
    id: 'chaudes',
    title: 'Boissons chaudes',
    items: [
      { name: 'Café crème', image: 'Café Crème.jpg' },
      { name: 'Espresso', image: 'Café Espresso.jpg' },
      { name: 'Chocolat chaud', image: 'Chocolat Chaud.jpg' },
      { name: 'Lait chaud', image: 'Lait Chaud.jpg' },
      { name: 'Latte macchiato', image: 'Latte Macchiato.jpg' },
    ],
  },
  {
    id: 'frappe',
    title: 'Frappés',
    items: [
      { name: 'Caramel', image: 'Frappé Caramel.jpg' },
      { name: 'Chocolat', image: 'Frappé Chocolat.jpg' },
      { name: 'Vanille', image: 'Frappé Vanille.jpg' },
    ],
  },
  {
    id: 'ice-coffee',
    title: 'Ice coffee',
    items: [
      { name: 'Caramel', image: 'Ice Coffee Caramel.png' },
      { name: 'Chocolat', image: 'Ice Coffee Chocolat.png' },
    ],
  },
  {
    id: 'milkshakes',
    title: 'Milkshakes',
    items: [
      { name: 'Caramel', image: 'Milkshake Caramel.jpg' },
      { name: 'Chocolat', image: 'Milkshake Chocolat.jpg' },
      { name: 'Fraise', image: 'Milkshake Fraise.jpg' },
      { name: 'Oreo', image: 'Milkshake Oreo.jpg' },
      { name: 'Speculoos', image: 'Milkshake Speculoos.jpg' },
      { name: 'Vanille', image: 'Milkshake Vanille.jpg' },
    ],
  },
  {
    id: 'mojitos',
    title: 'Mojitos',
    items: [
      { name: 'Blue Sky', image: 'Mojito Blue Sky.jpg' },
      { name: 'Classique', image: 'Mojito Classique.jpg' },
      { name: 'Fruits rouges', image: 'Mojito Fruits Rouges.jpg' },
    ],
  },
  {
    id: 'freshup',
    title: 'FreshUp',
    items: [
      { name: 'Ananas', image: 'FreshUp Ananas.jpg' },
      { name: 'Blueberry', image: 'FreshUp blueberry.jpg' },
      { name: 'Citron', image: 'FreshUp citron.jpg' },
      { name: 'Fraise', image: 'FreshUp fraise.jpg' },
      { name: 'Framboise', image: 'FreshUp Framboise.jpg' },
      { name: 'Mangue', image: 'FreshUp mangue.jpg' },
    ],
  },
  {
    id: 'bubble-tea',
    title: 'Bubble tea',
    items: [
      { name: 'Ananas', image: 'Bubble Tea Ananas.png' },
      { name: 'Blueberry', image: 'Bubble Tea Blueberry.png' },
      { name: 'Citron', image: 'Bubble Tea Citron.png' },
      { name: 'Fraise', image: 'Bubble Tea Fraise.png' },
      { name: 'Mango milk', image: 'Mango Milked Bubble Tea.png' },
      { name: 'Strawberry milk', image: 'Strawberry Milked Bubble Tea.png' },
    ],
  },
];
