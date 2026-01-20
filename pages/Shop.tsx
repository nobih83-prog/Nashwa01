
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, Search, Grid, List, ChevronRight, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

interface ShopProps {
  addToCart: (p: Product, quantity?: number) => void;
  searchQuery?: string;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
}

const Shop: React.FC<ShopProps> = ({ addToCart, searchQuery = '', wishlist, toggleWishlist }) => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'All';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('Featured');
  const [priceRange, setPriceRange] = useState(10000);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    setSelectedCategory(searchParams.get('cat') || 'All');
  }, [searchParams]);

  const categories = ['All', 'Clothing', 'Jewelry', 'Accessories', 'Shoes'];

  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];
    
    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    // Filter by Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    
    // Filter by Price
    result = result.filter(p => p.price <= priceRange);
    
    // Sorting
    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Newest') {
      result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }
    
    return result;
  }, [selectedCategory, sortBy, priceRange, searchQuery]);

  return (
    <div className="bg-white min-h-screen">
      {/* Category Header Landing Style */}
      <div className="bg-gray-50 border-b py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">
            <Link to="/" className="hover:text-[#065F46]">Home</Link>
            <ChevronRight size={12} />
            <span className="text-gray-900 font-bold">{selectedCategory}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold brand-font text-gray-900 mb-4 uppercase tracking-wider">
            {selectedCategory === 'All' ? 'Full Collection' : selectedCategory}
          </h1>
          <p className="text-gray-500 max-w-2xl text-sm md:text-base">
            Discover our curated selection of premium {selectedCategory.toLowerCase()} pieces designed for elegance and comfort.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Mobile Filter Category Ribbon */}
        <div className="lg:hidden -mx-4 px-4 pb-6 overflow-x-auto no-scrollbar flex items-center gap-3 border-b border-gray-100 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                selectedCategory === cat 
                  ? 'bg-[#065F46] text-white shadow-lg shadow-green-900/20' 
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-12">
            <section>
              <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`group w-full flex items-center justify-between text-left py-2.5 transition-all ${
                      selectedCategory === cat 
                        ? 'text-[#065F46] font-bold border-l-4 border-[#065F46] pl-4' 
                        : 'text-gray-600 hover:text-black hover:pl-2'
                    }`}
                  >
                    <span className="uppercase text-xs tracking-widest">{cat}</span>
                    <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600">
                      {cat === 'All' ? MOCK_PRODUCTS.length : MOCK_PRODUCTS.filter(p => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-gray-400 mb-8">Refine by Price</h3>
              <div className="px-2">
                <input 
                  type="range" 
                  min="500" 
                  max="10000" 
                  step="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#065F46]"
                />
                <div className="flex justify-between mt-6">
                  <div className="bg-gray-50 border rounded p-2 text-xs text-gray-500">
                     ৳ 500
                  </div>
                  <div className="bg-gray-50 border rounded p-2 text-xs text-[#065F46] font-bold">
                     ৳ {priceRange.toLocaleString()}
                  </div>
                </div>
              </div>
            </section>

            <div className="p-8 bg-[#065F46] rounded-2xl text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                 <ShoppingCart size={80} />
               </div>
               <h4 className="font-bold text-lg mb-2 relative z-10">Premium Member?</h4>
               <p className="text-sm text-green-100/70 mb-6 relative z-10">Sign in to get extra 10% discount on luxury sarees.</p>
               <Link 
                 to="/login" 
                 className="block w-full bg-white text-[#065F46] py-3 rounded-xl font-bold text-xs uppercase tracking-widest relative z-10 shadow-lg text-center hover:bg-green-50 transition-colors"
               >
                 Login Now
               </Link>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-grow">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                 <p className="text-gray-500 text-sm font-medium">
                  Showing <span className="text-gray-900 font-bold">{filteredProducts.length}</span> luxury pieces
                 </p>
                 {searchQuery && (
                   <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-500">
                     Results for "{searchQuery}"
                   </span>
                 )}
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest shrink-0">Sort By</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-[#065F46] w-full sm:w-auto border-gray-200 text-gray-700"
                >
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {filteredProducts.map(product => (
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
            ) : (
              <div className="text-center py-32 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Search size={32} className="text-gray-300" />
                </div>
                <h3 className="text-2xl font-bold mb-3 brand-font">No matches found</h3>
                <p className="text-gray-500 max-w-xs mx-auto text-sm leading-relaxed">We couldn't find any products matching your current filters. Try refining your selection.</p>
                <button 
                  onClick={() => { setSelectedCategory('All'); setPriceRange(10000); }}
                  className="mt-8 bg-[#065F46] text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg shadow-green-900/20"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

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

export default Shop;
