/**
 * SlidingDoor.jsx
 *
 * Premium intro animation — full-screen sliding door reveal.
 *
 * Behaviour:
 *  1. Two ivory/cream panels cover the entire viewport.
 *  2. Centred CTA button fades in after a short delay.
 *  3. On click the button animates (scale pulse), then both panels
 *     slide apart simultaneously (left → left, right → right).
 *  4. A soft fade of the entire scene signals completion.
 *  5. onOpen() is called once the exit transition finishes.
 *
 * @param {() => void} onOpen  Callback fired when the door has fully opened.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SlidingDoor.module.css';

// ── Floating particles (decorative, 16 tiny gold dots) ──
const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  // Distribute across both halves
  left: `${6 + (i % 8) * 12}%`,
  top: `${10 + Math.floor(i / 8) * 50 + Math.random() * 30}%`,
  size: `${1.5 + (i % 3)}px`,
  duration: `${8 + (i % 6) * 2}s`,
  delay: `${(i % 7) * 1.2}s`,
}));

// ── SVG corner ornament ──
const CornerSvg = () => (
  <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 50 L2 2 L50 2" stroke="var(--gold-mat)" strokeWidth="1.2" fill="none" />
    <path d="M2 22 Q2 2 22 2" stroke="var(--gold-mat)" strokeWidth="0.7" fill="none" opacity="0.5" />
    <path d="M2 36 Q2 14 14 2" stroke="var(--gold-mat)" strokeWidth="0.4" fill="none" opacity="0.3" />
    <circle cx="2" cy="2" r="2.5" fill="var(--gold-mat)" opacity="0.7" />
    <circle cx="14" cy="2" r="1.5" fill="var(--gold-mat)" opacity="0.3" />
    <circle cx="2" cy="14" r="1.5" fill="var(--gold-mat)" opacity="0.3" />
  </svg>
);

// ── Animation variants ──

// Panel slide-out variants
const panelVariants = {
  closed: { x: 0 },
  open: (direction) => ({
    x: direction === 'left' ? '-100%' : '100%',
    transition: {
      duration: 1.1,
      ease: [0.76, 0, 0.24, 1],   // strong easeInOut for a cinematic feel
      delay: 0.15,
    },
  }),
};

// Scene overall fade-out after panels slide away
const sceneVariants = {
  visible: { opacity: 1 },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: 1.1 },
  },
};

// CTA area (monogram + button)
const ctaVariants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.6 },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    filter: 'blur(6px)',
    transition: { duration: 0.4, ease: 'easeIn' },
  },
};

export default function SlidingDoor({ onOpen }) {
  const [phase, setPhase] = useState('idle');   // idle → opening → done
  const [isExiting, setIsExiting] = useState(false);

  // ── Handle button click ──
  const handleOpen = () => {
    if (phase !== 'idle') return;
    setPhase('opening');
    // After panels finish sliding (~1.3s total) → unmount scene
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(onOpen, 520);   // wait for scene fade-out
    }, 1250);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="sliding-door-scene"
          variants={sceneVariants}
          initial="visible"
          exit="exit"
          className={styles.scene}
        >
          {/* ──────────────────── LEFT PANEL ──────────────────── */}
          <motion.div
            className={`${styles.panel} ${styles.panelLeft}`}
            variants={panelVariants}
            initial="closed"
            animate={phase === 'opening' ? 'open' : 'closed'}
            custom="left"
            aria-hidden="true"
          >
            <div className={styles.panelTexture} />
            <div className={styles.panelDeco} />
            <div className={styles.panelEdge} />

            {/* Door Letter */}
            <div className={styles.doorLetter}>آ</div>

            {/* Corner ornaments (left panel shows TL + BL) */}
            <div className={`${styles.panelCorner} ${styles.tl}`}><CornerSvg /></div>
            <div className={`${styles.panelCorner} ${styles.bl}`}><CornerSvg /></div>

            {/* Left-side particles */}
            {PARTICLES.slice(0, 8).map((p) => (
              <span
                key={p.id}
                className={styles.particle}
                aria-hidden="true"
                style={{
                  left: p.left,
                  top: p.top,
                  width: p.size,
                  height: p.size,
                  animationDuration: p.duration,
                  animationDelay: p.delay,
                }}
              />
            ))}
          </motion.div>

          {/* ──────────────────── RIGHT PANEL ──────────────────── */}
          <motion.div
            className={`${styles.panel} ${styles.panelRight}`}
            variants={panelVariants}
            initial="closed"
            animate={phase === 'opening' ? 'open' : 'closed'}
            custom="right"
            aria-hidden="true"
          >
            <div className={styles.panelTexture} />
            <div className={styles.panelDeco} />
            <div className={styles.panelEdge} />

            {/* Door Letter */}
            <div className={styles.doorLetter}>غ</div>

            {/* Corner ornaments (right panel shows TR + BR) */}
            <div className={`${styles.panelCorner} ${styles.tr}`}><CornerSvg /></div>
            <div className={`${styles.panelCorner} ${styles.br}`}><CornerSvg /></div>

            {/* Right-side particles */}
            {PARTICLES.slice(8).map((p) => (
              <span
                key={p.id}
                className={styles.particle}
                aria-hidden="true"
                style={{
                  left: `${parseInt(p.left) - 50}%`,
                  top: p.top,
                  width: p.size,
                  height: p.size,
                  animationDuration: p.duration,
                  animationDelay: p.delay,
                }}
              />
            ))}
          </motion.div>

          {/* ──────────────────── CENTRAL CTA ──────────────────── */}
          <div className={styles.ctaArea}>
            <AnimatePresence>
              {phase === 'idle' && (
                <motion.div
                  key="cta"
                  variants={ctaVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}
                >
                  {/* Round Heart Button */}
                  <button
                    className={styles.ctaButton}
                    onClick={handleOpen}
                    aria-label="ابدأ تجربة الدعوة"
                    type="button"
                  >
                    <span className={styles.ctaButtonPill}>
                      {/* Using an SVG heart to ensure it uses the gold color and avoids red emoji fallback */}
                      <svg
                        className={styles.ctaButtonIcon}
                        style={{ width: '36px', height: '36px', fill: 'currentColor' }}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </span>
                    <span className={styles.ctaHint}>انقر هنا لفتح الدعوة</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
