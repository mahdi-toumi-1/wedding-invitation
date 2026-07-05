/**
 * DecorativeElements.jsx
 * 
 * Reusable decorative components:
 * - GoldSeparator: ornamental divider
 * - DotPattern: gold dots row
 * - GeometricBorder: Islamic dashed border
 * - FloralCorner: SVG corner decoration
 */

import { motion } from 'framer-motion';
import styles from './DecorativeElements.module.css';

// ── Arabesque gold separator ──
export function GoldSeparator({ className = '' }) {
  return (
    <motion.div
      className={`${styles.separator} ${className}`}
      initial={{ opacity: 0, scaleX: 0.5 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      aria-hidden="true"
    >
      <div className={styles.separatorLine} />
      <span className={styles.separatorOrnament}>✦ ✦ ✦</span>
      <div className={styles.separatorLine} />
    </motion.div>
  );
}

// ── Dot pattern ──
export function DotPattern() {
  return (
    <div className={styles.dotPattern} aria-hidden="true">
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={`${styles.dot} ${styles.large}`} />
      <span className={styles.goldStar}>✦</span>
      <span className={`${styles.dot} ${styles.large}`} />
      <span className={styles.dot} />
      <span className={styles.dot} />
    </div>
  );
}

// ── Geometric dashed border ──
export function GeometricBorder() {
  return <div className={styles.geometricBorder} aria-hidden="true" />;
}

// ── SVG Floral corner (reusable) ──
export function FloralCornerSvg({ className = '' }) {
  return (
    <svg
      className={`${styles.floralCorner} ${className}`}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M4 76 L4 4 L76 4" stroke="var(--gold-mat)" strokeWidth="1" fill="none" />
      <path d="M4 28 Q4 4 28 4" stroke="var(--gold-mat)" strokeWidth="0.6" fill="none" opacity="0.6" />
      <path d="M4 52 Q4 28 28 4" stroke="var(--gold-mat)" strokeWidth="0.4" fill="none" opacity="0.3" />
      <circle cx="4" cy="4" r="3" fill="var(--gold-mat)" />
      <circle cx="4" cy="76" r="2" fill="var(--gold-mat)" opacity="0.5" />
      <circle cx="76" cy="4" r="2" fill="var(--gold-mat)" opacity="0.5" />
      <path d="M4 14 Q8 4 14 4" stroke="var(--gold-mat)" strokeWidth="0.8" fill="none" />
      <circle cx="20" cy="4" r="1.5" fill="var(--gold-mat)" opacity="0.4" />
      <circle cx="4" cy="20" r="1.5" fill="var(--gold-mat)" opacity="0.4" />
    </svg>
  );
}
