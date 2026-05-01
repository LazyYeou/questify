import React from 'react';
import { User, Settings, ShieldCheck, Mail, Calendar } from 'lucide-react';
import { useTaskStore } from '../store/useTaskStore';

const ProfilePage: React.FC = () => {
  const { user } = useTaskStore();

  return (
    <div className="w-full max-w-2xl mx-auto pb-24">
      <div className="flex flex-col items-center mb-10">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#D7CCFF] to-[#C7B9FF] flex items-center justify-center shadow-inner border-[8px] border-white overflow-hidden mb-4">
          <div className="text-6xl">🦊</div>
        </div>
        <h1 className="text-4xl font-black text-[#111827]">{user?.name || "Adventurer"}</h1>
        <p className="text-[#5B4DDB] font-extrabold text-xl">Level {user?.level || 1} Elite Scholar</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Current Streak", value: `${user?.streak || 0} Days`, color: "bg-[#FFF4E6]", icon: "🔥", iconColor: "text-[#FF9800]" },
          { label: "Longest Streak", value: `${user?.longestStreak || 0} Days`, color: "bg-[#F1EEFF]", icon: "🏆", iconColor: "text-[#5B4DDB]" },
          { label: "Treasury", value: `${user?.coins || 0} Coins`, color: "bg-[#E6F9F2]", icon: "💰", iconColor: "text-[#00C48C]" },
        ].map((stat, i) => (
          <div key={i} className={`${stat.color} rounded-[32px] p-6 border border-white/50 shadow-sm flex flex-col items-center text-center`}>
            <span className="text-3xl mb-2">{stat.icon}</span>
            <p className="text-[#7B7F97] font-bold text-xs uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-[#111827] font-black text-2xl">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white rounded-[32px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-white">
          <h2 className="text-xl font-black text-[#111827] mb-6 flex items-center gap-2">
            <ShieldCheck className="text-[#5B4DDB]" /> Account Security
          </h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F8F9FF] flex items-center justify-center">
                <Mail className="text-[#7B7F97]" />
              </div>
              <div className="flex-1">
                <p className="text-[#7B7F97] font-bold text-sm uppercase">Email Address</p>
                <p className="text-[#111827] font-extrabold">{user?.email || "mock@example.com"}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F8F9FF] flex items-center justify-center">
                <Calendar className="text-[#7B7F97]" />
              </div>
              <div className="flex-1">
                <p className="text-[#7B7F97] font-bold text-sm uppercase">Joined Questify</p>
                <p className="text-[#111827] font-extrabold">May 2026</p>
              </div>
            </div>
          </div>
        </div>

        <button className="w-full bg-white rounded-[24px] p-6 font-black text-[#7B7F97] flex items-center justify-center gap-2 border border-slate-100 hover:text-[#111827] transition-colors">
          <Settings size={20} /> Edit Profile Settings
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
