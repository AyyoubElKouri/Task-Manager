/**=====================================================================================================================
 * @file StatGroup.tsx
 * @description This file serves as a container for StatItem components.
 * 
 * @uses ReactNode to allow this component to receive children.
 * 
 * @exports StatGroup component to be used as a container for StatItem components.
 =====================================================================================================================*/
import type { ReactNode } from "react";

/**
 * StatGroup component for grouping multiple statistics.
 * @description Provides a container for displaying multiple `StatItem` components.
 * @param children - The child components to render inside the group.
 */
const StatGroup = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-fill h-fill bg-background-1 rounded-corner">
            <div className="flex justify-between items-center">
                {children}
            </div> 
        </div>
    );
};

export default StatGroup;
