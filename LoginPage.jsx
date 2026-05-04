import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen w-full bg-[#f4f3fb] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[400px] relative">

        {/* Streak badge — top-left, mirrors the reference's orange streak card */}
        <div className="absolute -top-6 -left-2 z-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl px-3 py-2 shadow-[6px_6px_16px_rgba(251,146,60,0.4)] rotate-[-4deg]">
          <div className="flex items-center gap-1.5">
            <span className="text-lg">🔥</span>
            <div>
              <div className="text-white font-extrabold text-sm leading-none">1001</div>
              <div className="text-orange-100 text-[8px] font-bold tracking-wider leading-none mt-0.5">DAY STREAK</div>
            </div>
          </div>
        </div>

        {/* Main login card */}
        <div className="bg-white rounded-3xl p-8 pt-14 shadow-[12px_12px_30px_rgba(167,139,250,0.15),-6px_-6px_20px_rgba(255,255,255,0.8)]">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              WELCOME BACK
            </h1>
            <p className="text-sm text-slate-400 mt-1 font-medium">
              Ready to continue your streak?
            </p>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-[11px] font-bold text-slate-500 tracking-widest ml-2 mb-2 block">
              EMAIL
            </label>
            <div className="bg-[#f4f3fb] rounded-2xl border-2 border-slate-200 shadow-[inset_4px_4px_8px_rgba(167,139,250,0.18),inset_-4px_-4px_8px_rgba(255,255,255,0.9)]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent px-5 py-4 text-slate-700 placeholder:text-slate-300 focus:outline-none font-medium"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="text-[11px] font-bold text-slate-500 tracking-widest ml-2 mb-2 block">
              PASSWORD
            </label>
            <div className="bg-[#f4f3fb] rounded-2xl border-2 border-slate-200 shadow-[inset_4px_4px_8px_rgba(167,139,250,0.18),inset_-4px_-4px_8px_rgba(255,255,255,0.9)]">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent px-5 py-4 text-slate-700 placeholder:text-slate-300 focus:outline-none font-medium"
              />
            </div>
          </div>

          {/* Forgot */}
          <div className="text-right mb-6">
            <a href="#" className="text-xs font-bold text-purple-500 hover:text-purple-700 transition">
              Forgot password?
            </a>
          </div>

          {/* Login button */}
          <button
            className="w-full bg-[#5b4ae0] text-white font-extrabold py-4 rounded-2xl text-base tracking-wider italic border-2 border-[#3d2fb8] shadow-[0_8px_0_0_#3d2fb8,0_10px_20px_rgba(91,74,224,0.35)] hover:bg-[#6857e8] active:translate-y-[6px] active:shadow-[0_2px_0_0_#3d2fb8,0_4px_10px_rgba(91,74,224,0.3)] transition-all duration-100"
          >
            LOG IN
          </button>

          {/* XP gain hint */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="bg-pink-50 border border-pink-100 rounded-full px-3 py-1 flex items-center gap-1">
              <span className="text-pink-500 text-xs">⚡</span>
              <span className="text-[10px] font-extrabold text-pink-500 tracking-wider">+50 XP ON LOGIN</span>
            </div>
          </div>

          {/* Create account */}
          <div className="text-center mt-6 pt-6 border-t border-slate-100">
            <p className="text-sm text-slate-500 font-medium">
              New here?{" "}
              <a href="#" className="text-purple-600 font-extrabold hover:text-purple-800 transition">
                Create account
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
