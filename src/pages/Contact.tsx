import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle, ShieldAlert } from 'lucide-react';
import { AnimatedCard } from '../components/AnimatedCard';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialForm: ContactForm = {
  name: '',
  email: '',
  subject: 'General Enquiry',
  message: '',
};

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Log enquiry details in local storage
      const existing = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
      localStorage.setItem('contact_submissions', JSON.stringify([...existing, { ...form, date: new Date().toISOString(), id: `msg-${Date.now()}` }]));
    }, 1500);
  };

  const handleReset = () => {
    setForm(initialForm);
    setIsSuccess(false);
  };

  // Church Leadership contacts
  const leaders = [
    { name: 'Pastor T. Maposa', role: 'Senior Overseeing Pastor', phone: '+263 77 212 3456', email: 'tmaposa@bethsaida.org' },
    { name: 'Secretary T. Mafunga', role: 'Church Secretariat', phone: '+263 77 987 6543', email: 'secretary@bethsaida.org' },
    { name: 'Brother S. Zhou', role: 'National Youth Coordinator', phone: '+263 78 333 4444', email: 'youths@bethsaida.org' },
    { name: 'Sister M. Chofamba', role: 'Praise Choir Leader', phone: '+263 71 222 3333', email: 'choir@bethsaida.org' },
  ];

  return (
    <div className="pt-24 pb-20 bg-stone-50 min-h-screen">
      {/* Page Title */}
      <section className="bg-church-purple text-white py-12 mb-10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <span className="text-church-gold font-bold uppercase tracking-widest text-xs border border-church-gold/30 px-3 py-1 rounded-full bg-church-gold/10">
            Get In Touch
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif mt-3 mb-2">
            Contact Details
          </h1>
          <p className="text-stone-300 font-light max-w-xl mx-auto text-sm md:text-base">
            Reach out for prayers, uniform orders, church locations, or to speak to our leadership.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left: Contact Form Card */}
          <AnimatedCard direction="left" className="bg-white p-8 rounded-3xl shadow-lg border border-stone-200">
            <h2 className="text-2xl font-bold font-serif text-church-purple border-b border-stone-100 pb-3 mb-6">
              Send Us a Message
            </h2>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-10 flex flex-col items-center gap-4"
                >
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-church-purple">Message Sent!</h3>
                  <p className="text-stone-600 text-xs leading-relaxed max-w-xs font-light">
                    Thank you for reaching out. We have logged your enquiry. Our church admin team will respond to you shortly.
                  </p>
                  <button
                    onClick={handleReset}
                    className="bg-church-purple hover:bg-church-purple-light text-white font-bold px-6 py-2.5 rounded-full text-xs transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg flex items-center gap-2">
                      <ShieldAlert size={14} /> {errorMsg}
                    </div>
                  )}

                  {/* Name */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-xs font-bold text-stone-700">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Samuel Moyo"
                      className="border border-stone-300 rounded-lg p-3 text-xs focus:outline-none focus:ring-2 focus:ring-church-purple/30"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-xs font-bold text-stone-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="e.g. samuel@gmail.com"
                      className="border border-stone-300 rounded-lg p-3 text-xs focus:outline-none focus:ring-2 focus:ring-church-purple/30"
                    />
                  </div>

                  {/* Subject selector */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="subject" className="text-xs font-bold text-stone-700">
                      Subject of Inquiry
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="border border-stone-300 rounded-lg p-3 text-xs focus:outline-none focus:ring-2 focus:ring-church-purple/30 bg-white"
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Prayer Request">Prayer Request</option>
                      <option value="Uniform Shop inquiry">Uniform Shop Inquiry</option>
                      <option value="Building contribution details">Building Fund Inquiry</option>
                      <option value="Choir auditions info">Choir Auditions Inquiry</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="message" className="text-xs font-bold text-stone-700">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      required
                      placeholder="Write your prayer needs or enquiry details here..."
                      className="border border-stone-300 rounded-lg p-3 text-xs focus:outline-none focus:ring-2 focus:ring-church-purple/30 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-church-purple hover:bg-church-purple-light text-white font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm mt-2"
                  >
                    {isSubmitting ? (
                      'Sending Message...'
                    ) : (
                      <>
                        <Send size={12} /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </AnimatedCard>

          {/* Right: Contact details list */}
          <AnimatedCard direction="right" className="flex flex-col gap-8">
            {/* Coordinates card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
              <h3 className="text-xl font-bold font-serif text-church-purple mb-6 border-b border-stone-100 pb-3">
                Headquarters Coordinates
              </h3>
              <div className="flex flex-col gap-5 text-sm text-stone-600 font-light">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-church-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-stone-800 text-xs uppercase tracking-wider">Physical Address</h4>
                    <p className="mt-1">Stand 4322, Mainway Meadows Road, Highfield, Harare, Zimbabwe</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={20} className="text-church-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-stone-800 text-xs uppercase tracking-wider">Phone Lines</h4>
                    <p className="mt-1 flex flex-col">
                      <a href="tel:+263772123456" className="hover:text-church-purple">+263 77 212 3456 (General Office)</a>
                      <a href="tel:+263779876543" className="hover:text-church-purple">+263 77 987 6543 (Secretariat)</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={20} className="text-church-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-stone-800 text-xs uppercase tracking-wider">Email Address</h4>
                    <p className="mt-1">
                      <a href="mailto:info@bethsaidaapostolic.org" className="hover:text-church-purple">info@bethsaidaapostolic.org</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Interactive Map */}
            <div className="bg-church-purple-dark text-white rounded-3xl p-6 border border-white/5 relative overflow-hidden h-[240px] flex items-center justify-center shadow-lg">
              {/* Map background grids */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative z-10 text-center flex flex-col items-center gap-3">
                <MapPin className="text-church-gold animate-bounce" size={32} />
                <h4 className="font-serif font-bold text-lg text-white">Interactive Map Mock</h4>
                <p className="text-stone-400 text-xs font-light max-w-xs">
                  Mainway Meadows road, near Highfield Local Assembly. Tap below for coordinates.
                </p>
                <a
                  href="https://google.com/maps"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold px-4 py-2 rounded-full transition-colors mt-2"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </AnimatedCard>
        </div>

        {/* Leadership Contact Cards */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold font-serif text-church-purple text-center mb-8">
            Assembly Officers & Leadership
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leaders.map((leader, i) => (
              <AnimatedCard key={i} delay={i * 0.1} direction="up" className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm text-center flex flex-col justify-between h-full hover:border-church-purple transition-all duration-300">
                <div>
                  <div className="w-12 h-12 rounded-full bg-church-purple/5 border border-church-purple/10 flex items-center justify-center mx-auto mb-4 font-bold text-church-purple font-serif">
                    {leader.name.split(' ')[1]?.charAt(0) || leader.name.charAt(0)}
                  </div>
                  <h4 className="font-bold text-stone-800 text-base">{leader.name}</h4>
                  <p className="text-xs text-church-gold font-bold uppercase tracking-wider mt-1">
                    {leader.role}
                  </p>
                </div>
                <div className="border-t border-stone-100 pt-4 mt-4 flex flex-col gap-1.5 text-xs text-stone-500 font-light">
                  <a href={`tel:${leader.phone}`} className="hover:text-church-purple font-medium">
                    Call: {leader.phone}
                  </a>
                  <a href={`mailto:${leader.email}`} className="hover:text-church-purple">
                    {leader.email}
                  </a>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
