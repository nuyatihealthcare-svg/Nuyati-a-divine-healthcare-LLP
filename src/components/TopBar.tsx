import React from 'react';
import { Copy } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-brand-orange text-white py-1.5 px-4 text-xs font-medium flex justify-between items-center">
      <div className="flex-1 text-center sm:text-left">
        on all orders above Rs.999
      </div>
      <div className="hidden sm:flex items-center gap-2 border border-white/30 px-2 py-0.5 rounded cursor-pointer hover:bg-white/10 transition-colors">
        <span className="opacity-90">NEWHABIT250</span>
        <Copy size={12} />
      </div>
    </div>
  );
};
