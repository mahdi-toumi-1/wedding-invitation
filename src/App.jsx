/**
 * App.jsx
 * 
 * Wedding Invitation — دعوة حفل حنة وعقد قران غيث وآمنة
 * Light theme redesign with SlidingDoor intro
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import SlidingDoor    from './components/SlidingDoor/SlidingDoor';
import Hero           from './components/Hero/Hero';
import InvitationCard from './components/InvitationCard/InvitationCard';
import Couple         from './components/Couple/Couple';
import EventInfo      from './components/EventInfo/EventInfo';
import Map            from './components/Map/Map';
import Footer         from './components/Footer/Footer';
import { GoldSeparator } from './components/DecorativeElements/DecorativeElements';

import './styles/globals.css';

// ── Content reveal variants ──
const contentVariants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div dir="rtl" lang="ar">
      {/* ── Sliding door intro ── */}
      <SlidingDoor onOpen={() => setIsOpen(true)} />

      {/* ── Main content (revealed after doors open) ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.main
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            id="main-content"
            role="main"
            aria-label="دعوة حفل الزفاف"
            style={{ background: 'var(--bg-surface)', minHeight: '100vh' }}
          >
            <Hero />
            <GoldSeparator />
            <InvitationCard />
            <GoldSeparator />
            <Couple />
            <GoldSeparator />
            <EventInfo />
            <GoldSeparator />
            <Map />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
