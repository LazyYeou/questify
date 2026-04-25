import React, { useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';

export const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeEstimation, setTimeEstimation] = useState('30');
  const [tagsInput, setTagsInput] = useState('');
  const { addTask } = useTaskStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    
    await addTask({ 
      title, 
      description, 
      timeEstimation: parseInt(timeEstimation) || 0,
      tags 
    });
    
    setTitle('');
    setDescription('');
    setTimeEstimation('30');
    setTagsInput('');
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
      <h2 className="text-md font-bold text-slate-700 mb-4 uppercase tracking-wider">New Quest</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Task Title</label>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Estimated Time (min)</label>
            <input
              type="number"
              placeholder="30"
              value={timeEstimation}
              onChange={(e) => setTimeEstimation(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Tags (comma separated)</label>
            <input
              type="text"
              placeholder="Work, Focus, Urgent"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Description</label>
          <textarea
            placeholder="Details about the quest..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all min-height-[80px]"
          />
        </div>

        <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-sm">
          BEGIN QUEST
        </button>
      </form>
    </div>
  );
};
