import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

/**
 * Separator component for dividing content.
 *
 * @description A visual separator that can be oriented horizontally or vertically.
 *
 * @param className - Additional CSS classes for styling.
 * @param orientation - Orientation of the separator (horizontal or vertical).
 * @param decorative - Whether the separator is purely decorative.
 * @param props - Additional props for the Separator component.
 */
function Separator({
    className,
    orientation = "horizontal",
    decorative = true,
    ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
    return (
        <SeparatorPrimitive.Root
            data-slot="separator"
            decorative={decorative}
            orientation={orientation}
            className={cn(
                "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
                className
            )}
            {...props}
        />
    );
}

export { Separator };
