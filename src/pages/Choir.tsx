import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Music, Calendar, Award, CheckCircle, AlertCircle, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { mockSections } from '../data/mockData';

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  section: string;
  voicePart: 'Soprano' | 'Alto' | 'Tenor' | 'Bass' | '';
  availability: string[];
  experience: string;
  notes: string;
}

const initialFormState: FormState = {
  fullName: '',
  phone: '',
  email: '',
  section: '',
  voicePart: '',
  availability: [],
  experience: '',
  notes: '',
};

export const ChoirPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const stepsList = [
    { id: 1, name: 'Personal Details', icon: <User size={16} /> },
    { id: 2, name: 'Voice Part', icon: <Music size={16} /> },
    { id: 3, name: 'Availability', icon: <Calendar size={16} /> },
    { id: 4, name: 'Experience', icon: <Award size={16} /> },
  ];

  // Helper description of voice parts with pitch guide
  const voicePartInfo = [
    { name: 'Soprano', desc: 'Highest female vocal range. Leads melody lines.', key: 'Soprano', audioTip: 'High C to A5 range' },
    { name: 'Alto', desc: 'Lower female vocal range. Rich harmony layers.', key: 'Alto', audioTip: 'F3 to D5 range' },
    { name: 'Tenor', desc: 'High male vocal range. Dynamic counterpoint lines.', key: 'Tenor', audioTip: 'C3 to G4 range' },
    { name: 'Bass', desc: 'Deepest male vocal range. Foundations of choral harmony.', key: 'Bass', audioTip: 'E2 to E4 range' },
  ] as const;

  const availabilityOptions = [
    'Saturday Choir Rehearsals (1:00 PM - 4:00 PM)',
    'Sunday Morning Prep (8:00 AM - 9:00 AM)',
    'Midweek Special Practice (5:00 PM - 6:30 PM)',
    'National Convention Choir vigils',
  ];

  // Validation
  const validateStep = () => {
    const stepErrors: Partial<Record<keyof FormState, string>> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) stepErrors.fullName = 'Full name is required';
      if (!formData.phone.trim()) {
        stepErrors.phone = 'Phone number is required';
      } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.phone)) {
        stepErrors.phone = 'Please enter a valid phone number';
      }
      if (!formData.email.trim()) {
        stepErrors.email = 'Email address is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        stepErrors.email = 'Please enter a valid email address';
      }
      if (!formData.section) stepErrors.section = 'Please select your church section';
    }

    if (step === 2) {
      if (!formData.voicePart) stepErrors.voicePart = 'Please select a voice part';
    }

    if (step === 3) {
      if (formData.availability.length === 0) {
        stepErrors.availability = 'Please select at least one available rehearsal slot';
      }
    }

    if (step === 4) {
      if (!formData.experience.trim()) {
        stepErrors.experience = 'Please briefly describe your musical background';
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = (option: string) => {
    setFormData((prev) => {
      const current = prev.availability;
      const updated = current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option];

      return { ...prev, availability: updated };
    });

    if (errors.availability) {
      setErrors((prev) => ({ ...prev, availability: undefined }));
    }
  };

  const handleSelectVoicePart = (part: FormState['voicePart']) => {
    setFormData((prev) => ({ ...prev, voicePart: part }));
    if (errors.voicePart) {
      setErrors((prev) => ({ ...prev, voicePart: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);

    // Simulate backend request save
    setTimeout(() => {
      // Fetch existing registrants or start empty
      const existing = JSON.parse(localStorage.getItem('choir_registrations') || '[]');
      const updated = [...existing, { ...formData, id: `reg-${Date.now()}` }];
      localStorage.setItem('choir_registrations', JSON.stringify(updated));

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setStep(1);
    setIsSuccess(false);
  };

  return (
    <div className="pt-24 pb-20 bg-stone-50 min-h-screen">
      {/* Page Title */}
      <section className="bg-church-purple text-white py-12 mb-10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <span className="text-church-gold font-bold uppercase tracking-widest text-xs border border-church-gold/30 px-3 py-1 rounded-full bg-church-gold/10">
            Praise Team Auditions
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif mt-3 mb-2">
            Choir Registration
          </h1>
          <p className="text-stone-300 font-light max-w-xl mx-auto text-sm md:text-base">
            Offer your talent to God. Register to audition for the Bethesda Praise Choir.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-2xl">
        {/* Step Indicator Panel */}
        {!isSuccess && (
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200 mb-8 flex justify-between items-center relative overflow-hidden">
            {/* Animated Underline Progress */}
            <div className="absolute bottom-0 left-0 h-[3px] bg-stone-100 w-full" />
            <motion.div
              className="absolute bottom-0 left-0 h-[3px] bg-church-purple"
              animate={{ width: `${((step - 1) / (stepsList.length - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />

            {stepsList.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-1.5 z-10">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 font-bold ${
                    step === s.id
                      ? 'bg-church-purple text-white ring-4 ring-church-purple/20 scale-110'
                      : step > s.id
                      ? 'bg-church-gold text-church-purple-dark'
                      : 'bg-stone-100 text-stone-400'
                  }`}
                >
                  {s.icon}
                </div>
                <span
                  className={`text-[10px] md:text-xs font-semibold hidden sm:inline ${
                    step === s.id ? 'text-church-purple font-bold' : 'text-stone-500'
                  }`}
                >
                  {s.name}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Form Container with animations */}
        <div className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              // Success Screen
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="p-8 md:p-12 text-center flex flex-col items-center gap-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                  className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2"
                >
                  <CheckCircle size={48} className="stroke-[2.5]" />
                </motion.div>
                <h2 className="text-3xl font-bold font-serif text-church-purple">
                  Registration Successful!
                </h2>
                <p className="text-stone-600 leading-relaxed font-light max-w-md">
                  Thank you, <strong className="font-semibold text-stone-900">{formData.fullName}</strong>. Your choir application has been successfully saved in our local directory. The Choir Coordinator will contact you shortly about audition schedules.
                </p>
                <div className="bg-stone-50 p-5 rounded-xl border border-stone-200 text-left w-full text-sm">
                  <h3 className="font-bold text-church-purple mb-2">Saved Audition details:</h3>
                  <p><strong>Voice Part:</strong> {formData.voicePart}</p>
                  <p><strong>Assembly:</strong> {formData.section}</p>
                  <p className="mt-2 text-xs text-stone-500">A confirmation has been saved to your browser\'s local storage.</p>
                </div>
                <button
                  onClick={handleReset}
                  className="bg-church-purple hover:bg-church-purple-light text-white font-bold px-8 py-3 rounded-full shadow transition-all duration-200 text-sm"
                >
                  Register Another Member
                </button>
              </motion.div>
            ) : (
              // Active Steps
              <form onSubmit={handleSubmit} className="p-8">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col gap-5"
                  >
                    <h2 className="text-2xl font-bold font-serif text-church-purple border-b border-stone-100 pb-3">
                      Personal Details
                    </h2>
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="fullName" className="text-sm font-bold text-stone-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Tendai Chofamba"
                        className={`border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-church-purple/30 ${
                          errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                        }`}
                      />
                      {errors.fullName && (
                        <span className="text-xs text-red-500 flex items-center gap-1 mt-1">
                          <AlertCircle size={12} /> {errors.fullName}
                        </span>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-sm font-bold text-stone-700">
                        Phone Number (WhatsApp Preferred)
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +263 77 212 3456"
                        className={`border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-church-purple/30 ${
                          errors.phone ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                        }`}
                      />
                      {errors.phone && (
                        <span className="text-xs text-red-500 flex items-center gap-1 mt-1">
                          <AlertCircle size={12} /> {errors.phone}
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-sm font-bold text-stone-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. tendai@gmail.com"
                        className={`border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-church-purple/30 ${
                          errors.email ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                        }`}
                      />
                      {errors.email && (
                        <span className="text-xs text-red-500 flex items-center gap-1 mt-1">
                          <AlertCircle size={12} /> {errors.email}
                        </span>
                      )}
                    </div>

                    {/* Section Selector */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="section" className="text-sm font-bold text-stone-700">
                        Your Church Section / Assembly
                      </label>
                      <select
                        id="section"
                        name="section"
                        value={formData.section}
                        onChange={handleInputChange}
                        className={`border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-church-purple/30 bg-white ${
                          errors.section ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                        }`}
                      >
                        <option value="">-- Choose Section --</option>
                        {mockSections.map((sec) => (
                          <option key={sec.id} value={sec.name}>
                            {sec.name}
                          </option>
                        ))}
                      </select>
                      {errors.section && (
                        <span className="text-xs text-red-500 flex items-center gap-1 mt-1">
                          <AlertCircle size={12} /> {errors.section}
                        </span>
                      )}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col gap-5"
                  >
                    <div>
                      <h2 className="text-2xl font-bold font-serif text-church-purple border-b border-stone-100 pb-3">
                        Choose Your Voice Part
                      </h2>
                      <p className="text-xs text-stone-500 mt-2">
                        Select the primary voice part you wish to audition for. Each voice plays a unique role in our choir harmonies.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {voicePartInfo.map((voice) => {
                        const isSelected = formData.voicePart === voice.key;
                        return (
                          <div
                            key={voice.key}
                            onClick={() => handleSelectVoicePart(voice.key)}
                            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between hover:border-church-purple/50 ${
                              isSelected
                                ? 'border-church-purple bg-church-purple/5 shadow-md'
                                : 'border-stone-200'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className={`text-base font-bold font-serif ${isSelected ? 'text-church-purple' : 'text-stone-800'}`}>
                                  {voice.name}
                                </span>
                                <Volume2 size={16} className={isSelected ? 'text-church-purple' : 'text-stone-400'} />
                              </div>
                              <p className="text-xs text-stone-500 leading-relaxed font-light">
                                {voice.desc}
                              </p>
                            </div>
                            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mt-4">
                              {voice.audioTip}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    {errors.voicePart && (
                      <span className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle size={12} /> {errors.voicePart}
                      </span>
                    )}
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col gap-5"
                  >
                    <h2 className="text-2xl font-bold font-serif text-church-purple border-b border-stone-100 pb-3">
                      Rehearsal Availability
                    </h2>

                    <div className="flex flex-col gap-3">
                      <p className="text-xs text-stone-500 mb-2">
                        To maintain high performance, members must attend rehearsals regularly. Select all rehearsal times you can commit to:
                      </p>

                      {availabilityOptions.map((opt) => {
                        const isChecked = formData.availability.includes(opt);
                        return (
                          <div
                            key={opt}
                            onClick={() => handleCheckboxChange(opt)}
                            className={`p-4 rounded-xl border cursor-pointer flex items-center gap-3 transition-colors ${
                              isChecked
                                ? 'bg-church-gold/10 border-church-gold text-church-purple font-semibold'
                                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                              isChecked ? 'bg-church-purple border-church-purple text-white' : 'border-stone-300'
                            }`}>
                              {isChecked && <span className="text-xs font-bold">✓</span>}
                            </div>
                            <span className="text-xs md:text-sm">{opt}</span>
                          </div>
                        );
                      })}
                    </div>
                    {errors.availability && (
                      <span className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle size={12} /> {errors.availability}
                      </span>
                    )}
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col gap-5"
                  >
                    <h2 className="text-2xl font-bold font-serif text-church-purple border-b border-stone-100 pb-3">
                      Musical Experience
                    </h2>

                    {/* Experience Text Area */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="experience" className="text-sm font-bold text-stone-700">
                        Describe your singing experience (e.g. sang in school choir, previous assembly, family singing, none is okay!)
                      </label>
                      <textarea
                        id="experience"
                        name="experience"
                        rows={4}
                        value={formData.experience}
                        onChange={handleInputChange}
                        placeholder="Please share briefly about your musical background or why you would love to join..."
                        className={`border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-church-purple/30 resize-none ${
                          errors.experience ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                        }`}
                      />
                      {errors.experience && (
                        <span className="text-xs text-red-500 flex items-center gap-1 mt-1">
                          <AlertCircle size={12} /> {errors.experience}
                        </span>
                      )}
                    </div>

                    {/* Notes Field */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="notes" className="text-sm font-bold text-stone-700">
                        Any additional remarks or spiritual motivation (Optional)
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        rows={2}
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Is there anything else you\'d like the panel to know?"
                        className="border border-stone-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-church-purple/30 resize-none"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Form Buttons navigation */}
                <div className="mt-8 border-t border-stone-100 pt-5 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={isSubmitting}
                      className="flex items-center gap-1 text-sm font-bold text-stone-600 hover:text-church-purple transition-colors disabled:opacity-50"
                    >
                      <ChevronLeft size={16} /> Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < stepsList.length ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center gap-1 bg-church-purple hover:bg-church-purple-light text-white font-bold px-6 py-2.5 rounded-full shadow transition-all duration-200 text-sm"
                    >
                      Next Step <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-1.5 bg-church-gold hover:bg-church-gold-dark text-church-purple-dark font-bold px-7 py-2.5 rounded-full shadow transition-all duration-200 text-sm disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>Saving Details...</>
                      ) : (
                        <>Submit Registration ✓</>
                      )}
                    </button>
                  )}
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
