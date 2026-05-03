import React from "react";
import {
  Sigma,
  Code2,
  Pencil,
  Trash2,
  Zap,
  Sparkles,
  ChevronRight,
  Book,
  Sword,
  Shield,
  Coffee,
  Brain,
  Rocket,
  Music,
  Gamepad2,
  Flame,
  Dumbbell,
  Palette,
} from "lucide-react";
import { Task } from "../../store/useTaskStore";

const ICON_MAP: Record<string, React.ElementType> = {
  sigma: Sigma,
  code: Code2,
  book: Book,
  sword: Sword,
  shield: Shield,
  coffee: Coffee,
  brain: Brain,
  rocket: Rocket,
  music: Music,
  gamepad: Gamepad2,
  flame: Flame,
  dumbbell: Dumbbell,
  palette: Palette,
};

const RANDOM_ICONS = Object.keys(ICON_MAP);

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
  const IconComponent = React.useMemo(() => {
    if (task.icon && ICON_MAP[task.icon.toLowerCase()]) {
      return ICON_MAP[task.icon.toLowerCase()];
    }
    const index = task.id % RANDOM_ICONS.length;
    return ICON_MAP[RANDOM_ICONS[index]];
  }, [task.id, task.icon]);

  const [isNearDeadline, setIsNearDeadline] = React.useState(false);

  React.useEffect(() => {
    if (!task.dueDate) {
      setIsNearDeadline(false);
      return;
    }
    const deadline = new Date(task.dueDate).getTime();
    const diff = deadline - Date.now();
    setIsNearDeadline(deadline > 0 && diff > -86400000 && diff < 86400000);
  }, [task.dueDate]);

  return (
    <div
      onClick={() => onTaskClick(task)}
      className={`relative overflow-hidden cursor-pointer rounded-[24px] sm:rounded-[40px] p-4 sm:p-6 flex items-center gap-4 sm:gap-7 border-[4px] transition-all duration-200 group active:translate-y-1 active:shadow-none hover:scale-[1.01] ${
        isNearDeadline
          ? "bg-rose-50 border-rose-200 shadow-[0_10px_0_#fecdd3]"
          : "bg-white border-slate-100 shadow-[0_10px_0_#f1f5f9] hover:border-[#5B4DDB]/30"
      }`}
    >
      {/* 3D Block Effect for Icon */}
      <div
        className={`w-14 h-14 sm:w-20 sm:h-20 rounded-[20px] sm:rounded-[32px] flex items-center justify-center text-white shrink-0 relative z-10 transition-transform border-[4px] ${
          isNearDeadline
            ? "bg-rose-500 border-rose-600 shadow-[0_6px_0_#be123c]"
            : "bg-[#5B4DDB] border-[#4539a5] shadow-[0_6px_0_#3730a3]"
        }`}
      >
        {/* Inner surface layer for block effect */}
        <div className="absolute top-0 left-0 right-0 h-2 sm:h-3 bg-white/20 rounded-t-[16px] sm:rounded-t-[28px] pointer-events-none" />
        <IconComponent className="w-6 h-6 sm:w-10 sm:h-10 relative z-10" />
      </div>

      <div className="flex-1 min-w-0 relative z-10 text-left">
        <div className="flex items-start justify-between gap-2 mb-1 sm:mb-1.5">
          <h3
            className={`text-sm sm:text-xl font-black uppercase tracking-tight leading-tight line-clamp-2 ${
              isNearDeadline ? "text-rose-900" : "text-[#111827]"
            }`}
          >
            {task.title}
          </h3>
          <div className="flex items-center gap-1 shrink-0 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditClick(task);
              }}
              className="p-1 sm:p-2 text-[#7B7F97] hover:text-[#5B4DDB] transition-colors"
              title="Edit Quest"
            >
              <Pencil size={14} className="sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick(task);
              }}
              className="p-1 sm:p-2 text-[#7B7F97] hover:text-rose-500 transition-colors"
              title="Abandon Quest"
            >
              <Trash2 size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {task.description && (
          <p className="text-[9px] sm:text-xs font-bold text-[#7B7F97] line-clamp-1 mb-2 sm:mb-3 uppercase tracking-wider opacity-70">
            {task.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
          <div
            className={`flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl border-[2px] ${
              isNearDeadline
                ? "bg-rose-100 border-rose-200 text-rose-700"
                : "bg-slate-50 border-slate-100 text-[#111827]"
            }`}
          >
            <Zap
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ${isNearDeadline ? "text-rose-500" : "text-[#5B4DDB]"}`}
            />
            <span className="font-black text-[9px] sm:text-xs uppercase tracking-tight">
              {task.timeEstimation}m
            </span>
          </div>

          <div
            className={`flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl border-[2px] ${
              isNearDeadline
                ? "bg-rose-100 border-rose-200 text-rose-600"
                : "bg-[#FFF9E6] border-amber-100 text-amber-600"
            }`}
          >
            <Sparkles
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ${isNearDeadline ? "text-rose-400" : "text-[#F5B100]"}`}
            />
            <span className="font-black text-[9px] sm:text-xs uppercase tracking-tight">
              +{task.timeEstimation * 2} XP
            </span>
          </div>

          {task.dueDate && (
            <div
              className={`text-[8px] sm:text-[10px] font-black uppercase tracking-widest ${isNearDeadline ? "text-rose-600 animate-pulse" : "text-[#7B7F97] opacity-60"}`}
            >
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>

      <div className="shrink-0 relative z-10 hidden sm:flex">
        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#7B7F97] group-hover:bg-[#5B4DDB] group-hover:text-white transition-all duration-200 border-[3px] border-white shadow-sm">
          <ChevronRight size={24} strokeWidth={3} />
        </div>
      </div>
    </div>
  );
};
