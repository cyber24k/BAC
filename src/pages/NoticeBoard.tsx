import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Pin, Calendar, Bell, Filter } from 'lucide-react';
import { AnimatedCard } from '../components/AnimatedCard';
import { mockNotices } from '../data/mockData';

export const NoticeBoardPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'General', 'Urgent', 'Youth', 'Choir', 'Building Fund', 'Women\'s Ministry'];

  // Categories colors mapping
  const categoryColors: Record<string, string> = {
    'General': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/20 dark:text-blue-300 dark:border-blue-900',
    'Urgent': 'bg-red-100 text-red-800 border-red-200 dark:bg-red-950/20 dark:text-red-300 dark:border-red-900',
    'Youth': 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-900',
    'Choir': 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/20 dark:text-purple-300 dark:border-purple-900',
    'Building Fund': 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-300 dark:border-emerald-900',
    'Women\'s Ministry': 'bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-950/20 dark:text-pink-300 dark:border-pink-900',
  };

  // Filter notices based on search query and category
  const filteredNotices = mockNotices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      notice.category === selectedCategory ||
      (selectedCategory === 'Urgent' && notice.category === 'Urgent'); // Support custom urgency checks

    return matchesSearch && matchesCategory;
  });

  // Separate pinned and standard notices
  const pinnedNotices = filteredNotices.filter((n) => n.isPinned);
  const standardNotices = filteredNotices.filter((n) => !n.isPinned);

  return (
    <div className="pt-24 pb-20 bg-stone-50 min-h-screen">
      {/* Page Title */}
      <section className="bg-church-purple text-white py-12 mb-10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <span className="text-church-gold font-bold uppercase tracking-widest text-xs border border-church-gold/30 px-3 py-1 rounded-full bg-church-gold/10">
            Announcements
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif mt-3 mb-2">
            Church Notice Board
          </h1>
          <p className="text-stone-300 font-light max-w-xl mx-auto text-sm md:text-base">
            Stay up to date with official schedules, urgent building updates, and departmental notices.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        {/* Search & Filter bar */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-stone-400" size={18} />
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-church-purple/30 text-sm"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <Filter className="text-stone-400 shrink-0 hidden md:block" size={16} />
            <div className="flex gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 border shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-church-purple border-church-purple text-white shadow-xs'
                      : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notices Feed */}
        <div className="flex flex-col gap-8">
          {/* Pinned Notices Section */}
          {pinnedNotices.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4 flex items-center gap-1">
                <Pin size={12} className="text-red-500 fill-red-500" /> Pinned Announcements
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {pinnedNotices.map((notice) => (
                  <AnimatedCard key={notice.id} direction="left">
                    <div className="bg-white rounded-2xl p-6 md:p-8 border-l-4 border-l-red-500 border border-stone-200 shadow-md animate-notice-pulse relative">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${categoryColors[notice.category]}`}>
                            {notice.category}
                          </span>
                          {notice.isNew && (
                            <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                              New
                            </span>
                          )}
                        </div>
                        <span className="text-stone-400 text-xs flex items-center gap-1">
                          <Calendar size={12} /> Posted: {notice.date}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold font-serif text-church-purple mb-3 flex items-center gap-2">
                        <Pin size={16} className="text-red-500 shrink-0" /> {notice.title}
                      </h3>
                      <p className="text-stone-700 text-sm leading-relaxed font-light">
                        {notice.content}
                      </p>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          )}

          {/* Standard Notices Section */}
          <div>
            <h2 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">
              All Announcements
            </h2>

            <AnimatePresence mode="popLayout">
              {standardNotices.length === 0 && pinnedNotices.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-20 bg-white rounded-3xl border border-stone-200 shadow-sm"
                >
                  <Bell className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-stone-700 font-serif">No Notices Found</h3>
                  <p className="text-stone-500 text-sm mt-1">
                    There are no notice board entries matching your search description.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {standardNotices.map((notice, idx) => (
                    <AnimatedCard key={notice.id} delay={idx * 0.05} direction="up">
                      <div className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-church-gold hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                            <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${categoryColors[notice.category]}`}>
                              {notice.category}
                            </span>
                            <span className="text-stone-400 text-[10px] flex items-center gap-1">
                              <Calendar size={12} /> {notice.date}
                            </span>
                          </div>

                          <h3 className="text-lg font-bold font-serif text-church-purple mb-3">
                            {notice.title}
                          </h3>
                          <p className="text-stone-600 text-xs md:text-sm leading-relaxed font-light mb-4">
                            {notice.content}
                          </p>
                        </div>

                        {notice.isNew && (
                          <div className="border-t border-stone-100 pt-3 mt-4 flex justify-between items-center">
                            <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
                              Recent Upload
                            </span>
                          </div>
                        )}
                      </div>
                    </AnimatedCard>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
