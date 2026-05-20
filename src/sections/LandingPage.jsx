// LandingPage.jsx - Fake Google search page with glitch transition
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { autocompleteOptions, loadingMessages } from '../data/content';

export default function LandingPage({ onEnter }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [phase, setPhase] = useState('google'); // 'google' | 'loading' | 'done'
  const [loadingStep, setLoadingStep] = useState(0);
  const [glitching, setGlitching] = useState(false);

  const defaultQuery = 'How to stop falling for your best friend';

  const filteredSuggestions = autocompleteOptions.filter(opt =>
    opt.toLowerCase().includes((query || defaultQuery).toLowerCase().slice(0, 5))
  );

  const handleSubmit = () => {
    if (phase !== 'google') return;
    setGlitching(true);
    setTimeout(() => {
      setPhase('loading');
      setGlitching(false);
      runLoadingSequence();
    }, 600);
  };

  const runLoadingSequence = () => {
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setLoadingStep(step);
      if (step >= loadingMessages.length) {
        clearInterval(interval);
        setTimeout(() => {
          setPhase('done');
          onEnter();
        }, 800);
      }
    }, 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  useEffect(() => {
    if (focused || query) setShowSuggestions(true);
    else setShowSuggestions(false);
  }, [focused, query]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-chaos-black ${glitching ? 'animate-glitch' : ''}`}
          style={{ background: '#0a0a0a' }}
        >
          {/* Scanline effect */}
          <div className="scanline-effect absolute inset-0 pointer-events-none" />

          {phase === 'google' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-2xl px-4 flex flex-col items-center gap-8"
            >
              {/* Fake Google Logo */}
              <div className="text-center">
                <h1 className="font-bebas text-7xl md:text-9xl tracking-wider">
                  <span style={{ color: '#4285F4' }}>G</span>
                  <span style={{ color: '#EA4335' }}>o</span>
                  <span style={{ color: '#FBBC05' }}>o</span>
                  <span style={{ color: '#4285F4' }}>g</span>
                  <span style={{ color: '#34A853' }}>l</span>
                  <span style={{ color: '#EA4335' }}>e</span>
                </h1>
                <p className="font-mono text-xs text-chaos-gray mt-1 opacity-60">
                  (not affiliated, obviously)
                </p>
              </div>

              {/* Search bar */}
              <div className="w-full relative">
                <div
                  className={`w-full flex items-center bg-[#1a1a1a] border rounded-full px-5 py-3 gap-3 transition-all duration-300 ${
                    focused
                      ? 'border-chaos-blue shadow-lg'
                      : 'border-chaos-border'
                  }`}
                  style={focused ? { boxShadow: '0 0 0 1px #1d9bf0, 0 0 20px rgba(29,155,240,0.2)' } : {}}
                >
                  <svg className="w-5 h-5 text-chaos-gray flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    className="flex-1 bg-transparent outline-none text-chaos-white font-inter text-base placeholder-chaos-gray"
                    placeholder={defaultQuery}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setTimeout(() => setFocused(false), 150)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                  />
                  {query && (
                    <button onClick={() => setQuery('')} className="text-chaos-gray hover:text-chaos-white">✕</button>
                  )}
                </div>

                {/* Autocomplete dropdown */}
                <AnimatePresence>
                  {showSuggestions && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="absolute top-full left-0 right-0 mt-1 bg-[#1a1a1a] border border-chaos-border rounded-2xl overflow-hidden z-10"
                    >
                      {autocompleteOptions.map((opt) => (
                        <div
                          key={opt}
                          className="flex items-center gap-3 px-5 py-3 hover:bg-chaos-card cursor-pointer group"
                          onClick={() => { setQuery(opt); handleSubmit(); }}
                        >
                          <svg className="w-4 h-4 text-chaos-gray flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          <span className="font-inter text-sm text-chaos-gray group-hover:text-chaos-white transition-colors">
                            {opt}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="bg-[#1a1a1a] hover:bg-[#222] border border-chaos-border text-chaos-white font-inter text-sm px-5 py-2 rounded-md transition-all hover:border-chaos-red"
                >
                  Google Search
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-[#1a1a1a] hover:bg-[#222] border border-chaos-border text-chaos-white font-inter text-sm px-5 py-2 rounded-md transition-all hover:border-chaos-blue"
                >
                  I'm Feeling Cooked
                </button>
              </div>

              {/* Hint */}
              <motion.p
                className="text-chaos-gray font-mono text-xs opacity-50"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                press enter to proceed (if you dare)
              </motion.p>
            </motion.div>
          )}

          {phase === 'loading' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-6 px-4"
            >
              {/* Scanning animation */}
              <div className="relative w-48 h-48 flex items-center justify-center">
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-chaos-red opacity-30"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-4 rounded-full border border-chaos-red opacity-50"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
                <div className="text-6xl">💀</div>
              </div>

              {/* Loading messages */}
              <div className="text-center space-y-2">
                {loadingMessages.slice(0, loadingStep + 1).map((msg, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`font-mono text-sm ${i === loadingStep ? 'text-chaos-red' : 'text-chaos-gray opacity-50'}`}
                  >
                    {i < loadingStep ? '✓ ' : '> '}{msg}
                  </motion.p>
                ))}
              </div>

              {/* Progress bar */}
              <div className="w-64 h-1 bg-chaos-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-chaos-red"
                  animate={{ width: `${(loadingStep / loadingMessages.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
