import { useState, useMemo, useEffect } from "react";
import { useTaskStore, Task } from "../store/useTaskStore";
import { FilterTag, SortOption } from "../components/dashboard/FilterModal";

export function useDashboardState() {
  const {
    tasks,
    fetchTasks,
    isLoading,
    setActiveTask,
    user,
    fetchUser,
    setIsModalOpen: setGlobalModalOpen,
    setCurrentPage,
    setEditingTask,
    deleteTask,
    showToast
  } = useTaskStore();

  const [activeFilter, setActiveFilter] = useState<FilterTag>("all");
  const [activeSort, setActiveSort] = useState<SortOption>("none");

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [pendingFilter, setPendingFilter] = useState<FilterTag>('all');
  const [pendingSort, setPendingSort] = useState<SortOption>('none');

  const [pendingTask, setPendingTask] = useState<Task | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [deletingTask, setDeletingTaskState] = useState<Task | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
    fetchUser();
  }, [fetchTasks, fetchUser]);

  const openFilterMenu = () => {
    setPendingFilter(activeFilter);
    setPendingSort(activeSort);
    setIsFilterMenuOpen(true);
  };

  const applyFilters = () => {
    setActiveFilter(pendingFilter);
    setActiveSort(pendingSort);
    setIsFilterMenuOpen(false);
  };

  const handleTaskClick = (task: Task) => {
    setPendingTask(task);
    setIsConfirmOpen(true);
    setIsFilterMenuOpen(false);
    setGlobalModalOpen(true);
  };

  const confirmStartTask = () => {
    if (pendingTask) {
      setActiveTask(pendingTask);
      setGlobalModalOpen(false);
      setIsConfirmOpen(false);
    }
  };

  const cancelStartTask = () => {
    setPendingTask(null);
    setIsConfirmOpen(false);
    setGlobalModalOpen(false);
  };

  const handleDeleteClick = (task: Task) => {
    setDeletingTaskState(task);
    setIsDeleteModalOpen(true);
    setGlobalModalOpen(true);
  };

  const confirmDeleteTask = async () => {
    if (deletingTask) {
      await deleteTask(deletingTask.id);
      showToast('Quest Abandoned!', 'info');
      cancelDeleteTask();
    }
  };

  const cancelDeleteTask = () => {
    setDeletingTaskState(null);
    setIsDeleteModalOpen(false);
    setGlobalModalOpen(false);
  };

  const processedTasks = useMemo(() => {
    let result = tasks.filter(task => task.status !== 'completed');

    if (activeFilter !== "all") {
      result = result.filter((task) =>
        task.tags?.some((tag) => tag.name.toLowerCase().includes(activeFilter)),
      );
    }

    if (activeSort === "deadline") {
      result.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    } else if (activeSort === "duration") {
      result.sort((a, b) => (b.timeEstimation || 0) - (a.timeEstimation || 0));
    }

    return result;
  }, [tasks, activeFilter, activeSort]);

  return {
    user,
    tasks: processedTasks,
    isLoading,
    activeFilter,
    activeSort,
    isFilterMenuOpen,
    setIsFilterMenuOpen,
    pendingFilter,
    setPendingFilter,
    pendingSort,
    setPendingSort,
    isConfirmOpen,
    pendingTask,
    isDeleteModalOpen,
    deletingTask,
    openFilterMenu,
    applyFilters,
    handleTaskClick,
    confirmStartTask,
    cancelStartTask,
    handleDeleteClick,
    confirmDeleteTask,
    cancelDeleteTask,
    setCurrentPage,
    setEditingTask,
    setActiveFilter,
    setActiveSort
  };
}
