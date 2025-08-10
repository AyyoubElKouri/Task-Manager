import { useState, type ChangeEvent } from "react";
import EditInput from "./EditInput";
import { formatDuration } from "@/helpers/duration";

interface Information {
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
    length?: number;
    className?: string;
}

/**
 * TaskInformation Component
 *
 * @description Displays a task property with an option to edit its value.
 * Supports double-click to enter edit mode and saving changes.
 *
 * @param value - The current value of the task property.
 * @param onChange - Callback to update the value.
 * @param onSave - Callback to save the updated value.
 * @param length - Maximum length for the input field (optional).
 * @param className - Additional CSS classes for styling (optional).
 */
const TaskInformation = ({
    value,
    onChange,
    onSave,
    length,
    className,
}: Information) => {
    // State to manage edit mode
    const [editMode, setEditMode] = useState(false);

    return (
        <div
            className={`py-2 border-r-1 border-background-1 flex ${className} text-white`}
        >
            {editMode ? (
                // If we are in the Edit Mode, render the Edit Input.
                <EditInput
                    type={typeof value === "string" ? "string" : "number"}
                    value={value}
                    onChange={onChange}
                    onSave={() => {
                        setEditMode(false);
                        onSave();
                    }}
                    autoFocus
                    spellCheck={false}
                    className="w-full text-white"
                    maxLength={length}
                />
            ) : (
                // Else render a Button to display the Text. (button to manage double click for setting Edit Mode)
                <button onDoubleClick={() => setEditMode(true)}>
                    {typeof value === "number" ? formatDuration(value) : value}
                </button>
            )}
        </div>
    );
};

export default TaskInformation;
