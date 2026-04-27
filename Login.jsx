import { useState } from "react";
import { Wand2, AtSign, Lock, CheckCircle2 } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-body antialiased flex items-center justify-center p-6 lg:p-12 overflow-hidden relative">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* LEFT — Brand panel */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          <div className="inline-flex items-center justify-center w-48 h-48 lg:w-56 lg:h-56 rounded-3xl bg-gradient-to-br from-[#1f1535] to-[#14101f] border border-purple-500/20 shadow-2xl shadow-purple-900/40 mb-10 mx-auto lg:mx-0">
            <Wand2 className="w-20 h-20 text-purple-300/90" strokeWidth={1.5} />
          </div>

          <h1 className="font-display font-bold text-5xl lg:text-6xl mb-5 tracking-tight">
            Questify <span className="gradient-text">v2.0</span>
          </h1>
          <p className="text-gray-400 text-base lg:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
            Turn your academic goals into legendary achievements in the ultimate
            productivity RPG.
          </p>
        </div>

        {/* RIGHT — Login form */}
        <div className="order-1 lg:order-2">
          <div className="backdrop-blur-xl bg-[#14141c]/70 border border-[#2a2a3a] rounded-3xl p-8 lg:p-10 shadow-2xl shadow-black/50">
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-2">
              Welcome back, hero
            </h2>
            <p className="text-gray-400 mb-8">
              Resume your journey through the realms.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase text-gray-300 mb-2">
                  Hero Identity (Email)
                </label>
                <div className="relative">
                  <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="merlin@questify.com"
                    className="w-full bg-[#0f0f17] border border-[#2a2a3a] rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold tracking-widest uppercase text-gray-300">
                    Secret Incantation
                  </label>
                  <a
                    href="#"
                    className="text-sm text-purple-400 hover:text-purple-300 transition"
                  >
                    Forgotten?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#0f0f17] border border-[#2a2a3a] rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="gradient-btn w-full rounded-xl py-4 font-semibold tracking-widest text-sm uppercase flex items-center justify-center gap-2 mt-6"
              >
                Access Granted
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#2a2a3a]" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#14141c] px-4 text-xs font-semibold tracking-widest uppercase text-gray-500">
                  Or connect with
                </span>
              </div>
            </div>

            {/* Social logins */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-3 bg-[#0f0f17] border border-[#2a2a3a] rounded-xl py-3.5 hover:border-purple-500/50 transition">
                <GoogleIcon />
                <span className="text-sm font-semibold tracking-widest uppercase">
                  Google
                </span>
              </button>
              <button className="flex items-center justify-center gap-3 bg-[#0f0f17] border border-[#2a2a3a] rounded-xl py-3.5 hover:border-purple-500/50 transition">
                <GithubIcon />
                <span className="text-sm font-semibold tracking-widest uppercase">
                  Github
                </span>
              </button>
            </div>

            {/* Footer link */}
            <p className="text-center text-sm text-gray-400 mt-7">
              New to this kingdom?{" "}
              <a
                href="#"
                className="text-purple-400 font-semibold hover:text-purple-300 transition"
              >
                Begin your first quest
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path fill="#EA4335" d="M5.27 9.76A7.08 7.08 0 0 1 16.42 6.5l3.43-3.4A12 12 0 0 0 1.32 7.7l3.95 3.04c.94-2.83 3.59-4.97 7-4.97z" />
      <path fill="#34A853" d="M16.04 18.01A7.4 7.4 0 0 1 12 19.05a7.08 7.08 0 0 1-6.72-4.82l-3.95 3.05A12 12 0 0 0 12 24c2.93 0 5.74-1.04 7.85-3l-3.81-2.99z" />
      <path fill="#4A90E2" d="M19.85 21c2.18-2.04 3.59-5.07 3.59-9 0-.71-.11-1.47-.27-2.18H12v4.63h6.42c-.31 1.55-1.16 2.75-2.38 3.55l3.81 3z" />
      <path fill="#FBBC05" d="M5.28 14.23A7.12 7.12 0 0 1 4.93 12c0-.78.13-1.53.35-2.23L1.33 6.73A11.96 11.96 0 0 0 0 12c0 1.93.46 3.75 1.32 5.36l3.96-3.13z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
      <path d="M12 .3a12 12 0 0 0-3.79 23.38c.6.11.82-.26.82-.58v-2.1c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.49.99.11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18a4.65 4.65 0 0 1 1.24 3.22c0 4.61-2.81 5.63-5.48 5.92.42.36.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .3" />
    </svg>
  );
}
