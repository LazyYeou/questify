import React, { useEffect, useState, useMemo } from "react";
import { Target } from "lucide-react";
import { useTaskStore } from "../store/useTaskStore";

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
  type = "text",
  id,
}) => (
  <div className="flex flex-col space-y-1.5">
    <label
      htmlFor={id}
      className="text-[#7B7F97] font-black text-[9px] sm:text-[10px] tracking-[0.2em] uppercase px-1"
    >
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-slate-50 text-[#111827] text-sm border-[3px] border-slate-100 focus:border-[#5B4DDB]/20 focus:bg-white rounded-[18px] px-4 py-3.5 focus:outline-none transition-all duration-200 font-bold placeholder:text-[#7B7F97]/30 shadow-inner"
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
  rows = 3,
}) => (
  <div className="flex flex-col space-y-1.5">
    <label
      htmlFor={id}
      className="text-[#7B7F97] font-black text-[9px] sm:text-[10px] tracking-[0.2em] uppercase px-1"
    >
      {label}
    </label>
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-slate-50 text-[#111827] text-sm border-[3px] border-slate-100 focus:border-[#5B4DDB]/20 focus:bg-white rounded-[20px] px-4 py-3.5 focus:outline-none transition-all duration-200 font-bold placeholder:text-[#7B7F97]/30 resize-none shadow-inner"
    />
  </div>
);

const SubmitButton: React.FC<{ label: string }> = ({ label }) => (
  <button
    type="submit"
    className="w-full bg-[#5B4DDB] text-white font-black text-lg py-4 rounded-[28px] border-[4px] border-[#4539a5] shadow-[0_6px_0_#3730a3] hover:translate-y-0.5 hover:shadow-[0_3px_0_#3730a3] active:translate-y-1 active:shadow-none transition-all mt-4 flex items-center justify-center gap-3 uppercase tracking-tighter italic"
  >
    <Target className="w-6 h-6" strokeWidth={3} />
    {label}
  </button>
);

const IconHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex justify-center mb-8 w-full max-w-2xl">
    <div className="w-full bg-[#5B4DDB] text-white px-8 py-5 sm:py-7 rounded-[28px] border-[4px] border-[#4539a5] shadow-[0_8px_0_#3730a3] text-center">
      <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter italic leading-none">
        {title}
      </h2>
    </div>
  </div>
);

const TaskFormCard: React.FC = () => {
  const {
    addTask,
    updateTask,
    editingTask,
    setEditingTask,
    setCurrentPage,
    showToast,
    tags,
    fetchTags,
    tasks,
    fetchTasks,
  } = useTaskStore();

  const [title, setTitle] = useState(editingTask?.title || "");
  const [description, setDescription] = useState(
    editingTask?.description || "",
  );
  const [tag, setTag] = useState(editingTask?.tags?.[0]?.name || "");
  const [timeEstimation, setTimeEstimation] = useState(
    editingTask?.timeEstimation?.toString() || "",
  );
  const [dueDate, setDueDate] = useState(
    editingTask?.dueDate
      ? new Date(editingTask.dueDate).toISOString().split("T")[0]
      : "",
  );

  useEffect(() => {
    fetchTags();
    fetchTasks();
  }, [fetchTags, fetchTasks]);

  const availableTags = useMemo(() => {
    const activeTagNames = new Set(
      tasks
        .filter((t) => t.status !== "completed")
        .flatMap((t) => t.tags?.map((tag) => tag.name.toLowerCase()) || []),
    );
    return tags.filter(
      (t) =>
        activeTagNames.has(t.name.toLowerCase()) &&
        !["completed", "amb"].includes(t.name.toLowerCase()),
    );
  }, [tasks, tags]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskData = {
      title,
      description,
      timeEstimation: parseInt(timeEstimation) || 0,
      tags: tag ? [tag.toUpperCase()] : [],
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    };

    if (editingTask) {
      await updateTask(editingTask.id, taskData as any);
      setEditingTask(null);
      showToast("Quest Updated!");
    } else {
      await addTask(taskData);
      showToast("Quest Accepted!");
    }

    setCurrentPage("dashboard");
  };

  return (
    <div className="w-full max-w-2xl flex flex-col items-center">
      <IconHeader title={editingTask ? "Edit Task" : "New Task"} />

      <div className="w-full bg-white rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 border-[3px] sm:border-4 border-slate-100 shadow-[0_8px_0_#f1f5f9] relative overflow-hidden">
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <InputField
            id="title"
            label="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What is your Task?"
          />
          <TextAreaField
            id="description"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add some details about this quest..."
          />

          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-3">
                <InputField
                  id="tag"
                  label="Task Tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value.toUpperCase())}
                  placeholder="Tag Name"
                />

                {/* Tag Selection Chips moved below input */}
                {availableTags.length > 0 && (
                  <div className="flex flex-col space-y-2">
                    <span className="text-[9px] font-black text-[#7B7F97] uppercase tracking-widest px-1 mb-2 opacity-60">
                      Select from active tags
                    </span>
                    <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto no-scrollbar p-0.5">
                      {availableTags.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTag(t.name.toUpperCase())}
                          className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border-2 ${
                            tag.toUpperCase() === t.name.toUpperCase()
                              ? "bg-[#5B4DDB] text-white border-[#5B4DDB] shadow-[0_2px_0_#3730a3]"
                              : "bg-slate-50 text-[#7B7F97] border-slate-100 hover:border-[#5B4DDB]/20"
                          }`}
                        >
                          {t.name.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <InputField
                id="time"
                label="Time (minutes)"
                value={timeEstimation}
                onChange={(e) => setTimeEstimation(e.target.value)}
                placeholder="30"
                type="number"
              />
            </div>

            <InputField
              id="deadline"
              label="Deadline"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              type="date"
            />
          </div>

          <div className="pt-4">
            <SubmitButton label={editingTask ? "UPDATE TASK" : "CREATE TASK"} />
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
    <div className="min-h-screen w-full bg-[#F8F9FF] flex items-center justify-center p-2 font-sans relative overflow-hidden">
      {/* Background blobs like Dashboard */}
      <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-gradient-to-br from-[#D7CCFF] to-transparent rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-gradient-to-tl from-[#B8F0F0] to-transparent rounded-full blur-3xl opacity-40" />

      <div
        className={`w-full flex flex-col items-center transition-all duration-700 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <TaskFormCard />
      </div>
    </div>
  );
};

export default CreateTaskPage;
