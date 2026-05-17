import React from "react";
import {
  ArrowRight,
  Rocket,
  Trophy,
  Star,
  CheckCircle,
  MessageSquare,
  User,
  Share2,
  Zap,
  Timer,
  Layout,
} from "lucide-react";
import mascotTile from "../assets/mascot/mascot-tile.png";

type Sprite = { src: string; pos: string };

const S1: Record<string, Sprite> = {
  trophy: { src: mascotTile, pos: "0% 0%" },
  chest: { src: mascotTile, pos: "50% 0%" },
  shop: { src: mascotTile, pos: "100% 0%" },
  sad: { src: mascotTile, pos: "0% 50%" },
  map: { src: mascotTile, pos: "50% 50%" },
  jump: { src: mascotTile, pos: "100% 50%" },
  quest: { src: mascotTile, pos: "0% 100%" },
  compass: { src: mascotTile, pos: "50% 100%" },
  tea: { src: mascotTile, pos: "100% 100%" },
};

function Mascot({
  sprite,
  size = 64,
  className = "",
}: {
  sprite: Sprite;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${sprite.src})`,
        backgroundPosition: sprite.pos,
        backgroundSize: "300% 300%",
        backgroundRepeat: "no-repeat",
        flexShrink: 0,
      }}
    />
  );
}

const stats = [
  { val: "120K+", label: "Quests Taken" },
  { val: "87%", label: "Success Rate" },
  { val: "4.9", label: "App Rating" },
];

const features = [
  {
    icon: <Layout size={22} />,
    title: "Quest Board",
    desc: "Break down massive assignments into bite-sized side-quests.",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    shadow: "shadow-[0_6px_0_#c7d2fe]",
    text: "text-indigo-600",
  },
  {
    icon: <Timer size={22} />,
    title: "Focus Timer",
    desc: "Timer session with rewards for rewarding your focus.",
    bg: "bg-orange-50",
    border: "border-orange-200",
    shadow: "shadow-[0_6px_0_#fed7aa]",
    text: "text-orange-500",
  },
  {
    icon: <Star size={22} />,
    title: "XP & Levels",
    desc: "Earn XP and Level Up.",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    shadow: "shadow-[0_6px_0_#a7f3d0]",
    text: "text-emerald-500",
  },
  {
    icon: <Trophy size={22} />,
    title: "Leader board",
    desc: "Climb the ranks and compete with other students.",
    bg: "bg-purple-50",
    border: "border-purple-200",
    shadow: "shadow-[0_6px_0_#e9d5ff]",
    text: "text-purple-600",
  },
];

const steps = [
  {
    n: "01",
    title: "Pick a Quest",
    desc: "Add a task, set XP, choose a deadline.",
    bg: "bg-blue-50",
    border: "border-blue-200",
    shadow: "shadow-[0_6px_0_#bfdbfe]",
    badge: "bg-blue-500",
  },
  {
    n: "02",
    title: "Focus & Study",
    desc: "Do your task as long as the time artive.",
    bg: "bg-orange-50",
    border: "border-orange-200",
    shadow: "shadow-[0_6px_0_#fed7aa]",
    badge: "bg-orange-500",
  },
  {
    n: "03",
    title: "Earn XP",
    desc: "Finish sessions, grow your streak.",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    shadow: "shadow-[0_6px_0_#a7f3d0]",
    badge: "bg-emerald-500",
  },
  {
    n: "04",
    title: "Level Up",
    desc: "Unlock badges, climb the leaderboard.",
    bg: "bg-purple-50",
    border: "border-purple-200",
    shadow: "shadow-[0_6px_0_#e9d5ff]",
    badge: "bg-purple-500",
  },
];

const proofItems = [
  {
    icon: <CheckCircle className="text-[#5B4DDB]" size={28} />,
    val: "2× Tasks",
    label: "Per Session",
  },
  {
    icon: <Rocket className="text-orange-500" size={28} />,
    val: "Focus Mode",
    label: "Active Rewards",
  },
  {
    icon: <Trophy className="text-emerald-500" size={28} />,
    val: "Top 1%",
    label: "Student Growth",
  },
];

export default function LandingPage({ onStart }: { onStart?: () => void }) {
  return (
    <div className="w-full min-h-screen bg-[#F8F9FF] font-sans relative overflow-x-hidden">
      <style>{`
        @keyframes floatB { 0%,100%{transform:translateY(0) rotate(1deg)}  50%{transform:translateY(-12px) rotate(-2deg)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes wiggle { 0%,100%{transform:rotate(0deg)} 25%{transform:rotate(-8deg)} 75%{transform:rotate(8deg)} }
        @keyframes barFill { from{width:0%} to{width:75%} }
 
        .float-b { animation: floatB 6.5s ease-in-out infinite 1s; }
 
        .fade-up   { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation: fadeUp 0.7s 0.15s ease both; }
        .fade-up-2 { animation: fadeUp 0.7s 0.30s ease both; }
 
        .card-hover:hover .mascot-wi { animation: wiggle .5s ease; }
 
        .xp-bar { animation: barFill 1.8s ease .5s both; }
      `}</style>

      {/* ── NAV ──────────────────────────────────────────────── */}
      <nav className="flex justify-between items-center px-4 sm:px-6 py-6 sm:py-8 max-w-6xl mx-auto relative z-20">
        <div className="flex items-center gap-2 sm:gap-3">
          <Mascot sprite={S1.jump} size={40} className="sm:size-10 size-8" />
          <span className="text-xl sm:text-2xl font-black italic tracking-tighter text-[#5B4DDB] uppercase">
            Questify
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10 text-[#7B7F97] text-sm font-black uppercase tracking-widest">
          {["Features", "How it works", "Results"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/ /g, "-")}`}
              className="hover:text-[#5B4DDB] transition-colors"
            >
              {l}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onStart}
            className="bg-[#5B4DDB] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-[24px] font-black text-xs sm:text-sm uppercase tracking-widest border-[3px] border-[#4539a5] shadow-[0_4px_0_#3730a3] hover:translate-y-0.5 hover:shadow-[0_2px_0_#3730a3] active:translate-y-1 active:shadow-none transition-all"
          >
            Log In
          </button>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-8 pb-12 sm:pb-20">
        {/* Visuals */}
        <div className="relative flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
          {/* Fox */}
          <div className="float-b relative z-20">
            <Mascot sprite={S1.jump} size={240} className="sm:hidden" />
            <Mascot sprite={S1.jump} size={320} className="hidden sm:block" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Copy */}
          <div className="z-10 text-center lg:text-left">
            <h1 className="fade-up text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 leading-[1.05] tracking-tighter uppercase italic text-[#111827]">
              Change <span className="text-[#5B4DDB]">Task</span> Into Quest.
              <br />
            </h1>

            <p className="fade-up-1 text-sm sm:text-base md:text-lg text-[#7B7F97] mb-8 sm:mb-10 max-w-lg leading-relaxed font-bold mx-auto lg:mx-0">
              Gamify your daily tasks. Complete focus sessions, level up, and
              defeat procrastination.
            </p>

            <div className="fade-up-2 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <button
                onClick={onStart}
                className="bg-[#5B4DDB] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-[24px] font-black text-sm sm:text-base uppercase tracking-widest border-[3px] border-[#4539a5] shadow-[0_6px_0_#3730a3] hover:translate-y-0.5 hover:shadow-[0_3px_0_#3730a3] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3"
              >
                Start Your Task <ArrowRight size={20} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        {/* <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white p-6 sm:p-8 rounded-[32px] border-[3px] border-slate-100 shadow-[0_6px_0_#f1f5f9] text-center"
            >
              <div className="text-3xl sm:text-4xl font-black text-[#111827] mb-1 sm:mb-2 tracking-tighter italic uppercase">
                {s.val}
              </div>
              <div className="text-[#7B7F97] font-black uppercase tracking-widest text-[10px] sm:text-xs">
                {s.label}
              </div>
            </div>
          ))}
        </div> */}
      </header>

      {/* ── PROOF BAR ────────────────────────────────────────── */}
      {/* <section className="bg-white border-y-[3px] border-slate-100 py-10 sm:py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 items-center">
          {proofItems.map((p, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-2 sm:gap-3 text-center"
            >
              <div className="p-3 sm:p-4 bg-[#F8F9FF] rounded-[20px] sm:rounded-[24px] border-[3px] border-slate-100 text-[#5B4DDB]">
                {p.icon}
              </div>
              <div>
                <div className="text-[#111827] text-xl sm:text-2xl font-black italic uppercase tracking-tighter mb-1">
                  {p.val}
                </div>
                <div className="text-[#7B7F97] text-[10px] font-black uppercase tracking-widest">
                  {p.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section
        id="features"
        className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto"
      >
        <div className="mb-10 sm:mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-[#111827] mb-2 sm:mb-3 uppercase tracking-tighter italic">
            Our Main <span className="text-[#5B4DDB]">Features</span>
          </h2>
          <p className="text-[#7B7F97] text-sm sm:text-base font-bold max-w-2xl mx-auto">
            This is all you need to turn your study grind into an epic quest.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className={`card-hover p-5 sm:p-7 ${f.bg} rounded-[32px] border-[3px] ${f.border} ${f.shadow} group transition-all`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-10 h-10 bg-white ${f.text} rounded-[14px] flex items-center justify-center border-[2px] ${f.border} shadow-sm group-hover:scale-110 transition-transform flex-shrink-0`}
                >
                  {f.icon}
                </div>
                <h3 className="text-base sm:text-lg font-black text-[#111827] uppercase tracking-tight italic leading-tight">
                  {f.title}
                </h3>
              </div>
              <p className="text-[#4a4455] font-bold leading-relaxed text-[10px] sm:text-xs">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="py-16 sm:py-20 px-4 sm:px-6 bg-white border-y-[3px] border-slate-100"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 sm:mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-[#111827] mb-2 sm:mb-3 uppercase tracking-tighter italic">
              The <span className="text-[#5B4DDB]">Quest</span> Loop
            </h2>
            <p className="text-[#7B7F97] text-sm sm:text-base font-bold">
              A simple but powerful cycle engineered for maximum momentum.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {steps.map((s) => (
              <div
                key={s.n}
                className={`card-hover ${s.bg} rounded-[32px] p-6 sm:p-8 border-[3px] ${s.border} ${s.shadow}`}
              >
                <div
                  className={`inline-block px-4 py-1.5 rounded-full ${s.badge} text-white text-[10px] sm:text-xs font-black mb-4 sm:mb-6 uppercase tracking-widest border-[2px] border-white/50`}
                >
                  Step {s.n}
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#111827] mb-1 uppercase tracking-tight italic">
                  {s.title}
                </h3>
                <p className="text-[#4a4455] font-bold text-xs sm:text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 pb-16 mt-4 sm:pb-24">
        <div className="max-w-6xl mx-auto bg-[#F8F9FF] rounded-[40px] sm:rounded-[48px] py-12 sm:py-16 px-6 sm:px-10 text-center relative overflow-hidden border-[3px] border-slate-100 shadow-[0_8px_0_#f1f5f9]">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] mb-4 sm:mb-6 uppercase tracking-tighter italic leading-none">
              Your Studying Era Starts Today.
            </h2>

            <p className="text-[#7B7F97] text-sm sm:text-base md:text-lg mb-8 sm:mb-10 font-bold max-w-lg mx-auto leading-relaxed">
              Join us for to turn academic grind into a legendary adventure.
            </p>

            <button
              onClick={onStart}
              className="bg-[#5B4DDB] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-[24px] font-black text-sm sm:text-base uppercase tracking-widest border-[3px] border-[#4539a5] shadow-[0_6px_0_#3730a3] hover:translate-y-0.5 hover:shadow-[0_3px_0_#3730a3] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3 sm:gap-4 mx-auto"
            >
              Join the Quest <ArrowRight size={20} strokeWidth={3} />
            </button>

            <p className="text-[#7B7F97] font-black uppercase tracking-widest text-[9px] sm:text-[10px] mt-6 sm:mt-8">
              Free forever plan
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="bg-white border-t-[3px] border-slate-100 pt-10 sm:pt-12 pb-8 sm:pb-10">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 max-w-6xl mx-auto gap-8 sm:gap-10">
          <div className="flex flex-col gap-3 items-center md:items-start">
            <div className="flex items-center gap-2">
              <Mascot sprite={S1.jump} size={32} />
              <span className="text-lg sm:text-xl font-black italic tracking-tighter text-[#5B4DDB] uppercase">
                Questify
              </span>
            </div>
            <p className="text-[#7B7F97] text-center md:text-left text-[10px] font-bold max-w-[200px] leading-relaxed">
              © 2026 Questify OS.
              <br />
              {/* Level up your learning journey. */}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {["Privacy Policy", "Terms of Service", "Support"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-[#7B7F97] hover:text-[#5B4DDB] font-black uppercase tracking-widest text-[10px] transition-colors"
              >
                {l}
              </a>
            ))}
          </div>

          {/* <div className="flex gap-3">
            {[Share2, User].map((Icon, idx) => (
              <div
                key={idx}
                className="w-10 h-10 rounded-[16px] bg-slate-50 border-[2px] border-slate-100 flex items-center justify-center text-[#7B7F97] hover:text-[#5B4DDB] hover:border-[#5B4DDB]/20 transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <Icon size={16} strokeWidth={3} />
              </div>
            ))}
          </div> */}
        </div>
      </footer>
    </div>
  );
}
