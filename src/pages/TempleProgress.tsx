import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, DollarSign, Image as ImageIcon, Building, Landmark, QrCode, X } from 'lucide-react';
import { ProgressBar } from '../components/ProgressBar';
import { Lightbox } from '../components/Lightbox';
import { AnimatedCard } from '../components/AnimatedCard';
import { templeBuildingPhases, templeGallery } from '../data/mockData';

export const TempleProgressPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [selectedDesc, setSelectedDesc] = useState<string>('');
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false);

  // Fundraising metrics
  const targetAmount = 18000;
  const currentRaised = 12500;
  const fundraisingPercent = Math.round((currentRaised / targetAmount) * 100);

  const handleOpenLightbox = (url: string, title: string, desc: string) => {
    setSelectedImage(url);
    setSelectedTitle(title);
    setSelectedDesc(desc);
  };

  const statusColors: Record<string, string> = {
    'Completed': 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900',
    'In Progress': 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900',
    'Not Started': 'bg-stone-100 text-stone-600 border-stone-200',
  };

  return (
    <div className="pt-24 pb-20 bg-stone-50 min-h-screen">
      {/* Page Title */}
      <section className="bg-church-purple text-white py-12 mb-10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <span className="text-church-gold font-bold uppercase tracking-widest text-xs border border-church-gold/30 px-3 py-1 rounded-full bg-church-gold/10">
            House of Prayer Project
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif mt-3 mb-2">
            Temple Building Tracker
          </h1>
          <p className="text-stone-300 font-light max-w-xl mx-auto text-sm md:text-base">
            Follow the construction journey of our central Bethesda Assembly in Highfield, Harare.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 flex flex-col gap-12">
        {/* Row 1: Overall Dashboard & Fundraising Teaser */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Completion circular widget card */}
          <AnimatedCard direction="left" className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200 flex flex-col items-center justify-center text-center">
            <h3 className="text-lg font-bold text-church-purple font-serif mb-6">
              Overall Project Status
            </h3>
            <ProgressBar value={68} type="circle" size={160} strokeWidth={12} label="Completion" />
            <p className="text-stone-500 text-xs mt-6 leading-relaxed">
              We have completed foundation lay and main structure brick columns. Currently raising steel trusses.
            </p>
          </AnimatedCard>

          {/* Fundraising widget card */}
          <AnimatedCard direction="up" className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200 lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-church-purple font-serif">
                  Roofing Phase Fundraising
                </h3>
                <span className="text-xs font-bold text-church-gold bg-church-gold/10 px-3 py-1 rounded-full border border-church-gold/20">
                  Target: August 2026
                </span>
              </div>
              <p className="text-stone-600 text-sm font-light leading-relaxed mb-6">
                To purchase sheet metal cladding and support steel structures, we require a total of <strong>$18,000 USD</strong>. We thank God for our assemblies who have contributed so far.
              </p>

              <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 mb-6">
                <ProgressBar value={fundraisingPercent} label="Roofing Fund Contribution Gauge" />
                <div className="flex justify-between items-center text-xs font-bold text-stone-500 mt-3">
                  <span>Raised: ${currentRaised.toLocaleString()} USD</span>
                  <span>Target: ${targetAmount.toLocaleString()} USD</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsContributeModalOpen(true)}
              className="w-full bg-church-purple hover:bg-church-purple-light text-white font-bold py-3.5 rounded-xl shadow-md transition-all duration-200 text-sm flex items-center justify-center gap-2"
            >
              <DollarSign size={16} /> Contribute to Building Fund
            </button>
          </AnimatedCard>
        </div>

        {/* Row 2: Construction Phase Timeline */}
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
          <h3 className="text-xl font-bold font-serif text-church-purple mb-8 border-b border-stone-100 pb-3 flex items-center gap-2">
            <Building className="text-church-gold" size={20} /> Construction Timeline & Roadmap
          </h3>

          <div className="flex flex-col gap-6">
            {templeBuildingPhases.map((phase, idx) => (
              <div
                key={phase.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-stone-100 hover:border-church-gold/30 transition-colors bg-stone-50/50"
              >
                {/* Left side: name and info */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-church-purple/10 flex items-center justify-center font-bold text-church-purple text-sm shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800 text-base">{phase.name}</h4>
                    {phase.dateCompleted && (
                      <span className="text-xs text-stone-400 font-medium flex items-center gap-1 mt-1">
                        <Calendar size={12} /> {phase.dateCompleted}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right side: status, progress bar */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-4 md:mt-0 w-full md:w-auto md:min-w-[320px]">
                  <div className="flex-grow w-full md:w-auto">
                    <div className="h-2 bg-stone-200 rounded-full w-full overflow-hidden">
                      <div
                        className="bg-church-gold h-full rounded-full"
                        style={{ width: `${phase.progress}%` }}
                      />
                    </div>
                  </div>
                  <span
                    className={`inline-block px-3 py-1 text-xs font-bold rounded-full border shrink-0 ${
                      statusColors[phase.status]
                    }`}
                  >
                    {phase.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Row 3: Photo Gallery */}
        <section>
          <div className="flex items-center gap-2 mb-8">
            <ImageIcon className="text-church-gold" size={20} />
            <h3 className="text-2xl font-bold font-serif text-church-purple">
              Milestone Photo Gallery
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {templeGallery.map((photo) => (
              <AnimatedCard
                key={photo.id}
                direction="up"
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div
                  className="h-[200px] overflow-hidden relative"
                  onClick={() => handleOpenLightbox(photo.imageUrl, photo.title, photo.description)}
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <span className="text-white text-xs font-bold border border-white/50 px-4 py-2 rounded-full backdrop-blur-xs">
                      Enlarge Photo
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-serif font-bold text-sm text-church-purple truncate">
                    {photo.title}
                  </h4>
                  <p className="text-stone-500 text-[10px] truncate mt-1">
                    {photo.description}
                  </p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </section>
      </div>

      {/* Lightbox for large pictures */}
      <Lightbox
        isOpen={selectedImage !== null}
        imageUrl={selectedImage || ''}
        title={selectedTitle}
        description={selectedDesc}
        onClose={() => setSelectedImage(null)}
      />

      {/* Contribution Payment info Modal */}
      <AnimatePresence>
        {isContributeModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContributeModalOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            >
              {/* Modal Card */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl border border-stone-200 max-w-lg w-full overflow-hidden"
              >
                {/* Header */}
                <div className="bg-church-purple p-6 text-white flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Landmark className="text-church-gold" size={20} />
                    <h3 className="font-serif font-bold text-lg">Contribution Channels</h3>
                  </div>
                  <button
                    onClick={() => setIsContributeModalOpen(false)}
                    className="text-stone-300 hover:text-white p-1 rounded-full bg-white/5"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col gap-6">
                  <p className="text-stone-600 text-xs font-light leading-relaxed">
                    You can contribute directly to our building accounts or via EcoCash merchant code. Kindly share your transaction confirmations with the Church Secretary or your Section Treasurer for audit records.
                  </p>

                  {/* Ecocash */}
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                      <QrCode size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-amber-800 text-sm">EcoCash Merchant Option</h4>
                      <p className="text-xs text-stone-600 font-medium mt-1">
                        Merchant Code: <strong>*151*2*2*123456#</strong>
                      </p>
                      <p className="text-[10px] text-stone-500 font-light mt-0.5">
                        Registered Name: Bethesda Apostolic Church HQ
                      </p>
                    </div>
                  </div>

                  {/* ZB Bank Details */}
                  <div className="p-4 rounded-2xl bg-violet-50 border border-violet-200 flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-violet-500/10 text-violet-600 flex items-center justify-center shrink-0">
                      <Landmark size={20} />
                    </div>
                    <div className="text-xs text-stone-600">
                      <h4 className="font-bold text-violet-800 text-sm mb-1">ZB Bank (USD Account)</h4>
                      <p>Account Name: <strong>Bethesda Apostolic Church</strong></p>
                      <p>Account Number: <strong>4307-123456-090</strong></p>
                      <p>Branch: <strong>Highfield Branch, Harare</strong></p>
                    </div>
                  </div>

                  {/* Steward Bank Details */}
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                      <Landmark size={20} />
                    </div>
                    <div className="text-xs text-stone-600">
                      <h4 className="font-bold text-blue-800 text-sm mb-1">Steward Bank (ZiG Account)</h4>
                      <p>Account Name: <strong>Bethesda Apostolic Church</strong></p>
                      <p>Account Number: <strong>1012-765432-110</strong></p>
                      <p>Branch: <strong>First Street Branch, Harare</strong></p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-stone-50 border-t border-stone-100 text-center">
                  <button
                    onClick={() => setIsContributeModalOpen(false)}
                    className="bg-church-purple hover:bg-church-purple-light text-white font-bold px-6 py-2.5 rounded-full text-xs transition-colors duration-200"
                  >
                    Close Window
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
