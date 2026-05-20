// FakeTweets.jsx - Twitter/X style fake posts
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { tweets } from '../data/content';

function formatNumber(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

function TweetCard({ tweet, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [liked, setLiked] = useState(false);
  const [retweeted, setRetweeted] = useState(false);

  const avatarColors = ['#e63946', '#5865f2', '#1d9bf0', '#ffd700', '#00ba7c', '#ff6b6b'];
  const avatarColor = avatarColors[index % avatarColors.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, rotate: (Math.random() - 0.5) * 3 }}
      animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02, rotate: (index % 2 === 0 ? 1 : -1), y: -4 }}
      className="bg-chaos-dark border border-chaos-border rounded-2xl p-4 cursor-pointer relative overflow-hidden group"
      style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
    >
      {/* Blue glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"
        style={{ boxShadow: 'inset 0 0 30px rgba(29,155,240,0.05)', border: '1px solid rgba(29,155,240,0.2)' }}
      />

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        {/* Avatar placeholder */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bebas text-lg"
          style={{ background: avatarColor + '30', border: `1px solid ${avatarColor}50`, color: avatarColor }}
        >
          {tweet.name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="font-inter font-bold text-sm text-chaos-white">{tweet.name}</span>
            {/* Verified-ish badge */}
            <div className="w-4 h-4 rounded-full flex items-center justify-center"
              style={{ background: '#1d9bf0' }}>
              <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-white">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <span className="font-inter text-xs text-chaos-gray">{tweet.handle} · {tweet.time}</span>
          </div>
        </div>
        {/* X logo */}
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-chaos-white opacity-50 flex-shrink-0">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>

      {/* Tweet text */}
      <p className="font-inter text-sm text-chaos-white leading-relaxed mb-4 pl-13">
        {tweet.text}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-6 pl-13">
        {/* Reply */}
        <button className="flex items-center gap-1.5 text-chaos-gray hover:text-chaos-blue transition-colors group/btn">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01z" />
          </svg>
          <span className="text-xs">{formatNumber(tweet.replies)}</span>
        </button>

        {/* Repost */}
        <button
          onClick={() => setRetweeted(!retweeted)}
          className={`flex items-center gap-1.5 transition-colors group/btn ${retweeted ? 'text-chaos-green' : 'text-chaos-gray hover:text-chaos-green'}`}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" />
          </svg>
          <span className="text-xs">{formatNumber(tweet.reposts + (retweeted ? 1 : 0))}</span>
        </button>

        {/* Like */}
        <button
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-1.5 transition-colors group/btn ${liked ? 'text-chaos-red' : 'text-chaos-gray hover:text-chaos-red'}`}
        >
          <motion.svg
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-current"
            animate={liked ? { scale: [1, 1.4, 1] } : {}}
          >
            <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z" />
          </motion.svg>
          <span className="text-xs">{formatNumber(tweet.likes + (liked ? 1 : 0))}</span>
        </button>

        {/* Bookmark */}
        <button className="flex items-center gap-1.5 text-chaos-gray hover:text-chaos-blue transition-colors ml-auto">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5z" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

export default function FakeTweets() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="py-24 px-4 relative" id="tweets" style={{ background: '#000' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(29,155,240,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-2xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="font-mono text-chaos-gray text-sm">/ chaos_couple feed</span>
          </div>
          <h2 className="font-bebas text-6xl md:text-7xl text-chaos-white">
            TWEET EVIDENCE
          </h2>
          <p className="font-inter text-chaos-gray mt-2 text-sm">
            documented proof of emotional instability
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4">
          {tweets.map((tweet, i) => (
            <TweetCard key={tweet.id} tweet={tweet} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
