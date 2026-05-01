import React, { useEffect, useState } from 'react';
import { ClipboardList, Sparkles, Target } from 'lucide-react';
import { useTaskStore } from '../store/useTaskStore';

// --- Sub-components styled to match Dashboard ---

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  id: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  id,
}) => (
  <div className="flex flex-col space-y-2">
    <label htmlFor={id} className="text-[#5B4DDB] font-extrabold text-sm sm:text-base tracking-wide uppercase px-1">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-[#F1EEFF] text-[#111827] border-2 border-transparent focus:border-[#5B4DDB]/20 focus:bg-white rounded-[20px] px-5 py-4 focus:outline-none transition-all duration-200 font-bold placeholder:text-[#7B7F97]/50"
    />
  </div>
);

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  id: string;
  rows?: number;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  id,
  rows = 4,
}) => (
  <div className="flex flex-col space-y-2">
    <label htmlFor={id} className="text-[#5B4DDB] font-extrabold text-sm sm:text-base tracking-wide uppercase px-1">
      {label}
    </label>
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-[#F1EEFF] text-[#111827] border-2 border-transparent focus:border-[#5B4DDB]/20 focus:bg-white rounded-[24px] px-5 py-4 focus:outline-none transition-all duration-200 font-bold placeholder:text-[#7B7F97]/50 resize-none"
    />
  </div>
);

const SubmitButton: React.FC<{ label: string }> = ({ label }) => (
  <button
    type="submit"
    className="w-full bg-gradient-to-r from-[#5B4DDB] to-[#7C6CFF] text-white font-extrabold text-xl py-5 rounded-[28px] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 mt-6 shadow-[0_10px_25px_rgba(91,77,219,0.3)] flex items-center justify-center gap-3"
  >
    <Target className="w-6 h-6" />
    {label}
  </button>
);

const IconHeader: React.FC = () => (
  <div className="flex justify-center mb-8 relative">
    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D7CCFF] to-[#C7B9FF] flex items-center justify-center shadow-inner border-[8px] border-white overflow-hidden shrink-0">
      <ClipboardList className="w-10 h-10 text-[#5B4DDB]" />
    </div>
    <Sparkles className="absolute -top-2 right-1/3 text-[#FFC84D] animate-pulse" size={24} />
    <Sparkles className="absolute bottom-0 left-1/3 text-[#A68BFF]" size={20} />
  </div>
);

const TaskFormCard: React.FC = () => {
  const { addTask, updateTask, editingTask, setEditingTask, setCurrentPage, showToast } = useTaskStore();
  
  const [title, setTitle] = useState(editingTask?.title || '');
  const [description, setDescription] = useState(editingTask?.description || '');
  const [tag, setTag] = useState(editingTask?.tags?.[0]?.name || '');
  const [timeEstimation, setTimeEstimation] = useState(editingTask?.timeEstimation?.toString() || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingTask) {
      await updateTask(editingTask.id, {
        title,
        description,
        timeEstimation: parseInt(timeEstimation) || 0,
      });
      setEditingTask(null);
      showToast('Quest Updated!');
    } else {
      await addTask({
        title,
        description,
        timeEstimation: parseInt(timeEstimation) || 0,
        tags: tag ? [tag] : [],
      });
      showToast('Quest Accepted!');
    }

    setCurrentPage('dashboard');
  };

  return (
    <div className="w-full max-w-lg">
      <IconHeader />
      <div className="bg-white rounded-[40px] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F1EEFF] rounded-full -mr-16 -mt-16 opacity-50" />
        
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <InputField
            id="title"
            label="Quest Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What is your mission?"
          />
          <TextAreaField
            id="description"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add some details about this quest..."
          />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              id="tag"
              label="Tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="e.g. Code"
            />
            <InputField
              id="time"
              label="Time (min)"
              value={timeEstimation}
              onChange={(e) => setTimeEstimation(e.target.value)}
              placeholder="30"
              type="number"
            />
          </div>
          <div className="pt-4">
            <SubmitButton label={editingTask ? "UPDATE QUEST" : "START QUEST"} />
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Main Page Component ---

const CreateTaskPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#F8F9FF] flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Background blobs like Dashboard */}
      <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-gradient-to-br from-[#D7CCFF] to-transparent rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-gradient-to-tl from-[#B8F0F0] to-transparent rounded-full blur-3xl opacity-40" />

      <div 
        className={`w-full flex flex-col items-center transition-all duration-700 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <TaskFormCard />
        
        {/* Mascot decoration */}
        <div className="mt-8 text-6xl opacity-20 pointer-events-none">🦊</div>
      </div>
    </div>
  );
};

export default CreateTaskPage;
