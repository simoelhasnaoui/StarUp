import { useEffect, useRef, useState } from 'react';
import { menuCategories } from '../data/menu';
import { publicImage } from '../utils/imageUrl';

const categoryMeta = {
  'petit-dejeuner': { price: 42, detail: 'Assiette complete preparee pour bien commencer la journee.' },
  crepes: { price: 32, detail: 'Crepe moelleuse garnie minute avec une finition gourmande.' },
  'crepes-sucrees': { price: 32, detail: 'Crepe sucree garnie minute avec une finition gourmande.' },
  'crepes-salees': { price: 36, detail: 'Crepe salee genereuse preparee minute.' },
  pancakes: { price: 36, detail: 'Pancakes epais et fondants servis avec une garniture genereuse.' },
  gaufres: { price: 34, detail: 'Gaufre croustillante a l exterieur et tendre au coeur.' },
  chocolat: { price: 24, detail: 'Chocolat intense, parfait pour accompagner une pause sucree.' },
  chaudes: { price: 22, detail: 'Boisson chaude preparee a la demande.' },
  frappe: { price: 30, detail: 'Boisson frappee, fraiche et onctueuse.' },
  'ice-coffee': { price: 28, detail: 'Cafe glace equilibre, servi bien frais.' },
  milkshakes: { price: 34, detail: 'Milkshake cremeux mixe avec une saveur signature.' },
  mojitos: { price: 30, detail: 'Mojito frais, petillant et parfume.' },
  freshup: { price: 28, detail: 'Boisson fruitee et vitaminee pour une pause fraiche.' },
  'bubble-tea': { price: 35, detail: 'Bubble tea gourmand avec perles et saveur fruitee.' },
};

const saltedCrepeWords = ['charcuterie', 'poulet', 'fromage', 'oeuf'];

function isSaltedCrepe(item) {
  const name = item.name.toLowerCase();
  return saltedCrepeWords.some((word) => name.includes(word));
}

function splitCrepeCategory(categories) {
  return categories.flatMap((cat) => {
    if (cat.id !== 'crepes') return [cat];
    const sweet = cat.items.filter((item) => !isSaltedCrepe(item));
    const salted = cat.items.filter(isSaltedCrepe);
    return [
      { ...cat, id: 'crepes-sucrees', title: 'Crepes sucrees', items: sweet },
      { ...cat, id: 'crepes-salees', title: 'Crepes salees', items: salted },
    ];
  });
}

function withDetails(item, category) {
  const meta = categoryMeta[category.id] || { price: 30, detail: 'Signature Starup Coffee preparee minute.' };
  return {
    ...item,
    categoryId: category.id,
    categoryTitle: category.title,
    description: item.note || `${item.name}. ${meta.detail}`,
    price: item.price || meta.price,
  };
}

function MenuCard({ item, onOpen }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <article ref={ref} className={`menu-card ${visible ? 'menu-card--in' : ''}`}>
      <button type="button" className="menu-card__button" onClick={() => onOpen(item)}>
        <div className="menu-card__media">
          <img src={publicImage(item.image)} alt="" loading="lazy" decoding="async" />
        </div>
        <div className="menu-card__body">
          <span className="menu-card__category">{item.categoryTitle}</span>
          <h4 className="menu-card__name">{item.name}</h4>
          <div className="menu-card__foot">
            <span>Voir details</span>
            <strong>{item.price} DH</strong>
          </div>
        </div>
      </button>
    </article>
  );
}

export function MenuGrid() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const filterRef = useRef(null);
  const displayCategories = splitCrepeCategory(menuCategories);
  const enrichedCategories = displayCategories.map((cat) => ({
    ...cat,
    items: cat.items.map((item) => withDetails(item, cat)),
  }));
  const visibleCategories =
    activeCategory === 'all'
      ? enrichedCategories
      : enrichedCategories.filter((cat) => cat.id === activeCategory);

  useEffect(() => {
    if (!selectedItem) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setSelectedItem(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [selectedItem]);

  const slideFilters = (dir) => {
    filterRef.current?.scrollBy({ left: dir * 260, behavior: 'smooth' });
  };

  return (
    <section id="menu" className="menu-section">
      <div className="section-head">
        <h2 className="section-title">Menu</h2>
        <p className="section-sub">Une selection de nos signatures, filtrees par categorie.</p>
      </div>

      <div className="menu-filter-carousel">
        <button type="button" className="menu-filter-arrow" aria-label="Categories precedentes" onClick={() => slideFilters(-1)}>
          <svg className="menu-filter-arrow__chevron" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M14 6l-6 6 6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div ref={filterRef} className="menu-filters" aria-label="Filtrer le menu">
          <button
            type="button"
            className={`menu-filter ${activeCategory === 'all' ? 'menu-filter--active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            Tout
          </button>
          {displayCategories.map((cat) => (
            <button
              type="button"
              key={cat.id}
              className={`menu-filter ${activeCategory === cat.id ? 'menu-filter--active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.title}
            </button>
          ))}
        </div>
        <button type="button" className="menu-filter-arrow" aria-label="Categories suivantes" onClick={() => slideFilters(1)}>
          <svg className="menu-filter-arrow__chevron" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M10 6l6 6-6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {visibleCategories.map((cat) => (
        <div key={cat.id} className="menu-category" id={cat.id}>
          <h3 className="menu-category__title">{cat.title}</h3>
          <div className="menu-grid">
            {cat.items.map((item) => (
              <MenuCard key={item.image} item={item} onOpen={setSelectedItem} />
            ))}
          </div>
        </div>
      ))}

      {selectedItem && (
        <div className="menu-modal" role="dialog" aria-modal="true" aria-labelledby="menu-modal-title">
          <button
            type="button"
            className="menu-modal__backdrop"
            aria-label="Fermer"
            onClick={() => setSelectedItem(null)}
          />
          <article className="menu-modal__panel">
            <button
              type="button"
              className="menu-modal__close"
              aria-label="Fermer"
              onClick={() => setSelectedItem(null)}
            >
              x
            </button>
            <div className="menu-modal__media">
              <img src={publicImage(selectedItem.image)} alt="" decoding="async" />
            </div>
            <div className="menu-modal__content">
              <span className="menu-modal__category">{selectedItem.categoryTitle}</span>
              <h3 id="menu-modal-title">{selectedItem.name}</h3>
              <p>{selectedItem.description}</p>
              <div className="menu-modal__price">
                <span>Prix</span>
                <strong>{selectedItem.price} DH</strong>
              </div>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
