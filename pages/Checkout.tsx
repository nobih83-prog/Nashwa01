import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, User, Smartphone, Trash2, Plus, Minus } from 'lucide-react';
import { CartItem, CustomerDetails, Order } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  clearCart: () => void;
  removeFromCart: (id: string, options?: Record<string, string>) => void;
  updateQuantity: (id: string, delta: number, options?: Record<string, string>) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, clearCart, removeFromCart, updateQuantity }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'bKash' | 'Nagad' | 'Rocket'>('COD');
  
  const [details, setDetails] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Dhaka'
  });

  // Calculate totals - will auto-recalculate when cart changes via props
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const delivery = subtotal > 5000 ? 0 : 120;
  const total = subtotal + delivery;

  // Specific account numbers from user
  const paymentNumbers = {
    bKash: "01718952852",
    Nagad: "01718952852",
    Rocket: "017189528526"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const order: Order = {
        id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        customer: details,
        items: cart,
        total: total,
        date: new Date().toISOString(),
        status: 'Pending'
      };

      // Save to localStorage for Admin view
      const existingOrders = JSON.parse(localStorage.getItem('nashwa_orders') || '[]');
      localStorage.setItem('nashwa_orders', JSON.stringify([order, ...existingOrders]));

      setLoading(false);
      setSuccess(true);
      clearCart();
    }, 1500);
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 bg-green-100 text-[#065F46] rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <CheckCircle2 size={64} />
        </div>
        <h2 className="text-4xl font-bold mb-4 brand-font">Order Placed Successfully!</h2>
        <p className="text-gray-500 mb-10 text-lg">
          Thank you for choosing Nashwa. Your order will be processed shortly. We've sent a confirmation to {details.email}.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="bg-[#065F46] text-white px-10 py-4 rounded-full font-bold hover:bg-[#047857] transition-all shadow-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-grow">
          <h1 className="text-4xl font-bold mb-10 brand-font">Checkout</h1>
          
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Shipping Details */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                <User className="text-[#065F46]" /> Shipping Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="E.g. Jarin Tasnim"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#065F46] outline-none transition-all"
                    value={details.fullName}
                    onChange={e => setDetails({...details, fullName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    placeholder="017XXXXXXXX"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#065F46] outline-none transition-all"
                    value={details.phone}
                    onChange={e => setDetails({...details, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-700">Email Address</label>
                  <input 
                    required
                    type="email" 
                    placeholder="jarin@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#065F46] outline-none transition-all"
                    value={details.email}
                    onChange={e => setDetails({...details, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-700">Complete Address</label>
                  <textarea 
                    required
                    rows={3}
                    placeholder="Apartment, Street, House No..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#065F46] outline-none transition-all"
                    value={details.address}
                    onChange={e => setDetails({...details, address: e.target.value})}
                  />
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                <Smartphone className="text-[#065F46]" /> Payment Method
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className={`relative flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-[#065F46] bg-green-50 shadow-md' : 'border-gray-100 hover:border-gray-200'}`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="hidden" />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'COD' ? 'border-[#065F46]' : 'border-gray-300'}`}>
                     {paymentMethod === 'COD' && <div className="w-2.5 h-2.5 rounded-full bg-[#065F46]" />}
                  </div>
                  <div className="font-bold flex items-center gap-2">
                    <Smartphone size={20} className="text-gray-400" /> Cash on Delivery
                  </div>
                </label>

                <label className={`relative flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'bKash' ? 'border-[#e2136e] bg-[#e2136e]/5 shadow-md' : 'border-gray-100 hover:border-gray-200'}`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'bKash'} onChange={() => setPaymentMethod('bKash')} className="hidden" />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'bKash' ? 'border-[#e2136e]' : 'border-gray-300'}`}>
                     {paymentMethod === 'bKash' && <div className="w-2.5 h-2.5 rounded-full bg-[#e2136e]" />}
                  </div>
                  <div className="font-bold flex items-center gap-2">
                    <span className="text-[#e2136e] text-xl font-black tracking-tighter italic">bKash</span>
                  </div>
                </label>

                <label className={`relative flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'Nagad' ? 'border-[#ed1c24] bg-[#ed1c24]/5 shadow-md' : 'border-gray-100 hover:border-gray-200'}`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'Nagad'} onChange={() => setPaymentMethod('Nagad')} className="hidden" />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'Nagad' ? 'border-[#ed1c24]' : 'border-gray-300'}`}>
                     {paymentMethod === 'Nagad' && <div className="w-2.5 h-2.5 rounded-full bg-[#ed1c24]" />}
                  </div>
                  <div className="font-bold flex items-center gap-2">
                    <span className="text-[#ed1c24] text-xl font-black italic tracking-tight">Nagad</span>
                  </div>
                </label>

                <label className={`relative flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'Rocket' ? 'border-[#8c3494] bg-[#8c3494]/5 shadow-md' : 'border-gray-100 hover:border-gray-200'}`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'Rocket'} onChange={() => setPaymentMethod('Rocket')} className="hidden" />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'Rocket' ? 'border-[#8c3494]' : 'border-gray-300'}`}>
                     {paymentMethod === 'Rocket' && <div className="w-2.5 h-2.5 rounded-full bg-[#8c3494]" />}
                  </div>
                  <div className="font-bold flex items-center gap-2">
                    <span className="text-[#8c3494] text-xl font-black uppercase tracking-widest">Rocket</span>
                  </div>
                </label>
              </div>

              {paymentMethod !== 'COD' && (
                <div className="mt-8 p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-sm animate-fade-in">
                  <p className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                    <CheckCircle2 size={20} className="text-green-500" /> Payment Instructions
                  </p>
                  <ol className="space-y-3 text-gray-700 list-decimal ml-5">
                    <li className="pl-2">Open your {paymentMethod} App or Dial USSD.</li>
                    <li className="pl-2">Choose "Send Money" or "Payment" option.</li>
                    <li className="pl-2">Send the total amount to: <span className="font-black text-lg text-gray-900 bg-yellow-100 px-2 rounded tracking-wider">{(paymentNumbers as any)[paymentMethod]}</span></li>
                    <li className="pl-2">In the Reference/Counter field, please put your <span className="font-bold italic">Order ID</span>.</li>
                    <li className="pl-2">After successful payment, click the button below to complete your order.</li>
                  </ol>
                  <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#065F46] animate-pulse"></div>
                    <p className="text-xs text-gray-500 italic">Our team will verify the payment and confirm your order via SMS within 30 minutes.</p>
                  </div>
                </div>
              )}
            </section>

            <button 
              disabled={loading || cart.length === 0}
              className="w-full bg-[#065F46] text-white py-5 rounded-2xl font-bold text-xl hover:bg-[#047857] transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-green-900/10 active:scale-95"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : `Place Order (৳ ${total.toLocaleString()})`}
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar with Custom Visible Scrollbar and Fix for Badge Clipping */}
        <aside className="w-full lg:w-[400px] shrink-0">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-32">
            <h2 className="text-2xl font-bold mb-8 brand-font">Your Order</h2>
            <div className="space-y-6 max-h-[450px] overflow-y-auto px-2 pt-4 pb-6 custom-scrollbar mb-8 border-b">
              {cart.length > 0 ? (
                cart.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="flex gap-4 group">
                    <div className="relative shrink-0">
                      <img src={item.image} className="w-16 h-20 object-cover rounded-xl shadow-sm" alt={item.name} />
                      <span className="absolute -top-2 -right-2 bg-[#065F46] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black shadow-md z-10">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-sm line-clamp-1 text-gray-900">{item.name}</h4>
                        <button 
                          onClick={() => removeFromCart(item.id, item.selectedOptions)}
                          className="text-gray-300 hover:text-red-500 transition-colors p-1 -mt-1 -mr-1"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="text-[10px] text-gray-400 mb-1 uppercase tracking-widest">{item.category}</div>
                      
                      {/* Qty and Price line */}
                      <div className="flex items-center justify-between mt-2">
                         <div className="flex items-center bg-gray-50 rounded-lg px-2 py-1 gap-3">
                            <button 
                              onClick={() => updateQuantity(item.id, -1, item.selectedOptions)} 
                              className="text-gray-400 hover:text-[#065F46] disabled:opacity-30"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-xs font-black">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1, item.selectedOptions)}
                              className="text-gray-400 hover:text-[#065F46]"
                            >
                              <Plus size={14} />
                            </button>
                         </div>
                         <div className="text-[#065F46] font-black text-sm">৳ {(item.price * item.quantity).toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                   <p className="text-gray-400 text-sm">Your bag is empty</p>
                   <button onClick={() => navigate('/shop')} className="text-[#065F46] font-bold text-xs mt-2 underline">Continue Shopping</button>
                </div>
              )}
            </div>
            
            <div className="space-y-3 pt-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span className="text-gray-900 font-bold">৳ {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Delivery Fee</span>
                <span className={`font-bold ${delivery === 0 ? 'text-[#065F46]' : 'text-gray-900'}`}>
                  {delivery === 0 ? 'FREE' : `৳ ${delivery}`}
                </span>
              </div>
              <div className="flex justify-between text-2xl font-bold pt-4 text-gray-900 border-t mt-4 brand-font">
                <span>Total</span>
                <span>৳ {total.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-2xl flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
               <Smartphone size={16} className="text-[#065F46]" />
               <p>Secure SSL Encrypted Checkout</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;