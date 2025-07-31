import type { InputHTMLAttributes, KeyboardEvent } from "react";

/**
 * Props for the EditInput component.
 *
 * @property type - Specifies the input type (text or number).
 * @property value - Current value of the input field.
 * @property onChange - Function to handle input value changes.
 * @property onSave - Function to save the input value.
 * @property className - Optional CSS classes for styling.
 */
interface EditInputProps extends InputHTMLAttributes<HTMLInputElement> {
    type: "text" | "number";
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
    className?: string;
}

/**
 * EditInput component for task editing.
 *
 * @param type - Type of the input field (text or number)
 * @param value - Current value of the input field
 * @param onChange - Callback triggered on input value change
 * @param onSave - Callback triggered to save the input value
 * @param className - Additional CSS classes for styling
 * @param rest - Additional props passed to the input element
 * @returns JSX element representing the input field
 */
const EditInput = ({
    type,
    value,
    onChange,
    onSave,
    className,
    ...rest
}: EditInputProps) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && onSave();
    };

    return (
        <input
            className={`bg-transparent border-0 border-b border-gray-400 text-gray-900 focus:outline-none ${className}`}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onSave}
            onKeyDown={handleKeyDown}
            {...rest}
        />
    );
};

export default EditInput;
