import React, { useState, useEffect } from 'react';
import { Sparkles, Target, Flame, Timer, Pause, Play, XCircle } from 'lucide-react';
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

  // Calculate progress percentage
  const totalSeconds = activeTask.timeEstimation * 60;
  const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  return (
    <div className="fixed inset-0 bg-[#F8F9FF] flex flex-col items-center justify-center p-6 z-50 overflow-hidden font-sans">
      {/* Background Decoration matching Dashboard */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-gradient-to-br from-[#D7CCFF] to-transparent rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-gradient-to-tl from-[#B8F0F0] to-transparent rounded-full blur-3xl opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] grid-pattern" />
      </div>

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        {/* Header Section */}
        <div className="mb-8 flex flex-col items-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#5B4DDB] to-[#7C6CFF] flex items-center justify-center shadow-lg mb-4 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
            <Timer className="w-10 h-10 text-white" />
          </div>
          <span className="bg-[#F1EEFF] text-[#5B4DDB] px-4 py-1.5 rounded-full font-extrabold text-xs tracking-widest uppercase mb-2">
            Quest in Progress
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111827] text-center tracking-tight leading-tight">
            {activeTask.title}
          </h1>
        </div>

        {/* Main Timer Display */}
        <div className="bg-white rounded-[48px] p-10 sm:p-16 shadow-[0_30px_60px_rgba(0,0,0,0.06)] border-4 border-white flex flex-col items-center w-full relative mb-12">
          {/* Animated background rings */}
          <div className={`absolute inset-0 rounded-[44px] border-4 border-[#F1EEFF] ${isActive ? 'animate-pulse' : ''}`} />
          
          <div className="text-8xl sm:text-[10rem] font-black text-[#111827] leading-none tracking-tighter tabular-nums mb-8 relative z-10 drop-shadow-sm">
            {formatTime(secondsLeft)}
          </div>

          <div className="w-full space-y-4 relative z-10">
            <div className="flex justify-between items-end mb-1">
              <div className="flex items-center gap-2 text-[#5B4DDB]">
                <Flame className="w-5 h-5 fill-current" />
                <span className="font-extrabold text-sm uppercase tracking-wider">Momentum</span>
              </div>
              <span className="text-[#7B7F97] font-bold text-sm">{Math.round(progress)}%</span>
            </div>
            
            <div className="w-full h-4 bg-[#ECEAF9] rounded-full overflow-hidden p-1 shadow-inner">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-[#5B4DDB] to-[#7C6CFF] transition-all duration-1000 shadow-[0_2px_10px_rgba(91,77,219,0.3)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Floating Sparkles */}
          <Sparkles className="absolute top-10 right-10 text-[#FFC84D] opacity-40" size={24} />
          <Sparkles className="absolute bottom-20 left-10 text-[#A68BFF] opacity-40" size={20} />
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
          <button 
            onClick={() => setIsActive(!isActive)}
            className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-[28px] font-extrabold text-xl transition-all duration-300 shadow-xl ${
              isActive 
                ? 'bg-white text-[#111827] hover:bg-gray-50' 
                : 'bg-[#5B4DDB] text-white hover:bg-[#4a3cb5]'
            }`}
          >
            {isActive ? <Pause className="fill-current" /> : <Play className="fill-current" />}
            {isActive ? 'Pause' : 'Resume'}
          </button>
          
          <button 
            onClick={handleGiveUp}
            className="flex-1 flex items-center justify-center gap-3 py-5 bg-white/50 text-[#7B7F97] border-2 border-dashed border-[#D8DAE5] rounded-[28px] font-bold text-lg hover:bg-[#FFEBEB] hover:text-[#DC2626] hover:border-[#DC2626]/20 transition-all duration-300"
          >
            <XCircle />
            Abort
          </button>
        </div>

        {/* Reward Preview */}
        <div className="mt-10 flex items-center gap-4 bg-white/40 px-6 py-3 rounded-2xl border border-white/60">
           <div className="flex items-center gap-1.5 text-[#F5B100] font-extrabold tracking-tight">
             <Sparkles className="w-5 h-5" fill="currentColor" />
             <span>+{activeTask.timeEstimation * 2} EXP</span>
           </div>
           <div className="w-[1px] h-4 bg-[#D8DAE5]" />
           <div className="text-[#7B7F97] font-bold text-sm">Target Level Up!</div>
        </div>
      </div>

      {/* Mascot decoration */}
      <div className="absolute bottom-10 right-10 text-8xl opacity-10 pointer-events-none transform rotate-12">🦊</div>
      <div className="absolute top-10 left-10 text-6xl opacity-10 pointer-events-none transform -rotate-12">🌲</div>

      <style>{`
        .grid-pattern {
          background-image: 
            linear-gradient(rgba(124,58,237,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
};
