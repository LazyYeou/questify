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
import { 
  LayoutDashboard, 
  Target, 
  Trophy, 
  ShoppingCart, 
  User 
} from "lucide-react";

type Page = 'dashboard' | 'quests' | 'leaderboard' | 'shop' | 'profile' | 'create-task';

function App() {
  const { activeTask, clearActiveTask, fetchUser, fetchTasks } = useTaskStore();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  useEffect(() => {
    fetchUser();
    fetchTasks();
  }, [fetchUser, fetchTasks]);

  if (activeTask) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="p-4 bg-gray-900 text-white z-[60]">
          <button 
            onClick={() => clearActiveTask()} 
            className="text-sm font-bold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
          >
            ← Cancel Quest
          </button>
        </div>
        <div className="flex-1">
          <PomodoroTimer />
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <DashboardPage />;
      case 'quests': return <QuestsPage />;
      case 'leaderboard': return <LeaderboardPage />;
      case 'shop': return <ShopPage />;
      case 'profile': return <ProfilePage />;
      case 'create-task': return <CreateTaskPage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 bg-[#F8F9FF] relative">
      {/* Dynamic Back Button for Create Task */}
      {currentPage === 'create-task' && (
        <button 
          onClick={() => setCurrentPage('quests')}
          className="fixed top-6 left-6 z-50 text-gray-500 hover:text-[#5B4DDB] transition-colors text-sm font-black uppercase tracking-widest"
        >
          ← Back to Quests
        </button>
      )}

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto pb-24">
        {currentPage === 'quests' && (
          <div className="flex justify-end mb-8">
            <button 
              onClick={() => setCurrentPage('create-task')}
              className="bg-[#5B4DDB] text-white px-8 py-3 rounded-full font-bold shadow-[0_10px_20px_rgba(91,77,219,0.3)] hover:bg-[#4a3cb5] hover:scale-105 transition-all duration-200"
            >
              + New Quest
            </button>
          </div>
        )}
        
        {renderPage()}
      </div>

      {/* Global Bottom Navigation */}
      {currentPage !== 'create-task' && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 z-50">
          <div className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] px-6 py-4 flex items-center justify-around border border-white/50 backdrop-blur-xl">
            <BottomItem 
              active={currentPage === 'dashboard'} 
              icon={<LayoutDashboard className="w-6 h-6" />} 
              label="Home" 
              onClick={() => setCurrentPage('dashboard')} 
            />
            <BottomItem 
              active={currentPage === 'quests'} 
              icon={<Target className="w-6 h-6" />} 
              label="Quests" 
              onClick={() => setCurrentPage('quests')} 
            />
            <BottomItem 
              active={currentPage === 'leaderboard'} 
              icon={<Trophy className="w-6 h-6" />} 
              label="Ranks" 
              onClick={() => setCurrentPage('leaderboard')} 
            />
            <BottomItem 
              active={currentPage === 'shop'} 
              icon={<ShoppingCart className="w-6 h-6" />} 
              label="Shop" 
              onClick={() => setCurrentPage('shop')} 
            />
            <BottomItem 
              active={currentPage === 'profile'} 
              icon={<User className="w-6 h-6" />} 
              label="Profile" 
              onClick={() => setCurrentPage('profile')} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

function BottomItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center gap-1 group transition-all"
    >
      <div className={`transition-all duration-300 p-2 rounded-2xl ${
        active ? "text-[#5B4DDB] bg-[#F1EEFF] scale-110" : "text-[#7B7F97] group-hover:text-[#5B4DDB] group-hover:bg-[#F1EEFF]/50"
      }`}>
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
