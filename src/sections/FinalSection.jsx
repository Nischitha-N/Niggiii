// FinalSection.jsx - Emotional contrast finale
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

function Star({ style }) {
  return (
    <motion.div
      className="absolute text-white/20 select-none"
      style={style}
      animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 2 }}
    >
      ✦
    </motion.div>
  );
}

const STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  fontSize: `${Math.random() * 12 + 6}px`,
}));

export default function FinalSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [easterEggClicked, setEasterEggClicked] = useState(false);
  const [heartClicked, setHeartClicked] = useState(false);

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-24 px-4"
      id="finale"
      style={{ background: '#050505' }}
    >
      {STARS.map(s => (
        <Star key={s.id} style={{ left: s.left, top: s.top, fontSize: s.fontSize }} />
      ))}

      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 60%, rgba(230,57,70,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-xl mx-auto text-center relative z-10" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 1 }}
          className="font-mono text-chaos-gray text-sm mb-8 tracking-widest"
        >
          — — —
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 1 }}
          className="font-inter font-light text-3xl md:text-5xl text-chaos-white mb-12"
          style={{ letterSpacing: '-0.02em' }}
        >
          Jokes aside…
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 1 }}
          className="space-y-5 mb-16"
        >
          <p className="font-inter text-base text-chaos-gray leading-relaxed" style={{ color: '#a0a0a0' }}>
            You're the most genuinely sweetest person I've ever met,
            and somehow that became my favourite thing about you.
          </p>

          <p className="font-inter text-base text-chaos-gray leading-relaxed" style={{ color: '#a0a0a0' }}>
            I don't know how we went from sending memes and reels to
            actually meaning something to each other, but I'm not
            questioning it. I tried to question it once. You sent me
            a reel about overthinking. You were right.
          </p>

          <p className="font-inter text-base leading-relaxed" style={{ color: '#c8c8c8' }}>
            You make everything fun and more ridiculous and somehow
            exactly what I needed. I didn't plan for this(maybe hoped for). You didn't
            either. That's the part I love the most.
          </p>

          <motion.p
            className="font-mono text-sm cursor-pointer select-none"
            style={{
              color: easterEggClicked ? '#e63946' : '#2a2a2a',
              letterSpacing: easterEggClicked ? '0' : '0.3em',
              transition: 'color 0.3s, letter-spacing 0.3s',
            }}
            onClick={() => setEasterEggClicked(true)}
            whileHover={{ color: easterEggClicked ? '#e63946' : '#444' }}
            title="👀"
          >
            {easterEggClicked
              ? 'i cant wait for you to go down on me 😩'
              : '· · · · · · ·  [classified]  · · · · · · ·'}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 2, duration: 0.8, type: 'spring', stiffness: 100 }}
        >
          <motion.p
            className="font-bebas text-5xl md:text-7xl text-chaos-white mb-4"
            style={{ letterSpacing: '0.02em' }}
          >
            happy one month niggiiiii
          </motion.p>

          {/* Clickable heart */}
          <motion.button
            className="block mx-auto mt-2"
            onClick={() => setHeartClicked(!heartClicked)}
            whileHover={{ scale: 1.2, color: '#e63946' }}
            whileTap={{ scale: 0.9 }}
            animate={heartClicked ? { scale: [1, 1.5, 0.9, 1.2, 1] } : {}}
            transition={{ duration: 0.4 }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '3rem',
              lineHeight: 1,
              color: heartClicked ? '#e63946' : '#888',
            }}
          >
            ♥
          </motion.button>

          <AnimatePresence>
            {heartClicked && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-mono text-xs text-chaos-gray mt-4"
              >
                (that was sincere and i will deny it)
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 2.8 }}
          className="mt-16"
        >
          <p className="font-mono text-xs text-chaos-border">
            made by nissyyy with lotss of luv ❤️
          </p>
          <p className="font-mono text-xs text-chaos-border mt-1">
            © one month of chaos · all evidence archived
          </p>
        </motion.div>
      </div>
    </section>
  );
}