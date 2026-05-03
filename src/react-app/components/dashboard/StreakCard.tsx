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
  
  const lastStreakDate = user?.lastStreakAt ? new Date(user.lastStreakAt) : null;
  const isTodayCompleted = lastStreakDate 
    ? lastStreakDate.toDateString() === new Date().toDateString()
    : false;

  const weekStatus = days.map((_, index) => {
    if (index > today) return 'future';
    if (index === today) return isTodayCompleted ? 'active' : 'pending';
    const daysAgo = today - index;
    const effectiveStreak = isTodayCompleted ? streak : streak + 1;
    return effectiveStreak > daysAgo ? 'active' : 'missed';
  });

  return (
    <div className="bg-[#FF8A4C] rounded-[28px] sm:rounded-[40px] p-5 sm:p-6 text-white relative overflow-hidden border-[3px] sm:border-4 border-[#e67a3d] shadow-[0_6px_0_#ca652d] flex flex-col justify-between group h-full active:translate-y-1 active:shadow-none transition-all duration-200">
      {/* 3D Surface Effect */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-white/20 border-b-[3px] border-[#e67a3d]/30 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center border-2 border-white/20">
              <Flame className="w-5 h-5 fill-current text-white animate-pulse" />
            </div>
            <h2 className="text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase leading-none">
              Streak
            </h2>
          </div>
          
          <div className="flex items-center gap-1.5 bg-black/10 px-3 py-1 rounded-full border-2 border-white/10">
            <Trophy className="w-3 h-3 text-white/90" />
            <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest">
              Best: {user?.longestStreak || 0}
            </span>
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-5xl sm:text-6xl font-black uppercase tracking-tighter drop-shadow-[0_2px_0_rgba(0,0,0,0.1)]">
            {streak}
          </span>
          <span className="text-sm sm:text-base font-black uppercase tracking-widest opacity-80">
            Days
          </span>
        </div>

        <div className="grid grid-cols-7 gap-1.5">
          {days.map((day, index) => {
            const status = weekStatus[index];
            const isActive = status === 'active';
            const isToday = index === today;

            return (
              <div key={index} className="flex flex-col items-center gap-2">
                <div
                  className={`w-full aspect-square rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 border-[3px] ${
                    isActive
                      ? "bg-white border-white shadow-[0_3px_0_#ca652d]"
                      : isToday
                      ? "bg-white/20 border-white/40 border-dashed"
                      : "bg-black/10 border-white/5 opacity-40"
                  }`}
                >
                  <Flame
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? "text-[#FF8A4C] fill-current" : "text-white/50"}`}
                  />
                </div>
                <span className={`text-[9px] font-black uppercase tracking-tighter ${isToday ? "opacity-100" : "opacity-40"}`}>
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
