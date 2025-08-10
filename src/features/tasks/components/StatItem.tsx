/**=====================================================================================================================
 * @file StatItem.tsx
 * @description This file defines the StatItem component, which is used to display a single statistic.
 * 
 * @component StatItem renders a label and its corresponding value inside a styled container.
 * 
 * @exports StatItem component for use within StatGroup.
 =====================================================================================================================*/

interface StatItemProps {
    label: string;
    value: string | number;
}

const StatItem = ({ label, value }: StatItemProps) => {
    return (
        <div className="w-stat-width h-stat-height border-r-1 border-black flex flex-col items-center justify-center gap-2 text-white">
            <span className="text-gray-300">{label}</span>
            <span className="text-2xl">{value}</span>
        </div>
    );
};

export default StatItem;
