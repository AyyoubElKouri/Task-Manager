/**=====================================================================================================================
 * @file StatGroup.tsx
 * @description This component serves as a container for StatItem components.
 * 
 * @uses ReactNode to allow this component to receive children.
 * 
 * @exports StatGroup component to be used as a container for StatItem components.
 =====================================================================================================================*/
import type { ReactNode } from "react";

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
