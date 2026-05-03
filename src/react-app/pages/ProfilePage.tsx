import React, { useMemo } from "react";
import {
  Settings,
  Flame,
  Zap,
  Target,
  Clock,
  ShieldCheck,
  ChevronRight,
  Trophy,
} from "lucide-react";
import { useTaskStore } from "../store/useTaskStore";

const ProfilePage: React.FC = () => {
  const { user, tasks } = useTaskStore();

  const stats = useMemo(() => {
    const completedTasks = tasks.filter((t) => t.status === "completed");
    const totalMinutes = completedTasks.reduce(
      (acc, t) => acc + (t.timeEstimation || 0),
      0,
    );

    return {
      completedCount: completedTasks.length,
      totalMinutes,
      totalXP: user?.experience || 0,
      nextLevelXP: (user?.level || 1) * 100,
      progress: (user?.experience || 0) % 100,
      streak: user?.streak || 0,
    };
  }, [tasks, user]);

  return (
    <div className="w-full max-w-2xl mx-auto pb-32 animate-in fade-in duration-500 space-y-10 px-4 sm:px-0">
      {/* HEADER SECTION - Avatar & Identity */}
      <div className="flex flex-col items-center pt-8 pb-4 relative">
        <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-[#5B4DDB]/10 to-transparent rounded-[40px] -z-10" />

        <div className="relative mb-6 group">
          <div className="w-32 h-32 rounded-[32px] bg-slate-50 flex items-center justify-center text-6xl shadow-[0_12px_0_#f1f5f9] border-[4px] border-white z-10 relative transform group-hover:scale-105 transition-transform duration-300">
            {user?.avatarUrl || "🦊"}
          </div>
          {/* Level Badge Overlay */}
          <div className="absolute -bottom-4 -right-4 bg-[#F5B100] text-white w-14 h-14 rounded-full flex items-center justify-center border-[4px] border-white shadow-[0_6px_0_#d97706] z-20 transform rotate-12 group-hover:rotate-0 transition-transform">
            <div className="flex flex-col items-center leading-none">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-80">
                Lvl
              </span>
              <span className="font-black text-xl">{user?.level || 1}</span>
            </div>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-[#111827] mb-2 uppercase tracking-tighter italic">
          {user?.name || "Adventurer"}
        </h1>
        <div className="bg-[#5B4DDB] text-white px-4 py-1.5 rounded-full border-[3px] border-[#4539a5] shadow-[0_4px_0_#3730a3]">
          <p className="font-black text-[10px] uppercase tracking-[0.2em]">
            Master Scholar
          </p>
        </div>
      </div>

      {/* STATISTICS GRID */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-[#111827] uppercase tracking-tighter italic px-2 flex items-center gap-3">
          <Target className="text-[#5B4DDB]" size={24} strokeWidth={3} />
          Service Record
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <StatCard
            icon={<Flame className="text-white fill-current" size={20} />}
            label="Day Streak"
            value={stats.streak.toString()}
            color="bg-[#FF8A4C] border-[#e67a3d] shadow-[0_6px_0_#ca652d]"
          />
          <StatCard
            icon={<Zap className="text-white fill-current" size={20} />}
            label="Total XP"
            value={stats.totalXP.toString()}
            color="bg-[#F5B100] border-[#d97706] shadow-[0_6px_0_#b45309]"
          />
          <StatCard
            icon={<Trophy className="text-white fill-current" size={20} />}
            label="Quests Done"
            value={stats.completedCount.toString()}
            color="bg-[#5B4DDB] border-[#4539a5] shadow-[0_6px_0_#3730a3]"
          />
          <StatCard
            icon={<Clock className="text-white" size={20} strokeWidth={3} />}
            label="Focus Time"
            value={`${stats.totalMinutes}m`}
            color="bg-[#10B981] border-[#059669] shadow-[0_6px_0_#047857]"
          />
        </div>
      </div>

      {/* ACHIEVEMENTS LIST */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2 mb-2">
          <h2 className="text-xl sm:text-2xl font-black text-[#111827] uppercase tracking-tighter italic flex items-center gap-3">
            <Trophy className="text-[#F5B100]" size={24} strokeWidth={3} />
            Achievements
          </h2>
          <button
            onClick={() =>
              useTaskStore.getState().setCurrentPage("achievements")
            }
            className="text-[10px] font-black text-[#5B4DDB] uppercase tracking-[0.2em] px-4 py-2 border-[3px] border-slate-100 rounded-xl hover:border-[#5B4DDB]/30 hover:bg-[#F1EEFF] transition-all active:translate-y-0.5"
          >
            View All
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <AchievementRow
            icon="🛡️"
            title="Guardian"
            desc="Finish 10 quests"
            progress={stats.completedCount}
            total={10}
            level={1}
            color="bg-blue-100 border-blue-200"
          />
          <AchievementRow
            icon="🔥"
            title="Consistency"
            desc="Reach a 3 day streak"
            progress={stats.streak}
            total={3}
            level={1}
            color="bg-orange-100 border-orange-200"
          />
          <AchievementRow
            icon="💎"
            title="Wealthy"
            desc="Collect 100 coins"
            progress={user?.coins || 0}
            total={100}
            level={1}
            color="bg-yellow-100 border-yellow-200"
          />
        </div>
      </div>

      {/* SETTINGS / SECONDARY ACTIONS */}
      <div className="space-y-4 pt-6">
        <ActionRow
          icon={
            <Settings className="text-[#7B7F97]" size={24} strokeWidth={3} />
          }
          label="Settings"
        />
        <ActionRow
          icon={
            <ShieldCheck className="text-[#7B7F97]" size={24} strokeWidth={3} />
          }
          label="Privacy"
        />
      </div>
    </div>
  );
};

const StatCard = ({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) => (
  <div className="bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-6 border-[4px] border-slate-100 shadow-[0_8px_0_#f1f5f9] flex flex-col gap-4 active:translate-y-1 active:shadow-none transition-all group hover:border-slate-200">
    <div
      className={`w-12 h-12 rounded-2xl flex items-center justify-center border-[3px] ${color} transform group-hover:scale-110 group-hover:-rotate-6 transition-all`}
    >
      {icon}
    </div>
    <div>
      <div className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tighter leading-none mb-1">
        {value}
      </div>
      <div className="text-[10px] font-black text-[#7B7F97] uppercase tracking-[0.2em]">
        {label}
      </div>
    </div>
  </div>
);

const AchievementRow = ({
  icon,
  title,
  desc,
  progress,
  total,
  level,
  color,
}: {
  icon: string;
  title: string;
  desc: string;
  progress: number;
  total: number;
  level: number;
  color: string;
}) => {
  const percentage = Math.min((progress / total) * 100, 100);
  const isCompleted = progress >= total;

  return (
    <div
      className={`bg-white rounded-[32px] p-5 sm:p-6 border-[4px] flex items-center gap-5 sm:gap-6 shadow-[0_10px_0_#f1f5f9] active:translate-y-1 active:shadow-none transition-all ${isCompleted ? "border-[#F5B100] shadow-[0_10px_0_#d97706] bg-[#FFF9E6]" : "border-slate-100 hover:border-slate-200"}`}
    >
      <div
        className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-[20px] sm:rounded-[24px] flex items-center justify-center text-4xl sm:text-5xl border-[3px] border-white shadow-inner ${color} ${isCompleted ? "grayscale-0 transform -rotate-6 scale-110 drop-shadow-md" : "grayscale opacity-70"}`}
      >
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1 sm:items-end gap-2">
          <h3 className="text-sm sm:text-xl font-black text-[#111827] uppercase tracking-tighter italic line-clamp-2 pr-2 leading-tight">
            {title}
          </h3>
          <span className="text-[10px] font-black text-[#7B7F97] uppercase tracking-widest shrink-0 bg-white px-2 py-1 rounded-lg border-2 border-slate-100 shadow-sm">
            Lvl {level}
          </span>
        </div>
        <p className="text-[10px] sm:text-xs font-bold text-[#7B7F97] mb-4 uppercase tracking-widest opacity-80">
          {desc}
        </p>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-4 sm:h-5 bg-slate-100 rounded-full overflow-hidden p-1 shadow-inner border-2 border-white">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${isCompleted ? "bg-[#F5B100]" : "bg-[#5B4DDB]"}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-[10px] font-black text-[#111827] min-w-[40px] text-right uppercase tracking-[0.1em]">
            {progress} / {total}
          </span>
        </div>
      </div>
    </div>
  );
};

const ActionRow = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <button className="w-full bg-white rounded-[24px] p-5 sm:p-6 border-[4px] border-slate-100 flex items-center justify-between shadow-[0_8px_0_#f1f5f9] active:translate-y-1 active:shadow-none transition-all group hover:border-[#5B4DDB]/30">
    <div className="flex items-center gap-5">
      <div className="w-12 h-12 bg-slate-50 rounded-[16px] flex items-center justify-center border-[3px] border-white shadow-inner group-hover:bg-[#F1EEFF] transition-colors">
        {icon}
      </div>
      <span className="text-lg sm:text-xl font-black text-[#111827] uppercase tracking-tighter italic group-hover:text-[#5B4DDB] transition-colors">
        {label}
      </span>
    </div>
    <div className="w-10 h-10 rounded-full border-[3px] border-slate-100 flex items-center justify-center group-hover:border-[#5B4DDB] group-hover:bg-[#5B4DDB] transition-colors">
      <ChevronRight
        className="text-[#7B7F97] group-hover:text-white"
        size={24}
        strokeWidth={4}
      />
    </div>
  </button>
);

export default ProfilePage;
