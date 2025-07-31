import { useTaskStore } from "@/stores/useTaskStore";
import TaskItem from "./TaskItem";
import { TaskService } from "@/services/tasks/TaskService";
import { Button } from "@/components/ui/Button";
import { ConfirmationAlert } from "@/components/ui/AlertDialog";

/**
 * TaskList Component
 * @description Displays a list of tasks with options to add new tasks, clear all tasks,
 * and interact with individual tasks. Utilizes TaskService for task management.
 */
const TaskList = () => {
    // Fetch tasks from the store
    const tasks = useTaskStore((state) => state.tasks);

    /**
     * Creates a new task with default values.
     */
    const newTask = (): void => {
        TaskService.getInstance().createTask({
            source: "Source",
            description: "Description",
            duration: 120,
            completed: false,
        });
    };

    return (
        <div className="w-full h-fill bg-background-1 rounded-corner flex flex-col items-end">
            {/* === Title === */}
            <h2 className="w-full bg-gray-100 rounded-t-[10px] py-1 text-gray-950 flex justify-center items-center font-medium text-[18px] border-b-1 border-gray-300">
                Tasks
            </h2>

            {/* === Add new task button === */}
            <Button className="w-30 mt-2 mr-2" onClick={newTask}>
                Add Task
            </Button>

            {/* Tasks list */}
            <div className="w-full h-fill bg-background-1 rounded-[10px] flex flex-col gap-2 p-2">
                {tasks.map((task) => {
                    return (
                        <TaskItem
                            key={task.id}
                            id={task.id}
                            source={task.source}
                            description={task.description}
                            duration={task.duration}
                            completed={task.completed}
                        />
                    );
                })}
            </div>

            {/* === Clear all tasks button === */}
            <ConfirmationAlert
                message="Are you Sure ?"
                additionalMessage="All tasks will be removed definitely"
                actionLabel="Remove All"
                callback={() => TaskService.getInstance().deleteAllTasks()}
            >
                <div className="p-2 w-full">
                    <Button variant={"outline"} className="w-full">
                        Remove All
                    </Button>
                </div>
            </ConfirmationAlert>
        </div>
    );
};

export default TaskList;
