// Timeline.jsx - "How We Got Cooked" vertical timeline
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { timelineStages } from '../data/content';

function TimelineCard({ stage, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`flex items-center gap-4 md:gap-8 w-full ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Card */}
      <motion.div
        whileHover={{ scale: 1.02, rotate: isEven ? 1 : -1 }}
        className="flex-1 max-w-md bg-chaos-card border border-chaos-border rounded-xl p-5 relative group"
        style={{ boxShadow: `0 0 30px ${stage.color}15` }}
      >
        {/* Glow bar top */}
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: stage.color }} />

        {/* Phase badge */}
        <div
          className="inline-block px-2 py-0.5 rounded text-xs font-mono mb-2"
          style={{ background: `${stage.color}20`, color: stage.color, border: `1px solid ${stage.color}40` }}
        >
          {stage.phase}
        </div>

        {/* Notification */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 + index * 0.1 }}
          className="absolute top-4 right-4 text-xs font-mono px-2 py-1 rounded bg-chaos-black border border-chaos-border text-chaos-gray"
        >
          {stage.notification}
        </motion.div>

        <h3 className="font-bebas text-3xl mt-1 mb-3" style={{ color: stage.color }}>
          {stage.emoji} {stage.title}
        </h3>

        <ul className="space-y-2">
          {stage.events.map((event, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="flex items-start gap-2 font-inter text-sm text-chaos-gray"
            >
              <span className="text-chaos-red mt-0.5 flex-shrink-0">›</span>
              {event}
            </motion.li>
          ))}
        </ul>

        {/* Easter egg sticker — z-20 so it sits above hover overlay */}
        <motion.div
          className="absolute bottom-4 right-4 text-3xl opacity-30 group-hover:opacity-100 transition-opacity cursor-default z-20"
          whileHover={{ scale: 1.5, rotate: 20 }}
          title="💀 we are so normal"
        >
          {stage.sticker}
        </motion.div>

        {/* Hidden message on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-chaos-black/90 flex items-center justify-center rounded-xl overflow-hidden z-10"
          style={{ backdropFilter: 'blur(4px)' }}
        >
          <p className="font-bebas text-2xl text-chaos-red text-glow-red">
            we were so cooked from day one 💀
          </p>
        </motion.div>
      </motion.div>

      {/* Center dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
        className="flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center font-bebas text-lg z-10"
        style={{
          borderColor: stage.color,
          background: '#0a0a0a',
          color: stage.color,
          boxShadow: `0 0 15px ${stage.color}60`,
        }}
      >
        {index + 1}
      </motion.div>

      {/* Spacer on other side */}
      <div className="flex-1 max-w-md" />
    </motion.div>
  );
}

export default function Timeline() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section className="py-24 px-4 relative overflow-hidden" id="timeline">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-chaos-border to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <p className="font-mono text-chaos-red text-sm mb-2 tracking-widest">CLASSIFIED DOCUMENT</p>
          <h2 className="font-bebas text-6xl md:text-8xl text-chaos-white glitch-text" data-text="HOW WE GOT COOKED">
            HOW WE GOT COOKED
          </h2>
          <p className="font-inter text-chaos-gray mt-3 text-sm">
            a timeline of two idiots becoming one disaster
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-16 relative">
          {timelineStages.map((stage, i) => (
            <TimelineCard key={stage.id} stage={stage} index={i} />
          ))}
        </div>

        {/* Final status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center p-6 bg-chaos-card border border-chaos-red rounded-2xl"
          style={{ boxShadow: '0 0 30px rgba(230,57,70,0.2)' }}
        >
          <p className="font-mono text-chaos-gray text-sm mb-2">CASE STATUS:</p>
          <p className="font-bebas text-4xl text-chaos-red text-glow-red">BOTH COOKED. NO SURVIVORS.</p>
        </motion.div>
      </div>
    </section>
  );
}
