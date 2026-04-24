import React from 'react';
import { motion } from 'motion/react';

interface Category {
  id: string;
  name: string;
  image: string;
  hasSpecial?: boolean;
}

const categories: Category[] = [
  { id: '1', name: 'Trending 🔥', image: 'https://picsum.photos/seed/soap1/200/200' },
  { id: '2', name: 'Summer Care', image: 'https://picsum.photos/seed/soap2/200/200' },
  { id: '3', name: 'Hair', image: 'https://picsum.photos/seed/soap3/200/200' },
  { id: '4', name: 'Face', image: 'https://picsum.photos/seed/soap4/200/200' },
  { id: '5', name: 'Body', image: 'https://picsum.photos/seed/soap5/200/200' },
  { id: '6', name: 'Analyse Skin', image: 'https://picsum.photos/seed/soap6/200/200' },
  { id: '7', name: 'Eyes & Lips', image: 'https://picsum.photos/seed/soap7/200/200' },
  { id: '8', name: 'Baby', image: 'https://picsum.photos/seed/soap8/200/200' },
  { id: '9', name: 'Hair Fall', image: 'https://picsum.photos/seed/soap9/200/200' },
  { id: '10', name: 'Men', image: 'https://picsum.photos/seed/soap10/200/200' },
  { id: '11', name: 'Gifting ✨', image: 'https://picsum.photos/seed/soap11/200/200' },
];

export const CategoryScroll: React.FC = () => {
  return (
    <div className="py-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-4">
          {categories.map((cat) => (
            <motion.div 
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center min-w-[90px] cursor-pointer"
            >
              <div className="relative w-20 h-20 rounded-full border-2 border-gray-100 p-0.5 mb-2 hover:border-brand-orange transition-colors overflow-hidden">
                <img 
                  src={cat.image} 
                  alt={cat.name}
                  className="w-full h-full rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-[11px] font-semibold text-gray-700 text-center uppercase tracking-tight">
                {cat.name}
              </span>
            </motion.div>
          ))}
        </div>
        
        {/* Scroll Indicator Bar */}
        <div className="w-full h-1 bg-gray-100 rounded-full mt-2 relative">
          <div className="absolute left-0 top-0 h-full w-1/4 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
};
