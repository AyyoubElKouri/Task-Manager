/**=====================================================================================================================
 * @file ActionButtons.tsx
 * @description This file contains the ActionButtons component, which provides buttons for delete all tasks and Add new
 *              Task actions.
 * 
 * @uses Button component to render individual buttons with consistent styling.
 * @uses useActionButtons hook for ActionButtons Logic.
 * @uses ConfirmationAlert component for Delete all task action.
 * 
 * @exports ActionButtons component.
 =====================================================================================================================*/

import { Button } from "@/components/ui/Button";
import useActionButtons from "../hooks/useActionButtons";
import { ConfirmationAlert } from "@/components/ui/AlertDialog";

/**
 * ActionButtons Component
 * @description Renders a group of action buttons (delete all tasks, add new Task).
 */
const ActionButtons = () => {
    const { actions } = useActionButtons();

    return (
        <div className="flex gap-4">
            <ConfirmationAlert
                message={ConfirmationLabels.Message}
                additionalMessage={ConfirmationLabels.AdditionalMessage}
                actionLabel={ConfirmationLabels.ActionLabel}
                callback={actions.DeleteAll}
            >
                <Button
                    variant={"destructive"}
                    className="w-[291px] h-[50px] text-[16px]"
                >
                    {ButtonsLabels.DeleteAll}
                </Button>
            </ConfirmationAlert>
            <Button
                className="w-[816px] h-[50px] text-[16px]"
                onClick={actions.NewTask}
            >
                {ButtonsLabels.NewTask}
            </Button>
        </div>
    );
};

export default ActionButtons;

/* ================================================= Local Helpers ================================================== */

const ConfirmationLabels = {
    Message: "Are you sure ?",
    AdditionalMessage: "All task will be removed definitively",
    ActionLabel: "Delete All",
};

const ButtonsLabels = {
    DeleteAll: "Delete All Tasks",
    NewTask: "Add New Task",
};
