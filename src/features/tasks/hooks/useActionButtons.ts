import { Logger } from "@/helpers/logger";
import { TaskService } from "@/services/tasks/TaskService";
import type { Task } from "@/types/entities.types";

const logger = new Logger(
    "Action Buttons hook",
    "useActionButtons.ts",
    "tasks"
);

const useActionButtons = () => {
    /**
     *
     */
    const newTask = () => {
        // Default data.
        const task: Task = {
            source: "Default Source",
            description: "Default Description",
            duration: 50,
            completed: false,
        };

        // Create new task
        try {
            TaskService.getInstance().createTask(task);
        } catch (error: unknown) {
            logger.error("Errror in adding new Task", 21);
        }
    };

    const deleteAll = () => {
        // Delete all tasks
        try {
            TaskService.getInstance().deleteAllTasks();
        } catch (error: unknown) {
            logger.error("Errror in deleting all Tasks", 21);
        }
    };

    const actions = {
        newTask,
        deleteAll,
    };

    return { actions };
};

export default useActionButtons;

