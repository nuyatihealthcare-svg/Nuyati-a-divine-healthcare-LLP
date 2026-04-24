import React from 'react';
import { Search, Heart, ShoppingBag, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const navItems = [
    'Trending 🔥', 'Summer Care', 'Hair', 'Face', 'Body', 
    'Eyes & Lips', 'Baby', 'Hair Fall', 'Men', 'Gifting ✨', 
    'Concern', 'Ingredients'
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold tracking-tighter text-black leading-none">nat habit</h1>
          <span className="text-[8px] uppercase tracking-widest text-gray-500 font-bold">BREATHE LIFE</span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6 overflow-x-auto no-scrollbar">
          {navItems.map((item) => (
            <a 
              key={item} 
              href="#" 
              className="whitespace-nowrap text-[13px] font-medium text-gray-600 hover:text-black transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-5">
          <Search size={22} className="text-gray-700 cursor-pointer hover:text-black" />
          <Heart size={22} className="text-gray-700 cursor-pointer hover:text-black hidden sm:block" />
          <ShoppingBag size={22} className="text-gray-700 cursor-pointer hover:text-black" />
          <User size={22} className="text-gray-700 cursor-pointer hover:text-black hidden sm:block" />
        </div>
      </div>
      
      {/* Mobile Nav Links (Scrollable) */}
      <div className="lg:hidden flex items-center gap-5 overflow-x-auto no-scrollbar pt-3 border-t border-gray-50 mt-2">
        {navItems.map((item) => (
          <a 
            key={item} 
            href="#" 
            className="whitespace-nowrap text-[12px] font-medium text-gray-500"
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
};
