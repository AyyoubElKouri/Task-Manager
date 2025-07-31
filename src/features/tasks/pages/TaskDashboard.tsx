import { useStatistics } from "@/hooks/useStatistics";
import StatGroup from "../components/StatGroup";
import StatItem from "../components/StatItem";
import TaskList from "../components/TaskList";
import { TaskService } from "@/services/tasks/TaskService";
import { useEffect } from "react";
import { Logger } from "@/helpers/logger";
import ActionButtons from "../components/ActionButtons";

const logger = new Logger("Task Dashboard", "TaskDashboard.tsx", "tasks");

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
                    <StatItem label="Total Tasks" value={numberOfTasks} />
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
                <ActionButtons />
            </div>
        </div>
    );
};

export default TaskDashboard;
