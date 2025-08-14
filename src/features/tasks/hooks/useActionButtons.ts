/**=====================================================================================================================
 * @file useActionButtons Hook
 * @description Provides action handlers for task-related operations, including creating a new default task 
 *              and deleting all existing tasks. Uses TaskService for data manipulation and Logger for error handling.
 * 
 * @returns Object containing:
 *          - actions: an object with methods:
 *              - newTask: creates a new task with default properties.
 *              - deleteAll: removes all tasks from the store.
 =====================================================================================================================*/

import { Logger } from "@/helpers/logger";

import { TaskService } from "@tasks/services/TaskService";
import type { Task } from "@tasks/types/entities";

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
