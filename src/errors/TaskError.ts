/**
 * Custom error class for task-related operations
 */
export class TaskError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "TaskError";
    }
}
