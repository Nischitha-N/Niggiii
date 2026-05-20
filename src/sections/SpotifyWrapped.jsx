// SpotifyWrapped.jsx - Fake Spotify Wrapped UI
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { spotifyData } from '../data/content';

function EqBars() {
  return (
    <div className="flex items-end gap-1 h-8">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="eq-bar" style={{ animationDelay: `${i * 0.1}s` }} />
      ))}
    </div>
  );
}

function StatCard({ label, value, sub, color, delay, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotate: (index % 2 === 0 ? -2 : 2) }}
      animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.04, rotate: (index % 2 === 0 ? 1 : -1) }}
      className="bg-[#121212] rounded-xl p-5 border border-[#2a2a2a] relative overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: color || '#1db954' }}
      />
      <p className="font-mono text-xs text-[#b3b3b3] uppercase tracking-widest mb-1">{label}</p>
      <p className="font-bebas text-4xl" style={{ color: color || '#1db954' }}>{value}</p>
      {sub && <p className="font-inter text-xs text-[#6a6a6a] mt-1">{sub}</p>}
    </motion.div>
  );
}

export default function SpotifyWrapped() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [hoveredEmotion, setHoveredEmotion] = useState(null);

  return (
    <section className="py-24 px-4 relative" id="spotify" style={{ background: '#000' }}>
      {/* Spotify-style gradient bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(29,185,84,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            {/* Fake Spotify logo */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: '#1db954' }}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </div>
            <span className="font-inter text-sm text-[#b3b3b3]">Spotify</span>
          </div>
          <h2 className="font-bebas text-6xl md:text-8xl" style={{ color: '#1db954' }}>
            RELATIONSHIP WRAPPED
          </h2>
          <p className="font-inter text-[#b3b3b3] mt-2 text-sm">
            you had quite a year. or month. same thing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatCard label="Most Repeated Phrase" value='"go talk to her only then 🙄"' color="#e63946" delay={0.1} index={0} />
          <StatCard label="Total Emotional Damage" value={spotifyData.totalListeningTime} color="#5865f2" delay={0.2} index={1} />
          <StatCard label="Achievement Unlocked" value={spotifyData.achievement} color="#ffd700" delay={0.3} index={2} />
          <StatCard label="Top Artist" value={spotifyData.topArtist} sub="listened 847 times" color="#1db954" delay={0.4} index={3} />
          <StatCard label="Total Reels Sent" value="847" sub="all at 2am 'no reason'" color="#1d9bf0" delay={0.5} index={4} />
          <StatCard label="Arguments Had" value="∞" sub="resolved through flirting" color="#e63946" delay={0.6} index={5} />
        </div>

        {/* Top Emotions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#121212] rounded-2xl p-6 mb-6 border border-[#2a2a2a]"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="font-mono text-xs text-[#b3b3b3] uppercase tracking-widest">Top Emotions</p>
              <p className="font-bebas text-2xl text-white">Your Year in Feelings</p>
            </div>
            <EqBars />
          </div>

          <div className="space-y-4">
            {spotifyData.topEmotions.map((emotion, i) => (
              <motion.div
                key={emotion.name}
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
                onMouseEnter={() => setHoveredEmotion(emotion.name)}
                onMouseLeave={() => setHoveredEmotion(null)}
              >
                <div className="flex justify-between mb-1">
                  <span className="font-inter text-sm text-white">#{i + 1} {emotion.name}</span>
                  <span className="font-mono text-xs" style={{ color: emotion.color }}>{emotion.percentage}%</span>
                </div>
                <div className="h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${emotion.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: emotion.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Top Songs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#121212] rounded-2xl p-6 border border-[#2a2a2a]"
        >
          <p className="font-mono text-xs text-[#b3b3b3] uppercase tracking-widest mb-1">Top Songs</p>
          <p className="font-bebas text-2xl text-white mb-5">Most Played (Emotionally)</p>

          <div className="space-y-3">
            {spotifyData.topSongs.map((song, i) => (
              <motion.div
                key={song.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#1a1a1a] cursor-pointer group"
              >
                <span className="font-mono text-[#6a6a6a] text-sm w-4">{i + 1}</span>
                {/* Placeholder album art */}
                <div
                  className="w-10 h-10 rounded flex-shrink-0 flex items-center justify-center text-lg"
                  style={{ background: ['#e63946', '#5865f2', '#ffd700', '#1db954', '#1d9bf0'][i] + '30' }}
                >
                  🎵
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-inter text-sm text-white truncate">{song.title}</p>
                  <p className="font-inter text-xs text-[#6a6a6a]">{song.artist}</p>
                </div>
                <div className="flex items-center gap-2">
                  <EqBars />
                  <span className="font-mono text-xs text-[#6a6a6a]">{song.plays}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
