import { useEffect, useState } from "react";
import "./App.css";
import { PomodoroTimer } from "./components/PomodoroTimer";
import { useTaskStore } from "./store/useTaskStore";
import LandingPage from "./pages/LandingPage";
import QuestsPage from "./pages/QuestsPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import DashboardPage from "./pages/DashboardPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ShopPage from "./pages/ShopPage";
import ProfilePage from "./pages/ProfilePage";
import AchievementsPage from "./pages/AchievementsPage";
import LoginPage from "./pages/LoginPage";
import {
  LayoutDashboard, Target, Trophy,
  ShoppingCart, User, Sparkles,
} from "lucide-react";

// Images to cache on load
import userIcon from "./assets/icon/user.png";
import confuseMascot from "./assets/mascot/confuse.png";
import goMascot from "./assets/mascot/go.png";
import happyMascot from "./assets/mascot/happy.png";
import leaderboardMascot from "./assets/mascot/leaderboard.png";
import levelupMascot from "./assets/mascot/levelup.png";
import sadMascot from "./assets/mascot/sad.png";

const PRELOAD_IMAGES = [
  userIcon,
  confuseMascot,
  goMascot,
  happyMascot,
  leaderboardMascot,
  levelupMascot,
  sadMascot,
];

function App() {
  const {
    activeTask, isModalOpen, currentPage,
    setCurrentPage, fetchUser, fetchTasks,
  } = useTaskStore();

  useEffect(() => {
    fetchUser().then(() => {
      const state = useTaskStore.getState();
      if (state.user) {
        if (state.currentPage === "login") {
          setCurrentPage("dashboard");
        }
        fetchTasks();
      }
    });

    // Cache/preload images
    PRELOAD_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [fetchUser, fetchTasks, setCurrentPage]);

  if (activeTask) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1"><PomodoroTimer /></div>
      </div>
    );
  }

  // Landing page — no nav bar
  if (currentPage === "landing") {
    return <LandingPage onStart={() => setCurrentPage("dashboard")} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case "login":        return <LoginPage />;
      case "dashboard":    return <DashboardPage />;
      case "quests":       return <QuestsPage />;
      case "leaderboard":  return <LeaderboardPage />;
      case "shop":         return <ShopPage />;
      case "profile":      return <ProfilePage />;
      case "create-task":  return <CreateTaskPage />;
      case "achievements": return <AchievementsPage />;
      default:             return <LoginPage />;
    }
  };

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 bg-[#F8F9FF] relative">
      {(currentPage === "create-task" || currentPage === "achievements") && (
        <button
          onClick={() => {
            const { setEditingTask } = useTaskStore.getState();
            setEditingTask(null);
            setCurrentPage(
              currentPage === "achievements" ? "profile" : "dashboard",
            );
          }}
          className="fixed top-6 left-6 z-50 bg-white text-[#7B7F97] hover:text-[#5B4DDB] px-5 py-2.5 rounded-2xl shadow-sm border border-slate-100 transition-all text-[10px] font-black uppercase tracking-widest hover:scale-[1.05] active:scale-[0.95]"
        >
          ← {currentPage === "achievements" ? "Profile" : "Dashboard"}
        </button>
      )}

      <div className="max-w-6xl mx-auto pb-24">{renderPage()}</div>

      {/* Global Bottom Navigation */}
      {currentPage !== "create-task" &&
        currentPage !== "achievements" &&
        currentPage !== "login" &&
        !isModalOpen && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-lg px-2 z-50">
            <div className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] px-6 py-4 flex items-center justify-around border border-white/50 backdrop-blur-xl">
              <BottomItem
                active={currentPage === "dashboard"}
                icon={<LayoutDashboard className="w-6 h-6" />}
                label="Home"
                onClick={() => setCurrentPage("dashboard")}
              />
              <BottomItem
                active={currentPage === "quests"}
                icon={<Target className="w-6 h-6" />}
                label="Quests"
                onClick={() => setCurrentPage("quests")}
              />
              <BottomItem
                active={currentPage === "leaderboard"}
                icon={<Trophy className="w-6 h-6" />}
                label="Ranks"
                onClick={() => setCurrentPage("leaderboard")}
              />
              <BottomItem
                active={currentPage === "shop"}
                icon={<ShoppingCart className="w-6 h-6" />}
                label="Shop"
                onClick={() => setCurrentPage("shop")}
              />
              <BottomItem
                active={currentPage === "profile"}
                icon={<User className="w-6 h-6" />}
                label="Profile"
                onClick={() => setCurrentPage("profile")}
              />
            </div>
          </div>
        )}

      {/* Global Toast Notification */}
      <Toast />

      {/* First-time Login Name Setup */}
      <UsernameModal />
    </div>
  );
}

function UsernameModal() {
  const user = useTaskStore((state) => state.user);
  const updateUser = useTaskStore((state) => state.updateUser);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!user || user.name) return null;

  const AVATARS = ["🦊", "🦁", "🐯", "🐱", "🐶", "🐻", "🐨", "🐼", "🐸", "🐷", "🐵", "🦄"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsLoading(true);
    await updateUser(name.trim(), avatar);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#111827]/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[32px] border-[4px] border-slate-100 shadow-[0_12px_0_#f1f5f9] p-6 sm:p-8 w-full max-w-md animate-in zoom-in-95 duration-300">
        <h2 className="text-2xl sm:text-3xl font-black text-[#111827] uppercase tracking-tighter italic mb-2">Welcome Hero!</h2>
        <p className="text-[#7B7F97] font-bold text-xs sm:text-sm mb-6">Choose your identity for your quests</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-[#7B7F97] uppercase tracking-[0.2em] ml-2">Choose Avatar</label>
            <div className="grid grid-cols-6 gap-2 bg-[#F8F9FF] p-3 rounded-[24px] border-[3px] border-slate-100">
              <button
                type="button"
                onClick={() => setAvatar(null)}
                className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${
                  avatar === null
                    ? "bg-white border-[2px] border-[#5B4DDB] shadow-sm scale-110 text-[#5B4DDB]"
                    : "bg-slate-50 text-slate-300 hover:bg-white"
                }`}
              >
                <User size={18} strokeWidth={3} />
              </button>
              {AVATARS.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAvatar(a)}
                  className={`w-9 h-9 flex items-center justify-center text-xl rounded-xl transition-all ${
                    avatar === a
                      ? "bg-white border-[2px] border-[#5B4DDB] shadow-sm scale-110"
                      : "hover:bg-white"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-[#7B7F97] uppercase tracking-[0.2em] ml-2">Hero Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your hero name..."
              className="w-full bg-[#F8F9FF] border-[3px] border-slate-100 rounded-[20px] px-4 py-4 font-bold text-[#111827] focus:outline-none focus:border-[#5B4DDB] transition-colors"
              maxLength={20}
              required
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !name.trim()}
            className="w-full bg-[#5B4DDB] text-white px-6 py-4 rounded-[20px] font-black text-sm uppercase tracking-widest border-[3px] border-[#4539a5] shadow-[0_4px_0_#3730a3] hover:translate-y-0.5 hover:shadow-[0_2px_0_#3730a3] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:transform-none disabled:shadow-[0_4px_0_#3730a3]"
          >
            {isLoading ? "Saving..." : "Start Adventure"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Toast() {
  const toast = useTaskStore((state) => state.toast);
  if (!toast) return null;

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-top-4 duration-300">
      <div
        className={`px-6 py-3 rounded-2xl shadow-xl border-2 flex items-center gap-3 backdrop-blur-md ${
          toast.type === "success"
            ? "bg-white/90 border-[#5B4DDB]/20 text-[#5B4DDB]"
            : toast.type === "error"
              ? "bg-white/90 border-rose-100 text-rose-500"
              : "bg-white/90 border-slate-100 text-slate-600"
        }`}
      >
        {toast.type === "success" && (
          <Sparkles size={18} className="animate-pulse" />
        )}
        <span className="font-black text-xs uppercase tracking-widest">
          {toast.message}
        </span>
      </div>
    </div>
  );
}

function BottomItem({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 group transition-all"
    >
      <div
        className={`transition-all duration-300 p-2 rounded-2xl ${
          active
            ? "text-[#5B4DDB] bg-[#F1EEFF] scale-110"
            : "text-[#7B7F97] group-hover:text-[#5B4DDB] group-hover:bg-[#F1EEFF]/50"
        }`}
      >
        {icon}
      </div>
      <span
        className={`text-[10px] font-black uppercase tracking-tighter transition-colors ${
          active ? "text-[#5B4DDB]" : "text-[#7B7F97]"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

export default App;