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
import TaskInformation from "./TaskProperty";
import type { Task } from "@/types/entities";
import useTaskItem from "../../hooks/useTaskItem";
import { ConfirmationAlert } from "@/components/ui/AlertDialog";
import { Copy } from "lucide-react";

// To avoid hard-coded labels
const ConfirmationLabels = {
    message: "Are you sure?",
    additionalMessage: "This task will be removed definitively",
    actionLabel: "Delete",
};

// The icon that indicate if the task are completed or not
const Icon = ({ completed }: { completed: boolean }) => {
    return completed ? (
        <img src="./images/Completed.svg" className="w-7 h-7" />
    ) : (
        <img src="./images/Timer.svg" className="w-5 h-5" />
    );
};

interface TaskItemProps extends Task {}

const TaskItem = (task: TaskItemProps) => {
    const { informations, handlers, setters } = useTaskItem(task);

    return (
        <div
            className={`w-task-item h-task-item-height min-h-task-item-height bg-background-2 rounded-corner flex`}
        >
            {/* === Delete Button === */}
            <ConfirmationAlert
                message={ConfirmationLabels.message}
                additionalMessage={ConfirmationLabels.additionalMessage}
                actionLabel={ConfirmationLabels.actionLabel}
                callback={handlers.handleDelete}
            >
                <button className="w-task-item-delete flex justify-center items-center rounded-l-corner border-r-1 border-background-1 active:scale-90 bg-background-red">
                    <img src="./images/Delete.svg" className="w-4 h-4" />
                </button>
            </ConfirmationAlert>

            <button
                className="w-task-item-delete flex justify-center items-center border-r-1 border-background-1 active:scale-90 bg-green-900 text-white"
                onClick={handlers.handleCopy}
            >
                <Copy className="w-5" />
            </button>

            {/* === Source Section === */}
            <TaskInformation
                value={informations.source}
                onChange={setters.setSource}
                onSave={handlers.handleSave}
                className="pl-3 w-task-item-source font-exo2 font-semibold"
                length={17}
            />

            {/* === Description Section === */}
            <TaskInformation
                value={informations.description}
                onChange={setters.setDescription}
                onSave={handlers.handleSave}
                className="pl-3 w-task-item-description font-exo2 justify-start"
                length={80}
            />

            {/* === Duration Section === */}
            <TaskInformation
                value={informations.duration}
                onChange={setters.setDuration}
                onSave={handlers.handleSave}
                className="pl-3 w-task-item-duration font-exo2 justify-start"
            />

            {/* === Make Task Finished Button (toggle) === */}
            <button
                className={`w-task-item-completed flex justify-center items-center rounded-r-corner active:scale-90 ${
                    task.completed
                        ? "bg-background-blue"
                        : "bg-background-orange"
                }`}
                onClick={handlers.handleToggle}
            >
                <Icon completed={task.completed} />
            </button>
        </div>
    );
};

export default TaskItem;
