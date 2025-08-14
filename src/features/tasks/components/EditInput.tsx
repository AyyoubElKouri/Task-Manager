/**=====================================================================================================================
 * @file EditInput.tsx
 * @description This file defines the EditInput component, a reusable and customizable input field for inline editing.
 *              It supports both string and number values, triggers a save action on blur or Enter key press, and allows
 *              passing additional native input attributes.
 * 
 * @uses InputHTMLAttributes - to extend standard HTML input properties.
 * @uses KeyboardEvent - to handle Enter key press for saving.
 * 
 * @exports EditInput component.
 =====================================================================================================================*/

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
