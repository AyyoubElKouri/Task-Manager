/**=====================================================================================================================
 * @file TaskList.tsx
 * @description This file contains the TaskList component, which renders a list of tasks and manages their layout.
 * 
 * @uses TaskItem component to render each individual task in the list.
 * @uses useTaskStore hook to retrieve the list of tasks from the global state.
 * 
 * @exports TaskList component to be displayed.
 * @see TaskDashboard component.
 =====================================================================================================================*/

import { useTaskStore } from "@tasks/stores/use-task-store";
import TaskItem from "@tasks/components/TaskItem";

/**
 * TaskList Component
 * @description Represents a scrollable list of tasks, each rendered using the TaskItem component.
 *              Includes sticky bars at the top and bottom for UI consistency.
 */
const TaskList = () => {
    const tasks = useTaskStore((state) => state.tasks);

    return (
        <div className="w-fill relative h-task-list-height bg-background-1 rounded-corner overflow-hidden">
            <div className="h-full overflow-y-scroll scroll flex flex-col">
                <FixedBar top />

                <div className="flex-1 px-task-list-padding">
                    {tasks.length > 0 ? (
                        <div className="flex flex-col gap-2">
                            {tasks.map((task) => {
                                return <TaskItem key={task.id} {...task} />;
                            })}
                        </div>
                    ) : (
                        <NoContent />
                    )}
                </div>

                <FixedBar top={false} />
            </div>
        </div>
    );
};

export default TaskList;

/* ================================================= Local Helpers ================================================== */

const FixedBar = ({ top }: { top: boolean }) => {
    return (
        <div
            className={`sticky ${
                top ? "top-0" : "bottom-0"
            } bg-background-1 py-[1px] w-full text-background-1 z-10 flex-shrink-0`}
        >
            This text is only for adding some width because the height property
            is not working; this text is not visible.
        </div>
    );
};

const NoContent = () => {
    return (
        <div className="w-task-item h-full flex justify-center items-center">
            <p className="text-4xl text-background-2 font-exo2 font-medium">
                Add somme tasks
            </p>
        </div>
    );
};
