import React, { useState, useRef, useEffect } from 'react';
import { Menu, Instagram, User, ShoppingBag, X, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NuyatiNavbarProps {
  cartCount: number;
  totalPrice: number;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  onProfileSave: (data: any) => void;
  onCheckout: () => void;
}

export const NuyatiNavbar: React.FC<NuyatiNavbarProps> = ({ 
  cartCount, 
  totalPrice,
  isProfileOpen, 
  setIsProfileOpen,
  onProfileSave,
  onCheckout
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    landmark: '',
    pincode: ''
  });

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    if (isCartOpen || isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCartOpen, isProfileOpen]);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProfileSave(formData);
    alert('Profile information saved for tracking and shipping!');
    setIsProfileOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-5xl z-[1000] px-6 md:px-10 py-4 flex justify-between items-center bg-nuyati-green/40 backdrop-blur-md rounded-full border border-white/10 shadow-2xl">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-4 cursor-pointer group"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Menu className="text-xl transition-transform group-hover:rotate-90" />
        <span className="font-bold tracking-[0.2em] text-[10px] md:text-sm group-hover:text-nuyati-gold transition-colors whitespace-nowrap">
          NUYATI A DIVINE HEALTHCARE
        </span>
      </motion.div>
      <div className="flex gap-4 md:gap-6 items-center">
        <motion.button 
          whileHover={{ scale: 1.2, color: "var(--color-nuyati-gold)" }} 
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <a href="https://www.instagram.com/nuyati3105/" target="_blank" rel="noopener noreferrer">
            <Instagram size={18} className="cursor-pointer" />
          </a>
        </motion.button>
        
        <div className="relative" ref={profileRef}>
          <motion.button 
            whileHover={{ scale: 1.2, color: "var(--color-nuyati-gold)" }} 
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <User size={18} className="cursor-pointer" />
          </motion.button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-12 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-nuyati-green/10 overflow-hidden text-nuyati-green"
              >
                <div className="p-5 border-b border-nuyati-green/5 flex justify-between items-center bg-nuyati-cream/30">
                  <h3 className="font-bold uppercase tracking-widest text-xs">Divine Profile</h3>
                  <button onClick={() => setIsProfileOpen(false)} className="opacity-40 hover:opacity-100 transition-opacity">
                    <X size={16} />
                  </button>
                </div>

                <form onSubmit={handleProfileSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto no-scrollbar">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black tracking-widest opacity-40">Full Name</label>
                    <input 
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-nuyati-green/5 border-b border-nuyati-green/10 py-2 px-3 focus:border-nuyati-gold outline-none transition-colors text-sm font-medium" 
                      placeholder="e.g. John Doe" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black tracking-widest opacity-40">Email Address</label>
                      <input 
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-nuyati-green/5 border-b border-nuyati-green/10 py-2 px-3 focus:border-nuyati-gold outline-none transition-colors text-sm font-medium" 
                        placeholder="john@example.com" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black tracking-widest opacity-40">Phone Number</label>
                      <input 
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-nuyati-green/5 border-b border-nuyati-green/10 py-2 px-3 focus:border-nuyati-gold outline-none transition-colors text-sm font-medium" 
                        placeholder="+91..." 
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black tracking-widest opacity-40">Complete Address</label>
                    <textarea 
                      required
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full bg-nuyati-green/5 border-b border-nuyati-green/10 py-2 px-3 focus:border-nuyati-gold outline-none transition-colors text-sm font-medium resize-none" 
                      placeholder="House No, Street, Area..." 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black tracking-widest opacity-40">Landmark</label>
                      <input 
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleInputChange}
                        className="w-full bg-nuyati-green/5 border-b border-nuyati-green/10 py-2 px-3 focus:border-nuyati-gold outline-none transition-colors text-sm font-medium" 
                        placeholder="Near..." 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black tracking-widest opacity-40">Pincode</label>
                      <input 
                        required
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full bg-nuyati-green/5 border-b border-nuyati-green/10 py-2 px-3 focus:border-nuyati-gold outline-none transition-colors text-sm font-medium" 
                        placeholder="400001" 
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-nuyati-green text-white py-4 font-black uppercase tracking-widest text-xs hover:bg-nuyati-green/90 transition-all shadow-lg active:scale-95"
                  >
                    Save Profile Details
                  </button>
                  <p className="text-[10px] text-center opacity-40 italic">This information enables seamless tracking & shipping rituals.</p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative" ref={cartRef}>
          <motion.button 
            whileHover={{ scale: 1.2, color: "var(--color-nuyati-gold)" }} 
            transition={{ type: "spring", stiffness: 400, damping: 10 }} 
            className="relative group/cart"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <ShoppingBag size={18} className="cursor-pointer" />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={cartCount}
                className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-nuyati-red text-white text-[10px] flex items-center justify-center rounded-full shadow-lg font-bold px-1"
              >
                {cartCount}
              </motion.span>
            )}
            {cartCount === 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-nuyati-red/50 rounded-full" />}
          </motion.button>

          <AnimatePresence>
            {isCartOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-2xl border border-nuyati-green/10 overflow-hidden text-nuyati-green"
              >
                <div className="p-4 border-b border-nuyati-green/5 flex justify-between items-center bg-nuyati-cream/30">
                  <h3 className="font-bold uppercase tracking-widest text-xs">Your divine Cart</h3>
                  <button onClick={() => setIsCartOpen(false)} className="opacity-40 hover:opacity-100 transition-opacity">
                    <X size={16} />
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto p-4 flex flex-col gap-4 no-scrollbar">
                  {cartCount > 0 ? (
                    <div className="flex gap-4 items-start pb-4 border-b border-nuyati-green/5 last:border-0">
                      <div className="w-16 h-16 bg-nuyati-cream rounded flex-shrink-0 flex items-center justify-center">
                        <img 
                          src="https://images.unsplash.com/photo-1605264964528-06403738d6dc?q=80&w=1974&auto=format&fit=crop" 
                          alt="Soap" 
                          className="w-12 h-12 object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-[10px] uppercase leading-tight">Alphonso Mango Glow Bar</h4>
                          <span className="text-[10px] font-bold">Rs. 160</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] opacity-60 italic">Quantity: {cartCount}</span>
                          <button className="text-nuyati-red opacity-40 hover:opacity-100 transition-opacity">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center flex flex-col items-center gap-3">
                      <ShoppingBag size={32} className="opacity-10" />
                      <p className="text-sm opacity-60 italic">Your cart is as empty as a winter morning.</p>
                      <button 
                        onClick={() => {
                          setIsCartOpen(false);
                          const el = document.getElementById('product');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-[10px] underline uppercase tracking-widest font-bold hover:text-nuyati-red transition-colors"
                      >
                        Start shopping
                      </button>
                    </div>
                  )}
                </div>

                {cartCount > 0 && (
                  <div className="p-4 bg-nuyati-green/5 space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium">Subtotal</span>
                      <span className="font-bold">Rs. {totalPrice}</span>
                    </div>
                    <button 
                      className="w-full bg-[#ffff00] text-black py-4 font-black uppercase tracking-widest text-xs hover:bg-yellow-400 transition-colors shadow-lg"
                      onClick={() => {
                        setIsCartOpen(false);
                        onCheckout();
                      }}
                    >
                      Complete Purchase
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};
