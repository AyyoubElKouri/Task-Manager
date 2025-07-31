import { create } from "zustand";
import type { Task } from "../types/entities.types";

/**
 * TaskStore interface defining the shape of our task management store
 */
interface TaskStore {
    tasks: Task[]; // Array of all tasks
    createTask: (task: Task) => void; // Creates a new task
    updateTask: (task: Task) => void; // Updates an existing task
    deleteTask: (taskId: number) => void; // Deletes a task by ID
    getAllTasks: () => Task[]; // Returns all tasks
    toggleTaskStatus: (taskId: number) => void; // Toggles task completion status
    deleteAllTasks: () => void; // Deletes all tasks
}

/**
 * Zustand store for managing task state globally across the application
 *
 * This store provides CRUD operations for tasks and maintains the entire
 * task list in memory. All components can access and modify task data
 * through this centralized store.
 */
export const useTaskStore = create<TaskStore>((set, get) => ({
    // Initial state: empty task array
    tasks: [],

    /**
     * Creates a new task and adds it to the store
     *
     * @param task - The task object to create
     *
     * If the task doesn't have an ID, one will be automatically generated
     * using the current timestamp plus a random number for uniqueness
     */
    createTask: (task: Task) => {
        set((state) => {
            // Generate a unique ID if not provided
            const newTask = {
                ...task,
                id: task.id || Date.now() + Math.random(),
            };

            // Add the new task to the existing tasks array
            return {
                tasks: [...state.tasks, newTask],
            };
        });
    },

    /**
     * Updates an existing task in the store
     *
     * @param task - The task object with updated properties
     *
     * The task is identified by its ID and all properties are updated
     * with the new values while preserving any unchanged properties
     */
    updateTask: (task: Task) => {
        set((state) => ({
            tasks: state.tasks.map(
                (existingTask) =>
                    existingTask.id === task.id
                        ? { ...existingTask, ...task } // Merge existing task with updates
                        : existingTask // Keep unchanged tasks as-is
            ),
        }));
    },

    /**
     * Deletes a task from the store by its ID
     *
     * @param taskId - The unique identifier of the task to delete
     *
     * Filters out the task with the matching ID from the tasks array
     */
    deleteTask: (taskId: number) => {
        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== taskId),
        }));
    },

    /**
     * Retrieves all tasks from the store
     *
     * @returns Array of all tasks in the store
     *
     * This method provides read-only access to the current task list
     * without modifying the state
     */
    getAllTasks: () => {
        return get().tasks;
    },

    /**
     * Toggles the completion status of a specific task
     *
     * @param taskId - The unique identifier of the task to toggle
     *
     * Finds the task by ID and flips its completed status
     * (true becomes false, false becomes true)
     */
    toggleTaskStatus: (taskId: number) => {
        set((state) => ({
            tasks: state.tasks.map(
                (task) =>
                    task.id === taskId
                        ? { ...task, completed: !task.completed } // Toggle completion status
                        : task // Keep other tasks unchanged
            ),
        }));
    },

    /**
     * Deletes all tasks from the store
     *
     * Resets the tasks array to an empty state, effectively
     * clearing all task data from the application
     */
    deleteAllTasks: () => {
        set(() => ({
            tasks: [],
        }));
    },
}));

