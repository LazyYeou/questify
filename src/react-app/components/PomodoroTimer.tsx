import React, { useState, useEffect } from 'react';
import { Sparkles, Flame, Timer, Pause, Play, XCircle } from 'lucide-react';
import { useTaskStore } from '../store/useTaskStore';

export const PomodoroTimer: React.FC = () => {
  const { activeTask, clearActiveTask, updateTask, user } = useTaskStore();
  
  if (!activeTask) return null;

  const [secondsLeft, setSecondsLeft] = useState(activeTask.timeEstimation * 60);
  const [isActive, setIsActive] = useState(true);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showAbortConfirm, setShowAbortConfirm] = useState(false);

  useEffect(() => {
    let interval: any = null;
    
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && !showCompletion) {
      setIsActive(false);
      setShowCompletion(true);
    }
    
    return () => clearInterval(interval);
  }, [isActive, secondsLeft, showCompletion]);

  const handleClaimRewards = async () => {
    await updateTask(activeTask.id, { status: 'completed' });
    clearActiveTask();
  };

  const handleGiveUp = () => {
    setShowAbortConfirm(true);
    setIsActive(false);
  };

  const confirmAbort = () => {
    clearActiveTask();
  };

  const cancelAbort = () => {
    setShowAbortConfirm(false);
    setIsActive(true);
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

      {/* Completion Card Overlay */}
      {showCompletion && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#111827]/60 backdrop-blur-md animate-in fade-in duration-500" />
          
          <div className="relative w-full max-w-md bg-white rounded-[48px] p-8 sm:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.2)] border border-white flex flex-col items-center text-center animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
            {/* Success Icon */}
            <div className="relative mb-8">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-[#FFB52E] to-[#FF9800] rounded-full flex items-center justify-center shadow-xl shadow-orange-200">
                <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-white fill-current" />
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#5B4DDB] rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <Flame className="w-5 h-5 text-white fill-current" />
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[#111827] mb-4 uppercase italic tracking-tighter">
              Quest Complete!
            </h2>
            <p className="text-[#7B7F97] font-bold mb-8 max-w-[280px]">
              You've successfully finished <span className="text-[#5B4DDB]">"{activeTask.title}"</span>. Claim your rewards below!
            </p>

            {/* Rewards Grid */}
            <div className="grid grid-cols-2 gap-4 w-full mb-10">
              <div className="bg-[#F1EEFF] rounded-[24px] p-5 border border-[#5B4DDB]/10 flex flex-col items-center">
                <span className="text-2xl mb-1">✨</span>
                <span className="text-[#7B7F97] text-[10px] font-black uppercase tracking-widest">Experience</span>
                <span className="text-[#5B4DDB] text-xl font-black">+{activeTask.timeEstimation * 2} XP</span>
              </div>
              <div className="bg-[#FFF4E6] rounded-[24px] p-5 border border-[#FF9800]/10 flex flex-col items-center">
                <span className="text-2xl mb-1">💰</span>
                <span className="text-[#7B7F97] text-[10px] font-black uppercase tracking-widest">Coins</span>
                <span className="text-[#FF9800] text-xl font-black">+{activeTask.timeEstimation * 5}</span>
              </div>
            </div>

            <button
              onClick={handleClaimRewards}
              className="w-full bg-[#111827] text-white py-5 rounded-[24px] font-black text-lg uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              <span>Claim Rewards</span>
              <Sparkles className="w-5 h-5 text-[#FFB52E]" />
            </button>
          </div>
        </div>
      )}
      {/* Abort Confirmation Modal */}
      {showAbortConfirm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-rose-900/20 backdrop-blur-md animate-in fade-in duration-300"
            onClick={cancelAbort}
          />
          <div className="relative z-10 w-full max-w-[400px] bg-white rounded-[48px] shadow-[0_40px_100px_rgba(225,29,72,0.15)] border border-white p-10 animate-in fade-in zoom-in duration-300 text-center">
            <div className="w-24 h-24 bg-rose-50 rounded-[32px] flex items-center justify-center text-5xl mx-auto mb-8 shadow-inner">
               👋
            </div>
            
            <h3 className="text-3xl font-black text-[#111827] uppercase tracking-tighter italic mb-4">
              Abort Mission?
            </h3>
            
            <p className="text-[#7B7F97] font-bold mb-8 leading-relaxed">
              Do you really want to quit <span className="text-rose-500 font-black">"{activeTask.title}"</span>? Your current progress will be lost!
            </p>

            <div className="grid grid-cols-2 gap-4">
               <button 
                 onClick={cancelAbort}
                 className="py-4 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] text-[#7B7F97] bg-slate-50 hover:bg-slate-100 transition-colors"
               >
                 Continue
               </button>
               <button 
                 onClick={confirmAbort}
                 className="py-4 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] text-white bg-gradient-to-r from-rose-500 to-rose-600 shadow-lg shadow-rose-500/25 hover:scale-[1.05] active:scale-[0.95] transition-all"
               >
                 Quit Quest
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
