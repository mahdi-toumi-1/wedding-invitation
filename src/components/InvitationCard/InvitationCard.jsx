/**
 * InvitationCard.jsx
 *
 * The full luxury invitation card revealed after the envelope animation.
 * Features an ivory/parchment paper texture with golden borders,
 * displaying the complete Arabic wedding invitation text exactly as provided.
 */

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GiDiamondRing } from 'react-icons/gi';
import styles from './InvitationCard.module.css';

// ── Corner SVG ornament ──
const CornerOrnament = () => (
  <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M48 2 L48 48 L2 48" stroke="var(--gold-mat)" strokeWidth="1" fill="none" />
    <path d="M48 2 Q35 2 25 12" stroke="var(--gold-mat)" strokeWidth="0.7" fill="none" opacity="0.6" />
    <path d="M48 15 Q38 8 30 8" stroke="var(--gold-mat)" strokeWidth="0.5" fill="none" opacity="0.4" />
    <circle cx="48" cy="48" r="2" fill="var(--gold-mat)" opacity="0.7" />
    <circle cx="48" cy="2" r="2" fill="var(--gold-mat)" opacity="0.7" />
    <path d="M42 2 L48 2 L48 8" stroke="var(--gold-mat)" strokeWidth="0.8" fill="none" />
  </svg>
);

// ── Card divider component ──
const GoldDivider = () => (
  <div className={styles.cardDivider} aria-hidden="true">
    <span className={styles.cardDividerIcon}>✦</span>
  </div>
);

// ── Animation: scroll reveal ──
const scrollReveal = (delay = 0) => ({
  initial: { opacity: 0, y: 25 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  },
});

export default function InvitationCard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-5%' });

  const anim = (delay) => ({
    initial: scrollReveal(delay).initial,
    animate: isInView ? scrollReveal(delay).animate : scrollReveal(delay).initial,
  });

  return (
    <section
      className={styles.section}
      aria-label="بطاقة الدعوة"
      ref={ref}
    >
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
        role="article"
      >
        {/* ── Corner ornaments ── */}
        <div className={`${styles.cornerOrnament} ${styles.tl}`} aria-hidden="true">
          <CornerOrnament />
        </div>
        <div className={`${styles.cornerOrnament} ${styles.tr}`} aria-hidden="true">
          <CornerOrnament />
        </div>
        <div className={`${styles.cornerOrnament} ${styles.bl}`} aria-hidden="true">
          <CornerOrnament />
        </div>
        <div className={`${styles.cornerOrnament} ${styles.br}`} aria-hidden="true">
          <CornerOrnament />
        </div>

        {/* ── Card content ── */}
        <div className={styles.cardContent} dir="rtl">
          {/* Bismillah */}
          <motion.p className={styles.cardBismillah} {...anim(0.1)}>
            بسم الله الرحمن الرحيم
          </motion.p>

          {/* Verse */}
          <motion.p className={styles.cardVerse} lang="ar" dir="rtl" {...anim(0.25)}>
            ﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَهُم مَّوَدَّةً وَرَحْمَةً ﴾
          </motion.p>

          {/* Sadaqa Allah */}
          <motion.p className={styles.cardSadaqa} {...anim(0.35)}>
            صدق الله العظيم
          </motion.p>

          <GoldDivider />

          {/* Opening */}
          <motion.p className={styles.cardIntro} {...anim(0.45)}>
            بكلّ فرحٍ وسرور،
          </motion.p>

          {/* Family 1 */}
          <motion.p className={styles.familyNames} {...anim(0.55)}>
            يتشرّف السيد لطفي الوذيني والسيدة ليلى الوذيني
          </motion.p>

          {/* Family 2 */}
          <motion.p className={styles.familyNames} {...anim(0.65)}>
            ويتشرّف السيد كريم البلعيدي والسيدة كريمة البلعيدي
          </motion.p>

          <GoldDivider />

          {/* Invite text */}
          <motion.div className={styles.coupleNames} {...anim(0.75)}>
            <p className={styles.coupleNamesText}>
              بدعوتكم لمشاركتهم فرحة حنة العريس وعقد القران لابنيهما
            </p>

            <div className={styles.namesRowLayout}>
              {/* Groom */}
              <span className={styles.groomName}>غيث الوذيني</span>

              {/* Ring */}
              <GiDiamondRing className={styles.roseIcon} aria-hidden="true" />

              {/* Bride */}
              <span className={styles.brideName}>أماني البلعيدي</span>
            </div>
          </motion.div>

          <GoldDivider />

          {/* Date & time */}
          <motion.div className={styles.eventDetails} {...anim(0.85)}>
            <p className={styles.dateHighlight}>
              وذلك يوم الجمعة 31 جويلية
            </p>
            <p>على الساعة السادسة مساءً (18:00)</p>
          </motion.div>

          {/* Location */}
          <motion.div className={styles.locationBlock} {...anim(0.95)}>
            <p>📍 قاعة الأفراح "Central Parc" – عين دراهم</p>
            <p>(المسبح البلدي القديم – عين دراهم)</p>
          </motion.div>

          <GoldDivider />

          {/* Closing */}
          <motion.div className={styles.closingText} {...anim(1.05)}>
            <p>بحضوركم تكتمل فرحتنا، وتشريفكم يزيد المناسبة بهجةً وسرورًا.</p>
          </motion.div>

          {/* Blessings */}
          <motion.p className={styles.blessings} {...anim(1.15)}>
            دامت الأفراح وجمع الله بينهما في خير، ورزقهما حياةً ملؤها السعادة والمودة والرحمة.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
