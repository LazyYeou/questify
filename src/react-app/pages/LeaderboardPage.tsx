import React, { useState, useMemo, useEffect } from 'react';
import { Trophy, Crown, User, Calendar, History, Loader2 } from 'lucide-react';
import { useTaskStore } from '../store/useTaskStore';

interface LeaderboardEntry {
  id: string;
  name: string;
  level: number;
  xp: number;
  minutesSpent: number;
  avatar: string;
  rank: number;
}

type LeaderboardType = 'allTime' | 'weekly';

const LeaderboardPage: React.FC = () => {
  const [activeType, setActiveType] = useState<LeaderboardType>('allTime');
  const [data, setData] = useState<{ allTime: LeaderboardEntry[]; weekly: LeaderboardEntry[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const user = useTaskStore((state) => state.user);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/leaderboard');
        if (!response.ok) throw new Error('Failed to fetch leaderboard');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const activeData = useMemo(() => {
    if (!data) return [];
    return activeType === 'allTime' ? data.allTime : data.weekly;
  }, [activeType, data]);

  const top3 = activeData.slice(0, 3);
  const others = activeData.slice(3);

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4 text-[#5B4DDB]">
        <Loader2 className="w-12 h-12 animate-spin opacity-50" />
        <p className="font-black text-xs uppercase tracking-[0.3em] opacity-50">Analyzing Hero Stats...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 sm:gap-8 pb-32 animate-in fade-in duration-700">
      {/* 1. TOP HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#5B4DDB] via-[#7C6CFF] to-[#A094FF] rounded-[32px] sm:rounded-[48px] p-6 sm:p-12 shadow-[0_20px_50px_rgba(91,77,219,0.3)] border border-white/20 mb-4 sm:mb-6">
        <div className="relative z-10 max-w-[200px] sm:max-w-md text-left">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="bg-white/20 backdrop-blur-md p-1.5 sm:p-2 rounded-xl sm:rounded-2xl border border-white/30">
              <Trophy className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-300" />
            </div>
            <span className="text-white/80 font-black text-[8px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em]">
              {activeType === 'allTime' ? 'Legendary Ranks' : 'Weekly Effort'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-6xl font-black text-white mb-2 sm:mb-4 tracking-tighter italic uppercase leading-none">
            {activeType === 'allTime' ? 'Hall of Fame' : 'Time Keepers'}
          </h1>
          <p className="text-white/90 text-sm sm:text-xl font-bold leading-tight">
            {activeType === 'allTime' 
              ? 'Total EXP accumulated since the beginning.' 
              : 'Total focus time recorded this week.'}
          </p>
        </div>

        {/* Mascot Area */}
        <div className="absolute right-[-10px] bottom-[-10px] sm:right-12 sm:bottom-6 flex flex-col items-center">
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-xl rounded-[24px] sm:rounded-[40px] p-4 sm:p-8 border border-white/20 flex flex-col items-center shadow-2xl transform rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
              <div className="text-5xl sm:text-8xl drop-shadow-lg select-none">🦊</div>
            </div>
          </div>
        </div>
      </div>

      {/* TABS SELECTOR */}
      <div className="flex justify-center -mt-4 relative z-20">
        <div className="bg-white p-1.5 rounded-[28px] shadow-xl border border-slate-100 flex gap-1">
          <TabButton 
            active={activeType === 'allTime'} 
            onClick={() => setActiveType('allTime')}
            icon={<History size={16} />}
            label="All Time"
          />
          <TabButton 
            active={activeType === 'weekly'} 
            onClick={() => setActiveType('weekly')}
            icon={<Calendar size={16} />}
            label="Weekly"
          />
        </div>
      </div>

      {/* 2. TOP 3 PODIUM SECTION */}
      <div className="flex flex-row items-end justify-center gap-2 sm:gap-6 mt-4 sm:mt-8 px-1 sm:px-2">
        {/* Rank 2 */}
        {top3[1] && (
          <PodiumCard 
            entry={top3[1]} 
            rank={2} 
            highlightColor="silver" 
            heightClass="h-[120px] sm:h-[240px]" 
            type={activeType}
          />
        )}
        
        {/* Rank 1 */}
        {top3[0] && (
          <PodiumCard 
            entry={top3[0]} 
            rank={1} 
            highlightColor="gold" 
            heightClass="h-[150px] sm:h-[300px]" 
            isWinner 
            type={activeType}
          />
        )}
        
        {/* Rank 3 */}
        {top3[2] && (
          <PodiumCard 
            entry={top3[2]} 
            rank={3} 
            highlightColor="bronze" 
            heightClass="h-[100px] sm:h-[220px]" 
            type={activeType}
          />
        )}
      </div>

      {/* 3. LEADERBOARD LIST CARD */}
      <div className="bg-white rounded-[32px] sm:rounded-[48px] p-4 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 mt-2 sm:mt-4 overflow-hidden">
        <div className="flex items-center justify-between mb-6 sm:mb-8 px-2 sm:px-4">
          <h2 className="text-base sm:text-xl font-black text-[#111827] uppercase tracking-widest italic text-left">
            {activeType === 'allTime' ? 'Total Mastery' : 'Weekly Sprint'}
          </h2>
          <div className="flex items-center gap-2 bg-[#F8F9FF] px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl border border-slate-50">
            <User size={12} className="text-[#5B4DDB] sm:w-4 sm:h-4" />
            <span className="text-[8px] sm:text-[10px] font-black text-[#7B7F97] uppercase tracking-widest">Global Ranks</span>
          </div>
        </div>

        <div className="space-y-1 sm:space-y-2">
          {others.map((entry) => (
            <LeaderboardRow 
              key={entry.id} 
              entry={entry} 
              type={activeType} 
              isCurrentUser={user?.id.toString() === entry.id} 
            />
          ))}
          {activeData.length === 0 && (
            <p className="text-[#7B7F97] font-bold text-center py-10 opacity-50">No hero data yet...</p>
          )}
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 rounded-[22px] font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all ${
      active 
        ? "bg-[#5B4DDB] text-white shadow-lg shadow-[#5B4DDB]/25" 
        : "text-[#7B7F97] hover:bg-[#F1EEFF] hover:text-[#5B4DDB]"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const PodiumCard = ({ 
  entry, 
  rank, 
  highlightColor, 
  heightClass, 
  isWinner = false,
  type
}: { 
  entry: LeaderboardEntry; 
  rank: number; 
  highlightColor: 'gold' | 'silver' | 'bronze';
  heightClass: string;
  isWinner?: boolean;
  type: LeaderboardType;
}) => {
  const colors = {
    gold: {
      bg: 'bg-gradient-to-b from-[#FFF9E6] to-[#FFF3CC]',
      border: 'border-[#F5B100]/20',
      accent: 'text-[#F5B100]',
      shadow: 'shadow-[#F5B100]/10',
      rankBg: 'bg-[#F5B100]'
    },
    silver: {
      bg: 'bg-gradient-to-b from-[#F3F1FF] to-[#E8E4FF]',
      border: 'border-[#5B4DDB]/20',
      accent: 'text-[#5B4DDB]',
      shadow: 'shadow-[#5B4DDB]/10',
      rankBg: 'bg-[#5B4DDB]'
    },
    bronze: {
      bg: 'bg-gradient-to-b from-[#FFF2EB] to-[#FFE5D6]',
      border: 'border-[#FF8A4C]/20',
      accent: 'text-[#FF8A4C]',
      shadow: 'shadow-[#FF8A4C]/10',
      rankBg: 'bg-[#FF8A4C]'
    }
  };

  const c = colors[highlightColor];

  return (
    <div className={`flex-1 w-full flex flex-col items-center justify-end group transition-all duration-500`}>
      <div className="relative mb-2 sm:mb-4 flex flex-col items-center">
        {isWinner && (
          <Crown className="absolute -top-6 sm:-top-10 text-[#F5B100] w-6 h-6 sm:w-10 sm:h-10 drop-shadow-lg" fill="currentColor" />
        )}
        <div className={`w-14 h-14 sm:w-24 sm:h-24 rounded-full bg-white p-1 sm:p-1.5 shadow-xl border-2 sm:border-4 ${c.border} z-10 transition-transform group-hover:scale-110 duration-500`}>
          <div className="w-full h-full rounded-full bg-slate-50 flex items-center justify-center text-2xl sm:text-5xl select-none text-left">
            {entry.avatar}
          </div>
        </div>
        <div className={`absolute -bottom-1 sm:-bottom-2 z-20 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full ${c.rankBg} text-white font-black text-[8px] sm:text-xs shadow-lg`}>
          #{rank}
        </div>
      </div>

      <div className={`${heightClass} w-full ${c.bg} ${c.border} border-2 rounded-t-[24px] sm:rounded-t-[40px] rounded-b-[12px] sm:rounded-b-[20px] p-2 sm:p-6 flex flex-col items-center justify-center text-center shadow-xl ${c.shadow} relative group-hover:translate-y-[-5px] transition-transform duration-500`}>
        <h3 className="font-black text-slate-900 text-[10px] sm:text-xl truncate w-full mb-0.5 sm:mb-1">
          {entry.name}
        </h3>
        <p className={`${c.accent} font-black text-[7px] sm:text-[10px] uppercase tracking-widest mb-1.5 sm:mb-3 text-left`}>
          Level {entry.level}
        </p>
        
        <div className="bg-white/50 backdrop-blur-sm px-2 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-2xl border border-white/50 flex items-center gap-1 sm:gap-2">
          <span className="font-black text-[#111827] text-[9px] sm:text-sm whitespace-nowrap">
            {type === 'allTime' 
              ? `${entry.xp.toLocaleString()} XP` 
              : `${entry.minutesSpent.toLocaleString()} min`}
          </span>
        </div>
      </div>
    </div>
  );
};

const LeaderboardRow = ({ 
  entry, 
  type, 
  isCurrentUser 
}: { 
  entry: LeaderboardEntry; 
  type: LeaderboardType; 
  isCurrentUser: boolean;
}) => {
  return (
    <div className={`group flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-2xl sm:rounded-3xl border transition-all duration-300 ${
      isCurrentUser 
        ? "bg-gradient-to-r from-[#F1EEFF] to-white border-[#5B4DDB]/20 shadow-lg shadow-[#5B4DDB]/5 scale-[1.01] sm:scale-[1.02] z-10" 
        : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-100"
    }`}>
      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center font-black text-xs sm:text-sm ${
        isCurrentUser ? "bg-[#5B4DDB] text-white" : "bg-slate-50 text-[#7B7F97]"
      }`}>
        {entry.rank}
      </div>

      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#F8F9FF] flex items-center justify-center text-xl sm:text-2xl shadow-inner border border-white select-none shrink-0 text-left">
        {entry.avatar}
      </div>

      <div className="flex-1 min-w-0 text-left">
        <h4 className={`font-black text-sm sm:text-base truncate ${isCurrentUser ? "text-[#5B4DDB]" : "text-[#111827]"}`}>
          {entry.name}
          {isCurrentUser && <span className="ml-1.5 inline-block px-1.5 py-0.5 bg-[#5B4DDB]/10 text-[#5B4DDB] text-[7px] rounded-full uppercase tracking-tighter align-middle">You</span>}
        </h4>
        <p className="text-[#7B7F97] font-bold text-[8px] sm:text-[10px] uppercase tracking-widest text-left">
          Lvl {entry.level}
        </p>
      </div>

      <div className="text-right flex flex-col items-end">
        <div className="flex items-center gap-1 bg-slate-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl border border-slate-100 group-hover:bg-white transition-colors min-w-[70px] sm:min-w-[100px] justify-center">
          <span className="font-black text-[#111827] text-[10px] sm:text-sm whitespace-nowrap">
            {type === 'allTime' 
              ? <>{entry.xp.toLocaleString()} <span className="text-[8px] sm:text-[10px] text-[#7B7F97] opacity-60 ml-0.5">XP</span></>
              : <>{entry.minutesSpent.toLocaleString()} <span className="text-[8px] sm:text-[10px] text-[#7B7F97] opacity-60 ml-0.5">min</span></>
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
