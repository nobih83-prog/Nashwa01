
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Facebook, Smartphone } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const LOGO_URL = "https://ui-avatars.com/api/?name=N&background=065f46&color=fff&font-size=0.5&bold=true";

interface LoginProps {
  onLogin: (status: boolean) => void;
  isLoggedIn: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, isLoggedIn }) => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Mock authentication
    setTimeout(() => {
      setLoading(false);
      onLogin(true);
      navigate('/');
    }, 1500);
  };

  const handleLogout = () => {
    onLogin(false);
    navigate('/');
  };

  if (isLoggedIn) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-green-50 text-[#065F46] rounded-full flex items-center justify-center mb-8 border-4 border-white shadow-xl">
           <User size={48} />
        </div>
        <h2 className="text-4xl font-bold mb-4 brand-font">Welcome back!</h2>
        <p className="text-gray-500 mb-10 max-w-md mx-auto">You are currently logged into your Nashwa account. Manage your orders, wishlist, and profile details from here.</p>
        <div className="flex flex-col sm:flex-row gap-4">
           <button onClick={() => navigate('/')} className="bg-[#065F46] text-white px-10 py-4 rounded-full font-bold hover:bg-[#047857] transition-all shadow-lg">Go Shopping</button>
           <button onClick={handleLogout} className="bg-white text-red-500 border border-red-100 px-10 py-4 rounded-full font-bold hover:bg-red-50 transition-all">Logout</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full">
        {/* Logo Branding */}
        <div className="text-center mb-10">
          <img 
            src={LOGO_URL} 
            alt={CONTACT_INFO.name} 
            className="h-20 w-20 mx-auto mb-4 rounded-3xl shadow-2xl border-4 border-white" 
          />
          <p className="text-gray-500 mt-2 text-sm uppercase tracking-[0.2em] font-medium">Premium Women's Fashion</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-8 md:p-12 border border-gray-100 relative overflow-hidden">
          {/* Form Header */}
          <div className="flex mb-10 bg-gray-50 p-1 rounded-2xl">
            <button 
              onClick={() => setIsRegistering(false)}
              className={`flex-1 py-3 text-sm font-bold uppercase tracking-widest rounded-xl transition-all ${!isRegistering ? 'bg-white text-[#065F46] shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setIsRegistering(true)}
              className={`flex-1 py-3 text-sm font-bold uppercase tracking-widest rounded-xl transition-all ${isRegistering ? 'bg-white text-[#065F46] shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isRegistering && (
              <div className="space-y-2 group">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#065F46] transition-colors" size={18} />
                  <input 
                    required={isRegistering}
                    type="text" 
                    placeholder="E.g. Jarin Tasnim"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-[#065F46] outline-none transition-all text-gray-800"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2 group">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email or Phone</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#065F46] transition-colors" size={18} />
                <input 
                  required
                  type="text" 
                  placeholder="name@email.com"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-[#065F46] outline-none transition-all text-gray-800"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Password</label>
                {!isRegistering && <button type="button" className="text-[10px] font-bold text-[#065F46] uppercase tracking-widest hover:underline">Forgot?</button>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#065F46] transition-colors" size={18} />
                <input 
                  required
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-[#065F46] outline-none transition-all text-gray-800"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#065F46] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#047857] transition-all flex items-center justify-center gap-3 shadow-xl shadow-green-900/10 active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {isRegistering ? 'Create Account' : 'Login Now'} <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
