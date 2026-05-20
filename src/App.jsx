// App.jsx - Root component, orchestrates all sections
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import CustomCursor from './components/CustomCursor';
import RandomPopups from './components/RandomPopups';
import NavBar from './components/NavBar';

import LandingPage from './sections/LandingPage';
import HeroSection from './sections/HeroSection';
import Timeline from './sections/Timeline';
import SpotifyWrapped from './sections/SpotifyWrapped';
import FakeTweets from './sections/FakeTweets';
import FBIBoard from './sections/FBIBoard';
import DiscordChat from './sections/DiscordChat';
import RedditAITA from './sections/RedditAITA';
import FinalSection from './sections/FinalSection';
import Gallery from './sections/Gallery';

export default function App() {
  const [entered, setEntered] = useState(false);
  const [popupsActive, setPopupsActive] = useState(false);

  const handleEnter = useCallback(() => {
    setEntered(true);
    setPopupsActive(true);
    // Popups only active during hero intro — auto-kill after 12s
    setTimeout(() => setPopupsActive(false), 12000);
  }, []);

  return (
    <div className="relative min-h-screen bg-chaos-black overflow-x-hidden">
      {/* Global cursor */}
      <CustomCursor />

      {/* Landing / Google page */}
      <LandingPage onEnter={handleEnter} />

      {/* Main site - shown after entering */}
      <AnimatePresence>
        {entered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <NavBar />
            <RandomPopups active={popupsActive} />

            <main>
              <HeroSection />

              {/* Section divider */}
              <SectionDivider label="TIMELINE" color="#5865f2" />
              <Timeline />

              <SectionDivider label="SPOTIFY WRAPPED" color="#1db954" />
              <SpotifyWrapped />

              <SectionDivider label="TWEET EVIDENCE" color="#1d9bf0" />
              <FakeTweets />

              <SectionDivider label="FBI BOARD" color="#e63946" />
              <FBIBoard />

              <SectionDivider label="DISCORD ARCHIVES" color="#5865f2" />
              <DiscordChat />

              <SectionDivider label="AITA" color="#ff4500" />
              <RedditAITA />

              <SectionDivider label="GALLERY" color="#e63946" />
              <Gallery />

              <FinalSection />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Simple section divider component
function SectionDivider({ label, color }) {
  return (
    <div className="flex items-center gap-4 px-8 py-6 opacity-40">
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${color})` }} />
      <span className="font-mono text-xs tracking-widest" style={{ color }}>
        [{label}]
      </span>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${color})` }} />
    </div>
  );
}
