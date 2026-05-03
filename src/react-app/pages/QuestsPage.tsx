import React from 'react';
import { Sparkles, Trophy, Target } from 'lucide-react';

// --- Reusable Sub-components ---

const QuestHeroCard: React.FC = () => (
  <div className="w-full bg-[#5B4DDB] rounded-[40px] p-8 sm:p-12 text-white relative overflow-hidden border-[4px] border-[#4539a5] shadow-[0_10px_0_#3730a3] mb-12 group">
    {/* 3D Surface Effect */}
    <div className="absolute top-0 left-0 right-0 h-5 bg-white/20 border-b-[3px] border-[#4539a5]/30 pointer-events-none" />

    <div className="relative z-10 flex items-center justify-between">
      <div className="max-w-[65%]">
        <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full border-2 border-white/20 mb-4 backdrop-blur-sm">
           <Target size={14} className="text-white" strokeWidth={3} />
           <span className="text-[10px] font-black uppercase tracking-widest">Active Missions</span>
        </div>
        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter mb-3 uppercase italic leading-none drop-shadow-[0_4px_0_rgba(0,0,0,0.1)]">QUEST</h1>
        <p className="text-white font-bold text-xl sm:text-2xl leading-tight uppercase tracking-tight opacity-90">
          Finish tasks<br />
          earn rewards
        </p>
      </div>
      <div className="relative">
         {/* Floating mascot */}
         <div className="text-8xl sm:text-[140px] transform -rotate-12 drop-shadow-2xl animate-bounce-slow filter brightness-110">
            🦊
         </div>
         <div className="absolute -top-4 -right-4 w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center border-[4px] border-white shadow-lg animate-pulse">
            <Sparkles className="text-white" size={24} strokeWidth={3} />
         </div>
      </div>
    </div>
  </div>
);

interface QuestCardProps {
  title: string;
  description: string;
  currentProgress: number;
  totalProgress: number;
  rewardImage: string;
  isDaily?: boolean;
}

const QuestCard: React.FC<QuestCardProps> = ({ 
  title, 
  description, 
  currentProgress, 
  totalProgress, 
  rewardImage,
  isDaily = false 
}) => {
  const percent = Math.min(100, (currentProgress / totalProgress) * 100);
  const colorClass = isDaily ? 'bg-[#5B4DDB]' : 'bg-[#FF8A4C]';
  const borderColor = isDaily ? 'border-[#4539a5]' : 'border-[#e67a3d]';
  const shadowColor = isDaily ? 'shadow-[0_8px_0_#3730a3]' : 'shadow-[0_8px_0_#ca652d]';
  
  return (
    <div className="bg-white rounded-[40px] p-8 sm:p-10 border-[4px] border-slate-100 shadow-[0_10px_0_#f1f5f9] group hover:translate-y-1 hover:shadow-none transition-all duration-200 cursor-pointer">
      <div className="flex justify-between items-start gap-6 mb-10">
        <div className="flex-1">
          <h2 className={`text-2xl font-black uppercase tracking-tight mb-2 ${isDaily ? 'text-[#5B4DDB]' : 'text-[#FF8A4C]'}`}>
            {title}
          </h2>
          <p className="text-[#111827] font-bold text-xl leading-snug uppercase tracking-tighter opacity-80">
            {description}
          </p>
        </div>
        <div className={`w-24 h-24 rounded-[32px] flex items-center justify-center shrink-0 border-[4px] ${borderColor} ${colorClass} ${shadowColor} relative group-hover:rotate-6 transition-all duration-300`}>
           <div className="absolute top-0 left-0 right-0 h-3 bg-white/20 rounded-t-[20px] pointer-events-none" />
           <span className="text-6xl drop-shadow-xl">{rewardImage}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-end px-2">
           <span className="text-[#7B7F97] font-black text-[10px] uppercase tracking-[0.2em]">Objective Progress</span>
           <div className={`px-4 py-1.5 rounded-full border-[3px] ${isDaily ? 'bg-[#F1EEFF] border-[#5B4DDB]/10 text-[#5B4DDB]' : 'bg-[#FFF9E6] border-amber-100 text-amber-600'} font-black text-sm tabular-nums shadow-sm`}>
              {currentProgress} / {totalProgress}
           </div>
        </div>
        <div className="w-full h-6 bg-slate-100 rounded-full overflow-hidden p-1 shadow-inner border-[3px] border-white">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ease-out shadow-[0_2px_0_rgba(0,0,0,0.1)] ${colorClass}`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---

const QuestsPage: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto pb-32 px-4 font-sans bg-[#F8F9FF] min-h-screen pt-8">
      <QuestHeroCard />
      
      <div className="grid grid-cols-1 gap-10">
        <QuestCard 
          title="WEEKLY CHALLENGE"
          description="Complete 10 tasks this week to unlock the Golden Chest"
          currentProgress={4}
          totalProgress={10}
          rewardImage="🎁"
        />
        
        <QuestCard 
          isDaily
          title="DAILY OBJECTIVE"
          description="Maintain your flow! Finish your first task of the day"
          currentProgress={0}
          totalProgress={1}
          rewardImage="💎"
        />
      </div>

      {/* Optional Achievement Badge at bottom */}
      <div className="mt-16 flex justify-center">
         <div className="flex items-center gap-4 bg-white px-8 py-4 rounded-full border-[3px] border-slate-100 shadow-[0_4px_0_#f1f5f9]">
            <Trophy className="text-[#F5B100]" size={24} strokeWidth={3} />
            <span className="text-[#7B7F97] font-black text-[10px] uppercase tracking-[0.3em]">Discovery more missions</span>
         </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px) rotate(-12deg); }
          50% { transform: translateY(-20px) rotate(-8deg); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default QuestsPage;
