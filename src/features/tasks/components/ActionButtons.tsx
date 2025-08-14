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

import { Button } from "@components/ui/Button";
import { ConfirmationAlert } from "@components/ui/AlertDialog";

import useActionButtons from "@tasks/hooks/useActionButtons";

// To avoid hard-coded strings.
const labels = {
    confirmation: {
        message: "Are you sure?",
        additionalMessage: "All tasks will be removed permanently",
        actionLabel: "Delete All",
    },
    buttons: {
        deleteAll: "Delete All Tasks",
        newTask: "Add New Task",
    },
};

const ActionButtons = () => {
    const { actions } = useActionButtons();

    return (
        <div className="flex gap-4">
            {/* Wrapper to attach a validation alert to the delete-all-tasks action. */}
            <ConfirmationAlert
                message={labels.confirmation.message}
                additionalMessage={labels.confirmation.additionalMessage}
                actionLabel={labels.confirmation.actionLabel}
                callback={actions.deleteAll}
            >
                <Button
                    variant={"destructive"}
                    className="w-action-button-width h-action-button-height text-[16px]"
                >
                    {labels.buttons.deleteAll}
                </Button>
            </ConfirmationAlert>

            <Button
                className="w-action-button-width h-action-button-height text-[16px]"
                onClick={actions.newTask}
            >
                {labels.buttons.newTask}
            </Button>
        </div>
    );
};

export default ActionButtons;
