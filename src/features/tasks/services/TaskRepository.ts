import { TaskError } from "@tasks/services/TaskError"
import type { Task } from "@tasks/types/entities";

/**
 * Repository class for managing tasks using localStorage
 * Provides CRUD operations and task status management
 *
 * This class serves as the data access layer for task management,
 * handling all interactions with browser localStorage for task persistence.
 * All methods include comprehensive validation and error handling.
 */
export class TaskRepository {
    /**
     * Storage key constant for localStorage operations
     * Used consistently across all storage operations to ensure data integrity
     */
    private readonly STORAGE_KEY = "tasks";

    /**
     * Creates a new task and stores it in localStorage
     * @param task - Task object.
     * @throws {TaskError} If task validation fails or localStorage is unavailable
     */
    public createTask(task: Task): void {
        try {
            this.validateTask(task);
            const tasks = this.loadTasks();
            tasks.push(task);
            this.saveTasks(tasks);
        } catch (error) {
            this.handleError(error, "Failed to create task");
        }
    }

    /**
     * Updates an existing task in localStorage
     * @param task - Task object with ID to update
     * @throws {TaskError} If task validation fails, task not found, or localStorage is unavailable
     */
    public updateTask(task: Task): void {
        try {
            this.validateTask(task);

            if (!task.id) {
                throw new TaskError("Task ID is required for update operation");
            }

            const tasks = this.loadTasks();
            const taskIndex = tasks.findIndex((t) => t.id === task.id);

            // Verify task exists in storage
            if (taskIndex === -1) {
                throw new TaskError(`Task with ID ${task.id} not found`);
            }

            // Replace existing task with updated version
            tasks[taskIndex] = { ...task };
            this.saveTasks(tasks);
        } catch (error) {
            this.handleError(error, "Failed to update task");
        }
    }

    /**
     * Deletes a task from localStorage
     * @param taskId - ID of the task to delete
     * @throws {TaskError} If task not found or localStorage is unavailable
     */
    public deleteTask(taskId: number): void {
        try {
            if (!this.isValidId(taskId)) {
                throw new TaskError("Invalid task ID provided");
            }

            const tasks = this.loadTasks();
            const taskIndex = tasks.findIndex((t) => t.id === taskId);

            // Verify task exists in storage
            if (taskIndex === -1) {
                throw new TaskError(`Task with ID ${taskId} not found`);
            }

            // Remove task from tasks array
            tasks.splice(taskIndex, 1);
            this.saveTasks(tasks);
        } catch (error) {
            this.handleError(error, "Failed to delete task");
        }
    }

    /**
     * Retrieves all tasks from localStorage
     * @returns Array of all tasks
     * @throws {TaskError} If localStorage is unavailable or data is corrupted
     */
    public getAllTasks(): Task[] {
        try {
            return this.loadTasks();
        } catch (error) {
            this.handleError(error, "Failed to retrieve tasks");
        }
    }

    /**
     * Toggles the completion status of a task
     * @param taskId - ID of the task to toggle
     * @throws {TaskError} If task not found or localStorage is unavailable
     */
    public toggleTaskStatus(taskId: number): void {
        try {
            if (!this.isValidId(taskId)) {
                throw new TaskError("Invalid task ID provided");
            }

            const tasks = this.loadTasks();
            const task = tasks.find((t) => t.id === taskId);

            // Verify task exists in storage
            if (!task) {
                throw new TaskError(`Task with ID ${taskId} not found`);
            }

            task.completed = !task.completed;
            this.saveTasks(tasks);
        } catch (error) {
            this.handleError(error, "Failed to toggle task status");
        }
    }

    /**
     * Deletes all tasks from localStorage
     * @throws {TaskError} If localStorage is unavailable
     */
    public deleteAllTasks(): void {
        try {
            // Clear all tasks by saving empty array
            this.saveTasks([]);
        } catch (error) {
            this.handleError(error, "Failed to delete all tasks");
        }
    }

    /**
     * Private method to load tasks from localStorage
     * @returns Array of tasks from localStorage
     * @throws {TaskError} If localStorage is unavailable or data is corrupted
     */
    private loadTasks(): Task[] {
        try {
            // Verify localStorage is available in current environment
            if (!this.isLocalStorageAvailable()) {
                throw new TaskError("localStorage is not available");
            }

            const tasksJson = localStorage.getItem(this.STORAGE_KEY);
            if (!tasksJson) {
                return [];
            }

            const tasks = JSON.parse(tasksJson);
            // Validate that parsed data is an array
            if (!Array.isArray(tasks)) {
                throw new TaskError(
                    "Invalid tasks data format in localStorage"
                );
            }

            // Validate structure of each task in the array
            tasks.forEach((task, index) => {
                if (!this.isValidTaskStructure(task)) {
                    throw new TaskError(
                        `Invalid task structure at index ${index}`
                    );
                }
            });

            return tasks;
        } catch (error) {
            // Handle JSON parsing errors specifically
            if (error instanceof SyntaxError) {
                throw new TaskError("Corrupted task data in localStorage");
            }

            this.handleError(error, "Failed to load tasks");
        }
    }

    /**
     * Private method to save tasks to localStorage
     * @param tasks - Array of tasks to save
     * @throws {TaskError} If localStorage is unavailable or save operation fails
     */
    private saveTasks(tasks: Task[]): void {
        try {
            // Verify localStorage is available in current environment
            if (!this.isLocalStorageAvailable()) {
                throw new TaskError("localStorage is not available");
            }

            // Serialize tasks array to JSON string
            const tasksJson = JSON.stringify(tasks);

            localStorage.setItem(this.STORAGE_KEY, tasksJson);
        } catch (error) {
            // Handle localStorage quota exceeded error specifically
            if (
                error instanceof DOMException &&
                error.name === "QuotaExceededError"
            ) {
                throw new TaskError("localStorage quota exceeded");
            }
            this.handleError(error, "Failed to save tasks");
        }
    }

    /**
     * Private method to validate task object
     * @param task - Task object to validate
     * @throws {TaskError} If task validation fails
     */
    private validateTask(task: Task): void {
        // Validate task object existence
        if (!task) {
            throw new TaskError("Task object is required");
        }

        // Validate task ID: must be positive integer
        if (!task.id || typeof task.id !== "number" || task.id <= 0) {
            throw new TaskError("Task id is required and must be > 0");
        }

        // Validate task source: must be non-empty string
        if (
            !task.source ||
            typeof task.source !== "string" ||
            task.source.trim() === ""
        ) {
            throw new TaskError(
                "Task source is required and must be a non-empty string"
            );
        }

        // Validate task description: must be non-empty string
        if (
            !task.description ||
            typeof task.description !== "string" ||
            task.description.trim() === ""
        ) {
            throw new TaskError(
                "Task description is required and must be a non-empty string"
            );
        }

        // Validate task duration: must be non-negative number
        if (typeof task.duration !== "number" || task.duration < 0) {
            throw new TaskError("Task duration must be a non-negative number");
        }

        // Validate task completed: must be boolean
        if (typeof task.completed !== "boolean") {
            throw new TaskError("Task completed status must be a boolean");
        }
    }

    /**
     * Private method to validate task ID
     * @param id - ID to validate
     * @returns True if ID is valid, false otherwise
     */
    private isValidId(id: number): boolean {
        return typeof id === "number" && id > 0 && Number.isInteger(id);
    }

    /**
     * Private method to validate task structure
     * @param task - Task object to validate structure
     * @returns True if structure is valid, false otherwise
     */
    private isValidTaskStructure(task: Task): boolean {
        return (
            task &&
            typeof task === "object" &&
            typeof task.id === "number" &&
            typeof task.source === "string" &&
            typeof task.description === "string" &&
            typeof task.duration === "number" &&
            typeof task.completed === "boolean"
        );
    }

    /**
     * Private method to check if localStorage is available
     * @returns True if localStorage is available, false otherwise
     */
    private isLocalStorageAvailable(): boolean {
        try {
            const testKey = "__test__";

            localStorage.setItem(testKey, "test");
            localStorage.removeItem(testKey);

            return true;
        } catch {
            return false;
        }
    }

    /**
     * Private method to handle errors
     */
    private handleError(error: unknown, message?: string): never {
        if (error instanceof TaskError) {
            throw error;
        }

        throw new TaskError(
            `${message}: ${
                error instanceof Error ? error.message : "Unknown error"
            }`
        );
    }
}

const repository = new TaskRepository();
export default repository;
