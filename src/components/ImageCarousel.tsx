import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CarouselItem {
  id: string;
  url: string;
  caption: string;
  tagline: string;
}

interface ImageCarouselProps {
  images: CarouselItem[];
  intervalTime?: number;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  intervalTime = 6000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, intervalTime);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (!isPaused) {
      startTimer();
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [isPaused, currentIndex]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden bg-stone-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Subtle Ken Burns Zoom Image */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].caption}
              className="w-full h-full object-cover animate-kenburns origin-center"
            />
          </div>

          {/* Deep Purple overlay mask */}
          <div className="absolute inset-0 bg-gradient-to-r from-church-purple-dark/85 via-church-purple-dark/65 to-transparent" />

          {/* Caption / Text details */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6 md:px-12 flex flex-col items-start max-w-4xl text-left">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-church-gold font-bold uppercase tracking-widest text-xs md:text-sm mb-3 border-l-2 border-church-gold pl-3"
              >
                Welcome to Bethsaida
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-white text-4xl md:text-6xl font-extrabold font-serif leading-tight mb-4"
              >
                {images[currentIndex].caption}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-stone-300 text-base md:text-xl font-light mb-8 max-w-xl"
              >
                {images[currentIndex].tagline}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="#upcoming-events"
                  className="bg-church-gold hover:bg-church-gold-dark text-church-purple-dark font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-church-gold/25 transition-all duration-300 transform hover:-translate-y-0.5 text-sm md:text-base"
                >
                  Join Us This Sunday
                </a>
                <a
                  href="#quick-access"
                  className="border border-white/40 hover:border-white hover:bg-white/10 text-white font-medium px-6 py-3 rounded-full transition-all duration-300 text-sm md:text-base"
                >
                  Explore Features
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-10 bg-black/30 px-4 py-2 rounded-full backdrop-blur-xs">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${
              currentIndex === index
                ? 'bg-church-gold scale-125 w-6'
                : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress slider bar */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/20">
        <motion.div
          key={currentIndex + (isPaused ? '-paused' : '-active')}
          initial={{ width: 0 }}
          animate={isPaused ? { width: 0 } : { width: '100%' }}
          transition={
            isPaused
              ? { duration: 0 }
              : { duration: intervalTime / 1000, ease: 'linear' }
          }
          className="h-full bg-church-gold"
        />
      </div>
    </div>
  );
};
