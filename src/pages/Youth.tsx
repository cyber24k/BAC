import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, CheckCircle, Sparkles, X, Heart } from 'lucide-react';
import { AnimatedCard } from '../components/AnimatedCard';
import { mockYouthEvents } from '../data/mockData';
import type { YouthEvent } from '../data/mockData';

export const YouthPage: React.FC = () => {
  const [activeRsvpItem, setActiveRsvpItem] = useState<YouthEvent | null>(null);
  
  // RSVP Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [section, setSection] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Countdown timer calculation
  const nextEvent = mockYouthEvents[0];
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!nextEvent) return;
    const targetDate = new Date(nextEvent.date).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [nextEvent]);

  const handleOpenRsvp = (event: YouthEvent) => {
    setActiveRsvpItem(event);
    setIsSuccess(false);
  };

  const handleCloseRsvp = () => {
    setActiveRsvpItem(null);
    setName('');
    setPhone('');
    setSection('');
    setIsSuccess(false);
  };

  const handleSubmitRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !section.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Save local RSVP entries
      const existing = JSON.parse(localStorage.getItem('youth_rsvps') || '[]');
      const newRsvp = {
        id: `rsvp-${Date.now()}`,
        eventId: activeRsvpItem?.id,
        eventTitle: activeRsvpItem?.title,
        customerName: name,
        customerPhone: phone,
        customerSection: section,
        date: new Date().toISOString(),
      };
      localStorage.setItem('youth_rsvps', JSON.stringify([...existing, newRsvp]));
    }, 1200);
  };

  const pastHighlights = [
    { title: 'Youth Choir Contest 2025', url: '/images/women_gathering.jpg' },
    { title: 'Marondera Clean Up Charity', url: '/images/congregation_hall.jpg' },
    { title: 'Youth Sports Day Bulawayo', url: '/images/pastor_preaching_1.jpg' },
    { title: 'Youth Leadership Seminars', url: '/images/elders_seated.jpg' }
  ];

  return (
    <div className="pt-24 pb-20 bg-stone-50 min-h-screen">
      {/* Page Title */}
      <section className="bg-church-purple text-white py-12 mb-10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <span className="text-church-gold font-bold uppercase tracking-widest text-xs border border-church-gold/30 px-3 py-1 rounded-full bg-church-gold/10">
            Youth Fellowship
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif mt-3 mb-2">
            Youth Ministry Events
          </h1>
          <p className="text-stone-300 font-light max-w-xl mx-auto text-sm md:text-base">
            Equipping young believers with spiritual strength, life leadership skills, and community impact.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 flex flex-col gap-14">
        {/* Countdown Header Board */}
        {nextEvent && (
          <AnimatedCard direction="down" className="bg-church-purple-dark text-white rounded-3xl p-8 shadow-xl relative overflow-hidden border border-white/5">
            {/* Background vector highlights */}
            <div className="absolute top-0 right-0 w-84 h-84 rounded-full bg-church-gold/5 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-84 h-84 rounded-full bg-white/5 blur-3xl" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col gap-4 text-left">
                <span className="bg-church-gold text-church-purple-dark text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full self-start flex items-center gap-1">
                  <Sparkles size={12} /> Next Big Event
                </span>
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-white leading-snug">
                  {nextEvent.title}
                </h2>
                <p className="text-stone-300 text-sm leading-relaxed font-light">
                  {nextEvent.description}
                </p>
                <div className="flex flex-col gap-2 mt-2 text-xs font-semibold text-stone-400">
                  <span className="flex items-center gap-1.5"><Calendar size={14} className="text-church-gold" /> Date: {new Date(nextEvent.date).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={14} className="text-church-gold" /> Venue: {nextEvent.location}</span>
                </div>
              </div>

              {/* Ticking Grid Timer */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider text-center lg:text-left">
                  Countdown to Event:
                </span>
                <div className="grid grid-cols-4 gap-3 text-center">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <span className="block text-2xl md:text-4xl font-bold font-serif text-church-gold">{timeLeft.days}</span>
                    <span className="text-[9px] text-stone-400 uppercase tracking-widest font-bold">Days</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <span className="block text-2xl md:text-4xl font-bold font-serif text-church-gold">{timeLeft.hours}</span>
                    <span className="text-[9px] text-stone-400 uppercase tracking-widest font-bold">Hrs</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <span className="block text-2xl md:text-4xl font-bold font-serif text-church-gold">{timeLeft.minutes}</span>
                    <span className="text-[9px] text-stone-400 uppercase tracking-widest font-bold">Mins</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <span className="block text-2xl md:text-4xl font-bold font-serif text-church-gold">{timeLeft.seconds}</span>
                    <span className="text-[9px] text-stone-400 uppercase tracking-widest font-bold">Secs</span>
                  </div>
                </div>
                <button
                  onClick={() => handleOpenRsvp(nextEvent)}
                  className="w-full bg-church-gold hover:bg-church-gold-light text-church-purple-dark font-bold py-3 rounded-xl transition-all duration-200 text-sm shadow-md hover:shadow-church-gold/15 mt-3"
                >
                  Register / RSVP Attendance
                </button>
              </div>
            </div>
          </AnimatedCard>
        )}

        {/* Other Upcoming Events */}
        <section>
          <h3 className="text-2xl font-bold font-serif text-church-purple mb-8">
            Upcoming Youth Programs
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mockYouthEvents.slice(1).map((evt, idx) => (
              <AnimatedCard key={evt.id} delay={idx * 0.1} direction="up">
                <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-all duration-300">
                  <div>
                    <h4 className="font-serif font-bold text-xl text-church-purple mb-2">
                      {evt.title}
                    </h4>
                    <p className="text-stone-600 text-sm leading-relaxed font-light mb-5">
                      {evt.description}
                    </p>

                    <div className="flex flex-col gap-2 text-xs font-semibold text-stone-500 mb-6">
                      <span className="flex items-center gap-1.5"><Calendar size={14} className="text-church-gold" /> Date: {new Date(evt.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                      <span className="flex items-center gap-1.5"><Clock size={14} className="text-church-gold" /> Start: {new Date(evt.date).toLocaleTimeString(undefined, { timeStyle: 'short' })}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={14} className="text-church-gold" /> Venue: {evt.location}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenRsvp(evt)}
                    className="w-full border-2 border-church-purple hover:bg-church-purple hover:text-white text-church-purple font-bold py-2.5 rounded-xl text-xs transition-all duration-200"
                  >
                    Count Me In (RSVP)
                  </button>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </section>

        {/* Photo highlights */}
        <section>
          <div className="flex flex-col items-center text-center mb-10 max-w-lg mx-auto">
            <h3 className="text-2xl font-bold font-serif text-church-purple">
              Past Youth Highlights
            </h3>
            <p className="text-stone-500 text-xs mt-1.5 leading-relaxed font-light">
              Moments of praise, community cleaning programs, and sports events from across our assemblies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pastHighlights.map((pic, i) => (
              <AnimatedCard key={i} delay={i * 0.08} direction="up" className="bg-white rounded-2xl overflow-hidden border border-stone-250 shadow-xs group">
                <div className="h-[180px] overflow-hidden relative">
                  <img
                    src={pic.url}
                    alt={pic.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-church-purple-dark/70 via-transparent to-transparent flex items-end p-4">
                    <span className="text-white font-serif font-bold text-sm tracking-wide">
                      {pic.title}
                    </span>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </section>
      </div>

      {/* RSVP Form Modal */}
      <AnimatePresence>
        {activeRsvpItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl border border-stone-200 max-w-md w-full overflow-hidden"
            >
              {/* Header */}
              <div className="bg-church-purple p-5 text-white flex justify-between items-center">
                <h3 className="font-serif font-bold text-base flex items-center gap-2">
                  <Heart className="text-church-gold fill-church-gold" size={18} /> RSVP Attendance
                </h3>
                <button
                  onClick={handleCloseRsvp}
                  className="text-stone-300 hover:text-white p-1 rounded-full bg-white/5"
                >
                  <X size={16} />
                </button>
              </div>

              {isSuccess ? (
                // Success screen
                <div className="p-8 text-center flex flex-col items-center gap-5">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-1">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="font-serif font-bold text-xl text-church-purple">Attendance Registered!</h4>
                  <p className="text-stone-600 text-xs leading-relaxed font-light">
                    Perfect, <strong>{name}</strong>! We have registered your RSVP for the <strong>{activeRsvpItem.title}</strong>. See you there!
                  </p>
                  <button
                    onClick={handleCloseRsvp}
                    className="bg-church-purple hover:bg-church-purple-light text-white font-bold px-6 py-2.5 rounded-full text-xs transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                // Form screen
                <form onSubmit={handleSubmitRsvp} className="p-6 flex flex-col gap-4">
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-150 text-xs">
                    <p className="font-bold text-church-purple">{activeRsvpItem.title}</p>
                    <p className="text-stone-500 font-medium mt-1">Venue: {activeRsvpItem.location}</p>
                  </div>

                  {/* Name */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="rsvpName" className="text-xs font-bold text-stone-700">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      id="rsvpName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Tafadzwa Sibanda"
                      required
                      className="border border-stone-300 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-church-purple/30"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="rsvpPhone" className="text-xs font-bold text-stone-700">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="rsvpPhone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +263 77 123 4567"
                      required
                      className="border border-stone-300 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-church-purple/30"
                    />
                  </div>

                  {/* Section */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="rsvpSection" className="text-xs font-bold text-stone-700">
                      Your Assembly / Section
                    </label>
                    <input
                      type="text"
                      id="rsvpSection"
                      value={section}
                      onChange={(e) => setSection(e.target.value)}
                      placeholder="e.g. Highfield Assembly"
                      required
                      className="border border-stone-300 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-church-purple/30"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-church-purple hover:bg-church-purple-light text-white font-bold py-3 rounded-xl text-xs transition-colors mt-2"
                  >
                    {isSubmitting ? 'Logging RSVP...' : 'Submit RSVP'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
