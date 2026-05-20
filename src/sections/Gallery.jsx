// Gallery.jsx - Our cute pics placeholder gallery
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import earringsImg from "../assests/gallery/earrings.jpeg";
import jhumkaImg from "../assests/gallery/jhumka.jpeg";

import pic1 from "../assests/gallery/pic1.jpeg";
import pic2 from "../assests/gallery/pic2.jpeg";
import pic3 from "../assests/gallery/pic3.jpeg";
import pic4 from "../assests/gallery/pic4.jpeg";
import pic5 from "../assests/gallery/pic5.jpeg";
import pic6 from "../assests/gallery/pic6.jpeg";
import pic7 from "../assests/gallery/pic7.jpeg";
import pic8 from "../assests/gallery/pic8.jpeg";
import pic9 from "../assests/gallery/pic9.jpeg";

const galleryImages = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9];

const PLACEHOLDER_COUNT = galleryImages.length;

const placeholderCaptions = [
  "exhibit a: the beginning of the problem",
  "conclusive evidence of good vibes",
  "classified moment #3",
  "zero chill, documented",
  "this was your fault",
  "this was also your fault",
  "analyst confirms: very cute",
  "do not delete",
  "case closed ♥",
];

function ImageCard({ index, src, caption, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      whileHover={{ scale: 1.04, y: -4 }}
      onClick={() => onClick(index)}
      className="cursor-pointer rounded-xl overflow-hidden"
      style={{
        background: '#1a1a1a',
        border: '1px solid #2a2a2a',
        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
        aspectRatio: index % 3 === 1 ? '3/4' : '4/3',
      }}
    >
      <div className="w-full h-full relative" style={{ minHeight: 160 }}>
        <img
          src={src}
          alt={caption}
          className="w-full h-full object-cover"
          style={{ display: 'block' }}
        />
        <div
          className="absolute inset-0 flex items-end opacity-0 hover:opacity-100 transition-opacity duration-200"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }}
        >
          <p className="font-mono text-xs px-3 pb-3 text-white/70">{caption}</p>
        </div>
      </div>
    </motion.div>
  );
}

function PlaceholderCard({ index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      whileHover={{ scale: 1.04, y: -4 }}
      onClick={() => onClick(index)}
      className="cursor-pointer rounded-xl overflow-hidden"
      style={{
        background: '#1a1a1a',
        border: '1px solid #2a2a2a',
        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
        aspectRatio: index % 3 === 1 ? '3/4' : '4/3',
      }}
    >
      {/* Photo placeholder */}
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-3 relative"
        style={{ minHeight: 160 }}
      >
        {/* Film grain overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        <span className="text-4xl opacity-30">📷</span>
        <p className="font-mono text-xs text-center px-4 leading-relaxed" style={{ color: '#3a3a3a' }}>
          {placeholderCaptions[index]}
        </p>
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(to right, transparent, #e6394620, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <section className="py-24 px-4 relative overflow-hidden" id="gallery">
      <div className="absolute inset-0" style={{ background: '#080808' }} />

      {/* Subtle red glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(230,57,70,0.04) 0%, transparent 60%)' }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block border px-4 py-1 rounded mb-4" style={{ borderColor: '#e63946' }}>
            <span className="font-mono text-xs tracking-widest" style={{ color: '#e63946' }}>
              📸 EVIDENCE ARCHIVE
            </span>
          </div>
          <h2 className="font-bebas text-6xl md:text-8xl text-chaos-white">THE GALLERY</h2>
          <p className="font-mono text-sm mt-2" style={{ color: '#555' }}>
            classified moments — access level: you only
          </p>
        </motion.div>


        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {galleryImages.map((src, i) => (
            <ImageCard key={i} index={i} src={src} caption={placeholderCaptions[i]} onClick={setLightboxIndex} />
          ))}
        </div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-mono text-xs mt-8 opacity-30"
          style={{ color: '#666' }}
        >
          * click any photo to enlarge
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-8"
            style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(8px)' }}
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="rounded-2xl overflow-hidden max-w-lg w-full"
              style={{ background: '#111', border: '1px solid #2a2a2a' }}
              onClick={e => e.stopPropagation()}
            >
              <div
                className="w-full overflow-hidden"
                style={{ maxHeight: 400 }}
              >
                <img
                  src={galleryImages[lightboxIndex]}
                  alt={placeholderCaptions[lightboxIndex]}
                  className="w-full object-contain"
                  style={{ maxHeight: 400, display: 'block' }}
                />
              </div>
              <div className="px-6 py-4 text-center">
                <p className="font-mono text-xs" style={{ color: '#888' }}>
                  {placeholderCaptions[lightboxIndex]}
                </p>
                <p className="font-mono text-xs mt-2" style={{ color: '#333' }}>
                  tap outside to close
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
