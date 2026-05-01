import React from 'react';
import { Clock, Sparkles } from 'lucide-react';
import { Task } from '../../store/useTaskStore';

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
      <div className="relative z-10 w-full max-w-[400px] max-h-[90vh] overflow-y-auto no-scrollbar bg-white rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.3)] border border-white p-6 sm:p-10 animate-in fade-in zoom-in duration-300 text-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#F1EEFF] rounded-[32px] flex items-center justify-center text-4xl sm:text-5xl mx-auto mb-6 sm:mb-8 shadow-inner">
           ⚔️
        </div>
        
        <h3 className="text-3xl font-black text-[#111827] uppercase tracking-tighter italic mb-4">
          Begin This Quest?
        </h3>
        
        <div className="bg-[#F8F9FF] rounded-3xl p-6 mb-8 border border-slate-100 text-left">
           <p className="text-[10px] font-black text-[#7B7F97] uppercase tracking-widest mb-2 opacity-60">Objective</p>
           <h4 className="text-xl font-black text-[#5B4DDB] leading-tight mb-4">{task.title}</h4>
           
           {task.description && (
             <div className="mb-6">
                <p className="text-[10px] font-black text-[#7B7F97] uppercase tracking-widest mb-2 opacity-60">Mission Intel</p>
                <p className="text-sm text-[#4B5563] font-medium leading-relaxed bg-white/50 p-4 rounded-2xl border border-slate-100">
                   {task.description}
                </p>
             </div>
           )}
           
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                 <Clock size={16} className="text-[#7B7F97]" />
                 <span className="font-bold text-sm text-[#111827]">{task.timeEstimation}m</span>
              </div>
              <div className="flex items-center gap-2">
                 <Sparkles size={16} className="text-[#F5B100]" />
                 <span className="font-bold text-sm text-[#111827]">+{task.timeEstimation * 2} XP</span>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <button 
             onClick={onCancel}
             className="py-4 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] text-[#7B7F97] bg-slate-50 hover:bg-slate-100 transition-colors"
           >
             Retreat
           </button>
           <button 
             onClick={onConfirm}
             className="py-4 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] text-white bg-gradient-to-r from-[#5B4DDB] to-[#7C6CFF] shadow-lg shadow-[#5B4DDB]/25 hover:scale-[1.05] active:scale-[0.95] transition-all"
           >
             Deploy
           </button>
        </div>
      </div>
    </div>
  );
};
