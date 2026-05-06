import React from "react";
import happyMascot from "../assets/mascot/happy.png";

export default function LoginPage({ onLogin }: { onLogin?: () => void }) {
  return (
    <div className="w-full min-h-screen bg-[#F8F9FF] font-sans relative flex items-center justify-center px-4 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[100px] opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-100 rounded-full blur-[100px] opacity-50" />
      </div>

      <div className="relative z-10 w-full max-w-md mt-12 sm:mt-0">
        <div className="bg-white rounded-[32px] sm:rounded-[40px] border-[4px] border-slate-100 shadow-[0_12px_0_#f1f5f9] p-6 pt-10 sm:p-12 text-center relative">
          {/* Mascot Positioned Above Card */}
          <div className="absolute -top-16 sm:-top-20 left-1/2 -translate-x-1/2 w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
            <img
              src={happyMascot}
              alt="Happy Mascot"
              className="w-full h-full object-contain hover:scale-105 transition-transform"
            />
          </div>

          <div className="mt-4 sm:mt-10 mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-black text-[#111827] uppercase tracking-tighter italic leading-none mb-2">
              Welcome to <span className="text-[#5B4DDB]">Questify</span>
            </h1>
            <p className="text-[#7B7F97] font-bold text-xs sm:text-base leading-relaxed">
              Your gamified study OS awaits.
            </p>
          </div>

          <div className="w-full h-px bg-slate-100 border-[2px] border-slate-50 rounded-full mb-6 sm:mb-8" />

          {/* Google Login Button */}
          <button
            onClick={onLogin}
            className="w-full bg-white text-[#111827] px-4 py-4 sm:px-6 sm:py-5 rounded-[24px] font-black text-xs sm:text-base uppercase tracking-widest border-[3px] border-slate-200 shadow-[0_6px_0_#e2e8f0] hover:border-slate-300 hover:translate-y-0.5 hover:shadow-[0_3px_0_#cbd5e1] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3 sm:gap-4 group"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.65 16.86 16.82 15.69 17.6V20.53H19.26C21.36 18.6 22.56 15.69 22.56 12.25Z"
                fill="#4285F4"
              />
              <path
                d="M12 23C14.97 23 17.46 22.02 19.26 20.53L15.69 17.6C14.71 18.26 13.46 18.65 12 18.65C9.17999 18.65 6.78999 16.74 5.92999 14.18H2.23999V17.04C4.03999 20.61 7.70999 23 12 23Z"
                fill="#34A853"
              />
              <path
                d="M5.92999 14.18C5.70999 13.52 5.57999 12.78 5.57999 12C5.57999 11.22 5.70999 10.48 5.92999 9.82001V6.96002H2.23999C1.49999 8.43002 1.06999 10.15 1.06999 12C1.06999 13.85 1.49999 15.57 2.23999 17.04L5.92999 14.18Z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.35C13.62 5.35 15.06 5.91 16.21 7L19.34 3.87C17.45 2.09 14.97 1 12 1C7.70999 1 4.03999 3.39 2.23999 6.96002L5.92999 9.82001C6.78999 7.26 9.17999 5.35 12 5.35Z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          <div className="mt-6 sm:mt-8 text-[9px] sm:text-xs font-bold text-[#7B7F97] uppercase tracking-widest leading-relaxed">
            By logging in, you agree to our
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>
            <a
              href="#"
              className="text-[#5B4DDB] hover:underline underline-offset-2"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-[#5B4DDB] hover:underline underline-offset-2"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Floating Bottom Element for extra gamification feel */}
        <div
          className="absolute -bottom-5 right-2 sm:-bottom-6 sm:right-[-20px] bg-[#5B4DDB] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border-[2px] sm:border-[3px] border-[#4539a5] shadow-[0_4px_0_#3730a3] text-[9px] sm:text-[10px] font-black uppercase tracking-widest rotate-6 animate-bounce"
          style={{ animationDuration: "3s" }}
        >
          Free Forever!
        </div>
      </div>
    </div>
  );
}
