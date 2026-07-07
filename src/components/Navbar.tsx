import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { mockNotices } from '../data/mockData';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isYouthOpen, setIsYouthOpen] = useState(false);
  const location = useLocation();

  // Count new notices for badge
  const newNoticesCount = mockNotices.filter(n => n.isNew).length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sidebar and youth dropdown on route change
  useEffect(() => {
    setIsSidebarOpen(false);
    setIsYouthOpen(false);
  }, [location]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isSidebarOpen]);

  // Sidebar menu items — in exact order, no icons, no Notice Board, no Get In Touch
  // Youth is handled separately as a dropdown accordion
  const sidebarLinks = [
    { name: 'Home', path: '/' },
    { name: 'Annual Church Calendar', path: '/calendar' },
    { name: 'BMCU', path: '/bmcu' },
    { name: 'Ruwadzano', path: '/ruwadzano' },
    { name: 'Choir Registration', path: '/choir' },
    { name: 'Uniforms', path: '/uniforms' },
    { name: 'Sections', path: '/sections' },
    { name: 'Temple Progress', path: '/temple-progress' },
    { name: 'Contact', path: '/contact' },
  ];

  const youthSubLinks = [
    { name: 'BCU', path: '/youth/bcu' },
    { name: 'GCU', path: '/youth/gcu' },
    { name: 'BACOC', path: '/youth/bacoc' },
  ];

  // Check if any youth-related route is active
  const isYouthActive = location.pathname.startsWith('/youth');

  return (
    <>
      {/* ─── TOP HEADER ─── */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#2c2514]/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-gradient-to-b from-[#2c2514]/80 to-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">

          {/* LEFT: Hamburger Menu */}
          <button
            id="sidebar-toggle-btn"
            onClick={() => setIsSidebarOpen(true)}
            className="text-white hover:text-[#C8882C] p-2 focus:outline-none transition-colors duration-200 flex items-center gap-2"
            aria-label="Open navigation menu"
          >
            <Menu size={24} />
            <span className="text-sm font-medium tracking-wide hidden sm:inline">Menu</span>
          </button>

          {/* CENTER: Logo & Church Name */}
          <Link to="/" className="flex items-center gap-2 group absolute left-1/2 -translate-x-1/2">
            <img
              src="/images/logo.jpg"
              alt="Bethesda Logo"
              className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-md group-hover:scale-105 transition-transform duration-200"
            />
            <div className="flex flex-col">
              <span className="text-white font-serif font-bold tracking-wide text-lg md:text-xl group-hover:text-[#C8882C] transition-colors duration-200">
                Bethesda
              </span>
              <span className="text-[10px] text-stone-300 font-sans tracking-widest uppercase font-semibold leading-tight">
                Apostolic Church
              </span>
            </div>
          </Link>

          {/* RIGHT: Notice Board + Get In Touch */}
          <div className="flex items-center gap-3">
            {/* Notice Board Button */}
            <Link
              to="/notice-board"
              id="notice-board-btn"
              className="flex items-center gap-1.5 text-white hover:text-[#C8882C] transition-colors duration-200 relative"
              aria-label="Notice Board"
            >
              <Bell size={18} />
              <span className="text-sm font-medium hidden sm:inline">Notice Board</span>
              {newNoticesCount > 0 && (
                <span className="absolute -top-2 -right-2 sm:relative sm:top-auto sm:right-auto sm:ml-0 min-w-[20px] h-5 bg-red-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center px-1 animate-pulse">
                  {newNoticesCount}
                </span>
              )}
            </Link>

            {/* Get In Touch CTA */}
            <Link
              to="/contact"
              id="get-in-touch-btn"
              className="bg-[#1b4965] hover:bg-[#62b6cb] text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-all duration-200 shadow-md hidden sm:block"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </header>

      {/* ─── SIDEBAR OVERLAY + DRAWER ─── */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Dark backdrop overlay */}
            <motion.div
              key="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-[45] bg-black/60"
              aria-hidden="true"
            />

            {/* Slide-in Left Sidebar */}
            <motion.aside
              key="sidebar-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 left-0 z-50 h-full overflow-hidden"
              style={{ width: '320px' }}
              aria-label="Site navigation"
            >
              {/* Sidebar background — blue fade top → gold bottom */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, #1b4965 0%, #2d7a9a 30%, #8ab8cc 50%, #FBF2E7 68%, #EAD8A0 100%)',
                  borderTopRightRadius: '16px',
                  borderBottomRightRadius: '16px',
                  boxShadow: '4px 0 32px rgba(0,0,0,0.30)',
                }}
              />

              {/* Church logo watermark — kept visible at bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-64 bg-no-repeat bg-bottom bg-contain pointer-events-none"
                style={{
                  backgroundImage: "url('/images/logo.jpg')",
                  opacity: 0.12,
                  filter: 'grayscale(60%)',
                  backgroundSize: '200px',
                  backgroundPosition: 'center bottom 16px',
                }}
                aria-hidden="true"
              />

              {/* Sidebar Content */}
              <div className="relative z-10 flex flex-col h-full">

                {/* Sidebar Header — white text on blue background */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/20">
                  <span className="text-white font-serif font-bold text-lg tracking-wide drop-shadow-sm">
                    Menu
                  </span>
                  <button
                    id="sidebar-close-btn"
                    onClick={() => setIsSidebarOpen(false)}
                    className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/20 transition-all duration-200 focus:outline-none"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-1.5 px-4 py-6 flex-grow overflow-y-auto">
                  {/* Home */}
                  {sidebarLinks.slice(0, 1).map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      end
                      className={({ isActive }) =>
                        `block px-5 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-[#C8882C] text-white shadow-md shadow-[#C8882C]/30'
                            : 'text-[#3A2A00] hover:bg-[#F2D88A] hover:text-[#3A2A00]'
                        }`
                      }
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      {link.name}
                    </NavLink>
                  ))}

                  {/* Annual Church Calendar */}
                  {sidebarLinks.slice(1, 2).map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={({ isActive }) =>
                        `block px-5 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-[#C8882C] text-white shadow-md shadow-[#C8882C]/30'
                            : 'text-[#3A2A00] hover:bg-[#F2D88A] hover:text-[#3A2A00]'
                        }`
                      }
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      {link.name}
                    </NavLink>
                  ))}

                  {/* ── Youth Dropdown Accordion ── */}
                  <div>
                    <button
                      id="youth-dropdown-btn"
                      onClick={() => setIsYouthOpen((prev) => !prev)}
                      className={`w-full flex items-center justify-between px-5 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
                        isYouthActive
                          ? 'bg-[#C8882C] text-white shadow-md shadow-[#C8882C]/30'
                          : 'text-[#3A2A00] hover:bg-[#F2D88A] hover:text-[#3A2A00]'
                      }`}
                      aria-expanded={isYouthOpen}
                      aria-haspopup="true"
                    >
                      <span>Youth</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-250 ${
                          isYouthOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isYouthOpen && (
                        <motion.div
                          key="youth-submenu"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="mt-1 ml-4 flex flex-col gap-1">
                            {youthSubLinks.map((sub) => (
                              <NavLink
                                key={sub.path}
                                to={sub.path}
                                className={({ isActive }) =>
                                  `block px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 border-l-2 ${
                                    isActive
                                      ? 'bg-[#C8882C]/80 text-white border-[#C8882C] shadow-sm'
                                      : 'text-[#3A2A00]/80 hover:bg-[#F2D88A] hover:text-[#3A2A00] border-[#C8882C]/40'
                                  }`
                                }
                                onClick={() => setIsSidebarOpen(false)}
                              >
                                {sub.name}
                              </NavLink>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Remaining links */}
                  {sidebarLinks.slice(2).map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={({ isActive }) =>
                        `block px-5 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-[#C8882C] text-white shadow-md shadow-[#C8882C]/30'
                            : 'text-[#3A2A00] hover:bg-[#F2D88A] hover:text-[#3A2A00]'
                        }`
                      }
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </nav>

                {/* Sidebar Footer */}
                <div className="px-4 pb-6 pt-2 border-t border-[#C8882C]/20">
                  <p className="text-[11px] text-[#3A2A00]/50 text-center">
                    © {new Date().getFullYear()} Bethesda Apostolic Church
                  </p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
