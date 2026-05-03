import React, { useMemo } from "react";
import {
  Settings,
  Flame,
  Zap,
  Target,
  Clock,
  ShieldCheck,
  ChevronRight,
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
    <div className="w-full max-w-2xl mx-auto pb-32 animate-in fade-in duration-500 space-y-8 px-4 sm:px-0">
      
      {/* HEADER SECTION - Avatar & Identity */}
      <div className="flex flex-col items-center pt-8 pb-4">
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-6xl shadow-[0_8px_0_rgba(0,0,0,0.05)] border-4 border-slate-100 z-10 relative">
            {user?.avatarUrl || "🦊"}
          </div>
          {/* Level Badge Overlay */}
          <div className="absolute -bottom-2 right-0 bg-[#5B4DDB] text-white w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-md z-20">
            <span className="font-black text-sm">{user?.level || 1}</span>
          </div>
        </div>

        <h1 className="text-2xl font-black text-[#111827] mb-1">
          {user?.name || "Adventurer"}
        </h1>
        <p className="text-[#7B7F97] font-bold text-sm mb-6 uppercase tracking-wider">
          Master Scholar
        </p>

        {/* Following / Followers (Duolingo style social metrics, optional, maybe add "Friends") */}
      </div>

      <div className="border-t-2 border-slate-100 -mx-4 sm:mx-0"></div>

      {/* STATISTICS GRID */}
      <div className="space-y-4 pt-4">
        <h2 className="text-xl font-black text-[#111827] px-2">Statistics</h2>
        <div className="grid grid-cols-2 gap-4">
          <StatCard 
            icon={<Flame className="text-[#FF8A4C] fill-[#FF8A4C]" size={24} />} 
            label="Day Streak" 
            value={stats.streak.toString()}
            color="border-[#FF8A4C]/20"
          />
          <StatCard 
            icon={<Zap className="text-[#F5B100] fill-[#F5B100]" size={24} />} 
            label="Total XP" 
            value={stats.totalXP.toString()}
            color="border-[#F5B100]/20"
          />
          <StatCard 
            icon={<Target className="text-[#5B4DDB]" size={24} />} 
            label="Quests Done" 
            value={stats.completedCount.toString()}
            color="border-[#5B4DDB]/20"
          />
          <StatCard 
            icon={<Clock className="text-[#10B981]" size={24} />} 
            label="Focus Time" 
            value={`${stats.totalMinutes}m`}
            color="border-[#10B981]/20"
          />
        </div>
      </div>

      <div className="border-t-2 border-slate-100 -mx-4 sm:mx-0"></div>

      {/* ACHIEVEMENTS LIST */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between px-2 mb-2">
          <h2 className="text-xl font-black text-[#111827]">Achievements</h2>
          <button 
            onClick={() => useTaskStore.getState().setCurrentPage("achievements")}
            className="text-sm font-bold text-[#5B4DDB] uppercase tracking-wider hover:text-[#4539a5] transition-colors"
          >
            View All
          </button>
        </div>

        <div className="flex flex-col gap-4">
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
            icon="⚡"
            title="Mr. Consistency"
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
      
      <div className="border-t-2 border-slate-100 -mx-4 sm:mx-0"></div>

      {/* SETTINGS / SECONDARY ACTIONS */}
      <div className="space-y-4 pt-4">
        <ActionRow icon={<Settings className="text-[#7B7F97]" size={24} />} label="Settings" />
        <ActionRow icon={<ShieldCheck className="text-[#7B7F97]" size={24} />} label="Privacy" />
      </div>

    </div>
  );
};

const StatCard = ({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) => (
  <div className={`bg-white rounded-2xl p-4 border-2 ${color} flex flex-col gap-2 shadow-[0_4px_0_rgba(0,0,0,0.02)] active:translate-y-1 active:shadow-none transition-all`}>
    {icon}
    <div>
      <div className="text-xl font-black text-[#111827]">{value}</div>
      <div className="text-[13px] font-bold text-[#7B7F97]">{label}</div>
    </div>
  </div>
);

const AchievementRow = ({ icon, title, desc, progress, total, level, color }: { icon: string, title: string, desc: string, progress: number, total: number, level: number, color: string }) => {
  const percentage = Math.min((progress / total) * 100, 100);
  const isCompleted = progress >= total;

  return (
    <div className={`bg-white rounded-2xl p-4 border-2 border-slate-100 flex items-center gap-4 shadow-[0_4px_0_rgba(0,0,0,0.02)] active:translate-y-1 active:shadow-none transition-all ${isCompleted ? 'bg-amber-50/50' : ''}`}>
      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl border-2 ${color} ${isCompleted ? 'grayscale-0' : 'grayscale opacity-70'}`}>
        {icon}
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-black text-[#111827]">{title}</h3>
          <span className="text-xs font-bold text-[#7B7F97]">Level {level}</span>
        </div>
        <p className="text-[13px] font-bold text-[#7B7F97] mb-3">{desc}</p>
        
        <div className="flex items-center gap-3">
          <div className="flex-1 h-3.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-400 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-xs font-black text-[#7B7F97] min-w-[40px] text-right">
            {progress} / {total}
          </span>
        </div>
      </div>
    </div>
  );
};

const ActionRow = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <button className="w-full bg-white rounded-2xl p-4 border-2 border-slate-100 flex items-center justify-between shadow-[0_4px_0_rgba(0,0,0,0.02)] active:translate-y-1 active:shadow-none transition-all group hover:border-[#5B4DDB]/30">
    <div className="flex items-center gap-4">
      {icon}
      <span className="text-lg font-bold text-[#111827] group-hover:text-[#5B4DDB] transition-colors">{label}</span>
    </div>
    <ChevronRight className="text-[#7B7F97] group-hover:text-[#5B4DDB]" size={20} />
  </button>
);

export default ProfilePage;