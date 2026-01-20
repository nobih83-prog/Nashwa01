
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
  const featured = MOCK_PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <div className="flex flex-col gap-16 md:gap-32 pb-32">
      {/* Summer Hero Section */}
      <section className="relative w-full bg-[#FDF1D3] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 py-12 md:py-0 min-h-[600px] md:h-[750px] flex flex-col md:flex-row items-center">
          
          <div className="absolute top-20 right-[10%] w-32 h-32 border-8 border-white opacity-20 rotate-12 hidden md:block"></div>
          <div className="absolute bottom-20 left-[40%] w-40 h-40 border-8 border-white opacity-20 -rotate-12 hidden md:block"></div>

          {/* Left: Image Area */}
          <div className="w-full md:w-1/2 relative z-10 h-full flex items-center justify-center">
            <div className="relative w-full max-w-lg aspect-[4/5] md:aspect-auto md:h-[85%] rounded-[3rem] md:rounded-none overflow-hidden md:overflow-visible">
              <div className="absolute inset-0 bg-[#F59E0B] -translate-x-6 translate-y-6 md:translate-x-16 md:translate-y-16 rounded-[3rem] opacity-90 shadow-[0_50px_100px_-20px_rgba(245,158,11,0.3)]"></div>
              <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80" 
                className="relative w-full h-full object-cover rounded-[3rem] shadow-2xl z-20 border-8 border-white"
                alt="Nashwa Summer Collection"
              />
              <div className="absolute -bottom-12 -right-12 w-32 h-32 md:w-48 md:h-48 z-30 hidden sm:block">
                <div className="w-full h-full bg-[#065F46] rounded-[2rem] rotate-12 flex items-center justify-center text-white shadow-2xl border-4 border-amber-400">
                   <Sparkles size={64} className="animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text Area */}
          <div className="w-full md:w-1/2 mt-20 md:mt-0 text-center md:text-left z-20 md:pl-20">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-3 bg-amber-400/10 px-4 py-2 rounded-full mb-8 border border-amber-400/20">
                <Sparkles size={16} className="text-amber-600" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-700">Luxury Awaits You</span>
              </div>
              <h2 className="script-font text-6xl md:text-8xl lg:text-9xl text-gray-900 mb-8 animate-fade-in-down drop-shadow-xl">
                Luxe.
              </h2>
              
              <div className="bg-white inline-flex p-10 mb-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] rounded-[3.5rem] items-center justify-center border-4 border-amber-400 transform -rotate-2 hover:rotate-0 transition-all">
                <img 
                  src={LOGO_URL} 
                  alt="Nashwa" 
                  className="h-24 w-24 md:h-40 md:w-40 object-contain" 
                />
              </div>

              <div className="flex flex-col items-center md:items-start gap-12">
                <div className="flex flex-wrap justify-center md:justify-start gap-6">
                  <Link 
                    to="/shop?filter=new" 
                    className="hero-3d-button bg-[#26B8C5] hover:bg-[#1D8A95] text-white px-10 py-5 rounded-2xl font-black text-xl uppercase tracking-widest transition-all flex items-center gap-3 shadow-2xl active:scale-95"
                  >
                    New Arrivals
                  </Link>
                  <Link 
                    to="/shop?filter=best" 
                    className="bg-white text-[#065F46] border-4 border-[#065F46] px-10 py-5 rounded-2xl font-black text-xl uppercase tracking-widest hover:bg-[#065F46] hover:text-white transition-all shadow-xl active:scale-95"
                  >
                    Best Sellers
                  </Link>
                </div>
                
                <div className="flex items-center gap-10 text-gray-600">
                  <div className="flex flex-col items-center md:items-start">
                    <span className="text-3xl font-black text-[#F59E0B]">4.9/5</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">User Rating</span>
                  </div>
                  <div className="w-px h-12 bg-gray-200"></div>
                  <div className="flex flex-col items-center md:items-start">
                    <span className="text-3xl font-black text-[#065F46]">100%</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Authentic</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-[1440px] mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h2 className="text-5xl font-black mb-4 text-gray-900 brand-font uppercase tracking-widest">Editor's Choice</h2>
            <p className="text-gray-400 font-medium text-lg uppercase tracking-widest">The finest pieces of this season</p>
          </div>
          <Link to="/shop" className="group flex items-center gap-3 text-[#065F46] font-black text-sm uppercase tracking-[0.3em] pb-2 border-b-4 border-[#065F46]">
            View All Collection <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
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
