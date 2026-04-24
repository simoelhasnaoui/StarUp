import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { publicImage } from '../utils/imageUrl';

const AUTO_MS = 7500;
const DURATION = 1.5;
const X_TRAVEL = '82vw';
/** Roll from off-screen to center: |Δrotate| ≤ 180° to rest. */
const SPIN = 180;
/** Rotation wind-up (deg): nudge opposite the main roll, then to 0. */
const ROT_WIND = 14;
/** Exit: small counter-rotation (deg) before rolling off. */
const EXIT_KICK = 12;
/** Exit rotation end magnitude (|value| ≤ 180). */
const EXIT_SPIN = 168;

/** Normalized time: wind-up ends (same as first keyframe). */
const WIND_UP_T = 0.15;
/** When overshoot peak is hit; last segment eases back to center (“wind-down”). */
const WIND_DOWN_PEAK_T = 0.86;

const X_OVERSHOOT_VW = '2.75vw';
const ROT_OVERSHOOT = 10;

function xPastCenter(dir) {
  return dir === 1 ? `-${X_OVERSHOOT_VW}` : X_OVERSHOOT_VW;
}

function rotPastCenter(dir) {
  return dir === 1 ? -ROT_OVERSHOOT : ROT_OVERSHOOT;
}

const easeMain = [0.33, 1, 0.25, 1];
/** Return from past-center to rest (opposite of anticipation). */
const easeWindDown = [0.34, 1, 0.66, 1];

function imageVariants(reduceMotion) {
  if (reduceMotion) {
    return {
      initial: { x: 0, rotate: 0, opacity: 0 },
      animate: { x: 0, rotate: 0, opacity: 1, transition: { duration: 0.2 } },
      exit: { opacity: 0, transition: { duration: 0.2 } },
    };
  }

  return {
    initial: (dir) => ({
      x: dir === 1 ? X_TRAVEL : -X_TRAVEL,
      rotate: dir === 1 ? SPIN : -SPIN,
      opacity: 0.94,
    }),
    animate: (dir) => ({
      x:
        dir === 1
          ? ['89vw', xPastCenter(dir), 0]
          : ['-89vw', xPastCenter(dir), 0],
      rotate: [
        dir === 1 ? SPIN - ROT_WIND : -SPIN + ROT_WIND,
        rotPastCenter(dir),
        0,
      ],
      opacity: 1,
      transition: {
        duration: DURATION,
        times: [WIND_UP_T, WIND_DOWN_PEAK_T, 1],
        ease: [easeMain, easeMain, easeWindDown],
      },
    }),
    exit: (dir) => ({
      x: dir === 1 ? ['5vw', '-82vw'] : ['-5vw', '82vw'],
      rotate:
        dir === 1
          ? [EXIT_KICK, -EXIT_SPIN]
          : [-EXIT_KICK, EXIT_SPIN],
      opacity: 0.92,
      transition: {
        duration: DURATION,
        times: [0.15, 1],
        ease: [easeMain, easeMain],
      },
    }),
  };
}

/** Same horizontal slide + wind-up as the product image (no blur — pure slide). */
function nameSlideVariants(reduceMotion) {
  if (reduceMotion) {
    return {
      initial: { x: 0, opacity: 0 },
      animate: { x: 0, opacity: 1, transition: { duration: 0.2 } },
      exit: { opacity: 0, transition: { duration: 0.2 } },
    };
  }
  return {
    initial: (dir) => ({
      x: dir === 1 ? X_TRAVEL : -X_TRAVEL,
      opacity: 0.92,
    }),
    animate: (dir) => ({
      x:
        dir === 1
          ? ['89vw', xPastCenter(dir), 0]
          : ['-89vw', xPastCenter(dir), 0],
      opacity: 1,
      transition: {
        duration: DURATION,
        times: [WIND_UP_T, WIND_DOWN_PEAK_T, 1],
        ease: [easeMain, easeMain, easeWindDown],
      },
    }),
    exit: (dir) => ({
      x: dir === 1 ? ['5vw', '-82vw'] : ['-5vw', '82vw'],
      opacity: 0.92,
      transition: {
        duration: DURATION,
        times: [0.15, 1],
        ease: [easeMain, easeMain],
      },
    }),
  };
}

function descVariants(reduceMotion) {
  const shift = reduceMotion ? 0 : 64;
  const ant = reduceMotion ? 0 : 18;
  const descPast = reduceMotion ? 0 : 12;
  if (reduceMotion) {
    return {
      initial: { x: 0, opacity: 0 },
      animate: { x: 0, opacity: 1, transition: { duration: 0.2 } },
      exit: { opacity: 0, transition: { duration: 0.2 } },
    };
  }
  return {
    initial: (dir) => ({
      x: dir === 1 ? shift : -shift,
      opacity: 0,
    }),
    animate: (dir) => ({
      x:
        dir === 1
          ? [shift + ant, -descPast, 0]
          : [-shift - ant, descPast, 0],
      opacity: 1,
      transition: {
        duration: DURATION,
        times: [WIND_UP_T, WIND_DOWN_PEAK_T, 1],
        ease: [easeMain, easeMain, easeWindDown],
      },
    }),
    exit: (dir) => ({
      x: dir === 1 ? [-ant, -shift * 0.85] : [ant, shift * 0.85],
      opacity: 0,
      transition: {
        duration: DURATION,
        times: [0.15, 1],
        ease: [easeMain, easeMain],
      },
    }),
  };
}

export function HeroShowcase({ slides, children }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const n = slides.length;
  const slide = n ? slides[((index % n) + n) % n] : null;

  const go = useCallback(
    (dir) => {
      if (!n) return;
      setDirection(dir);
      setIndex((i) => (i + dir + n) % n);
    },
    [n],
  );

  useEffect(() => {
    if (reduceMotion || paused || !n) return undefined;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1 + n) % n);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused, n]);

  const imgV = imageVariants(Boolean(reduceMotion));
  const nmV = nameSlideVariants(Boolean(reduceMotion));
  const dV = descVariants(Boolean(reduceMotion));

  if (!slide) return null;

  return (
    <div
      className="hero-showcase hero-showcase--fullscreen"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {children}

      <div className="hero-showcase__viewport">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={`bg-${slide.id}`}
            className="hero-showcase__bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0.15 : DURATION,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{ background: slide.gradient }}
          />
        </AnimatePresence>

        <div className="hero-showcase__stage">
          <AnimatePresence initial={false} custom={direction} mode="sync">
            <motion.p
              key={`${slide.id}-name`}
              className="hero-showcase__bg-name"
              custom={direction}
              variants={nmV}
              initial="initial"
              animate="animate"
              exit="exit"
              aria-hidden
            >
              {slide.bgName}
            </motion.p>

            <motion.div
              key={`${slide.id}-img`}
              className="hero-showcase__product-roll"
              custom={direction}
              variants={imgV}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <img src={publicImage(slide.image)} alt="" decoding="async" />
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.div
            key={`desc-${slide.id}`}
            className="hero-showcase__desc"
            custom={direction}
            variants={dV}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {slide.line}
          </motion.div>
        </AnimatePresence>

        <div className="hero-showcase__nav-pair" role="group" aria-label="Navigation du produit">
          <button
            type="button"
            className="hero-showcase__circle-nav"
            aria-label="Produit précédent"
            onClick={() => go(-1)}
          >
            <svg className="hero-showcase__circle-nav-chevron" viewBox="0 0 24 24" aria-hidden>
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
          <button
            type="button"
            className="hero-showcase__circle-nav"
            aria-label="Produit suivant"
            onClick={() => go(1)}
          >
            <svg className="hero-showcase__circle-nav-chevron" viewBox="0 0 24 24" aria-hidden>
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
      </div>
    </div>
  );
}
