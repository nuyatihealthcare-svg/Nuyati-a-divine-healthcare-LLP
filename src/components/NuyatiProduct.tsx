import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { NuyatiTimer } from './NuyatiTimer';

interface NuyatiProductProps {
  onAddToCart: (packSize: number, price: number) => void;
  onBuyNow: (packSize: number, price: number) => void;
  avgRating?: number;
  totalReviews?: number;
}

const PACK_OPTIONS = [
  { label: 'Pack of 1', size: 1, price: 160 },
  { label: 'Pack of 2', size: 2, price: 320 },
  { label: 'Pack of 4', size: 4, price: 640 },
  { label: 'Pack of 6', size: 6, price: 960 },
  { label: 'Pack of 9', size: 9, price: 1440 },
  { label: 'Pack of 12', size: 12, price: 1920 },
];

export const NuyatiProduct: React.FC<NuyatiProductProps> = ({ 
  onAddToCart, 
  onBuyNow,
  avgRating = 4.8,
  totalReviews = 108
}) => {
  const [selectedPack, setSelectedPack] = useState(PACK_OPTIONS[0]);

  return (
    <section id="product" className="relative w-screen bg-nuyati-cream text-[#1a1a1a] py-24 md:py-32 flex justify-center items-center overflow-hidden">
      <div className="max-w-5xl px-8 grid md:grid-cols-2 gap-16 text-left w-full">
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center p-8 bg-white border border-nuyati-green/10 rounded group cursor-zoom-in"
        >
          <img 
            src="https://images.unsplash.com/photo-1605264964528-06403738d6dc?q=80&w=1974&auto=format&fit=crop" 
            alt="Alphonso Mango Soap" 
            className="max-h-[500px] object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 100 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 1 }}
           viewport={{ once: true }}
           className="flex flex-col justify-center"
        >
          <div className="flex text-yellow-600 mb-2 gap-0.5 items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill={i < Math.floor(avgRating) ? "currentColor" : "none"} className={i < Math.floor(avgRating) ? "" : "opacity-20"} />
            ))}
            <span className="ml-2 text-black/40 text-sm font-bold tracking-tighter">({avgRating.toFixed(1)}) | {totalReviews} Divine Experiences</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-nuyati-green leading-tight">
            ALPHONSO MANGO <br /> GLOW BAR | 110GM
          </h2>

          <div className="mb-8">
            <span className="font-bold uppercase mr-4 tracking-wider text-sm">Deal Ends in :</span>
            <div className="mt-2">
              <NuyatiTimer />
            </div>
          </div>

          <div className="mb-8">
            <p className="text-4xl font-bold">MRP Rs. {selectedPack.price} INR</p>
            <p className="text-sm opacity-60 italic">You've selected the {selectedPack.label}</p>
            <p className="text-xs opacity-40">Inclusive of all taxes</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {PACK_OPTIONS.map(pack => (
              <button
                key={pack.label}
                onClick={() => setSelectedPack(pack)}
                className={`border border-nuyati-green py-3 px-2 font-bold text-[10px] uppercase tracking-widest transition-all ${
                  selectedPack.label === pack.label ? 'bg-nuyati-green text-white shadow-lg' : 'bg-transparent text-nuyati-green hover:bg-nuyati-green/5'
                }`}
              >
                {pack.label}
              </button>
            ))}
          </div>

          <motion.button 
             whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
             whileTap={{ scale: 0.98 }}
             className="bg-[#ffff00] text-black w-full py-6 font-black text-xl uppercase tracking-[0.2em] shadow-xl hover:shadow-2xl transition-all mb-4"
             onClick={() => onBuyNow(selectedPack.size, selectedPack.price)}
          >
            Buy It Now
          </motion.button>

          <motion.button 
             whileHover={{ scale: 1.02, backgroundColor: "var(--color-nuyati-green)", color: "white" }}
             whileTap={{ scale: 0.98 }}
             className="border-2 border-nuyati-green text-nuyati-green w-full py-5 font-bold text-lg uppercase tracking-[0.1em] transition-all"
             onClick={() => {
               onAddToCart(selectedPack.size, selectedPack.price);
               alert(`Added ${selectedPack.label} to Cart!`);
             }}
          >
            Add to Cart
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
