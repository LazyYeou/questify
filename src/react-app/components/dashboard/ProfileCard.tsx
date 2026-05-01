import React from 'react';
import { Award } from 'lucide-react';
import { User } from '../../store/useTaskStore';

interface ProfileCardProps {
  user: User | null;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const currentExp = user?.experience || 0;
  const progress = currentExp % 100;

  return (
    <div className="lg:col-span-2 bg-white rounded-[32px] sm:rounded-[48px] p-5 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
        <div className="relative shrink-0">
          <div className="w-24 h-24 sm:w-36 sm:h-32 rounded-full bg-gradient-to-br from-[#D7CCFF] to-[#C7B9FF] flex items-center justify-center shadow-inner border-[6px] border-[#F6F4FF] overflow-hidden">
            <div className="text-5xl sm:text-7xl transform hover:scale-110 transition-transform cursor-pointer">
              🦊
            </div>
          </div>
          <div className="absolute -bottom-2 -right-1 bg-[#F5B100] text-white px-3 py-1 rounded-xl flex items-center justify-center font-black border-4 border-white shadow-lg text-sm">
            LVL {user?.level || 1}
          </div>
        </div>

        <div className="flex-1 w-full space-y-4">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-5xl font-black text-[#111827] tracking-tighter leading-none mb-1">
              {user?.name || "Adventurer"}
            </h1>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-[#5B4DDB] font-extrabold uppercase tracking-widest text-[10px] sm:text-xs bg-[#F1EEFF] px-3 py-1 rounded-full">
                Legendary Scholar
              </span>
              <div className="flex items-center gap-1 text-[#F5B100] font-black text-xs">
                <Award size={14} />
                <span>Top 1%</span>
              </div>
            </div>
          </div>

          {/* EXP Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-end px-1">
              <span className="text-[#7B7F97] font-black text-[10px] uppercase tracking-widest">
                Experience Point
              </span>
              <span className="text-[#111827] font-black text-sm">
                {currentExp % 100} / 100
              </span>
            </div>
            <div className="w-full h-5 bg-[#ECEAF9] rounded-full overflow-hidden p-1 shadow-inner border border-white">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#5B4DDB] to-[#7C6CFF] transition-all duration-1000 shadow-[0_2px_10px_rgba(91,77,219,0.4)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
