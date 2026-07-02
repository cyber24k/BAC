import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { mockNotices } from '../data/mockData';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Track if notice board has new notices to pulse a badge
  const hasNewNotices = mockNotices.some(notice => notice.isNew);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'maDays Calendar', path: '/calendar' },
    { name: 'Choir Registration', path: '/choir' },
    { name: 'Temple Progress', path: '/temple-progress' },
    { name: 'Sections', path: '/sections' },
    { name: 'Uniforms', path: '/uniforms' },
    { name: 'Notice Board', path: '/notice-board', hasBadge: hasNewNotices },
    { name: 'Youth', path: '/youth' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-church-purple-dark/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-gradient-to-b from-church-purple/80 to-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo & Name */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/images/logo.jpg"
              alt="Bethsaida Logo"
              className="w-10 h-10 rounded-full object-cover border border-white/10 shadow-md group-hover:scale-105 transition-transform duration-200"
            />
            <div className="flex flex-col">
              <span className="text-white font-serif font-bold tracking-wide text-lg md:text-xl group-hover:text-church-gold transition-colors duration-200">
                Bethsaida
              </span>
              <span className="text-[10px] text-stone-300 font-sans tracking-widest uppercase font-semibold leading-tight">
                Apostolic Church
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 relative flex items-center gap-1 ${
                    isActive
                      ? 'text-church-gold font-bold bg-white/10'
                      : 'text-stone-200 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {link.name}
                {link.hasBadge && (
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border border-church-purple" />
                )}
              </NavLink>
            ))}
          </nav>

          {/* Quick Contact CTA button */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="bg-church-gold hover:bg-church-gold-light text-church-purple-dark font-bold text-xs px-5 py-2.5 rounded-full transition-all duration-200 shadow-md hover:shadow-church-gold/20"
            >
              Get In Touch
            </Link>
          </div>

          {/* Mobile Hamburguer Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white hover:text-church-gold p-2 focus:outline-none transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer (Framer Motion Slide in) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-45 bg-black/60 backdrop-blur-xs lg:hidden"
            />

            {/* Slide-in Menu Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-50 h-full w-[280px] bg-church-purple-dark/98 backdrop-blur-md shadow-2xl p-6 flex flex-col justify-between lg:hidden border-l border-white/10"
            >
              <div>
                {/* Header inside drawer */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <img
                      src="/images/logo.jpg"
                      alt="Bethsaida Logo"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-white font-serif font-semibold">Bethsaida Menu</span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-stone-300 hover:text-white p-1 rounded-full bg-white/5"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Nav Links list */}
                <div className="flex flex-col gap-2 mt-6">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-church-gold/15 text-church-gold font-bold border-l-4 border-church-gold'
                            : 'text-stone-300 hover:text-white hover:bg-white/5'
                        }`
                      }
                    >
                      <span>{link.name}</span>
                      {link.hasBadge ? (
                        <span className="px-2 py-0.5 text-[10px] bg-red-500 text-white rounded-full font-bold animate-pulse">
                          New
                        </span>
                      ) : null}
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Drawer footer info */}
              <div className="pt-6 border-t border-white/10 text-center">
                <Link
                  to="/contact"
                  className="block w-full bg-church-gold hover:bg-church-gold-light text-church-purple-dark font-bold py-3 rounded-lg text-sm shadow-md transition-colors duration-200"
                >
                  Join Us This Sunday
                </Link>
                <p className="text-[10px] text-stone-400 mt-4">
                  © 2026 Bethsaida Apostolic Church.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
