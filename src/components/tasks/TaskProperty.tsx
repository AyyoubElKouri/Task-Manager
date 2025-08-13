import { useState, type ChangeEvent } from "react";
import EditInput from "./EditInput";
import { formatDuration } from "@/helpers/duration";

interface TaskPropertyProps {
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
    length?: number;
    className?: string;
}


const TaskProperty = ({
    value,
    onChange,
    onSave,
    length,
    className,
}: TaskPropertyProps) => {
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

export default TaskProperty;
