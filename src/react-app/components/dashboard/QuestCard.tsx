import React from 'react';
import { Sigma, Code2, Pencil, Trash2, Zap, Sparkles, ChevronRight } from 'lucide-react';
import { Task } from '../../store/useTaskStore';

interface QuestCardProps {
  task: Task;
  onTaskClick: (task: Task) => void;
  onEditClick: (task: Task) => void;
  onDeleteClick: (task: Task) => void;
}

export const QuestCard: React.FC<QuestCardProps> = ({
  task,
  onTaskClick,
  onEditClick,
  onDeleteClick,
}) => {
  const isMath = task.tags?.some((t) => t.name.toLowerCase().includes("math"));

  return (
    <div
      onClick={() => onTaskClick(task)}
      className="bg-white rounded-[32px] sm:rounded-[44px] p-5 sm:p-7 flex items-center gap-5 sm:gap-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(91,77,219,0.12)] hover:scale-[1.01] active:scale-[0.97] transition-all duration-500 group border border-slate-100/80 hover:border-[#5B4DDB]/30 relative overflow-hidden cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#5B4DDB]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[22px] sm:rounded-[28px] bg-gradient-to-tr from-[#5B4DDB] to-[#7C6CFF] flex items-center justify-center text-white shrink-0 shadow-lg relative z-10 group-hover:-rotate-3 transition-transform">
        {isMath ? (
          <Sigma className="w-7 h-7 sm:w-10 sm:h-10" />
        ) : (
          <Code2 className="w-7 h-7 sm:w-10 sm:h-10" />
        )}
      </div>

      <div className="flex-1 min-w-0 relative z-10 text-left">
        <div className="flex items-start justify-between">
          <h3 className="text-lg sm:text-2xl font-black text-[#111827] truncate tracking-tight leading-[1.1] group-hover:text-[#5B4DDB] transition-colors mb-1">
            {task.title}
          </h3>
          <div className="flex items-center gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditClick(task);
              }}
              className="p-3 sm:p-2 text-[#7B7F97] hover:text-[#5B4DDB] transition-colors"
              title="Edit Quest"
            >
              <Pencil size={18} className="sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick(task);
              }}
              className="p-3 sm:p-2 text-[#7B7F97] hover:text-rose-500 transition-colors"
              title="Abandon Quest"
            >
              <Trash2 size={18} className="sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
        {task.description && (
          <p className="text-xs text-[#7B7F97] font-medium mb-3 line-clamp-1 opacity-80">
            {task.description}
          </p>
        )}
        <p className="text-[10px] sm:text-xs font-bold text-[#7B7F97]/60 uppercase tracking-widest mb-4 italic">
          {task.dueDate
            ? `Deadline: ${new Date(task.dueDate).toLocaleDateString()}`
            : "Open Quest"}
        </p>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 bg-[#F8F9FF] px-3 py-1.5 rounded-xl border border-slate-100">
            <Zap className="w-3.5 h-3.5 text-[#5B4DDB] fill-current" />
            <span className="text-[#111827] font-extrabold text-[10px] sm:text-xs">
              {task.timeEstimation}m
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#FFF9E6] px-3 py-1.5 rounded-xl border border-amber-100">
            <Sparkles className="w-3.5 h-3.5 text-[#F5B100] fill-current" />
            <span className="text-[#F5B100] font-black text-[10px] sm:text-xs">
              +{task.timeEstimation * 2} XP
            </span>
          </div>
        </div>
      </div>

      <div className="shrink-0 relative z-10 hidden sm:flex">
        <div className="w-12 h-12 rounded-2xl bg-[#F1EEFF] flex items-center justify-center text-[#5B4DDB] group-hover:bg-[#5B4DDB] group-hover:text-white group-hover:rotate-12 transition-all duration-500 shadow-sm border border-white">
          <ChevronRight size={24} />
        </div>
      </div>
    </div>
  );
};
