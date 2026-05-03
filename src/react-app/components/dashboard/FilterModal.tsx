import React from 'react';
import { Filter, X, Target, Calendar, Clock, Check } from 'lucide-react';

export type SortOption = "none" | "deadline" | "duration";
export type FilterTag = string;

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  pendingFilter: FilterTag;
  setPendingFilter: (filter: FilterTag) => void;
  pendingSort: SortOption;
  setPendingSort: (sort: SortOption) => void;
  onApply: () => void;
  availableTags?: string[];
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  pendingFilter,
  setPendingFilter,
  pendingSort,
  setPendingSort,
  onApply,
  availableTags = [],
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0b0b0b]/40 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-[400px] bg-white rounded-[40px] border-[4px] border-slate-100 shadow-[0_12px_0_rgba(0,0,0,0.1)] p-8 sm:p-10 animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#5B4DDB] rounded-2xl flex items-center justify-center text-white border-[3px] border-[#4539a5] shadow-[0_4px_0_#3730a3]">
              <Filter size={24} strokeWidth={3} />
            </div>
            <h3 className="font-black text-[#111827] uppercase tracking-tighter text-2xl italic">
              Mission Control
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#7B7F97] hover:bg-slate-100 border-[3px] border-white shadow-sm transition-all"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>

        {/* Filter by Tag */}
        <div className="mb-10">
          <p className="text-[10px] font-black text-[#7B7F97] uppercase tracking-[0.25em] mb-5 px-1">
            Target Objectives
          </p>
          <div className="flex flex-wrap gap-2.5">
            <FilterTagButton
              active={pendingFilter === "all"}
              label="All Quests"
              onClick={() => setPendingFilter("all")}
            />
            {availableTags.map((tag) => (
              <FilterTagButton
                key={tag}
                active={pendingFilter === tag.toLowerCase()}
                label={tag}
                icon={<Target size={14} strokeWidth={3} />}
                onClick={() => setPendingFilter(tag.toLowerCase())}
              />
            ))}
          </div>
        </div>

        {/* Sort by */}
        <div className="mb-10">
          <p className="text-[10px] font-black text-[#7B7F97] uppercase tracking-[0.25em] mb-5 px-1">
            Priority Sorting
          </p>
          <div className="space-y-3">
            <SortOptionButton
              active={pendingSort === "none"}
              label="Chronological"
              icon={<Target size={18} />}
              onClick={() => setPendingSort("none")}
            />
            <SortOptionButton
              active={pendingSort === "deadline"}
              label="Nearest Deadline"
              icon={<Calendar size={18} />}
              onClick={() => setPendingSort("deadline")}
            />
            <SortOptionButton
              active={pendingSort === "duration"}
              label="Mission Length"
              icon={<Clock size={18} />}
              onClick={() => setPendingSort("duration")}
            />
          </div>
        </div>

        <button
          onClick={onApply}
          className="w-full bg-[#5B4DDB] text-white py-5 rounded-[24px] font-black text-sm uppercase tracking-[0.2em] border-[4px] border-[#4539a5] shadow-[0_6px_0_#3730a3] active:translate-y-1 active:shadow-none transition-all"
        >
          Update Board
        </button>
      </div>
    </div>
  );
};

function FilterTagButton({
  label,
  active,
  onClick,
  icon,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border-[3px] transition-all active:translate-y-0.5 ${
        active
          ? "bg-[#5B4DDB] text-white border-[#4539a5] shadow-[0_4px_0_#3730a3]"
          : "bg-white text-[#7B7F97] border-slate-100 shadow-[0_4px_0_#f1f5f9] hover:border-slate-200"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function SortOptionButton({
  label,
  active,
  onClick,
  icon,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-5 py-4 rounded-2xl flex items-center justify-between border-[3px] transition-all active:translate-y-0.5 ${
        active
          ? "bg-[#F1EEFF] text-[#5B4DDB] border-[#5B4DDB]/20 shadow-[0_4px_0_#e0e7ff]"
          : "bg-white text-[#7B7F97] border-slate-100 shadow-[0_4px_0_#f1f5f9] hover:border-slate-200"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 ${active ? "bg-[#5B4DDB] text-white border-[#4539a5]" : "bg-slate-50 text-[#7B7F97] border-white"}`}
        >
          {icon}
        </div>
        <span className="font-black text-sm uppercase tracking-tight">{label}</span>
      </div>
      {active && <Check size={20} strokeWidth={4} className="text-[#5B4DDB]" />}
    </button>
  );
}
