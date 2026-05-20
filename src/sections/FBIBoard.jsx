// FBIBoard.jsx - Conspiracy corkboard with evidence cards
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { fbiEvidence } from '../data/content';

const CARD_W = 155;
const CARD_H = 320;

function EvidenceCard({ item, index, isLast }) {
  const [flipped, setFlipped] = useState(false);

  const hiddenMessages = [
    "he actually does love herr 👀",
    "he literally planned everything. evidence conclusive.",
    "they were nervous. we have witnesses.",
    "1am reel archives: exhibit d confirmed.",
    "she labelled these 'DO NOT EVER DELETE'",
  ];

  return (
    <div
      className="relative cursor-pointer flex-shrink-0"
      style={{
        width: CARD_W,
        height: CARD_H + 12,
        perspective: 800,
      }}
      onClick={() => setFlipped(f => !f)}
    >
      {/* Pushpin */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full z-20 border-2 border-chaos-red"
        style={{ background: '#c41c1c', boxShadow: '0 2px 8px rgba(196,28,28,0.5)' }}
      />

      {/* Framer Motion wrapper — entry + hover scale ONLY, no transform conflict */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05 }}
        transition={{ delay: index * 0.1 }}
        style={{
          position: 'absolute',
          top: 12,
          left: 0,
          width: CARD_W,
          height: CARD_H,
          rotate: item.rotation,
        }}
      >
        {/* Flip container — pure CSS so Framer Motion can't override rotateY */}
        <div
          style={{
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'transform 0.5s ease',
          }}
        >
          {/* FRONT */}
          <div
            className="bg-[#f5f0e8] text-black rounded p-4 pt-5 absolute inset-0 overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              boxShadow: '2px 4px 12px rgba(0,0,0,0.4)',
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-3 opacity-60" style={{ background: 'rgba(255,255,150,0.6)' }} />

            <div className="inline-block px-2 py-0.5 text-xs font-mono font-bold mb-2 rounded" style={{ background: '#e63946', color: 'white' }}>
              {item.label}
            </div>

            <div
              className="w-full h-28 rounded mb-2 overflow-hidden border-2 border-dashed border-gray-300"
              style={{ background: '#e8e0d0' }}
            >
              {item.image ? (
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl">📷</div>
              )}
            </div>

            <p className="font-mono font-bold text-xs text-black leading-tight">{item.title}</p>
            <p className="font-inter text-xs text-gray-600 mt-1 leading-tight">{item.description}</p>

            <div className="mt-2 inline-block px-1.5 py-0.5 text-xs rounded font-bold" style={{ background: '#ffd700', color: '#000' }}>
              {item.tag}
            </div>

            <p className="text-xs text-gray-400 mt-1 italic">click to reveal</p>


          </div>

          {/* BACK */}
          <div
            className="bg-[#f0e8e8] text-black rounded p-5 absolute inset-0 flex items-center justify-center"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              boxShadow: '2px 4px 12px rgba(0,0,0,0.4)',
            }}
          >
            <p className="font-mono text-xs text-center font-bold leading-relaxed" style={{ color: '#c41c1c' }}>
              🔍 ANALYST NOTE:<br /><br />
              {hiddenMessages[index % hiddenMessages.length]}
            </p>
          </div>
        </div>{/* end flip container */}
      </motion.div>
    </div>
  );
}

function RedStrings() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
      <motion.line x1="15%" y1="30%" x2="35%" y2="40%" stroke="#e63946" strokeWidth="1.5" strokeOpacity="0.6"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 1 }} />
      <motion.line x1="35%" y1="40%" x2="55%" y2="25%" stroke="#e63946" strokeWidth="1.5" strokeOpacity="0.6"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.7, duration: 1 }} />
      <motion.line x1="55%" y1="25%" x2="75%" y2="45%" stroke="#e63946" strokeWidth="1.5" strokeOpacity="0.6"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.9, duration: 1 }} />
      <motion.line x1="75%" y1="45%" x2="90%" y2="30%" stroke="#e63946" strokeWidth="1.5" strokeOpacity="0.6"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 1.1, duration: 1 }} />
      <motion.line x1="15%" y1="30%" x2="90%" y2="30%" stroke="#e63946" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 1.3, duration: 1.5 }} />
    </svg>
  );
}

export default function FBIBoard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="py-24 px-4 relative overflow-hidden" id="fbi">
      <div className="absolute inset-0" style={{ background: '#0d0d0d' }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <div className="inline-block border border-chaos-red px-4 py-1 rounded mb-4">
            <span className="font-mono text-chaos-red text-xs tracking-widest">🔴 CLASSIFIED — TOP SECRET</span>
          </div>
          <h2 className="font-bebas text-6xl md:text-8xl text-chaos-white">FBI EVIDENCE BOARD</h2>
          <p className="font-mono text-chaos-gray text-sm mt-2">case #001 — emotional attachment, first degree</p>
        </motion.div>

        <div
          className="relative rounded-2xl p-8 pb-12 corkboard"
          style={{ minHeight: 320, border: '4px solid #5c3d2e' }}
        >
          <RedStrings />

          <div className="relative z-10 flex flex-nowrap gap-4 justify-center mt-4 pb-2">
            {fbiEvidence.map((item, i) => (
              <EvidenceCard key={item.id} item={item} index={i} isLast={i === fbiEvidence.length - 1} />
            ))}
          </div>


        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center font-mono text-xs text-chaos-gray mt-6 opacity-50">
          * click evidence cards to reveal classified analyst notes
        </motion.p>
      </div>
    </section>
  );
}