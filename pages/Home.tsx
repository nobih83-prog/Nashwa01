
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCcw, User } from 'lucide-react';
import { Product } from '../types';
import { MOCK_PRODUCTS, CONTACT_INFO } from '../constants';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

const LOGO_URL = "https://ui-avatars.com/api/?name=N&background=065f46&color=fff&font-size=0.5&bold=true";

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
          <div className="absolute top-40 left-10 w-16 h-16 border-4 border-white opacity-40 rotate-45 hidden lg:block"></div>

          {/* Left: Image Area */}
          <div className="w-full md:w-1/2 relative z-10 h-full flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] md:aspect-auto md:h-[80%] rounded-[2rem] md:rounded-none overflow-hidden md:overflow-visible">
              {/* Background Orange Splash */}
              <div className="absolute inset-0 bg-[#F59E0B] -translate-x-4 translate-y-4 md:translate-x-12 md:translate-y-12 rounded-[2rem] opacity-90"></div>
              
              {/* Main Model Image - Online Photo */}
              <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80" 
                className="relative w-full h-full object-cover rounded-[2rem] shadow-2xl z-20"
                alt="Nashwa Summer Collection"
              />
              
              {/* Floating Element */}
              <div className="absolute -bottom-8 -right-8 w-24 h-24 md:w-32 md:h-32 z-30 hidden sm:block">
                <div className="w-full h-full bg-[#FF7E5F] rounded-2xl rotate-12 flex items-center justify-center text-white shadow-xl">
                   <Sparkles size={48} className="animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text & CTA Area */}
          <div className="w-full md:w-1/2 mt-12 md:mt-0 text-center md:text-left z-20">
            <div className="max-w-xl md:pl-12">
              <h2 className="script-font text-5xl md:text-7xl lg:text-8xl text-gray-900 mb-4 md:mb-6 animate-fade-in-down drop-shadow-sm">
                Summer is coming.
              </h2>
              
              {/* Brand Banner Block with Logo */}
              <div className="bg-[#F59E0B] inline-flex px-8 py-8 md:px-12 md:py-10 mb-8 md:mb-12 shadow-lg rounded-[2.5rem] items-center justify-center">
                <img 
                  src={LOGO_URL} 
                  alt="Nashwa" 
                  className="h-16 w-16 md:h-24 md:w-24 object-contain rounded-3xl shadow-2xl border-4 border-white/30" 
                />
              </div>

              <div className="flex flex-col items-center md:items-start gap-8">
                <Link 
                  to="/shop" 
                  className="hero-3d-button bg-[#26B8C5] hover:bg-[#1D8A95] text-white px-12 py-5 rounded-xl font-bold text-2xl uppercase tracking-widest transition-all flex items-center gap-3 active:translate-y-1"
                >
                  Shop Now
                </Link>
                
                {/* Secondary Mini Info */}
                <div className="flex items-center gap-6 text-gray-600">
                  <div className="flex flex-col items-center md:items-start">
                    <span className="text-2xl font-black text-[#F59E0B]">40% OFF</span>
                    <span className="text-xs font-bold uppercase tracking-widest">Seasonal Sale</span>
                  </div>
                  <div className="w-px h-10 bg-gray-300"></div>
                  <div className="flex flex-col items-center md:items-start">
                    <span className="text-2xl font-black text-[#26B8C5]">FREE</span>
                    <span className="text-xs font-bold uppercase tracking-widest">Dhaka Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 w-full grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-green-50 text-[#065F46] rounded-full flex items-center justify-center mb-4">
            <Truck size={24} />
          </div>
          <h4 className="font-bold mb-2">Fast Shipping</h4>
          <p className="text-sm text-gray-500">Same day delivery in Dhaka</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-green-50 text-[#065F46] rounded-full flex items-center justify-center mb-4">
            <ShieldCheck size={24} />
          </div>
          <h4 className="font-bold mb-2 text-gray-900">Safe Payment</h4>
          <p className="text-sm text-gray-500">Secure transactions always</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-green-50 text-[#065F46] rounded-full flex items-center justify-center mb-4">
            <RefreshCcw size={24} />
          </div>
          <h4 className="font-bold mb-2">Easy Returns</h4>
          <p className="text-sm text-gray-500">7-day return policy</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-green-50 text-[#065F46] rounded-full flex items-center justify-center mb-4">
            <User size={24} />
          </div>
          <h4 className="font-bold mb-2">24/7 Support</h4>
          <p className="text-sm text-gray-500">Friendly customer service</p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Trending Now</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Hand-picked bestsellers that our customers can't get enough of this week.</p>
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

      {/* Quick View Modal */}
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
