import type { InputHTMLAttributes, KeyboardEvent } from "react";

interface EditInputProps extends InputHTMLAttributes<HTMLInputElement> {
    type: "string" | "number";
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
    className?: string;
}

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
