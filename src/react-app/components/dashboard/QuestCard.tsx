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
  // Use provided icon or stable random icon based on task ID
  const IconComponent = React.useMemo(() => {
    if (task.icon && ICON_MAP[task.icon.toLowerCase()]) {
      return ICON_MAP[task.icon.toLowerCase()];
    }
    // Stable random selection
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
      className={`relative overflow-hidden cursor-pointer rounded-[32px] sm:rounded-[44px] p-5 sm:p-7 flex items-center gap-5 sm:gap-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(91,77,219,0.12)] hover:scale-[1.01] active:scale-[0.97] transition-all duration-500 group border ${
        isNearDeadline
          ? "border-rose-200 bg-rose-50/30 hover:border-rose-300"
          : "bg-white border-slate-100/80 hover:border-[#5B4DDB]/30"
      }`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-500 ${
          isNearDeadline
            ? "from-rose-500/[0.05] to-transparent opacity-100"
            : "from-[#5B4DDB]/[0.03] to-transparent opacity-0 group-hover:opacity-100"
        }`}
      />

      <div
        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-[22px] sm:rounded-[28px] flex items-center justify-center text-white shrink-0 shadow-lg relative z-10 group-hover:-rotate-3 transition-transform bg-gradient-to-tr ${
          isNearDeadline
            ? "from-rose-500 to-rose-400"
            : "from-[#5B4DDB] to-[#7C6CFF]"
        }`}
      >
        <IconComponent className="w-7 h-7 sm:w-10 sm:h-10" />
      </div>

      <div className="flex-1 min-w-0 relative z-10 text-left">
        <div className="flex items-center justify-between ">
          <h3
            className={`text-m sm:text-2xl font-black truncate tracking-tight leading-[1.1] transition-colors ${
              isNearDeadline
                ? "text-rose-900 group-hover:text-rose-600"
                : "text-[#111827] group-hover:text-[#5B4DDB]"
            }`}
          >
            {task.title}
          </h3>
          <div className="flex items-center gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditClick(task);
              }}
              className={`p-3 sm:p-2 transition-colors ${
                isNearDeadline
                  ? "text-rose-400 hover:text-rose-600"
                  : "text-[#7B7F97] hover:text-[#5B4DDB]"
              }`}
              title="Edit Quest"
            >
              <Pencil size={18} className="sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick(task);
              }}
              className={`p-3 sm:p-2 transition-colors ${
                isNearDeadline
                  ? "text-rose-400 hover:text-rose-700"
                  : "text-[#7B7F97] hover:text-rose-500"
              }`}
              title="Abandon Quest"
            >
              <Trash2 size={18} className="sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
        {task.description && (
          <p
            className={`text-xs font-medium mb-3 line-clamp-1 opacity-80 ${
              isNearDeadline ? "text-rose-600/80" : "text-[#7B7F97]"
            }`}
          >
            {task.description}
          </p>
        )}
        <div className="flex items-center gap-2 mb-4">
          <p
            className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest italic ${
              isNearDeadline
                ? "text-rose-600 animate-pulse"
                : "text-[#7B7F97]/60"
            }`}
          >
            {task.dueDate
              ? `Deadline: ${new Date(task.dueDate).toLocaleDateString()}`
              : "Open Quest"}
          </p>
          {isNearDeadline && (
            <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping" />
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${
              isNearDeadline
                ? "bg-rose-100/50 border-rose-200"
                : "bg-[#F8F9FF] border-slate-100"
            }`}
          >
            <Zap
              className={`w-3.5 h-3.5 fill-current ${isNearDeadline ? "text-rose-500" : "text-[#5B4DDB]"}`}
            />
            <span
              className={`font-extrabold text-[10px] sm:text-xs ${isNearDeadline ? "text-rose-900" : "text-[#111827]"}`}
            >
              {task.timeEstimation}m
            </span>
          </div>
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${
              isNearDeadline
                ? "bg-rose-100/30 border-rose-200"
                : "bg-[#FFF9E6] border-amber-100"
            }`}
          >
            <Sparkles
              className={`w-3.5 h-3.5 fill-current ${isNearDeadline ? "text-rose-400" : "text-[#F5B100]"}`}
            />
            <span
              className={`font-black text-[10px] sm:text-xs ${isNearDeadline ? "text-rose-600" : "text-[#F5B100]"}`}
            >
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
