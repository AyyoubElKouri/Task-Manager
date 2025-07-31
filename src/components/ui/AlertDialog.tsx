import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import React from "react";

import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ConfirmationAlertProps {
    children?: React.ReactNode;
    message: string;
    additionalMessage?: string;
    cancelLabel?: string;
    actionLabel?: string;
    callback: () => void;
}

export const ConfirmationAlert = ({
    children,
    message,
    additionalMessage,
    cancelLabel = "Cancel",
    actionLabel = "OK",
    callback,
}: ConfirmationAlertProps) => {
    return (
        <AlertDialog>
            {/* The Main Section, The Alert will popup wen this section is clicked. */}
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

            <AlertDialogContent className="p-0 border-0 bg-black rounded-corner">
                <div className="p-4">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">{message}</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                        {additionalMessage}
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="w-28">
                            {cancelLabel}
                        </AlertDialogCancel>
                        <AlertDialogAction className="w-28" onClick={callback}>
                            {actionLabel}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
};

// ------------------------------------------------- Shadcn Components -------------------------------------------------

/**
 * Root component for the AlertDialog.
 *
 * @description Provides the base structure for an alert dialog.
 *
 * @param props - Props for the AlertDialog component.
 */
function AlertDialog({
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
    return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

/**
 * Trigger component for the AlertDialog.
 *
 * @description Used to open the alert dialog.
 *
 * @param props - Props for the AlertDialogTrigger component.
 */
function AlertDialogTrigger({
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
    return (
        <AlertDialogPrimitive.Trigger
            data-slot="alert-dialog-trigger"
            {...props}
        />
    );
}

/**
 * Portal component for the AlertDialog.
 *
 * @description Renders the alert dialog in a React portal.
 *
 * @param props - Props for the AlertDialogPortal component.
 */
function AlertDialogPortal({
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
    return (
        <AlertDialogPrimitive.Portal
            data-slot="alert-dialog-portal"
            {...props}
        />
    );
}

/**
 * Overlay component for the AlertDialog.
 *
 * @description Provides a semi-transparent background overlay for the alert dialog.
 *
 * @param props - Props for the AlertDialogOverlay component.
 */
function AlertDialogOverlay({
    className,
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
    return (
        <AlertDialogPrimitive.Overlay
            data-slot="alert-dialog-overlay"
            className={cn(
                "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
                className
            )}
            {...props}
        />
    );
}

/**
 * Content component for the AlertDialog.
 *
 * @description Contains the main content of the alert dialog.
 *
 * @param props - Props for the AlertDialogContent component.
 */
function AlertDialogContent({
    className,
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
    return (
        <AlertDialogPortal>
            <AlertDialogOverlay />
            <AlertDialogPrimitive.Content
                data-slot="alert-dialog-content"
                className={cn(
                    "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
                    className
                )}
                {...props}
            />
        </AlertDialogPortal>
    );
}

/**
 * Header component for the AlertDialog.
 *
 * @description Displays the header section of the alert dialog.
 *
 * @param props - Props for the AlertDialogHeader component.
 */
function AlertDialogHeader({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="alert-dialog-header"
            className={cn(
                "flex flex-col gap-2 text-center sm:text-left",
                className
            )}
            {...props}
        />
    );
}

/**
 * Footer component for the AlertDialog.
 *
 * @description Displays the footer section of the alert dialog.
 *
 * @param props - Props for the AlertDialogFooter component.
 */
function AlertDialogFooter({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="alert-dialog-footer"
            className={cn(
                "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
                className
            )}
            {...props}
        />
    );
}

/**
 * Title component for the AlertDialog.
 *
 * @description Displays the title of the alert dialog.
 *
 * @param props - Props for the AlertDialogTitle component.
 */
function AlertDialogTitle({
    className,
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
    return (
        <AlertDialogPrimitive.Title
            data-slot="alert-dialog-title"
            className={cn("text-lg font-semibold", className)}
            {...props}
        />
    );
}

/**
 * Description component for the AlertDialog.
 *
 * @description Displays the description of the alert dialog.
 *
 * @param props - Props for the AlertDialogDescription component.
 */
function AlertDialogDescription({
    className,
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
    return (
        <AlertDialogPrimitive.Description
            data-slot="alert-dialog-description"
            className={cn("text-muted-foreground text-sm", className)}
            {...props}
        />
    );
}

/**
 * Action component for the AlertDialog.
 *
 * @description Represents an action button in the alert dialog.
 *
 * @param props - Props for the AlertDialogAction component.
 */
function AlertDialogAction({
    className,
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
    return (
        <AlertDialogPrimitive.Action
            className={cn(buttonVariants(), className)}
            {...props}
        />
    );
}

/**
 * Cancel component for the AlertDialog.
 *
 * @description Represents a cancel button in the alert dialog.
 *
 * @param props - Props for the AlertDialogCancel component.
 */
function AlertDialogCancel({
    className,
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
    return (
        <AlertDialogPrimitive.Cancel
            className={cn(buttonVariants({ variant: "outline" }), className)}
            {...props}
        />
    );
}

export {
    AlertDialog,
    AlertDialogPortal,
    AlertDialogOverlay,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
};
