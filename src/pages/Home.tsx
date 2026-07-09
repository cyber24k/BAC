import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Bell, ShieldAlert, Award, ChevronRight, UserPlus, MapPin, Sparkles, Clock } from 'lucide-react';
import { ImageCarousel } from '../components/ImageCarousel';

const FacebookIcon: React.FC<{ className?: string, size?: number }> = ({ className, size = 24 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
import { AnimatedCard } from '../components/AnimatedCard';
import { ProgressBar } from '../components/ProgressBar';
import {
  heroCarouselImages,
  mockEvents,
  mockNotices,
  mockUniforms,
  mockYouthEvents,
} from '../data/mockData';

export const Home: React.FC = () => {
  // Live snapshot calculations
  const nextEvent = mockEvents[0]; // First event is upcoming
  const latestNotice = mockNotices.find((n) => n.isPinned) || mockNotices[0];

  // Youth event countdown (next youth event)
  const nextYouthEvent = mockYouthEvents[0];
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!nextYouthEvent) return;

    const targetDate = new Date(nextYouthEvent.date).getTime();

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
  }, [nextYouthEvent]);

  // Fast access links config
  const quickLinks = [
    {
      title: 'Conference Days',
      description: 'Check service times, venues, and annual conventions.',
      icon: <Calendar className="w-6 h-6 text-church-gold" />,
      path: '/calendar',
      bgClass: 'hover:bg-church-purple/5 border-church-purple/10',
    },
    {
      title: 'Notice Board',
      description: 'Get urgent updates, committee notifications, and news.',
      icon: <Bell className="w-6 h-6 text-church-gold" />,
      path: '/notice-board',
      bgClass: 'hover:bg-church-purple/5 border-church-purple/10',
    },
    {
      title: 'Youth Events',
      description: 'Join youth camps, sports days, and career workshops.',
      icon: <Sparkles className="w-6 h-6 text-church-gold" />,
      path: '/youth',
      bgClass: 'hover:bg-church-purple/5 border-church-purple/10',
    },
    {
      title: 'Temple Progress',
      description: 'Follow our construction roadmap and support the building.',
      icon: <Award className="w-6 h-6 text-church-gold" />,
      path: '/temple-progress',
      bgClass: 'hover:bg-church-purple/5 border-church-purple/10',
    },
  ];

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* 1. Hero Shuffling Carousel */}
      <ImageCarousel images={heroCarouselImages} />

      {/* 2. Quick Access Cards */}
      <section id="quick-access" className="py-16 container mx-auto px-4 md:px-6 relative -mt-16 z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link, idx) => (
            <AnimatedCard key={link.path} delay={idx * 0.1} direction="up">
              <Link
                to={link.path}
                className={`flex flex-col h-full p-6 bg-white rounded-2xl shadow-xl hover:shadow-2xl border transition-all duration-300 transform hover:-translate-y-1 group ${link.bgClass}`}
              >
                <div className="w-12 h-12 rounded-xl bg-church-purple/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  {link.icon}
                </div>
                <h3 className="text-xl font-bold font-serif text-church-purple mb-2 group-hover:text-church-purple-light transition-colors duration-200">
                  {link.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-4 flex-grow">
                  {link.description}
                </p>
                <span className="flex items-center gap-1 text-xs font-bold text-church-gold uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-200 mt-auto">
                  View Page <ChevronRight size={14} />
                </span>
              </Link>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* 3. Live Snapshot section (Light/Dark rhythm - Dark) */}
      <section className="py-16 bg-church-purple-dark text-white relative">
        {/* Background accent blobs */}
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-church-purple/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-72 h-72 rounded-full bg-church-gold/10 blur-3xl" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-church-gold font-bold uppercase tracking-widest text-xs">
              Live Updates
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mt-2 mb-4">
              Assembly Snapshots
            </h2>
            <p className="text-stone-400 font-light">
              Here is the latest active information from our notice board and events calendar.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Snapshot Item 1: Next Event */}
            <AnimatedCard direction="left">
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-church-gold/20 text-church-gold text-xs font-bold px-3 py-1 rounded-full border border-church-gold/30">
                      Next Assembly
                    </span>
                    <span className="text-stone-400 text-xs flex items-center gap-1">
                      <Clock size={12} /> {nextEvent.time}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold font-serif mb-3 text-white">
                    {nextEvent.title}
                  </h3>
                  <p className="text-stone-300 text-sm leading-relaxed mb-6">
                    {nextEvent.description}
                  </p>
                </div>
                <div className="border-t border-white/10 pt-4 mt-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-stone-400">Location</span>
                    <span className="text-sm font-semibold text-white flex items-center gap-1">
                      <MapPin size={14} className="text-church-gold shrink-0" /> {nextEvent.location}
                    </span>
                  </div>
                  <Link
                    to="/calendar"
                    className="flex items-center gap-1 text-sm font-bold text-church-gold hover:text-church-gold-light transition-colors"
                  >
                    Calendar <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </AnimatedCard>

            {/* Snapshot Item 2: Latest Announcement */}
            <AnimatedCard direction="right">
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-red-500/20 text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-500/30 flex items-center gap-1 animate-notice-pulse">
                      <ShieldAlert size={12} /> Pinned Announcement
                    </span>
                    <span className="text-stone-400 text-xs">
                      Posted: {latestNotice.date}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold font-serif mb-3 text-white">
                    {latestNotice.title}
                  </h3>
                  <p className="text-stone-300 text-sm leading-relaxed mb-6 line-clamp-3">
                    {latestNotice.content}
                  </p>
                </div>
                <div className="border-t border-white/10 pt-4 mt-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-stone-400">Category</span>
                    <span className="text-sm font-semibold text-white">
                      {latestNotice.category}
                    </span>
                  </div>
                  <Link
                    to="/notice-board"
                    className="flex items-center gap-1 text-sm font-bold text-church-gold hover:text-church-gold-light transition-colors"
                  >
                    All Notices <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* 4. Temple Building Progress Teaser (Light background) */}
      <section className="py-16 container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedCard direction="left">
            <div className="relative">
              {/* Construction Mock Photo */}
              <div className="relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/congregation_hall.jpg"
                  alt="Bethesda Temple Building Congregation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-church-purple-dark/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="bg-church-gold text-church-purple-dark text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Highfield Assembly
                  </span>
                  <h3 className="text-2xl font-bold font-serif mt-2">Bethesda House of Prayer</h3>
                  <p className="text-stone-300 text-xs font-light">Construction commenced late 2024</p>
                </div>
              </div>

              {/* Float Card */}
              <div className="absolute -bottom-6 -right-4 md:right-6 bg-white p-6 rounded-xl shadow-xl border border-stone-100 flex items-center gap-4 max-w-xs">
                <div className="w-12 h-12 rounded-full bg-church-gold/25 flex items-center justify-center shrink-0">
                  <span className="font-serif font-bold text-church-purple text-lg">68%</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-church-purple">Roofing Stage</h4>
                  <p className="text-xs text-stone-500">Currently raising structural metal beams.</p>
                </div>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard direction="right" className="flex flex-col gap-6">
            <span className="text-church-purple font-bold uppercase tracking-widest text-xs border-l-2 border-church-purple pl-3">
              Building for Eternity
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-church-purple">
              Temple Building Progress
            </h2>
            <p className="text-stone-600 leading-relaxed font-light">
              By grace, we have reached the Roofing stage of our new Worship Temple. This temple will serve as a lighthouse of prayer, a fellowship hub for our youths, and a sanctuary of praise.
            </p>

            <div className="my-2 p-6 rounded-xl bg-white shadow-sm border border-stone-200">
              <ProgressBar value={68} label="Overall Completion Progress" />
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/temple-progress"
                className="bg-church-purple hover:bg-church-purple-light text-white font-bold px-6 py-3 rounded-full shadow-md transition-all duration-200 text-sm"
              >
                Track Detailed Phases
              </Link>
              <Link
                to="/temple-progress#contribute"
                className="border-2 border-church-gold hover:bg-church-gold/5 text-church-purple font-bold px-6 py-3 rounded-full transition-all duration-200 text-sm"
              >
                Support the Construction
              </Link>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* 5. Choir CTA Banner (Dark layout with purple-gradient background) */}
      <section className="py-20 bg-gradient-to-r from-church-purple to-church-purple-dark text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-church-gold/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white/5 blur-3xl" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-3xl flex flex-col items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-church-gold/25 flex items-center justify-center text-church-gold mb-2">
            <Sparkles className="w-7 h-7" />
          </div>
          <span className="text-church-gold font-bold uppercase tracking-widest text-xs">
            Bethesda Praise Choir
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-serif text-white">
            Lift Up Your Voice in Praise
          </h2>
          <p className="text-stone-300 font-light leading-relaxed max-w-xl">
            Are you passionate about praising God through music? Our choir registration is open for Soprano, Alto, Tenor, and Bass vocalists. Fill out our simple multi-step form to start.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <Link
              to="/choir"
              className="bg-church-gold hover:bg-church-gold-light text-church-purple-dark font-extrabold px-8 py-3.5 rounded-full shadow-lg hover:shadow-church-gold/25 transition-all duration-300 transform hover:-translate-y-0.5 text-sm md:text-base flex items-center gap-2"
            >
              <UserPlus size={18} /> Register for Choir Auditions
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Uniform Teaser Gallery (Light background) */}
      <section className="py-16 container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-church-purple font-bold uppercase tracking-widest text-xs border-l-2 border-church-purple pl-3">
              Sacred Attire
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-church-purple mt-2">
              Uniform Designs & Shop
            </h2>
          </div>
          <Link
            to="/uniforms"
            className="flex items-center gap-1 text-sm font-bold text-church-purple hover:text-church-purple-light transition-colors mt-4 md:mt-0"
          >
            Explore Full Shop <ChevronRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockUniforms.slice(0, 3).map((item, idx) => (
            <AnimatedCard key={item.id} delay={idx * 0.15} direction="up">
              <div className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="h-[280px] overflow-hidden relative">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-church-purple text-white text-xs font-bold px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-serif font-bold text-lg text-church-purple truncate">
                      {item.name}
                    </h3>
                    <span className="text-church-gold font-bold font-serif">{item.price}</span>
                  </div>
                  <p className="text-stone-500 text-xs leading-relaxed line-clamp-2 mb-4">
                    {item.description}
                  </p>
                  <Link
                    to="/uniforms"
                    className="block text-center bg-stone-100 hover:bg-church-purple hover:text-white text-church-purple font-semibold text-xs py-2.5 rounded-lg transition-all duration-200"
                  >
                    View Sizes & Order
                  </Link>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* 7. Youth Countdown Teaser (Dark section rhythm) */}
      <section className="py-16 bg-stone-900 text-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <AnimatedCard direction="left" className="flex flex-col gap-5">
              <span className="text-church-gold font-bold uppercase tracking-widest text-xs">
                Youth Ministry
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-white">
                Youth Convention Countdown
              </h2>
              <p className="text-stone-400 font-light leading-relaxed">
                Join thousands of other youths from sections across the country for the annual Bethesda Apostolic Youth Convention in Marondera. Get ready for music, testimonies, teachings, and spiritual revitalization!
              </p>
              <div className="flex flex-wrap gap-4 mt-2">
                <Link
                  to="/youth"
                  className="bg-church-gold hover:bg-church-gold-light text-church-purple-dark font-bold px-6 py-3 rounded-full text-sm transition-colors duration-200"
                >
                  View Youth Programs
                </Link>
                <Link
                  to="/youth"
                  className="border border-white/20 hover:bg-white/5 text-white font-medium px-6 py-3 rounded-full text-sm transition-colors duration-200"
                >
                  RSVP Count Me In
                </Link>
                <a
                  href="https://www.facebook.com/profile.php?id=100092623952022"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white font-medium px-6 py-3 rounded-full text-sm transition-colors duration-200 flex items-center gap-2"
                >
                  <FacebookIcon size={18} /> Facebook Page
                </a>
              </div>
            </AnimatedCard>

            <AnimatedCard direction="right">
              {/* Countdown Board */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
                <h3 className="text-stone-300 text-sm font-semibold uppercase tracking-wider mb-6 text-center">
                  Starts In:
                </h3>
                <div className="grid grid-cols-4 gap-4 text-center">
                  {/* Days */}
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="block text-3xl md:text-5xl font-bold font-serif text-church-gold">
                      {timeLeft.days}
                    </span>
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">
                      Days
                    </span>
                  </div>
                  {/* Hours */}
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="block text-3xl md:text-5xl font-bold font-serif text-church-gold">
                      {timeLeft.hours}
                    </span>
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">
                      Hours
                    </span>
                  </div>
                  {/* Minutes */}
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="block text-3xl md:text-5xl font-bold font-serif text-church-gold">
                      {timeLeft.minutes}
                    </span>
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">
                      Mins
                    </span>
                  </div>
                  {/* Seconds */}
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="block text-3xl md:text-5xl font-bold font-serif text-church-gold">
                      {timeLeft.seconds}
                    </span>
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">
                      Secs
                    </span>
                  </div>
                </div>
                <p className="text-center text-xs text-stone-400 mt-6 italic flex items-center justify-center gap-1">
                  <MapPin size={12} className="text-church-gold" /> Venue: Marondera Conference Ground
                </p>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>
    </div>
  );
};
