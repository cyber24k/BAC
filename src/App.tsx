import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { CalendarPage } from './pages/Calendar';
import { ChoirPage } from './pages/Choir';
import { TempleProgressPage } from './pages/TempleProgress';
import { SectionsPage } from './pages/Sections';
import { UniformsPage } from './pages/Uniforms';
import { NoticeBoardPage } from './pages/NoticeBoard';
import { ContactPage } from './pages/Contact';
import { YouthPage } from './pages/Youth';

// Reusable animated page wrapper that forces page scroll-to-top on route changes
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="flex-grow flex flex-col"
    >
      {children}
    </motion.div>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 text-stone-900">
      {/* Sticky Top Navigation */}
      <Navbar />

      {/* Main Pages with Cross-fade transition */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/calendar" element={<PageWrapper><CalendarPage /></PageWrapper>} />
            <Route path="/choir" element={<PageWrapper><ChoirPage /></PageWrapper>} />
            <Route path="/temple-progress" element={<PageWrapper><TempleProgressPage /></PageWrapper>} />
            <Route path="/sections" element={<PageWrapper><SectionsPage /></PageWrapper>} />
            <Route path="/uniforms" element={<PageWrapper><UniformsPage /></PageWrapper>} />
            <Route path="/notice-board" element={<PageWrapper><NoticeBoardPage /></PageWrapper>} />
            <Route path="/youth" element={<PageWrapper><YouthPage /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><Home /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
