import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { publicImage } from '../utils/imageUrl';

const AUTO_MS = 7500;
const DURATION = 1.5;
const NAME_ENTER_DELAY = 0.14;
const NAME_EXIT_DURATION = 0.08;
const DESC_ENTER_DELAY = NAME_ENTER_DELAY;
const DESC_FADE_DURATION = 0.34;
const DESC_EXIT_DURATION = NAME_EXIT_DURATION;
const X_TRAVEL = '82vw';
const SPIN = 180;
const ROT_WIND = 14;
const EXIT_KICK = 12;
const EXIT_SPIN = 168;

const WIND_UP_T = 0.15;
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
const easeWindDown = [0.34, 1, 0.66, 1];
const enterEase = [easeMain, easeWindDown];
const exitEase = [easeWindDown, easeMain];

const Y_TRAVEL = '130vh';
const Y_OVERSHOOT_VH = '2.75vh';

function yPastCenter(dir) {
  return dir === 1 ? `-${Y_OVERSHOOT_VH}` : Y_OVERSHOOT_VH;
}

function floaterVariants(reduceMotion) {
  if (reduceMotion) {
    return {
      initial: { opacity: 0, y: 0, scale: 1, rotate: 0 },
      animate: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { duration: 0.2 } },
      exit: { opacity: 0, transition: { duration: 0.15 } },
    };
  }
  return {
    initial: ({ f, direction = 1 }) => {
      const fDir = (f?.enterFrom === 'bottom' || f?.bottom) ? 1 : -1;
      const dir = fDir * direction;
      return {
        y: dir === 1 ? Y_TRAVEL : `-${Y_TRAVEL}`,
        rotate: dir === 1 ? SPIN : -SPIN,
        opacity: 1,
      };
    },
    animate: ({ f, direction = 1 }) => {
      const fDir = (f?.enterFrom === 'bottom' || f?.bottom) ? 1 : -1;
      const dir = fDir * direction;
      return {
        y:
          dir === 1
            ? ['140vh', yPastCenter(dir), 0]
            : ['-140vh', yPastCenter(dir), 0],
        rotate: [
          dir === 1 ? SPIN - ROT_WIND : -SPIN + ROT_WIND,
          rotPastCenter(dir),
          0,
        ],
        opacity: 1,
        transition: {
          delay: NAME_ENTER_DELAY + (f?.delay ?? 0),
          duration: DURATION,
          times: [WIND_UP_T, WIND_DOWN_PEAK_T, 1],
          ease: enterEase,
        },
      };
    },
    exit: ({ f, direction = 1 }) => {
      const fDir = (f?.enterFrom === 'bottom' || f?.bottom) ? 1 : -1;
      const dir = fDir * direction;
      return {
        y: dir === 1 ? [0, '5vh', '-130vh'] : [0, '-5vh', '130vh'],
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
      };
    },
  };
}

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

/** 
 * Wraps a button to provide a "Magnetic" pull effect using Framer Motion. 
 */
function MagneticButton({ children, className, onClick, ariaLabel, strength = 0.4 }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 120 });
  const springY = useSpring(y, { damping: 15, stiffness: 120 });

  function handleMouseMove(e) {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * strength);
    y.set((clientY - centerY) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className={className}
    >
      <button 
        type="button" 
        onClick={onClick} 
        aria-label={ariaLabel}
        style={{ width: '100%', height: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        {children}
      </button>
    </motion.div>
  );
}

/**
 * Individual Floater component to safely use hooks for parallax.
 */
function FloaterItem({ f, i, direction, scrollY, variants }) {
  const depth = i % 2 === 0 ? -0.15 : -0.35;
  const yParallax = useTransform(scrollY, [0, 1000], [0, 1000 * depth]);

  return (
    <motion.img
      className="hero-showcase__floater"
      src={publicImage(f.src)}
      alt=""
      decoding="async"
      custom={{ f, direction }}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        width: `${f.size}px`,
        height: `${f.size}px`,
        top: f.top,
        left: f.left,
        right: f.right,
        bottom: f.bottom,
        y: yParallax
      }}
    />
  );
}

export function HeroShowcase({ slides, children }) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  
  // Cinematic Retreat Parallax
  const heroScale = useTransform(scrollY, [0, 800], [1, 0.82]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);
  const heroBlur = useTransform(scrollY, [100, 600], ["blur(0px)", "blur(15px)"]);
  const heroY = useTransform(scrollY, [0, 800], [0, -120]);
  
  const rotateScroll = useTransform(scrollY, [0, 800], [0, 120]);


  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const transitionLockRef = useRef(false);
  const lockTimerRef = useRef(null);

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
    function handleKeyDown(e) {
      if (e.key === 'ArrowLeft') {
        go(-1);
      } else if (e.key === 'ArrowRight') {
        go(1);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [go]);

  const imgV = imageVariants(Boolean(reduceMotion));
  const nmV = nameSlideVariants(Boolean(reduceMotion));
  const dV = descVariants(Boolean(reduceMotion));
  const fV = floaterVariants(Boolean(reduceMotion));

  if (!slide) return null;

  return (
    <motion.div
      className="hero-showcase hero-showcase--fullscreen"
      animate={{ backgroundColor: slide.baseColor }}
      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}

      <motion.div 
        className="hero-showcase__viewport"
        style={{ scale: heroScale, opacity: heroOpacity, filter: heroBlur, y: heroY }}
      >
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

        <div className="hero-showcase__float-layer">
          <AnimatePresence initial={false} custom={direction} mode="sync">
            {(slide.floaters || [])?.map((f, i) => (
              <FloaterItem 
                key={`${slide.id}-floater-${f.src}`}
                f={f}
                i={i}
                direction={direction}
                scrollY={scrollY}
                variants={fV}
              />
            ))}
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
                style={{
                  fontSize: slide.bgSize || `clamp(3rem, min(32vw, ${110 / Math.max(1, slide.bgName.length)}vw), 19rem)`
                }}
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
                <motion.div style={{ rotate: rotateScroll, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={publicImage(slide.image)} alt="" decoding="async" />
                </motion.div>
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
            <MagneticButton
              className="hero-showcase__magnetic-wrap"
              ariaLabel="Produit précédent"
              onClick={() => go(-1)}
            >
              <div className="hero-showcase__circle-nav">
                <svg className="hero-showcase__circle-nav-chevron" viewBox="0 0 24 24" aria-hidden>
                  <path d="M14 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </MagneticButton>



            <MagneticButton
              className="hero-showcase__magnetic-wrap"
              ariaLabel="Produit suivant"
              onClick={() => go(1)}
            >
              <div className="hero-showcase__circle-nav">
                <svg className="hero-showcase__circle-nav-chevron" viewBox="0 0 24 24" aria-hidden>
                  <path d="M10 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
