import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { menuCategories } from '../data/menu';
import { publicImage } from '../utils/imageUrl';

const categoryMeta = {
  'petit-dejeuner': { price: 42, detail: 'Assiette complète préparée pour bien commencer la journée.' },
  crepes: { price: 32, detail: 'Crêpe moelleuse garnie minute avec une finition gourmande.' },
  'crepes-sucrees': { price: 32, detail: 'Crêpe sucrée garnie minute avec une finition gourmande.' },
  'crepes-salees': { price: 36, detail: 'Crêpe salée généreuse préparée minute.' },
  pancakes: { price: 36, detail: 'Pancakes épais et fondants servis avec une garniture généreuse.' },
  gaufres: { price: 34, detail: 'Gaufre croustillante à l\'extérieur et tendre au cœur.' },
  chocolat: { price: 24, detail: 'Chocolat intense, parfait pour accompagner une pause sucrée.' },
  chaudes: { price: 22, detail: 'Boisson chaude préparée à la demande.' },
  frappe: { price: 30, detail: 'Boisson frappée, fraîche et onctueuse.' },
  'ice-coffee': { price: 28, detail: 'Café glacé équilibré, servi bien frais.' },
  milkshakes: { price: 34, detail: 'Milkshake crémeux mixé avec une saveur signature.' },
  mojitos: { price: 30, detail: 'Mojito frais, pétillant et parfumé.' },
  freshup: { price: 28, detail: 'Boisson fruitée et vitaminée pour une pause fraîche.' },
  'bubble-tea': { price: 35, detail: 'Bubble tea gourmand avec perles et saveur fruitée.' },
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
      { ...cat, id: 'crepes-sucrees', title: 'Crêpes sucrées', items: sweet },
      { ...cat, id: 'crepes-salees', title: 'Crêpes salées', items: salted },
    ];
  });
}

function withDetails(item, category) {
  const meta = categoryMeta[category.id] || { price: 30, detail: 'Signature Starup Coffee préparée minute.' };
  return {
    ...item,
    categoryId: category.id,
    categoryTitle: category.title,
    description: item.note || `${item.name}. ${meta.detail}`,
    price: item.price || meta.price,
  };
}

function MenuCard({ item, onOpen, index }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const glare = useMotionTemplate`radial-gradient(450px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.08), transparent 80%)`;

  return (
    <motion.article
      layout
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        duration: 0.7, 
        delay: (index % 4) * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        y: -12, 
        scale: 1.03,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="menu-card"
    >
      {/* Glare Effect Layer */}
      <motion.div className="menu-card__glare" style={{ background: glare }} />

      <button type="button" className="menu-card__button" onClick={() => onOpen(item)}>
        <div className="menu-card__media">
          <motion.img 
            whileHover={{ scale: 1.12 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            src={publicImage(item.image)} 
            alt={item.name}
            loading="lazy" 
            decoding="async" 
          />
        </div>
        <div className="menu-card__body">
          <span className="menu-card__category">{item.categoryTitle}</span>
          <h4 className="menu-card__name">{item.name}</h4>
          <div className="menu-card__foot">
            <div className="menu-card__cta" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <strong className="menu-card__price">{item.price} DH</strong>
          </div>
        </div>
      </button>
    </motion.article>
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

  const flatItems = enrichedCategories.flatMap(cat => cat.items);
  const filteredItems = activeCategory === 'all' 
    ? flatItems 
    : flatItems.filter(item => item.categoryId === activeCategory);

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-tag">Notre Collection Contemporaine</span>
          <h2 className="section-title">Savourez l'art de la Crêpe</h2>
          <p className="section-sub">Une expérience gastronomique préparée minute, alliant tradition et audace culinaire.</p>
        </motion.div>
      </div>

      <div className="menu-filter-container">
        <div className="menu-filter-carousel">
          <button type="button" className="menu-filter-arrow" aria-label="Précédent" onClick={() => slideFilters(-1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          
          <div ref={filterRef} className="menu-filters">
            <button
              type="button"
              className={`menu-filter ${activeCategory === 'all' ? 'menu-filter--active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              Voir Tout
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

          <button type="button" className="menu-filter-arrow" aria-label="Suivant" onClick={() => slideFilters(1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      <div className="menu-grid-viewport">
        <motion.div layout className="menu-grid">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <MenuCard 
                key={`${item.categoryId}-${item.name}`} 
                item={item} 
                onOpen={setSelectedItem} 
                index={idx} 
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="menu-modal" 
            role="dialog" 
            aria-modal="true"
          >
            <motion.div 
              className="menu-modal__backdrop" 
              onClick={() => setSelectedItem(null)} 
            />
            <motion.article 
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="menu-modal__panel"
            >
              <button 
                type="button" 
                className="menu-modal__close" 
                onClick={() => setSelectedItem(null)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
              
              <div className="menu-modal__media">
                <img src={publicImage(selectedItem.image)} alt={selectedItem.name} />
              </div>
              
              <div className="menu-modal__content">
                <span className="menu-modal__category">{selectedItem.categoryTitle}</span>
                <h3>{selectedItem.name}</h3>
                <div className="menu-modal__divider" />
                <p>{selectedItem.description}</p>
                <div className="menu-modal__footer">
                  <div className="menu-modal__price">
                    <span>Prix Unitaire</span>
                    <strong>{selectedItem.price} DH</strong>
                  </div>
                  <button className="menu-modal__order-btn">Déguster maintenant</button>
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
