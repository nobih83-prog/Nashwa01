
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Package, TrendingUp, Phone, MapPin, Mail, Clock, Search, ChevronRight } from 'lucide-react';
import { Order } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Admin: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('nashwa_orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalCustomers = new Set(orders.map(o => o.customer.phone)).size;

  const filteredOrders = orders.filter(o => 
    o.customer.fullName.toLowerCase().includes(search.toLowerCase()) || 
    o.customer.phone.includes(search) ||
    o.id.includes(search)
  );

  const data = [
    { name: 'Pending', value: orders.filter(o => o.status === 'Pending').length },
    { name: 'Processing', value: orders.filter(o => o.status === 'Processing').length },
    { name: 'Shipped', value: orders.filter(o => o.status === 'Shipped').length },
    { name: 'Delivered', value: orders.filter(o => o.status === 'Delivered').length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2 brand-font">Backend Dashboard</h1>
          <p className="text-gray-500 font-medium">Customer Details & Order Logistics</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border w-full md:w-auto">
          <Search className="text-gray-400 ml-2" size={20} />
          <input 
            type="text" 
            placeholder="Search customers or order ID..."
            className="outline-none bg-transparent py-2 w-full md:w-64 font-bold"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#065F46] p-8 rounded-3xl shadow-xl text-white">
          <div className="text-green-200 text-xs font-black uppercase tracking-widest mb-2">Total Sales Revenue</div>
          <div className="text-4xl font-black">৳ {totalRevenue.toLocaleString()}</div>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="text-gray-400 text-xs font-black uppercase tracking-widest mb-2">Active Orders</div>
          <div className="text-4xl font-black text-gray-900">{orders.length}</div>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="text-gray-400 text-xs font-black uppercase tracking-widest mb-2">Total Customers</div>
          <div className="text-4xl font-black text-gray-900">{totalCustomers}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold brand-font flex items-center gap-3">
              <Package className="text-[#065F46]" /> Customer Orders
            </h2>
          </div>
          
          <div className="space-y-6">
            {filteredOrders.length > 0 ? (
              filteredOrders.map(order => (
                <div key={order.id} className="bg-white rounded-[2rem] p-8 shadow-sm border border-transparent hover:border-[#065F46] transition-all group overflow-hidden">
                  <div className="flex flex-col md:flex-row justify-between gap-8">
                    <div className="space-y-6 flex-grow">
                      <div className="flex items-center gap-3">
                        <span className="bg-gray-100 text-gray-700 text-[10px] font-black uppercase px-3 py-1 rounded-lg border">{order.id}</span>
                        <span className="text-xs text-gray-400 font-bold flex items-center gap-1">
                          <Clock size={14} /> {new Date(order.date).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="flex items-start gap-5">
                        <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-[#065F46] font-black text-xl border border-green-100">
                          {order.customer.fullName.charAt(0)}
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-black text-xl text-gray-900">{order.customer.fullName}</h4>
                          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                            <a href={`tel:${order.customer.phone}`} className="flex items-center gap-2 font-bold text-[#065F46] hover:underline">
                              <Phone size={14} /> {order.customer.phone}
                            </a>
                            <span className="flex items-center gap-2 text-gray-500 font-medium">
                              <Mail size={14} /> {order.customer.email}
                            </span>
                          </div>
                          <div className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-2xl border border-gray-100 mt-2">
                            <MapPin size={16} className="shrink-0 mt-0.5 text-amber-600" />
                            <span className="font-medium">{order.customer.address}, {order.customer.city}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-between items-end gap-6 text-right md:min-w-[180px]">
                      <div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Grand Total</div>
                        <div className="text-3xl font-black text-[#065F46] brand-font">৳ {order.total.toLocaleString()}</div>
                      </div>
                      <div className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${
                        order.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {order.status}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-gray-50 grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {order.items.map(item => (
                      <div key={item.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-transparent hover:border-gray-200 transition-colors">
                        <img src={item.image} className="w-12 h-16 object-cover rounded-xl shadow-sm" alt={item.name} />
                        <div className="min-w-0">
                          <div className="font-bold text-[11px] text-gray-900 line-clamp-1">{item.name}</div>
                          <div className="text-gray-400 text-[10px] font-bold">Qty: {item.quantity}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-[2rem] p-20 text-center border-2 border-dashed border-gray-200">
                <Package size={48} className="text-gray-200 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-gray-400">No matching orders found</h3>
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-8">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-8 brand-font flex items-center gap-3">
              <TrendingUp className="text-[#065F46]" /> Sales Analytics
            </h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} fontWeight="bold" />
                  <YAxis axisLine={false} tickLine={false} fontSize={10} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}} 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} 
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#F59E0B' : index === 3 ? '#10B981' : '#3B82F6'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 space-y-3">
               <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-gray-400">
                  <span>Growth Velocity</span>
                  <span className="text-emerald-600">+18%</span>
               </div>
               <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#065F46] h-full w-[18%]"></div>
               </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6 brand-font flex items-center gap-3">
              <Users className="text-[#065F46]" /> VIP Customers
            </h3>
            <div className="space-y-4">
              {orders.slice(0, 5).map((o, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 rounded-2xl transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#065F46]/5 rounded-xl flex items-center justify-center font-black text-[#065F46] text-sm">
                      {o.customer.fullName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-black text-xs text-gray-900">{o.customer.fullName}</div>
                      <div className="text-[10px] text-gray-400 font-bold">{o.customer.phone}</div>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-300" />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Admin;
