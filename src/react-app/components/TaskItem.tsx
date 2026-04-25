import React from 'react';
import { Task, useTaskStore } from '../store/useTaskStore';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { deleteTask, setActiveTask } = useTaskStore();

  const expReward = (task.timeEstimation || 0) * 2;

  return (
    <div className={`p-5 rounded-xl border transition-all duration-200 ${
      task.status === 'completed' 
        ? 'bg-slate-50 border-slate-200 opacity-75' 
        : 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {task.status !== 'completed' && (
          <button 
            onClick={() => setActiveTask(task)}
            className="w-full sm:w-auto px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm tracking-widest"
          >
            START
          </button>
        )}
        
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className={`font-bold text-lg ${
              task.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-800'
            }`}>
              {task.title}
            </h3>
            <div className="flex items-center gap-2">
              {task.timeEstimation > 0 && (
                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase">
                  {task.timeEstimation} min
                </span>
              )}
              {task.status !== 'completed' && expReward > 0 && (
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter">
                  +{expReward} EXP
                </span>
              )}
            </div>
          </div>
          
          {task.description && (
            <p className={`text-sm leading-relaxed ${
              task.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-600'
            }`}>
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap gap-1.5 pt-1">
            {task.tags?.map((tag) => (
              <span key={tag.id} className="text-[10px] font-bold px-2 py-0.5 rounded-md border" style={{
                backgroundColor: tag.color + '10',
                color: tag.color,
                borderColor: tag.color + '30'
              }}>
                {tag.name.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        <button 
          onClick={() => deleteTask(task.id)}
          className="text-slate-300 hover:text-rose-500 transition-colors p-1"
          title="Delete task"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};
