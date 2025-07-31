import { Button } from "@/components/ui/Button";
import useActionButtons from "../hooks/useActionButtons";
import { ConfirmationAlert } from "@/components/ui/AlertDialog";

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
