import React, { useEffect } from 'react';
import { useTaskStore } from '../store/useTaskStore';

export const UserProfile: React.FC = () => {
  const { user, fetchUser } = useTaskStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (!user) return null;

  const expToNextLevel = 100;
  const progress = (user.experience % expToNextLevel);

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">{user.name || 'User'}</h3>
          <p className="text-sm text-slate-500">Total EXP: {user.experience}</p>
        </div>
        <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-sm">
          Level {user.level}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium text-slate-600">
          <span>Progress to Level {user.level + 1}</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <div 
            className="h-full bg-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
