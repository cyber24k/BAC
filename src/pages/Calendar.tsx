import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  Star,
} from 'lucide-react';
import { annualEvents, categoryMeta } from '../data/calendarData';
import type { EventCategory, CalendarEvent } from '../data/calendarData';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const ALL_CATEGORIES: EventCategory[] = [
  'National', 'Ruwadzano', 'BMCU & Ruwadzano', 'BMCU', 'Sunday School', 'General',
];

// ─── helpers ──────────────────────────────────────────────────────────────────
function getDaysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(month: number, year: number) {
  return new Date(year, month, 1).getDay(); // 0 = Sunday
}
function padTwo(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}
function formatDate(year: number, month: number, day: number) {
  return `${year}-${padTwo(month + 1)}-${padTwo(day)}`;
}
/**
 * Parse a YYYY-MM-DD string without UTC offset issues.
 * new Date('2026-01-04') is parsed as UTC midnight, which can shift the date
 * by one day in negative-UTC timezones.  Reading the parts directly is safe.
 */
function parseLocalDate(dateStr: string): { year: number; month: number; day: number } {
  const [y, m, d] = dateStr.split('-').map(Number);
  return { year: y, month: m - 1, day: d }; // month is 0-indexed
}

// ─── sub-components (defined outside CalendarPage to avoid recreation on render)

interface MiniMonthGridProps {
  month: number;
  year: number;
  todayStr: string;
  eventsByDate: Record<string, CalendarEvent[]>;
  filteredEvents: CalendarEvent[];
  onClick?: () => void;
}

const MiniMonthGrid: React.FC<MiniMonthGridProps> = ({
  month, year, todayStr, eventsByDate, filteredEvents, onClick,
}) => {
  const days = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let i = 1; i <= days; i++) cells.push(i);

  return (
    <motion.div
      whileHover={{ scale: 1.015, boxShadow: '0 8px 32px rgba(100,0,180,0.10)' }}
      className="bg-white rounded-2xl border border-stone-200 overflow-hidden cursor-pointer select-none"
      onClick={onClick}
    >
      {/* month header */}
      <div className="bg-gradient-to-r from-church-purple to-church-purple-dark text-white text-center py-2 px-3 font-serif font-bold text-sm tracking-wide">
        {MONTHS[month]}
      </div>
      {/* day-name row */}
      <div className="grid grid-cols-7 bg-church-purple/10 text-[9px] font-bold text-church-purple text-center py-1">
        {DAYS_SHORT.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      {/* day cells */}
      <div className="grid grid-cols-7 p-1 gap-[1px]">
        {cells.map((day, idx) => {
          if (!day)
            return <div key={`e-${idx}`} className="h-7 w-full" />;
          const dateStr = formatDate(year, month, day);
          const eventsOnDay = eventsByDate[dateStr] || [];
          const isToday = dateStr === todayStr;
          const topCat = eventsOnDay[0]?.category;
          const meta = topCat ? categoryMeta[topCat] : null;

          return (
            <div
              key={dateStr}
              className={`h-7 flex flex-col items-center justify-center rounded text-[10px] font-semibold relative transition-colors
                ${isToday ? 'ring-2 ring-church-gold bg-church-gold/10 text-church-purple-dark font-extrabold z-10' : 'text-stone-700'}
                ${meta ? `${meta.bg}` : 'hover:bg-stone-50'}
              `}
              title={eventsOnDay.map((e) => e.title).join(', ')}
            >
              <span>{day}</span>
              {eventsOnDay.length > 0 && (
                <div className="flex gap-[2px] mt-[1px]">
                  {eventsOnDay.slice(0, 3).map((ev) => (
                    <span
                      key={ev.id}
                      className={`w-[4px] h-[4px] rounded-full ${categoryMeta[ev.category].dot}`}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* event count badge */}
      {(() => {
        const cnt = filteredEvents.filter((e) => parseLocalDate(e.date).month === month).length;
        return cnt > 0 ? (
          <div className="text-center text-[10px] text-stone-400 font-semibold pb-2">
            {cnt} event{cnt !== 1 ? 's' : ''}
          </div>
        ) : (
          <div className="pb-2" />
        );
      })()}
    </motion.div>
  );
};

interface FullMonthGridProps {
  focusMonth: number;
  year: number;
  todayStr: string;
  eventsByDate: Record<string, CalendarEvent[]>;
}

const FullMonthGrid: React.FC<FullMonthGridProps> = ({ focusMonth, year, todayStr, eventsByDate }) => {
  const days = getDaysInMonth(focusMonth, year);
  const firstDay = getFirstDayOfMonth(focusMonth, year);
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let i = 1; i <= days; i++) cells.push(i);

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-lg overflow-hidden">
      {/* Day-name header */}
      <div className="grid grid-cols-7 bg-gradient-to-r from-church-purple to-church-purple-dark text-white text-center py-3 font-serif font-bold text-xs md:text-sm">
        {DAYS_SHORT.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      {/* Day cells */}
      <div className="grid grid-cols-7 border-t border-stone-100 bg-stone-100 gap-[1px]">
        {cells.map((day, idx) => {
          if (!day)
            return (
              <div
                key={`empty-${idx}`}
                className="bg-stone-50 min-h-[90px] md:min-h-[120px]"
              />
            );
          const dateStr = formatDate(year, focusMonth, day);
          const isToday = dateStr === todayStr;
          const dayEvs = eventsByDate[dateStr] || [];

          return (
            <div
              key={dateStr}
              className={`bg-white min-h-[90px] md:min-h-[120px] p-1.5 flex flex-col gap-1 transition-colors
                ${isToday ? 'ring-2 ring-inset ring-church-gold bg-amber-50/40' : 'hover:bg-stone-50/60'}`}
            >
              {/* Day number */}
              <span
                className={`text-xs font-bold flex items-center justify-center w-6 h-6 rounded-full shrink-0
                  ${isToday ? 'bg-church-gold text-white shadow' : 'text-stone-700'}`}
              >
                {day}
              </span>
              {/* Events */}
              {dayEvs.map((ev) => {
                const meta = categoryMeta[ev.category];
                return (
                  <div
                    key={ev.id}
                    title={ev.description || ev.title}
                    className={`text-[9px] md:text-[11px] font-semibold px-1.5 py-0.5 rounded truncate border leading-tight
                      ${meta.bg} ${meta.color} ${meta.border}`}
                  >
                    {ev.title}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface ListViewProps {
  filteredEvents: CalendarEvent[];
  todayStr: string;
}

const ListView: React.FC<ListViewProps> = ({ filteredEvents, todayStr }) => {
  const grouped: Record<number, CalendarEvent[]> = {};
  for (const ev of filteredEvents) {
    const m = parseLocalDate(ev.date).month;
    if (!grouped[m]) grouped[m] = [];
    grouped[m].push(ev);
  }

  return (
    <div className="flex flex-col gap-8">
      {MONTHS.map((monthName, mi) => {
        const evs = grouped[mi];
        if (!evs || evs.length === 0) return null;
        return (
          <motion.div
            key={mi}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: mi * 0.03 }}
            className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden"
          >
            {/* Month label */}
            <div className="bg-gradient-to-r from-church-purple to-church-purple-dark text-white px-6 py-3 font-serif font-bold text-lg flex items-center gap-2">
              <CalendarIcon size={18} className="text-church-gold" />
              {monthName} {YEAR}
              <span className="ml-auto text-xs bg-white/20 rounded-full px-3 py-0.5 font-sans">
                {evs.length} event{evs.length !== 1 ? 's' : ''}
              </span>
            </div>
            {/* Events list */}
            <div className="divide-y divide-stone-100">
              {evs.sort((a, b) => a.date.localeCompare(b.date)).map((ev) => {
                const meta = categoryMeta[ev.category];
                const { month: evMonth, day: evDay } = parseLocalDate(ev.date);
                const isToday = ev.date === todayStr;
                return (
                  <div
                    key={ev.id}
                    className={`flex items-start gap-4 px-6 py-4 hover:bg-stone-50/60 transition-colors
                      ${isToday ? 'border-l-4 border-church-gold bg-amber-50/40' : ''}`}
                  >
                    {/* Date badge */}
                    <div className={`shrink-0 w-12 h-12 rounded-xl flex flex-col items-center justify-center border text-center ${meta.bg} ${meta.border}`}>
                      <span className={`text-[10px] font-bold uppercase ${meta.color}`}>
                        {MONTHS[evMonth].substring(0, 3)}
                      </span>
                      <span className={`text-lg font-extrabold font-serif leading-none ${meta.color}`}>
                        {padTwo(evDay)}
                      </span>
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${meta.bg} ${meta.color} ${meta.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                          {meta.label}
                        </span>
                        {isToday && (
                          <span className="text-[10px] font-bold bg-church-gold text-church-purple-dark px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Star size={9} /> Today
                          </span>
                        )}
                      </div>
                      <p className={`mt-1 font-bold text-church-purple text-sm md:text-base ${ev.title.length > 40 ? 'text-sm' : ''}`}>
                        {ev.title}
                      </p>
                      {ev.description && (
                        <p className="text-stone-500 text-xs mt-0.5 leading-relaxed">{ev.description}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const YEAR = 2026;

// ─── component ────────────────────────────────────────────────────────────────
export const CalendarPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'annual' | 'month' | 'list'>('annual');
  const [focusMonth, setFocusMonth] = useState<number>(new Date().getMonth());
  const [activeCategories, setActiveCategories] = useState<Set<EventCategory>>(
    new Set(ALL_CATEGORIES),
  );

  // Today string for highlighting
  const todayStr = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${padTwo(d.getMonth() + 1)}-${padTwo(d.getDate())}`;
  })();

  const toggleCategory = (cat: EventCategory) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        if (next.size === 1) return prev; // keep at least one
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  };

  const filteredEvents = useMemo(
    () => annualEvents.filter((e) => activeCategories.has(e.category)),
    [activeCategories],
  );

  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    for (const ev of filteredEvents) {
      if (!map[ev.date]) map[ev.date] = [];
      map[ev.date].push(ev);
    }
    return map;
  }, [filteredEvents]);

  const monthEvents = useMemo(
    () => filteredEvents.filter((e) => parseLocalDate(e.date).month === focusMonth),
    [filteredEvents, focusMonth],
  );

  // sub-components are defined above (outside CalendarPage)

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div className="pt-24 pb-20 bg-stone-50 min-h-screen">
      {/* Header banner */}
      <section className="bg-gradient-to-br from-church-purple via-church-purple-dark to-[#1a003a] text-white py-14 mb-10 relative overflow-hidden">
        {/* decorative circles */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-church-gold/10 blur-2xl" />
        <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/5 blur-2xl" />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <span className="inline-block text-church-gold font-bold uppercase tracking-widest text-xs border border-church-gold/40 px-4 py-1 rounded-full bg-church-gold/10 mb-4">
            Chirangarangarwa cheKereke
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif mb-3">
            BAC Church Calendar 2026
          </h1>
          <p className="text-stone-300 font-light max-w-xl mx-auto text-sm md:text-base">
            The official annual programme of Bethesda Apostolic Church — all wings, all events, for the glory of God.
          </p>
          <p className="text-stone-400 text-xs mt-2">
            *Please contact the Secretariat for any amendments.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6">
        {/* ── Controls ─────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow border border-stone-200 p-5 mb-8 flex flex-col gap-5">
          {/* Row 1 – View mode switcher */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-lg font-bold font-serif text-church-purple">
              {viewMode === 'annual'
                ? 'Annual Overview'
                : viewMode === 'month'
                ? `${MONTHS[focusMonth]} ${YEAR}`
                : 'Agenda List'}
            </h2>

            <div className="flex items-center bg-stone-100 rounded-full p-1">
              {(
                [
                  { id: 'annual', icon: <LayoutGrid size={14} />, label: 'Annual' },
                  { id: 'month', icon: <CalendarIcon size={14} />, label: 'Month' },
                  { id: 'list', icon: <List size={14} />, label: 'Agenda' },
                ] as const
              ).map(({ id, icon, label }) => (
                <button
                  key={id}
                  onClick={() => setViewMode(id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                    viewMode === id
                      ? 'bg-church-purple text-white shadow'
                      : 'text-stone-600 hover:text-church-purple'
                  }`}
                >
                  {icon} {label}
                </button>
              ))}
            </div>
          </div>

          {/* Month navigator (shown in month view) */}
          {viewMode === 'month' && (
            <div className="flex items-center gap-3 self-start">
              <button
                onClick={() => setFocusMonth((m) => (m === 0 ? 11 : m - 1))}
                className="p-2 rounded-full border border-stone-200 hover:border-church-gold hover:text-church-purple text-stone-500 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-stone-700 font-semibold w-32 text-center">
                {MONTHS[focusMonth]}
              </span>
              <button
                onClick={() => setFocusMonth((m) => (m === 11 ? 0 : m + 1))}
                className="p-2 rounded-full border border-stone-200 hover:border-church-gold hover:text-church-purple text-stone-500 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* Row 2 – Category filters */}
          <div className="border-t border-stone-100 pt-4">
            <p className="text-[10px] font-bold uppercase text-stone-400 tracking-wider mb-3">
              Filter by Wing / Program Type:
            </p>
            <div className="flex flex-wrap gap-2">
              {ALL_CATEGORIES.map((cat) => {
                const meta = categoryMeta[cat];
                const active = activeCategories.has(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 ${
                      active
                        ? `${meta.bg} ${meta.color} ${meta.border} shadow-sm`
                        : 'bg-stone-50 text-stone-400 border-stone-200 opacity-60'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${active ? meta.dot : 'bg-stone-300'}`} />
                    {meta.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Views ────────────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {viewMode === 'annual' && (
            <motion.div
              key="annual"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {MONTHS.map((_, mi) => (
                  <MiniMonthGrid
                    key={mi}
                    month={mi}
                    year={YEAR}
                    todayStr={todayStr}
                    eventsByDate={eventsByDate}
                    filteredEvents={filteredEvents}
                    onClick={() => {
                      setFocusMonth(mi);
                      setViewMode('month');
                    }}
                  />
                ))}
              </div>

              {/* Legend */}
              <div className="mt-8 bg-white rounded-2xl border border-stone-200 shadow-sm p-5">
                <h3 className="text-sm font-bold font-serif text-church-purple mb-3 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded bg-church-purple/10 inline-block" />
                  Calendar Key
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {ALL_CATEGORIES.map((cat) => {
                    const meta = categoryMeta[cat];
                    return (
                      <div key={cat} className="flex items-center gap-2 text-sm">
                        <span className={`w-3 h-3 rounded-full shrink-0 ${meta.dot}`} />
                        <span className="text-stone-700 font-medium">{meta.label}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-stone-400 mt-3 italic">
                  Click on any month to view the detailed calendar. *Please contact Secretariat for any amendments.
                </p>
              </div>
            </motion.div>
          )}

          {viewMode === 'month' && (
            <motion.div
              key={`month-${focusMonth}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <FullMonthGrid
                focusMonth={focusMonth}
                year={YEAR}
                todayStr={todayStr}
                eventsByDate={eventsByDate}
              />

              {/* Month events list */}
              {monthEvents.length > 0 && (
                <div className="mt-6 bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-3 border-b border-stone-100 font-bold text-sm text-stone-600">
                    {monthEvents.length} Event{monthEvents.length !== 1 ? 's' : ''} this month
                  </div>
                  <div className="divide-y divide-stone-100">
                    {monthEvents
                      .sort((a, b) => a.date.localeCompare(b.date))
                      .map((ev) => {
                        const meta = categoryMeta[ev.category];
                        const { day: evDay } = parseLocalDate(ev.date);
                        return (
                          <div key={ev.id} className="flex items-center gap-4 px-6 py-3 hover:bg-stone-50 transition-colors">
                            <span className="text-stone-400 text-xs font-mono w-6 shrink-0">
                              {padTwo(evDay)}
                            </span>
                            <span className={`w-2 h-2 rounded-full shrink-0 ${meta.dot}`} />
                            <span className="text-stone-800 text-sm font-semibold flex-1">{ev.title}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${meta.bg} ${meta.color}`}>
                              {meta.label}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {viewMode === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <ListView filteredEvents={filteredEvents} todayStr={todayStr} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
