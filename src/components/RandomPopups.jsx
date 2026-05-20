// RandomPopups.jsx - Fake notification popups — ONLY during loading transition
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { popupMessages } from '../data/content';

export default function RandomPopups({ active }) {
  const [popups, setPopups] = useState([]);

  useEffect(() => {
    if (!active) return;

    const spawnPopup = () => {
      const id = Date.now();
      const msg = popupMessages[Math.floor(Math.random() * popupMessages.length)];
      const x = Math.random() * (window.innerWidth - 320);
      const y = Math.random() * (window.innerHeight - 100);

      setPopups(prev => [...prev.slice(-4), { id, msg, x, y }]);

      setTimeout(() => {
        setPopups(prev => prev.filter(p => p.id !== id));
      }, 3500);
    };

    const first = setTimeout(spawnPopup, 3000);
    const interval = setInterval(() => {
      if (Math.random() > 0.3) spawnPopup();
    }, 4000);

    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, [active]);

  // Clear any lingering popups when deactivated
  useEffect(() => {
    if (!active) setPopups([]);
  }, [active]);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9990 }}>
      <AnimatePresence>
        {popups.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              position: 'absolute',
              left: Math.min(p.x, window.innerWidth - 300),
              top: Math.min(p.y, window.innerHeight - 80),
              pointerEvents: 'auto',
            }}
            className="bg-chaos-dark border border-chaos-red rounded-lg px-4 py-3 flex items-center gap-2 shadow-xl"
          >
            <div className="w-2 h-2 rounded-full bg-chaos-red animate-pulse" />
            <span className="font-mono text-xs text-chaos-white whitespace-nowrap">
              {p.msg}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
