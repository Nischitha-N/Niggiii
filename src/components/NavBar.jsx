// NavBar.jsx - Sticky top navigation
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'TIMELINE', href: '#timeline' },
  { label: 'WRAPPED', href: '#spotify' },
  { label: 'TWEETS', href: '#tweets' },
  { label: 'FBI', href: '#fbi' },
  { label: 'DISCORD', href: '#discord' },
  { label: 'REDDIT', href: '#reddit' },
  { label: '❤️', href: '#finale' },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(42,42,42,0.5)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} className="font-bebas text-xl text-chaos-red text-glow-red">
          💀 CASE FILE 001
        </motion.div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map(item => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="font-mono text-xs text-chaos-gray hover:text-chaos-white transition-colors hover:text-glow-red"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-chaos-gray hover:text-chaos-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-chaos-border"
            style={{ background: 'rgba(10,10,10,0.98)' }}
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navItems.map(item => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="font-mono text-sm text-chaos-gray hover:text-chaos-white text-left py-1"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
