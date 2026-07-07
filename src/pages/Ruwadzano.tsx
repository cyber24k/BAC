import React from 'react';
import { Heart } from 'lucide-react';

export const RuwadzanoPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 bg-stone-50 min-h-screen">
      {/* Page Hero with background image */}
      <section
        className="text-white py-24 mb-12 relative overflow-hidden"
        style={{
          backgroundImage: 'url(/images/ruwadzano_women.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-church-purple/70" />

        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
          <span className="text-church-gold font-bold uppercase tracking-widest text-xs border border-church-gold/40 px-3 py-1 rounded-full bg-church-gold/10 inline-flex items-center gap-1.5">
            <Heart size={12} /> Women's Ministry
          </span>
          <h1
            className="text-4xl md:text-6xl font-bold font-serif mt-4 mb-3"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
          >
            Ruwadzano
          </h1>
          <p
            className="text-church-gold font-bold italic text-2xl md:text-3xl mt-3 tracking-wide"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
          >
            "mudzimai ndiye mudzi"
          </p>
        </div>
      </section>


    </div>
  );
};
