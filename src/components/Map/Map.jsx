/**
 * Map.jsx
 * 
 * Location section with:
 * - Embedded Google Maps iframe for Ain Draham
 * - Elegant address display
 * - CTA button to open in Google Maps
 * - Scroll-reveal animations
 */

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Map.module.css';

// ── Google Maps embed for QMHP+76C, Ain Draham ──
const MAP_EMBED_URL =
  'https://www.google.com/maps?q=QMHP%2B76C%2C%20Ain%20Draham&z=16&output=embed';

const MAP_GMAPS_URL =
  'https://maps.google.com/?q=QMHP%2B76C%2C%20Ain%20Draham';

export default function Map() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-8%' });

  return (
    <section
      className={styles.section}
      ref={ref}
      aria-label="موقع الحفل"
    >
      <div className={styles.container}>
        {/* Title */}
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          ✦ &nbsp; موقع الحفل &nbsp; ✦
        </motion.h2>

        {/* Address */}
        <motion.div
          className={styles.addressBlock}
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className={styles.addressText}>
            <span className={styles.addressHighlight}>
              قاعة الأفراح "Central Parc"
            </span>
          </p>
          <p className={styles.addressText}>
            المسبح البلدي القديم – عين دراهم
          </p>
        </motion.div>

        {/* Map */}
        <motion.div
          className={styles.mapWrapper}
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <iframe
            className={styles.mapIframe}
            src={MAP_EMBED_URL}
            title="موقع قاعة الأفراح Central Parc – عين دراهم"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            aria-label="خريطة موقع الحفل في عين دراهم"
          />
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className={styles.ctaWrapper}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.a
            href={MAP_GMAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
            aria-label="فتح الموقع على خرائط جوجل"
            whileTap={{ scale: 0.96 }}
          >
            <span className={styles.ctaButtonIcon} aria-hidden="true"></span>
            <span className={styles.ctaButtonText}>عرض الموقع على Google Maps</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
