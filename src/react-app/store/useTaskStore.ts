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

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly';
  goalType: 'tasks' | 'minutes';
  goalValue: number;
  currentProgress: number;
  rewardExp: number;
  rewardCoins: number;
  icon: string;
  isCompleted: boolean;
  isClaimed: boolean;
}

export type Page =
  | "login"
  | "landing"
  | "dashboard"
  | "quests"
  | "leaderboard"
  | "shop"
  | "profile"
  | "create-task"
  | "achievements";


interface TaskState {
  tasks: Task[];
  tags: Tag[];
  quests: Quest[];
  user: User | null;
  activeTask: Task | null;
  editingTask: Task | null;
  currentPage: Page;
  isModalOpen: boolean;
  isLoading: boolean;
  error: string | null;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  
  fetchUser: () => Promise<void>;
  updateUser: (name: string, avatarUrl?: string | null) => Promise<void>;
  logout: () => Promise<void>;
  fetchTasks: () => Promise<void>;
  fetchTags: () => Promise<void>;
  fetchQuests: () => Promise<void>;
  claimQuestReward: (id: string) => Promise<void>;
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
  quests: [],
  user: null,
  activeTask: null,
  editingTask: null,
  currentPage: "landing",
  isModalOpen: false,
  isLoading: false,
  error: null,
  toast: null,

  fetchUser: async () => {
  try {
    const response = await fetch('/api/users/me');
    if (!response.ok) {
      set({ user: null });  // ← hapus currentPage dari sini
      return;
    }
    const data = await response.json();
    if (data) {
      set({ user: data }); // ← hapus currentPage dari sini
    } else {
      set({ user: null });
    }
    } catch (error: unknown) {
      set({ error: (error as Error).message, user: null });
    }
  },

  updateUser: async (name: string, avatarUrl?: string | null) => {
    try {
      const response = await fetch('/api/users/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, avatarUrl }),
      });
      if (!response.ok) throw new Error('Failed to update user');
      const data = await response.json();
      set({ user: data });
    } catch (error: unknown) {
      set({ error: (error as Error).message });
    }
  },

  logout: async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      set({ user: null, currentPage: "login", tasks: [], tags: [], quests: [] });
    } catch (error: unknown) {
      set({ error: (error as Error).message });
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
    } catch (error: unknown) {
      set({ error: (error as Error).message });
    }
  },

  fetchQuests: async () => {
    try {
      const response = await fetch('/api/quests');
      if (!response.ok) throw new Error('Failed to fetch quests');
      const data = await response.json();
      set({ quests: data });
    } catch (error: unknown) {
      set({ error: (error as Error).message });
    }
  },

  claimQuestReward: async (id: string) => {
    try {
      const response = await fetch(`/api/quests/${id}/claim`, { method: 'POST' });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to claim reward');
      }
      const data = await response.json();
      if (data.user) {
        set({ user: data.user });
      }
      // Re-fetch quests to update isClaimed status
      await get().fetchQuests();
      get().showToast('Reward claimed! +EXP +Coins', 'success');
    } catch (error: any) {
      get().showToast(error.message, 'error');
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
    } catch (error: unknown) {
      set({ error: (error as Error).message });
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
