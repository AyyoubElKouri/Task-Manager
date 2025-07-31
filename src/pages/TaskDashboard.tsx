import { useEffect } from "react";
import StatGroup from "../features/tasks/components/StatGroup";
import StatItem from "../features/tasks/components/StatItem";
import TaskList from "@/features/tasks/components/TaskList";
import { useStatistics } from "../hooks/useStatistics";
import { TaskService } from "../services/tasks/TaskService";
import { Logger } from "@/helpers/logger";

/**
 * Global Logger.
 */
const logger = new Logger("Task Dashboard", "TaskDashboard.tsx", "pages");

const TaskDashboard = () => {
    useEffect(() => {
        try {
            TaskService.getInstance().initialize();
        } catch (error: any) {
            logger.error(error, 19);
        }
    }, []);

    const {
        numberOfTasks,
        numberOfCompletedTasks,
        numberOfHours,
        numberOfCompletedHours,
        rateOfCompletion,
    } = useStatistics();

    return (
        <div>
            <div className="flex justify-center flex-col items-center p-6 gap-4">
                {/* === Statistics Section === */}
                <StatGroup>
                    <StatItem label="All Tasks" value={numberOfTasks} />
                    <StatItem
                        label="Completed Tasks"
                        value={numberOfCompletedTasks}
                    />
                    <StatItem label="Total Hours" value={numberOfHours} />
                    <StatItem
                        label="Total Completed Hours"
                        value={numberOfCompletedHours}
                    />{" "}
                    <StatItem
                        label="Rate of Completione"
                        value={rateOfCompletion}
                    />
                </StatGroup>

                {/* === Tasks Section === */}
                <TaskList />
                <h1 className="bg-background-blue rounded-corner text-white text-3xl font-exo2">Hello world</h1>
            </div>
        </div>
    );
};

export default TaskDashboard;
