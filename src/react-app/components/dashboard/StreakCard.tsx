import React from 'react';
import { Flame } from 'lucide-react';
import { User } from '../../store/useTaskStore';

interface StreakCardProps {
  user: User | null;
}

export const StreakCard: React.FC<StreakCardProps> = ({ user }) => {
  return (
    <div className="bg-gradient-to-br from-[#FFB52E] to-[#FF9800] rounded-[32px] sm:rounded-[48px] p-6 sm:p-8 text-white relative overflow-hidden shadow-[0_20px_40px_rgba(255,152,0,0.3)] border border-white/20 flex flex-col justify-between group">
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white/20 rounded-2xl backdrop-blur-md border border-white/20 shadow-xl">
            <Flame className="w-6 h-6 fill-current animate-pulse" />
          </div>
          <h2 className="text-lg font-black tracking-widest uppercase italic">
            Daily Streak
          </h2>
        </div>
        <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-4">
          {[1, 2, 3, 4, 5].map((day) => {
            const isActive = day <= (user?.streak || 0);
            return (
              <div
                key={day}
                className="flex flex-col items-center gap-1.5"
              >
                <div
                  className={`w-full aspect-square rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${
                    isActive
                      ? "bg-white shadow-[0_5px_15px_rgba(255,255,255,0.4)] border-white"
                      : "bg-black/10 border-white/10 opacity-40"
                  }`}
                >
                  <Flame
                    className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? "text-[#FF9800] fill-current" : "text-white"}`}
                  />
                </div>
                <span className="text-[9px] font-black uppercase opacity-70">
                  Day {day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
