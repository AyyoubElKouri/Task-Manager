import { useStatistics } from "@/hooks/useStatistics";
import StatGroup from "../components/tasks/StatGroup";
import StatItem from "../components/tasks/StatItem";
import TaskList from "../components/tasks/TaskList";
import { TaskService } from "@/services/tasks/TaskService";
import { useEffect } from "react";
import { Logger } from "@/helpers/logger";
import ActionButtons from "../components/tasks/ActionButtons";

const logger = new Logger("Task Dashboard", "TaskDashboard.tsx", "tasks");

const Dashboard = () => {
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
        <div className="flex justify-center flex-col items-center gap-4 min-h-screen bg-[url('/images/Pattern.svg')] bg-repeat">
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
                />
                <StatItem
                    label="Rate of Completione"
                    value={rateOfCompletion}
                />
            </StatGroup>

            {/* === Tasks Section === */}
            <TaskList />
            <ActionButtons />
        </div>
    );
};

export default Dashboard;
