
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User, Phone, Mail, MapPin, Instagram, Facebook, MessageCircle, ArrowUp, Heart, Sparkles, Home as HomeIcon, ShoppingBag, History, RotateCcw, ChevronRight, Trash2, Minus, Plus, LayoutDashboard, ChevronDown } from 'lucide-react';
import { Product, CartItem, Order } from './types';
import { MOCK_PRODUCTS, CONTACT_INFO, COLORS } from './constants';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import ProductDetail from './pages/ProductDetail';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Ethics from './pages/Ethics';
import ShippingPolicy from './pages/ShippingPolicy';

const LOGO_URL = "https://ui-avatars.com/api/?name=N&background=065f46&color=fff&font-size=0.5&bold=true";

// Component to handle scrolling to top on every route change, including category switches
const ScrollToTop = () => {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return null;
};

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartJump, setCartJump] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('nashwa_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
    
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

    const savedRecent = localStorage.getItem('nashwa_recent_views');
    if (savedRecent) setRecentlyViewed(JSON.parse(savedRecent));

    if (localStorage.getItem('nashwa_auth') === 'true') setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('nashwa_cart', window.JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', window.JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('nashwa_recent_views', window.JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchActive(false);
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = MOCK_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 12); 
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = (status: boolean) => {
    setIsLoggedIn(status);
    localStorage.setItem('nashwa_auth', status.toString());
  };

  const addToCart = (product: Product, quantity: number = 1, selectedOptions?: Record<string, string>) => {
    let finalPrice = product.price;
    if (product.variations && selectedOptions) {
      product.variations.forEach(v => {
        const option = v.options.find(o => o.label === selectedOptions[v.name]);
        if (option?.priceModifier) finalPrice += option.priceModifier;
      });
    }
    setCart(prev => {
      const optionsKey = JSON.stringify(selectedOptions || {});
      const existing = prev.find(item => item.id === product.id && JSON.stringify(item.selectedOptions || {}) === optionsKey);
      if (existing) {
        return prev.map(item => (item.id === product.id && JSON.stringify(item.selectedOptions || {}) === optionsKey) ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, price: finalPrice, quantity, selectedOptions }];
    });
    
    setCartJump(true);
    setTimeout(() => setCartJump(false), 500);
    setIsCartOpen(true);
  };

  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 10);
    });
  };

  const clearRecentlyViewed = () => setRecentlyViewed([]);

  const removeFromCart = (id: string, options?: Record<string, string>) => {
    const optionsKey = JSON.stringify(options || {});
    setCart(prev => prev.filter(item => !(item.id === id && JSON.stringify(item.selectedOptions || {}) === optionsKey)));
  };

  const updateQuantity = (id: string, delta: number, options?: Record<string, string>) => {
    const optionsKey = JSON.stringify(options || {});
    setCart(prev => prev.map(item => (item.id === id && JSON.stringify(item.selectedOptions || {}) === optionsKey) ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((s, i) => s + i.quantity, 0);

  const scrollToTopFunc = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Navigation Data for Desktop
  const navigation = [
    { 
      name: 'Clothing', 
      cat: 'Clothing',
      sub: ['Sarees', 'Lehengas', 'Party Wear', 'Kurtas'] 
    },
    { 
      name: 'Jewelry', 
      cat: 'Jewelry',
      sub: ['Earrings', 'Necklaces', 'Bangles', 'Bridal Sets'] 
    },
    { 
      name: 'Accessories', 
      cat: 'Accessories',
      sub: ['Clutches', 'Belts', 'Handbags'] 
    },
    { 
      name: 'Shoes', 
      cat: 'Shoes',
      sub: ['Stilettos', 'Flats', 'Wedges'] 
    }
  ];

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen relative overflow-x-hidden">
        {/* Top Info Bar */}
        <div className="bg-[#021410] text-white py-3 px-4 md:px-6 flex justify-between items-center z-[60] border-b border-white/5 font-bold shadow-lg">
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-2 md:gap-3 group">
              <div className="p-1.5 bg-amber-400 rounded-full shadow-inner group-hover:scale-110 transition-transform">
                <Phone size={14} className="text-[#021410]" />
              </div>
              <span className="text-xs md:text-base tracking-wide whitespace-nowrap group-hover:text-amber-400 transition-colors">{CONTACT_INFO.phone}</span>
            </a>
          </div>
          
          <div className="flex-grow overflow-hidden relative mx-4 md:mx-6 h-5 flex items-center">
            <div className="animate-marquee whitespace-nowrap absolute">
              <span className="inline-flex items-center gap-3 uppercase tracking-[0.2em] text-[10px] md:text-sm font-black">
                <Sparkles size={12} className="text-amber-400" /> Premium Collection Live &nbsp;&nbsp;&nbsp;&nbsp;
                <Sparkles size={12} className="text-amber-400" /> Fast Delivery in Dhaka City &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6 shrink-0">
             <a href="#" className="hover:text-amber-400 transition-all hover:scale-125"><Instagram size={18} /></a>
             <a href={CONTACT_INFO.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-all hover:scale-125"><Facebook size={18} /></a>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <div className={`fixed inset-0 z-[110] transition-opacity duration-500 lg:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
          <div className={`absolute left-0 top-0 bottom-0 w-full max-w-[320px] bg-white shadow-2xl transition-transform duration-500 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex flex-col h-full">
              <div className="p-6 bg-[#065F46] text-white flex justify-between items-center">
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  <img src={LOGO_URL} alt={CONTACT_INFO.name} className="h-10 w-10 rounded-xl object-contain shadow-lg" />
                </Link>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-white/10 rounded-full"><X size={24} /></button>
              </div>
              <nav className="flex-grow overflow-y-auto py-8 px-6 space-y-8">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 border-b pb-2">Explore</h4>
                  <ul className="space-y-4">
                    <li><Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between group py-2">
                      <span className="text-sm font-bold uppercase tracking-widest group-hover:text-[#065F46]">Home</span>
                      <ChevronRight size={14} className="text-gray-300 group-hover:text-[#065F46]" />
                    </Link></li>
                    <li><Link to="/shop" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between group py-2">
                      <span className="text-sm font-bold uppercase tracking-widest group-hover:text-[#065F46]">Shop All</span>
                      <ChevronRight size={14} className="text-gray-300 group-hover:text-[#065F46]" />
                    </Link></li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 border-b pb-2">Collections</h4>
                  <ul className="space-y-4">
                    {['Clothing', 'Jewelry', 'Accessories', 'Shoes'].map(cat => (
                      <li key={cat}><Link to={`/shop?cat=${cat}`} onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between group py-1">
                        <span className="text-sm font-bold uppercase tracking-widest group-hover:text-[#065F46]">{cat}</span>
                        <ChevronRight size={14} className="text-gray-300 group-hover:text-[#065F46]" />
                      </Link></li>
                    ))}
                  </ul>
                </div>
              </nav>
              <div className="p-6 bg-gray-50 border-t">
                <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-[#065F46] font-black text-xs uppercase tracking-widest mb-4">
                  <LayoutDashboard size={18} /> Admin Backend
                </Link>
                <div className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Contact Support</div>
                <a href={`tel:${CONTACT_INFO.phone}`} className="mt-2 block text-sm font-bold text-gray-600 hover:text-[#065F46] transition-colors">{CONTACT_INFO.phone}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <header className="bg-[#065F46] text-white sticky top-0 z-50 shadow-xl transition-all duration-500">
          <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 lg:h-24 flex items-center justify-between">
            {/* Left: Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 flex-1">
              <Link to="/" className="text-[11px] font-black uppercase tracking-widest hover:text-amber-400 transition-colors">Home</Link>
              {navigation.map((nav) => (
                <div key={nav.name} className="relative group py-8">
                  <Link 
                    to={`/shop?cat=${nav.cat}`} 
                    className="text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5 group-hover:text-amber-400 transition-colors"
                  >
                    {nav.name} <ChevronDown size={12} className="group-hover:rotate-180 transition-transform duration-300" />
                  </Link>
                  <div className="absolute top-[90%] left-0 w-56 bg-white shadow-2xl rounded-2xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:top-full transition-all duration-300 z-[100] border border-gray-100">
                    <div className="p-4">
                      <ul className="space-y-1">
                        {nav.sub.map(sub => (
                          <li key={sub}>
                            <Link 
                              to={`/shop?cat=${nav.cat}`} 
                              className="block px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-[#065F46] rounded-xl transition-all"
                            >
                              {sub}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Left: Mobile Toggle */}
            <div className="lg:hidden flex-1">
              <button onClick={() => setIsMenuOpen(true)} className="p-2 -ml-1 hover:bg-white/10 rounded-full"><Menu size={28} /></button>
            </div>

            {/* Center: Logo */}
            <div className="flex-[2] flex justify-center">
              <Link to="/" className="flex flex-col items-center group">
                <img 
                  src={LOGO_URL} 
                  alt={CONTACT_INFO.name} 
                  className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 rounded-2xl object-contain shadow-2xl border-2 border-white/20 group-hover:scale-105 transition-transform duration-300" 
                />
                <span className="text-[7px] md:text-[9px] tracking-[0.4em] opacity-40 uppercase mt-1.5 hidden xs:block font-black">Elegance Defined</span>
              </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex-1 flex items-center justify-end gap-1 md:gap-3">
              <button 
                onClick={() => setIsSearchActive(!isSearchActive)}
                className={`flex items-center gap-2 p-2 md:p-2.5 rounded-xl transition-all transform hover:scale-105 border ${isSearchActive ? 'bg-amber-400 text-[#065F46] border-amber-400' : 'hover:bg-white/10 border-transparent'}`}
              >
                <Search size={20} />
                <span className="text-[10px] font-black uppercase tracking-widest hidden xl:block">Search</span>
              </button>
              
              <Link to="/wishlist" className="relative p-2 md:p-2.5 hover:bg-white/10 rounded-xl text-white transition-all transform hover:scale-105 hidden sm:flex">
                <Heart size={20} />
                {wishlist.length > 0 && <span className="absolute top-0 right-0 bg-amber-500 text-white text-[8px] font-black h-4 w-4 flex items-center justify-center rounded-full shadow-md">{wishlist.length}</span>}
              </Link>
              
              <Link to="/login" className="p-2 md:p-2.5 hover:bg-white/10 rounded-xl text-white transform hover:scale-105 transition-all"><User size={20} /></Link>
            </div>
          </div>

          {/* Search Dropdown */}
          <div ref={searchRef} className={`search-slide-down absolute top-full left-0 w-full bg-white/98 backdrop-blur-2xl shadow-xl overflow-hidden ${isSearchActive ? 'max-h-[500px] border-t opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
            <div className="max-w-3xl mx-auto px-6 py-4 md:py-6">
              <div className="relative group">
                <input 
                  autoFocus={isSearchActive}
                  type="text" 
                  placeholder="Search our pieces..."
                  className="w-full bg-transparent text-gray-900 border-b border-gray-100 py-1.5 md:py-2 px-8 focus:border-[#065F46] outline-none text-sm md:text-base font-medium transition-all placeholder:text-gray-300 placeholder:italic"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#065F46] transition-colors" />
              </div>
              {searchResults.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-in-up">
                  {searchResults.map(p => (
                    <Link key={p.id} to={`/product/${p.id}`} onClick={() => setIsSearchActive(false)} className="group flex items-center gap-2 p-1.5 hover:bg-gray-50 rounded-lg transition-all border border-transparent hover:border-gray-100">
                      <img src={p.image} className="w-8 h-10 object-cover rounded-md shadow-xs" alt={p.name} />
                      <div className="overflow-hidden">
                        <div className="text-[10px] font-bold text-gray-800 truncate">{p.name}</div>
                        <div className="text-[#065F46] font-black text-[9px]">৳ {p.price.toLocaleString()}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
            <Route path="/shop" element={<Shop addToCart={addToCart} searchQuery={searchQuery} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} addToRecentlyViewed={addToRecentlyViewed} />} />
            <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
            <Route path="/wishlist" element={<Wishlist wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} />} />
            <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/ethics" element={<Ethics />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-[#021410] text-gray-400 pt-16 pb-8 px-4 md:pt-24 md:px-8 mt-12 border-t-8 border-amber-600">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
            <div className="space-y-6">
              <Link to="/">
                <img src={LOGO_URL} alt={CONTACT_INFO.name} className="h-14 w-14 rounded-2xl object-contain shadow-2xl brightness-110" />
              </Link>
              <p className="text-sm md:text-base leading-relaxed opacity-70 font-medium">Nashwa is your premium destination for elegance and style in Bangladesh. Quality handcrafted for the modern woman.</p>
              <div className="flex gap-5">
                 <a href={CONTACT_INFO.facebookUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-amber-600 hover:text-white transition-all"><Facebook size={20} /></a>
                 <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-amber-600 hover:text-white transition-all"><Instagram size={20} /></a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-black mb-6 uppercase tracking-[0.3em] text-[11px] md:text-xs robotic-font border-b border-amber-600/30 pb-2">Catalog_Index</h4>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-widest robotic-font opacity-60">
                <li><Link to="/shop" className="hover:text-amber-500 transition-colors">All_Products</Link></li>
                <li><Link to="/shop?cat=Clothing" className="hover:text-amber-500 transition-colors">Clothing</Link></li>
                <li><Link to="/shop?cat=Jewelry" className="hover:text-amber-500 transition-colors">Jewelry</Link></li>
                <li><Link to="/shop?cat=Accessories" className="hover:text-amber-500 transition-colors">Accessories</Link></li>
                <li><Link to="/shop?cat=Shoes" className="hover:text-amber-500 transition-colors">Shoes</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black mb-6 uppercase tracking-[0.3em] text-[11px] md:text-xs robotic-font border-b border-amber-600/30 pb-2">Support_Center</h4>
              <ul className="space-y-5 text-sm font-medium">
                <li className="flex items-center gap-3">
                  <MapPin size={18} className="text-amber-600 shrink-0" /> 
                  <span className="opacity-80">{CONTACT_INFO.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-amber-600 shrink-0" /> 
                  <a href={`tel:${CONTACT_INFO.phone}`} className="opacity-80 hover:text-amber-400 transition-colors">{CONTACT_INFO.phone}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-amber-600 shrink-0" /> 
                  <a href={`mailto:${CONTACT_INFO.email}`} className="opacity-80 underline underline-offset-4 decoration-amber-600/30 hover:text-amber-400 transition-colors">{CONTACT_INFO.email}</a>
                </li>
              </ul>
            </div>
            <div>
               <h4 className="text-white font-black mb-6 uppercase tracking-[0.3em] text-[11px] md:text-xs robotic-font border-b border-amber-600/30 pb-2">Payment_Nodes</h4>
               <div className="flex flex-wrap gap-3">
                 <div className="bg-white/95 px-4 py-2 rounded-xl text-xs font-black text-[#e2136e] shadow-lg">bKash</div>
                 <div className="bg-white/95 px-4 py-2 rounded-xl text-xs font-black text-[#ed1c24] shadow-lg">Nagad</div>
                 <div className="bg-white/95 px-4 py-2 rounded-xl text-xs font-black text-[#065F46] shadow-lg">COD</div>
               </div>
               <div className="mt-8">
                 <Link to="/admin" className="inline-flex items-center gap-2 text-xs font-black text-amber-500 uppercase tracking-widest hover:underline">
                   <LayoutDashboard size={14} /> Access Backend Dashboard
                 </Link>
               </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-black">
             <p className="opacity-40">&copy; {new Date().getFullYear()} Nashwa Premium Fashion.</p>
             <div className="flex flex-wrap justify-center gap-6 opacity-60">
               <Link to="/privacy" className="hover:text-amber-500">Privacy</Link>
               <Link to="/terms" className="hover:text-amber-500">Terms</Link>
               <Link to="/shipping-policy" className="hover:text-amber-500">Shipping</Link>
             </div>
          </div>
        </footer>

        {/* Floating Actions */}
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4">
          <button onClick={scrollToTopFunc} className={`bg-white text-[#065F46] p-4 rounded-full shadow-2xl transition-all transform ${showScrollTop ? 'scale-100' : 'scale-0 pointer-events-none'}`}><ArrowUp size={24} /></button>
          
          <button 
            onClick={() => setIsCartOpen(!isCartOpen)} 
            className={`bg-[#065F46] text-white p-5 rounded-full shadow-2xl transition-all transform hover:scale-110 active:scale-90 relative ${cartJump ? 'animate-bounce' : ''}`}
          >
            <ShoppingCart size={28} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-black h-6 w-6 flex items-center justify-center rounded-full shadow-md ring-2 ring-white">
                {cartItemCount}
              </span>
            )}
          </button>

          <a href={`tel:${CONTACT_INFO.phone}`} className="bg-[#25D366] text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"><Phone size={28} /></a>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
