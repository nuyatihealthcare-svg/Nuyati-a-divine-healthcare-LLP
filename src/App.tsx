import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NuyatiNavbar } from './components/NuyatiNavbar';
import { FullScreenSection } from './components/FullScreenSection';
import { NuyatiProduct } from './components/NuyatiProduct';
import { NuyatiComments } from './components/NuyatiComments';
import { CursorSoap } from './components/CursorSoap';
import { Leaf, Instagram, Facebook, X, Star } from 'lucide-react';

const RevealUp: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [avgRating, setAvgRating] = useState(4.8);
  const [totalReviews, setTotalReviews] = useState(108);

  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  useEffect(() => {
    if (userProfile) {
      setShippingDetails({
        name: userProfile.name || '',
        email: userProfile.email || '',
        phone: userProfile.phone || '',
        address: userProfile.address || '',
        city: userProfile.city || '',
        state: userProfile.state || '',
        pincode: userProfile.pincode || ''
      });
    }
  }, [userProfile]);

  const handleRatingUpdate = (avg: number, total: number) => {
    setAvgRating(avg);
    setTotalReviews(total);
  };

  const addToCart = (packSize: number, price: number) => {
    setCartCount(prev => prev + 1);
    setTotalPrice(prev => prev + price);
  };

  const handleBuyNow = (packSize: number, price: number) => {
    // For Buy Now, we set the cart to exactly this selection
    setCartCount(1);
    setTotalPrice(price);
    
    if (!userProfile) {
      alert('Please fill your Profile details for shipping before purchase!');
      setIsProfileOpen(true);
    } else {
      setIsCheckoutOpen(true);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPrice,
          currency: "INR",
        }),
      });

      const orderData = await response.json();

      if (!orderData.id) {
        alert("Failed to create Razorpay order: " + (orderData.details || "Unknown error"));
        return;
      }

      const options = {
        key: (import.meta as any).env.VITE_RAZORPAY_KEY_ID || "rzp_test_SfLAjvuGHZXCIM",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Nuyati Divine Healthcare",
        description: "Alphonso Mango Glow Bar Ritual",
        image: "https://images.unsplash.com/photo-1605264964528-06403738d6dc?q=80&w=1974&auto=format&fit=crop",
        order_id: orderData.id,
        handler: function (response: any) {
          console.log("Payment Success:", response);
          alert('Order Placed Successfully! Payment ID: ' + response.razorpay_payment_id);
          setIsCheckoutOpen(false);
          setCartCount(0);
          setTotalPrice(0);
        },
        prefill: {
          name: shippingDetails.name,
          email: shippingDetails.email,
          contact: shippingDetails.phone,
        },
        notes: {
          address: `${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.state} - ${shippingDetails.pincode}`,
        },
        theme: {
          color: "#354e23",
        },
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("An error occurred while processing the payment.");
    }
  };

  return (
    <div className="min-h-screen bg-nuyati-green text-white selection:bg-nuyati-gold selection:text-black">
      <CursorSoap />
      <NuyatiNavbar 
        cartCount={cartCount} 
        totalPrice={totalPrice}
        isProfileOpen={isProfileOpen} 
        setIsProfileOpen={setIsProfileOpen}
        onProfileSave={(data) => setUserProfile(data)}
        onCheckout={() => {
          if (cartCount > 0) handleBuyNow(0, totalPrice);
        }}
      />

      <main>
        {/* HERO SECTION */}
        <FullScreenSection image="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop">
          <div className="pt-24">
            <RevealUp>
              <h1 className="serif-xl text-white">Nuyati</h1>
            </RevealUp>
            <RevealUp delay={0.2}>
              <p className="uppercase tracking-[0.3em] text-base md:text-2xl font-bold mb-12 mt-16 text-nuyati-gold">Wellness With Divine Purpose</p>
            </RevealUp>
            <RevealUp delay={0.4}>
              <div className="flex flex-col gap-4 text-center items-center">
                <h2 className="text-2xl md:text-4xl max-w-4xl mx-auto leading-relaxed font-light">
                  Awaken your senses with nature's golden gift.
                </h2>
                <h3 className="text-xl md:text-3xl max-w-4xl mx-auto leading-relaxed font-light opacity-80 italic">
                  Discover the Alphonso Mango Glow Bar
                </h3>
              </div>
            </RevealUp>
          </div>
        </FullScreenSection>

        {/* PHILOSOPHY SECTION */}
        <FullScreenSection image="https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2070&auto=format&fit=crop">
          <RevealUp>
            <h2 className="serif-title mb-16 md:mb-24">Our Philosophy</h2>
          </RevealUp>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            <RevealUp delay={0.2}>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white/95 backdrop-blur-md p-8 md:p-12 rounded-lg h-full cursor-pointer transition-all shadow-xl group"
              >
                <h3 className="text-nuyati-green text-2xl font-bold italic mb-6 group-hover:text-nuyati-red transition-colors">Mind</h3>
                <p className="text-nuyati-green/80 text-lg italic leading-relaxed">
                  "Experience a sanctuary of mental clarity... where the spirit meets the senses."
                </p>
              </motion.div>
            </RevealUp>
            <RevealUp delay={0.4}>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white/95 backdrop-blur-md p-8 md:p-12 rounded-lg h-full border-2 border-nuyati-gold cursor-pointer transition-all shadow-xl group"
              >
                <h3 className="text-nuyati-green text-2xl font-bold italic mb-6 group-hover:text-nuyati-red transition-colors">Body</h3>
                <p className="text-nuyati-green/80 text-lg italic leading-relaxed">
                  "Your body is your temple... engineered with bio-active nutrients."
                </p>
              </motion.div>
            </RevealUp>
            <RevealUp delay={0.6}>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white/95 backdrop-blur-md p-8 md:p-12 rounded-lg h-full cursor-pointer transition-all shadow-xl group"
              >
                <h3 className="text-nuyati-green text-2xl font-bold italic mb-6 group-hover:text-nuyati-red transition-colors">Soul</h3>
                <p className="text-nuyati-green/80 text-lg italic leading-relaxed">
                  "Care that transcends the skin. Built on radical transparency."
                </p>
              </motion.div>
            </RevealUp>
          </div>
        </FullScreenSection>

        {/* RITUAL SECTION */}
        <FullScreenSection image="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop">
          <RevealUp>
            <div className="flex justify-center mb-10">
               <Leaf size={80} className="opacity-40" />
            </div>
          </RevealUp>
          <RevealUp delay={0.2}>
            <h2 className="serif-title mb-8">The Ritual of Radiance</h2>
          </RevealUp>
          <RevealUp delay={0.4}>
            <p className="text-xl md:text-3xl opacity-90 font-light tracking-wide">
              Pure Alphonso Mango Essence. Hand-crafted for the Soul.
            </p>
          </RevealUp>
        </FullScreenSection>

        {/* PRODUCT SECTION */}
        <NuyatiProduct 
          onAddToCart={addToCart} 
          onBuyNow={handleBuyNow} 
          avgRating={avgRating}
          totalReviews={totalReviews}
        />

        {/* COMMENTS SECTION */}
        <NuyatiComments onRatingUpdate={handleRatingUpdate} />

        {/* FOOTER SECTION */}
        <FullScreenSection image="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop">
          <div className="pt-40 pb-20 flex flex-col items-center justify-center min-h-[60vh]">
            <RevealUp>
              <h2 className="serif-title mb-12 text-white drop-shadow-lg">Thank you for choosing Nature!</h2>
            </RevealUp>
            <RevealUp delay={0.2}>
              <p className="text-xl md:text-3xl opacity-90 mb-20 max-w-3xl mx-auto font-light leading-relaxed italic">
                Nuyati is always at your service, bringing nature's finest gifts directly to your skin.
              </p>
            </RevealUp>
            <RevealUp delay={0.4}>
              <div className="text-left w-full max-w-md mx-auto space-y-4 p-8 border-l-2 border-nuyati-gold bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10 group cursor-default shadow-2xl">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-widest text-nuyati-gold font-black">Our Home</span>
                    <p className="text-sm opacity-90 font-medium group-hover:text-white transition-colors">Kandivali (W), Mumbai 400067</p>
                  </div>
                  <a href="mailto:nuyatihealthcare@gmail.com" className="flex flex-col gap-1 group/item">
                    <span className="text-[10px] uppercase tracking-widest text-nuyati-gold transition-colors font-black">Divine Support</span>
                    <p className="text-sm opacity-90 font-medium whitespace-nowrap group-hover/item:text-nuyati-gold transition-colors underline decoration-nuyati-gold/30">nuyatihealthcare@gmail.com</p>
                  </a>
                  <div className="flex flex-col gap-1 border-t border-white/10 pt-4">
                    <span className="text-[10px] uppercase tracking-widest text-nuyati-gold font-black">Divine Experience</span>
                    <div className="flex items-center gap-2">
                      <div className="flex text-nuyati-gold">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill={i < Math.floor(avgRating) ? "currentColor" : "none"} className={i < Math.floor(avgRating) ? "" : "opacity-20"} />
                        ))}
                      </div>
                      <p className="text-xs font-bold opacity-80">{avgRating.toFixed(1)} / 5.0 ({totalReviews} Reviews)</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 border-t border-white/10 pt-4">
                    <span className="text-[10px] uppercase tracking-widest text-nuyati-gold font-black">Spiritual Socials</span>
                    <div className="flex items-center gap-6 pt-1">
                      <a href="https://www.instagram.com/nuyati3105/" target="_blank" rel="noopener noreferrer" className="text-white opacity-60 hover:opacity-100 hover:text-nuyati-gold transition-all transform hover:scale-110">
                        <Instagram size={20} />
                      </a>
                      <a href="#" target="_blank" rel="noopener noreferrer" className="text-white opacity-60 hover:opacity-100 hover:text-nuyati-gold transition-all transform hover:scale-110">
                        <Facebook size={20} />
                      </a>
                      <a href="#" target="_blank" rel="noopener noreferrer" className="text-white opacity-60 hover:opacity-100 hover:text-nuyati-gold transition-all transform hover:scale-110">
                        <X size={20} />
                      </a>
                    </div>
                  </div>
              </div>
            </RevealUp>
          </div>
        </FullScreenSection>
      </main>

      <div className="fixed bottom-8 right-8 z-[1000]">
        <a href="https://www.instagram.com/nuyati3105/" target="_blank" rel="noopener noreferrer">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-nuyati-gold text-nuyati-green p-4 rounded-full shadow-2xl"
          >
            <Instagram size={24} />
          </motion.button>
        </a>
      </div>

      {/* PAYMENT GATEWAY MODAL SIMULATION */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute inset-0 bg-nuyati-green/90 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden text-nuyati-green max-h-[90vh] flex flex-col"
            >
              <div className="bg-nuyati-cream p-4 text-center border-b border-nuyati-green/5 shrink-0">
                <div className="w-10 h-10 bg-nuyati-gold rounded-full flex items-center justify-center mx-auto mb-2">
                  <Leaf className="text-nuyati-green" size={20} />
                </div>
                <h2 className="serif-title text-xl mb-1 italic">Divine Checkout</h2>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Shipping & Billing Ritual</p>
              </div>
              
              <div className="p-6 overflow-y-auto space-y-6">
                <div className="space-y-3 bg-nuyati-green/5 p-4 rounded-lg">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium">Nuyati Glow Bar Cart ({cartCount} {cartCount === 1 ? 'Pack' : 'Packs'})</span>
                    <span className="font-bold">Rs. {totalPrice}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="opacity-60">Divine Shipping</span>
                    <span className="font-black text-nuyati-green tracking-widest text-[10px]">FREE</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-nuyati-gold/30">
                    <span className="text-sm font-bold uppercase tracking-tighter">Amount to Transfer</span>
                    <span className="text-xl font-black text-red-700">Rs. {totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black tracking-widest opacity-40 ml-1">Full Divine Name</label>
                      <input 
                        type="text" 
                        value={shippingDetails.name}
                        onChange={(e) => setShippingDetails(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-gray-50 border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-nuyati-gold outline-none"
                        placeholder="Aditi Sharma"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black tracking-widest opacity-40 ml-1">Email ID</label>
                      <input 
                        type="email" 
                        value={shippingDetails.email}
                        onChange={(e) => setShippingDetails(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-gray-50 border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-nuyati-gold outline-none"
                        placeholder="sharma.aditi@nuyati.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black tracking-widest opacity-40 ml-1">Phone Number</label>
                      <input 
                        type="tel" 
                        value={shippingDetails.phone}
                        onChange={(e) => setShippingDetails(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-gray-50 border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-nuyati-gold outline-none"
                        placeholder="+91 98XXX XXXXX"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black tracking-widest opacity-40 ml-1">Pincode</label>
                      <input 
                        type="text" 
                        value={shippingDetails.pincode}
                        onChange={(e) => setShippingDetails(prev => ({ ...prev, pincode: e.target.value }))}
                        className="w-full bg-gray-50 border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-nuyati-gold outline-none"
                        placeholder="4000XX"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black tracking-widest opacity-40 ml-1">Sacred Delivery Address</label>
                    <textarea 
                      value={shippingDetails.address}
                      onChange={(e) => setShippingDetails(prev => ({ ...prev, address: e.target.value }))}
                      rows={2}
                      className="w-full bg-gray-50 border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-nuyati-gold outline-none resize-none"
                      placeholder="Apartment, Street, Landmark..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black tracking-widest opacity-40 ml-1">City</label>
                      <input 
                        type="text" 
                        value={shippingDetails.city}
                        onChange={(e) => setShippingDetails(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full bg-gray-50 border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-nuyati-gold outline-none"
                        placeholder="Mumbai"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black tracking-widest opacity-40 ml-1">State</label>
                      <input 
                        type="text" 
                        value={shippingDetails.state}
                        onChange={(e) => setShippingDetails(prev => ({ ...prev, state: e.target.value }))}
                        className="w-full bg-gray-50 border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-nuyati-gold outline-none"
                        placeholder="Maharashtra"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 pb-2">
                  <button 
                    onClick={handlePayment}
                    disabled={!shippingDetails.name || !shippingDetails.address || !shippingDetails.phone}
                    className="w-full bg-nuyati-gold text-nuyati-green py-4 rounded-lg font-black uppercase tracking-[0.2em] shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all text-sm disabled:opacity-30 disabled:hover:scale-100"
                  >
                    Proceed to Divine Payment
                  </button>
                  <p className="text-[9px] text-center mt-3 opacity-40 font-medium">You will be redirected to our secure payment partner</p>
                  <button 
                    onClick={() => setIsCheckoutOpen(false)}
                    className="w-full text-[9px] uppercase font-bold tracking-widest opacity-40 hover:opacity-100 transition-opacity mt-4"
                  >
                    Return to Ritual
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
