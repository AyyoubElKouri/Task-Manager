import { useTaskStore } from "@tasks/stores/use-task-store";
import type { Task } from "@tasks/types/entities";
import type { TaskRepository } from "@tasks/services/TaskRepository";
import repository from "@tasks/services/TaskRepository";

/**
 * TaskService class implementing the Singleton pattern
 *
 * This service acts as a bridge between the UI layer and the data layer,
 * coordinating operations between the TaskRepository (persistent storage)
 * and the TaskStore (in-memory state management).
 *
 * The service ensures data consistency by synchronizing localStorage
 * operations with the Zustand store state.
 */
export class TaskService {
    private static instance: TaskService;
    private readonly repository: TaskRepository;

    /**
     * Implements the Singleton pattern to ensure only one instance
     * of the service exists throughout the application lifecycle
     *
     * @returns The single instance of TaskService
     */
    public static getInstance(): TaskService {
        // Create instance if it doesn't exist
        TaskService.instance ??= new TaskService(repository);

        return TaskService.instance;
    }

    /**
     * Private constructor to prevent direct instantiation
     *
     * @param repository - TaskRepository instance for data persistence
     *
     * Constructor is private to enforce Singleton pattern.
     * Use getInstance() to obtain the service instance.
     */
    private constructor(repository: TaskRepository) {
        this.repository = repository;
    }

    /**
     * Creates a new task in both persistent storage and in-memory store
     *
     * @param task - Task object to create (ID will be generated automatically)
     *
     * This method performs the following operations:
     * 1. Persists the task to localStorage via TaskRepository
     * 2. Updates the Zustand store to reflect the change in UI
     * 3. Handles any errors that occur during the process
     */
    public createTask(task: Task): void {
        // Generate a unique id for new Task.
        const id = Date.now();
        task.id = id;

        // First, persist the task to localStorage
        this.repository.createTask(task);

        // Update the store with the new task
        useTaskStore.getState().createTask(task);
    }

    /**
     * Updates an existing task in both persistent storage and in-memory store
     *
     * @param task - Task object with updated properties (must include ID)
     *
     * This method performs the following operations:
     * 1. Updates the task in localStorage via TaskRepository
     * 2. Updates the corresponding task in the Zustand store
     * 3. Maintains data consistency between storage layers
     */
    public updateTask(task: Task): void {
        // First, update the task in persistent storage
        this.repository.updateTask(task);

        // Then, update the in-memory store to keep UI in sync
        useTaskStore.getState().updateTask(task);
    }

    /**
     * Deletes a task from both persistent storage and in-memory store
     *
     * @param taskId - The unique identifier of the task to delete
     *
     * This method performs the following operations:
     * 1. Removes the task from localStorage via TaskRepository
     * 2. Removes the task from the Zustand store
     * 3. Ensures both storage layers remain synchronized
     */
    public deleteTask(taskId: number): void {
        // First, delete the task from persistent storage
        this.repository.deleteTask(taskId);

        // Then, remove the task from the in-memory store
        useTaskStore.getState().deleteTask(taskId);
    }

    /**
     * Retrieves all tasks from persistent storage and synchronizes with store
     *
     * @returns Array of all tasks from localStorage
     *
     * This method performs the following operations:
     * 1. Fetches all tasks from localStorage via TaskRepository
     * 2. Synchronizes the Zustand store with the persistent data
     * 3. Returns the complete task list for immediate use
     */
    public getAllTasks(): Task[] {
        // Get all tasks from persistent storage
        const tasks = this.repository.getAllTasks();

        // Synchronize the in-memory store with persistent data
        // This ensures the store reflects the current state of localStorage
        useTaskStore.setState({ tasks });

        return tasks;
    }

    /**
     * Toggles the completion status of a specific task
     *
     * @param taskId - The unique identifier of the task to toggle
     *
     * This method performs the following operations:
     * 1. Toggles the task status in localStorage via TaskRepository
     * 2. Updates the corresponding task in the Zustand store
     * 3. Maintains consistency between both storage layers
     */
    public toggleTaskStatus(taskId: number): void {
        // First, toggle the task status in persistent storage
        this.repository.toggleTaskStatus(taskId);

        // Then, toggle the task status in the in-memory store
        useTaskStore.getState().toggleTaskStatus(taskId);
    }

    /**
     * Deletes all tasks from both persistent storage and in-memory store
     *
     * This method performs the following operations:
     * 1. Clears all tasks from localStorage via TaskRepository
     * 2. Resets the Zustand store to an empty state
     * 3. Ensures both storage layers are completely cleared
     */
    public deleteAllTasks(): void {
        // First, delete all tasks from persistent storage
        this.repository.deleteAllTasks();

        // Then, clear all tasks from the in-memory store
        useTaskStore.getState().deleteAllTasks();
    }

    /**
     * Initializes the service by loading tasks from persistent storage
     *
     * This method should be called when the application starts to ensure
     * the in-memory store is synchronized with the persistent data.
     * It loads all tasks from localStorage and updates the Zustand store.
     */
    public initialize(): void {
        try {
            // Load all tasks from persistent storage and sync with store
            this.getAllTasks();
        } catch (error) {
            // If initialization fails, ensure store is in a clean state
            useTaskStore.setState({ tasks: [] });

            // Re-throw the error for application-level error handling
            throw error;
        }
    }
}
