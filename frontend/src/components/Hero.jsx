import { heroSlides } from '../data/heroSlides';
import { HeroShowcase } from './HeroShowcase';

export function Hero() {
  return (
    <section id="accueil" className="hero">
      <div className="hero__bg" aria-hidden />
      <div className="hero__sparkles" aria-hidden>
        <span className="hero__star hero__star--1" />
        <span className="hero__star hero__star--2" />
        <span className="hero__star hero__star--3" />
      </div>

      <div className="hero__inner">
        <p className="hero__eyebrow">Bienvenue chez</p>
        <h1 className="hero__title">Starup Coffee</h1>
        <p className="hero__lede">
          Crêpes, pancakes, bubble tea et boissons fraîches — préparés avec le même soin que notre logo
          l’indique.
        </p>
        <a className="hero__cta" href="#menu">
          Parcourir le menu
        </a>
      </div>

      <HeroShowcase slides={heroSlides} />
    </section>
  );
}
