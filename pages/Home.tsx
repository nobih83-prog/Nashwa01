
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCcw, User } from 'lucide-react';
import { Product } from '../types';
import { MOCK_PRODUCTS, CONTACT_INFO, LOGO_URL } from '../constants';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

interface HomeProps {
  addToCart: (p: Product, quantity?: number) => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ addToCart, wishlist, toggleWishlist }) => {
  const featured = MOCK_PRODUCTS.slice(0, 4);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-24">
      {/* Summer Hero Section */}
      <section className="relative w-full bg-[#FDF1D3] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-0 min-h-[500px] md:h-[650px] flex flex-col md:flex-row items-center">
          
          {/* Decorative Square Elements */}
          <div className="absolute top-20 right-[10%] w-24 h-24 border-4 border-white opacity-40 rotate-12 hidden md:block"></div>
          <div className="absolute bottom-20 left-[40%] w-32 h-32 border-4 border-white opacity-40 -rotate-12 hidden md:block"></div>

          {/* Left: Image Area */}
          <div className="w-full md:w-1/2 relative z-10 h-full flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] md:aspect-auto md:h-[80%] rounded-[2rem] md:rounded-none overflow-hidden md:overflow-visible">
              <div className="absolute inset-0 bg-[#F59E0B] -translate-x-4 translate-y-4 md:translate-x-12 md:translate-y-12 rounded-[2rem] opacity-90 shadow-2xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80" 
                className="relative w-full h-full object-cover rounded-[2rem] shadow-2xl z-20"
                alt="Nashwa Summer Collection"
              />
              <div className="absolute -bottom-8 -right-8 w-24 h-24 md:w-32 md:h-32 z-30 hidden sm:block">
                <div className="w-full h-full bg-[#065F46] rounded-2xl rotate-12 flex items-center justify-center text-white shadow-xl border-2 border-amber-400">
                   <Sparkles size={48} className="animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text Area */}
          <div className="w-full md:w-1/2 mt-12 md:mt-0 text-center md:text-left z-20">
            <div className="max-w-xl md:pl-12">
              <h2 className="script-font text-5xl md:text-7xl lg:text-8xl text-gray-900 mb-4 md:mb-6 animate-fade-in-down drop-shadow-sm">
                Summer Luxe.
              </h2>
              
              {/* Brand Banner Block with Custom Logo */}
              <div className="bg-white inline-flex px-8 py-8 md:px-12 md:py-10 mb-8 md:mb-12 shadow-2xl rounded-[3rem] items-center justify-center border-4 border-amber-400">
                <img 
                  src={LOGO_URL} 
                  alt="Nashwa" 
                  className="h-20 w-20 md:h-32 md:w-32 object-contain" 
                />
              </div>

              <div className="flex flex-col items-center md:items-start gap-8">
                <Link 
                  to="/shop" 
                  className="hero-3d-button bg-[#26B8C5] hover:bg-[#1D8A95] text-white px-12 py-5 rounded-2xl font-black text-2xl uppercase tracking-widest transition-all flex items-center gap-3 shadow-lg"
                >
                  Shop Now
                </Link>
                
                <div className="flex items-center gap-6 text-gray-600">
                  <div className="flex flex-col items-center md:items-start">
                    <span className="text-2xl font-black text-[#F59E0B]">NEW</span>
                    <span className="text-xs font-bold uppercase tracking-widest">Arrivals</span>
                  </div>
                  <div className="w-px h-10 bg-gray-300"></div>
                  <div className="flex flex-col items-center md:items-start">
                    <span className="text-2xl font-black text-[#065F46]">BEST</span>
                    <span className="text-xs font-bold uppercase tracking-widest">Sellers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 brand-font uppercase tracking-widest">Trending Now</h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={(p) => addToCart(p)} 
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      </section>

      <QuickViewModal 
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
        wishlist={wishlist}
        onToggleWishlist={toggleWishlist}
      />
    </div>
  );
};

export default Home;
