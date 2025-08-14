/**=====================================================================================================================
 * @file useStatistics Hook
 * @description Provides calculated statistics about tasks, including total task count, completed task count, total 
 *              hours, completed hours, and rate of completion. It aggregates data from the task store and formats 
 *              durations for display.
 * 
 * @returns An object containing:
 *          - numberOfTasks: total number of tasks.
 *          - numberOfCompletedTasks: total number of completed tasks.
 *          - numberOfHours: total duration of all tasks.
 *          - numberOfCompletedHours: total duration of completed tasks.
 *          - rateOfCompletion: percentage of completed tasks.
 =====================================================================================================================*/

import { formatDuration } from "@helpers/duration";

import { useTaskStore } from "@tasks/stores/use-task-store";
import type { Task } from "@tasks/types/entities";

const COMPLETED = true;

interface UseStatisticsReturns {
    numberOfTasks: number;
    numberOfCompletedTasks: number;
    numberOfHours: string;
    numberOfCompletedHours: string;
    rateOfCompletion: string;
}

export const useStatistics = (): UseStatisticsReturns => {
    const tasks = useTaskStore((state) => state.tasks);

    const numberOfTasks = getNumberOfTasks(tasks);
    const numberOfCompletedTasks = getNumberOfCompletedTasks(tasks);
    const numberOfHours = getNumberOfHours(tasks);
    const numberOfCompletedHours = getNumberOfCompletedHours(tasks);
    const rateOfCompletion = getRateOfCompletion(
        numberOfTasks,
        numberOfCompletedTasks
    );

    return {
        numberOfTasks,
        numberOfCompletedTasks,
        numberOfHours,
        numberOfCompletedHours,
        rateOfCompletion,
    };
};

const getNumberOfTasks = (tasks: Task[]) => {
    return tasks.length;
};

const getNumberOfCompletedTasks = (tasks: Task[]) => {
    const completedTasks = tasks.filter((task) => task.completed == COMPLETED);
    return completedTasks.length;
};

const getNumberOfHours = (tasks: Task[]) => {
    const hours = tasks.reduce((accumulator, task) => {
        return accumulator + task.duration;
    }, 0);

    return formatDuration(hours);
};

const getNumberOfCompletedHours = (tasks: Task[]) => {
    const hours = tasks.reduce((accumulator, task) => {
        return task.completed ? accumulator + task.duration : accumulator;
    }, 0);

    return formatDuration(hours);
};

const getRateOfCompletion = (
    numberOfTasks: number,
    numberOfCompletedTasks: number
) => {
    return numberOfTasks === 0
        ? "0%"
        : ((numberOfCompletedTasks * 100) / numberOfTasks).toFixed() + "%";
};

export default getRateOfCompletion;
