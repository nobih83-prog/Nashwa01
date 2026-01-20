
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCcw, User } from 'lucide-react';
import { Product } from '../types';
import { MOCK_PRODUCTS, CONTACT_INFO } from '../constants';
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
          <div className="absolute top-40 left-10 w-16 h-16 border-4 border-white opacity-40 rotate-45 hidden lg:block"></div>

          {/* Left: Image Area */}
          <div className="w-full md:w-1/2 relative z-10 h-full flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] md:aspect-auto md:h-[80%] rounded-[2rem] md:rounded-none overflow-hidden md:overflow-visible">
              {/* Background Orange Splash */}
              <div className="absolute inset-0 bg-[#F59E0B] -translate-x-4 translate-y-4 md:translate-x-12 md:translate-y-12 rounded-[2rem] opacity-90"></div>
              
              {/* Main Model Image */}
              <img 
                src="hero-bg.jpg" 
                className="relative w-full h-full object-cover rounded-[2rem] shadow-2xl z-20"
                alt="Summer Fashion"
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
              <div className="bg-[#F59E0B] inline-block px-10 py-3 md:px-16 md:py-5 mb-8 md:mb-12 shadow-lg">
                <img 
                  src="nashwa-logo.png" 
                  alt={CONTACT_INFO.name} 
                  className="h-12 md:h-20 w-auto brightness-0 invert" 
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

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">Browse by Category</h2>
            <p className="text-gray-500">Find exactly what you are looking for</p>
          </div>
          <Link to="/shop" className="text-[#065F46] font-bold flex items-center gap-1 hover:underline">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {['Clothing', 'Jewelry', 'Accessories', 'Shoes'].map((cat, i) => (
            <Link 
              key={cat}
              to={`/shop?cat=${cat}`}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden group"
            >
              <img 
                src={MOCK_PRODUCTS.find(p => p.category === cat)?.image} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={cat}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <h3 className="text-2xl font-bold mb-2">{cat}</h3>
                <span className="text-sm uppercase tracking-widest font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all">Explore Category</span>
              </div>
            </Link>
          ))}
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

      {/* Promo Section */}
      <section className="bg-[#065F46] py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-white">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Join the Nashwa Elite</h2>
            <p className="text-lg text-green-100 mb-8 leading-relaxed">
              Subscribe to our newsletter to receive early access to new collections, exclusive discounts, and fashion styling tips from our experts.
            </p>
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={e => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address"
                className="flex-grow bg-white/10 border border-white/20 rounded-full px-6 py-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-[#065F46] px-8 py-4 rounded-full font-bold hover:bg-green-50 transition-colors">
                Subscribe Now
              </button>
            </form>
          </div>
          <div className="relative">
             <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
               <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover" alt="Lifestyle" />
             </div>
             <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
               <div className="text-[#065F46] font-bold text-3xl mb-1">10k+</div>
               <div className="text-gray-500 text-sm">Happy Customers</div>
             </div>
          </div>
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
