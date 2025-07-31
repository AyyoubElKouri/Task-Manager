/**=====================================================================================================================
 * @file StatItem.tsx
 * @description This file defines the StatItem component, which is used to display a single statistic.
 * 
 * @component StatItem renders a label and its corresponding value inside a styled container.
 * 
 * @exports StatItem component for use within StatGroup.
 =====================================================================================================================*/

/**
 * StatItem component for displaying a single statistic.
 * @description Displays a label and its corresponding value in a styled container.
 *
 * @param label - The label for the statistic (e.g. "Total Tasks").
 * @param value - The value corresponding to the label (e.g. 42).
 */
const StatItem = ({ label, value }: StatItemProps) => {
    return (
        <div className="w-stat-width h-stat-height border-r-1 border-black">
            <div className="flex justify-center items-end h-stat-label-height text-[16px] text-white">
                {label}
            </div>
            <div className="flex justify-center items-start mt-2 w-full h-stat-value-height bg-blue font-medium text-[22px] text-white">
                {value}
            </div>
        </div>
    );
};

export default StatItem;

/* ================================================= Local Helpers ================================================== */

interface StatItemProps {
    label: string;
    value: string | number;
}
