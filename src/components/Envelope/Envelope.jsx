/**
 * Envelope.jsx
 * 
 * The heart of the wedding invitation experience.
 * Renders a realistic luxury envelope with:
 *  - Ivory body with golden borders
 *  - Golden wax seal with monogram (غ + آ)
 *  - Full Framer Motion animation sequence:
 *      1. Seal detaches
 *      2. Flap opens (3D flip)
 *      3. Card slides up
 *      4. Camera zoom + fade out
 *      5. Main content revealed
 * 
 * @param {function} onOpen - Callback triggered after the animation completes
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import styles from './Envelope.module.css';

// ── Particle data (decorative floating dots) ──
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  width: `${Math.random() * 4 + 1}px`,
  height: `${Math.random() * 4 + 1}px`,
  duration: `${Math.random() * 15 + 10}s`,
  delay: `${Math.random() * 10}s`,
}));

// ── SVG Corner decoration ──
const CornerSvg = () => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 58 L2 2 L58 2" stroke="var(--gold-mat)" strokeWidth="1.5" fill="none" />
    <path d="M2 20 Q20 2 20 2" stroke="var(--gold-mat)" strokeWidth="0.8" fill="none" opacity="0.5" />
    <circle cx="2" cy="2" r="3" fill="var(--gold-mat)" opacity="0.8" />
    <path d="M8 2 L2 2 L2 8" stroke="var(--gold-mat)" strokeWidth="1" fill="none" opacity="0.5" />
  </svg>
);

// ── Animation variants ──
const sceneVariants = {
  visible: { opacity: 1 },
  exit: {
    opacity: 0,
    scale: 1.08,
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const sealVariants = {
  initial: { scale: 1, opacity: 1 },
  detach: {
    scale: [1, 1.1, 0.9, 1.2, 0],
    opacity: [1, 1, 0.8, 0.5, 0],
    rotate: [0, 5, -5, 10, 20],
    y: [0, -5, 0, -15, -40],
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
};

const flapVariants = {
  initial: { rotateX: 0, transformOrigin: 'top center' },
  open: {
    rotateX: -180,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 },
  },
};

const cardVariants = {
  initial: { y: 0, scale: 1 },
  rise: {
    y: -90,
    scale: 1.02,
    transition: { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94], delay: 1.1 },
  },
};

const wrapperVariants = {
  initial: { scale: 1, y: 0 },
  zoom: {
    scale: 1.15,
    y: -30,
    transition: { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94], delay: 1.8 },
  },
};

export default function Envelope({ onOpen }) {
  const [phase, setPhase] = useState('idle'); // idle → animating → done
  const [isExiting, setIsExiting] = useState(false);

  // ── Handle click on envelope ──
  const handleClick = () => {
    if (phase !== 'idle') return;
    setPhase('animating');

    // After full animation sequence → trigger exit
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onOpen();
      }, 1200);
    }, 2800);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className={styles.envelopeScene}
          variants={sceneVariants}
          initial="visible"
          exit="exit"
          key="envelope-scene"
          aria-label="اضغط لفتح الدعوة"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        >
          {/* ── Background particles ── */}
          <div className={styles.particles} aria-hidden="true">
            {PARTICLES.map((p) => (
              <span
                key={p.id}
                className={styles.particle}
                style={{
                  left: p.left,
                  width: p.width,
                  height: p.height,
                  animationDuration: p.duration,
                  animationDelay: p.delay,
                  bottom: '-10px',
                }}
              />
            ))}
          </div>

          {/* ── Corner decorations ── */}
          <div className={`${styles.cornerDecor} ${styles.topLeft}`} aria-hidden="true">
            <CornerSvg />
          </div>
          <div className={`${styles.cornerDecor} ${styles.topRight}`} aria-hidden="true">
            <CornerSvg />
          </div>
          <div className={`${styles.cornerDecor} ${styles.bottomLeft}`} aria-hidden="true">
            <CornerSvg />
          </div>
          <div className={`${styles.cornerDecor} ${styles.bottomRight}`} aria-hidden="true">
            <CornerSvg />
          </div>

          {/* ── Envelope + CTA wrapper ── */}
          <motion.div
            className={styles.envelopeWrapper}
            variants={wrapperVariants}
            animate={phase === 'animating' ? 'zoom' : 'initial'}
            onClick={handleClick}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 20 }}
          >
            {/* ── Envelope container ── */}
            <div className={styles.envelopeContainer}>
              {/* Pulse rings */}
              {phase === 'idle' && (
                <>
                  <div className={styles.pulseRing} aria-hidden="true" />
                  <div className={styles.pulseRing} aria-hidden="true" />
                </>
              )}

              {/* ── Envelope body (SVG) ── */}
              <div className={styles.envelopeBody}>
                <svg
                  className={styles.envelopeBodySvg}
                  viewBox="0 0 380 270"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  {/* Paper texture filter */}
                  <defs>
                    <filter id="paperTexture">
                      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
                      <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
                      <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blend" />
                      <feComponentTransfer in="blend">
                        <feFuncA type="linear" slope="1" />
                      </feComponentTransfer>
                    </filter>
                    <filter id="softShadow">
                      <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.3" />
                    </filter>
                    <linearGradient id="envelopeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FAF6EE" />
                      <stop offset="50%" stopColor="#F5EDD8" />
                      <stop offset="100%" stopColor="#EDE0C4" />
                    </linearGradient>
                    <linearGradient id="goldBorderGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#E8C97A" />
                      <stop offset="50%" stopColor="#C8A96A" />
                      <stop offset="100%" stopColor="#A0803A" />
                    </linearGradient>
                    <linearGradient id="leftFoldGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#EDE0C4" />
                      <stop offset="100%" stopColor="#D8C8A0" />
                    </linearGradient>
                    <linearGradient id="rightFoldGrad" x1="1" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#EDE0C4" />
                      <stop offset="100%" stopColor="#D8C8A0" />
                    </linearGradient>
                    <linearGradient id="bottomFoldGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#E5D5B0" />
                      <stop offset="100%" stopColor="#C8B888" />
                    </linearGradient>
                  </defs>

                  {/* Main envelope body */}
                  <rect width="380" height="270" rx="5" fill="url(#envelopeGrad)" filter="url(#paperTexture)" />

                  {/* Golden outer border */}
                  <rect x="1" y="1" width="378" height="268" rx="4.5" fill="none" stroke="url(#goldBorderGrad)" strokeWidth="1.5" />
                  {/* Inner border */}
                  <rect x="7" y="7" width="366" height="256" rx="3" fill="none" stroke="url(#goldBorderGrad)" strokeWidth="0.6" opacity="0.6" />

                  {/* Left fold triangle */}
                  <polygon points="0,0 0,270 175,135" fill="url(#leftFoldGrad)" opacity="0.9" />
                  <line x1="0" y1="0" x2="175" y2="135" stroke="url(#goldBorderGrad)" strokeWidth="0.8" opacity="0.5" />
                  <line x1="0" y1="270" x2="175" y2="135" stroke="url(#goldBorderGrad)" strokeWidth="0.8" opacity="0.5" />

                  {/* Right fold triangle */}
                  <polygon points="380,0 380,270 205,135" fill="url(#rightFoldGrad)" opacity="0.9" />
                  <line x1="380" y1="0" x2="205" y2="135" stroke="url(#goldBorderGrad)" strokeWidth="0.8" opacity="0.5" />
                  <line x1="380" y1="270" x2="205" y2="135" stroke="url(#goldBorderGrad)" strokeWidth="0.8" opacity="0.5" />

                  {/* Bottom fold triangle */}
                  <polygon points="0,270 380,270 190,148" fill="url(#bottomFoldGrad)" opacity="0.95" />
                  <line x1="0" y1="270" x2="190" y2="148" stroke="url(#goldBorderGrad)" strokeWidth="0.8" opacity="0.6" />
                  <line x1="380" y1="270" x2="190" y2="148" stroke="url(#goldBorderGrad)" strokeWidth="0.8" opacity="0.6" />

                  {/* Decorative corner flourishes */}
                  <path d="M15 15 Q30 8 45 15 Q38 30 15 30 Z" fill="none" stroke="url(#goldBorderGrad)" strokeWidth="0.6" opacity="0.4" />
                  <path d="M365 15 Q350 8 335 15 Q342 30 365 30 Z" fill="none" stroke="url(#goldBorderGrad)" strokeWidth="0.6" opacity="0.4" />
                  <path d="M15 255 Q30 262 45 255 Q38 240 15 240 Z" fill="none" stroke="url(#goldBorderGrad)" strokeWidth="0.6" opacity="0.4" />
                  <path d="M365 255 Q350 262 335 255 Q342 240 365 240 Z" fill="none" stroke="url(#goldBorderGrad)" strokeWidth="0.6" opacity="0.4" />
                </svg>
              </div>

              <div className={styles.doorLetterLeft} aria-hidden="true">
                غ
              </div>
              <div className={styles.doorLetterRight} aria-hidden="true">
                آ
              </div>

              <motion.div
                className={styles.scrollHint}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: [0, 6, 0] }}
                transition={{ delay: 1.1, duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className={styles.scrollHintText}>هناك محتوى في الأسفل</span>
                <span className={styles.scrollHintArrow} aria-hidden="true">↓</span>
              </motion.div>

              <motion.div
                className={styles.envelopeInlineCta}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.8, ease: 'easeOut' }}
              >
                <span className={styles.envelopeInlineCtaText}>انقر هنا لفتح الدعوة</span>
              </motion.div>

              {/* ── Invitation card (inside envelope) ── */}
              <motion.div
                className={styles.envelopeCard}
                variants={cardVariants}
                animate={phase === 'animating' ? 'rise' : 'initial'}
                aria-hidden="true"
              >
                <div className={styles.envelopeCardContent}>
                  <div className={styles.envelopeCardLine} />
                  <span className={styles.envelopeCardSubtext}>دعوة زفاف</span>
                </div>
              </motion.div>

              {/* ── Flap (animated) ── */}
              <motion.div
                className={styles.envelopeFlap}
                variants={flapVariants}
                animate={phase === 'animating' ? 'open' : 'initial'}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <svg
                  className={styles.envelopeFlapSvg}
                  viewBox="0 0 380 148"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F5EDD8" />
                      <stop offset="100%" stopColor="#E8D8B0" />
                    </linearGradient>
                  </defs>
                  {/* Flap triangle */}
                  <polygon points="0,0 380,0 190,148" fill="url(#flapGrad)" />
                  {/* Flap border */}
                  <polyline points="0,0 380,0 190,148 0,0" fill="none" stroke="url(#goldBorderGrad)" strokeWidth="1.5" />
                  {/* Inner flap line */}
                  <polyline points="10,0 370,0 190,135" fill="none" stroke="url(#goldBorderGrad)" strokeWidth="0.5" opacity="0.4" />
                </svg>
              </motion.div>

              {/* ── Wax seal ── */}
              <motion.div
                className={styles.waxSeal}
                variants={sealVariants}
                animate={phase === 'animating' ? 'detach' : 'initial'}
                aria-hidden="true"
              >
                <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="sealGrad" cx="40%" cy="35%">
                      <stop offset="0%" stopColor="#E8C97A" />
                      <stop offset="40%" stopColor="#C8A96A" />
                      <stop offset="100%" stopColor="#8A6030" />
                    </radialGradient>
                    <radialGradient id="sealShine" cx="35%" cy="30%">
                      <stop offset="0%" stopColor="rgba(255,240,180,0.6)" />
                      <stop offset="100%" stopColor="rgba(255,240,180,0)" />
                    </radialGradient>
                    <filter id="sealShadow">
                      <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.5" />
                    </filter>
                  </defs>

                  {/* Seal base */}
                  <circle cx="36" cy="36" r="34" fill="url(#sealGrad)" filter="url(#sealShadow)" />

                  {/* Wax texture rings */}
                  <circle cx="36" cy="36" r="31" fill="none" stroke="rgba(255,230,140,0.2)" strokeWidth="1" />
                  <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(255,230,140,0.15)" strokeWidth="0.5" />

                  {/* Sheen overlay */}
                  <circle cx="36" cy="36" r="34" fill="url(#sealShine)" />

                  {/* Outer star/petal border */}
                  {Array.from({ length: 12 }, (_, i) => {
                    const angle = (i * 30 - 90) * Math.PI / 180;
                    const x1 = 36 + 30 * Math.cos(angle);
                    const y1 = 36 + 30 * Math.sin(angle);
                    const x2 = 36 + 34 * Math.cos(angle);
                    const y2 = 36 + 34 * Math.sin(angle);
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,240,180,0.4)" strokeWidth="1.2" />;
                  })}

                  {/* Decorative ring */}
                  <circle cx="36" cy="36" r="24" fill="none" stroke="rgba(255,235,160,0.35)" strokeWidth="1.5" />

                  {/* Monogram: غ */}
                  <text
                    x="36" y="32"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="Amiri, serif"
                    fontSize="11"
                    fontWeight="bold"
                    fill="rgba(80,50,10,0.9)"
                  >غ</text>

                  {/* Heart separator */}
                  <text
                    x="36" y="41"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="7"
                    fill="rgba(80,50,10,0.7)"
                  >♥</text>

                  {/* Monogram: آ */}
                  <text
                    x="36" y="50"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="Amiri, serif"
                    fontSize="11"
                    fontWeight="bold"
                    fill="rgba(80,50,10,0.9)"
                  >آ</text>
                </svg>
              </motion.div>
            </div>

            {/* ── CTA Text ── */}
            <motion.div
              className={styles.ctaBlock}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
            >
              <p className={styles.ctaText}>انقر هنا لفتح الدعوة</p>
              <p className={styles.ctaSubtext}>اضغط على الزر لبدء التجربة</p>
              <span className={styles.ctaArrow} aria-hidden="true">✦</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
