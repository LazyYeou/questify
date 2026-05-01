import React from 'react';
import { Flame, Trophy } from 'lucide-react';
import { User } from '../../store/useTaskStore';

interface StreakCardProps {
  user: User | null;
}

export const StreakCard: React.FC<StreakCardProps> = ({ user }) => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const today = new Date().getDay();
  const streak = user?.streak || 0;
  
  // Check if today was already completed
  const lastStreakDate = user?.lastStreakAt ? new Date(user.lastStreakAt) : null;
  const isTodayCompleted = lastStreakDate 
    ? lastStreakDate.toDateString() === new Date().toDateString()
    : false;

  // Calculate which days of the current week are part of the streak
  const weekStatus = days.map((_, index) => {
    if (index > today) return 'future';
    
    if (index === today) return isTodayCompleted ? 'active' : 'pending';
    
    const daysAgo = today - index;
    // If today is completed, the streak goes back 'streak - 1' days from yesterday
    // If today is NOT completed, the streak goes back 'streak' days from yesterday
    const effectiveStreak = isTodayCompleted ? streak : streak + 1;
    return effectiveStreak > daysAgo ? 'active' : 'missed';
  });

  return (
    <div className="bg-gradient-to-br from-[#FFB52E] to-[#FF9800] rounded-[24px] sm:rounded-[32px] p-3.5 sm:p-4 text-white relative overflow-hidden shadow-[0_15px_30px_rgba(255,152,0,0.2)] border border-white/20 flex flex-col justify-between group h-full">
      {/* Background Decoration */}
      <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
        <Flame size={100} fill="currentColor" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-md border border-white/20">
              <Flame className="w-4 h-4 fill-current animate-pulse text-white" />
            </div>
            <h2 className="text-[10px] font-black tracking-widest uppercase italic leading-none">
              Streak
            </h2>
          </div>
          
          <div className="flex items-center gap-1 bg-black/10 px-2 py-0.5 rounded-full border border-white/5">
            <Trophy className="w-2.5 h-2.5 text-white/80" />
            <span className="text-[8px] font-black uppercase tracking-tighter">
              Best: {user?.longestStreak || 0}
            </span>
          </div>
        </div>

        <div className="flex items-baseline gap-1.5 mb-2">
          <span className="text-4xl sm:text-5xl font-black italic tracking-tighter drop-shadow-md">
            {streak}
          </span>
          <span className="text-sm font-black uppercase italic opacity-80">
            Days
          </span>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const status = weekStatus[index];
            const isActive = status === 'active';
            const isToday = index === today;

            return (
              <div
                key={index}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={`w-full aspect-square rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${
                    isActive
                      ? "bg-white shadow-[0_5px_15px_rgba(255,255,255,0.4)] border-white"
                      : isToday
                      ? "bg-white/30 border-white/40 border-dashed"
                      : "bg-black/10 border-white/5 opacity-40"
                  }`}
                >
                  <Flame
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? "text-[#FF9800] fill-current" : "text-white/50"}`}
                  />
                </div>
                <span className={`text-[10px] font-black uppercase ${isToday ? "opacity-100" : "opacity-50"}`}>
                  {day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
