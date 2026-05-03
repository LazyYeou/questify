import React from "react";
import { Task } from "../../store/useTaskStore";
import { Trash2, AlertCircle } from "lucide-react";
import confuseMascot from "../../assets/mascot/confuse.png";

interface AbandonQuestModalProps {
  isOpen: boolean;
  task: Task | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export const AbandonQuestModal: React.FC<AbandonQuestModalProps> = ({
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
      <div className="relative z-10 w-full max-w-[400px] bg-white rounded-[40px] border-[4px] border-slate-100 shadow-[0_12px_0_rgba(0,0,0,0.1)] p-8 sm:p-10 animate-in fade-in zoom-in duration-300 text-center">
        <div className="w-36 h-36 mx-auto mb-2 relative transform -translate-y-4">
          <img
            src={confuseMascot}
            alt="Confused Mascot"
            className="w-full h-full object-contain filter drop-shadow-xl"
          />
        </div>

        <h3 className="text-3xl font-black text-[#111827] uppercase tracking-tighter italic mb-4">
          Delete Task?
        </h3>

        <div className="bg-rose-50 rounded-3xl p-6 mb-10 border-[3px] border-rose-100 text-left flex gap-4">
          <AlertCircle
            className="text-rose-500 shrink-0 mt-1"
            size={20}
            strokeWidth={3}
          />
          <p className="text-sm text-rose-900 font-bold leading-relaxed">
            Are you sure you want to remove{" "}
            <span className="font-black uppercase tracking-tight">
              "{task.title}"
            </span>
            ? The task will be lost forever.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onCancel}
            className="py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] text-[#7B7F97] bg-white border-[3px] border-slate-100 shadow-[0_4px_0_#f1f5f9] active:translate-y-1 active:shadow-none transition-all"
          >
            Continue
          </button>
          <button
            onClick={onConfirm}
            className="py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] text-white bg-rose-500 border-[3px] border-rose-600 shadow-[0_4px_0_#be123c] active:translate-y-1 active:shadow-none transition-all"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
