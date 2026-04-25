import { useEffect, useState } from 'react';
import './App.css';
import { GlassNavbar } from './components/GlassNavbar';
import { Hero } from './components/Hero';
import { MenuGrid } from './components/MenuGrid';
import { AboutAndFooter } from './components/AboutAndFooter';

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <GlassNavbar />
      <main>
        <Hero />
        <MenuGrid />
        <AboutAndFooter />
      </main>
      <button
        type="button"
        className={`scroll-top ${showScrollTop ? 'scroll-top--visible' : ''}`}
        aria-label="Retour en haut"
        onClick={scrollToTop}
      >
        <svg className="scroll-top__icon" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M6 14l6-6 6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default App;
