// DiscordChat.jsx - Fake Discord fight chat UI
import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { discordMessages } from '../data/content';

function Avatar({ name, color }) {
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bebas text-sm"
      style={{ background: color + '30', border: `1px solid ${color}60`, color }}
    >
      {name[0].toUpperCase()}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-3 py-2">
      <div className="w-6 h-6 rounded-full bg-chaos-purple/30 flex-shrink-0" />
      <div className="flex items-center gap-1.5">
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
        <span className="font-inter text-xs text-chaos-gray ml-1">her 💀 is typing...</span>
      </div>
    </div>
  );
}

export default function DiscordChat() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [showTyping, setShowTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const chatRef = useRef(null);

  const colorMap = {
    her: '#e63946',
    him: '#5865f2',
    system: '#ffd700',
  };

  useEffect(() => {
    if (inView && !started) {
      setStarted(true);
      let i = 0;
      const showNext = () => {
        if (i >= discordMessages.length) return;
        const msg = discordMessages[i];
        if (msg.type !== 'system') {
          setShowTyping(true);
          setTimeout(() => {
            setShowTyping(false);
            setVisibleMessages(prev => [...prev, msg]);
            i++;
            setTimeout(showNext, 900);
          }, 800);
        } else {
          setVisibleMessages(prev => [...prev, msg]);
          i++;
          setTimeout(showNext, 700);
        }
      };
      setTimeout(showNext, 500);
    }
  }, [inView]);

  // Auto scroll
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [visibleMessages, showTyping]);

  return (
    <section className="py-24 px-4 relative" id="discord">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(88,101,242,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-2xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            {/* Discord logo */}
            <svg viewBox="0 0 127.14 96.36" className="w-8 h-8" fill="#5865f2">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
            </svg>
            <span className="font-mono text-chaos-gray text-sm">chaos-couple / 💬 arguments</span>
          </div>
          <h2 className="font-bebas text-6xl md:text-7xl" style={{ color: '#5865f2' }}>
            FIGHT SIMULATOR
          </h2>
          <p className="font-inter text-chaos-gray mt-2 text-sm">
            reconstructed from memory. accuracy: terrifyingly high.
          </p>
        </motion.div>

        {/* Discord window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="rounded-xl overflow-hidden border border-[#1e1f22]"
          style={{ background: '#313338', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}
        >
          {/* Title bar */}
          <div className="flex items-center px-4 py-3 border-b border-[#1e1f22]" style={{ background: '#2b2d31' }}>
            <div className="flex gap-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-[#e63946]" />
              <div className="w-3 h-3 rounded-full bg-[#ffd700]" />
              <div className="w-3 h-3 rounded-full bg-[#00ba7c]" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#8a8c8f] text-sm">#</span>
              <span className="font-inter font-semibold text-sm text-white">arguments</span>
              <span className="text-[#8a8c8f] text-xs">| chaos-couple server</span>
            </div>
            {/* Status indicators */}
            <div className="ml-auto flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#00ba7c]" />
                <span className="font-inter text-xs text-[#8a8c8f]">2 online</span>
              </div>
            </div>
          </div>

          {/* Server sidebar mini */}
          <div className="flex">
            <div className="w-14 flex flex-col items-center gap-2 py-3" style={{ background: '#1e1f22' }}>
              <div className="w-10 h-10 rounded-[14px] hover:rounded-xl transition-all flex items-center justify-center text-lg cursor-pointer" style={{ background: '#5865f2' }}>
                💀
              </div>
              <div className="w-8 h-0.5 bg-[#2b2d31] rounded-full" />
              {['💬', '🎮', '🔊'].map((icon, i) => (
                <div key={i} className="w-10 h-10 rounded-full hover:rounded-xl transition-all flex items-center justify-center text-base cursor-pointer" style={{ background: '#2b2d31' }}>
                  {icon}
                </div>
              ))}
            </div>

            {/* Chat area */}
            <div className="flex-1 flex flex-col">
              <div
                ref={chatRef}
                className="flex-1 p-4 space-y-1 overflow-y-auto"
                style={{ minHeight: 360, maxHeight: 360, background: '#313338' }}
              >
                <AnimatePresence>
                  {visibleMessages.map((msg, i) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {msg.type === 'system' ? (
                        <div className="text-center my-3">
                          <span
                            className="font-mono text-xs px-3 py-1 rounded-full"
                            style={{ background: '#ffd70020', color: '#ffd700', border: '1px solid #ffd70040' }}
                          >
                            {msg.content}
                          </span>
                          <span className="font-inter text-xs text-[#5d6069] ml-2">{msg.timestamp}</span>
                        </div>
                      ) : (
                        <div className="flex items-start gap-3 py-0.5 px-2 hover:bg-[#2e3035] rounded group">
                          <Avatar name={msg.username} color={colorMap[msg.type]} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2">
                              <span
                                className="font-inter font-semibold text-sm"
                                style={{ color: colorMap[msg.type] }}
                              >
                                {msg.username}
                              </span>
                              <span className="font-inter text-xs text-[#5d6069]">{msg.timestamp}</span>
                            </div>
                            <p className="font-inter text-sm text-[#dbdee1] mt-0.5">{msg.content}</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                  {showTyping && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <TypingIndicator />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Input bar */}
              <div className="p-3" style={{ background: '#313338' }}>
                <div
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg"
                  style={{ background: '#383a40' }}
                >
                  <span className="text-[#8a8c8f] text-xl">+</span>
                  <span className="font-inter text-sm text-[#5d6069] flex-1">
                    Message #arguments
                  </span>
                  <div className="flex gap-2 text-[#8a8c8f]">
                    <span>😀</span>
                    <span>🎁</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-mono text-xs text-chaos-gray mt-4 opacity-50"
        >
          * resolved in 4 minutes through excessive flirting. as always.
        </motion.p>
      </div>
    </section>
  );
}
