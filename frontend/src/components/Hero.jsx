import { heroSlides } from '../data/heroSlides';
import { HeroShowcase } from './HeroShowcase';

export function Hero() {
  return (
    <section id="accueil" className="hero hero--fullscreen">
      <HeroShowcase slides={heroSlides} />
    </section>
  );
}
