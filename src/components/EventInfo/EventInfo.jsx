/**
 * EventInfo.jsx
 * 
 * Displays event details in elegant glassmorphism cards:
 * Date, Time, Venue, Location
 * 
 * Each card has:
 * - Hover elevation with gold halo
 * - Icon with scale animation on hover
 * - Scroll-triggered reveal with stagger
 */

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './EventInfo.module.css';

const EventIcon = ({ type }) => {
  const commonProps = {
    className: styles.cardIconSvg,
    viewBox: '0 0 64 64',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
  };

  switch (type) {
    case 'date':
      return (
        <svg {...commonProps}>
          <rect x="12" y="16" width="40" height="34" rx="8" stroke="currentColor" strokeWidth="2.2" />
          <path d="M12 26h40" stroke="currentColor" strokeWidth="2.2" />
          <path d="M22 10v10M42 10v10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M24 38h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M24 44h10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 'time':
      return (
        <svg {...commonProps}>
          <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2.2" />
          <path d="M32 22v12l8 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="32" cy="32" r="3.5" fill="currentColor" />
        </svg>
      );
    case 'venue':
      return (
        <svg {...commonProps}>
          <path d="M18 50V28l14-10 14 10v22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M26 50V36h12v14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 24h20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 'location':
      return (
        <svg {...commonProps}>
          <path d="M32 12c10 0 18 8 18 18 0 12-18 22-18 22S14 42 14 30c0-10 8-18 18-18Z" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="32" cy="30" r="6" stroke="currentColor" strokeWidth="2.2" />
          <path d="M22 18h20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
        </svg>
      );
    default:
      return null;
  }
};

// ── Event data ──
const EVENT_CARDS = [
  {
    id: 'date',
    label: 'التاريخ',
    value: 'الجمعة 31 جويلية',
    subValue: '2025',
    ariaLabel: 'تاريخ الحفل: الجمعة 31 جويلية',
  },
  {
    id: 'time',
    label: 'الوقت',
    value: 'السادسة مساءً',
    subValue: '18:00',
    ariaLabel: 'وقت الحفل: السادسة مساءً',
  },
  {
    id: 'venue',
    label: 'قاعة الأفراح',
    value: 'Central Park Ain Draham',
    subValue: 'عين دراهم',
    ariaLabel: 'مكان الحفل: Central Park Ain Draham',
  },
  {
    id: 'location',
    label: 'العنوان',
    value: 'عين دراهم',
    subValue: 'المسبح البلدي القديم',
    ariaLabel: 'العنوان: عين دراهم، المسبح البلدي القديم',
  },
];

// ── Card animation variant ──
const cardAnim = (delay) => ({
  initial: { opacity: 0, y: 30, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  },
});

export default function EventInfo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-8%' });

  return (
    <section
      className={styles.section}
      ref={ref}
      aria-label="تفاصيل الحفل"
    >
      <div className={styles.container}>
        {/* Title */}
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          ✦ &nbsp; تفاصيل المناسبة &nbsp; ✦
        </motion.h2>

        {/* Cards grid */}
        <div
          className={styles.cardsGrid}
          role="list"
        >
          {EVENT_CARDS.map((card, i) => {
            const anim = cardAnim(0.1 + i * 0.15);
            return (
              <motion.div
                key={card.id}
                className={styles.infoCard}
                initial={anim.initial}
                animate={isInView ? anim.animate : anim.initial}
                role="listitem"
                aria-label={card.ariaLabel}
                tabIndex={0}
              >
                <span className={styles.cardIcon} role="img" aria-hidden="true">
                  <EventIcon type={card.id} />
                </span>
                <p className={styles.cardLabel}>{card.label}</p>
                <div className={styles.cardDivLine} aria-hidden="true" />
                <p className={styles.cardValue}>{card.value}</p>
                {card.subValue && (
                  <p className={styles.cardSubValue}>{card.subValue}</p>
                )}
              </motion.div>
            );
          })}
        </div>


      </div>
    </section>
  );
}
