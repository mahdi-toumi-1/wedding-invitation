/**
 * Couple.jsx
 * 
 * Artistic section highlighting the two names:
 * غيث العوذيني and آمنة البلعيدي
 * with a central animated rose and golden calligraphic styling.
 */

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GiDiamondRing } from 'react-icons/gi';
import styles from './Couple.module.css';
import coupleImg from '../../assets/couple.jpg';

export default function Couple() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' });

  // Variants for names sliding in
  const groomAnim = {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0, transition: { duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const brideAnim = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0, transition: { duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  // Variant for the center elements (rose, image)
  const centerAnim = {
    initial: { opacity: 0, scale: 0.8, rotate: -15 },
    animate: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.8, delay: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className={styles.section} id="couple" ref={sectionRef} aria-label="العرسان">
      {/* Decorative floral background elements */}
      <div className={`${styles.bgFloral} ${styles.topRight}`} aria-hidden="true" />
      <div className={`${styles.bgFloral} ${styles.bottomLeft}`} aria-hidden="true" />

      <div className={styles.container}>
        {/* Couple Illustration */}
        <motion.div
          className={styles.imageWrapper}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <img src={coupleImg} alt="رسم للعروسين" className={styles.coupleImage} />
        </motion.div>

        {/* Section label */}
        <motion.p
          className={styles.sectionLabel}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          aria-hidden="true"
        >
          ✦ &nbsp; العروسان &nbsp; ✦
        </motion.p>

        {/* ── Names ── */}
        <div className={styles.namesContainer}>
          {/* Groom */}
          <motion.div
            className={styles.nameCard}
            initial={groomAnim.initial}
            animate={isInView ? groomAnim.animate : groomAnim.initial}
          >
            <span className={styles.nameRole}>العريس</span>
            <div className={styles.nameRow}>
              <span className={styles.nameMain} aria-label="غيث الوذيني">غيث الوذيني</span>
            </div>
            <div className={styles.nameUnderline} aria-hidden="true" />
          </motion.div>

          {/* Central flower */}
          <motion.div
            className={styles.roseContainer}
            initial={centerAnim.initial}
            animate={isInView ? centerAnim.animate : centerAnim.initial}
            aria-hidden="true"
          >
            <div className={styles.roseDividerLine} />
            <GiDiamondRing className={styles.roseIcon} />
            <div className={styles.roseDividerLine} />
          </motion.div>

          {/* Bride */}
          <motion.div
            className={styles.nameCard}
            initial={brideAnim.initial}
            animate={isInView ? brideAnim.animate : brideAnim.initial}
          >
            <span className={styles.nameRole}>العروسة</span>
            <div className={styles.nameRow}>
              <span className={styles.nameMain} aria-label="أماني البلعيدي">أماني البلعيدي</span>
            </div>
            <div className={styles.nameUnderline} aria-hidden="true" />
          </motion.div>
        </div>

        {/* Bottom blessing */}
        <motion.p
          className={styles.bottomText}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          جمع الله بينهما في خير ووفّق
        </motion.p>
      </div>
    </section>
  );
}
