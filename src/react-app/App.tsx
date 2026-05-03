import { useState, useEffect } from "react";
import "./App.css";
import { PomodoroTimer } from "./components/PomodoroTimer";
import { useTaskStore } from "./store/useTaskStore";
import QuestsPage from "./pages/QuestsPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import DashboardPage from "./pages/DashboardPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ShopPage from "./pages/ShopPage";
import ProfilePage from "./pages/ProfilePage";
import AchievementsPage from "./pages/AchievementsPage";
import {
  LayoutDashboard,
  Target,
  Trophy,
  ShoppingCart,
  User,
  Sparkles,
} from "lucide-react";

type Page =
  | "dashboard"
  | "quests"
  | "leaderboard"
  | "shop"
  | "profile"
  | "create-task"
  | "achievements";

function App() {
  const {
    activeTask,
    isModalOpen,
    currentPage,
    setCurrentPage,
    fetchUser,
    fetchTasks,
  } = useTaskStore();

  useEffect(() => {
    fetchUser();
    fetchTasks();
  }, [fetchUser, fetchTasks]);

  if (activeTask) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <PomodoroTimer />
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage />;
      case "quests":
        return <QuestsPage />;
      case "leaderboard":
        return <LeaderboardPage />;
      case "shop":
        return <ShopPage />;
      case "profile":
        return <ProfilePage />;
      case "create-task":
        return <CreateTaskPage />;
      case "achievements":
        return <AchievementsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 bg-[#F8F9FF] relative">
      {/* Dynamic Back Button for Create Task and Achievements */}
      {(currentPage === "create-task" || currentPage === "achievements") && (
        <button
          onClick={() => {
            const { setEditingTask } = useTaskStore.getState();
            setEditingTask(null);
            setCurrentPage(currentPage === "achievements" ? "profile" : "dashboard");
          }}
          className="fixed top-6 left-6 z-50 bg-white text-[#7B7F97] hover:text-[#5B4DDB] px-5 py-2.5 rounded-2xl shadow-sm border border-slate-100 transition-all text-[10px] font-black uppercase tracking-widest hover:scale-[1.05] active:scale-[0.95]"
        >
          ← {currentPage === "achievements" ? "Profile" : "Dashboard"}
        </button>
      )}

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto pb-24">{renderPage()}</div>

      {/* Global Bottom Navigation */}
      {currentPage !== "create-task" && currentPage !== "achievements" && !isModalOpen && (
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
