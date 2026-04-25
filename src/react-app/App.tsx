import './App.css'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import { UserProfile } from './components/UserProfile'
import { PomodoroTimer } from './components/PomodoroTimer'
import { useTaskStore } from './store/useTaskStore'

function App() {
  const { activeTask } = useTaskStore();

  if (activeTask) {
    return <PomodoroTimer />;
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
            Questify
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-widest">
            Level up your productivity
          </p>
        </header>
        
        <UserProfile />
        
        <main className="space-y-12">
          <section>
            <TaskForm />
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Active Quests</h2>
              <div className="h-[1px] w-full bg-slate-200"></div>
            </div>
            <TaskList />
          </section>
        </main>

        <footer className="mt-20 pt-10 border-t border-slate-200 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
            Built with Hono & React
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App;
