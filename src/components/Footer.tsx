import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-church-purple-dark text-stone-300 pt-16 pb-8 relative border-t border-church-gold/20">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-church-gold to-transparent" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Church Bio */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/images/logo.jpg"
                alt="Bethesda Logo"
                className="w-9 h-9 rounded-full object-cover shadow"
              />
              <div className="flex flex-col">
                <span className="text-white font-serif font-bold tracking-wide text-lg">
                  Bethesda
                </span>
                <span className="text-[9px] text-stone-300 font-sans tracking-widest uppercase font-semibold leading-none">
                  Apostolic Church
                </span>
              </div>
            </Link>
            <p className="text-sm font-light leading-relaxed text-stone-400">
              Standing on the foundations of the Apostles, bringing the light of Christ to families and communities throughout Zimbabwe and beyond.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-church-gold hover:text-church-purple-dark flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-church-gold hover:text-church-purple-dark flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a
                href="https://wa.me/263772123456"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-church-gold hover:text-church-purple-dark flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="WhatsApp"
              >
                {/* SVG for WhatsApp */}
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.002-2.637-1.019-5.115-2.875-6.974-1.856-1.857-4.325-2.879-6.963-2.88-5.439 0-9.865 4.425-9.867 9.87-.001 1.73.457 3.419 1.323 4.905l-.97 3.542 3.63-.951z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Sitemap */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-serif font-semibold text-lg border-b border-white/10 pb-2">
              Sitemap
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li>
                <Link to="/" className="hover:text-church-gold transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/calendar" className="hover:text-church-gold transition-colors duration-200">
                  Calendar
                </Link>
              </li>
              <li>
                <Link to="/choir" className="hover:text-church-gold transition-colors duration-200">
                  Choir Sign Up
                </Link>
              </li>
              <li>
                <Link to="/temple-progress" className="hover:text-church-gold transition-colors duration-200">
                  Temple Progress
                </Link>
              </li>
              <li>
                <Link to="/sections" className="hover:text-church-gold transition-colors duration-200">
                  Our Sections
                </Link>
              </li>
              <li>
                <Link to="/uniforms" className="hover:text-church-gold transition-colors duration-200">
                  Uniform Shop
                </Link>
              </li>
              <li>
                <Link to="/notice-board" className="hover:text-church-gold transition-colors duration-200">
                  Notice Board
                </Link>
              </li>
              <li>
                <Link to="/youth" className="hover:text-church-gold transition-colors duration-200">
                  Youth Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Service Schedule */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-serif font-semibold text-lg border-b border-white/10 pb-2">
              Weekly Services
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li className="flex flex-col">
                <span className="text-stone-400 text-xs">Sunday Service</span>
                <span className="font-medium text-white">09:00 AM - 01:00 PM</span>
              </li>
              <li className="flex flex-col">
                <span className="text-stone-400 text-xs">Thursday Women\'s Service</span>
                <span className="font-medium text-white">02:00 PM - 05:00 PM</span>
              </li>
              <li className="flex flex-col">
                <span className="text-stone-400 text-xs">Friday Youth Service</span>
                <span className="font-medium text-white">06:00 PM - 08:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Key Contacts */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-serif font-semibold text-lg border-b border-white/10 pb-2">
              Headquarters
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="text-church-gold shrink-0 mt-0.5" />
                <span className="font-light">
                  Stand 4322, Mainway Meadows Road, Highfield, Harare, Zimbabwe
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-church-gold shrink-0" />
                <a href="tel:+263772123456" className="hover:text-church-gold">
                  +263 77 212 3456
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-church-gold shrink-0" />
                <a href="mailto:info@Bethesdaapostolic.org" className="hover:text-church-gold">
                  info@Bethesdaapostolic.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & scroll-to-top */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500 font-light text-center md:text-left">
            © 2026 Bethesda Apostolic Church. All rights reserved. Built for ministry outreach.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-church-gold border border-white/10 hover:border-church-gold px-3.5 py-1.5 rounded-full transition-all duration-300 focus:outline-none"
            aria-label="Scroll to top"
          >
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
