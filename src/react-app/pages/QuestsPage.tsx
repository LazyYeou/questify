import React from 'react';
import { Sparkles, Trophy } from 'lucide-react';

// --- Reusable Sub-components ---

const QuestHeroCard: React.FC = () => (
  <div className="w-full bg-gradient-to-br from-[#5B4DDB] to-[#7C6CFF] rounded-[40px] p-8 sm:p-10 text-white relative overflow-hidden shadow-[0_20px_50px_rgba(91,77,219,0.3)] mb-8 border border-white/20">
    <div className="relative z-10 flex items-center justify-between">
      <div className="max-w-[60%]">
        <h1 className="text-5xl sm:text-6xl font-black tracking-tighter mb-2 italic">QUEST</h1>
        <p className="text-white/80 font-bold text-lg sm:text-xl leading-tight">
          Finished the task<br />
          get the prize
        </p>
      </div>
      <div className="relative">
         {/* Floating character/mascot */}
         <div className="text-8xl sm:text-9xl transform -rotate-12 drop-shadow-2xl animate-bounce-slow">
            🦊
         </div>
         <Sparkles className="absolute -top-4 -right-4 text-[#FFC84D] animate-pulse" size={32} />
      </div>
    </div>
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10 pointer-events-none grid-pattern" />
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
  
  return (
    <div className="bg-white rounded-[40px] p-8 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-white group hover:scale-[1.01] transition-all duration-300">
      <div className="flex justify-between items-start mb-8">
        <div className="flex-1">
          <h2 className={`text-2xl font-black uppercase tracking-widest mb-2 ${isDaily ? 'text-[#5B4DDB]' : 'text-[#FF9800]'}`}>
            {title}
          </h2>
          <p className="text-[#7B7F97] font-bold text-lg leading-snug max-w-[80%]">
            {description}
          </p>
        </div>
        <div className="w-20 h-20 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
           <span className="text-6xl drop-shadow-lg">{rewardImage}</span>
        </div>
      </div>

      <div className="relative">
        <div className="flex justify-center mb-3">
           <div className="bg-[#F1EEFF] px-4 py-1 rounded-full border border-[#5B4DDB]/10">
              <span className="text-[#5B4DDB] font-black text-sm tabular-nums">
                {currentProgress} / {totalProgress}
              </span>
           </div>
        </div>
        <div className="w-full h-5 bg-[#ECEAF9] rounded-full overflow-hidden p-1 shadow-inner border border-white">
          <div 
            className={`h-full rounded-full transition-all duration-1000 shadow-sm ${
              isDaily ? 'bg-gradient-to-r from-[#5B4DDB] to-[#7C6CFF]' : 'bg-gradient-to-r from-[#FF9800] to-[#FFB52E]'
            }`}
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
    <div className="w-full max-w-4xl mx-auto pb-24 px-4 font-sans">
      <QuestHeroCard />
      
      <div className="grid grid-cols-1 gap-8">
        <QuestCard 
          title="WEEKLY QUEST"
          description="Complete 10 tasks this week to unlock the Golden Chest"
          currentProgress={4}
          totalProgress={10}
          rewardImage="🎁"
        />
        
        <QuestCard 
          isDaily
          title="DAILY QUEST"
          description="Maintain your flow! Finish your first task of the day"
          currentProgress={0}
          totalProgress={1}
          rewardImage="💎"
        />
      </div>

      {/* Optional Achievement Badge at bottom */}
      <div className="mt-12 flex justify-center">
         <div className="flex items-center gap-3 bg-white/50 px-6 py-3 rounded-full border border-white">
            <Trophy className="text-[#F5B100]" />
            <span className="text-[#7B7F97] font-bold text-sm uppercase tracking-widest">More quests coming soon</span>
         </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px) rotate(-12deg); }
          50% { transform: translateY(-15px) rotate(-8deg); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        .grid-pattern {
          background-image: 
            linear-gradient(white 1px, transparent 1px),
            linear-gradient(90deg, white 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>
    </div>
  );
};

export default QuestsPage;
