import { useState } from "react";
import "./App.css";
import { PomodoroTimer } from "./components/PomodoroTimer";
import { useTaskStore } from "./store/useTaskStore";
import Dashboard from "./pages/Dashboard";
import CreateTaskPage from "./pages/CreateTaskPage";

function App() {
  const { activeTask, clearActiveTask } = useTaskStore();
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'create-task'>('dashboard');

  if (activeTask) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="p-4 bg-gray-900 text-white">
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

  if (currentPage === 'create-task') {
    return (
      <div className="relative">
        <button 
          onClick={() => setCurrentPage('dashboard')}
          className="fixed top-6 left-6 z-50 text-gray-500 hover:text-white transition-colors text-sm font-medium"
        >
          ← Back to Dashboard
        </button>
        <CreateTaskPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto flex justify-end mb-8">
        <button 
          onClick={() => setCurrentPage('create-task')}
          className="bg-[#5B4DDB] text-white px-8 py-3 rounded-full font-bold shadow-[0_10px_20px_rgba(91,77,219,0.3)] hover:bg-[#4a3cb5] hover:scale-105 transition-all duration-200"
        >
          + New Quest
        </button>
      </div>
      <Dashboard />
    </div>
  );
}

export default App;
