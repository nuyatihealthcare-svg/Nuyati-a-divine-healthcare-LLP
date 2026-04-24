import React from 'react';
import { motion } from 'motion/react';

export const HeroBanner: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 mb-12">
      <div className="relative bg-[#fbe7d9] rounded-2xl overflow-hidden aspect-[21/9] flex items-center">
        {/* Background Image/Pattern could go here */}
        
        <div className="relative z-10 w-1/2 p-8 md:p-16 flex flex-col items-start gap-2">
          <div className="flex items-center gap-2 mb-2">
             <div className="w-8 h-[1px] bg-brand-orange"></div>
             <span className="text-brand-orange text-sm font-bold uppercase tracking-widest">Summer Essentials</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-[#e16d44] leading-[0.9] tracking-tight mb-4">
            Fresh Care For <br />
            <span className="text-[#d1562e]">SUNNY DAYS</span>
          </h2>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-8 py-3 border-2 border-[#d1562e] text-[#d1562e] font-bold text-xl rounded-lg hover:bg-[#d1562e] hover:text-white transition-all"
          >
            NOW LIVE
          </motion.button>
        </div>
        
        {/* Product Images (Right side) */}
        <div className="absolute right-0 bottom-0 top-0 w-1/2 flex items-end justify-center pointer-events-none p-4">
          <div className="relative w-full h-full flex items-end justify-center gap-2">
             <img 
               src="https://picsum.photos/seed/bottle1/300/500" 
               alt="Product 1" 
               className="h-[80%] object-contain drop-shadow-2xl z-20 translate-x-12"
               referrerPolicy="no-referrer"
             />
             <img 
               src="https://picsum.photos/seed/bottle2/300/500" 
               alt="Product 2" 
               className="h-[95%] object-contain drop-shadow-2xl z-30"
               referrerPolicy="no-referrer"
             />
             <img 
               src="https://picsum.photos/seed/bottle3/300/500" 
               alt="Product 3" 
               className="h-[70%] object-contain drop-shadow-2xl z-10 -translate-x-12"
               referrerPolicy="no-referrer"
             />
          </div>
        </div>
      </div>
    </div>
  );
};
