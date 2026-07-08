import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, List, Download, MapPin, Clock, ArrowLeft, ArrowRight, Tag } from 'lucide-react';
import { AnimatedCard } from '../components/AnimatedCard';
import { mockEvents } from '../data/mockData';
import type { ChurchEvent } from '../data/mockData';

export const CalendarPage: React.FC = () => {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Start calendar navigation at July 2026 (the current timeframe of mock data)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(6); // 0-indexed, so 6 is July

  const monthsList = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const categories = [
    'All',
    'Sunday Service',
    'Thursday Women\'s Meeting',
    'Friday Youth Fellowship',
    'Night Vigil',
    'Bible Study',
    'Conventions',
  ];

  // Current system date representation for highlighting today
  const todayString = '2026-07-02';

  // Handle Month Navigation
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Filter events based on month, year, and selected category
  const filteredEvents = mockEvents.filter((event) => {
    const eventDate = new Date(event.date);
    const matchesMonth = eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesMonth && matchesCategory;
  });

  // Category classes styling mapping
  const categoryStyles: Record<string, string> = {
    'Sunday Service': 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900',
    'Thursday Women\'s Meeting': 'bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-950/30 dark:text-pink-300 dark:border-pink-900',
    'Friday Youth Fellowship': 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900',
    'Night Vigil': 'bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-900',
    'Bible Study': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-900',
    'Conventions': 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-900',
  };

  // Calculate calendar grid for the selected month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay(); // Sunday: 0, Monday: 1...
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayIndex = getFirstDayOfMonth(currentMonth, currentYear);

  // Generate date list
  const daysArray: (number | null)[] = [];
  // Pad with null for alignment offset of first day
  for (let i = 0; i < firstDayIndex; i++) {
    daysArray.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  // Get events on a specific day number
  const getEventsForDay = (day: number) => {
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = (currentMonth + 1) < 10 ? `0${currentMonth + 1}` : `${currentMonth + 1}`;
    const dateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;

    return mockEvents.filter((event) => event.date === dateStr);
  };

  // Generate downloadable ICS file for adding to calendar
  const handleDownloadICS = (event: ChurchEvent) => {
    const padStr = (num: number) => (num < 10 ? '0' : '') + num;
    
    const eventDate = new Date(event.date);
    const startYear = eventDate.getFullYear();
    const startMonth = padStr(eventDate.getMonth() + 1);
    const startDay = padStr(eventDate.getDate());
    
    // Parse approximate times (e.g. 09:00 AM)
    const timeRegex = /(\d+):(\d+)\s*(AM|PM)/i;
    const startMatch = event.time.split('-')[0].trim().match(timeRegex);
    let hoursStr = '09';
    let minsStr = '00';
    if (startMatch) {
      let hours = parseInt(startMatch[1]);
      const mins = startMatch[2];
      const ampm = startMatch[3].toUpperCase();
      if (ampm === 'PM' && hours < 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;
      hoursStr = padStr(hours);
      minsStr = mins;
    }

    const dstart = `${startYear}${startMonth}${startDay}T${hoursStr}${minsStr}00`;
    const dend = `${startYear}${startMonth}${startDay}T${parseInt(hoursStr) + 3}${minsStr}00`; // Assume 3 hour duration

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Bethesda Apostolic Church//Calendar//EN',
      'BEGIN:VEVENT',
      `UID:${event.id}@Bethesda`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${dstart}`,
      `DTEND:${dend}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
      `LOCATION:${event.location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-24 pb-20 bg-stone-50 min-h-screen">
      {/* Title Header */}
      <section className="bg-church-purple text-white py-12 mb-10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <span className="text-church-gold font-bold uppercase tracking-widest text-xs border border-church-gold/30 px-3 py-1 rounded-full bg-church-gold/10">
            maDays emuSangano
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif mt-3 mb-2">
            Bethesda Events Calendar
          </h1>
          <p className="text-stone-300 font-light max-w-xl mx-auto text-sm md:text-base">
            Keep track of all upcoming assembly services, women\'s fellowship days, youth fellowships, and national conventions.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6">
        {/* Controls: Navigation, Filters, and Toggles */}
        <div className="flex flex-col gap-6 bg-white p-6 rounded-2xl shadow-md border border-stone-200 mb-8">
          {/* Row 1: Month Selector & View Toggle */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Month Switcher */}
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrevMonth}
                className="p-2 border border-stone-200 hover:border-church-gold rounded-full text-stone-600 hover:text-church-purple bg-stone-50 hover:bg-stone-100 transition-colors"
                aria-label="Previous Month"
              >
                <ArrowLeft size={18} />
              </button>
              <h2 className="text-xl md:text-2xl font-bold font-serif text-church-purple w-44 text-center">
                {monthsList[currentMonth]} {currentYear}
              </h2>
              <button
                onClick={handleNextMonth}
                className="p-2 border border-stone-200 hover:border-church-gold rounded-full text-stone-600 hover:text-church-purple bg-stone-50 hover:bg-stone-100 transition-colors"
                aria-label="Next Month"
              >
                <ArrowRight size={18} />
              </button>
            </div>

            {/* View Switcher toggle */}
            <div className="flex items-center bg-stone-100 p-1.5 rounded-full self-start md:self-auto">
              <button
                onClick={() => setViewType('grid')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                  viewType === 'grid'
                    ? 'bg-church-purple text-white shadow-md'
                    : 'text-stone-600 hover:text-church-purple'
                }`}
              >
                <CalendarIcon size={14} /> Grid View
              </button>
              <button
                onClick={() => setViewType('list')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                  viewType === 'list'
                    ? 'bg-church-purple text-white shadow-md'
                    : 'text-stone-600 hover:text-church-purple'
                }`}
              >
                <List size={14} /> Agenda List
              </button>
            </div>
          </div>

          {/* Row 2: Category Filter Chips */}
          <div className="border-t border-stone-100 pt-4">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-1">
              <Tag size={12} /> Filter by Category:
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border ${
                    selectedCategory === cat
                      ? 'bg-church-gold border-church-gold text-church-purple-dark font-extrabold shadow-sm'
                      : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar View Area */}
        <AnimatePresence mode="wait">
          {viewType === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-lg border border-stone-200 overflow-hidden"
            >
              {/* Day names row */}
              <div className="grid grid-cols-7 bg-church-purple text-white text-center py-4 font-serif font-bold text-xs md:text-sm">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
              </div>

              {/* Day cells grid */}
              <div className="grid grid-cols-7 border-t border-stone-200 bg-stone-100 gap-[1px]">
                {daysArray.map((day, idx) => {
                  if (day === null) {
                    return <div key={`empty-${idx}`} className="bg-stone-50 min-h-[90px] md:min-h-[140px]" />;
                  }

                  const formattedDay = day < 10 ? `0${day}` : `${day}`;
                  const formattedMonth = (currentMonth + 1) < 10 ? `0${currentMonth + 1}` : `${currentMonth + 1}`;
                  const thisDateString = `${currentYear}-${formattedMonth}-${formattedDay}`;
                  const isToday = thisDateString === todayString;
                  const dayEvents = getEventsForDay(day);

                  return (
                    <div
                      key={`day-${day}`}
                      className={`bg-white min-h-[90px] md:min-h-[140px] p-2 relative flex flex-col justify-between group transition-colors duration-200 hover:bg-stone-50/50 ${
                        isToday ? 'ring-2 ring-church-gold ring-inset bg-church-gold/5' : ''
                      }`}
                    >
                      {/* Day Number */}
                      <span
                        className={`text-sm font-bold flex items-center justify-center w-7 h-7 rounded-full ${
                          isToday
                            ? 'bg-church-gold text-church-purple-dark'
                            : 'text-stone-700'
                        }`}
                      >
                        {day}
                      </span>

                      {/* Day Events Indicator */}
                      <div className="mt-2 flex flex-col gap-1 overflow-hidden">
                        {dayEvents.map((evt) => (
                          <div
                            key={evt.id}
                            title={`${evt.title}\n${evt.time}`}
                            className={`text-[10px] md:text-xs font-semibold px-2 py-1 rounded truncate border ${
                              categoryStyles[evt.category] || 'bg-stone-100 text-stone-800'
                            }`}
                          >
                            {evt.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            // List / Agenda View
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              {filteredEvents.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 shadow-sm">
                  <CalendarIcon className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-stone-700 font-serif">No Events Scheduled</h3>
                  <p className="text-stone-500 text-sm mt-1">
                    There are no services fitting these filters scheduled for this month.
                  </p>
                </div>
              ) : (
                filteredEvents.map((event) => (
                  <AnimatedCard key={event.id} direction="up" className="bg-white rounded-2xl shadow-sm border border-stone-200 hover:border-church-gold transition-colors duration-300 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    {/* Left: Date indicator */}
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-church-purple/5 flex flex-col items-center justify-center text-church-purple border border-church-purple/10">
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                          {monthsList[new Date(event.date).getMonth()].substring(0, 3)}
                        </span>
                        <span className="text-2xl font-bold font-serif leading-none mt-1">
                          {new Date(event.date).getDate()}
                        </span>
                      </div>
                      <div>
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${categoryStyles[event.category]}`}>
                          {event.category}
                        </span>
                        <h3 className="text-xl font-bold font-serif text-church-purple mt-1.5">
                          {event.title}
                        </h3>
                      </div>
                    </div>

                    {/* Middle: Details */}
                    <div className="flex-grow max-w-xl text-stone-600 text-sm font-light">
                      <p className="mb-4 leading-relaxed">{event.description}</p>
                      <div className="flex flex-wrap gap-4 text-xs font-semibold">
                        <span className="flex items-center gap-1 text-stone-500">
                          <Clock size={14} className="text-church-gold" /> {event.time}
                        </span>
                        <span className="flex items-center gap-1 text-stone-500">
                          <MapPin size={14} className="text-church-gold" /> {event.location}
                        </span>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="shrink-0 flex self-start md:self-auto">
                      <button
                        onClick={() => handleDownloadICS(event)}
                        className="flex items-center gap-1.5 border border-church-purple hover:bg-church-purple hover:text-white text-church-purple font-bold text-xs px-4 py-2.5 rounded-full transition-all duration-200"
                        title="Add to Google/Apple Calendar"
                      >
                        <Download size={14} /> Add to Calendar
                      </button>
                    </div>
                  </AnimatedCard>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
