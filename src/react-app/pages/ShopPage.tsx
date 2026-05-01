import React from 'react';
import { ShoppingBag, Sparkles, Zap } from 'lucide-react';

const ShopPage: React.FC = () => {
  const items = [
    { id: 1, name: "XP Booster (2x)", price: 500, desc: "Double XP for 1 hour", icon: <Zap className="text-yellow-500" /> },
    { id: 2, name: "Golden Avatar Frame", price: 1200, desc: "Look legendary in leaderboards", icon: <Sparkles className="text-amber-500" /> },
    { id: 3, name: "Streak Freeze", price: 300, desc: "Protect your streak for one day", icon: <div className="text-2xl">❄️</div> },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto pb-24">
      <div className="flex flex-col items-center mb-10">
        <div className="w-20 h-20 bg-gradient-to-br from-[#A69BFF] to-[#7D73FF] rounded-[24px] flex items-center justify-center shadow-lg mb-4 transform rotate-3">
          <ShoppingBag className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-black text-[#111827]">Artifact Shop</h1>
        <p className="text-[#7B7F97] font-bold">Exchange your hard-earned XP for powerups</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-[32px] p-8 flex items-center gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-white group cursor-pointer hover:scale-[1.02] transition-transform">
            <div className="w-16 h-16 rounded-2xl bg-[#F8F9FF] flex items-center justify-center text-3xl">
              {item.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-extrabold text-xl text-[#111827]">{item.name}</h3>
              <p className="text-[#7B7F97] font-semibold text-sm">{item.desc}</p>
            </div>
            <button className="bg-[#5B4DDB] text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 group-hover:bg-[#4a3cb5] transition-colors">
              <Sparkles size={16} fill="currentColor" />
              {item.price}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
