import { Button } from "@components/ui/Button";
import { ArrowRightToLine } from "lucide-react";
import { menuItems } from "./menu-items";
import { SideBarItem } from "./SideBarItem";

export function SideBarClosed({
    toggleSideBar,
    path,
    changeRoute,
    isOpen,
}: {
    toggleSideBar: () => void;
    path: string;
    changeRoute: (route: string) => void;
    isOpen: boolean;
}) {
    return (
        <div className="bg-surface-dark-4 min-h-svh w-15 flex flex-col items-center p-2">
            <div className="p-2">
                <Button onClick={toggleSideBar} className="bg-surface-dark-5">
                    <ArrowRightToLine className="text-primary-400" />
                </Button>
            </div>

            <div className="flex flex-col gap-2 w-full">
                {menuItems.map((item) => (
                    <SideBarItem
                        key={item.route}
                        {...item}
                        activeRoute={path}
                        changeRoute={changeRoute}
                        isOpen={isOpen}
                    />
                ))}
            </div>
        </div>
    );
}
