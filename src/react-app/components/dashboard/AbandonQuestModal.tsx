import React from 'react';
import { Task } from '../../store/useTaskStore';

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
        className="absolute inset-0 bg-rose-900/20 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onCancel}
      />
      <div className="relative z-10 w-full max-w-[400px] bg-white rounded-[48px] shadow-[0_40px_100px_rgba(225,29,72,0.15)] border border-white p-10 animate-in fade-in zoom-in duration-300 text-center">
        <div className="w-24 h-24 bg-rose-50 rounded-[32px] flex items-center justify-center text-5xl mx-auto mb-8 shadow-inner">
           🗑️
        </div>
        
        <h3 className="text-3xl font-black text-[#111827] uppercase tracking-tighter italic mb-4">
          Abandon Quest?
        </h3>
        
        <p className="text-[#7B7F97] font-bold mb-8 leading-relaxed">
          Are you sure you want to remove <span className="text-rose-500 font-black">"{task.title}"</span> from your log? This progress will be lost.
        </p>

        <div className="grid grid-cols-2 gap-4">
           <button 
             onClick={onCancel}
             className="py-4 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] text-[#7B7F97] bg-slate-50 hover:bg-slate-100 transition-colors"
           >
             Continue
           </button>
           <button 
             onClick={onConfirm}
             className="py-4 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] text-white bg-gradient-to-r from-rose-500 to-rose-600 shadow-lg shadow-rose-500/25 hover:scale-[1.05] active:scale-[0.95] transition-all"
           >
             Abandon
           </button>
        </div>
      </div>
    </div>
  );
};
