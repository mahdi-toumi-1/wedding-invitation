/**
 * Footer.jsx
 * 
 * Elegant dark footer with:
 * - Blessing text in gold
 * - Couple monogram (غ ♥ آ)
 * - Decorative SVG corners
 * - Year display
 */

import { motion } from 'framer-motion';
import styles from './Footer.module.css';

// ── Corner SVG for footer ──
const FooterCorner = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 120 L0 0 L120 0" stroke="var(--gold-mat)" strokeWidth="1" fill="none" />
    <path d="M0 60 Q0 0 60 0" stroke="var(--gold-mat)" strokeWidth="0.6" fill="none" opacity="0.5" />
    <path d="M0 90 Q0 30 30 0" stroke="var(--gold-mat)" strokeWidth="0.4" fill="none" opacity="0.3" />
    <circle cx="0" cy="0" r="4" fill="var(--gold-mat)" opacity="0.6" />
    <circle cx="30" cy="0" r="2" fill="var(--gold-mat)" opacity="0.3" />
    <circle cx="0" cy="30" r="2" fill="var(--gold-mat)" opacity="0.3" />
  </svg>
);

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      {/* Corner decorations */}
      <div className={styles.footerDecorLeft} aria-hidden="true">
        <FooterCorner />
      </div>
      <div className={styles.footerDecorRight} aria-hidden="true">
        <FooterCorner />
      </div>

      <div className={styles.footerContent}>
        {/* Rose */}
        <motion.span
          className={styles.footerRose}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.5, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          aria-hidden="true"
        >
        </motion.span>

        {/* Monogram */}
        <motion.p
          className={styles.monogram}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.7, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          aria-label="غيث وآمنة"
        >
          غ &nbsp;♥&nbsp; آ
        </motion.p>

        {/* Separator */}
        <div className={styles.footerSep} aria-hidden="true">
          <span className={styles.footerSepIcon}>✦</span>
        </div>

        {/* Blessing text */}
        <motion.p
          className={styles.blessingText}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          دامت الأفراح وجمع الله بينهما في خير
        </motion.p>

        {/* Separator */}
        <div className={styles.footerSep} aria-hidden="true">
          <span className={styles.footerSepIcon}>✦</span>
        </div>

        {/* Date & Credits */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}
        >
          <p className={styles.footerDate} aria-label="تاريخ الحفل: 31 جويلية 2025">
            31 جويلية 2025 &nbsp;✦&nbsp; عين دراهم
          </p>
          <p className={styles.footerCredits} style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--text-muted)', opacity: 0.8, marginTop: '1rem' }}>
            Created by Mahdi Toumi with love ♥
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
