/**=====================================================================================================================
 * @file Dashboard.tsx
 * @description This component serves as the main task dashboard, initializing the task service on mount and displaying
 *              overall task statistics, the task list, and action buttons for task management.
 * 
 * @uses useEffect hook to initialize the TaskService when the component mounts.
 * @uses Logger for logging errors during initialization.
 * @uses useStatistics hook to retrieve task statistics data.
 * @uses StatGroup and StatItem components to display task statistics.
 * @uses TaskList component to render the list of tasks.
 * @uses ActionButtons component to provide task management actions.
 * 
 * @exports Dashboard component as the main container for task management and statistics display.
 =====================================================================================================================*/

import { useEffect } from "react";

import { Logger } from "@/helpers/logger";

import StatItem from "@tasks/components/StatItem";
import TaskList from "@tasks/components/TaskList";
import StatGroup from "@tasks/components/StatGroup";
import ActionButtons from "@tasks/components/ActionButtons";
import { TaskService } from "@tasks/services/TaskService";
import { useStatistics } from "@tasks/hooks/useStatistics";

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
