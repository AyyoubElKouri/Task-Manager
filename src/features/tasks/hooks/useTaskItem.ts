/**=====================================================================================================================
 * @file useTaskItem Hook
 * @description Provides state management and actions for individual tasks, including
 *              updating task information, toggling task status, and deleting tasks.
 * 
 * @param task - The task object containing its properties.
 * @returns Object with task information, action handlers, and setters for task properties.
 =====================================================================================================================*/

import { useCallback, useMemo, useState, type ChangeEvent } from "react";

import { TaskService } from "@tasks/services/TaskService";
import type { Task } from "@tasks/types/entities";

interface Handlers {
    handleSave: () => void;
    handleToggle: () => void;
    handleDelete: () => void;
    handleCopy: () => void;
}

interface Setters {
    setSource: (e: ChangeEvent<HTMLInputElement>) => void;
    setDescription: (e: ChangeEvent<HTMLInputElement>) => void;
    setDuration: (e: ChangeEvent<HTMLInputElement>) => void;
}

const useTaskItem = ({
    id,
    source,
    description,
    duration,
    completed,
}: Task) => {
    // State for task information
    const [informations, setInformations] = useState({
        source,
        description,
        duration,
    });

    /**
     * Updates the task with the current information.
     */
    const handleSave = useCallback(() => {
        TaskService.getInstance().updateTask({
            id,
            source: informations.source,
            description: informations.description,
            duration: informations.duration,
            completed,
        });
    }, [id, informations, completed]);

    /**
     * Toggles the completion status of the task.
     */
    const handleToggle = useCallback(() => {
        id && TaskService.getInstance().toggleTaskStatus(id);
    }, [id]);

    /**
     * Deletes the task.
     */
    const handleDelete = useCallback(() => {
        id && TaskService.getInstance().deleteTask(id);
    }, [id]);

    /**
     * Copy task
     */
    const handleCopy = useCallback(() => {
        try {
            const taskToCopy = TaskService.getInstance()
                .getAllTasks()
                .find((task) => task.id === id);
            if (taskToCopy === undefined) return;

            TaskService.getInstance().createTask({
                source: taskToCopy.source,
                description: taskToCopy.description,
                duration: taskToCopy.duration,
                completed: taskToCopy.completed,
            });
        } catch (error: unknown) {
            // TODO: implemnet error handling.
        }
    }, [id]);

    /**
     * Sets the source property of the task.
     */
    const setSource = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInformations((prev) => ({ ...prev, source: e.target.value }));
    }, []);

    /**
     * Sets the description property of the task.
     */
    const setDescription = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInformations((prev) => ({ ...prev, description: e.target.value }));
    }, []);

    /**
     * Sets the duration property of the task.
     */
    const setDuration = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInformations((prev) => ({
            ...prev,
            duration: Number(e.target.value),
        }));
    }, []);

    /**
     * Groups all handlers for easier export and import.
     */
    const handlers: Handlers = {
        handleSave,
        handleToggle,
        handleDelete,
        handleCopy,
    };

    /**
     * Groups all setters for easier export and import.
     */
    const setters: Setters = useMemo(
        () => ({
            setSource,
            setDescription,
            setDuration,
        }),
        []
    );

    return {
        informations,
        handlers,
        setters,
    };
};

export default useTaskItem;
