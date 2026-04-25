import React, { useState, useEffect } from 'react';
import { useTaskStore } from '../store/useTaskStore';

export const PomodoroTimer: React.FC = () => {
  const { activeTask, clearActiveTask, updateTask } = useTaskStore();
  
  if (!activeTask) return null;

  const [secondsLeft, setSecondsLeft] = useState(activeTask.timeEstimation * 60);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: any = null;
    
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      handleComplete();
    }
    
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const handleComplete = async () => {
    setIsActive(false);
    await updateTask(activeTask.id, { status: 'completed' });
    clearActiveTask();
  };

  const handleGiveUp = () => {
    if (window.confirm("Are you sure you want to give up? Progress will not be saved.")) {
      clearActiveTask();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center p-6 z-50 overflow-y-auto">
      <div className="w-full max-w-xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
            {activeTask.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-2">
            {activeTask.tags?.map(tag => (
              <span key={tag.id} className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/20 uppercase">
                {tag.name}
              </span>
            ))}
          </div>
        </div>

        <div className="py-12">
          <div className="text-8xl sm:text-9xl font-black text-white font-mono tabular-nums tracking-tighter">
            {formatTime(secondsLeft)}
          </div>
          <div className="mt-4 text-slate-400 text-sm font-bold tracking-widest uppercase">
            Focus Time Remaining
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => setIsActive(!isActive)}
            className="px-10 py-4 bg-white text-slate-900 rounded-2xl font-black text-lg hover:bg-slate-100 transition-all shadow-xl active:scale-95 tracking-widest"
          >
            {isActive ? 'PAUSE' : 'RESUME'}
          </button>
          
          <button 
            onClick={handleGiveUp}
            className="px-10 py-4 bg-transparent text-white/50 rounded-2xl font-bold text-lg hover:text-white/80 hover:bg-white/5 transition-all active:scale-95 tracking-widest"
          >
            GIVE UP
          </button>
        </div>
        
        <p className="text-slate-500 text-xs font-medium italic">
          Leaving this screen will reset your quest progress.
        </p>
      </div>
    </div>
  );
};
