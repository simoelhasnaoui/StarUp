import { publicImage } from '../utils/imageUrl';
import { LOGO_GREEN } from '../data/menu';

export function AboutAndFooter() {
  return (
    <>
      <section id="apropos" className="about">
        <div className="about__card glass-panel">
          <div className="about__text">
            <h2 className="section-title">L’expérience Starup</h2>
            <p>
              Ici, tout tourne autour du bon produit et d’une ambiance lumineuse : le vert profond de
              notre identité, des formes arrondies, et des animations douces pour mettre en valeur ce que
              vous servez.
            </p>
            <p>
              Cette vitrine regroupe l’ensemble des visuels menu que vous avez fournis — prête à être
              branchée sur votre API Laravel quand vous voudrez dynamiser les prix et la disponibilité.
            </p>
          </div>
          <div className="about__logo">
            <img src={publicImage(LOGO_GREEN)} alt="Starup Coffee" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      <footer id="contact" className="site-footer">
        <div className="site-footer__inner">
          <div>
            <strong>Starup Coffee</strong>
            <p className="site-footer__muted">Site vitrine — React &amp; palette logo.</p>
          </div>
          <div className="site-footer__links">
            <a href="#menu">Menu</a>
            <a href="mailto:contact@starup.coffee">contact@starup.coffee</a>
          </div>
        </div>
      </footer>
    </>
  );
}
