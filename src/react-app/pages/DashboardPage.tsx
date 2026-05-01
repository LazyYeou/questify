import React, { useEffect, useState, useMemo } from "react";
import {
  Flame,
  Code2,
  Sigma,
  Filter,
  Target,
  Sparkles,
  Loader2,
  Zap,
  ChevronRight,
  TrendingUp,
  Award,
  Calendar,
  Clock,
  Check,
  X
} from "lucide-react";
import { useTaskStore, Task } from "../store/useTaskStore";

type SortOption = 'none' | 'deadline' | 'duration';
type FilterTag = 'all' | 'code' | 'math' | 'study';

export default function DashboardPage() {
  const { tasks, fetchTasks, isLoading, setActiveTask, user, fetchUser, isModalOpen: isFilterMenuOpen, setIsModalOpen: setIsFilterMenuOpen } = useTaskStore();
  
  // State for filtering and sorting
  const [activeFilter, setActiveFilter] = useState<FilterTag>('all');
  const [activeSort, setActiveSort] = useState<SortOption>('none');

  // Pending state for modal
  const [pendingFilter, setPendingFilter] = useState<FilterTag>('all');
  const [pendingSort, setPendingSort] = useState<SortOption>('none');

  // Sync pending state when menu opens
  const openFilterMenu = () => {
    setPendingFilter(activeFilter);
    setPendingSort(activeSort);
    setIsFilterMenuOpen(true);
  };

  const applyFilters = () => {
    setActiveFilter(pendingFilter);
    setActiveSort(pendingSort);
    setIsFilterMenuOpen(false);
  };

  useEffect(() => {
    fetchTasks();
    fetchUser();
  }, [fetchTasks, fetchUser]);

  const handleTaskClick = (task: Task) => {
    setActiveTask(task);
  };

  // --- Filtering & Sorting Logic ---
  const processedTasks = useMemo(() => {
    let result = [...tasks];

    // 1. Filter by Tag
    if (activeFilter !== 'all') {
      result = result.filter(task => 
        task.tags?.some(tag => tag.name.toLowerCase().includes(activeFilter))
      );
    }

    // 2. Sort
    if (activeSort === 'deadline') {
      result.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    } else if (activeSort === 'duration') {
      result.sort((a, b) => (b.timeEstimation || 0) - (a.timeEstimation || 0));
    }

    return result;
  }, [tasks, activeFilter, activeSort]);

  const nextLevelExp = (user?.level || 1) * 100;
  const currentExp = user?.experience || 0;
  const progress = currentExp % 100;

  return (
    <div className="w-full min-h-screen font-sans relative overflow-hidden">
      <div className="relative z-10 w-full max-w-6xl mx-auto py-2 sm:py-6 px-2 sm:px-0">
        
        {/* --- TOP SECTION: Profile & Energy --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6 mb-8">
          
          {/* Main Character/Stats Card */}
          <div className="lg:col-span-2 bg-white rounded-[32px] sm:rounded-[48px] p-5 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-36 sm:h-32 rounded-full bg-gradient-to-br from-[#D7CCFF] to-[#C7B9FF] flex items-center justify-center shadow-inner border-[6px] border-[#F6F4FF] overflow-hidden">
                  <div className="text-5xl sm:text-7xl transform hover:scale-110 transition-transform cursor-pointer">🦊</div>
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
                    <span className="text-[#7B7F97] font-black text-[10px] uppercase tracking-widest">Experience Point</span>
                    <span className="text-[#111827] font-black text-sm">{currentExp % 100} / 100</span>
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
            <TrendingUp className="absolute top-6 right-6 text-[#5B4DDB] opacity-[0.05]" size={120} />
          </div>

          {/* Streak Card */}
          <div className="bg-gradient-to-br from-[#FFB52E] to-[#FF9800] rounded-[32px] sm:rounded-[48px] p-6 sm:p-8 text-white relative overflow-hidden shadow-[0_20px_40px_rgba(255,152,0,0.3)] border border-white/20 flex flex-col justify-between group">
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 bg-white/20 rounded-2xl backdrop-blur-md border border-white/20 shadow-xl">
                      <Flame className="w-6 h-6 fill-current animate-pulse" />
                   </div>
                   <h2 className="text-lg font-black tracking-widest uppercase italic">Daily Streak</h2>
                </div>
                <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-4">
                   {[1, 2, 3, 4, 5].map((day) => {
                     const isActive = day <= (user?.streak || 0);
                     return (
                       <div key={day} className="flex flex-col items-center gap-1.5">
                          <div className={`w-full aspect-square rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${
                            isActive 
                              ? 'bg-white shadow-[0_5px_15px_rgba(255,255,255,0.4)] border-white' 
                              : 'bg-black/10 border-white/10 opacity-40'
                          }`}>
                            <Flame className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? 'text-[#FF9800] fill-current' : 'text-white'}`} />
                          </div>
                          <span className="text-[9px] font-black uppercase opacity-70">Day {day}</span>
                       </div>
                     );
                   })}
                </div>
             </div>
          </div>
        </div>

        {/* --- ACTIVE MISSIONS SECTION --- */}
        <div className="mb-12 relative">
           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-[#5B4DDB]">
                    <Target size={24} />
                 </div>
                 <div>
                   <h2 className="text-2xl sm:text-3xl font-black text-[#111827] uppercase tracking-tighter italic">Active Quests</h2>
                 </div>
              </div>
              
              {/* Filter Action Trigger */}
              <button 
                onClick={openFilterMenu}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-2 ${
                  isFilterMenuOpen || activeFilter !== 'all' || activeSort !== 'none'
                    ? "bg-[#5B4DDB] text-white border-[#5B4DDB] shadow-lg shadow-[#5B4DDB]/20"
                    : "bg-white text-[#7B7F97] border-white hover:border-slate-100"
                }`}
              >
                <Filter size={16} />
                <span>Filter & Sort</span>
                {(activeFilter !== 'all' || activeSort !== 'none') && (
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                )}
              </button>
           </div>

           {/* --- FLOATING FILTER MODAL --- */}
           {isFilterMenuOpen && (
             <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop Blur */}
                <div 
                  className="absolute inset-0 bg-[#0b0b0b]/20 backdrop-blur-md animate-in fade-in duration-300"
                  onClick={() => setIsFilterMenuOpen(false)}
                />
                
                {/* Modal Card */}
                <div className="relative z-10 w-full max-w-[360px] bg-white rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.25)] border border-white p-8 animate-in fade-in zoom-in duration-300">
                   <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-[#F1EEFF] rounded-2xl flex items-center justify-center text-[#5B4DDB]">
                            <Filter size={20} />
                         </div>
                         <h3 className="font-black text-[#111827] uppercase tracking-tighter text-lg">Control Panel</h3>
                      </div>
                      <button 
                        onClick={() => setIsFilterMenuOpen(false)} 
                        className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#7B7F97] hover:bg-slate-100 transition-colors"
                      >
                        <X size={20} />
                      </button>
                   </div>

                   {/* Filter by Tag */}
                   <div className="mb-8">
                      <p className="text-[10px] font-black text-[#7B7F97] uppercase tracking-[0.25em] mb-4 px-1 opacity-60">Filter Objectives</p>
                      <div className="flex flex-wrap gap-2">
                         <FilterTagButton active={pendingFilter === 'all'} label="All Quests" onClick={() => setPendingFilter('all')} />
                         <FilterTagButton active={pendingFilter === 'code'} label="Coding" icon={<Code2 size={12} />} onClick={() => setPendingFilter('code')} />
                         <FilterTagButton active={pendingFilter === 'math'} label="Mathematics" icon={<Sigma size={12} />} onClick={() => setPendingFilter('math')} />
                      </div>
                   </div>

                   {/* Sort by */}
                   <div>
                      <p className="text-[10px] font-black text-[#7B7F97] uppercase tracking-[0.25em] mb-4 px-1 opacity-60">Priority Sorting</p>
                      <div className="space-y-2.5">
                         <SortOptionButton 
                           active={pendingSort === 'none'} 
                           label="Chronological" 
                           icon={<Target size={14} />} 
                           onClick={() => setPendingSort('none')} 
                         />
                         <SortOptionButton 
                           active={pendingSort === 'deadline'} 
                           label="Nearest Deadline" 
                           icon={<Calendar size={14} />} 
                           onClick={() => setPendingSort('deadline')} 
                         />
                         <SortOptionButton 
                           active={pendingSort === 'duration'} 
                           label="Longest Mission" 
                           icon={<Clock size={14} />} 
                           onClick={() => setPendingSort('duration')} 
                         />
                      </div>
                   </div>

                   <button 
                     onClick={applyFilters}
                     className="w-full mt-8 bg-[#5B4DDB] text-white py-4 rounded-[24px] font-black text-sm uppercase tracking-widest shadow-lg shadow-[#5B4DDB]/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                   >
                     Initialize Settings
                   </button>
                </div>
             </div>
           )}

           {/* Mission Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {isLoading ? (
                <div className="col-span-full flex flex-col items-center justify-center py-24 gap-4 bg-white/50 rounded-[48px] border-2 border-dashed border-[#D8DAE5]">
                  <Loader2 className="w-12 h-12 text-[#5B4DDB] animate-spin" />
                  <p className="font-black text-[#7B7F97] uppercase tracking-widest text-xs">Syncing Quests...</p>
                </div>
              ) : processedTasks.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-[48px] shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-slate-100 text-center px-6">
                  <div className="w-20 h-20 bg-[#F1EEFF] rounded-3xl flex items-center justify-center text-4xl mb-6">📜</div>
                  <h3 className="text-2xl font-black text-[#111827] mb-2 uppercase">No Matching Missions</h3>
                  <p className="text-[#7B7F97] font-bold max-w-sm">Try adjusting your filters or create a new quest to begin.</p>
                  <button onClick={() => {setActiveFilter('all'); setActiveSort('none');}} className="mt-4 text-[#5B4DDB] font-black text-xs uppercase tracking-widest underline">Reset All Filters</button>
                </div>
              ) : (
                processedTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => handleTaskClick(task)}
                    className="bg-white rounded-[32px] sm:rounded-[44px] p-5 sm:p-7 flex items-center gap-5 sm:gap-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(91,77,219,0.12)] hover:scale-[1.01] active:scale-[0.97] transition-all duration-500 group border border-slate-100/80 hover:border-[#5B4DDB]/30 relative overflow-hidden cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#5B4DDB]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[22px] sm:rounded-[28px] bg-gradient-to-tr from-[#5B4DDB] to-[#7C6CFF] flex items-center justify-center text-white shrink-0 shadow-lg relative z-10 group-hover:-rotate-3 transition-transform">
                      {task.tags?.some((t) => t.name.toLowerCase().includes("math")) ? (
                        <Sigma className="w-7 h-7 sm:w-10 sm:h-10" />
                      ) : (
                        <Code2 className="w-7 h-7 sm:w-10 sm:h-10" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 relative z-10 text-left">
                      <h3 className="text-lg sm:text-2xl font-black text-[#111827] truncate tracking-tight leading-[1.1] group-hover:text-[#5B4DDB] transition-colors mb-1">
                        {task.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs font-bold text-[#7B7F97]/60 uppercase tracking-widest mb-4 italic">
                        {task.dueDate ? `Deadline: ${new Date(task.dueDate).toLocaleDateString()}` : "Open Quest"}
                      </p>
                      
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex items-center gap-1.5 bg-[#F8F9FF] px-3 py-1.5 rounded-xl border border-slate-100">
                           <Zap className="w-3.5 h-3.5 text-[#5B4DDB] fill-current" />
                           <span className="text-[#111827] font-extrabold text-[10px] sm:text-xs">{task.timeEstimation}m</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-[#FFF9E6] px-3 py-1.5 rounded-xl border border-amber-100">
                           <Sparkles className="w-3.5 h-3.5 text-[#F5B100] fill-current" />
                           <span className="text-[#F5B100] font-black text-[10px] sm:text-xs">+{task.timeEstimation * 2} XP</span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 relative z-10 hidden sm:flex">
                       <div className="w-12 h-12 rounded-2xl bg-[#F1EEFF] flex items-center justify-center text-[#5B4DDB] group-hover:bg-[#5B4DDB] group-hover:text-white group-hover:rotate-12 transition-all duration-500 shadow-sm border border-white">
                          <ChevronRight size={24} />
                       </div>
                    </div>
                  </div>
                ))
              )}
           </div>
        </div>
      </div>

      <style>{`
        .grid-pattern {
          background-image: 
            linear-gradient(rgba(124,58,237,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

function FilterTagButton({ label, active, onClick, icon }: { label: string, active: boolean, onClick: () => void, icon?: React.ReactNode }) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${
        active ? "bg-[#5B4DDB] text-white shadow-md shadow-[#5B4DDB]/20" : "bg-[#F8F9FF] text-[#7B7F97] hover:bg-[#F1EEFF]"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function SortOptionButton({ label, active, onClick, icon }: { label: string, active: boolean, onClick: () => void, icon: React.ReactNode }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full px-4 py-3 rounded-2xl flex items-center justify-between transition-all ${
        active ? "bg-[#F1EEFF] text-[#5B4DDB] border-2 border-[#5B4DDB]/10" : "bg-white text-[#7B7F97] border-2 border-transparent hover:border-slate-100"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-1.5 rounded-lg ${active ? 'bg-[#5B4DDB] text-white' : 'bg-[#F8F9FF]'}`}>
          {icon}
        </div>
        <span className="font-extrabold text-xs">{label}</span>
      </div>
      {active && <Check size={16} strokeWidth={4} />}
    </button>
  );
}
