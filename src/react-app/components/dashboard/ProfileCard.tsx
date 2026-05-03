import React from "react";
import { User as UserIcon } from "lucide-react";
import { User } from "../../store/useTaskStore";

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

    if (avatar) {
      return (
        <img
          src={avatar}
          alt="Avatar"
          className="w-full h-full object-cover"
          onError={(e) => {
            // If image fails, clear src to trigger the silhouette fallback below
            (e.target as HTMLImageElement).style.display = 'none';
            const parent = (e.target as HTMLImageElement).parentElement;
            if (parent) {
              const placeholder = document.createElement('div');
              placeholder.className = "w-full h-full flex items-center justify-center bg-slate-200 text-slate-400";
              placeholder.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="40%" height="40%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
              parent.appendChild(placeholder);
            }
          }}
        />
      );
    }

    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
        <UserIcon size="40%" strokeWidth={3} />
      </div>
    );
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-[28px] sm:rounded-[40px] p-5 sm:p-7 border-[3px] sm:border-4 border-slate-100 shadow-[0_6px_0_#f1f5f9] relative overflow-hidden active:translate-y-1 active:shadow-none transition-all duration-200">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 relative z-10">
        <div className="relative shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[32px] bg-slate-50 flex items-center justify-center shadow-inner border-[3px] sm:border-4 border-slate-100 overflow-hidden">
            {renderAvatar()}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#F5B100] text-white px-3 py-1 rounded-xl flex items-center justify-center font-black border-[3px] border-white shadow-[0_3px_0_#d97706] text-xs uppercase tracking-tighter">
            LVL {user?.level || 1}
          </div>
        </div>

        <div className="flex-1 w-full space-y-4">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-4xl font-black text-[#111827] uppercase tracking-tighter leading-none mb-1">
              {user?.name || "Adventurer"}
            </h1>
          </div>

          {/* EXP Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-end px-1">
              <span className="text-[#7B7F97] font-black text-[10px] uppercase tracking-[0.2em]">
                Experience
              </span>
              <span className="text-[#111827] font-black text-xs uppercase tracking-tight">
                {currentExp % 100} / 100 XP
              </span>
            </div>
            <div className="w-full h-5 bg-slate-100 rounded-full overflow-hidden p-1 shadow-inner border-[3px] border-white">
              <div
                className="h-full rounded-full bg-[#5B4DDB] transition-all duration-1000 ease-out shadow-[0_2px_0_#4539a5]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
