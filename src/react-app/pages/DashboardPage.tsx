import { Filter, Loader2, Plus } from "lucide-react";
import { useDashboardState } from "./useDashboardState";
import {
  ProfileCard,
  StreakCard,
  QuestCard,
  FilterModal,
  StartQuestModal,
  AbandonQuestModal,
} from "../components/dashboard";

export default function DashboardPage() {
  const {
    user,
    activeTasks,
    completedTasks,
    isLoading,
    activeFilter,
    activeSort,
    isFilterMenuOpen,
    setIsFilterMenuOpen,
    pendingFilter,
    setPendingFilter,
    pendingSort,
    setPendingSort,
    isConfirmOpen,
    pendingTask,
    isDeleteModalOpen,
    deletingTask,
    openFilterMenu,
    applyFilters,
    handleTaskClick,
    confirmStartTask,
    cancelStartTask,
    handleDeleteClick,
    confirmDeleteTask,
    cancelDeleteTask,
    setCurrentPage,
    setEditingTask,
    setActiveFilter,
    setActiveSort,
    availableTags,
    toggleHistory,
    isHistoryVisible,
  } = useDashboardState();

  return (
    <div className="w-full min-h-screen bg-[#F8F9FF] font-sans relative overflow-x-hidden pb-32">
      <div className="relative z-10 w-full max-w-6xl mx-auto sm:pt-8 px-2 sm:px-6">
        {/* --- TOP SECTION: Profile & Streak --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
          <ProfileCard user={user} />
          <StreakCard user={user} />
        </div>

        {/* --- SECTION DIVIDER --- */}
        <div className="w-full h-px bg-slate-700 mb-10 border-2 border-slate-300 rounded-2xl" />

        {/* --- ACTIVE MISSIONS SECTION --- */}
        <div className="relative mb-16">
          <div className="flex flex-col items-center gap-8 mb-10">
            <div className="w-full max-w-2xl">
              <button className="w-full bg-[#5B4DDB] text-white px-10 py-5 sm:py-6 rounded-[32px] border-[4px] border-[#4539a5] shadow-[0_10px_0_#3730a3] active:translate-y-1 active:shadow-none transition-all cursor-default group">
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter italic leading-none group-hover:scale-105 transition-transform">
                  Your Tasks
                </h2>
              </button>
            </div>

            <div className="flex items-center gap-4 w-full max-w-2xl">
              {/* Add New Quest Button */}
              <button
                onClick={() => {
                  setEditingTask(null);
                  setCurrentPage("create-task");
                }}
                className="flex-1 flex items-center justify-center gap-3 px-3 py-4 bg-[#5B4DDB] text-white rounded-[24px] font-black text-sm uppercase tracking-widest border-[3px] border-[#4539a5] shadow-[0_6px_0_#3730a3] hover:translate-y-0.5 hover:shadow-[0_3px_0_#3730a3] active:translate-y-1 active:shadow-none transition-all"
              >
                <Plus size={20} strokeWidth={4} />
                <span>New Task</span>
              </button>

              {/* Filter Action Trigger */}
              <button
                onClick={openFilterMenu}
                className={`flex-1 flex items-center justify-center gap-3 px-4 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest border-[3px] transition-all ${
                  isFilterMenuOpen ||
                  activeFilter !== "all" ||
                  activeSort !== "none"
                    ? "bg-[#5B4DDB] text-white border-[#4539a5] shadow-[0_6px_0_#3730a3]"
                    : "bg-white text-[#7B7F97] border-slate-100 shadow-[0_6px_0_#f1f5f9] hover:border-slate-200"
                } active:translate-y-1 active:shadow-none`}
              >
                <Filter size={20} strokeWidth={3} />
                <span className="hidden sm:inline">Filter & Sort</span>
                <span className="sm:hidden">Filter</span>
              </button>
            </div>
          </div>

          {/* Mission Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {isLoading ? (
              <div className="col-span-full flex flex-col items-center justify-center py-32 gap-6 bg-white rounded-[40px] border-[4px] border-dashed border-slate-100">
                <Loader2 className="w-16 h-16 text-[#5B4DDB] animate-spin opacity-20" />
                <p className="font-black text-[#7B7F97] uppercase tracking-[0.3em] text-[10px]">
                  Syncing Quests...
                </p>
              </div>
            ) : activeTasks.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-24 bg-white rounded-[40px] border-[3px] border-slate-100 shadow-[0_8px_0_#f8fafc] text-center px-10">
                <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center text-5xl mb-8 border-[3px] border-white shadow-inner">
                  📜
                </div>
                <h3 className="text-3xl font-black text-[#111827] mb-3 uppercase tracking-tight">
                  No Tasks Found
                </h3>
                <p className="text-[#7B7F97] font-bold max-w-sm mb-8 leading-relaxed">
                  The task board is empty. Adjust your filters or create a new
                  task.
                </p>
                <button
                  onClick={() => {
                    setActiveFilter("all");
                    setActiveSort("none");
                  }}
                  className="text-[#5B4DDB] font-black text-xs uppercase tracking-[0.2em] underline decoration-4 underline-offset-8 hover:text-[#4539a5] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              activeTasks.map((task) => (
                <QuestCard
                  key={task.id}
                  task={task}
                  onTaskClick={handleTaskClick}
                  onEditClick={(t) => {
                    setEditingTask(t);
                    setCurrentPage("create-task");
                  }}
                  onDeleteClick={handleDeleteClick}
                />
              ))
            )}
          </div>
        </div>
        {/* --- COMPLETED MISSIONS SECTION --- */}
        {completedTasks && completedTasks.length > 0 && (
          <div className="relative mt-10">
            <div className="flex justify-center mb-8">
              <button
                onClick={toggleHistory}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#7B7F97] hover:text-[#5B4DDB] hover:border-[#5B4DDB]/30 border-[3px] border-slate-100 rounded-[20px] shadow-[0_4px_0_#f1f5f9] hover:shadow-[0_4px_0_#e0e7ff] active:translate-y-1 active:shadow-none transition-all font-black text-xs uppercase tracking-widest"
              >
                <span>
                  {isHistoryVisible ? "Hide" : "Show"} History Log (
                  {completedTasks.length})
                </span>
              </button>
            </div>

            {isHistoryVisible && completedTasks && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 opacity-80 grayscale">
                {completedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white rounded-[20px] p-4 border border-slate-100 shadow-sm flex items-center justify-between"
                  >
                    <span className="font-bold text-[#111827] text-sm truncate">
                      {task.title}
                    </span>
                    <span className="text-[10px] font-black text-[#7B7F97] uppercase px-2 py-1 bg-slate-50 rounded-lg">
                      Done
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- MODALS --- */}
      <FilterModal
        isOpen={isFilterMenuOpen}
        onClose={() => setIsFilterMenuOpen(false)}
        pendingFilter={pendingFilter}
        setPendingFilter={setPendingFilter}
        pendingSort={pendingSort}
        setPendingSort={setPendingSort}
        onApply={applyFilters}
        availableTags={availableTags}
      />

      <StartQuestModal
        isOpen={isConfirmOpen}
        task={pendingTask}
        onCancel={cancelStartTask}
        onConfirm={confirmStartTask}
      />

      <AbandonQuestModal
        isOpen={isDeleteModalOpen}
        task={deletingTask}
        onCancel={cancelDeleteTask}
        onConfirm={confirmDeleteTask}
      />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
