import { useEffect, useRef, useState } from 'react';
import { menuCategories } from '../data/menu';
import { publicImage } from '../utils/imageUrl';

function MenuCard({ item }) {
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
      <div className="menu-card__media">
        <img src={publicImage(item.image)} alt="" loading="lazy" decoding="async" />
      </div>
      <h4 className="menu-card__name">{item.name}</h4>
    </article>
  );
}

export function MenuGrid() {
  return (
    <section id="menu" className="menu-section">
      <div className="section-head">
        <h2 className="section-title">Menu</h2>
        <p className="section-sub">Une sélection de nos signatures — visuels fournis par votre carte.</p>
      </div>

      {menuCategories.map((cat) => (
        <div key={cat.id} className="menu-category" id={cat.id}>
          <h3 className="menu-category__title">{cat.title}</h3>
          <div className="menu-grid">
            {cat.items.map((item) => (
              <MenuCard key={item.image} item={item} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
