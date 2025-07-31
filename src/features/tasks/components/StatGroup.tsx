import type { ReactNode } from "react";

/**
 * StatGroup component for grouping multiple statistics.
 * @description Provides a container for displaying multiple `StatItem` components.
 * @param children - The child components to render inside the group.
 */
const StatGroup = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full h-fill bg-gray-50 rounded-[10px] border-gray-300 border-1">
            <h2 className="bg-gray-100 rounded-t-[10px] py-1 text-gray-950 flex justify-center items-center font-medium text-[18px] border-b-1 border-gray-300">
                Statistics
            </h2>
            <div className="flex justify-between items-center gap-2 p-2">
                {children}
            </div>
        </div>
    );
};

export default StatGroup;
