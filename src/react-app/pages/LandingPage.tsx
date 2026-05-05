import mascotTile  from "../assets/mascot/mascot-tile.png";
import mascotTile1 from "../assets/mascot/mascot-tile1.png";
 
type Sprite = { src: string; pos: string };
 
const S1: Record<string, Sprite> = {
  trophy:  { src: mascotTile, pos: "0% 0%"      },
  chest:   { src: mascotTile, pos: "50% 0%"     },
  shop:    { src: mascotTile, pos: "100% 0%"    },
  sad:     { src: mascotTile, pos: "0% 50%"     },
  map:     { src: mascotTile, pos: "50% 50%"    },
  jump:    { src: mascotTile, pos: "100% 50%"   },
  quest:   { src: mascotTile, pos: "0% 100%"    },
  compass: { src: mascotTile, pos: "50% 100%"   },
  tea:     { src: mascotTile, pos: "100% 100%"  },
};
 
const S2: Record<string, Sprite> = {
  bag:     { src: mascotTile1, pos: "0% 0%"     },
  writing: { src: mascotTile1, pos: "50% 0%"    },
  coin:    { src: mascotTile1, pos: "100% 0%"   },
  think:   { src: mascotTile1, pos: "0% 50%"    },
  sleep:   { src: mascotTile1, pos: "50% 50%"   },
  stars:   { src: mascotTile1, pos: "100% 50%"  },
  point:   { src: mascotTile1, pos: "0% 100%"   },
  gem:     { src: mascotTile1, pos: "50% 100%"  },
  tea2:    { src: mascotTile1, pos: "100% 100%" },
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
  { val: "87%",   label: "Success Rate" },
  { val: "4.9",   label: "App Rating"   },
];
 
const features = [
  { sprite: S1.quest,   title: "Quest Board", desc: "Break down massive assignments into bite-sized side-quests.",   bg: "bg-[#eaddff4d]", border: "border-[#7c3aed]" },
  { sprite: S2.writing, title: "Focus Timer", desc: "Enter the study dungeon with timers that reward your focus.",   bg: "bg-[#ffddb84d]", border: "border-[#fea619]" },
  { sprite: S1.trophy,  title: "XP & Levels", desc: "Earn XP for every minute studied and level up your character.", bg: "bg-[#6ffbbe4d]", border: "border-[#007650]" },
  { sprite: S2.stars,   title: "Skill Tree",  desc: "Master subjects to unlock new rewards and upgrades.",           bg: "bg-[#dee9fc]",   border: "border-[#7b7487]" },
];
 
const steps = [
  { n: "01", sprite: S1.quest,   title: "Pick a Quest",  desc: "Add a task, set XP, choose a deadline." },
  { n: "02", sprite: S2.writing, title: "Focus & Study", desc: "25-min Pomodoro. Your fox cheers you on." },
  { n: "03", sprite: S1.trophy,  title: "Earn XP",       desc: "Finish sessions, grow your streak." },
  { n: "04", sprite: S2.gem,     title: "Level Up",      desc: "Unlock badges, climb the leaderboard." },
];
 
const proofItems = [
  { icon: "task_alt",      val: "2× Tasks",   label: "Per Session",    color: "text-amber-400"   },
  { icon: "rocket_launch", val: "Focus Mode", label: "Active Rewards", color: "text-emerald-400" },
  { icon: "military_tech", val: "Top 1%",     label: "Student Growth", color: "text-violet-400"  },
];
 
// ─── FIX 1: onStart prop — connects to App.tsx setCurrentPage ──
export default function LandingPage({ onStart }: { onStart?: () => void }) {
  return (
    <div
      className="bg-[#f8f9ff] text-[#121c2a] overflow-x-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,700;0,800;0,900;1,700;1,800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
 
        @keyframes floatA { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-16px) rotate(2deg)} }
        @keyframes floatB { 0%,100%{transform:translateY(0) rotate(1deg)}  50%{transform:translateY(-12px) rotate(-2deg)} }
        @keyframes floatC { 0%,100%{transform:translateY(0)}               50%{transform:translateY(-10px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes wiggle { 0%,100%{transform:rotate(0deg)} 25%{transform:rotate(-8deg)} 75%{transform:rotate(8deg)} }
        @keyframes barFill { from{width:0%} to{width:75%} }
 
        .float-a { animation: floatA 5s ease-in-out infinite; }
        .float-b { animation: floatB 6.5s ease-in-out infinite 1s; }
        .float-c { animation: floatC 7s ease-in-out infinite 2s; }
 
        .fade-up   { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation: fadeUp 0.7s 0.15s ease both; }
        .fade-up-2 { animation: fadeUp 0.7s 0.30s ease both; }
 
        .card-hover { transition: transform .25s ease, box-shadow .25s ease; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(0,0,0,.08); }
        .card-hover:hover .mascot-wi { animation: wiggle .5s ease; }
 
        .xp-bar { animation: barFill 1.8s ease .5s both; }
 
        .noise-bg::after {
          content:""; position:absolute; inset:0;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity:.018; pointer-events:none; z-index:10; border-radius:inherit;
        }
      `}</style>
 
      {/* ── NAV ──────────────────────────────────────────────── */}
      <nav className="flex justify-between items-center px-6 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Mascot sprite={S1.jump} size={32} />
          <span
            className="text-xl md:text-2xl font-black italic tracking-tight text-[#630ed4]"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
          >
            Questify
          </span>
        </div>
 
        <div className="hidden md:flex items-center gap-10 text-[#4a4455] text-sm font-semibold tracking-wide">
          {["Features", "How it works", "Results"].map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`}
              className="hover:text-[#630ed4] transition-colors">{l}</a>
          ))}
        </div>
 
        <div className="flex items-center gap-2">
          {/* FIX 2: All buttons call onStart */}
          <button
            onClick={onStart}
            className="hidden sm:block font-bold text-sm px-4 py-2 hover:text-[#630ed4] transition-colors"
          >
            Log In
          </button>
          <button
            onClick={onStart}
            className="bg-[#121c2a] text-[#f8f9ff] font-bold text-sm px-4 md:px-6 py-2.5 md:py-3 rounded-full border border-[#121c2a] hover:bg-[#f8f9ff] hover:text-[#121c2a] transition-all"
          >
            Start Quest →
          </button>
        </div>
      </nav>
 
      {/* ── HERO ─────────────────────────────────────────────── */}
      <header className="max-w-7xl mx-auto px-6 pt-4 pb-16">
        {/* Stats row — horizontal even on mobile */}
        <div className="flex flex-row justify-between items-center gap-2 mb-10 px-2">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div
                className="text-2xl sm:text-4xl md:text-6xl font-black mb-1 tracking-tight"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >{s.val}</div>
              <div className="text-[#4a4455] text-[9px] sm:text-xs font-semibold uppercase tracking-widest leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
 
        {/* Hero card */}
        <div className="noise-bg bg-white rounded-[28px] md:rounded-[40px] p-7 md:p-14 lg:p-20 shadow-xl border border-[#ccc3d8] flex flex-col lg:flex-row items-center gap-8 lg:gap-16 relative overflow-hidden">
          <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-[#630ed4]/5 rounded-full blur-3xl pointer-events-none" />
 
          {/* Copy */}
          <div className="flex-1 z-10 text-center lg:text-left w-full">
            <h1
              className="fade-up mb-5 leading-[1.05] tracking-tighter"
              style={{ fontFamily: "'Epilogue', sans-serif", fontSize: "clamp(32px, 6vw, 72px)", fontWeight: 800 }}
            >
              Study smarter.<br />
              <span className="italic text-[#7c3aed]">Level up</span> faster.
            </h1>
            <p className="fade-up-1 text-sm md:text-lg text-[#4a4455] mb-8 max-w-lg leading-relaxed mx-auto lg:mx-0">
              The gamified OS that turns your homework into quests and your productivity into power.
            </p>
            <div className="fade-up-2 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              {/* FIX 2: Hero CTA calls onStart */}
              <button
                onClick={onStart}
                className="bg-[#630ed4] text-white font-bold px-7 py-4 rounded-xl text-base md:text-lg shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Start Quest ⚔️
              </button>
              <button className="bg-white border-2 border-[#ccc3d8] text-[#121c2a] font-bold px-7 py-4 rounded-xl text-base md:text-lg hover:bg-[#e6eeff] transition-all">
                View Demo
              </button>
            </div>
          </div>
 
          {/* Visuals */}
          <div className="flex-1 relative flex items-center justify-center gap-4 w-full min-h-[200px] lg:min-h-[360px]">
            <div className="float-a absolute left-0 top-4 opacity-75 hidden lg:block pointer-events-none">
              <Mascot sprite={S2.coin} size={88} />
            </div>
            <div className="float-c absolute left-10 bottom-0 opacity-65 hidden lg:block pointer-events-none">
              <Mascot sprite={S1.tea} size={68} />
            </div>
 
            {/* Fox — responsive size */}
            <div className="float-b relative z-20 flex-shrink-0">
              <Mascot sprite={S1.jump} size={180} className="sm:hidden" />
              <Mascot sprite={S1.jump} size={240} className="hidden sm:block lg:hidden" />
              <Mascot sprite={S1.jump} size={280} className="hidden lg:block" />
            </div>
 
            {/* Phone — only on large screens */}
            <div className="relative w-[180px] h-[360px] bg-[#121c2a] rounded-[36px] p-2 shadow-2xl border-[5px] border-slate-800 rotate-3 hidden lg:block flex-shrink-0">
              <div className="w-full h-full bg-[#f8f9ff] rounded-[28px] overflow-hidden flex flex-col p-3 text-[#121c2a]">
                <div className="flex justify-between items-center mb-3">
                  <span className="material-symbols-outlined text-[#630ed4] text-lg">menu</span>
                  <div className="w-6 h-6 rounded-full bg-[#7c3aed]" />
                </div>
                <div className="mb-2">
                  <p className="text-[8px] font-semibold text-[#4a4455] uppercase tracking-wider mb-0.5">Welcome back</p>
                  <div className="text-sm font-bold">Alex Chen</div>
                </div>
                <div className="bg-[#7c3aed] text-white p-2.5 rounded-xl mb-2">
                  <div className="text-[7px] font-semibold uppercase mb-1">Current Level</div>
                  <div className="text-base font-black mb-1">LVL 42</div>
                  <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                    <div className="xp-bar bg-white h-full rounded-full" />
                  </div>
                  <div className="text-[7px] mt-1 text-right opacity-80">3,450 / 4,000 XP</div>
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <p className="text-[7px] font-semibold text-[#4a4455] uppercase tracking-wider">Active Quest</p>
                  <div className="bg-white border border-[#ccc3d8] p-2 rounded-lg flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#855300] text-xs">auto_stories</span>
                    <div>
                      <div className="text-[9px] font-bold">History Essay</div>
                      <div className="text-[7px] text-[#4a4455]">25 mins left</div>
                    </div>
                  </div>
                  <div className="bg-white border border-[#ccc3d8] p-2 rounded-lg flex items-center gap-1.5 opacity-40">
                    <span className="material-symbols-outlined text-[#005b3d] text-xs">calculate</span>
                    <div>
                      <div className="text-[9px] font-bold">Math Dungeon</div>
                      <div className="text-[7px] text-[#4a4455]">Locked — Lv 45</div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-around pt-2 border-t border-[#ccc3d8] mt-1">
                  <span className="material-symbols-outlined text-[#630ed4] text-sm">home</span>
                  <span className="material-symbols-outlined text-[#4a4455] text-sm">map</span>
                  <span className="material-symbols-outlined text-[#4a4455] text-sm">person</span>
                </div>
              </div>
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-3 bg-[#121c2a] rounded-full" />
            </div>
          </div>
        </div>
      </header>
 
      {/* ── PROOF BAR ────────────────────────────────────────── */}
      <section className="bg-[#27313f] py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-around items-center gap-6 sm:gap-12">
          {proofItems.map((p) => (
            <div key={p.label} className="flex items-center gap-3">
              <span className={`material-symbols-outlined text-3xl md:text-4xl ${p.color}`}>{p.icon}</span>
              <div className="text-left">
                <div
                  className="text-white font-bold text-xl md:text-2xl"
                  style={{ fontFamily: "'Epilogue', sans-serif" }}
                >{p.val}</div>
                <div className="text-slate-400 text-[10px] md:text-xs font-semibold uppercase tracking-widest mt-0.5">{p.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section id="features" className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-10 md:mb-16 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ fontFamily: "'Epilogue', sans-serif" }}
          >Your Study Toolkit</h2>
          <p className="text-sm md:text-lg text-[#4a4455]">
            Equip yourself with everything needed to conquer the academic year.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((f) => (
            <div key={f.title} className={`card-hover p-5 md:p-8 rounded-xl ${f.bg} border-l-4 ${f.border} shadow-sm cursor-default`}>
              <div className="mascot-wi mb-4">
                <Mascot sprite={f.sprite} size={52} className="md:hidden" />
                <Mascot sprite={f.sprite} size={64} className="hidden md:block" />
              </div>
              <h3
                className="text-base md:text-2xl font-bold mb-2"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >{f.title}</h3>
              <p className="text-[#4a4455] text-xs md:text-base leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section id="how-it-works" className="py-16 md:py-24 px-6 bg-[#eff4ff]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 md:mb-16 text-center">
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >The Quest Loop</h2>
            <p className="text-sm md:text-lg text-[#4a4455]">Four steps engineered for momentum.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {steps.map((s) => (
              <div key={s.n} className="card-hover bg-white rounded-xl p-4 md:p-6 text-center shadow-sm border border-[#ccc3d8]">
                <div className="inline-block px-2 md:px-3 py-1 rounded-full bg-[#121c2a] text-[#f8f9ff] text-[10px] md:text-xs font-bold mb-3 md:mb-5 tracking-wider">
                  {s.n}
                </div>
                <div className="mascot-wi flex justify-center mb-3">
                  <Mascot sprite={s.sprite} size={52} className="md:hidden" />
                  <Mascot sprite={s.sprite} size={72} className="hidden md:block" />
                </div>
                <h3
                  className="text-xs md:text-base font-bold mb-1.5"
                  style={{ fontFamily: "'Epilogue', sans-serif" }}
                >{s.title}</h3>
                <p className="text-[#4a4455] text-[10px] md:text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── TESTIMONIAL ──────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6 max-w-2xl mx-auto text-center">
        <Mascot sprite={S2.think} size={72} className="float-b mx-auto mb-5" />
        <blockquote
          className="text-xl md:text-3xl font-bold leading-snug mb-4"
          style={{ fontFamily: "'Epilogue', sans-serif" }}
        >
          "I used to dread studying.<br />
          Now I'm chasing my next level."
        </blockquote>
        <p className="text-[#4a4455] text-xs md:text-sm font-semibold tracking-wide">
          — AyuStar · Rank #2 · Study Squad Guild
        </p>
      </section>
 
      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="noise-bg bg-[#27313f] py-16 md:py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute left-4 bottom-0 opacity-40 hidden lg:block pointer-events-none float-a">
          <Mascot sprite={S1.chest} size={120} />
        </div>
        <div className="absolute right-4 bottom-0 opacity-40 hidden lg:block pointer-events-none float-b">
          <Mascot sprite={S2.point} size={120} />
        </div>
        <div className="relative z-10 max-w-xl mx-auto">
          <Mascot sprite={S1.trophy} size={80} className="float-c mx-auto mb-5" />
          <h2
            className="font-black tracking-tighter text-white mb-4"
            style={{ fontFamily: "'Epilogue', sans-serif", fontSize: "clamp(26px, 5vw, 56px)" }}
          >
            Your studying era<br />starts today.
          </h2>
          <p className="text-slate-400 text-sm md:text-lg mb-8">
            Join thousands of students turning tasks into victories.
          </p>
          {/* FIX 2: Final CTA calls onStart */}
          <button
            onClick={onStart}
            className="bg-[#fea619] text-[#2a1700] font-bold px-8 md:px-10 py-4 md:py-5 rounded-full text-base md:text-lg shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all"
          >
            Create Free Account ⚔️
          </button>
          <p className="text-slate-500 text-xs md:text-sm mt-4">No credit card · Free forever plan</p>
        </div>
      </section>
 
      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="bg-white border-t-2 border-slate-100 pt-10 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 max-w-7xl mx-auto text-sm gap-6">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <div className="flex items-center gap-2">
              <Mascot sprite={S1.jump} size={28} />
              <span
                className="text-lg md:text-xl font-black italic text-[#630ed4]"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >Questify</span>
            </div>
            <p className="text-[#4a4455] text-center md:text-left text-xs max-w-[180px]">
              © 2026 Questify OS. Level up your learning.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[#4a4455] text-xs md:text-sm">
            {["Privacy Policy", "Terms of Service", "Discord", "Support"].map((l) => (
              <a key={l} href="#" className="hover:text-[#630ed4] transition-colors">{l}</a>
            ))}
          </div>
          <div className="flex gap-3">
            {["share", "person"].map((icon) => (
              <div
                key={icon}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#e6eeff] flex items-center justify-center hover:bg-[#eaddff] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[#4a4455] text-base md:text-lg">{icon}</span>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
 