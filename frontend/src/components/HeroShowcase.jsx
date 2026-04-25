import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { publicImage } from '../utils/imageUrl';

const AUTO_MS = 7500;
const DURATION = 1.5;
const NAME_ENTER_DELAY = 0.14;
const NAME_EXIT_DURATION = 0.08;
const DESC_ENTER_DELAY = NAME_ENTER_DELAY;
const DESC_FADE_DURATION = 0.34;
const DESC_EXIT_DURATION = NAME_EXIT_DURATION;
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
const enterEase = [easeMain, easeWindDown];
const exitEase = [easeWindDown, easeMain];

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
      opacity: 1,
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
        delay: NAME_ENTER_DELAY,
        duration: DURATION,
        times: [WIND_UP_T, WIND_DOWN_PEAK_T, 1],
        ease: enterEase,
      },
    }),
    exit: (dir) => ({
      x: dir === 1 ? [0, '5vw', '-82vw'] : [0, '-5vw', '82vw'],
      rotate:
        dir === 1
          ? [0, EXIT_KICK, -EXIT_SPIN]
          : [0, -EXIT_KICK, EXIT_SPIN],
      opacity: 1,
      transition: {
        duration: DURATION,
        times: [0, 0.15, 1],
        ease: exitEase,
      },
    }),
  };
}

/** Same horizontal slide + wind-up as the product image (no blur — pure slide). */
function nameSlideVariants(reduceMotion) {
  if (reduceMotion) {
    return {
      initial: { x: 0, opacity: 1 },
      animate: { x: 0, opacity: 1, transition: { duration: 0.01 } },
      exit: { opacity: 0, transition: { duration: NAME_EXIT_DURATION } },
    };
  }
  return {
    initial: (dir) => ({
      x: dir === 1 ? X_TRAVEL : -X_TRAVEL,
      opacity: 1,
    }),
    animate: (dir) => ({
      x:
        dir === 1
          ? ['89vw', xPastCenter(dir), 0]
          : ['-89vw', xPastCenter(dir), 0],
      transition: {
        duration: DURATION,
        times: [WIND_UP_T, WIND_DOWN_PEAK_T, 1],
        ease: enterEase,
      },
    }),
    exit: (dir) => ({
      x: dir === 1 ? [0, '1.5vw'] : [0, '-1.5vw'],
      opacity: 0,
      transition: {
        duration: NAME_EXIT_DURATION,
        ease: easeWindDown,
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
      animate: { x: 0, opacity: 1, transition: { duration: DESC_FADE_DURATION } },
      exit: { opacity: 0, transition: { duration: DESC_EXIT_DURATION } },
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
      opacity: [0, 1, 1],
      transition: {
        x: {
          delay: DESC_ENTER_DELAY,
          duration: DURATION,
          times: [WIND_UP_T, WIND_DOWN_PEAK_T, 1],
          ease: enterEase,
        },
        opacity: {
          delay: DESC_ENTER_DELAY + 0.04,
          duration: DESC_FADE_DURATION,
          ease: [0.4, 0, 0.2, 1],
        },
      },
    }),
    exit: (dir) => ({
      x: dir === 1 ? [0, -ant] : [0, ant],
      opacity: 0,
      transition: {
        duration: DESC_EXIT_DURATION,
        ease: easeWindDown,
      },
    }),
  };
}

export function HeroShowcase({ slides, children }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const transitionLockRef = useRef(false);
  const lockTimerRef = useRef(null);
  const floatLayerRef = useRef(null);

  const n = slides.length;
  const slide = n ? slides[((index % n) + n) % n] : null;

  const lockTransition = useCallback(() => {
    transitionLockRef.current = true;
    if (lockTimerRef.current) {
      window.clearTimeout(lockTimerRef.current);
    }
    lockTimerRef.current = window.setTimeout(() => {
      transitionLockRef.current = false;
      lockTimerRef.current = null;
    }, (DURATION + NAME_ENTER_DELAY) * 1000);
  }, []);

  const go = useCallback(
    (dir) => {
      if (!n || transitionLockRef.current) return;
      lockTransition();
      setDirection(dir);
      setIndex((i) => (i + dir + n) % n);
    },
    [lockTransition, n],
  );

  useEffect(
    () => () => {
      if (lockTimerRef.current) {
        window.clearTimeout(lockTimerRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    if (reduceMotion || paused || !n) return undefined;
    const id = window.setInterval(() => {
      if (transitionLockRef.current) return;
      lockTransition();
      setDirection(1);
      setIndex((i) => (i + 1 + n) % n);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [lockTransition, reduceMotion, paused, n]);

  useEffect(() => {
    const el = floatLayerRef.current;
    if (!el || reduceMotion) return undefined;

    let raf = 0;
    const updateParallax = () => {
      raf = 0;
      const coverDistance = window.innerHeight || 1;
      const scrollProgress = Math.min(window.scrollY, coverDistance);
      el.style.transform = `translate3d(0, ${scrollProgress * -0.22}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      el.style.transform = '';
    };
  }, [reduceMotion]);

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

        <div ref={floatLayerRef} className="hero-showcase__float-layer">
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
              <h1 className="hero-showcase__desc-title">{slide.title}</h1>
              <p className="hero-showcase__desc-copy">{slide.line}</p>
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
    </div>
  );
}
