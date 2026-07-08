import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const RuwadzanoPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 bg-stone-50 min-h-screen">
      {/* Page Hero */}
      <section className="bg-church-purple text-white py-16 mb-12">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <span className="text-church-gold font-bold uppercase tracking-widest text-xs border border-church-gold/30 px-3 py-1 rounded-full bg-church-gold/10 inline-flex items-center gap-1.5">
            <Heart size={12} /> Women's Ministry
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif mt-4 mb-3">
            Ruwadzano
          </h1>
          <p className="text-stone-300 font-light max-w-xl mx-auto text-sm md:text-base">
            Women of Faith United — nurturing spiritual growth, sisterhood and community service.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-10 shadow-sm border border-stone-200 text-center max-w-2xl mx-auto"
        >
          <div className="w-20 h-20 bg-church-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={36} className="text-church-gold" />
          </div>
          <h2 className="font-serif font-bold text-2xl text-church-purple mb-3">
            Coming Soon
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            The Ruwadzano page is currently being prepared. Check back soon for updates on meetings, prayer programs, and sisterhood events.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
