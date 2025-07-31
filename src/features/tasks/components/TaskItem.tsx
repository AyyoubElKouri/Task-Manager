/**=====================================================================================================================
 * @file TaskItem.tsx
 * @description This file contains the TaskItem component, which renders a single task item and allows data changes
 *              across multiple users.
 * 
 * @uses TaskInformation component to render each individual task property for better modularity.
 * @uses Task type for typing the TaskItem component's props.
 * @uses useTaskItem hook that contains all the logic for the TaskItem component, making it clearer and more readable.
 * @uses ConfirmationAlert component to provide consistent validation when the user wants to perform actions
 *                         that require confirmation, such as deleting.
 * 
 * @exports TaskItem component to be used in TaskList or other places that may need it.
 * @see TaskList component.
 =====================================================================================================================*/
import TaskInformation from "./TaskInformation";
import type { Task } from "@/types/entities.types";
import useTaskItem from "../hooks/useTaskItem";
import { ConfirmationAlert } from "@/components/ui/AlertDialog";

/**
 * TaskItem Component
 * @description Represents an individual task with editable fields and actions
 *              such as delete, toggle completion, and save changes.
 * @param task - The task object containing its properties.
 */
const TaskItem = (task: Task) => {
    const { informations, actions, setters } = useTaskItem(task);

    return (
        <div
            className={`w-task-item h-task-item-height bg-background-2 rounded-corner flex`}
        >
            {/* === Delete Button === */}
            <ConfirmationAlert
                message={ConfirmationLabels.Message}
                additionalMessage={ConfirmationLabels.AdditionalMessage}
                actionLabel={ConfirmationLabels.ActionLabel}
                callback={actions.delete}
            >
                <button className="w-task-item-delete flex justify-center items-center rounded-l-corner border-r-1 border-background-1 active:scale-90 bg-background-red">
                    <img src="/images/Delete.svg" className="w-4 h-4" />
                </button>
            </ConfirmationAlert>

            {/* === Source Section === */}
            <TaskInformation
                value={informations.source}
                onChange={setters.source}
                onSave={actions.save}
                className="pl-3 w-task-item-source font-exo2 font-semibold"
                length={17}
            />

            {/* === Description Section === */}
            <TaskInformation
                value={informations.description}
                onChange={setters.description}
                onSave={actions.save}
                className="pl-3 w-task-item-description font-exo2 justify-start"
                length={80}
            />

            {/* === Duration Section === */}
            <TaskInformation
                value={informations.duration}
                onChange={setters.duration}
                onSave={actions.save}
                className="pl-3 w-task-item-duration font-exo2 justify-start"
            />

            {/* === Make Task Finished Button (toggle) === */}
            <button
                className={`w-task-item-completed flex justify-center items-center rounded-r-corner active:scale-90 ${
                    task.completed
                        ? "bg-background-blue"
                        : "bg-background-orange "
                }`}
                onClick={actions.toggle}
            >
                <Icon completed={task.completed} />
            </button>
        </div>
    );
};

export default TaskItem;

/* ================================================= Local Helpers ================================================== */

const ConfirmationLabels = {
    Message: "Are you sure ?",
    AdditionalMessage: "This task will be removed definitively",
    ActionLabel: "Delete",
};

const Icon = ({ completed }: { completed: boolean }) => {
    return (
        <>
            {completed ? (
                <img src="/images/Completed.svg" className="w-7 h-7" />
            ) : (
                <img src="/images/Timer.svg" className="w-5 h-5" />
            )}
        </>
    );
};
