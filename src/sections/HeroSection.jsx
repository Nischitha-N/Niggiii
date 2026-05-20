// HeroSection.jsx - First view after loading
import { motion } from 'framer-motion';

const floatingEmojis = ['💀', '🙄', '❤️', '📱', '🎯', '🔍', '😤', '💘'];

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Floating background emojis */}
      {floatingEmojis.map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl opacity-10 select-none pointer-events-none"
          style={{
            left: `${(i / floatingEmojis.length) * 100}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.05, 0.12, 0.05],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(230,57,70,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(230,57,70,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Red glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(230,57,70,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <div className="text-center relative z-10 max-w-4xl">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 border border-chaos-red rounded-full px-4 py-1.5 mb-6"
          style={{ background: 'rgba(230,57,70,0.1)' }}
        >
          <div className="w-2 h-2 rounded-full bg-chaos-red animate-pulse" />
          <span className="font-mono text-xs text-chaos-red">CASE FILE OPEN · EVIDENCE COLLECTING</span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-bebas text-7xl sm:text-9xl md:text-[10rem] leading-none mb-4 glitch-text"
          data-text="ONE MONTH"
        >
          ONE MONTH
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="font-bebas text-3xl sm:text-5xl text-chaos-gray mb-6"
        >
          OF COMPLETE AND TOTAL CHAOS
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="font-inter text-chaos-gray text-sm md:text-base max-w-lg mx-auto leading-relaxed mb-10"
        >
          An interactive archive documenting two internet addicts falling in love
          while roasting each other constantly.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {[
            { label: 'Reels Sent', value: '847' },
            { label: 'Fake Arguments', value: '∞' },
            { label: 'Days Cooked', value: '30' },
            { label: 'Survivors', value: '0' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="font-bebas text-3xl text-chaos-red">{stat.value}</p>
              <p className="font-mono text-xs text-chaos-gray">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-2"
        >
          <p className="font-mono text-xs text-chaos-border">scroll for evidence</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-chaos-red"
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
