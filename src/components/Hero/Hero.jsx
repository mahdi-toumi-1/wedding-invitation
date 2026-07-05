/**
 * Hero.jsx
 * 
 * First section revealed after the envelope opens.
 * Displays the Bismillah, Quranic verse, and Sadaqa Allah
 * with staggered Framer Motion animations.
 */

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Hero.module.css';

// ── Fade-up animation variant ──
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30, filter: 'blur(6px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.0,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.96 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
});

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section
      className={styles.hero}
      ref={ref}
      aria-label="الآية القرآنية الكريمة"
    >
      {/* Halo glow */}
      <div className={styles.halo} aria-hidden="true" />

      <div className={styles.heroContent}>
        {/* ── Bismillah ── */}
        <motion.h1
          className={styles.bismillah}
          {...fadeUp(0.1)}
          animate={isInView ? fadeUp(0.1).animate : fadeUp(0.1).initial}
        >
          بسم الله الرحمن الرحيم
        </motion.h1>

        {/* ── Ornament ── */}
        <motion.div
          className={styles.ornament}
          {...fadeIn(0.4)}
          animate={isInView ? fadeIn(0.4).animate : fadeIn(0.4).initial}
          aria-hidden="true"
        >
          ✦ &nbsp; ✦ &nbsp; ✦
        </motion.div>

        <motion.div
          className={styles.verseBlock}
          {...fadeIn(0.6)}
          animate={isInView ? fadeIn(0.6).animate : fadeIn(0.6).initial}
        >
          <p className={styles.verse} dir="rtl">
            ﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَهُم مَّوَدَّةً وَرَحْمَةً ﴾
          </p>
        </motion.div>

        {/* ── Sadaqa Allah ── */}
        <motion.p
          className={styles.sadaqaAllah}
          {...fadeUp(1.0)}
          animate={isInView ? fadeUp(1.0).animate : fadeUp(1.0).initial}
        >
          صدق الله العظيم
        </motion.p>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className={styles.scrollIndicatorArrow}>↓</span>
      </motion.div>
    </section>
  );
}
