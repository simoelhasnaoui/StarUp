import { useCallback, useEffect, useState } from 'react';
import { publicImage } from '../utils/imageUrl';
import { LOGO_GREEN } from '../data/menu';

const links = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#menu', label: 'Menu' },
  { href: '#apropos', label: 'À propos' },
  { href: '#contact', label: 'Contact' },
];

export function GlassNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`nav-outer ${scrolled ? 'nav-outer--scrolled' : ''}`}>
      <div className="nav-center-wrap">
        <nav className="glass-nav" aria-label="Principale">
          <div className="glass-nav__links glass-nav__links--left">
            {links.slice(0, 2).map(({ href, label }) => (
              <a key={href} href={href} className="glass-nav__link">
                {label}
              </a>
            ))}
          </div>

          <a href="#accueil" className="glass-nav__logo" aria-label="Starup Coffee — accueil">
            <img src={publicImage(LOGO_GREEN)} alt="Starup Coffee" decoding="async" />
          </a>

          <div className="glass-nav__links glass-nav__links--right">
            {links.slice(2).map(({ href, label }) => (
              <a key={href} href={href} className="glass-nav__link">
                {label}
              </a>
            ))}
          </div>

          <button
            type="button"
            className="glass-nav__burger"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="glass-nav__burger-bar" />
            <span className="glass-nav__burger-bar" />
          </button>
        </nav>
      </div>

      <div
        id="mobile-drawer"
        className={`mobile-drawer ${open ? 'mobile-drawer--open' : ''}`}
        hidden={!open}
      >
        <div className="mobile-drawer__backdrop" onClick={closeMenu} aria-hidden />
        <div className="mobile-drawer__panel glass-nav">
          {links.map(({ href, label }) => (
            <a key={href} href={href} className="mobile-drawer__link" onClick={closeMenu}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
