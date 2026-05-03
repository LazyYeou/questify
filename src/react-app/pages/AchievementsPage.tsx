import React, { useMemo } from "react";
import { Trophy, CheckCircle2, Lock } from "lucide-react";
import { useTaskStore } from "../store/useTaskStore";

// Dummy Achievement Data
const DUMMY_ACHIEVEMENTS = [
  {
    id: 1,
    icon: "🗡️",
    title: "Squire's First Blood",
    desc: "Finish 10 quests",
    requiredValue: 10,
    type: "quests",
  },
  {
    id: 2,
    icon: "🏕️",
    title: "Campfire Rest",
    desc: "Reach a 3 day streak",
    requiredValue: 3,
    type: "streak",
  },
  {
    id: 3,
    icon: "💰",
    title: "Merchant's Purse",
    desc: "Collect 100 coins",
    requiredValue: 100,
    type: "coins",
  },
  {
    id: 4,
    icon: "🔥",
    title: "Beacon of Light",
    desc: "Reach a 7 day streak",
    requiredValue: 7,
    type: "streak",
  },
  {
    id: 5,
    icon: "🛡️",
    title: "Knight of the Realm",
    desc: "Finish 50 quests",
    requiredValue: 50,
    type: "quests",
  },
  {
    id: 6,
    icon: "🐉",
    title: "Dragon's Bane",
    desc: "Finish 100 quests",
    requiredValue: 100,
    type: "quests",
  },
  {
    id: 7,
    icon: "👑",
    title: "Vault of the King",
    desc: "Collect 1000 coins",
    requiredValue: 1000,
    type: "coins",
  },
  {
    id: 8,
    icon: "🏹",
    title: "Ranger's Mark",
    desc: "Complete all daily quests",
    requiredValue: 1,
    type: "daily",
  },
  {
    id: 9,
    icon: "📜",
    title: "Archmage's Wisdom",
    desc: "Focus for 10 hours",
    requiredValue: 600,
    type: "focus",
  },
  {
    id: 10,
    icon: "🦇",
    title: "Thief in the Night",
    desc: "Complete a quest after midnight",
    requiredValue: 1,
    type: "night",
  },
  {
    id: 11,
    icon: "🐎",
    title: "Courier's Haste",
    desc: "Finish a quest in under 5 mins",
    requiredValue: 1,
    type: "speed",
  },
  {
    id: 12,
    icon: "🎖️",
    title: "Veteran Mercenary",
    desc: "Reach Level 10",
    requiredValue: 10,
    type: "level",
  },
  {
    id: 13,
    icon: "🏰",
    title: "Lord of the Manor",
    desc: "Reach Level 50",
    requiredValue: 50,
    type: "level",
  },
  {
    id: 14,
    icon: "⚔️",
    title: "Grand Champion",
    desc: "Place 1st in the Leaderboard",
    requiredValue: 1,
    type: "rank",
  },
  {
    id: 15,
    icon: "🧙‍♂️",
    title: "Legendary Hero",
    desc: "Complete 1000 quests",
    requiredValue: 1000,
    type: "quests",
  },
];

const AchievementsPage: React.FC = () => {
  const { user, tasks } = useTaskStore();

  const stats = useMemo(() => {
    const completedTasks = tasks.filter((t) => t.status === "completed");
    const totalMinutes = completedTasks.reduce(
      (acc, t) => acc + (t.timeEstimation || 0),
      0,
    );
    return {
      quests: completedTasks.length,
      focus: totalMinutes,
      streak: user?.longestStreak || 0,
      coins: user?.coins || 0,
      level: user?.level || 1,
      // For dummy ones, hardcode some values
      daily: 0,
      night: 0,
      speed: 0,
      rank: 3, // some dummy rank
    };
  }, [tasks, user]);

  return (
    <div className="w-full max-w-2xl mx-auto pb-32 pt-8 sm:pt-12 animate-in fade-in duration-500 px-4 sm:px-0 font-sans">
      {/* HEADER SECTION */}
      <div className="flex flex-col items-center mb-10 relative">
        <div className="bg-[#F5B100] text-white px-8 py-4 sm:py-5 rounded-[24px] border-[4px] border-[#d97706] shadow-[0_8px_0_#b45309] text-center w-full max-w-md">
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter italic leading-none">
            Achievements
          </h1>
        </div>
        <p className="text-[#7B7F97] font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] mt-4 text-center">
          Unlock legends and build your legacy
        </p>
      </div>

      {/* ACHIEVEMENTS LIST */}
      <div className="flex flex-col gap-5">
        {DUMMY_ACHIEVEMENTS.map((achievement) => {
          let currentProgress = 0;
          if (achievement.type in stats) {
            currentProgress = stats[achievement.type as keyof typeof stats];
          }

          const isCompleted = currentProgress >= achievement.requiredValue;
          const displayProgress = Math.min(
            currentProgress,
            achievement.requiredValue,
          );

          return (
            <AchievementCard
              key={achievement.id}
              icon={achievement.icon}
              title={achievement.title}
              desc={achievement.desc}
              progress={displayProgress}
              total={achievement.requiredValue}
              isCompleted={isCompleted}
            />
          );
        })}
      </div>
    </div>
  );
};

const AchievementCard = ({
  icon,
  title,
  desc,
  progress,
  total,
  isCompleted,
}: {
  icon: string;
  title: string;
  desc: string;
  progress: number;
  total: number;
  isCompleted: boolean;
}) => {
  const percentage = Math.min((progress / total) * 100, 100);

  return (
    <div
      className={`bg-white rounded-[32px] p-5 sm:p-6 border-[4px] flex items-center gap-5 sm:gap-6 shadow-[0_10px_0_#f1f5f9] active:translate-y-1 active:shadow-none transition-all ${isCompleted ? "border-[#F5B100] shadow-[0_10px_0_#d97706] bg-[#FFF9E6]" : "border-slate-100 hover:border-slate-200"}`}
    >
      {/* Icon Container */}
      <div
        className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-[20px] sm:rounded-[24px] flex items-center justify-center text-4xl sm:text-5xl border-[3px] border-white shadow-inner bg-slate-50 transition-all duration-300 ${isCompleted ? "grayscale-0 transform -rotate-6 scale-110 drop-shadow-md" : "grayscale opacity-70"}`}
      >
        <span className="drop-shadow-sm">{icon}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 z-10">
        <div className="flex justify-between items-start sm:items-end gap-2 mb-1">
          <h3
            className={`text-sm sm:text-xl font-black uppercase tracking-tighter italic line-clamp-2 pr-2 leading-tight ${isCompleted ? "text-[#111827]" : "text-[#7B7F97]"}`}
          >
            {title}
          </h3>
          {isCompleted ? (
            <div className="bg-[#10B981] text-white p-1 rounded-full border-2 border-[#059669] shadow-sm shrink-0 mb-1">
              <CheckCircle2 size={14} strokeWidth={4} />
            </div>
          ) : (
            <div className="bg-slate-100 text-[#7B7F97] p-1.5 rounded-full border-2 border-slate-200 shrink-0 mb-1">
              <Lock size={12} strokeWidth={4} />
            </div>
          )}
        </div>

        <p
          className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 line-clamp-1 ${isCompleted ? "text-[#F5B100]" : "text-[#7B7F97] opacity-80"}`}
        >
          {desc}
        </p>

        {/* Progress Bar */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-4 sm:h-5 bg-slate-100 rounded-full overflow-hidden p-1 shadow-inner border-2 border-white">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${isCompleted ? "bg-[#F5B100]" : "bg-[#5B4DDB]"}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span
            className={`text-[10px] font-black min-w-[40px] text-right uppercase tracking-[0.1em] ${isCompleted ? "text-[#111827]" : "text-[#7B7F97]"}`}
          >
            {progress} / {total}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;
