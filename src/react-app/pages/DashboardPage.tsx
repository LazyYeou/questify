import React from "react";
import {
  Filter,
  Target,
  Loader2,
  Plus,
} from "lucide-react";
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
    tasks,
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
    setActiveSort
  } = useDashboardState();

  return (
    <div className="w-full min-h-screen font-sans relative overflow-hidden">
      <div className="relative z-10 w-full max-w-6xl mx-auto py-1 sm:py-4 px-2 sm:px-0">
        {/* --- TOP SECTION: Profile & Energy --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
          <ProfileCard user={user} />
          <StreakCard user={user} />
        </div>

        {/* --- ACTIVE MISSIONS SECTION --- */}
        <div className="mb-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-[#5B4DDB]">
                <Target size={20} />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#111827] uppercase tracking-tighter italic">
                Active Quests
              </h2>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Add New Quest Button */}
              <button 
                onClick={() => {
                  setEditingTask(null);
                  setCurrentPage("create-task");
                }}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#5B4DDB] to-[#7C6CFF] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-md shadow-[#5B4DDB]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Plus size={14} strokeWidth={3} />
                <span>Add Quest</span>
              </button>

              {/* Filter Action Trigger */}
              <button
                onClick={openFilterMenu}
                className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border-2 ${
                  isFilterMenuOpen ||
                  activeFilter !== "all" ||
                  activeSort !== "none"
                    ? "bg-[#5B4DDB] text-white border-[#5B4DDB] shadow-md shadow-[#5B4DDB]/20"
                    : "bg-white text-[#7B7F97] border-white hover:border-slate-100"
                }`}
              >
                <Filter size={14} />
                <span className="hidden sm:inline">Filter & Sort</span>
                <span className="sm:hidden">Filter</span>
                {(activeFilter !== "all" || activeSort !== "none") && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </button>
            </div>
          </div>

          {/* Mission Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {isLoading ? (
              <div className="col-span-full flex flex-col items-center justify-center py-24 gap-4 bg-white/50 rounded-[48px] border-2 border-dashed border-[#D8DAE5]">
                <Loader2 className="w-12 h-12 text-[#5B4DDB] animate-spin" />
                <p className="font-black text-[#7B7F97] uppercase tracking-widest text-xs">
                  Syncing Quests...
                </p>
              </div>
            ) : tasks.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-[48px] shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-slate-100 text-center px-6">
                <div className="w-20 h-20 bg-[#F1EEFF] rounded-3xl flex items-center justify-center text-4xl mb-6">
                  📜
                </div>
                <h3 className="text-2xl font-black text-[#111827] mb-2 uppercase">
                  No Matching Missions
                </h3>
                <p className="text-[#7B7F97] font-bold max-w-sm">
                  Try adjusting your filters or create a new quest to begin.
                </p>
                <button
                  onClick={() => {
                    setActiveFilter("all");
                    setActiveSort("none");
                  }}
                  className="mt-4 text-[#5B4DDB] font-black text-xs uppercase tracking-widest underline"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              tasks.map((task) => (
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
