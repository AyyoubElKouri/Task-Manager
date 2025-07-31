/**=====================================================================================================================
 * useTaskItem Hook
 * @description Provides state management and actions for individual tasks, including
 *              updating task information, toggling task status, and deleting tasks.
 * 
 * @param task - The task object containing its properties.
 * @returns Object with task information, action handlers, and setters for task properties.
 =====================================================================================================================*/

import { TaskService } from "@/services/tasks/TaskService";
import type { Task } from "@/types/entities.types";
import { useCallback, useMemo, useState, type ChangeEvent } from "react";

interface Actions {
    save: () => void;
    toggle: () => void;
    delete: () => void;
}

interface Setters {
    source: (e: ChangeEvent<HTMLInputElement>) => void;
    description: (e: ChangeEvent<HTMLInputElement>) => void;
    duration: (e: ChangeEvent<HTMLInputElement>) => void;
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
    const actions: Actions = {
        save: handleSave,
        toggle: handleToggle,
        delete: handleDelete,
    };

    /**
     * Groups all setters for easier export and import.
     */
    const setters: Setters = useMemo(
        () => ({
            source: setSource,
            description: setDescription,
            duration: setDuration,
        }),
        []
    );

    return {
        informations,
        actions,
        setters,
    };
};

export default useTaskItem;
