import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { publicImage } from '../utils/imageUrl';

const AUTO_MS = 6500;

const easeOut = [0.22, 1, 0.36, 1];
const easeIn = [0.4, 0, 1, 1];

function FloaterImg({ floater, reduceMotion }) {
  const { src, top, left, right, bottom, size, delay = 0 } = floater;
  const style = {
    top,
    left,
    right,
    bottom,
    width: size,
    height: size,
  };

  return (
    <motion.img
      className="hero-showcase__floater"
      src={publicImage(src)}
      alt=""
      decoding="async"
      loading="lazy"
      style={style}
      initial={{ opacity: 0, scale: 0.82, rotate: -6 }}
      animate={
        reduceMotion
          ? { opacity: 0.95, scale: 1, rotate: 0, y: 0 }
          : {
              opacity: [0.88, 1, 0.88],
              y: [0, -14, 0],
              rotate: [-4, 4, -4],
              scale: [1, 1.04, 1],
            }
      }
      transition={
        reduceMotion
          ? { duration: 0.2 }
          : {
              delay: 0.35 + delay,
              duration: 4.2 + delay * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }
      }
    />
  );
}

export function HeroShowcase({ slides }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const len = slides.length;
  const safeIndex = len ? index % len : 0;
  const slide = slides[safeIndex] ?? null;

  const go = useCallback(
    (dir) => {
      if (!len) return;
      setIndex((i) => (i + dir + len) % len);
    },
    [len],
  );

  useEffect(() => {
    if (reduceMotion || paused || !len) return undefined;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % len);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused, len]);

  if (!slide) return null;

  return (
    <div
      className="hero-showcase"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={slide.id}
          className="hero-showcase__scene"
          style={{ background: slide.gradient }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: reduceMotion ? 0.15 : 0.5, ease: easeOut } }}
          exit={{ opacity: 0, transition: { duration: reduceMotion ? 0.1 : 0.35, ease: easeIn } }}
        >
          <div className="hero-showcase__mega-wrap">
            <motion.h2
              className="hero-showcase__mega"
              aria-hidden
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{
                opacity: 0.22,
                y: 0,
                scale: 1,
                transition: { delay: reduceMotion ? 0 : 0.08, duration: reduceMotion ? 0.15 : 0.55, ease: easeOut },
              }}
              exit={{
                opacity: 0,
                y: -16,
                transition: { duration: 0.25 },
              }}
            >
              {slide.title}
            </motion.h2>
          </div>

          {slide.floaters.map((f, i) => (
            <FloaterImg key={`${slide.id}-f-${i}`} floater={f} reduceMotion={reduceMotion} />
          ))}

          <div className="hero-showcase__center">
            <motion.div
              className="hero-showcase__product"
              initial={{ opacity: 0, scale: 0.88, y: 36 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: reduceMotion
                  ? { duration: 0.2 }
                  : { type: 'spring', stiffness: 280, damping: 26, mass: 0.85 },
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: -20,
                transition: { duration: 0.3 },
              }}
            >
              <img src={publicImage(slide.image)} alt="" decoding="async" />
            </motion.div>
            <motion.p
              className="hero-showcase__line"
              initial={{ opacity: 0, y: 12 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: reduceMotion ? 0 : 0.2,
                  duration: reduceMotion ? 0.15 : 0.4,
                },
              }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              {slide.line}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="hero-showcase__controls" role="tablist" aria-label="Sélection du visuel">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === safeIndex}
            className={`hero-showcase__dot ${i === safeIndex ? 'hero-showcase__dot--on' : ''}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      <button
        type="button"
        className="hero-showcase__nav hero-showcase__nav--prev"
        aria-label="Visuel précédent"
        onClick={() => go(-1)}
      />
      <button
        type="button"
        className="hero-showcase__nav hero-showcase__nav--next"
        aria-label="Visuel suivant"
        onClick={() => go(1)}
      />
    </div>
  );
}
