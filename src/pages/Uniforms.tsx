import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, ShoppingBag, CheckCircle, Info } from 'lucide-react';
import { Lightbox } from '../components/Lightbox';
import { AnimatedCard } from '../components/AnimatedCard';
import { mockUniforms } from '../data/mockData';
import type { UniformItem } from '../data/mockData';

export const UniformsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [selectedDesc, setSelectedDesc] = useState<string>('');
  const [enquiryItem, setEnquiryItem] = useState<UniformItem | null>(null);

  // Enquiry Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const categories = ['All', 'Men', 'Women', 'Youth', 'Choir Robes', 'Sunday School'];

  // Filter uniforms based on active category tab
  const filteredUniforms = mockUniforms.filter((item) => {
    return selectedCategory === 'All' || item.category === selectedCategory;
  });

  const handleOpenLightbox = (url: string, title: string, desc: string) => {
    setSelectedImage(url);
    setSelectedTitle(title);
    setSelectedDesc(desc);
  };

  const handleOpenEnquiry = (item: UniformItem) => {
    setEnquiryItem(item);
    setSelectedSize(item.sizes[0] || '');
    setIsSuccess(false);
  };

  const handleCloseEnquiry = () => {
    setEnquiryItem(null);
    setName('');
    setPhone('');
    setIsSuccess(false);
  };

  const handleWhatsAppEnquiry = (item: UniformItem) => {
    const defaultText = `Hi Bethesda Church Shop, I am inquiring about the "${item.name}" (Price: ${item.price}). Please guide me on sizes and availability.`;
    const encodedText = encodeURIComponent(defaultText);
    const whatsappUrl = `https://wa.me/263772123456?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !selectedSize) return;

    setIsSubmitting(true);
    // Simulate inquiry POST request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Save local enquiry log
      const existing = JSON.parse(localStorage.getItem('uniform_enquiries') || '[]');
      const newEnquiry = {
        id: `enq-${Date.now()}`,
        itemName: enquiryItem?.name,
        itemPrice: enquiryItem?.price,
        size: selectedSize,
        quantity,
        customerName: name,
        customerPhone: phone,
        date: new Date().toISOString(),
      };
      localStorage.setItem('uniform_enquiries', JSON.stringify([...existing, newEnquiry]));
    }, 1200);
  };

  return (
    <div className="pt-24 pb-20 bg-stone-50 min-h-screen">
      {/* Page Title */}
      <section className="bg-church-purple text-white py-12 mb-10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <span className="text-church-gold font-bold uppercase tracking-widest text-xs border border-church-gold/30 px-3 py-1 rounded-full bg-church-gold/10">
            Bethesda Store
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif mt-3 mb-2">
            Uniform Prices & Designs
          </h1>
          <p className="text-stone-300 font-light max-w-xl mx-auto text-sm md:text-base">
            Explore prices and sizing standards for official Bethesda assemblies garments.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6">
        {/* Category Tabs Nav */}
        <div className="flex flex-wrap gap-2 justify-center mb-10 bg-white p-3 rounded-2xl shadow-xs border border-stone-200 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-church-purple text-white shadow-sm'
                  : 'text-stone-600 hover:text-church-purple hover:bg-stone-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredUniforms.map((item, idx) => (
              <AnimatedCard key={item.id} delay={idx * 0.08} direction="up">
                <div className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
                  {/* Photo area */}
                  <div
                    className="h-[280px] overflow-hidden relative cursor-zoom-in"
                    onClick={() => handleOpenLightbox(item.imageUrl, item.name, item.description)}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-church-purple text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      {item.category}
                    </div>
                    {/* Hover enlarge overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <span className="text-white text-xs font-semibold border border-white/40 px-3.5 py-1.5 rounded-full backdrop-blur-xs">
                        Zoom Image
                      </span>
                    </div>
                  </div>

                  {/* Details Card body */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="font-serif font-bold text-lg text-church-purple leading-snug">
                          {item.name}
                        </h3>
                        <span className="text-church-gold font-bold font-serif text-lg shrink-0">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-stone-500 text-xs leading-relaxed font-light mb-4">
                        {item.description}
                      </p>

                      {/* Sizes badges */}
                      <div className="mb-6">
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-2">
                          Available Sizes:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.sizes.map((sz) => (
                            <span key={sz} className="px-2 py-0.5 border border-stone-200 rounded-md text-[10px] font-bold text-stone-600 bg-stone-50">
                              {sz}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col gap-2 border-t border-stone-100 pt-4">
                      <button
                        onClick={() => handleWhatsAppEnquiry(item)}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Phone size={14} /> Quick WhatsApp Enquiry
                      </button>
                      <button
                        onClick={() => handleOpenEnquiry(item)}
                        className="w-full border border-church-purple hover:bg-church-purple hover:text-white text-church-purple font-bold py-2.5 rounded-xl text-xs transition-all duration-200 flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag size={14} /> Submit Offline Inquiry
                      </button>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox widget */}
      <Lightbox
        isOpen={selectedImage !== null}
        imageUrl={selectedImage || ''}
        title={selectedTitle}
        description={selectedDesc}
        onClose={() => setSelectedImage(null)}
      />

      {/* Enquiry Form Modal */}
      <AnimatePresence>
        {enquiryItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl border border-stone-200 max-w-md w-full overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-church-purple p-5 text-white flex justify-between items-center">
                <h3 className="font-serif font-bold text-base flex items-center gap-2">
                  <ShoppingBag className="text-church-gold" size={18} /> Uniform Inquiry
                </h3>
                <button
                  onClick={handleCloseEnquiry}
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
                  <h4 className="font-serif font-bold text-xl text-church-purple">Inquiry Logged</h4>
                  <p className="text-stone-600 text-xs leading-relaxed font-light">
                    Your interest in <strong>{enquiryItem.name}</strong> (Size {selectedSize}, Qty {quantity}) has been registered. The uniforms committee will follow up soon.
                  </p>
                  <button
                    onClick={handleCloseEnquiry}
                    className="bg-church-purple hover:bg-church-purple-light text-white font-bold px-6 py-2.5 rounded-full text-xs transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                // Form screen
                <form onSubmit={handleSubmitEnquiry} className="p-6 flex flex-col gap-4">
                  <div className="flex items-start gap-3 bg-stone-50 p-3 rounded-xl border border-stone-150 text-xs">
                    <Info size={16} className="text-church-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-church-purple">{enquiryItem.name}</p>
                      <p className="text-stone-500 font-semibold mt-0.5">Price: {enquiryItem.price}</p>
                    </div>
                  </div>

                  {/* Customer Name */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="enqName" className="text-xs font-bold text-stone-700">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="enqName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rachel Mafunga"
                      required
                      className="border border-stone-300 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-church-purple/30"
                    />
                  </div>

                  {/* Customer Phone */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="enqPhone" className="text-xs font-bold text-stone-700">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="enqPhone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +263 77 987 6543"
                      required
                      className="border border-stone-300 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-church-purple/30"
                    />
                  </div>

                  {/* Size and Qty row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="enqSize" className="text-xs font-bold text-stone-700">
                        Choose Size
                      </label>
                      <select
                        id="enqSize"
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="border border-stone-300 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-church-purple/30 bg-white"
                      >
                        {enquiryItem.sizes.map((sz) => (
                          <option key={sz} value={sz}>
                            {sz}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="enqQty" className="text-xs font-bold text-stone-700">
                        Quantity
                      </label>
                      <input
                        type="number"
                        id="enqQty"
                        min="1"
                        max="10"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="border border-stone-300 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-church-purple/30"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-church-purple hover:bg-church-purple-light text-white font-bold py-3 rounded-xl text-xs transition-colors mt-2"
                  >
                    {isSubmitting ? 'Submitting...' : 'Confirm Inquiry'}
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
