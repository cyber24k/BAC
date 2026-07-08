import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  imageUrl: string;
  title?: string;
  description?: string;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  imageUrl,
  title,
  description,
  onClose,
}) => {
  // Prevent body scrolling when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white hover:text-church-gold transition-colors duration-200 focus:outline-none p-2 rounded-full bg-white/10 hover:bg-white/20"
            aria-label="Close Lightbox"
          >
            <X size={24} />
          </button>

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()} // Stop overlay click closing inside
          >
            <img
              src={imageUrl}
              alt={title || 'Lightbox Image'}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl border border-white/10"
            />

            {/* Subtext info */}
            {(title || description) && (
              <div className="mt-4 text-center max-w-xl text-white">
                {title && (
                  <h3 className="text-xl font-semibold font-serif text-church-gold mb-1">
                    {title}
                  </h3>
                )}
                {description && <p className="text-stone-300 text-sm">{description}</p>}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
