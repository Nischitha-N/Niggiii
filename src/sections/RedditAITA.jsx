// RedditAITA.jsx - Fake Reddit AITA post
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { redditComments } from '../data/content';

function VoteButton({ count, direction }) {
  const [voted, setVoted] = useState(false);
  const isUp = direction === 'up';

  return (
    <div className="flex flex-col items-center gap-0.5">
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={() => setVoted(!voted)}
        className={`p-1 rounded transition-colors ${voted && isUp ? 'text-[#ff4500]' : voted && !isUp ? 'text-[#7193ff]' : 'text-[#818384] hover:text-white'}`}
      >
        {isUp ? (
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M12 4l8 8h-5v8H9v-8H4l8-8z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M12 20l-8-8h5V4h6v8h5l-8 8z" />
          </svg>
        )}
      </motion.button>
      <span className={`font-mono text-xs font-bold ${voted && isUp ? 'text-[#ff4500]' : 'text-[#818384]'}`}>
        {voted && isUp ? count + 1 : count}
      </span>
    </div>
  );
}

function Comment({ comment, depth = 0, index }) {
  const [showReplies, setShowReplies] = useState(false);
  const [upvotes, setUpvotes] = useState(comment.upvotes);
  const [voted, setVoted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: depth > 0 ? 10 : 0, y: depth === 0 ? 20 : 0 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`${depth > 0 ? 'ml-6 border-l-2 border-[#343536] pl-4' : ''}`}
    >
      <div className="py-3">
        {/* User row */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-[#272729] flex items-center justify-center text-sm">
            {comment.avatar || comment.username[2]}
          </div>
          <span className="font-inter font-bold text-xs" style={{ color: '#ff4500' }}>{comment.username}</span>
          <span className="font-mono text-xs text-[#818384]">•</span>
          <span className="font-inter text-xs text-[#818384]">{Math.floor(Math.random() * 12 + 1)}h ago</span>
        </div>

        {/* Comment text */}
        <p className="font-inter text-sm text-[#d7dadc] leading-relaxed mb-2">
          {comment.text}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={() => { setVoted(!voted); setUpvotes(v => voted ? v - 1 : v + 1); }}
              className={`p-1 rounded-full ${voted ? 'text-[#ff4500]' : 'text-[#818384] hover:text-white'}`}
            >
              ▲
            </motion.button>
            <span className="font-mono text-xs text-[#818384] font-bold">
              {upvotes.toLocaleString()}
            </span>
            <button className="p-1 rounded-full text-[#818384] hover:text-white">▼</button>
          </div>
          {comment.replies?.length > 0 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="font-inter text-xs text-[#818384] hover:text-white transition-colors px-2 py-1 rounded"
            >
              {showReplies ? '▼' : '▶'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
            </button>
          )}
          <button className="font-inter text-xs text-[#818384] hover:text-white px-2 py-1">Reply</button>
          <button className="font-inter text-xs text-[#818384] hover:text-white px-2 py-1">Share</button>
        </div>
      </div>

      {/* Replies */}
      {showReplies && comment.replies?.map((reply, i) => (
        <Comment key={i} comment={reply} depth={depth + 1} index={i} />
      ))}
    </motion.div>
  );
}

export default function RedditAITA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [postUpvotes, setPostUpvotes] = useState(47291);
  const [postVoted, setPostVoted] = useState(false);

  return (
    <section className="py-24 px-4 relative" id="reddit">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(255,69,0,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-3xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          {/* Reddit logo */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#ff4500' }}>
              <svg viewBox="0 0 20 20" className="w-5 h-5 fill-white">
                <path d="M10 0A10 10 0 0 0 0 10a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 10 0zm5.17 11.7c.02.16.02.33 0 .5-.24 2.03-2.41 3.6-5.17 3.6S4.07 14.23 3.83 12.2a1.2 1.2 0 0 1 0-.5C3.6 11.2 3.84 10.7 4.2 10.4a1.3 1.3 0 0 1-.01-.18 1.4 1.4 0 0 1 2.4-.95c.7-.5 1.65-.82 2.7-.85l.5-2.3-.01-.02L7.8 6.7a1 1 0 1 1-.07-.9l2.3-.48a.3.3 0 0 1 .35.23l.55 2.57a4.55 4.55 0 0 1 2.8.85 1.4 1.4 0 0 1 2.41.95c0 .06 0 .12-.01.18.36.3.6.8.54 1.3zM7.5 12a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm3 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm-.5 2.5c.56 0 1-.24 1-.5s-.44-.5-1-.5-1 .24-1 .5.44.5 1 .5z" />
              </svg>
            </div>
            <span className="font-inter text-sm text-[#818384]">r/AmItheAsshole</span>
          </div>
          <h2 className="font-bebas text-5xl md:text-7xl text-chaos-white">
            AITA POST
          </h2>
        </motion.div>

        {/* Reddit post card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-lg overflow-hidden border border-[#343536]"
          style={{ background: '#1a1a1b' }}
        >
          {/* Post header */}
          <div className="flex gap-4 p-4">
            {/* Vote column */}
            <div className="flex flex-col items-center gap-1 min-w-8">
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => { setPostVoted(!postVoted); setPostUpvotes(v => postVoted ? v - 1 : v + 1); }}
                className={`p-1 rounded-sm ${postVoted ? 'text-[#ff4500]' : 'text-[#818384] hover:text-[#ff4500]'} transition-colors`}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M12 4l8 8h-5v8H9v-8H4l8-8z" />
                </svg>
              </motion.button>
              <span className={`font-mono text-xs font-bold ${postVoted ? 'text-[#ff4500]' : 'text-[#d7dadc]'}`}>
                {postUpvotes.toLocaleString()}
              </span>
              <button className="p-1 text-[#818384] hover:text-[#7193ff] transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M12 20l-8-8h5V4h6v8h5l-8 8z" />
                </svg>
              </button>
            </div>

            {/* Post content */}
            <div className="flex-1 min-w-0">
              {/* Subreddit + metadata */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="font-inter text-xs font-bold text-[#d7dadc]">r/AmItheAsshole</span>
                <span className="font-inter text-xs text-[#818384]">• Posted by u/nissyyy • 14h ago</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: '#ff450020', color: '#ff4500', border: '1px solid #ff450050' }}>
                  🏆 Asshole
                </span>
              </div>

              {/* Post title */}
              <h3 className="font-inter font-bold text-base text-[#d7dadc] mb-3 leading-tight">
                AITA for getting jealous when my boyfriend breathes near another woman?
              </h3>

              {/* Post body */}
              <div className="font-inter text-sm text-[#d7dadc] leading-relaxed space-y-2 mb-4">
                <p>
                  So my boyfriend (him, victim, 20M) and I (her 💀, also 20F) have been together for one month.
                  Before you say anything yes I know. One month. But it feels more like a year ok. 
                </p>
                <p>
                  Today he was in class and his ex-friend (20F) was sitting next to him during an examination.
                  Why were sitting wiht her, don't u have a Girlfriend Mr.?  His <b> "friend" </b> why was she laughinggggggg? 😤
                </p>
                <p>
                  I texted "why were sitting next to her" and he sent me crying emojis and said she sat next him.
                  He says he is sorry and am being jealous. But I'm protective I don't want no bitch near my <em>MAN</em>. It is not the same thing.
                </p>
                <p>
                  Anyway AITA? (if you say yes. you are wrong.)
                </p>
              </div>

              {/* Post actions */}
              <div className="flex items-center gap-4 text-[#818384]">
                <button className="flex items-center gap-1 hover:text-white text-xs font-bold transition-colors">
                  💬 {redditComments.length * 12} Comments
                </button>
                <button className="flex items-center gap-1 hover:text-white text-xs font-bold transition-colors">
                  🔗 Share
                </button>
                <button className="flex items-center gap-1 hover:text-white text-xs font-bold transition-colors">
                  🔖 Save
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#343536] mx-4" />

          {/* Comments */}
          <div className="p-4 space-y-2 divide-y divide-[#343536]">
            {redditComments.map((comment, i) => (
              <Comment key={comment.id} comment={comment} depth={0} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
