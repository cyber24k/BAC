import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Phone, Clock, Users, ChevronDown, ChevronUp, Map, Shield } from 'lucide-react';
import { mockSections } from '../data/mockData';

export const SectionsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('All');
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);

  // Extract all unique provinces
  const provinces = ['All', ...Array.from(new Set(mockSections.map((s) => s.province)))];

  const handleToggleExpand = (id: string) => {
    if (expandedSectionId === id) {
      setExpandedSectionId(null);
    } else {
      setExpandedSectionId(id);
    }
  };

  // Filter sections by search query and province
  const filteredSections = mockSections.filter((section) => {
    const matchesSearch =
      section.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.pastor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesProvince = selectedProvince === 'All' || section.province === selectedProvince;

    return matchesSearch && matchesProvince;
  });

  return (
    <div className="pt-24 pb-20 bg-stone-50 min-h-screen">
      {/* Page Title */}
      <section className="bg-church-purple text-white py-12 mb-10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <span className="text-church-gold font-bold uppercase tracking-widest text-xs border border-church-gold/30 px-3 py-1 rounded-full bg-church-gold/10">
            Assemblies & Branches
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif mt-3 mb-2">
            Church Sections Tracker
          </h1>
          <p className="text-stone-300 font-light max-w-xl mx-auto text-sm md:text-base">
            Find and connect with any of our official Bethsaida Apostolic Church sections across Zimbabwe.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6">
        {/* Search & Filter Bar */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-stone-400" size={18} />
            <input
              type="text"
              placeholder="Search by section name, pastor, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-church-purple/30 text-sm"
            />
          </div>

          {/* Province Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <label htmlFor="province" className="text-xs font-bold text-stone-500 uppercase tracking-wider shrink-0 hidden sm:block">
              Filter Province:
            </label>
            <select
              id="province"
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full md:w-48 p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-church-purple/30 bg-white text-sm"
            >
              {provinces.map((prov) => (
                <option key={prov} value={prov}>
                  {prov}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sections Grid */}
        <AnimatePresence mode="popLayout">
          {filteredSections.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 bg-white rounded-3xl border border-stone-200 shadow-sm"
            >
              <Users className="w-12 h-12 text-stone-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-stone-700 font-serif">No Sections Found</h3>
              <p className="text-stone-500 text-sm mt-1">
                We couldn\'t find any assemblies matching your search parameters.
              </p>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredSections.map((section) => {
                const isExpanded = expandedSectionId === section.id;
                return (
                  <motion.div
                    key={section.id}
                    layout="position"
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                      isExpanded
                        ? 'border-church-purple ring-2 ring-church-purple/10 shadow-lg md:col-span-2 lg:col-span-3'
                        : 'border-stone-200 shadow-sm hover:border-church-gold hover:shadow-md'
                    }`}
                  >
                    <div className="p-6">
                      {/* Top Header info */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="bg-church-purple/5 text-church-purple text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-church-purple/10">
                            {section.province} Province
                          </span>
                          <h3 className="text-xl font-bold font-serif text-church-purple mt-2">
                            {section.name}
                          </h3>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-church-gold/10 text-church-gold flex items-center justify-center shrink-0">
                          <Shield size={20} />
                        </div>
                      </div>

                      {/* Main Details */}
                      <div className="flex flex-col gap-3 text-sm text-stone-600 font-light mt-4">
                        <p className="flex items-center gap-2">
                          <Users size={16} className="text-church-gold shrink-0" />
                          <span>Leader: <strong>{section.pastor}</strong></span>
                        </p>
                        <p className="flex items-start gap-2">
                          <MapPin size={16} className="text-church-gold shrink-0 mt-0.5" />
                          <span>{section.location}</span>
                        </p>
                      </div>

                      {/* Expanded Content Drawer */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden border-t border-stone-100 mt-6 pt-6"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Left side: times */}
                              <div>
                                <h4 className="font-bold text-church-purple text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                  <Clock size={14} className="text-church-gold" /> Meeting Schedules
                                </h4>
                                <ul className="flex flex-col gap-2">
                                  {section.meetingTimes.map((time, i) => (
                                    <li key={i} className="text-xs bg-stone-50 border border-stone-150 p-2.5 rounded-lg text-stone-700 font-medium">
                                      {time}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Right side: contacts & map */}
                              <div className="flex flex-col justify-between">
                                <div>
                                  <h4 className="font-bold text-church-purple text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                    <Phone size={14} className="text-church-gold" /> Communication
                                  </h4>
                                  <a
                                    href={`tel:${section.contact}`}
                                    className="inline-flex items-center gap-2 text-sm bg-church-gold/15 hover:bg-church-gold/25 border border-church-gold/30 text-church-purple-dark font-bold px-4 py-2.5 rounded-lg transition-colors"
                                  >
                                    <Phone size={14} /> Call Leader: {section.contact}
                                  </a>
                                </div>
                                <div className="mt-4 p-4 rounded-xl bg-stone-100 border border-stone-200 text-center text-xs text-stone-500 font-light flex items-center justify-center gap-2">
                                  <Map size={16} className="text-church-purple" />
                                  <span>Directions & coordinates available on request.</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Expand/Collapse Button Footer */}
                    <div className="border-t border-stone-100 px-6 py-4 bg-stone-50/50 flex justify-between items-center text-xs">
                      {section.memberCount && (
                        <span className="text-stone-500 font-medium">
                          Estimated Size: <strong>{section.memberCount} members</strong>
                        </span>
                      )}
                      <button
                        onClick={() => handleToggleExpand(section.id)}
                        className="flex items-center gap-1 font-bold text-church-purple hover:text-church-purple-light transition-colors focus:outline-none"
                      >
                        {isExpanded ? (
                          <>Hide Details <ChevronUp size={14} /></>
                        ) : (
                          <>Show Schedules & Contact <ChevronDown size={14} /></>
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
