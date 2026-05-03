import React, { useState, useEffect } from "react";
import { Sparkles, Flame, Pause, Play, XCircle } from "lucide-react";
import { useTaskStore } from "../store/useTaskStore";
import sadMascot from "../assets/mascot/sad.png";
import happyMascot from "../assets/mascot/happy.png";

export const PomodoroTimer: React.FC = () => {
  const { activeTask, clearActiveTask, updateTask, user } = useTaskStore();

  const [secondsLeft, setSecondsLeft] = useState(
    activeTask ? activeTask.timeEstimation * 60 : 0,
  );
  const [isActive, setIsActive] = useState(true);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showAbortConfirm, setShowAbortConfirm] = useState(false);

  useEffect(() => {
    let interval: any = null;

    if (isActive && secondsLeft > 0 && activeTask) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (activeTask && secondsLeft === 0 && !showCompletion) {
      setIsActive(false);
      setShowCompletion(true);
    }

    return () => clearInterval(interval);
  }, [isActive, secondsLeft, showCompletion, activeTask]);

  if (!activeTask) return null;

  const handleClaimRewards = async () => {
    await updateTask(activeTask.id, { status: "completed" });
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
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Calculate circular progress
  const totalSeconds = activeTask.timeEstimation * 60;
  const progress = (totalSeconds - secondsLeft) / totalSeconds;
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
          <h1 className="text-3xl sm:text-5xl font-black text-[#111827] text-center tracking-tighter uppercase leading-tight max-w-md drop-shadow-sm">
            {activeTask.title}
          </h1>
        </div>

        {/* Circular Timer Display */}
        <div className="relative flex items-center justify-center mb-10 group">
          {/* Outer Shadow Ring */}
          <div className="absolute w-[340px] h-[340px] rounded-full bg-white shadow-[0_20px_0_#f1f5f9] border-[8px] border-white" />

          {/* SVG Progress Circle */}
          <svg className="w-[320px] h-[320px] transform -rotate-90 relative z-10">
            {/* Background Track */}
            <circle
              cx="160"
              cy="160"
              r={radius}
              stroke="#F1F5F9"
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
              style={{
                strokeDashoffset,
                transition: "stroke-dashoffset 1s linear",
              }}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="timerGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#5B4DDB" />
                <stop offset="100%" stopColor="#FF6B6B" />
              </linearGradient>
            </defs>
          </svg>

          {/* Inner Content */}
          <div className="absolute flex flex-col items-center justify-center z-20">
            <div
              className={`text-7xl font-black text-[#111827] tabular-nums tracking-tighter mb-1 transition-all duration-300 ${isActive ? "scale-110 drop-shadow-[0_4px_0_rgba(0,0,0,0.1)]" : "scale-100 opacity-60"}`}
            >
              {formatTime(secondsLeft)}
            </div>
            <div
              className={`flex items-center gap-1.5 transition-colors ${isActive ? "text-[#FF6B6B]" : "text-[#7B7F97]"}`}
            >
              <Flame
                className={`w-5 h-5 fill-current ${isActive ? "animate-bounce" : ""}`}
              />
              <span className="font-black text-[10px] uppercase tracking-[0.2em]">
                {isActive ? "Focus" : "Paused"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-md">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-[24px] font-black text-sm uppercase tracking-[0.2em] transition-all border-[4px] active:translate-y-1 active:shadow-none ${
              isActive
                ? "bg-white text-[#111827] hover:bg-slate-50 border-slate-100 shadow-[0_6px_0_#f1f5f9]"
                : "bg-[#5B4DDB] text-white border-[#4539a5] shadow-[0_6px_0_#3730a3]"
            }`}
          >
            {isActive ? (
              <Pause className="fill-current w-5 h-5" />
            ) : (
              <Play className="fill-current w-5 h-5" />
            )}
            {isActive ? "Pause" : "Resume"}
          </button>

          <button
            onClick={handleGiveUp}
            className="flex-1 flex items-center justify-center gap-3 py-5 bg-white text-[#7B7F97] border-[4px] border-slate-100 rounded-[24px] font-black text-sm uppercase tracking-[0.2em] shadow-[0_6px_0_#f1f5f9] hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 hover:shadow-[0_6px_0_#fecdd3] active:translate-y-1 active:shadow-none transition-all"
          >
            <XCircle className="w-5 h-5" />
            Give Up
          </button>
        </div>

        {/* Reward Preview */}
        <div className="mt-5 flex items-center gap-4 bg-white px-6 py-4 rounded-[20px] border-[3px] border-slate-100 shadow-[0_4px_0_#f1f5f9]">
          <div className="flex items-center gap-1.5 text-[#F5B100] font-black tracking-tight">
            <Sparkles className="w-5 h-5" fill="currentColor" />
            <span className="text-sm uppercase tracking-tighter">
              +{activeTask.timeEstimation * 2} EXP
            </span>
          </div>
          <div className="w-[2px] h-6 bg-slate-100" />
          <div className="text-[#7B7F97] font-black text-[10px] uppercase tracking-[0.2em]">
            Task Reward
          </div>
        </div>
      </div>

      {/* Completion Card Overlay */}
      {showCompletion && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0b0b0b]/60 backdrop-blur-md animate-in fade-in duration-500" />

          <div className="relative w-full max-w-md bg-white rounded-[40px] p-8 sm:p-12 shadow-[0_16px_0_rgba(0,0,0,0.1)] border-[4px] border-white flex flex-col items-center text-center animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
            {/* Success Icon */}
            <div className="relative mb-8 transform -translate-y-4">
              <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto relative">
                <img
                  src={happyMascot}
                  alt="Happy Mascot"
                  className="w-full h-full object-contain filter drop-shadow-xl"
                />
                <Sparkles
                  className="absolute -top-2 -right-4 text-[#F5B100] animate-pulse"
                  size={32}
                  fill="currentColor"
                />
                <Sparkles
                  className="absolute bottom-4 -left-4 text-[#5B4DDB] animate-pulse delay-75"
                  size={24}
                  fill="currentColor"
                />
              </div>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#111827] mb-2 uppercase italic tracking-tighter">
              Task Complete!
            </h2>
            <p className="text-[#7B7F97] font-bold mb-8 max-w-[280px] text-sm uppercase tracking-tight">
              You've done{" "}
              <span className="text-[#5B4DDB] font-black">
                "{activeTask.title}"
              </span>
              . Claim your reward!
            </p>

            {/* Rewards Grid */}
            <div className="grid grid-cols-1 gap-4 w-full mb-10">
              <div className="bg-slate-50 rounded-[24px] p-5 border-[3px] border-slate-100 shadow-inner flex flex-col items-center">
                <span className="text-3xl mb-2 filter drop-shadow-sm">✨</span>
                <span className="text-[#7B7F97] text-[9px] font-black uppercase tracking-[0.2em] mb-1">
                  Experience
                </span>
                <span className="text-[#5B4DDB] text-xl font-black tracking-tighter">
                  +{activeTask.timeEstimation * 2} XP
                </span>
              </div>
              {/* <div className="bg-slate-50 rounded-[24px] p-5 border-[3px] border-slate-100 shadow-inner flex flex-col items-center">
                <span className="text-3xl mb-2 filter drop-shadow-sm">💰</span>
                <span className="text-[#7B7F97] text-[9px] font-black uppercase tracking-[0.2em] mb-1">
                  Coins
                </span>
                <span className="text-[#F5B100] text-xl font-black tracking-tighter">
                  +{activeTask.timeEstimation * 5}
                </span>
              </div> */}
            </div>

            <button
              onClick={handleClaimRewards}
              className="w-full bg-[#5B4DDB] text-white py-5 rounded-[24px] font-black text-sm uppercase tracking-[0.2em] border-[4px] border-[#4539a5] shadow-[0_8px_0_#3730a3] hover:translate-y-0.5 hover:shadow-[0_4px_0_#3730a3] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3 italic"
            >
              <Sparkles className="w-5 h-5 fill-current" />
              <span>Claim Reward</span>
            </button>
          </div>
        </div>
      )}
      {/* Abort Confirmation Modal */}
      {showAbortConfirm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#0b0b0b]/60 backdrop-blur-md animate-in fade-in duration-300"
            onClick={cancelAbort}
          />
          <div className="relative z-10 w-full max-w-[400px] bg-white rounded-[40px] border-[4px] border-slate-100 shadow-[0_16px_0_rgba(0,0,0,0.1)] p-8 sm:p-10 animate-in fade-in zoom-in duration-300 text-center">
            <div className="w-36 h-36 mx-auto mb-2 relative transform -translate-y-4">
              <img
                src={sadMascot}
                alt="Sad Mascot"
                className="w-full h-full object-contain filter drop-shadow-xl"
              />
            </div>

            <h3 className="text-3xl font-black text-[#111827] uppercase tracking-tighter italic mb-4 leading-none">
              Quit Task?
            </h3>

            <p className="text-[#7B7F97] font-bold mb-8 leading-relaxed text-sm">
              Do you really want to give up from{" "}
              <span className="text-rose-500 font-black uppercase tracking-tight">
                "{activeTask.title}"
              </span>
              ? It's sad to see you lose all your progress. You can do it if you
              keep trying!
            </p>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={cancelAbort}
                className="py-4 rounded-[20px] font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#7B7F97] bg-slate-50 border-[3px] border-slate-100 shadow-[0_4px_0_#f1f5f9] active:translate-y-1 active:shadow-none transition-all"
              >
                Continue
              </button>
              <button
                onClick={confirmAbort}
                className="py-4 rounded-[20px] font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white bg-rose-500 border-[3px] border-rose-600 shadow-[0_4px_0_#be123c] active:translate-y-1 active:shadow-none transition-all"
              >
                Quit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
