import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  tag?: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Teak Wood Foot Scrubber',
    price: 349,
    originalPrice: 450,
    image: 'https://picsum.photos/seed/soap-p1/400/400',
    rating: 4.8,
    reviews: 120,
    tag: 'Bestseller'
  },
  {
    id: '2',
    name: 'Fresh Tikta Face Wash',
    price: 490,
    originalPrice: 550,
    image: 'https://picsum.photos/seed/soap-p2/400/400',
    rating: 4.9,
    reviews: 85,
    tag: 'Pure'
  },
  {
    id: '3',
    name: 'Brightening Ksheer Lepa',
    price: 520,
    originalPrice: 600,
    image: 'https://picsum.photos/seed/soap-p3/400/400',
    rating: 5.0,
    reviews: 210,
    tag: 'New'
  },
  {
    id: '4',
    name: 'Moisturising Gulab Jal',
    price: 299,
    originalPrice: 350,
    image: 'https://picsum.photos/seed/soap-p4/400/400',
    rating: 4.7,
    reviews: 156
  }
];

export const ProductList: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold italic font-serif">Freshly Made For You</h3>
        <button className="text-brand-orange font-bold text-sm underline decoration-2 underline-offset-4">VIEW ALL</button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-50 mb-4">
              {product.tag && (
                <div className="absolute top-2 left-2 bg-brand-orange text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase z-10">
                  {product.tag}
                </div>
              )}
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <button className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                <ShoppingCart size={20} className="text-brand-orange" />
              </button>
            </div>
            
            <div className="flex items-center gap-1 mb-1">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="text-[11px] font-bold">{product.rating}</span>
              <span className="text-[11px] text-gray-400">({product.reviews})</span>
            </div>
            
            <h4 className="text-sm font-bold text-gray-800 mb-1 leading-tight">{product.name}</h4>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold">Rs.{product.price}</span>
              <span className="text-xs text-gray-400 line-through">Rs.{product.originalPrice}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
