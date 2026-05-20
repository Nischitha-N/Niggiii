// CustomCursor.jsx - Glow trail cursor with hearts/sparkles
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SPARKLE_CHARS = ['💀', '❤️', '🙄', '✨', '💘', '👀'];

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const trailPos = useRef({ x: -100, y: -100 });
  const [sparkles, setSparkles] = useState([]);
  const sparkleId = useRef(0);
  const lastSparkle = useRef(0);

  useEffect(() => {
    const moveCursor = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX - 6}px`;
        cursorRef.current.style.top = `${e.clientY - 6}px`;
      }

      // Throttle sparkles — slightly higher interval reduces state churn on landing
      const now = Date.now();
      if (now - lastSparkle.current > 400) {
        lastSparkle.current = now;
        const id = sparkleId.current++;
        const char = SPARKLE_CHARS[Math.floor(Math.random() * SPARKLE_CHARS.length)];
        setSparkles(prev => [...prev.slice(-8), {
          id,
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          char,
        }]);
        setTimeout(() => {
          setSparkles(prev => prev.filter(s => s.id !== id));
        }, 800);
      }
    };

    // Smooth trail animation
    let rafId;
    const animateTrail = () => {
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * 0.12;
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * 0.12;
      if (trailRef.current) {
        trailRef.current.style.left = `${trailPos.current.x - 15}px`;
        trailRef.current.style.top = `${trailPos.current.y - 15}px`;
      }
      rafId = requestAnimationFrame(animateTrail);
    };
    rafId = requestAnimationFrame(animateTrail);

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          width: 12,
          height: 12,
          background: '#e63946',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          boxShadow: '0 0 10px #e63946, 0 0 20px rgba(230,57,70,0.5)',
          willChange: 'left, top',
        }}
      />
      {/* Trail ring */}
      <div
        ref={trailRef}
        style={{
          position: 'fixed',
          width: 30,
          height: 30,
          border: '1px solid rgba(230,57,70,0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'left, top',
        }}
      />
      {/* Sparkles */}
      <AnimatePresence>
        {sparkles.map(s => (
          <motion.div
            key={s.id}
            initial={{ opacity: 1, scale: 1, x: s.x, y: s.y }}
            animate={{ opacity: 0, scale: 0.5, y: s.y - 40 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              fontSize: 14,
              pointerEvents: 'none',
              zIndex: 99997,
              transform: `translate(${s.x}px, ${s.y}px)`,
            }}
          >
            {s.char}
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}
