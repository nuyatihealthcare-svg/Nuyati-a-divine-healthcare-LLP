import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Send, X, Star } from 'lucide-react';

interface Comment {
  id: string;
  name: string;
  text: string;
  rating: number;
  image?: string;
  date: string;
}

interface NuyatiCommentsProps {
  onRatingUpdate?: (avgRating: number, totalReviews: number) => void;
}

export const NuyatiComments: React.FC<NuyatiCommentsProps> = ({ onRatingUpdate }) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      name: 'Aisha V.',
      text: 'The Alphonso Mango Glow Bar is literally heaven in a box. My skin has never felt this hydrated and radiant!',
      rating: 5,
      date: 'Oct 12, 2023',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1974&auto=format&fit=crop'
    },
    {
      id: '2',
      name: 'Rohan M.',
      text: 'Divine purpose indeed. The fragrance is so authentic, it takes me back to the mango orchards of Ratnagiri.',
      rating: 4,
      date: 'Oct 15, 2023'
    }
  ]);

  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Notify parent of ratings when comments change
  useEffect(() => {
    if (onRatingUpdate) {
      const total = comments.length;
      if (total === 0) {
        onRatingUpdate(0, 0);
        return;
      }
      const sum = comments.reduce((acc, curr) => acc + curr.rating, 0);
      onRatingUpdate(sum / total, total);
    }
  }, [comments, onRatingUpdate]);

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newComment) return;

    const comment: Comment = {
      id: Date.now().toString(),
      name: newName,
      text: newComment,
      rating: newRating,
      image: selectedImage || undefined,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const updatedComments = [comment, ...comments];
    setComments(updatedComments);
    
    setNewName('');
    setNewComment('');
    setNewRating(5);
    setSelectedImage(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <section className="bg-nuyati-cream py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="serif-title text-nuyati-green mb-4">Divine Experiences</h2>
            <p className="text-nuyati-green/60 uppercase tracking-[0.3em] text-xs font-bold">Shared Rituals & Kind Words</p>
          </motion.div>
        </div>

        {/* COMMENT FORM */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl mb-16 border border-nuyati-green/5"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-nuyati-green/40">Your Name</label>
                  <input 
                    type="text" 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Divine Soul"
                    className="w-full bg-nuyati-cream/30 border-b-2 border-nuyati-green/10 py-3 px-1 focus:border-nuyati-gold transition-colors outline-none text-nuyati-green font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-nuyati-green/40">Spiritual Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className={`transition-all ${newRating >= star ? 'text-nuyati-gold scale-110' : 'text-nuyati-green/10 hover:text-nuyati-gold/40'}`}
                      >
                        <Star size={24} fill={newRating >= star ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-nuyati-green/40">Your Experience</label>
                <textarea 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your ritual..."
                  rows={4}
                  className="w-full bg-nuyati-cream/30 border-b-2 border-nuyati-green/10 py-3 px-1 focus:border-nuyati-gold transition-colors outline-none text-nuyati-green font-medium resize-none"
                />
              </div>
            </div>

            {/* IMAGE UPLOADER */}
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${
                isDragging ? 'border-nuyati-gold bg-nuyati-gold/5 scale-[0.98]' : 'border-nuyati-green/10 hover:border-nuyati-gold hover:bg-nuyati-gold/5'
              }`}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={onFileChange} 
                className="hidden" 
                accept="image/*"
              />
              
              <AnimatePresence mode="wait">
                {selectedImage ? (
                  <motion.div 
                    key="preview"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative group w-full"
                  >
                    <img src={selectedImage} alt="Preview" className="w-full h-48 object-cover rounded-lg shadow-md" />
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(null);
                      }}
                      className="absolute top-2 right-2 bg-nuyati-red text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                    <p className="text-[10px] mt-2 text-center text-nuyati-green/40 uppercase tracking-widest font-bold">Image selected. Click to change.</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="bg-nuyati-gold/20 p-4 rounded-full mb-2">
                       <Camera className="text-nuyati-green" size={24} />
                    </div>
                    <p className="text-sm font-bold text-nuyati-green/60">Drag & drop your product photo</p>
                    <p className="text-[10px] text-nuyati-green/30 uppercase tracking-widest font-black">or click to browse</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-nuyati-green text-white py-5 rounded-lg font-black uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!newName || !newComment}
            >
              <Send size={18} />
              Share Experience
            </motion.button>
          </form>
        </motion.div>

        {/* COMMENTS LIST */}
        <div className="space-y-8">
          <AnimatePresence initial={false}>
            {comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/50 border border-nuyati-green/5 p-8 rounded-2xl flex flex-col md:flex-row gap-8 items-start group hover:bg-white/80 transition-colors shadow-sm hover:shadow-md"
              >
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-nuyati-gold rounded-full flex items-center justify-center text-nuyati-green font-black">
                        {comment.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-nuyati-green">{comment.name}</h4>
                        <div className="flex gap-2 items-center">
                          <span className="text-[10px] text-nuyati-gold bg-nuyati-green px-2 py-0.5 rounded uppercase font-black tracking-widest leading-none">Verified Soul</span>
                          <div className="flex text-nuyati-gold">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={10} fill={i < comment.rating ? "currentColor" : "none"} className={i < comment.rating ? "" : "opacity-20"} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs opacity-30 font-medium">{comment.date}</span>
                  </div>
                  <p className="text-nuyati-green/70 italic leading-relaxed text-lg">"{comment.text}"</p>
                </div>
                {comment.image && (
                  <div className="w-full md:w-48 h-48 flex-shrink-0">
                    <img 
                      src={comment.image} 
                      alt="User uploaded content" 
                      className="w-full h-full object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
