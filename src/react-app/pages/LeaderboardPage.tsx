import React from 'react';
import { Trophy, Crown, User } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  level: number;
  xp: number;
  avatar: string;
  isCurrentUser?: boolean;
}

const LeaderboardPage: React.FC = () => {
  const leaderboardData: LeaderboardEntry[] = [
    { rank: 1, name: "Alex P.", level: 12, xp: 4500, avatar: "🦊" },
    { rank: 2, name: "Emma S.", level: 11, xp: 3800, avatar: "🐼" },
    { rank: 3, name: "James W.", level: 10, xp: 3200, avatar: "🐱" },
    { rank: 4, name: "Sophia R.", level: 9, xp: 2950, avatar: "🦁" },
    { rank: 5, name: "Lucas M.", level: 8, xp: 2700, avatar: "🐻" },
    { rank: 6, name: "You (Hero)", level: 8, xp: 2550, avatar: "🐯", isCurrentUser: true },
    { rank: 7, name: "Olivia G.", level: 7, xp: 2200, avatar: "🐨" },
    { rank: 8, name: "Noah B.", level: 7, xp: 1950, avatar: "🐰" },
    { rank: 9, name: "Mia K.", level: 6, xp: 1700, avatar: "🐹" },
    { rank: 10, name: "Ethan H.", level: 6, xp: 1500, avatar: "🐭" },
  ];

  const top3 = leaderboardData.slice(0, 3);
  const others = leaderboardData.slice(3);

  return (
    <div className="w-full flex flex-col gap-6 sm:gap-8 pb-32 animate-in fade-in duration-700">
      {/* 1. TOP HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#5B4DDB] via-[#7C6CFF] to-[#A094FF] rounded-[32px] sm:rounded-[48px] p-6 sm:p-12 shadow-[0_20px_50px_rgba(91,77,219,0.3)] border border-white/20">
        <div className="relative z-10 max-w-[200px] sm:max-w-md">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="bg-white/20 backdrop-blur-md p-1.5 sm:p-2 rounded-xl sm:rounded-2xl border border-white/30">
              <Trophy className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-300" />
            </div>
            <span className="text-white/80 font-black text-[8px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em]">Season 1</span>
          </div>
          <h1 className="text-3xl sm:text-6xl font-black text-white mb-2 sm:mb-4 tracking-tighter italic uppercase leading-none">
            Leaderboard
          </h1>
          <p className="text-white/90 text-sm sm:text-xl font-bold leading-tight">
            Compete and climb the ranks!
          </p>
        </div>

        {/* Mascot Area */}
        <div className="absolute right-[-10px] bottom-[-10px] sm:right-12 sm:bottom-6 flex flex-col items-center">
          <div className="relative">
            {/* Mascot Placeholder (Fox) */}
            <div className="bg-white/10 backdrop-blur-xl rounded-[24px] sm:rounded-[40px] p-4 sm:p-8 border border-white/20 flex flex-col items-center shadow-2xl transform rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
              <div className="text-5xl sm:text-8xl drop-shadow-lg select-none">🦊</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TOP 3 PODIUM SECTION */}
      <div className="flex flex-row items-end justify-center gap-2 sm:gap-6 mt-8 sm:mt-12 px-1 sm:px-2">
        {/* Rank 2 */}
        <PodiumCard 
          entry={top3[1]} 
          rank={2} 
          highlightColor="silver" 
          heightClass="h-[120px] sm:h-[240px]" 
        />
        
        {/* Rank 1 */}
        <PodiumCard 
          entry={top3[0]} 
          rank={1} 
          highlightColor="gold" 
          heightClass="h-[150px] sm:h-[300px]" 
          isWinner 
        />
        
        {/* Rank 3 */}
        <PodiumCard 
          entry={top3[2]} 
          rank={3} 
          highlightColor="bronze" 
          heightClass="h-[100px] sm:h-[220px]" 
        />
      </div>

      {/* 3. LEADERBOARD LIST CARD */}
      <div className="bg-white rounded-[32px] sm:rounded-[48px] p-4 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 mt-2 sm:mt-4 overflow-hidden">
        <div className="flex items-center justify-between mb-6 sm:mb-8 px-2 sm:px-4">
          <h2 className="text-base sm:text-xl font-black text-[#111827] uppercase tracking-widest italic text-left">Hall of Fame</h2>
          <div className="flex items-center gap-2 bg-[#F8F9FF] px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl border border-slate-50">
            <User size={12} className="text-[#5B4DDB] sm:w-4 sm:h-4" />
            <span className="text-[8px] sm:text-[10px] font-black text-[#7B7F97] uppercase tracking-widest">Global Ranks</span>
          </div>
        </div>

        <div className="space-y-1 sm:space-y-2">
          {others.map((entry) => (
            <LeaderboardRow key={entry.rank} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  );
};

const PodiumCard = ({ 
  entry, 
  rank, 
  highlightColor, 
  heightClass, 
  isWinner = false 
}: { 
  entry: LeaderboardEntry; 
  rank: number; 
  highlightColor: 'gold' | 'silver' | 'bronze';
  heightClass: string;
  isWinner?: boolean;
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
          <div className="w-full h-full rounded-full bg-slate-50 flex items-center justify-center text-2xl sm:text-5xl select-none">
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
        <p className={`${c.accent} font-black text-[7px] sm:text-[10px] uppercase tracking-widest mb-1.5 sm:mb-3`}>
          Lvl {entry.level}
        </p>
        
        <div className="bg-white/50 backdrop-blur-sm px-2 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-2xl border border-white/50 flex items-center gap-1 sm:gap-2">
          <span className="font-black text-[#111827] text-[9px] sm:text-sm">
            {entry.xp.toLocaleString()} <span className="text-[7px] sm:text-[10px] text-slate-400">XP</span>
          </span>
        </div>
      </div>
    </div>
  );
};

const LeaderboardRow = ({ entry }: { entry: LeaderboardEntry }) => {
  return (
    <div className={`group flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-2xl sm:rounded-3xl border transition-all duration-300 ${
      entry.isCurrentUser 
        ? "bg-gradient-to-r from-[#F1EEFF] to-white border-[#5B4DDB]/20 shadow-lg shadow-[#5B4DDB]/5 scale-[1.01] sm:scale-[1.02] z-10" 
        : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-100"
    }`}>
      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center font-black text-xs sm:text-sm ${
        entry.isCurrentUser ? "bg-[#5B4DDB] text-white" : "bg-slate-50 text-[#7B7F97]"
      }`}>
        {entry.rank}
      </div>

      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#F8F9FF] flex items-center justify-center text-xl sm:text-2xl shadow-inner border border-white select-none shrink-0">
        {entry.avatar}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className={`font-black text-sm sm:text-base truncate ${entry.isCurrentUser ? "text-[#5B4DDB]" : "text-[#111827]"}`}>
          {entry.name}
          {entry.isCurrentUser && <span className="ml-1.5 inline-block px-1.5 py-0.5 bg-[#5B4DDB]/10 text-[#5B4DDB] text-[7px] rounded-full uppercase tracking-tighter align-middle">You</span>}
        </h4>
        <p className="text-[#7B7F97] font-bold text-[8px] sm:text-[10px] uppercase tracking-widest">
          Lvl {entry.level}
        </p>
      </div>

      <div className="text-right flex flex-col items-end">
        <div className="flex items-center gap-1 bg-slate-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl border border-slate-100 group-hover:bg-white transition-colors">
          <span className="font-black text-[#111827] text-xs sm:text-sm">
            {entry.xp.toLocaleString()} <span className="text-[8px] sm:text-[10px] text-[#7B7F97] opacity-60">XP</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
