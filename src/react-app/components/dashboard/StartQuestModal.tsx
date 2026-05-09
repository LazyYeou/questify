import React from "react";
import { Clock, Sparkles } from "lucide-react";
import { Task } from "../../store/useTaskStore";
import goMascot from "../../assets/mascot/go.png";

interface StartQuestModalProps {
  isOpen: boolean;
  task: Task | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export const StartQuestModal: React.FC<StartQuestModalProps> = ({
  isOpen,
  task,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#0b0b0b]/40 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onCancel}
      />
      <div className="relative z-10 w-full max-w-[440px] max-h-[90vh] overflow-y-auto no-scrollbar bg-white rounded-[40px] border-[4px] border-slate-100 shadow-[0_12px_0_rgba(0,0,0,0.1)] p-8 sm:p-10 animate-in fade-in zoom-in duration-300 text-center">
        <div className="w-36 h-36 mx-auto mb-3 relative transform -translate-y-4">
          <img
            src={goMascot}
            alt="Go Mascot"
            className="w-full h-full object-contain filter drop-shadow-xl"
          />
        </div>

        <h3 className="text-3xl sm:text-4xl font-black text-[#111827] uppercase tracking-tighter mb-6">
          Begin Task?
        </h3>

        <div className="bg-slate-50 rounded-[32px] p-6 sm:p-8 mb-10 border-[3px] border-slate-100 text-left relative overflow-hidden">
          {/* <div className="absolute top-0 left-0 right-0 h-2 bg-[#5B4DDB]/10 pointer-events-none" /> */}

          <p className="text-[10px] font-black text-[#7B7F97] uppercase tracking-[0.2em] mb-3 opacity-60">
            Task
          </p>
          <h4 className="text-2xl font-black text-[#5B4DDB] uppercase tracking-tight leading-none mb-6">
            {task.title}
          </h4>

          {task.description && (
            <div className="mb-8">
              <p className="text-[10px] font-black text-[#7B7F97] uppercase tracking-[0.2em] mb-3 opacity-60">
                Task Description
              </p>
              <p className="text-sm text-[#4B5563] font-bold leading-relaxed bg-white p-5 rounded-2xl border-[3px] border-white shadow-sm italic">
                "{task.description}"
              </p>
            </div>
          )}

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border-2 border-slate-100">
                <Clock size={16} className="text-[#7B7F97]" />
              </div>
              <span className="font-black text-sm text-[#111827] uppercase tracking-tight">
                {task.timeEstimation}m
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center border-2 border-amber-100">
                <Sparkles size={16} className="text-[#F5B100]" />
              </div>
              <span className="font-black text-sm text-[#111827] uppercase tracking-tight">
                +{task.timeEstimation * 2} XP
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onCancel}
            className="py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] text-[#7B7F97] bg-white border-[3px] border-slate-100 shadow-[0_4px_0_#f1f5f9] active:translate-y-1 active:shadow-none transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] text-white bg-[#5B4DDB] border-[3px] border-[#4539a5] shadow-[0_4px_0_#3730a3] active:translate-y-1 active:shadow-none transition-all"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};
