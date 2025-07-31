import { Separator } from "../../../components/ui/Separator";

/**
 * @interface StatItemProps
 * @description Props type recived by StatItem component.
 *
 * @property Label to display on top of the information.
 * @property The value or the information to display on button of the label.
 */
interface StatItemProps {
    label: string;
    value: string | number;
}

/**
 * @component StatItem for displaying a single statistic.
 * @description Displays a label and its corresponding value in a styled container.
 * 
 * @param label - The label for the statistic.
 * @param value - The value of the statistic.
 */
const StatItem = ({ label, value }: StatItemProps) => {
    return (
        <div className="w-full h-fill bg-gray-100 rounded-[10px] border-1 border-gray-300">
            <h2 className="flex justify-center items-center h-7 text-[16px] text-gray-700">
                {label}
            </h2>
            <Separator className="bg-gray-200 border-x-8" />
            <span className="flex justify-center items-center w-full h-9 font-medium text-[18px] text-gray-900">
                {value}
            </span>
        </div>
    );
};

export default StatItem;

