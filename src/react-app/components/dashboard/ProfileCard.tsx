import React from "react";
import { Award } from "lucide-react";
import { User } from "../../store/useTaskStore";
import defaultUserIcon from "../../assets/icon/user.png";

interface ProfileCardProps {
  user: User | null;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const currentExp = user?.experience || 0;
  const progress = currentExp % 100;

  const renderAvatar = () => {
    const avatar = user?.avatarUrl;
    const isEmoji =
      avatar &&
      !avatar.includes("/") &&
      !avatar.includes(".") &&
      avatar.length <= 4;

    if (isEmoji) {
      return (
        <div className="text-3xl sm:text-4xl transform hover:scale-110 transition-transform cursor-pointer">
          {avatar}
        </div>
      );
    }

    return (
      <img
        src={avatar || defaultUserIcon}
        alt="Avatar"
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = defaultUserIcon;
        }}
      />
    );
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-[24px] sm:rounded-[32px] p-4 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-white relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 relative z-10">
        <div className="relative shrink-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#D7CCFF] to-[#C7B9FF] flex items-center justify-center shadow-inner border-[4px] border-[#F6F4FF] overflow-hidden">
            {renderAvatar()}
          </div>
          <div className="absolute -bottom-1 -right-1 bg-[#F5B100] text-white px-2 py-0.5 rounded-lg flex items-center justify-center font-black border-2 border-white shadow-md text-[10px]">
            LVL {user?.level || 1}
          </div>
        </div>

        <div className="flex-1 w-full space-y-3">
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-3xl font-black text-[#111827] tracking-tighter leading-none mb-0.5">
              {user?.name || "Adventurer"}
            </h1>
          </div>

          {/* EXP Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-end px-1">
              <span className="text-[#7B7F97] font-black text-[9px] uppercase tracking-widest">
                Experience
              </span>
              <span className="text-[#111827] font-black text-[10px]">
                {currentExp % 100}/100
              </span>
            </div>
            <div className="w-full h-3 bg-[#ECEAF9] rounded-full overflow-hidden p-0.5 shadow-inner border border-white">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#5B4DDB] to-[#7C6CFF] transition-all duration-1000 shadow-[0_2px_10px_rgba(91,77,219,0.3)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
