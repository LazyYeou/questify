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
      {/* Backdrop Blur */}
      <div
        className="absolute inset-0 bg-[#0b0b0b]/20 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-[360px] bg-white rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.25)] border border-white p-8 animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F1EEFF] rounded-2xl flex items-center justify-center text-[#5B4DDB]">
              <Filter size={20} />
            </div>
            <h3 className="font-black text-[#111827] uppercase tracking-tighter text-lg">
              Control Panel
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#7B7F97] hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Filter by Tag */}
        <div className="mb-8">
          <p className="text-[10px] font-black text-[#7B7F97] uppercase tracking-[0.25em] mb-4 px-1 opacity-60">
            Filter Objectives
          </p>
          <div className="flex flex-wrap gap-2">
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
                icon={<Target size={12} />}
                onClick={() => setPendingFilter(tag.toLowerCase())}
              />
            ))}
          </div>
        </div>

        {/* Sort by */}
        <div>
          <p className="text-[10px] font-black text-[#7B7F97] uppercase tracking-[0.25em] mb-4 px-1 opacity-60">
            Priority Sorting
          </p>
          <div className="space-y-2.5">
            <SortOptionButton
              active={pendingSort === "none"}
              label="Chronological"
              icon={<Target size={14} />}
              onClick={() => setPendingSort("none")}
            />
            <SortOptionButton
              active={pendingSort === "deadline"}
              label="Nearest Deadline"
              icon={<Calendar size={14} />}
              onClick={() => setPendingSort("deadline")}
            />
            <SortOptionButton
              active={pendingSort === "duration"}
              label="Longest Mission"
              icon={<Clock size={14} />}
              onClick={() => setPendingSort("duration")}
            />
          </div>
        </div>

        <button
          onClick={onApply}
          className="w-full mt-8 bg-[#5B4DDB] text-white py-4 rounded-[24px] font-black text-sm uppercase tracking-widest shadow-lg shadow-[#5B4DDB]/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          Initialize Settings
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
      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${
        active
          ? "bg-[#5B4DDB] text-white shadow-md shadow-[#5B4DDB]/20"
          : "bg-[#F8F9FF] text-[#7B7F97] hover:bg-[#F1EEFF]"
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
      className={`w-full px-4 py-3 rounded-2xl flex items-center justify-between transition-all ${
        active
          ? "bg-[#F1EEFF] text-[#5B4DDB] border-2 border-[#5B4DDB]/10"
          : "bg-white text-[#7B7F97] border-2 border-transparent hover:border-slate-100"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`p-1.5 rounded-lg ${active ? "bg-[#5B4DDB] text-white" : "bg-[#F8F9FF]"}`}
        >
          {icon}
        </div>
        <span className="font-extrabold text-xs">{label}</span>
      </div>
      {active && <Check size={16} strokeWidth={4} />}
    </button>
  );
}
