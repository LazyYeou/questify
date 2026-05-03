import React, { useMemo } from "react";
import { Trophy, CheckCircle2, Lock } from "lucide-react";
import { useTaskStore } from "../store/useTaskStore";

// Dummy Achievement Data
const DUMMY_ACHIEVEMENTS = [
  { id: 1, icon: "🗡️", title: "Squire's First Blood", desc: "Finish 10 quests", requiredValue: 10, type: "quests" },
  { id: 2, icon: "🏕️", title: "Campfire Rest", desc: "Reach a 3 day streak", requiredValue: 3, type: "streak" },
  { id: 3, icon: "💰", title: "Merchant's Purse", desc: "Collect 100 coins", requiredValue: 100, type: "coins" },
  { id: 4, icon: "🔥", title: "Beacon of Light", desc: "Reach a 7 day streak", requiredValue: 7, type: "streak" },
  { id: 5, icon: "🛡️", title: "Knight of the Realm", desc: "Finish 50 quests", requiredValue: 50, type: "quests" },
  { id: 6, icon: "🐉", title: "Dragon's Bane", desc: "Finish 100 quests", requiredValue: 100, type: "quests" },
  { id: 7, icon: "👑", title: "Vault of the King", desc: "Collect 1000 coins", requiredValue: 1000, type: "coins" },
  { id: 8, icon: "🏹", title: "Ranger's Mark", desc: "Complete all daily quests", requiredValue: 1, type: "daily" },
  { id: 9, icon: "📜", title: "Archmage's Wisdom", desc: "Focus for 10 hours", requiredValue: 600, type: "focus" },
  { id: 10, icon: "🦇", title: "Thief in the Night", desc: "Complete a quest after midnight", requiredValue: 1, type: "night" },
  { id: 11, icon: "🐎", title: "Courier's Haste", desc: "Finish a quest in under 5 mins", requiredValue: 1, type: "speed" },
  { id: 12, icon: "🎖️", title: "Veteran Mercenary", desc: "Reach Level 10", requiredValue: 10, type: "level" },
  { id: 13, icon: "🏰", title: "Lord of the Manor", desc: "Reach Level 50", requiredValue: 50, type: "level" },
  { id: 14, icon: "⚔️", title: "Grand Champion", desc: "Place 1st in the Leaderboard", requiredValue: 1, type: "rank" },
  { id: 15, icon: "🧙‍♂️", title: "Legendary Hero", desc: "Complete 1000 quests", requiredValue: 1000, type: "quests" },
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
    <div className="w-full max-w-2xl mx-auto pb-32 pt-16 animate-in fade-in duration-500 space-y-6 px-4 sm:px-0">
      
      {/* HEADER */}
      <div className="flex flex-col items-center pt-8 pb-4">
        <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center text-5xl mb-4 border-4 border-amber-300 shadow-[0_4px_0_rgba(251,191,36,0.3)]">
          <Trophy className="text-amber-500 w-12 h-12" />
        </div>
        <h1 className="text-3xl font-black text-[#111827] mb-1 uppercase tracking-tighter">
          Achievements
        </h1>
        <p className="text-[#7B7F97] font-bold text-sm text-center px-4">
          Complete quests and build streaks to unlock rewards.
        </p>
      </div>

      <div className="border-t-2 border-slate-100 -mx-4 sm:mx-0"></div>

      {/* ACHIEVEMENTS LIST */}
      <div className="flex flex-col gap-4 pt-2">
        {DUMMY_ACHIEVEMENTS.map((achievement) => {
          // Get current progress based on achievement type
          let currentProgress = 0;
          if (achievement.type in stats) {
            currentProgress = stats[achievement.type as keyof typeof stats];
          }

          const isCompleted = currentProgress >= achievement.requiredValue;
          // Clamp progress for display
          const displayProgress = Math.min(currentProgress, achievement.requiredValue);

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
  isCompleted 
}: { 
  icon: string, 
  title: string, 
  desc: string, 
  progress: number, 
  total: number,
  isCompleted: boolean 
}) => {
  const percentage = Math.min((progress / total) * 100, 100);

  return (
    <div className={`bg-white rounded-3xl p-5 border-2 ${isCompleted ? 'border-amber-200 bg-amber-50/30' : 'border-slate-100'} flex items-center gap-4 shadow-[0_4px_0_rgba(0,0,0,0.02)] transition-all relative overflow-hidden`}>
      
      {/* Icon Container */}
      <div className={`w-16 h-16 rounded-full flex shrink-0 items-center justify-center text-3xl border-2 z-10 ${isCompleted ? 'bg-white border-amber-300 shadow-sm' : 'bg-slate-50 border-slate-200 grayscale opacity-70'}`}>
        {icon}
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0 z-10">
        <div className="flex justify-between items-start mb-1">
          <h3 className={`text-lg font-black truncate pr-2 ${isCompleted ? 'text-amber-700' : 'text-[#111827]'}`}>{title}</h3>
          {isCompleted && (
            <CheckCircle2 className="text-amber-500 w-5 h-5 shrink-0 mt-0.5" />
          )}
          {!isCompleted && (
            <Lock className="text-slate-300 w-4 h-4 shrink-0 mt-1" />
          )}
        </div>
        
        <p className={`text-[13px] font-bold mb-3 truncate ${isCompleted ? 'text-amber-600/80' : 'text-[#7B7F97]'}`}>
          {desc}
        </p>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-3.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ease-out ${isCompleted ? 'bg-amber-400' : 'bg-slate-300'}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className={`text-xs font-black min-w-[40px] text-right ${isCompleted ? 'text-amber-500' : 'text-[#7B7F97]'}`}>
            {progress} / {total}
          </span>
        </div>
      </div>

      {/* Decorative background flair for completed */}
      {isCompleted && (
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-amber-100/50 to-transparent pointer-events-none" />
      )}
    </div>
  );
};

export default AchievementsPage;