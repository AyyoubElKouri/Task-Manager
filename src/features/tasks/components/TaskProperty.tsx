/**=====================================================================================================================
 * @file TaskProperty.tsx
 * @description This file defines the TaskProperty component, which displays a task property either as text or as an 
 *              editable input field. The component supports switching to edit mode on double-click and saving changes 
 *              on blur or Enter key press.
 * 
 * @uses useState hook - to manage edit mode state.
 * @uses formatDuration helper - to format numeric values representing durations.
 * @uses EditInput component - to handle inline text/number editing with save triggers.
 * 
 * @exports TaskProperty component.
 =====================================================================================================================*/

import { useState, type ChangeEvent } from "react";

import { formatDuration } from "@helpers/duration";

import EditInput from "@tasks/components/EditInput";

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
