import React, { useEffect } from "react";
import {
  Flame,
  Code2,
  Sigma,
  Filter,
  Target,
  Sparkles,
  Loader2,
} from "lucide-react";
import { useTaskStore, Task } from "../store/useTaskStore";

export default function DashboardPage() {
  const { tasks, fetchTasks, isLoading, setActiveTask, user, fetchUser } = useTaskStore();

  useEffect(() => {
    fetchTasks();
    fetchUser();
  }, [fetchTasks, fetchUser]);

  const handleTaskClick = (task: Task) => {
    setActiveTask(task);
  };

  const nextLevelExp = (user?.level || 1) * 100;
  const currentExp = user?.experience || 0;
  const progress = currentExp % 100;

  return (
    <div className="w-full flex justify-center items-start">
      <div className="w-full max-w-md lg:max-w-5xl xl:max-w-6xl relative">
        {/* Background Decoration */}
        <div className="absolute bottom-24 left-0 right-0 h-64 pointer-events-none opacity-80">
          <div className="absolute bottom-0 left-[-40px] w-40 h-32 bg-gradient-to-t from-[#BFD8FF] to-transparent rounded-full blur-2xl" />
          <div className="absolute bottom-0 right-[-40px] w-52 h-40 bg-gradient-to-t from-[#B8F0F0] to-transparent rounded-full blur-2xl" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2 sm:mt-4">
          {/* Profile Card */}
          <div className="bg-white rounded-[36px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] relative overflow-hidden h-full border border-white">
            <div className="flex items-center sm:items-start gap-5">
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#D7CCFF] to-[#C7B9FF] flex items-center justify-center shadow-inner border-[4px] sm:border-[8px] border-[#F6F4FF] overflow-hidden shrink-0">
                <div className="text-3xl sm:text-5xl">🦊</div>
              </div>

              <div className="flex-1">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-[#111827]">
                  {user?.name || "Adventurer"}
                </h1>
                <p className="text-[#5B4DDB] font-bold text-lg sm:text-xl mt-1">
                  Level {user?.level || 1}
                </p>
                <div className="mt-3 sm:mt-4">
                  <div className="w-full h-3 sm:h-4 bg-[#ECEAF9] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#5B4DDB] to-[#7C6CFF] transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="text-right text-[#7B7F97] font-semibold text-sm sm:text-lg mt-1 sm:mt-2">
                    {currentExp} / {nextLevelExp} XP
                  </div>
                </div>
              </div>
            </div>
            <Sparkles className="absolute top-12 right-28 text-[#A68BFF]" size={20} />
            <Sparkles className="absolute top-20 right-14 text-[#FFC84D]" size={18} />
          </div>

          {/* Streak Card */}
          <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-r from-[#FFB52E] to-[#FF9800] px-6 sm:px-8 py-6 sm:py-8 shadow-[0_10px_30px_rgba(255,166,0,0.25)] flex items-center h-full">
            <div className="absolute bottom-0 left-0 opacity-10 text-[60px] sm:text-[100px] pointer-events-none">🌲</div>
            <div className="absolute bottom-0 right-10 opacity-10 text-[40px] sm:text-[70px] pointer-events-none">🌲</div>
            <div className="flex items-center justify-between w-full relative z-10">
              <div className="flex items-center gap-3">
                <h2 className="text-white text-xl sm:text-3xl font-extrabold tracking-wide">STREAK</h2>
                <Flame className="text-orange-600 fill-orange-500 w-8 h-8 sm:w-12 sm:h-12" />
              </div>
              <div className="text-white text-2xl sm:text-5xl font-extrabold">
                {user?.streak || 0} Days
              </div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="grid grid-cols-4 lg:flex lg:flex-wrap lg:justify-start gap-3 sm:gap-4 mt-7">
          <FilterButton active icon={<Target className="w-5 h-5 sm:w-6 sm:h-6" />} label="Tasks" />
          <FilterButton icon={<Code2 className="w-5 h-5 sm:w-6 sm:h-6" />} label="Code" />
          <FilterButton icon={<Sigma className="w-5 h-5 sm:w-6 sm:h-6" />} label="Math" />
          <FilterButton icon={<Filter className="w-5 h-5 sm:w-6 sm:h-6" />} label="Sort" />
        </div>

        {/* Task Cards */}
        <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-20">
              <Loader2 className="w-10 h-10 text-[#5B4DDB] animate-spin" />
            </div>
          ) : tasks.length === 0 ? (
            <div className="col-span-full bg-white/50 border-2 border-dashed border-slate-200 rounded-[32px] p-12 text-center">
              <p className="text-[#7B7F97] font-bold text-lg">No quests found. Start by creating a new one!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => handleTaskClick(task)}
                className="bg-white rounded-[32px] p-4 sm:p-5 flex items-center gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)] h-full cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group border border-white"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[20px] sm:rounded-[24px] bg-gradient-to-br from-[#A69BFF] to-[#7D73FF] flex items-center justify-center text-white shrink-0 group-hover:shadow-lg transition-all font-black">
                  {task.tags?.some((t) => t.name.toLowerCase().includes("math")) ? "Σ" : <Code2 className="w-8 h-8" />}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-2xl leading-tight font-extrabold text-[#111827] truncate">
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 sm:mt-2 text-[#7B7F97] font-semibold text-xs sm:text-base">
                    <span>{task.timeEstimation} Min</span>
                    <div className="w-[1px] h-4 bg-[#D8DAE5]" />
                    <div className="flex items-center gap-1.5 text-[#F5B100]">
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" />
                      <span>{task.timeEstimation * 2} XP</span>
                    </div>
                  </div>
                </div>

                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl border-[2px] shrink-0 transition-colors ${
                    task.status === "completed" ? "bg-[#5B4DDB] border-[#5B4DDB]" : "border-[#E3DFF5]"
                }`} />
              </div>
            ))
          )}
        </div>

        <div className="absolute bottom-24 -right-10 lg:-right-20 text-[80px] sm:text-[120px] z-20 pointer-events-none opacity-50 lg:opacity-100 font-sans">🦊</div>
      </div>
    </div>
  );
}

function FilterButton({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button
      className={`rounded-[20px] px-4 py-3 sm:py-4 flex flex-col items-center justify-center gap-1.5 transition-all duration-200 shadow-sm min-w-[70px] sm:min-w-[90px]
        ${active ? "bg-[#F1EEFF] text-[#5B4DDB]" : "bg-white text-[#59607A]"}`}
    >
      {icon}
      <span className="font-bold text-xs sm:text-sm">{label}</span>
    </button>
  );
}
