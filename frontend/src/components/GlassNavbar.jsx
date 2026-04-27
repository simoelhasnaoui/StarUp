import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { publicImage } from '../utils/imageUrl';
import { LOGO_GREEN } from '../data/menu';

const links = [
  { href: '#accueil', label: 'Home' },
  { href: '#menu', label: 'Menu' },
  { href: '#apropos', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

/**
 * Magnetic element wrapper for high-end interaction
 */
function MagneticLink({ children, href, onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.35); // 35% magnetic pull
    y.set((clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="glass-nav__link"
    >
      {children}
    </motion.a>
  );
}

export function GlassNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);

  // Is the navbar currently in its compact "Island" state?
  const isCompact = scrolled && !isHovered && !open;

  return (
    <header className={`nav-outer ${scrolled ? 'nav-outer--scrolled' : ''}`}>
      <div className="nav-center-wrap">
        <motion.nav
          className="glass-nav"
          aria-label="Principale"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ backgroundColor: "transparent" }}
          animate={{
            width: isCompact ? '2.4rem' : 'min(36rem, calc(100vw - 2rem))',
            height: isCompact ? '2.4rem' : '3.2rem',
            borderRadius: isCompact ? '50%' : '9999px',
            justifyContent: 'center',
            backgroundColor: isCompact ? "rgba(255, 255, 255, 0)" : "rgba(255, 255, 255, 0.12)",
            borderColor: isCompact ? "rgba(255, 255, 255, 0)" : "rgba(255, 255, 255, 0.5)",
          }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 30,
            mass: 0.5
          }}
        >
          {/* Nav Content */}
          <AnimatePresence mode="wait">
            {!isCompact && (
              <motion.div
                key="links-left"
                className="glass-nav__links glass-nav__links--left"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10, transition: { duration: 0.1 } }}
              >
                {links.slice(0, 2).map(({ href, label }) => (
                  <MagneticLink key={href} href={href}>
                    {label}
                  </MagneticLink>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.a
            href="#accueil"
            className="glass-nav__logo"
            aria-label="Starup Coffee — accueil"
            layout
            animate={{
              margin: isCompact ? '0' : '0 1.5rem',
            }}
          >
            <img src={publicImage(LOGO_GREEN)} alt="Starup Coffee" decoding="async" />
          </motion.a>

          <AnimatePresence mode="wait">
            {!isCompact && (
              <motion.div
                key="links-right"
                className="glass-nav__links glass-nav__links--right"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10, transition: { duration: 0.1 } }}
              >
                {links.slice(2).map(({ href, label }) => (
                  <MagneticLink key={href} href={href}>
                    {label}
                  </MagneticLink>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Burger remains visible/functional in expanded state only for mobile */}
          <AnimatePresence>
            {!isCompact && (
              <motion.button
                key="burger"
                type="button"
                className="glass-nav__burger"
                aria-expanded={open}
                aria-controls="mobile-drawer"
                onClick={() => setOpen((v) => !v)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="glass-nav__burger-bar" />
                <span className="glass-nav__burger-bar" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <div id="mobile-drawer" className="mobile-drawer mobile-drawer--open">
            <motion.div
              className="mobile-drawer__backdrop"
              onClick={closeMenu}
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="mobile-drawer__panel glass-nav"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              {links.map(({ href, label }) => (
                <a key={href} href={href} className="mobile-drawer__link" onClick={closeMenu}>
                  {label}
                </a>
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
