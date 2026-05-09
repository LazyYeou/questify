import React, { useEffect } from "react";
import { Sparkles, Trophy, Target, CheckCircle2, Gift, Zap } from "lucide-react";
import questMascot from "../assets/mascot/levelup.png";
import { useTaskStore, Quest } from "../store/useTaskStore";

// --- Reusable Sub-components ---

const QuestHeroCard: React.FC = () => (
  <div className="w-full bg-[#5B4DDB] rounded-[32px] p-6 sm:p-10 text-white relative overflow-hidden border-[4px] border-[#4539a5] shadow-[0_8px_0_#3730a3] mb-8 group">
    <div className="absolute top-0 left-0 right-0 h-4 bg-white/20 border-b-[3px] border-[#4539a5]/30 pointer-events-none" />

    <div className="relative z-10 flex items-center justify-between">
      <div className="max-w-[70%]">
        <h1 className="text-4xl sm:text-6xl font-black tracking-tighter mb-2 uppercase italic leading-none drop-shadow-[0_4px_0_rgba(0,0,0,0.1)]">
          QUESTS
        </h1>
        <p className="text-white font-bold text-xs sm:text-lg leading-tight uppercase tracking-tight opacity-90">
          Complete objectives to earn rewards
        </p>
      </div>
      <div className="relative w-[30%] flex justify-end pointer-events-none z-10">
        <img
          src={questMascot}
          alt="Quest Mascot"
          className="w-24 h-24 sm:w-40 sm:h-40 object-contain drop-shadow-2xl -scale-x-100 absolute -right-2 sm:-right-4 -bottom-10 sm:-bottom-20"
        />
      </div>
    </div>
  </div>
);

interface QuestCardProps {
  quest: Quest;
  onClaim: (id: string) => void;
}

const QuestCard: React.FC<QuestCardProps> = ({ quest, onClaim }) => {
  if (!quest) return null;

  const { id, title, description, currentProgress, goalValue, type, isCompleted, isClaimed, rewardExp, rewardCoins } = quest;
  const isDaily = type === "daily";
  const percent = Math.min(100, (currentProgress / (goalValue || 1)) * 100);
  
  const colorClass = isDaily ? "bg-[#5B4DDB]" : "bg-[#FF8A4C]";
  const textColorClass = isDaily ? "text-[#5B4DDB]" : "text-[#FF8A4C]";

  return (
    <div className={`bg-white rounded-[24px] p-5 sm:p-6 border-[3px] border-slate-100 shadow-[0_6px_0_#f1f5f9] transition-all relative overflow-hidden flex flex-col h-full ${isClaimed ? "opacity-60 grayscale-[0.3]" : "hover:translate-y-0.5"}`}>
      <div className="flex-1 flex flex-col gap-4">
        {/* Header Info */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h2 className={`text-sm sm:text-base font-black uppercase tracking-tight truncate ${textColorClass}`}>
                {title}
              </h2>
              {isCompleted && !isClaimed && (
                <Sparkles className="text-amber-400 fill-current animate-pulse" size={14} />
              )}
            </div>
            <p className="text-[#111827] font-bold text-xs sm:text-sm uppercase tracking-tighter opacity-70 line-clamp-1">
              {description}
            </p>
          </div>
          
          {/* Compact Rewards */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
              <Zap size={10} className="text-amber-500 fill-current" />
              <span className="font-black text-[10px] text-[#111827]">{rewardExp}</span>
            </div>
            <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
              <Gift size={10} className="text-[#5B4DDB]" />
              <span className="font-black text-[10px] text-[#111827]">{rewardCoins}</span>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <span className="text-[#7B7F97] font-black text-[8px] uppercase tracking-[0.2em]">
              Progress
            </span>
            <span className={`font-black text-[10px] tabular-nums ${textColorClass}`}>
              {currentProgress} / {goalValue}
            </span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 shadow-inner border-2 border-white">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${colorClass}`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action Area */}
      <div className="mt-4 pt-2">
        {isClaimed ? (
          <div className="w-full bg-slate-100 text-slate-400 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] border-[2px] border-slate-200 flex items-center justify-center gap-2">
            <CheckCircle2 size={14} strokeWidth={3} />
            Completed
          </div>
        ) : isCompleted ? (
          <button
            onClick={() => onClaim(id)}
            className="w-full bg-emerald-500 text-white py-2.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] border-[3px] border-emerald-600 shadow-[0_4px_0_#059669] hover:translate-y-0.5 hover:shadow-[0_2px_0_#059669] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
          >
            <Sparkles size={14} className="fill-current animate-pulse" />
            Claim Reward
          </button>
        ) : (
          <div className="w-full bg-slate-50 text-slate-400 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] border-[2px] border-slate-100 flex items-center justify-center gap-2 opacity-60">
            In Progress
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Page Component ---

const QuestsPage: React.FC = () => {
  const { quests, fetchQuests, claimQuestReward } = useTaskStore();

  useEffect(() => {
    fetchQuests();
  }, [fetchQuests]);

  const allQuests = Array.isArray(quests) ? quests : [];
  const dailyQuests = allQuests.filter(q => q && q.type === "daily");
  const weeklyQuests = allQuests.filter(q => q && q.type === "weekly");

  return (
    <div className="w-full max-w-4xl mx-auto pb-32 px-4 font-sans bg-[#F8F9FF] min-h-screen pt-8">
      <QuestHeroCard />

      <div className="space-y-12">
        {/* Daily Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 px-1">
            <div className="w-10 h-10 bg-[#F1EEFF] rounded-xl flex items-center justify-center border-[2px] border-[#5B4DDB]/20">
              <Target className="text-[#5B4DDB]" size={20} strokeWidth={3} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#111827] uppercase tracking-tighter italic">Daily Objectives</h2>
              <p className="text-[#7B7F97] font-bold text-[8px] uppercase tracking-widest">Resets at midnight</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dailyQuests.length > 0 ? dailyQuests.map(q => (
              <QuestCard key={q.id} quest={q} onClaim={claimQuestReward} />
            )) : (
              <div className="col-span-full bg-white rounded-[24px] p-8 border-[3px] border-slate-100 border-dashed flex flex-col items-center justify-center text-center opacity-60">
                <p className="font-black text-slate-400 text-[10px] uppercase tracking-widest">No daily quests found</p>
              </div>
            )}
          </div>
        </section>

        {/* Weekly Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 px-1">
            <div className="w-10 h-10 bg-[#FFF9E6] rounded-xl flex items-center justify-center border-[2px] border-amber-200">
              <Trophy className="text-[#F5B100]" size={20} strokeWidth={3} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#111827] uppercase tracking-tighter italic">Weekly Challenges</h2>
              <p className="text-[#7B7F97] font-bold text-[8px] uppercase tracking-widest">Resets every Monday</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {weeklyQuests.length > 0 ? weeklyQuests.map(q => (
              <QuestCard key={q.id} quest={q} onClaim={claimQuestReward} />
            )) : (
              <div className="col-span-full bg-white rounded-[24px] p-8 border-[3px] border-slate-100 border-dashed flex flex-col items-center justify-center text-center opacity-60">
                <p className="font-black text-slate-400 text-[10px] uppercase tracking-widest">No weekly challenges found</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Footer Decoration */}
      <div className="mt-16 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full border-[2px] border-slate-100 shadow-[0_2px_0_#f1f5f9]">
          <Sparkles className="text-[#5B4DDB]" size={16} strokeWidth={3} />
          <span className="text-[#7B7F97] font-black text-[8px] uppercase tracking-[0.2em]">
            Consistency is your greatest weapon
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuestsPage;
