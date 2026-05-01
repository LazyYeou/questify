import React, { useState, useEffect } from 'react';
import { Sparkles, Flame, Timer, Pause, Play, XCircle } from 'lucide-react';
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

  // Calculate circular progress
  const totalSeconds = activeTask.timeEstimation * 60;
  const progress = ((totalSeconds - secondsLeft) / totalSeconds);
  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

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
        <div className="mb-6 flex flex-col items-center">
          <span className="bg-[#F1EEFF] text-[#5B4DDB] px-5 py-2 rounded-full font-extrabold text-sm tracking-widest uppercase mb-4 shadow-sm">
            Quest in Progress
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111827] text-center tracking-tight leading-tight max-w-md">
            {activeTask.title}
          </h1>
        </div>

        {/* Circular Timer Display */}
        <div className="relative flex items-center justify-center mb-10 group">
          {/* Outer Shadow Ring */}
          <div className="absolute w-[340px] h-[340px] rounded-full bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] border-[12px] border-white" />
          
          {/* SVG Progress Circle */}
          <svg className="w-[320px] h-[320px] transform -rotate-90 relative z-10">
            {/* Background Track */}
            <circle
              cx="160"
              cy="160"
              r={radius}
              stroke="#ECEAF9"
              strokeWidth="20"
              fill="transparent"
              className="transition-all duration-500"
            />
            {/* Progress Stroke */}
            <circle
              cx="160"
              cy="160"
              r={radius}
              stroke="url(#timerGradient)"
              strokeWidth="20"
              fill="transparent"
              strokeDasharray={circumference}
              style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s linear' }}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5B4DDB" />
                <stop offset="100%" stopColor="#7C6CFF" />
              </linearGradient>
            </defs>
          </svg>

          {/* Inner Content */}
          <div className="absolute flex flex-col items-center justify-center z-20">
            <div className={`text-7xl font-black text-[#111827] tabular-nums tracking-tighter mb-1 transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>
              {formatTime(secondsLeft)}
            </div>
            <div className="flex items-center gap-1.5 text-[#5B4DDB]">
              <Flame className={`w-5 h-5 fill-current ${isActive ? 'animate-bounce' : ''}`} />
              <span className="font-extrabold text-sm uppercase tracking-wider">Momentum</span>
            </div>
          </div>

          {/* Floating Sparkles around the circle */}
          <Sparkles className="absolute -top-4 -right-4 text-[#FFC84D] animate-pulse" size={32} />
          <Sparkles className="absolute -bottom-2 -left-6 text-[#A68BFF] opacity-60" size={24} />
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-sm">
          <button 
            onClick={() => setIsActive(!isActive)}
            className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-[32px] font-extrabold text-xl transition-all duration-300 shadow-xl ${
              isActive 
                ? 'bg-white text-[#111827] hover:bg-gray-50 border-2 border-transparent' 
                : 'bg-[#5B4DDB] text-white hover:bg-[#4a3cb5] shadow-[0_10px_25px_rgba(91,77,219,0.3)]'
            }`}
          >
            {isActive ? <Pause className="fill-current w-6 h-6" /> : <Play className="fill-current w-6 h-6" />}
            {isActive ? 'Pause' : 'Resume'}
          </button>
          
          <button 
            onClick={handleGiveUp}
            className="flex-1 flex items-center justify-center gap-3 py-5 bg-white text-[#7B7F97] border-2 border-dashed border-[#D8DAE5] rounded-[32px] font-bold text-lg hover:bg-[#FFEBEB] hover:text-[#DC2626] hover:border-[#DC2626]/20 transition-all duration-300"
          >
            <XCircle className="w-6 h-6" />
            Abort
          </button>
        </div>

        {/* Reward Preview */}
        <div className="mt-10 flex items-center gap-4 bg-white/60 px-6 py-3 rounded-2xl border border-white/60 shadow-sm">
           <div className="flex items-center gap-1.5 text-[#F5B100] font-extrabold tracking-tight">
             <Sparkles className="w-5 h-5" fill="currentColor" />
             <span>+{activeTask.timeEstimation * 2} EXP</span>
           </div>
           <div className="w-[1px] h-4 bg-[#D8DAE5]" />
           <div className="text-[#7B7F97] font-bold text-sm uppercase tracking-wider">Target Level Up!</div>
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
