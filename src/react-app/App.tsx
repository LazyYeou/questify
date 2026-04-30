import "./App.css";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { UserProfile } from "./components/UserProfile";
import { PomodoroTimer } from "./components/PomodoroTimer";
import { useTaskStore } from "./store/useTaskStore";
import Dashboard from "./pages/Dashboard";

function App() {
  const { activeTask } = useTaskStore();

  if (activeTask) {
    return <PomodoroTimer />;
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <Dashboard />
    </div>
  );
}

export default App;
