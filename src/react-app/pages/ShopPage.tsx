import React from "react";
import { Hammer, Sparkles, Construction, ShoppingBag } from "lucide-react";
import shopMascot from "../assets/mascot/confuse.png";

const ShopPage: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto pb-32 px-4 flex flex-col items-center justify-center min-h-[70vh] text-center">
      {/* 3D Container for Mascot */}
      <div className="relative mb-12 animate-bounce-slow">
        <div className="absolute inset-0 bg-[#5B4DDB]/10 blur-3xl rounded-full" />
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto">
          <img
            src={shopMascot}
            alt="Shop Under Construction"
            className="w-full h-full object-contain filter drop-shadow-2xl"
          />
        </div>
        
        {/* Floating Tool Icons */}
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#FF8A4C] rounded-2xl border-[3px] border-[#e67a3d] shadow-[0_4px_0_#ca652d] flex items-center justify-center text-white rotate-12">
          <Hammer size={24} strokeWidth={3} />
        </div>
        <div className="absolute bottom-4 -left-8 w-14 h-14 bg-[#5B4DDB] rounded-2xl border-[3px] border-[#4539a5] shadow-[0_6px_0_#3730a3] flex items-center justify-center text-white -rotate-12">
          <Construction size={28} strokeWidth={3} />
        </div>
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-[40px] border-[4px] border-slate-100 shadow-[0_12px_0_#f1f5f9] p-8 sm:p-12 w-full relative overflow-hidden">
        {/* Top Highlight */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-slate-50 border-b-[3px] border-slate-100/50" />
        
        <div className="flex flex-col items-center gap-6 relative z-10">
          <div className="bg-[#F1EEFF] text-[#5B4DDB] px-6 py-2 rounded-full border-[3px] border-[#5B4DDB]/10 flex items-center gap-2">
            <Sparkles size={16} className="fill-current" />
            <span className="font-black text-[10px] uppercase tracking-[0.2em]">New Region Unlocking</span>
          </div>

          <div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#111827] uppercase tracking-tighter italic mb-4">
              Marketplace <br/>
              <span className="text-[#5B4DDB]">In Development</span>
            </h1>
            <p className="text-[#7B7F97] font-bold text-sm sm:text-lg leading-relaxed max-w-md mx-auto">
              Our blacksmiths are currently forging powerful artifacts and legendary gear. 
              <span className="text-[#111827]"> Will be released soon!</span>
            </p>
          </div>

          <div className="w-full grid grid-cols-3 gap-4 pt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-square bg-slate-50 rounded-3xl border-[3px] border-slate-100 border-dashed flex items-center justify-center opacity-40">
                <ShoppingBag size={24} className="text-slate-300" />
              </div>
            ))}
          </div>

          <div className="mt-4 text-[#7B7F97] font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3">
             <div className="w-8 h-1 bg-slate-100 rounded-full" />
             Coming Soon
             <div className="w-8 h-1 bg-slate-100 rounded-full" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ShopPage;
