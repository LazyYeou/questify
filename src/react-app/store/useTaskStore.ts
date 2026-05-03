import { create } from 'zustand';

export interface Task {
  id: number;
  userId: number;
  title: string;
  description: string | null;
  status: 'pending' | 'in-progress' | 'completed';
  timeEstimation: number;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  tags?: Tag[];
  icon?: string;
}

export interface Tag {
  id: number;
  userId: number;
  name: string;
  color: string;
}

export interface User {
  id: number;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  experience: number;
  level: number;
  streak: number;
  longestStreak: number;
  coins: number;
  lastStreakAt: string | null;
}

export type Page =
  | "dashboard"
  | "quests"
  | "leaderboard"
  | "shop"
  | "profile"
  | "create-task";

interface TaskState {
  tasks: Task[];
  tags: Tag[];
  user: User | null;
  activeTask: Task | null;
  editingTask: Task | null;
  currentPage: Page;
  isModalOpen: boolean;
  isLoading: boolean;
  error: string | null;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  
  fetchUser: () => Promise<void>;
  fetchTasks: () => Promise<void>;
  fetchTags: () => Promise<void>;
  addTask: (task: { title: string; description?: string; timeEstimation?: number; tags?: string[]; dueDate?: string | null }) => Promise<void>;
  updateTask: (id: number, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  setActiveTask: (task: Task) => void;
  clearActiveTask: () => void;
  setEditingTask: (task: Task | null) => void;
  setCurrentPage: (page: Page) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  tags: [],
  user: null,
  activeTask: null,
  editingTask: null,
  currentPage: "dashboard",
  isModalOpen: false,
  isLoading: false,
  error: null,
  toast: null,

  fetchUser: async () => {
    try {
      const response = await fetch('/api/users/me');
      if (!response.ok) throw new Error('Failed to fetch user');
      const data = await response.json();
      set({ user: data });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  fetchTasks: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      set({ tasks: data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchTags: async () => {
    try {
      const response = await fetch('/api/tags');
      if (!response.ok) throw new Error('Failed to fetch tags');
      const data = await response.json();
      set({ tags: data });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  addTask: async (taskData) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) throw new Error('Failed to add task');
      // Re-fetch tasks to get updated list with tags linked correctly
      await get().fetchTasks();
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  updateTask: async (id, updates) => {
    const previousTasks = get().tasks;
    // Simple optimistic update for status
    if (updates.status) {
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      }));
    }

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error('Failed to update task');
      const { task, user } = await response.json();
      
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...task } : t)),
        user: user || state.user, // Update user EXP/Level if provided
      }));
    } catch (error: any) {
      set({ tasks: previousTasks, error: error.message });
    }
  },

  deleteTask: async (id) => {
    const previousTasks = get().tasks;
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    }));

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete task');
    } catch (error: any) {
      set({ tasks: previousTasks, error: error.message });
    }
  },

  setActiveTask: (task) => set({ activeTask: task }),
  clearActiveTask: () => set({ activeTask: null }),
  setEditingTask: (task) => set({ editingTask: task }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  showToast: (message, type = 'success') => {
    set({ toast: { message, type } });
    setTimeout(() => {
      set({ toast: null });
    }, 3000);
  },
}));
