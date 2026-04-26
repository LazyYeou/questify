import { useState, useEffect } from "react";

const floatingOrbs = [
  { size: 320, x: -80, y: -80, color: "#7C3AED", delay: 0 },
  { size: 200, x: 70, y: 60, color: "#2563EB", delay: 1.5 },
  { size: 150, x: 20, y: 80, color: "#059669", delay: 3 },
];

const features = [
  {
    icon: "⚔️",
    title: "XP & Quest System",
    desc: "Every task becomes a quest. Earn XP, level up, unlock badges — real-time dopamine hits for real work done.",
    color: "#7C3AED",
  },
  {
    icon: "⏱️",
    title: "Focus Timer + Streaks",
    desc: "Pomodoro sessions that reward consistency. Miss a day, lose your streak. Keep it, multiply your XP.",
    color: "#2563EB",
  },
  {
    icon: "🌳",
    title: "Skill Tree Dashboard",
    desc: "Visualize your mastery like an RPG map. Green nodes = conquered. Grey = waiting. Every topic, unlocked.",
    color: "#059669",
  },
  {
    icon: "👥",
    title: "Guilds + Leaderboard",
    desc: "Study in squads. Weekly guild challenges. Relative leaderboards so it's always competitive, never demoralizing.",
    color: "#DC2626",
  },
  {
    icon: "📋",
    title: "Quest Board",
    desc: "Drag-drop your tasks into Urgent / Important / Backlog. Start every day with your top 3 quests — crystal clear.",
    color: "#D97706",
  },
];

const stats = [
  { value: "2×", label: "More tasks completed" },
  { value: "87%", label: "Users maintain 7-day streak" },
  { value: "40min", label: "Average daily focus time" },
];

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{
      fontFamily: "'Syne', 'Space Grotesk', sans-serif",
      background: "#0A0A0F",
      color: "#F0F0F5",
      minHeight: "100vh",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0A0A0F; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(2deg); }
          66% { transform: translateY(10px) rotate(-1deg); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        .hero-title {
          animation: fadeSlideUp 0.8s ease forwards;
        }
        .hero-sub {
          animation: fadeSlideUp 0.8s 0.2s ease both;
        }
        .hero-cta {
          animation: fadeSlideUp 0.8s 0.4s ease both;
        }
        .hero-badge {
          animation: fadeSlideUp 0.8s 0.1s ease both;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.25;
        }
        .orb-0 { animation: float 8s ease-in-out infinite; }
        .orb-1 { animation: float 11s ease-in-out infinite 1.5s; }
        .orb-2 { animation: float 9s ease-in-out infinite 3s; }

        .feature-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(124,58,237,0.15);
        }

        .cta-btn {
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(124,58,237,0.5);
        }
        .cta-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 2.5s ease infinite;
        }

        .xp-bar-fill {
          animation: fillBar 2s ease 0.5s both;
        }
        @keyframes fillBar {
          from { width: 0%; }
          to { width: 73%; }
        }

        .nav-link {
          color: rgba(240,240,245,0.6);
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.05em;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #F0F0F5; }

        .grid-pattern {
          background-image: 
            linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: 1px solid;
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "20px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: scrollY > 50 ? "rgba(10,10,15,0.9)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
        borderBottom: scrollY > 50 ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.3s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #7C3AED, #2563EB)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16,
          }}>⚔️</div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em" }}>Questify</span>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          <a href="#features" className="nav-link">Features</a>
          <a href="#how" className="nav-link">How it Works</a>
          <a href="#stats" className="nav-link">Results</a>
          <a href="/login" style={{
            padding: "9px 22px",
            borderRadius: 8,
            background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: 14,
            border: "1px solid rgba(124,58,237,0.5)",
          }}>Start Quest →</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 80px",
        overflow: "hidden",
      }}>
        <div className="grid-pattern" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
        {floatingOrbs.map((orb, i) => (
          <div key={i} className={`orb orb-${i}`} style={{
            width: orb.size, height: orb.size,
            left: `${orb.x}%`, top: `${orb.y}%`,
            background: orb.color,
          }} />
        ))}

        {/* FLOATING UI CARD */}
        <div style={{
          position: "absolute", right: "8%", top: "22%",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16,
          padding: "20px",
          width: 220,
          animation: "float 7s ease-in-out infinite",
        }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 10, fontFamily: "'Space Mono', monospace" }}>LEVEL PROGRESS</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #2563EB)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🧙</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Level 12</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Scholar</div>
            </div>
          </div>
          <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden" }}>
            <div className="xp-bar-fill" style={{ height: "100%", background: "linear-gradient(90deg, #7C3AED, #2563EB)", borderRadius: 3 }} />
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 6, display: "flex", justifyContent: "space-between" }}>
            <span>1460 XP</span><span>2000 XP</span>
          </div>
        </div>

        {/* FLOATING QUEST CARD */}
        <div style={{
          position: "absolute", left: "6%", bottom: "28%",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16,
          padding: "16px",
          width: 200,
          animation: "float 9s ease-in-out infinite 2s",
        }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 10, fontFamily: "'Space Mono', monospace" }}>ACTIVE QUEST</div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>📚 Calculus Chapter 4</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "#059669", fontWeight: 700 }}>+120 XP</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>25:00 ⏱</span>
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 820 }}>
          <div className="hero-badge" style={{ marginBottom: 24 }}>
            <span className="tag" style={{ borderColor: "rgba(124,58,237,0.4)", color: "#A78BFA", background: "rgba(124,58,237,0.1)" }}>
              🎮 Gamified Learning OS
            </span>
          </div>

          <h1 className="hero-title" style={{
            fontSize: "clamp(48px, 8vw, 96px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.0,
            marginBottom: 28,
            background: "linear-gradient(135deg, #F0F0F5 0%, rgba(240,240,245,0.6) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Turn studying<br />
            <span style={{
              background: "linear-gradient(135deg, #7C3AED, #2563EB, #059669)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>into quests.</span>
          </h1>

          <p className="hero-sub" style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "rgba(240,240,245,0.55)",
            lineHeight: 1.65,
            maxWidth: 560,
            margin: "0 auto 40px",
          }}>
            Questify transforms your study tasks into RPG missions. Earn XP, build streaks, 
            unlock skills, and compete in guilds — because your ambition deserves more than a to-do list.
          </p>

          <div className="hero-cta" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="cta-btn" style={{
              padding: "16px 36px",
              borderRadius: 12,
              background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
              color: "#fff",
              border: "1px solid rgba(124,58,237,0.5)",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer",
              letterSpacing: "-0.01em",
            }}>
              Begin Your Quest — Free
            </button>
            <button style={{
              padding: "16px 28px",
              borderRadius: 12,
              background: "transparent",
              color: "rgba(240,240,245,0.7)",
              border: "1px solid rgba(255,255,255,0.12)",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
              transition: "all 0.2s",
            }}>
              Watch Demo ▶
            </button>
          </div>

          <div style={{ marginTop: 56, display: "flex", justifyContent: "center", gap: 8 }}>
            {["No credit card", "Student-first", "Works offline"].map((t, i) => (
              <span key={i} style={{
                fontSize: 12, color: "rgba(240,240,245,0.4)", display: "flex", alignItems: "center", gap: 4
              }}>
                {i > 0 && <span style={{ color: "rgba(255,255,255,0.15)", marginRight: 8 }}>·</span>}
                ✓ {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="stats" style={{
        padding: "80px 40px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", justifyContent: "center", gap: 80, flexWrap: "wrap",
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "clamp(40px, 5vw, 64px)",
              fontWeight: 800,
              fontFamily: "'Space Mono', monospace",
              background: "linear-gradient(135deg, #7C3AED, #2563EB)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.03em",
            }}>{s.value}</div>
            <div style={{ fontSize: 14, color: "rgba(240,240,245,0.5)", marginTop: 8, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: "100px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="tag" style={{ borderColor: "rgba(124,58,237,0.4)", color: "#A78BFA", background: "rgba(124,58,237,0.1)", marginBottom: 20, display: "inline-flex" }}>
            ⚔️ Arsenal
          </span>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em", marginTop: 16 }}>
            Your full quest toolkit
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {features.map((f, i) => (
            <div key={i} className="feature-card" style={{
              padding: "28px",
              borderRadius: 16,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, transparent, ${f.color}, transparent)`,
              }} />
              <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.02em" }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "rgba(240,240,245,0.5)", lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{
        padding: "100px 40px",
        background: "rgba(255,255,255,0.02)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 20 }}>
            The Quest Loop
          </h2>
          <p style={{ color: "rgba(240,240,245,0.5)", fontSize: 16, lineHeight: 1.7, marginBottom: 60 }}>
            A daily cycle engineered for momentum — small wins compound into mastery.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { n: "01", title: "Create a Quest", desc: "Add a task, estimate time, assign to a subject skill tree." },
              { n: "02", title: "Start the Timer", desc: "25-minute Pomodoro session begins. Focus mode locks distractions." },
              { n: "03", title: "Earn XP & Streak", desc: "Complete it — get instant XP. Finish daily — grow your streak." },
              { n: "04", title: "Level Up", desc: "Every 100 XP pushes you to the next level. Badges, titles, unlocks." },
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 24, textAlign: "left", position: "relative", paddingBottom: i < 3 ? 40 : 0 }}>
                {i < 3 && <div style={{ position: "absolute", left: 24, top: 52, bottom: 0, width: 1, background: "rgba(124,58,237,0.2)" }} />}
                <div style={{
                  width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                  background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(37,99,235,0.3))",
                  border: "1px solid rgba(124,58,237,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 12, color: "#A78BFA",
                }}>{step.n}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6, letterSpacing: "-0.02em" }}>{step.title}</div>
                  <div style={{ color: "rgba(240,240,245,0.5)", fontSize: 14, lineHeight: 1.65 }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section style={{
        padding: "100px 40px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div className="orb" style={{ width: 400, height: 400, left: "50%", top: "50%", transform: "translate(-50%,-50%)", background: "#7C3AED", opacity: 0.12, filter: "blur(100px)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 20 }}>
            Your studying era<br />starts today.
          </h2>
          <p style={{ color: "rgba(240,240,245,0.5)", fontSize: 16, marginBottom: 40 }}>
            Join thousands of students turning tasks into victories.
          </p>
          <button className="cta-btn" style={{
            padding: "18px 48px",
            borderRadius: 14,
            background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
            color: "#fff",
            border: "1px solid rgba(124,58,237,0.5)",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 18,
            cursor: "pointer",
            letterSpacing: "-0.01em",
          }}>
            Create Free Account →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "32px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>⚔️</span>
          <span style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>Questify</span>
        </div>
        <div style={{ fontSize: 13, color: "rgba(240,240,245,0.3)" }}>
          © 2026 Questify · Gamified Learning OS
        </div>
      </footer>
    </div>
  );
}
